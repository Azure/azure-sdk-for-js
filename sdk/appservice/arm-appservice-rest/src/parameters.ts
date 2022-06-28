// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import {
  AppServiceCertificateOrder,
  AppServiceCertificateOrderPatchResource,
  AppServiceCertificateResource,
  AppServiceCertificatePatchResource,
  ReissueCertificateOrderRequest,
  RenewCertificateOrderRequest,
  NameIdentifier,
  SiteSealRequest,
  DomainRecommendationSearchParameters,
  Domain,
  DomainPatchResource,
  DomainOwnershipIdentifier,
  TopLevelDomainAgreementOption,
  AppServiceEnvironmentResource,
  AppServiceEnvironmentPatchResource,
  VirtualNetworkProfile,
  AseV3NetworkingConfiguration,
  WorkerPoolResource,
  PrivateLinkConnectionApprovalRequestResource,
  AppServicePlan,
  AppServicePlanPatchResource,
  VnetGateway,
  VnetRoute,
  Certificate,
  CertificatePatchResource,
  ContainerApp,
  KubeEnvironment,
  KubeEnvironmentPatchResource,
  User,
  SourceControl,
  ResourceNameAvailabilityRequest,
  VnetParameters,
  CsmMoveResourceEnvelope,
  ValidateRequest,
  StaticSitesWorkflowPreviewRequest,
  StaticSiteARMResource,
  StaticSitePatchResource,
  StaticSiteUserARMResource,
  StringDictionary,
  StaticSiteUserProvidedFunctionAppARMResource,
  StaticSiteZipDeploymentARMResource,
  StaticSiteUserInvitationRequestResource,
  StaticSiteCustomDomainRequestPropertiesARMResource,
  StaticSiteResetPropertiesARMResource,
  Site,
  SitePatchResource,
  CsmSlotEntity,
  BackupRequest,
  RestoreRequest,
  CsmPublishingCredentialsPoliciesEntity,
  SiteAuthSettings,
  SiteAuthSettingsV2,
  AzureStoragePropertyDictionaryResource,
  ConnectionStringDictionary,
  SiteLogsConfig,
  PushSettings,
  SlotConfigNamesResource,
  SiteConfigResource,
  Deployment,
  Identifier,
  MSDeploy,
  FunctionEnvelope,
  KeyInfo,
  HostNameBinding,
  HybridConnection,
  RelayServiceConnectionEntity,
  StorageMigrationOptions,
  MigrateMySqlRequest,
  SwiftVirtualNetwork,
  PremierAddOn,
  PremierAddOnPatchResource,
  PrivateAccess,
  PublicCertificate,
  CsmPublishingProfileOptions,
  DeletedAppRestoreRequest,
  SnapshotRestoreRequest,
  SiteSourceControl,
  VnetInfoResource,
} from "./models";

export type AppServiceCertificateOrdersListParameters = RequestParameters;

export interface AppServiceCertificateOrdersValidatePurchaseInformationBodyParam {
  /** Information for a certificate order. */
  body: AppServiceCertificateOrder;
}

export interface AppServiceCertificateOrdersValidatePurchaseInformationMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type AppServiceCertificateOrdersValidatePurchaseInformationParameters = AppServiceCertificateOrdersValidatePurchaseInformationMediaTypesParam &
  AppServiceCertificateOrdersValidatePurchaseInformationBodyParam &
  RequestParameters;
export type AppServiceCertificateOrdersListByResourceGroupParameters = RequestParameters;
export type AppServiceCertificateOrdersGetParameters = RequestParameters;

export interface AppServiceCertificateOrdersCreateOrUpdateBodyParam {
  /** Distinguished name to use for the certificate order. */
  body: AppServiceCertificateOrder;
}

export interface AppServiceCertificateOrdersCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type AppServiceCertificateOrdersCreateOrUpdateParameters = AppServiceCertificateOrdersCreateOrUpdateMediaTypesParam &
  AppServiceCertificateOrdersCreateOrUpdateBodyParam &
  RequestParameters;
export type AppServiceCertificateOrdersDeleteParameters = RequestParameters;

export interface AppServiceCertificateOrdersUpdateBodyParam {
  /** Distinguished name to use for the certificate order. */
  body: AppServiceCertificateOrderPatchResource;
}

export interface AppServiceCertificateOrdersUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type AppServiceCertificateOrdersUpdateParameters = AppServiceCertificateOrdersUpdateMediaTypesParam &
  AppServiceCertificateOrdersUpdateBodyParam &
  RequestParameters;
export type AppServiceCertificateOrdersListCertificatesParameters = RequestParameters;
export type AppServiceCertificateOrdersGetCertificateParameters = RequestParameters;

export interface AppServiceCertificateOrdersCreateOrUpdateCertificateBodyParam {
  /** Key vault certificate resource Id. */
  body: AppServiceCertificateResource;
}

export interface AppServiceCertificateOrdersCreateOrUpdateCertificateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type AppServiceCertificateOrdersCreateOrUpdateCertificateParameters = AppServiceCertificateOrdersCreateOrUpdateCertificateMediaTypesParam &
  AppServiceCertificateOrdersCreateOrUpdateCertificateBodyParam &
  RequestParameters;
export type AppServiceCertificateOrdersDeleteCertificateParameters = RequestParameters;

export interface AppServiceCertificateOrdersUpdateCertificateBodyParam {
  /** Key vault certificate resource Id. */
  body: AppServiceCertificatePatchResource;
}

export interface AppServiceCertificateOrdersUpdateCertificateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type AppServiceCertificateOrdersUpdateCertificateParameters = AppServiceCertificateOrdersUpdateCertificateMediaTypesParam &
  AppServiceCertificateOrdersUpdateCertificateBodyParam &
  RequestParameters;

export interface AppServiceCertificateOrdersReissueBodyParam {
  /** Parameters for the reissue. */
  body: ReissueCertificateOrderRequest;
}

export interface AppServiceCertificateOrdersReissueMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type AppServiceCertificateOrdersReissueParameters = AppServiceCertificateOrdersReissueMediaTypesParam &
  AppServiceCertificateOrdersReissueBodyParam &
  RequestParameters;

export interface AppServiceCertificateOrdersRenewBodyParam {
  /** Renew parameters */
  body: RenewCertificateOrderRequest;
}

export interface AppServiceCertificateOrdersRenewMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type AppServiceCertificateOrdersRenewParameters = AppServiceCertificateOrdersRenewMediaTypesParam &
  AppServiceCertificateOrdersRenewBodyParam &
  RequestParameters;
export type AppServiceCertificateOrdersResendEmailParameters = RequestParameters;

export interface AppServiceCertificateOrdersResendRequestEmailsBodyParam {
  /** Email address */
  body: NameIdentifier;
}

export interface AppServiceCertificateOrdersResendRequestEmailsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type AppServiceCertificateOrdersResendRequestEmailsParameters = AppServiceCertificateOrdersResendRequestEmailsMediaTypesParam &
  AppServiceCertificateOrdersResendRequestEmailsBodyParam &
  RequestParameters;

export interface AppServiceCertificateOrdersRetrieveSiteSealBodyParam {
  /** Site seal request. */
  body: SiteSealRequest;
}

export interface AppServiceCertificateOrdersRetrieveSiteSealMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type AppServiceCertificateOrdersRetrieveSiteSealParameters = AppServiceCertificateOrdersRetrieveSiteSealMediaTypesParam &
  AppServiceCertificateOrdersRetrieveSiteSealBodyParam &
  RequestParameters;
export type AppServiceCertificateOrdersVerifyDomainOwnershipParameters = RequestParameters;
export type AppServiceCertificateOrdersRetrieveCertificateActionsParameters = RequestParameters;
export type AppServiceCertificateOrdersRetrieveCertificateEmailHistoryParameters = RequestParameters;
export type CertificateOrdersDiagnosticsListAppServiceCertificateOrderDetectorResponseParameters = RequestParameters;

export interface CertificateOrdersDiagnosticsGetAppServiceCertificateOrderDetectorResponseQueryParamProperties {
  /** The start time for detector response. */
  startTime?: Date | string;
  /** The end time for the detector response. */
  endTime?: Date | string;
  /** The time grain for the detector response. */
  timeGrain?: string;
}

export interface CertificateOrdersDiagnosticsGetAppServiceCertificateOrderDetectorResponseQueryParam {
  queryParameters?: CertificateOrdersDiagnosticsGetAppServiceCertificateOrderDetectorResponseQueryParamProperties;
}

export type CertificateOrdersDiagnosticsGetAppServiceCertificateOrderDetectorResponseParameters = CertificateOrdersDiagnosticsGetAppServiceCertificateOrderDetectorResponseQueryParam &
  RequestParameters;
export type CertificateRegistrationProviderListOperationsParameters = RequestParameters;

export interface DomainsCheckAvailabilityBodyParam {
  /** Name of the domain. */
  body: NameIdentifier;
}

export interface DomainsCheckAvailabilityMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type DomainsCheckAvailabilityParameters = DomainsCheckAvailabilityMediaTypesParam &
  DomainsCheckAvailabilityBodyParam &
  RequestParameters;
export type DomainsListParameters = RequestParameters;
export type DomainsGetControlCenterSsoRequestParameters = RequestParameters;

export interface DomainsListRecommendationsBodyParam {
  /** Search parameters for domain name recommendations. */
  body: DomainRecommendationSearchParameters;
}

export interface DomainsListRecommendationsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type DomainsListRecommendationsParameters = DomainsListRecommendationsMediaTypesParam &
  DomainsListRecommendationsBodyParam &
  RequestParameters;
export type DomainsListByResourceGroupParameters = RequestParameters;
export type DomainsGetParameters = RequestParameters;

export interface DomainsCreateOrUpdateBodyParam {
  /** Domain registration information. */
  body: Domain;
}

export interface DomainsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type DomainsCreateOrUpdateParameters = DomainsCreateOrUpdateMediaTypesParam &
  DomainsCreateOrUpdateBodyParam &
  RequestParameters;

export interface DomainsDeleteQueryParamProperties {
  /** Specify <code>true</code> to delete the domain immediately. The default is <code>false</code> which deletes the domain after 24 hours. */
  forceHardDeleteDomain?: boolean;
}

export interface DomainsDeleteQueryParam {
  queryParameters?: DomainsDeleteQueryParamProperties;
}

export type DomainsDeleteParameters = DomainsDeleteQueryParam & RequestParameters;

export interface DomainsUpdateBodyParam {
  /** Domain registration information. */
  body: DomainPatchResource;
}

export interface DomainsUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type DomainsUpdateParameters = DomainsUpdateMediaTypesParam &
  DomainsUpdateBodyParam &
  RequestParameters;
export type DomainsListOwnershipIdentifiersParameters = RequestParameters;
export type DomainsGetOwnershipIdentifierParameters = RequestParameters;

export interface DomainsCreateOrUpdateOwnershipIdentifierBodyParam {
  /** A JSON representation of the domain ownership properties. */
  body: DomainOwnershipIdentifier;
}

export interface DomainsCreateOrUpdateOwnershipIdentifierMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type DomainsCreateOrUpdateOwnershipIdentifierParameters = DomainsCreateOrUpdateOwnershipIdentifierMediaTypesParam &
  DomainsCreateOrUpdateOwnershipIdentifierBodyParam &
  RequestParameters;
export type DomainsDeleteOwnershipIdentifierParameters = RequestParameters;

export interface DomainsUpdateOwnershipIdentifierBodyParam {
  /** A JSON representation of the domain ownership properties. */
  body: DomainOwnershipIdentifier;
}

export interface DomainsUpdateOwnershipIdentifierMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type DomainsUpdateOwnershipIdentifierParameters = DomainsUpdateOwnershipIdentifierMediaTypesParam &
  DomainsUpdateOwnershipIdentifierBodyParam &
  RequestParameters;
export type DomainsRenewParameters = RequestParameters;
export type DomainsTransferOutParameters = RequestParameters;
export type TopLevelDomainsListParameters = RequestParameters;
export type TopLevelDomainsGetParameters = RequestParameters;

export interface TopLevelDomainsListAgreementsBodyParam {
  /** Domain agreement options. */
  body: TopLevelDomainAgreementOption;
}

export interface TopLevelDomainsListAgreementsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type TopLevelDomainsListAgreementsParameters = TopLevelDomainsListAgreementsMediaTypesParam &
  TopLevelDomainsListAgreementsBodyParam &
  RequestParameters;
export type DomainRegistrationProviderListOperationsParameters = RequestParameters;
export type AppServiceEnvironmentsListParameters = RequestParameters;
export type AppServiceEnvironmentsListByResourceGroupParameters = RequestParameters;
export type AppServiceEnvironmentsGetParameters = RequestParameters;

export interface AppServiceEnvironmentsCreateOrUpdateBodyParam {
  /** Configuration details of the App Service Environment. */
  body: AppServiceEnvironmentResource;
}

export interface AppServiceEnvironmentsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type AppServiceEnvironmentsCreateOrUpdateParameters = AppServiceEnvironmentsCreateOrUpdateMediaTypesParam &
  AppServiceEnvironmentsCreateOrUpdateBodyParam &
  RequestParameters;

export interface AppServiceEnvironmentsDeleteQueryParamProperties {
  /** Specify <code>true</code> to force the deletion even if the App Service Environment contains resources. The default is <code>false</code>. */
  forceDelete?: boolean;
}

export interface AppServiceEnvironmentsDeleteQueryParam {
  queryParameters?: AppServiceEnvironmentsDeleteQueryParamProperties;
}

export type AppServiceEnvironmentsDeleteParameters = AppServiceEnvironmentsDeleteQueryParam &
  RequestParameters;

export interface AppServiceEnvironmentsUpdateBodyParam {
  /** Configuration details of the App Service Environment. */
  body: AppServiceEnvironmentPatchResource;
}

export interface AppServiceEnvironmentsUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type AppServiceEnvironmentsUpdateParameters = AppServiceEnvironmentsUpdateMediaTypesParam &
  AppServiceEnvironmentsUpdateBodyParam &
  RequestParameters;
export type AppServiceEnvironmentsListCapacitiesParameters = RequestParameters;
export type AppServiceEnvironmentsGetVipInfoParameters = RequestParameters;

export interface AppServiceEnvironmentsChangeVnetBodyParam {
  /** Details for the new virtual network. */
  body: VirtualNetworkProfile;
}

export interface AppServiceEnvironmentsChangeVnetMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type AppServiceEnvironmentsChangeVnetParameters = AppServiceEnvironmentsChangeVnetMediaTypesParam &
  AppServiceEnvironmentsChangeVnetBodyParam &
  RequestParameters;
export type AppServiceEnvironmentsGetAseV3NetworkingConfigurationParameters = RequestParameters;

export interface AppServiceEnvironmentsUpdateAseNetworkingConfigurationBodyParam {
  body: AseV3NetworkingConfiguration;
}

export interface AppServiceEnvironmentsUpdateAseNetworkingConfigurationMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type AppServiceEnvironmentsUpdateAseNetworkingConfigurationParameters = AppServiceEnvironmentsUpdateAseNetworkingConfigurationMediaTypesParam &
  AppServiceEnvironmentsUpdateAseNetworkingConfigurationBodyParam &
  RequestParameters;
export type AppServiceEnvironmentsListDiagnosticsParameters = RequestParameters;
export type AppServiceEnvironmentsGetDiagnosticsItemParameters = RequestParameters;
export type AppServiceEnvironmentsGetInboundNetworkDependenciesEndpointsParameters = RequestParameters;
export type AppServiceEnvironmentsListMultiRolePoolsParameters = RequestParameters;
export type AppServiceEnvironmentsGetMultiRolePoolParameters = RequestParameters;

export interface AppServiceEnvironmentsCreateOrUpdateMultiRolePoolBodyParam {
  /** Properties of the multi-role pool. */
  body: WorkerPoolResource;
}

export interface AppServiceEnvironmentsCreateOrUpdateMultiRolePoolMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type AppServiceEnvironmentsCreateOrUpdateMultiRolePoolParameters = AppServiceEnvironmentsCreateOrUpdateMultiRolePoolMediaTypesParam &
  AppServiceEnvironmentsCreateOrUpdateMultiRolePoolBodyParam &
  RequestParameters;

export interface AppServiceEnvironmentsUpdateMultiRolePoolBodyParam {
  /** Properties of the multi-role pool. */
  body: WorkerPoolResource;
}

export interface AppServiceEnvironmentsUpdateMultiRolePoolMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type AppServiceEnvironmentsUpdateMultiRolePoolParameters = AppServiceEnvironmentsUpdateMultiRolePoolMediaTypesParam &
  AppServiceEnvironmentsUpdateMultiRolePoolBodyParam &
  RequestParameters;
export type AppServiceEnvironmentsListMultiRolePoolInstanceMetricDefinitionsParameters = RequestParameters;
export type AppServiceEnvironmentsListMultiRoleMetricDefinitionsParameters = RequestParameters;
export type AppServiceEnvironmentsListMultiRolePoolSkusParameters = RequestParameters;
export type AppServiceEnvironmentsListMultiRoleUsagesParameters = RequestParameters;
export type AppServiceEnvironmentsListOperationsParameters = RequestParameters;
export type AppServiceEnvironmentsGetOutboundNetworkDependenciesEndpointsParameters = RequestParameters;
export type AppServiceEnvironmentsGetPrivateEndpointConnectionListParameters = RequestParameters;
export type AppServiceEnvironmentsGetPrivateEndpointConnectionParameters = RequestParameters;

