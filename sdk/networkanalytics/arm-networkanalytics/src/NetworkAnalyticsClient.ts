// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";
import {
  getOperationsOperations,
  OperationsOperations,
} from "./classic/operations/index.js";
import {
  getDataProductsCatalogsOperations,
  DataProductsCatalogsOperations,
} from "./classic/dataProductsCatalogs/index.js";
import {
  getDataTypesOperations,
  DataTypesOperations,
} from "./classic/dataTypes/index.js";
import {
  getDataProductsOperations,
  DataProductsOperations,
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
    this.operations = getOperationsOperations(this._client);
    this.dataProductsCatalogs = getDataProductsCatalogsOperations(this._client);
    this.dataTypes = getDataTypesOperations(this._client);
    this.dataProducts = getDataProductsOperations(this._client);
  }

  /** The operation groups for Operations */
  public readonly operations: OperationsOperations;
  /** The operation groups for DataProductsCatalogs */
  public readonly dataProductsCatalogs: DataProductsCatalogsOperations;
  /** The operation groups for DataTypes */
  public readonly dataTypes: DataTypesOperations;
  /** The operation groups for DataProducts */
  public readonly dataProducts: DataProductsOperations;
}
