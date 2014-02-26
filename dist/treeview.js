(function () {
    'use strict';

    var module = angular.module('oci.treeview', []);

    module.controller('oci.treeview.ctrl', function ($scope) {
        $scope.iconClass = function (node) {
            // todo consider inlining for efficiency
            if (hasChildren(node)) {
                return node.collapsed ? 'collapsed' : 'expanded';
            } else {
                return 'normal';
            }
        };

        $scope.selectNodeHead = function (selectedNode) {
            if (!hasChildren(selectedNode)) {
                return;
            }

            selectedNode.collapsed = !selectedNode.collapsed;
        };

        var hasChildren = function (node) {
            return node.children !== undefined && node.children.length > 0;
        };
    });

    module.directive("treeview", function ($compile) {
        return {
            restrict: "E",
            transclude: true,
            scope: {tree: '='},
            controller: 'oci.treeview.ctrl',
            template:
                '<div class="tree">' +
                '   <span ng-transclude></span>' +
                '   <ul ng-if="tree.children && tree.children.length > 0 && !tree.collapsed">' +
                '       <li ng-repeat="node in tree.children">' +
                '           <i ng-class="iconClass(node)" ng-click="selectNodeHead(node)"></i>' +
                '           <treeview tree="node">' +
                '               <span ng-transclude></span>' +
                '           </treeview>' +
                '       </li>' +
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
