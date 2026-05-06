const indexPivot = -1

function quicSort(arr) {
    if(arr.length <= 1) {
        return arr;
    }
    const pivot = arr.splice(indexPivot)[0];
    const small = [];
    const big = [];
    for(let i = 0; i< arr.length ; i++){
        if(arr[i] <= pivot) {
            small.push(arr[i]);
        }else {
            big.push(arr[i]);
        }
    }
    return [...quicSort(small), pivot,...quicSort(big)];
}

console.log("Test", quicSort([1,4,2,3,7,4,5,2]));