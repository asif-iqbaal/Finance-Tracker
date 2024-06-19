let db;
let openRequest = indexedDB.open('userData',2);

openRequest.onupgradeneeded = (e) => {
    console.log("data base is not present but now it is created");
        db = e.target.result;
        if(!db.objectStoreNames.contains("signup")){
            let objectStore = db.createObjectStore("signup",{keyPath:"username"});
            objectStore.createIndex("username","username",{unique: true});
            objectStore.createIndex("password","password",{unique: true});
    }
};

openRequest.onsuccess = (e) => {
    db = e.target.result;
        
        let btn = document.getElementById('submit');

        btn.addEventListener('click',function(){
        let name = document.getElementById('name').value;
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;
        if(name === "" || username === "" || password === ""){
            document.getElementById('msg').innerHTML = `please fill the form completely`
        }else{
        let transaction = db.transaction('signup','readwrite');
        let objectStore = transaction.objectStore('signup');

            let request = objectStore.add({
                name: name,
                username: username,
                password: password 
            });
            request.onsuccess = (e)=>{
                window.location.href = 'log.html'
                console.log("data added signup completed");
            }
            request.onerror() = (e) =>{
                console.error("error",e.target.error);
            }

            transaction.oncomplete = (e) => {
                console.log("transaction success");
            }
            transaction.onerror = (e) => {
                console.log("transaction error");
            }
        }
         
    });
   
};

openRequest.error = (e) => {
    console.error("error",e.target.error);
}