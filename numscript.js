/* staticstics function to get more info from arrays
also visualisation of data in canvas
*/
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

function Normalize(array) // return array normalized from 0 to 1
/*
Normalize([1,2,3])
(3) [0, 0.5, 1]
Normalize([-1,2,3])
(3) [0, 0.75, 1]
Normalize([-5,2,3])
(3) [0, 0.875, 1]
*/
{
  var min = Math.min.apply(null, array);
  var max = Math.max.apply(null, array);
  var diff = max - min;
  var result = array.map(function (value, index, array)
  {
    return (value - min)/diff
  } );
  return result
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

function Median(array) //return median from array
/*Median([1,2])
1.5
Median([1])
1
Median([1,2,3])
2
Median([1,2,3,3])
2.5
Median([1,2,3,3,4])
3
Median([1,3,4,2,3])
3
*/
{
  array.sort();
  if (array.length%2 == 1)
  {
    return array[Math.round((array.length/2) - 1)]
  }
  if (array.length%2 == 0)
  {
    var med1 = array[(array.length/2) - 1];
    var med2 = array[(array.length/2)];
    return (med1 + med2)/2
  }
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

function Covariance(array1, array2) //return covariance of two arrays
/*
Covariance([1,2,3],[3,4,6])
1.5
*/
{
  var mean1 = Mean(array1);
  var mean2 = Mean(array2)
  var sum = 0;
  for ( i in array1)
  {
    sum += (array1[i] - mean1)*(array2[i] - mean2)
  }
  return sum/(array1.length - 1)
}

function Correlation(array1, array2) //returns correlation of two arrays
/*
Correlation([1,2,3],[2,3,4])
1
*/
{
  var covariance = Covariance(array1, array2);
  sd1 = StandardDeviation(array1);
  sd2 = StandardDeviation(array2);
  return covariance/(sd1*sd2)
}

function Frequency(array) //keys are unique elements in array and values are counts for elements
/*
Frequency([1,2,2,3,3,3])
{1: 1, 2: 2, 3: 3}
*/
{
  array.sort()
  var result = {}
  var uniqueArray = Array.from(new Set(array))
  for (i in uniqueArray) //find solution where this loop is not neccessary
  {
    result[uniqueArray[i]] = 0
   }
  for (i in array)
  {
    result[array[i]] += 1
   }
  return result
 }
    
function Histogram(array, CanvasId, color = "#592A71", padding = 0.95) //draw distribution for array in canvas
/*
array is array of numbers not continual values
try different setting color, padding
CanvasId is for iddentification of Canvas element
Needs to be done number of bins parameter for continuous values
*/
{
  var frequency = Frequency(array);
  var c = document.getElementById(CanvasId);
  var ctx = c.getContext("2d");
  ctx.fillStyle = color
  var width = c.width
  var height = c.height
  var values = Object.values(frequency)
  var keys = Object.keys(frequency)
  var max = Math.max.apply(null, values)
  var key_height = (height/max)* padding
  var key_width = width/values.length
  var small_diff = (key_width - (key_width * padding))/2
  var x = 0;
  for (i in keys)
  {
    var i_height = values[i] * key_height;
    ctx.fillRect(x + small_diff, height - (values[i]*key_height), key_width * padding, values[i]*key_height)
    x += key_width
  }
}

function ScatterPlot(array1, array2, CanvasId, color = "#592A71") //draw statterplot for array1 and array2
/*
CanvasId is for iddentification of Canvas element
Lots of work here 
*/
{
  var X = array1;
  var Y = array2;
  var c = document.getElementById(CanvasId);
  var ctx = c.getContext("2d");
  ctx.fillStyle = color
  var width = c.width
  var height = c.height
  var x_line = width * 0.05
  var y_line = height * 0.95
  ctx.beginPath();
  ctx.moveTo(x_line, height);
  ctx.lineTo(x_line, 0);
  ctx.moveTo(0, y_line);
  ctx.lineTo(width, y_line);
  ctx.stroke();
  var max_x = Math.max.apply(null, X);
  var min_x = Math.min.apply(null, X);
  var max_y = Math.max.apply(null, Y);
  var min_y = Math.min.apply(null, Y);
  var NormX = X.map(function (value, index, array) {return ((value/max_x) * (width*0.90)) + x_line});
  var NormY = Y.map(function (value, index, array) {return  (height - ((value/max_y)*height*0.90)) + (y_line*0.05)});
  for (i in NormX)
  {
    ctx.beginPath();
    ctx.arc(NormX[i], NormY[i], x_line/2, 0, 2 * Math.PI, false);
    ctx.fill(); 
    ctx.stroke()
  }
}

function Plot(array, CanvasId, color = "#592A71") //draw plot for array e.g time serie with constant distance between points
/*
CanvasId is for iddentification of Canvas element
Lots of work here 
*/
{
  var Y = array;
  var X = []
  var x = 1;
  for (i in Y)
  {
    X.push(x)
    x += 1
  }
  var c = document.getElementById(CanvasId);
  var ctx = c.getContext("2d");
  ctx.fillStyle = color
  ctx.strokeStyle = color
  var width = c.width
  var height = c.height
  var x_line = width * 0.05
  var y_line = height * 0.95
  var max_y = Math.max.apply(null, Y);
  var NormY  = Y.map(function (value, index, array) {return  height - (height * ((value*0.95)/max_y))});
  var NormX = X.map(function(value, index, array){ return (value/X.length)*width})
  console.log(NormY);
  console.log(NormX);
  var PosX = 0;
  var PosY = NormY[1];
  for  (i in NormY)
  {
    ctx.beginPath();
    ctx.moveTo(PosX, PosY);
    ctx.lineTo(NormX[i], NormY[i]);
    ctx.stroke()
    PosX = NormX[i]
    PosY = NormY[i]
  }
}

function PieChart(object, CanvasId) //generates PieChart with Random colors
/*
example of object = {'USA':5, 'Canada':3, 'China':4, 'Japan':2, 'Germany':2}
CanvasId is for Canvas selection
Need to do labels.
*/
{
  
var c = document.getElementById(CanvasId);
var ctx = c.getContext("2d");
var width = c.width
var height = c.height
var values = Object.values(object)
var sum = values.reduce(function (total, value, index, array) {return total + value} );
var sum = 2/sum
var min = Math.min.apply(null, [width/2, height/2])
var keys = Object.keys(object)
var NormValues = values.map(function(value, index, array){ return value * sum})
var startAngle = 0
for (i in keys)
  {
  var color = '#'+Math.random().toString(16).substr(-6);
  ctx.beginPath();
  ctx.moveTo(min, min);
  ctx.arc(min, min, min*0.90, startAngle* Math.PI, (startAngle + NormValues[i])* Math.PI, false);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill()
  /*ctx.beginPath()
  ctx.moveTo(min, min);
  var CPRadian = (startAngle + (NormValues[i]/2))* Math.PI
  console.log(CPRadian);
  ctx.lineTo(min + (Math.cos(CPRadian) * min), min + (Math.sin(CPRadian)*min));
  ctx.strokeStyle = color;
  ctx.stroke();
  */
  startAngle += NormValues[i];  
  }
}
