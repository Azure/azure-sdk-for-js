// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CdnManagementContext, CdnManagementClientOptionalParams } from "./api/index.js";
import { createCdnManagement } from "./api/index.js";
import {
  validateProbe,
  checkNameAvailabilityWithSubscription,
  checkNameAvailability,
  checkEndpointNameAvailability,
} from "./api/operations.js";
import type {
  ValidateProbeOptionalParams,
  CheckNameAvailabilityWithSubscriptionOptionalParams,
  CheckNameAvailabilityOptionalParams,
  CheckEndpointNameAvailabilityOptionalParams,
} from "./api/options.js";
import type { AFDCustomDomainsOperations } from "./classic/afdCustomDomains/index.js";
import { _getAFDCustomDomainsOperations } from "./classic/afdCustomDomains/index.js";
import type { AFDEndpointsOperations } from "./classic/afdEndpoints/index.js";
import { _getAFDEndpointsOperations } from "./classic/afdEndpoints/index.js";
import type { AFDOriginGroupsOperations } from "./classic/afdOriginGroups/index.js";
import { _getAFDOriginGroupsOperations } from "./classic/afdOriginGroups/index.js";
import type { AFDOriginsOperations } from "./classic/afdOrigins/index.js";
import { _getAFDOriginsOperations } from "./classic/afdOrigins/index.js";
import type { AFDProfilesOperations } from "./classic/afdProfiles/index.js";
import { _getAFDProfilesOperations } from "./classic/afdProfiles/index.js";
import type { CustomDomainsOperations } from "./classic/customDomains/index.js";
import { _getCustomDomainsOperations } from "./classic/customDomains/index.js";
import type { EdgeNodesOperations } from "./classic/edgeNodes/index.js";
import { _getEdgeNodesOperations } from "./classic/edgeNodes/index.js";
import type { EndpointsOperations } from "./classic/endpoints/index.js";
import { _getEndpointsOperations } from "./classic/endpoints/index.js";
import type { LogAnalyticsOperations } from "./classic/logAnalytics/index.js";
import { _getLogAnalyticsOperations } from "./classic/logAnalytics/index.js";
import type { ManagedRuleSetsOperations } from "./classic/managedRuleSets/index.js";
import { _getManagedRuleSetsOperations } from "./classic/managedRuleSets/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { OriginGroupsOperations } from "./classic/originGroups/index.js";
import { _getOriginGroupsOperations } from "./classic/originGroups/index.js";
import type { OriginsOperations } from "./classic/origins/index.js";
import { _getOriginsOperations } from "./classic/origins/index.js";
import type { PoliciesOperations } from "./classic/policies/index.js";
import { _getPoliciesOperations } from "./classic/policies/index.js";
import type { ProfilesOperations } from "./classic/profiles/index.js";
import { _getProfilesOperations } from "./classic/profiles/index.js";
import type { ResourceUsageOperationsOperations } from "./classic/resourceUsageOperations/index.js";
import { _getResourceUsageOperationsOperations } from "./classic/resourceUsageOperations/index.js";
import type { RoutesOperations } from "./classic/routes/index.js";
import { _getRoutesOperations } from "./classic/routes/index.js";
import type { RuleSetsOperations } from "./classic/ruleSets/index.js";
import { _getRuleSetsOperations } from "./classic/ruleSets/index.js";
import type { RulesOperations } from "./classic/rules/index.js";
import { _getRulesOperations } from "./classic/rules/index.js";
import type { SecretsOperations } from "./classic/secrets/index.js";
import { _getSecretsOperations } from "./classic/secrets/index.js";
import type { SecurityPoliciesOperations } from "./classic/securityPolicies/index.js";
import { _getSecurityPoliciesOperations } from "./classic/securityPolicies/index.js";
import type {
  CheckEndpointNameAvailabilityInput,
  CheckEndpointNameAvailabilityOutput,
  CheckNameAvailabilityInput,
  CheckNameAvailabilityOutput,
  ValidateProbeInput,
  ValidateProbeOutput,
} from "./models/models.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { CdnManagementClientOptionalParams } from "./api/cdnManagementContext.js";

