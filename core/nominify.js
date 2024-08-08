onerror = function(){}
class WorldGraphic extends PIXI.Graphics {
	
	
	constructor(x, y, texture){
		super(x, y, texture);
		this.render = function() {};
		this.displayGroup = game.render.underLifeLayer;
		this.failed = false;
		this.jobCount = 0;
		this.fixedInPlace = true;
		this.built = false;
		this.failedCount = 0;
		this.tick = function() {};
		this.killOnBuild = false;
		this.id = game.randID();
		this.data = {};
		this.interactive = false;
		this.hitArea = new PIXI.Rectangle(0, 0, 0, 0); //Set to non interactive by default
	}
	
	isInteractive() {
		this.interactive = true;
		//When setting hit area back up, u must take into account the anchor, seems like a bug i guess.
		this.hitArea = new PIXI.Rectangle(0, 0, this.width, this.height); //Setup hit area
	}
	
	isFullscreen() {
		//console.log("Adding to fullscreen");
		this.fullscreen = true;
		game.world.addToIndex('fullscreen', this);
	}
	
	stickTo(stickTo, offsetX, offsetY) {
		if(offsetX === undefined) {
			offsetX = 0;
		}
		if(offsetY === undefined) {
			offsetY = 0;
		}
		this.stickToObject = stickTo
		game.world.addToIndex('stickto', this);
		this.x = stickTo.x + offsetX;
		this.y = stickTo.y + offsetY;
		
		this.offsetX = offsetX;
		this.offsetY = offsetY;
		
	}
	
	ticker(tickerFunc) {
		game.world.addToIndex('ticker', this);
		this.tickerFunc = tickerFunc;
		
	}
	
	
	isCenter(offsetX, offsetY, stickTo) {
		if(offsetX === undefined) {
			offsetX = 0;
		}
		if(offsetY === undefined) {
			offsetY = 0;
		}
		if(stickTo === undefined) {
			stickTo = "center"
		}
		this.stickTo = stickTo
		//console.log("Adding to center");
		this.center = true;
		game.world.addToIndex('center', this);
		this.offsetX = offsetX;
		this.offsetY = offsetY;
		game.render.doSticky(this);
	}
	
	destroy() {
		//console.log("Running world graphic extended destroy");
		if(this.resizable == true) {
			game.world.removeFromIndex('fullscreen', this, false);
		}
		if(this.center == true) {
			game.world.removeFromIndex('center', this, false);
		}
		if(game.world.index.ticker !== undefined) {
				if(this.ticker !== undefined) {
					game.world.removeFromIndex('ticker', this, false);
				}
			}
		if(this.stickToObject !== undefined) {
			game.world.removeFromIndex('stickto', this, false);
		}
		game.world.removeFromAllIndexes(this, false)
		try {
			return super.destroy();
		} catch(e) {
			//console.log(e);
		}
	}
	
}

class WorldSprite extends PIXI.Sprite {
	
	
	constructor(x, y, texture){
		super();
		if (texture !== undefined) {
			PIXI.Sprite.call(this, texture);
		} else {
			PIXI.Sprite.call(this);
		}
		this.id = game.randID();
		this.x = x;
		this.y = y;
		this.interactive = false;
		this.hitArea = new PIXI.Rectangle(0, 0, 0, 0); //Set to non interactive by default
		
	}
	
	isInteractive() {
		this.interactive = true;
		//When setting hit area back up, u must take into account the anchor, seems like a bug i guess.
		this.hitArea = new PIXI.Rectangle(-this.width*this.anchor.x, -this.height*this.anchor.y, this.width, this.height); //Setup hit area
	}
	
	
	isFullscreen() {
		//console.log("Adding to fullscreen");
		this.fullscreen = true;
		game.world.addToIndex('fullscreen', this);
	}
	
	stickTo(stickTo, offsetX, offsetY) {
		if(offsetX === undefined) {
			offsetX = 0;
		}
		if(offsetY === undefined) {
			offsetY = 0;
		}
		this.stickToObject = stickTo
		game.world.addToIndex('stickto', this);
		this.x = stickTo.x + offsetX;
		this.y = stickTo.y + offsetY;
		
		this.offsetX = offsetX;
		this.offsetY = offsetY;
		
	}
	
	isCenter(offsetX, offsetY, stickTo) {
		if(offsetX === undefined) {
			offsetX = 0;
		}
		if(offsetY === undefined) {
			offsetY = 0;
		}
		if(stickTo === undefined) {
			stickTo = "center"
		}
		this.stickTo = stickTo
		//console.log("Adding to center");
		this.center = true;
		game.world.addToIndex('center', this);
		this.offsetX = offsetX;
		this.offsetY = offsetY;
		game.render.doSticky(this);
	}
	
