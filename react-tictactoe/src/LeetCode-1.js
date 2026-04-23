// Isomorphic String : Chuỗi có trùng cấu trúc
// Cho hai chuỗi s và t, hãy xác định xem chúng có đẳng cấu hay không.


// Hai chuỗi s và t được gọi là đẳng cấu nếu các ký tự trong chuỗi s có thể được thay thế để tạo thành chuỗi t.

// Tất cả các lần xuất hiện của một ký tự phải được thay thế bằng một ký tự khác trong khi vẫn giữ nguyên thứ tự các ký tự. Không có hai ký tự nào có thể được ánh xạ tới cùng một ký tự, nhưng một ký tự có thể được ánh xạ tới chính nó.

// Example 1:

// Input: s = "egg", t = "add"

// Output: true

// Explanation:

// The strings s and t can be made identical by:

// Mapping 'e' to 'a'.
// Mapping 'g' to 'd'.
// Example 2:

// Input: s = "f11", t = "b23"

// Output: false

// Explanation:

// The strings s and t can not be made identical as '1' needs to be mapped to both '2' and '3'.

// Example 3:

// Input: s = "paper", t = "title"

// Output: true

var isIsomorphic = function(s,t){
    if(s.length !== t.length) {
        // console.log("loi");
        return false;
    }

    const mapS = {};    

    const mapT = {};

    for( let i = 0; i < s.length; i++) {
        const charS = s[i]
        const charT = t[i]
        
        console.log(mapS,mapT);
        if(mapS[charS]) {
            if(mapS[charS] !== charT) {
                return false;
            }
            console.log("check map", charS);            
        }    
        if(mapT[charT]) {
            if(mapS[charT] !== charS) {
                return false;
            }
        } 
        mapS[charS] = charT; 

        mapT[charT] = charS;       
    }
    
    return true;
}
const result = isIsomorphic("abc", "ffo");
console.log(result);
