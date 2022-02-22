// take input from bill 
// multiply it by 1.(input from tip options)
// log total and divide by input from people
// subtract bill input from total then divid by input from people for tips/person
// push all values to results on validation of all inputs and add disabled and error text if validation fails
// add active states to buttons on click
// on click of reset button clear all active states and data from inputs

(function(){
  const ACTIVE_CLASS = 'active',
        inputList = document.querySelectorAll('input'),
        billInput = document.querySelector('input[name="bill"]'),
        customTipInput = document.querySelector("input[name='tip']"),
        peopleInput = document.querySelector("input[name='people']"),
        tipOptions = document.querySelectorAll('button.tip-button'),
        defaultTip = document.querySelector('[data-tip="15"]'),
        tipResults = document.querySelector('.tip-results'),
        totalResults = document.querySelector('.total-results'),
        errorText = document.querySelector('.disabled-text'),
        resetBtn = document.querySelector('.reset-btn')

  init();

  function init() {
    tipOptions.forEach(option => {
      option.addEventListener('click', () => {
        tipOptions.forEach(option => {
          option.classList.remove(ACTIVE_CLASS);
        });
    
        option.classList.add(ACTIVE_CLASS);
        calculateResults();
      });
    });
    
    inputList.forEach(input => {
      input.addEventListener('input', validateFields);
    })
  }

  function validateFields() {
    let customTipInt = parseInt(customTipInput.value)
    let number0fPeople = parseInt(peopleInput.value);

    // determine if the tip amount is a preset or custom amount
    if (customTipInput.value && Number.isFinite(customTipInt)) {
      customTipInput.dataset.tip = customTipInput.value;
      customTipInput.classList.add(ACTIVE_CLASS);

      tipOptions.forEach(option => {
        option.classList.remove(ACTIVE_CLASS);
      });
    }

    // set resetbtn to disabled
    resetBtn.classList.remove(ACTIVE_CLASS);
    resetBtn.removeEventListener('click', resetFields);

    // set reset btn to active if an input has a value
    for (let i = 0; i < inputList.length; i++) {
      let elValue = parseInt(inputList[i].value)
      if (Number.isFinite(elValue) && elValue !== 0) {
        resetBtn.classList.add(ACTIVE_CLASS);
        resetBtn.addEventListener('click', resetFields);
      };
    }

    // Add error msg is Number of People is 0
    if (Number.isFinite(number0fPeople) && number0fPeople !== 0) {
      errorText.classList.remove(ACTIVE_CLASS);
      peopleInput.classList.remove('disable');

      calculateResults();
    } else {
      errorText.classList.add(ACTIVE_CLASS);
      peopleInput.classList.add('disable');
    }
  };

  // removes all values and active classes on click of reset btn
  function resetFields() {
    customTipInput.classList.remove(ACTIVE_CLASS);
    resetBtn.classList.remove(ACTIVE_CLASS);
    tipResults.textContent = `$0.00`;
    totalResults.textContent = `$0.00`;
    resetBtn.removeEventListener('click', resetFields);

    inputList.forEach(input => {
      input.value = null;
    })

    tipOptions.forEach(option => {
      option.classList.remove(ACTIVE_CLASS);
    });
  }

  // calculates the results after validation
  function calculateResults() {
    let tipPercent = document.querySelector('.tip-button.active').dataset.tip;
    let tipMultiplier = tipPercent / 100;
    let totalTip = billInput.value * tipMultiplier;
    let billTotal = parseFloat(billInput.value) + totalTip;
    let individualTip = totalTip / peopleInput.value;
    let individualTotal = billTotal / peopleInput.value;
    

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    if (Number.isFinite(individualTip) && individualTip !== 0) {
      tipResults.textContent = formatter.format(individualTip);
    } else {
      tipResults.textContent = `$0.00`;
    }

    if (Number.isFinite(individualTotal) && individualTotal !== 0) {
      totalResults.textContent = formatter.format(individualTotal);
    } else {
      totalResults.textContent = `$0.00`;
    }
  }
})();