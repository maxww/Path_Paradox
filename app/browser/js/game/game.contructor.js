'use strict';

//GAME///

class Game {
    constructor(name) {
        this.name = name;
        this.count = 35;
        this.board = new Board().drawBoard();
        this.players = [];
        this.availableMarkers = ["red", "pink", "yellow", "green", "jade", "sky", "ocean", "purple"];

        //index of the currentPlayer in the players
        this.currentPlayerIndex;
		this.deck = new Deck();
        this.dragon = null;
        this.moves;
    }

    getCurrentPlayer() {
        if (this.currentPlayerIndex === -1) return;
        return this.players[this.currentPlayerIndex];
    }

    moveAllPlayers() {
        this.players.forEach((player) => player.keepMoving(player))
    }

    getDeadPlayerTiles() {
        var deadPlayersTiles = [];
        console.log(this.players)
        this.players.forEach(function (player) {

            if (!player.canPlay && player.tiles.length > 0 && player.tiles.length < 3) {
                console.log(player.tiles)
                // deadPlayersTiles.push(player.tiles);
                deadPlayersTiles.concat(player.tiles);
            }
        });
        console.log("deadPlayersTiles", deadPlayersTiles)
        return deadPlayersTiles;
    }

    checkOver(spaceArr) {
        console.log(this.getCanPlay());
        return this.getCanPlay().length <= 1;
    }

    //to be called at the end of a turn to set the currentPlayerIndex to the next eligible player in the players array;
    nextCanPlay() {
        if (this.getCanPlay().length === 1) return -1;

            console.log(this.currentPlayerIndex, "currentPlayerIndex", "players", this.players)
            var newIdx = this.currentPlayerIndex + 1 >= this.players.length ? 0 : this.currentPlayerIndex + 1;
            console.log("newIdx", newIdx)
            while (newIdx < this.players.length && !this.players[newIdx].canPlay) {
                newIdx++;
                if (newIdx === this.players.length) newIdx = 0;
                console.log(newIdx)
            }
            this.currentPlayerIndex = newIdx;
						console.log("player index is now", newIdx);
						return this.currentPlayerIndex;
    }

    deal(num) {

				return this.deck.deal(num);

    }

    getCanPlay() {
        return this.players.filter((player) => {
            return player.canPlay
        })
    }

}
