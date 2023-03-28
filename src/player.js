import "point.js";

export class player
{
    constructor (count = 4, color = 'magenta')
    {
        this.pawns = Array(count);
        this.color = color;
        this.selection_index = -1;
        this.last_move = [new point(), new point()];
    }

    set_pawn(index, x = 0, y = 0)
    {
        this.pawns[index] = new point(x, y);
    }

    move_selected_pawn(location)
    {
        // selection out of bounds, return invalid
        if(this.selection_index === -1 || this.selection_index >= this.pawns.length)
        {
            return -1;
        }

        // calculate distance between selected pawn and desired location
        let dx = this.pawns[selection_index].x - location.x;
        let dy = this.pawns[selection_index].y - location.y;
        let dist = Math.sqrt((dx * dx) + (dy * dy));

        // if move is valid, change pawn location and return 0
        if(dist === 1)
        {
            this.pawns[this.move_selected_pawn] = location;
            this.selection_index = -1;
            return 0;
        }
        // movement invalid, return invalid
        return -1;
    }

    remove_pawn(index)
    {
        this.pawns.splice(index, 1);
        this.selection_index = -1;
    }
}