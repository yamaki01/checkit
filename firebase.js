firebase.initializeApp({
  apiKey: "AIzaSyBp0VVzKXpkPOkG7AKLBjiQ4ON41LfJIPk",
  authDomain: "checkit-56f02.firebaseapp.com",
  databaseURL: "https://checkit-56f02.firebaseio.com",
  projectId: "checkit-56f02",
  storageBucket: "",
  messagingSenderId: "959432634799",
  appId: "1:959432634799:web:1664ce840d46bc20"
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
