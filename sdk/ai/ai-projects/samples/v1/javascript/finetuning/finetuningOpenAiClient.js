// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to upload a training file and create a fine-tuning job using the OpenAI client with Azure OpenAI.
 * @summary Fine-tune a GPT model on Azure OpenAI.
 */

const OpenAI = require("openai");
const fs = require("fs");
require("dotenv/config");

// Configure the OpenAI client for Azure OpenAI
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: `${process.env.AZURE_OPENAPI_ENDPOINT}/openai`, // e.g., https://<resource>.openai.azure.com/openai
  defaultQuery: { "api-version": "2025-04-01-preview" }, // Required for Azure
  defaultHeaders: { "api-key": process.env.OPENAI_API_KEY },
});

async function main() {
  try {
    // Optional cleanup: delete old files if quota is near limit
    const files = await client.files.list();
    if (files.data.length > 90) {
      console.log(`⚠️ File count is ${files.data.length}. Cleaning up oldest files...`);
      for (const f of files.data.slice(0, 10)) {
        try {
          await client.files.delete(f.id);
          console.log(`🗑 Deleted old file: ${f.id}`);
        } catch (err) {
          console.warn(`⚠️ Could not delete file ${f.id}:`, err.message);
        }
      }
    }

    // 1. Upload the training file
    const file = await client.files.create({
      file: fs.createReadStream("finetuning/training.jsonl"),
      purpose: "fine-tune",
    });
    console.log(`✅ Uploaded file: ${file.id}`);

    // 2. Wait until the file is processed
    let fileStatus = file.status;
    while (fileStatus !== "processed") {
      console.log(`⏳ Waiting for file to process... Current status: ${fileStatus}`);
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait 5s
      const updatedFile = await client.files.retrieve(file.id);
      fileStatus = updatedFile.status;
    }
    console.log(`✅ File processed and ready for fine-tuning.`);

    // 3. Create the fine-tuning job
    const fineTune = await client.fineTuning.jobs.create({
      model: "gpt-4.1", // ✅ Supported model for fine-tuning in Azure
      training_file: file.id,
    });
    console.log(`✅ Fine-tune job created: ${fineTune.id}`);

    // 4. Poll job status until completion
    let status = fineTune.status;
    while (status === "running" || status === "pending") {
      console.log(`⏳ Job status: ${status}...`);
      await new Promise((resolve) => setTimeout(resolve, 60000)); // Wait 1 minute
      const updated = await client.fineTuning.jobs.retrieve(fineTune.id);
      status = updated.status;
    }

    console.log(`✅ Job completed with status: ${status}`);
    if (status === "succeeded") {
      console.log(`🎯 Fine-tuned model: ${fineTune.fine_tuned_model}`);
    }
  } catch (err) {
    console.error("❌ The sample encountered an error:", err);
  }
}

main();

module.exports = { main };
