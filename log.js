let db;

let openRequest = indexedDB.open('userData', 2);

openRequest.onsuccess = (e) => {
    db = e.target.result;
    let btn = document.getElementById('submit2');
    let msg = document.getElementById('msg');
    btn.addEventListener('click', (event) => {
        event.preventDefault();
        let username = document.getElementById('uname').value;
        let password = document.getElementById('pword').value;

        let transaction = db.transaction('signup', 'readonly');
        let objectStore = transaction.objectStore('signup');
        let request = objectStore.get(username);//  select keyPath. 

        request.onsuccess = (e) => {
            let user = e.target.result;
            let userFound = false;

            if (user && user.username === username && user.password === password) {
                userFound = true;
                console.log("Login success");
                msg.innerHTML =`login success`;
                window.location.href ='finance.html'
            }

            if (!userFound) {
                console.log("Login error: Invalid username or password");
                msg.innerHTML =`Invalid username or password`;
            }
        };

        request.onerror = (e) => {
            console.log("Error fetching user:", e.target.error);
        };
    });
};

openRequest.onerror = (e) => {
    console.log("Error opening database:", e.target.error);
};

openRequest.onupgradeneeded = (e) => {
    db = e.target.result;
    if (!db.objectStoreNames.contains('signup')) {
        db.createObjectStore('signup', { keyPath: 'username' });
    }
};
