const receipts = JSON.parse(localStorage.getItem("receipts")) || [];
const list = document.getElementById("list");
const empty = document.getElementById("empty");

if (receipts.length === 0) {
    empty.style.display = "block";
} else {
    receipts.forEach(r => {
        const row = document.createElement("tr");

        row.innerHTML = `
      <td>${r.invoiceNo || r.receiptNumber}</td>
      <td>${r.name}</td>
      <td>₹${r.amount}</td>
      <td>${r.date}</td>
      <td>${r.method}</td>
    `;

        list.appendChild(row);
    });
}
const CLEAR_PASSWORD = "SafachattGroup@2022"; // 🔐 change this password

document.getElementById("clearAll").addEventListener("click", function () {
    const enteredPassword = prompt("Enter password to clear all receipts:");

    if (enteredPassword === null) {
        return; // user cancelled
    }

    if (enteredPassword === CLEAR_PASSWORD) {
        if (confirm("Are you sure you want to delete ALL receipts?")) {
            localStorage.removeItem("receipts"); // adjust key if needed
            alert("All receipts cleared successfully.");
            location.reload();
        }
    } else {
        alert("❌ Incorrect password! Access denied.");
    }
});

