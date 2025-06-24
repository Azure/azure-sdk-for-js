// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary the constants used in the Azure AI Agents samples.
 */

const createAndPollDefaultOptions = {
  pollingOptions: {
    intervalInMs: 2000,
  },
  onResponse: (response) => {
    console.log(`Received response with status: ${response.parsedBody.status}`);
  },
};

module.exports = { createAndPollDefaultOptions };
