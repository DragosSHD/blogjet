

function editCategories() {
    document.getElementById("edit-btn").style.display = "none";
    const catLinksBlock = document.getElementById("categories-links");
    const categoriesLinks = catLinksBlock.getElementsByTagName("li");
    const saveBtn = document.getElementById("save-btn");
    const addBtn = document.getElementById("add-btn");

    const catArea = document.getElementById("categories-area");

    catLinksBlock.style.display = "none";
    saveBtn.style.display = "inline-block";
    addBtn.style.display = "inline-block";
    document.getElementById("discard-btn").style.display = "inline-block";

    const editLinksBlock = document.createElement("ul");
    editLinksBlock.id = "edit-categories-links";
    catArea.appendChild(editLinksBlock);

    const editFields = [];
    for(let i = 0; i < categoriesLinks.length; i++) {
        editFields[i] = document.createElement("input");
        editFields[i].id = categoriesLinks[i].innerText;
        editFields[i].value = categoriesLinks[i].innerText;
        editLinksBlock.appendChild(editFields[i]);
    }
}

function addField() {
    const editLinksBlock = document.getElementById("edit-categories-links");

    const newField = document.createElement("input");
    let i = 0;
    while(document.getElementById("new-cat-" + i)) {
        i++;
    }
    newField.id = "new-cat-" + i;
    newField.placeholder = "New Category " + i;
    editLinksBlock.appendChild(newField);
}

function saveChanges() {
    const editLinksBlock = document.getElementById("edit-categories-links");
    const editFields = editLinksBlock.children;

    for(let i = 0; i < editFields.length; i++) {
        if(editFields[i].id !== editFields[i].value) {
            console.log(editFields[i].value);
        }
    }

}

function discardChanges() {
    document.getElementById("edit-categories-links").remove();
    document.getElementById("edit-btn").style.display = "inline-block";
    document.getElementById("categories-links").style.display = "block";
    document.getElementById("save-btn").style.display = "none";
    document.getElementById("add-btn").style.display = "none";
    document.getElementById("discard-btn").style.display = "none";
}