export interface AppServiceEnvironmentsApproveOrRejectPrivateEndpointConnectionBodyParam {
  body: PrivateLinkConnectionApprovalRequestResource;
}

export interface AppServiceEnvironmentsApproveOrRejectPrivateEndpointConnectionMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type AppServiceEnvironmentsApproveOrRejectPrivateEndpointConnectionParameters = AppServiceEnvironmentsApproveOrRejectPrivateEndpointConnectionMediaTypesParam &
  AppServiceEnvironmentsApproveOrRejectPrivateEndpointConnectionBodyParam &
  RequestParameters;
export type AppServiceEnvironmentsDeletePrivateEndpointConnectionParameters = RequestParameters;
export type AppServiceEnvironmentsGetPrivateLinkResourcesParameters = RequestParameters;
export type AppServiceEnvironmentsRebootParameters = RequestParameters;
export type AppServiceEnvironmentsResumeParameters = RequestParameters;
export type AppServiceEnvironmentsListAppServicePlansParameters = RequestParameters;

export interface AppServiceEnvironmentsListWebAppsQueryParamProperties {
  /** Comma separated list of app properties to include. */
  propertiesToInclude?: string;
}

export interface AppServiceEnvironmentsListWebAppsQueryParam {
  queryParameters?: AppServiceEnvironmentsListWebAppsQueryParamProperties;
}

export type AppServiceEnvironmentsListWebAppsParameters = AppServiceEnvironmentsListWebAppsQueryParam &
  RequestParameters;
export type AppServiceEnvironmentsSuspendParameters = RequestParameters;

export interface AppServiceEnvironmentsListUsagesQueryParamProperties {
  /** Return only usages/metrics specified in the filter. Filter conforms to odata syntax. Example: $filter=(name.value eq 'Metric1' or name.value eq 'Metric2') and startTime eq 2014-01-01T00:00:00Z and endTime eq 2014-12-31T23:59:59Z and timeGrain eq duration'[Hour|Minute|Day]'. */
  $filter?: string;
}

export interface AppServiceEnvironmentsListUsagesQueryParam {
  queryParameters?: AppServiceEnvironmentsListUsagesQueryParamProperties;
}

export type AppServiceEnvironmentsListUsagesParameters = AppServiceEnvironmentsListUsagesQueryParam &
  RequestParameters;
export type AppServiceEnvironmentsListWorkerPoolsParameters = RequestParameters;
export type AppServiceEnvironmentsGetWorkerPoolParameters = RequestParameters;

export interface AppServiceEnvironmentsCreateOrUpdateWorkerPoolBodyParam {
  /** Properties of the worker pool. */
  body: WorkerPoolResource;
}

export interface AppServiceEnvironmentsCreateOrUpdateWorkerPoolMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type AppServiceEnvironmentsCreateOrUpdateWorkerPoolParameters = AppServiceEnvironmentsCreateOrUpdateWorkerPoolMediaTypesParam &
  AppServiceEnvironmentsCreateOrUpdateWorkerPoolBodyParam &
  RequestParameters;

export interface AppServiceEnvironmentsUpdateWorkerPoolBodyParam {
  /** Properties of the worker pool. */
  body: WorkerPoolResource;
}

export interface AppServiceEnvironmentsUpdateWorkerPoolMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type AppServiceEnvironmentsUpdateWorkerPoolParameters = AppServiceEnvironmentsUpdateWorkerPoolMediaTypesParam &
  AppServiceEnvironmentsUpdateWorkerPoolBodyParam &
  RequestParameters;
export type AppServiceEnvironmentsListWorkerPoolInstanceMetricDefinitionsParameters = RequestParameters;
export type AppServiceEnvironmentsListWebWorkerMetricDefinitionsParameters = RequestParameters;
export type AppServiceEnvironmentsListWorkerPoolSkusParameters = RequestParameters;
export type AppServiceEnvironmentsListWebWorkerUsagesParameters = RequestParameters;

export interface AppServicePlansListQueryParamProperties {
  /**
   * Specify <code>true</code> to return all App Service plan properties. The default is <code>false</code>, which returns a subset of the properties.
   *  Retrieval of all properties may increase the API latency.
   */
  detailed?: boolean;
}

export interface AppServicePlansListQueryParam {
  queryParameters?: AppServicePlansListQueryParamProperties;
}

export type AppServicePlansListParameters = AppServicePlansListQueryParam & RequestParameters;
export type AppServicePlansListByResourceGroupParameters = RequestParameters;
export type AppServicePlansGetParameters = RequestParameters;

export interface AppServicePlansCreateOrUpdateBodyParam {
  /** Details of the App Service plan. */
  body: AppServicePlan;
}

export interface AppServicePlansCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type AppServicePlansCreateOrUpdateParameters = AppServicePlansCreateOrUpdateMediaTypesParam &
  AppServicePlansCreateOrUpdateBodyParam &
  RequestParameters;
export type AppServicePlansDeleteParameters = RequestParameters;

export interface AppServicePlansUpdateBodyParam {
  /** Details of the App Service plan. */
  body: AppServicePlanPatchResource;
}

export interface AppServicePlansUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type AppServicePlansUpdateParameters = AppServicePlansUpdateMediaTypesParam &
  AppServicePlansUpdateBodyParam &
  RequestParameters;
export type AppServicePlansListCapabilitiesParameters = RequestParameters;
export type AppServicePlansGetHybridConnectionParameters = RequestParameters;
export type AppServicePlansDeleteHybridConnectionParameters = RequestParameters;
export type AppServicePlansListHybridConnectionKeysParameters = RequestParameters;
export type AppServicePlansListWebAppsByHybridConnectionParameters = RequestParameters;
export type AppServicePlansGetHybridConnectionPlanLimitParameters = RequestParameters;
export type AppServicePlansListHybridConnectionsParameters = RequestParameters;

export interface AppServicePlansRestartWebAppsQueryParamProperties {
  /** Specify <code>true</code> to perform a soft restart, applies the configuration settings and restarts the apps if necessary. The default is <code>false</code>, which always restarts and reprovisions the apps */
  softRestart?: boolean;
}

export interface AppServicePlansRestartWebAppsQueryParam {
  queryParameters?: AppServicePlansRestartWebAppsQueryParamProperties;
}

export type AppServicePlansRestartWebAppsParameters = AppServicePlansRestartWebAppsQueryParam &
  RequestParameters;

export interface AppServicePlansListWebAppsQueryParamProperties {
  /** Skip to a web app in the list of webapps associated with app service plan. If specified, the resulting list will contain web apps starting from (including) the skipToken. Otherwise, the resulting list contains web apps from the start of the list */
  $skipToken?: string;
  /** Supported filter: $filter=state eq running. Returns only web apps that are currently running */
  $filter?: string;
  /** List page size. If specified, results are paged. */
  $top?: string;
}

export interface AppServicePlansListWebAppsQueryParam {
  queryParameters?: AppServicePlansListWebAppsQueryParamProperties;
}

export type AppServicePlansListWebAppsParameters = AppServicePlansListWebAppsQueryParam &
  RequestParameters;
export type AppServicePlansGetServerFarmSkusParameters = RequestParameters;

export interface AppServicePlansListUsagesQueryParamProperties {
  /** Return only usages/metrics specified in the filter. Filter conforms to odata syntax. Example: $filter=(name.value eq 'Metric1' or name.value eq 'Metric2'). */
  $filter?: string;
}

export interface AppServicePlansListUsagesQueryParam {
  queryParameters?: AppServicePlansListUsagesQueryParamProperties;
}

export type AppServicePlansListUsagesParameters = AppServicePlansListUsagesQueryParam &
  RequestParameters;
export type AppServicePlansListVnetsParameters = RequestParameters;
export type AppServicePlansGetVnetFromServerFarmParameters = RequestParameters;
export type AppServicePlansGetVnetGatewayParameters = RequestParameters;

export interface AppServicePlansUpdateVnetGatewayBodyParam {
  /** Definition of the gateway. */
  body: VnetGateway;
}

export interface AppServicePlansUpdateVnetGatewayMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type AppServicePlansUpdateVnetGatewayParameters = AppServicePlansUpdateVnetGatewayMediaTypesParam &
  AppServicePlansUpdateVnetGatewayBodyParam &
  RequestParameters;
export type AppServicePlansListRoutesForVnetParameters = RequestParameters;
export type AppServicePlansGetRouteForVnetParameters = RequestParameters;

export interface AppServicePlansCreateOrUpdateVnetRouteBodyParam {
  /** Definition of the Virtual Network route. */
  body: VnetRoute;
}

export interface AppServicePlansCreateOrUpdateVnetRouteMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type AppServicePlansCreateOrUpdateVnetRouteParameters = AppServicePlansCreateOrUpdateVnetRouteMediaTypesParam &
  AppServicePlansCreateOrUpdateVnetRouteBodyParam &
  RequestParameters;
export type AppServicePlansDeleteVnetRouteParameters = RequestParameters;

export interface AppServicePlansUpdateVnetRouteBodyParam {
  /** Definition of the Virtual Network route. */
  body: VnetRoute;
}

export interface AppServicePlansUpdateVnetRouteMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type AppServicePlansUpdateVnetRouteParameters = AppServicePlansUpdateVnetRouteMediaTypesParam &
  AppServicePlansUpdateVnetRouteBodyParam &
  RequestParameters;
export type AppServicePlansRebootWorkerParameters = RequestParameters;

export interface CertificatesListQueryParamProperties {
  /** Return only information specified in the filter (using OData syntax). For example: $filter=KeyVaultId eq 'KeyVaultId' */
  $filter?: string;
}

export interface CertificatesListQueryParam {
  queryParameters?: CertificatesListQueryParamProperties;
}

export type CertificatesListParameters = CertificatesListQueryParam & RequestParameters;
export type CertificatesListByResourceGroupParameters = RequestParameters;
export type CertificatesGetParameters = RequestParameters;

export interface CertificatesCreateOrUpdateBodyParam {
  /** Details of certificate, if it exists already. */
  body: Certificate;
}

export interface CertificatesCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type CertificatesCreateOrUpdateParameters = CertificatesCreateOrUpdateMediaTypesParam &
  CertificatesCreateOrUpdateBodyParam &
  RequestParameters;
export type CertificatesDeleteParameters = RequestParameters;

export interface CertificatesUpdateBodyParam {
  /** Details of certificate, if it exists already. */
  body: CertificatePatchResource;
}

export interface CertificatesUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type CertificatesUpdateParameters = CertificatesUpdateMediaTypesParam &
  CertificatesUpdateBodyParam &
  RequestParameters;
export type ContainerAppsListBySubscriptionParameters = RequestParameters;
export type ContainerAppsListByResourceGroupParameters = RequestParameters;
export type ContainerAppsGetParameters = RequestParameters;

export interface ContainerAppsCreateOrUpdateBodyParam {
  body: ContainerApp;
}

export interface ContainerAppsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ContainerAppsCreateOrUpdateParameters = ContainerAppsCreateOrUpdateMediaTypesParam &
  ContainerAppsCreateOrUpdateBodyParam &
  RequestParameters;
export type ContainerAppsDeleteParameters = RequestParameters;
export type ContainerAppsListSecretsParameters = RequestParameters;
export type ContainerAppsRevisionsListRevisionsParameters = RequestParameters;
export type ContainerAppsRevisionsGetRevisionParameters = RequestParameters;
export type ContainerAppsRevisionsActivateRevisionParameters = RequestParameters;
export type ContainerAppsRevisionsDeactivateRevisionParameters = RequestParameters;
export type ContainerAppsRevisionsRestartRevisionParameters = RequestParameters;
export type DeletedWebAppsListParameters = RequestParameters;
export type DeletedWebAppsListByLocationParameters = RequestParameters;
export type DeletedWebAppsGetDeletedWebAppByLocationParameters = RequestParameters;
export type DiagnosticsListHostingEnvironmentDetectorResponsesParameters = RequestParameters;

export interface DiagnosticsGetHostingEnvironmentDetectorResponseQueryParamProperties {
  /** Start Time */
  startTime?: Date | string;
  /** End Time */
  endTime?: Date | string;
  /** Time Grain */
  timeGrain?: string;
}

export interface DiagnosticsGetHostingEnvironmentDetectorResponseQueryParam {
  queryParameters?: DiagnosticsGetHostingEnvironmentDetectorResponseQueryParamProperties;
}

export type DiagnosticsGetHostingEnvironmentDetectorResponseParameters = DiagnosticsGetHostingEnvironmentDetectorResponseQueryParam &
  RequestParameters;
export type DiagnosticsListSiteDetectorResponsesParameters = RequestParameters;

export interface DiagnosticsGetSiteDetectorResponseQueryParamProperties {
  /** Start Time */
  startTime?: Date | string;
  /** End Time */
  endTime?: Date | string;
  /** Time Grain */
  timeGrain?: string;
}

export interface DiagnosticsGetSiteDetectorResponseQueryParam {
  queryParameters?: DiagnosticsGetSiteDetectorResponseQueryParamProperties;
}

export type DiagnosticsGetSiteDetectorResponseParameters = DiagnosticsGetSiteDetectorResponseQueryParam &
  RequestParameters;
export type DiagnosticsListSiteDiagnosticCategoriesParameters = RequestParameters;
export type DiagnosticsGetSiteDiagnosticCategoryParameters = RequestParameters;
export type DiagnosticsListSiteAnalysesParameters = RequestParameters;
export type DiagnosticsGetSiteAnalysisParameters = RequestParameters;

export interface DiagnosticsExecuteSiteAnalysisQueryParamProperties {
  /** Start Time */
  startTime?: Date | string;
  /** End Time */
  endTime?: Date | string;
  /** Time Grain */
  timeGrain?: string;
}

export interface DiagnosticsExecuteSiteAnalysisQueryParam {
  queryParameters?: DiagnosticsExecuteSiteAnalysisQueryParamProperties;
}

export type DiagnosticsExecuteSiteAnalysisParameters = DiagnosticsExecuteSiteAnalysisQueryParam &
  RequestParameters;
export type DiagnosticsListSiteDetectorsParameters = RequestParameters;
export type DiagnosticsGetSiteDetectorParameters = RequestParameters;

export interface DiagnosticsExecuteSiteDetectorQueryParamProperties {
  /** Start Time */
  startTime?: Date | string;
  /** End Time */
  endTime?: Date | string;
  /** Time Grain */
  timeGrain?: string;
}

export interface DiagnosticsExecuteSiteDetectorQueryParam {
  queryParameters?: DiagnosticsExecuteSiteDetectorQueryParamProperties;
}

export type DiagnosticsExecuteSiteDetectorParameters = DiagnosticsExecuteSiteDetectorQueryParam &
  RequestParameters;
export type DiagnosticsListSiteDetectorResponsesSlotParameters = RequestParameters;

export interface DiagnosticsGetSiteDetectorResponseSlotQueryParamProperties {
  /** Start Time */
  startTime?: Date | string;
  /** End Time */
  endTime?: Date | string;
  /** Time Grain */
  timeGrain?: string;
}

export interface DiagnosticsGetSiteDetectorResponseSlotQueryParam {
  queryParameters?: DiagnosticsGetSiteDetectorResponseSlotQueryParamProperties;
}

export type DiagnosticsGetSiteDetectorResponseSlotParameters = DiagnosticsGetSiteDetectorResponseSlotQueryParam &
  RequestParameters;
export type DiagnosticsListSiteDiagnosticCategoriesSlotParameters = RequestParameters;
export type DiagnosticsGetSiteDiagnosticCategorySlotParameters = RequestParameters;
export type DiagnosticsListSiteAnalysesSlotParameters = RequestParameters;
export type DiagnosticsGetSiteAnalysisSlotParameters = RequestParameters;

export interface DiagnosticsExecuteSiteAnalysisSlotQueryParamProperties {
  /** Start Time */
  startTime?: Date | string;
  /** End Time */
  endTime?: Date | string;
  /** Time Grain */
  timeGrain?: string;
}

export interface DiagnosticsExecuteSiteAnalysisSlotQueryParam {
  queryParameters?: DiagnosticsExecuteSiteAnalysisSlotQueryParamProperties;
}

export type DiagnosticsExecuteSiteAnalysisSlotParameters = DiagnosticsExecuteSiteAnalysisSlotQueryParam &
  RequestParameters;
export type DiagnosticsListSiteDetectorsSlotParameters = RequestParameters;
export type DiagnosticsGetSiteDetectorSlotParameters = RequestParameters;

export interface DiagnosticsExecuteSiteDetectorSlotQueryParamProperties {
  /** Start Time */
  startTime?: Date | string;
  /** End Time */
  endTime?: Date | string;
  /** Time Grain */
  timeGrain?: string;
}

export interface DiagnosticsExecuteSiteDetectorSlotQueryParam {
  queryParameters?: DiagnosticsExecuteSiteDetectorSlotQueryParamProperties;
}

export type DiagnosticsExecuteSiteDetectorSlotParameters = DiagnosticsExecuteSiteDetectorSlotQueryParam &
  RequestParameters;
export type GlobalGetDeletedWebAppParameters = RequestParameters;
export type GlobalGetDeletedWebAppSnapshotsParameters = RequestParameters;
export type GlobalGetSubscriptionOperationWithAsyncResponseParameters = RequestParameters;
export type KubeEnvironmentsListBySubscriptionParameters = RequestParameters;
export type KubeEnvironmentsListByResourceGroupParameters = RequestParameters;
export type KubeEnvironmentsGetParameters = RequestParameters;

