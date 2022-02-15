// take input from bill 
// multiply it by 1.(input from tip options)
// log total and divide by input from people
// subtract bill input from total then divid by input from people for tips/person
// push all values to results on up validation of all inputs and add disabled and error text is validation fails
// add active states to buttons on click
// on click of reset button clear all active states and data from inputs

(function(){
  const ACTIVE_CLASS = 'active',
        billInput = document.querySelector('input[name="bill"]'),
        customTipInput = document.querySelector("input[name='tip']"),
        peopleInput = document.querySelector("input[name='people']"),
        tipOptions = document.querySelectorAll('button.tip-button'),
        defaultTip = document.querySelector('[data-tip="15"]'),
        tipResults = document.querySelector('.tip-results'),
        totalResults = document.querySelector('.total-results'),
        errorText = document.querySelector('.disabled-text'),
        resetBtn = document.querySelector('.reset-btn')

  setEventsAndDefaults();

  function setEventsAndDefaults() {
    isCustomTip()
    calculateResults();
    tipOptions.forEach(option => {
      option.addEventListener('click', addActiveBtnClass);
    });
    customTipInput.addEventListener('input', () => {
      isCustomTip()
      validateFields();
    });
    peopleInput.addEventListener('input', validateFields);
    billInput.addEventListener('input', validateFields)
  }

  function calculateResults() {
    let tipPercent = document.querySelector('.tip-button.active').dataset.tip
    let tipMultiplier = tipPercent / 100
    let totalTip = Math.round(((billInput.value * tipMultiplier) + Number.EPSILON) * 100) / 100;
    let billTotal = Math.round(((parseFloat(billInput.value) + totalTip) + Number.EPSILON) * 100) / 100;
    let individualTip = Math.round(((totalTip / peopleInput.value) + Number.EPSILON) * 100) / 100;
    let individualTotal = Math.round(((billTotal / peopleInput.value) + Number.EPSILON) * 100) / 100;

    if(individualTip == null || individualTip === 'undefined' || individualTip === 'Infinity') {
      tipResults.textContent = `$0.00`;
    } else {
      tipResults.textContent = `$${individualTip}`;
    }

    if(individualTotal == null || individualTotal === 'undefined' || individualTotal === 'Infinity') {
      totalResults.textContent = `$0.00`;
    } else {
      totalResults.textContent = `$${individualTotal}`;
    }
  }

  function isCustomTip() {
    if (customTipInput.value && customTipInput != null || customTipInput.value && customTipInput.value != undefined) {
      customTipInput.dataset.tip = customTipInput.value;
      customTipInput.classList.add(ACTIVE_CLASS);

      tipOptions.forEach(option => {
        option.classList.remove(ACTIVE_CLASS);
      });
    }
  }

  function resetFields() {
    billInput.value = 142.55;
    customTipInput.value = null;
    customTipInput.classList.remove(ACTIVE_CLASS);
    peopleInput.value = 5;

    tipOptions.forEach(option => {
      option.classList.remove(ACTIVE_CLASS);
    });

    defaultTip.classList.add(ACTIVE_CLASS);

    calculateResults();
  }

  function validateFields() {
    if (peopleInput.value === '0' || peopleInput.value.length == 0 || peopleInput.value == null || peopleInput.value === 'undefined') {
      resetBtn.classList.remove(ACTIVE_CLASS);
      errorText.classList.add(ACTIVE_CLASS);
      peopleInput.classList.add('disable');
    } else {
      resetBtn.classList.add(ACTIVE_CLASS);
      errorText.classList.remove(ACTIVE_CLASS);
      peopleInput.classList.remove('disable');

      resetBtn.addEventListener('click', resetFields);
      
      calculateResults();
    }
  }

  function addActiveBtnClass() {
    tipOptions.forEach(option => {
      option.classList.remove(ACTIVE_CLASS);
    });

    this.classList.add(ACTIVE_CLASS);
    calculateResults();
  }
})();