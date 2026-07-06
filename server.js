import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import fetch from 'node-fetch';
// import { dates } from "./utils/date.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

app.post('/analyze', async (req, res) => {
    try { 
      const  { qestion, goal } = req.body;
       const aiResponse =
        await openai.chat.completions.create({
         model: 'gpt-5.4-mini',
          messages: [
            {
              role: 'system',
              content: 'you are a helpful stock analyst that analyze stock in less than 150 words and gives the best stock predictions'
            },
            {
                role: 'user',
                content:
                `
                analyze this stock
                symbol: ${qestion} and 
                goal: ${goal}
                `
            }
    ]
  })

  console.log(aiResponse);
   res.json({ summary: aiResponse.choices[0].message.content });
  
 
    } catch (error) {
      res.status(500).json({ error: error.message });
      console.log(error);
      
    }
 })
app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});
