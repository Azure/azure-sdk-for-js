// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  ServiceLinkerManagementContext,
  ServiceLinkerManagementClientOptionalParams,
} from "./api/index.js";
import { createServiceLinkerManagement } from "./api/index.js";
import type { ConfigurationNamesOperations } from "./classic/configurationNames/index.js";
import { _getConfigurationNamesOperations } from "./classic/configurationNames/index.js";
import type { ConnectorOperations } from "./classic/connector/index.js";
import { _getConnectorOperations } from "./classic/connector/index.js";
import type { LinkerOperations } from "./classic/linker/index.js";
import { _getLinkerOperations } from "./classic/linker/index.js";
import type { LinkersOperations } from "./classic/linkers/index.js";
import { _getLinkersOperations } from "./classic/linkers/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export { ServiceLinkerManagementClientOptionalParams } from "./api/serviceLinkerManagementContext.js";

export class ServiceLinkerManagementClient {
  private _client: ServiceLinkerManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Microsoft.ServiceLinker provider */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: ServiceLinkerManagementClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createServiceLinkerManagement(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.configurationNames = _getConfigurationNamesOperations(this._client);
    this.connector = _getConnectorOperations(this._client);
    this.linker = _getLinkerOperations(this._client);
    this.linkers = _getLinkersOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for configurationNames */
  public readonly configurationNames: ConfigurationNamesOperations;
  /** The operation groups for connector */
  public readonly connector: ConnectorOperations;
  /** The operation groups for linker */
  public readonly linker: LinkerOperations;
  /** The operation groups for linkers */
  public readonly linkers: LinkersOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
