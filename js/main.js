'use strict'

var canvasWidth;
var canvasHeight;

window.onload = function ()
{
	// canvas init
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var maxParticles = 60;
	var particles = [];
	var particleWith = 6;
	var particleHeight = 20;
	var rndm = Math.random;
	var abs = Math.abs;
	var min = Math.min;
	var max = Math.max;
	var sin = Math.sin;
	var cos = Math.cos;

	canvas.width = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;

	canvasWidth = canvas.width;
	canvasHeight = canvas.height;

/*
         ..p2
    p1.    .
    .     .
   .     .
  .     .
 .   .p3
p4.

*/

	for (var i = 0; i < maxParticles; i++)
	{
		var startX = rounded( rndm()*canvasWidth );
		var startY = rounded( rndm()*canvasHeight );

		var p1 = {x:startX,  y:startY};
		var p2 = {x:rounded( p1.x +rndm()*particleWith +1  ),     y:rounded( p1.y -rndm()*particleWith   )};
		var p3 = {x:rounded( p2.x +rndm()*particleWith +1  ),     y:rounded( p2.y +rndm()*particleHeight )};
		var p4 = {x:rounded( p3.x -(rndm()*particleWith +1 )),    y:rounded( p3.y +rndm()*particleWith   )};

		particles.push({
			x: startX, // use midpoint instead?
			y: startY,
			pt1: p1,
			pt2: p2,
			pt3: p3,
			pt4: p4,
			width:abs(min(p1.x, p4.x) -max(p2.x, p3.x)),
			height:abs(min(p1.y, p2.y) -max(p3.y, p4.y)),
			rotation:rndm()*Math.PI*2,
			rotationSpeed:rndm()*.1,
			r: rndm()*4 + 1,
			d: rndm()* maxParticles
		});
	}

	// draws the particles
	function draw()
	{
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);
		ctx.fillStyle = "rgb(255, 0, 255)"; // for the bg (this can be used for debug purposes)
		ctx.fillRect(0, 0, canvasWidth, canvasHeight);
		
		ctx.fillStyle = "rgb(255, 255, 255)"; // for the flakes
		ctx.beginPath();

		for (var i = 0; i < maxParticles; i++)
		{
			var p = particles[i];

			ctx.save();
			ctx.translate(rounded(p.pt1.x +p.width*.5), rounded(p.pt2.y +p.height*.5));
			ctx.rotate(rounded(p.rotation));
			ctx.translate(rounded(-(p.pt1.x +p.width*.5)), rounded(-(p.pt2.y +p.height*.5)));

			ctx.moveTo(rounded(p.pt1.x), rounded(p.pt1.y));
			ctx.lineTo(rounded(p.pt2.x), rounded(p.pt2.y));
			ctx.lineTo(rounded(p.pt3.x), rounded(p.pt3.y));
			ctx.lineTo(rounded(p.pt4.x), rounded(p.pt4.y));
			ctx.fill();

			ctx.restore();
		}

		update();
	}

	var angle = 0;
	var xIncrement;
	var yIncrement;

	function update()
	{
		angle += .1;
		for (var i = 0; i < maxParticles; i++)
		{
			// update x/y coordinates
			var p = particles[i];
			xIncrement = sin(angle +p.d *.5);
			yIncrement = cos(angle+p.d)+1 +p.r *3;

			p.rotation += p.rotationSpeed;

			p.pt1.x += xIncrement;
			p.pt1.y += yIncrement;

			p.pt2.x += xIncrement;
			p.pt2.y += yIncrement;

			p.pt3.x += xIncrement;
			p.pt3.y += yIncrement;

			p.pt4.x += xIncrement;
			p.pt4.y += yIncrement;

			if (p.pt1.x > canvasWidth+5 || p.pt1.x +p.width < -5 || min(p.pt1.y, p.pt2.y) > canvasHeight+5)
			{
				p.pt1.x = rndm()*canvasWidth;
				p.pt1.y = -p.height *1.5;

				p.pt2.x = p.pt1.x +rndm()*particleWith +1;
				p.pt2.y = p.pt1.y -rndm()*particleWith;

				p.pt3.x = p.pt2.x +rndm()*particleWith +1;
				p.pt3.y = p.pt2.y +rndm()*particleHeight;

				p.pt4.x = p.pt3.x -(rndm()*particleWith +1);
				p.pt4.y = p.pt3.y +rndm()*particleWith;

				p.width = abs(min(p.pt1.x, p.pt4.x) -max(p.pt2.x, p.pt3.x));
				p.height = abs(min(p.pt1.y, p.pt2.y) -max(p.pt3.y, p.pt4.y));

				p.r = rndm()*4 + 1;
				p.d = rndm()* maxParticles;
				p.rotationSpeed = rndm()*.1;
			}
		}
	}

	// turns a floating pt number into an integer quickly
	function rounded(n) { return (n+.5) | 0;}
	
	setInterval(draw, 30);
}

window.onresize = function () {
	//var canvas = document.getElementById("canvas");
	canvasWidth = document.getElementById("canvas").offsetWidth;
	canvasHeight = document.getElementById("canvas").offsetHeight;
};
