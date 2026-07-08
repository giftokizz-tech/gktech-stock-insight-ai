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

              Return only text only.
              Do not use Markdown.
              Do not use **, *, #, bullet formatting, or code blocks.
              
              Format your response exactly like this:
              
              - Stock:

              - Overall trend:
              (Describe the trend over the selected period.)

              - Price movement:
              (explain the percentage change and notable highs/lows.)

              - volume analysis:
              (comment on whether trading volume appears high, low or stable.)

              - Risks:
              (list the main risks.)

              - Opportunities:
              (list the main opportunities.)

              - Recommendetion:
              (State Buy, Hold or Sell and explain why.)

              - Confidence:
               (Give a score out of 10 and briefly explain the score.)

              keep each section concise, professional and easy to understand.

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
  
  return result;
  
  
 }

 export default aiResponse;


        