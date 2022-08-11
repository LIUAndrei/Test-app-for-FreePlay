'use strict'

// positions object

const state = {
  vehicleXPos: 200,
  vehicleYPos: 200,
  vehicleOrientation: 0,
  vehicleAcceleration: 0,
  vehicleDeceleration: 0,
  gotoX: 0,
  gotoY: 0,
  distanceHypotenuse: 0,
  // speed is in seconds
  speed: 0,
  vehicleAngle: 0,
}

// SELECTORS

// selecting coordinate lines and staging field from DOM
const coordlineX = document.querySelector('.coordline__x')
const coordlineY = document.querySelector('.coordline__y')
const coordlinesContainer = document.querySelector('.coordlines-container')

//selecting destination circle
const destinationDot = document.querySelector('.destination')

// selecting GO button
const goButton = document.querySelector('.go-button')
const speedForm = document.querySelector('.tweakers__speed')

// selecting coordinates' display spans
const vehicleXSpan = document.querySelector('.vehicleX__span')
const vehicleYSpan = document.querySelector('.vehicleY__span')
const mouseXSpan = document.querySelector('.mouseX__span')
const mouseYSpan = document.querySelector('.mouseY__span')
const gotoXSpan = document.querySelector('.point-toX__span')
const gotoYSpan = document.querySelector('.point-toY__span')
const angleSpan = document.querySelector('.vehicle-angle__span')
const travelDistanceSpan = document.querySelector('.travel-distance__span')
const travelTimeSpan = document.querySelector('.time-speed__span')

// selecting vehicle
const vehicle = document.querySelector('.vehicle')

// function to rotate the vehicle

const calcAngle = function (state) {
  let horizontalOffset = state.gotoX - state.vehicleXPos
  let verticalOffset = state.gotoY - state.vehicleYPos
  state.distanceHypotenuse = +Math.sqrt(
    horizontalOffset ** 2 + verticalOffset ** 2
  ).toFixed(1)
  let targetEastOfVehicle = false
  if (horizontalOffset >= 0) {
    targetEastOfVehicle = true
  }

  // following angle is between the horizontal plane and the hypotenuse against the vertical offset. Calculated in degrees to make simpler
  let triangleAlphaAngle =
    (Math.atan(verticalOffset / horizontalOffset) * 180) / Math.PI
  let rotationAngle = triangleAlphaAngle
  if (targetEastOfVehicle) {
    rotationAngle = rotationAngle + 90
  } else {
    rotationAngle = rotationAngle + 270
  }
  state.vehicleAngle = rotationAngle
}

// function rotates vehicle div to angle
const rotateVehicle = function (state) {
  vehicle.classList.add('vehicle-in-motion')
  document.querySelector(
    '.vehicle-in-motion'
  ).style.transitionDuration = `${state.speed}s`
  vehicle.style.transform = `rotate(${+state.vehicleAngle.toFixed(
    1
  )}deg) translate(-50%, -50%)`
  vehicle.addEventListener('transitionend', (evt) => {
    vehicle.classList.remove('vehicle-in-motion')

    moveVehicle()
  })
}

// function moves vehicle to destination
const moveVehicle = function (evt) {
  vehicle.classList.add('vehicle-in-motion')
  document.querySelector(
    '.vehicle-in-motion'
  ).style.transitionDuration = `${state.speed}s`
  vehicle.style.top = `${state.gotoY}px`
  vehicle.style.left = `${state.gotoX}px`
  state.vehicleXPos = state.gotoX
  state.vehicleYPos = state.gotoY
  vehicle.addEventListener('transitionend', (evt) => {
    vehicle.classList.remove('vehicle-in-motion')
    destinationDot.classList.add('invisible')
  })
}

// making coordinate lines move with the mouse
coordlinesContainer.addEventListener('mousemove', (evt) => {
  coordlineX.style.top = `${evt.layerY}px`
  coordlineY.style.left = `${evt.layerX}px`
  mouseXSpan.textContent = `${evt.layerX}px`
  mouseYSpan.textContent = `${evt.layerY}px`
})

// listen to click on the staging area
coordlinesContainer.addEventListener('click', (evt) => {
  console.log(evt)
  state.gotoX = evt.layerX
  state.gotoY = evt.layerY
  gotoXSpan.textContent = `${state.gotoX}px`
  gotoYSpan.textContent = `${state.gotoY}px`
  destinationDot.style.left = `${state.gotoX}px`
  destinationDot.style.top = `${state.gotoY}px`
  destinationDot.classList.remove('invisible')
  calcAngle(state)
  angleSpan.textContent = `${+state.vehicleAngle.toFixed(1)}degrees`
  travelDistanceSpan.textContent = `${state.distanceHypotenuse}px`
})

// listen to GO button click
goButton.addEventListener('click', function (evt) {
  state.speed = state.distanceHypotenuse / speedForm.value
  travelTimeSpan.textContent = `${state.speed}sec`
  rotateVehicle(state)
})
