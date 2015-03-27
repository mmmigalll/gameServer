function Hero(x, y, name, power, speed) { //клас Hero від якого наслідуються інші класи (Warrior, Wizard)
    this.x = x;
    this.y = y;
    this.name = name;
    this.power = power;
    this.speed = speed;

    this.draw = function(img, x, y){
        context.drawImage(img, x, y);
    };
}

Hero.prototype = {
    constructor: Hero,
    health: 100,
    isDead: false,
    range: 60,
    rangeMove: 100,

    canAttack: function(enemy){ //перевырка на можливіть атакувати
        var vect = new Vector(this.x, this.y);
        if (vect.checkDistance(enemy, this.range) && this.health > 0){
            return true;
        }
        else{
            return false;
        }
    },

    moveTo: function(xEnd, yEnd, vX, vY, game, sPerson, img, background, hero, distance){ // метод руху персонажів
        if ((Math.abs(this.x - xEnd) > 5 || Math.abs(this.y - yEnd) > 5) && distance < this.rangeMove){

            var x = this.x;
            var y = this.y;
            x += vX;
            y += vY;

            this.x = Math.round(x);
            this.y = Math.round(y);

            game.draw(background);

            var i;

            if (hero === 0){
                i = document.getElementById("herowiz3");
            }
            else
            {
                i = document.getElementById("hero1");
            }
            sPerson.draw(i, sPerson.x, sPerson.y);
            this.draw(img, x, y);
        }
        else{
            var img1;
            var i1;

            if (vX > 0){
                if (hero === 0){
                    img1 = document.getElementById("hero1");
                    i1 = document.getElementById("herowiz3");
                }
                else{
                    img1 = document.getElementById("herowiz1");
                    i1 = document.getElementById("hero1");
                }

            }
            else{
                if (hero === 0){
                    img1 = document.getElementById("hero3");
                    i1 = document.getElementById("herowiz3");
                }
                else{
                    img1 = document.getElementById("herowiz3");
                    i1 = document.getElementById("hero1");
                }
            }

            game.draw(background);
            sPerson.draw(i1, sPerson.x, sPerson.y);
            this.draw(img1, this.x, this.y);

            clearInterval(timer);
        }
    },

    fight: function(enemy){ // метод бою
        var p;
        var eH = enemy.health * 20;
        var power = Math.random() * (25 - 1) * this.power + 1;
        var criticalStrike = Math.floor(Math.random() * (5 - 2 + 1)) + 2;
        var k = 0;

        if (power > 20 * this.power){
            eH -= power * criticalStrike;
            console.log(this.name + 'Critical strike ' + criticalStrike + 'x : ' + power * criticalStrike);
            p = "Critical strike " + "x" + criticalStrike + ": " + power * criticalStrike;
        }
        else{
            k = 1;
            eH -= power;
            console.log(this.name + 'Power boom ' + power);
            p = 'Power boom ' + power;
        }
        enemy.health = Math.round(eH / 20);
        if (enemy.health > 0){
            if (k === 0){

            }
            else {

            }
        }
        else {
            enemy.health = 0;
           // $("#abHero1").html(enemy.name + "is dead");
            console.log(enemy.name + "is dead");
            $("#winner").text(this.name + " WIN!!!");
            enemy.isDead = true;
        }
        return p;
    }

}

function Warrior(x, y, name, power, speed){ //клас Warrior
    Hero.call(this, x, y, name, power, speed);
}

Warrior.prototype = new Hero();
Warrior.prototype.constructor = Warrior;

Warrior.prototype.drawMove = function(s, counter, counterClick, moveO){

    var img;
    var self = this;
    var x = moveO.x;
    var y = moveO.y;
    var vX = moveO.vX;
    var vY = moveO.vY;
    var game = moveO.game;
    var enemy = moveO.enemy;
    var background = moveO.background;
    var distance = moveO.distance;

    timer = setInterval(function () {
        distance += s;

        if (counter % 2 === 0) {
            if (vX > 0) {
                img = document.getElementById("hero1");
            }
            else {
                img = document.getElementById("hero3");
            }

        }
        else {
            if (vX > 0) {
                img = document.getElementById("hero2");
            }
            else {
                img = document.getElementById("hero4");
            }

        }

        self.moveTo(x, y, vX, vY, game, enemy, img, background, 0, distance);
        counter++;
    }, 10000 / self.speed);
    counterClick++;
    return counterClick;
};

Warrior.prototype.drawFight = function(enemy, game, background){
    var self = this;
    var counter = 0;
    var img;
    var imE = document.getElementById("herowiz3");

    var timer = setInterval(function(){
        if (counter % 2 !== 0){
            img = document.getElementById("hero1");
        }
        else{
            img = document.getElementById("herofight");
        }
        game.draw(background);
        self.draw(img, self.x, self.y);

        enemy.draw(imE, enemy.x, enemy.y);

        console.log(counter);
        counter++;
    }, 125);
    setTimeout(function(){
        clearInterval(timer);
    }, 1000);
    if (enemy.isDead){
        alert(self.name + " WIN!!!");
        imE = document.getElementById("herowizdead");
    }
};

Warrior.prototype.drawDead = function(enemy, game, background){
    var self = this;
    var img = document.getElementById("herodead");
    var imE = document.getElementById("herowiz1");
    game.draw(background);
    self.draw(img, self.x, self.y);
    enemy.draw(imE, enemy.x, enemy.y);
}

function Wizard(x, y, name, power, speed){ // клас Wizard
    Hero.call(this, x, y, name, power, speed);
}

Wizard.prototype = new Hero();
Wizard.prototype.constructor = Wizard;

Wizard.prototype.range = 100;
Wizard.prototype.drawMove = function(s, counter, counterClick ,moveO){
    var img;
    var self = this;
    var x = moveO.x;
    var y = moveO.y;
    var vX = moveO.vX;
    var vY = moveO.vY;
    var game = moveO.game;
    var enemy = moveO.enemy
    var background = moveO.background;
    var distance = moveO.distance;
    timer = setInterval(function () {
        distance += s;
        if (counter % 2 === 0) {
            if (vX > 0) {
                img = document.getElementById("herowiz1");
            }
            else {
                img = document.getElementById("herowiz3");
            }

        }
        else {
            if (vX > 0) {
                img = document.getElementById("herowiz2");
            }
            else {
                img = document.getElementById("herowiz4");
            }

        }
        //draw(game, warrior, wizard, vX, vY, x, y, img, background, distance, 0);
        self.moveTo(x, y, vX, vY, game, enemy, img, background, 1, distance);
        counter++;
    }, 10000 / self.speed);
    counterClick++;
    return counterClick;
};

Wizard.prototype.drawFight = function(enemy, game, background){
    var self = this;
    var counter = 0;
    var img;
    var imE = document.getElementById("hero1");
    var timer = setInterval(function(){
        if (counter % 2 !== 0){
            img = document.getElementById("herowiz3");
        }
        else{
            img = document.getElementById("herowizfight");
        }
        game.draw(background);
        self.draw(img, self.x, self.y);

        enemy.draw(imE, enemy.x, enemy.y);

        console.log(counter);
        counter++;
    }, 125);
    setTimeout(function(){
        clearInterval(timer);
    }, 1000);
    if (enemy.isDead){
        alert(self.name + " WIN!!!");
        imE = document.getElementById("herodead");
    }
};

Wizard.prototype.drawDead = function(enemy, game, background){
    var self = this;
    var img = document.getElementById("herowizdead");
    var imE = document.getElementById("hero1");
    game.draw(background);
    self.draw(img, self.x, self.y);
    enemy.draw(imE, enemy.x, enemy.y);
}
