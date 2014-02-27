(function () {
    'use strict';

    var module = angular.module('oci.treeview', []);

    module.controller('oci.treeview.ctrl', function ($scope) {
        $scope.selectNodeHead = function (selectedNode) {
            if (selectedNode.state === 'expanded') {
                selectedNode.state = 'collapsed';
            } else if (selectedNode.state === 'collapsed') {
                selectedNode.state = 'expanded';
            }
        };
    });

    module.directive("treeview", function ($compile) {
        // Adapted from http://jsfiddle.net/DsvX6/7/, which is explained in
        // http://stackoverflow.com/questions/19125551/angularjs-understanding-a-recursive-directive

        return {
            restrict: "E",
            transclude: true,
            scope: {tree: '='},
            controller: 'oci.treeview.ctrl',
            template:
                '<div class="tree">' +
                // Here we have one of the ng-transclude directives that will be given the HTML in the
                // element the directive is applied to.
                '   <span ng-transclude></span>' +
                '   <ul ng-if="tree.state === ' + "'expanded'" + '">' +
                '       <li ng-repeat="node in tree.children">' +
                '           <i ng-class="node.state" ng-click="selectNodeHead(node)"></i>' +
                '           <treeview tree="node">' +
                // Here is another ng-transclude directive which will be given the same transclude HTML as
                // above instance.
                // Notice that this is wrapped in another directive, 'treeview', which is same type of
                // directive this template belongs to. So the directive in the template will handle
                // the ng-transclude applied to the div as the transclude for the recursive compile
                // call to the tree directive.  The recursion will end when the ng-repeat above has
                // no children to walkthrough.  In other words, when we hit a leaf.
                '               <span ng-transclude></span>' +
                '           </treeview>' +
                '       </li>' +
                '   </ul>' +
                '</div>',
            compile: function (tElement, tAttr, transclude) {
                // We are removing the contents/innerHTML from the element we are going to be applying the
                // directive to and saving it to adding it below to the $compile call as the template
                var contents = tElement.contents().remove();
                var compiledContents;
                return function (scope, iElement) {

                    if (!compiledContents) {
                        // Get the link function with the contents from top level template with
                        // the transclude
                        compiledContents = $compile(contents, transclude);
                    }
                    // Call the link function to link the given scope and
                    // a Clone Attach Function, http://docs.angularjs.org/api/ng.$compile :
                    // "Calling the linking function returns the element of the template.
                    //    It is either the original element passed in,
                    //    or the clone of the element if the cloneAttachFn is provided."
                    compiledContents(scope, function (clone) {
                        // Appending the cloned template to the instance element, "iElement",
                        // on which the directive is to used.
                        iElement.append(clone);
                    });
                };
            }
        };
    });
})();
