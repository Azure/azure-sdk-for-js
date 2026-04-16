// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  ConfluentManagementContext,
  ConfluentManagementClientOptionalParams,
} from "./api/index.js";
import { createConfluentManagement } from "./api/index.js";
import type { AccessOperations } from "./classic/access/index.js";
import { _getAccessOperations } from "./classic/access/index.js";
import type { ClusterOperations } from "./classic/cluster/index.js";
import { _getClusterOperations } from "./classic/cluster/index.js";
import type { ConnectorOperations } from "./classic/connector/index.js";
import { _getConnectorOperations } from "./classic/connector/index.js";
import type { EnvironmentOperations } from "./classic/environment/index.js";
import { _getEnvironmentOperations } from "./classic/environment/index.js";
import type { MarketplaceAgreementsOperations } from "./classic/marketplaceAgreements/index.js";
import { _getMarketplaceAgreementsOperations } from "./classic/marketplaceAgreements/index.js";
import type { OrganizationOperations } from "./classic/organization/index.js";
import { _getOrganizationOperations } from "./classic/organization/index.js";
import type { OrganizationOperationsOperations } from "./classic/organizationOperations/index.js";
import { _getOrganizationOperationsOperations } from "./classic/organizationOperations/index.js";
import type { TopicsOperations } from "./classic/topics/index.js";
import { _getTopicsOperations } from "./classic/topics/index.js";
import type { ValidationsOperations } from "./classic/validations/index.js";
import { _getValidationsOperations } from "./classic/validations/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { ConfluentManagementClientOptionalParams } from "./api/confluentManagementContext.js";

export class ConfluentManagementClient {
  private _client: ConfluentManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: ConfluentManagementClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: ConfluentManagementClientOptionalParams,
  );
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | ConfluentManagementClientOptionalParams,
    options?: ConfluentManagementClientOptionalParams,
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
    this._client = createConfluentManagement(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.validations = _getValidationsOperations(this._client);
    this.marketplaceAgreements = _getMarketplaceAgreementsOperations(this._client);
    this.topics = _getTopicsOperations(this._client);
    this.connector = _getConnectorOperations(this._client);
    this.cluster = _getClusterOperations(this._client);
    this.environment = _getEnvironmentOperations(this._client);
    this.access = _getAccessOperations(this._client);
    this.organization = _getOrganizationOperations(this._client);
    this.organizationOperations = _getOrganizationOperationsOperations(this._client);
  }

  /** The operation groups for validations */
  public readonly validations: ValidationsOperations;
  /** The operation groups for marketplaceAgreements */
  public readonly marketplaceAgreements: MarketplaceAgreementsOperations;
  /** The operation groups for topics */
  public readonly topics: TopicsOperations;
  /** The operation groups for connector */
  public readonly connector: ConnectorOperations;
  /** The operation groups for cluster */
  public readonly cluster: ClusterOperations;
  /** The operation groups for environment */
  public readonly environment: EnvironmentOperations;
  /** The operation groups for access */
  public readonly access: AccessOperations;
  /** The operation groups for organization */
  public readonly organization: OrganizationOperations;
  /** The operation groups for organizationOperations */
  public readonly organizationOperations: OrganizationOperationsOperations;
}
