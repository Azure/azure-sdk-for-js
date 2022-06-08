// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * This sample shows how to extract elements of a United States W2 tax form from a file using the prebuilt US W2 model.
 *
 * The prebuilt W2 model can return several fields. For a detailed list of the fields supported by the model, see the
 * `TaxUsW2` type in the documentation, or refer to the following link:
 *
 * https://aka.ms/azsdk/formrecognizer/taxusw2fieldschema
 *
 * @summary extract data from a United States W2 tax document
 */

const {
  AzureKeyCredential,
  DocumentAnalysisClient,
  PrebuiltModels,
} = require("@azure/ai-form-recognizer");

const fs = require("fs");
const path = require("path");

require("dotenv").config();

async function main() {
  const endpoint = process.env.FORM_RECOGNIZER_ENDPOINT || "<endpoint>";
  const credential = new AzureKeyCredential(process.env.FORM_RECOGNIZER_API_KEY || "<api key>");

  const file = fs.readFileSync(path.join(".", "assets", "w2", "w2-single.png"));

  const client = new DocumentAnalysisClient(endpoint, credential);

  const poller = await client.beginAnalyzeDocument(PrebuiltModels.TaxUsW2, file);

  const {
    documents: [result],
  } = await poller.pollUntilDone();

  if (result) {
    const { employee, employer, controlNumber, taxYear, additionalInfo } = result.fields;

    if (employee) {
      const { name, address, socialSecurityNumber } = employee.properties;
      console.log("Employee:");
      console.log("  Name:", name && name.value);
      console.log("  SSN/TIN:", socialSecurityNumber && socialSecurityNumber.value);

      if (address && address.value) {
        const { streetAddress, postalCode } = address.value;
        console.log("  Address:");
        console.log("    Street Address:", streetAddress);
        console.log("    Postal Code:", postalCode);
      }
    } else {
      console.log("No employee information extracted.");
    }

    if (employer) {
      const { name, address, idNumber } = employer.properties;
      console.log("Employer:");
      console.log("  Name:", name && name.value);
      console.log("  ID (EIN):", idNumber && idNumber.value);

      if (address && address.value) {
        const { streetAddress, postalCode } = address.value;
        console.log("  Address:");
        console.log("    Street Address:", streetAddress);
        console.log("    Postal Code:", postalCode);
      }
    } else {
      console.log("No employer information extracted.");
    }

    console.log("Control Number:", controlNumber && controlNumber.value);
    console.log("Tax Year:", taxYear && taxYear.value);

    // The Prebuilt Model has many other fields for a variety of different scenarios. Please see the documentation of
    // the `TaxUsW2` type or refer to the following link: https://aka.ms/azsdk/formrecognizer/taxusw2fieldschema

    if (additionalInfo) {
      console.log("Additional Info:");

      for (const info of additionalInfo.values) {
        const { letterCode, amount } = info.properties;
        console.log(`- ${letterCode && letterCode.value}: ${amount && amount.value}`);
      }
    }
  } else {
    throw new Error("Expected at least one document in the result.");
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
