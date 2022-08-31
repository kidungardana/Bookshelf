document.addEventListener("DOMContentLoaded", function () {
 
    const submitForm = document.getElementById("inputBook");
 
    submitForm.addEventListener("submit", function (event) {
        event.preventDefault();
        // Panggil Function buat masukin buku
        addBook();
    });

    if(isStorageExist()){
        loadDataFromStorage();
    }
});

document.getElementById("inputBookIsComplete").addEventListener("change", function(){
    if(this.checked){
        document.querySelector("#bookSubmit span").innerText = "Finished Reading";
    }else{
        document.querySelector("#bookSubmit span").innerText = "Not Finished Reading";
    }
});


let searchInput = document.getElementById("searchBookTitle");
searchInput.addEventListener('keyup', function(){
    
    let searchVal = document.getElementById("searchBookTitle").value.toUpperCase();
    
    let names1 = document.getElementById("incompleteBookshelfList");
    let names2 = document.getElementById("completeBookshelfList");

    let list1 = names1.getElementsByTagName("article");
    let list2 = names2.getElementsByTagName("article");

    for(let i = 0; i < list1.length; i++){
        let title = list1[i].getElementsByTagName('h3')[0];

        if(title.innerHTML.toUpperCase().indexOf(searchVal) > -1){
            list1[i].style.display = '';
        }else{
            list1[i].style.display = 'none';
        }
    }
    for(let i = 0; i < list2.length; i++){
        let title = list2[i].getElementsByTagName('h3')[0];

        if(title.innerHTML.toUpperCase().indexOf(searchVal) > -1){
            list2[i].style.display = '';
        }else{
            list2[i].style.display = 'none';
        }
    }
});

document.addEventListener("ondatasaved", () => {
    console.log("Data berhasil disimpan.");
});
 document.addEventListener("ondataloaded", () => {
    refreshDataFromBooks();
});