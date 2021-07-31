let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function updateUI() {
  const income = transactions.filter(t => t.amount > 0).reduce((s, t) => s + t.amount, 0);
  const expense = transactions.filter(t => t.amount < 0).reduce((s, t) => s + t.amount, 0);
  const balance = income + expense;

  document.getElementById('balance').textContent = '$' + balance.toFixed(2);
  document.getElementById('totalIncome').textContent = '+$' + income.toFixed(2);
  document.getElementById('totalExpense').textContent = '-$' + Math.abs(expense).toFixed(2);

  const list = document.getElementById('list');
  list.innerHTML = '';
  transactions.forEach((t, i) => {
    list.innerHTML += `
      <li class="${t.amount < 0 ? 'expense-item' : ''}">
        ${t.desc}
        <span class="amount">${t.amount > 0 ? '+' : ''}$${t.amount.toFixed(2)}</span>
        <button onclick="deleteTransaction(${i})">×</button>
      </li>`;
  });
}

function addTransaction() {
  const desc = document.getElementById('desc').value.trim();
  const amount = parseFloat(document.getElementById('amount').value);

  if (!desc || isNaN(amount)) {
    alert('Please fill in both fields!');
    return;
  }

  transactions.push({ desc, amount });
  localStorage.setItem('transactions', JSON.stringify(transactions));
  updateUI();

  document.getElementById('desc').value = '';
  document.getElementById('amount').value = '';
}

function deleteTransaction(index) {
  transactions.splice(index, 1);
  localStorage.setItem('transactions', JSON.stringify(transactions));
  updateUI();
}

updateUI();
