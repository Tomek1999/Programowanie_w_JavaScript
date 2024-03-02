const addNoteButton = document.querySelector(".add-note-button");
const noteTitle = document.querySelector(".note-tite");
const noteDescription = document.querySelector(".note-description");
const noteColor = document.querySelector("#note-color");
const notePin = document.querySelector(".note-pin");
const notesList = document.querySelector(".notes-list");
const pinnedNotesList = document.querySelector(".pinned-notes-list");
const operationText = document.querySelector(".operation-text");
const noteFormContainer = document.querySelector(".note-form-container");

let isEditing = false;
let editedNoteItem = null;
let createdPostDate = "";

document.addEventListener("DOMContentLoaded", getNotes);

addNoteButton.addEventListener("click", (e) => {
  if (isEditing) {
    editNote(e);
  } else {
    if (noteTitle.value !== "" && noteDescription.value !== "") {
      addNote(e);
    } else {
      e.preventDefault();
      alert("Title or description can't be empty");
    }
  }
});

function addNote(e) {
  e.preventDefault();
  const noteItem = document.createElement("div");
  noteItem.classList.add("note-item");

  const noteText = document.createElement("h2");
  noteText.innerText = noteTitle.value;

  const noteDescriptionText = document.createElement("p");
  noteDescriptionText.innerText = noteDescription.value;

  const noteChoosedColor = noteColor.value;
  console.log(noteChoosedColor);
  console.log(typeof noteChoosedColor);

  let isNotePinned = false;
  if (notePin.checked) {
    isNotePinned = true;
  }

  const now = new Date();
  const createdDate = `${
    now.getDate() < 10 ? "0" + now.getDate() : now.getDate()
  }.${now.getMonth() < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1}.${
    now.getFullYear() < 10 ? "0" + now.getFullYear() : now.getFullYear()
  }`;

  const createdDateText = document.createElement("p");
  createdDateText.innerText = createdDate;
  createdPostDate = createdDate;

  const noteItemButtons = document.createElement("div");
  noteItemButtons.classList.add("note-item-buttons");

  const noteDeleteButton = document.createElement("button");
  noteDeleteButton.innerText = "Delete";
  noteDeleteButton.classList.add("note-button");
  noteDeleteButton.classList.add("note-delete-button");

  noteDeleteButton.addEventListener("click", () => {
    noteItem.remove();
    removeNotes(noteItem);
    if (isEditing) {
      clearForm();
    }
  });

  const noteEditButton = document.createElement("button");
  noteEditButton.innerText = "Edit";
  noteEditButton.classList.add("note-button");
  noteEditButton.classList.add("note-edit-button");
  noteEditButton.addEventListener("click", () => {
    operationText.innerText = "Edit Note";
    addNoteButton.innerText = "Update Note";
    addNoteButton.classList.add("update-button");
    noteFormContainer.classList.add("update-note-container");
    editNoteItem(noteItem, noteChoosedColor, isNotePinned);
  });

  noteItem.classList.add("note-color-" + noteChoosedColor);

  noteItem.appendChild(noteText);
  noteItem.appendChild(noteDescriptionText);
  noteItem.appendChild(createdDateText);
  noteItem.appendChild(noteItemButtons);

  noteItemButtons.appendChild(noteEditButton);
  noteItemButtons.appendChild(noteDeleteButton);
  if (isNotePinned) {
    pinnedNotesList.appendChild(noteItem);
  } else {
    notesList.appendChild(noteItem);
  }

  saveNotes({
    noteTitle: noteTitle.value,
    noteDescription: noteDescription.value,
    noteColor: noteColor.value,
    notePinned: isNotePinned,
    noteDate: createdDate,
  });

  console.log(noteItem);

  clearForm();
}

function editNote(e) {
  e.preventDefault();
  if (editedNoteItem) {
    editedNoteItem.querySelector("h2").innerText = noteTitle.value;
    editedNoteItem.querySelector("p").innerText = noteDescription.value;
    editedNoteItem.className = "note-item note-color-" + noteColor.value;
    noteColor.value = noteColor.value;
    notePin.checked = notePin.checked;
    if (!notePin.checked) {
      notesList.appendChild(editedNoteItem);
    } else {
      pinnedNotesList.appendChild(editedNoteItem);
    }
    saveNotes({
      edited: true,
      noteTitle: noteTitle.value,
      noteDescription: noteDescription.value,
      noteColor: noteColor.value,
      notePinned: notePin.checked,
      noteDate: createdPostDate,
    });
    editedNoteItem = null;
    isEditing = false;
  }
  clearForm();
}

