function Vector(x, y){  // для обчислення руху героїв.
    this.x = x;
    this.y = y;
}
Vector.prototype = {
    constructor : Vector,

    add: function(vector) { // додавання векторів
        this.x += vector.x;
        this.y += vector.y;
    },

    sub: function(vector){ // віднімання векторів
        this.x -= vector.x;
        this.y -= vector.y;
    },

    scalProd: function(scalar){ // множення вектора на скаляр
        this.x *= scalar;
        this.y *= scalar;
    },
    /*
     метод перевірки, того чи персонаж противник знаходиться на відстані(distance) від даного персонажу
     використовується для перевірки можливості атакувати противника
     */
    checkDistance: function(vector, distance){
        if (Math.pow((vector.x - this.x), 2) + Math.pow((vector.y - this.y), 2) < distance * distance){
            return true;
        }
        else{
            return false;
        }
    },

    unitaryVect: function(){ // метод створення одничного вектора з напрямом даного вектора(використовується для створення опору середовища)
        var x;
        var y;
        if (this.x >= this.y){
            if (this.x === 0) {
                x = 0;
                y = 0;
            }
            else{
                x = this.x / this.x;
                y = this.y / this.x;
            }
        }
        else{
            if (this.y === 0) {
                x = 0;
                y = 0;
            }
            else{
                x = this.x / this.y;
                y = this.y / this.y;
            }
        }
        return new Vector(x, y);
    },

    showVector: function(){
        console.log("(" + this.x + ", " + this.y + ")" );
    }
};


var Line = {

    makeLine: function(xB , yB , xE, yE){
        var o = {};
        o.x = yE - yB;
        o.y = xB - xE;
        o.c = yB * (xE - xB) - xB * (yE - yB);
        return o;
    },

    dotOnLine: function(xB , yB , xE, yE ,dotPosX, dotPosY){
        var i;
        var j;
        var success = false;

        var x;
        var y = dotPosY;
        label:
            for (i = 1; i <= 100; i++) {
                x = dotPosX;
                for (j = 1; j <= 100; j++){
                    var line = this.makeLine(xB, yB, xE, yE);
                  //  console.log(line);
                    if ((line.x * x + line.y * y + line.c) === 0) {
                        success = true;
                        break label;
                    }
                    x++;
                }
                y++;
            }
        return success;
    },

    distanceMeasure: function(xH, yH, xBarr, yBarr){
        var s;

        s = Math.sqrt((xBarr - xH) * (xBarr - xH) + (yBarr - yH) * (yBarr - yH));

        return s;
    }
}

// клас, який описує навколишнє середовище
var Environment = {
    wind: function(vector){ // функція вітру
        var v = new Vector();
        v.a = Math.round(Math.random() * 20 - 10);
        v.b = Math.round(Math.random() * 20 - 10);
        vector.add(v);
        return vector;
    },

    envRes: function(vector){ // функція опору середовища
        var v = new Vector();
        v = vector.unitaryVect();
        vector.sub(v);
        return vector;
    }
}
