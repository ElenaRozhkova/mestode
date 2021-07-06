export default class Api {
    constructor(options) {
        this._token = options.token;
        this._url = options.url;
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
                headers: {
                    authorization: this._token
                }
            })
            .then(res => this._getResponseData(res))
    }

    getProfileInfo() {
        return fetch(`${this._url}/users/me`, {
                headers: {
                    authorization: this._token
                }
            })
            .then(res => this._getResponseData(res));
    }

    setProfileEdit(userName, userJob) {
        return fetch(`${this._url}/users/me`, {
                method: 'PATCH',
                headers: {
                    authorization: this._token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: userName,
                    about: userJob
                })
            })
            .then(res => this._getResponseData(res));

    }


    addCard(cardName, cardLink) {
        return fetch(`${this._url}/cards`, {
                method: 'POST',
                headers: {
                    authorization: this._token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: cardName,
                    link: cardLink
                })
            })
            .then(res => this._getResponseData(res))
    }


    addLike(id) {
        return fetch(`${this._url}/cards/likes/${id}`, {
                method: 'PUT',
                headers: {
                    authorization: this._token
                }
            })
            .then(res => this._getResponseData(res))
    }

    deleteLike(id) {
        return fetch(`${this._url}/cards/likes/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: this._token
                }
            })
            .then(res => this._getResponseData(res))
    }

    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
                method: 'DELETE',
                headers: {
                    authorization: this._token
                }
            })
            .then(res => this._getResponseData(res))
    }

    changeAvatar(url) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: url
            })
        }).then(res => this._getResponseData(res))

    }

}