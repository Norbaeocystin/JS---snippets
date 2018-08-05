function Reshape(array, reshape)// change flatten array to nested array
/*
Reshape([1,2,3,4],2)
[[1,2],[3,4]]
*/
{ 
  var arrayReshaped = []
  var i = 0;
  while (i < array.length) 
  {
    arrayReshaped.push(array.slice(i, i += reshape));
  }
  return arrayReshaped;
}

function Flatten(array) // flatten nested array
/*
Flatten([[1,2],[3,4]])
[1,2,3,4]
*/
{
  var Flattened = [];
  for (subarray in array)
  { 
    Flattened = Flattened.concat(array[subarray])
  }
return Flattened
}
