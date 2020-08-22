var gameSettings = {
    playerSpeed: 130,
}

var config = {
    width: 864,
    height: 640,
    scene: {
        preload: preload,
        create: create
    },
    backgroundColor: "0xFFFFFF",
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    }
}

var game = new Phaser.Game(config);

function preload () {
    this.load.image('tiles', 'assets/tileset.png');
    this.load.image('player', 'assets/images/player.png');
    this.load.tilemapCSV('map', 'assets/grid.csv');
    this.load.image('snowflake', 'assets/images/snowflake.png');
}

function create () {
    var map = this.make.tilemap({ key: 'map', tileWidth: 32, tileHeight: 32 });
    var tileset = map.addTilesetImage('tiles', null, 32, 32, 1, 2);
    var layer = map.createStaticLayer(0, tileset, 0, 0);
    
    var player = this.add.image(32+16, 32+16, 'player');

    this.gameitems = this.physics.add.group();
    
    for (let i=0; i < 10; i++) {
        let x = Phaser.Math.RND.between(0, 864);
        let y = Phaser.Math.RND.between(0, 640);
        
        console.log();
        if (layer.getTileAtWorldXY(x, y, true).index !== 2) {
            let newobj = this.gameitems.create(x, y, 'snowflake', 'snowflake');
        }

    }


    player.setScale(0.05, 0.05);

    //  Left
    this.input.keyboard.on('keydown_A', function (event) {

        var tile = layer.getTileAtWorldXY(player.x - 32, player.y, true);

        if (tile.index === 2) {
            //  Blocked, we can't move
        }
        else {
            player.x -= 32;
        }

    });

    //  Right
    this.input.keyboard.on('keydown_D', function (event) {

        var tile = layer.getTileAtWorldXY(player.x + 32, player.y, true);

        if (tile.index === 2) {
            //  Blocked, we can't move
        }
        else {
            player.x += 32;
        }

    });

    //  Up
    this.input.keyboard.on('keydown_W', function (event) {

        var tile = layer.getTileAtWorldXY(player.x, player.y - 32, true);

        if (tile.index === 2) {
            //  Blocked, we can't move
        }
        else {
            player.y -= 32;
        }

    });

    //  Down
    this.input.keyboard.on('keydown_S', function (event) {

        var tile = layer.getTileAtWorldXY(player.x, player.y + 32, true);

        if (tile.index === 2) {
            //  Blocked, we can't move
        }
        else {
            player.y += 32;
        }

    });


}