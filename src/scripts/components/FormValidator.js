export default class FormValidator {
    constructor(config, formName) {
        this._formName = formName;
        this._buttonElement = formName.querySelector(config.submitButtonSelector);
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._inputList = Array.from(formName.querySelectorAll(config.inputSelector));
    }

    enableValidation() {
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._toggleButtonState();
                this._checkInputValidity(inputElement);
            });
        });
    }

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._enableSubmitButton();
        } else {
            this.disableSubmitButton();
        }
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _hasInvalidInput() {
        return this._inputList.every((inputElement) => {
            return inputElement.validity.valid;
        });
    }

    _enableSubmitButton() {
        this._buttonElement.classList.remove(this._inactiveButtonClass);
        this._buttonElement.removeAttribute('disabled');
    };

    disableSubmitButton() {
        this._buttonElement.classList.add(this._inactiveButtonClass);
        this._buttonElement.setAttribute('disabled', 'true');
    };

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formName.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    };

    _hideInputError(inputElement) {
        const errorElement = this._formName.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    };

    removeInputsError() {
        this._inputList.forEach((input) => {
            this._hideInputError(input);
        });
    };

}