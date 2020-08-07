// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to assign a RecognizedForm to a strongly-typed
 * object with known fields.
 *
 * We use the pre-trained receipt model as an example, but a similar approach could
 * be used with any custom form as long as you properly update the fields' names
 * and types.
 */

import { FormRecognizerClient, AzureKeyCredential, FormField } from "@azure/ai-form-recognizer";

import * as fs from "fs";
import * as os from "os";
import * as path from "path";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

/**
 * A `FormField` that is an object with a specific shape (defined by the type
 * parameter T).
 */
type StrongObjectField<T> = Extract<FormField, { valueType?: "object" }> & {
  valueType: "object";
  value: T;
};

/**
 * A Receipt returned by the Receipt Recognition method.
 *
 * This type was accurate for a United States-based receipt at the time of
 * writing, but isn't guaranteed to be stable.
 *
 ( For a list of fields that are contained in the response, please refer to the "Supported fields" section at the following link: https://aka.ms/azsdk/formrecognizer/receiptfields
 */
interface USReceipt {
  ReceiptType?: FormField; // example: "Itemized"
  MerchantName?: FormField;
  MerchantAddress?: FormField;
  MerchantPhoneNumber?: FormField;
  Items?: Array<StrongObjectField<ReceiptItem>>;
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
  const poller = await client.beginRecognizeReceipts(readStream, {
    contentType: "image/jpeg",
    onProgress: (state) => {
      console.log(`status: ${state.status}`);
    }
  });

  const receiptResponse = await poller.pollUntilDone();

  if (!receiptResponse || receiptResponse.length <= 0) {
    throw new Error("Expecting at lease one receipt in analysis result");
  }

  // Cast the receipts in the response to our typed model, then extract
  // the first one (we only sent one receipt to the service)
  const [receipt] = receiptResponse as USReceipt[];

  // NOTE: Not all fields will be present on every receipt. It is important
  // to check which fields were identified. In this example, we will simply
  // print "undefined" for any fields that are not present.

  console.log(
    [
      `Receipt Type: "${receipt.ReceiptType?.value}" has confidence ${receipt.ReceiptType?.confidence}`,
      `Merchant Name: "${receipt.MerchantName?.value}" has confidence ${receipt.MerchantName?.confidence}`,
      `Merchant Address: "${receipt.MerchantAddress?.value}" has confidence ${receipt.MerchantAddress?.confidence}`,
      `Merchant Phone Number: "${receipt.MerchantPhoneNumber?.value}" has confidence ${receipt.MerchantPhoneNumber?.confidence}`,
      `Transaction Date: ${receipt.TransactionDate?.value} has confidence ${receipt.TransactionDate?.confidence}`,
      `Transaction Time: ${receipt.TransactionTime?.value} has confidence ${receipt.TransactionTime?.confidence}`
    ].join(os.EOL)
  );

  if (receipt.Items) {
    console.log("Items:");
    for (const { value: item } of receipt.Items) {
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
      `Subtotal: ${receipt.Subtotal?.value} has confidence ${receipt.Subtotal?.confidence}`,
      `Tax: ${receipt.Tax?.value} has confidence ${receipt.Tax?.confidence}`,
      `Tip: ${receipt.Tip?.value} has confidence ${receipt.Tip?.confidence}`,
      `Total: ${receipt.Total?.value} has confidence ${receipt.Total?.confidence}`
    ].join(os.EOL)
  );
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
