const API = 'https://valuevaultx.com/_functions/api/Import281';
const FILTERNAME = 'category';
const ITEMNAME = 'title';
const ITEMIMAGE = 'imageLink';
const SUBTITLE = 'category';
const VALUE = 'valueWithoutCommas';

let filterTradeCalculator71 = 'All';
let buttonHTML = ``;
let offerTypeTradeCalculator71;

function closePopupTradeCalculator71() {
  const background = document.querySelector('.background-tint-trade-calculator71');
  background.innerHTML = '';
  background.classList.remove('background-tint-trade-calculator71-additive');
}

function openPopupTradeCalculator71() {
   previeousFilterModeTradeCalculator71 = '';
   searchBarValueTradeCalculator71 = '';
   filterModeTradeCalculator71 = 'All';
  const background = document.querySelector('.background-tint-trade-calculator71');
  background.innerHTML = `
    <div class="popup-trade-calculator-71">
      <div class="searchbar-area-trade-calculator71">
        <input onkeyup="searchBarValueTradeCalculator71 = document.querySelector('.search-bar-trade-calculator71').value; sortByTradeCalculator71(searchBarValueTradeCalculator71, filterModeTradeCalculator71)" class="search-bar-trade-calculator71" type="text" placeholder="Search">
        <img onclick="closePopupTradeCalculator71()" class="close-icon-trade-calculator71" src="close-trade-calculator71.svg">
        <img class="search-icon-trade-calculator71" src="search-trade-calculator71.svg">
      </div>
      <div class="filter-content-area-trade-calculator71">
        <div class="filters-trade-calculator71">
          <p class="text-trade-calculator71"><img src="filter-trade-calculator71.svg" class="filter-icon-trade-calculator71">Filter by:</p>
          <button onclick="sortByTradeCalculator71(searchBarValueTradeCalculator71, 'All')" class="filter-button-trade-calculator71 all-button-trade-calculator71 selected-filter-button-trade-calculator71">ALL</button>
          ${buttonHTML}
        </div>
        <div id="results" class="results-trade-calculator71">
        </div>
      </div>
    </div>
  `;
  background.classList.add('background-tint-trade-calculator71-additive');
  sortByTradeCalculator71('', filterTradeCalculator71);
}

let previeousFilterModeTradeCalculator71 = '';
let searchBarValueTradeCalculator71 = '';
let filterModeTradeCalculator71 = 'All';
let dataSaveTradeCalculator71;

fetch(API)
  .then(res => res.json())
  .then(data => {
    dataSaveTradeCalculator71 = data;
    deleteUnwantedData();
    try {
      createButtons();
    } catch (error) {
      console.error('No Categories Defined')
    }
  })
  .catch(error => console.error('Fetch error:', error));

function createButtons() {
  let categories = [];
  dataSaveTradeCalculator71.forEach((item) => {
    try {
      if (!categories.includes(item[FILTERNAME]) && item[FILTERNAME].length > 1) {
        categories.push(item[FILTERNAME]);
      }
    } catch (error) {}
  })

  categories.forEach((item) => {
    buttonHTML += `
      <button onclick="sortByTradeCalculator71(searchBarValueTradeCalculator71, '${item}')" class="filter-button-trade-calculator71 ${item.changeToClass()}-button-trade-calculator71">${item.toUpperCase()}</button>
    `
  })
  console.log(buttonHTML);
}

function deleteUnwantedData() {
  let unwantedItems = [];
  let deletedItems = 0;
  dataSaveTradeCalculator71.forEach((item, index) => {
    if (!item[ITEMNAME]) {
      unwantedItems.push(index);
    }
  })
  unwantedItems.forEach((item) => {
    dataSaveTradeCalculator71.splice(item - deletedItems, 1);
    deletedItems++;
  })
}

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ' ', '&'];
const writtenNumbers = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', '-', 'and']

String.prototype.changeToClass = function() {
  let originalString = this.toLowerCase();
  numbers.forEach((item, index) => {
    if (originalString.includes(item)) {
      originalString = originalString.replaceAll(item, writtenNumbers[index]);
    }
  })
  return originalString;
};

const lazyLoadAmount = 50;
const scrollSectionPX = 1500;
let results;
let itemsLoaded = 0;
let amountOfItemsAllowed = lazyLoadAmount;
let latestIndex = -1;

