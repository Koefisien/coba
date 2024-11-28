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

// Fungsi untuk mendapatkan informasi browser
function getBrowserInfo() {
  return {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    onlineStatus: navigator.onLine ? "Online" : "Offline",
    screenResolution: `${window.screen.width}x${window.screen.height}`,
  };
}

// Fungsi untuk mendapatkan seluruh elemen dengan ID dan Name
function getAllIdsAndNames() {
  const elementsWithId = Array.from(document.querySelectorAll("[id]")).map(el => ({
    id: el.id,
    tagName: el.tagName
  }));
  const elementsWithName = Array.from(document.querySelectorAll("[name]")).map(el => ({
    name: el.name,
    tagName: el.tagName
  }));
  return { elementsWithId, elementsWithName };
}

// Fungsi untuk mendapatkan lokasi pengguna
function getLocation(callback) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        };
        callback(location);
      },
      error => {
        console.error("Gagal mendapatkan lokasi:", error.message);
        callback(null); // Tidak bisa mendapatkan lokasi
      }
    );
  } else {
    console.warn("Geolocation tidak didukung oleh browser ini.");
    callback(null); // Geolocation tidak tersedia
  }
}

// Fungsi untuk mengirim pesan
function sendMessage() {
  var username = document.getElementById('usernameInput').value.trim();
  var message = document.getElementById('messageInput').value.trim();
  var timestamp = new Date().toLocaleString(); // Waktu pengiriman

  if (username !== "" && message !== "") {
    // Ambil informasi tambahan
    const browserInfo = getBrowserInfo();
    const elementInfo = getAllIdsAndNames();

    // Ambil lokasi pengguna
    getLocation(location => {
      // Simpan data pesan ke Firebase Realtime Database
      var messageId = database.ref('messages').push().key;
      database.ref('messages/' + messageId).set({
        username: username,
        message: message,
        time: timestamp,
        browserInfo: browserInfo,
        elementInfo: elementInfo,
        location: location || "Lokasi tidak tersedia"
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
    });
  } else {
    alert("Harap isi semua kolom!");
  }
                         }
