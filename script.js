// ----------------------------
// Loan Calculator JavaScript
// ----------------------------

// Helper: Convert percent to decimal
function toDecimal(rate) {
  return rate / 100;
}

// Calculate monthly repayment using amortisation formula
function calculateMonthlyRepayment(loanAmount, annualRate, years) {
  const monthlyRate = toDecimal(annualRate) / 12;
  const n = years * 12;
  return loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
}

// Update results when user changes inputs
function updateResults() {
  const loanAmount = parseFloat(document.getElementById("loanValue").value);
  const interestRate = parseFloat(document.getElementById("interestRate").value);
  const loanTerm = parseFloat(document.getElementById("loanTerm").value);

  // Repayment frequency
  const frequency = document.getElementById("repaymentFrequency").value;

  // Calculate base monthly repayment
  const monthlyPayment = calculateMonthlyRepayment(loanAmount, interestRate, loanTerm);

  // Adjust for frequency
  let regularRepayment = monthlyPayment;
  if (frequency === "weekly") {
    regularRepayment = monthlyPayment * 12 / 52;
  } else if (frequency === "fortnightly") {
    regularRepayment = monthlyPayment * 12 / 26;
  }

  // Extra repayments
  const extraRepayment = parseFloat(document.getElementById("extraRepayment").value) || 0;
  const offset = parseFloat(document.getElementById("offsetAmount").value) || 0;
  const lumpSum = parseFloat(document.getElementById("lumpSum").value) || 0;

  // Apply offset
  const adjustedLoan = loanAmount - offset - lumpSum;
  const adjustedPayment = regularRepayment + extraRepayment;

  // Calculate interest over full term
  const totalPayments = monthlyPayment * loanTerm * 12;
  const totalInterest = totalPayments - loanAmount;

  // Update HTML
  document.getElementById("regularRepayment").textContent = adjustedPayment.toFixed(2);
  document.getElementById("repaymentPeriod").textContent = frequency;
  document.getElementById("totalInterest").textContent = totalInterest.toFixed(2);
  document.getElementById("timeSaved").textContent = "Coming soon"; // we’ll add time saved calc later
  document.getElementById("interestSaved").textContent = "Coming soon"; // we’ll add this too
}

// Hook up sliders and inputs
document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll("input, select");
  inputs.forEach(input => {
    input.addEventListener("input", updateResults);
  });

  // Run once at start
  updateResults();
});
