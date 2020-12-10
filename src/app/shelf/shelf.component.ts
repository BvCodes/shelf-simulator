import { Component, OnInit } from '@angular/core';
import { Button } from 'protractor';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-shelf',
  templateUrl: './shelf.component.html',
  styleUrls: ['./shelf.component.scss']
})
export class ShelfComponent implements OnInit {

  url:any = "";

  urls:any = [];

  colorValue:any;

  message: string = "Screan grab your shelf and tag or DM @shelf_dujour on Insta. We will choose a favorite shelf everyday. Good Luck."
  action: string = "close"
  

  customPhotoCount:number = 0; 

  imgsInSelect = [];


  constructor(private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.setUpDrag();
    this.hideOnInit();
    this.initMessage(this.message, this.action);
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.url = event.target.result;
        var parent = document.getElementById("parentForImg");
        var img = document.createElement("IMG");
        img.setAttribute("src", this.url);
        img.setAttribute("class", "dragImg");
        img.setAttribute("id", this.customPhotoCount.toString());
        this.addImgtoSelect();
        parent.appendChild(img);
        this.styleImages();
        this.dragElemLoop();
      }
   
     
    }
  }


  addImgtoSelect() {
    var select = document.getElementById("imgSelect");
    var option = document.createElement("option");
    option.text = "img " + this.customPhotoCount.toString();
    option.value = this.customPhotoCount.toString();
    select.appendChild(option);
    this.customPhotoCount += 1;
  }

  removeImgCheckForNone() {
    if (document.querySelector<HTMLInputElement>("#imgSelect").value != "none") {
      this.removeFromSelect(this.removeImg());
    } else {
      console.log("none was selected");
    }
  }

  removeImg() {
    var selectValue = document.querySelector<HTMLInputElement>("#imgSelect").value;
    //console.log(selectValue)
    var imgToRemove = document.getElementById(selectValue);
    //console.log(imgToRemove)
    //var numberToReturn: number = parseInt(selectValue);
    var numberToReturn= selectValue;
    //console.log(numberToReturn)
    imgToRemove.remove();
    
    return selectValue;

  }

  
  removeFromSelect(selectValue) {
    var imgSelect = document.querySelector<HTMLSelectElement>("#imgSelect");
    var i;
    for (i = 0; i < imgSelect.options.length; i++) {
      if (imgSelect.options[i].value == selectValue) {
        imgSelect.options[i] = null;
      }
    } 
  }

  highlightSelectedImg2() {
    //if (document.querySelector<HTMLInputElement>("#imgSelect").value == "none") {
    var selectValue = document.querySelector<HTMLInputElement>("#imgSelect").value;
    var imgToHighlight = document.getElementById(selectValue);
    var dragImgCollection = document.querySelectorAll<HTMLElement>(".dragImg");
    var i;
    if (document.querySelector<HTMLInputElement>("#imgSelect").value == "none") {
      for (i = 0; i < dragImgCollection.length; i++) {
        dragImgCollection[i].style.border = "none"
      }
  } else {
    for (i = 0; i < dragImgCollection.length; i++) {
      if (dragImgCollection[i].style.border != "none") {
        dragImgCollection[i].style.border = "none"
      }
    }
    imgToHighlight.style.border = "5px solid red";
    //document.getElementById
  }
  }


  selectedImg() {
    var selectValue = document.querySelector<HTMLInputElement>("#imgSelect").value;
    var selectedImg = document.querySelector<HTMLElement>("#\\3" + selectValue);
    return selectedImg;
  }

  rotateCheckForNone() {
    if (document.querySelector<HTMLInputElement>("#imgSelect").value != "none") {
      this.rotateImg(this.selectedImg());
    } else {
      console.log("none selected")
    }
  }
  

  rotateImg(img) {
    var degrees = document.querySelector<HTMLInputElement>("#rotateImgSelect").value;
    var selectedImg = img;
    selectedImg.style.transform = "rotate(" + degrees + "deg)";
  }



  initMessage(message, action) {
    this._snackBar.open(message, action, {
      duration: 10000,
      verticalPosition: "top",
    });
  }

  setUpDrag() {
    this.dragElement(document.getElementsByTagName("img"));

    this.dragElement(document.getElementById("chumbaImg"));
    this.dragElement(document.getElementById("dkcImg"));
    this.dragElement(document.getElementById("gbImg"));
    this.dragElement(document.getElementById("pikaImg"));
    this.dragElement(document.getElementById("pogImg"));
    this.dragElement(document.getElementById("smithersImg"));
  }

  hideOnInit() {
    document.querySelector<HTMLElement>("#chumbaImg").style.display = "none";
    document.querySelector<HTMLElement>("#dkcImg").style.display = "none";
    document.querySelector<HTMLElement>("#gbImg").style.display = "none";
    document.querySelector<HTMLElement>("#pikaImg").style.display = "none";
    document.querySelector<HTMLElement>("#pogImg").style.display = "none";
    document.querySelector<HTMLElement>("#smithersImg").style.display = "none";
  }


  styleImages() {
     
    var imgs = document.querySelectorAll<HTMLElement>(".dragImg");
    var i;
    for (i=0; i < imgs.length; i ++) {
      imgs[i].style.position = "absolute";
      imgs[i].style.cursor = "move";
      imgs[i].style.zIndex = "7";
    }
  }

  dragElemLoop() {
    var imgs = document.querySelectorAll<HTMLElement>(".dragImg");
    var i;
    for (i=0; i < imgs.length; i ++) {
      this.dragElement(imgs[i]);
    }
  }

  onSelectLooping(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      var i;
      for (i = 0; i < event.target.files.length; i++ ) {
        
        reader.readAsDataURL(event.target.files[i]);
        reader.onload = (event) => {
          this.urls[i] = event.target.result;
          this.createImgLoop();
          
        }
      
      }
      
    }

  }

  createImgLoop() {
    var i;
    for (i=0; i < this.urls.length; i++) {
      var img = document.createElement("IMG");
      img.setAttribute("src", this.urls[i]);
      img.setAttribute("class", "dragImg")
      document.body.appendChild(img);
      
    }
  }

  dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
      // if present, the header is where you move the DIV from:
      document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      elmnt.onmousedown = dragMouseDown;
    }
  
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  
    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }


  dragElementbyClass(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    elmnt.onmousedown = dragMouseDown;
    
  
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  
    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }


  toggleImg(id) {
    const img = document.querySelector<HTMLElement>(id);
    
    if (img.style.display == "none") {
      img.style.display = "block";
    } else {
      img.style.display = "none";
    }
  }




  toggleControls() {
    const contr = document.querySelector<HTMLElement>("#controlPanel");
    const butt = document.querySelector<HTMLElement>("#hidePanel");

    if (contr.style.display == "none") {
      contr.style.display = "block";
      butt.innerHTML = "hide controls"
    } else {
      contr.style.display = "none";
      butt.innerHTML = "show controls";
    }
  }

  paintWall() {
    const wall = document.querySelector<HTMLElement>("#wrapper");
    const placeHolder = document.querySelector<HTMLElement>("#placeHolder");
    const input = (<HTMLInputElement>document.getElementById("wallColor"));
    var color = input.value;
    console.log(color);

    wall.style.backgroundColor = color;
    placeHolder.style.backgroundColor = color;
  }

}




