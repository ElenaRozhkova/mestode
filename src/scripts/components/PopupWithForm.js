import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupElement, submitForm) {
        super(popupElement);
        this._submitForm = submitForm;
        this._popupForm = this._popupElement.querySelector('.popup__form');
    }

    _getInputValues() {
        this._inputList = this._popupElement.querySelectorAll('.popup__input');
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);
        return this._formValues;
    }

    _handleSubmitForm(evt) {
        evt.preventDefault();
        this._submitForm(this._getInputValues());
    }
    setEventListeners() {
        super.setEventListeners();
        this._popupElement.addEventListener('submit', (evt) => this._handleSubmitForm(evt));
    }
    close() {
        super.close();
        this._popupForm.reset();
    }
}