// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Extract receipt
 */

//import { ReceiptRecognizerClient, FormRecognizerApiKeyCredential } from "@azure/ai-form-recognizer";
import { ReceiptRecognizerClient, FormRecognizerApiKeyCredential, ExtractReceiptResultResponse } from "../../../src/index";

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  console.log(`Running ExtractReceipt sample`);

  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["COGNITIVE_SERVICE_ENDPOINT"] || "<cognitive services endpoint>";
  const apiKey = process.env["COGNITIVE_SERVICE_API_KEY"] || "<api key>";

  const client = new ReceiptRecognizerClient(endpoint, new FormRecognizerApiKeyCredential(apiKey));
  const imageUrl = "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/contoso-allinone.jpg";

  let response: ExtractReceiptResultResponse | undefined;

  try {
    // response = await client.getExtractedReceipt("bce24b30-49a1-4bb1-9e54-206194aa8665");
    throw new Error("no existing receipt");
  } catch (e) {
    console.log(response);
    console.log("extracting...");

    const poller = await client.beginExtractReceiptsFromUrl(
      imageUrl, {
      includeTextDetails: true,
      onProgress: (state) => { console.log(`analyzing status: ${state.status}`); }
    });
    await poller.pollUntilDone();
    response = poller.getResult();
  }

  if (!response) {
    throw new Error("Expecting valid response!");
  }
  console.log(`### Response status ${response.status}`);

  if (!response.extractedReceipts || response.extractedReceipts.length <= 0)
  {
    throw new Error("Expecting at lease one receipt in analysis result");
  }

  console.log("### First receipt:")
  console.log(response.extractedReceipts[0]);
  console.log("### Items:")
  console.log(`   \t Quantity\tName\tPrice\tTotalPrice`);
  let i = 1;
  for (const item of response.extractedReceipts[0]?.items) {
    console.log(`${i++})\t ${item.quantity || ""}\t${item.name}\t$${item.totalPrice}`);
  }
  console.log("### Raw 'MerchantAddress' fields:");
  console.log(response.extractedReceipts[0]?.fields["MerchantAddress"])
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
