(function () {
    'use strict';

    describe('treeview directive', function () {
        beforeEach(module('oci.treeview'));

        var compile;
        var scope;

        beforeEach(inject(function ($compile, $rootScope, $controller) {
            compile = $compile;
            scope = $rootScope.$new();
            scope.context = {};
            $controller('oci.treeview.ctrl', {$scope: scope});
        }));

        it('should render nested tree expanded', function () {
            var treeData = {
                label: 'Parent',
                state: 'expanded',
                children: [
                    {
                        label: 'Child1',
                        state: 'expanded',
                        children: [
                            {
                                label: 'Grandchild1',
                                state: 'expanded',
                                children: []
                            }
                        ]
                    },
                    {
                        label: 'Child2',
                        state: 'expanded',
                        children: []
                    }
                ]
            };

            var elem = angular.element('<treeview tree="treeData"> <!--HTML to be transcluded--> <p>{{ tree.label }}</p> </treeview>');
            scope.treeData = treeData;
            compile(elem)(scope);
            scope.$digest();

            var labels = elem.find('div p');
            expect(labels.length).toBe(4);
            expect(labels.eq(0).text()).toBe('Parent');
            expect(labels.eq(1).text()).toBe('Child1');
            expect(labels.eq(2).text()).toBe('Grandchild1');
            expect(labels.eq(3).text()).toBe('Child2');

            var childLabels = elem.find('div ul li div p');
            expect(childLabels.length).toBe(3);
            expect(childLabels.eq(0).text()).toBe('Child1');
            expect(childLabels.eq(1).text()).toBe('Grandchild1');
            expect(childLabels.eq(2).text()).toBe('Child2');

            var grandchildLabels = elem.find('div ul li div ul li div p');
            expect(grandchildLabels.length).toBe(1);
            expect(grandchildLabels.eq(0).text()).toBe('Grandchild1');
        });

        it('should render nested tree with the child collapsed', function () {
            var treeData = {
                label: 'Parent',
                state: 'expanded',
                children: [
                    {
                        label: 'Child1',
                        state: 'collapsed',
                        children: [
                            {
                                label: 'Grandchild1',
                                state: 'expanded',
                                children: []
                            }
                        ]
                    },
                    {
                        label: 'Child2',
                        state: 'expanded',
                        children: []
                    }
                ]
            };

            var elem = angular.element('<treeview tree="treeData"> <!--HTML to be transcluded--> <p>{{ tree.label }}</p> </treeview>');
            scope.treeData = treeData;
            compile(elem)(scope);
            scope.$digest();

            var labels = elem.find('div p');
            expect(labels.length).toBe(3);
            expect(labels.eq(0).text()).toBe('Parent');
            expect(labels.eq(1).text()).toBe('Child1');
            expect(labels.eq(2).text()).toBe('Child2');

            var childLabels = elem.find('div ul li div p');
            expect(childLabels.length).toBe(2);
            expect(childLabels.eq(0).text()).toBe('Child1');
            expect(childLabels.eq(1).text()).toBe('Child2');

            var grandchildLabels = elem.find('div ul li div ul li div p');
            expect(grandchildLabels.length).toBe(0);
        });

        it('should render nested tree with the root collapsed', function () {
            var treeData = {
                label: 'Parent',
                state: 'collapsed',
                children: [
                    {
                        label: 'Child1',
                        state: 'collapsed',
                        children: [
                            {
                                label: 'Grandchild1',
                                state: 'leaf',
                                children: []
                            }
                        ]
                    },
                    {
                        label: 'Child2',
                        state: 'leaf',
                        children: []
                    }
                ]
            };

            var elem = angular.element('<treeview tree="treeData"> <!--HTML to be transcluded--> <p>{{ tree.label }}</p> </treeview>');
            scope.treeData = treeData;
            compile(elem)(scope);
            scope.$digest();

            var labels = elem.find('div p');
            expect(labels.length).toBe(1);
            expect(labels.eq(0).text()).toBe('Parent');

            var childLabels = elem.find('div ul li div p');
            expect(childLabels.length).toBe(0);

            var grandchildLabels = elem.find('div ul li div ul li div p');
            expect(grandchildLabels.length).toBe(0);
        });

        it('should have skipped doing anything w/o children', function(){
            // check childless (should be skipped)
            var selectedNode = {state: 'leaf', children: []};
            scope.selectNodeHead(selectedNode);
            expect(selectedNode.state).toBe('leaf'); // unchanged
        });

        it('should have collapsed', function(){
            var selectedNode = {state: 'expanded', children: [{}]};
            scope.selectNodeHead(selectedNode);
            expect(selectedNode.state).toBe('collapsed'); // changed
            scope.selectNodeHead(selectedNode);
            expect(selectedNode.state).toBe('expanded'); // changed
        });

    });
})();
