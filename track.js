let greet = document.getElementById('greet');
let nam = document.getElementById('user');
let input = document.getElementById('username');

input.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        let input = document.getElementById('username');
        const value = input.value;
        localStorage.setItem('name', value);
        console.log(value);
        greet.style.visibility = 'visible';
        nam.innerHTML = localStorage.getItem('name');
        input.style.visibility = 'hidden';
    }
});

let paisa = 0;
let minu = 0;
let total = 0;
document.getElementById('btn').addEventListener('click', function (event) {
    event.preventDefault();

    let description = document.getElementById('description').value;
    let amount = parseInt(document.getElementById('amount').value);
    let dat = document.getElementById('date').value
    let category = document.getElementById('category').value;
    let tableBody = document.querySelector('.texts2');

    tableBody.innerHTML += `
<tr>
    <td>${description}</td>
    <td>${amount}</td>
    <td>${dat}</td>
     <td>${category}</td>
     <td>done</td>
  </tr>
`;

    if (category.toLowerCase() === 'income') {
        if (localStorage.getItem('add')) {
            paisa = parseInt(localStorage.getItem('add'));
            paisa += amount;
            localStorage.setItem('add', paisa);
            let In = document.querySelector('#total-income');
            In.innerHTML = localStorage.getItem('add');
        } else {
            paisa += amount;
            localStorage.setItem('add', paisa);
            let In = document.querySelector('#total-income');
            In.innerHTML = localStorage.getItem('add');
        }
    }
    if (category.toLowerCase() === 'expense') {
        if (localStorage.getItem('remove')) {
            minu = parseInt(localStorage.getItem('remove'));
            minu += amount;
            localStorage.setItem('remove', minu);
            let Ie = document.querySelector('#total-expenses');
            Ie.innerHTML = localStorage.getItem('remove');
        } else {
            minu += amount;
            localStorage.setItem('remove', minu);
            let Ie = document.querySelector('#total-expenses');
            Ie.innerHTML = localStorage.getItem('remove');
        }
    }
    let storedAdd = parseInt(localStorage.getItem('add')) || 0;
    let storedRemove = parseInt(localStorage.getItem('remove')) || 0;
    total = storedAdd - storedRemove;
    console.log(total);
    let netBalance = document.querySelector('#net-balance');
    localStorage.setItem('balance', total);
    netBalance.innerHTML = localStorage.getItem('balance');

    let recent = document.getElementById('recent-transactions');
    recent.innerHTML =
        `  <li>Description :${description}</li>
        <li>Amount :${amount}</li>
        <li>Category :${category}</li>
        <li>Date :${dat}</li>
        `;
    localStorage.setItem('recent', recent.innerHTML);
});

window.onload = function updateUsername() {
    let In = document.querySelector('#total-income');
    let Ie = document.querySelector('#total-expenses');
    let netBalance = document.getElementById('net-balance');
    let storedName = localStorage.getItem('name');
    let storedAdd = localStorage.getItem('add');
    let storedRemove = localStorage.getItem('remove');
    let rupees = localStorage.getItem('balance');
    let recent = document.getElementById('recent-transactions');
    let savedRecent = localStorage.getItem('recent');
    if (savedRecent) {
        recent.innerHTML = savedRecent;
    }
    if (storedName) {
        greet.style.visibility = 'visible';
        nam.innerHTML = storedName;
        input.style.visibility = 'hidden';
    }
    if (storedAdd) {
        In.innerHTML = storedAdd;
    }
    if (storedRemove) {
        Ie.innerHTML = storedRemove;
    }
    if (rupees) {
        netBalance.innerHTML = rupees;
    }
}

document.getElementById('set').addEventListener('click',function(){
    let setting = document.getElementById('setting');
    setting.style.visibility = 'visible';
    setting.style.height = '10vh'
})
document.getElementById('Reset').addEventListener('click',function(){
    localStorage.clear();
    location.reload();
});
document.getElementById('trans').addEventListener('click',function(){
    let transaction = document.querySelector('.transaction');
        transaction.style.visibility ='visible';
        transaction.style.height ='100vh';
        transaction.style.width ='100%';
})
document.getElementById('dash').addEventListener('click',function(){
    let transaction = document.querySelector('.transaction');
        transaction.style.visibility ='hidden';
        transaction.style.height ='0vh';
        transaction.style.width ='0%';
})
// document.getElementById('dash').addEventListener('click',function(){
//     let dashboard = document.getElementById('dashboard');
//     dashboard.style.visibility = 'visible';
//     dashboard.style.widht = '100%';
//     dashboard.style.height = '40vh';
// })