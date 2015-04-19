function transpose(a) {
    return a[0].map(function (v, i) {
        return a.map(function (r, j) {
            return a[j][i];
        });
    });
}

function getA(m) {
    for (i in m) {
        m[i].push(1);
    }
    return m;
}

function _determinant(A)
{
    var N = A.length, B = [], denom = 1, exchanges = 0;
    for (var i = 0; i < N; ++i) {
        B[i] = [];
        for (var j = 0; j < N; ++j) B[i][j] = A[i][j];
    }
    for (var i = 0; i < N - 1; ++i) {
        var maxN = i, maxValue = Math.abs(B[i][i]);
        for (var j = i + 1; j < N; ++j) {
            var value = Math.abs(B[j][i]);
            if (value > maxValue) {
                maxN = j;
                maxValue = value;
            }
        }
        if (maxN > i) {
            var temp = B[i];
            B[i] = B[maxN];
            B[maxN] = temp;
            ++exchanges;
        }
        else {
            if (maxValue == 0) return maxValue;
        }
        var value1 = B[i][i];
        for (var j = i + 1; j < N; ++j) {
            var value2 = B[j][i];
            B[j][i] = 0;
            for (var k = i + 1; k < N; ++k)
                B[j][k] = (B[j][k] * value1 -
                    B[i][k] * value2) / denom;
        }
        denom = value1;
    }
    if (exchanges % 2) return -B[N - 1][N - 1];
    else return B[N - 1][N - 1];
}

function _matrixCofactor(i, j, A)
{
    var N = A.length, sign = ((i + j) % 2 == 0) ? 1 : -1;
    for (var m = 0; m < N; m++) {
        for (var n = j + 1; n < N; n++) A[m][n - 1] = A[m][n];
        A[m].length--;
    }
    for (var k = i + 1; k < N; k++) A[k - 1] = A[k];
    A.length--;
    return sign * _determinant(A);
}

function _adjugateMatrix(A)
{
    var N = A.length, B = [], adjA = [];
    for (var i = 0; i < N; i++) {
        adjA[i] = [];
        for (var j = 0; j < N; j++) {
            for (var m = 0; m < N; m++) {
                B[m] = [];
                for (var n = 0; n < N; n++) B[m][n] = A[m][n];
            }
            adjA[i][j] = _matrixCofactor(j, i, B);
        }
    }
    return adjA;
}

function inverse(A)
{
    var det = _determinant(A);
    if (det == 0) return false;
    var N = A.length, a = _adjugateMatrix(A);
    for (var i = 0; i < N; i++) {
        for (var j = 0; j < N; j++) {
            a[i][j] /= det;
            a[i][j] = a[i][j] || 0;
        }
    }
    return a;

}

function ifPointIntoSimplex(l, p) {
    var i, j, arr = [];
    for (i = 0; i < l.length; i++) {
        var t = 0;
        for (j = 0; j < l[i].length; j++) {
            t = t + l[i][j] * p[j] ? p[j] : 1;
        }
        arr.push(t);
    }
    for (i in arr) {
        if (arr[i] < 0) {
            return -1;
        }
        else if (arr[i] == 0) {
            return 0;
        }
    }
    return 1;
}

function findDiamters(l) {
    var d = [], i = 0, j = 0;
    for (i = 0; i < l.length - 1; i++) {
        d[i] = 0;
        for (j = 0; j < l[i].length; j++) {
            d[i] += Math.abs(l[i][j]);
        }
        d[i] = 2 / d[i];
    }
    return d;
}

function _findSum(l) {
    var i, j, result = [];
    for (i = 0; i < l.length - 1; i++) {
        var sum = 0;
        for (j = 0; j < l[i].length; j++) {
            sum += Math.abs(l[i][j]);
        }
        result.push(sum);
    }
    return result;
}

function _findSOrT(el, s) {
    if (s) {
        return (Math.abs(el) + el);
    }
    return (Math.abs(el) - el);
}

function endPoints(l, a) {
    var sum = _findSum(l), i, j, k, s = [],
        t = [], result = [], n = l.length;
    for (i = 0; i < n - 1; i++) {
        s[i] = [];
        t[i] = [];
        for (j = 0; j < n; j++) {
            s[i][j] = (s[i][j] || 0) + _findSOrT(l[i][j], true);
            t[i][j] = (t[i][j] || 0) + _findSOrT(l[i][j]);
        }
        s[i] = s[i].map(function (num) {
            return num / sum[i]
        });
        t[i] = t[i].map(function (num) {
            return num / sum[i]
        });
    }
    result = [[], []];
    for (k = 0; k < n - 1; k++) {
        result[0][k] = [];
        result[1][k] = [];
        for (i = 0; i < n - 1; i++) {
            for (j = 0; j < n; j++) {
                result[0][k][i] =
                    (result[0][k][i] || 0) + s[i][j] * a[j][k];
                result[1][k][i] =
                    (result[1][k][i] || 0) + t[i][j] * a[j][k];
            }
        }
    }
    return result;
}

