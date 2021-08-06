const input = document.querySelector("input");
const textarea = document.getElementById("textarea");
let button = document.querySelector(".add_button");
let inputElement = document.getElementById("title");
let saveData = document.createElement("button");
const searchBar = document.getElementById("searchBar");
const ShowNotes = document.getElementById("showcard")
let arr = [];

button.addEventListener("click", Note);
searchBar.addEventListener('keyup',(e)=>{
    
   let dataList = JSON.parse(localStorage.getItem("data"));
   console.log("data before",dataList)

    let result= dataList.filter((el)=>{
        return el.title.toLowerCase().includes(e.target.value.toLowerCase())
    })
    CommonComponent(result)
    arr=result;
    console.log("data after",result)
  
})
function Note() {
  let inputtitle = document.getElementById("title").value.trim();
  let textvalue = document.getElementById("textarea").value.trim();
  console.log("input title", inputtitle, "text", textvalue);

  if (!inputtitle || !textvalue) {
    return;
  }
  let obj = {
    title: inputtitle,
    textvalue: textvalue,
  };
  if (localStorage.getItem("data") == null) {
    localStorage.setItem("data", "[]");
  }
  var old_data = JSON.parse(localStorage.getItem("data"));
  old_data.push(obj);
  console.log("old_dat", old_data);

  localStorage.setItem("data", JSON.stringify(old_data));
  let dataList = JSON.parse(localStorage.getItem("data"));
  CommonComponent(dataList)
  // console.log("data after set", localStorage.getItem("data"));
  // addOne(obj)
}

const deleteNote=(index)=>{
 arr.splice(index,1)
 localStorage.setItem("data",JSON.stringify(arr))
let dataList = JSON.parse(localStorage.getItem("data"));
CommonComponent(dataList)

}

const CommonComponent=(dataList)=> {
    let mapData=dataList
    const htmlString = dataList.map((ele,index)=>{
        return`
         <div id= ${ele}+${index} class="note">
            <h1>${ele.title}</h1>
            <p>${ele.textvalue}</p>
            <button onclick="deleteNote(${index})" class="delete">Delete</button>
         </div>
        `;
    }).join("");
    ShowNotes.innerHTML=htmlString
}

function getListofItem() {
  let dataList = JSON.parse(localStorage.getItem("data"));
  arr=dataList
  CommonComponent(dataList)
}
getListofItem();

input.addEventListener("change", updateValue);

textarea.addEventListener("input", (e) => {
  localStorage.setItem("textvalue", e.target.value);
});
function updateValue(e) {
  localStorage.setItem("title", e.target.value);
}
