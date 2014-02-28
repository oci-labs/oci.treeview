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

    $scope.$on('nodeSelected', function (event, node, context) {
      node.class = 'selected';
      console.log('node', node);
    });
})