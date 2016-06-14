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
			id: generateId(), //assign an unique number for each elevator, pretend generateId() would return a uniq id
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
	//TODO: add floor requests in a queue, so we can complete all requests as new person make a request on a floor.
	CTL.floorRequested = function(onFloor){ 
		floors_inQueue.push(onFloor);
		return findElevator(onFloor);
	}

	function findElevator(floor){
		var result_elevator;

		result_elevator = findOnSameFloor(floor);

		if (!result_elevator){
			result_elevator = findPassingFloor(floor);
		}

		if (!result_elevator){
			result_elevator = findDifferentFloor(floor);
		}

		return result_elevator;

	}

	function findOnSameFloor(floor){
		for(var i = 0; i < total_elevators.length; i++){
			var ev = total_elevators[i].value;
			if(ev.occupied === false && ev.floor == floor){
				return ev
			}
		}
		return false;
	}

	function findPassingFloor(floor){
		for(var i = 0; i < total_elevators.length; i++){
			var ev = total_elevators[i].value;
			if(ev.occupied === true){
				if ((ev.destination - ev.floor) > 0) { //going up
					if (floor >= ev.floor && floor <= ev.destination) {
						return ev;
					}
				} else {  //going down
					if (floor <= ev.floor && floor >= ev.destination) {
						return ev;
					}					
				}
			}
		}
		return false;		
	}

	function findDifferentFloor(floor){
		for(var i = 0; i < total_elevators.length; i++){
			var ev = total_elevators[i].value;
			if(ev.occupied === false && ev.floor != floor){
				return ev
			}
		}
		return false;		
	}

	function updateElevator(ev){
		for(var i = 0; i < total_elevators.length; i++){
			if(ev.id == total_elevators[i].key){
				total_elevators[i].value = ev;
				total_elevators[i].value.trips += 1;
				return total_elevators[i].value;
			}
		}		
	}

	CTL.goToFloor = function(ev, newFloor){
		ev.destination = newFloor;
		ev.occupied = true;
		ev.trips += 1;
		ev.floor_passed += Math.abs(ev.floor - ev.destination);  //get absolute value and track floors passed
		return updateElevator(ev);
	}

	window.CTL = CTL;

}(window, document));
