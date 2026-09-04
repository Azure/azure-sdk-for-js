// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MarketplaceContext, MarketplaceClientOptionalParams } from "./api/index.js";
import { createMarketplace } from "./api/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { RatingAndReviewsOperationsOperations } from "./classic/ratingAndReviewsOperations/index.js";
import { _getRatingAndReviewsOperationsOperations } from "./classic/ratingAndReviewsOperations/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { MarketplaceClientOptionalParams } from "./api/marketplaceContext.js";

export class MarketplaceClient {
  private _client: MarketplaceContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Microsoft Marketplace Rating And Reviews API */
  constructor(credential: TokenCredential, options: MarketplaceClientOptionalParams = {}) {
    this._client = createMarketplace(credential, options);
    this.pipeline = this._client.pipeline;
    this.ratingAndReviewsOperations = _getRatingAndReviewsOperationsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for ratingAndReviewsOperations */
  public readonly ratingAndReviewsOperations: RatingAndReviewsOperationsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
