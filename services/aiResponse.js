import OpenAI from "openai";

async function aiResponse(stockData, goal){
 const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})
console.log("oprnAi key:", process.env.OPENAI_API_KEY)

  const response = await openai.chat.completions.create({
         model: 'gpt-5.4-mini',
          messages: [
            {
              role: "system",
              content: `You are an expert stock market analyst.

              Use ONLY the stock data provided.

              Your analysis should include:
              - Overall trend
              - Price movement
              - volume analysis
              - Risks
              - Opportunities
              - A Buy, Hold or Sell recommendetion
              - A confidence score out of 10

              keep the rseponde professional and easy to understand.
              `
            },
          {
                role: 'user',
                content:`
                Stock Data:
                ${JSON.stringify(stockData, null, 2)}
                Investment Goal:
                ${goal}
                `
            }
    ]
  })
  const result = response.choices[0].message.content
  console.log("Returning:", result);
  
  return result;
  
  
 }

 export default aiResponse;


        