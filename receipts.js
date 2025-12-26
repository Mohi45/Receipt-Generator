const receipts = JSON.parse(localStorage.getItem("receipts")) || [];
const list = document.getElementById("list");
const empty = document.getElementById("empty");

if (receipts.length === 0) {
    empty.style.display = "block";
} else {
    receipts.forEach(r => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${r.invoiceNo}</td>
            <td>${r.name}</td>
            <td>₹${r.amount}</td>
            <td>${r.date}</td>
            <td>${r.method}</td>
        `;
        list.appendChild(row);
    });
}

const PASSWORD = "SafachattGroup@2022";

document.getElementById("clearAll").onclick = () => {
    const p = prompt("Enter password");
    if (p === PASSWORD) {
        localStorage.removeItem("receipts");
        location.reload();
    } else if (p !== null) {
        alert("Wrong password");
    }
};
