const platformerPlugin = () => {

    return {
        playerControls(velocity) {

            const component = {};

            component.add = function() {

                this.addTag('player');

                this.velocity = velocity;
                this.isMoving = false;
                this.isOnPlatform = false;
                this.currPlatform = null;
                this.rightOfCenter = false;
                this.xOffset = 0;
                this.yOffset = 0;

                keyDown(['a', 'left'], () => {
                    this.move(-this.velocity, 0);
                    this.isMoving = true;
                    this.xOffset = this.rightOfCenter ? this.pos.x - this.currPlatform.pos.x : this.currPlatform.pos.x - this.pos.x;
                });
            
                keyDown(['d', 'right'], () => {
                    this.move(this.velocity, 0);
                    this.isMoving = true;
                    this.xOffset = this.rightOfCenter ? this.pos.x - this.currPlatform.pos.x : this.currPlatform.pos.x - this.pos.x;
                });
            
                keyPress(['space', 'up', 'w'], () => {
                    if(this.grounded() || this.isOnPlatform) {
                        this.jump();
                        this.isOnPlatform = false;
                    }
                });

                keyRelease(['a', 'd', 'left', 'right'], () => {
                    this.isMoving = false;
                });

                this.collides('platform', (p) => {
                    this.currPlatform = p;
                    this.isOnPlatform = true;
                    this.rightOfCenter = this.pos.x >= this.currPlatform.pos.x;
                    this.xOffset = this.rightOfCenter ? this.pos.x - this.currPlatform.pos.x : this.currPlatform.pos.x - this.pos.x;
                });

                this.action(() => {
                    if(this.currPlatform) {
                        if(this.isOnPlatform) {
                            
                            if(!this.isMoving) {
                                if(this.rightOfCenter) {
                                    this.pos.x = this.currPlatform.pos.x + this.xOffset;
                                } else {
                                    this.pos.x = this.currPlatform.pos.x - this.xOffset;
                                }
                            }

                            const platFormHeight = this.currPlatform.area.p2.y - this.currPlatform.area.p1.y;
                            const thisHeight = this.area.p2.y - this.area.p1.y;

                            this.pos.y = this.currPlatform.pos.y - (platFormHeight / 2) - (thisHeight / 2);
                        }
                    }
                });
            }

            return component;            
        },
        horizontal(config) {
            const distance = config.distance || 0;
            const speed = config.speed || 0;
            let moveLeft = false;
            let originX = 0;

            const component = {};
            component.add = function () {
                originX = this.pos.x;
                this.addTag('platform');
            };
            component.update = function() {
                if(moveLeft) {
                    this.move(-speed, 0);
                } else {
                    this.move(speed, 0);
                }
        
                if(this.pos.x >= originX + distance) {
                    moveLeft = true;
                }
        
                if(this.pos.x <= originX - distance) {
                    moveLeft = false;
                }
            };

            return component;
        },
        vertical(config) {
            const distance = config.distance || 0;
            const speed = config.speed || 0;
            let moveUp = false;
            let originY = 0;

            const component = {};
            component.add = function () {
                originY = this.pos.y;
                this.addTag('platform');
            };
            component.update = function() {
                if(moveUp) {
                    this.move(0, -speed);
                } else {
                    this.move(0, speed);
                }
        
                if(this.pos.y >= originY + distance) {
                    moveUp = true;
                }
        
                if(this.pos.y <= originY - distance) {
                    moveUp = false;
                }
            };

            return component;
        }
    }
};
