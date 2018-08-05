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

function Mean(array) //return mean from flatten array
/*
Mean([1,2,3,4])
2.5
*/
{
  var sum = array.reduce(function (total, value, index, array) {
    return total + value;
} );
  var mean = sum/array.length;
  return mean;
}

function StandardDeviation(array) //return standard deviaton of array
/*
StandardDeviation([1,2,3,4])
1.2909944487358056
*/
{
  return Variance(array)**0.5
}

function Variance(array) //return variance of array
/*
Variance([1,2,3,4])
1.6666666666666667
*/
{
  var mean = Mean(array)
  var squaredDiff = array.map(function (value, index, array) {return (value - mean)**2} );
  var sum = squaredDiff.reduce(function (total, value, index, array) {return total + value});
  return (sum/(array.length -1))
}