export interface KubeEnvironmentsCreateOrUpdateBodyParam {
  /** Configuration details of the Kubernetes Environment. */
  body: KubeEnvironment;
}

export interface KubeEnvironmentsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type KubeEnvironmentsCreateOrUpdateParameters = KubeEnvironmentsCreateOrUpdateMediaTypesParam &
  KubeEnvironmentsCreateOrUpdateBodyParam &
  RequestParameters;
export type KubeEnvironmentsDeleteParameters = RequestParameters;

export interface KubeEnvironmentsUpdateBodyParam {
  /** Configuration details of the Kubernetes Environment. */
  body: KubeEnvironmentPatchResource;
}

export interface KubeEnvironmentsUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type KubeEnvironmentsUpdateParameters = KubeEnvironmentsUpdateMediaTypesParam &
  KubeEnvironmentsUpdateBodyParam &
  RequestParameters;

export interface ProviderGetAvailableStacksQueryParamProperties {
  osTypeSelected?: "Windows" | "Linux" | "WindowsFunctions" | "LinuxFunctions" | "All";
}

export interface ProviderGetAvailableStacksQueryParam {
  queryParameters?: ProviderGetAvailableStacksQueryParamProperties;
}

export type ProviderGetAvailableStacksParameters = ProviderGetAvailableStacksQueryParam &
  RequestParameters;

export interface ProviderGetFunctionAppStacksQueryParamProperties {
  /** Stack OS Type */
  stackOsType?: "Windows" | "Linux" | "All";
}

export interface ProviderGetFunctionAppStacksQueryParam {
  queryParameters?: ProviderGetFunctionAppStacksQueryParamProperties;
}

export type ProviderGetFunctionAppStacksParameters = ProviderGetFunctionAppStacksQueryParam &
  RequestParameters;

export interface ProviderGetFunctionAppStacksForLocationQueryParamProperties {
  /** Stack OS Type */
  stackOsType?: "Windows" | "Linux" | "All";
}

export interface ProviderGetFunctionAppStacksForLocationQueryParam {
  queryParameters?: ProviderGetFunctionAppStacksForLocationQueryParamProperties;
}

export type ProviderGetFunctionAppStacksForLocationParameters = ProviderGetFunctionAppStacksForLocationQueryParam &
  RequestParameters;

export interface ProviderGetWebAppStacksForLocationQueryParamProperties {
  /** Stack OS Type */
  stackOsType?: "Windows" | "Linux" | "All";
}

export interface ProviderGetWebAppStacksForLocationQueryParam {
  queryParameters?: ProviderGetWebAppStacksForLocationQueryParamProperties;
}

export type ProviderGetWebAppStacksForLocationParameters = ProviderGetWebAppStacksForLocationQueryParam &
  RequestParameters;
export type ProviderListOperationsParameters = RequestParameters;

export interface ProviderGetWebAppStacksQueryParamProperties {
  /** Stack OS Type */
  stackOsType?: "Windows" | "Linux" | "All";
}

export interface ProviderGetWebAppStacksQueryParam {
  queryParameters?: ProviderGetWebAppStacksQueryParamProperties;
}

export type ProviderGetWebAppStacksParameters = ProviderGetWebAppStacksQueryParam &
  RequestParameters;

export interface ProviderGetAvailableStacksOnPremQueryParamProperties {
  osTypeSelected?: "Windows" | "Linux" | "WindowsFunctions" | "LinuxFunctions" | "All";
}

export interface ProviderGetAvailableStacksOnPremQueryParam {
  queryParameters?: ProviderGetAvailableStacksOnPremQueryParamProperties;
}

export type ProviderGetAvailableStacksOnPremParameters = ProviderGetAvailableStacksOnPremQueryParam &
  RequestParameters;

export interface RecommendationsListQueryParamProperties {
  /** Specify <code>true</code> to return only the most critical recommendations. The default is <code>false</code>, which returns all recommendations. */
  featured?: boolean;
  /** Filter is specified by using OData syntax. Example: $filter=channel eq 'Api' or channel eq 'Notification' and startTime eq 2014-01-01T00:00:00Z and endTime eq 2014-12-31T23:59:59Z and timeGrain eq duration'[PT1H|PT1M|P1D] */
  $filter?: string;
}

export interface RecommendationsListQueryParam {
  queryParameters?: RecommendationsListQueryParamProperties;
}

export type RecommendationsListParameters = RecommendationsListQueryParam & RequestParameters;
export type RecommendationsResetAllFiltersParameters = RequestParameters;
export type RecommendationsDisableRecommendationForSubscriptionParameters = RequestParameters;

export interface RecommendationsListHistoryForHostingEnvironmentQueryParamProperties {
  /** Specify <code>false</code> to return all recommendations. The default is <code>true</code>, which returns only expired recommendations. */
  expiredOnly?: boolean;
  /** Filter is specified by using OData syntax. Example: $filter=channel eq 'Api' or channel eq 'Notification' and startTime eq 2014-01-01T00:00:00Z and endTime eq 2014-12-31T23:59:59Z and timeGrain eq duration'[PT1H|PT1M|P1D] */
  $filter?: string;
}

export interface RecommendationsListHistoryForHostingEnvironmentQueryParam {
  queryParameters?: RecommendationsListHistoryForHostingEnvironmentQueryParamProperties;
}

export type RecommendationsListHistoryForHostingEnvironmentParameters = RecommendationsListHistoryForHostingEnvironmentQueryParam &
  RequestParameters;

export interface RecommendationsListRecommendedRulesForHostingEnvironmentQueryParamProperties {
  /** Specify <code>true</code> to return only the most critical recommendations. The default is <code>false</code>, which returns all recommendations. */
  featured?: boolean;
  /** Return only channels specified in the filter. Filter is specified by using OData syntax. Example: $filter=channel eq 'Api' or channel eq 'Notification' */
  $filter?: string;
}

export interface RecommendationsListRecommendedRulesForHostingEnvironmentQueryParam {
  queryParameters?: RecommendationsListRecommendedRulesForHostingEnvironmentQueryParamProperties;
}

export type RecommendationsListRecommendedRulesForHostingEnvironmentParameters = RecommendationsListRecommendedRulesForHostingEnvironmentQueryParam &
  RequestParameters;

export interface RecommendationsDisableAllForHostingEnvironmentQueryParamProperties {
  /** Name of the app. */
  environmentName: string;
}

export interface RecommendationsDisableAllForHostingEnvironmentQueryParam {
  queryParameters: RecommendationsDisableAllForHostingEnvironmentQueryParamProperties;
}

export type RecommendationsDisableAllForHostingEnvironmentParameters = RecommendationsDisableAllForHostingEnvironmentQueryParam &
  RequestParameters;

export interface RecommendationsResetAllFiltersForHostingEnvironmentQueryParamProperties {
  /** Name of the app. */
  environmentName: string;
}

export interface RecommendationsResetAllFiltersForHostingEnvironmentQueryParam {
  queryParameters: RecommendationsResetAllFiltersForHostingEnvironmentQueryParamProperties;
}

export type RecommendationsResetAllFiltersForHostingEnvironmentParameters = RecommendationsResetAllFiltersForHostingEnvironmentQueryParam &
  RequestParameters;

export interface RecommendationsGetRuleDetailsByHostingEnvironmentQueryParamProperties {
  /** Specify <code>true</code> to update the last-seen timestamp of the recommendation object. */
  updateSeen?: boolean;
  /** The GUID of the recommendation object if you query an expired one. You don't need to specify it to query an active entry. */
  recommendationId?: string;
}

export interface RecommendationsGetRuleDetailsByHostingEnvironmentQueryParam {
  queryParameters?: RecommendationsGetRuleDetailsByHostingEnvironmentQueryParamProperties;
}

export type RecommendationsGetRuleDetailsByHostingEnvironmentParameters = RecommendationsGetRuleDetailsByHostingEnvironmentQueryParam &
  RequestParameters;

export interface RecommendationsDisableRecommendationForHostingEnvironmentQueryParamProperties {
  /** Site name */
  environmentName: string;
}

export interface RecommendationsDisableRecommendationForHostingEnvironmentQueryParam {
  queryParameters: RecommendationsDisableRecommendationForHostingEnvironmentQueryParamProperties;
}

export type RecommendationsDisableRecommendationForHostingEnvironmentParameters = RecommendationsDisableRecommendationForHostingEnvironmentQueryParam &
  RequestParameters;

export interface RecommendationsListHistoryForWebAppQueryParamProperties {
  /** Specify <code>false</code> to return all recommendations. The default is <code>true</code>, which returns only expired recommendations. */
  expiredOnly?: boolean;
  /** Filter is specified by using OData syntax. Example: $filter=channel eq 'Api' or channel eq 'Notification' and startTime eq 2014-01-01T00:00:00Z and endTime eq 2014-12-31T23:59:59Z and timeGrain eq duration'[PT1H|PT1M|P1D] */
  $filter?: string;
}

export interface RecommendationsListHistoryForWebAppQueryParam {
  queryParameters?: RecommendationsListHistoryForWebAppQueryParamProperties;
}

export type RecommendationsListHistoryForWebAppParameters = RecommendationsListHistoryForWebAppQueryParam &
  RequestParameters;

export interface RecommendationsListRecommendedRulesForWebAppQueryParamProperties {
  /** Specify <code>true</code> to return only the most critical recommendations. The default is <code>false</code>, which returns all recommendations. */
  featured?: boolean;
  /** Return only channels specified in the filter. Filter is specified by using OData syntax. Example: $filter=channel eq 'Api' or channel eq 'Notification' */
  $filter?: string;
}

export interface RecommendationsListRecommendedRulesForWebAppQueryParam {
  queryParameters?: RecommendationsListRecommendedRulesForWebAppQueryParamProperties;
}

export type RecommendationsListRecommendedRulesForWebAppParameters = RecommendationsListRecommendedRulesForWebAppQueryParam &
  RequestParameters;
export type RecommendationsDisableAllForWebAppParameters = RequestParameters;
export type RecommendationsResetAllFiltersForWebAppParameters = RequestParameters;

export interface RecommendationsGetRuleDetailsByWebAppQueryParamProperties {
  /** Specify <code>true</code> to update the last-seen timestamp of the recommendation object. */
  updateSeen?: boolean;
  /** The GUID of the recommendation object if you query an expired one. You don't need to specify it to query an active entry. */
  recommendationId?: string;
}

export interface RecommendationsGetRuleDetailsByWebAppQueryParam {
  queryParameters?: RecommendationsGetRuleDetailsByWebAppQueryParamProperties;
}

export type RecommendationsGetRuleDetailsByWebAppParameters = RecommendationsGetRuleDetailsByWebAppQueryParam &
  RequestParameters;
export type RecommendationsDisableRecommendationForSiteParameters = RequestParameters;
export type ResourceHealthMetadataListParameters = RequestParameters;
export type ResourceHealthMetadataListByResourceGroupParameters = RequestParameters;
export type ResourceHealthMetadataListBySiteParameters = RequestParameters;
export type ResourceHealthMetadataGetBySiteParameters = RequestParameters;
export type ResourceHealthMetadataListBySiteSlotParameters = RequestParameters;
export type ResourceHealthMetadataGetBySiteSlotParameters = RequestParameters;
export type GetPublishingUserParameters = RequestParameters;

export interface UpdatePublishingUserBodyParam {
  /** Details of publishing user */
  body: User;
}

export interface UpdatePublishingUserMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type UpdatePublishingUserParameters = UpdatePublishingUserMediaTypesParam &
  UpdatePublishingUserBodyParam &
  RequestParameters;
export type ListSourceControlsParameters = RequestParameters;
export type GetSourceControlParameters = RequestParameters;

export interface UpdateSourceControlBodyParam {
  /** Source control token information */
  body: SourceControl;
}

export interface UpdateSourceControlMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type UpdateSourceControlParameters = UpdateSourceControlMediaTypesParam &
  UpdateSourceControlBodyParam &
  RequestParameters;

export interface ListBillingMetersQueryParamProperties {
  /** Azure Location of billable resource */
  billingLocation?: string;
  /** App Service OS type meters used for */
  osType?: string;
}

export interface ListBillingMetersQueryParam {
  queryParameters?: ListBillingMetersQueryParamProperties;
}

export type ListBillingMetersParameters = ListBillingMetersQueryParam & RequestParameters;

export interface CheckNameAvailabilityBodyParam {
  /** Name availability request. */
  body: ResourceNameAvailabilityRequest;
}

export interface CheckNameAvailabilityMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type CheckNameAvailabilityParameters = CheckNameAvailabilityMediaTypesParam &
  CheckNameAvailabilityBodyParam &
  RequestParameters;
export type ListCustomHostNameSitesParameters = RequestParameters;
export type GetSubscriptionDeploymentLocationsParameters = RequestParameters;

export interface ListGeoRegionsQueryParamProperties {
  /** Name of SKU used to filter the regions. */
  sku?:
    | "Free"
    | "Shared"
    | "Basic"
    | "Standard"
    | "Premium"
    | "Dynamic"
    | "Isolated"
    | "IsolatedV2"
    | "PremiumV2"
    | "PremiumV3"
    | "PremiumContainer"
    | "ElasticPremium"
    | "ElasticIsolated";
  /** Specify <code>true</code> if you want to filter to only regions that support Linux workers. */
  linuxWorkersEnabled?: boolean;
  /** Specify <code>true</code> if you want to filter to only regions that support Xenon workers. */
  xenonWorkersEnabled?: boolean;
  /** Specify <code>true</code> if you want to filter to only regions that support Linux Consumption Workers. */
  linuxDynamicWorkersEnabled?: boolean;
}

export interface ListGeoRegionsQueryParam {
  queryParameters?: ListGeoRegionsQueryParamProperties;
}

export type ListGeoRegionsParameters = ListGeoRegionsQueryParam & RequestParameters;

export interface ListSiteIdentifiersAssignedToHostNameBodyParam {
  /** Hostname information. */
  body: NameIdentifier;
}

export interface ListSiteIdentifiersAssignedToHostNameMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ListSiteIdentifiersAssignedToHostNameParameters = ListSiteIdentifiersAssignedToHostNameMediaTypesParam &
  ListSiteIdentifiersAssignedToHostNameBodyParam &
  RequestParameters;
export type ListPremierAddOnOffersParameters = RequestParameters;
export type ListSkusParameters = RequestParameters;

export interface VerifyHostingEnvironmentVnetBodyParam {
  /** VNET information */
  body: VnetParameters;
}

export interface VerifyHostingEnvironmentVnetMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VerifyHostingEnvironmentVnetParameters = VerifyHostingEnvironmentVnetMediaTypesParam &
  VerifyHostingEnvironmentVnetBodyParam &
  RequestParameters;

export interface MoveBodyParam {
  /** Object that represents the resource to move. */
  body: CsmMoveResourceEnvelope;
}

export interface MoveMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type MoveParameters = MoveMediaTypesParam & MoveBodyParam & RequestParameters;

export interface ValidateBodyParam {
  /** Request with the resources to validate. */
  body: ValidateRequest;
}

export interface ValidateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ValidateParameters = ValidateMediaTypesParam & ValidateBodyParam & RequestParameters;

export interface ValidateMoveBodyParam {
  /** Object that represents the resource to move. */
  body: CsmMoveResourceEnvelope;
}

export interface ValidateMoveMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ValidateMoveParameters = ValidateMoveMediaTypesParam &
  ValidateMoveBodyParam &
  RequestParameters;

export interface StaticSitesPreviewWorkflowBodyParam {
  /** A JSON representation of the StaticSitesWorkflowPreviewRequest properties. See example. */
  body: StaticSitesWorkflowPreviewRequest;
}

export interface StaticSitesPreviewWorkflowMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type StaticSitesPreviewWorkflowParameters = StaticSitesPreviewWorkflowMediaTypesParam &
  StaticSitesPreviewWorkflowBodyParam &
  RequestParameters;
export type StaticSitesListParameters = RequestParameters;
export type StaticSitesGetStaticSitesByResourceGroupParameters = RequestParameters;
export type StaticSitesGetStaticSiteParameters = RequestParameters;

export interface StaticSitesCreateOrUpdateStaticSiteBodyParam {
  /** A JSON representation of the staticsite properties. See example. */
  body: StaticSiteARMResource;
}

export interface StaticSitesCreateOrUpdateStaticSiteMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type StaticSitesCreateOrUpdateStaticSiteParameters = StaticSitesCreateOrUpdateStaticSiteMediaTypesParam &
  StaticSitesCreateOrUpdateStaticSiteBodyParam &
  RequestParameters;
export type StaticSitesDeleteStaticSiteParameters = RequestParameters;

export interface StaticSitesUpdateStaticSiteBodyParam {
  /** A JSON representation of the staticsite properties. See example. */
  body: StaticSitePatchResource;
}

export interface StaticSitesUpdateStaticSiteMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type StaticSitesUpdateStaticSiteParameters = StaticSitesUpdateStaticSiteMediaTypesParam &
  StaticSitesUpdateStaticSiteBodyParam &
  RequestParameters;
export type StaticSitesListStaticSiteUsersParameters = RequestParameters;
export type StaticSitesDeleteStaticSiteUserParameters = RequestParameters;

export interface StaticSitesUpdateStaticSiteUserBodyParam {
  /** A JSON representation of the StaticSiteUser properties. See example. */
  body: StaticSiteUserARMResource;
}

export interface StaticSitesUpdateStaticSiteUserMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type StaticSitesUpdateStaticSiteUserParameters = StaticSitesUpdateStaticSiteUserMediaTypesParam &
  StaticSitesUpdateStaticSiteUserBodyParam &
  RequestParameters;
