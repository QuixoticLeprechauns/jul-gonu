(function(){let t=document.getElementById("gameCanvas").getContext("2d")})();var n,e,u=4,_=1/8,y=class{constructor(t={x:0,y:0},o="dimgray"){this.location=t,this.suit=o}draw(t,o){let{location:i,suit:l}=this;e.save(),e.fillStyle=this.suit;let a=t*_;e.lineWidth=a,e.beginPath(),e.strokeStyle="black";let c=t*.5,h=c*.5;e.rect(this.location.x*t+h,this.location.y*t+h,c,c),e.fill(),e.stroke(),e.lineWidth=a/2,o==this.suit?e.strokeStyle="gold":e.strokeStyle="white",e.stroke(),e.restore()}},x=class{constructor(t=4){this.size=t,this.stones=Array(t*2),this.selected_stone_index=-1,this.current_suit="dimgray",this.scale=n.width/this.size}get_pawn(t=0,o=0){for(let i=0;i<this.stones.length;i++)if(this.stones[i].location.x===t&&this.stones[i].location.y===o)return i;return-1}capture_pawns(t,o){let i=[{x:1,y:0},{x:-1,y:0},{x:0,y:-1},{x:0,y:1}];for(let l=0;l<4;l++){let a=Array(0);for(let d=1;d<this.size;d++){let c=this.get_pawn(t.location.x+i[l].x*d,t.location.y+i[l].y*d);if(c===-1)break;if(o[c].suit!=t.suit&&a.push(o[c]),o[c].suit===t.suit){for(let h=0;h<a.length;h++)o.splice(this.get_pawn(a[h].location.x,a[h].location.y),1);break}}}}draw_board(){e.clearRect(0,0,n.width,n.height),e.save(),this.selected_stone_index!=-1&&this.stones[this.selected_stone_index].suit===this.current_suit&&(e.beginPath(),e.fillStyle="gold",e.strokeStyle="darkorange",e.rect(this.stones[this.selected_stone_index].location.x*this.scale+this.scale*.1,this.stones[this.selected_stone_index].location.y*this.scale+this.scale*.1,.8*this.scale,.8*this.scale),e.fill(),e.stroke());for(let t=0;t<4;t++){e.beginPath(),e.lineWidth=this.scale*_,e.strokeStyle="darkgray";let o,i,l;o=.5*this.scale,i=this.scale*t+.5*this.scale,l=n.width-.5*this.scale,e.moveTo(o,i),e.lineTo(l,i),e.stroke()}for(let t=0;t<4;t++){e.beginPath(),e.lineWidth=this.scale*_,e.strokeStyle="darkgray";let o,i,l;i=.5*this.scale,o=this.scale*t+.5*this.scale,l=n.height-.5*this.scale,e.moveTo(o,i),e.lineTo(o,l),e.stroke()}for(let t=0;t<4;t++){e.beginPath(),e.lineWidth=this.scale*_*.5,e.strokeStyle="white";let o,i,l;o=.5*this.scale,i=this.scale*t+.5*this.scale,l=n.width-.5*this.scale,e.moveTo(o,i),e.lineTo(l,i),e.stroke()}for(let t=0;t<4;t++){e.beginPath(),e.lineWidth=this.scale*_*.5,e.strokeStyle="white";let o,i,l;i=.5*this.scale,o=this.scale*t+.5*this.scale,l=n.height-.5*this.scale,e.moveTo(o,i),e.lineTo(o,l),e.stroke()}e.restore();for(let t=0;t<this.stones.length;t++)this.stones[t].draw(this.scale,this.current_suit)}set_board(){this.stones=Array(this.size*2),this.current_suit="tomato";for(let t=0;t<this.stones.length;t++)t<this.size?this.stones[t]=new y({x:t,y:0},"dimgray"):this.stones[t]=new y({x:t-this.size,y:this.size-1},"tomato")}},s;function f(r){let t=~~((r.offsetX-.5*s.scale)/s.scale+.5),o=~~((r.offsetY-.5*s.scale)/s.scale+.5);for(let i=0;i<s.stones.length;i++)if(s.stones[i].location.x===t&&s.stones[i].location.y===o){s.selected_stone_index=i,s.draw_board();return}if(s.selected_stone_index!=-1&&s.stones[s.selected_stone_index].suit===s.current_suit){let i=s.stones[s.selected_stone_index].location.x-t,l=s.stones[s.selected_stone_index].location.y-o;Math.sqrt(i*i+l*l)===1&&(s.stones[s.selected_stone_index].location.x=t,s.stones[s.selected_stone_index].location.y=o,s.capture_pawns(s.stones[s.selected_stone_index],s.stones),s.selected_stone_index=-1,s.current_suit=="dimgray"?s.current_suit="tomato":s.current_suit="dimgray")}s.draw_board()}function g(){n=document.getElementById("gameCanvas"),n.onclick=f,e=n.getContext("2d"),s=new x(u),s.set_board(),s.draw_board()}document.addEventListener("DOMContentLoaded",g);
//# sourceMappingURL=index.js.map