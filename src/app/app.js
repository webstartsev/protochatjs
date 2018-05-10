import {Chat} from "../chat/chat.js";
import {Form} from "../form/form.js";
import {User} from "../user/user.js";
import {Auth} from "../auth/auth.js";
import {FirebaseService} from "./../modules/firebase.service.js";

export class App {
    constructor({el}) {
        this.el = el;
		this.db = new FirebaseService();
		this.auth = this.db.firebase.auth();

		this.user = new User({
			auth: this.auth,
			renderChat: this.renderChat.bind(this),
			renderAuth: this.renderAuth.bind(this)
		});

		if(this.user.uid){
			this.chat = new Chat({
				el: document.createElement("div"),
				data: {
					messages: [],
					user: this.user.email
				}
			});
			this.form = new Form({
				el: document.createElement("div"),
				onSubmit: this._onChatFormSubmit.bind(this)
			});

			this.renderChat();
			this.getMessagesChat(this.chatId);
			this.el.append(this.chat.el, this.form.el);
		} else {
			this.authForm = new Auth({
				el: document.createElement("div"),
				onLogin: this.user.login,
				onRegister: this.user.register,
			});

			this.renderAuth();
			this.el.append(this.authForm.el);
		}
    }

    getMessagesChat() {
		// let loading = document.createElement("div");
		// loading.classList.add("loading");
		// loading.textContent = "Загрузка сообщений";
		// this.el.append(loading);

        this.db.get("messages", data => {
            if (data) {
                let messages = [];
                data.forEach(doc => {
                    messages.push(doc.data());
				});
				// this.el.querySelector(".loader").remove();
				this.chat.add(messages);
				this.chat.render();
			}

		});
	}
	renderAuth(){
		this.authForm.clear();
		this.authForm.render();
	}

    renderChat() {
		this.chat.clear();
		this.form.clear();
		this.chat.render();
		this.form.render();
    }

    _initEvents() {}

    _onChatFormSubmit({text}) {
        this.db.post(
            "messages", {
                text,
                name: USER_NAME
            },
            data => {
                this.chat.addOne({
                    text,
                    name: USER_NAME
                });
                this.renderChat();
            }
        );
	}
	_logout(){
		event.preventDefault();
		this.db.auth.signOut();
	}
}