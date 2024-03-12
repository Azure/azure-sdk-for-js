// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";
import {
  getOperations,
  Operations,
} from "./classic/operations/index.js";
import {
  getDataProductsCatalogs,
  DataProductsCatalogs,
} from "./classic/dataProductsCatalogs/index.js";
import {
  getDataTypes,
  DataTypes,
} from "./classic/dataTypes/index.js";
import {
  getDataProducts,
  DataProducts,
} from "./classic/dataProducts/index.js";
import {
  createNetworkAnalytics,
  NetworkAnalyticsClientOptions,
  NetworkAnalyticsContext,
} from "./api/index.js";

export { NetworkAnalyticsClientOptions } from "./api/NetworkAnalyticsContext.js";

export class NetworkAnalyticsClient {
  private _client: NetworkAnalyticsContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    credential: TokenCredential,
    options: NetworkAnalyticsClientOptions = {},
  ) {
    this._client = createNetworkAnalytics(credential, options);
    this.pipeline = this._client.pipeline;
    this.operations = getOperations(this._client);
    this.dataProductsCatalogs = getDataProductsCatalogs(this._client);
    this.dataTypes = getDataTypes(this._client);
    this.dataProducts = getDataProducts(this._client);
  }

  /** The operation groups for Operations */
  public readonly operations: Operations;
  /** The operation groups for DataProductsCatalogs */
  public readonly dataProductsCatalogs: DataProductsCatalogs;
  /** The operation groups for DataTypes */
  public readonly dataTypes: DataTypes;
  /** The operation groups for DataProducts */
  public readonly dataProducts: DataProducts;
}
