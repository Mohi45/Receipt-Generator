function generateInvoiceNumber() {
    return "INV-" + Math.floor(100000 + Math.random() * 900000);
}

function getDate() {
    return new Date().toLocaleDateString("en-GB");
}

document.getElementById("receiptForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const nameVal = document.getElementById("name").value;
    const addressVal = document.getElementById("address").value;
    const amountVal = document.getElementById("amount").value;
    const methodVal = document.getElementById("method").value;

    const invoiceNo = generateInvoiceNumber();
    const date = getDate();

    // Fill receipt UI
    document.getElementById("custName").textContent = nameVal;
    document.getElementById("custAddress").textContent = addressVal;
    document.getElementById("invoiceNo").textContent = invoiceNo;
    document.getElementById("invoiceDate").textContent = date;
    document.getElementById("totalAmount").textContent = amountVal;
    document.getElementById("finalAmount").textContent = amountVal;
    document.getElementById("payMethod").textContent = methodVal;

    // SAVE TO LOCAL STORAGE ✅
    const receiptData = {
        invoiceNo: invoiceNo,
        name: nameVal,
        address: addressVal,
        amount: amountVal,
        method: methodVal,
        date: date
    };

    let receipts = JSON.parse(localStorage.getItem("receipts")) || [];
    receipts.push(receiptData);
    localStorage.setItem("receipts", JSON.stringify(receipts));

    // Show receipt
    document.getElementById("receipt").classList.add("show");
});

function downloadPDF() {
    const receipt = document.getElementById("receipt");

    // Make visible for capture
    receipt.classList.add("show");

    html2canvas(receipt, { scale: 2 }).then(canvas => {
        const imgData = canvas.toDataURL("image/png");

        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF("p", "pt", "a4");

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        // Calculate scale to fit ONE page
        const imgWidth = pageWidth - 40;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let finalWidth = imgWidth;
        let finalHeight = imgHeight;

        // If height exceeds page, scale down
        if (finalHeight > pageHeight - 40) {
            const scale = (pageHeight - 40) / finalHeight;
            finalHeight *= scale;
            finalWidth *= scale;
        }

        const x = (pageWidth - finalWidth) / 2;
        const y = 20;

        pdf.addImage(imgData, "PNG", x, y, finalWidth, finalHeight);
        pdf.save("invoice.pdf");
    });
}






