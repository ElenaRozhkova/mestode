export default class Section {
    constructor({ renderer }, containerSelector) {
        // this._renderedItems = data;
        this._renderer = renderer;
        this._container = containerSelector;
    }

    addItem(element) {
        this._container.prepend(element);
    }

    renderItems(renderedItems, userID) {
        renderedItems.forEach(item => {
            this._renderer(item, userID);
        });
    }
}