(function(window, document, undefined){
	
	var CTL = {
		version: '0.0.1',
	}

	var total_elevators = [];  //no limit in total elevators
	var max_floor;

	CTL.maxFloor = function(number){
		max_floor = number;
	}

	CTL.elevator = function(){
		//initializing elevator properties
		var elevator = {
			id: generateId(), //assign an unique number for each elevator, assume generateId() will return a uniq id
			occupied: false,
			trips: 0,
			floor: 1,
			destination:null,
			floor_passed:0
		}

		total_elevators.push({'key':elevator.id, 'value':elevator});
		return elevator;
	}

	function generateId(){
		return Math.floor(Math.random() * 2000);
	}

	var floors_inQueue = [];
	CTL.floorRequested = function(onFloor){ //TODO: add floor requests in a queue, so we can complete all requests as new person make a request on a floor.
		floors_inQueue.push(onFloor);
		return findEv(onFloor);
	}
	
	function findEv(floor){
	}

	window.CTL = CTL;

}(window, document));
