// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to convert a RecognizedForm into a strongly-typed
 * object with known fields.
 *
 * We use the pre-trained receipt model as an example, but a similar approach could
 * be used with any custom form as long as you properly update the fields' names
 * and types.
 */

import {
  FormRecognizerClient,
  AzureKeyCredential,
  FormField,
  RecognizedForm
} from "@azure/ai-form-recognizer";

import * as fs from "fs";
import * as path from "path";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

/**
 * A Receipt returned by the Receipt Recognition method.
 *
 * This type was accurate for a United States-based receipt at the time of
 * writing, but isn't guaranteed to be stable.
 *
 * For a reference of supported fields, see https://westus2.dev.cognitive.microsoft.com/docs/services/form-recognizer-api-v2-preview/operations
 */
interface USReceipt {
  ReceiptType?: FormField; // example: "Itemized"
  MerchantName?: FormField;
  MerchantAddress?: FormField;
  MerchantPhoneNumber?: FormField;
  Items?: ReceiptItem[];
  Subtotal?: FormField;
  Tax?: FormField;
  Tip?: FormField;
  Total?: FormField;
  TransactionDate?: FormField;
  TransactionTime?: FormField;
}

/**
 * An item in an itemized US Receipt
 */
interface ReceiptItem {
  Name?: FormField;
  Quantity?: FormField;
  Price?: FormField;
  TotalPrice?: FormField;
}

/**
 * Creates a strongly-typed representation of a receipt by
 *
 * 1) Applying the USReceipt type to the fields of the returned model
 * 2) Extracting the "Items" array values to their own strongly-typed value
 */
function toTypedUSReceipt(original: RecognizedForm): USReceipt {
  if (original.fields["Items"].valueType !== "array") {
    throw new Error("Expected 'Items' field to be an array.");
  }

  return {
    ...original.fields,
    Items: original.fields["Items"].value?.map((v) => {
      if (v.valueType !== "object") {
        throw new Error("Expected every Receipt Item to be an object.");
      }

      return v.value;
    }) as ReceiptItem[]
  };
}

export async function main() {
  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["FORM_RECOGNIZER_ENDPOINT"] || "<cognitive services endpoint>";
  const apiKey = process.env["FORM_RECOGNIZER_API_KEY"] || "<api key>";
  const fileName = path.join(__dirname, "../assets/contoso-allinone.jpg");

  if (!fs.existsSync(fileName)) {
    throw new Error(`Expecting file ${fileName} exists`);
  }

  const readStream = fs.createReadStream(fileName);

  const client = new FormRecognizerClient(endpoint, new AzureKeyCredential(apiKey));
  const poller = await client.beginRecognizeReceipts(readStream, "image/jpeg", {
    onProgress: (state) => {
      console.log(`status: ${state.status}`);
    }
  });

  const receiptResponse = await poller.pollUntilDone();

  if (!receiptResponse || receiptResponse.length <= 0) {
    throw new Error("Expecting at lease one receipt in analysis result");
  }

  // Convert the receipts in the response to our typed model, then extract
  // the first one (we only sent one receipt to the service)
  const [receipt] = receiptResponse.map(toTypedUSReceipt);

  // NOTE: Not all fields will be present on every receipt. It is important
  // to check which fields were identified. In this example, we will simply
  // print "undefined" for any fields that are not present.

  console.log(
    `Receipt Type: "${receipt.ReceiptType?.value}" has confidence ${receipt.ReceiptType?.confidence}`
  );
  console.log(
    `Merchant Name: "${receipt.MerchantName?.value}" has confidence ${receipt.MerchantName?.confidence}`
  );
  console.log(
    `Merchant Address: "${receipt.MerchantAddress?.value}" has confidence ${receipt.MerchantAddress?.confidence}`
  );
  console.log(
    `Merchant Phone Number: "${receipt.MerchantPhoneNumber?.value}" has confidence ${receipt.MerchantPhoneNumber?.confidence}`
  );
  console.log(
    `Transaction Date: ${receipt.TransactionDate?.value} has confidence ${receipt.TransactionDate?.confidence}`
  );
  console.log(
    `Transaction Time: ${receipt.TransactionTime?.value} has confidence ${receipt.TransactionTime?.confidence}`
  );

  if (receipt.Items) {
    console.log("Items:");
    for (const item of receipt.Items) {
      console.log(item);
      console.log(`  - Name: "${item.Name?.value}" has confidence ${item.Name?.confidence}`);
      console.log(
        `    Quantity: ${item.Quantity?.value} has confidence ${item.Quantity?.confidence}`
      );
      console.log(
        `    Individual Item Price: ${item.Price?.value} has confidence ${item.Price?.confidence}`
      );
      console.log(
        `    Total Price: ${item.TotalPrice?.value} has confidence ${item.TotalPrice?.confidence}`
      );
    }
  }

  console.log(
    `Subtotal: ${receipt.Subtotal?.value} has confidence ${receipt.Subtotal?.confidence}`
  );
  console.log(`Tax: ${receipt.Tax?.value} has confidence ${receipt.Tax?.confidence}`);
  console.log(`Tip: ${receipt.Tip?.value} has confidence ${receipt.Tip?.confidence}`);
  console.log(`Total: ${receipt.Total?.value} has confidence ${receipt.Total?.confidence}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
