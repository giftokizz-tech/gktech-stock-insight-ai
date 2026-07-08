const form = document.getElementById("stock-form");
const symbolInput = document.getElementById("stock-symbol");
const goalInput = document.getElementById("investment-goal");
const statusBox = document.getElementById("status");
const responseBox = document.getElementById("ai-response");


form.addEventListener("submit", askAI);

    async function askAI(event) {
      event.preventDefault();
      const symbol =  symbolInput.value.toUpperCase().trim()
      const goal = goalInput.value.trim()
      responseBox.innerHTML = '<div class="loading"></div>';
      goalInput.disabled = true;
      symbolInput.disabled = true;
      

  try {
        statusBox.textContent = `Analyzing ${symbol}...`

        const response = await fetch("http://localhost:3000/analyze", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
          question: symbol,
          goal:  goal
          })
        }
      );
      if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);

      }
        const data = await response.json();

        console.log(JSON.stringify(data, null, 2));
        
        
        statusBox.textContent = `Analysis for ${symbol} completed.`;
        responseBox.innerHTML = `
        <p><strong>Analysis:</strong> ${data.analysis
          .replace(/#/g, "")
          .replace(/\*\*/g, "")
        }</p> `
      } catch (error) {
        console.error("Error fetching stock analysis:", error);
        statusBox.textContent = "Error fetching stock analysis.";
        responseBox.innerHTML = "An error occurred while fetching the stock analysis. Please try again later.";
    }  finally {
        goalInput.disabled = false;
        symbolInput.disabled = false;
        form.reset()
    }
  }
    