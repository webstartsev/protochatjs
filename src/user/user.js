export class User {
    constructor({auth, renderChat, renderAuth}) {
		this.auth = auth;
		this.uid = this.getLocalStorage();
		this.renderChat = renderChat;
		this.renderAuth = renderAuth;
		this._onAuthStateChanged();
	}

	getLocalStorage(){
		return localStorage.getItem("user.uid");
	}

	login(email, password){
		this.auth.signInWithEmailAndPassword(email, password)
			.catch(e => console.log(e.message));

	}
	register(email, password){
		this.auth.createUserWithEmailAndPassword(email, password)
			.catch(e => console.log(e.message));
	}
	logout(){
		this.auth.signOut();
	}

	_setUserInfo(user){
		console.log('user: ', user);
		localStorage.setItem("user.uid", user.uid);
	}

	_onAuthStateChanged(){
		this.auth.onAuthStateChanged(user => {
			if(user){
				_setUserInfo(user);
				this.renderChat();
			} else {
				this.renderAuth();
			}
		});
	}
}
