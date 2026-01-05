// Store added products
let cartItems = [];

// Function to add items
function addItem() {
    // Get input values
    const nameInput = document.getElementById('itemName');
    const qtyInput = document.getElementById('itemQty');
    const priceInput = document.getElementById('itemPrice');

    const name = nameInput.value;
    const qty = parseInt(qtyInput.value);
    const price = parseFloat(priceInput.value);

    // validation
    if (name === "" || isNaN(qty) || isNaN(price) || qty <= 0 || price <= 0) {
        alert("Please fill in all fields with valid values!");
        return;
    }

    // Calculate item total
    const totalItem = qty * price;

    // Add item object to the cart
    cartItems.push({
        name: name,
        qty: qty,
        price: price,
        total: totalItem
    });

    // Update invoice view
    renderInvoice();

    // Clear input fields for the next item
    nameInput.value = "";
    qtyInput.value = "";
    priceInput.value = "";
    nameInput.focus();
}

// Function to render the table and calculate totals
function renderInvoice() {
    const tableBody = document.getElementById('itemsBody');
    tableBody.innerHTML = ""; // Clear table before re-rendering

    let subtotal = 0;

    // Populate table rows
    cartItems.forEach((item) => {
        subtotal += item.total;
        
        const row = `
            <tr>
                <td>${item.name}</td>
                <td>${item.qty}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>$${item.total.toFixed(2)}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });

    // Final calculations
    const taxRate = 0.10; // tax
    const taxAmount = subtotal * taxRate;
    const grandTotal = subtotal + taxAmount;

    // Update values on screen
    document.getElementById('subtotalDisplay').innerText = `$${subtotal.toFixed(2)}`;
    document.getElementById('taxDisplay').innerText = `$${taxAmount.toFixed(2)}`;
    document.getElementById('totalDisplay').innerText = `$${grandTotal.toFixed(2)}`;

    // Generate ID and date when first item is added
    if (cartItems.length > 0) {
        updateInvoiceDetails();
    }
}

// Generate automatic invoice details 
function updateInvoiceDetails() {
    const randomId = Math.floor(1000 + Math.random() * 9000);
    document.getElementById('invId').innerText = `#${randomId}`;

    // Set formatted current date
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('dateDisplay').innerText = today.toLocaleDateString('en-US', options);
}

// Reset
function clearInvoice() {
    if (confirm("Are you sure you want to reset the invoice?")) {
        cartItems = [];
        renderInvoice();
        document.getElementById('invId').innerText = "#0000";
        document.getElementById('dateDisplay').innerText = "";
    }
}
