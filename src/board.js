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

    find_pawn(location)
    {
        for(let j = 0; j < this.players.length; j++)
        {
            for(let i = 0; i < players[j].pawns.length; i++)
            {
                if(players[j].pawns[i].location === location)
                {
                    return new point(j, i);
                }
            }
        }
        return new point(-1, -1);
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
                            players[(turn + 1) % 2].remove_pawn(captures[k]);
                        }
                        break; // end capture, go to next direction
                    }
                    else
                    {
                        // mark for capture
                        captures.push(locus_delta);
                    }
                }
                else
                {
                    break; // capture invalid, go to next direction
                }
            }
            //
        }


        

          for (let k = 0; k < 4; k++)
          {
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
}
