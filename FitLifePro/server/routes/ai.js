const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const auth = require('../middleware/auth');

router.post('/ask', auth, async (req, res) => {
    try {
        const { prompt, context } = req.body;

        // Check for API Key
        if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY.includes('YOUR_GEMINI_API_KEY')) {
            console.error('Gemini API Key missing or invalid');
            return res.status(500).json({ error: 'Gemini API Key is not configured on the server.' });
        }

        // Initialize Gemini inside the route to ensure env vars are loaded
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

        // Use gemini-2.5-flash-lite as it is the available stable model
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

        let fullPrompt = `You are an expert fitness coach named "FitLife AI". 
        Context: ${context || 'General fitness inquiry'}
        User Question: ${prompt}
        Keep the answer concise, encouraging, and formatted with bullet points if necessary.`;

        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        const text = response.text();

        res.json({ answer: text });
    } catch (err) {
        console.error('AI Service Error Details:', err);
        // Send the specific error message back to the client for debugging
        res.status(500).json({ error: `AI Error: ${err.message || 'Unknown error'}` });
    }
});

module.exports = router;
