// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MarketplaceContext, MarketplaceClientOptionalParams } from "./api/index.js";
import { createMarketplace } from "./api/index.js";
import { queryRules, setCollectionRules, queryUserRules } from "./api/operations.js";
import type {
  QueryRulesOptionalParams,
  SetCollectionRulesOptionalParams,
  QueryUserRulesOptionalParams,
} from "./api/options.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { PrivateStoreOperations } from "./classic/privateStore/index.js";
import { _getPrivateStoreOperations } from "./classic/privateStore/index.js";
import type { PrivateStoreCollectionOperations } from "./classic/privateStoreCollection/index.js";
import { _getPrivateStoreCollectionOperations } from "./classic/privateStoreCollection/index.js";
import type { PrivateStoreCollectionOfferOperations } from "./classic/privateStoreCollectionOffer/index.js";
import { _getPrivateStoreCollectionOfferOperations } from "./classic/privateStoreCollectionOffer/index.js";
import type { RuleListResponse } from "./models/models.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { MarketplaceClientOptionalParams } from "./api/marketplaceContext.js";

export class MarketplaceClient {
  private _client: MarketplaceContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** REST APIs for Private Marketplace */
  constructor(credential: TokenCredential, options: MarketplaceClientOptionalParams = {}) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createMarketplace(credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.privateStoreCollectionOffer = _getPrivateStoreCollectionOfferOperations(this._client);
    this.privateStoreCollection = _getPrivateStoreCollectionOperations(this._client);
    this.privateStore = _getPrivateStoreOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** Get a list of all private store rules in the given private store and collection */
  queryRules(
    privateStoreId: string,
    collectionId: string,
    options: QueryRulesOptionalParams = { requestOptions: {} },
  ): Promise<RuleListResponse> {
    return queryRules(this._client, privateStoreId, collectionId, options);
  }

  /** Set rule for specific private store and collection */
  setCollectionRules(
    privateStoreId: string,
    collectionId: string,
    options: SetCollectionRulesOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return setCollectionRules(this._client, privateStoreId, collectionId, options);
  }

  /** All rules approved in the private store that are relevant for user subscriptions */
  queryUserRules(
    privateStoreId: string,
    options: QueryUserRulesOptionalParams = { requestOptions: {} },
  ): Promise<RuleListResponse> {
    return queryUserRules(this._client, privateStoreId, options);
  }

  /** The operation groups for privateStoreCollectionOffer */
  public readonly privateStoreCollectionOffer: PrivateStoreCollectionOfferOperations;
  /** The operation groups for privateStoreCollection */
  public readonly privateStoreCollection: PrivateStoreCollectionOperations;
  /** The operation groups for privateStore */
  public readonly privateStore: PrivateStoreOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
