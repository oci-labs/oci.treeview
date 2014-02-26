(function () {
    'use strict';

    var module = angular.module('oci.treeview', []);

    module.controller("TreeCtrl", function ($scope) {
        $scope.treeData = {
            label: "Parent",
            path: "/Parent/",
            collapsed: true,
            children: [
                {
                    label: "Child1",
                    path: "/Parent/Child1/",
                    collapsed: true,
                    children: [
                        {
                            label: "Grandchild1",
                            path: "/Parent/Child1/Grandchild1/",
                            collapsed: true,
                            children: []
                        },
                        {
                            label: "Grandchild2",
                            path: "/Parent/Child1/Grandchild2/",
                            collapsed: true,
                            children: []
                        },
                        {
                            label: "Grandchild3",
                            path: "/Parent/Child1/Grandchild3/",
                            collapsed: true,
                            children: []
                        }
                    ]
                },
                {
                    label: "Child2",
                    path: "/Parent/Child2/",
                    collapsed: true,
                    children: []
                }
            ]
        };
    });

    module.directive("treeview", function ($compile) {
        return {
            restrict: "E",
            transclude: true,
            scope: {tree: '='},
            template:
//                '<div class="tree">' +
//                '   <ul>' +
//                '       <li ng-repeat="node in tree">' +
//                '           <i ng-class="iconClass(node)" ng-click="selectNodeHead(node)"></i>' +
//                '           <span ng-class="node.selected">{{node.label}}</span>' +
//                '           <div ng-if="node.children && node.children.length" ng-hide="node.collapsed">' +
//                '               <treeview id="id" tree="node.children" item="item" context="context"></treeview>' +
//                '           </div>' +
//                '       </li>' +
//                '   </ul>' +
//                '</div>';
                '<div class="tree">' +
                '   <span ng-transclude></span>' +
                '   <ul ng-if="tree.children && tree.children.length > 0">' +
                '       <li ng-repeat="node in tree.children">' +
                '           <treeview tree="node">' +
                '               <div ng-transclude></div>' +
                '           </treeview>' +
                '     </li>' +
                '   </ul>' +
                '</div>',
            compile: function (tElement, tAttr, transclude) {
                var contents = tElement.contents().remove();
                var compiledContents;
                return function (scope, iElement, iAttr) {

                    if (!compiledContents) {
                        compiledContents = $compile(contents, transclude);
                    }
                    compiledContents(scope, function (clone, scope) {
                        iElement.append(clone);
                    });
                };
            }
        };
    });
})();
