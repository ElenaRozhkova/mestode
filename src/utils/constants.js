export const templateCard = '.card-template';


export const configValidation = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
    formSet: '.popup__form-set'
};

export const author = {
    name: document.querySelector('.profile__name'),
    info: document.querySelector('.profile__job'),
    nameInput: document.querySelector('.popup__input_type_name'),
    infoInput: document.querySelector('.popup__input_type_job')
};

export const popupImg = document.querySelector('.popup_type_img');

export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__job');
export const nameInput = document.querySelector('.popup__input_type_name');
export const jobInput = document.querySelector('.popup__input_type_job');
export const popupEdit = document.querySelector('.popup_type_edit');
export const popupAdd = document.querySelector('.popup_type_add');
export const popupQuestion = document.querySelector('.popup_type_question');
export const popupAvatar = document.querySelector('.popup_type_avatar');

export const addButton = document.querySelector('.profile__add-button');
export const editButton = document.querySelector('.profile__edit-button');

export const addForm = document.querySelector('[name="addPopup"]');
export const editForm = document.querySelector('[name="editPopup"]');
export const avatarForm = document.querySelector('[name="avatarPopup"]');

export const cardListSelector = document.querySelector('.cards');
export const avatarSelector = document.querySelector('.profile__change-avatar');
export const avatar = document.querySelector('.profile__avatar');

export const btnSave = document.querySelector('.popup__button');
export const btnNew = document.querySelector('.popup__button_type_add');