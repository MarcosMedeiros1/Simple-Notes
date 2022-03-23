const UL = document.querySelector("ul");
const BTN_NEW = document.querySelector("#btn_new");
const BTN_SAVE = document.querySelector("#btn_save");
const BTN_CANCEL = document.querySelector("#btn_cancel");
const INPUT_AREA = document.querySelector("#input_area");

const ELEMENTS = [BTN_NEW, BTN_SAVE, BTN_CANCEL, INPUT_AREA];

const elementsList = () => {
  let notes = document.querySelectorAll(".note-item");
  let btnDelete = document.querySelectorAll(".btn-delete");
  let btnEdit = document.querySelectorAll(".btn-edit");

  return [notes, btnDelete, btnEdit];
};

// Toggles the visibility of elements
const toggleVisibility = () => {
  ELEMENTS.forEach((item) => {
    item.classList.toggle("visible");
    INPUT_AREA.focus();
  });
  INPUT_AREA.value = "";
};

// Creates a div container for each Note
const createNoteContainer = () => {
  const NOTE_CONTAINER = document.createElement("div");
  NOTE_CONTAINER.setAttribute("class", "note-container");
  NOTE_CONTAINER.append(createNoteItem(), createBtns());
  return NOTE_CONTAINER;
};

// Creates a new Note
const createNoteItem = () => {
  const NOTE_ITEM = document.createElement("textarea");
  NOTE_ITEM.setAttribute("class", "note-item");
  NOTE_ITEM.readOnly = true;
  NOTE_ITEM.innerHTML = INPUT_AREA.value.trim();
  return NOTE_ITEM;
};

// Creates and wraps the Delete and Edit buttons
const createBtns = () => {
  const BTN_WRAPPER = document.createElement("div");
  const BTN_DELETE = document.createElement("button");
  const BTN_EDIT = document.createElement("button");

  BTN_WRAPPER.setAttribute("class", "edit-delete-wrapper");
  BTN_DELETE.setAttribute("class", "btn-delete material-icons-round");
  BTN_DELETE.setAttribute("title", "Double click to delete note");
  BTN_DELETE.innerHTML = "delete_forever";

  BTN_EDIT.setAttribute("class", "btn-edit material-icons-round");
  BTN_EDIT.setAttribute("title", "Click to edit note");
  BTN_EDIT.innerHTML = "edit";

  BTN_WRAPPER.append(BTN_DELETE, BTN_EDIT);
  return BTN_WRAPPER;
};

// Saves a Note
const saveNote = () => {
  UL.prepend(createNoteContainer());

  elementsList();
  invokeFuncs();
};

// Buttons actions
BTN_NEW.onclick = () => {
  toggleVisibility();
};

BTN_CANCEL.onclick = () => {
  toggleVisibility();
};

BTN_SAVE.onclick = () => {
  INPUT_AREA.value.trim() === "" ? false : saveNote();
  toggleVisibility();
  INPUT_AREA.style.height = "auto";
};

// Resizes the texarea while typing
INPUT_AREA.addEventListener(
  "input",
  () => {
    INPUT_AREA.style.height = "auto";
    INPUT_AREA.style.height = INPUT_AREA.scrollHeight + "px";
  },
  false,
);

// Increases and decreases the size of Notes on click
const expandNote = () => {
  return elementsList()
    .at(0)
    .forEach((element) => {
      element.onclick = () => {
        if (element.offsetHeight !== element.scrollHeight) {
          element.style.height = element.scrollHeight + "px";
        } else {
          element.style.height = "45px";
        }
      };
    });
};

// Deletes a note by double-clicking the delete button
const deleteNote = () => {
  return elementsList()
    .at(1)
    .forEach((element) => {
      element.ondblclick = () => {
        element.parentNode.parentNode.remove();
      };
    });
};

// Not ready yet
const editNote = () => {
  return elementsList()
    .at(2)
    .forEach((element) => {
      const DELETE_BTN = element.previousElementSibling;
      const NOTE = element.parentNode.previousElementSibling;
      element.onclick = () => {
        element.innerHTML === "edit"
          ? ((element.innerHTML = "task_alt"),
            (DELETE_BTN.style.display = "none"),
            (NOTE.readOnly = false))
          : ((element.innerHTML = "edit"),
            (DELETE_BTN.style.display = ""),
            (NOTE.readOnly = true));
      };
    });
};

// Invokes action functions
const invokeFuncs = () => {
  expandNote();
  deleteNote();
  editNote();
};
invokeFuncs();
