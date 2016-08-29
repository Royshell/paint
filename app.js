var example = document.getElementById('example');
var context = example.getContext('2d');
context.fillStyle = "rgb(255,0,0)";
context.fillRect(0, 0, 50, 50);
context.fillStyle = "rgb(0,0,255)";
context.fillRect(305, 0, 50, 50);

var chosenColor = 'rgb(0,0,0)';
var chosenFunction = dotsColor;

var chosens =[chosenColor,chosenFunction];
console.log(chosens);

$('#example').mousemove(function(e) {
    var pos = findPos(this);
    var x = e.pageX - pos.x;
    var y = e.pageY - pos.y;
    var coord = "x=" + x + ", y=" + y;
    var c = this.getContext('2d');
    var p = c.getImageData(x, y, 1, 1).data; 
    console.log('rgb('+p[0] +',' + p[1] + ',' + p[2]+')');
    var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
    $('#status').html(coord + "<br>" + hex);
});

// $('#example').on('click', function(e) {
//     var pos = findPos(this);
//     var x = e.pageX - pos.x;
//     var y = e.pageY - pos.y;
//     var coord = "x=" + x + ", y=" + y;
//     var c = this.getContext('2d');
//     c.fillStyle =  "rgb(0,0,0)";
//     context.fillRect(x, y, 1, 1);
//  	preventDefault();
// });
if ( chosens[1].name != 'bgColor') {
    $('#example').on('mousedown click', function(e) {
    	// $('#example').on('mousemove', function (e) {
     //                var pos = findPos(this);
     //                var x = e.pageX - pos.x;
     //                var y = e.pageY - pos.y;
     //                var c = this.getContext('2d');
     //                var p = c.getImageData(x, y, 1, 1).data; 
     //                var nodeColor = 'rgb(' + p[0] + ',' + p[1] + ',' + p[2] + ')';
     //                chosens[1](this, x, y, chosens[0], nodeColor);
     //                $('#example').on('mouseup',function (e) {
     //                	$('#example').off('mousemove click');
     //                });
     // 	//bgColor(this, x, y, pColor,nodeColor); 
     // 	});
    });
} else {
     $('#example').on('click', function(e) {
            var pos = findPos(this);
            var x = e.pageX - pos.x;
            var y = e.pageY - pos.y;
            var c = this.getContext('2d');
            var p = c.getImageData(x, y, 1, 1).data; 
            var nodeColor = 'rgb(' + p[0] + ',' + p[1] + ',' + p[2] + ')';
            chosens[1](this, x, y, chosens[0], nodeColor);
            console.log("this, x, y, chosens[0], nodeColor");
           $('#example').on('mouseup',function (e) {
                $('#example').off('click mouseup mousemove');
            });
      });
}
$('#color-wrapper td').on('click',function () {
    chosens[0] =$(this).css("background-color");
    console.log($(this).css("background-color"));
});
$('#function-wrapper td').on('click',function () {
    chosens[1] = window[$(this).attr("class")];
    console.log(chosens);
});
function dotsColor(canvas, x, y, pColor) {
	var c = canvas.getContext('2d');
            c.fillStyle = pColor; //red
            c.beginPath();
            c.arc(x,y,5,0,Math.PI*2,true);
            c.closePath();
            c.fill();
}

/* connect algotrithm
function dotsColor(canvas, x, y, pColor) {
    var c = canvas.getContext('2d');
    c.fillStyle =  pColor;
    //context.fillRect(x, y, 5, 5);
            c.arc(x,y,0 ,0,1.5*Math.PI) 
            //c.fillStyle = 'green';
            c.strokeStyle = '#003300';
            c.stroke();
}
*/

function bgColor(canvas, x, y, pColor, nodeColor) {
    console.warn('here');
	var c = canvas.getContext('2d');
	var p = c.getImageData(x, y, 1, 1).data; 
            var currentColor = 'rgb(' + p[0] +',' + p[1] + ',' + p[2]+')';
            if (pColor == currentColor || currentColor != nodeColor) {
            	return;
            } else {
            	c.fillStyle =  pColor;
            	context.fillRect(x, y, 1, 1);
            	bgColor(canvas, x+1, y, pColor, nodeColor); 
            	bgColor(canvas, x-1, y, pColor, nodeColor); 
            	bgColor(canvas, x, y+1, pColor, nodeColor); 
            	bgColor(canvas, x, y-1, pColor, nodeColor); 
            }
}

function findPos(obj) {
    var curleft = 0, curtop = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return { x: curleft, y: curtop };
    }
    return undefined;
}

function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}