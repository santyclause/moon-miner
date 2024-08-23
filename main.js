let warpstone = 0;
let currentWarpstone = 0;
let spentWarpstone = 0;

let manualUpgrades = [
  {
    type: 'default',
    rate: 1
  }
]

let helpers = [
  {
    name: 'Lurk',
    type: 'Ratstronaut',
    rate: 1
  }
]


const moonElem = document.getElementById("moon");
moonElem.addEventListener("click", addManualWarpstone);



function addManualWarpstone() {
  let incrAmt = calculateClickRate();
  warpstone += incrAmt;
  calculateCurrentWarpstone();

  drawWarpstone();
}

function addAutoWarpstone() {
  let incrAmt = calculateAutoRate();
  calculateCurrentWarpstone(incrAmt);
  drawWarpstone();
}

function drawWarpstone() {
  const resourceCountElem = document.getElementById('resource');
  const clickGainElem = document.getElementById('click-gain-rate');
  const autoGainElem = document.getElementById('auto-gain-rate');

  resourceCountElem.innerText = currentWarpstone;
  clickGainElem.innerText = calculateClickRate();
  autoGainElem.autoGainElem = calculateAutoRate();
}

function calculateCurrentWarpstone(incrAmt) {
  warpstone += incrAmt;
  currentWarpstone = warpstone - spentWarpstone;
}

function calculateClickRate() {
  let currentRate = 0;
  manualUpgrades.forEach((upgrade) => currentRate += upgrade.rate);

  return currentRate;
}

function calculateAutoRate() {
  let currentRate = 0;
  helpers.forEach((helper) => currentRate += helper.rate);

  return currentRate;
}

function startClock() {
  setInterval(addAutoWarpstone, 3000);
}

// function draw() {
//   drawWarpstone();
// }