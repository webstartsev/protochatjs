export class Auth {
    constructor({el, onLogin, onRegister}) {
		this.el = el;
		this.onLogin = onLogin;
		this.onRegister = onRegister;
	}

    render() {
		this.el.innerHTML = authTemplate();
		this.el.querySelector(".js-login").addEventListener("click", (e) => {
			e.preventdefault();
			this.onRegister.bind(this);
		});
		this.el.querySelector(".js-register").addEventListener("click", (e) => {
			e.preventdefault();
			this.onRegister.bind(this);
		});
	}

	clear() {
		this.el.innerHTML = "";
	}
}
