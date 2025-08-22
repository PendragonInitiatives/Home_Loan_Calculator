document.addEventListener("DOMContentLoaded", function () {
    // Grab inputs
    const propertyValueInput = document.getElementById("propertyValue");
    const loanValueInput = document.getElementById("loanValue");
    const loanTypeInput = document.getElementById("loanType");
    const loanTermInput = document.getElementById("loanTerm");
    const interestRateInput = document.getElementById("interestRate");
    const repaymentTypeInput = document.getElementById("repaymentType");

    // Levers
    const extraRepaymentsInput = document.getElementById("extraRepayments");
    const offsetAccountInput = document.getElementById("offsetAccount");
    const lumpSumInput = document.getElementById("lumpSum");
    const repaymentFrequencyInput = document.getElementById("repaymentFrequency");

    // Results
    const regularRepaymentEl = document.getElementById("regularRepayment");
    const totalInterestEl = document.getElementById("totalInterest");
    const timeSavedEl = document.getElementById("timeSaved");
    const interestSavedEl = document.getElementById("interestSaved");

    // Calculation function
    function updateResults() {
        const propertyValue = parseFloat(propertyValueInput.value) || 0;
        const loanValue = parseFloat(loanValueInput.value) || 0;
        const loanTerm = parseInt(loanTermInput.value) || 0;
        const interestRate = parseFloat(interestRateInput.value) / 100 || 0;

        const extraRepayments = parseFloat(extraRepaymentsInput.value) || 0;
        const offsetAccount = parseFloat(offsetAccountInput.value) || 0;
        const lumpSum = parseFloat(lumpSumInput.value) || 0;
        const repaymentFrequency = repaymentFrequencyInput.value;

        // --- Example repayment formula ---
        // Monthly repayment (P&I) = [P * r * (1+r)^n] / [(1+r)^n - 1]
        const n = loanTerm * 12;
        const r = interestRate / 12;
        let repayment = 0;

        if (r > 0) {
            repayment = (loanValue * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        } else {
            repayment = loanValue / n;
        }

        // Update results section
        regularRepaymentEl.textContent = `$${repayment.toFixed(2)} per month`;
        totalInterestEl.textContent = `$${(repayment * n - loanValue).toFixed(2)}`;
        timeSavedEl.textContent = "0 years"; // placeholder until extra repayments are applied
        interestSavedEl.textContent = "$0";  // placeholder
    }

    // Attach listeners
    [
        propertyValueInput, loanValueInput, loanTypeInput, loanTermInput,
        interestRateInput, repaymentTypeInput, extraRepaymentsInput,
        offsetAccountInput, lumpSumInput, repaymentFrequencyInput
    ].forEach(input => {
        input.addEventListener("input", updateResults);
    });

    // Run once on load
    updateResults();
});
