//GLOBAL VARIABLE
let globalVariables = {
    ideaTextInput: "",
    editingIdea: "",
    ideaIndex: "",
    e: "",
    idea: ""
}

const getSavedIdeas = () => {
    const ideasJSON = localStorage.getItem("ideas")

    try {
        return ideasJSON !== null ? JSON.parse(ideasJSON) : []
    } catch (e) {
        return []
    }
}

let allIdeas = getSavedIdeas();

//Takes the selected Idea Item out of the Ideas Array 
let getIdeaItem = () => {
    return allIdeas[globalVariables.ideaIndex];
}

//GRAB CSS ELEMENTS 
const titleElement = document.querySelector("#idea-title")
const descriptionElement = document.querySelector("#idea-description")
const reasonElement = document.querySelector("#idea-reason")
const ideaListElement = document.querySelector("#idea-list")
const ideaForm = document.querySelector(".idea-form")
const ideaFormContainer = document.querySelector(".form-container")
const ideaListContainer = document.querySelector(".idea-list-container")

const ideaDiv = document.createElement("div");
const showIdeaDiv = document.createElement("div");
const editIdeaDiv = document.createElement("div");
const displayIdeaDiv = document.createElement("div");
const inputButtonContainer = document.createElement("div");
const editTitleInput = document.createElement("input");
const editDescriptionInput = document.createElement("textarea");
const editReasonInput = document.createElement("input");
const editStepTowardsInput = document.createElement("input");
const editButtonDiv = document.createElement("div");
const showIdeaButtonDiv = document.createElement("div");
const showStepsTowardDiv = document.createElement("div");
const markCheckedButton = document.createElement("button");
const markUncheckedButton = document.createElement("button");
const abortChangesButton = document.createElement("button");
const saveChangesButton = document.createElement("button");
const cancelIdeaButton = document.createElement("button");
const addNewInputButton = document.createElement("button")
const emptyMessageElement = document.createElement("label");
const emptyMessageElement2 = document.createElement("label");
const breakElement = document.createElement("span");
const lastEditedLabel = document.createElement("text");


breakElement.innerHTML = "<br>"
lastEditedLabel.className = "lastUpdatedIdeaItemLabel";
emptyMessageElement.className = "emptyMessageElement";
emptyMessageElement2.className = "emptyMessageElement";
showIdeaDiv.className = "showIdeaDiv";
markUncheckedButton.classList.add("markUncheckedButton")
markUncheckedButton.setAttribute("title", "Undo completion");
markCheckedButton.classList.add("markCheckedButton");
markCheckedButton.setAttribute("title", "Mark idea completed");
saveChangesButton.classList.add("saveEditedIdeaButton");
saveChangesButton.setAttribute("title", "Save changes");
abortChangesButton.classList.add("abortEditingButton");
abortChangesButton.setAttribute("title", "Reset changes");
cancelIdeaButton.classList.add("cancelEditedIdeaButton");
cancelIdeaButton.setAttribute("title", "Remove idea");
editTitleInput.classList.add("editIdeaInput");
editDescriptionInput.classList.add("editIdeaInput")
editDescriptionInput.classList.add("textareaInput");
editReasonInput.classList.add("editIdeaInput");
editStepTowardsInput.classList.add("editIdeaInput");
editButtonDiv.classList.add("editButtonDiv");
showIdeaButtonDiv.classList.add("showIdeaButtonDiv");
addNewInputButton.classList.add("addNewInputButton");
showStepsTowardDiv.classList.add("showStepsTowardDiv");

const ideaTitleLabel = document.createElement("span");
ideaTitleLabel.classList.add("ideaLabels")
const ideaDescriptionLabel = document.createElement("label");
ideaDescriptionLabel.classList.add("ideaLabels")
const ideaReasonLabel = document.createElement("label");
ideaReasonLabel.classList.add("ideaLabels");
const ideaStepTowardsLabel = document.createElement("label");
ideaStepTowardsLabel.classList.add("ideaLabels");
editReasonInput.placeholder = "What motivates you?";
editDescriptionInput.placeholder = "Try to be specific"
editStepTowardsInput.placeholder = "Which steps are neccessary?"
editTitleInput.placeholder = "Find a short & simple title"

const showIdeaTitle = document.createElement("text")
showIdeaTitle.classList.add("showIdeaTextContent")
const showIdeaDescription = document.createElement("text")
showIdeaDescription.classList.add("showIdeaTextContent")
const showIdeaReason = document.createElement("text")
showIdeaReason.classList.add("showIdeaTextContent")



