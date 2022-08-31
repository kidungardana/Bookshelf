const UNCOMPLETED_LIST_BOOK_ID = "incompleteBookshelfList";
const COMPLETED_LIST_BOOK_ID = "completeBookshelfList";
const BOOK_ID = "bookId";

function addBook(){
    const uncompletedReadList = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    const completedReadList = document.getElementById(COMPLETED_LIST_BOOK_ID);

    // komponen buku
    const bookTitle = document.getElementById("inputBookTitle").value;
    const bookAuthor = document.getElementById("inputBookAuthor").value;
    const bookYear = document.getElementById("inputBookYear").value;
    const bookIsComplete = document.getElementById("inputBookIsComplete").checked;

    const rak = bookToRead(bookTitle, bookAuthor, bookYear, bookIsComplete);

    //web storage
    const bookObject = composeBookObject(bookTitle, bookAuthor, bookYear, bookIsComplete);
    rak[BOOK_ID] = bookObject.id;
    bookRak.push(bookObject);
    
    if(bookIsComplete){
        completedReadList.append(rak);
    }else{
        uncompletedReadList.append(rak);
    }
    updateDataToStorage();
}

function bookToRead(title, author, year, isCompleted){
    const readTitle = document.createElement("h3");
    readTitle.innerText = title;

    const readAuthor = document.createElement("p");
    readAuthor.innerText = author;

    const readYear = document.createElement("p");
    readYear.innerText = year;

    const txtContainer = document.createElement("article");
    txtContainer.classList.add("book_item");
    txtContainer.append(readTitle, readAuthor, readYear);

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("action");

    if(isCompleted == false){
        buttonContainer.append(createGreenButtonToDone());
        buttonContainer.append(createRedButtonToErase());
    }else{
        buttonContainer.append(createdGreenButtonToRead());
        buttonContainer.append(createRedButtonToErase());
    }

    txtContainer.append(buttonContainer);
    return txtContainer;
}

function createButton(buttonTypeClass, value, eventListener){
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.innerText = value;

    button.addEventListener("click", function(event){
        eventListener(event);
    });

    return button;
}

function addTaskToCompleted(taskElement) {
    const completeTitle = taskElement.querySelector(".book_item h3").innerText;
    
    const infoBook = taskElement.querySelectorAll(".book_item p");
    const completeAuthor = infoBook[0].innerHTML;
    const completeYear = infoBook[1].innerHTML;
    
    const bookDones = bookToRead(completeTitle, completeAuthor, completeYear, true);
    const listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);

    const book = findBook(taskElement[BOOK_ID]);
    book.isCompleted = true;
    bookDones[BOOK_ID] = book.id;

    listCompleted.append(bookDones); 
    taskElement.remove();

    updateDataToStorage();
}

function addTaskToNotCompleted(taskElement) {
    const notCompleteTitle = taskElement.querySelector(".book_item h3").innerText;
    
    const infoBook = taskElement.querySelectorAll(".book_item p");
    const notCompleteAuthor = infoBook[0].innerHTML;
    const notCompleteYear = infoBook[1].innerHTML;
    
    const bookNotDones = bookToRead(notCompleteTitle, notCompleteAuthor, notCompleteYear, false);
    const listNotCompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);

    const book = findBook(taskElement[BOOK_ID]);
    book.isCompleted = false;
    bookNotDones[BOOK_ID] = book.id;

    listNotCompleted.append(bookNotDones); 
    taskElement.remove();

    updateDataToStorage();
}

function addTaskToTrash(taskElement){
    const bookPosition = findBookIndex(taskElement[BOOK_ID]);
    bookRak.splice(bookPosition, 1);

    taskElement.remove();

    updateDataToStorage();
}

function createGreenButtonToDone() {
    return createButton("green", "Finished", function(event){
        addTaskToCompleted(event.target.parentElement.parentElement);
    });
}
function createdGreenButtonToRead(){
    return createButton("green", "Not finished", function(event){
        addTaskToNotCompleted(event.target.parentElement.parentElement);
    });
}
function createRedButtonToErase() {
    return createButton("red", "Delete book", function(event){
        addTaskToTrash(event.target.parentElement.parentElement);
    });
}

