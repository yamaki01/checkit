firebase.initializeApp({
<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#config-web-app -->

<script>
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBw71iaoXCwc10E3R3Zc4KszEte96sgn6U",
    authDomain: "test01-a296e.firebaseapp.com",
    databaseURL: "https://test01-a296e.firebaseio.com",
    projectId: "test01-a296e",
    storageBucket: "test01-a296e.appspot.com",
    messagingSenderId: "869682482726",
    appId: "1:869682482726:web:09529a3b0ddfc429"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
</script>
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
