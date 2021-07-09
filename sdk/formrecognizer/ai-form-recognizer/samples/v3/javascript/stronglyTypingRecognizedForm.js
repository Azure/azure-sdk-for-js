// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to assign a RecognizedForm to a strongly-typed
 * object with known fields.
 *
 * We use the pre-trained receipt model as an example, but a similar approach
 * could be used with any custom form as long as you properly update the
 * fields' names and types.
 *
 * @summary create a strongly-typed interface for a model with a known
 * structure and use it to refine the output type of model recognition
 */

const { FormRecognizerClient, AzureKeyCredential } = require("@azure/ai-form-recognizer");

const fs = require("fs");
const os = require("os");

// Load the .env file if it exists
const dotenv = require("dotenv");
dotenv.config();

async function main() {
  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["FORM_RECOGNIZER_ENDPOINT"] ?? "<cognitive services endpoint>";
  const apiKey = process.env["FORM_RECOGNIZER_API_KEY"] ?? "<api key>";
  const fileName = "./assets/receipt/contoso-allinone.jpg";

  if (!fs.existsSync(fileName)) {
    throw new Error(`Expected file "${fileName}" to exist.`);
  }

  const readStream = fs.createReadStream(fileName);

  const client = new FormRecognizerClient(endpoint, new AzureKeyCredential(apiKey));
  const poller = await client.beginRecognizeReceipts(readStream, {
    contentType: "image/jpeg",
    onProgress: (state) => {
      console.log(`status: ${state.status}`);
    }
  });

  const receiptResponse = await poller.pollUntilDone();

  if (!receiptResponse || receiptResponse.length <= 0) {
    throw new Error("Failed to extract data from at least one receipt.");
  }

  // Cast the receipts in the response to our typed model, then extract
  // the first one (we only sent one receipt to the service)
  const [receipt] = receiptResponse;

  // NOTE: Not all fields will be present on every entry. It is important
  // to check which fields were identified. In this example, we will simply
  // print "undefined" for any fields that are not present.

  const { fields } = receipt;

  console.log(
    [
      `Receipt Type: "${fields.ReceiptType?.value}" has confidence ${fields.ReceiptType?.confidence}`,
      `Merchant Name: "${fields.MerchantName?.value}" has confidence ${fields.MerchantName?.confidence}`,
      `Merchant Address: "${fields.MerchantAddress?.value}" has confidence ${fields.MerchantAddress?.confidence}`,
      `Merchant Phone Number: "${fields.MerchantPhoneNumber?.value}" has confidence ${fields.MerchantPhoneNumber?.confidence}`,
      `Transaction Date: ${fields.TransactionDate?.value} has confidence ${fields.TransactionDate?.confidence}`,
      `Transaction Time: ${fields.TransactionTime?.value} has confidence ${fields.TransactionTime?.confidence}`
    ].join(os.EOL)
  );

  if (fields.Items) {
    console.log("Items:");
    for (const { value: item } of fields.Items.value) {
      console.log(
        [
          `- Name: "${item.Name?.value}" has confidence ${item.Name?.confidence}`,
          `  Quantity: ${item.Quantity?.value} has confidence ${item.Quantity?.confidence}`,
          `  Individual Item Price: ${item.Price?.value} has confidence ${item.Price?.confidence}`,
          `  Total Price: ${item.TotalPrice?.value} has confidence ${item.TotalPrice?.confidence}`
        ].join(os.EOL)
      );
    }
  }

  console.log(
    [
      `Subtotal: ${fields.Subtotal?.value} has confidence ${fields.Subtotal?.confidence}`,
      `Tax: ${fields.Tax?.value} has confidence ${fields.Tax?.confidence}`,
      `Tip: ${fields.Tip?.value} has confidence ${fields.Tip?.confidence}`,
      `Total: ${fields.Total?.value} has confidence ${fields.Total?.confidence}`
    ].join(os.EOL)
  );
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
