import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import getStockData from './services/twelveData.js';
import aiResponse from './services/aiResponse.js';
import axios from 'axios';
dotenv.config();


const app = express();

app.use(cors());
app.use(express.json());

app.post('/analyze', async (req, res) => {
    try { 
      const  { question, goal} = req.body;
      const stockData = await getStockData(question)

      const analysis = await aiResponse(stockData, goal)

      res.json({
        analysis
      })
    } catch (error) {
      res.status(500).json({ error: error.message });
      console.log(error);
    }
 })
app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});



