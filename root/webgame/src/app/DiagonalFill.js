n = 4
[
    [ 1,  2,  4,  7],
    [ 3,  5,  8, 11],
    [ 6,  9, 12, 14],
    [10, 13, 15, 16]
]

function DiagonalFill(n) {
    const matrix = Array.from({ length: n }, () => []);
    let hang = 0;
    let cot = 0;
    for(let index = 1; index <= n*n ; index++) {
        matrix[hang][cot] = index;
        if(cot === 0) {
            hang = 0
        } else {
            hang +=1
        }
    }
    console.log(matrix);
}
DiagonalFill(4);