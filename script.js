const itemInput = document.getElementById("itemInput");
const shoppingList = document.getElementById("shoppingList");
const itemCount = document.getElementById("itemCount");
const clearAllBtn = document.getElementById("clearAllBtn");

// ========== FUNGSI LOCAL STORAGE ==========

// Fungsi untuk menyimpan data ke localStorage
function saveData() {
  localStorage.setItem("data", shoppingList.innerHTML);
}
// Fungsi untuk memuat data dari localStorage
function showTask() {
  const savedData = localStorage.getItem("data");
  if (savedData) {
    shoppingList.innerHTML = savedData;
  }
  updateItemCount();
}
// ========== FUNGSI UPDATE COUNTER ==========
function updateItemCount() {
  itemCount.textContent = shoppingList.children.length;
}
// ================ Empty Message ================

// ========== FUNGSI ADD TASK ==========
function addTask() {
  const item = itemInput.value;
  if (item === "") {
    const emptyLi = document.createElement("li");
    emptyLi.className = "empty-message";
    emptyLi.setAttribute("aria-label", "Daftar belanja kosong");
    emptyLi.innerText = "Belum ada item. Tambahkan belanjaan!";
    shoppingList.appendChild(emptyLi);
    alert("Masukkan daftar belanja");
  } else {
    let li = document.createElement("li");

    // Buat span untuk teks item
    const itemText = document.createElement("span");
    itemText.className = "item-text";
    itemText.innerText = item;

    // Buat button untuk delete
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-item";
    deleteBtn.setAttribute("aria-label", `Hapus ${item}`);
    deleteBtn.innerHTML = "✕"; // simbol X

    li.appendChild(itemText);
    li.appendChild(deleteBtn);

    shoppingList.appendChild(li);

    itemInput.value = "";
    updateItemCount();
    saveData();
  }
}
// Hapus /
shoppingList.addEventListener("click", function (e) {
  if (
    e.target.classList.contains("delete-item") ||
    e.target.tagName === "BUTTON"
  ) {
    const li = e.target.closest("li");
    if (li) {
      li.remove();
      updateItemCount();
      saveData();
    }
  }
});

clearAllBtn.addEventListener("click", function () {
  // Cek apakah ada item (li) di shoppingList
  if (shoppingList.children.length > 0) {
    const confirmDelete = confirm("Hapus semua item dari daftar belanja?");

    if (confirmDelete) {
      shoppingList.innerHTML = "";
      alert("Semua item telah dihapus.");
      updateItemCount();
      saveData();
    }
  } else {
    // Jika tidak ada item
    alert("Daftar belanja sudah kosong.");
  }
});
document.addEventListener("DOMContentLoaded", function () {
  showTask();
});