//CREATE DOM FOR EDIT INTERFACE
const constructEditInterfaceDOM = () => {
    ideaTitleLabel.innerHTML = ' Name your idea<br>';
    ideaDescriptionLabel.innerHTML = "Describe it preciesly<br>";
    ideaReasonLabel.innerHTML = "Why do you want to pursue this idea?<br>";
    ideaStepTowardsLabel.innerHTML = "Which actions will take you further?"
    editIdeaDiv.appendChild(ideaTitleLabel);
    editIdeaDiv.appendChild(editTitleInput);
    editIdeaDiv.appendChild(ideaDescriptionLabel);
    editIdeaDiv.appendChild(editDescriptionInput);
    editIdeaDiv.appendChild(ideaReasonLabel);
    editIdeaDiv.appendChild(editReasonInput);
    editIdeaDiv.appendChild(ideaStepTowardsLabel);
    editIdeaDiv.appendChild(inputButtonContainer);
    editButtonDiv.appendChild(saveChangesButton);
    editButtonDiv.appendChild(abortChangesButton);
    editButtonDiv.appendChild(cancelIdeaButton);
    editIdeaDiv.appendChild(editButtonDiv)
}


const constructShowInterfaceDOM = (idea) => {
    showIdeaDiv.remove()
    ideaDescriptionLabel.innerHTML = "Description<br>";
    ideaReasonLabel.innerHTML = "Your Why<br>";
    ideaStepTowardsLabel.innerHTML = "Your next step"
    showIdeaDiv.appendChild(lastEditedLabel)
    showIdeaDiv.appendChild(ideaDescriptionLabel)
    showIdeaDiv.appendChild(showIdeaDescription)
    showIdeaDiv.appendChild(ideaReasonLabel)
    showIdeaDiv.appendChild(showIdeaReason)
    showIdeaDiv.appendChild(ideaStepTowardsLabel)
    showIdeaDiv.appendChild(showStepsTowardDiv)
    showIdeaButtonDiv.remove();
    if(idea.status === "progress") {
        showIdeaButtonDiv.appendChild(markCheckedButton)
        showIdeaDiv.appendChild(showIdeaButtonDiv)
        if(showIdeaButtonDiv.contains(markUncheckedButton)) {
            markUncheckedButton.remove()
        }
    } else if(idea.status === "checked") {
        showIdeaButtonDiv.appendChild(markUncheckedButton)
        showIdeaDiv.appendChild(showIdeaButtonDiv)
        if(showIdeaButtonDiv.contains(markCheckedButton)) {
            markCheckedButton.remove()
        }
    }
}


//IDEA CLASS AND CONSTRUCTOR
class Idea {
    constructor(id, title, description, reason, stepTowards = [], status = "progress", lastUpdated) {
        this.id = id,
        this.title = title,
        this.description = description,
        this.reason = reason,
        this.stepTowards = stepTowards,
        this.status = status,
        this.lastUpdated = lastUpdated
    }
}

const getIdeaIndex = (ideaIndex) => {
    return allIdeas.findIndex((idea) => idea.id === ideaIndex.id)
}


//ARRAY & IDEA MANIPULATION; 


const saveIdeas = (ideas) => {
    localStorage.setItem("ideas", JSON.stringify(ideas))
}


const deleteIdea = function (deleteIdea) {
    const ideaIndex = allIdeas.findIndex((idea) => idea.id === deleteIdea)
    if (ideaIndex > -1) {
        allIdeas.splice(ideaIndex, 1)
        saveIdeas(allIdeas)
    }
    renderIdeas()
    alertify.message("Idea deleted");
}


const createIdea = () => {
    const newIdea = new Idea(uuidv4(), titleElement.value, descriptionElement.value, reasonElement.value, undefined, "progress", moment())
    allIdeas.push(newIdea)
    titleElement.value = ""
    descriptionElement.value = ""
    reasonElement.value = ""
    ideaFormContainer.className = "form-container"
    alertify.success("Idea added")
    saveIdeas(allIdeas)
    renderIdeas()
}