export class CdnManagementClient {
  private _client: CdnManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: CdnManagementClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: CdnManagementClientOptionalParams,
  );
  /** Use these APIs to manage Azure Front Door and CDN resources through the Azure Resource Manager. You must make sure that requests made to these resources are secure. */
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | CdnManagementClientOptionalParams,
    options?: CdnManagementClientOptionalParams,
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
    this._client = createCdnManagement(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.managedRuleSets = _getManagedRuleSetsOperations(this._client);
    this.edgeNodes = _getEdgeNodesOperations(this._client);
    this.resourceUsageOperations = _getResourceUsageOperationsOperations(this._client);
    this.policies = _getPoliciesOperations(this._client);
    this.logAnalytics = _getLogAnalyticsOperations(this._client);
    this.afdProfiles = _getAFDProfilesOperations(this._client);
    this.afdCustomDomains = _getAFDCustomDomainsOperations(this._client);
    this.customDomains = _getCustomDomainsOperations(this._client);
    this.originGroups = _getOriginGroupsOperations(this._client);
    this.origins = _getOriginsOperations(this._client);
    this.endpoints = _getEndpointsOperations(this._client);
    this.secrets = _getSecretsOperations(this._client);
    this.securityPolicies = _getSecurityPoliciesOperations(this._client);
    this.rules = _getRulesOperations(this._client);
    this.ruleSets = _getRuleSetsOperations(this._client);
    this.routes = _getRoutesOperations(this._client);
    this.afdOrigins = _getAFDOriginsOperations(this._client);
    this.afdOriginGroups = _getAFDOriginGroupsOperations(this._client);
    this.afdEndpoints = _getAFDEndpointsOperations(this._client);
    this.profiles = _getProfilesOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** Check if the probe path is a valid path and the file can be accessed. Probe path is the path to a file hosted on the origin server to help accelerate the delivery of dynamic content via the CDN endpoint. This path is relative to the origin path specified in the endpoint configuration. */
  validateProbe(
    validateProbeInput: ValidateProbeInput,
    options: ValidateProbeOptionalParams = { requestOptions: {} },
  ): Promise<ValidateProbeOutput> {
    return validateProbe(this._client, validateProbeInput, options);
  }

  /** Check the availability of a resource name. This is needed for resources where name is globally unique, such as a CDN endpoint. */
  checkNameAvailabilityWithSubscription(
    checkNameAvailabilityInput: CheckNameAvailabilityInput,
    options: CheckNameAvailabilityWithSubscriptionOptionalParams = { requestOptions: {} },
  ): Promise<CheckNameAvailabilityOutput> {
    return checkNameAvailabilityWithSubscription(this._client, checkNameAvailabilityInput, options);
  }

  /** Check the availability of a resource name. This is needed for resources where name is globally unique, such as a CDN endpoint. */
  checkNameAvailability(
    checkNameAvailabilityInput: CheckNameAvailabilityInput,
    options: CheckNameAvailabilityOptionalParams = { requestOptions: {} },
  ): Promise<CheckNameAvailabilityOutput> {
    return checkNameAvailability(this._client, checkNameAvailabilityInput, options);
  }

  /** Check the availability of a resource name. This is needed for resources where name is globally unique, such as a afdx endpoint. */
  checkEndpointNameAvailability(
    resourceGroupName: string,
    checkEndpointNameAvailabilityInput: CheckEndpointNameAvailabilityInput,
    options: CheckEndpointNameAvailabilityOptionalParams = { requestOptions: {} },
  ): Promise<CheckEndpointNameAvailabilityOutput> {
    return checkEndpointNameAvailability(
      this._client,
      resourceGroupName,
      checkEndpointNameAvailabilityInput,
      options,
    );
  }

  /** The operation groups for managedRuleSets */
  public readonly managedRuleSets: ManagedRuleSetsOperations;
  /** The operation groups for edgeNodes */
  public readonly edgeNodes: EdgeNodesOperations;
  /** The operation groups for resourceUsageOperations */
  public readonly resourceUsageOperations: ResourceUsageOperationsOperations;
  /** The operation groups for policies */
  public readonly policies: PoliciesOperations;
  /** The operation groups for logAnalytics */
  public readonly logAnalytics: LogAnalyticsOperations;
  /** The operation groups for afdProfiles */
  public readonly afdProfiles: AFDProfilesOperations;
  /** The operation groups for afdCustomDomains */
  public readonly afdCustomDomains: AFDCustomDomainsOperations;
  /** The operation groups for customDomains */
  public readonly customDomains: CustomDomainsOperations;
  /** The operation groups for originGroups */
  public readonly originGroups: OriginGroupsOperations;
  /** The operation groups for origins */
  public readonly origins: OriginsOperations;
  /** The operation groups for endpoints */
  public readonly endpoints: EndpointsOperations;
  /** The operation groups for secrets */
  public readonly secrets: SecretsOperations;
  /** The operation groups for securityPolicies */
  public readonly securityPolicies: SecurityPoliciesOperations;
  /** The operation groups for rules */
  public readonly rules: RulesOperations;
  /** The operation groups for ruleSets */
  public readonly ruleSets: RuleSetsOperations;
  /** The operation groups for routes */
  public readonly routes: RoutesOperations;
  /** The operation groups for afdOrigins */
  public readonly afdOrigins: AFDOriginsOperations;
  /** The operation groups for afdOriginGroups */
  public readonly afdOriginGroups: AFDOriginGroupsOperations;
  /** The operation groups for afdEndpoints */
  public readonly afdEndpoints: AFDEndpointsOperations;
  /** The operation groups for profiles */
  public readonly profiles: ProfilesOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
