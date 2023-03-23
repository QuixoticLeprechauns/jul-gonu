// add canvas to the script
(function () {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");
})();

// initialize config variables here
let canvas, ctx;

// set game patameters
let board_size = 4, line_scale = 1/8;

// initialize game with parameters

class Pawn {
  constructor(location = { x: 0, y: 0 }, suit = "dimgray") {
    this.location = location;
    this.suit = suit;
  }

  draw(scale, current_suit) {
    // destructuring
    const { location, suit } = this;

    // saves the current styles set elsewhere
    // to avoid overwriting them
    ctx.save();

    // set the styles for this shape
    ctx.fillStyle = this.suit;

    let line_size = scale * line_scale;

    ctx.lineWidth = line_size;

    // create the *path*
    ctx.beginPath();
    ctx.strokeStyle = "black";

    // set up scale and stuff
    let p_scale = 0.5;
    let p_size = scale * p_scale;
    let p_offset = p_size * 0.5;

    ctx.rect(
      this.location.x * scale + p_offset,
      this.location.y * scale + p_offset,
      p_size,
      p_size
    );

    // draw the path to screen
    ctx.fill();
    ctx.stroke();

    ctx.lineWidth = line_size / 2;
    if (current_suit == this.suit) {
      ctx.strokeStyle = "gold";
    } else {
      ctx.strokeStyle = "white";
    }

    ctx.stroke();

    ctx.restore();
  }
}

class board {
  constructor(size = 4) {
    this.size = size;
    this.stones = Array(size * 2);
    this.selected_stone_index = -1;
    this.current_suit = "dimgray";
    this.scale = canvas.width / this.size;
  }

  get_pawn(x = 0, y = 0) {
    for (let i = 0; i < this.stones.length; i++) {
      if (this.stones[i].location.x === x && this.stones[i].location.y === y) {
        return i;
      }
    }
    return -1;
  }

  capture_pawns(stone, stones) {
    // check this stone for nearby pawns

    let dirs = [
      { x: 1, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: -1 },
      { x: 0, y: 1 },
    ];
    for (let k = 0; k < 4; k++) {
      let capturable = Array(0);

      // right
      for (let i = 1; i < this.size; i++) {
        let pawn_i = this.get_pawn(
          stone.location.x + dirs[k].x * i,
          stone.location.y + dirs[k].y * i
        );
        if (pawn_i === -1) {
          break;
        }
        if (stones[pawn_i].suit != stone.suit) {
          capturable.push(stones[pawn_i]);
        }

        if (stones[pawn_i].suit === stone.suit) {
          // remove the previous pawns
          for (let j = 0; j < capturable.length; j++) {
            stones.splice(
              this.get_pawn(capturable[j].location.x, capturable[j].location.y),
              1
            );
          }
          break;
        }
      }
    }
  }

