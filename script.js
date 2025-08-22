// ------------------------------
// Loan Calculator with Sliders + Frequency
// ------------------------------

function rateToDecimal(annualRate) {
  return (annualRate / 100) / 12; // monthly rate
}

function calculateMonthlyRepayment(loanAmount, annualRate, years) {
  const n = years * 12;
  const r = rateToDecimal(annualRate);

  if (r === 0) return loanAmount / n;

  return loanAmount * r / (1 - Math.pow(1 + r, -n));
}

function updateResults() {
  const loanAmount = parseFloat(document.getElementById('loanValue').value) || 0;
  const loanTerm   = parseFloat(document.getElementById('loanTerm').value) || 30;
  const interest   = parseFloat(document.getElementById('interestRate').value) || 6;
  const frequency  = document.getElementById('repaymentFrequency').value;
  const extraRepay = parseFloat(document.getElementById('extraRepay').value) || 0;
  const offset     = parseFloat(document.getElementById('offset').value) || 0;
  const lumpSum    = parseFloat(document.getElementById('lumpSum').value) || 0;

  // Apply lump sum immediately
  let balance = loanAmount - lumpSum - offset;
  if (balance < 0) balance = 0;

  const monthly = calculateMonthlyRepayment(balance, interest, loanTerm);

  let payment = monthly;
  let label = "month";
  if (frequency === "fortnightly") {
    payment = monthly / 2;
    label = "fortnight";
  } else if (frequency === "weekly") {
    payment = monthly / 4;
    label = "week";
  }

  payment += extraRepay;

  const total = payment * loanTerm * (frequency === "monthly" ? 12 : frequency === "fortnightly" ? 26 : 52);
  const totalInterest = total - balance;

  // Update results
  document.getElementById('regularRepayment').textContent = payment.toFixed(2);
  document.getElementById('repaymentPeriod').textContent = label;
  document.getElementById('totalInterest').textContent = totalInterest.toFixed(2);
  document.getElementById('timeSaved').textContent = "0";
  document.getElementById('interestSaved').textContent = "0";

  // Update displays for sliders
  document.getElementById('extraRepayDisplay').textContent = extraRepay;
  document.getElementById('offsetDisplay').textContent = offset;
  document.getElementById('lumpSumDisplay').textContent = lumpSum;
}

// Bind events
document.addEventListener('DOMContentLoaded', () => {
  const inputs = ['loanValue', 'loanTerm', 'interestRate', 'repaymentFrequency',
                  'extraRepay', 'offset', 'lumpSum'];
  inputs.forEach(id => {
    document.getElementById(id).addEventListener('input', updateResults);
  });
  updateResults();
});
