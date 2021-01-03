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

let allIdeas = getSavedIdeas()

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
const displayIdeaDiv = document.createElement("div")
const editTitleInput = document.createElement("input");
const editDescriptionInput = document.createElement("textarea");
const editReasonInput = document.createElement("input");
const editStepTowardsInput = document.createElement("input");
const editButtonDiv = document.createElement("div");
const showIdeaButtonDiv = document.createElement("div");
const markCheckedButton = document.createElement("button");
const markUncheckedButton = document.createElement("button");
const abortChangesButton = document.createElement("button");
const saveChangesButton = document.createElement("button");
const cancelIdeaButton = document.createElement("button")
const emptyMessageElement = document.createElement("label")
const emptyMessageElement2 = document.createElement("label")
const breakElement = document.createElement("span")

breakElement.innerHTML = "<br>"
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

const ideaTitleLabel = document.createElement("span");
ideaTitleLabel.classList.add("ideaLabels")
const ideaDescriptionLabel = document.createElement("label");
ideaDescriptionLabel.classList.add("ideaLabels")
const ideaReasonLabel = document.createElement("label");
ideaReasonLabel.classList.add("ideaLabels");
const ideaStepTowardsLabel = document.createElement("label");
ideaStepTowardsLabel.classList.add("ideaLabels");
editStepTowardsInput.placeholder = "Talk to someone, make a plan, learn it"

const showIdeaTitle = document.createElement("text")
showIdeaTitle.classList.add("showIdeaTextContent")
const showIdeaDescription = document.createElement("text")
showIdeaDescription.classList.add("showIdeaTextContent")
const showIdeaReason = document.createElement("text")
showIdeaReason.classList.add("showIdeaTextContent")
const showIdeaStepToward = document.createElement("text")
showIdeaStepToward.classList.add("showIdeaTextContent")


//CREATE DOM FOR EDIT INTERFACE
const constructEditInterfaceDOM = () => {
    ideaTitleLabel.innerHTML = ' Name your idea<br>';
    ideaDescriptionLabel.innerHTML = "Describe it as preciesly as possible<br>";
    ideaReasonLabel.innerHTML = "Why do you want to pursue this idea?<br>";
    ideaStepTowardsLabel.innerHTML = "Which little thing would bring you closer?"
    editIdeaDiv.appendChild(ideaTitleLabel);
    editIdeaDiv.appendChild(editTitleInput);
    editIdeaDiv.appendChild(ideaDescriptionLabel);
    editIdeaDiv.appendChild(editDescriptionInput);
    editIdeaDiv.appendChild(ideaReasonLabel);
    editIdeaDiv.appendChild(editReasonInput);
    editIdeaDiv.appendChild(ideaStepTowardsLabel);
    editIdeaDiv.appendChild(editStepTowardsInput);
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
    showIdeaDiv.appendChild(ideaDescriptionLabel)
    showIdeaDiv.appendChild(showIdeaDescription)
    showIdeaDiv.appendChild(ideaReasonLabel)
    showIdeaDiv.appendChild(showIdeaReason)
    showIdeaDiv.appendChild(ideaStepTowardsLabel)
    showIdeaDiv.appendChild(showIdeaStepToward)
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
    constructor(id, title, description, reason, stepTowards = "", status = "progress") {
        this.id = id,
        this.title = title,
        this.description = description,
        this.reason = reason,
        this.stepTowards = stepTowards
        this.status = status
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
    const newIdea = new Idea(uuidv4(), titleElement.value, descriptionElement.value, reasonElement.value)
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
    if(globalVariables.e.target.parentElement.parentElement.firstChild.innerText === allIdeas[globalVariables.ideaIndex].title) {
    allIdeas[globalVariables.ideaIndex].title = editTitleInput.value;
    allIdeas[globalVariables.ideaIndex].description = editDescriptionInput.value;
    allIdeas[globalVariables.ideaIndex].reason = editReasonInput.value;
    allIdeas[globalVariables.ideaIndex].stepTowards = editStepTowardsInput.value;
    saveIdeas(allIdeas);
    ideaDiv.childNodes[globalVariables.ideaIndex].firstChild.textContent = editTitleInput.value;
    alertify.success("Changes successfully saved")
    }

}

const abortChangesEditForm = () => {
    editTitleInput.value = allIdeas[globalVariables.ideaIndex].title
    editDescriptionInput.value = allIdeas[globalVariables.ideaIndex].description
    editReasonInput.value = allIdeas[globalVariables.ideaIndex].reason
    editStepTowardsInput.value = allIdeas[globalVariables.ideaIndex].stepTowards
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
    alertify.message("Completion revoked, get back to work")
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
            alertify.error("Aborted")
        }
    )
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
        constructShowInterfaceDOM(idea)
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

        if(idea.stepTowards.length === 0) {
            showIdeaStepToward.textContent = "..."
        } else {
            showIdeaStepToward.textContent = idea.stepTowards
        }
        
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
    if (e.target.className !== "editButton editButton-editing-mode") {
        ideaDiv.childNodes[globalVariables.ideaIndex].classList.remove("idea-item-editing-mode")
        editIdeaDiv.classList.add("editIdeaDiv:hide")
        saveChangesButton.removeEventListener("click", saveEditChangesForm);
        setTimeout(() => { editIdeaDiv.className = ""; editIdeaDiv.remove(); }, 450);
    } else {
        ideaDiv.childNodes[globalVariables.ideaIndex].classList.add("idea-item-editing-mode")
        editIdeaDiv.className = "editIdeaDiv";
        emptyDivElement(editButtonDiv);

        editTitleInput.value = allIdeas[globalVariables.ideaIndex].title
        editDescriptionInput.value = allIdeas[globalVariables.ideaIndex].description
        editReasonInput.value = allIdeas[globalVariables.ideaIndex].reason
        editStepTowardsInput.value = allIdeas[globalVariables.ideaIndex].stepTowards

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
        buttonDiv.classList.add("buttonContainer")
        editButton.classList.add("editButton")

        const newIdea = document.createElement("li");
        newIdea.innerText = idea.title;
        newIdea.classList.add("idea-item");

        if(idea.status === "checked") {
            ideaDivContainer.classList.add("checked")
            newIdea.append(checkedIcon)
        } else {
            ideaDivContainer.classList.add("unchecked")
        }

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