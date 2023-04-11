// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Model:       prebuilt-document
// Description: Extract text, layout, entities, and general key-value pairs from documents.
// API Version: 2023-02-28-preview
// Created:     Thu Apr 06 2023

const fr = require("@azure/ai-form-recognizer");

/**
 * Extract text, layout, entities, and general key-value pairs from documents.
 */
const PrebuiltDocumentModel = fr.createModelFromSchema(modelInfo());

/**
 * The raw model schema.
 */
function modelInfo() {
  return {
    modelId: "prebuilt-document",
    description: "Extract text, layout, entities, and general key-value pairs from documents.",
    createdOn: "2023-02-28T00:00:00.000Z",
    apiVersion: "2023-02-28-preview",
  };
}

module.exports = { PrebuiltDocumentModel, PrebuiltDocumentResult };
