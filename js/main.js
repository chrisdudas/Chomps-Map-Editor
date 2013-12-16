var MAPDATA = [
	[[[0]], [[0]], [[0]], [[0]], [[0]]],
	[[[0]], [[1]], [[1]], [[1]], [[0]]],
	[[[0]], [[1]], [[1], [100, "right"]], [[1]], [[0]]],
	[[[0]], [[1]], [[1]], [[1]], [[0]]],
	[[[0]], [[0]], [[0]], [[0]], [[0]]]
]

BrushPanel = function() {
	// BrushPanel is responsible for allowing the user to choose what the 
	//  active action should be when interacting with the map
	var selectedTile

	var fillTileList = function() {
		$tilelist = $("#tilelist")

		for (var groupname in TILES_BY_CATEGORY) {
			var $group = $("<div />").addClass("group")
			var tiles = TILES_BY_CATEGORY[groupname]

			var $groupheader = $("<h3 />").text(groupname)
			$group.append($groupheader)

			$.each(tiles, function(index, tileid) {
				var tile_schema = TILE_SCHEMA[tileid]

				var $tile = $("<div />").addClass("tile")
				$tile.data("tileid", tileid)
				var tile_image = Array.isArray(tile_schema[1]) ? tile_schema[1][0] : tile_schema[1]
				$tile.css("background-image", "url(" + TILEIMG_PATH + tile_image + ")")

				$tile.on("click", function() {
					selectTile($(this).data("tileid"), $(this))
				})

				$group.append($tile)
			})

			$tilelist.append($group)
		}
	}

	var selectTile = function(tileid, target) {
		console.log(tileid) ///////
		console.log(target) ///////

		if (selectedTile != tileid) { // Tile was already selected - deselect
			var doactivate = true
		}

		$("#tilelist .selected").removeClass("selected")

		if (doactivate) {
			selectedTile = tileid
			target.addClass("selected")

			$("#active-control").text(tileid)
		}
		else {
			selectedTile = null
			$("#active-control").text("")
		}
	}

	var getSelectedTileBrush = function() {}

	var init = function() {
		fillTileList()
	}

	return {
		fillTileList: fillTileList,
		selectTile: selectTile,
		init: init
	}
}();

var MapControl = function() {
	// MapControl is responsible for holding and controlling the display of the
	//  map
	var updateDisplay = function(mapdata) {
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

	var refreshCell = function(celldata, $cell) {
		$cell.empty()

		$(celldata).each(function() {
			var unitdata = this
			var $unit = $("<div />").addClass("unit")
			var direction = TileStore.getUnitDirection(unitdata)

			$unit.css("background-image", "url(" + TILEIMG_PATH + TileStore.getUnitImage(unitdata[0], direction) + ")")

			$cell.append($unit)
		})
	}

	var initResizeControls = function() {
		$("#add_row_top").on("click", function() { addRowToMap("unshift") })
		$("#add_row_bottom").on("click", function() { addRowToMap("push") })
		$("#add_column_left").on("click", function() { addColumnToMap("unshift") })
		$("#add_column_right").on("click", function() { addColumnToMap("push") })
	}

	var addRowToMap = function(arrayMethod) {
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

		updateDisplay(MAPDATA)
	}

	var addColumnToMap = function(arrayMethod) {
		var colsize = MAPDATA.length

		for (var i = 0; i < colsize; i++) {
			if (arrayMethod == "push") {
				MAPDATA[i].push([])
			}
			else if (arrayMethod == "unshift") {
				MAPDATA[i].unshift([])
			}
		}

		updateDisplay(MAPDATA)
	}

	var init = function() {
		initResizeControls()
		updateDisplay(MAPDATA)
	}

	return {
		init: init
	}
}()

var TileStore = function() {
	// TileStore is responsible for supplying tile information
	var getUnitSchema = function(unit_id) {
		var unit_schema = TILE_SCHEMA[unit_id]
		return unit_imageset = unit_schema[1]
	}

	var getUnitDirection = function(unit_data) {
		if (unitHasProperty(unit_data, "up")) return "up"
		if (unitHasProperty(unit_data, "right")) return "right"
		if (unitHasProperty(unit_data, "down")) return "down"
		if (unitHasProperty(unit_data, "left")) return "left"
		return false
	}

	var getUnitImage = function(unit_id, direction) {
		var schema = getUnitSchema(unit_id)
		var image_schema = schema[1]

		if (direction == "up") return image_schema[0]
		if (direction == "right") return image_schema[1]
		if (direction == "down") return image_schema[2]
		if (direction == "left") return image_schema[3]
		return false
	}

	var unitHasProperty = function(unit_data, property) {
	return $.inArray(property, unit_data, 1) != -1
}

	return {
		getUnitSchema: getUnitSchema,
		getUnitDirection: getUnitDirection,
		getUnitImage: getUnitImage,
		unitHasProperty: unitHasProperty
	}
}()

// Init
$(function() { 
	BrushPanel.init()
	MapControl.init()
})
