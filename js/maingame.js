function collectStar (player, star)
{
    star.disableBody(true, true);
    
    //score
    score += 10;
    $('#score').html("Score : "+score);
    
    //création étoiles
    if (stars.countActive(true) === 0)
    {
        
        stars.children.iterate(function (child) {
            
            child.enableBody(true, child.x, 0, true, true);
            
        });
        
        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
        
    }
}

function hitbox (player, box)
{
    box.disableBody(true, true);
    
    score += 10;
    $('#score').html("Score : "+score);
}

var SceneA = new Phaser.Class({
    
    Extends: Phaser.Scene,
    
    initialize:
    
    function SceneA ()
    {
        Phaser.Scene.call(this, { key: 'sceneA' });
    },
    
    preload: function ()
    {
        this.load.image('overlay', 'assets/backgroundb3.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('titre', 'assets/titre.png');
        this.load.image('boxS', 'assets/boxS.png');
        this.load.image('boxM', 'assets/boxM.png');
        this.load.image('boxL', 'assets/boxL.png');
        this.load.image('boxBS', 'assets/boxBS.png');
        this.load.image('boxBS2', 'assets/boxBS2.png');
        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 48, frameHeight: 46 });
        this.load.image('mountL', 'assets/montagneL2.png');
        this.load.image('mountM', 'assets/montagneM2.png');
        this.load.image('mountS', 'assets/montagneS2.png');
        this.load.image('nuageS', 'assets/nuageS.png');
        this.load.image('nuageM', 'assets/nuageM2.png');
        this.load.image('buissonL', 'assets/buissonL2.png');
        this.load.image('buissonM', 'assets/buissonM2.png');
        this.load.image('buissonS', 'assets/buissonS2.png');
        this.load.image('arbreM', 'assets/arbreM2.png');
        this.load.image('arbreS', 'assets/arbreS2.png');
        this.load.image('arbreL', 'assets/arbreL2.png');
        this.load.image('groundL', 'assets/groundL.png');
        this.load.image('groundM', 'assets/groundM.png');
        this.load.image('groundSG', 'assets/groundSG.png');
        this.load.image('groundSD', 'assets/groundSD.png');
        this.load.image('stairs1', 'assets/stairs1.png');
        this.load.image('stairs2', 'assets/stairs2.png');
        this.load.image('stairs3', 'assets/stairs3.png');
        this.load.image('stairs4', 'assets/stairs4.png');
        this.load.image('case', 'assets/case.png');
        this.load.spritesheet('cerf', 'assets/cerf.png', { frameWidth: 40, frameHeight: 40 });
        this.load.spritesheet('porc', 'assets/porc.png', { frameWidth: 40, frameHeight: 25 });
    },
    
    create: function ()
    {
        // Création de la camera et agrandissement de la zone de jeu
        this.cameras.main.setBounds(0,0,8000,600);
        this.physics.world.setBounds(0,0,8000,600);
        
        //  A simple background for our game avec mise à l'échelle pour le 1600x600
        this.add.image(4000, 300, 'overlay').setScale(1.07,1);
        
        //  The platforms group contains the ground and the 2 ledges we can jump on
        platforms = this.physics.add.staticGroup();
        background = this.physics.add.staticGroup();
        
        //  Here we create the ground.
        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        //platforms.create(2000, 568, 'groundM').setScale(32,2).refreshBody();
        
        //  Now let's create some ledges
        liste_plateformes.forEach(function(p, i, array) {
            platforms.create(p.x, p.y, p.t).setScale(p.sx, p.sy).refreshBody();
        });
        
        //pour les boites
        /*var physics = this.physics;
        liste_boites.forEach(function(p, i, array) {
            var box = physics.add.sprite(p.x, p.y, p.t);
            physics.add.collider(box, platforms);
        });*/
        
        //  Pour les éléments de fond
        liste_assets.forEach(function(p, i, array) {
            background.create(p.x, p.y, p.t).setScale(p.sx, p.sy).refreshBody();
        });
        
        // The player and its settings
        player = this.physics.add.sprite(100, 450, 'dude');
        
        player.setSize(25, 40, true);
        
        //  Player physics properties. Give the little guy a slight bounce.
        
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        //player.setSize(realWidth-5, realHeight-5, false).setOffset(2,2);
        //player.setGravityY(100);
        
        //  Our player animations, turning, walking left and walking right.
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });
        
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'cleft',
            frames: this.anims.generateFrameNumbers('cerf', { start: 0, end: 3 }),
            frameRate: 10, //"vitesse" a la quelle on voit les frames se deplacer
            repeat: -1
        });
        
        this.anims.create({
            key: 'cright',
            frames: this.anims.generateFrameNumbers('cerf', { start: 4, end: 7 }),
            frameRate: 10, //"vitesse" a la quelle on voit les frames se deplacer
            repeat: -1
        });

        this.anims.create({
            key: 'pleft',
            frames: this.anims.generateFrameNumbers('porc', { start: 0, end: 2 }),
            frameRate: 10, //"vitesse" a la quelle on voit les frames se deplacer
            repeat: -1
        });
        
        this.anims.create({
            key: 'pright',
            frames: this.anims.generateFrameNumbers('porc', { start: 3, end: 5 }),
            frameRate: 10, //"vitesse" a la quelle on voit les frames se deplacer
            repeat: -1
        });
        
        //  Input Events
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        
        //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
        stars = this.physics.add.group({
            key: 'star',
            repeat: 22,
            setXY: { x: 12, y: 0, stepX: 70 }
        });
        
        stars.children.iterate(function (child) {
            
            //  Give each star a slightly different bounce
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            
        });
                
        box = this.physics.add.group();

        mobs = {
            'cerf':this.physics.add.group(),
            'porc':this.physics.add.group(),
        }
        
        //  The score
        //scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
        
        //  Collide the player and the stars with the platforms
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(player, mobs);
        this.physics.add.collider(stars, platforms);
        this.physics.add.collider(box, platforms);
        Object.keys(mobs).forEach((mobtype)=>{
            var group = mobs[mobtype];
            this.physics.add.collider(group, platforms);
        })
        
        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        this.physics.add.overlap(player, stars, collectStar, null, this);
        this.physics.add.overlap(player, box, hitbox, null, this);
        this.physics.add.collider(player, mobs, null, this);
        
        // Activation du suivi du joueur par la caméra
        this.cameras.main.startFollow(player);

        for(var i=0; i<liste_mobs.length;i++) {
                var mob_param = liste_mobs[i];
                var mob = this.physics.add.sprite(
                    liste_plateformes[mob_param.platform].x,
                    liste_plateformes[mob_param.platform].y-60,
                    mob_param.type
                );
                mobs[mob_param.type].add(mob);
                mob.depart=liste_plateformes[i].x;
                mob.limite = 150;
                mob.setCollideWorldBounds(true); //rebond sur les bords du monde
                mob.allowGravity = true;
                mob.setVelocityX(120);
        }
    },
    
    update: function ()
    {
        if (gameOver)
        {
            return;
        }
        
        if (keyLEFT.isDown)
        {
            player.setVelocityX(-160);
            
            player.anims.play('left', true);
        }
        else if (keyRIGHT.isDown)
        {
            player.setVelocityX(160);
            
            player.anims.play('right', true);
        }
        else
        {
            player.setVelocityX(0);
            
            player.anims.play('turn');
        }
        
        if (keyUP.isDown && player.body.touching.down)
        {
            player.setVelocityY(-330);
        }

        //Merci Laure
        Object.keys(mobs).forEach((mobtype)=>{
            var group = mobs[mobtype];
            group.children.iterate(function(mob) {
                if((mob.body.velocity.x>0 && mob.body.x >= mob.depart+mob.limite) || (mob.body.velocity.x<0 && mob.body.x <= mob.depart-mob.limite)) {
                    mob.body.setVelocityX(-mob.body.velocity.x);
                }
                if (mob.body.velocity.x>0) {
                    mob.anims.play(animations_mobs[mobtype].right, true);
                } else {
                    mob.anims.play(animations_mobs[mobtype].left, true);
                }
            });
        })
        
    }

});

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 460,
    parent: "jeu",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 550 },
            debug: false
        }
    },
    scale: {
        mode: Phaser.Scale.FIT
    },
    scene: [ SceneA ]
};

