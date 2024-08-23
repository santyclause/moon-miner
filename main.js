let warpstone = 0;
let currentWarpstone = 0;
let spentWarpstone = 0;
let clockStarted = false;

const manualUpgradeOptions = [
  {
    type: 'default',
    price: 0,
    rate: 1,
    qty: 1
  },
  {
    type: 'pickaxe',
    price: 50,
    rate: 1,
    qty: 0
  },
  {
    type: 'drill',
    price: 500,
    rate: 10,
    qty: 0
  }
]

const autoUpgradeOptions = [
  {
    type: 'ratstronaut',
    price: 1000,
    rate: 13,
    qty: 0
  },
  {
    type: 'colony',
    price: 50000,
    rate: 130,
    qty: 0
  }
]

const currentHelpers = [
  {
    name: 'Lurk',
    top: 50,
    left: 50,
    rotation: 0
  }
]

// SECTION Event Listeners
const moonElem = document.getElementById("moon");
moonElem.addEventListener("click", addManualWarpstone);

const pickaxeElem = document.getElementById("pickaxe-btn");
pickaxeElem.addEventListener("click", () => buyItem('pickaxe', 'manual'));

const drillElem = document.getElementById("drill-btn");
drillElem.addEventListener("click", () => buyItem('drill', 'manual'));

const ratstronautElem = document.getElementById("ratstronaut-btn");
ratstronautElem.addEventListener("click", () => buyItem('ratstronaut', 'auto'));

const colonyElem = document.getElementById("colony-btn");
colonyElem.addEventListener("click", () => buyItem('colony', 'auto'));
// !SECTION


function addManualWarpstone() {
  let incrAmt = calculateClickRate();
  calculateCurrentWarpstone(incrAmt);
  drawWarpstone();
}

function addAutoWarpstone() {
  let incrAmt = calculateAutoRate();
  calculateCurrentWarpstone(incrAmt);
  drawWarpstone();
}

function buyItem(type, category) {
  let selectedItem;

  if (category == 'auto') {
    selectedItem = autoUpgradeOptions.find((upgrade) => upgrade.type == type);
    startClock();
  } else {
    selectedItem = manualUpgradeOptions.find((upgrade) => upgrade.type == type);
  }

  if (currentWarpstone >= selectedItem.price) {
    spentWarpstone += selectedItem.price;
    selectedItem.qty++;
  }

  calculateCurrentWarpstone(0);
  drawWarpstone();
  drawStats()
}


function calculateCurrentWarpstone(incrAmt) {
  warpstone += incrAmt;
  currentWarpstone = warpstone - spentWarpstone;
}

function calculateClickRate() {
  let currentRate = 0;
  manualUpgradeOptions.forEach((upgrade) => currentRate += (upgrade.rate * upgrade.qty));

  return currentRate;
}

function calculateAutoRate() {
  let currentRate = 0;
  autoUpgradeOptions.forEach((upgrade) => currentRate += (upgrade.rate * upgrade.qty));

  return currentRate;
}

function generateHelper() {

}

function drawWarpstone() {
  const resourceCountElem = document.getElementById('resource');
  const clickGainElem = document.getElementById('click-gain-rate');
  const autoGainElem = document.getElementById('auto-gain-rate');

  resourceCountElem.innerText = currentWarpstone;
  clickGainElem.innerText = calculateClickRate();
  autoGainElem.innerText = calculateAutoRate();
}
// TODO draw stats
function drawStats() {
  let qtyElem;
  let rateElem;

  manualUpgradeOptions.forEach((upgrade) => {
    qtyElem = document.getElementById(`qty-${upgrade.type}`);
    rateElem = document.getElementById(`rate-${upgrade.type}`);

    if (qtyElem != null) {
      qtyElem.innerText = upgrade.qty;
      rateElem.innerText = upgrade.qty * upgrade.rate;
    }
  });

  autoUpgradeOptions.forEach((upgrade) => {
    qtyElem = document.getElementById(`qty-${upgrade.type}`);
    rateElem = document.getElementById(`rate-${upgrade.type}`);

    if (qtyElem != null) {
      qtyElem.innerText = upgrade.qty;
      rateElem.innerText = upgrade.qty * upgrade.rate;
    }
  })
}
// TODO draw helpers
function drawHelpers() {

}

function startClock() {
  if (clockStarted) {
    return
  }
  setInterval(addAutoWarpstone, 3000);
  clockStarted = true;
}

// function draw() {
//   drawWarpstone();
// }