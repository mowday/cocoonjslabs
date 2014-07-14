renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
stage = new PIXI.Stage(0xFFFFFF);


var g = new PIXI.Graphics();
stage.addChild(g);
g.beginFill(0xFF00FF);
g.drawRect(0, 0, 200, 200);
g.endFill();

var text = new PIXI.Text("HEJSAN!", {font: "35px Arial", fill: "black", align: "left"});
stage.addChild(text);



requestAnimFrame( animate );

function animate(delta) {

	requestAnimFrame( animate );

	 // render the stage   
	 renderer.render(stage);

}