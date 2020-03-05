// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Extract receipt
 */

const { ReceiptRecognizerClient, CognitiveKeyCredential } = require("../../dist");

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

  const client = new ReceiptRecognizerClient(endpoint, new CognitiveKeyCredential(apiKey));

  let response;

  try {
    //response = await client.getExtractedReceipt("bce24b30-49a1-4bb1-9e54-206194aa8665");
  } catch (e) {
    console.log(e);
    response = { status: "failed" };
  }
  response = { status: "failed" };

  if (response.status !== "succeeded") {
    console.log(response);
    console.log("extracting...");

    const poller = await client.extractReceiptFromUrl(imageUrl, {
      includeTextDetails: true,
      onProgress: (state) => { console.log(`analyzing status: ${state.status}`); }
    });
    await poller.pollUntilDone();
    response = poller.getResult();
  }

  console.log(response.status);
  console.log("first receipt:")
  //console.log(response.analyzeResult.receiptResults[0]);
  console.log("Items:")
  let i = 1;
  for (const item of response.analyzeResult.receiptResults[0].items) {
    console.log(`${i++})\t ${item.quantity || ""} ${item.name} $${item.totalPrice}`);
  }
  //console.log("Raw fields");
  //console.log(response.analyzeResult.receiptResults[0].rawReciptFields)
  console.log(response.analyzeResult.receiptResults[0].fields["MerchantAddress"])
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
