# Shelf Simulator

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.7.

## Overview

Shelf Simulator '99 is a simple, light-hearted app that allows users to place objects on a shelf.
I wanted to make something that would allow me to practice JS DOM manipulation, while also reminiscant 
of the internet of yesteryear. It is purposfully minimally styled to look like a website from the '90s.
I also hope that people will make memes or backgrounds using this app. 

## Notable Functions

- dragElement(elmnt) - This functinon provides the functionallity for dragging the images around the screen.
						This code is from w3school and I adapted it to work for my needs.
						
- onSelectFile(event) - This function allows users to add their own images to the page. It creates a new 
						instance of FileReader() and sets the needed attributes as well as styling that is
						needed for desired functionality.
						
		- addImgtoSelect() - This adds images to the array that allows them to be individually selected.
		
		- styleImages() - This adds the needed style attributes to the images so they functin as desired.
		
		- dragElemLoop() - This loops over the imgs and initiating their ability to be dragged.
		
- removeImg() - Mechanism that actually remove img from DOM. returns value of selected img.
		
- removeImgCheckForNone() - Checks for none when removing an img, preventing an error.

- removeFromSelect() - Removes the value from the select input that was associated with the removed img.

- highlightSelectedImg2() - Highlights the selected img in the dropdown. Gives visual cue to users as 
							to which img is being selected. It also removes highlight from img's as well.
							
- selectedImg - Returns selected img. Used with functions that manipulate selected img.

- rotateCheckForNone - checks to make sure none is not selected, causing error when rotating.

- rotateImg(img) - rotates image based on selected value.

- initMessage(message, action) - uses Angular Material snackbar to show message to user on Init. 

- setUpDrag() - used on init to set up drag for pre loaded imgs.

- hideOnInit() - hides preloaded imgs on Init. This allows users to toggle in/out the imgs they want.

- createImgLoop() - creates imgs and appends to

- toggleImg(id) - toggles images in and out based on the their id.

- toggleControls() - hides control panel so user can doesnt have to have it on their view.

- paintWall() - allows user to change background color "painting the wall" behind the shelf.
							

