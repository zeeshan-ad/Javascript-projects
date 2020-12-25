// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyD90Qk6dSsMwP92uC6iQr5ILgFcpYF7Iq0",
    authDomain: "note-daad9.firebaseapp.com",
    projectId: "note-daad9",
    storageBucket: "note-daad9.appspot.com",
    messagingSenderId: "955006972534",
    appId: "1:955006972534:web:e614c6e54e1b46ccb2e557",
    measurementId: "G-LKV9MFBMZ1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
displayNotes();
let l= 0;
function displayNotes(){
    const notesDiv= document.getElementById("notes");
    const dbRef = firebase.database().ref("notes/");
    dbRef.once("value").then(snapshot => {
    const notes = snapshot.val();
    l = Object.keys(notes)[Object.keys(notes).length-1];
    for(let i=0;i<=l;i++){
        if(notes[i] !== undefined){
        let noteVal = notes[i].note;
        let insideNote = document.createElement("div");
        insideNote.id = "note"+i; 
        insideNote.classList.add("note");
        insideNote.innerHTML = `
        <div class="tools">
        <button class="save"><i class="fas fa-check" id="save${i}"></i></button>
        <button class="delete"><i class="fas fa-times"  id="delete${i}"></i></button>
        </div>
        <textarea type="text" id="main${i}" class="text">${noteVal}</textarea>
        `; 
        notesDiv.appendChild(insideNote);
        }
     }
});
}

const addClick = document.getElementById("addBtn");
addClick.addEventListener("click", () => {
    l++;
    addNote(l);
});

function addNote(l){
    let insideNote = document.createElement("div");
    insideNote.id = "note"+l;
    insideNote.classList.add("note");
    const notesDiv = document.getElementById("notes");
    insideNote.innerHTML = `
        <div class="tools">
        <button class="save"><i class="fas fa-check" id="save${l}"></i></button>
        <button class="delete"><i class="fas fa-times"  id="delete${l}"></i></button>
        </div>
        <textarea type="text" id="main${l}" class="text"></textarea>
    `;
    notesDiv.appendChild(insideNote);
}

notes.addEventListener("click", (e) => {
    const fetchId = e.target.getAttribute("id");
    const dbRef = firebase.database().ref("notes/");
    if(fetchId.substring(0,4) == "save"){
        const index = fetchId.substring(4);
        let textareaVal = document.getElementById("main"+index).value;
        dbRef.once("value").then(snapshot => {
            const notes = snapshot.val();
                firebase.database().ref('notes/' + index).set({
                    note: textareaVal
                });
        });
    } else if (fetchId.substring(0,6) == "delete"){
        const index = fetchId.substring(6);
        console.log(index);
        document.getElementById("note"+index).remove();
        dbRef.once("value").then(snapshot => {
            const notes = snapshot.val();
            if(notes[index]!== undefined){
                firebase.database().ref('notes/' + index).remove(); 
            }
        });
    }
});


