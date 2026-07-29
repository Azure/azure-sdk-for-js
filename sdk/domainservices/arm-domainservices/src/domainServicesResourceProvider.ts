// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  DomainServicesResourceProviderContext,
  DomainServicesResourceProviderOptionalParams,
} from "./api/index.js";
import { createDomainServicesResourceProvider } from "./api/index.js";
import type { DomainServiceOperationsOperations } from "./classic/domainServiceOperations/index.js";
import { _getDomainServiceOperationsOperations } from "./classic/domainServiceOperations/index.js";
import type { DomainServicesOperations } from "./classic/domainServices/index.js";
import { _getDomainServicesOperations } from "./classic/domainServices/index.js";
import type { OuContainerOperationGrpOperations } from "./classic/ouContainerOperationGrp/index.js";
import { _getOuContainerOperationGrpOperations } from "./classic/ouContainerOperationGrp/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { DomainServicesResourceProviderOptionalParams } from "./api/domainServicesResourceProviderContext.js";

export class DomainServicesResourceProvider {
  private _client: DomainServicesResourceProviderContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: DomainServicesResourceProviderOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: DomainServicesResourceProviderOptionalParams,
  );
  /** The AAD Domain Services API. */
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | DomainServicesResourceProviderOptionalParams,
    options?: DomainServicesResourceProviderOptionalParams,
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
    this._client = createDomainServicesResourceProvider(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.ouContainerOperationGrp = _getOuContainerOperationGrpOperations(this._client);
    this.domainServiceOperations = _getDomainServiceOperationsOperations(this._client);
    this.domainServices = _getDomainServicesOperations(this._client);
  }

  /** The operation groups for ouContainerOperationGrp */
  public readonly ouContainerOperationGrp: OuContainerOperationGrpOperations;
  /** The operation groups for domainServiceOperations */
  public readonly domainServiceOperations: DomainServiceOperationsOperations;
  /** The operation groups for domainServices */
  public readonly domainServices: DomainServicesOperations;
}
