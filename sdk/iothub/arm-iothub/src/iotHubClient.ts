// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IotHubContext, IotHubClientOptionalParams, createIotHub } from "./api/index.js";
import {
  CertificatesOperations,
  _getCertificatesOperations,
} from "./classic/certificates/index.js";
import { IotHubOperations, _getIotHubOperations } from "./classic/iotHub/index.js";
import {
  IotHubResourceOperations,
  _getIotHubResourceOperations,
} from "./classic/iotHubResource/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import {
  PrivateEndpointConnectionsOperations,
  _getPrivateEndpointConnectionsOperations,
} from "./classic/privateEndpointConnections/index.js";
import {
  PrivateLinkResourcesOperationsOperations,
  _getPrivateLinkResourcesOperationsOperations,
} from "./classic/privateLinkResourcesOperations/index.js";
import {
  ResourceProviderCommonOperations,
  _getResourceProviderCommonOperations,
} from "./classic/resourceProviderCommon/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { IotHubClientOptionalParams } from "./api/iotHubContext.js";

export class IotHubClient {
  private _client: IotHubContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: IotHubClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: IotHubClientOptionalParams,
  );
  /** Use this API to manage the IoT hubs in your Azure subscription. */
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | IotHubClientOptionalParams,
    options?: IotHubClientOptionalParams,
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
    this._client = createIotHub(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.resourceProviderCommon = _getResourceProviderCommonOperations(this._client);
    this.privateLinkResourcesOperations = _getPrivateLinkResourcesOperationsOperations(
      this._client,
    );
    this.certificates = _getCertificatesOperations(this._client);
    this.iotHub = _getIotHubOperations(this._client);
    this.iotHubResource = _getIotHubResourceOperations(this._client);
    this.privateEndpointConnections = _getPrivateEndpointConnectionsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for resourceProviderCommon */
  public readonly resourceProviderCommon: ResourceProviderCommonOperations;
  /** The operation groups for privateLinkResourcesOperations */
  public readonly privateLinkResourcesOperations: PrivateLinkResourcesOperationsOperations;
  /** The operation groups for certificates */
  public readonly certificates: CertificatesOperations;
  /** The operation groups for iotHub */
  public readonly iotHub: IotHubOperations;
  /** The operation groups for iotHubResource */
  public readonly iotHubResource: IotHubResourceOperations;
  /** The operation groups for privateEndpointConnections */
  public readonly privateEndpointConnections: PrivateEndpointConnectionsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
