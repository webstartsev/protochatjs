export class Btn {
    constructor({btnClass, btnValue, onClick}) {

		this.data = {};
		this.data.btn = {};
		this.data.btn.class = btnClass;
		this.data.btn.value = btnValue;
		this.el = document.createElement("div");

		this.render();

        this.el.addEventListener('click', this._onClick.bind(this));
        this.onClick = onClick;
    }

    render() {
		this.el.innerHTML = this._getHtml(this.data);
	}

	_getHtml(data) {
        return btnTemplate(data);
    }

    _onClick(event) {
		event.preventDefault();
        this.onClick({
            text: event.target.querySelector('textarea').value
        });
    }
}
