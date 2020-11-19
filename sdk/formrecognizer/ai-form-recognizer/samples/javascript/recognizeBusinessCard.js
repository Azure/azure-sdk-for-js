// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to recognize elements of a business card from a file.
 */

const { FormRecognizerClient, AzureKeyCredential } = require("@azure/ai-form-recognizer");

const fs = require("fs");
const path = require("path");

// Load the .env file if it exists
const dotenv = require("dotenv");
dotenv.config();

async function main() {
  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["FORM_RECOGNIZER_ENDPOINT"] || "<cognitive services endpoint>";
  const apiKey = process.env["FORM_RECOGNIZER_API_KEY"] || "<api key>";
  const fileName = path.join(__dirname, "./assets/business-card-english.jpg");

  if (!fs.existsSync(fileName)) {
    throw new Error(`Expecting file ${fileName} exists`);
  }

  const readStream = fs.createReadStream(fileName);

  const client = new FormRecognizerClient(endpoint, new AzureKeyCredential(apiKey));
  const poller = await client.beginRecognizeBusinessCards(readStream, {
    contentType: "image/jpeg",
    onProgress: (state) => {
      console.log(`status: ${state.status}`);
    }
  });

  const [businessCard] = await poller.pollUntilDone();

  if (businessCard === undefined) {
    throw new Error("Expecting at lease one business card in analysis result");
  }

  // For a list of fields that are contained in the response, please refer to the "Supported fields" section at the following link: https://aka.ms/azsdk/formrecognizer/businesscardfields

  const contactNames = businessCard.fields["ContactNames"].value;
  if (Array.isArray(contactNames)) {
    console.log("Contact Names:");
    for (const contactName of contactNames) {
      if (contactName.valueType === "object") {
        const firstName = contactName.value["FirstName"].value || "<no first name>";
        const lastName = contactName.value["LastName"].value || "<no last name>";
        console.log(`- ${firstName} ${lastName} (${contactName.confidence} confidence)`);
      }
    }
  }

  // The rest of the fields are simple arrays, so we will use a heler function to print them
  printSimpleArrayField(businessCard, "CompanyNames");
  printSimpleArrayField(businessCard, "Departments");
  printSimpleArrayField(businessCard, "JobTitles");
  printSimpleArrayField(businessCard, "Emails");
  printSimpleArrayField(businessCard, "Websites");
  printSimpleArrayField(businessCard, "Addresses");
  printSimpleArrayField(businessCard, "MobilePhones");
  printSimpleArrayField(businessCard, "Faxes");
  printSimpleArrayField(businessCard, "WorkPhones");
  printSimpleArrayField(businessCard, "OtherPhones");
}

/**
 * This is a helper function to print the values of simple array fields, where
 * the values in the array can be printed directly without any additional
 * processing.
 */
function printSimpleArrayField(businessCard, fieldName) {
  const fieldValues = businessCard.fields[fieldName].value;
  if (Array.isArray(fieldValues)) {
    console.log(`${fieldName}:`);
    for (const item of fieldValues) {
      console.log(`- ${item.value || "<no value>"} (${item.confidence} confidence)`);
    }
  } else if (fieldValues === undefined) {
    console.log(`No ${fieldName} were found in the document.`);
  } else {
    console.error(
      `Error: expected field "${fieldName}" to be an Array, but it was a(n) ${businessCard.fields[fieldName].valueType}`
    );
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
