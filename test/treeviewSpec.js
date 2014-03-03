/*
 @license OCI Treeview version 0.1.1
 ⓒ 2014 OCI https://github.com/objectcomputing/oci.treeview
 License: MIT
 */

(function () {
    'use strict';

    describe('treeview directive', function () {
        beforeEach(module('oci.treeview'));

        var compile;
        var scope;
        var timeout;
        var rootScope;
        var q;
        var controller;

        beforeEach(inject(function ($compile, $rootScope, $controller, $timeout, $q) {
            compile = $compile;
            scope = $rootScope.$new();
            scope.context = {};
            $controller('oci.treeview.ctrl', {$scope: scope});
            timeout = $timeout;
            rootScope = $rootScope;
            q = $q;
            controller = $controller;
        }));

        it('should set node.state if not supplied, defaulting to expanded', function () {
            var treeData = {
                label: 'Parent',
                children: [
                    {
                        label: 'Child1',
                        children: [
                            {
                                label: 'Grandchild1',
                                children: []
                            }
                        ]
                    },
                    {
                        label: 'Child2',
                        children: []
                    }
                ]
            };
            var scope = { tree: treeData };

            controller('oci.treeview.ctrl', {$scope: scope});

            expect(treeData.state).toBe('expanded');
            expect(treeData.children[0].state).toBe('expanded');
            expect(treeData.children[0].children[0].state).toBe('leaf');
            expect(treeData.children[1].state).toBe('leaf');
        });

        it('should set node.state to expanded if the supplied value is wrong', function () {
            var treeData = {
                label: 'Parent',
                children: [
                    {
                        label: 'Child1',
                        children: [
                            {
                                label: 'Grandchild1',
                                children: []
                            }
                        ]
                    },
                    {
                        label: 'Child2',
                        children: []
                    }
                ]
            };
            var scope = { tree: treeData, defaultNodeState: 'foo' };

            controller('oci.treeview.ctrl', {$scope: scope});

            expect(treeData.state).toBe('expanded');
            expect(treeData.children[0].state).toBe('expanded');
            expect(treeData.children[0].children[0].state).toBe('leaf');
            expect(treeData.children[1].state).toBe('leaf');
        });

        it('should set node.state if supplied as collapsed', function () {
            var treeData = {
                label: 'Parent',
                children: [
                    {
                        label: 'Child1',
                        children: [
                            {
                                label: 'Grandchild1',
                                children: []
                            }
                        ]
                    },
                    {
                        label: 'Child2',
                        children: []
                    }
                ]
            };
            var scope = { tree: treeData, defaultNodeState: 'collapsed' };

            controller('oci.treeview.ctrl', {$scope: scope});

            expect(treeData.state).toBe('collapsed');
            expect(treeData.children[0].state).toBe('collapsed');
            expect(treeData.children[0].children[0].state).toBe('leaf');
            expect(treeData.children[1].state).toBe('leaf');
        });

        it('should not set any node.state if the root state is set', function () {
            var treeData = {
                label: 'Parent',
                state: 'expanded',
                children: [
                    {
                        label: 'Child1',
                        children: [
                            {
                                label: 'Grandchild1',
                                children: []
                            }
                        ]
                    },
                    {
                        label: 'Child2',
                        children: []
                    }
                ]
            };
            var scope = { tree: treeData, defaultNodeState: 'collapsed' };

            controller('oci.treeview.ctrl', {$scope: scope});

            expect(treeData.state).toBe('expanded');
            expect(treeData.children[0].state).toBeUndefined();
            expect(treeData.children[0].children[0].state).toBeUndefined();
            expect(treeData.children[1].state).toBeUndefined();
        });

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

            var elem = angular.element('<oci.treeview tree="treeData"> <!--HTML to be transcluded--> <p>{{ tree.label }}</p> </oci.treeview>');
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

            var elem = angular.element('<oci.treeview tree="treeData"> <!--HTML to be transcluded--> <p>{{ tree.label }}</p> </oci.treeview>');
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

            var elem = angular.element('<oci.treeview tree="treeData"> <!--HTML to be transcluded--> <p>{{ tree.label }}</p> </oci.treeview>');
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

        it('should have skipped doing anything w/o children', function () {
            // check childless (should be skipped)
            var selectedNode = {state: 'leaf', children: []};
            scope.selectNode(selectedNode);
            expect(selectedNode.state).toBe('leaf'); // unchanged
        });

        it('should have collapsed', function () {
            var selectedNode = {state: 'expanded', children: [
                {}
            ]};
            scope.selectNode(selectedNode);
            expect(selectedNode.state).toBe('collapsed'); // changed
            scope.selectNode(selectedNode);
            expect(selectedNode.state).toBe('expanded'); // changed
        });

        it('should call on-select-node function before changing state', function () {
            var onSelectNodeState;
            scope.onSelectNode = function (node) {
                onSelectNodeState = node.state;
            };

            var selectedNode = {state: 'expanded', children: [
                {}
            ]};

            scope.selectNode(selectedNode);
            expect(onSelectNodeState).toBe('expanded'); // not changed yet
            expect(selectedNode.state).toBe('collapsed'); // changed

            scope.selectNode(selectedNode);
            expect(onSelectNodeState).toBe('collapsed'); // not changed yet
            expect(selectedNode.state).toBe('expanded'); // changed
        });

        it('should resolve on-select-node promise before changing state', function () {
            var onSelectNodeState;
            var promiseCalled = false;

            scope.onSelectNode = function (node) {
                var deferred = q.defer();
                var promise = deferred.promise;
                promise.then(function () {
                    promiseCalled = true;
                    onSelectNodeState = node.state;
                });
                deferred.resolve();
                return promise;
            };

            var selectedNode = {state: 'expanded', children: [
                {}
            ]};

            scope.selectNode(selectedNode);
            expect(promiseCalled).toBe(false);
            expect(onSelectNodeState).toBeUndefined(); // not changed yet
            expect(selectedNode.state).toBe('expanded'); // not changed yet

            rootScope.$apply(); // trigger promise resolution

            expect(promiseCalled).toBe(true);
            expect(onSelectNodeState).toBe('collapsed'); // changed
            expect(selectedNode.state).toBe('collapsed'); // changed
        });

        it('should not change state if on-select-node promise resolves to error', function () {
            var onSelectNodeState;
            var promiseCalled = false;
            var promiseError;

            scope.onSelectNode = function (node) {
                var deferred = q.defer();
                var promise = deferred.promise;
                promise.then(function () {
                    // should not get here:
                    promiseCalled = true;
                    onSelectNodeState = node.state;
                }, function () {
                    promiseCalled = true;
                    promiseError = true;
                });
                deferred.reject('error');
                return promise;
            };

            var selectedNode = {state: 'expanded', children: [
                {}
            ]};

            scope.selectNode(selectedNode);
            expect(promiseCalled).toBe(false);
            expect(onSelectNodeState).toBeUndefined(); // not changed yet
            expect(selectedNode.state).toBe('expanded'); // not changed yet

            rootScope.$apply(); // trigger promise resolution

            expect(promiseCalled).toBe(true);
            expect(promiseError).toBe(true);
            expect(onSelectNodeState).toBeUndefined(); // still not changed
            expect(selectedNode.state).toBe('expanded'); // still not changed
        });

        it('should emit selected node event', function () {
            spyOn(scope, '$emit');

            var selectedNode = {state: 'expanded', children: [
                {}
            ]};
            scope.selectNode(selectedNode);

            expect(scope.$emit).toHaveBeenCalledWith('nodeSelected', selectedNode, {});
        });
    });
})();
