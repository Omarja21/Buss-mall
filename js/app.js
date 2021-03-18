'use strict';
let productsName=['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck'
  ,'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

let imageSect=document.getElementById('Section');
let rightImage=document.getElementById('rightImage');
let centerImage=document.getElementById('centerImage');
let leftImage=document.getElementById('leftImage');
let paragraph=document.getElementById('results');

function Products(name, imgExt){
  this.name= name;
  this.path=`./img/${name}.${imgExt}`;
  this.view=0;
  this.selected=0;
  Products.all.push(this);
}
Products.all=[];
Products.rounds=25;

for (let i=0; i<productsName.length; i++){
  if (productsName[i] === 'sweep'){
    new Products('sweep', 'png');
  } else if(productsName[i] === 'usb'){
    new Products('usb','gif');
  }
  else{
    new Products(productsName[i], 'jpg');
  }
}



function render(){
  const rightIndex= random(0,Products.all.length-12);
  rightImage.title= Products.all[rightIndex].name;
  rightImage.src=Products.all[rightIndex].path;
  rightImage.alt= Products.all[rightIndex].name;
  Products.all[rightIndex].view++;

  const centerIndex= random(Products.all.length-11,Products.all.length-8);
  centerImage.title= Products.all[centerIndex].name;
  centerImage.src=Products.all[centerIndex].path;
  centerImage.alt= Products.all[centerIndex].name;
  Products.all[centerIndex].view++;

  const leftIndex= random(Products.all.length-7,Products.all.length-1);
  leftImage.title= Products.all[leftIndex].name;
  leftImage.src=Products.all[leftIndex].path;
  leftImage.alt= Products.all[leftIndex].name;
  Products.all[leftIndex].view++;
}

let numberOfClick=25;
imageSect.addEventListener('click', eventHandler);
function eventHandler(event){
  if (event.target.id !== 'Section'){
    numberOfClick--;
    for(let i=0;i< Products.all.length ;i++){
      if(Products.all[i].name===event.target.title){
        Products.all[i].selected++;
      }
    }
    render();
  }
  if(numberOfClick === 0){
    imageSect.removeEventListener('click',eventHandler);
    creatChart();
    saveData();
  }
}

function clickButt(){
  let unorderedList=document.createElement('ul');
  paragraph.appendChild(unorderedList);
  for(let i=0; i<Products.all.length; i++){
    let listedItem=document.createElement('li');
    unorderedList.appendChild(listedItem);
    listedItem.innerHTML='Products name: '+ Products.all[i].name+'</br>'+' products view: '+Products.all[i].view+'</br>'+
    '  products selection: '+Products.all[i].selected;
  }
}
function saveData(){
  let data=JSON.stringify(Products.all);
  localStorage.setItem('test', data);
}
function getItem(){
  let gData=JSON.parse(localStorage.getItem('test'));
  if (gData){
    gData=Products.all;
    clickButt();
  }
}

getItem();

function random(min, max){
  return Math.floor(Math.random()* (max-min+1))+min;
}
function creatChart(){
  let products=[];
  let views=[];
  let selected=[];
  for (let i=0; i<Products.all.length; i++){
    products.push(Products.all[i].name);
  }
  for (let i=0; i<Products.all.length; i++){
    views.push(Products.all[i].view);
  }
  for (let i=0; i<Products.all.length; i++){
    selected.push(Products.all[i].selected);
  }
  let ctx = document.getElementById('myChart').getContext('2d');
  let chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
      datasets: [{
        label: 'Votes',
        data: selected,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(241, 137, 0, 0.801)',
          'rgba(96, 241, 0, 0.801)',
          'rgba(241, 0, 221, 0.801)',
          'rgba(0, 24, 241, 0.801)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(241, 137, 0, 0.801)',
          'rgba(96, 241, 0, 0.801)',
          'rgba(241, 0, 221, 0.801)',
          'rgba(0, 24, 241, 0.801)',
          'rgba(251, 255, 21, 0.932)'
        ]
        // this dataset is drawn below

      }, {
        label: 'Views',
        data: views,
        type: 'bar',
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(241, 137, 0, 0.801)',
          'rgba(96, 241, 0, 0.801)',
          'rgba(241, 0, 221, 0.801)',
          'rgba(0, 24, 241, 0.801)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(241, 137, 0, 0.801)',
          'rgba(96, 241, 0, 0.801)',
          'rgba(241, 0, 221, 0.801)',
          'rgba(0, 24, 241, 0.801)',
          'rgba(251, 255, 21, 0.932)'
        ]
        // this dataset is drawn on top
      }],
      labels: products
    },
    // Configuration options go here
    options: {}
  });
}
render();
