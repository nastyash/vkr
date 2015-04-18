/**
 * Created by Anastasia on 28/01/15.
 */

var smplxApp = angular.module('smplxApp', []);


smplxApp.controller('ShowInputFields', ['$scope', function($scope) {
    $scope.smplxDim = 2;
    //renewFields($scope);
    $scope.$watch('smplxDim', function(){renewFields($scope);});


    $scope.calculate = function() {
        calculate($scope);
    };

    $scope.calculateVector = function() {
        calculateVector($scope);
    };

    $scope.calculateV = function() {
        calculateV($scope);
    };

    function renewFields($scope) {
        var dim = $scope.smplxDim,
            vertices = [],
            vertex = [],
            vector = [],
            v = [];
            i = 0, j = 0;
        for (i = 0; i <= dim; i++) {
            v[i] = [];
            vertex = new Array(dim);
            for (j = 0; j < dim; j++) {
                vector[j] = 0;
                vertex[j] = 0;
                v[i][j] = 0;
            }
            vertices.push(vertex);
        }
        v.pop();
        $scope.vertices = vertices;
        $scope.vector = vector;
        $scope.v = v;
    }
    function calculate($scope) {
        //console.table($scope.vertices);
        var a = getA(angular.copy($scope.vertices)), i = 0;
        //console.log(math.det(math.matrix(matrix)));
        //console.table(transpose(matrix));
        //console.table(inverse(matrix));
        //матрица с коэффициентами Лагранжа
        var l = inverse(a);
        console.table(l);
        var d = findDiamters(l);
        var end_points = endPoints(l, a);
        var ksi = findKsi(l);
        var p = findP(l);
        var alpha = findAlpha(d);
        console.table(d);
        console.table(end_points);
        console.log(alpha, ksi, (p-1) * ($scope.smplxDim + 1)/2 + 1);

    }
    function calculateVector($scope) {
        var a = getA(angular.copy($scope.vertices)),
            v = angular.copy($scope.vector),
            l = inverse(a), d, ends, ksi;
        d = findVectorD(l, v);
        ends = vectorEndPoints(a, l, v);
        ksi = findVectorKsi(l ,v, a);
        console.table(d);
        console.table(ends);
        console.log(ksi);
    }
    function calculateV($scope) {
        var a = getA(angular.copy($scope.vertices)),
            v = angular.copy($scope.v),
            l = inverse(a), alpha, x, barC;
        alpha = findVAlpha(l, v);
        x = findX(l, a);
        barC = findBarycentricCoords(l, x);
        console.log(alpha);
        console.table(x);
        console.table(barC);

    }
}
]);