	destroy() {
		//console.log("Running world graphic extended destroy");
		if(this.resizable == true) {
			game.world.removeFromIndex('fullscreen', this, false);
		}
		if(this.center == true) {
			game.world.removeFromIndex('center', this, false);
		}
		if(this.stickToObject !== undefined) {
			game.world.removeFromIndex('stickto', this, false);
		}
		game.world.removeFromAllIndexes(this, false)
		if(!this.__destroyed) {
			try {
			super.destroy();
			this.destroy = function(){/*TODO: Check this ...//console.log("Long destroy");*/};
			} catch(e) {}
		}
	}
	
}

class WorldText extends PIXI.Text {
	constructor(text, style){
		super(text, style);
		this.id = game.randID();
		if(game.world !== undefined) {
			if(game.world.index !== undefined) {
				game.world.addToIndex('text', this);
			}
		}
		this.interactive = false;
		this.hitArea = new PIXI.Rectangle(0, 0, 0, 0); //Set to non interactive by default
	}
	
	isInteractive() {
		this.interactive = true;
		//When setting hit area back up, u must take into account the anchor, seems like a bug i guess.
		this.hitArea = new PIXI.Rectangle(-this.width*this.anchor.x, -this.height*this.anchor.y, this.width, this.height); //Setup hit area
	}
	
	ticker(ticker) {
		game.world.addToIndex('ticker', this);
		this.tickerFunc = ticker;
		
	}
	
	isCenter(offsetX, offsetY, stickTo) {
		if(offsetX === undefined) {
			offsetX = 0;
		}
		if(offsetY === undefined) {
			offsetY = 0;
		}
		if(stickTo === undefined) {
			stickTo = "center"
		}
		this.stickTo = stickTo
		//console.log("Adding to center");
		this.center = true;
		game.world.addToIndex('center', this);
		this.offsetX = offsetX;
		this.offsetY = offsetY;
		game.render.doSticky(this);
	}
	
	stickTo(stickTo, offsetX, offsetY) {
		if(offsetX === undefined) {
			offsetX = 0;
		}
		if(offsetY === undefined) {
			offsetY = 0;
		}
		this.stickToObject = stickTo
		game.world.addToIndex('stickto', this);
		this.x = stickTo.x + offsetX;
		this.y = stickTo.y + offsetY;
		
		this.offsetX = offsetX;
		this.offsetY = offsetY;
		
	}
	
	destroy() {
		//console.log("Running text extended destroy");
		if(game.world.index !== undefined) {
			if(game.world.index.text !== undefined) {
				game.world.removeFromIndex('text', this, false);
			}
			
			if(game.world.index.ticker !== undefined) {
				if(this.ticker !== undefined) {
					game.world.removeFromIndex('ticker', this, false);
				}
			}
			if(this.center == true) {
				game.world.removeFromIndex('center', this, false);
			}
			if(this.stickToObject !== undefined) {
				game.world.removeFromIndex('stickto', this, false);
			}
			game.world.removeFromAllIndexes(this, false)
		}
		
		return super.destroy();
	}
	
	toJSON() {

		return false;

	};
	
}


class WorldObject extends PIXI.Sprite {
	constructor(x, y, texture){
		super();
		this.id = game.randID();

			game.debug("New world object :" + texture);
		if (texture !== undefined) {
			PIXI.Sprite.call(this, texture);
		} else {
			PIXI.Sprite.call(this);
		}
		this.x = x;
		this.y = y;
		this.width = 64;
		this.height = 64;

		this.render = function() {};
		this.displayGroup = game.render.underLifeLayer;
		this.failed = false;
		this.jobCount = 0;
		this.fixedInPlace = true;
		this.built = false;
		this.failedCount = 0;
		this.tick = function() {};
		this.killOnBuild = false;
		this.id = game.randID();
		this.data = {};
	}
	
	destroy(o) {
		if(!this.__destroyed) {
			try {
			game.world.removeFromAllIndexes(this, false);
			super.destroy(o);
			this.destroy = function(){/*TODO: Check this ...//console.log("Long destroy");*/};
			} catch(e) {}
		}
	}
	
	toJSON() {

		return {
			x: this.x,
			y: this.y,
			height: this.height,
			width: this.width,
			framex: this.texture.frame.x,
			framey: this.texture.frame.y,
			tileSetName: this.texture.tileSetName,
			built: this.built,
			id: this.id,
			itemid: this.itemid,
			data: this.data,
			name: this.name,
			cost: this.cost,
			direction: this.direction,
			readName: this.readName,
			codename: this.codename,
			alpha: this.alpha,
		};

	};
}

