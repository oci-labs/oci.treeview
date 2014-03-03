/*
 @license OCI Treeview version 0.1.1
 ⓒ 2014 OCI https://github.com/objectcomputing/oci.treeview
 License: MIT
 */

angular.module('app', ['oci.treeview']).controller('AppCtrl', function ($scope) {
    $scope.treeData = {
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
});