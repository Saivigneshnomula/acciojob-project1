// ------------------------------------
// BANK OBJECT
// ------------------------------------

const bank = {
    bankName: "JS Bank",
    accounts: []
};


// ------------------------------------
// CREATE ACCOUNT
// ------------------------------------

function createAccount(name, balance) {

    let accountNumber = bank.accounts.length + 101;

    const account = {
        accountNumber: accountNumber,
        holderName: name,
        balance: balance,
        transactions: []
    };

    bank.accounts.push(account);

    return account;
}


// ------------------------------------
// FIND ACCOUNT
// ------------------------------------

function findAccount(accountNo) {

    return bank.accounts.find(function(account) {
        return account.accountNumber == accountNo;
    });
}


// ------------------------------------
// DEPOSIT
// ------------------------------------

function deposit(accountNo, amount) {

    const account = findAccount(accountNo);

    if (!account) {
        return "Account not found";
    }

    if (amount <= 0) {
        return "Enter a valid amount";
    }

    account.balance = account.balance + amount;

    account.transactions.push({
        type: "deposit",
        amount: amount,
        date: new Date()
    });

    return "Deposit successful";
}


// ------------------------------------
// WITHDRAW
// ------------------------------------

function withdraw(accountNo, amount) {

    const account = findAccount(accountNo);

    if (!account) {
        return "Account not found";
    }

    if (amount <= 0) {
        return "Enter a valid amount";
    }

    if (account.balance < amount) {
        return "Insufficient balance";
    }

    account.balance = account.balance - amount;

    account.transactions.push({
        type: "withdraw",
        amount: amount,
        date: new Date()
    });

    return "Withdrawal successful";
}


// ------------------------------------
// TRANSFER
// ------------------------------------

function transfer(fromAccountNo, toAccountNo, amount) {

    const fromAccount = findAccount(fromAccountNo);
    const toAccount = findAccount(toAccountNo);

    if (!fromAccount) {
        return "From account not found";
    }

    if (!toAccount) {
        return "To account not found";
    }

    if (fromAccount.accountNumber == toAccount.accountNumber) {
        return "Cannot transfer to same account";
    }

    if (amount <= 0) {
        return "Enter a valid amount";
    }

    if (fromAccount.balance < amount) {
        return "Insufficient balance";
    }


    // Remove money from FROM account
    fromAccount.balance = fromAccount.balance - amount;


    // Add money to TO account
    toAccount.balance = toAccount.balance + amount;


    // Transaction for FROM account
    fromAccount.transactions.push({
        type: "transfer-out",
        amount: amount,
        date: new Date()
    });


    // Transaction for TO account
    toAccount.transactions.push({
        type: "transfer-in",
        amount: amount,
        date: new Date()
    });


    return "Transfer successful";
}


// ------------------------------------
// SHOW TRANSACTIONS
// ------------------------------------

function showTransactions(accountNo) {

    const account = findAccount(accountNo);

    if (!account) {
        return null;
    }

    return account.transactions;
}


// ------------------------------------
// SHOW ALL ACCOUNTS
// ------------------------------------

function showAllAccounts() {

    return bank.accounts;
}


// ------------------------------------
// DOM - CREATE ACCOUNT
// ------------------------------------

const createAccountBtn =
    document.getElementById("createAccountBtn");

createAccountBtn.addEventListener("click", function() {

    const name =
        document.getElementById("holderName").value;

    const balance =
        Number(document.getElementById("initialBalance").value);


    if (name == "" || balance < 0) {

        showMessage("Please enter valid details", "error");

        return;
    }


    const account = createAccount(name, balance);


    showMessage(
        "Account created successfully! Account Number: "
        + account.accountNumber,
        "success"
    );


    document.getElementById("holderName").value = "";
    document.getElementById("initialBalance").value = "";
});


// ------------------------------------
// DOM - DEPOSIT
// ------------------------------------

const depositBtn =
    document.getElementById("depositBtn");

depositBtn.addEventListener("click", function() {

    const accountNo =
        Number(document.getElementById("depositAccountNo").value);

    const amount =
        Number(document.getElementById("depositAmount").value);


    const result = deposit(accountNo, amount);


    if (result == "Deposit successful") {

        showMessage(result, "success");

    } else {

        showMessage(result, "error");
    }


    document.getElementById("depositAccountNo").value = "";
    document.getElementById("depositAmount").value = "";
});