function editNoteItem(noteItem, noteChoosedColor, isNotePinned) {
  isEditing = true;
  editedNoteItem = noteItem;

  noteTitle.value = noteItem.querySelector("h2").innerText;
  noteDescription.value = noteItem.querySelector("p").innerText;
  noteColor.value = noteChoosedColor;
  notePin.checked = isNotePinned;
}

function clearForm() {
  noteTitle.value = "";
  noteDescription.value = "";
  noteColor.value = "red";
  notePin.checked = false;
  addNoteButton.innerText = "Add Note";
  operationText.innerText = "Add Note";
  addNoteButton.classList.remove("update-button");
  noteFormContainer.classList.remove("update-note-container");
}

function saveNotes(note) {
  let notes;
  console.log(note);

  if (localStorage.getItem("notes") === null) {
    notes = [];
  } else {
    notes = JSON.parse(localStorage.getItem("notes"));
  }

  if (note.edited != true) {
    notes.push(note);
  } else {
    let noteIndex = notes.findIndex((obj) => obj.noteTitle == note.noteTitle);
    notes[noteIndex] = note;
  }

  localStorage.setItem("notes", JSON.stringify(notes));
}

function getNotes() {
  let notes;

  if (localStorage.getItem("notes") === null) {
    notes = [];
  } else {
    notes = JSON.parse(localStorage.getItem("notes"));
  }

  notes.forEach((note) => {
    const noteItem = document.createElement("div");
    noteItem.classList.add("note-item");

    const noteText = document.createElement("h2");
    noteText.innerText = note.noteTitle;

    const noteDescriptionText = document.createElement("p");
    noteDescriptionText.innerText = note.noteDescription;

    const noteChoosedColor = note.noteColor;
    console.log(noteChoosedColor);
    console.log(typeof noteChoosedColor);

    let isNotePinned = note.notePinned;
    if (notePin.checked) {
      isNotePinned = true;
    }

    const now = new Date();
    const createdDate = `${
      now.getDate() < 10 ? "0" + now.getDate() : now.getDate()
    }.${
      now.getMonth() < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1
    }.${now.getFullYear() < 10 ? "0" + now.getFullYear() : now.getFullYear()}`;

    const createdDateText = document.createElement("p");
    createdDateText.innerText = note.noteDate;

    const noteItemButtons = document.createElement("div");
    noteItemButtons.classList.add("note-item-buttons");

    const noteDeleteButton = document.createElement("button");
    noteDeleteButton.innerText = "Delete";
    noteDeleteButton.classList.add("note-button");
    noteDeleteButton.classList.add("note-delete-button");

    noteDeleteButton.addEventListener("click", () => {
      removeNotes(noteItem);
      noteItem.remove();

      if (isEditing) {
        clearForm();
      }
    });

    const noteEditButton = document.createElement("button");
    noteEditButton.innerText = "Edit";
    noteEditButton.classList.add("note-button");
    noteEditButton.classList.add("note-edit-button");
    noteEditButton.addEventListener("click", () => {
      operationText.innerText = "Edit Note";
      addNoteButton.innerText = "Update Note";
      addNoteButton.classList.add("update-button");
      noteFormContainer.classList.add("update-note-container");
      editNoteItem(noteItem, noteChoosedColor, isNotePinned);
    });

    noteItem.classList.add("note-color-" + noteChoosedColor);

    noteItem.appendChild(noteText);
    noteItem.appendChild(noteDescriptionText);
    noteItem.appendChild(createdDateText);
    noteItem.appendChild(noteItemButtons);

    noteItemButtons.appendChild(noteEditButton);
    noteItemButtons.appendChild(noteDeleteButton);
    if (isNotePinned) {
      pinnedNotesList.appendChild(noteItem);
    } else {
      notesList.appendChild(noteItem);
    }
  });
}

function removeNotes(note) {
  let notes;
  console.log(note);

  if (localStorage.getItem("notes") === null) {
    notes = [];
  } else {
    notes = JSON.parse(localStorage.getItem("notes"));
  }

  const noteIndex = note.children[0].innerText;
  notes.splice(notes.indexOf(noteIndex), 1);
  localStorage.setItem("notes", JSON.stringify(notes));
}
