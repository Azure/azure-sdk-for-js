// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Model:       prebuilt-read
// Description: Extract text from documents.
// API Version: 2023-02-28-preview
// Created:     Thu Apr 06 2023

const fr = require("@azure/ai-form-recognizer");

/**
 * Extract text from documents.
 */
const PrebuiltReadModel = fr.createModelFromSchema(modelInfo());

/**
 * The raw model schema.
 */
function modelInfo() {
  return {
    modelId: "prebuilt-read",
    description: "Extract text from documents.",
    createdOn: "2023-02-28T00:00:00.000Z",
    apiVersion: "2023-02-28-preview",
  };
}

module.exports = { PrebuiltReadModel, PrebuiltReadResult };
