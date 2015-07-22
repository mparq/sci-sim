/**
 * Renderer for the Simulation Editor.
 *
 * Using the state of the model, the renderer may render different views to the
 * screen. It won't handle any logic of the editor itself, but it will need
 * to access the model and change what views to show based on the model's state.
 *
 * @param {SimulationEditorController} controller [Back reference to controller for passing on events]
 * @param {SimulationEditorModel} editor     [model which holds information on editor's state]
 */
var SimulationEditorRenderer = function(controller, editor) {
    this.controller = controller;
    this.editor = editor;

    // renderer takes charge of when to show/hide loader
    this.loading = false;

    this.views = {
        menuView: new SimulationEditorMenuView(editor),
        editorView: new SimulationEditorView(editor)
    };
};

/**
 * Generic render function that can be exposed to any controller. options
 * argument gives us flexibility but this process may need refactoring.
 *
 * @param  {Object} options hash of options key-valule pairs
 */
SimulationEditorRenderer.prototype.render = function(options) {
    console.log(this.editor.state);
    // TODO: Checking for ready state. Right now we assume model will be ready
    // by the time this page is rendered, but it could take a while to request
    // the simulations from the database.
    if (this.editor.state === SimulationEditorModel.STATE.MENU) {
        var html = this.views.menuView.template();
        ps.transitionPage(html);
        this.attachListeners();
    } else if (this.editor.state === SimulationEditorModel.STATE.EDITING) {
        var html = this.views.editorView.template();
        ps.transitionPage(html);
        this.attachListeners();
    }
};

/**
 * Attach listeners to elements on page to pass back to controller
 */
 SimulationEditorRenderer.prototype.attachListeners = function() {
    if (this.editor.state === SimulationEditorModel.STATE.MENU) {
        var $choices = $('.list-group-item');
        var $choice;
        for (var i=0; i<$choices.length; i++) {
            $choice = $($choices[i]);
            $choice.click(this.handleClicked.bind(this));
        }
    }
 };

/**
 * Some more rendering-specific handling can be done here if necessary but
 * leave all logic to the controller
 */
SimulationEditorRenderer.prototype.handleClicked = function(e) {
    if (this.editor.state === SimulationEditorModel.STATE.MENU) {
        var choice =  $(e.currentTarget).find("input").val();
        var menu_event = SimulationEditorModel.EVENT_CREATOR.MENU_ITEM_CLICKED(choice);
        console.log("handleClicked passing " + menu_event.name + " to controller");
        this.controller.handleEvent(menu_event);
    }
};
