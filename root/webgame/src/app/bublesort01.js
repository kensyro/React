// [1,2,3,4,5,8,9,10]
// [7,8,10];
function bubleSort(arr) {
    let result = [...arr];
    let n = result.length;
    let length = n-1;
    while (length >= 0) {
        let i = 0;
        while (i < length) {
            if(result.at(i) > result.at(i+1)) {
                [result[i], result[i+1]] = [result[i+1], result[i]]
                console.log(result);
            }
            i++ 
        }
        length--;
    }
    return result;
}
var hi = [1,2,3,4, -1, -3, 22, 55, -99, 88];
console.log("ARR", bubleSort(hi));


