// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  FileSharesContext,
  FileSharesClientOptionalParams,
  createFileShares,
} from "./api/index.js";
import {
  FileShareSnapshotsOperations,
  _getFileShareSnapshotsOperations,
} from "./classic/fileShareSnapshots/index.js";
import { FileSharesOperations, _getFileSharesOperations } from "./classic/fileShares/index.js";
import {
  InformationalOperationsOperations,
  _getInformationalOperationsOperations,
} from "./classic/informationalOperations/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import {
  PrivateEndpointConnectionsOperations,
  _getPrivateEndpointConnectionsOperations,
} from "./classic/privateEndpointConnections/index.js";
import {
  PrivateLinkResourcesOperations,
  _getPrivateLinkResourcesOperations,
} from "./classic/privateLinkResources/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { FileSharesClientOptionalParams } from "./api/fileSharesContext.js";

export class FileSharesClient {
  private _client: FileSharesContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: FileSharesClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: FileSharesClientOptionalParams,
  );
  /** Azure File Shares Resource Provider API. */
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | FileSharesClientOptionalParams,
    options?: FileSharesClientOptionalParams,
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
    this._client = createFileShares(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.privateLinkResources = _getPrivateLinkResourcesOperations(this._client);
    this.privateEndpointConnections = _getPrivateEndpointConnectionsOperations(this._client);
    this.informationalOperations = _getInformationalOperationsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
    this.fileShareSnapshots = _getFileShareSnapshotsOperations(this._client);
    this.fileShares = _getFileSharesOperations(this._client);
  }

  /** The operation groups for privateLinkResources */
  public readonly privateLinkResources: PrivateLinkResourcesOperations;
  /** The operation groups for privateEndpointConnections */
  public readonly privateEndpointConnections: PrivateEndpointConnectionsOperations;
  /** The operation groups for informationalOperations */
  public readonly informationalOperations: InformationalOperationsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
  /** The operation groups for fileShareSnapshots */
  public readonly fileShareSnapshots: FileShareSnapshotsOperations;
  /** The operation groups for fileShares */
  public readonly fileShares: FileSharesOperations;
}