const resultsFunction = () => {
  amountOfItemsAllowed = (Math.floor(results.scrollTop / scrollSectionPX) + 1) * lazyLoadAmount;
  console.log(amountOfItemsAllowed);
  if (itemsLoaded < amountOfItemsAllowed && itemsLoaded != dataSaveTradeCalculator71.length) {
    sortByTradeCalculator71(searchBarValueTradeCalculator71, filterTradeCalculator71, true)
  }
}

function sortByTradeCalculator71(searchValue, filter, load) {
  if (!load) {
    try {
      results.removeEventListener('scroll', resultsFunction);
    } catch (error) {}
    itemsLoaded = 0;
    latestIndex = -1;
    amountOfItemsAllowed = lazyLoadAmount;
    results = document.getElementById('results');
    results.addEventListener('scroll', resultsFunction);
    const html = document.querySelector('.results-trade-calculator71');
  html.innerHTML = '';
  previeousFilterModeTradeCalculator71 = filterModeTradeCalculator71;
  filterModeTradeCalculator71 = filter;
  document.querySelector(`.${previeousFilterModeTradeCalculator71.changeToClass()}-button-trade-calculator71`).classList.remove('selected-filter-button-trade-calculator71');
  document.querySelector(`.${filterModeTradeCalculator71.changeToClass()}-button-trade-calculator71`).classList.add('selected-filter-button-trade-calculator71');
  }
  dataSaveTradeCalculator71.forEach((item, index) => {
    if (index >= latestIndex && itemsLoaded <= amountOfItemsAllowed) {
      latestIndex++;
      if (item[FILTERNAME].replace('[Unobtainable]', '') === filter || filter === 'All') {
        if (searchValue != '') {
          if (String(item[ITEMNAME]).toLowerCase().includes(searchValue.toLowerCase())) {
            addGridItemTradeCalculator71(item, index);
          }
        } else {
          addGridItemTradeCalculator71(item, index);
        }
      } else if (item[FILTERNAME] == null || item[FILTERNAME] == undefined) {
        if (filter === 'All') {
          if (searchValue != '') {
            if (String(item[ITEMNAME]).toLowerCase().includes(searchValue.toLowerCase())) {
              addGridItemTradeCalculator71(item, index);
            }
          } else {
            addGridItemTradeCalculator71(item, index);
          }
        }
      }
    }
  });
}

function addGridItemTradeCalculator71(item, index) {
  itemsLoaded++;
  const html = document.querySelector('.results-trade-calculator71');
  if (item[ITEMNAME] != undefined) {
  const fontSize = item[ITEMNAME].length > 10 ? "0.73" : "0.9";
  let color = '';
  if (item[SUBTITLE] === 'Golden') {
    color = 'color: rgb(255, 166, 0)'
  } else if (item[SUBTITLE] === 'Toxic') {
    color = 'color: rgb(72, 255, 0)'
  }
  html.innerHTML += `
    <div onclick="addItemTradeCalculator71(${index})" class="result-trade-calculator71">
      <img class="result-image-trade-calculator71" src="${item[ITEMIMAGE]}" onerror="this.onerror=null; this.src='image-error-trade-calculator71.svg'">
      <p style="font-size: ${fontSize}rem;" class="text2-trade-calculator71">${item[ITEMNAME]}</p>
      <p style="font-size: ${fontSize - 0.1}rem; font-weight: bold; ${color}" class="text2-trade-calculator71">${item[SUBTITLE]}</p>
    </div>
  `
  }
}

function addItemTradeCalculator71(index) {
  selectedTypeTradeCalculator71 = 'Normal';
  starAmountTradeCalculator71 = 0;
  lastTraitTradeCalculator71 = '';
  traitTradeCalculator71 = 'None'
  const background = document.querySelector('.background-tint-trade-calculator71');
  background.innerHTML += `
  <div class="background-tint-trade-calculator71 background-tint-trade-calculator712 background-tint-trade-calculator71-additive">
    <div style="position: relative; height: fit-content; width: fit-content" class="popup-trade-calculator-71">
      <p style="margin-bottom: 15px;" class="text3-trade-calculator71">Amount: <input class="number-input-trade-calculator71" type="number" min="1" value="1"><img onclick="closePopup2TradeCalculator71()" class="close-icon2-trade-calculator71" src="close-trade-calculator71.svg"></p>
      <div style="margin-top: 10px; display: flex; align-items: center; justify-content: center;">
        <button onclick="submitTradeCalculator71(${index})" class="red-button-trade-calculator71">
          SUBMIT
        </button>
      </div>
    </div>
  </div>
  `
}

