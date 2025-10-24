// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  NotificationHubsManagementContext,
  NotificationHubsManagementClientOptionalParams,
} from "./api/index.js";
import { createNotificationHubsManagement } from "./api/index.js";
import type { NamespacesOperations } from "./classic/namespaces/index.js";
import { _getNamespacesOperations } from "./classic/namespaces/index.js";
import type { NotificationHubsOperations } from "./classic/notificationHubs/index.js";
import { _getNotificationHubsOperations } from "./classic/notificationHubs/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { PrivateEndpointConnectionsOperations } from "./classic/privateEndpointConnections/index.js";
import { _getPrivateEndpointConnectionsOperations } from "./classic/privateEndpointConnections/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

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
