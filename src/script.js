/**
* This is the default playground.
* You should see a bunny spinning in the right preview pane.
* Feel free to use this as a starting point for you own playground!
*/
import * as PIXI from 'pixi.js';
import { Assets, Graphics, Rectangle, ImageSource, Texture, MSAA_QUALITY } from 'pixi.js';
import { DashLine } from '@rapideditor/pixi-dashed-line';
import { AtlasAllocator } from '@rapideditor/pixi-texture-allocator';
// Create our application instance
(async () => {
    const app = new PIXI.Application();
    await app.init({
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: 0x2c3e50
    })
    document.body.appendChild(app.canvas);

    // Load the bunny texture
    // const bunnyTexture = await PIXI.Assets.load('https://pixijs.io/examples/examples/assets/bunny.png')
    const bgTexture = await PIXI.Assets.load('https://ecn.t3.tiles.virtualearth.net/tiles/a02123003023112111.jpeg?g=1&pr=odbl&n=z')

    // // Create a new Sprite using the texture
    // const bunny = new PIXI.Sprite(bunnyTexture);

    // // Center the sprite's anchor point
    // bunny.anchor.set(0.5);

    // // Move the sprite to the center of the screen
    // bunny.x = app.renderer.width / 2;
    // bunny.y = app.renderer.height / 2;

    // app.stage.addChild(bunny);

    // Drawing skewed text
        // const skewStyle = new PIXI.TextStyle({
        //     fontFamily: 'Arial',
        //     dropShadow: {
        //         alpha: 0.8,
        //         angle: 2.1,
        //         blur: 4,
        //         color: '0x111111',
        //         distance: 10,
        //     },
        //     fill: '#ffffff',
        //     stroke: { color: '#004620', width: 12, join: 'round' },
        //     fontSize: 60,
        //     fontWeight: 'lighter',
        // });

        // const skewText = new PIXI.Text({
        //     text: 'SKEW IS COOL',
        //     style: skewStyle,
        // });

        // skewText.skew.set(0.65, -0.3);
        // skewText.anchor.set(0.5, 0.5);
        // skewText.x = 0;
        // skewText.y = 0;


        // textContainer = new PIXI.Container()
        // app.stage.addChild(textContainer);
        // textContainer.addChild(skewText);

        // textContainer.x = 300;
        // textContainer.y = 400;

    // Path drawing. 
        // const realPath = new PIXI.Graphics();

        // realPath.moveTo(0, 0);
        // realPath.lineTo(100, 200);
        // realPath.lineTo(200, 200);
        // realPath.lineTo(240, 100);
        // realPath.stroke({ width: 2, color: 0xffffff });

        // realPath.position.x = 50;
        // realPath.position.y = 50;

        // app.stage.addChild(realPath);


    // //Dashed line experiments
        // const HALO_STYLE = {
        //     // alpha: 1,
        //     dash: [6, 3],
        //     width: 4,   // px
        //     color: 0xff0000
        //   };

        // dlContainer = new PIXI.Container()
        // dlContainer.label = 'dash-line';
        // app.stage.addChild(dlContainer);

        // dlContainer.x = 600;
        // dlContainer.y = 600;

        // let dlGeom = new PIXI.Graphics();
        // let dl = new DashLine(dlGeom);
        // dl.moveTo(0, 0);
        // dl.lineTo(100, 200);
        // dl.lineTo(200, 200);
        // dl.lineTo(240, 100);
        // dl.setStrokeStyle(HALO_STYLE);
        
        // dlContainer.addChild(dlGeom);
        // app.stage.addChild(dlContainer);


    // Texture Atlas loading shenanigans

    let allocator = new AtlasAllocator();
    // const PATTERNS = [
    //     'bushes', 'cemetery', 'cemetery_buddhist', 'cemetery_christian', 'cemetery_jewish', 'cemetery_muslim',
    //     'construction', 'dots', 'farmland', 'farmyard', 'forest', 'forest_broadleaved', 'forest_leafless',
    //     'forest_needleleaved', 'grass', 'landfill', 'lines', 'orchard', 'pond', 'quarry', 'vineyard',
    //     'waves', 'wetland', 'wetland_bog', 'wetland_marsh', 'wetland_reedbed', 'wetland_swamp'
    //   ];
    //   let patternBundle = {};
    //   for (const k of PATTERNS) {
    //     patternBundle[k] = `pattern/${k}.png`;
    //   }
    //   Assets.addBundle('patterns', patternBundle);
  

    //   let _textureData = new Map();
    //   Assets.loadBundle(['patterns'])
    //     .then(result => {
    //       // note that we can't pack patterns into an atlas yet - see PixiFeaturePolygon.js.
    //       for (const [textureID, texture] of Object.entries(result.patterns)) {
    //         _textureData.set(textureID, { texture: texture, refcount: 1 });
    //       }
    //       // if we could...
    //         for (const [textureID, texture] of Object.entries(result.patterns)) {
    //             const w = texture.baseTexture.width;
    //             const h = texture.baseTexture.height;
    //             const source = texture.source;
    //             sprite.texture =    allocator.allocate(w, h, 0, source);
    //             app.stage.addChild(sprite);
    //         }  
    //     })
    //     .catch(e => console.error(e));  // eslint-disable-line no-console


    const w = bgTexture.baseTexture.width;
    const h = bgTexture.baseTexture.height;
    const source = bgTexture.source;
    const allocTexture =    allocator.allocate(w, h, 0, source);

     let bgSprite = new PIXI.Sprite(bgTexture)
    // // Center the sprite's anchor point
    bgSprite.anchor.set(0.5);
    bgSprite.x = 256;
    bgSprite.y =  256;
    bgSprite.width = 256;
    bgSprite.height=256;
    app.stage.addChild(bgSprite);


    let bgOtherSprite = new PIXI.Sprite(allocTexture);
    bgOtherSprite.anchor.set(0.5);
    bgOtherSprite.x = 512;
    bgOtherSprite.y =  512;
    bgOtherSprite.width = 256;
    bgOtherSprite.height = 256;

    app.stage.addChild(bgOtherSprite);

    // Listen for animate update
    app.ticker.add(function(ticker)
    {
        // Rotate mr rabbit clockwise
         bgOtherSprite.rotation += 0.1 * ticker.deltaTime;
    });
})();
