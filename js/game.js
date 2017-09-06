var round = 1;
var matrix = Array(3);
matrix['a'] = Array(3);
matrix['b'] = Array(3);
matrix['c'] = Array(3);

for (var i = 1; i <= 3; i++) {
	matrix['a'][i] = 0;
	matrix['b'][i] = 0;
	matrix['c'][i] = 0;
}


$(document).ready( function() {

	$('#game').hide();

	$('#btn-start').on('click', function() {

		var nickname1 = $('#nickname1');
		var nickname2 = $('#nickname2');

		if(nickname1.val() == "") {

			nickname1.css({
				'border': '1px solid red'
			});

			return false;

		} else {
			nickname1.css({
				'border': 'none'
			});

		}

		if(nickname2.val() == "") {
			nickname2.css({
				'border': '1px solid red'
			});

			return false;

		} else {
			nickname2.css({
				'border': 'none'
			});
			
		}
		$('#menu').hide();
		$('#game').show();

		$('#player1-nick').html(nickname1.val());
		$('#player2-nick').html(nickname2.val());

	});

	$('.game-position').on('click', function(){
		var id = this.id;
		move(id);
		
	});

	function move(id) {
		var id = '#' + id;
		var mark = '';
		var score = 0;

		if( (round % 2) == 1) {
			mark = 'url("images/mark1.png")';
			score--;
		} else {
			mark = 'url("images/mark2.png")';
			score++;
		}

		round++;

		$(id).css({
			'background-image': mark
		})

		$(id).off('click')

		var line = id.charAt(1);
		var column = id.charAt(2);

		matrix[line][column] = score;

		checkForGameOver();
	}

	function checkForGameOver() {
		var lineA = 0;
		var lineB = 0;
		var lineC = 0;
		console.log(matrix)
		for(var i = 1; i <= 3; i++) {
			lineA += matrix['a'][i];
			lineB += matrix['b'][i];
			lineC += matrix['c'][i];

		}
		winner(lineA);
		winner(lineB);
		winner(lineC);

		for(var i = 1; i <= 3; i++) {
			var score = 0;
			score += matrix['a'][i];
			score += matrix['b'][i];
			score += matrix['c'][i];

			winner(score);
		}

		var diag1 = matrix['a'][1] + matrix['b'][2] + matrix['c'][3];
		winner(diag1);
		var diag2 = matrix['a'][3] + matrix['b'][2] + matrix['c'][1];
		winner(diag2);

		

	};

	function winner(score) {
		if(score == -3) {
			var nick = $('#nickname1').val();
		} else if (score == 3) {
			var nick = $('#nickname2').val();
		} else {
			return false;
		}
		alert(nick +' won!');
		$('.game-position').off('click');
	}

});