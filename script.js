let accounts = [];

let createBtn = document.querySelector("#createBtn");
let nameInput = document.querySelector("#name");
let balanceInput = document.querySelector("#balance");

let accountsContainer = document.querySelector("#accountsContainer");

createBtn.addEventListener("click", function () {

    let name = nameInput.value;
    let balance = Number(balanceInput.value);

    let account = {
        accountNumber: 101,
        holderName: name,
        balance: balance,
        transactions: []
    };

    accounts.push(account);

    accountsContainer.innerHTML = `
        <p>Account Number: ${account.accountNumber}</p>
        <p>Name: ${account.holderName}</p>
        <p>Balance: ₹${account.balance}</p>
        <hr>
    `;

});