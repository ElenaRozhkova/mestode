export default class Popup {
    constructor(popupElement) {
        this._popupElement = popupElement;
        this.setEventListeners();
        this._handleEscClose = (evt) => {
            if (evt.key === 'Escape') {
                this.close()
            }
        }
    }
    _closeByOverlay(evt) {
        if (evt.target === evt.currentTarget) { this.close(); }
    }

    setEventListeners() {
        this._popupElement.querySelector('.popup__close').addEventListener('click', () => this.close());
        this._popupElement.addEventListener('click', (evt) => this._closeByOverlay(evt));
    }
    open() {
        document.addEventListener('keydown', this._handleEscClose);
        this._popupElement.classList.add('popup_opened');
    }

    close() {
        document.removeEventListener('keydown', this._handleEscClose);
        this._popupElement.classList.remove('popup_opened');
    }

}