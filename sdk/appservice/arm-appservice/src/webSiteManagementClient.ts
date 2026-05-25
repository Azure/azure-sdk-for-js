// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  WebSiteManagementContext,
  WebSiteManagementClientOptionalParams,
  createWebSiteManagement,
} from "./api/index.js";
import {
  listSourceControls,
  updateSourceControl,
  getSourceControl,
  updatePublishingUser,
  getPublishingUser,
  move,
  verifyHostingEnvironmentVnet,
  listSkus,
  listPremierAddOnOffers,
  regionalCheckNameAvailability,
  listSiteIdentifiersAssignedToHostName,
  listGeoRegions,
  listCustomHostNameSites,
  checkNameAvailability,
  listBillingMeters,
  listAseRegions,
  getSubscriptionDeploymentLocations,
  validate,
  validateMove,
} from "./api/operations.js";
import {
  ListSourceControlsOptionalParams,
  UpdateSourceControlOptionalParams,
  GetSourceControlOptionalParams,
  UpdatePublishingUserOptionalParams,
  GetPublishingUserOptionalParams,
  MoveOptionalParams,
  VerifyHostingEnvironmentVnetOptionalParams,
  ListSkusOptionalParams,
  ListPremierAddOnOffersOptionalParams,
  RegionalCheckNameAvailabilityOptionalParams,
  ListSiteIdentifiersAssignedToHostNameOptionalParams,
  ListGeoRegionsOptionalParams,
  ListCustomHostNameSitesOptionalParams,
  CheckNameAvailabilityOptionalParams,
  ListBillingMetersOptionalParams,
  ListAseRegionsOptionalParams,
  GetSubscriptionDeploymentLocationsOptionalParams,
  ValidateOptionalParams,
  ValidateMoveOptionalParams,
} from "./api/options.js";
import { AiGatewaysOperations, _getAiGatewaysOperations } from "./classic/aiGateways/index.js";
import {
  AppServiceEnvironmentsOperations,
  _getAppServiceEnvironmentsOperations,
} from "./classic/appServiceEnvironments/index.js";
import {
  AppServicePlansOperations,
  _getAppServicePlansOperations,
} from "./classic/appServicePlans/index.js";
import {
  CertificatesOperations,
  _getCertificatesOperations,
} from "./classic/certificates/index.js";
import {
  DeletedWebAppsOperations,
  _getDeletedWebAppsOperations,
} from "./classic/deletedWebApps/index.js";
import { DiagnosticsOperations, _getDiagnosticsOperations } from "./classic/diagnostics/index.js";
import {
  GetUsagesInLocationOperations,
  _getGetUsagesInLocationOperations,
} from "./classic/getUsagesInLocation/index.js";
import { GlobalOperations, _getGlobalOperations } from "./classic/global/index.js";
import {
  KubeEnvironmentsOperations,
  _getKubeEnvironmentsOperations,
} from "./classic/kubeEnvironments/index.js";
import { ProviderOperations, _getProviderOperations } from "./classic/provider/index.js";
import {
  RecommendationsOperations,
  _getRecommendationsOperations,
} from "./classic/recommendations/index.js";
import {
  ResourceHealthMetadataOperations,
  _getResourceHealthMetadataOperations,
} from "./classic/resourceHealthMetadata/index.js";
import {
  SiteCertificatesOperations,
  _getSiteCertificatesOperations,
} from "./classic/siteCertificates/index.js";
import { SitesOperations, _getSitesOperations } from "./classic/sites/index.js";
import { StaticSitesOperations, _getStaticSitesOperations } from "./classic/staticSites/index.js";
import {
  StaticSitesAsyncOperationsOperations,
  _getStaticSitesAsyncOperationsOperations,
} from "./classic/staticSitesAsyncOperations/index.js";
import { WebAppsOperations, _getWebAppsOperations } from "./classic/webApps/index.js";
import {
  WorkflowRunActionRepetitionsOperations,
  _getWorkflowRunActionRepetitionsOperations,
} from "./classic/workflowRunActionRepetitions/index.js";
import {
  WorkflowRunActionRepetitionsRequestHistoriesOperations,
  _getWorkflowRunActionRepetitionsRequestHistoriesOperations,
} from "./classic/workflowRunActionRepetitionsRequestHistories/index.js";
import {
  WorkflowRunActionScopeRepetitionsOperations,
  _getWorkflowRunActionScopeRepetitionsOperations,
} from "./classic/workflowRunActionScopeRepetitions/index.js";
import {
  WorkflowRunActionsOperations,
  _getWorkflowRunActionsOperations,
} from "./classic/workflowRunActions/index.js";
import {
  WorkflowRunsOperations,
  _getWorkflowRunsOperations,
} from "./classic/workflowRuns/index.js";
import {
  WorkflowTriggerHistoriesOperations,
  _getWorkflowTriggerHistoriesOperations,
} from "./classic/workflowTriggerHistories/index.js";
import {
  WorkflowTriggersOperations,
  _getWorkflowTriggersOperations,
} from "./classic/workflowTriggers/index.js";
import {
  WorkflowVersionsOperations,
  _getWorkflowVersionsOperations,
} from "./classic/workflowVersions/index.js";
import { WorkflowsOperations, _getWorkflowsOperations } from "./classic/workflows/index.js";
import {
  CsmMoveResourceEnvelope,
  ValidateRequest,
  ValidateResponse,
  DeploymentLocations,
  GeoRegion,
  AseRegion,
  BillingMeter,
  CheckNameResourceTypes,
  ResourceNameAvailability,
  CustomHostnameSites,
  Identifier,
  NameIdentifier,
  DnlResourceNameAvailability,
  PremierAddOnOffer,
  SkuInfos,
  VnetParameters,
  VnetValidationFailureDetails,
  User,
  SourceControl,
} from "./models/models.js";
import { PagedAsyncIterableIterator } from "./static-helpers/pagingHelpers.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { WebSiteManagementClientOptionalParams } from "./api/webSiteManagementContext.js";

