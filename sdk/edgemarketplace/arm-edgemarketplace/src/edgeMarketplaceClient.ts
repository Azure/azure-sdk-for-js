// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EdgeMarketplaceContext, EdgeMarketplaceClientOptionalParams } from "./api/index.js";
import { createEdgeMarketplace } from "./api/index.js";
import type { OffersOperations } from "./classic/offers/index.js";
import { _getOffersOperations } from "./classic/offers/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { PublishersOperations } from "./classic/publishers/index.js";
import { _getPublishersOperations } from "./classic/publishers/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export { EdgeMarketplaceClientOptionalParams } from "./api/edgeMarketplaceContext.js";

export class EdgeMarketplaceClient {
  private _client: EdgeMarketplaceContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: EdgeMarketplaceClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: EdgeMarketplaceClientOptionalParams,
  );
  /** Edge marketplace extensions */
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | EdgeMarketplaceClientOptionalParams,
    options?: EdgeMarketplaceClientOptionalParams,
  ) {
    let subscriptionId: string | undefined;

    if (typeof subscriptionIdOrOptions === "string") {
      subscriptionId = subscriptionIdOrOptions;
    } else if (typeof subscriptionIdOrOptions === "object") {
      options = subscriptionIdOrOptions;
    }

    options = options ?? {};
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createEdgeMarketplace(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.publishers = _getPublishersOperations(this._client);
    this.offers = _getOffersOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for publishers */
  public readonly publishers: PublishersOperations;
  /** The operation groups for offers */
  public readonly offers: OffersOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
