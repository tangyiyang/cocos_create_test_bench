cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        // defaults, set visually when attaching this script to the Canvas
        text: 'Hello, World!'
    },

    // use this for initialization
    onLoad: function () {

        cc.CollisionManager.enabled = true;

        const camera = this.node.getChildByName("Main Camera");

        const physicsNode = camera.getChildByName("cocos_physics_test_node");
        physicsNode.getComponent(cc.BoxCollider).onEnable = function() {
            cc.log(`physics onEnable is called`);
        };

        physicsNode.getComponent(cc.BoxCollider).onDisable = function() {
            cc.log(`physics onDisable is called`);
        };

        const testParent = new cc.Node();
        this.node.addChild(testParent);

        cc.log(`will change parent in 2 seconds`);

        setTimeout(()=> {
            cc.log(`before change parent`);

            // 如果注释掉removeFromParent，则不会走onEnable/onDisable

            // 我们的使用场景是，
            // 玩家的刀（Knife)都是玩家(Player)的Child, 当玩家死亡的时候，需要释放玩家身上所有的飞刀
            //
            // 符合直觉的实现 1.
            //  for (let i = 0; i < player.knives.length; ++i) {
            //      player.knives[i].parent = otherParent;
            //  }
            //  这样有一个问题，当玩家身上的刀很多的时候，每一次改变parent，
            //  player的children数组都会shrink一次，性能很差。

            //
            //  很容易想到这样优化，这样knife就不会一把一把的被释放，但是这样会导致另外一个问题。
            //  Physics Component的onEnable, onDisable会在每次change parent的时候都被调用。
            //  player.removeAllChildren(); //增加这一行
            //
            //  for (let i = 0; i < player.knives.length; ++i) {
            //      player.knives[i].parent = otherParent;
            //  }
            //
            //

            physicsNode.removeFromParent(); // 注释掉这行，onEnable, onDisable就不会被调用

            physicsNode.parent = testParent;
            cc.log(`after change parent`);
        }, 2000);
    },

    // called every frame
    update: function (dt) {

    },

    onEnable() {
        cc.log(`call Node onEnabled`);
    },

    onDisable() {
        cc.log(`call Node onDisable`);
    }
});