//EVENT HANDLER EDIT FORM
const saveEditChangesForm = () => {

    let newArray = [];
    if(globalVariables.e.target.parentElement.parentElement.firstChild.innerText === allIdeas[globalVariables.ideaIndex].title) {
    allIdeas[globalVariables.ideaIndex].title = editTitleInput.value;
    allIdeas[globalVariables.ideaIndex].description = editDescriptionInput.value;
    allIdeas[globalVariables.ideaIndex].reason = editReasonInput.value;
    allIdeas[globalVariables.ideaIndex].lastUpdated = moment();
    allIdeas[globalVariables.ideaIndex].stepTowards[0] = editStepTowardsInput.value;
    const newInputFields = document.querySelectorAll(".newInputDiv")
    if(newInputFields.length > 0) {
        newArray.push(editStepTowardsInput.value)
        newInputFields.forEach(input => {
            newArray.push(input.firstChild.value)
        })
    allIdeas[globalVariables.ideaIndex].stepTowards = newArray;
    }
    saveIdeas(allIdeas);
    if(allIdeas[globalVariables.ideaIndex].status === "checked") {
        ideaDiv.childNodes[globalVariables.ideaIndex].firstChild.innerHTML = editTitleInput.value + "<button class='checkedIcon'></button>";
    } else {
        ideaDiv.childNodes[globalVariables.ideaIndex].firstChild.innerHTML = editTitleInput.value
    }
    alertify.success("Changes successfully saved")
    }
}

const abortChangesEditForm = () => {
    editTitleInput.value = allIdeas[globalVariables.ideaIndex].title
    editDescriptionInput.value = allIdeas[globalVariables.ideaIndex].description
    editReasonInput.value = allIdeas[globalVariables.ideaIndex].reason
    editStepTowardsInput.value = allIdeas[globalVariables.ideaIndex].stepTowards[0]
    const addedInputElements = document.querySelectorAll(".addedInputField")
    let element = getIdeaItem()
    for(let i = 0; i<addedInputElements.length; i++) {
        let number = i+1;
        addedInputElements[i].value = element.stepTowards[number]
        number++;
    }
}

const markIdeaChecked = () => {
    globalVariables.e.target.parentElement.classList.add("checked")
    allIdeas[globalVariables.ideaIndex].status = "checked"
    alertify.success("Congratulations, you've made it!")
    saveIdeas(allIdeas)
    renderIdeas()
}

const markIdeaUnchecked = () => {
    globalVariables.e.target.parentElement.classList.remove("checked")
    allIdeas[globalVariables.ideaIndex].status = "progress"
    alertify.message("Completion revoked, keep on!")
    saveIdeas(allIdeas)
    renderIdeas()
}

markCheckedButton.addEventListener("click", markIdeaChecked);
markUncheckedButton.addEventListener("click", markIdeaUnchecked);

const cancelIdea = () => {
    alertify.confirm("Sure?", "Do you really want to remove this idea from your list?", function() {
        allIdeas.splice(globalVariables.ideaIndex, 1);
    saveIdeas(allIdeas);
    renderIdeas();
        alertify.message("Idea removed") }
        , function() {
            alertify.message("Aborted")
        }
    )
}

const addNewInput = () => {
    const newInputDiv = document.createElement("div")
    const newInput = document.createElement("input")
    const removeNewInputButton = document.createElement("button")
    removeNewInputButton.classList.add("removeNewInputButton")
    removeNewInputButton.addEventListener("click", function (e) {
        e.target.parentElement.remove()
    })
    newInputDiv.classList.add("newInputDiv")
    newInput.classList.add("addedInputField")
    newInputDiv.appendChild(newInput)
    newInputDiv.appendChild(removeNewInputButton)
    inputButtonContainer.appendChild(newInputDiv)
}
addNewInputButton.addEventListener("click", addNewInput)


const showNewInput = (item) => {
    const newInputDiv = document.createElement("div")
    const newInput = document.createElement("input")
    const removeNewInputButton = document.createElement("button")
    removeNewInputButton.classList.add("removeNewInputButton")
    removeNewInputButton.addEventListener("click", function (e) {
        e.target.parentElement.remove()
    })
    newInputDiv.classList.add("newInputDiv")
    newInput.value = item;
    newInput.classList.add("addedInputField")
    newInputDiv.appendChild(newInput)
    newInputDiv.appendChild(removeNewInputButton)
    inputButtonContainer.appendChild(newInputDiv)
}

//INTERFACE INTERACTION
const emptyDivElement = (div) => {
    div.innerHTML = ""
}

