// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * This sample shows how to extract elements of a business card from a URL to a file using the prebuilt business card
 * model.
 *
 * The prebuilt business card model can return several fields. For a detailed list of the fields supported by the
 * business card model, see the `BusinessCard` type in the documentation, or refer to the following link:
 *
 * https://aka.ms/azsdk/formrecognizer/businesscardfieldschema
 *
 * @summary extract data from a business card document
 */

import {
  AzureKeyCredential,
  DocumentAnalysisClient,
  PrebuiltModels,
} from "@azure/ai-form-recognizer";

import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const endpoint = process.env.FORM_RECOGNIZER_ENDPOINT || "<endpoint>";
  const credential = new AzureKeyCredential(process.env.FORM_RECOGNIZER_API_KEY || "<api key>");

  const client = new DocumentAnalysisClient(endpoint, credential);

  const poller = await client.beginAnalyzeDocument(
    PrebuiltModels.BusinessCard,
    // The form recognizer service will access the following URL to a business card image and extract data from it
    "https://raw.githubusercontent.com/Azure/azure-sdk-for-js/main/sdk/formrecognizer/ai-form-recognizer/assets/businessCard/business-card-english.jpg"
  );

  const {
    documents: [result],
  } = await poller.pollUntilDone();

  // Use of PrebuiltModels.Receipt above (rather than the raw model ID), adds strong typing of the model's output
  if (result) {
    const businessCard = result.fields;
    console.log("=== Business Card Information ===");

    // There are more fields than just these few, and the model allows for multiple contact & company names as well as
    // phone numbers, though we'll only show the first extracted values here.
    const name = businessCard.contactNames && businessCard.contactNames.values[0];
    if (name) {
      const { firstName, lastName } = name.properties;
      console.log("Name:", firstName && firstName.value, lastName && lastName.value);
    }

    const company = businessCard.companyNames && businessCard.companyNames.values[0];
    if (company) {
      console.log("Company:", company.value);
    }

    const address = businessCard.addresses && businessCard.addresses.values[0];
    if (address) {
      console.log("Address:", address.value);
    }
  } else {
    throw new Error("Expected at least one business card in the result.");
  }
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});
