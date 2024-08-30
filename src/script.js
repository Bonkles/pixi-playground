/**
* This is the default playground.
* You should see a bunny spinning in the right preview pane.
* Feel free to use this as a starting point for you own playground!
*/
import * as PIXI from 'pixi.js';

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
    const texture = await PIXI.Assets.load('https://pixijs.io/examples/examples/assets/bunny.png')

    // Create a new Sprite using the texture
    const bunny = new PIXI.Sprite(texture);

    // Center the sprite's anchor point
    bunny.anchor.set(0.5);

    // Move the sprite to the center of the screen
    bunny.x = app.renderer.width / 2;
    bunny.y = app.renderer.height / 2;

    app.stage.addChild(bunny);

    // Listen for animate update
    app.ticker.add(function(ticker)
    {
        // Rotate mr rabbit clockwise
        bunny.rotation += 0.1 * ticker.deltaTime;
    });
})();
