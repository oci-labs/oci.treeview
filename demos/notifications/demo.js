/*
 @license OCI Treeview version 0.1.0
 ⓒ 2014 OCI https://github.com/objectcomputing/oci.treeview
 License: MIT
 */

angular.module('app', ['oci.treeview']).controller('AppCtrl', function ($scope) {
    $scope.treeData = {
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
});