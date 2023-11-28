const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');


const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/ask', async (req, res) => {
  const userPrompt = req.body.prompt;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'system', content: 'You are a helpful assistant.' }, { role: 'user', content: userPrompt }],
      },
      {
        headers: {
          Authorization: `Bearer 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`,
          'Content-Type': 'application/json',
        },
      }
    );

    const chatResponse = response.data.choices[0].message.content;
    res.json({ response: chatResponse });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});
