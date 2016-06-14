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
		var result_elevator;

		for(var i = 0; i < total_elevators.length; i++){
			//Priority:			
			//find if it is unoccupied and on the same floor
			//find if it is occupied and moving pass this floor
			//find if it is unoccupied and on a different floor

			var ev = total_elevators[i].value;
			ev.trips = ev.trips + 1;
			
			
			if (!result_elevator){ 
				
				if(ev.occupied === false && ev.floor == floor){
					result_elevator = ev;
				}else if (ev.occupied){
					if ((ev.destination - ev.floor) > 0) { //going up
						if (floor > ev.floor && floor < ev.destination) {
							result_elevator = ev;
						}
					} else {  //going down
						if (floor < ev.floor && floor > ev.destination) {
							result_elevator = ev;
						}					
					}
				}else if (ev.occupied === false){
					result_elevator = ev;
				}					
			}

				

		}

		return result_elevator;
	}

	window.CTL = CTL;

}(window, document));
