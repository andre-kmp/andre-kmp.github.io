	var canvas = d3.select("#bubbles"),
	    context = canvas.node().getContext("2d");

	var numBubbles = 450;
	var bubbleBase = 3;
	var bubbleDiff = 12;

	var nodes = d3.range(numBubbles).map(function() {
	    return {
	        radius: Math.random() * bubbleDiff + bubbleBase,
	        color: "rgba(255,255,255,0.2)"
	    };
	});

	var root = nodes[0];
	root.radius = 0;
	root.fixed = true;

	function resizeCanvas() {
	    const canvasElement = canvas.node();
	    width = canvasElement.clientWidth;
	    height = canvasElement.clientHeight;
	    canvas.attr("width", width).attr("height", height);

	    nodes.forEach(function(d, i){
	        if(i !== 0){
	            d.x = Math.random() * width;
	            d.y = Math.random() * height;
	        }
	    });

	    force.size([width,height]).resume();
	}

	function lerpColor(a, b, t){ return a + (b-a)*t; }

	var force = d3.layout.force()
	    .gravity(0.015)
	    .charge(function(d,i){ return i ? 0 : -500; })
	    .nodes(nodes);

	force.on("tick", function() {
	    var q = d3.geom.quadtree(nodes),
	        i, d, n = nodes.length;

	    for(i=1; i<n; ++i) q.visit(collide(nodes[i]));

	    context.clearRect(0,0,width,height);
	    for(i=1; i<n; ++i){
	        d = nodes[i];
	        context.fillStyle = d.color;
	        context.beginPath();
	        context.arc(d.x, d.y, d.radius, 0, 2*Math.PI);
	        context.fill();
	    }
	});

	canvas.on("mousemove", move);
	canvas.on("touchmove", move);

	function move() {
	    var p = d3.mouse(this);
	    root.px = p[0];
	    root.py = p[1];

	    nodes.forEach(function(d){
	        var dx = d.x - p[0],
	            dy = d.y - p[1],
	            dist = Math.sqrt(dx*dx + dy*dy);

	        if(dist < 120){
	            var r = Math.floor((Math.random()+2)*255),
	                g = Math.floor(Math.random()*64),
	                b = Math.floor(Math.random()*0);

	            var matches = d.color.match(/rgba\((\d+),(\d+),(\d+),([\d.]+)\)/);
	            if(matches){
	                var cr = parseInt(matches[1]),
	                    cg = parseInt(matches[2]),
	                    cb = parseInt(matches[3]),
	                    ca = parseFloat(matches[4]);

	                cr = Math.floor(lerpColor(cr, r, 0.1));
	                cg = Math.floor(lerpColor(cg, g, 0.1));
	                cb = Math.floor(lerpColor(cb, b, 0.1));
	                ca = lerpColor(ca, 0.95, 0.4);

	                d.color = `rgba(${cr},${cg},${cb},${ca})`;
	            }
	        } else {

	            var matches = d.color.match(/rgba\((\d+),(\d+),(\d+),([\d.]+)\)/);
	            if(matches){
	                var cr = parseInt(matches[1]),
	                    cg = parseInt(matches[2]),
	                    cb = parseInt(matches[3]),
	                    ca = parseFloat(matches[4]);

	                cr = Math.floor(lerpColor(cr, 255, 0.2));
	                cg = Math.floor(lerpColor(cg, 255, 0.2));
	                cb = Math.floor(lerpColor(cb, 255, 0.2));
	                ca = lerpColor(ca, 0.2, 0.2);

	                d.color = `rgba(${cr},${cg},${cb},${ca})`;
	            }
	        }
	    });

	    force.resume();
	}

	function collide(node){
	    var r = node.radius + 16,
	        nx1 = node.x - r, nx2 = node.x + r,
	        ny1 = node.y - r, ny2 = node.y + r;
	    return function(quad, x1, y1, x2, y2){
	        if(quad.point && quad.point!==node){
	            var x = node.x - quad.point.x,
	                y = node.y - quad.point.y,
	                l = Math.sqrt(x*x + y*y),
	                r = node.radius + quad.point.radius + 7;
	            if(l<r){
	                l = (l-r)/l*0.5;
	                node.x -= x*=l;
	                node.y -= y*=l;
	                quad.point.x += x;
	                quad.point.y += y;
	            }
	        }
	        return x1>nx2 || x2<nx1 || y1>ny2 || y2<ny1;
	    }
	}

resizeCanvas();
force.start();
window.addEventListener("resize", resizeCanvas);
