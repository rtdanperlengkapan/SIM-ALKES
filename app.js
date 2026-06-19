// FUNGSI HITUNG SISA MASA PAKAI
function hitungSisaWaktu(tglPengadaan, lifetimeTahun) {
    const hariIni = new Date();
    const instalasi = new Date(tglPengadaan);
    
    // Menghitung tanggal ekspektasi alat habis masa pakai
    const tglKadaluwarsa = new Date(instalasi.setFullYear(instalasi.getFullYear() + lifetimeTahun));
    
    // Hitung selisih hari
    const selisihWaktu = tglKadaluwarsa - hariIni;
    const sisaHari = Math.ceil(selisihWaktu / (1000 * 60 * 60 * 24));
    
    if (sisaHari <= 0) {
        return { teks: "🔴 Habis Masa Pakai (Afkir/Review)", kelas: "bg-danger text-white p-2 rounded" };
    } else if (sisaHari <= 365) {
        return { teks: `🟡 Kritis (${sisaHari} Hari Lagi)`, kelas: "bg-warning text-dark p-2 rounded" };
    } else {
        const sisaTahun = (sisaHari / 365).toFixed(1);
        return { teks: `🟢 Aman (${sisaTahun} Tahun Lagi)`, kelas: "bg-success text-white p-2 rounded" };
    }
}

// RENDER DATA KE TABEL HTML
function tampilkanTabel() {
    const tbody = document.getElementById("tabel-body");
    if(!tbody) return;
    
    tbody.innerHTML = "";
    
    databaseAlkes.forEach(alkes => {
        const status = hitungSisaWaktu(alkes.tglPengadaan, alkes.lifetimeTahun);
        
        const row = `<tr>
            <td class="fw-bold">${alkes.nama}</td>
            <td>${alkes.ruangan}</td>
            <td>${alkes.tglPengadaan}</td>
            <td>${alkes.lifetimeTahun} Tahun</td>
            <td><span class="${status.kelas}">${status.teks}</span></td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

// Jalankan fungsi otomatis saat halaman web dimuat
window.onload = tampilkanTabel;
