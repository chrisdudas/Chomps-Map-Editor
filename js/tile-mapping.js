var TILEIMG_PATH = "tileimg/"

var TILE_SCHEMA = {}
TILE_SCHEMA[0] = ["Wall", "wall.png"]
TILE_SCHEMA[1] = ["Grass", "grass.png"]
TILE_SCHEMA[2] = ["Water", "water.png"]
TILE_SCHEMA[15] = ["Water Boots", "flippers.png"]
TILE_SCHEMA[100] = ["Player", ["dog_up.png", "dog_right.png", "dog_down.png", "dog_left.png"]]
TILE_SCHEMA[16] = ["Bug", ["bug_up.png", "bug_right.png", "bug_down.png", "bug_left.png"]]
TILE_SCHEMA[17] = ["Teeth", ["teeth_up.png", "teeth_right.png", "teeth_down.png", "teeth_left.png"]]
TILE_SCHEMA[200] = ["Movable Block", "block.png"]

var TILES_BY_CATEGORY = {
	"Ground": [
		0, 1, 2
	],
	"Item": [
		15
	],
	"Unit": [
		16, 17
	],
	"Other": [
		100, 200
	]
}
