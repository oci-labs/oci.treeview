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

        it('should render nested tree uncollapsed', function () {
            var treeData = {
                label: "Parent",
                collapsed: false,
                children: [
                    {
                        label: "Child1",
                        collapsed: false,
                        children: [
                            {
                                label: "Grandchild1",
                                collapsed: false,
                                children: []
                            }
                        ]
                    },
                    {
                        label: "Child2",
                        collapsed: false,
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
                label: "Parent",
                collapsed: false,
                children: [
                    {
                        label: "Child1",
                        collapsed: true,
                        children: [
                            {
                                label: "Grandchild1",
                                collapsed: false,
                                children: []
                            }
                        ]
                    },
                    {
                        label: "Child2",
                        collapsed: false,
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
                label: "Parent",
                collapsed: true,
                children: [
                    {
                        label: "Child1",
                        collapsed: true,
                        children: [
                            {
                                label: "Grandchild1",
                                collapsed: false,
                                children: []
                            }
                        ]
                    },
                    {
                        label: "Child2",
                        collapsed: false,
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

        it('should calculate icon class', function () {
            expect(scope.iconClass({})).toBe('normal');
            expect(scope.iconClass({children: []})).toBe('normal');
            expect(scope.iconClass({children: [{}]})).toBe('expanded');
            expect(scope.iconClass({collapsed: false, children: [{}]})).toBe('expanded');
            expect(scope.iconClass({collapsed: true, children: [{}]})).toBe('collapsed');
        });

        it('should have skipped doing anything w/o children', function(){
            // check childless (should be skipped)
            var selectedNode = {collapsed: true, children: []};
            scope.selectNodeHead(selectedNode);
            expect(selectedNode.collapsed).toBe(true); // unchanged
        });

        it('should have collapsed', function(){
            var selectedNode = {collapsed: false, children: [{}]};
            scope.selectNodeHead(selectedNode);
            expect(selectedNode.collapsed).toBe(true); // changed
            scope.selectNodeHead(selectedNode);
            expect(selectedNode.collapsed).toBe(false); // changed
        });

    });
})();
