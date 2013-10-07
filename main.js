var MAPDATA = [
	[[[0]], [[0]], [[0]], [[0]], [[0]]],
	[[[0]], [[1]], [[1]], [[1]], [[0]]],
	[[[0]], [[1]], [[1], [100, "right"]], [[1]], [[0]]],
	[[[0]], [[1]], [[1]], [[1]], [[0]]],
	[[[0]], [[0]], [[0]], [[0]], [[0]]]
]

function fillTileList() {
	$tilelist = $("#tilelist")

	for (var groupname in TILES_BY_CATEGORY) {
		var $group = $("<div />").addClass("group")
		var tiles = TILES_BY_CATEGORY[groupname]

		var $groupheader = $("<h3 />").text(groupname)
		$group.append($groupheader)

		$(tiles).each(function() {
			var tileid = this
			var tile_schema = TILE_SCHEMA[tileid]

			var $tile = $("<div />").addClass("tile")
			var tile_image = Array.isArray(tile_schema[1]) ? tile_schema[1][0] : tile_schema[1]
			$tile.css("background-image", "url(" + TILEIMG_PATH + tile_image + ")")

			$tile.on("click", function() {
				$(this).toggleClass("selected")
			})

			$group.append($tile)
		})

		$tilelist.append($group)
	}
}

function drawMapToScreen(mapdata) {
	$map = $("<div />").addClass("map")

	$(mapdata).each(function() {
		var rowdata = this
		var $row = $("<div />").addClass("row")

		$(rowdata).each(function() {
			var celldata = this
			var $cell = $("<div />").addClass("cell")

			refreshCell(celldata, $cell)

			$row.append($cell)
		}) 		

		$map.append($row)
	})

	$("#maparea").empty().append($map)

	$("#maineditor").width($("#maparea").width() + 38)
					.height($("#maparea").height())
}

function refreshCell(celldata, $cell) {
	$cell.empty()

	$(celldata).each(function() {
		var unitdata = this
		var $unit = $("<div />").addClass("unit")

		$unit.css("background-image", "url(" + TILEIMG_PATH + getImageForUnit(unitdata) + ")")

		$cell.append($unit)
	})
}

function getImageForUnit(unitdata) {
	var unit_schema = TILE_SCHEMA[unitdata[0]]
	var unit_schema_image = unit_schema[1] 					

	if (Array.isArray(unit_schema_image)) {
		if (unitHasProperty(unitdata, "up")) {
			return unit_schema_image[0]
		}
		else if (unitHasProperty(unitdata, "right")) {
			return unit_schema_image[1]
		}
		else if (unitHasProperty(unitdata, "down")) {
			return unit_schema_image[2]
		}
		else if (unitHasProperty(unitdata, "left")) {
			return unit_schema_image[3]
		}
		else { // default to up
			return unit_schema_image[0]
		}
	}
	else {
		return unit_schema_image
	}
}

function unitHasProperty(unitdata, property) {
	return $.inArray(property, unitdata, 1) != -1
}

// Init
$(function() { 
	fillTileList()
	drawMapToScreen(MAPDATA)
	bindMapResizeControls()
})

function bindMapResizeControls() {
	$("#add_row_top").on("click", function() { addRowToMap("unshift") })
	$("#add_row_bottom").on("click", function() { addRowToMap("push") })
	$("#add_column_left").on("click", function() { addColumnToMap("unshift") })
	$("#add_column_right").on("click", function() { addColumnToMap("push") })
}

function addRowToMap(arrayMethod) {
	var rowsize = MAPDATA[0].length

	var row = []
	for (var i = 0; i < rowsize; i++) {
		row.push([])
	}

	if (arrayMethod == "push") {
		MAPDATA.push(row)
	}
	else if (arrayMethod == "unshift") {
		MAPDATA.unshift(row)
	}

	drawMapToScreen(MAPDATA)
}

function addColumnToMap(arrayMethod) {
	var colsize = MAPDATA.length

	for (var i = 0; i < colsize; i++) {
		if (arrayMethod == "push") {
			MAPDATA[i].push([])
		}
		else if (arrayMethod == "unshift") {
			MAPDATA[i].unshift([])
		}
	}

	drawMapToScreen(MAPDATA)
}