function WorldObjectAnim(x, y, frames) {

    PIXI.extras.AnimatedSprite.call(this, frames);
    
	
	this.interactive = false;
	this.hitArea = new PIXI.Rectangle(0, 0, 0, 0); //Set to non interactive by default
	
	
	this.isInteractive =function () {
		this.interactive = true;
		//When setting hit area back up, u must take into account the anchor, seems like a bug i guess.
		this.hitArea = new PIXI.Rectangle(-this.width*this.anchor.x, -this.height*this.anchor.y, this.width, this.height); //Setup hit area
	}
    
    this.x = x;
    this.y = y;
    this.width = 64;
    this.height = 64;

    this.render = function() {};
    this.displayGroup = game.render.underLifeLayer;
    this.failed = false;
    this.jobCount = 0;
    this.fixedInPlace = true;
    this.built = false;
    this.failedCount = 0;
    this.tick = function() {};
    this.killOnBuild = false;
    this.id = game.randID();
    this.data = {};
    this.toJSON = function() {

        return {
            x: this.x,
            y: this.y,
			height: this.height,
            width: this.width,
            framex: this.texture.frame.x,
            framey: this.texture.frame.y,
            tileSetName: this.texture.tileSetName,
            built: this.built,
            id: this.id,
            itemid: this.itemid,
            data: this.data,
			name: this.name,
			cost: this.cost,
			readName: this.readName,
			alpha: this.alpha,
			codename: this.codename,
        };

    };
}
WorldObjectAnim.prototype = Object.create(PIXI.extras.AnimatedSprite.prototype);

class Life extends WorldSprite {
	constructor(index, texture, dummy) {
		super(0,0,texture);
		game.debug("Creating life");
		
		this.id = game.randID();
		this.size = 25;
		this.calcattempts = 0;
		this.status = "wait";
		this.x = -100;
		this.y = -100;
		this.goingtox = 500;
		this.goingtoy = 500;
		this.distanceX = 0;
		this.distanceY = 0;
		this.emptied = true;
		this.path = [];
		this.rotation = 0;
		this.selected = false;
		this.width = game.lifeTileSize;
		this.collisionWidth = 25;
		this.collisionHeight = 25;
		this.maxPhaseAttempts = 9;
		var randNum = game.rand(0, game.ai.names.length);
		this.data = {
			speed : game.rand(60, 100),
		};
		this.jobs = [];
		this.level = 0;
		this.height = game.lifeTileSize;
		this.first = false;
		this.phaseAttempts = 0;
		this.direction = 1;
		randNum = game.rand(0, game.ai.names.length);
		this.name = game.ai.names[randNum];
		game.ai.names.splice(randNum, 1);
		this.index = index;
		if(!dummy) {
			this.parentGroup = game.render.lifeGroup;
		} 
		this.interactive = true;
		this.hitArea = new PIXI.Rectangle(0, 0, this.width, this.width); //Set to non interactive by default
	}
	
	toJSON() {
		
		return {
			x: this.x,
			y: this.y,
			job: this.job,
			data: this.data
		};
		
	};
	destroy() {
		
		//console.log("Custom life destroy: "+this.id);
		//console.log(this);
		return super.destroy();
	}
}

window.doRedraw = function() {
	
	

	var originalBodyStyle = getComputedStyle(document.body).getPropertyValue('display');
	document.body.style.backgroundColor='black';
    document.body.style.display='none';
    setTimeout(function () {
	
    document.body.style.display = originalBodyStyle;
	

	
	$("body").css("width", "1%");
	
	
	$("body").css("height", "1%");
	

	setTimeout(function(){
		$("body").css("width", "100%");
		$("body").css("height", "100%");	
	},1000);
	
	
	setTimeout(function(){
			game.render.draw.resize(window.innerWidth, window.innerHeight);
			
	}, 2000);
	
	
	setTimeout(function(){
			game.render.draw.resize(window.innerWidth, window.innerHeight);
	}, 3500);
	
	
	setTimeout(function(){
			game.render.draw.resize(window.innerWidth, window.innerHeight);
			
	}, 10000);
	
	
    }, 1000);
	document.scrollTop = 0
	
}

window.redraw = function () {
	
		if(game === undefined) {
			return false;
		}
		
		if(game.render === undefined) {
			return false;
		}
		
		if(game.render.draw === undefined) {
			return false;
		}
		
			doRedraw();
		

    
}

/*https://stackoverflow.com/questions/7919172/what-is-the-best-method-of-re-rendering-a-web-page-on-orientation-change*/

window.addEventListener('orientationchange', redraw);

window.addEventListener("pageshow", redraw, false);

/**
 * Number.prototype.format(n, x)
 * 
 * @param integer n: length of decimal
 * @param integer x: length of sections
 */
Number.prototype.format = function(n, x) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};


/*class Line extends PIXI.Graphics {
    constructor(points, lineSize, lineColor) {
        super();
        
        var s = this.lineWidth = lineSize || 5;
        var c = this.lineColor = lineColor || "0x000000";
        
        this.points = points;

        this.lineStyle(s, c)

        this.moveTo(points[0], points[1]);
        this.lineTo(points[2], points[3]);
    }
    
    updatePoints(p) {
        
        var points = this.points = p.map((val, index) => val || this.points[index]);
        
        var s = this.lineWidth, c = this.lineColor;
        
        this.clear();
        this.lineStyle(s, c);
        this.moveTo(points[0], points[1]);
        this.lineTo(points[2], points[3]);
    }
}*/

/*
//Bootstrap example
myCode = function() {
}
bootStrap.push(myCode);
*/


