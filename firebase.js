firebase.initializeApp({
  apiKey: 'AIzaSyANamGza96l_HKbG-hsw73WvCFxNv_I_YY',
  authDomain: 'dd5tools.firebaseapp.com',
  databaseURL: 'https://dd5tools.firebaseio.com',
  projectId: 'dd5tools',
  storageBucket: 'dd5tools.appspot.com',
  messagingSenderId: '1096592466642',
});

const db = firebase.firestore();

class FirestoreListener {
  constructor(name, collection) {
    db.collection(name).onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const id = change.doc.id;
        const data = change.doc.data();
        if (change.type === 'added') {
          collection.add(id, data);
        } else if (change.type === 'modified') {
          collection.modify(id, data);
        } else if (change.type === 'removed') {
          collection.remove(id);
        }
      });
    });
  }
}
