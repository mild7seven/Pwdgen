async function generatePass() {
    const master = document.getElementById('masterKey').value;
    const service = document.getElementById('service').value.toLowerCase();
    const display = document.getElementById('result');

    if (!master || !service) {
        alert("Isi kedua kolom!");
        return;
    }

    // 1. Teknik Reversal: Membalikkan input untuk mengacaukan pola
    const combined = master.split("").reverse().join("") + service;

    // 2. Teknik Enkripsi: SHA-256 Hashing
    const msgBuffer = new TextEncoder().encode(combined);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    
    // Konversi ke Base64 untuk mendapatkan karakter spesial & angka (High Entropy)
    const base64Hash = btoa(String.fromCharCode.apply(null, hashArray));

    // Ambil 16 karakter pertama sebagai password kuat
    const finalPass = base64Hash.substring(0, 16) + "!"; 
    
    display.innerText = finalPass;
}
