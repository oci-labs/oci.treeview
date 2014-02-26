angular.module('app', ['oci.treeview']).controller("AppCtrl", function ($scope) {
    $scope.treeData = {
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
                    },
                    {
                        label: "Grandchild2",
                        collapsed: false,
                        children: []
                    },
                    {
                        label: "Grandchild3",
                        collapsed: false,
                        children: [
                            {
                                label: "Greatgrandchild1",
                                collapsed: false,
                                children: []
                            }
                        ]
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
})