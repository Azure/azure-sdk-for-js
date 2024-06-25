// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * This sample shows how to get the details of a custom classifier by its ID, including information about the document
 * types that the classifier supports.
 *
 * @summary get information about a classifier by its ID
 */

const DocumentIntelligence = require("@azure-rest/ai-document-intelligence").default,
  { isUnexpected } = require("@azure-rest/ai-document-intelligence");

require("dotenv").config();

async function main() {
  const client = DocumentIntelligence(
    process.env["DOCUMENT_INTELLIGENCE_ENDPOINT"] || "<cognitive services endpoint>",
    { key: process.env["DOCUMENT_INTELLIGENCE_API_KEY"] || "<api key>" },
  );

  const classifierId = process.env.CUSTOM_CLASSIFIER_ID ?? "<classifier id>";
  const classifier = await client.path("/documentClassifiers/{classifierId}", classifierId).get();

  if (isUnexpected(classifier)) {
    throw classifier.body.error;
  }
  console.log("ID", classifier.body.classifierId);
  console.log("Created:", classifier.body.createdDateTime);
  console.log("Description: ", classifier.body.description || "<none>");

  console.log("Document Types:");
  for (const [docType, details] of Object.entries(classifier.body.docTypes || {})) {
    // We can also programmatically access a schema of the fields.
    console.log(`- Name "${docType}", source: ${JSON.stringify(details, null, 2)}`);
  }
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});
