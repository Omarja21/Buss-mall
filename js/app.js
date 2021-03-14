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
render();
let numberOfClick=0;
imageSect.addEventListener('click', function(event){
  if(numberOfClick< Products.rounds){
    if (event.target.id !== 'Section'){
      for(let i=0;i< Products.all.length ;i++){
        if(Products.all[i].name===event.target.title){
          Products.all[i].selected++;
        }
      }
      render();
    }
    numberOfClick++;
  }
});
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




function random(min, max){
  return Math.floor(Math.random()* (max-min+1))+min;
}
