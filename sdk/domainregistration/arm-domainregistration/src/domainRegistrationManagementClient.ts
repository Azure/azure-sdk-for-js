// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  DomainRegistrationManagementContext,
  DomainRegistrationManagementClientOptionalParams,
} from "./api/index.js";
import { createDomainRegistrationManagement } from "./api/index.js";
import type { DomainRegistrationProviderOperations } from "./classic/domainRegistrationProvider/index.js";
import { _getDomainRegistrationProviderOperations } from "./classic/domainRegistrationProvider/index.js";
import type { DomainsOperations } from "./classic/domains/index.js";
import { _getDomainsOperations } from "./classic/domains/index.js";
import type { TopLevelDomainsOperations } from "./classic/topLevelDomains/index.js";
import { _getTopLevelDomainsOperations } from "./classic/topLevelDomains/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export { DomainRegistrationManagementClientOptionalParams } from "./api/domainRegistrationManagementContext.js";

export class DomainRegistrationManagementClient {
  private _client: DomainRegistrationManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    credential: TokenCredential,
    options?: DomainRegistrationManagementClientOptionalParams,
  );
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: DomainRegistrationManagementClientOptionalParams,
  );
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | DomainRegistrationManagementClientOptionalParams,
    options?: DomainRegistrationManagementClientOptionalParams,
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
    this._client = createDomainRegistrationManagement(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.domainRegistrationProvider = _getDomainRegistrationProviderOperations(this._client);
    this.topLevelDomains = _getTopLevelDomainsOperations(this._client);
    this.domains = _getDomainsOperations(this._client);
  }

  /** The operation groups for domainRegistrationProvider */
  public readonly domainRegistrationProvider: DomainRegistrationProviderOperations;
  /** The operation groups for topLevelDomains */
  public readonly topLevelDomains: TopLevelDomainsOperations;
  /** The operation groups for domains */
  public readonly domains: DomainsOperations;
}
