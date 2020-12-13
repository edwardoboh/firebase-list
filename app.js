const ul = document.querySelector('#cafe-list')
const form = document.querySelector("#add-cafe-form")

//
function renderData(doc){

    let li = document.createElement("li")
    let name = document.createElement("span")
    let city = document.createElement("span")
    
    li.setAttribute("data-id", doc.id)
    name.textContent = doc.data().name
    city.textContent = doc.data().city

    li.appendChild(name)
    li.appendChild(city)
    ul.appendChild(li)
    
}

// 
async function getData() {
    const data = await db.collection("cafes").get()
    data.forEach(doc => {
        // console.log(doc.data())
        renderData(doc)
    });
}

// 
function handleForm() {
    form.addEventListener("submit", (event) => {
        event.preventDefault()
        db.collection("cafes").add({
            name: form.name.value,
            city: form.city.value
        })
        .then(() => {
            console.log("Data successfully added to firestore")
            form.name.value = ""
            form.city.value = ""
        })
        .catch((err) => console.log("Unable to add data to firestore", err))
    })
}

getData()
handleForm()

