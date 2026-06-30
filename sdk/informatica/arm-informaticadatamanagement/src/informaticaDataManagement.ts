// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  InformaticaDataManagementContext,
  InformaticaDataManagementOptionalParams,
} from "./api/index.js";
import { createInformaticaDataManagement } from "./api/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { OrganizationsOperations } from "./classic/organizations/index.js";
import { _getOrganizationsOperations } from "./classic/organizations/index.js";
import type { ServerlessRuntimesOperations } from "./classic/serverlessRuntimes/index.js";
import { _getServerlessRuntimesOperations } from "./classic/serverlessRuntimes/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { InformaticaDataManagementOptionalParams } from "./api/informaticaDataManagementContext.js";

export class InformaticaDataManagement {
  private _client: InformaticaDataManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: InformaticaDataManagementOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createInformaticaDataManagement(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.serverlessRuntimes = _getServerlessRuntimesOperations(this._client);
    this.organizations = _getOrganizationsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for serverlessRuntimes */
  public readonly serverlessRuntimes: ServerlessRuntimesOperations;
  /** The operation groups for organizations */
  public readonly organizations: OrganizationsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
