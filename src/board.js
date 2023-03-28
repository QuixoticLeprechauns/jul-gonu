import "./player.js";
import "./point.js";

export class Board
{
    constructor(size = 4)
    {
        this.size = size;
        this.turn = 0;
        this.players = [new Player(size, 'dimgray'), new Player(size, 'tomato')];

        // init pawn locations
        for(let i = 0; i < size; i++)
        {
            this.players[0].set_pawn(i, i, 0);
            this.players[1].set_pawn(i, i, size-1);
        }
    }

    select_pawn(location)
    {
        for(let i = 0; i < players[turn].pawns.length; i++)
        {
            if(players[turn].pawns[i].location === location)
            {
                players[turn].selection_index = i;
            }
        }
    }

    attempt_move_pawn(location)
    {
        // if movement was valid, cycle turn
        this.turn = (this.turn + 1) % this.players.length;
    }

    find_pawn(location)
    {
        for(let j = 0; j < this.players.length; j++)
        {
            for(let i = 0; i < players[j].pawns.length; i++)
            {
                if(players[j].pawns[i].location === location)
                {
                    // returns {player index, pawn index}
                    return new Point(j, i);
                }
            }
        }
        return new Point(-1, -1);
    }

    perform_captures(location)
    {

        let dirs = [
            { x: 1, y: 0 },
            { x: -1, y: 0 },
            { x: 0, y: -1 },
            { x: 0, y: 1 },
          ];
        
        //
        for(let i = 0; i < dirs.length; i++)
        {
            let captures = Array(0);

            // scan in each direction
            // if there is an enemy pawn in direction, mark capture
            for(let j = 0; j < this.size; j++)
            {
                let locus_delta = new point(this.players[this.turn].pawns[selection_index].location.x + (j * dirs.x), this.players[this.turn].pawns[selection_index].location.y + (j * dirs.y));
                let found_index = find_pawn(locus_delta);

                if(found_index != new point(-1, -1))
                {
                    // if friendly pawn is found, apply capture 
                    if(found_index.x === this.turn)
                    {
                        // apply captures
                        for(let k = 0; k < captures.length; k++)
                        {
                            players[captures[k].x].remove_pawn(captures[k].y);
                        }
                        break; // end capture, go to next direction
                    }
                    else
                    {
                        // mark for capture, both player index, and pawn index
                        captures.push(found_index);
                    }
                }
                else
                {
                    break; // capture invalid, go to next direction
                }
            }
        }
    }
}
