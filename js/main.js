'use strict'

window.onload = function ()
{
	// canvas init
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var maxParticles = 50;
	var particles = [];
	var particleWith = 7;
	var particleHeight = 23;

	canvas.width = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;

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
		var startX = Math.random()*canvas.width;
		var startY = Math.random()*canvas.height;

		var p1 = {x:startX,  y:startY};
		var p2 = {x:p1.x +Math.random()*particleWith +1,     y:p1.y -Math.random()*particleWith};
		var p3 = {x:p2.x +Math.random()*particleWith +1,     y:p2.y +Math.random()*particleHeight};
		var p4 = {x:p3.x -(Math.random()*particleWith +1),   y:p3.y +Math.random()*particleWith};

		particles.push({
			x: startX, // use midpoint instead?
			y: startY,
			pt1: p1,
			pt2: p2,
			pt3: p3,
			pt4: p4,
			width:Math.abs(Math.min(p1.x, p4.x) -Math.max(p2.x, p3.x)),
			height:Math.abs(Math.min(p1.y, p2.y) -Math.max(p3.y, p4.y)),
			rotation:Math.random()*Math.PI*2,
			rotationSpeed:Math.random()*.1,
			r: Math.random()*4 + 1,
			d: Math.random()* maxParticles
		});
	}

	// draws the particles
	function draw()
	{
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		//ctx.fillStyle = "rgb(255, 0, 255)"; // for the bg (this can be used for debug purposes)
		//ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = "rgba(255, 255, 255, .8)"; // for the flakes
		ctx.beginPath();

		for (var i = 0; i < maxParticles; i++)
		{
			var p = particles[i];

			ctx.save();
			ctx.translate(p.pt1.x +p.width*.5, p.pt2.y +p.height*.5);
			ctx.rotate(p.rotation);
			ctx.translate(-(p.pt1.x +p.width*.5), -(p.pt2.y +p.height*.5));

			ctx.moveTo(p.pt1.x, p.pt1.y);
			ctx.lineTo(p.pt2.x, p.pt2.y);
			ctx.lineTo(p.pt3.x, p.pt3.y);
			ctx.lineTo(p.pt4.x, p.pt4.y);
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
			xIncrement = Math.sin(angle +p.d *.5);
			yIncrement = Math.cos(angle+p.d)+1 +p.r *3;

			p.rotation += p.rotationSpeed;

			p.pt1.x += xIncrement;
			p.pt1.y += yIncrement;

			p.pt2.x += xIncrement;
			p.pt2.y += yIncrement;

			p.pt3.x += xIncrement;
			p.pt3.y += yIncrement;

			p.pt4.x += xIncrement;
			p.pt4.y += yIncrement;

			if (p.pt1.x > canvas.width+5 || p.pt1.x +p.width < -5 || Math.min(p.pt1.y, p.pt2.y) > canvas.height+5)
			{
				p.pt1.x = Math.random()*canvas.width;
				p.pt1.y = -p.height *1.5;

				p.pt2.x = p.pt1.x +Math.random()*particleWith +1;
				p.pt2.y = p.pt1.y -Math.random()*particleWith

				p.pt3.x = p.pt2.x +Math.random()*particleWith +1;
				p.pt3.y = p.pt2.y +Math.random()*particleHeight;

				p.pt4.x = p.pt3.x -(Math.random()*particleWith +1);
				p.pt4.y = p.pt3.y +Math.random()*particleWith;

				p.width = Math.abs(Math.min(p.pt1.x, p.pt4.x) -Math.max(p.pt2.x, p.pt3.x));
				p.height = Math.abs(Math.min(p.pt1.y, p.pt2.y) -Math.max(p.pt3.y, p.pt4.y));

				p.r = Math.random()*4 + 1;
				p.d = Math.random()* maxParticles;
				p.rotationSpeed = Math.random()*.1;
			}
		}
	}
	
	setInterval(draw, 30);
}

window.onresize = function () {
	//var canvas = document.getElementById("canvas");
	canvas.width = document.getElementById("canvas").offsetWidth;
	canvas.height = document.getElementById("canvas").offsetHeight;
};