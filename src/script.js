/**
* This is the default playground.
* You should see a bunny spinning in the right preview pane.
* Feel free to use this as a starting point for you own playground!
*/
import * as PIXI from 'pixi.js';
import { Assets, Graphics, Rectangle, ImageSource, Texture, MSAA_QUALITY } from 'pixi.js';
import { DashLine } from '@rapideditor/pixi-dashed-line';
import { AtlasAllocator } from '@rapideditor/pixi-texture-allocator';
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
    
    const bgTexture1 = await PIXI.Assets.load('https://ecn.t0.tiles.virtualearth.net/tiles/a02123003023112111313.jpeg?g=1&pr=odbl&n=z')
    const bgTexture2 = await PIXI.Assets.load('https://ecn.t3.tiles.virtualearth.net/tiles/a02123003023112111312.jpeg?g=1&pr=odbl&n=z')
    // Load the animation sprite sheet
    // const explosionTextures = await Assets.load('https://pixijs.com/assets/spritesheet/mc.json');

    // const explosionTexture = Texture.from(`Explosion_Sequence_A 16.png`);
    // Texture Atlas loading shenanigans


    //  w = bgTexture2.source.width;
    //  h = bgTexture2.source.height;
    // let bgAllocTexture2 = allocator.allocate(w, h, 0,  bgTexture2.source);

// This is the normal pixi sprite created directly from the background image that the asset loader created. 
//      let bgSprite = new PIXI.Sprite()
//     // // Center the sprite's anchor point
//     bgSprite.anchor.set(0.5);
//     bgSprite.x = 256;
//     bgSprite.y =  256;
//     bgSprite.width = 256;
//     bgSprite.height =  256;
//     // bgSprite.zIndex=300;
//     bgSprite.label='originalBackground'
//    app.stage.addChild(bgSprite);

//     bgSprite.texture = bgTexture1;

    // This is the texture-allocator based sprite which doesn't seem to show up at all. double-yew-tee-eff

    var spector = new SPECTOR.Spector();
    spector.onCapture.add((capture) => {
        // Do something with capture.
        var myEvent = new CustomEvent("SpectorOnCaptureEvent", { detail: { captureString: JSON.stringify(capture) } });
        document.dispatchEvent(myEvent);
    });

//    spector.displayUI();
//    spector.spyCanvases(canvasElement)
//    spector.startCapture(canvasElement, 1000, true);

    let allocator = new AtlasAllocator(app.renderer);
    let w = bgTexture2.source.width;
    let h = bgTexture2.source.height;
    let bgAllocTexture2 = allocator.allocate(w, h, 0,  bgTexture2.source);

    let bgOtherSprite = new PIXI.Sprite();
    bgOtherSprite.anchor.set(0.5);
    bgOtherSprite.x = 512;
    bgOtherSprite.y =  512;
    bgOtherSprite.width = 256;
    bgOtherSprite.height = 256;
    bgOtherSprite.zIndex = 200;
    bgOtherSprite.label = 'allocatedBackground'
    app.stage.addChild(bgOtherSprite);
    bgOtherSprite.texture = bgAllocTexture2;
    

    // const svgString = '"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"32\" width=\"32\" color=\"#fff\" viewBox=\"0 0 60 60\"><path d=\"m30.5 51.5-11-11 21-21 11 11z\" fill=\"#58A9ED\"></path><path d=\"m19.5 40.5-11-11 21-21 11 11z\" fill=\"#8CD05F\"></path><path d=\"m20 41 10.5-10.5L41 20\" fill=\"#FFF\"></path><path d=\"m20 41 10.5-10.5L41 20\" stroke=\"#444\" stroke-dasharray=\"2,1\" fill=\"none\"></path><path d=\"M23 40a3 3 0 1 1-6 0 3 3 0 0 1 6 0z\" fill=\"#444\"></path><path d=\"M22 40a2 2 0 1 1-3.999.001A2 2 0 0 1 22 40z\" fill=\"#FFF\"></path><path d=\"M43 20a3 3 0 1 1-6 0 3 3 0 0 1 6 0z\" fill=\"#444\"></path><path d=\"M42 20a2 2 0 1 1-3.999.001A2 2 0 0 1 42 20z\" fill=\"#FFF\"></path><path d=\"M33 30a3 3 0 1 1-6 0 3 3 0 0 1 6 0z\" fill=\"#444\"></path><path d=\"M32 30a2 2 0 1 1-3.999.001A2 2 0 0 1 32 30z\" fill=\"#FFF\"></path></svg>"';
    const svgString = '"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"32\" width=\"32\" color=\"#fff\" viewBox=\"0 0 15 15\"><path d=\"M10 0v15H0V0h10zM9 1H1v13h8V1zM2.5 4h5c.5 0 .5 1 0 1h-5C2 5 2 4 2.5 4zm0 2h5c.5 0 .5 1 0 1h-5C2 7 2 6 2.5 6zm0 2h5c.5 0 .5 1 0 1h-5C2 9 2 8 2.5 8zm0 2h5c.5 0 .5 1 0 1h-5c-.5 0-.5-1 0-1zM11 13c.5.5 2.5.5 3 0 0 0-1 2-1.5 2S11 13 11 13zm0-10c0 .5 3 .5 3 0v9c0 .5-3 .5-3 0V3zm1.5-3C11 0 11 .5 11 1v1c0 .5 3 .5 3 0V1c0-.5 0-1-1.5-1z\" fill=\"#ffffff\"></path></svg>"'
    const svgGraphics = new PIXI.Graphics().svg(svgString);
    const svgTexture = app.renderer.generateTexture({ target: svgGraphics });

    const otherSvgTexture = app.renderer.extract.texture(svgGraphics);
    const otherSvgImage = await app.renderer.extract.image(svgGraphics);
    const otherSvgPixels = await app.renderer.extract.pixels(svgGraphics);

    // const blob = new Blob(otherSvgPixels.pixels);
    // const bitmap = await createImageBitmap(blob);
    otherSvgTexture.source.resource = otherSvgPixels;

    const svgSprite = new PIXI.Sprite(svgTexture);

    let svgAllocTexture =  allocator.allocate( otherSvgTexture.width, otherSvgTexture.height, 0,  otherSvgTexture.source);
    svgSprite.anchor.set(0.5);
    svgSprite.x = 50;
    svgSprite.y = 50;
    svgSprite.scale = 2;

    app.stage.addChild(svgSprite);
    const svgSprite2 = new PIXI.Sprite(svgAllocTexture);
    svgSprite2.anchor.set(0.5);
    svgSprite2.x = 100;
    svgSprite2.y = 50;
    svgSprite2.scale = 2;
    
    app.stage.addChild(svgSprite2);

   
    

    // // // Listen for animate update
    app.ticker.add(function(ticker)
    {
        // Rotate the second image clockwise
        svgSprite.rotation += 0.1 * ticker.deltaTime;
    });
    // spector.stopCapture();
})();
