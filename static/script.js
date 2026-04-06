let mainChart, metricChart;

async function runTest(){

let size = document.getElementById("size").value;

if(!size){
alert("Enter data size");
return;
}

if(size > 5000){
alert("Use size below 5000");
return;
}

document.getElementById("loader").style.display = "block";

try{

let res = await fetch("/run",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({size:size})
});

let data = await res.json();

document.getElementById("loader").style.display = "none";

document.getElementById("serial").innerText = data.serial.toFixed(4);
document.getElementById("parallel").innerText = data.parallel.toFixed(4);
document.getElementById("distributed").innerText = data.distributed.toFixed(4);

let speedup = data.serial / data.parallel;
let efficiency = speedup / 4;

document.getElementById("speedup").innerText = speedup.toFixed(2);
document.getElementById("efficiency").innerText = efficiency.toFixed(2);

drawCharts(data, speedup, efficiency);

}catch(err){
console.error(err);
alert("Error");
document.getElementById("loader").style.display = "none";
}

}

function drawCharts(data, speedup, efficiency){

if(mainChart) mainChart.destroy();
if(metricChart) metricChart.destroy();

mainChart = new Chart(document.getElementById("mainChart"), {
type: "bar",
data: {
labels: ["Serial","Parallel","Distributed"],
datasets: [{
label: "Execution Time",
data: [data.serial, data.parallel, data.distributed]
}]
}
});

metricChart = new Chart(document.getElementById("metricChart"), {
type: "line",
data: {
labels: ["Speedup","Efficiency"],
datasets: [{
label: "Metrics",
data: [speedup, efficiency]
}]
}
});
}