export class WebSiteManagementClient {
  private _client: WebSiteManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: WebSiteManagementClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: WebSiteManagementClientOptionalParams,
  );
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | WebSiteManagementClientOptionalParams,
    options?: WebSiteManagementClientOptionalParams,
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
    this._client = createWebSiteManagement(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.getUsagesInLocation = _getGetUsagesInLocationOperations(this._client);
    this.workflowRunActionRepetitionsRequestHistories =
      _getWorkflowRunActionRepetitionsRequestHistoriesOperations(this._client);
    this.workflowRunActionRepetitions = _getWorkflowRunActionRepetitionsOperations(this._client);
    this.workflows = _getWorkflowsOperations(this._client);
    this.resourceHealthMetadata = _getResourceHealthMetadataOperations(this._client);
    this.deletedWebApps = _getDeletedWebAppsOperations(this._client);
    this.provider = _getProviderOperations(this._client);
    this.workflowVersions = _getWorkflowVersionsOperations(this._client);
    this.workflowTriggerHistories = _getWorkflowTriggerHistoriesOperations(this._client);
    this.workflowTriggers = _getWorkflowTriggersOperations(this._client);
    this.workflowRunActionScopeRepetitions = _getWorkflowRunActionScopeRepetitionsOperations(
      this._client,
    );
    this.workflowRunActions = _getWorkflowRunActionsOperations(this._client);
    this.workflowRuns = _getWorkflowRunsOperations(this._client);
    this.aiGateways = _getAiGatewaysOperations(this._client);
    this.staticSitesAsyncOperations = _getStaticSitesAsyncOperationsOperations(this._client);
    this.sites = _getSitesOperations(this._client);
    this.kubeEnvironments = _getKubeEnvironmentsOperations(this._client);
    this.diagnostics = _getDiagnosticsOperations(this._client);
    this.global = _getGlobalOperations(this._client);
    this.siteCertificates = _getSiteCertificatesOperations(this._client);
    this.certificates = _getCertificatesOperations(this._client);
    this.appServicePlans = _getAppServicePlansOperations(this._client);
    this.webApps = _getWebAppsOperations(this._client);
    this.staticSites = _getStaticSitesOperations(this._client);
    this.recommendations = _getRecommendationsOperations(this._client);
    this.appServiceEnvironments = _getAppServiceEnvironmentsOperations(this._client);
  }

  /** Description for Gets the source controls available for Azure websites. */
  listSourceControls(
    options: ListSourceControlsOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<SourceControl> {
    return listSourceControls(this._client, options);
  }

  /** Description for Updates source control token */
  updateSourceControl(
    sourceControlType: string,
    requestMessage: SourceControl,
    options: UpdateSourceControlOptionalParams = { requestOptions: {} },
  ): Promise<SourceControl> {
    return updateSourceControl(this._client, sourceControlType, requestMessage, options);
  }

  /** Description for Gets source control token */
  getSourceControl(
    sourceControlType: string,
    options: GetSourceControlOptionalParams = { requestOptions: {} },
  ): Promise<SourceControl> {
    return getSourceControl(this._client, sourceControlType, options);
  }

  /** Description for Updates publishing user */
  updatePublishingUser(
    userDetails: User,
    options: UpdatePublishingUserOptionalParams = { requestOptions: {} },
  ): Promise<User> {
    return updatePublishingUser(this._client, userDetails, options);
  }

  /** Description for Gets publishing user */
  getPublishingUser(
    options: GetPublishingUserOptionalParams = { requestOptions: {} },
  ): Promise<User> {
    return getPublishingUser(this._client, options);
  }

  /** Description for Move resources between resource groups. */
  move(
    resourceGroupName: string,
    moveResourceEnvelope: CsmMoveResourceEnvelope,
    options: MoveOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return move(this._client, resourceGroupName, moveResourceEnvelope, options);
  }

  /** Description for Verifies if this VNET is compatible with an App Service Environment by analyzing the Network Security Group rules. */
  verifyHostingEnvironmentVnet(
    parameters: VnetParameters,
    options: VerifyHostingEnvironmentVnetOptionalParams = { requestOptions: {} },
  ): Promise<VnetValidationFailureDetails> {
    return verifyHostingEnvironmentVnet(this._client, parameters, options);
  }

  /** Description for List all SKUs. */
  listSkus(options: ListSkusOptionalParams = { requestOptions: {} }): Promise<SkuInfos> {
    return listSkus(this._client, options);
  }

  /** Description for List all premier add-on offers. */
  listPremierAddOnOffers(
    options: ListPremierAddOnOffersOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<PremierAddOnOffer> {
    return listPremierAddOnOffers(this._client, options);
  }

  /** Check if a resource name is available for DNL sites. */
  regionalCheckNameAvailability(
    location: string,
    name: string,
    typeParam: CheckNameResourceTypes,
    options: RegionalCheckNameAvailabilityOptionalParams = { requestOptions: {} },
  ): Promise<DnlResourceNameAvailability> {
    return regionalCheckNameAvailability(this._client, location, name, typeParam, options);
  }

  /** Description for List all apps that are assigned to a hostname. */
  listSiteIdentifiersAssignedToHostName(
    nameIdentifier: NameIdentifier,
    options: ListSiteIdentifiersAssignedToHostNameOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<Identifier> {
    return listSiteIdentifiersAssignedToHostName(this._client, nameIdentifier, options);
  }

  /** Description for Get a list of available geographical regions. */
  listGeoRegions(
    options: ListGeoRegionsOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<GeoRegion> {
    return listGeoRegions(this._client, options);
  }

  /** Get custom hostnames under this subscription */
  listCustomHostNameSites(
    options: ListCustomHostNameSitesOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<CustomHostnameSites> {
    return listCustomHostNameSites(this._client, options);
  }

  /** Description for Check if a resource name is available. */
  checkNameAvailability(
    name: string,
    typeParam: CheckNameResourceTypes,
    options: CheckNameAvailabilityOptionalParams = { requestOptions: {} },
  ): Promise<ResourceNameAvailability> {
    return checkNameAvailability(this._client, name, typeParam, options);
  }

  /** Description for Gets a list of meters for a given location. */
  listBillingMeters(
    options: ListBillingMetersOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<BillingMeter> {
    return listBillingMeters(this._client, options);
  }

  /** Description for get a list of available ASE regions and its supported Skus. */
  listAseRegions(
    options: ListAseRegionsOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<AseRegion> {
    return listAseRegions(this._client, options);
  }

  /** Description for Gets list of available geo regions plus ministamps */
  getSubscriptionDeploymentLocations(
    options: GetSubscriptionDeploymentLocationsOptionalParams = { requestOptions: {} },
  ): Promise<DeploymentLocations> {
    return getSubscriptionDeploymentLocations(this._client, options);
  }

  /** Description for Validate if a resource can be created. */
  validate(
    resourceGroupName: string,
    validateRequest: ValidateRequest,
    options: ValidateOptionalParams = { requestOptions: {} },
  ): Promise<ValidateResponse> {
    return validate(this._client, resourceGroupName, validateRequest, options);
  }

  /** Description for Validate whether a resource can be moved. */
  validateMove(
    resourceGroupName: string,
    moveResourceEnvelope: CsmMoveResourceEnvelope,
    options: ValidateMoveOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return validateMove(this._client, resourceGroupName, moveResourceEnvelope, options);
  }

  /** The operation groups for getUsagesInLocation */
  public readonly getUsagesInLocation: GetUsagesInLocationOperations;
  /** The operation groups for workflowRunActionRepetitionsRequestHistories */
  public readonly workflowRunActionRepetitionsRequestHistories: WorkflowRunActionRepetitionsRequestHistoriesOperations;
  /** The operation groups for workflowRunActionRepetitions */
  public readonly workflowRunActionRepetitions: WorkflowRunActionRepetitionsOperations;
  /** The operation groups for workflows */
  public readonly workflows: WorkflowsOperations;
  /** The operation groups for resourceHealthMetadata */
  public readonly resourceHealthMetadata: ResourceHealthMetadataOperations;
  /** The operation groups for deletedWebApps */
  public readonly deletedWebApps: DeletedWebAppsOperations;
  /** The operation groups for provider */
  public readonly provider: ProviderOperations;
  /** The operation groups for workflowVersions */
  public readonly workflowVersions: WorkflowVersionsOperations;
  /** The operation groups for workflowTriggerHistories */
  public readonly workflowTriggerHistories: WorkflowTriggerHistoriesOperations;
  /** The operation groups for workflowTriggers */
  public readonly workflowTriggers: WorkflowTriggersOperations;
  /** The operation groups for workflowRunActionScopeRepetitions */
  public readonly workflowRunActionScopeRepetitions: WorkflowRunActionScopeRepetitionsOperations;
  /** The operation groups for workflowRunActions */
  public readonly workflowRunActions: WorkflowRunActionsOperations;
  /** The operation groups for workflowRuns */
  public readonly workflowRuns: WorkflowRunsOperations;
  /** The operation groups for aiGateways */
  public readonly aiGateways: AiGatewaysOperations;
  /** The operation groups for staticSitesAsyncOperations */
  public readonly staticSitesAsyncOperations: StaticSitesAsyncOperationsOperations;
  /** The operation groups for sites */
  public readonly sites: SitesOperations;
  /** The operation groups for kubeEnvironments */
  public readonly kubeEnvironments: KubeEnvironmentsOperations;
  /** The operation groups for diagnostics */
  public readonly diagnostics: DiagnosticsOperations;
  /** The operation groups for global */
  public readonly global: GlobalOperations;
  /** The operation groups for siteCertificates */
  public readonly siteCertificates: SiteCertificatesOperations;
  /** The operation groups for certificates */
  public readonly certificates: CertificatesOperations;
  /** The operation groups for appServicePlans */
  public readonly appServicePlans: AppServicePlansOperations;
  /** The operation groups for webApps */
  public readonly webApps: WebAppsOperations;
  /** The operation groups for staticSites */
  public readonly staticSites: StaticSitesOperations;
  /** The operation groups for recommendations */
  public readonly recommendations: RecommendationsOperations;
  /** The operation groups for appServiceEnvironments */
  public readonly appServiceEnvironments: AppServiceEnvironmentsOperations;
}
