document.getElementById("receiptForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = nameField();
    const address = document.getElementById("address").value;
    const amount = document.getElementById("amount").value;
    const method = document.getElementById("method").value;

    const invoiceNo = "INV-" + Date.now();
    const date = new Date().toLocaleDateString("en-IN");

    document.getElementById("custName").innerText = name;
    document.getElementById("custAddress").innerText = address;
    document.getElementById("totalAmount").innerText = amount;
    document.getElementById("finalAmount").innerText = amount;
    document.getElementById("payMethod").innerText = method;
    document.getElementById("invoiceNo").innerText = invoiceNo;
    document.getElementById("invoiceDate").innerText = date;

    document.querySelector(".receipt-wrapper").style.display = "block";

    const receipts = JSON.parse(localStorage.getItem("receipts")) || [];
    receipts.push({ invoiceNo, name, amount, date, method });
    localStorage.setItem("receipts", JSON.stringify(receipts));
});

function nameField() {
    return document.getElementById("name").value;
}

function downloadPDF() {
    html2canvas(document.getElementById("receipt")).then(canvas => {
        const pdf = new jspdf.jsPDF("p", "mm", "a4");
        pdf.addImage(canvas.toDataURL("image/png"), "PNG", 10, 10, 190,
            canvas.height * 190 / canvas.width);
        pdf.save("receipt.pdf");
    });
}
