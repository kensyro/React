// input = 3
// output
// [
//     [1,2,3],
//     [8,9,4],
//     [7,6,5]
// ]
function SpiralMatrix(n) {
    let result = []
    const matrix = Array.from({ length: n }, () => Array(n).fill(0));
    let top = 0;
    let bottom = n-1 ;
    let left = 0  ;
    let right = n-1;
    console.log(top,bottom,left,right);
    let index = 0;
    while(top <= bottom && left <= right) {
        // trái sang phải
        for(let i = left; i<= right; i++) {
            matrix[top][i] = ++index;
        }
        top++;
        // trên xuống dưới
        for(let i = top; i<= bottom; i++) {
            matrix[i][right] = ++index;
        }
        right--;
        // phải sang trái
        for(let i = right; i>= left; i--) {
            matrix[bottom][i] = ++index;
        }
        bottom--;
        // dưới lên trên
        for(let i = bottom; i >= top; i--) {
            matrix[i][left] = ++index;
        }
        left++;
        console.table(matrix);
    }
}
SpiralMatrix(3);
