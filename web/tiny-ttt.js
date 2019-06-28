var game = 0;
var PLAYERBIT = 9;
var TURNBIT = 18;

function mask(bit) { return 1 << bit; }
function set(x, bit) { return x | mask(bit); }
function get(x, bit) { return (x >> bit) & 1; }
function clear(x, bit) { return x & ~mask(bit); }
function toggle(x, bit) { return x ^ mask(bit); }

function rawState() {
	return game;
}

function reset() {
	game = 0;
}

function turn() {
	return get(game, TURNBIT);
}

function nextTurn() {
	game = toggle(game, TURNBIT);
}

function play(loc) {
	if (get(game, loc) || get(game, loc + PLAYERBIT || checkDraw() || checkWin())) return false; 
	game = set(game, loc + (turn() * PLAYERBIT));
	return true;	
}

var winConditions = [0b111, 0b111000, 0b111000000, 0b1001001, 0b10010010, 0b100100100, 0b100010001, 0b1010100];

function checkWin() {
	var player = game >> (turn() * PLAYERBIT);
	for (i = 0; i < winConditions.length; i++) {
		if ((player & winConditions[i]) == winConditions[i]) {
			return winConditions[i]
		}
	}
	return 0;
}

function checkTie() {
	return ((game | game >> PLAYERBIT) & 0b111111111) == 0b111111111;
}
