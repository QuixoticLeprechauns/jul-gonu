import "bulma/css/bulma.css";
import "./point.js";
import "./player.js";
import "./board.js";

// add canvas to the script
(function ()
{
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
})();

function drawRect(g = ctx, x = 0, y = 0, width = 0, height = 0, stroke = 0, color = "lime")
{
    g.save();
    g.beginPath();
    g.lineWidth = stroke;
    g.strokeStyle = color;
    g.rect(x, y, width, height);
    g.stroke();
    g.restore();
}

function fillRect(g = ctx, x, y, width, height, color = "lime")
{
    g.save();
    g.beginPath();
    g.fillStyle = color;
    g.rect(x, y, width, height);
    g.fill();
    g.restore();
}

function drawLine(x1 = 0, y1 = 0, x2 = 0, y2 = 0, stroke = 0, color = "lime")
{
    g.save();
    g.beginPath();
    g.lineWidth = stroke;
    g.strokeStyle = color;
    
    g.moveTo(x1, y1);
    g.lineTo(x2, y1);

    g.stroke();
    g.restore();
}

function getBoardScale(board, display)
{
    return display.width / board.size;
}

class Session
{
    constructor(board_size)
    {
        this.board = new Board(board_size);
    }
}

let session = new Session(4);

function on_click(event)
{
    // calculate the scale of the pawns on the board
    let board_scale = getBoardScale(session.board, canvas), board_half_scale = board_scale * 0.5;

    // translate click location to pawn coordinates
    let board_x = ~~((event.offsetX - board_half_scale) / board_scale + 0.5);
    let board_y = ~~((event.offsetY - board_half_scale) / board_scale + 0.5);
    let board_p = new Point(board_x, board_y);
    
    // grab selection
    let selected = session.board.find_pawn(board_p);

    // check if pawn is here
    if(selected != new Pawn(-1, -1))
    {  
        // check if pawn is current player
        if(selected.x === session.board.turn)
        {
            // select that pawn
            session.board.players[selected.x].selection_index = selected.y;
        }
    }
    else // this cell is empty
    {
        // move currently selected pawn to this location
        session.board.attempt_move_pawn(board_p);
    }

}