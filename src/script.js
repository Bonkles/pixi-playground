/**
* This is the default playground.
* You should see a bunny spinning in the right preview pane.
* Feel free to use this as a starting point for you own playground!
*/
import * as PIXI from 'pixi.js';
import  * as SPECTOR from 'spectorjs';
// Create our application instance
(async () => {
    const app = new PIXI.Application();

    const canvasElement = document.getElementById('default');
    await app.init({
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: 0x2c3e50,
        canvas: canvasElement
    })

    window.__PIXI_DEVTOOLS__ = {
        app: app,
        // If you are not using a pixi app, you can pass the renderer and stage directly
        // renderer: myRenderer,
        // stage: myStage,
      };
    

    function spriteFromTexture(texture) {
        let bgSprite = new PIXI.Sprite();
        bgSprite.width = texture.width;
        bgSprite.height = texture.height;
        bgSprite.anchor.set(0.5);
        bgSprite.texture = texture;
        app.stage.addChild(bgSprite);
        return bgSprite;
    }
    var spector = new SPECTOR.Spector();
    spector.onCapture.add((capture) => {
        // Do something with capture.
        var myEvent = new CustomEvent("SpectorOnCaptureEvent", { detail: { captureString: JSON.stringify(capture) } });
        document.dispatchEvent(myEvent);
    });
    spector.displayUI();
    spector.spyCanvases(canvasElement)
    spector.startCapture(canvasElement, 1000, true);    
    
    // function allocTextureFromSvgString(renderer, allocator, svgString) {

    //     svgString.replace('currentColor', '#ffffff');
    //     let svgGraphics = new PIXI.Graphics().svg(svgString);
    //     let svgTexture = await renderer.extract.image(svgGraphics)
    // }

    const svgString1 = '"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"32\" width=\"32\" color=\"#fff\" viewBox=\"0 0 15 15\"><path d=\"M10 0v15H0V0h10zM9 1H1v13h8V1zM2.5 4h5c.5 0 .5 1 0 1h-5C2 5 2 4 2.5 4zm0 2h5c.5 0 .5 1 0 1h-5C2 7 2 6 2.5 6zm0 2h5c.5 0 .5 1 0 1h-5C2 9 2 8 2.5 8zm0 2h5c.5 0 .5 1 0 1h-5c-.5 0-.5-1 0-1zM11 13c.5.5 2.5.5 3 0 0 0-1 2-1.5 2S11 13 11 13zm0-10c0 .5 3 .5 3 0v9c0 .5-3 .5-3 0V3zm1.5-3C11 0 11 .5 11 1v1c0 .5 3 .5 3 0V1c0-.5 0-1-1.5-1z\" fill=\"#ffffff\"></path></svg>"'
    const svgGraphics1 = new PIXI.Graphics().svg(svgString1);
    svgGraphics1.scale = 1;
    const svgIconAreaString = '"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"32\" width=\"32\" color=\"#fff\" viewBox=\"0 0 20 20\"><path d=\"M6.5,6.5 L13.5,6.5 L13.5,13.5 L6.5,13.5 L6.5,6.5z\" fill=\"#00ff00\" ></path><path d=\"M5.5 3A2.5 2.5 0 0 0 3 5.5c0 .958.543 1.788 1.333 2.208v4.584A2.502 2.502 0 0 0 3 14.5 2.5 2.5 0 0 0 5.5 17c.958 0 1.788-.543 2.208-1.333h4.584c.42.79 1.25 1.333 2.208 1.333a2.5 2.5 0 0 0 2.5-2.5c0-.958-.543-1.788-1.333-2.208V7.708A2.502 2.502 0 0 0 17 5.5 2.5 2.5 0 0 0 14.5 3c-.969 0-1.804.558-2.219 1.365l-.062-.032H7.708A2.502 2.502 0 0 0 5.5 3zm0 1.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm9 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM7.708 6.667h4.584c.234.441.6.807 1.041 1.041v4.584c-.441.234-.807.6-1.041 1.041H7.708a2.523 2.523 0 0 0-1.041-1.041V7.708c.441-.234.807-.6 1.041-1.041zM5.5 13.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm9 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z\" fill=\"#000008\"></path></svg>"'
    const svgGraphicsAreaIcon = new PIXI.Graphics().svg(svgIconAreaString);
    const svgIconBugString = '"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"32\" width=\"32\" color=\"#fff\" viewBox=\"0 0 15 15\"><path d="M6,3 L6,4 L8,6.406 L8,8 L12,8 L12,6.406 L14,4 L14,3 L13,3 L11,5 L9,5 L7,3 L6,3 z M7,9 L6,10 L3,10 L2,11 L3,12 L6,12 L6,13 L4,14 L3,15 L3,16 L4,16 L6,15 L8,17 L12,17 L14,15 L16,16 L17,16 L17,15 L16,14 L14,13 L14,12 L17,12 L18,11 L17,10 L14,10 L13,9 L7,9 z" fill="#ffffff"/></svg>"'
    const svgGraphicsBugIcon = new PIXI.Graphics().svg(svgIconBugString);
        

    const areaContainer = new PIXI.Container();

    areaContainer.x = 50;
    areaContainer.y = 50;
    app.stage.addChild(areaContainer);
    areaContainer.addChild(svgGraphicsAreaIcon);

    // // // Listen for animate update
    app.ticker.add(function(ticker)
    {
        // Rotate the graphics
        areaContainer.rotation += 0.1 * ticker.deltaTime;
    });
    spector.stopCapture();
})();