var A = 32;
var player;
var stars;
var box;
var platforms;
var background;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;
var camera = null;
var animations_mobs = {
    'cerf': {'right': 'cright', 'left': 'cleft'},
    'porc': {'right': 'pright', 'left': 'pleft'},
};
var liste_mobs = [
    {platform: 1, type: 'porc'},
    {platform: 5, type: 'porc'},
    {platform: 7, type: 'porc'},
    {platform: 13, type: 'cerf'},
    {platform: 19, type: 'porc'},
    {platform: 23, type: 'porc'},
    {platform: 25, type: 'porc'},
    {platform: 27, type: 'porc'},
    {platform: 33, type: 'cerf'},
    {platform: 39, type: 'porc'},
]
var liste_plateformes = [
    {x:30, y:567, t:'groundSG', sx: 1, sy: 1},
    {x:330, y:567, t:'groundL', sx: 1, sy: 1},
    {x:870, y:567, t:'groundL', sx: 1, sy: 1},
    {x:1410, y:567, t:'groundL', sx: 1, sy: 1},
    {x:1950, y:567, t:'groundL', sx: 1, sy: 1},
    {x:2490, y:567, t:'groundL', sx: 1, sy: 1},
    {x:3030, y:567, t:'groundL', sx: 1, sy: 1},
    {x:3570, y:567, t:'groundL', sx: 1, sy: 1},
    {x:4110, y:567, t:'groundL', sx: 1, sy: 1},
    {x:4650, y:567, t:'groundL', sx: 1, sy: 1},
    {x:4830, y:567, t:'groundM', sx: 1, sy: 1},
    {x:5010, y:567, t:'groundM', sx: 1, sy: 1},
    {x:5190, y:567, t:'groundM', sx: 1, sy: 1},
    {x:5370, y:567, t:'groundM', sx: 1, sy: 1},
    {x:5430, y:567, t:'groundSD', sx: 1, sy: 1},
    {x:5610, y:567, t:'groundSG', sx: 1, sy: 1},
    {x:5910, y:567, t:'groundL', sx: 1, sy: 1},
    {x:6450, y:567, t:'groundL', sx: 1, sy: 1},
    {x:6990, y:567, t:'groundL', sx: 1, sy: 1},
    {x:7530, y:567, t:'groundL', sx: 1, sy: 1},
    {x:7890, y:567, t:'groundM', sx: 1, sy: 1},
    {x:7970, y:567, t:'groundSD', sx: 1, sy: 1},
    {x:4350, y:293, t:'boxM', sx: 1, sy: 1},
    {x:570, y:426, t:'boxBS2', sx: 1, sy: 1},
    {x:718, y:426, t:'boxS', sx: 1, sy: 1},
    {x:748, y:426, t:'boxBS', sx: 1, sy: 1},
    {x:778, y:426, t:'boxS', sx: 1, sy: 1},
    {x:808, y:426, t:'boxBS2', sx: 1, sy: 1},
    {x:838, y:426, t:'boxS', sx: 1, sy: 1},
    {x:778, y:293, t:'boxBS2', sx: 1, sy: 1},
    {x:2400, y:426, t:'boxBS', sx: 1, sy: 1},
    {x:2750, y:414, t:'boxS', sx: 1, sy: 1},
    {x:2780, y:414, t:'boxBS', sx: 1, sy: 1},
    {x:2810, y:414, t:'boxS', sx: 1, sy: 1},
    {x:2980, y:320, t:'boxL', sx: 1, sy: 1},
    {x:3285, y:293, t:'boxM', sx: 1, sy: 1},
    {x:3345, y:293, t:'boxBS', sx: 1, sy: 1},
    {x:3365, y:426, t:'boxBS2', sx: 1, sy: 1},
    {x:3572, y:426, t:'boxS', sx: 1, sy: 1},
    {x:3602, y:426, t:'boxS', sx: 1, sy: 1},
    {x:3780, y:426, t:'boxBS2', sx: 1, sy: 1},
    {x:3900, y:426, t:'boxBS2', sx: 1, sy: 1},
    {x:3900, y:293, t:'boxBS', sx: 1, sy: 1},
    {x:4020, y:426, t:'boxBS2', sx: 1, sy: 1},
    {x:4214, y:426, t:'boxS', sx: 1, sy: 1},
    {x:4605, y:426, t:'boxS', sx: 1, sy: 1},
    {x:4635, y:426, t:'boxS', sx: 1, sy: 1},
    {x:4572, y:293, t:'boxS', sx: 1, sy: 1},
    {x:4602, y:293, t:'boxBS2', sx: 1, sy: 1},
    {x:4632, y:293, t:'boxBS2', sx: 1, sy: 1},
    {x:4662, y:293, t:'boxS', sx: 1, sy: 1},
    {x:4602, y:426, t:'boxS', sx: 1, sy: 1},
    {x:4632, y:426, t:'boxS', sx: 1, sy: 1},
    {x:6015, y:426, t:'boxS', sx: 1, sy: 1},
    {x:6045, y:426, t:'boxS', sx: 1, sy: 1},
    {x:6075, y:426, t:'boxBS2', sx: 1, sy: 1},
    {x:6105, y:426, t:'boxS', sx: 1, sy: 1},
    {x:1022, y:507, t:'arbreS', sx: 1, sy: 1},
    {x:2625, y:507, t:'arbreS', sx: 1, sy: 1},
    {x:1220, y:478 , t:'arbreM', sx: 1, sy: 1},
    {x:1460, y:468, t:'arbreL', sx: 1, sy: 1},
    {x:2055, y:507, t:'arbreS', sx: 1, sy: 1},
    {x:5835, y:507, t:'arbreS', sx: 1, sy: 1},
    {x:6410, y:507, t:'arbreS', sx: 1, sy: 1},
    {x:5348, y:521, t:'stairs1', sx: 1, sy: 1},
    {x:5380, y:505, t:'stairs2', sx: 1, sy: 1},
    {x:5412, y:489, t:'stairs3', sx: 1, sy: 1},
    {x:5444, y:473, t:'stairs4', sx: 1, sy: 1}
];
var liste_boites = [
    {x:600, y:400, t:'boxS', sx: 1, sy: 1},
    {x:750, y:220, t:'boxS', sx: 1, sy: 1},
    {x:1400, y:180, t:'boxS', sx: 1, sy: 1},
    {x:1200, y:300, t:'boxS', sx: 1, sy: 1}
];
var liste_assets = [
    {x:80, y:498, t:'mountL', sx: 1, sy: 1},
    {x:1770, y:503, t:'mountM', sx: 1, sy: 1},
    {x:3500, y:498, t:'mountL', sx: 1, sy: 1},
    {x:610, y:517, t:'mountS', sx: 1, sy: 1},
    {x:2330, y:517, t:'mountS', sx: 1, sy: 1},
    {x:4040, y:517, t:'mountS', sx: 1, sy: 1},
    {x:5200, y:503, t:'mountM', sx: 1, sy: 1},
    {x:6920, y:503, t:'mountM', sx: 1, sy: 1},
    {x:7460, y:517, t:'mountS', sx: 1, sy: 1},
    {x:5750, y:517, t:'mountS', sx: 1, sy: 1},
    {x:725, y:200, t:'nuageS', sx: 1, sy: 1},
    {x:1340, y:200, t:'nuageS', sx: 1, sy: 1},
    {x:2435, y:200, t:'nuageS', sx: 1, sy: 1},
    {x:2035, y:235, t:'nuageS', sx: 1, sy: 1},
    {x:3750, y:235, t:'nuageS', sx: 1, sy: 1},
    {x:2750, y:235, t:'nuageM', sx: 1, sy: 1},
    {x:1040, y:230, t:'nuageM', sx: 1, sy: 1},
    {x:3050, y:200, t:'nuageM', sx: 1, sy: 1},
    {x:4145, y:200, t:'nuageS', sx: 1, sy: 1},
    {x:4760, y:200, t:'nuageM', sx: 1, sy: 1},
    {x:4470, y:235, t:'nuageM', sx: 1, sy: 1},
    {x:5460, y:235, t:'nuageS', sx: 1, sy: 1},
    {x:5855, y:200, t:'nuageS', sx: 1, sy: 1},
    {x:6170, y:235, t:'nuageM', sx: 1, sy: 1},
    {x:6470, y:200, t:'nuageM', sx: 1, sy: 1},
    {x:7205, y:235, t:'nuageS', sx: 1, sy: 1},
    {x:470, y:517, t:'buissonL', sx: 1, sy: 1},
    {x:854, y:517, t:'buissonS', sx: 1, sy: 1},
    {x:1620, y:517, t:'buissonM', sx: 1, sy: 1},
    {x:2180, y:517, t:'buissonL', sx: 1, sy: 1},
    {x:2570, y:517, t:'buissonS', sx: 1, sy: 1},
    {x:3230, y:517, t:'buissonM', sx: 1, sy: 1},
    {x:4285, y:517, t:'buissonS', sx: 1, sy: 1},
    {x:6000, y:517, t:'buissonS', sx: 1, sy: 1},
    {x:4945, y:517, t:'buissonM', sx: 1, sy: 1},
    {x:3900, y:517, t:'buissonM', sx: 1, sy: 1},
    {x:260, y:260, t:'titre', sx: 1, sy: 1},
    {x:7680, y:506, t:'case', sx: 1, sy: 1}
];

var game = new Phaser.Game(config);