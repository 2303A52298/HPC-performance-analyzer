let chart

function runAlgorithm(){

fetch("/run")
.then(response=>response.json())
.then(data=>{

document.getElementById("serial").innerText=data.serial+" sec"
document.getElementById("parallel").innerText=data.parallel+" sec"
document.getElementById("distributed").innerText=data.distributed+" sec"

drawChart(data)

})

}

function drawChart(data){

const ctx=document.getElementById("chart")

if(chart){
chart.destroy()
}

chart=new Chart(ctx,{

type:"bar",

data:{

labels:["Serial","Parallel","Distributed"],

datasets:[{

label:"Execution Time (seconds)",

data:[data.serial,data.parallel,data.distributed]

}]

},

options:{

responsive:true

}

})

}