  draw_board() {
    // blank the screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw the eight lines and stuff
    ctx.save();

    // start with selection box thing... I want yellow
    if (
      this.selected_stone_index != -1 &&
      this.stones[this.selected_stone_index].suit === this.current_suit
    ) {
      ctx.beginPath();
      ctx.fillStyle = "gold";
      ctx.strokeStyle = "darkorange";

      ctx.rect(
        this.stones[this.selected_stone_index].location.x * this.scale +
          this.scale * 0.1,
        this.stones[this.selected_stone_index].location.y * this.scale +
          this.scale * 0.1,
        0.8 * this.scale,
        0.8 * this.scale
      );
      ctx.fill();
      ctx.stroke();
    }

    // horiz lines
    for (let i = 0; i < 4; i++) {
      ctx.beginPath();
      ctx.lineWidth = this.scale * line_scale;
      ctx.strokeStyle = "darkgray";
      let dx1, dy1, dx2;
      dx1 = 0.5 * this.scale;
      dy1 = this.scale * i + 0.5 * this.scale;
      dx2 = canvas.width - 0.5 * this.scale;

      ctx.moveTo(dx1, dy1);
      ctx.lineTo(dx2, dy1);
      ctx.stroke();
    }

    // virt lines
    for (let i = 0; i < 4; i++) {
      ctx.beginPath();
      ctx.lineWidth = this.scale * line_scale;
      ctx.strokeStyle = "darkgray";
      let dx1, dy1, dy2;
      dy1 = 0.5 * this.scale;
      dx1 = this.scale * i + 0.5 * this.scale;

      dy2 = canvas.height - 0.5 * this.scale;
      ctx.moveTo(dx1, dy1);
      ctx.lineTo(dx1, dy2);
      ctx.stroke();
    }

    // horiz flavor
    for (let i = 0; i < 4; i++) {
      ctx.beginPath();
      ctx.lineWidth = this.scale * line_scale * 0.5;
      ctx.strokeStyle = "white";
      let dx1, dy1, dx2;
      dx1 = 0.5 * this.scale;
      dy1 = this.scale * i + 0.5 * this.scale;

      dx2 = canvas.width - 0.5 * this.scale;
      ctx.moveTo(dx1, dy1);
      ctx.lineTo(dx2, dy1);
      ctx.stroke();
    }

    // virt flavor
    for (let i = 0; i < 4; i++) {
      ctx.beginPath();
      ctx.lineWidth = this.scale * line_scale * 0.5;
      ctx.strokeStyle = "white";
      let dx1, dy1, dy2;
      dy1 = 0.5 * this.scale;
      dx1 = this.scale * i + 0.5 * this.scale;

      dy2 = canvas.height - 0.5 * this.scale;
      ctx.moveTo(dx1, dy1);
      ctx.lineTo(dx1, dy2);
      ctx.stroke();
    }

    ctx.restore();

    // draw pawns
    for (let i = 0; i < this.stones.length; i++) {
      this.stones[i].draw(this.scale, this.current_suit);
    }
  }

  set_board() {
    this.stones = Array(this.size * 2);
    this.current_suit = "tomato";
    for (let i = 0; i < this.stones.length; i++) {
      if (i < this.size) {
        this.stones[i] = new Pawn({ x: i, y: 0 }, "dimgray");
      } else {
        this.stones[i] = new Pawn(
          { x: i - this.size, y: this.size - 1 },
          "tomato"
        );
      }
    }
  }
}

let game_board;

function on_click(event) {
  // get mouse location as board coordinates
  let bx = ~~(
    (event.offsetX - 0.5 * game_board.scale) / game_board.scale +
    0.5
  );
  let by = ~~(
    (event.offsetY - 0.5 * game_board.scale) / game_board.scale +
    0.5
  );

  for (let i = 0; i < game_board.stones.length; i++) {
    // select a pawn
    if (
      game_board.stones[i].location.x === bx &&
      game_board.stones[i].location.y === by
    ) {
      game_board.selected_stone_index = i;
      game_board.draw_board();
      return;
    }
  }

  // if selection is valid
  if (
    game_board.selected_stone_index != -1 &&
    game_board.stones[game_board.selected_stone_index].suit ===
      game_board.current_suit
  ) {
    // check if move is in range
    let distx =
      game_board.stones[game_board.selected_stone_index].location.x - bx;
    let disty =
      game_board.stones[game_board.selected_stone_index].location.y - by;
    let dist = Math.sqrt(distx * distx + disty * disty);

    if (dist === 1) {
      game_board.stones[game_board.selected_stone_index].location.x = bx;
      game_board.stones[game_board.selected_stone_index].location.y = by;

      game_board.capture_pawns(
        game_board.stones[game_board.selected_stone_index],
        game_board.stones
      );
      // invalidate current selection
      game_board.selected_stone_index = -1;

      // flop current suit
      if (game_board.current_suit == "dimgray") {
        game_board.current_suit = "tomato";
      } else {
        game_board.current_suit = "dimgray";
      }
    }
  }
  game_board.draw_board();
}

// setup config variables and start the program
function init() {
  canvas = document.getElementById("gameCanvas");
  canvas.onclick = on_click;

  ctx = canvas.getContext("2d");

  game_board = new board(board_size);
  game_board.set_board();

  game_board.draw_board();
}

// wait for the HTML to load
document.addEventListener("DOMContentLoaded", init);
