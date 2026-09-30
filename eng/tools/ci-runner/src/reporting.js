// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// @ts-check

/**
 * Log an actionable failure and publish it as an Azure Pipelines issue when
 * running in CI. Pipeline issues are forwarded to the associated GitHub check.
 *
 * @param {string} message
 */
export function reportFailure(message) {
  console.error(message);

  if (process.env.TF_BUILD) {
    const escapedMessage = message
      .replaceAll("%", "%AZP25")
      .replaceAll("\r", "%0D")
      .replaceAll("\n", "%0A");
    console.log(`##vso[task.logissue type=error]${escapedMessage}`);
  }
}
