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

    remove_pawn(pawn)
    {
        for(let i = 0; i < this.pawns.length; i++)
        {
            if(this.pawns[i] === pawn)
            {
                this.pawns.splice(i, 1);
                this.selection_index = -1;
                return;
            }
        }
    }
}