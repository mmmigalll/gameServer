
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
	var xS = 920;
	var yS = 150;
	
	var game = new Rect(0, 0, 1000, 400); // створюємо поле для бою
	var warrior = new Warrior(x, y, "Misha", 15, 100); // створюємо поле персонаж warrior
	var wizard = new Wizard(xS, yS, "Petya", 10, 250); // створюємо поле персонаж wizard

	var counterClick = 0; // лічильник для визначення парності або непарності кліку (в залежності від ліч. ходить один або інший герой)

	$("#f1").text(warrior.name + "(Warrior) health: " + warrior.health);
	$("#f2").text(wizard.name + "(Wizard) health: " + wizard.health);

	var xQ = $("#x").html();
	var yQ = $('#y').html();

	if (xQ && yQ){
		x = xQ;
		y = 400 - yQ;
		var vxQ;
		var vyQ;
		var distanceQ = 0;
		var counterQ = 0;
		var x2Q = warrior.x;
		var y2Q = warrior.y;

		if (Math.abs(x - x2Q) > Math.abs(y - y2Q)){
			vxQ = 5 * (x - x2Q) / Math.abs(x - x2Q);
			vyQ = 5 * (y - y2Q) / Math.abs(x - x2Q);
		}

		else if (Math.abs(x - x2Q) < Math.abs(y - y2Q)){
			vxQ = 5 * (x - x2Q) / Math.abs(y - y2Q);
			vyQ = 5 * (y - y2Q) / Math.abs(y - y2Q);
		}

		var sQ = Math.sqrt(vxQ * vxQ + vyQ * vyQ);

		//alert(vX + ' ' + vY);
		var img;

		var background = document.getElementById("textures");
		var canvasQ = document.getElementById("myCanvas");
		context = canvasQ.getContext("2d");
		canvasQ.width = game.width;
		canvasQ.height = game.height;

		var moveObjectQ = {}; // параметри для переачі даних про героїв і поля бою в метод "прорисовки" руху або бою
		moveObjectQ.x = x;
		moveObjectQ.y = y;
		moveObjectQ.vX = vxQ;
		moveObjectQ.vY = vyQ;
		moveObjectQ.game = game;
		moveObjectQ.enemy = wizard;
		moveObjectQ.background = background;
		moveObjectQ.distance = distanceQ;
		warrior.drawMove(sQ, counterQ, 0, moveObjectQ);
	}


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

					var d1 = Line.distanceMeasure(hero.x, hero.y,  barriers[i].x, barriers[i].y);
					var d2 = Line.distanceMeasure(hero.x, hero.y,  barriers[i].x, barriers[i].y + 40);
					var d3 = Line.distanceMeasure(hero.x, hero.y,  barriers[i].x + 40, barriers[i].y);
					var d4 = Line.distanceMeasure(hero.x, hero.y,  barriers[i].x + 40, barriers[i].y + 40);

					var min = Math.min(d1, d2, d3, d4);


					console.log("___BAR___");

					if (min === d1){
						x = barriers[i].x - 20;
						y = barriers[i].y - 20;
					}
					else if(min === d2){
						x = barriers[i].x - 20;
						y = barriers[i].y + 20;
					}
					else if(min === d3){
						x = barriers[i].x + 20;
						y = barriers[i].y - 20;
					}
					else {
						x = barriers[i].x + 20;
						y = barriers[i].y + 20;
					}

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
					console.log(x11 + "x" + y11);
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