function closePopup2TradeCalculator71() {
  const popup = document.querySelector('.background-tint-trade-calculator712');
  popup.remove();
}


let dropDownStatusTradeCalculator71 = 0;
let selectedTypeTradeCalculator71 = 'Normal';
const typesTradeCalculator71 = ['Normal', 'Shiny', 'Wumbo', 'Shiny Wumbo'];
const bodyTradeCalculator71 = document.querySelector('body');

function handleClick(event) {
  if (!event.target.closest('.dropdown-trade-calculator71')) { 
    closeDropDownTradeCalculator71();
    bodyTradeCalculator71.removeEventListener("click", handleClick);
  }
}

function openDropDownTradeCalculator71() {
  const dropdown = document.querySelector('.dropdown-trade-calculator71');

  if (dropDownStatusTradeCalculator71 === 0) {
    let newArray = typesTradeCalculator71.filter(item => item !== selectedTypeTradeCalculator71);

    const dropDownOverlay = document.createElement('div');
    dropDownOverlay.classList.add('dropdown-overlay-trade-calculator71');
    dropdown.appendChild(dropDownOverlay);

    newArray.forEach((item) => {
      const button = document.createElement('button');
      button.classList.add('dropdown-overlay-buttons-trade-calculator71');
      button.textContent = item;
      button.onclick = () => {
        setTypeTradeCalculator71(item);
      };
      dropDownOverlay.appendChild(button);
    });

    dropDownStatusTradeCalculator71 = 1;

    setTimeout(() => {
      bodyTradeCalculator71.addEventListener("click", handleClick, { once: true });
    }, 100);
  } else {
    closeDropDownTradeCalculator71();
  }
}


function closeDropDownTradeCalculator71() {
  const dropdownOverlay = document.querySelector('.dropdown-overlay-trade-calculator71');
  if (dropdownOverlay) {
    dropdownOverlay.remove();
  }
  dropDownStatusTradeCalculator71 = 0;
}


function setTypeTradeCalculator71(item) {
  selectedTypeTradeCalculator71 = item;

  closeDropDownTradeCalculator71();

  const dropdown = document.querySelector('.dropdown-trade-calculator71');
  dropdown.innerHTML = `
    ${item} <img class="dropdown-arrow-trade-calculator71" src="dropdown-trade-calculator71.svg">
  `;

  closeDropDownTradeCalculator71(); 
}

let starAmountTradeCalculator71 = 0;

function setStarsTradeCalculator71(amount) {
  starAmountTradeCalculator71 = amount;
  const input = document.querySelector('.star-rating-input-trade-calculator71');
  input.value = amount;
}

let lastTraitTradeCalculator71 = '';
let traitTradeCalculator71 = 'None'

function changeTraitTradeCalculator71(trait) {
  lastTraitTradeCalculator71 = traitTradeCalculator71;
  traitTradeCalculator71 = trait;
  const lastTraitButton = document.querySelector(`.trait-icon-trade-calculator71${lastTraitTradeCalculator71.replace(' ', '')}`);
  lastTraitButton.classList.remove('trait-icon-selected-trade-calculator71');
  const traitButton = document.querySelector(`.trait-icon-trade-calculator71${traitTradeCalculator71.replace(' ', '')}`);
  traitButton.classList.add('trait-icon-selected-trade-calculator71');
}

