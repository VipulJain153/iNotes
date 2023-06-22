showNotes();
const make = document.getElementById("make");
const update = document.getElementById("update");
const searchBtn = document.getElementById("search");

make.addEventListener("submit",(e) => {
	e.preventDefault();
	let notes = localStorage.getItem("notes");
	let notesArr = (notes == null || notes == '[]') ? [] : JSON.parse(notes);
	let title = document.getElementById("title");
	let desc = document.getElementById("desc");
	let now = new Date();
	now = now.toString().slice(0, 25);
	let myNote = {titleName: title.value, DESCR: desc.value, DateCreated: now};
	notesArr.push(myNote);
	localStorage.setItem("notes", JSON.stringify(notesArr));
	title.value = "";
	desc.value = "";
	showNotes();
});

function showNotes(){
	let notes = localStorage.getItem("notes");
	let notesCont = document.getElementById("notesCont");
	let notesArr = (notes == null || notes == '[]') ? null : JSON.parse(notes);
	if (notesArr!=null){
		notesCont.innerHTML = "";
		notesArr.forEach(function(elem, index){
			notesCont.innerHTML += `<div class="card my-4 mx-4" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">${elem.titleName}</h5>
    <h6 class="card-subtitle mb-2 text-body-secondary">Created At: ${elem.DateCreated}</h6>
    <p class="card-text">${elem.DESCR}</p>
    <button type="submit" id="${index}" onclick="UpdateNote(this.id)" data-bs-toggle="modal" data-bs-target="#exampleModal"  class="btn btn-primary my-2">Update Note</button>
    <button type="submit" id="${index}" onclick="DeleteNote(this.id)" class="btn btn-danger my-2">Delete Note</button>
  </div>
</div>`
		});
	} else {
		notesCont.innerHTML = `No Notes Found! Add a Note using "Add a Note" Section.`
	};
};

function DeleteNote(index){
	let notes = localStorage.getItem("notes");
	let notesArr = JSON.parse(notes);
	notesArr.splice(index, 1);
	localStorage.setItem("notes", JSON.stringify(notesArr));
	showNotes();
}

function UpdateNote(index){
	let notes = localStorage.getItem("notes");
	let notesArr = JSON.parse(notes);
	let note = notesArr[index];
	let title = document.getElementById("titleUpdate");
	let desc = document.getElementById("descUpdate");
	let idx = document.getElementsByClassName("index");
	idx.id = index;
	title.value = note.titleName;
	desc.value = note.DESCR;
}

update.addEventListener('click', (e) => {
	let notes = localStorage.getItem("notes");
	let notesArr = JSON.parse(notes);
	let title = document.getElementById("titleUpdate");
	let desc = document.getElementById("descUpdate");
	let idx = document.getElementsByClassName("index");
	let index = idx.id;
	let now = new Date();
	now = now.toString().slice(0, 25);
	notesArr[index].titleName = title.value;
	notesArr[index].DESCR = desc.value;
	notesArr[index].DateCreated = now;
	localStorage.setItem("notes", JSON.stringify(notesArr));
	showNotes();
});

searchBtn.addEventListener("click", (e) => {
	e.preventDefault();
	let query = document.getElementById("SearchBar").value.trim();
	let notesCont = Array.from(document.getElementById("notesCont").childNodes);
	let notFound = 0;
	notesCont.forEach((elem) => {
		let textElem = elem.innerText;
		console.log(query.length,query)
		if ((!textElem.includes(query))) {
			elem.style.display = "none";
			notFound +=1 ;
		} else {
			elem.style.display = "block";
		};
	});
	if (notesCont.length==notFound) {
		document.getElementById("notFound").style.display = "block";
	} else {
		document.getElementById("notFound").style.display = "none";
	};
	});

document.getElementById("SearchBar").addEventListener('input', (e) => {
	let query = document.getElementById("SearchBar").value.trim();
	let notesCont = Array.from(document.getElementById("notesCont").childNodes);
	if (query.length == 0){
			showNotes();
	};
	
});