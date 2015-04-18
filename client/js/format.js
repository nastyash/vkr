/**
 * Created by Anastasia on 11/04/15.
 */
function _printMinus(number, first, returnZero) {
    if (!number) {
        return returnZero ? '0' : null;
    }
    if (number < 0) {
        return '-' + number.toString();
    }
    return (first ? '+' : '') + number.toString();

}
//вывод на экран многочленов Лагранжа
function printLagrPolinoms(l) {
    var i, j, text_arr = [];
    for (i=0; i< l.length; i++) {
        var str = 'λ<sub>' + (i+1) + '</sub> = ';
        for (j=0; j < l[i].length; j++) {
            str = str + (_printMinus(l[i][j]) ? _printMinus(l[i][j], j == 0) + '*x<sub>' + (j+1) + '</sub> ' : ' ');
        }
        text_arr.push(str);
    }
    return text_arr.join('\n');
}
//вывод матрицы
function printMatrix(a) {
    var i, text_arr = [];
    for (i=0; i< a.length; i++) {
        text_arr.push(a[i].join(" "));
    }
    return text_arr.join('\n');
}
//вывод системы, которой задаётся симплекс
function printSimplexSystem(l) {
    var i, j, text_arr = [];
    for (i=0; i< l.length; i++) {
        var str = '';
        for (j=0; j < l[i].length - 1; j++) {
            str = str + (_printMinus(l[i][j]) ? _printMinus(l[i][j], j == 0) + '*x<sub>' + (j+1) + '</sub> ' : ' ');
        }
        str = str + ' ≥ ' + _printMinus(l[i][l.length-1], true, true);
        text_arr.push(str);
    }
    return text_arr.join('\n');
}




