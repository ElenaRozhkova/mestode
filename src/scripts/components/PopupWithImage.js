import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupElement) {
        super(popupElement);       
        this._imageElement= popupElement.querySelector('.popup__image');
        this._imageCaption = popupElement.querySelector('.popup__name');       
    }

    open(item) {
        this._imageElement.src = item.link;
        this._imageElement.alt = item.name;
        this._imageCaption.textContent = item.name;
        super.open();
    }
}