//SHOW IDEA INTERFACE
const showIdeaInterface = function (e, idea) {
    let checkIfOpen = true;

    //activate Opacity and highlighting for selected item
    toggleOpacity(e)
    if(e.target.parentElement.classList.contains("checked")) {
        e.target.parentElement.classList.add("idea-item-editing-mode-checked")
    } else {
    e.target.parentElement.classList.toggle("idea-item-editing-mode")
    }
    ideaDiv.childNodes.forEach(node => {
        if (node.className === "showIdeaDiv") {
            checkIfOpen = false;
            e.target.parentElement.classList.remove("idea-item-editing-mode-checked")
            showIdeaDiv.classList.add("showIdeaDiv:hide")
        setTimeout(() => { showIdeaDiv.className = ""; showIdeaDiv.remove(); }, 450);
        }
    })
    if (checkIfOpen) {
        showIdeaDiv.className = "showIdeaDiv"

        globalVariables.ideaIndex = getIdeaIndex(idea)
        globalVariables.e = e;
        globalVariables.idea = idea;
        const i = globalVariables.ideaIndex + 1
        showIdeaTitle.textContent = idea.title
        showIdeaDescription.textContent = idea.description
        showIdeaReason.textContent = idea.reason
        if(idea.description.length < 1) {
            showIdeaDescription.textContent = "..."
        } else {
            showIdeaDescription.textContent = idea.description
        }

        if(idea.reason.length < 1) {
            showIdeaReason.textContent = "..."
        } else {
            showIdeaReason.textContent = idea.reason
        }

        showStepsTowardDiv.innerHTML = ""
        
        if(idea.stepTowards.length === 0) {
            let showIdeaStepToward = document.createElement("text")
            showIdeaStepToward.textContent = "..."
            showStepsTowardDiv.appendChild(showIdeaStepToward)
            showStepsTowardDiv.classList.remove("showStepsTowardDiv")
            showIdeaStepToward.className = "showIdeaTextContent"
        } else {
            let counter = 0;
            idea.stepTowards.forEach(item => {
                showIdeaStepToward = document.createElement("li");
                showIdeaStepToward.className = "";
                showIdeaStepToward.className = "showIdeaTextContent stepsTowardsList";
                //showIdeaStepToward.classList.add("stepsTowardsList");
                showIdeaStepToward.innerHTML = idea.stepTowards[counter]
                showStepsTowardDiv.appendChild(showIdeaStepToward)
                counter++;
            })
            showStepsTowardDiv.classList.add("showStepsTowardDiv")
        }
        lastEditedLabel.textContent = "Last updated " + moment(idea.lastUpdated).fromNow()
        constructShowInterfaceDOM(idea)
        ideaDiv.insertBefore(showIdeaDiv, ideaDiv.childNodes[i])

        showIdeaDiv.classList.toggle("showIdeaDiv:active")
        showIdeaDiv.addEventListener("animationend", function (e) {
            showIdeaDiv.className = "showIdeaDiv"
        })
    }
}

//Toggle lower opacity for other list item elements
const toggleOpacity = (e) => {
    let children = Array.from(ideaDiv.childNodes)
    children.forEach(child => {
        if (e.target.parentElement.parentElement === child || e.target.parentElement === child) {
            return;
        } else if (child.firstChild.nodeName.toLowerCase() == 'li') {
            if (child.classList.contains("reducedOpacity")) {
                child.classList.remove("reducedOpacity")
                child.classList.add("enhanceOpacity")
            } else {
                child.classList.remove("enhanceOpacity")
                child.classList.add("reducedOpacity")
            }
        }
    })
}

const checkIfInterfaceOpen = () => {
    let wasOpen = false;
    let children = Array.from(ideaDiv.childNodes)
    children.forEach(child => {
        if (child.className === "showIdeaDiv") {
            showIdeaDiv.remove()
            wasOpen = true;
        }
    })
    return wasOpen
}


