(function () {
    'use strict';

    describe('treeview directive', function () {
        beforeEach(module('oci.treeview'));

        var compile;
        var rootScope;

        beforeEach(inject(function ($compile, $rootScope) {
            compile = $compile;
            rootScope = $rootScope;
        }));

        it('should render nested tree', function () {
            var treeFamily = {
                name : "Parent",
                children: [{
                    name : "Child1",
                    children: [{
                        name : "Grandchild1",
                        children: []
                    },{
                        name : "Grandchild2",
                        children: []
                    },{
                        name : "Grandchild3",
                        children: []
                    }]
                }, {
                    name: "Child2",
                    children: []
                }]
            };
//            var treeData = [
//                {
//                    label: "item one",
//                    path: "/itemOne/",
//                    collapsed: true,
//                    complete: false,
//                    children: [
//                        {
//                            label: "item one child one",
//                            path: "/itemOne/childOne/",
//                            collapsed: true,
//                            complete: false
//                        }
//                    ]
//                },
//                {
//                    label: "item two",
//                    path: "/itemTwo",
//                    collapsed: true,
//                    complete: false,
//                    children: []
//                }
//            ];

            var elem = angular.element('<tree family="treeFamily"> <!--HTML to be transcluded--> <p>{{ family.name }}</p> </tree>');
//            var elem = angular.element('<treeview id="treeId" family="treeData" item="activeItem"><span>YO</span></treeview>');
            rootScope.treeFamily = treeFamily;
            compile(elem)(rootScope);
            rootScope.$digest();

            console.log(elem);

            var labels = elem.find('div>ul>li>span');
            expect(labels.length).toBe(3);
            expect(labels.eq(0).text()).toBe('item one');
            expect(labels.eq(1).text()).toBe('item one child one');
            expect(labels.eq(2).text()).toBe('item two');

            var childLabels = elem.find('div>ul>li>div div>ul>li>span');
            expect(childLabels.length).toBe(1);
            expect(childLabels.eq(0).text()).toBe('item one child one');
        });
    });
})();
