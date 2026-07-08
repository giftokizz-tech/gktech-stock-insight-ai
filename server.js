import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import getStockData from './services/twelveData.js';
import aiResponse from './services/aiResponse.js';
import axios from 'axios';



const app = express();

app.use(cors());
app.use(express.json());

app.post('/analyze', async (req, res) => {
  console.log('analyze route hit');
  
    try { 
      const  { question, goal} = req.body;
      const stockData = await getStockData(question)

      const analysis = await aiResponse(stockData, goal)

      console.log("analysis:", analysis);
      

      res.json({
        analysis
      })

      console.log("stock data received")
      console.log(question);
      console.log(stockData);


      

    } catch (error) {
      res.status(500).json({ error: error.message });
      console.log(error);
      
    }
 })


app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});



