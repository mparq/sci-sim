var SimulationPageChoiceModel = function(args) {
    args = args || {};

    this.id = args.id;
    this.type = args.type;
    this.text = args.text;
    this.destination = args.destination;
    this.tag = args.tag;

    this.isNew = true;
};

/**
 * Enum representing different choice types.
 *
 * IMPORTANT: Values must be the same as they are in the database tables
 * @type {[type]}
 */
SimulationPageChoiceModel.TYPES = Object.freeze({
    BINARY: "binary",
    QUESTION: "question",
    PROMPT: "prompt"
});

/**
 * Takes in a json object from api call and returns a new SimulatioPageChoiceModel
 *
 * See API documentation for more information on object that is passed in.
 *
 * @param  {{}}                 sim     json objects representing a simulation page section
 * @return {SimulationModel}            An SimulationPageSectionModel representing a simulation page section
 */
SimulationPageChoiceModel.from_object = function(choice) {
    choice = new SimulationPageChoiceModel(choice);
    choice.isNew = false;
    return choice;
};

SimulationPageChoiceModel.prototype.setType = function(type) {
    this.type = type;
};

SimulationPageChoiceModel.prototype.setText = function(text) {
    this.text = text;
};

SimulationPageChoiceModel.prototype.setDestination = function(destination) {
    this.destination = destination;
};

SimulationPageChoiceModel.prototype.setTag = function(tag) {
    this.tag = tag;
};