export type StaticSitesGetStaticSiteBuildsParameters = RequestParameters;
export type StaticSitesGetStaticSiteBuildParameters = RequestParameters;
export type StaticSitesDeleteStaticSiteBuildParameters = RequestParameters;

export interface StaticSitesCreateOrUpdateStaticSiteBuildAppSettingsBodyParam {
  /** The dictionary containing the static site app settings to update. */
  body: StringDictionary;
}

export interface StaticSitesCreateOrUpdateStaticSiteBuildAppSettingsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type StaticSitesCreateOrUpdateStaticSiteBuildAppSettingsParameters = StaticSitesCreateOrUpdateStaticSiteBuildAppSettingsMediaTypesParam &
  StaticSitesCreateOrUpdateStaticSiteBuildAppSettingsBodyParam &
  RequestParameters;

export interface StaticSitesCreateOrUpdateStaticSiteBuildFunctionAppSettingsBodyParam {
  /** The dictionary containing the static site function app settings to update. */
  body: StringDictionary;
}

export interface StaticSitesCreateOrUpdateStaticSiteBuildFunctionAppSettingsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type StaticSitesCreateOrUpdateStaticSiteBuildFunctionAppSettingsParameters = StaticSitesCreateOrUpdateStaticSiteBuildFunctionAppSettingsMediaTypesParam &
  StaticSitesCreateOrUpdateStaticSiteBuildFunctionAppSettingsBodyParam &
  RequestParameters;
export type StaticSitesListStaticSiteBuildFunctionsParameters = RequestParameters;
export type StaticSitesListStaticSiteBuildAppSettingsParameters = RequestParameters;
export type StaticSitesListStaticSiteBuildFunctionAppSettingsParameters = RequestParameters;
export type StaticSitesGetUserProvidedFunctionAppsForStaticSiteBuildParameters = RequestParameters;
export type StaticSitesGetUserProvidedFunctionAppForStaticSiteBuildParameters = RequestParameters;

export interface StaticSitesRegisterUserProvidedFunctionAppWithStaticSiteBuildBodyParam {
  /** A JSON representation of the user provided function app properties. See example. */
  body: StaticSiteUserProvidedFunctionAppARMResource;
}

export interface StaticSitesRegisterUserProvidedFunctionAppWithStaticSiteBuildQueryParamProperties {
  /** Specify <code>true</code> to force the update of the auth configuration on the function app even if an AzureStaticWebApps provider is already configured on the function app. The default is <code>false</code>. */
  isForced?: boolean;
}

export interface StaticSitesRegisterUserProvidedFunctionAppWithStaticSiteBuildQueryParam {
  queryParameters?: StaticSitesRegisterUserProvidedFunctionAppWithStaticSiteBuildQueryParamProperties;
}

export interface StaticSitesRegisterUserProvidedFunctionAppWithStaticSiteBuildMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type StaticSitesRegisterUserProvidedFunctionAppWithStaticSiteBuildParameters = StaticSitesRegisterUserProvidedFunctionAppWithStaticSiteBuildQueryParam &
  StaticSitesRegisterUserProvidedFunctionAppWithStaticSiteBuildMediaTypesParam &
  StaticSitesRegisterUserProvidedFunctionAppWithStaticSiteBuildBodyParam &
  RequestParameters;
export type StaticSitesDetachUserProvidedFunctionAppFromStaticSiteBuildParameters = RequestParameters;

export interface StaticSitesCreateZipDeploymentForStaticSiteBuildBodyParam {
  /** A JSON representation of the StaticSiteZipDeployment properties. See example. */
  body: StaticSiteZipDeploymentARMResource;
}

export interface StaticSitesCreateZipDeploymentForStaticSiteBuildMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type StaticSitesCreateZipDeploymentForStaticSiteBuildParameters = StaticSitesCreateZipDeploymentForStaticSiteBuildMediaTypesParam &
  StaticSitesCreateZipDeploymentForStaticSiteBuildBodyParam &
  RequestParameters;

export interface StaticSitesCreateOrUpdateStaticSiteAppSettingsBodyParam {
  /** The dictionary containing the static site app settings to update. */
  body: StringDictionary;
}

export interface StaticSitesCreateOrUpdateStaticSiteAppSettingsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type StaticSitesCreateOrUpdateStaticSiteAppSettingsParameters = StaticSitesCreateOrUpdateStaticSiteAppSettingsMediaTypesParam &
  StaticSitesCreateOrUpdateStaticSiteAppSettingsBodyParam &
  RequestParameters;

export interface StaticSitesCreateOrUpdateStaticSiteFunctionAppSettingsBodyParam {
  /** The dictionary containing the static site function app settings to update. */
  body: StringDictionary;
}

export interface StaticSitesCreateOrUpdateStaticSiteFunctionAppSettingsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type StaticSitesCreateOrUpdateStaticSiteFunctionAppSettingsParameters = StaticSitesCreateOrUpdateStaticSiteFunctionAppSettingsMediaTypesParam &
  StaticSitesCreateOrUpdateStaticSiteFunctionAppSettingsBodyParam &
  RequestParameters;

export interface StaticSitesCreateUserRolesInvitationLinkBodyParam {
  body: StaticSiteUserInvitationRequestResource;
}

export interface StaticSitesCreateUserRolesInvitationLinkMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type StaticSitesCreateUserRolesInvitationLinkParameters = StaticSitesCreateUserRolesInvitationLinkMediaTypesParam &
  StaticSitesCreateUserRolesInvitationLinkBodyParam &
  RequestParameters;
export type StaticSitesListStaticSiteCustomDomainsParameters = RequestParameters;
export type StaticSitesGetStaticSiteCustomDomainParameters = RequestParameters;

export interface StaticSitesCreateOrUpdateStaticSiteCustomDomainBodyParam {
  /** A JSON representation of the static site custom domain request properties. See example. */
  body: StaticSiteCustomDomainRequestPropertiesARMResource;
}

export interface StaticSitesCreateOrUpdateStaticSiteCustomDomainMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type StaticSitesCreateOrUpdateStaticSiteCustomDomainParameters = StaticSitesCreateOrUpdateStaticSiteCustomDomainMediaTypesParam &
  StaticSitesCreateOrUpdateStaticSiteCustomDomainBodyParam &
  RequestParameters;
export type StaticSitesDeleteStaticSiteCustomDomainParameters = RequestParameters;

export interface StaticSitesValidateCustomDomainCanBeAddedToStaticSiteBodyParam {
  /** A JSON representation of the static site custom domain request properties. See example. */
  body: StaticSiteCustomDomainRequestPropertiesARMResource;
}

export interface StaticSitesValidateCustomDomainCanBeAddedToStaticSiteMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type StaticSitesValidateCustomDomainCanBeAddedToStaticSiteParameters = StaticSitesValidateCustomDomainCanBeAddedToStaticSiteMediaTypesParam &
  StaticSitesValidateCustomDomainCanBeAddedToStaticSiteBodyParam &
  RequestParameters;
export type StaticSitesDetachStaticSiteParameters = RequestParameters;
export type StaticSitesListStaticSiteFunctionsParameters = RequestParameters;
export type StaticSitesListStaticSiteAppSettingsParameters = RequestParameters;
export type StaticSitesListStaticSiteConfiguredRolesParameters = RequestParameters;
export type StaticSitesListStaticSiteFunctionAppSettingsParameters = RequestParameters;
export type StaticSitesListStaticSiteSecretsParameters = RequestParameters;
export type StaticSitesGetPrivateEndpointConnectionListParameters = RequestParameters;
export type StaticSitesGetPrivateEndpointConnectionParameters = RequestParameters;

export interface StaticSitesApproveOrRejectPrivateEndpointConnectionBodyParam {
  /** Request body. */
  body: PrivateLinkConnectionApprovalRequestResource;
}

export interface StaticSitesApproveOrRejectPrivateEndpointConnectionMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type StaticSitesApproveOrRejectPrivateEndpointConnectionParameters = StaticSitesApproveOrRejectPrivateEndpointConnectionMediaTypesParam &
  StaticSitesApproveOrRejectPrivateEndpointConnectionBodyParam &
  RequestParameters;
export type StaticSitesDeletePrivateEndpointConnectionParameters = RequestParameters;
export type StaticSitesGetPrivateLinkResourcesParameters = RequestParameters;

export interface StaticSitesResetStaticSiteApiKeyBodyParam {
  body: StaticSiteResetPropertiesARMResource;
}

export interface StaticSitesResetStaticSiteApiKeyMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type StaticSitesResetStaticSiteApiKeyParameters = StaticSitesResetStaticSiteApiKeyMediaTypesParam &
  StaticSitesResetStaticSiteApiKeyBodyParam &
  RequestParameters;
export type StaticSitesGetUserProvidedFunctionAppsForStaticSiteParameters = RequestParameters;
export type StaticSitesGetUserProvidedFunctionAppForStaticSiteParameters = RequestParameters;

export interface StaticSitesRegisterUserProvidedFunctionAppWithStaticSiteBodyParam {
  /** A JSON representation of the user provided function app properties. See example. */
  body: StaticSiteUserProvidedFunctionAppARMResource;
}

export interface StaticSitesRegisterUserProvidedFunctionAppWithStaticSiteQueryParamProperties {
  /** Specify <code>true</code> to force the update of the auth configuration on the function app even if an AzureStaticWebApps provider is already configured on the function app. The default is <code>false</code>. */
  isForced?: boolean;
}

export interface StaticSitesRegisterUserProvidedFunctionAppWithStaticSiteQueryParam {
  queryParameters?: StaticSitesRegisterUserProvidedFunctionAppWithStaticSiteQueryParamProperties;
}

export interface StaticSitesRegisterUserProvidedFunctionAppWithStaticSiteMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type StaticSitesRegisterUserProvidedFunctionAppWithStaticSiteParameters = StaticSitesRegisterUserProvidedFunctionAppWithStaticSiteQueryParam &
  StaticSitesRegisterUserProvidedFunctionAppWithStaticSiteMediaTypesParam &
  StaticSitesRegisterUserProvidedFunctionAppWithStaticSiteBodyParam &
  RequestParameters;
export type StaticSitesDetachUserProvidedFunctionAppFromStaticSiteParameters = RequestParameters;

export interface StaticSitesCreateZipDeploymentForStaticSiteBodyParam {
  /** A JSON representation of the StaticSiteZipDeployment properties. See example. */
  body: StaticSiteZipDeploymentARMResource;
}

export interface StaticSitesCreateZipDeploymentForStaticSiteMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type StaticSitesCreateZipDeploymentForStaticSiteParameters = StaticSitesCreateZipDeploymentForStaticSiteMediaTypesParam &
  StaticSitesCreateZipDeploymentForStaticSiteBodyParam &
  RequestParameters;
export type WebAppsListParameters = RequestParameters;

export interface WebAppsListByResourceGroupQueryParamProperties {
  /** Specify <strong>true</strong> to include deployment slots in results. The default is false, which only gives you the production slot of all apps. */
  includeSlots?: boolean;
}

export interface WebAppsListByResourceGroupQueryParam {
  queryParameters?: WebAppsListByResourceGroupQueryParamProperties;
}

export type WebAppsListByResourceGroupParameters = WebAppsListByResourceGroupQueryParam &
  RequestParameters;
export type WebAppsGetParameters = RequestParameters;

export interface WebAppsCreateOrUpdateBodyParam {
  /** A JSON representation of the app properties. See example. */
  body: Site;
}

export interface WebAppsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsCreateOrUpdateParameters = WebAppsCreateOrUpdateMediaTypesParam &
  WebAppsCreateOrUpdateBodyParam &
  RequestParameters;

export interface WebAppsDeleteQueryParamProperties {
  /** If true, web app metrics are also deleted. */
  deleteMetrics?: boolean;
  /** Specify false if you want to keep empty App Service plan. By default, empty App Service plan is deleted. */
  deleteEmptyServerFarm?: boolean;
}

export interface WebAppsDeleteQueryParam {
  queryParameters?: WebAppsDeleteQueryParamProperties;
}

export type WebAppsDeleteParameters = WebAppsDeleteQueryParam & RequestParameters;

export interface WebAppsUpdateBodyParam {
  /** A JSON representation of the app properties. See example. */
  body: SitePatchResource;
}

export interface WebAppsUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsUpdateParameters = WebAppsUpdateMediaTypesParam &
  WebAppsUpdateBodyParam &
  RequestParameters;

export interface WebAppsAnalyzeCustomHostnameQueryParamProperties {
  /** Custom hostname. */
  hostName?: string;
}

export interface WebAppsAnalyzeCustomHostnameQueryParam {
  queryParameters?: WebAppsAnalyzeCustomHostnameQueryParamProperties;
}

export type WebAppsAnalyzeCustomHostnameParameters = WebAppsAnalyzeCustomHostnameQueryParam &
  RequestParameters;

export interface WebAppsApplySlotConfigToProductionBodyParam {
  /** JSON object that contains the target slot name. See example. */
  body: CsmSlotEntity;
}

export interface WebAppsApplySlotConfigToProductionMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsApplySlotConfigToProductionParameters = WebAppsApplySlotConfigToProductionMediaTypesParam &
  WebAppsApplySlotConfigToProductionBodyParam &
  RequestParameters;

export interface WebAppsBackupBodyParam {
  /** Backup configuration. You can use the JSON response from the POST action as input here. */
  body: BackupRequest;
}

export interface WebAppsBackupMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsBackupParameters = WebAppsBackupMediaTypesParam &
  WebAppsBackupBodyParam &
  RequestParameters;
export type WebAppsListBackupsParameters = RequestParameters;
export type WebAppsGetBackupStatusParameters = RequestParameters;
export type WebAppsDeleteBackupParameters = RequestParameters;

export interface WebAppsListBackupStatusSecretsBodyParam {
  /** Information on backup request. */
  body: BackupRequest;
}

export interface WebAppsListBackupStatusSecretsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsListBackupStatusSecretsParameters = WebAppsListBackupStatusSecretsMediaTypesParam &
  WebAppsListBackupStatusSecretsBodyParam &
  RequestParameters;

export interface WebAppsRestoreBodyParam {
  /** Information on restore request . */
  body: RestoreRequest;
}

export interface WebAppsRestoreMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsRestoreParameters = WebAppsRestoreMediaTypesParam &
  WebAppsRestoreBodyParam &
  RequestParameters;
export type WebAppsListBasicPublishingCredentialsPoliciesParameters = RequestParameters;
export type WebAppsGetFtpAllowedParameters = RequestParameters;

export interface WebAppsUpdateFtpAllowedBodyParam {
  body: CsmPublishingCredentialsPoliciesEntity;
}

export interface WebAppsUpdateFtpAllowedMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsUpdateFtpAllowedParameters = WebAppsUpdateFtpAllowedMediaTypesParam &
  WebAppsUpdateFtpAllowedBodyParam &
  RequestParameters;
export type WebAppsGetScmAllowedParameters = RequestParameters;

export interface WebAppsUpdateScmAllowedBodyParam {
  body: CsmPublishingCredentialsPoliciesEntity;
}

export interface WebAppsUpdateScmAllowedMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsUpdateScmAllowedParameters = WebAppsUpdateScmAllowedMediaTypesParam &
  WebAppsUpdateScmAllowedBodyParam &
  RequestParameters;
export type WebAppsListConfigurationsParameters = RequestParameters;

export interface WebAppsUpdateApplicationSettingsBodyParam {
  /** Application settings of the app. */
  body: StringDictionary;
}

export interface WebAppsUpdateApplicationSettingsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsUpdateApplicationSettingsParameters = WebAppsUpdateApplicationSettingsMediaTypesParam &
  WebAppsUpdateApplicationSettingsBodyParam &
  RequestParameters;
export type WebAppsListApplicationSettingsParameters = RequestParameters;

export interface WebAppsUpdateAuthSettingsBodyParam {
  /** Auth settings associated with web app. */
  body: SiteAuthSettings;
}

export interface WebAppsUpdateAuthSettingsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsUpdateAuthSettingsParameters = WebAppsUpdateAuthSettingsMediaTypesParam &
  WebAppsUpdateAuthSettingsBodyParam &
  RequestParameters;
export type WebAppsGetAuthSettingsParameters = RequestParameters;
export type WebAppsGetAuthSettingsV2WithoutSecretsParameters = RequestParameters;

export interface WebAppsUpdateAuthSettingsV2BodyParam {
  /** Auth settings associated with web app. */
  body: SiteAuthSettingsV2;
}

export interface WebAppsUpdateAuthSettingsV2MediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsUpdateAuthSettingsV2Parameters = WebAppsUpdateAuthSettingsV2MediaTypesParam &
  WebAppsUpdateAuthSettingsV2BodyParam &
  RequestParameters;
export type WebAppsGetAuthSettingsV2Parameters = RequestParameters;

export interface WebAppsUpdateAzureStorageAccountsBodyParam {
  /** Azure storage accounts of the app. */
  body: AzureStoragePropertyDictionaryResource;
}

export interface WebAppsUpdateAzureStorageAccountsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsUpdateAzureStorageAccountsParameters = WebAppsUpdateAzureStorageAccountsMediaTypesParam &
  WebAppsUpdateAzureStorageAccountsBodyParam &
  RequestParameters;
export type WebAppsListAzureStorageAccountsParameters = RequestParameters;

export interface WebAppsUpdateBackupConfigurationBodyParam {
  /** Edited backup configuration. */
  body: BackupRequest;
}

export interface WebAppsUpdateBackupConfigurationMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsUpdateBackupConfigurationParameters = WebAppsUpdateBackupConfigurationMediaTypesParam &
  WebAppsUpdateBackupConfigurationBodyParam &
  RequestParameters;
export type WebAppsDeleteBackupConfigurationParameters = RequestParameters;
export type WebAppsGetBackupConfigurationParameters = RequestParameters;
export type WebAppsGetAppSettingsKeyVaultReferencesParameters = RequestParameters;
export type WebAppsGetAppSettingKeyVaultReferenceParameters = RequestParameters;
export type WebAppsGetSiteConnectionStringKeyVaultReferencesParameters = RequestParameters;
export type WebAppsGetSiteConnectionStringKeyVaultReferenceParameters = RequestParameters;

export interface WebAppsUpdateConnectionStringsBodyParam {
  /** Connection strings of the app or deployment slot. See example. */
  body: ConnectionStringDictionary;
}

export interface WebAppsUpdateConnectionStringsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsUpdateConnectionStringsParameters = WebAppsUpdateConnectionStringsMediaTypesParam &
  WebAppsUpdateConnectionStringsBodyParam &
  RequestParameters;
export type WebAppsListConnectionStringsParameters = RequestParameters;
export type WebAppsGetDiagnosticLogsConfigurationParameters = RequestParameters;

export interface WebAppsUpdateDiagnosticLogsConfigBodyParam {
  /** A SiteLogsConfig JSON object that contains the logging configuration to change in the "properties" property. */
  body: SiteLogsConfig;
}

export interface WebAppsUpdateDiagnosticLogsConfigMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsUpdateDiagnosticLogsConfigParameters = WebAppsUpdateDiagnosticLogsConfigMediaTypesParam &
  WebAppsUpdateDiagnosticLogsConfigBodyParam &
  RequestParameters;

export interface WebAppsUpdateMetadataBodyParam {
  /** Edited metadata of the app or deployment slot. See example. */
  body: StringDictionary;
}

export interface WebAppsUpdateMetadataMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsUpdateMetadataParameters = WebAppsUpdateMetadataMediaTypesParam &
  WebAppsUpdateMetadataBodyParam &
  RequestParameters;
export type WebAppsListMetadataParameters = RequestParameters;
export type WebAppsListPublishingCredentialsParameters = RequestParameters;

export interface WebAppsUpdateSitePushSettingsBodyParam {
  /** Push settings associated with web app. */
  body: PushSettings;
}

export interface WebAppsUpdateSitePushSettingsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsUpdateSitePushSettingsParameters = WebAppsUpdateSitePushSettingsMediaTypesParam &
  WebAppsUpdateSitePushSettingsBodyParam &
  RequestParameters;
export type WebAppsListSitePushSettingsParameters = RequestParameters;
export type WebAppsListSlotConfigurationNamesParameters = RequestParameters;

export interface WebAppsUpdateSlotConfigurationNamesBodyParam {
  /** Names of application settings and connection strings. See example. */
  body: SlotConfigNamesResource;
}

export interface WebAppsUpdateSlotConfigurationNamesMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsUpdateSlotConfigurationNamesParameters = WebAppsUpdateSlotConfigurationNamesMediaTypesParam &
  WebAppsUpdateSlotConfigurationNamesBodyParam &
  RequestParameters;
export type WebAppsGetConfigurationParameters = RequestParameters;

export interface WebAppsCreateOrUpdateConfigurationBodyParam {
  /** JSON representation of a SiteConfig object. See example. */
  body: SiteConfigResource;
}

export interface WebAppsCreateOrUpdateConfigurationMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsCreateOrUpdateConfigurationParameters = WebAppsCreateOrUpdateConfigurationMediaTypesParam &
  WebAppsCreateOrUpdateConfigurationBodyParam &
  RequestParameters;

export interface WebAppsUpdateConfigurationBodyParam {
  /** JSON representation of a SiteConfig object. See example. */
  body: SiteConfigResource;
}

export interface WebAppsUpdateConfigurationMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsUpdateConfigurationParameters = WebAppsUpdateConfigurationMediaTypesParam &
  WebAppsUpdateConfigurationBodyParam &
  RequestParameters;
export type WebAppsListConfigurationSnapshotInfoParameters = RequestParameters;
export type WebAppsGetConfigurationSnapshotParameters = RequestParameters;
export type WebAppsRecoverSiteConfigurationSnapshotParameters = RequestParameters;
export type WebAppsGetWebSiteContainerLogsParameters = RequestParameters;
export type WebAppsGetContainerLogsZipParameters = RequestParameters;
export type WebAppsListContinuousWebJobsParameters = RequestParameters;
export type WebAppsGetContinuousWebJobParameters = RequestParameters;
export type WebAppsDeleteContinuousWebJobParameters = RequestParameters;
export type WebAppsStartContinuousWebJobParameters = RequestParameters;
export type WebAppsStopContinuousWebJobParameters = RequestParameters;
export type WebAppsListDeploymentsParameters = RequestParameters;
export type WebAppsGetDeploymentParameters = RequestParameters;

export interface WebAppsCreateDeploymentBodyParam {
  /** Deployment details. */
  body: Deployment;
}

export interface WebAppsCreateDeploymentMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsCreateDeploymentParameters = WebAppsCreateDeploymentMediaTypesParam &
  WebAppsCreateDeploymentBodyParam &
  RequestParameters;
export type WebAppsDeleteDeploymentParameters = RequestParameters;
export type WebAppsListDeploymentLogParameters = RequestParameters;

export interface WebAppsDiscoverBackupBodyParam {
  /** A RestoreRequest object that includes Azure storage URL and blog name for discovery of backup. */
  body: RestoreRequest;
}

export interface WebAppsDiscoverBackupMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsDiscoverBackupParameters = WebAppsDiscoverBackupMediaTypesParam &
  WebAppsDiscoverBackupBodyParam &
  RequestParameters;
export type WebAppsListDomainOwnershipIdentifiersParameters = RequestParameters;
export type WebAppsGetDomainOwnershipIdentifierParameters = RequestParameters;

export interface WebAppsCreateOrUpdateDomainOwnershipIdentifierBodyParam {
  /** A JSON representation of the domain ownership properties. */
  body: Identifier;
}

export interface WebAppsCreateOrUpdateDomainOwnershipIdentifierMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsCreateOrUpdateDomainOwnershipIdentifierParameters = WebAppsCreateOrUpdateDomainOwnershipIdentifierMediaTypesParam &
  WebAppsCreateOrUpdateDomainOwnershipIdentifierBodyParam &
  RequestParameters;
export type WebAppsDeleteDomainOwnershipIdentifierParameters = RequestParameters;

export interface WebAppsUpdateDomainOwnershipIdentifierBodyParam {
  /** A JSON representation of the domain ownership properties. */
  body: Identifier;
}

export interface WebAppsUpdateDomainOwnershipIdentifierMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsUpdateDomainOwnershipIdentifierParameters = WebAppsUpdateDomainOwnershipIdentifierMediaTypesParam &
  WebAppsUpdateDomainOwnershipIdentifierBodyParam &
  RequestParameters;
export type WebAppsGetMSDeployStatusParameters = RequestParameters;

export interface WebAppsCreateMSDeployOperationBodyParam {
  /** Details of MSDeploy operation */
  body: MSDeploy;
}

export interface WebAppsCreateMSDeployOperationMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsCreateMSDeployOperationParameters = WebAppsCreateMSDeployOperationMediaTypesParam &
  WebAppsCreateMSDeployOperationBodyParam &
  RequestParameters;
export type WebAppsGetMSDeployLogParameters = RequestParameters;
export type WebAppsGetOneDeployStatusParameters = RequestParameters;
export type WebAppsCreateOneDeployOperationParameters = RequestParameters;
export type WebAppsListFunctionsParameters = RequestParameters;
export type WebAppsGetFunctionsAdminTokenParameters = RequestParameters;
export type WebAppsGetFunctionParameters = RequestParameters;

export interface WebAppsCreateFunctionBodyParam {
  /** Function details. */
  body: FunctionEnvelope;
}

export interface WebAppsCreateFunctionMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsCreateFunctionParameters = WebAppsCreateFunctionMediaTypesParam &
  WebAppsCreateFunctionBodyParam &
  RequestParameters;
export type WebAppsDeleteFunctionParameters = RequestParameters;

export interface WebAppsCreateOrUpdateFunctionSecretBodyParam {
  /** The key to create or update */
  body: KeyInfo;
}

export interface WebAppsCreateOrUpdateFunctionSecretMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsCreateOrUpdateFunctionSecretParameters = WebAppsCreateOrUpdateFunctionSecretMediaTypesParam &
  WebAppsCreateOrUpdateFunctionSecretBodyParam &
  RequestParameters;
export type WebAppsDeleteFunctionSecretParameters = RequestParameters;
export type WebAppsListFunctionKeysParameters = RequestParameters;
export type WebAppsListFunctionSecretsParameters = RequestParameters;
export type WebAppsListHostKeysParameters = RequestParameters;
export type WebAppsListSyncStatusParameters = RequestParameters;
export type WebAppsSyncFunctionsParameters = RequestParameters;

export interface WebAppsCreateOrUpdateHostSecretBodyParam {
  /** The key to create or update */
  body: KeyInfo;
}

export interface WebAppsCreateOrUpdateHostSecretMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsCreateOrUpdateHostSecretParameters = WebAppsCreateOrUpdateHostSecretMediaTypesParam &
  WebAppsCreateOrUpdateHostSecretBodyParam &
  RequestParameters;
export type WebAppsDeleteHostSecretParameters = RequestParameters;
export type WebAppsListHostNameBindingsParameters = RequestParameters;
export type WebAppsGetHostNameBindingParameters = RequestParameters;

export interface WebAppsCreateOrUpdateHostNameBindingBodyParam {
  /** Binding details. This is the JSON representation of a HostNameBinding object. */
  body: HostNameBinding;
}

export interface WebAppsCreateOrUpdateHostNameBindingMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsCreateOrUpdateHostNameBindingParameters = WebAppsCreateOrUpdateHostNameBindingMediaTypesParam &
  WebAppsCreateOrUpdateHostNameBindingBodyParam &
  RequestParameters;
export type WebAppsDeleteHostNameBindingParameters = RequestParameters;
export type WebAppsGetHybridConnectionParameters = RequestParameters;

export interface WebAppsCreateOrUpdateHybridConnectionBodyParam {
  /** The details of the hybrid connection. */
  body: HybridConnection;
}

export interface WebAppsCreateOrUpdateHybridConnectionMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsCreateOrUpdateHybridConnectionParameters = WebAppsCreateOrUpdateHybridConnectionMediaTypesParam &
  WebAppsCreateOrUpdateHybridConnectionBodyParam &
  RequestParameters;
export type WebAppsDeleteHybridConnectionParameters = RequestParameters;

export interface WebAppsUpdateHybridConnectionBodyParam {
  /** The details of the hybrid connection. */
  body: HybridConnection;
}

export interface WebAppsUpdateHybridConnectionMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsUpdateHybridConnectionParameters = WebAppsUpdateHybridConnectionMediaTypesParam &
  WebAppsUpdateHybridConnectionBodyParam &
  RequestParameters;
export type WebAppsListHybridConnectionsParameters = RequestParameters;
export type WebAppsListRelayServiceConnectionsParameters = RequestParameters;
export type WebAppsGetRelayServiceConnectionParameters = RequestParameters;

export interface WebAppsCreateOrUpdateRelayServiceConnectionBodyParam {
  /** Details of the hybrid connection configuration. */
  body: RelayServiceConnectionEntity;
}

export interface WebAppsCreateOrUpdateRelayServiceConnectionMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsCreateOrUpdateRelayServiceConnectionParameters = WebAppsCreateOrUpdateRelayServiceConnectionMediaTypesParam &
  WebAppsCreateOrUpdateRelayServiceConnectionBodyParam &
  RequestParameters;
export type WebAppsDeleteRelayServiceConnectionParameters = RequestParameters;

export interface WebAppsUpdateRelayServiceConnectionBodyParam {
  /** Details of the hybrid connection configuration. */
  body: RelayServiceConnectionEntity;
}

export interface WebAppsUpdateRelayServiceConnectionMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsUpdateRelayServiceConnectionParameters = WebAppsUpdateRelayServiceConnectionMediaTypesParam &
  WebAppsUpdateRelayServiceConnectionBodyParam &
  RequestParameters;
export type WebAppsListInstanceIdentifiersParameters = RequestParameters;
export type WebAppsGetInstanceInfoParameters = RequestParameters;
export type WebAppsGetInstanceMsDeployStatusParameters = RequestParameters;

export interface WebAppsCreateInstanceMSDeployOperationBodyParam {
  /** Details of MSDeploy operation */
  body: MSDeploy;
}

export interface WebAppsCreateInstanceMSDeployOperationMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsCreateInstanceMSDeployOperationParameters = WebAppsCreateInstanceMSDeployOperationMediaTypesParam &
  WebAppsCreateInstanceMSDeployOperationBodyParam &
  RequestParameters;
export type WebAppsGetInstanceMSDeployLogParameters = RequestParameters;
export type WebAppsListInstanceProcessesParameters = RequestParameters;
export type WebAppsGetInstanceProcessParameters = RequestParameters;
export type WebAppsDeleteInstanceProcessParameters = RequestParameters;
export type WebAppsGetInstanceProcessDumpParameters = RequestParameters;
export type WebAppsListInstanceProcessModulesParameters = RequestParameters;
export type WebAppsGetInstanceProcessModuleParameters = RequestParameters;
export type WebAppsListInstanceProcessThreadsParameters = RequestParameters;
export type WebAppsIsCloneableParameters = RequestParameters;
export type WebAppsListSiteBackupsParameters = RequestParameters;
export type WebAppsListSyncFunctionTriggersParameters = RequestParameters;

export interface WebAppsMigrateStorageBodyParam {
  /** Migration migrationOptions. */
  body: StorageMigrationOptions;
}

export interface WebAppsMigrateStorageQueryParamProperties {
  /** Azure subscription. */
  subscriptionName: string;
}

export interface WebAppsMigrateStorageQueryParam {
  queryParameters: WebAppsMigrateStorageQueryParamProperties;
}

export interface WebAppsMigrateStorageMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsMigrateStorageParameters = WebAppsMigrateStorageQueryParam &
  WebAppsMigrateStorageMediaTypesParam &
  WebAppsMigrateStorageBodyParam &
  RequestParameters;

export interface WebAppsMigrateMySqlBodyParam {
  /** MySql migration options. */
  body: MigrateMySqlRequest;
}

export interface WebAppsMigrateMySqlMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsMigrateMySqlParameters = WebAppsMigrateMySqlMediaTypesParam &
  WebAppsMigrateMySqlBodyParam &
  RequestParameters;
export type WebAppsGetMigrateMySqlStatusParameters = RequestParameters;
export type WebAppsGetSwiftVirtualNetworkConnectionParameters = RequestParameters;

export interface WebAppsCreateOrUpdateSwiftVirtualNetworkConnectionWithCheckBodyParam {
  /** Properties of the Virtual Network connection. See example. */
  body: SwiftVirtualNetwork;
}

export interface WebAppsCreateOrUpdateSwiftVirtualNetworkConnectionWithCheckMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsCreateOrUpdateSwiftVirtualNetworkConnectionWithCheckParameters = WebAppsCreateOrUpdateSwiftVirtualNetworkConnectionWithCheckMediaTypesParam &
  WebAppsCreateOrUpdateSwiftVirtualNetworkConnectionWithCheckBodyParam &
  RequestParameters;
export type WebAppsDeleteSwiftVirtualNetworkParameters = RequestParameters;

export interface WebAppsUpdateSwiftVirtualNetworkConnectionWithCheckBodyParam {
  /** Properties of the Virtual Network connection. See example. */
  body: SwiftVirtualNetwork;
}

export interface WebAppsUpdateSwiftVirtualNetworkConnectionWithCheckMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsUpdateSwiftVirtualNetworkConnectionWithCheckParameters = WebAppsUpdateSwiftVirtualNetworkConnectionWithCheckMediaTypesParam &
  WebAppsUpdateSwiftVirtualNetworkConnectionWithCheckBodyParam &
  RequestParameters;
export type WebAppsListNetworkFeaturesParameters = RequestParameters;
export type WebAppsGetNetworkTraceOperationParameters = RequestParameters;

export interface WebAppsStartWebSiteNetworkTraceQueryParamProperties {
  /** The duration to keep capturing in seconds. */
  durationInSeconds?: number;
  /** The maximum frame length in bytes (Optional). */
  maxFrameLength?: number;
  /** The Blob URL to store capture file. */
  sasUrl?: string;
}

export interface WebAppsStartWebSiteNetworkTraceQueryParam {
  queryParameters?: WebAppsStartWebSiteNetworkTraceQueryParamProperties;
}

export type WebAppsStartWebSiteNetworkTraceParameters = WebAppsStartWebSiteNetworkTraceQueryParam &
  RequestParameters;

export interface WebAppsStartWebSiteNetworkTraceOperationQueryParamProperties {
  /** The duration to keep capturing in seconds. */
  durationInSeconds?: number;
  /** The maximum frame length in bytes (Optional). */
  maxFrameLength?: number;
  /** The Blob URL to store capture file. */
  sasUrl?: string;
}

export interface WebAppsStartWebSiteNetworkTraceOperationQueryParam {
  queryParameters?: WebAppsStartWebSiteNetworkTraceOperationQueryParamProperties;
}

