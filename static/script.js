async function runTest(){

let size = document.getElementById("size").value;

let res = await fetch("/run",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
size:size
})

});

let data = await res.json();

let ctx=document.getElementById("chart");

new Chart(ctx,{

type:"bar",

data:{

labels:["Serial","Parallel","Distributed"],

datasets:[{

label:"Execution Time (seconds)",

data:[data.serial,data.parallel,data.distributed]

}]

}

});

}