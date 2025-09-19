// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftElasticContext, MicrosoftElasticOptionalParams } from "./api/index.js";
import { createMicrosoftElastic } from "./api/index.js";
import type { AllTrafficFiltersOperations } from "./classic/allTrafficFilters/index.js";
import { _getAllTrafficFiltersOperations } from "./classic/allTrafficFilters/index.js";
import type { AssociateTrafficFilterOperations } from "./classic/associateTrafficFilter/index.js";
import { _getAssociateTrafficFilterOperations } from "./classic/associateTrafficFilter/index.js";
import type { BillingInfoOperations } from "./classic/billingInfo/index.js";
import { _getBillingInfoOperations } from "./classic/billingInfo/index.js";
import type { ConnectedPartnerResourcesOperations } from "./classic/connectedPartnerResources/index.js";
import { _getConnectedPartnerResourcesOperations } from "./classic/connectedPartnerResources/index.js";
import type { CreateAndAssociateIPFilterOperations } from "./classic/createAndAssociateIPFilter/index.js";
import { _getCreateAndAssociateIPFilterOperations } from "./classic/createAndAssociateIPFilter/index.js";
import type { CreateAndAssociatePLFilterOperations } from "./classic/createAndAssociatePLFilter/index.js";
import { _getCreateAndAssociatePLFilterOperations } from "./classic/createAndAssociatePLFilter/index.js";
import type { DeploymentInfoOperations } from "./classic/deploymentInfo/index.js";
import { _getDeploymentInfoOperations } from "./classic/deploymentInfo/index.js";
import type { DetachAndDeleteTrafficFilterOperations } from "./classic/detachAndDeleteTrafficFilter/index.js";
import { _getDetachAndDeleteTrafficFilterOperations } from "./classic/detachAndDeleteTrafficFilter/index.js";
import type { DetachTrafficFilterOperations } from "./classic/detachTrafficFilter/index.js";
import { _getDetachTrafficFilterOperations } from "./classic/detachTrafficFilter/index.js";
import type { ElasticVersionsOperations } from "./classic/elasticVersions/index.js";
import { _getElasticVersionsOperations } from "./classic/elasticVersions/index.js";
import type { ExternalUserOperations } from "./classic/externalUser/index.js";
import { _getExternalUserOperations } from "./classic/externalUser/index.js";
import type { ListAssociatedTrafficFiltersOperations } from "./classic/listAssociatedTrafficFilters/index.js";
import { _getListAssociatedTrafficFiltersOperations } from "./classic/listAssociatedTrafficFilters/index.js";
import type { MonitorOperations } from "./classic/monitor/index.js";
import { _getMonitorOperations } from "./classic/monitor/index.js";
import type { MonitoredResourcesOperations } from "./classic/monitoredResources/index.js";
import { _getMonitoredResourcesOperations } from "./classic/monitoredResources/index.js";
import type { MonitoredSubscriptionsOperations } from "./classic/monitoredSubscriptions/index.js";
import { _getMonitoredSubscriptionsOperations } from "./classic/monitoredSubscriptions/index.js";
import type { MonitorsOperations } from "./classic/monitors/index.js";
import { _getMonitorsOperations } from "./classic/monitors/index.js";
import type { OpenAIOperations } from "./classic/openAI/index.js";
import { _getOpenAIOperations } from "./classic/openAI/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { OrganizationsOperations } from "./classic/organizations/index.js";
import { _getOrganizationsOperations } from "./classic/organizations/index.js";
import type { TagRulesOperations } from "./classic/tagRules/index.js";
import { _getTagRulesOperations } from "./classic/tagRules/index.js";
import type { TrafficFiltersOperations } from "./classic/trafficFilters/index.js";
import { _getTrafficFiltersOperations } from "./classic/trafficFilters/index.js";
import type { UpgradableVersionsOperations } from "./classic/upgradableVersions/index.js";
import { _getUpgradableVersionsOperations } from "./classic/upgradableVersions/index.js";
import type { VMCollectionOperations } from "./classic/vmCollection/index.js";
import { _getVMCollectionOperations } from "./classic/vmCollection/index.js";
import type { VMHostOperations } from "./classic/vmHost/index.js";
import { _getVMHostOperations } from "./classic/vmHost/index.js";
import type { VMIngestionOperations } from "./classic/vmIngestion/index.js";
import { _getVMIngestionOperations } from "./classic/vmIngestion/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export { MicrosoftElasticOptionalParams } from "./api/microsoftElasticContext.js";