export type WebAppsStartWebSiteNetworkTraceOperationParameters = WebAppsStartWebSiteNetworkTraceOperationQueryParam &
  RequestParameters;
export type WebAppsStopWebSiteNetworkTraceParameters = RequestParameters;
export type WebAppsGetNetworkTracesParameters = RequestParameters;
export type WebAppsGetNetworkTraceOperationV2Parameters = RequestParameters;
export type WebAppsGetNetworkTracesV2Parameters = RequestParameters;
export type WebAppsGenerateNewSitePublishingPasswordParameters = RequestParameters;

export interface WebAppsListPerfMonCountersQueryParamProperties {
  /** Return only usages/metrics specified in the filter. Filter conforms to odata syntax. Example: $filter=(startTime eq 2014-01-01T00:00:00Z and endTime eq 2014-12-31T23:59:59Z and timeGrain eq duration'[Hour|Minute|Day]'. */
  $filter?: string;
}

export interface WebAppsListPerfMonCountersQueryParam {
  queryParameters?: WebAppsListPerfMonCountersQueryParamProperties;
}

export type WebAppsListPerfMonCountersParameters = WebAppsListPerfMonCountersQueryParam &
  RequestParameters;
export type WebAppsGetSitePhpErrorLogFlagParameters = RequestParameters;
export type WebAppsListPremierAddOnsParameters = RequestParameters;
export type WebAppsGetPremierAddOnParameters = RequestParameters;

export interface WebAppsAddPremierAddOnBodyParam {
  /** A JSON representation of the edited premier add-on. */
  body: PremierAddOn;
}

export interface WebAppsAddPremierAddOnMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsAddPremierAddOnParameters = WebAppsAddPremierAddOnMediaTypesParam &
  WebAppsAddPremierAddOnBodyParam &
  RequestParameters;
export type WebAppsDeletePremierAddOnParameters = RequestParameters;

export interface WebAppsUpdatePremierAddOnBodyParam {
  /** A JSON representation of the edited premier add-on. */
  body: PremierAddOnPatchResource;
}

export interface WebAppsUpdatePremierAddOnMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsUpdatePremierAddOnParameters = WebAppsUpdatePremierAddOnMediaTypesParam &
  WebAppsUpdatePremierAddOnBodyParam &
  RequestParameters;
export type WebAppsGetPrivateAccessParameters = RequestParameters;

export interface WebAppsPutPrivateAccessVnetBodyParam {
  /** The information for the private access */
  body: PrivateAccess;
}

export interface WebAppsPutPrivateAccessVnetMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsPutPrivateAccessVnetParameters = WebAppsPutPrivateAccessVnetMediaTypesParam &
  WebAppsPutPrivateAccessVnetBodyParam &
  RequestParameters;
export type WebAppsGetPrivateEndpointConnectionListParameters = RequestParameters;
export type WebAppsGetPrivateEndpointConnectionParameters = RequestParameters;

export interface WebAppsApproveOrRejectPrivateEndpointConnectionBodyParam {
  body: PrivateLinkConnectionApprovalRequestResource;
}

export interface WebAppsApproveOrRejectPrivateEndpointConnectionMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsApproveOrRejectPrivateEndpointConnectionParameters = WebAppsApproveOrRejectPrivateEndpointConnectionMediaTypesParam &
  WebAppsApproveOrRejectPrivateEndpointConnectionBodyParam &
  RequestParameters;
export type WebAppsDeletePrivateEndpointConnectionParameters = RequestParameters;
export type WebAppsGetPrivateLinkResourcesParameters = RequestParameters;
export type WebAppsListProcessesParameters = RequestParameters;
export type WebAppsGetProcessParameters = RequestParameters;
export type WebAppsDeleteProcessParameters = RequestParameters;
export type WebAppsGetProcessDumpParameters = RequestParameters;
export type WebAppsListProcessModulesParameters = RequestParameters;
export type WebAppsGetProcessModuleParameters = RequestParameters;
export type WebAppsListProcessThreadsParameters = RequestParameters;
export type WebAppsListPublicCertificatesParameters = RequestParameters;
export type WebAppsGetPublicCertificateParameters = RequestParameters;

export interface WebAppsCreateOrUpdatePublicCertificateBodyParam {
  /** Public certificate details. This is the JSON representation of a PublicCertificate object. */
  body: PublicCertificate;
}

export interface WebAppsCreateOrUpdatePublicCertificateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsCreateOrUpdatePublicCertificateParameters = WebAppsCreateOrUpdatePublicCertificateMediaTypesParam &
  WebAppsCreateOrUpdatePublicCertificateBodyParam &
  RequestParameters;
export type WebAppsDeletePublicCertificateParameters = RequestParameters;

export interface WebAppsListPublishingProfileXmlWithSecretsBodyParam {
  /** Specifies publishingProfileOptions for publishing profile. For example, use {"format": "FileZilla3"} to get a FileZilla publishing profile. */
  body: CsmPublishingProfileOptions;
}

export interface WebAppsListPublishingProfileXmlWithSecretsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsListPublishingProfileXmlWithSecretsParameters = WebAppsListPublishingProfileXmlWithSecretsMediaTypesParam &
  WebAppsListPublishingProfileXmlWithSecretsBodyParam &
  RequestParameters;
export type WebAppsResetProductionSlotConfigParameters = RequestParameters;

export interface WebAppsRestartQueryParamProperties {
  /** Specify true to apply the configuration settings and restarts the app only if necessary. By default, the API always restarts and reprovisions the app. */
  softRestart?: boolean;
  /** Specify true to block until the app is restarted. By default, it is set to false, and the API responds immediately (asynchronous). */
  synchronous?: boolean;
}

export interface WebAppsRestartQueryParam {
  queryParameters?: WebAppsRestartQueryParamProperties;
}

export type WebAppsRestartParameters = WebAppsRestartQueryParam & RequestParameters;

export interface WebAppsRestoreFromBackupBlobBodyParam {
  /** Information on restore request . */
  body: RestoreRequest;
}

export interface WebAppsRestoreFromBackupBlobMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsRestoreFromBackupBlobParameters = WebAppsRestoreFromBackupBlobMediaTypesParam &
  WebAppsRestoreFromBackupBlobBodyParam &
  RequestParameters;

export interface WebAppsRestoreFromDeletedAppBodyParam {
  /** Deleted web app restore information. */
  body: DeletedAppRestoreRequest;
}

export interface WebAppsRestoreFromDeletedAppMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsRestoreFromDeletedAppParameters = WebAppsRestoreFromDeletedAppMediaTypesParam &
  WebAppsRestoreFromDeletedAppBodyParam &
  RequestParameters;

export interface WebAppsRestoreSnapshotBodyParam {
  /** Snapshot restore settings. Snapshot information can be obtained by calling GetDeletedSites or GetSiteSnapshots API. */
  body: SnapshotRestoreRequest;
}

export interface WebAppsRestoreSnapshotMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsRestoreSnapshotParameters = WebAppsRestoreSnapshotMediaTypesParam &
  WebAppsRestoreSnapshotBodyParam &
  RequestParameters;
export type WebAppsListSiteExtensionsParameters = RequestParameters;
export type WebAppsGetSiteExtensionParameters = RequestParameters;
export type WebAppsInstallSiteExtensionParameters = RequestParameters;
export type WebAppsDeleteSiteExtensionParameters = RequestParameters;
export type WebAppsListSlotsParameters = RequestParameters;
export type WebAppsGetSlotParameters = RequestParameters;

export interface WebAppsCreateOrUpdateSlotBodyParam {
  /** A JSON representation of the app properties. See example. */
  body: Site;
}

export interface WebAppsCreateOrUpdateSlotMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsCreateOrUpdateSlotParameters = WebAppsCreateOrUpdateSlotMediaTypesParam &
  WebAppsCreateOrUpdateSlotBodyParam &
  RequestParameters;

export interface WebAppsDeleteSlotQueryParamProperties {
  /** If true, web app metrics are also deleted. */
  deleteMetrics?: boolean;
  /** Specify false if you want to keep empty App Service plan. By default, empty App Service plan is deleted. */
  deleteEmptyServerFarm?: boolean;
}

export interface WebAppsDeleteSlotQueryParam {
  queryParameters?: WebAppsDeleteSlotQueryParamProperties;
}

export type WebAppsDeleteSlotParameters = WebAppsDeleteSlotQueryParam & RequestParameters;

export interface WebAppsUpdateSlotBodyParam {
  /** A JSON representation of the app properties. See example. */
  body: SitePatchResource;
}

export interface WebAppsUpdateSlotMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsUpdateSlotParameters = WebAppsUpdateSlotMediaTypesParam &
  WebAppsUpdateSlotBodyParam &
  RequestParameters;

export interface WebAppsAnalyzeCustomHostnameSlotQueryParamProperties {
  /** Custom hostname. */
  hostName?: string;
}

export interface WebAppsAnalyzeCustomHostnameSlotQueryParam {
  queryParameters?: WebAppsAnalyzeCustomHostnameSlotQueryParamProperties;
}

export type WebAppsAnalyzeCustomHostnameSlotParameters = WebAppsAnalyzeCustomHostnameSlotQueryParam &
  RequestParameters;

export interface WebAppsApplySlotConfigurationSlotBodyParam {
  /** JSON object that contains the target slot name. See example. */
  body: CsmSlotEntity;
}

export interface WebAppsApplySlotConfigurationSlotMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsApplySlotConfigurationSlotParameters = WebAppsApplySlotConfigurationSlotMediaTypesParam &
  WebAppsApplySlotConfigurationSlotBodyParam &
  RequestParameters;

export interface WebAppsBackupSlotBodyParam {
  /** Backup configuration. You can use the JSON response from the POST action as input here. */
  body: BackupRequest;
}

export interface WebAppsBackupSlotMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsBackupSlotParameters = WebAppsBackupSlotMediaTypesParam &
  WebAppsBackupSlotBodyParam &
  RequestParameters;
export type WebAppsListBackupsSlotParameters = RequestParameters;
export type WebAppsGetBackupStatusSlotParameters = RequestParameters;
export type WebAppsDeleteBackupSlotParameters = RequestParameters;

export interface WebAppsListBackupStatusSecretsSlotBodyParam {
  /** Information on backup request. */
  body: BackupRequest;
}

export interface WebAppsListBackupStatusSecretsSlotMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsListBackupStatusSecretsSlotParameters = WebAppsListBackupStatusSecretsSlotMediaTypesParam &
  WebAppsListBackupStatusSecretsSlotBodyParam &
  RequestParameters;

export interface WebAppsRestoreSlotBodyParam {
  /** Information on restore request . */
  body: RestoreRequest;
}

export interface WebAppsRestoreSlotMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsRestoreSlotParameters = WebAppsRestoreSlotMediaTypesParam &
  WebAppsRestoreSlotBodyParam &
  RequestParameters;
export type WebAppsListBasicPublishingCredentialsPoliciesSlotParameters = RequestParameters;
export type WebAppsGetFtpAllowedSlotParameters = RequestParameters;

export interface WebAppsUpdateFtpAllowedSlotBodyParam {
  body: CsmPublishingCredentialsPoliciesEntity;
}

export interface WebAppsUpdateFtpAllowedSlotMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsUpdateFtpAllowedSlotParameters = WebAppsUpdateFtpAllowedSlotMediaTypesParam &
  WebAppsUpdateFtpAllowedSlotBodyParam &
  RequestParameters;
export type WebAppsGetScmAllowedSlotParameters = RequestParameters;

export interface WebAppsUpdateScmAllowedSlotBodyParam {
  body: CsmPublishingCredentialsPoliciesEntity;
}

export interface WebAppsUpdateScmAllowedSlotMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsUpdateScmAllowedSlotParameters = WebAppsUpdateScmAllowedSlotMediaTypesParam &
  WebAppsUpdateScmAllowedSlotBodyParam &
  RequestParameters;
export type WebAppsListConfigurationsSlotParameters = RequestParameters;

export interface WebAppsUpdateApplicationSettingsSlotBodyParam {
  /** Application settings of the app. */
  body: StringDictionary;
}

export interface WebAppsUpdateApplicationSettingsSlotMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsUpdateApplicationSettingsSlotParameters = WebAppsUpdateApplicationSettingsSlotMediaTypesParam &
  WebAppsUpdateApplicationSettingsSlotBodyParam &
  RequestParameters;
export type WebAppsListApplicationSettingsSlotParameters = RequestParameters;

export interface WebAppsUpdateAuthSettingsSlotBodyParam {
  /** Auth settings associated with web app. */
  body: SiteAuthSettings;
}

export interface WebAppsUpdateAuthSettingsSlotMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsUpdateAuthSettingsSlotParameters = WebAppsUpdateAuthSettingsSlotMediaTypesParam &
  WebAppsUpdateAuthSettingsSlotBodyParam &
  RequestParameters;
export type WebAppsGetAuthSettingsSlotParameters = RequestParameters;
export type WebAppsGetAuthSettingsV2WithoutSecretsSlotParameters = RequestParameters;

export interface WebAppsUpdateAuthSettingsV2SlotBodyParam {
  /** Auth settings associated with web app. */
  body: SiteAuthSettingsV2;
}

export interface WebAppsUpdateAuthSettingsV2SlotMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsUpdateAuthSettingsV2SlotParameters = WebAppsUpdateAuthSettingsV2SlotMediaTypesParam &
  WebAppsUpdateAuthSettingsV2SlotBodyParam &
  RequestParameters;
export type WebAppsGetAuthSettingsV2SlotParameters = RequestParameters;

export interface WebAppsUpdateAzureStorageAccountsSlotBodyParam {
  /** Azure storage accounts of the app. */
  body: AzureStoragePropertyDictionaryResource;
}

export interface WebAppsUpdateAzureStorageAccountsSlotMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsUpdateAzureStorageAccountsSlotParameters = WebAppsUpdateAzureStorageAccountsSlotMediaTypesParam &
  WebAppsUpdateAzureStorageAccountsSlotBodyParam &
  RequestParameters;
export type WebAppsListAzureStorageAccountsSlotParameters = RequestParameters;

export interface WebAppsUpdateBackupConfigurationSlotBodyParam {
  /** Edited backup configuration. */
  body: BackupRequest;
}

export interface WebAppsUpdateBackupConfigurationSlotMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsUpdateBackupConfigurationSlotParameters = WebAppsUpdateBackupConfigurationSlotMediaTypesParam &
  WebAppsUpdateBackupConfigurationSlotBodyParam &
  RequestParameters;
export type WebAppsDeleteBackupConfigurationSlotParameters = RequestParameters;
export type WebAppsGetBackupConfigurationSlotParameters = RequestParameters;
export type WebAppsGetAppSettingsKeyVaultReferencesSlotParameters = RequestParameters;
export type WebAppsGetAppSettingKeyVaultReferenceSlotParameters = RequestParameters;
export type WebAppsGetSiteConnectionStringKeyVaultReferencesSlotParameters = RequestParameters;
export type WebAppsGetSiteConnectionStringKeyVaultReferenceSlotParameters = RequestParameters;

export interface WebAppsUpdateConnectionStringsSlotBodyParam {
  /** Connection strings of the app or deployment slot. See example. */
  body: ConnectionStringDictionary;
}

export interface WebAppsUpdateConnectionStringsSlotMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsUpdateConnectionStringsSlotParameters = WebAppsUpdateConnectionStringsSlotMediaTypesParam &
  WebAppsUpdateConnectionStringsSlotBodyParam &
  RequestParameters;
export type WebAppsListConnectionStringsSlotParameters = RequestParameters;
export type WebAppsGetDiagnosticLogsConfigurationSlotParameters = RequestParameters;

export interface WebAppsUpdateDiagnosticLogsConfigSlotBodyParam {
  /** A SiteLogsConfig JSON object that contains the logging configuration to change in the "properties" property. */
  body: SiteLogsConfig;
}

export interface WebAppsUpdateDiagnosticLogsConfigSlotMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsUpdateDiagnosticLogsConfigSlotParameters = WebAppsUpdateDiagnosticLogsConfigSlotMediaTypesParam &
  WebAppsUpdateDiagnosticLogsConfigSlotBodyParam &
  RequestParameters;

export interface WebAppsUpdateMetadataSlotBodyParam {
  /** Edited metadata of the app or deployment slot. See example. */
  body: StringDictionary;
}

export interface WebAppsUpdateMetadataSlotMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsUpdateMetadataSlotParameters = WebAppsUpdateMetadataSlotMediaTypesParam &
  WebAppsUpdateMetadataSlotBodyParam &
  RequestParameters;
export type WebAppsListMetadataSlotParameters = RequestParameters;
export type WebAppsListPublishingCredentialsSlotParameters = RequestParameters;

export interface WebAppsUpdateSitePushSettingsSlotBodyParam {
  /** Push settings associated with web app. */
  body: PushSettings;
}

export interface WebAppsUpdateSitePushSettingsSlotMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsUpdateSitePushSettingsSlotParameters = WebAppsUpdateSitePushSettingsSlotMediaTypesParam &
  WebAppsUpdateSitePushSettingsSlotBodyParam &
  RequestParameters;
export type WebAppsListSitePushSettingsSlotParameters = RequestParameters;
export type WebAppsGetConfigurationSlotParameters = RequestParameters;

export interface WebAppsCreateOrUpdateConfigurationSlotBodyParam {
  /** JSON representation of a SiteConfig object. See example. */
  body: SiteConfigResource;
}

