
function Rect(x, y, width, height){ // функція клнструктор поля для бою
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.draw = function(img)
	{
		var barr = document.getElementById("bar");
		context.drawImage(img, 0, 0);
		context.drawImage(barr, 250, 50);
		context.drawImage(barr, 400, 250);
		context.drawImage(barr, 700, 200);
	};
}

var timer;
var context;

$(document).ready(function(){
	var canClick = true;
	var x = 0;
	var y = 150;
	var xS = 500;
	var yS = 150;
	
	var game = new Rect(0, 0, 1000, 400); // створюємо поле для бою
	var warrior = new Warrior(x, y, "Misha", 15, 100); // створюємо поле персонаж warrior
	var wizard = new Wizard(xS, yS, "Petya", 10, 250); // створюємо поле персонаж wizard

	var counterClick = 0; // лічильник для визначення парності або непарності кліку (в залежності від ліч. ходить один або інший герой)

	$("#f1").text(warrior.name + "(Warior) health: " + warrior.health);
	$("#f2").text(wizard.name + "(Wizard) health: " + wizard.health);

	$("#myCanvas").click(function(e){
		if (canClick){ // якщо не закінчився бій
			var vX = 0;
			var vY = 0;

			clearInterval(timer);

			var x2;
			var y2;

			if (counterClick % 2 !== 0){
				x2 = wizard.x;
				y2 = wizard.y;
			}
			else{
				x2 = warrior.x;
				y2 = warrior.y;
			}

			var distance = 0;
			var counter = 0;

			var canvas = document.getElementById("myCanvas");
			context = canvas.getContext("2d");

			var pos = $(this).offset(); // визначаємо координати кліку миші
			var elem_left = pos.left;
			var elem_top = pos.top;

			var x1 = Math.round(e.pageX - elem_left);
			var y1 = Math.round(e.pageY - elem_top);

			x = x1 - 25;
			y = y1 - 30;

			if (Math.abs(x - x2) > Math.abs(y - y2)){
				vX = 5 * (x - x2) / Math.abs(x - x2);
				vY = 5 * (y - y2) / Math.abs(x - x2);
			}

			else if (Math.abs(x - x2) < Math.abs(y - y2)){
				vX = 5 * (x - x2) / Math.abs(y - y2);
				vY = 5 * (y - y2) / Math.abs(y - y2);
			}

			var s = Math.sqrt(vX * vX + vY * vY);

			//alert(vX + ' ' + vY);
			var img;

			var background = document.getElementById("textures");

			canvas.width = game.width;
			canvas.height = game.height;

			var print;
			var print2;
			var hero;
			var enemy;
			var h;

			if (counterClick % 2 === 0){
				hero = warrior; // якщо counterClick - парний, то буде ходити І-гий герой, а інший очікує
				enemy = wizard;
				print = $('#actionH1');
				print2 = $('#f2');
				h = 0;


				$("#second").css("background-color", "gray");
				$("#second .heroAction").css("background-color", "gray");

				$("#first").css("background-color", "#8bc163");
				$("#first .heroAction").css("background-color", "#8bc163");
			}
			else{
				hero = wizard;  // якщо counterClick - парний, то буде ходити ІІ-гий герой, а інший очікує
				enemy = warrior;
				print = $('#actionH2');
				print2 = $('#f1');
				h = 1;

				$("#first").css("background-color", "gray");
				$("#first .heroAction").css("background-color", "gray");

				$("#second").css("background-color", "#8bc163");
				$("#second .heroAction").css("background-color", "#8bc163");
			}
			$('#heroMove').text(hero.name);
			$('#enemyWait').text(enemy.name);

			for (var i in barriers){
				var d = Line.distanceMeasure(hero.x, hero.y, barriers[i].x, barriers[i].y)
				if (Line.dotOnLine(hero.x, hero.y, x1, y1, barriers[i].x, barriers[i].y ) && d < hero.rangeMove){

					console.log("___BAR___");
					x = barriers[i].x - 70;
					y = barriers[i].y - 70;

					console.log("b" + barriers[i].x+'X'+ barriers[i].y);
					console.log('Hero moves from' + hero.x + "X" + hero.y);
					console.log('to ' + x1 + "x" + y1);

					if (Math.abs(x - x2) > Math.abs(y - y2)){
						vX = 5 * (x - x2) / Math.abs(x - x2);
						vY = 5 * (y - y2) / Math.abs(x - x2);
					}

					else if (Math.abs(x - x2) < Math.abs(y - y2)){
						vX = 5 * (x - x2) / Math.abs(y - y2);
						vY = 5 * (y - y2) / Math.abs(y - y2);
					}
					s = Math.sqrt(vX * vX + vY * vY);
				}
			}

			var moveObject = {}; // параметри для переачі даних про героїв і поля бою в метод "прорисовки" руху або бою
			moveObject.x = x;
			moveObject.y = y;
			moveObject.vX = vX;
			moveObject.vY = vY;
			moveObject.game = game;
			moveObject.enemy = enemy;
			moveObject.background = background;
			moveObject.distance = distance;

			if (hero.canAttack(enemy)){ // чи може герой атакувати ворога (чи живий, і чи позволяє Range)
				$("#myCanvas").mousemove(function(e){

					var pos1 = $(this).offset(); // визначаємо координати кліку миші
					var elem_left1 = pos1.left;
					var elem_top1 = pos1.top;

					var x11 = Math.round(e.pageX - elem_left1);
					var y11 = Math.round(e.pageY - elem_top1);
					console.log(x11 + "x" + y11)
					console.log(enemy.x + "xx" + enemy.y);
					if (x11 > hero.x && x11 < hero.x + 55 && y11 > hero.y && y11 < hero.y + 77){
						$("#myCanvas").mousemove(function(){
							$(this).css("cursor", "url('../img/curs1.png'), auto");
						});
					}
					else{
						$("#myCanvas").mousemove(function(){
							$(this).css("cursor", "url('../img/curs.png'), auto");
						});
					}
				});


				if (x1 > enemy.x && x1 < enemy.x + 55 && y1 > enemy.y && y1 < enemy.y + 77){ // якщо курсор миші наведений на enemy то атакувати



					var p = hero.fight(enemy); // метод нанесення удару
					hero.drawFight(enemy, game, background); // "прорисовка" атаки

					console.log(enemy.name + ": " + enemy.health);

					print.html( "<p>" + hero.power + "</p>" + "<p>" +hero.speed + "</p>" + "<p>" + p + "</p>");
					if (h === 0){
						print2.text(enemy.name + "(Wizard) health: " + enemy.health );
					}
					else{
						print2.text(enemy.name + "(Warior) health: " + enemy.health );
					}

					if (enemy.isDead){
						$("#myCanvas").mousemove(function(){
							$(this).css("cursor", "url('../img/curs.png'), auto");
						});

						enemy.drawDead(hero, game, background); // якщо герой мертвий, малюємо його "мертве" положення
						canClick = false;

					}
					/*hero.draw(h1, hero.x, hero.y);
					 enemy.draw(h2, enemy.x, enemy.y);*/
					if (!enemy.isDead){
						counterClick++;
					}
				}
				else {
					counterClick = hero.drawMove(s, counter, counterClick, moveObject); // метод руху персонажа
				}

			}
			else {

				$("#myCanvas").mousemove(function(){
					$(this).css("cursor", "url('../img/curs.png'), auto");
				});

				counterClick = hero.drawMove(s, counter, counterClick, moveObject);  // метод руху персонажа
				print.html("<p>" + hero.power + "</p>" + "<p>" +hero.speed + "</p>" + "<p>" + "ENEMY IS UNTOUCHABLE" + "</p>");
			}
		}
	});
});



