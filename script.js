 <div class="grid-3">
                <div>
                    <label style="display: block; margin-bottom: 8px; font-weight: bold;">Loan Amount</label>
                    <input type="text" id="loanAmount" value="640,000" class="input-field" oninput="formatCurrency(this); calculate()">
                </div>
                <div>
                  
                    <label style="display: block; margin-bottom: 8px; font-weight: bold;">Interest Rate (%)</label>
                    <input type="number" id="interestRate" value="6.5" step="0.1" class="input-field" oninput="calculate()">
                </div>
                <div>
                    <label style="display: block; margin-bottom: 8px; font-weight: bold;">Loan Term (years)</label>
                    <select id="loanTerm" class="input-field" onchange="calculate()">
                        <option value="15">15 years</option>
                        <option value="20">20 years</option>
                        <option value="25">25 years</option>
                        <option value="30" selected>30 years</option>
                    </select>
                </div>
            </div>
        </div>
        
