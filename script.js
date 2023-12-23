var xValues = [100,200,300,400,500,600,700,800,900,1000];
var y1=[860,1140,1060,1060,1070,1110,1330,2210,7830,2478];
var y2=[1600,1700,1700,1900,2000,2700,4000,5000,6000,7000];
var y3=[300,700,2000,5000,6000,4000,2000,1000,200,100];

const xBar = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
var yBar = [55, 49, 44, 24, 15];
const barColors = ["red", "green","blue","orange","brown"];

var avgchart =new Chart("avg", {
  type: "bar",
  data: {
    labels: xBar,
    datasets: [{
      backgroundColor: barColors,
      data: yBar
    }]
  },
  options: {
    legend: {display: false},
    title: {
      display: true,
      text: "Week 1"
    }
  }
});

var curchart =new Chart("current", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{ 
      data:y1 ,
      borderColor: "red",
      fill: false
    }, { 
      data: y2,
      borderColor: "green",
      fill: false
    }, { 
      data: y3,
      borderColor: "blue",
      fill: false
    }]
  },
  options: {
    legend: {display: false}
  }
});

function weekReport(){
  var x = document.getElementById("week");
  var text = "";
  var i;
  for (i = 0; i < x.length ;i++) {
    text += x.elements[i].value ;
  }
console.log(text)
const url='https://flask-temp.pradhyumnas.repl.co/week/'+text
  const xhttpr = new XMLHttpRequest();
  xhttpr.open('GET', url, true);

  xhttpr.send();

  xhttpr.onload = ()=> {
  if (xhttpr.status === 200) {
    const response = JSON.parse(xhttpr.response);
    // Process the response data here

    d1=Number(response['d1'])
    d2=Number(response['d2'])
    d3=Number(response['d3'])
    d4=Number(response['d4'])
    d5=Number(response['d5'])
    console.log(response)
    avgchart.data.datasets[0].data=new Array(d1,d2,d3,d4,d5);
    avgchart.options.title.text=text
    avgchart.update()
  } else {
    // Handle error
  }
  };
}
function weekFxn() {
  
}
function myFunction() {
  const xhttpr = new XMLHttpRequest();
  xhttpr.open('GET', 'https://flask-temp.pradhyumnas.repl.co/10', true);

  xhttpr.send();

  xhttpr.onload = ()=> {
  if (xhttpr.status === 200) {
    const response = JSON.parse(xhttpr.response);
    // Process the response data here

    d1=Number(response['data1'])
    d2=Number(response['data2'])
    d3=Number(response['data3'])
    d4=Number(response['data4'])

    console.log(response)
    y1.push(d1);
    y1.shift();
    curchart.data.datasets[0].data=y1;
    y2.push(d2);
    y2.shift();
    curchart.data.datasets[1].data=y2;
    y3.push(d3);
    y3.shift()
    curchart.data.datasets[2].data=y3;
    curchart.update()


    //
    console.log(response)
 
  } else {
    // Handle error
  }
  };
}
setInterval(myFunction, 10000);