let template;
const contact = {};
let contactsList = []
const DELETE_BTN = 'delete';
const EDIT_BTN = 'edit';
const LINE_SELECTOR = '.line';
const STORAGE_KEY = 'contactsList';
const API_URL = 'https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/users/';

const contactForm = document.querySelector('#newForm');
const contactsListEl = document.querySelector('#contactsList');
const userTemplate = document.querySelector('#userTemplate').innerHTML;
const formInputs = document.querySelectorAll('.form-input');

contactForm.addEventListener('submit', onAddBtnClick);
contactsListEl.addEventListener('click', onDeleteBtnClick);

init ();

function onAddBtnClick(element) {
    element.preventDefault();

    const newContact = getContact();

    if (isAllFieldsCorrect(newContact)) {
        addContact(newContact);
        clearInputs();
    } else {
        alert('Please check your data');
    }
}

function onDeleteBtnClick(element) {
    if (element.target.classList.contains(DELETE_BTN)) {
        const tr = findLine(element.target);
        deleteContact (tr);
    } else (element.target.classList.contains(EDIT_BTN)) 
        const tr = findLine(element.target);
        editContact (tr);
}

function init () {
    fetchList ()
}

function fetchList() {
    fetch(API_URL)
    .then((res) => res.json())
    .then((data) => {
        contactsList = data;
        renderList()
    })
}
function getContact() {
    formInputs.forEach((input) => { contact[input.name] = input.value;});
    return contact;
}

function isAllFieldsCorrect(contact) {
    return (
        isFirstNameCorrect(contact.firstName) &&
        isLastNameCorrect(contact.lastName) &&
        isPhoneCorrect(contact.phone) 
    );
}

function isFirstNameCorrect(value) {
    return value !== '';
}

function isLastNameCorrect(value) {
    return value !== '';
}

function isPhoneCorrect(value) {
    return value !== '' && !isNaN(value);
}


function createNewLineHTML ( contact){
    return  interpolate(userTemplate, contact);
}

function interpolate(template, obj) {
    for (key in obj) {
        template = template.replaceAll(`{{${key}}}`, obj[key]);
    }
    return template;
}

function addContact(contact) {
     fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(newContact),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((data) => {
        fetchList();
    });
}

function renderList() {
    contactsListEl.innerHTML = contactsList.map(createNewLineHTML).join('\n');
}

function clearInputs (){
    contact.name = '';
    contact.email = '';
    contact.phone = '';
}

function findLine(el) {
    return el.closest(LINE_SELECTOR);
}

function deleteContact(element) {
    fetch(API_URL + element.id, {
        method: 'DELETE',
    }).then((data) => {
        fetchList();
    })
}

function editContact (element) {
    return fetch(API_URL + data.id, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((res) => res.json());
}

 function updateInfoFromInput (contact){
    contact.id = contact.id;
    getContact();
    renderList();
 }  

//function saveData() {
    //localStorage.setItem(STORAGE_KEY, JSON.stringify(contactsList));
//}

function restoreData() {
    const data = localStorage.getItem(STORAGE_KEY);

    return data ? JSON.parse(data) : [];
}
