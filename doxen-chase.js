var DoxenChase = (function() {


    function Doxen(x, y, vx, vy, image) {
        var doxenImages = [
            'images/doxen1.png',
            'images/doxen2.png'
        ];

        this.sprite = new PIXI.Sprite(PIXI.loader.resources[doxenImages[randInt(0, doxenImages.length-1)]].texture);
        this.sprite.x = x;
        this.sprite.y = y;
        this.sprite.vx = vx;
        this.sprite.vy = vy;

        this.move = function(boundX, boundY) {
            this.sprite.x += this.sprite.vx;
            if (this.sprite.x < 0 || this.sprite.x > boundX) {
                this.sprite.x = this.sprite.x < 0 ? 0 : boundX;
                this.sprite.vx *= -1;
            }

            this.sprite.y += this.sprite.vy;
            if (this.sprite.y < 0 || this.sprite.y > boundY) {
                this.sprite.y = this.sprite.y < 0 ? 0 : boundY;
                this.sprite.vy *= -1;
            }
        }
    }

    var renderer = PIXI.autoDetectRenderer(256, 256, {
        transparent: true,
        antialias:false,
        preserveDrawingBuffer:false,
        autoResize: true,
        clearBeforeRender: false
    }, false);
    var stage = new PIXI.Container();
    var doxen1Layer = new PIXI.ParticleContainer();
    var doxen2Layer = new PIXI.ParticleContainer();
    stage.addChild(doxen1Layer);
    stage.addChild(doxen2Layer);

    var doxens = [];

    var init = function() {
        document.body.appendChild(renderer.view);

        window.onresize = function(e) {
            renderer.resize(window.innerWidth, window.innerHeight);
        }
        window.onresize();

        PIXI.loader
            .add('images/doxen1.png')
            .add('images/doxen2.png')
            .load(setup);
    };

    var setup = function() {
        for (var i=0; i<100; i++) {
            var choice = randInt(1, 2);
            var doxen = new Doxen(
                randInt(0, renderer.view.width), 
                randInt(0, renderer.view.height),
                randInt(-10, 10),
                randInt(-10, 10), choice);
            doxens.push(doxen);

            if (choice == 1) doxen1Layer.addChild(doxen.sprite);
            else if (choice == 2) doxen2Layer.addChild(doxen.sprite);
        }
        gameLoop();
    }

    var gameLoop = function() {
        requestAnimationFrame(gameLoop);

        for (var i=0; i<doxens.length; i++) {
            doxens[i].move(renderer.view.width, renderer.view.height);
        }

        renderer.render(stage);
    }

    var randInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    return {
        init: init
    };
})();