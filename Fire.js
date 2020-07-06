import firebase from 'firebase';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBFcT2nfjrJ9vjvBpBf_6WVRXpIm0l6MB8",
    authDomain: "covidcare-79c01.firebaseapp.com",
    databaseURL: "https://covidcare-79c01.firebaseio.com",
    projectId: "covidcare-79c01",
    storageBucket: "covidcare-79c01.appspot.com",
    messagingSenderId: "167539698380",
    appId: "1:167539698380:web:7b2fffb68b76f353033069",
    measurementId: "G-BWGBBR3VW5"
};



class Fire {
    constructor(callback) {
        this.init(callback);
    }

    init(callback) {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                callback(null, user);
                // console.log("got a user:", user)
            } else {
                firebase
                    .auth()
                    .signInAnonymously()
                    .catch(error => {
                        callback(error);
                    });
            }
        });
    }

    getLists(callback) {

        let myID = this.userId;
  

        let ref = this.ref.orderBy("name")

            // console.log(" kev=id", this.userId)

           this.unsubscribe = ref.onSnapshot(querySnapshot => {
                const list = [];
                querySnapshot.forEach(doc => {
        
                    // console.log("kev d =", doc.id)
                  const { title, complete } = doc.data();
                  list.push({
                    id: doc.id, ...doc.data()
                  });
                });
        
                callback(list);
        
            } ); 

    }

    addList(list) {
        let ref = this.ref;
        ref.add(list)

    }

    updateList(list) {
        let ref = this.ref;
        ref.doc(list.id).update(list)

    }

    get userId() {
        return firebase.auth().currentUser.uid;
    }

    get ref() {
        return firebase
        .firestore()
        .collection("users")
        .doc("Pzs8YHxggDcyahrUXKen")
        .collection("lists");
    }

    detach() {
        this.unsubscribe();
    }
}

export default Fire;