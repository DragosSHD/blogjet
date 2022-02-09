

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
        editFields[i].id = categoriesLinks[i].id;
        editFields[i].value = categoriesLinks[i].innerText;
        editFields[i].name = categoriesLinks[i].innerText;
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
    newField.name = "NEW";
    newField.placeholder = "New Category " + i
    newField.value = null;
    editLinksBlock.appendChild(newField);
}

function saveChanges() {
    const editLinksBlock = document.getElementById("edit-categories-links");
    const editFields = editLinksBlock.children;

    for(let i = 0; i < editFields.length; i++) {
        // Check if field has been modified
        if(editFields[i].name !== editFields[i].value) {
            if(editFields[i].value === "") {
                if(editFields[i].name !== "NEW")
                    deleteCategory(editFields[i].id)
            } else {
                if(editFields[i].name === "NEW") {
                    createNewCategory(editFields[i].value);
                } else {
                    editCategory(editFields[i].id, editFields[i].value);
                }
            }
        }
    }

    closeEditMenu();
}

function deleteCategory(categoryID) {

    const url = "http://localhost:8080/api/category/" + categoryID;

    fetch(url, {
       method: "DELETE"
    }).then(
        (data) => {
            if(data.status === 200) {
                document.getElementById(categoryID).remove();
            }
        }
    );

}

function createNewCategory(categoryName) {

    const url = "http://localhost:8080/api/category/";

    fetch(url, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: categoryName
        })
    }).then(
        (data) => {
            if(data.status === 200) {
                data.json().then((newCategory) => {
                    const catLinksBlock = document.getElementById("categories-links");
                    const newCategoryItem = document.createElement("li");
                    newCategoryItem.id = newCategory._id;

                    const newAnchor = document.createElement("a");
                    newAnchor.href = "/category?name=" + newCategory.name;
                    newAnchor.innerText = newCategory.name;

                    catLinksBlock.appendChild(newCategoryItem);
                    newCategoryItem.appendChild(newAnchor);
                });
            }
        }
    );

    // Create virtually in DOM

}

function editCategory(categoryId, newName) {

    const url = "http://localhost:8080/api/category/" + categoryId;

    fetch(url,  {
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: newName
        })
    }).then((data) => {
        if(data.status === 200) {
            // Edit virtually in DOM
            document.getElementById(categoryId).firstChild.innerText = newName;
            document.getElementById(categoryId).firstChild.href = "/category?name=" + newName;
        }
    });

}

function closeEditMenu() {
    document.getElementById("edit-categories-links").remove();
    document.getElementById("edit-btn").style.display = "inline-block";
    document.getElementById("categories-links").style.display = "block";
    document.getElementById("save-btn").style.display = "none";
    document.getElementById("add-btn").style.display = "none";
    document.getElementById("discard-btn").style.display = "none";
}