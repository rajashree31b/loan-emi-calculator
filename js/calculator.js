document.addEventListener("DOMContentLoaded", () => {
  const loanAmountInput = document.querySelector(".loan-amount");
  const interestRateInput = document.querySelector(".interest-rate");
  const loanTenureInput = document.querySelector(".loan-tenure");

  const loanAmountDisplay = document.querySelector(".loan-amount-value");
  const interestRateDisplay = document.querySelector(".interest-rate-value");
  const loanTenureDisplay = document.querySelector(".loan-tenure-value");

  const loanEMIValue = document.querySelector(".loan-emi .value");
  const totalInterestValue = document.querySelector(".total-interest .value");
  const totalAmountValue = document.querySelector(".total-amount .value");

  const calculateBtn = document.querySelector(".calculate-btn");

  let myChart;

  const updateDisplayValues = () => {
    loanAmountDisplay.value = loanAmountInput.value;
    interestRateDisplay.value = interestRateInput.value;
    loanTenureDisplay.value = loanTenureInput.value;
  };

  const updateRangeValues = () => {
    loanAmountInput.value = loanAmountDisplay.value;
    interestRateInput.value = interestRateDisplay.value;
    loanTenureInput.value = loanTenureDisplay.value;
  };

  const calculateEMI = () => {
    let loanAmount = parseFloat(loanAmountInput.value);
    let interestRate = parseFloat(interestRateInput.value);
    let loanTenure = parseFloat(loanTenureInput.value);
    let interest = interestRate / 12 / 100;

    let emi =
      loanAmount *
      interest *
      (Math.pow(1 + interest, loanTenure) /
        (Math.pow(1 + interest, loanTenure) - 1));
    return emi;
  };

  const updateData = (emi) => {
    loanEMIValue.innerHTML = Math.round(emi);

    let totalAmount = Math.round(loanTenureInput.value * emi);
    totalAmountValue.innerHTML = totalAmount;

    let totalInterestPayable = Math.round(totalAmount - loanAmountInput.value);
    totalInterestValue.innerHTML = totalInterestPayable;

    if (myChart) {
      updateChart(totalInterestPayable);
    } else {
      displayChart(totalInterestPayable);
    }
  };

  const displayChart = (totalInterestPayableValue) => {
    const ctx = document.getElementById("myChart").getContext("2d");
    myChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Total Interest", "Principal Loan Amount"],
        datasets: [
          {
            data: [totalInterestPayableValue, loanAmountInput.value],
            backgroundColor: ["#e63946", "#07613d"],
            borderColor: ["#ad0000", "#ffffff"],
            borderWidth: [2, 0],
            hoverBackgroundColor: ["#ff6b6b", "#087f5b"],
            hoverBorderColor: ["#ff0000", "#00ff00"],
            hoverBorderWidth: [4, 0],
          },
        ],
      },
    });
  };

  const updateChart = (totalInterestPayableValue) => {
    myChart.data.datasets[0].data[0] = totalInterestPayableValue;
    myChart.data.datasets[0].data[1] = loanAmountInput.value;
    myChart.update();
  };

  const init = () => {
    let emi = calculateEMI();
    updateData(emi);
  };

  loanAmountInput.addEventListener("input", () => {
    updateDisplayValues();
    init();
  });

  interestRateInput.addEventListener("input", () => {
    updateDisplayValues();
    init();
  });

  loanTenureInput.addEventListener("input", () => {
    updateDisplayValues();
    init();
  });

  loanAmountDisplay.addEventListener("input", () => {
    updateRangeValues();
    init();
  });

  interestRateDisplay.addEventListener("input", () => {
    updateRangeValues();
    init();
  });

  loanTenureDisplay.addEventListener("input", () => {
    updateRangeValues();
    init();
  });

  calculateBtn.addEventListener("click", init);

  init();
});
