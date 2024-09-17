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
    
    const bgAsset1 = await PIXI.Assets.load('https://ecn.t0.tiles.virtualearth.net/tiles/a02123003023112111313.jpeg?g=1&pr=odbl&n=z')
    const bgAsset2 = await PIXI.Assets.load('https://ecn.t3.tiles.virtualearth.net/tiles/a02123003023112111312.jpeg?g=1&pr=odbl&n=z')
    // Load the animation sprite sheet
    // const explosionTextures = await Assets.load('https://pixijs.com/assets/spritesheet/mc.json');

    // const explosionTexture = Texture.from(`Explosion_Sequence_A 16.png`);
    // Texture Atlas loading shenanigans

    function allocateBackgroundTexture(allocator, imageAsset) {   
         w = imageAsset.source.width;
         h = imageAsset.source.height;
        let allocatedTexture = allocator.allocate(w, h, 0,  imageAsset.source);
        return allocatedTexture;
    }

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

    let allocator = new AtlasAllocator(app.renderer);

    let bgTexture1 = allocateBackgroundTexture(allocator, bgAsset1);
    let bgTexture2 = allocateBackgroundTexture(allocator, bgAsset2);

    let bgSprite1 = spriteFromTexture(bgTexture1);
    bgSprite1.x = 256;
    bgSprite1.y = 256;

    let bgSprite2 = spriteFromTexture(bgTexture2);

    bgSprite2.x = 512;
    bgSprite2.y = 512;
    
    
    


    const svgString = '"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"32\" width=\"32\" color=\"#fff\" viewBox=\"0 0 15 15\"><path d=\"M10 0v15H0V0h10zM9 1H1v13h8V1zM2.5 4h5c.5 0 .5 1 0 1h-5C2 5 2 4 2.5 4zm0 2h5c.5 0 .5 1 0 1h-5C2 7 2 6 2.5 6zm0 2h5c.5 0 .5 1 0 1h-5C2 9 2 8 2.5 8zm0 2h5c.5 0 .5 1 0 1h-5c-.5 0-.5-1 0-1zM11 13c.5.5 2.5.5 3 0 0 0-1 2-1.5 2S11 13 11 13zm0-10c0 .5 3 .5 3 0v9c0 .5-3 .5-3 0V3zm1.5-3C11 0 11 .5 11 1v1c0 .5 3 .5 3 0V1c0-.5 0-1-1.5-1z\" fill=\"#ffffff\"></path></svg>"'
    const svgGraphics = new PIXI.Graphics().svg(svgString);
    // const svgTexture = app.renderer.generateTexture({ target: svgGraphics });
    // const svgSprite = new PIXI.Sprite(svgTexture);
    // svgSprite.anchor.set(0.5);
    // svgSprite.x = 50;
    // svgSprite.y = 50;
    // svgSprite.scale = 2;

    // app.stage.addChild(svgSprite);

    const otherSvgTexture = app.renderer.extract.texture(svgGraphics);
    const otherSvgImage = await app.renderer.extract.image(svgGraphics);
    const otherSvgPixels = await app.renderer.extract.pixels(svgGraphics);

    const imageData = new ImageData(otherSvgPixels.pixels, otherSvgTexture.width, otherSvgTexture.height)
    const bitmap = await createImageBitmap(imageData);
    // const blob = new Blob(otherSvgPixels.pixels);
    // const bitmap = await createImageBitmap(blob);
    otherSvgTexture.source.resource = bitmap;


    let svgAllocTexture =  allocator.allocate( otherSvgTexture.width, otherSvgTexture.height, 0,  otherSvgTexture.source);
    const svgSprite2 = spriteFromTexture(svgAllocTexture);
    svgSprite2.x = 100;
    svgSprite2.y = 50;
    svgSprite2.scale = 2;
    
    app.stage.addChild(svgSprite2);

   
    

    // // // Listen for animate update
    app.ticker.add(function(ticker)
    {
        // Rotate the second image clockwise
        svgSprite2.rotation += 0.1 * ticker.deltaTime;
    });
    // spector.stopCapture();
})();
