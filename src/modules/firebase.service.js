export class FirebaseService {
    constructor(baseUrl = "") {
        // Initialize Firebase
        const config = {
            apiKey: "AIzaSyDz5njBpXTKSUm-dhgu02mI9_xoIQK2HwE",
            authDomain: "protochatjs.firebaseapp.com",
            databaseURL: "https://protochatjs.firebaseio.com",
            projectId: "protochatjs",
            storageBucket: "protochatjs.appspot.com",
            messagingSenderId: "517432029400"
        };
        this.firebase = firebase;

        this.firebase.initializeApp(config);
        this.db = this.firebase.firestore();
    }

    get(collection, cb) {
        this.db
			.collection(collection)
			.limit(20)
            .get()
            .then(snapshot => {
                cb(snapshot);
            });
    }

    post(collection, data, cb) {
        this.db
            .collection(collection)
            .add(data)
            .then(snapshot => {
                cb(snapshot);
            }).catch(error => {
                console.error("Error writing document: ", error);
            });
	}
}