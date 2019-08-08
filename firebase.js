firebase.initializeApp({
  apiKey: "AIzaSyCCs8TGFbwaFhi5iirjdohRBALKvLwN-U0",
  authDomain: "checkit-a2cfe.firebaseapp.com",
  databaseURL: "https://checkit-a2cfe.firebaseio.com",
  projectId: "checkit-a2cfe",
  storageBucket: "checkit-a2cfe.appspot.com",
  messagingSenderId: "121304597067",
});

const db = firebase.firestore();

function listen(name, collection) {
  db.collection(name).onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change) => {
      const id = change.doc.id;
      const data = change.doc.data();
      if (change.type === 'added') {
        collection.push({ id, ...data });
      } else if (change.type === 'modified') {
        const member = collection.find((m) => m.id === id);
        Object.assign(member, data);
      }
    });
  });
}
