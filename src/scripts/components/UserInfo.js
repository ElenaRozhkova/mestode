export default class UserInfo {
    constructor(author, avatarProfile) {
        this._name = author.name;
        this._info = author.info;
        this._avatarProfile = avatarProfile;
    }

    getUserInfo() {
        this._userInfo = {
            name: this._name.textContent,
            job: this._info.textContent
        }
        return this._userInfo;

    }

    setUserInfo(user) {
        this._name.textContent = user.name;
        this._info.textContent = user.about;
    }

    editAvatar(userInfo) {
        this._avatarProfile.src = userInfo.avatar;
    }

}