//EDIT IDEA INTERFACE
const editIdeaInterface = function (e, editedIdea) {

    globalVariables.ideaIndex = getIdeaIndex(editedIdea)
    globalVariables.e = e;

    let interfaceOpen = checkIfInterfaceOpen()
    if(!interfaceOpen) {
        toggleOpacity(e)
    }
     //HIER MUSS ICH AUCH NOCH SO MACHEN WIE ITEM EDITRING MODE

    //Check if edit-form is already opened. If so, remove it to not duplicate it. Otherwise, nothing was opend, so it can be openend
    if (!e.target.classList.contains("editButton-editing-mode")) {
        ideaDiv.childNodes[globalVariables.ideaIndex].classList.remove("idea-item-editing-mode")
        ideaDiv.childNodes[globalVariables.ideaIndex].classList.remove("idea-item-editing-mode-checked")
        editIdeaDiv.classList.add("editIdeaDiv:hide")
        document.querySelectorAll(".newInputDiv").forEach(item => {
            item.remove()
        })
        saveChangesButton.removeEventListener("click", saveEditChangesForm);
        setTimeout(() => { editIdeaDiv.className = ""; editIdeaDiv.remove(); }, 450);
    } else {
        if(editedIdea.status === "checked") {
            ideaDiv.childNodes[globalVariables.ideaIndex].classList.add("idea-item-editing-mode-checked")
        } else {
            ideaDiv.childNodes[globalVariables.ideaIndex].classList.add("idea-item-editing-mode")
        }
        
        editIdeaDiv.className = "editIdeaDiv";
        emptyDivElement(editButtonDiv);

        editTitleInput.value = allIdeas[globalVariables.ideaIndex].title
        editDescriptionInput.value = allIdeas[globalVariables.ideaIndex].description
        editReasonInput.value = allIdeas[globalVariables.ideaIndex].reason
        if(allIdeas[globalVariables.ideaIndex].stepTowards[0] === undefined) {
            editStepTowardsInput.value = ""
        } else {
        editStepTowardsInput.value = allIdeas[globalVariables.ideaIndex].stepTowards[0]
        }
        inputButtonContainer.classList.add("inputButtonContainer")
        inputButtonContainer.appendChild(editStepTowardsInput)
        editStepTowardsInput.classList.add("inputWithButton")
        inputButtonContainer.append(addNewInputButton)

        if(allIdeas[globalVariables.ideaIndex].stepTowards.length > 1) {
            for (let i = 1; i < allIdeas[globalVariables.ideaIndex].stepTowards.length; i++) {
                    showNewInput(allIdeas[globalVariables.ideaIndex].stepTowards[i])
            }
        }

        saveChangesButton.addEventListener("click", saveEditChangesForm);
        abortChangesButton.addEventListener("click", abortChangesEditForm);
        cancelIdeaButton.addEventListener("click", cancelIdea); 
        constructEditInterfaceDOM()

        const i = globalVariables.ideaIndex + 1
        ideaDiv.insertBefore(editIdeaDiv, ideaDiv.childNodes[i])

        editIdeaDiv.classList.toggle("editIdeaDiv:active")
        editIdeaDiv.addEventListener("animationend", function (e) {
            editIdeaDiv.className = "editIdeaDiv"
        })
    }
}


//RENDER IDEAS
const renderIdeas = function () {
    ideaDiv.innerHTML = ""
    ideaListElement.innerHTML = ""
    ideaDiv.classList.add("idea-div");
    if(allIdeas.length > 0) {
    allIdeas.forEach((idea) => {
        const checkedIcon = document.createElement("button")
        checkedIcon.classList.add("checkedIcon")
        const ideaDivContainer = document.createElement("div")
        ideaDivContainer.classList.add("ideaDivContainer")
        const buttonDiv = document.createElement("div")
        const editButton = document.createElement("button")
        editButton.setAttribute("title", "Edit idea");
        buttonDiv.classList.add("buttonContainer");
        editButton.classList.add("editButton");

        const newIdea = document.createElement("li");
        newIdea.innerText = idea.title;
        newIdea.classList.add("idea-item");

        newIdea.addEventListener("click", function (e) {
            showIdeaInterface(e, idea)
        })

        editButton.addEventListener("click", function (e) {
            e.preventDefault()
            editButton.classList.toggle("editButton-editing-mode")
            newIdea.classList.toggle("notClickable")
            editIdeaInterface(e, idea)
        })

        buttonDiv.appendChild(editButton)
        ideaDivContainer.appendChild(newIdea)
        ideaDivContainer.appendChild(buttonDiv)
        ideaDiv.appendChild(ideaDivContainer)

        if(idea.status === "checked") {
            ideaDivContainer.classList.add("checked")
            newIdea.appendChild(checkedIcon)
        } else {
            ideaDivContainer.classList.add("unchecked")
        }
    })
    } else {
        emptyMessageElement.textContent = "Life is empty without inspiring ideas."
        emptyMessageElement2.textContent =  "Add one above and start transforming it into reality!"
        ideaDiv.appendChild(breakElement)
        ideaDiv.appendChild(emptyMessageElement)
        ideaDiv.appendChild(emptyMessageElement2)
    }
    ideaListElement.append(ideaDiv)
}

//KICK IT OFF
renderIdeas()


//EVENT LISTENER
document.querySelector("#addNewIdeaButton").addEventListener("click", function (e) {
    e.preventDefault()
    createIdea()
})

document.querySelector("#forgetNewIdeaButton").addEventListener("click", function (e) {
    e.preventDefault()
    titleElement.value = ""
    ideaFormContainer.className = "form-container"
})

//EVENT LISTENER INPUT
document.querySelector("#idea-title").addEventListener("keydown", (e) => {
    globalVariables.ideaTextInput = e.target.value
    if (globalVariables.ideaTextInput.length >= 2) {
        // ideaForm.classList.remove("m-fadeOut")
        ideaFormContainer.className = "form-container:active"
    } else {
        ideaFormContainer.className = "form-container"
    }
})