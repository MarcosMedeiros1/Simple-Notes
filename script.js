const UL = document.querySelector("ul");
const BTN_NEW = document.querySelector("#btn_new");
const BTN_SAVE = document.querySelector("#btn_save");
const BTN_CANCEL = document.querySelector("#btn_cancel");
const INPUT_AREA = document.querySelector("#input_area");

let notes = document.querySelectorAll(".note-item");

const ELEMENTS = [BTN_NEW, BTN_SAVE, BTN_CANCEL, INPUT_AREA];

function toggleVisibility() {
  ELEMENTS.forEach((item) => {
    item.classList.toggle("visible");
  });
  INPUT_AREA.value = "";
}

function saveNote() {
  const NOTE_ITEM = document.createElement("textarea");
  NOTE_ITEM.setAttribute("class", "note-item");
  NOTE_ITEM.readOnly = true;
  NOTE_ITEM.innerHTML = INPUT_AREA.value;
  UL.prepend(NOTE_ITEM);
}

// Buttons actions
BTN_NEW.onclick = () => {
  toggleVisibility();
};

BTN_CANCEL.onclick = () => {
  toggleVisibility();
};

BTN_SAVE.onclick = () => {
  INPUT_AREA.value === "" ? false : saveNote();
  toggleVisibility();
};

// Resize texarea while typing
INPUT_AREA.addEventListener(
  "input",
  () => {
    INPUT_AREA.style.height = "auto";
    INPUT_AREA.style.height = INPUT_AREA.scrollHeight + "px";
  },
  false,
);

// Expand and contract notes size on click
function expandNote() {
  notes = document.querySelectorAll(".note-item");
  return notes.forEach((element) => {
    element.onclick = () => {
      if (element.offsetHeight <= 55) {
        element.style.height = element.scrollHeight + "px";
      } else {
        element.style.height = "40px";
      }
    };
  });
}

function getEventTarget(e) {
  e = e || window.event;
  return e.target || e.srcElement;
}

UL.onclick = function (event) {
  let target = getEventTarget(event);
  expandNote(target);
};
