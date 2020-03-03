// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Extract receipt
 */

const { FormRecognizerClient, CognitiveKeyCredential } = require("../../dist");

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  console.log(`Running ExtractReceipt sample`);

  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["COGNITIVE_SERVICE_ENDPOINT"] || "<cognitive services endpoint>";
  const apiKey = process.env["COGNITIVE_SERVICE_API_KEY"] || "<api key>";
  let imageUrl = "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/contoso-allinone.jpg";
  const imageNoQuntityUrl = "http://images2.wikia.nocookie.net/__cb20111106201150/groceryreceipts/images/8/80/Grocery_receipts_001.jpg";

  imageUrl = "https://milesaway44105.files.wordpress.com/2011/09/receipt.jpg";
  imageUrl = "http://2.bp.blogspot.com/_LqCB_lgYPw0/TOpQyM_1PFI/AAAAAAAAACw/Qpx0wZ25GC4/s1600/tesco1receipt.jpg";
  imageUrl = "http://travelwithgrant.boardingarea.com/wp-content/uploads/2013/06/VR-Receipt.jpg";

  const client = new FormRecognizerClient(endpoint, new CognitiveKeyCredential(apiKey));

  let result;

  try {
    result = await client.getExtractedReceipt("1864e01a-5bcc-40f3-aac3-d69c6d9a123c");
  } catch (e) {
    console.log(e);
    result = { status: "failed" };
  }
  result = { status: "failed" };

  if (result.status !== "succeeded") {
    console.log(result);
    console.log("extracting...");
    result = await client.extractReceiptFromUrl(imageUrl, {
    });
  }

  console.log(result.status);
  console.log("first receipt:")
  //console.log(result.analyzeResult.receiptResults[0]);
  console.log("Items:")
  let i = 1;
  for (const item of result.analyzeResult.receiptResults[0].items) {
    console.log(`${i++})\t ${item.quantity || ""} ${item.name} $${item.totalPrice}`);
  }
  //console.log("Raw fields");
  //console.log(result.analyzeResult.receiptResults[0].rawReciptFields)
  //console.log(result.analyzeResult.receiptResults[0].rawReciptFields["MerchantAddress"])
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
