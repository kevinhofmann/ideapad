//GLOBAL VARIABLE
let globalVariables = {
    ideaTextInput: "",
    editingIdea: "",
    ideaIndex: ""
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
const editButtonDiv = document.createElement("div")
const markCheckedButton = document.createElement("button");
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
saveChangesButton.classList.add("markCheckedButton");
abortChangesButton.classList.add("abortEditingButton");
cancelIdeaButton.classList.add("cancelEditedIdeaButton");
editTitleInput.classList.add("editIdeaInput");
editDescriptionInput.classList.add("editIdeaInput")
editDescriptionInput.classList.add("textareaInput");
editReasonInput.classList.add("editIdeaInput");
editStepTowardsInput.classList.add("editIdeaInput");
editButtonDiv.classList.add("editButtonDiv")

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


const constructShowInterfaceDOM = () => {
    ideaDescriptionLabel.innerHTML = "Description<br>";
    ideaReasonLabel.innerHTML = "Your Why<br>";
    ideaStepTowardsLabel.innerHTML = "Your next step"
    showIdeaDiv.appendChild(ideaDescriptionLabel)
    showIdeaDiv.appendChild(showIdeaDescription)
    showIdeaDiv.appendChild(ideaReasonLabel)
    showIdeaDiv.appendChild(showIdeaReason)
    showIdeaDiv.appendChild(ideaStepTowardsLabel)
    showIdeaDiv.appendChild(showIdeaStepToward)
}


//IDEA CLASS AND CONSTRUCTOR
class Idea {
    constructor(id, title, description, reason, stepTowards, status) {
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
    allIdeas[globalVariables.ideaIndex].title = editTitleInput.value;
    allIdeas[globalVariables.ideaIndex].description = editDescriptionInput.value;
    allIdeas[globalVariables.ideaIndex].reason = editReasonInput.value;
    allIdeas[globalVariables.ideaIndex].stepTowards = editStepTowardsInput.value;
    saveIdeas(allIdeas);
    ideaDiv.childNodes[globalVariables.ideaIndex].firstChild.textContent = editTitleInput.value;
    alertify.success("Changes successfully saved")
}

const abortChangesEditForm = (e, ideaIndex) => {
    e.preventDefault();
    editTitleInput.value = allIdeas[ideaIndex].title
    editDescriptionInput.value = allIdeas[ideaIndex].description
    editReasonInput.value = allIdeas[ideaIndex].reason
    editStepTowardsInput.value = allIdeas[ideaIndex].stepTowards
}

const markIdeaChecked = (e, ideaIndex) => {
    e.preventDefault();
    // ideaItemLi.classList.add("idea-item-mark-checked")
    // markCheckedButton.classList.add("markCheckedButtonChecked")
    allIdeas[ideaIndex].status = "checked"
    saveIdeas(allIdeas)
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
    e.target.parentElement.classList.toggle("idea-item-editing-mode")

    ideaDiv.childNodes.forEach(node => {
        if (node.className === "showIdeaDiv") {
            checkIfOpen = false;
            showIdeaDiv.classList.add("showIdeaDiv:hide")
        setTimeout(() => { showIdeaDiv.className = ""; showIdeaDiv.remove(); }, 450);
        }
    })
    if (checkIfOpen) {
        showIdeaDiv.className = "showIdeaDiv"
        constructShowInterfaceDOM()
        globalVariables.ideaIndex = getIdeaIndex(idea)
        const i = globalVariables.ideaIndex + 1
        showIdeaTitle.textContent = idea.title
        showIdeaDescription.textContent = idea.description
        showIdeaReason.textContent = idea.reason
        showIdeaStepToward.textContent = idea.stepTowards
        
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
            if (child.className === 'ideaDivContainer reducedOpacity' || child.className === 'showIdeaDiv reducedOpacity') {
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
        console.log(child.firstChild)
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

    let interfaceOpen = checkIfInterfaceOpen()
    if(!interfaceOpen) {
        toggleOpacity(e)
    }
     //HIER MUSS ICH AUCH NOCH SO MACHEN WIE ITEM EDITRING MODE

    //Check if edit-form is already opened. If so, remove it to not duplicate it. Otherwise, nothing was opend, so it can be openend
    if (e.target.className !== "editButton editButton-editing-mode") {
        ideaDiv.childNodes[globalVariables.ideaIndex].classList.remove("idea-item-editing-mode")
        editIdeaDiv.classList.add("editIdeaDiv:hide")
        setTimeout(() => { editIdeaDiv.className = ""; editIdeaDiv.remove(); }, 450);
    } else {
        ideaDiv.childNodes[globalVariables.ideaIndex].classList.add("idea-item-editing-mode")
        editIdeaDiv.className = "editIdeaDiv";
        emptyDivElement(editButtonDiv);

        editTitleInput.value = allIdeas[globalVariables.ideaIndex].title
        editDescriptionInput.value = allIdeas[globalVariables.ideaIndex].description
        editReasonInput.value = allIdeas[globalVariables.ideaIndex].reason
        editStepTowardsInput.value = allIdeas[globalVariables.ideaIndex].stepTowards

        markCheckedButton.addEventListener("click", function () { markIdeaChecked(e, globalVariables.ideaIndex) });
        saveChangesButton.addEventListener("click", saveEditChangesForm)
        abortChangesButton.addEventListener("click", function () { abortChangesEditForm(e, globalVariables.ideaIndex) });

        constructEditInterfaceDOM()

        const i = globalVariables.ideaIndex + 1
        console.log("I: " + i)
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
        const ideaDivContainer = document.createElement("div")
        ideaDivContainer.classList.add("ideaDivContainer")
        const buttonDiv = document.createElement("div")
        const editButton = document.createElement("button")
        const removeButton = document.createElement("button")
        buttonDiv.classList.add("buttonContainer")
        editButton.classList.add("editButton")
        removeButton.classList.add("removeButton")

        const newIdea = document.createElement("li");
        newIdea.innerText = idea.title;
        newIdea.classList.add("idea-item");

        newIdea.addEventListener("click", function (e) {
            showIdeaInterface(e, idea)
        })

        editButton.addEventListener("click", function (e) {
            e.preventDefault()
         //   ideaDivContainer.classList.toggle("idea-item-editing-mode")
            editButton.classList.toggle("editButton-editing-mode")
            newIdea.classList.toggle("notClickable")
            editIdeaInterface(e, idea)
        })

        removeButton.addEventListener("click", function () {
            deleteIdea(idea.id)
        })

        buttonDiv.appendChild(editButton)
        buttonDiv.appendChild(removeButton)
        ideaDivContainer.appendChild(newIdea)
        ideaDivContainer.appendChild(buttonDiv)
        ideaDiv.appendChild(ideaDivContainer)
    })
    } else {
        emptyMessageElement.textContent = "Life is empty without inspiring ideas."
        emptyMessageElement2.textContent =  "Start following through and step up now!"
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