/*
This sample is ported from the OpenAI python cookbook sample at https://github.com/openai/openai-cookbook/blob/main/examples/Embedding_long_inputs.ipynb.

Embedding texts that are longer than the model's maximum context length

OpenAI's embedding models cannot embed text that exceeds a maximum length. 
The maximum length varies by model, and is measured by tokens, not string length. 
If you are unfamiliar with tokenization, check out How to count tokens with tiktoken at 
https://github.com/openai/openai-cookbook/blob/main/examples/How_to_count_tokens_with_tiktoken.ipynb.

This notebook shows how to handle texts that are longer than a model's maximum context length. 
We'll demonstrate using embeddings from text-embedding-ada-002, but the same ideas can be applied to other models and tasks. 
To learn more about embeddings, check out the OpenAI Embeddings Guide at
https://platform.openai.com/docs/guides/embeddings.

1. Model context length

First, we set up the client, select the model, and define a function to get embeddings from the API.
*/

const tiktoken = require("tiktoken-node");
const mathjs = require("mathjs");
const { OpenAIClient } = require("@azure/openai");
const { AzureKeyCredential } = require("@azure/core-auth");

// Load the .env file if it exists
require("dotenv").config();

// You will need to set these environment variables or edit the following values
const endpoint = process.env["ENDPOINT"] || "<openai endpoint>";
const azureApiKey = process.env["AZURE_API_KEY"] || "<api key>";
const model = "text-embedding-ada-002";

const embeddingCTXLength = 8191;
const embeddingEncoding = 'cl100k_base';

const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));

async function getEmbeddings(text) {
  const res = await client.getEmbeddings(model, text);
  return res.data[0].embedding;
}

/*
The text-embedding-ada-002 model has a context length of 8191 tokens with the cl100k_base encoding, 
and we can see that going over that limit causes an error.
*/
const longText = "AGI ".repeat(5000);

async function attemptLongEmbeddingError() {
    try {
        const result = await getEmbeddings(longText);
        console.log("Success!");
        console.log(result);
    } catch (err) {
        console.log("Error:");
        console.log(err);
    }
}

/*
Clearly we want to avoid these errors, particularly when handling programmatically with a large number of embeddings. 
Yet, we still might be faced with texts that are longer than the maximum context length. 
Below we describe and provide recipes for the main approaches to handling these longer texts: 
 (1) simply truncating the text to the maximum allowed length, and 
 (2) chunking the text and embedding each chunk individually.

1. Truncating the input text

The simplest solution is to truncate the input text to the maximum allowed length. 
Because the context length is measured in tokens, we have to first tokenize the text before truncating it. 
The API accepts inputs both in the form of text or tokens, so as long as you are careful that you are 
using the appropriate encoding, there is no need to convert the tokens back into string form. 
Below is an example of such a truncation function.
*/

function truncateTextTokens(text, encodingName = embeddingEncoding, maxTokens = embeddingCTXLength) {
  const encoding = tiktoken.getEncoding(encodingName);
  return encoding.encode(text).slice(0, maxTokens);
}

/*
Our example from before now works without error.
*/

async function attemptLongEmbedding() {
    try {
        const result = await getEmbeddings(truncateTextTokens(longText));
        console.log("Success!");
        console.log(result);
    } catch (err) {
        console.log("Error:");
        console.log(err);
    }
}

/*
2. Chunking the input text

Though trucation works, discarding potentially relevant text is a clear drawback.
Another approach is to divide the input text into chunks and then embed each chunk individually. Then, we can either use the chunk embeddings separately, 
or combine them in some way, such as averaging (weighted by the size of each chunk).

Using the following chunking function, we can break up our long text into chunks of a specified size.
*/

function* batched(arr, size) {
  if (size <= 0) throw new Error("size must be at least one");
  for (let i = 0; i < arr.length;) {
    yield arr.slice(i, i+=size);
  }
}

/*
Now we define a function that encodes a string into tokens and then breaks it up into chunks.
*/

function chunkedTokens(text, encodingName, chunkSize) {
  const encoding = tiktoken.getEncoding(encodingName);
  const tokens = encoding.encode(text);
  return batched(tokens, chunkSize);
}

/*
Also, we define a function giving the weighted average of a list of embeddings over axis 0.
*/

function weightedAverage(nums, weights) {
    const sum = Array(nums[0].length).fill(0);
    let weightSum = 0;
    for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < nums[0].length; j++) {
            sum[j] += nums[i][j] * weights[i];
        }
        weightSum += weights[i];
    }
    return sum.map((x) => x / weightSum);
};

/*

Finally, we can write a function that safely handles embedding requests, 
even when the input text is longer than the maximum context length, by chunking 
the input tokens and embedding each chunk individually. 
The average flag can be set to True to return the weighted average of the chunk embeddings, 
or False to simply return the unmodified list of chunk embeddings.

*/

async function safeGetEmbeddings(text, embeddingModel = model, maxTokens = embeddingCTXLength, encodingName = embeddingEncoding, average = true) {
  const embeddings = [];
  const weights = [];
  for (const chunk of chunkedTokens(text, encodingName, maxTokens)) {
    embeddings.push(await getEmbeddings(chunk, embeddingModel));
    weights.push(chunk.length);
  }
  if (average) {
    const averageEmbeddings = weightedAverage(embeddings, weights);
    const norm = mathjs.norm(averageEmbeddings, "fro");
    return averageEmbeddings.map((x) => x / norm);
  }
  return embeddings;
}

/*
Once again, we can now handle long input texts.
*/

async function main() {
  const averageEmbeddingVector = await safeGetEmbeddings(longText);
  const chunksEmbeddingVector = await safeGetEmbeddings(longText, model, embeddingCTXLength, embeddingEncoding, false);
  console.log(`Setting average=true gives us a single ${averageEmbeddingVector.length}-dimensional embedding vector for our long text.`);
  console.log(`Setting average=false gives us ${chunksEmbeddingVector.length} embedding vectors, one for each chunk.`);
  
}

main();

/*
In some cases, it may make sense to split chunks on paragraph boundaries or sentence boundaries to help preserve the meaning of the text.
*/