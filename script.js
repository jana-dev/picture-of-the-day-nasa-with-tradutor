//https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY

const inputDate = document.getElementById("date")
const btPesquisar = document.getElementById("pesquisar")
const divResultado = document.querySelector(".resultado")
const apikey = "zQZvBPtCIDKGd0PcqHQUvkZG7mcfvMPdheDjFf1N"
const urlapi = "https://api.nasa.gov/planetary/apod?api_key="

btPesquisar.addEventListener('click', () => {
    const date = inputDate.value
    if (date) {
        buscarDados(date)
    } else {
        alert("Escolha uma data!")
    }
})

async function buscarDados(date) {
    const api = `${urlapi}${apikey}&date=${date}`

    try {
        const response = await fetch(api)

        if(!response.ok){
            throw new Error("Erro, data fora do intervalo")
        }
        
        const data = await response.json()
        resultado(data)
    } catch (error) {
        divResultado.innerHTML = "Insira novamente uma data válida entre 1995 e a data atual."
        console.error("Ocorreu um erro", error.message)
    }
}
function resultado(data) {
    console.log(data)
    const { title, explanation, url, media_type } = data
    divResultado.innerHTML = ""

    //Renderiza conforme o media_type
    if(media_type === "image"){
        return (
            divResultado.innerHTML = `
            <h2>${title}</h2>
            <img src="${url}" alt="Imagem do dia da NASA" />
            <p>${explanation}</p>
        `
        )
    }

    if(media_type === "video"){
        return (
            divResultado.innerHTML = `
            <h2>${title}</h2>
            <iframe src="${url}" frameborder="0" allowfullscreen></iframe>
            <p>${explanation}</p>
        `
        )
    }
}