function submitTradeCalculator71(index) {
  const popups = document.querySelector('.background-tint-trade-calculator71primary');
  let amount = document.querySelector('.number-input-trade-calculator71').value;
  popups.innerHTML = '';
  popups.classList.remove('background-tint-trade-calculator71-additive');
  let calculatedValue = dataSaveTradeCalculator71[index][VALUE] * amount;
  let containsInvalidValue = false;
  if (calculatedValue >= Number.MAX_SAFE_INTEGER || calculatedValue === '' || calculatedValue === 0 || !calculatedValue) {
    containsInvalidValue = true;
  }
  const html = document.querySelector(`.offer-items-trade-calculator71${offerTypeTradeCalculator71}`);
  html.innerHTML += `
        <div onclick="updateCalculationTradeCalculator71(-${calculatedValue}, '${offerTypeTradeCalculator71}', ${containsInvalidValue}, 'subtract'); this.remove()" class="offer-item-trade-calculator71">
          <img class="background-image-trade-calculator71" src="${dataSaveTradeCalculator71[index][ITEMIMAGE]}" alt="${dataSaveTradeCalculator71[index][ITEMNAME]}" onerror="this.onerror=null; this.src='image-error-trade-calculator71.svg';">
          <p class="item-amount-trade-calculator71">${sigfigs(amount)}</p>
          <p class="item-name">${dataSaveTradeCalculator71[index][ITEMNAME]}<p>
        </div>
  `;
  updateCalculationTradeCalculator71(calculatedValue, offerTypeTradeCalculator71, containsInvalidValue, 'add');
}

let yourValueTradeCalculator71 = 0;
let theirValueTradeCalculator71 = 0;
let invalidCountTradeCalculator71 = 0;
let invalidCountTradeCalculator712 = 0;

function updateCalculationTradeCalculator71(value, offertype, valid, operator) {
  if (offertype === 'Yours') {
    if (!valid) {
      yourValueTradeCalculator71 += value;
    } else {
      if (operator === 'subtract') {
        invalidCountTradeCalculator71 -= 1;
      } else if (operator === 'add') {
        invalidCountTradeCalculator71 += 1;
      }
    }
    const yourSpan = document.querySelector('.value-trade-calculator71yours');
    if (invalidCountTradeCalculator71 > 0) {
      yourSpan.innerText = 'O/C';
    } else if (invalidCountTradeCalculator71 === 0) {
      yourSpan.innerText = sigfigs(yourValueTradeCalculator71);
    }
  } else if (offertype === 'Theirs') {
    if (!valid) {
      theirValueTradeCalculator71 += value;
    } else {
      if (operator === 'subtract') {
        invalidCountTradeCalculator712 -= 1;
      } else if (operator === 'add') {
        invalidCountTradeCalculator712 += 1;
      }
    }
    const theirSpan = document.querySelector('.value-trade-calculator71theirs');
    if (invalidCountTradeCalculator712 > 0) {
      theirSpan.innerText = 'O/C';
    } else if (invalidCountTradeCalculator712 === 0) {
      theirSpan.innerText = sigfigs(theirValueTradeCalculator71);
    }
  }
  const VS = document.querySelector('.vs-trade-calculator71');
  const VSID = document.getElementById('vs');
  if (invalidCountTradeCalculator71 + invalidCountTradeCalculator712 > 0) {
    VS.innerText = 'O/C';
    VSID.style = 'color:rgb(255, 255, 255)';
  } else if (yourValueTradeCalculator71 === theirValueTradeCalculator71) {
    VS.innerText = 'FAIR';
    VSID.style = 'color: white';
  } else if (yourValueTradeCalculator71 > theirValueTradeCalculator71) {
    VS.innerText = 'LOSE';
    VSID.style = 'color:rgb(162, 50, 50)';
  } else if (yourValueTradeCalculator71 < theirValueTradeCalculator71) {
    VS.innerText = 'WIN'
    VSID.style = 'color:rgb(50, 162, 69)';
  }
}

function sigfigs(number) {
 if (number + 1 > Number.MAX_SAFE_INTEGER) {
  return '9Q+ ⚠';
 }
 let length = String(Number(number)).length;
 let multiplier = 1;
 let suffix = '';
 if (((length - 1) % 3) === 0) {
  multiplier = 1;
 } else if (((length - 2) % 3) === 0) {
  multiplier = 10
 } else if (((length - 3) % 3) === 0) {
  multiplier = 100
 } else {
  multiplier = 1;
 }
 if (length >= 4 && length < 7) {
  suffix = 'k';
 } else if (length >= 7 && length < 10) {
  suffix = 'M';
 } else if (length >= 10 && length < 13) {
  suffix = 'B';
 } else if (length >= 13 && length < 16) {
  suffix = 'T';
 } else if (length >= 16 && length < 19) {
  suffix = 'Q';
 }
 return `${Number((Math.floor(((number / (10**(length - 1))) * 100)) * multiplier / 100))}${suffix}`;
}