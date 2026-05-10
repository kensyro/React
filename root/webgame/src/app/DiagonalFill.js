n = 4
[
    [ 1,  2,  4,  7],
    [ 3,  5,  8, 11],
    [ 6,  9, 12, 14],
    [10, 13, 15, 16]
]
// Đi từ 1,2,4
// Đi tử 3,5

function DiagonalFill(n) {
    const matrix = Array.from({ length: n }, () => []);
    let hang = 0;
    let achor = 0;
    for(let index = 1; index <= n*n ; index++) {
        if(matrix[hang].length === n) {
            achor += 1;
            hang = achor;
        }
        matrix[hang].push(index);
        console.log({hang,achor,index},matrix);
        if(matrix[hang].length === 1 || hang === n-1) {
            hang = achor;
        }else {
            hang += 1;
        }
    }
    
    return matrix;
}
console.log(DiagonalFill(4));