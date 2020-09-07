function hi(){
    console.log("Hi")    
}

function newParagraph(someString){
    p = document.createElement("p")
    p.textContent = someString || "Parâmetro vazio, para"
    return p
}

function createSVG(){
    var svg = document.createElementNS("http://www.w3.org/2000/svg","svg")
    return svg

}
function onLoad(){        
    // document.body.appendChild(createSVG())
    let c = document.getElementById("svg")
}