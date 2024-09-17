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
    // var spector = new SPECTOR.Spector();
    // spector.onCapture.add((capture) => {
    //     // Do something with capture.
    //     var myEvent = new CustomEvent("SpectorOnCaptureEvent", { detail: { captureString: JSON.stringify(capture) } });
    //     document.dispatchEvent(myEvent);
    // });

    // spector.displayUI();
    // spector.spyCanvases(canvasElement)
    // spector.startCapture(canvasElement, 1000, true);

    let allocator = new AtlasAllocator(app.renderer);

    let bgTexture1 = allocateBackgroundTexture(allocator, bgAsset1);
    let bgTexture2 = allocateBackgroundTexture(allocator, bgAsset2);

    let bgSprite1 = spriteFromTexture(bgTexture1);
    bgSprite1.x = 256;
    bgSprite1.y = 256;

    let bgSprite2 = spriteFromTexture(bgTexture2);

    bgSprite2.x = 512;
    bgSprite2.y = 512;
    
    
    
    // function allocTextureFromSvgString(renderer, allocator, svgString) {

    //     svgString.replace('currentColor', '#ffffff');
    //     let svgGraphics = new PIXI.Graphics().svg(svgString);
    //     let svgTexture = await renderer.extract.image(svgGraphics)
    // }

    const svgString1 = '"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"32\" width=\"32\" color=\"#fff\" viewBox=\"0 0 15 15\"><path d=\"M10 0v15H0V0h10zM9 1H1v13h8V1zM2.5 4h5c.5 0 .5 1 0 1h-5C2 5 2 4 2.5 4zm0 2h5c.5 0 .5 1 0 1h-5C2 7 2 6 2.5 6zm0 2h5c.5 0 .5 1 0 1h-5C2 9 2 8 2.5 8zm0 2h5c.5 0 .5 1 0 1h-5c-.5 0-.5-1 0-1zM11 13c.5.5 2.5.5 3 0 0 0-1 2-1.5 2S11 13 11 13zm0-10c0 .5 3 .5 3 0v9c0 .5-3 .5-3 0V3zm1.5-3C11 0 11 .5 11 1v1c0 .5 3 .5 3 0V1c0-.5 0-1-1.5-1z\" fill=\"#ffffff\"></path></svg>"'
    const svgGraphics1 = new PIXI.Graphics().svg(svgString1);
    const svgIconAreaString = '"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"32\" width=\"32\" color=\"#fff\" viewBox=\"0 0 20 20\"><path d=\"M6.5 6.5h7v7h-7v-7z\" fill=\"#000000\" fill-opacity=\".253\"></path><path d=\"M5.5 3A2.5 2.5 0 0 0 3 5.5c0 .958.543 1.788 1.333 2.208v4.584A2.502 2.502 0 0 0 3 14.5 2.5 2.5 0 0 0 5.5 17c.958 0 1.788-.543 2.208-1.333h4.584c.42.79 1.25 1.333 2.208 1.333a2.5 2.5 0 0 0 2.5-2.5c0-.958-.543-1.788-1.333-2.208V7.708A2.502 2.502 0 0 0 17 5.5 2.5 2.5 0 0 0 14.5 3c-.969 0-1.804.558-2.219 1.365l-.062-.032H7.708A2.502 2.502 0 0 0 5.5 3zm0 1.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm9 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM7.708 6.667h4.584c.234.441.6.807 1.041 1.041v4.584c-.441.234-.807.6-1.041 1.041H7.708a2.523 2.523 0 0 0-1.041-1.041V7.708c.441-.234.807-.6 1.041-1.041zM5.5 13.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm9 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z\" fill=\"#ffffff\"></path></svg>"'
    const svgGraphicsAreaIcon = new PIXI.Graphics().svg(svgIconAreaString);
    // const svgIconBugString = '"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"32\" width=\"32\" color=\"#fff\" viewBox=\"0 0 15 15\"><path d=\"M13.5 13h-3V9h3a.5.5 0 0 0 .41-.787L11.66 5h.84a.5.5 0 0 0 .384-.82l-2.5-3a.515.515 0 0 0-.768 0l-2.5 3A.5.5 0 0 0 7.5 5h.84L6.09 8.213A.5.5 0 0 0 6.5 9h3v4H4v-2h1.5a.5.5 0 0 0 0-1h-4a.5.5 0 0 0 0 1H3v2H1.5a.5.5 0 0 0 0 1h12a.5.5 0 0 0 0-1Z\" fill=\"#ffffff\"></path></svg>"'
    const svgIconBugString = '"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"32\" width=\"32\" color=\"#fff\" viewBox=\"0 0 15 15\"><path d="M6,3 L6,4 L8,6.406 L8,8 L12,8 L12,6.406 L14,4 L14,3 L13,3 L11,5 L9,5 L7,3 L6,3 z M7,9 L6,10 L3,10 L2,11 L3,12 L6,12 L6,13 L4,14 L3,15 L3,16 L4,16 L6,15 L8,17 L12,17 L14,15 L16,16 L17,16 L17,15 L16,14 L14,13 L14,12 L17,12 L18,11 L17,10 L14,10 L13,9 L7,9 z" fill="#ffffff"/></svg>"'
    const svgGraphicsBugIcon = new PIXI.Graphics().svg(svgIconBugString);

    const otherSvgTexture = app.renderer.extract.texture(svgGraphics1);
    // const otherSvgImage = await app.renderer.extract.image(svgGraphics1);
    const otherSvgPixels = await app.renderer.extract.pixels(svgGraphics1);

    const imageData = new ImageData(otherSvgPixels.pixels, otherSvgTexture.width, otherSvgTexture.height)
    const bitmap = await createImageBitmap(imageData);
    otherSvgTexture.source.resource = bitmap;


    let svgAllocTexture =  allocator.allocate( otherSvgTexture.width, otherSvgTexture.height, 0,  otherSvgTexture.source);
    const svgSprite2 = spriteFromTexture(svgAllocTexture);
    svgSprite2.x = 100;
    svgSprite2.y = 50;
    svgSprite2.scale = 2;
    
    app.stage.addChild(svgSprite2);

   
    const areaSvgTexture = app.renderer.extract.texture(svgGraphicsAreaIcon);
    // const otherSvgImage = await app.renderer.extract.image(svgGraphics1);
    const areaSvgPixels = await app.renderer.extract.pixels(svgGraphicsAreaIcon);

    const areaImageData = new ImageData(areaSvgPixels.pixels, areaSvgTexture.width, areaSvgTexture.height)
    const areaBitmap = await createImageBitmap(areaImageData);
    areaSvgTexture.source.resource = areaBitmap;


    let svgAreaAllocTexture =  allocator.allocate( areaSvgTexture.width, areaSvgTexture.height, 0,  areaSvgTexture.source);
    const areaSvgSprite = spriteFromTexture(svgAreaAllocTexture);
    areaSvgSprite.x = 200;
    areaSvgSprite.y = 50;
    areaSvgSprite.scale = 2;
    
    app.stage.addChild(areaSvgSprite);
    
    const bugSvgTexture = app.renderer.extract.texture(svgGraphicsBugIcon);
    const bugSvgPixels = await app.renderer.extract.pixels(svgGraphicsBugIcon);
    const bugImageData = new ImageData(bugSvgPixels.pixels, bugSvgTexture.width, bugSvgTexture.height);
    const bugBitmap = await createImageBitmap(bugImageData);
    bugSvgTexture.source.resource = bugBitmap;

    let svgBugAllocTexture = allocator.allocate(bugSvgTexture.width, bugSvgTexture.height, 0, bugSvgTexture.source )
    const bugSvgSprite = spriteFromTexture(svgBugAllocTexture);
    bugSvgSprite.x = 250;
    bugSvgSprite.y = 50;
    bugSvgSprite.scale = 2;

    app.stage.addChild(bugSvgSprite);

    // // // Listen for animate update
    app.ticker.add(function(ticker)
    {
        // Rotate the second image clockwise
        svgSprite2.rotation += 0.1 * ticker.deltaTime;
        areaSvgSprite.rotation -= 0.1 * ticker.deltaTime;
        bugSvgSprite.rotation -= 0.05 * ticker.deltaTime;
    });
    // spector.stopCapture();
})();
