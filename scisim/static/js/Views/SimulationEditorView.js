var SimulationEditorView = function(editor) {
    this.editor = editor;

    this.template = _.template(' \
    <% var simulation = this.editor.currentlyEditingSim; %>\
    <% console.log(simulation.description); %>\
    <div id="pages-container">\
    <table id="sim-info"> \
        <tbody>\
             <tr><td>Simulation name:</td>\
                <td><input type="text" value="<%= simulation.title %>"></td></tr>\
             <tr><td>Simulation password:</td>\
                <td><input type="text" value="<%= simulation.password %>"></td></tr>\
             <tr><td>Simulation description:</td>\
                <td><textarea value="<%= simulation.description %>"></textarea></td></tr>\
        </tbody>\
    </table>\
    <div id="pages">\
        <% var i=0; %>\
        <% _.each(simulation.pages, function(page) { %> \
            <div class="page" id="page-num-<%= i %>">\
               <div class="page-header"><h3 onclick="updateTitle(this)"><%= page.id %></h3></div>\
               <table><tbody><tr><td><div class="header">Page Title: </div></td>\
                    <td><input type="text" class="header" value="<%= page.title %>"></td></tr>\
                    </tbody>\
                </table>\
                <span></span>\
                <% var page_sections = _.union(page.sections, page.choices); %>\
\
                <% if (page.sections.length > 0) { %>\
                    <h3>Existing Sections</h3> \
                    <% _.each(page.sections, function(section) {  %>\
                                       \
                                       \
                        <div class="content raw-content"> \
                            <textarea class="raw-html" id="<%= section.id %>">\
                                <%= section.content %> \
                            </textarea> \
                            <div> <button onClick="removeSection(this)">Remove Section</button> </div> \
                        </div> \
                    <% }); %>\
                <% } %> \
                <% if (page.choices.length > 0) { %> \
                    <h3>Existing Choices</h3> \
                    <% _.each(page.choices, function(choice) { %>\
\
                        <div class="content choice-content">\
                            <p>Choice text: \
                                <textarea class="btn-desc"> \
                                    <%= choice.text %> \
                                </textarea> \
                            </p> \
                            <p>Choice link: '
+ '\
                                <button class="dropdown tag" onclick="createDropdownofPages(this)"><%= choice.destination %></button> \
                            </p> \
                            <p>Choice type: \
                                <select> \
                                    <option value="question" <% if (choice.type === SimulationPageChoiceModel.TYPES.QUESTION) {%> selected <% } %>>Question</option> \
                                    <option value="prompt" <% if (choice.type === SimulationPageChoiceModel.TYPES.PROMPT) { %> selected <% } %>>Prompt</option> \
                                    <option value="binary" <% if (choice.type === SimulationPageChoiceModel.TYPES.BINARY) { %> selected <% } %>>Binary</option> \
                                </select> \
                            </p> \
                        </div> \
                    <% }); %> \
                <% } %> \
                <div id="add-elem-<%= i %>">\
                    <button class="glyphicon glyphicon-font add-text" onClick="addElement("text",<%= i %>)">   Text</button>\
                    <button class="glyphicon glyphicon-picture add-image" onClick="addElement("image",<%= i %>)">   Media</button>\
                    <button class="glyphicon glyphicon-edit add-input" onClick="addElement("input",<%= i %>)">   Input</button>\
                    <button class="glyphicon glyphicon-share add-choice" onClick="addElement("button",<%= i %>)">   Choice</button>\
                    <button class="glyphicon glyphicon-share add-link" onClick="addElement("link", <%= i %>)">   Link</button>\
                </div>\
                <span></span>\
            </div>\
            <% i = i + 1 %>\
        <% }); %>\
\
        <div class="page" id="page-num-<%= i %>">\
            <div class="page-header"><h3 onclick="updateTitle(this)">New Page</h3></div>\
            <table><tbody><tr><td><div class="header">Page Title: </div></td>\
                <td><input type="text" class="header" value="New Page"></td></tr>\
                </tbody>\
            </table>\
            <span></span>\
            <div id="add-elem-<%= i %>">\
                <span></span>\
                <button class="glyphicon glyphicon-font" onClick="addElement("text",<%= i %>)">   Text</button>\
                <button class="glyphicon glyphicon-picture" onClick="addElement("image",<%= i %>)">   Media</button>\
                <button class="glyphicon glyphicon-edit" onClick="addElement("input",<%= i %>)">   Input</button>\
                <button class="glyphicon glyphicon-share" onClick="addElement("button",<%= i %>)">   Button</button>\
                <button class="glyphicon glyphicon-share" onClick="addElement("link", <%= i %>)">   Link</button>\
                <span></span>\
            </div>\
        </div>\
    <button onclick="addPage()">Add a new Page</button><button onclick="saveSimulation()">Save Simulation</button>\
    </div>\
    </div>\
    ');
};
