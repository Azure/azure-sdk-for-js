// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * This sample shows how to extract elements of an identity document (such as a driver license or passport) from a URL
 * to a file using the prebuilt identity document model.
 *
 * The prebuilt identity document model can return several fields. For a detailed list of the fields supported by the
 * identity document model, see the `IdentityDocument` type in the documentation, or refer to the following link:
 *
 * https://aka.ms/azsdk/formrecognizer/iddocumentfieldschema
 *
 * @summary extract data from an identity document
 */

import {
  AzureKeyCredential,
  DocumentAnalysisClient,
  PrebuiltModels,
} from "@azure/ai-form-recognizer";

import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const endpoint = process.env.FORM_RECOGNIZER_ENDPOINT ?? "<endpoint>";
  const credential = new AzureKeyCredential(process.env.FORM_RECOGNIZER_API_KEY ?? "<api key>");

  const client = new DocumentAnalysisClient(endpoint, credential);

  const poller = await client.beginAnalyzeDocuments(
    PrebuiltModels.IdentityDocument,
    // The form recognizer service will access the following URL to a driver license image and extract data from it
    "https://raw.githubusercontent.com/Azure/azure-sdk-for-js/main/sdk/formrecognizer/ai-form-recognizer/assets/identityDocument/license.jpg"
  );

  const {
    documents: [result],
  } = await poller.pollUntilDone();

  // Use of PrebuiltModels.Receipt above (rather than the raw model ID), adds strong typing of the model's output
  if (result) {
    // The identity document model has multiple document types, so we need to know which document type was actually
    // extracted.
    if (result.docType === "prebuilt:idDocument:driverLicense") {
      const driverLicense = result.fields;

      // For the sake of the example, we'll only show a few of the fields that are produced.
      console.log("Extracted a Driver License:");
      console.log("  Name:", driverLicense.firstName?.value, driverLicense.lastName?.value);
      console.log("  License No.:", driverLicense.documentNumber?.value);
      console.log("  Date of Birth:", driverLicense.dateOfBirth?.value);
      console.log("  Expiration:", driverLicense.documentNumber?.value);
    } else if (result.docType === "prebuilt:idDocument:passport") {
      const passport = result.fields;

      // The passport document type extracts and parses the Passport's machine-readable zone
      const fields = passport.machineReadableZone?.properties;
      console.log("Extracted a Passport:");
      console.log("  Name:", fields?.firstName?.value, fields?.lastName?.value);
      console.log("  Date of Birth:", fields?.dateOfBirth?.value);
      console.log("  Nationality:", fields?.nationality?.value);
      console.log("  Passport No.:", fields?.documentNumber?.value);
      console.log("  Issuer:", fields?.countryRegion?.value);
      console.log("  Expiration Date:", fields?.dateOfExpiration?.value);
    } else {
      // The only reason this would happen is if the client library's schema for the prebuilt identity document model is
      // out of date, and a new document type has been introduced.
      console.error("Unknown document type in result:", result);
    }
  } else {
    throw new Error("Expected at least one receipt in the result.");
  }
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});
