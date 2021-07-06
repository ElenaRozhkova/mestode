import './index.css';

import {
    author,
    templateCard,
    configValidation as config,
    popupImg,
    popupEdit,
    popupAdd,
    popupQuestion,
    addButton,
    editButton,
    addForm,
    editForm,
    avatarForm,
    cardListSelector,
    popupAvatar,
    avatarSelector,
    avatar,
    btnSave,
    btnNew

} from './../utils/constants.js';
import Section from './../scripts/components/Section.js';
import PopupWithImage from './../scripts/components/PopupWithImage.js';
import PopupWithForm from './../scripts/components/PopupWithForm.js';
import Card from './../scripts/components/Card.js';
import FormValidator from './../scripts/components/FormValidator.js';
import UserInfo from './../scripts/components/UserInfo.js';
import Api from './../scripts/components/Api.js';

const popupImage = new PopupWithImage(popupImg);
const user = new UserInfo(author, avatar);


const api = new Api({
    url: `https://mesto.nomoreparties.co/v1/cohort-25`,
    token: 'e2f184c2-a2b5-47dc-b13c-5faef2aabe75'
});

const section = new Section({
    renderer: (item, userID) => {
        section.addItem(createCard(item, userID));
    }
}, cardListSelector);


const pageLoad = function() {
    Promise.all([api.getProfileInfo(), api.getInitialCards()])
        .then(([userInfo, cards]) => {
            user.editAvatar(userInfo);
            user.setUserInfo(userInfo);
            section.renderItems(cards, userInfo._id);
        })
        .catch((err) => {
            console.log(err);
        });
}
pageLoad();

/* Form Validation*/
const addformValidation = new FormValidator(config, addForm);
addformValidation.enableValidation();

const editformValidation = new FormValidator(config, editForm);
editformValidation.enableValidation();

const avatarformValidation = new FormValidator(config, avatarForm);
avatarformValidation.enableValidation();


/*Edit Profile*/
const popupEditProfile = new PopupWithForm(popupEdit, (userdaten) => {
    renderLoading(true, btnSave);
    api.setProfileEdit(userdaten.nameInput, userdaten.jobInput)
        .then((result) => {
            user.setUserInfo(result);
            popupEditProfile.close();
        })

    .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            renderLoading(false, btnSave);
        });

});

editButton.addEventListener('click', function() {
    editformValidation.disableSubmitButton();
    editformValidation.removeInputsError();
    const userInfo = user.getUserInfo();
    author.nameInput.value = userInfo.name;
    author.infoInput.value = userInfo.job;
    popupEditProfile.open();
});

const popupQuestionDelete = new PopupWithForm(popupQuestion, () => {
    cardDelete(popupQuestionDelete.card);

});

/*create Card*/
function createCard(item, userID) {
    const card = new Card(item, templateCard, () => { popupImage.open(item) },
        () => {
            popupQuestionDelete.open();
            popupQuestionDelete.card = card;
        },
        userID,
        () => { likeDelete(item, card); },
        () => { likeAdd(item, card); }
    );

    const cardElement = card.generateCard();
    return cardElement;
}

/*delete card*/
const cardDelete = function(card) {
    api.deleteCard(card._cardID)
        .then(() => {
            card.handleDeleteCard();
            popupQuestionDelete.close();
        })
        .catch((err) => {
            console.log(err);
        });
}


/*add Card Popup*/
const popupAddCard = new PopupWithForm(popupAdd, (item) => {
    renderLoading(true, btnNew);
    api.addCard(item.name, item.link)
        .then((result) => {
            section.addItem(createCard(result, result.owner._id));
            popupAddCard.close();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            renderLoading(false, btnNew);
        });
});

addButton.addEventListener('click', function() {
    addformValidation.disableSubmitButton();
    addformValidation.removeInputsError();
    popupAddCard.open();
});

/*change Avatar Popup*/

const popupChange = new PopupWithForm(popupAvatar, (item) => {
    renderLoading(true, btnSave);
    api.changeAvatar(item.avatar)
        .then((result) => {
            user.editAvatar(result);
            popupChange.close();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            renderLoading(false, btnSave);
        });


});

avatarSelector.addEventListener('click', () => {
    avatarformValidation.disableSubmitButton();
    avatarformValidation.removeInputsError();
    popupChange.open();
});


/*add Like Cards*/
const likeAdd = function(item, card) {
    api.addLike(item._id)
        .then((result) => {
            card.newCouldLike(result.likes.length);
        })
        .catch((err) => {
            console.log(err);
        });
}

/*delete like cards*/
const likeDelete = function(item, card) {
    api.deleteLike(item._id)
        .then((result) => {
            card.newCouldLike(result.likes.length);
        })
        .catch((err) => {
            console.log(err);
        });
}


/*Улучшенный UX всех форм*/
function renderLoading(isLoading, typeBtn) {
    if (isLoading) {
        if (typeBtn.textContent === "Speichern") { typeBtn.textContent = "Speichern..." }
        if (typeBtn.textContent === "Add") {
            typeBtn.textContent = "Add...";
        }

    } else {
        if (typeBtn.textContent === "Speichern...") { typeBtn.textContent = "Speichern" }
        if (typeBtn.textContent === "Add...") {
            typeBtn.textContent = "Add";
        }
    }
}