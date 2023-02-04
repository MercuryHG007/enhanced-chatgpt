// 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

const { Configuration, OpenAIApi } = require("openai");
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const configuration = new Configuration({
    organization: "org-ZsTXjLknAY9FgUT05rxz84J8",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();

const app = express()

app.use(bodyParser.json())
app.use(cors())

const port = 3080

app.post('/', async(req,res) => {
    const { message, currentModel } = req.body
    console.log(message, "message")
    console.log(currentModel, "currentModel")
    
    const response = await openai.createCompletion({
        model: `${currentModel}`,
        prompt: `${message}`,
        max_tokens: 2049,
        temperature: 0.5,
    });
    res.json({
        message: response.data.choices[0].text,
    })
})

app.get('/models', async(req,res) => {
    const response = await openai.listEngines();
    console.log(response.data.data)
    res.json({
        models: response.data.data
    })
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})