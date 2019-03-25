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

        // const node = this.node.getChildByName("cocos");
        // node.getComponent(cc.Sprite).enabled = false;
    },

    // called every frame
    update: function (dt) {

    },
});
