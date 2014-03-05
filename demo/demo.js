/*
 @license OCI Treeview version 0.1.1
 ⓒ 2014 OCI https://github.com/objectcomputing/oci.treeview
 License: MIT
 */

angular.module('app', ['oci.treeview']).controller('AppCtrl', function ($scope, $timeout) {
    $scope.treeDataBasic = {
        label: 'Parent',
        children: [
            {
                label: 'Child1',
                children: [
                    {
                        label: 'Grandchild1',
                        children: []
                    },
                    {
                        label: 'Grandchild2',
                        children: []
                    },
                    {
                        label: 'Grandchild3',
                        children: [
                            {
                                label: 'Greatgrandchild1',
                                children: []
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Child2',
                children: []
            }
        ]
    };

    $scope.treeDataToBeCollapsed = {
        label: 'Parent',
        children: [
            {
                label: 'Child1',
                children: [
                    {
                        label: 'Grandchild1',
                        children: []
                    },
                    {
                        label: 'Grandchild2',
                        children: []
                    },
                    {
                        label: 'Grandchild3',
                        children: [
                            {
                                label: 'Greatgrandchild1',
                                children: []
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Child2',
                children: []
            }
        ]
    };

    $scope.treeDataNotifications = {
        label: 'Parent',
        state: 'expanded',
        children: [
            {
                label: 'Child1',
                state: 'expanded',
                children: [
                    {
                        label: 'Grandchild1',
                        state: 'leaf',
                        children: []
                    },
                    {
                        label: 'Grandchild2',
                        state: 'leaf',
                        children: []
                    },
                    {
                        label: 'Grandchild3',
                        state: 'expanded',
                        children: [
                            {
                                label: 'Greatgrandchild1',
                                state: 'leaf',
                                children: []
                            }
                        ]
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

    $scope.treeDataOnSelect = {
        label: 'Parent',
        state: 'expanded',
        children: [
            {
                label: 'Child1',
                state: 'expanded',
                children: [
                    {
                        label: 'Grandchild1',
                        state: 'leaf',
                        children: []
                    },
                    {
                        label: 'Grandchild2',
                        state: 'leaf',
                        children: []
                    },
                    {
                        label: 'Grandchild3',
                        state: 'expanded',
                        children: [
                            {
                                label: 'Greatgrandchild1',
                                state: 'leaf',
                                children: []
                            }
                        ]
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

    // When a node's icon is clicked on, the 'nodeSelected' event is fired.
    // This listener sets the class to 'selectedNode' for css to handle
    // and clears the previous selection.
    $scope.$on('nodeSelected', function (event, node, context) {
        if (context.selectedNode) {
            context.selectedNode.class = '';
        }

        node.class = 'selectedNode';
        context.selectedNode = node;
    });

    // When a node is clicked on (icon or label), it will add a
    // new child node. This happens only once per node due to
    // the complete flag.
    $scope.getMoreData = function (node) {
        return $timeout(function () {
            if (!node.complete) {
                node.children = node.children.concat({
                    label: 'New Node',
                    state: 'leaf',
                    children: [],
                    complete: false
                });
                node.state = 'expanded';
                node.complete = true;
            }
        });
    };});