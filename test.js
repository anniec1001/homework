(function(window, document, undefined){
	
	var CTL = {
		version: '0.0.1',
	}

	var total_elevators = [];  //no limit in total elevators

	CTL.elevator = function(){
		//initializing elevator properties
		var elevator = {
			id: id,
			occupied: false,
			trips: 0,
			floor: 1,
			destination:null,
			floor_passed:0
		}

		total_elevators.push({'key':elevator.id, 'value':elevator});
		return elevator;
	}



}(window, document));
