let mainChart, metricChart;

async function runTest(){

let size = document.getElementById("size").value;

let res = await fetch("/run",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({size:size})
});

let data = await res.json();

document.getElementById("serial").innerText = data.serial.toFixed(4);
document.getElementById("parallel").innerText = data.parallel.toFixed(4);
document.getElementById("distributed").innerText = data.distributed.toFixed(4);

let speedup = data.serial / data.parallel;
let efficiency = speedup / 4;

document.getElementById("speedup").innerText = speedup.toFixed(2);
document.getElementById("efficiency").innerText = efficiency.toFixed(2);

drawCharts(data, speedup, efficiency);
}

function drawCharts(data, speedup, efficiency){

if(mainChart) mainChart.destroy();
if(metricChart) metricChart.destroy();

mainChart = new Chart(document.getElementById("mainChart"), {
type: "bar",
data: {
labels: ["Serial","Parallel","Distributed"],
datasets: [{
label: "Execution Time (s)",
data: [data.serial, data.parallel, data.distributed]
}]
}
});

metricChart = new Chart(document.getElementById("metricChart"), {
type: "line",
data: {
labels: ["Speedup","Efficiency"],
datasets: [{
label: "Performance",
data: [speedup, efficiency]
}]
}
});
}