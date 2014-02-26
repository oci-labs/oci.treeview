(function () {
    'use strict';

    angular.module('oci.treeview', [])
        .directive('treeview', function ($compile) {
            function TreeViewController($scope) {
                $scope.context = $scope.context || {};

                $scope.iconClass = function (node) {
                    var hasChildren = $scope.hasChildren(node);

                    if (hasChildren) {
                        return node.collapsed ? 'collapsed' : 'expanded';
                    } else {
                        return 'normal';
                    }
                };

                $scope.selectNodeHead = function (selectedNode) {
                    if (!$scope.hasChildren(selectedNode)) {
                        return;
                    }

                    selectedNode.collapsed = !selectedNode.collapsed;
                };

                $scope.hasChildren = function (node) {
                    return node.children !== undefined && node.children.length > 0;
                };
            }

            function link(scope, elem) {
                var template =
                    '<div class="tree">' +
                        '<ul>' +
                            '<li ng-repeat="node in tree">' +
                                '<i ng-class="iconClass(node)" ng-click="selectNodeHead(node)"></i>' +
                                '<span ng-class="node.selected">{{node.label}}</span>' +
                                '<div ng-if="node.children && node.children.length" ng-hide="node.collapsed">' +
                                    '<treeview id="id" tree="node.children" item="item" context="context"></treeview>' +
                                '</div>' +
                            '</li>' +
                        '</ul>' +
                    '</div>';

                $compile(template)(scope, function (clone) {
                    elem.append(clone);
                });
            }

            return {
                controller: TreeViewController,
                restrict: 'E',
                scope: {
                    id: '@id',
                    tree: '=',
                    item: '=',
                    context: '=?'
                },
                link: link
            };
        });
})();
