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

import {
  FormRecognizerClient,
  AzureKeyCredential,
  FormField,
  FormPageRange
} from "@azure/ai-form-recognizer";

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
 * A `FormField` that is an array with a specific value type.
 */
type StrongArrayField<T> = Extract<FormField, { valueType?: "array" }> & {
  valueType: "array";
  value: T[];
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
  formType: "prebuilt:receipt";
  pageRange: FormPageRange;
  fields: {
    ReceiptType?: FormField; // example: "Itemized"
    MerchantName?: FormField;
    MerchantAddress?: FormField;
    MerchantPhoneNumber?: FormField;
    Items?: StrongArrayField<StrongObjectField<ReceiptItem>>;
    Subtotal?: FormField;
    Tax?: FormField;
    Tip?: FormField;
    Total?: FormField;
    TransactionDate?: FormField;
    TransactionTime?: FormField;
  };
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

  // NOTE: Not all fields will be present on every fields. It is important
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
