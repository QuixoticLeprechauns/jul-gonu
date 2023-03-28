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