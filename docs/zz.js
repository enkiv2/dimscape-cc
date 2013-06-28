const CELL_HEIGHT = 20;
const CELL_SEP = 10;
const XPOS = 1;
const XNEG = 2;
const YPOS = 3;
const YNEG = 4;
// Not used at the moment
const ZPOS = 5;
const ZNEG = 6;

function Cell(ctx, x, y, str, fill, stroke, stroke_width)
{
	this.x = x;
	this.y = y;
	this.str = str;
	this.width = ctx.measureText(str).width;
	this.text_offset = 2;
	this.fill = fill;
	this.stroke = stroke;
	this.stroke_width = stroke_width;
}

Cell.prototype["paint"] = function (ctx)
{
	ctx.save();
	
	ctx.fillStyle=this.fill;
	ctx.strokeStyle=this.stroke;
	ctx.lineWidth=this.stroke_width;

	// Draw rectangle

	ctx.fillRect(this.x, this.y, this.width, CELL_HEIGHT);
	ctx.strokeRect(this.x, this.y, this.width, CELL_HEIGHT);

	// Draw text inside at offset (2,2)

	ctx.fillText(this.str, this.x+this.text_offset, 
			this.y+this.text_offset, this.width);
	
	ctx.restore();
};

function getFigure(fig)
{
	return document.getElementById(fig).getContext("2d");
}

function createRoot(ctx, x, y, str, active)
{
	if (typeof(active) == "undefined")
	{
		active = true;
	} else if (typeof(active) != "boolean")
	{
		return null;
	}
	var stroke = active ? "black" : "gray";

	return new Cell(ctx, x, y, str, "tan", stroke, 4);
}

function createNav(ctx, xstr, ystr, zstr, fill)
{
	var yc = new Cell(ctx, CELL_SEP, 
			CELL_SEP+CELL_HEIGHT, ystr, fill, "black", 2);
	var xc = new Cell(ctx, CELL_SEP+yc.width, 
			CELL_SEP, xstr, fill, "black", 2);
	var zc = new Cell(ctx, CELL_SEP+yc.width, 
			CELL_SEP+CELL_HEIGHT, zstr, fill, "black", 2);

	var oldStroke = ctx.strokeStyle;
	ctx.strokeStyle="red";
	ctx.strokeRect(CELL_SEP+yc.width/2, CELL_SEP+CELL_HEIGHT/2, 
			yc.width/2, CELL_HEIGHT);
	ctx.moveTo(CELL_SEP+yc.width/2, CELL_SEP+CELL_HEIGHT/2);
	ctx.lineTo(CELL_SEP+yc.width, CELL_SEP+CELL_HEIGHT);
	ctx.strokeStyle=oldStroke;
	for (var a in Array(yc, xc, zc))
	{
		a.paint(ctx);
	}
}

function createCell(ctx, root, dir, str)
{
	if (dir < 1 || dir > ZNEG)
	{
		alert("Bad direction detected");
		return null;
	}
	var cell = new Cell(ctx, root.x, root.y, str, "tan", "black", 2);
	switch (dir)
	{
		case XPOS:
			cell.x = root.x + root.width + CELL_SEP;
			break;
		case XNEG:
			cell.x = root.x - (cell.width + CELL_SEP);
			break;
		case YPOS:
			cell.y = root.y + CELL_HEIGHT + CELL_SEP;
			break;
		case YNEG:
			cell.y = root.y - (CELL_HEIGHT + CELL_SEP);
			break;
		case ZPOS:
		case ZNEG:
			break;
		default:
			break;
	}
	connectCells(ctx, root, cell, dir);
	cell.paint(ctx);
}

function connectCells(ctx, root, cell, dir)
{
	var larger = (root.width > cell.width) ? root : cell;
	switch(dir)
	{
		case XPOS:
			ctx.moveTo(root.x+root.width, root.y+CELL_HEIGHT/2);
			ctx.lineTo(root.x+root.width+CELL_SEP,
					root.y+CELL_HEIGHT/2);
			break;
		case XNEG:
			ctx.moveTo(root.x, root.y-CELL_HEIGHT/2);
			ctx.lineTo(root.x-CELL_SEP,
					root.y+CELL_HEIGHT/2);
			break;
		case YPOS:
			ctx.moveTo(x
			break;
		case YNEG:
			break;
		case ZPOS:
		case ZNEG:
			break;
		default:
			break;
	}
}

