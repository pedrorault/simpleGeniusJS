function newParagraph(someString){
    p = document.createElement("p")
    p.textContent = someString || "Parâmetro vazio, para"
    return p
}
function chooseColor(list){
    let colors = ["green","red","yellow","blue"]
    let randomColor = colors[Math.floor(Math.random() * colors.length)]
    let currentList = list || []
    currentList.push(randomColor)
    return currentList
}

function onLoad(){  
    let svgObj = document.getElementById("svg").contentDocument;
    let colorMap = new Map()
    colorMap.set("green" , "lightgreen")
    colorMap.set("red" , "lightcoral")
    colorMap.set("yellow" , "Khaki") 
    colorMap.set("blue" , "lightblue")

    for (let [key,value] of colorMap){
        let obj = svgObj.getElementById(key)
        obj.style.fill = key
        obj.addEventListener("mouseover", () => obj.style.fill = value)
        obj.addEventListener("mouseout", () => obj.style.fill = key)
    }   

}