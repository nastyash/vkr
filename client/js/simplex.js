/**
 * Created by Anastasia on 28/01/15.
 */

var smplxApp = angular.module('smplxApp', ['ngSanitize']);


smplxApp.controller('ShowInputFields', ['$scope', function($scope) {
    $scope.smplxDim = 2;
    //renewFields($scope);
    $scope.$watch('smplxDim', function() {
        renewFields();
        $scope.vectorResult = false;
        return $scope.polynomsResult = false;
    });

    $scope.calculate = function() {
        calculate($scope);
    };

    $scope.calculateVector = function() {
        calculateVector($scope);
    };

    $scope.calculateV = function() {
        calculateV($scope);
    };

    function renewFields() {
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
        var a = getA(angular.copy($scope.vertices)), i = 0;
        var l = inverse(a);
        console.table(l);
        var d = findDiamters(l);
        var end_points = endPoints(l, a);
        var ksi = findKsi(l);
        var p = findP(l);
        var alpha = findAlpha(d);
        $scope.polynomsResult = {
          polynoms: l.map(function(e) {
            return renderResult(e).join('');
          }),
          d: d,
          endPoints: end_points,
          alpha: alpha,
          ksi: ksi,
          p: p,
          something: (p - 1) * ($scope.smplxDim + 1) / 2 + 1
        };
        if ($scope.smplxDim == 2) {
            var cnv = document.getElementById('myTriangle');
            var ctx = cnv.getContext('2d');
            var width = cnv.width;
            var height = cnv.height;
            ctx.clearRect ( 0 , 0 , width, height);
            for (var x = 0.5; x < width; x += 50) {
              ctx.moveTo(x, 0);
              ctx.lineTo(x, height);
            } 
            for (var y = 0.5; y < height; y += 50) {
              ctx.moveTo(0, y);
              ctx.lineTo(width, y);
            }
            ctx.strokeStyle = "#eee";
            ctx.stroke();

            
            ctx.beginPath();
            ctx.moveTo(0, height - 25);
            ctx.lineTo(width, height - 25);
            ctx.moveTo(width - 5, height - 20);
            ctx.lineTo(width, height - 25);
            ctx.lineTo(width - 5, height - 30);

            ctx.moveTo(50, height);
            ctx.lineTo(50, 0);
            ctx.moveTo(55, 5);
            ctx.lineTo(50, 0);
            ctx.lineTo(45, 5);
            ctx.strokeStyle = "#000";
            ctx.stroke(); 

            function getXCoord (x) {
                return x*200 + 50;
            };
            function getYCoord (y) {
                return height - 25 - y*200;
            };
            ctx.beginPath();
            ctx.moveTo(getXCoord(a[0][0]), getYCoord(a[0][1]));
            ctx.lineTo(getXCoord(a[1][0]), getYCoord(a[1][1]));
            ctx.lineTo(getXCoord(a[2][0]), getYCoord(a[2][1]));
            ctx.lineTo(getXCoord(a[0][0]), getYCoord(a[0][1]));
            ctx.strokeStyle = "#00f";
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(getXCoord(end_points[0][0][0]), getYCoord(end_points[0][0][1]));
            ctx.lineTo(getXCoord(end_points[1][0][0]), getYCoord(end_points[1][0][1]));
            ctx.moveTo(getXCoord(end_points[0][1][0]), getYCoord(end_points[0][1][1]));
            ctx.lineTo(getXCoord(end_points[1][1][0]), getYCoord(end_points[1][1][1]));
            ctx.strokeStyle = "#0f0";
            ctx.stroke(); 
        }

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
        $scope.vectorResult = {
            d: d,
            endPoints: ends,
            ksi: ksi
        };
        if ($scope.smplxDim == 2) {
            var cnv = document.getElementById('myVector');
            var ctx = cnv.getContext('2d');
            var width = cnv.width;
            var height = cnv.height;
            ctx.clearRect ( 0 , 0 , width, height);
            for (var x = 0.5; x < width; x += 50) {
              ctx.moveTo(x, 0);
              ctx.lineTo(x, height);
            } 
            for (var y = 0.5; y < height; y += 50) {
              ctx.moveTo(0, y);
              ctx.lineTo(width, y);
            }
            ctx.strokeStyle = "#eee";
            ctx.stroke();

            
            ctx.beginPath();
            ctx.moveTo(0, height - 25);
            ctx.lineTo(width, height - 25);
            ctx.moveTo(width - 5, height - 20);
            ctx.lineTo(width, height - 25);
            ctx.lineTo(width - 5, height - 30);

            ctx.moveTo(50, height);
            ctx.lineTo(50, 0);
            ctx.moveTo(55, 5);
            ctx.lineTo(50, 0);
            ctx.lineTo(45, 5);
            ctx.strokeStyle = "#000";
            ctx.stroke(); 

            function getXCoord (x) {
                return x*200 + 50;
            };
            function getYCoord (y) {
                return height - 25 - y*200;
            };

            ctx.beginPath();
            ctx.moveTo(getXCoord(a[0][0]), getYCoord(a[0][1]));
            ctx.lineTo(getXCoord(a[1][0]), getYCoord(a[1][1]));
            ctx.lineTo(getXCoord(a[2][0]), getYCoord(a[2][1]));
            ctx.lineTo(getXCoord(a[0][0]), getYCoord(a[0][1]));
            ctx.strokeStyle = "#00f";
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(getXCoord(0), getYCoord(0));
            ctx.lineTo(getXCoord(v[0]), getYCoord(v[1]));
            ctx.strokeStyle = "#0f0";
            ctx.stroke(); 
            ctx.beginPath();
            ctx.moveTo(getXCoord(ends[0][0]), getYCoord(ends[0][1]));
            ctx.lineTo(getXCoord(ends[1][0]), getYCoord(ends[1][1]));
            ctx.strokeStyle = "#f00";
            ctx.stroke(); 
        }

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
    function drowAxes(name) {
            var cnv = document.getElementById(name);
            var ctx = cnv.getContext('2d');
            var width = cnv.width;
            var height = cnv.height;
            
            for (var x = 0.5; x < width; x += 50) {
              ctx.moveTo(x, 0);
              ctx.lineTo(x, height);
            } 
            for (var y = 0.5; y < height; y += 50) {
              ctx.moveTo(0, y);
              ctx.lineTo(width, y);
            }
            ctx.strokeStyle = "#eee";
            ctx.stroke();

            
            ctx.beginPath();
            ctx.moveTo(0, height - 25);
            ctx.lineTo(width, height - 25);
            ctx.moveTo(width - 5, height - 20);
            ctx.lineTo(width, height - 25);
            ctx.lineTo(width - 5, height - 30);

            ctx.moveTo(50, height);
            ctx.lineTo(50, 0);
            ctx.moveTo(55, 5);
            ctx.lineTo(50, 0);
            ctx.lineTo(45, 5);
            ctx.strokeStyle = "#000";
            ctx.stroke(); 
    }
    function getXCoord (x) {
        return x*200 + 50;
    }
    function getYCoord (y) {
        return height - 25 - y*200;
    }

     renderResult = function(a) {
      return a.map(function(e, index) {
        if (index === 0) {
          return e + "*x<sub>" + (index + 1) + "</sub>";
        } else {
          if (e >= 0) {
            return " + " + e + "*x<sub>" + (index + 1) + "</sub>";
          } else {
            return " - " + (Math.abs(e)) + "*x<sub>" + (index + 1) + "</sub>";
          }
        }
      });
    };
    }
]);

