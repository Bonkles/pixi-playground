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
    

    // // // Listen for animate update
    app.ticker.add(function(ticker)
    {
        // Rotate the second image clockwise
        bgOtherSprite.rotation += 0.1 * ticker.deltaTime;
    });
    // spector.stopCapture();
})();
