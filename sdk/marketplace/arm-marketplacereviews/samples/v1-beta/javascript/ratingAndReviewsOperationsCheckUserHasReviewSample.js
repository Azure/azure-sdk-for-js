// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MarketplaceClient } = require("@azure/arm-marketplacereviews");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to check user has review.
 *
 * @summary check user has review.
 * x-ms-original-file: 2023-01-01-preview/RatingAndReviews_CheckUserHasReview.json
 */
async function ratingAndReviewsCheckUserHasReview() {
  const credential = new DefaultAzureCredential();
  const client = new MarketplaceClient(credential);
  const result = await client.ratingAndReviewsOperations.checkUserHasReview("WA123456789");
  console.log(result);
}

async function main() {
  await ratingAndReviewsCheckUserHasReview();
}

main().catch(console.error);
