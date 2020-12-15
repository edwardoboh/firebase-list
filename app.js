const ul = document.querySelector('#cafe-list')
const form = document.querySelector("#add-cafe-form")

//
function renderData(doc){

    let li = document.createElement("li")
    let name = document.createElement("span")
    let city = document.createElement("span")
    let del = document.createElement("div")
    
    li.setAttribute("data-id", doc.id)
    name.textContent = doc.data().name
    city.textContent = doc.data().city
    del.textContent = "X"

    li.appendChild(name)
    li.appendChild(city)
    li.appendChild(del)
    ul.appendChild(li)

    del.addEventListener("click", (e) => {
        e.stopPropagation()
        let id  = e.target.parentElement.getAttribute("data-id")
        db.collection("cafes").doc(id).delete()
        console.log(`Document with id: ${id} has been deleted`)
    })
    
}

// 
async function getData() {
    // const data = await db.collection("cafes").get()
    // data.forEach(doc => {
    //     // console.log(doc.data())
    //     renderData(doc)
    // });

    const data = db.collection("cafes").orderBy("city").onSnapshot((snapshot) => {
        const allShots = snapshot.docChanges()
        allShots.forEach((shot) => {
            // console.log(snapshot)
            // console.log(allShots)
            console.log(shot)
            if(shot.type == "added"){
                renderData(shot.doc)
            }
            else if(shot.type == "removed"){
                console.log(ul)
                // console.log(shot.doc.id)
                let li = ul.querySelector(`li[data-id = ${shot.doc.id}]`)
                ul.removeChild(li)
            }
        })
    })
}

// 
function handleForm() {
    form.addEventListener("submit", (event) => {
        event.preventDefault()
        let name = form.name.value
        let city = form.city.value
        form.name.value = ""
        form.city.value = ""
        db.collection("cafes").add({
            name: name,
            city: city
        })
        .then(() => {
            console.log("Data successfully added to firestore")
        })
        .catch((err) => console.log("Unable to add data to firestore", err))
    })
}


getData()
handleForm()

