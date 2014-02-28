# oci.treeview [![Build Status](https://secure.travis-ci.org/objectcomputing/oci.treeview.png)](http://travis-ci.org/objectcomputing/oci.treeview)

AngularJS tree directive supporting client supplied markup for tree nodes, and event handlers to add custom behavior when nodes are selected, such as on-demand loading, etc.

## Quick Start

Include the oci.treeview css and js files:

```html
<link rel="stylesheet" href="treeview.css">
<script src="treeview.js"></script>
```

Copy everything in the `dist` folder into your project and load the oci.treeview module as a dependency of your module:

```javascript
angular.module('myApp', ['oci.treeview']);
```

Put a tree with the following structure in scope:

```javascript
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
                    }
                ]
            }
        ]
    };
```

Use oci.treeview in your markup.  Custom markup gets transcluded into the rendering of each node of the tree:

```html
<div data-ng-controller="AppCtrl">
    <oci.treeview tree="treeData">
        <!--HTML to be transcluded-->
        <span class="myNodeClass">{{ tree.label }}</span>
    </oci.treeview>
</div>
```

## Tree Data Structure

The directive expects a tree with a single root node object with the following properties:

- label Label to display to the right of the icon
- children array of child node objects
- state (optional) the current state of the node, either 'collapsed', 'expanded' or leaf.  Defaults to 'collapsed', or 'leaf' if the node has no children.

## Custom Markup

Custom markup withing the oci.treeview element markup is transcluded for each node of the tree.  Inside the transcluded markup the scope variable 'tree' is the current node:

## Custom Callback Function (for on demand loading, etc.)

The on-select-node optional attribute can be used to pass a function in the current scope that will be called when a node is selected. It is called with the node being selected before node.state is changed. If the on-select-node function returns a promise, node.state is changed _after_ the promise resolves successfully.  This can be used to load data on demand when a collapsed node is selected, add the new data to tree, and wait to expand and display the sub-nodes until the data is loaded. If the promise resolves to an error the state is not changed.

```html
<oci.treeview tree="treeData" on-select-node="getMoreData">
    <span>{{tree.label}}</span>
</oci.treeview>
```

In the getMoreData function below we are assuming that '/tree-data/node-path' is a backend service that returns child nodes for the given parent node path, and that node.path contains the node's unique path (or identifier):

```javascript
$scope.getMoreData = function (node) {
    return $http.get('/tree-data/' + node.path).success(function (data) {
        node.children = data;
    });
};
```

## Select Node Event

When a node is selected, the 'nodeSelected' event is emitted.  This provides a simpler mechanism to do things like highlighting the selected node.  The event is emitted with the current node object and a tree context object passed as arguments.  The context object is a placehodler for state about the entire tree.

In the example below, when a node is selected we store it in the context, and set the node's class attribute to 'selectedNode'.  We also clear out the class attribute of any previously selected node first.

```javascript
    $scope.$on('nodeSelected', function (event, node, context) {
        if (context.selectedNode) {
            context.selectedNode.class = '';
        }

        node.class = 'selectedNode';
        context.selectedNode = node;
    });
```

We can then use the following CSS to color the selected node red:

```css
.selectedNode {
    color: red;
}
```

## Select Node Function

The `selectNode` function is in the transcluded markup scope and can be used to select (expand or collapse) the current node when something on the custom markup is selected (not just the icons):

```html
<oci.treeview tree="treeData" on-select-node="getMoreData">
    <!--HTML to be transcluded-->
    <span ng-click="selectNode(tree)">{{tree.label}}</span>
</oci.treeview>
```

## Demos

[Basic Demo](http://jsfiddle.net/LMFinney/Fvm43)

## Credits

The technique for included transcluded markup in each tree ndoe was adapted from http://jsfiddle.net/DsvX6/7/, which is explained in http://stackoverflow.com/questions/19125551/angularjs-understanding-a-recursive-directive

The icons and CSS were adapted from [angular.treeview](http://ngmodules.org/modules/angular.treeview).
