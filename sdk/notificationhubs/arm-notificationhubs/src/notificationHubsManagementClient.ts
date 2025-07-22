// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  createNotificationHubsManagement,
  NotificationHubsManagementContext,
  NotificationHubsManagementClientOptionalParams,
} from "./api/index.js";
import {
  PrivateEndpointConnectionsOperations,
  _getPrivateEndpointConnectionsOperations,
} from "./classic/privateEndpointConnections/index.js";
import {
  NotificationHubsOperations,
  _getNotificationHubsOperations,
} from "./classic/notificationHubs/index.js";
import { NamespacesOperations, _getNamespacesOperations } from "./classic/namespaces/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import { Pipeline } from "@azure/core-rest-pipeline";
import { TokenCredential } from "@azure/core-auth";

export { NotificationHubsManagementClientOptionalParams } from "./api/notificationHubsManagementContext.js";

export class NotificationHubsManagementClient {
  private _client: NotificationHubsManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Microsoft Notification Hubs Resource Provider REST API. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: NotificationHubsManagementClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createNotificationHubsManagement(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.privateEndpointConnections = _getPrivateEndpointConnectionsOperations(this._client);
    this.notificationHubs = _getNotificationHubsOperations(this._client);
    this.namespaces = _getNamespacesOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for privateEndpointConnections */
  public readonly privateEndpointConnections: PrivateEndpointConnectionsOperations;
  /** The operation groups for notificationHubs */
  public readonly notificationHubs: NotificationHubsOperations;
  /** The operation groups for namespaces */
  public readonly namespaces: NamespacesOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