// ------------------------------------
// DOM - WITHDRAW
// ------------------------------------

const withdrawBtn =
    document.getElementById("withdrawBtn");

withdrawBtn.addEventListener("click", function() {

    const accountNo =
        Number(document.getElementById("withdrawAccountNo").value);

    const amount =
        Number(document.getElementById("withdrawAmount").value);


    const result = withdraw(accountNo, amount);


    if (result == "Withdrawal successful") {

        showMessage(result, "success");

    } else {

        showMessage(result, "error");
    }


    document.getElementById("withdrawAccountNo").value = "";
    document.getElementById("withdrawAmount").value = "";
});


// ------------------------------------
// DOM - TRANSFER
// ------------------------------------

const transferBtn =
    document.getElementById("transferBtn");

transferBtn.addEventListener("click", function() {

    const fromAccountNo =
        Number(document.getElementById("fromAccountNo").value);

    const toAccountNo =
        Number(document.getElementById("toAccountNo").value);

    const amount =
        Number(document.getElementById("transferAmount").value);


    const result =
        transfer(fromAccountNo, toAccountNo, amount);


    if (result == "Transfer successful") {

        showMessage(result, "success");

    } else {

        showMessage(result, "error");
    }


    document.getElementById("fromAccountNo").value = "";
    document.getElementById("toAccountNo").value = "";
    document.getElementById("transferAmount").value = "";
});


// ------------------------------------
// DOM - CHECK BALANCE
// ------------------------------------

const checkBalanceBtn =
    document.getElementById("checkBalanceBtn");

checkBalanceBtn.addEventListener("click", function() {

    const accountNo =
        Number(document.getElementById("balanceAccountNo").value);

    const account = findAccount(accountNo);


    const balanceResult =
        document.getElementById("balanceResult");


    if (!account) {

        balanceResult.innerHTML =
            "Account not found";

        balanceResult.className = "error";

        return;
    }


    balanceResult.innerHTML =
        account.holderName
        + "'s Balance: ₹"
        + account.balance;

    balanceResult.className = "success";
});


// ------------------------------------
// DOM - SHOW TRANSACTIONS
// ------------------------------------

const transactionBtn =
    document.getElementById("transactionBtn");

transactionBtn.addEventListener("click", function() {

    const accountNo =
        Number(
            document.getElementById("transactionAccountNo").value
        );


    const account = findAccount(accountNo);

    const result =
        document.getElementById("transactionResult");


    if (!account) {

        result.innerHTML =
            "<p class='error'>Account not found</p>";

        return;
    }


    if (account.transactions.length == 0) {

        result.innerHTML =
            "<p>No transactions found</p>";

        return;
    }


    let html = `
        <table>
            <tr>
                <th>Type</th>
                <th>Amount</th>
                <th>Date</th>
            </tr>
    `;


    account.transactions.forEach(function(transaction) {

        html += `
            <tr>
                <td>${transaction.type}</td>
                <td>₹${transaction.amount}</td>
                <td>${transaction.date.toLocaleString()}</td>
            </tr>
        `;

    });


    html += "</table>";


    result.innerHTML = html;
});


// ------------------------------------
// DOM - SHOW ALL ACCOUNTS
// ------------------------------------

const showAccountsBtn =
    document.getElementById("showAccountsBtn");

showAccountsBtn.addEventListener("click", function() {

    const accounts =
        showAllAccounts();

    const result =
        document.getElementById("accountsResult");


    if (accounts.length == 0) {

        result.innerHTML =
            "<p>No accounts created yet.</p>";

        return;
    }


    let html = `
        <table>
            <tr>
                <th>Account No</th>
                <th>Holder Name</th>
                <th>Balance</th>
            </tr>
    `;


    accounts.forEach(function(account) {

        html += `
            <tr>
                <td>${account.accountNumber}</td>
                <td>${account.holderName}</td>
                <td>₹${account.balance}</td>
            </tr>
        `;

    });


    html += "</table>";


    result.innerHTML = html;
});


// ------------------------------------
// MESSAGE FUNCTION
// ------------------------------------

function showMessage(message, type) {

    const messageElement =
        document.getElementById("message");

    messageElement.innerText = message;
 
    messageElement.className = "main-version";
}


