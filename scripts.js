// Konfigurasi Firebase
var firebaseConfig = {
  apiKey: "AIzaSyBGszzdRV-P4HcNWwz24FT1FyZF5RMZngc",
  authDomain: "core-project-70fb1.firebaseapp.com",
  databaseURL: "https://core-project-70fb1-default-rtdb.firebaseio.com",
  projectId: "core-project-70fb1",
  storageBucket: "core-project-70fb1.firebasestorage.app",
  messagingSenderId: "973484049142",
  appId: "1:973484049142:android:03589b8f79edeb36d762d7"
};

// Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);

// Referensi ke Realtime Database
var database = firebase.database();

// Fungsi untuk mengirim pesan
function sendMessage() {
  var username = document.getElementById('usernameInput').value.trim();
  var message = document.getElementById('messageInput').value.trim();
  var timestamp = new Date().toLocaleString(); // Waktu pengiriman

  if (username !== "" && message !== "") {
    // Simpan data pesan ke Firebase Realtime Database
    var messageId = database.ref('messages').push().key;
    database.ref('messages/' + messageId).set({
      username: username,
      message: message,
      time: timestamp
    });

    // Kosongkan form setelah pengiriman
    document.getElementById('usernameInput').value = '';
    document.getElementById('messageInput').value = '';

    // Tampilkan pesan sukses
    var successMessage = document.getElementById('successMessage');
    successMessage.style.display = "block";
    setTimeout(() => {
      successMessage.style.display = "none";
    }, 3000);
  } else {
    alert("Harap isi semua kolom!");
  }
}
