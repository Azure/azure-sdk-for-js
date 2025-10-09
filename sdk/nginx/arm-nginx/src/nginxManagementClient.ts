// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NginxManagementContext, NginxManagementClientOptionalParams } from "./api/index.js";
import { createNginxManagement } from "./api/index.js";
import type { ApiKeysOperations } from "./classic/apiKeys/index.js";
import { _getApiKeysOperations } from "./classic/apiKeys/index.js";
import type { CertificatesOperations } from "./classic/certificates/index.js";
import { _getCertificatesOperations } from "./classic/certificates/index.js";
import type { ConfigurationsOperations } from "./classic/configurations/index.js";
import { _getConfigurationsOperations } from "./classic/configurations/index.js";
import type { DefaultWafPolicyOperations } from "./classic/defaultWafPolicy/index.js";
import { _getDefaultWafPolicyOperations } from "./classic/defaultWafPolicy/index.js";
import type { DeploymentsOperations } from "./classic/deployments/index.js";
import { _getDeploymentsOperations } from "./classic/deployments/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { WafPolicyOperations } from "./classic/wafPolicy/index.js";
import { _getWafPolicyOperations } from "./classic/wafPolicy/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export { NginxManagementClientOptionalParams } from "./api/nginxManagementContext.js";

export class NginxManagementClient {
  private _client: NginxManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: NginxManagementClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createNginxManagement(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.configurations = _getConfigurationsOperations(this._client);
    this.certificates = _getCertificatesOperations(this._client);
    this.defaultWafPolicy = _getDefaultWafPolicyOperations(this._client);
    this.wafPolicy = _getWafPolicyOperations(this._client);
    this.deployments = _getDeploymentsOperations(this._client);
    this.apiKeys = _getApiKeysOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for configurations */
  public readonly configurations: ConfigurationsOperations;
  /** The operation groups for certificates */
  public readonly certificates: CertificatesOperations;
  /** The operation groups for defaultWafPolicy */
  public readonly defaultWafPolicy: DefaultWafPolicyOperations;
  /** The operation groups for wafPolicy */
  public readonly wafPolicy: WafPolicyOperations;
  /** The operation groups for deployments */
  public readonly deployments: DeploymentsOperations;
  /** The operation groups for apiKeys */
  public readonly apiKeys: ApiKeysOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