function _getQ(n, f) {
    var i, j, arr = [], m = Math.pow(2, n - 1);
    for (i = 0; i < m; i++) {
        arr.push([]);
        var m_2 = i.toString(2);
        if (m_2.length < n - 1) {
            var l = m_2.length;
            for (j = l; j < n - 1; j++) {
                m_2 = '0' + m_2;
            }
        }
        for (j = 0; j < n - 1; j++) {
            arr[i].push(f && !parseInt(m_2[j]) ? -1
                : parseInt(m_2[j]));
        }
    }
    return arr;
}

function findKsi(l) {
    var q = _getQ(l.length), i, k, j, arr = [], lambda = [];
    for (i = 0; i < l.length; i++) {
        lambda[i] = [];
        for (j = 0; j < q.length; j++) {
            lambda[i][j] = 0;
            for (k = 0; k < l.length; k++) {
                lambda[i][j] += l[k][i] *
                (q[j] == undefined ||
                    (q[j][k] == undefined) ? 1 : q[j][k])
            }
        }
    }
    for (i = 0; i < lambda.length; i++) {
        lambda[i] = lambda[i].map(function (num) {
            return -num;
        });
        arr[i] = Math.max.apply(Math, lambda[i]);
    }
    return l.length * Math.max.apply(Math, arr) + 1;
}

function findP(l) {
    var q = _getQ(l.length), i, k, j, arr = [], lambda = [];
    for (i = 0; i < l.length; i++) {
        lambda[i] = [];
        for (j = 0; j < q.length; j++) {
            lambda[i][j] = 0;
            for (k = 0; k < l.length; k++) {
                lambda[i][j] += l[k][i] *
                (q[j] == undefined ||
                    (q[j][k] == undefined) ? 1 : q[j][k])
            }
        }
    }
    for (i = 0; i < lambda[0].length; i++) {
        for (j = 0; j < l.length; j++)
            arr[i] = (arr[i] || 0) + Math.abs(lambda[j][i]);
    }
    return Math.max.apply(Math, arr);
}

function findAlpha(d) {
    var i, a = 0;
    for (i = 0; i < d.length; i++) {
        a += 1 / d[1];
    }
    return a;
}

function _findM(l, v) {
    var i, j, m = [];
    for (i = 0; i < l.length; i++) {
        m[i] = 0;
        for (j = 0; j < v.length; j++) {
            m[i] += v[j] * l[j][i];
        }
    }
    return m;
}

function _findMSum(m) {
    for (var s = 0, k = m.length; k; s += Math.abs(m[--k]));
    return s;
}

function vectorEndPoints(a, l, v) {
    var m = _findM(l, v), sum = _findMSum(m), i, j,
        k, alpha = [], beta = [], result = [[], []],
        n = l.length;
    for (i = 0; i < n; i++) {
        alpha[i] = _findSOrT(m[i]) / sum;
        beta[i] = _findSOrT(m[i], true) / sum;
    }
    for (k = 0; k < n - 1; k++) {
        for (j = 0; j < n; j++) {
            result[0][k] = (result[0][k] || 0) +
                alpha[j] * a[j][k];
            result[1][k] = (result[1][k] || 0) +
                beta[j] * a[j][k];
        }
    }
    return result;
}

function _findVectorNorm(v) {
    var sum = 0;
    for (var i = 0; i < v.length; i++) {
        sum += v[i] * v[i];
    }
    return Math.sqrt(sum);
}

function findVectorD(l, v) {
    var m = _findM(l, v), sum = _findMSum(m),
        norm = _findVectorNorm(v);
    return (2 * norm) / sum;
}

function findVectorKsi(l, v, a) {
    var m = _findM(l, v), sum = _findMSum(m),
        norm = _findVectorNorm(v), det = _determinant(a),
        f = [1, 1, 2, 6, 24, 120, 720, 5040, 40320,
            362880, 3628800, 39916800, 479001600];
    return (det * sum) / (norm * 2 * f[v.length - 1]);
}

function findVAlpha(l, v) {
    var i, j, result = 0;
    for (i = 0; i < v.length; i++) {
        result += _findVectorNorm(v[i]) / findVectorD(l, v[i]);
    }
    return result;
}

function findX(l, a) {
    var i, j, k, sum = 0, result = [];
    for (i = 0; i < l.length; i++) {
        for (j = 0; j < l.length - 1; j++) {
            sum += Math.abs(l[j][i]);
        }
    }
    for (k = 0; k < l.length - 1; k++) {
        result[k] = 0;
        for (i = 0; i < l.length; i++) {
            for (j = 0; j < l.length - 1; j++) {
                result[k] += Math.abs(l[j][i]) * a[i][k];
            }
        }
    }
    result = result.map(function (num) {
        return num / (sum - 2)
    });
    return result;
}

function findBarycentricCoords(l, x) {
    var i, j, result = [];
    for (i = 0; i < l.length; i++) {
        result[i] = 0;
        for (j = 0; j < l[i].length; j++) {
            result[i] += l[j][i] * (x[j] == undefined ? 1 : x[j]);
        }
    }
    return result;
}



