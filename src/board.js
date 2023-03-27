import "player.js"

export class board
{
    constructor(size = 4)
    {
        this.size = size;
        this.turn = 0;
        this.players = [new player(size, 'dimgray'), new player(size, 'tomato')];

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
}
