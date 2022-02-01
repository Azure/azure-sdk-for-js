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

import {
  AzureKeyCredential,
  DocumentAnalysisClient,
  PrebuiltModels,
} from "@azure/ai-form-recognizer";

import fs from "fs";
import path from "path";

import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const endpoint = process.env.FORM_RECOGNIZER_ENDPOINT ?? "<endpoint>";
  const credential = new AzureKeyCredential(process.env.FORM_RECOGNIZER_API_KEY ?? "<api key>");

  const file = fs.readFileSync(path.join(".", "assets", "w2", "gold_simple_w2.png"));

  const client = new DocumentAnalysisClient(endpoint, credential);

  const poller = await client.beginAnalyzeDocument(PrebuiltModels.TaxUsW2, file);

  const {
    documents: [result],
  } = await poller.pollUntilDone();

  if (result) {
    const w2 = result.fields;

    const employee = w2.employee?.properties;
    if (employee) {
      console.log("Employee:");
      console.log("  Name:", employee.name?.value);
      console.log("  Address:", employee.address?.value);
      console.log("  ZIP Code:", employee.zipCode?.value);
      console.log("  SSN/TIN:", employee.socialSecurityNumber?.value);
    } else {
      console.log("No employee information extracted.");
    }

    const employer = w2.employer?.properties;
    if (employer) {
      console.log("Employer:");
      console.log("  Name:", employer.name?.value);
      console.log("  Address:", employer.address?.value);
      console.log("  ZIP Code:", employer.zipCode?.value);
      console.log("  ID (EIN):", employer.idNumber?.value);
    } else {
      console.log("No employer information extracted.");
    }

    console.log("Control Number:", w2.controlNumber?.value);
    console.log("Tax Year:", w2.taxYear?.value);

    // The Prebuilt Model has many other fields for a variety of different scenarios. Please see the documentation of
    // the `TaxUsW2` type or refer to the following link: https://aka.ms/azsdk/formrecognizer/taxusw2fieldschema

    if (w2.additionalInfo?.values) {
      console.log("Additional Info:");

      for (const {
        properties: { amount, letterCode },
      } of w2.additionalInfo.values) {
        console.log(`- ${letterCode?.value}: ${amount?.value}`);
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