export class MicrosoftElastic {
  private _client: MicrosoftElasticContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: MicrosoftElasticOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createMicrosoftElastic(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.elasticVersions = _getElasticVersionsOperations(this._client);
    this.openAI = _getOpenAIOperations(this._client);
    this.organizations = _getOrganizationsOperations(this._client);
    this.trafficFilters = _getTrafficFiltersOperations(this._client);
    this.detachTrafficFilter = _getDetachTrafficFilterOperations(this._client);
    this.detachAndDeleteTrafficFilter = _getDetachAndDeleteTrafficFilterOperations(this._client);
    this.associateTrafficFilter = _getAssociateTrafficFilterOperations(this._client);
    this.createAndAssociatePLFilter = _getCreateAndAssociatePLFilterOperations(this._client);
    this.createAndAssociateIPFilter = _getCreateAndAssociateIPFilterOperations(this._client);
    this.listAssociatedTrafficFilters = _getListAssociatedTrafficFiltersOperations(this._client);
    this.allTrafficFilters = _getAllTrafficFiltersOperations(this._client);
    this.monitor = _getMonitorOperations(this._client);
    this.upgradableVersions = _getUpgradableVersionsOperations(this._client);
    this.vmCollection = _getVMCollectionOperations(this._client);
    this.vmIngestion = _getVMIngestionOperations(this._client);
    this.vmHost = _getVMHostOperations(this._client);
    this.connectedPartnerResources = _getConnectedPartnerResourcesOperations(this._client);
    this.billingInfo = _getBillingInfoOperations(this._client);
    this.externalUser = _getExternalUserOperations(this._client);
    this.deploymentInfo = _getDeploymentInfoOperations(this._client);
    this.monitoredResources = _getMonitoredResourcesOperations(this._client);
    this.monitors = _getMonitorsOperations(this._client);
    this.tagRules = _getTagRulesOperations(this._client);
    this.monitoredSubscriptions = _getMonitoredSubscriptionsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for elasticVersions */
  public readonly elasticVersions: ElasticVersionsOperations;
  /** The operation groups for openAI */
  public readonly openAI: OpenAIOperations;
  /** The operation groups for organizations */
  public readonly organizations: OrganizationsOperations;
  /** The operation groups for trafficFilters */
  public readonly trafficFilters: TrafficFiltersOperations;
  /** The operation groups for detachTrafficFilter */
  public readonly detachTrafficFilter: DetachTrafficFilterOperations;
  /** The operation groups for detachAndDeleteTrafficFilter */
  public readonly detachAndDeleteTrafficFilter: DetachAndDeleteTrafficFilterOperations;
  /** The operation groups for associateTrafficFilter */
  public readonly associateTrafficFilter: AssociateTrafficFilterOperations;
  /** The operation groups for createAndAssociatePLFilter */
  public readonly createAndAssociatePLFilter: CreateAndAssociatePLFilterOperations;
  /** The operation groups for createAndAssociateIPFilter */
  public readonly createAndAssociateIPFilter: CreateAndAssociateIPFilterOperations;
  /** The operation groups for listAssociatedTrafficFilters */
  public readonly listAssociatedTrafficFilters: ListAssociatedTrafficFiltersOperations;
  /** The operation groups for allTrafficFilters */
  public readonly allTrafficFilters: AllTrafficFiltersOperations;
  /** The operation groups for monitor */
  public readonly monitor: MonitorOperations;
  /** The operation groups for upgradableVersions */
  public readonly upgradableVersions: UpgradableVersionsOperations;
  /** The operation groups for vmCollection */
  public readonly vmCollection: VMCollectionOperations;
  /** The operation groups for vmIngestion */
  public readonly vmIngestion: VMIngestionOperations;
  /** The operation groups for vmHost */
  public readonly vmHost: VMHostOperations;
  /** The operation groups for connectedPartnerResources */
  public readonly connectedPartnerResources: ConnectedPartnerResourcesOperations;
  /** The operation groups for billingInfo */
  public readonly billingInfo: BillingInfoOperations;
  /** The operation groups for externalUser */
  public readonly externalUser: ExternalUserOperations;
  /** The operation groups for deploymentInfo */
  public readonly deploymentInfo: DeploymentInfoOperations;
  /** The operation groups for monitoredResources */
  public readonly monitoredResources: MonitoredResourcesOperations;
  /** The operation groups for monitors */
  public readonly monitors: MonitorsOperations;
  /** The operation groups for tagRules */
  public readonly tagRules: TagRulesOperations;
  /** The operation groups for monitoredSubscriptions */
  public readonly monitoredSubscriptions: MonitoredSubscriptionsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
