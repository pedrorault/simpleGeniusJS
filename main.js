let gameStart = false
let playerTurn = false
let listColors = null
let listCurrentColors = null

function chooseColor(list){
    let colors = Array.from(getColorMap().keys())
    let randomColor = colors[Math.floor(Math.random() * colors.length)]
    let currentList = list || []
    currentList.push(randomColor)
    return currentList
}
function getSvg(){
    return document.getElementById("svg").contentDocument
}
function getColorMap(){
    let colorMap = new Map()
    colorMap.set("green" , "lightgreen")
    colorMap.set("red" , "lightcoral")
    colorMap.set("yellow" , "Khaki") 
    colorMap.set("blue" , "lightblue")
    return colorMap
}
function onLoad(){
    Array.from(getColorMap().keys()).map(cor => createjs.Sound.registerSound(`audio/${cor}.wav`, cor))
    
    let svgObj = getSvg()
    let colorMap = getColorMap()

    for (let [key,value] of colorMap){
        let obj = svgObj.getElementById(key)
        obj.style.fill = key
        obj.addEventListener("mouseover", () => obj.style.fill = value)
        obj.addEventListener("mouseout", () => obj.style.fill = key)
        obj.addEventListener("click", () => {
            if(!gameStart){
                activateColor(key)
            }else{
                checkColor(key)
            }            
        })
    } 
    svgObj.getElementById("center").addEventListener("click", () => startGame())  
}
function checkColor(color){
    if(playerTurn){
        if(listCurrentColors[0] != color){
            window.alert("Errou!")
            playerTurn = false
            gameStart = false
            listColors = null
        }else{
            activateColor(color)
            listCurrentColors.splice(0,1)
            if(listCurrentColors.length == 0){
                playerTurn = false
                setTimeout(() => newRound(),1000)
            }
        }
    }
}
function activateColor(nameColor, timeBeforeActivation  ){
    timeBeforeActivation = timeBeforeActivation || 0
    let colorMap = getColorMap()
    let svgObj = getSvg()
    let color = svgObj.getElementById(nameColor)

    setTimeout(() => {
        color.style.fill = colorMap.get(nameColor)
        createjs.Sound.play(nameColor);      
    }, 300*timeBeforeActivation)

    setTimeout(() => color.style.fill = nameColor, 300*(timeBeforeActivation+1))
}
function updateMax(newMax){
    max = document.getElementById("max")
    old = max.textContent
    max.textContent = (newMax >= old) ? newMax : old
}
function newRound(){
    listColors = chooseColor(listColors)
    updateMax(listColors.length)
    listCurrentColors = listColors.slice()
    listColors.forEach( (cor,index) => activateColor(cor,index))
    playerTurn = true
}
function startGame(){
    if(!gameStart){
        gameStart = true       
        listColors = chooseColor(listColors)  
        newRound()  
    }
}