export interface WebAppsCreateOrUpdateConfigurationSlotMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsCreateOrUpdateConfigurationSlotParameters = WebAppsCreateOrUpdateConfigurationSlotMediaTypesParam &
  WebAppsCreateOrUpdateConfigurationSlotBodyParam &
  RequestParameters;

export interface WebAppsUpdateConfigurationSlotBodyParam {
  /** JSON representation of a SiteConfig object. See example. */
  body: SiteConfigResource;
}

export interface WebAppsUpdateConfigurationSlotMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsUpdateConfigurationSlotParameters = WebAppsUpdateConfigurationSlotMediaTypesParam &
  WebAppsUpdateConfigurationSlotBodyParam &
  RequestParameters;
export type WebAppsListConfigurationSnapshotInfoSlotParameters = RequestParameters;
export type WebAppsGetConfigurationSnapshotSlotParameters = RequestParameters;
export type WebAppsRecoverSiteConfigurationSnapshotSlotParameters = RequestParameters;
export type WebAppsGetWebSiteContainerLogsSlotParameters = RequestParameters;
export type WebAppsGetContainerLogsZipSlotParameters = RequestParameters;
export type WebAppsListContinuousWebJobsSlotParameters = RequestParameters;
export type WebAppsGetContinuousWebJobSlotParameters = RequestParameters;
export type WebAppsDeleteContinuousWebJobSlotParameters = RequestParameters;
export type WebAppsStartContinuousWebJobSlotParameters = RequestParameters;
export type WebAppsStopContinuousWebJobSlotParameters = RequestParameters;
export type WebAppsListDeploymentsSlotParameters = RequestParameters;
export type WebAppsGetDeploymentSlotParameters = RequestParameters;

export interface WebAppsCreateDeploymentSlotBodyParam {
  /** Deployment details. */
  body: Deployment;
}

export interface WebAppsCreateDeploymentSlotMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsCreateDeploymentSlotParameters = WebAppsCreateDeploymentSlotMediaTypesParam &
  WebAppsCreateDeploymentSlotBodyParam &
  RequestParameters;
export type WebAppsDeleteDeploymentSlotParameters = RequestParameters;
export type WebAppsListDeploymentLogSlotParameters = RequestParameters;

export interface WebAppsDiscoverBackupSlotBodyParam {
  /** A RestoreRequest object that includes Azure storage URL and blog name for discovery of backup. */
  body: RestoreRequest;
}

export interface WebAppsDiscoverBackupSlotMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsDiscoverBackupSlotParameters = WebAppsDiscoverBackupSlotMediaTypesParam &
  WebAppsDiscoverBackupSlotBodyParam &
  RequestParameters;
export type WebAppsListDomainOwnershipIdentifiersSlotParameters = RequestParameters;
export type WebAppsGetDomainOwnershipIdentifierSlotParameters = RequestParameters;

export interface WebAppsCreateOrUpdateDomainOwnershipIdentifierSlotBodyParam {
  /** A JSON representation of the domain ownership properties. */
  body: Identifier;
}

export interface WebAppsCreateOrUpdateDomainOwnershipIdentifierSlotMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsCreateOrUpdateDomainOwnershipIdentifierSlotParameters = WebAppsCreateOrUpdateDomainOwnershipIdentifierSlotMediaTypesParam &
  WebAppsCreateOrUpdateDomainOwnershipIdentifierSlotBodyParam &
  RequestParameters;
export type WebAppsDeleteDomainOwnershipIdentifierSlotParameters = RequestParameters;

export interface WebAppsUpdateDomainOwnershipIdentifierSlotBodyParam {
  /** A JSON representation of the domain ownership properties. */
  body: Identifier;
}

export interface WebAppsUpdateDomainOwnershipIdentifierSlotMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsUpdateDomainOwnershipIdentifierSlotParameters = WebAppsUpdateDomainOwnershipIdentifierSlotMediaTypesParam &
  WebAppsUpdateDomainOwnershipIdentifierSlotBodyParam &
  RequestParameters;
export type WebAppsGetMSDeployStatusSlotParameters = RequestParameters;

export interface WebAppsCreateMSDeployOperationSlotBodyParam {
  /** Details of MSDeploy operation */
  body: MSDeploy;
}

export interface WebAppsCreateMSDeployOperationSlotMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsCreateMSDeployOperationSlotParameters = WebAppsCreateMSDeployOperationSlotMediaTypesParam &
  WebAppsCreateMSDeployOperationSlotBodyParam &
  RequestParameters;
export type WebAppsGetMSDeployLogSlotParameters = RequestParameters;
export type WebAppsListInstanceFunctionsSlotParameters = RequestParameters;
export type WebAppsGetFunctionsAdminTokenSlotParameters = RequestParameters;
export type WebAppsGetInstanceFunctionSlotParameters = RequestParameters;

export interface WebAppsCreateInstanceFunctionSlotBodyParam {
  /** Function details. */
  body: FunctionEnvelope;
}

export interface WebAppsCreateInstanceFunctionSlotMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsCreateInstanceFunctionSlotParameters = WebAppsCreateInstanceFunctionSlotMediaTypesParam &
  WebAppsCreateInstanceFunctionSlotBodyParam &
  RequestParameters;
export type WebAppsDeleteInstanceFunctionSlotParameters = RequestParameters;

export interface WebAppsCreateOrUpdateFunctionSecretSlotBodyParam {
  /** The key to create or update */
  body: KeyInfo;
}

export interface WebAppsCreateOrUpdateFunctionSecretSlotMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsCreateOrUpdateFunctionSecretSlotParameters = WebAppsCreateOrUpdateFunctionSecretSlotMediaTypesParam &
  WebAppsCreateOrUpdateFunctionSecretSlotBodyParam &
  RequestParameters;
export type WebAppsDeleteFunctionSecretSlotParameters = RequestParameters;
export type WebAppsListFunctionKeysSlotParameters = RequestParameters;
export type WebAppsListFunctionSecretsSlotParameters = RequestParameters;
export type WebAppsListHostKeysSlotParameters = RequestParameters;
export type WebAppsListSyncStatusSlotParameters = RequestParameters;
export type WebAppsSyncFunctionsSlotParameters = RequestParameters;

export interface WebAppsCreateOrUpdateHostSecretSlotBodyParam {
  /** The key to create or update */
  body: KeyInfo;
}

export interface WebAppsCreateOrUpdateHostSecretSlotMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsCreateOrUpdateHostSecretSlotParameters = WebAppsCreateOrUpdateHostSecretSlotMediaTypesParam &
  WebAppsCreateOrUpdateHostSecretSlotBodyParam &
  RequestParameters;
export type WebAppsDeleteHostSecretSlotParameters = RequestParameters;
export type WebAppsListHostNameBindingsSlotParameters = RequestParameters;
export type WebAppsGetHostNameBindingSlotParameters = RequestParameters;

export interface WebAppsCreateOrUpdateHostNameBindingSlotBodyParam {
  /** Binding details. This is the JSON representation of a HostNameBinding object. */
  body: HostNameBinding;
}

export interface WebAppsCreateOrUpdateHostNameBindingSlotMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsCreateOrUpdateHostNameBindingSlotParameters = WebAppsCreateOrUpdateHostNameBindingSlotMediaTypesParam &
  WebAppsCreateOrUpdateHostNameBindingSlotBodyParam &
  RequestParameters;
export type WebAppsDeleteHostNameBindingSlotParameters = RequestParameters;
export type WebAppsGetHybridConnectionSlotParameters = RequestParameters;

export interface WebAppsCreateOrUpdateHybridConnectionSlotBodyParam {
  /** The details of the hybrid connection. */
  body: HybridConnection;
}

export interface WebAppsCreateOrUpdateHybridConnectionSlotMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsCreateOrUpdateHybridConnectionSlotParameters = WebAppsCreateOrUpdateHybridConnectionSlotMediaTypesParam &
  WebAppsCreateOrUpdateHybridConnectionSlotBodyParam &
  RequestParameters;
export type WebAppsDeleteHybridConnectionSlotParameters = RequestParameters;

export interface WebAppsUpdateHybridConnectionSlotBodyParam {
  /** The details of the hybrid connection. */
  body: HybridConnection;
}

export interface WebAppsUpdateHybridConnectionSlotMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsUpdateHybridConnectionSlotParameters = WebAppsUpdateHybridConnectionSlotMediaTypesParam &
  WebAppsUpdateHybridConnectionSlotBodyParam &
  RequestParameters;
export type WebAppsListHybridConnectionsSlotParameters = RequestParameters;
export type WebAppsListRelayServiceConnectionsSlotParameters = RequestParameters;
export type WebAppsGetRelayServiceConnectionSlotParameters = RequestParameters;

export interface WebAppsCreateOrUpdateRelayServiceConnectionSlotBodyParam {
  /** Details of the hybrid connection configuration. */
  body: RelayServiceConnectionEntity;
}

export interface WebAppsCreateOrUpdateRelayServiceConnectionSlotMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsCreateOrUpdateRelayServiceConnectionSlotParameters = WebAppsCreateOrUpdateRelayServiceConnectionSlotMediaTypesParam &
  WebAppsCreateOrUpdateRelayServiceConnectionSlotBodyParam &
  RequestParameters;
export type WebAppsDeleteRelayServiceConnectionSlotParameters = RequestParameters;

export interface WebAppsUpdateRelayServiceConnectionSlotBodyParam {
  /** Details of the hybrid connection configuration. */
  body: RelayServiceConnectionEntity;
}

export interface WebAppsUpdateRelayServiceConnectionSlotMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsUpdateRelayServiceConnectionSlotParameters = WebAppsUpdateRelayServiceConnectionSlotMediaTypesParam &
  WebAppsUpdateRelayServiceConnectionSlotBodyParam &
  RequestParameters;
export type WebAppsListInstanceIdentifiersSlotParameters = RequestParameters;
export type WebAppsGetInstanceInfoSlotParameters = RequestParameters;
export type WebAppsGetInstanceMsDeployStatusSlotParameters = RequestParameters;

export interface WebAppsCreateInstanceMSDeployOperationSlotBodyParam {
  /** Details of MSDeploy operation */
  body: MSDeploy;
}

export interface WebAppsCreateInstanceMSDeployOperationSlotMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsCreateInstanceMSDeployOperationSlotParameters = WebAppsCreateInstanceMSDeployOperationSlotMediaTypesParam &
  WebAppsCreateInstanceMSDeployOperationSlotBodyParam &
  RequestParameters;
export type WebAppsGetInstanceMSDeployLogSlotParameters = RequestParameters;
export type WebAppsListInstanceProcessesSlotParameters = RequestParameters;
export type WebAppsGetInstanceProcessSlotParameters = RequestParameters;
export type WebAppsDeleteInstanceProcessSlotParameters = RequestParameters;
export type WebAppsGetInstanceProcessDumpSlotParameters = RequestParameters;
export type WebAppsListInstanceProcessModulesSlotParameters = RequestParameters;
export type WebAppsGetInstanceProcessModuleSlotParameters = RequestParameters;
export type WebAppsListInstanceProcessThreadsSlotParameters = RequestParameters;
export type WebAppsIsCloneableSlotParameters = RequestParameters;
export type WebAppsListSiteBackupsSlotParameters = RequestParameters;
export type WebAppsListSyncFunctionTriggersSlotParameters = RequestParameters;
export type WebAppsGetMigrateMySqlStatusSlotParameters = RequestParameters;
export type WebAppsGetSwiftVirtualNetworkConnectionSlotParameters = RequestParameters;

export interface WebAppsCreateOrUpdateSwiftVirtualNetworkConnectionWithCheckSlotBodyParam {
  /** Properties of the Virtual Network connection. See example. */
  body: SwiftVirtualNetwork;
}

export interface WebAppsCreateOrUpdateSwiftVirtualNetworkConnectionWithCheckSlotMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsCreateOrUpdateSwiftVirtualNetworkConnectionWithCheckSlotParameters = WebAppsCreateOrUpdateSwiftVirtualNetworkConnectionWithCheckSlotMediaTypesParam &
  WebAppsCreateOrUpdateSwiftVirtualNetworkConnectionWithCheckSlotBodyParam &
  RequestParameters;
export type WebAppsDeleteSwiftVirtualNetworkSlotParameters = RequestParameters;

export interface WebAppsUpdateSwiftVirtualNetworkConnectionWithCheckSlotBodyParam {
  /** Properties of the Virtual Network connection. See example. */
  body: SwiftVirtualNetwork;
}

export interface WebAppsUpdateSwiftVirtualNetworkConnectionWithCheckSlotMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsUpdateSwiftVirtualNetworkConnectionWithCheckSlotParameters = WebAppsUpdateSwiftVirtualNetworkConnectionWithCheckSlotMediaTypesParam &
  WebAppsUpdateSwiftVirtualNetworkConnectionWithCheckSlotBodyParam &
  RequestParameters;
export type WebAppsListNetworkFeaturesSlotParameters = RequestParameters;
export type WebAppsGetNetworkTraceOperationSlotParameters = RequestParameters;

export interface WebAppsStartWebSiteNetworkTraceSlotQueryParamProperties {
  /** The duration to keep capturing in seconds. */
  durationInSeconds?: number;
  /** The maximum frame length in bytes (Optional). */
  maxFrameLength?: number;
  /** The Blob URL to store capture file. */
  sasUrl?: string;
}

export interface WebAppsStartWebSiteNetworkTraceSlotQueryParam {
  queryParameters?: WebAppsStartWebSiteNetworkTraceSlotQueryParamProperties;
}

export type WebAppsStartWebSiteNetworkTraceSlotParameters = WebAppsStartWebSiteNetworkTraceSlotQueryParam &
  RequestParameters;

export interface WebAppsStartWebSiteNetworkTraceOperationSlotQueryParamProperties {
  /** The duration to keep capturing in seconds. */
  durationInSeconds?: number;
  /** The maximum frame length in bytes (Optional). */
  maxFrameLength?: number;
  /** The Blob URL to store capture file. */
  sasUrl?: string;
}

export interface WebAppsStartWebSiteNetworkTraceOperationSlotQueryParam {
  queryParameters?: WebAppsStartWebSiteNetworkTraceOperationSlotQueryParamProperties;
}

export type WebAppsStartWebSiteNetworkTraceOperationSlotParameters = WebAppsStartWebSiteNetworkTraceOperationSlotQueryParam &
  RequestParameters;
export type WebAppsStopWebSiteNetworkTraceSlotParameters = RequestParameters;
export type WebAppsGetNetworkTracesSlotParameters = RequestParameters;
export type WebAppsGetNetworkTraceOperationSlotV2Parameters = RequestParameters;
export type WebAppsGetNetworkTracesSlotV2Parameters = RequestParameters;
export type WebAppsGenerateNewSitePublishingPasswordSlotParameters = RequestParameters;

export interface WebAppsListPerfMonCountersSlotQueryParamProperties {
  /** Return only usages/metrics specified in the filter. Filter conforms to odata syntax. Example: $filter=(startTime eq 2014-01-01T00:00:00Z and endTime eq 2014-12-31T23:59:59Z and timeGrain eq duration'[Hour|Minute|Day]'. */
  $filter?: string;
}

export interface WebAppsListPerfMonCountersSlotQueryParam {
  queryParameters?: WebAppsListPerfMonCountersSlotQueryParamProperties;
}

export type WebAppsListPerfMonCountersSlotParameters = WebAppsListPerfMonCountersSlotQueryParam &
  RequestParameters;
export type WebAppsGetSitePhpErrorLogFlagSlotParameters = RequestParameters;
export type WebAppsListPremierAddOnsSlotParameters = RequestParameters;
export type WebAppsGetPremierAddOnSlotParameters = RequestParameters;

export interface WebAppsAddPremierAddOnSlotBodyParam {
  /** A JSON representation of the edited premier add-on. */
  body: PremierAddOn;
}

export interface WebAppsAddPremierAddOnSlotMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsAddPremierAddOnSlotParameters = WebAppsAddPremierAddOnSlotMediaTypesParam &
  WebAppsAddPremierAddOnSlotBodyParam &
  RequestParameters;
export type WebAppsDeletePremierAddOnSlotParameters = RequestParameters;

export interface WebAppsUpdatePremierAddOnSlotBodyParam {
  /** A JSON representation of the edited premier add-on. */
  body: PremierAddOnPatchResource;
}

export interface WebAppsUpdatePremierAddOnSlotMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsUpdatePremierAddOnSlotParameters = WebAppsUpdatePremierAddOnSlotMediaTypesParam &
  WebAppsUpdatePremierAddOnSlotBodyParam &
  RequestParameters;
export type WebAppsGetPrivateAccessSlotParameters = RequestParameters;

export interface WebAppsPutPrivateAccessVnetSlotBodyParam {
  /** The information for the private access */
  body: PrivateAccess;
}

export interface WebAppsPutPrivateAccessVnetSlotMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsPutPrivateAccessVnetSlotParameters = WebAppsPutPrivateAccessVnetSlotMediaTypesParam &
  WebAppsPutPrivateAccessVnetSlotBodyParam &
  RequestParameters;
export type WebAppsGetPrivateEndpointConnectionListSlotParameters = RequestParameters;
export type WebAppsGetPrivateEndpointConnectionSlotParameters = RequestParameters;

export interface WebAppsApproveOrRejectPrivateEndpointConnectionSlotBodyParam {
  body: PrivateLinkConnectionApprovalRequestResource;
}

