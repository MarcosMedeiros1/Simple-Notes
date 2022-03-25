const UL = document.querySelector("ul");
const BTN_NEW = document.querySelector("#btn_new");
const BTN_SAVE = document.querySelector("#btn_save");
const BTN_CANCEL = document.querySelector("#btn_cancel");
const INPUT_AREA = document.querySelector("#input_area");

const ELEMENTS = [BTN_NEW, BTN_SAVE, BTN_CANCEL, INPUT_AREA];

const elementsList = () => {
  let btnResize = document.querySelectorAll(".btn-resize");
  let btnDelete = document.querySelectorAll(".btn-delete");
  let btnEdit = document.querySelectorAll(".btn-edit");

  return [btnResize, btnDelete, btnEdit];
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
  const BTNS_WRAPPER = document.createElement("div");
  const BTN_RESIZE = document.createElement("button");
  const BTN_EDIT = document.createElement("button");
  const BTN_DELETE = document.createElement("button");

  BTNS_WRAPPER.setAttribute("class", "btns-wrapper");

  BTN_RESIZE.setAttribute("class", "btn-resize material-icons-round");
  BTN_RESIZE.setAttribute("title", "Click to resize note");
  BTN_RESIZE.innerHTML = "expand_more";

  BTN_EDIT.setAttribute("class", "btn-edit material-icons-round");
  BTN_EDIT.setAttribute("title", "Click to edit note");
  BTN_EDIT.innerHTML = "edit";

  BTN_DELETE.setAttribute("class", "btn-delete material-icons-round");
  BTN_DELETE.setAttribute("title", "Double click to delete note");
  BTN_DELETE.innerHTML = "delete_forever";

  BTNS_WRAPPER.append(BTN_RESIZE, BTN_EDIT, BTN_DELETE);
  return BTNS_WRAPPER;
};

// Saves a Note
const saveNote = () => {
  UL.prepend(createNoteContainer());
  elementsList();
  initFunctions();
};

// Buttons actions
BTN_NEW.onclick = () => {
  toggleVisibility();
};

BTN_CANCEL.onclick = () => {
  toggleVisibility();
};

BTN_SAVE.onclick = () => {
  INPUT_AREA.value.trim() === "" ? false : saveNote(), toggleVisibility();
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
const resizeNote = (btn_resize) => {
  btn_resize.forEach((element) => {
    let note = element.parentNode.previousElementSibling;
    element.onclick = () => {
      note.offsetHeight !== note.scrollHeight
        ? ((note.style.height = note.scrollHeight + "px"),
          (element.innerHTML = "expand_less"))
        : ((note.style.height = "45px"), (element.innerHTML = "expand_more"));
    };
  });
};

// Deletes a note by double-clicking the delete button
const deleteNote = (btn_delete) => {
  btn_delete.forEach((element) => {
    let note = element.parentNode.parentNode;
    element.ondblclick = () => {
      note.remove();
    };
  });
};

// Not ready yet
const editNote = (btn_edit) => {
  btn_edit.forEach((element) => {
    let note = element.parentNode.previousElementSibling;
    element.onclick = () => {
      element.innerHTML === "edit"
        ? ((element.innerHTML = "task_alt"),
          ((note.readOnly = false), note.focus()))
        : ((element.innerHTML = "edit"), (note.readOnly = true));
    };
  });
};

// Initiate action functions
const initFunctions = () => {
  resizeNote(elementsList().at(0));
  deleteNote(elementsList().at(1));
  editNote(elementsList().at(2));
};
initFunctions();
