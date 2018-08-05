function Reshape(array, reshape){ // change shape of flatten array
/*
Reshape([1,2,3,4],2)
[[1,2],[3,4]]
*/
  var arrayReshaped = []
  var i = 0;
  while (i < array.length) {
    arrayReshaped.push(array.slice(i, i += reshape));
  }
  return arrayReshaped}