export interface WebAppsApproveOrRejectPrivateEndpointConnectionSlotMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsApproveOrRejectPrivateEndpointConnectionSlotParameters = WebAppsApproveOrRejectPrivateEndpointConnectionSlotMediaTypesParam &
  WebAppsApproveOrRejectPrivateEndpointConnectionSlotBodyParam &
  RequestParameters;
export type WebAppsDeletePrivateEndpointConnectionSlotParameters = RequestParameters;
export type WebAppsGetPrivateLinkResourcesSlotParameters = RequestParameters;
export type WebAppsListProcessesSlotParameters = RequestParameters;
export type WebAppsGetProcessSlotParameters = RequestParameters;
export type WebAppsDeleteProcessSlotParameters = RequestParameters;
export type WebAppsGetProcessDumpSlotParameters = RequestParameters;
export type WebAppsListProcessModulesSlotParameters = RequestParameters;
export type WebAppsGetProcessModuleSlotParameters = RequestParameters;
export type WebAppsListProcessThreadsSlotParameters = RequestParameters;
export type WebAppsListPublicCertificatesSlotParameters = RequestParameters;
export type WebAppsGetPublicCertificateSlotParameters = RequestParameters;

export interface WebAppsCreateOrUpdatePublicCertificateSlotBodyParam {
  /** Public certificate details. This is the JSON representation of a PublicCertificate object. */
  body: PublicCertificate;
}

export interface WebAppsCreateOrUpdatePublicCertificateSlotMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsCreateOrUpdatePublicCertificateSlotParameters = WebAppsCreateOrUpdatePublicCertificateSlotMediaTypesParam &
  WebAppsCreateOrUpdatePublicCertificateSlotBodyParam &
  RequestParameters;
export type WebAppsDeletePublicCertificateSlotParameters = RequestParameters;

export interface WebAppsListPublishingProfileXmlWithSecretsSlotBodyParam {
  /** Specifies publishingProfileOptions for publishing profile. For example, use {"format": "FileZilla3"} to get a FileZilla publishing profile. */
  body: CsmPublishingProfileOptions;
}

export interface WebAppsListPublishingProfileXmlWithSecretsSlotMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsListPublishingProfileXmlWithSecretsSlotParameters = WebAppsListPublishingProfileXmlWithSecretsSlotMediaTypesParam &
  WebAppsListPublishingProfileXmlWithSecretsSlotBodyParam &
  RequestParameters;
export type WebAppsResetSlotConfigurationSlotParameters = RequestParameters;

export interface WebAppsRestartSlotQueryParamProperties {
  /** Specify true to apply the configuration settings and restarts the app only if necessary. By default, the API always restarts and reprovisions the app. */
  softRestart?: boolean;
  /** Specify true to block until the app is restarted. By default, it is set to false, and the API responds immediately (asynchronous). */
  synchronous?: boolean;
}

export interface WebAppsRestartSlotQueryParam {
  queryParameters?: WebAppsRestartSlotQueryParamProperties;
}

export type WebAppsRestartSlotParameters = WebAppsRestartSlotQueryParam & RequestParameters;

export interface WebAppsRestoreFromBackupBlobSlotBodyParam {
  /** Information on restore request . */
  body: RestoreRequest;
}

export interface WebAppsRestoreFromBackupBlobSlotMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsRestoreFromBackupBlobSlotParameters = WebAppsRestoreFromBackupBlobSlotMediaTypesParam &
  WebAppsRestoreFromBackupBlobSlotBodyParam &
  RequestParameters;

export interface WebAppsRestoreFromDeletedAppSlotBodyParam {
  /** Deleted web app restore information. */
  body: DeletedAppRestoreRequest;
}

export interface WebAppsRestoreFromDeletedAppSlotMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsRestoreFromDeletedAppSlotParameters = WebAppsRestoreFromDeletedAppSlotMediaTypesParam &
  WebAppsRestoreFromDeletedAppSlotBodyParam &
  RequestParameters;

export interface WebAppsRestoreSnapshotSlotBodyParam {
  /** Snapshot restore settings. Snapshot information can be obtained by calling GetDeletedSites or GetSiteSnapshots API. */
  body: SnapshotRestoreRequest;
}

export interface WebAppsRestoreSnapshotSlotMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsRestoreSnapshotSlotParameters = WebAppsRestoreSnapshotSlotMediaTypesParam &
  WebAppsRestoreSnapshotSlotBodyParam &
  RequestParameters;
export type WebAppsListSiteExtensionsSlotParameters = RequestParameters;
export type WebAppsGetSiteExtensionSlotParameters = RequestParameters;
export type WebAppsInstallSiteExtensionSlotParameters = RequestParameters;
export type WebAppsDeleteSiteExtensionSlotParameters = RequestParameters;

export interface WebAppsListSlotDifferencesSlotBodyParam {
  /** JSON object that contains the target slot name. See example. */
  body: CsmSlotEntity;
}

export interface WebAppsListSlotDifferencesSlotMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsListSlotDifferencesSlotParameters = WebAppsListSlotDifferencesSlotMediaTypesParam &
  WebAppsListSlotDifferencesSlotBodyParam &
  RequestParameters;

export interface WebAppsSwapSlotBodyParam {
  /** JSON object that contains the target slot name. See example. */
  body: CsmSlotEntity;
}

export interface WebAppsSwapSlotMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsSwapSlotParameters = WebAppsSwapSlotMediaTypesParam &
  WebAppsSwapSlotBodyParam &
  RequestParameters;
export type WebAppsListSnapshotsSlotParameters = RequestParameters;
export type WebAppsListSnapshotsFromDRSecondarySlotParameters = RequestParameters;
export type WebAppsGetSourceControlSlotParameters = RequestParameters;

export interface WebAppsCreateOrUpdateSourceControlSlotBodyParam {
  /** JSON representation of a SiteSourceControl object. See example. */
  body: SiteSourceControl;
}

export interface WebAppsCreateOrUpdateSourceControlSlotMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsCreateOrUpdateSourceControlSlotParameters = WebAppsCreateOrUpdateSourceControlSlotMediaTypesParam &
  WebAppsCreateOrUpdateSourceControlSlotBodyParam &
  RequestParameters;

export interface WebAppsDeleteSourceControlSlotQueryParamProperties {
  additionalFlags?: string;
}

export interface WebAppsDeleteSourceControlSlotQueryParam {
  queryParameters?: WebAppsDeleteSourceControlSlotQueryParamProperties;
}

export type WebAppsDeleteSourceControlSlotParameters = WebAppsDeleteSourceControlSlotQueryParam &
  RequestParameters;

export interface WebAppsUpdateSourceControlSlotBodyParam {
  /** JSON representation of a SiteSourceControl object. See example. */
  body: SiteSourceControl;
}

export interface WebAppsUpdateSourceControlSlotMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsUpdateSourceControlSlotParameters = WebAppsUpdateSourceControlSlotMediaTypesParam &
  WebAppsUpdateSourceControlSlotBodyParam &
  RequestParameters;
export type WebAppsStartSlotParameters = RequestParameters;

export interface WebAppsStartNetworkTraceSlotQueryParamProperties {
  /** The duration to keep capturing in seconds. */
  durationInSeconds?: number;
  /** The maximum frame length in bytes (Optional). */
  maxFrameLength?: number;
  /** The Blob URL to store capture file. */
  sasUrl?: string;
}

export interface WebAppsStartNetworkTraceSlotQueryParam {
  queryParameters?: WebAppsStartNetworkTraceSlotQueryParamProperties;
}

export type WebAppsStartNetworkTraceSlotParameters = WebAppsStartNetworkTraceSlotQueryParam &
  RequestParameters;
export type WebAppsStopSlotParameters = RequestParameters;
export type WebAppsStopNetworkTraceSlotParameters = RequestParameters;
export type WebAppsSyncRepositorySlotParameters = RequestParameters;
export type WebAppsSyncFunctionTriggersSlotParameters = RequestParameters;
export type WebAppsListTriggeredWebJobsSlotParameters = RequestParameters;
export type WebAppsGetTriggeredWebJobSlotParameters = RequestParameters;
export type WebAppsDeleteTriggeredWebJobSlotParameters = RequestParameters;
export type WebAppsListTriggeredWebJobHistorySlotParameters = RequestParameters;
export type WebAppsGetTriggeredWebJobHistorySlotParameters = RequestParameters;
export type WebAppsRunTriggeredWebJobSlotParameters = RequestParameters;

export interface WebAppsListUsagesSlotQueryParamProperties {
  /** Return only information specified in the filter (using OData syntax). For example: $filter=(name.value eq 'Metric1' or name.value eq 'Metric2') and startTime eq 2014-01-01T00:00:00Z and endTime eq 2014-12-31T23:59:59Z and timeGrain eq duration'[Hour|Minute|Day]'. */
  $filter?: string;
}

export interface WebAppsListUsagesSlotQueryParam {
  queryParameters?: WebAppsListUsagesSlotQueryParamProperties;
}

export type WebAppsListUsagesSlotParameters = WebAppsListUsagesSlotQueryParam & RequestParameters;
export type WebAppsListVnetConnectionsSlotParameters = RequestParameters;
export type WebAppsGetVnetConnectionSlotParameters = RequestParameters;

export interface WebAppsCreateOrUpdateVnetConnectionSlotBodyParam {
  /** Properties of the Virtual Network connection. See example. */
  body: VnetInfoResource;
}

export interface WebAppsCreateOrUpdateVnetConnectionSlotMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsCreateOrUpdateVnetConnectionSlotParameters = WebAppsCreateOrUpdateVnetConnectionSlotMediaTypesParam &
  WebAppsCreateOrUpdateVnetConnectionSlotBodyParam &
  RequestParameters;
export type WebAppsDeleteVnetConnectionSlotParameters = RequestParameters;

export interface WebAppsUpdateVnetConnectionSlotBodyParam {
  /** Properties of the Virtual Network connection. See example. */
  body: VnetInfoResource;
}

export interface WebAppsUpdateVnetConnectionSlotMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsUpdateVnetConnectionSlotParameters = WebAppsUpdateVnetConnectionSlotMediaTypesParam &
  WebAppsUpdateVnetConnectionSlotBodyParam &
  RequestParameters;
export type WebAppsGetVnetConnectionGatewaySlotParameters = RequestParameters;

export interface WebAppsCreateOrUpdateVnetConnectionGatewaySlotBodyParam {
  /** The properties to update this gateway with. */
  body: VnetGateway;
}

export interface WebAppsCreateOrUpdateVnetConnectionGatewaySlotMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsCreateOrUpdateVnetConnectionGatewaySlotParameters = WebAppsCreateOrUpdateVnetConnectionGatewaySlotMediaTypesParam &
  WebAppsCreateOrUpdateVnetConnectionGatewaySlotBodyParam &
  RequestParameters;

export interface WebAppsUpdateVnetConnectionGatewaySlotBodyParam {
  /** The properties to update this gateway with. */
  body: VnetGateway;
}

export interface WebAppsUpdateVnetConnectionGatewaySlotMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsUpdateVnetConnectionGatewaySlotParameters = WebAppsUpdateVnetConnectionGatewaySlotMediaTypesParam &
  WebAppsUpdateVnetConnectionGatewaySlotBodyParam &
  RequestParameters;
export type WebAppsListWebJobsSlotParameters = RequestParameters;
export type WebAppsGetWebJobSlotParameters = RequestParameters;

export interface WebAppsListSlotDifferencesFromProductionBodyParam {
  /** JSON object that contains the target slot name. See example. */
  body: CsmSlotEntity;
}

export interface WebAppsListSlotDifferencesFromProductionMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsListSlotDifferencesFromProductionParameters = WebAppsListSlotDifferencesFromProductionMediaTypesParam &
  WebAppsListSlotDifferencesFromProductionBodyParam &
  RequestParameters;

export interface WebAppsSwapSlotWithProductionBodyParam {
  /** JSON object that contains the target slot name. See example. */
  body: CsmSlotEntity;
}

export interface WebAppsSwapSlotWithProductionMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsSwapSlotWithProductionParameters = WebAppsSwapSlotWithProductionMediaTypesParam &
  WebAppsSwapSlotWithProductionBodyParam &
  RequestParameters;
export type WebAppsListSnapshotsParameters = RequestParameters;
export type WebAppsListSnapshotsFromDRSecondaryParameters = RequestParameters;
export type WebAppsGetSourceControlParameters = RequestParameters;

export interface WebAppsCreateOrUpdateSourceControlBodyParam {
  /** JSON representation of a SiteSourceControl object. See example. */
  body: SiteSourceControl;
}

export interface WebAppsCreateOrUpdateSourceControlMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsCreateOrUpdateSourceControlParameters = WebAppsCreateOrUpdateSourceControlMediaTypesParam &
  WebAppsCreateOrUpdateSourceControlBodyParam &
  RequestParameters;

export interface WebAppsDeleteSourceControlQueryParamProperties {
  additionalFlags?: string;
}

export interface WebAppsDeleteSourceControlQueryParam {
  queryParameters?: WebAppsDeleteSourceControlQueryParamProperties;
}

export type WebAppsDeleteSourceControlParameters = WebAppsDeleteSourceControlQueryParam &
  RequestParameters;

export interface WebAppsUpdateSourceControlBodyParam {
  /** JSON representation of a SiteSourceControl object. See example. */
  body: SiteSourceControl;
}

export interface WebAppsUpdateSourceControlMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsUpdateSourceControlParameters = WebAppsUpdateSourceControlMediaTypesParam &
  WebAppsUpdateSourceControlBodyParam &
  RequestParameters;
export type WebAppsStartParameters = RequestParameters;

export interface WebAppsStartNetworkTraceQueryParamProperties {
  /** The duration to keep capturing in seconds. */
  durationInSeconds?: number;
  /** The maximum frame length in bytes (Optional). */
  maxFrameLength?: number;
  /** The Blob URL to store capture file. */
  sasUrl?: string;
}

export interface WebAppsStartNetworkTraceQueryParam {
  queryParameters?: WebAppsStartNetworkTraceQueryParamProperties;
}

export type WebAppsStartNetworkTraceParameters = WebAppsStartNetworkTraceQueryParam &
  RequestParameters;
export type WebAppsStopParameters = RequestParameters;
export type WebAppsStopNetworkTraceParameters = RequestParameters;
export type WebAppsSyncRepositoryParameters = RequestParameters;
export type WebAppsSyncFunctionTriggersParameters = RequestParameters;
export type WebAppsListTriggeredWebJobsParameters = RequestParameters;
export type WebAppsGetTriggeredWebJobParameters = RequestParameters;
export type WebAppsDeleteTriggeredWebJobParameters = RequestParameters;
export type WebAppsListTriggeredWebJobHistoryParameters = RequestParameters;
export type WebAppsGetTriggeredWebJobHistoryParameters = RequestParameters;
export type WebAppsRunTriggeredWebJobParameters = RequestParameters;

export interface WebAppsListUsagesQueryParamProperties {
  /** Return only information specified in the filter (using OData syntax). For example: $filter=(name.value eq 'Metric1' or name.value eq 'Metric2') and startTime eq 2014-01-01T00:00:00Z and endTime eq 2014-12-31T23:59:59Z and timeGrain eq duration'[Hour|Minute|Day]'. */
  $filter?: string;
}

export interface WebAppsListUsagesQueryParam {
  queryParameters?: WebAppsListUsagesQueryParamProperties;
}

export type WebAppsListUsagesParameters = WebAppsListUsagesQueryParam & RequestParameters;
export type WebAppsListVnetConnectionsParameters = RequestParameters;
export type WebAppsGetVnetConnectionParameters = RequestParameters;

export interface WebAppsCreateOrUpdateVnetConnectionBodyParam {
  /** Properties of the Virtual Network connection. See example. */
  body: VnetInfoResource;
}

export interface WebAppsCreateOrUpdateVnetConnectionMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsCreateOrUpdateVnetConnectionParameters = WebAppsCreateOrUpdateVnetConnectionMediaTypesParam &
  WebAppsCreateOrUpdateVnetConnectionBodyParam &
  RequestParameters;
export type WebAppsDeleteVnetConnectionParameters = RequestParameters;

export interface WebAppsUpdateVnetConnectionBodyParam {
  /** Properties of the Virtual Network connection. See example. */
  body: VnetInfoResource;
}

export interface WebAppsUpdateVnetConnectionMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsUpdateVnetConnectionParameters = WebAppsUpdateVnetConnectionMediaTypesParam &
  WebAppsUpdateVnetConnectionBodyParam &
  RequestParameters;
export type WebAppsGetVnetConnectionGatewayParameters = RequestParameters;

export interface WebAppsCreateOrUpdateVnetConnectionGatewayBodyParam {
  /** The properties to update this gateway with. */
  body: VnetGateway;
}

export interface WebAppsCreateOrUpdateVnetConnectionGatewayMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsCreateOrUpdateVnetConnectionGatewayParameters = WebAppsCreateOrUpdateVnetConnectionGatewayMediaTypesParam &
  WebAppsCreateOrUpdateVnetConnectionGatewayBodyParam &
  RequestParameters;

export interface WebAppsUpdateVnetConnectionGatewayBodyParam {
  /** The properties to update this gateway with. */
  body: VnetGateway;
}

export interface WebAppsUpdateVnetConnectionGatewayMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebAppsUpdateVnetConnectionGatewayParameters = WebAppsUpdateVnetConnectionGatewayMediaTypesParam &
  WebAppsUpdateVnetConnectionGatewayBodyParam &
  RequestParameters;
export type WebAppsListWebJobsParameters = RequestParameters;
export type WebAppsGetWebJobParameters = RequestParameters;
