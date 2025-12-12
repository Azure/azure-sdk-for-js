// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HttpResponse } from "@azure-rest/core-client";
import type {
  AppServiceCertificateOrderCollectionOutput,
  DefaultErrorResponseOutput,
  AppServiceCertificateOrderOutput,
  AppServiceCertificateCollectionOutput,
  AppServiceCertificateResourceOutput,
  SiteSealOutput,
  CertificateOrderActionOutput,
  CertificateEmailOutput,
  DetectorResponseCollectionOutput,
  DetectorResponseOutput,
  CsmOperationCollectionOutput,
  DomainAvailabilityCheckResultOutput,
  DomainCollectionOutput,
  DomainControlCenterSsoRequestOutput,
  NameIdentifierCollectionOutput,
  DomainOutput,
  DomainOwnershipIdentifierCollectionOutput,
  DomainOwnershipIdentifierOutput,
  TopLevelDomainCollectionOutput,
  TopLevelDomainOutput,
  TldLegalAgreementCollectionOutput,
  AppServiceEnvironmentCollectionOutput,
  AppServiceEnvironmentResourceOutput,
  StampCapacityCollectionOutput,
  AddressResponseOutput,
  WebAppCollectionOutput,
  AseV3NetworkingConfigurationOutput,
  HostingEnvironmentDiagnosticsOutput,
  InboundEnvironmentEndpointCollectionOutput,
  WorkerPoolCollectionOutput,
  WorkerPoolResourceOutput,
  ResourceMetricDefinitionCollectionOutput,
  SkuInfoCollectionOutput,
  UsageCollectionOutput,
  OperationOutput,
  OutboundEnvironmentEndpointCollectionOutput,
  PrivateEndpointConnectionCollectionOutput,
  RemotePrivateEndpointConnectionARMResourceOutput,
  PrivateLinkResourcesWrapperOutput,
  AppServicePlanCollectionOutput,
  CsmUsageQuotaCollectionOutput,
  AppServicePlanOutput,
  CapabilityOutput,
  HybridConnectionOutput,
  HybridConnectionKeyOutput,
  ResourceCollectionOutput,
  HybridConnectionLimitsOutput,
  HybridConnectionCollectionOutput,
  VnetInfoResourceOutput,
  VnetGatewayOutput,
  VnetRouteOutput,
  CertificateCollectionOutput,
  CertificateOutput,
  ContainerAppCollectionOutput,
  ContainerAppOutput,
  SecretsCollectionOutput,
  RevisionCollectionOutput,
  RevisionOutput,
  DeletedWebAppCollectionOutput,
  DeletedSiteOutput,
  DiagnosticCategoryCollectionOutput,
  DiagnosticCategoryOutput,
  DiagnosticAnalysisCollectionOutput,
  AnalysisDefinitionOutput,
  DiagnosticAnalysisOutput,
  DiagnosticDetectorCollectionOutput,
  DetectorDefinitionResourceOutput,
  DiagnosticDetectorResponseOutput,
  SnapshotOutput,
  KubeEnvironmentCollectionOutput,
  KubeEnvironmentOutput,
  ApplicationStackCollectionOutput,
  FunctionAppStackCollectionOutput,
  WebAppStackCollectionOutput,
  RecommendationCollectionOutput,
  RecommendationRuleOutput,
  ResourceHealthMetadataCollectionOutput,
  ResourceHealthMetadataOutput,
  UserOutput,
  SourceControlCollectionOutput,
  SourceControlOutput,
  BillingMeterCollectionOutput,
  ResourceNameAvailabilityOutput,
  CustomHostnameSitesCollectionOutput,
  DeploymentLocationsOutput,
  GeoRegionCollectionOutput,
  IdentifierCollectionOutput,
  PremierAddOnOfferCollectionOutput,
  SkuInfosOutput,
  VnetValidationFailureDetailsOutput,
  ValidateResponseOutput,
  StaticSitesWorkflowPreviewOutput,
  StaticSiteCollectionOutput,
  StaticSiteARMResourceOutput,
  StaticSiteUserCollectionOutput,
  StaticSiteUserARMResourceOutput,
  StaticSiteBuildCollectionOutput,
  StaticSiteBuildARMResourceOutput,
  StringDictionaryOutput,
  StaticSiteFunctionOverviewCollectionOutput,
  StaticSiteUserProvidedFunctionAppsCollectionOutput,
  StaticSiteUserProvidedFunctionAppARMResourceOutput,
  StaticSiteUserInvitationResponseResourceOutput,
  StaticSiteCustomDomainOverviewCollectionOutput,
  StaticSiteCustomDomainOverviewARMResourceOutput,
  StringListOutput,
  SiteOutput,
  CustomHostnameAnalysisResultOutput,
  BackupItemOutput,
  BackupItemCollectionOutput,
  PublishingCredentialsPoliciesCollectionOutput,
  CsmPublishingCredentialsPoliciesEntityOutput,
  SiteConfigResourceCollectionOutput,
  SiteAuthSettingsOutput,
  SiteAuthSettingsV2Output,
  AzureStoragePropertyDictionaryResourceOutput,
  BackupRequestOutput,
  ApiKVReferenceCollectionOutput,
  ApiKVReferenceOutput,
  ConnectionStringDictionaryOutput,
  SiteLogsConfigOutput,
  PushSettingsOutput,
  SlotConfigNamesResourceOutput,
  SiteConfigResourceOutput,
  SiteConfigurationSnapshotInfoCollectionOutput,
  ContinuousWebJobCollectionOutput,
  ContinuousWebJobOutput,
  DeploymentCollectionOutput,
  DeploymentOutput,
  RestoreRequestOutput,
  IdentifierOutput,
  MSDeployStatusOutput,
  MSDeployLogOutput,
  FunctionEnvelopeCollectionOutput,
  FunctionEnvelopeOutput,
  KeyInfoOutput,
  FunctionSecretsOutput,
  HostKeysOutput,
  HostNameBindingCollectionOutput,
  HostNameBindingOutput,
  RelayServiceConnectionEntityOutput,
  WebAppInstanceStatusCollectionOutput,
  WebSiteInstanceStatusOutput,
  ProcessInfoCollectionOutput,
  ProcessInfoOutput,
  ProcessModuleInfoCollectionOutput,
  ProcessModuleInfoOutput,
  ProcessThreadInfoCollectionOutput,
  SiteCloneabilityOutput,
  StorageMigrationResponseOutput,
  MigrateMySqlStatusOutput,
  SwiftVirtualNetworkOutput,
  NetworkFeaturesOutput,
  NetworkTraceOutput,
  PerfMonCounterCollectionOutput,
  SitePhpErrorLogFlagOutput,
  PremierAddOnOutput,
  PrivateAccessOutput,
  PublicCertificateCollectionOutput,
  PublicCertificateOutput,
  SiteExtensionInfoCollectionOutput,
  SiteExtensionInfoOutput,
  SlotDifferenceCollectionOutput,
  SnapshotCollectionOutput,
  SiteSourceControlOutput,
  TriggeredWebJobCollectionOutput,
  TriggeredWebJobOutput,
  TriggeredJobHistoryCollectionOutput,
  TriggeredJobHistoryOutput,
  WebJobCollectionOutput,
  WebJobOutput,
} from "./outputModels.js";

/** List all certificate orders in a subscription. */
export interface AppServiceCertificateOrdersList200Response extends HttpResponse {
  status: "200";
  body: AppServiceCertificateOrderCollectionOutput;
}

/** List all certificate orders in a subscription. */
export interface AppServiceCertificateOrdersListDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Validate information for a certificate order. */
export interface AppServiceCertificateOrdersValidatePurchaseInformation204Response extends HttpResponse {
  status: "204";
}

/** Validate information for a certificate order. */
export interface AppServiceCertificateOrdersValidatePurchaseInformationDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get certificate orders in a resource group. */
export interface AppServiceCertificateOrdersListByResourceGroup200Response extends HttpResponse {
  status: "200";
  body: AppServiceCertificateOrderCollectionOutput;
}

/** Get certificate orders in a resource group. */
export interface AppServiceCertificateOrdersListByResourceGroupDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get a certificate order. */
export interface AppServiceCertificateOrdersGet200Response extends HttpResponse {
  status: "200";
  body: AppServiceCertificateOrderOutput;
}

/** Get a certificate order. */
export interface AppServiceCertificateOrdersGetDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Create or update a certificate purchase order. */
export interface AppServiceCertificateOrdersCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: AppServiceCertificateOrderOutput;
}

/** Create or update a certificate purchase order. */
export interface AppServiceCertificateOrdersCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: AppServiceCertificateOrderOutput;
}

/** Create or update a certificate purchase order. */
export interface AppServiceCertificateOrdersCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Delete an existing certificate order. */
export interface AppServiceCertificateOrdersDelete200Response extends HttpResponse {
  status: "200";
}

/** Delete an existing certificate order. */
export interface AppServiceCertificateOrdersDelete204Response extends HttpResponse {
  status: "204";
}

/** Delete an existing certificate order. */
export interface AppServiceCertificateOrdersDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Create or update a certificate purchase order. */
export interface AppServiceCertificateOrdersUpdate200Response extends HttpResponse {
  status: "200";
  body: AppServiceCertificateOrderOutput;
}

/** Create or update a certificate purchase order. */
export interface AppServiceCertificateOrdersUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** List all certificates associated with a certificate order. */
export interface AppServiceCertificateOrdersListCertificates200Response extends HttpResponse {
  status: "200";
  body: AppServiceCertificateCollectionOutput;
}

/** List all certificates associated with a certificate order. */
export interface AppServiceCertificateOrdersListCertificatesDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get the certificate associated with a certificate order. */
export interface AppServiceCertificateOrdersGetCertificate200Response extends HttpResponse {
  status: "200";
  body: AppServiceCertificateResourceOutput;
}

/** Get the certificate associated with a certificate order. */
export interface AppServiceCertificateOrdersGetCertificateDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Creates or updates a certificate and associates with key vault secret. */
export interface AppServiceCertificateOrdersCreateOrUpdateCertificate200Response extends HttpResponse {
  status: "200";
  body: AppServiceCertificateResourceOutput;
}

/** Creates or updates a certificate and associates with key vault secret. */
export interface AppServiceCertificateOrdersCreateOrUpdateCertificate201Response extends HttpResponse {
  status: "201";
  body: AppServiceCertificateResourceOutput;
}

/** Creates or updates a certificate and associates with key vault secret. */
export interface AppServiceCertificateOrdersCreateOrUpdateCertificateDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Delete the certificate associated with a certificate order. */
export interface AppServiceCertificateOrdersDeleteCertificate200Response extends HttpResponse {
  status: "200";
}

/** Delete the certificate associated with a certificate order. */
export interface AppServiceCertificateOrdersDeleteCertificate204Response extends HttpResponse {
  status: "204";
}

/** Delete the certificate associated with a certificate order. */
export interface AppServiceCertificateOrdersDeleteCertificateDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Creates or updates a certificate and associates with key vault secret. */
export interface AppServiceCertificateOrdersUpdateCertificate200Response extends HttpResponse {
  status: "200";
  body: AppServiceCertificateResourceOutput;
}

/** Creates or updates a certificate and associates with key vault secret. */
export interface AppServiceCertificateOrdersUpdateCertificateDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Reissue an existing certificate order. */
export interface AppServiceCertificateOrdersReissue204Response extends HttpResponse {
  status: "204";
}

/** Reissue an existing certificate order. */
export interface AppServiceCertificateOrdersReissueDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Renew an existing certificate order. */
export interface AppServiceCertificateOrdersRenew204Response extends HttpResponse {
  status: "204";
}

/** Renew an existing certificate order. */
export interface AppServiceCertificateOrdersRenewDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Resend certificate email. */
export interface AppServiceCertificateOrdersResendEmail204Response extends HttpResponse {
  status: "204";
}

/** Resend certificate email. */
export interface AppServiceCertificateOrdersResendEmailDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Resend domain verification ownership email containing steps on how to verify a domain for a given certificate order */
export interface AppServiceCertificateOrdersResendRequestEmails204Response extends HttpResponse {
  status: "204";
}

/** Resend domain verification ownership email containing steps on how to verify a domain for a given certificate order */
export interface AppServiceCertificateOrdersResendRequestEmailsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** This method is used to obtain the site seal information for an issued certificate. A site seal is a graphic that the certificate purchaser can embed on their web site to show their visitors information about their SSL certificate. If a web site visitor clicks on the site seal image, a pop-up page is displayed that contains detailed information about the SSL certificate. The site seal token is used to link the site seal graphic image to the appropriate certificate details pop-up page display when a user clicks on the site seal. The site seal images are expected to be static images and hosted by the reseller, to minimize delays for customer page load times. */
export interface AppServiceCertificateOrdersRetrieveSiteSeal200Response extends HttpResponse {
  status: "200";
  body: SiteSealOutput;
}

/** This method is used to obtain the site seal information for an issued certificate. A site seal is a graphic that the certificate purchaser can embed on their web site to show their visitors information about their SSL certificate. If a web site visitor clicks on the site seal image, a pop-up page is displayed that contains detailed information about the SSL certificate. The site seal token is used to link the site seal graphic image to the appropriate certificate details pop-up page display when a user clicks on the site seal. The site seal images are expected to be static images and hosted by the reseller, to minimize delays for customer page load times. */
export interface AppServiceCertificateOrdersRetrieveSiteSealDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Verify domain ownership for this certificate order. */
export interface AppServiceCertificateOrdersVerifyDomainOwnership204Response extends HttpResponse {
  status: "204";
}

/** Verify domain ownership for this certificate order. */
export interface AppServiceCertificateOrdersVerifyDomainOwnershipDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Retrieve the list of certificate actions. */
export interface AppServiceCertificateOrdersRetrieveCertificateActions200Response extends HttpResponse {
  status: "200";
  body: Array<CertificateOrderActionOutput>;
}

/** Retrieve the list of certificate actions. */
export interface AppServiceCertificateOrdersRetrieveCertificateActionsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Retrieve email history. */
export interface AppServiceCertificateOrdersRetrieveCertificateEmailHistory200Response extends HttpResponse {
  status: "200";
  body: Array<CertificateEmailOutput>;
}

/** Retrieve email history. */
export interface AppServiceCertificateOrdersRetrieveCertificateEmailHistoryDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Microsoft.CertificateRegistration to get the list of detectors for this RP. */
export interface CertificateOrdersDiagnosticsListAppServiceCertificateOrderDetectorResponse200Response extends HttpResponse {
  status: "200";
  body: DetectorResponseCollectionOutput;
}

/** Microsoft.CertificateRegistration to get the list of detectors for this RP. */
export interface CertificateOrdersDiagnosticsListAppServiceCertificateOrderDetectorResponseDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Microsoft.CertificateRegistration call to get a detector response from App Lens. */
export interface CertificateOrdersDiagnosticsGetAppServiceCertificateOrderDetectorResponse200Response extends HttpResponse {
  status: "200";
  body: DetectorResponseOutput;
}

/** Microsoft.CertificateRegistration call to get a detector response from App Lens. */
export interface CertificateOrdersDiagnosticsGetAppServiceCertificateOrderDetectorResponseDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Implements Csm operations Api to exposes the list of available Csm Apis under the resource provider */
export interface CertificateRegistrationProviderListOperations200Response extends HttpResponse {
  status: "200";
  body: CsmOperationCollectionOutput;
}

/** Implements Csm operations Api to exposes the list of available Csm Apis under the resource provider */
export interface CertificateRegistrationProviderListOperationsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Check if a domain is available for registration. */
export interface DomainsCheckAvailability200Response extends HttpResponse {
  status: "200";
  body: DomainAvailabilityCheckResultOutput;
}

/** Check if a domain is available for registration. */
export interface DomainsCheckAvailabilityDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get all domains in a subscription. */
export interface DomainsList200Response extends HttpResponse {
  status: "200";
  body: DomainCollectionOutput;
}

/** Get all domains in a subscription. */
export interface DomainsListDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Generate a single sign-on request for the domain management portal. */
export interface DomainsGetControlCenterSsoRequest200Response extends HttpResponse {
  status: "200";
  body: DomainControlCenterSsoRequestOutput;
}

/** Generate a single sign-on request for the domain management portal. */
export interface DomainsGetControlCenterSsoRequestDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get domain name recommendations based on keywords. */
export interface DomainsListRecommendations200Response extends HttpResponse {
  status: "200";
  body: NameIdentifierCollectionOutput;
}

/** Get domain name recommendations based on keywords. */
export interface DomainsListRecommendationsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get all domains in a resource group. */
export interface DomainsListByResourceGroup200Response extends HttpResponse {
  status: "200";
  body: DomainCollectionOutput;
}

/** Get all domains in a resource group. */
export interface DomainsListByResourceGroupDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get a domain. */
export interface DomainsGet200Response extends HttpResponse {
  status: "200";
  body: DomainOutput;
}

/** Get a domain. */
export interface DomainsGetDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Creates or updates a domain. */
export interface DomainsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: DomainOutput;
}

/** Creates or updates a domain. */
export interface DomainsCreateOrUpdate202Response extends HttpResponse {
  status: "202";
  body: DomainOutput;
}

/** Creates or updates a domain. */
export interface DomainsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Delete a domain. */
export interface DomainsDelete200Response extends HttpResponse {
  status: "200";
}

/** Delete a domain. */
export interface DomainsDelete204Response extends HttpResponse {
  status: "204";
}

/** Delete a domain. */
export interface DomainsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Creates or updates a domain. */
export interface DomainsUpdate200Response extends HttpResponse {
  status: "200";
  body: DomainOutput;
}

/** Creates or updates a domain. */
export interface DomainsUpdate202Response extends HttpResponse {
  status: "202";
  body: DomainOutput;
}

/** Creates or updates a domain. */
export interface DomainsUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Lists domain ownership identifiers. */
export interface DomainsListOwnershipIdentifiers200Response extends HttpResponse {
  status: "200";
  body: DomainOwnershipIdentifierCollectionOutput;
}

/** Lists domain ownership identifiers. */
export interface DomainsListOwnershipIdentifiersDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get ownership identifier for domain */
export interface DomainsGetOwnershipIdentifier200Response extends HttpResponse {
  status: "200";
  body: DomainOwnershipIdentifierOutput;
}

/** Get ownership identifier for domain */
export interface DomainsGetOwnershipIdentifierDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Creates an ownership identifier for a domain or updates identifier details for an existing identifier */
export interface DomainsCreateOrUpdateOwnershipIdentifier200Response extends HttpResponse {
  status: "200";
  body: DomainOwnershipIdentifierOutput;
}

/** Creates an ownership identifier for a domain or updates identifier details for an existing identifier */
export interface DomainsCreateOrUpdateOwnershipIdentifierDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Delete ownership identifier for domain */
export interface DomainsDeleteOwnershipIdentifier200Response extends HttpResponse {
  status: "200";
}

/** Delete ownership identifier for domain */
export interface DomainsDeleteOwnershipIdentifier204Response extends HttpResponse {
  status: "204";
}

/** Delete ownership identifier for domain */
export interface DomainsDeleteOwnershipIdentifierDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Creates an ownership identifier for a domain or updates identifier details for an existing identifier */
export interface DomainsUpdateOwnershipIdentifier200Response extends HttpResponse {
  status: "200";
  body: DomainOwnershipIdentifierOutput;
}

/** Creates an ownership identifier for a domain or updates identifier details for an existing identifier */
export interface DomainsUpdateOwnershipIdentifierDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Renew a domain. */
export interface DomainsRenew200Response extends HttpResponse {
  status: "200";
}

/** Renew a domain. */
export interface DomainsRenew202Response extends HttpResponse {
  status: "202";
}

/** Renew a domain. */
export interface DomainsRenew204Response extends HttpResponse {
  status: "204";
}

/** Renew a domain. */
export interface DomainsRenewDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Transfer out domain to another registrar */
export interface DomainsTransferOut200Response extends HttpResponse {
  status: "200";
  body: DomainOutput;
}

/** Transfer out domain to another registrar */
export interface DomainsTransferOut400Response extends HttpResponse {
  status: "400";
}

/** Transfer out domain to another registrar */
export interface DomainsTransferOutDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get all top-level domains supported for registration. */
export interface TopLevelDomainsList200Response extends HttpResponse {
  status: "200";
  body: TopLevelDomainCollectionOutput;
}

/** Get all top-level domains supported for registration. */
export interface TopLevelDomainsListDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get details of a top-level domain. */
export interface TopLevelDomainsGet200Response extends HttpResponse {
  status: "200";
  body: TopLevelDomainOutput;
}

/** Get details of a top-level domain. */
export interface TopLevelDomainsGetDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets all legal agreements that user needs to accept before purchasing a domain. */
export interface TopLevelDomainsListAgreements200Response extends HttpResponse {
  status: "200";
  body: TldLegalAgreementCollectionOutput;
}

/** Gets all legal agreements that user needs to accept before purchasing a domain. */
export interface TopLevelDomainsListAgreementsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Implements Csm operations Api to exposes the list of available Csm Apis under the resource provider */
export interface DomainRegistrationProviderListOperations200Response extends HttpResponse {
  status: "200";
  body: CsmOperationCollectionOutput;
}

/** Implements Csm operations Api to exposes the list of available Csm Apis under the resource provider */
export interface DomainRegistrationProviderListOperationsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get all App Service Environments for a subscription. */
export interface AppServiceEnvironmentsList200Response extends HttpResponse {
  status: "200";
  body: AppServiceEnvironmentCollectionOutput;
}

/** Get all App Service Environments for a subscription. */
export interface AppServiceEnvironmentsListDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get all App Service Environments in a resource group. */
export interface AppServiceEnvironmentsListByResourceGroup200Response extends HttpResponse {
  status: "200";
  body: AppServiceEnvironmentCollectionOutput;
}

/** Get all App Service Environments in a resource group. */
export interface AppServiceEnvironmentsListByResourceGroupDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get the properties of an App Service Environment. */
export interface AppServiceEnvironmentsGet200Response extends HttpResponse {
  status: "200";
  body: AppServiceEnvironmentResourceOutput;
}

/** Get the properties of an App Service Environment. */
export interface AppServiceEnvironmentsGetDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Create or update an App Service Environment. */
export interface AppServiceEnvironmentsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: AppServiceEnvironmentResourceOutput;
}

/** Create or update an App Service Environment. */
export interface AppServiceEnvironmentsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: AppServiceEnvironmentResourceOutput;
}

/** Create or update an App Service Environment. */
export interface AppServiceEnvironmentsCreateOrUpdate202Response extends HttpResponse {
  status: "202";
  body: AppServiceEnvironmentResourceOutput;
}

/** Create or update an App Service Environment. */
export interface AppServiceEnvironmentsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Delete an App Service Environment. */
export interface AppServiceEnvironmentsDelete202Response extends HttpResponse {
  status: "202";
}

/** Delete an App Service Environment. */
export interface AppServiceEnvironmentsDelete204Response extends HttpResponse {
  status: "204";
}

/** Delete an App Service Environment. */
export interface AppServiceEnvironmentsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Create or update an App Service Environment. */
export interface AppServiceEnvironmentsUpdate200Response extends HttpResponse {
  status: "200";
  body: AppServiceEnvironmentResourceOutput;
}

/** Create or update an App Service Environment. */
export interface AppServiceEnvironmentsUpdate201Response extends HttpResponse {
  status: "201";
  body: AppServiceEnvironmentResourceOutput;
}

/** Create or update an App Service Environment. */
export interface AppServiceEnvironmentsUpdate202Response extends HttpResponse {
  status: "202";
  body: AppServiceEnvironmentResourceOutput;
}

/** Create or update an App Service Environment. */
export interface AppServiceEnvironmentsUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get the used, available, and total worker capacity an App Service Environment. */
export interface AppServiceEnvironmentsListCapacities200Response extends HttpResponse {
  status: "200";
  body: StampCapacityCollectionOutput;
}

/** Get the used, available, and total worker capacity an App Service Environment. */
export interface AppServiceEnvironmentsListCapacitiesDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get IP addresses assigned to an App Service Environment. */
export interface AppServiceEnvironmentsGetVipInfo200Response extends HttpResponse {
  status: "200";
  body: AddressResponseOutput;
}

/** Get IP addresses assigned to an App Service Environment. */
export interface AppServiceEnvironmentsGetVipInfoDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Move an App Service Environment to a different VNET. */
export interface AppServiceEnvironmentsChangeVnet200Response extends HttpResponse {
  status: "200";
  body: WebAppCollectionOutput;
}

/** Move an App Service Environment to a different VNET. */
export interface AppServiceEnvironmentsChangeVnet202Response extends HttpResponse {
  status: "202";
  body: WebAppCollectionOutput;
}

/** Move an App Service Environment to a different VNET. */
export interface AppServiceEnvironmentsChangeVnetDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get networking configuration of an App Service Environment */
export interface AppServiceEnvironmentsGetAseV3NetworkingConfiguration200Response extends HttpResponse {
  status: "200";
  body: AseV3NetworkingConfigurationOutput;
}

/** Get networking configuration of an App Service Environment */
export interface AppServiceEnvironmentsGetAseV3NetworkingConfigurationDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Update networking configuration of an App Service Environment */
export interface AppServiceEnvironmentsUpdateAseNetworkingConfiguration200Response extends HttpResponse {
  status: "200";
  body: AseV3NetworkingConfigurationOutput;
}

/** Update networking configuration of an App Service Environment */
export interface AppServiceEnvironmentsUpdateAseNetworkingConfigurationDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get diagnostic information for an App Service Environment. */
export interface AppServiceEnvironmentsListDiagnostics200Response extends HttpResponse {
  status: "200";
  body: Array<HostingEnvironmentDiagnosticsOutput>;
}

/** Get diagnostic information for an App Service Environment. */
export interface AppServiceEnvironmentsListDiagnosticsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get a diagnostics item for an App Service Environment. */
export interface AppServiceEnvironmentsGetDiagnosticsItem200Response extends HttpResponse {
  status: "200";
  body: HostingEnvironmentDiagnosticsOutput;
}

/** Get a diagnostics item for an App Service Environment. */
export interface AppServiceEnvironmentsGetDiagnosticsItemDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get the network endpoints of all inbound dependencies of an App Service Environment. */
export interface AppServiceEnvironmentsGetInboundNetworkDependenciesEndpoints200Response extends HttpResponse {
  status: "200";
  body: InboundEnvironmentEndpointCollectionOutput;
}

/** Get the network endpoints of all inbound dependencies of an App Service Environment. */
export interface AppServiceEnvironmentsGetInboundNetworkDependenciesEndpointsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get all multi-role pools. */
export interface AppServiceEnvironmentsListMultiRolePools200Response extends HttpResponse {
  status: "200";
  body: WorkerPoolCollectionOutput;
}

/** Get all multi-role pools. */
export interface AppServiceEnvironmentsListMultiRolePoolsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get properties of a multi-role pool. */
export interface AppServiceEnvironmentsGetMultiRolePool200Response extends HttpResponse {
  status: "200";
  body: WorkerPoolResourceOutput;
}

/** Get properties of a multi-role pool. */
export interface AppServiceEnvironmentsGetMultiRolePoolDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Create or update a multi-role pool. */
export interface AppServiceEnvironmentsCreateOrUpdateMultiRolePool200Response extends HttpResponse {
  status: "200";
  body: WorkerPoolResourceOutput;
}

/** Create or update a multi-role pool. */
export interface AppServiceEnvironmentsCreateOrUpdateMultiRolePool202Response extends HttpResponse {
  status: "202";
  body: WorkerPoolResourceOutput;
}

/** Create or update a multi-role pool. */
export interface AppServiceEnvironmentsCreateOrUpdateMultiRolePoolDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Create or update a multi-role pool. */
export interface AppServiceEnvironmentsUpdateMultiRolePool200Response extends HttpResponse {
  status: "200";
  body: WorkerPoolResourceOutput;
}

/** Create or update a multi-role pool. */
export interface AppServiceEnvironmentsUpdateMultiRolePool202Response extends HttpResponse {
  status: "202";
  body: WorkerPoolResourceOutput;
}

/** Create or update a multi-role pool. */
export interface AppServiceEnvironmentsUpdateMultiRolePoolDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get metric definitions for a specific instance of a multi-role pool of an App Service Environment. */
export interface AppServiceEnvironmentsListMultiRolePoolInstanceMetricDefinitions200Response extends HttpResponse {
  status: "200";
  body: ResourceMetricDefinitionCollectionOutput;
}

/** Get metric definitions for a specific instance of a multi-role pool of an App Service Environment. */
export interface AppServiceEnvironmentsListMultiRolePoolInstanceMetricDefinitionsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get metric definitions for a multi-role pool of an App Service Environment. */
export interface AppServiceEnvironmentsListMultiRoleMetricDefinitions200Response extends HttpResponse {
  status: "200";
  body: ResourceMetricDefinitionCollectionOutput;
}

/** Get metric definitions for a multi-role pool of an App Service Environment. */
export interface AppServiceEnvironmentsListMultiRoleMetricDefinitionsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get available SKUs for scaling a multi-role pool. */
export interface AppServiceEnvironmentsListMultiRolePoolSkus200Response extends HttpResponse {
  status: "200";
  body: SkuInfoCollectionOutput;
}

/** Get available SKUs for scaling a multi-role pool. */
export interface AppServiceEnvironmentsListMultiRolePoolSkusDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get usage metrics for a multi-role pool of an App Service Environment. */
export interface AppServiceEnvironmentsListMultiRoleUsages200Response extends HttpResponse {
  status: "200";
  body: UsageCollectionOutput;
}

/** Get usage metrics for a multi-role pool of an App Service Environment. */
export interface AppServiceEnvironmentsListMultiRoleUsagesDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** List all currently running operations on the App Service Environment. */
export interface AppServiceEnvironmentsListOperations200Response extends HttpResponse {
  status: "200";
  body: Array<OperationOutput>;
}

/** List all currently running operations on the App Service Environment. */
export interface AppServiceEnvironmentsListOperationsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get the network endpoints of all outbound dependencies of an App Service Environment. */
export interface AppServiceEnvironmentsGetOutboundNetworkDependenciesEndpoints200Response extends HttpResponse {
  status: "200";
  body: OutboundEnvironmentEndpointCollectionOutput;
}

/** Get the network endpoints of all outbound dependencies of an App Service Environment. */
export interface AppServiceEnvironmentsGetOutboundNetworkDependenciesEndpointsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets the list of private endpoints associated with a hosting environment */
export interface AppServiceEnvironmentsGetPrivateEndpointConnectionList200Response extends HttpResponse {
  status: "200";
  body: PrivateEndpointConnectionCollectionOutput;
}

/** Gets the list of private endpoints associated with a hosting environment */
export interface AppServiceEnvironmentsGetPrivateEndpointConnectionListDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets a private endpoint connection */
export interface AppServiceEnvironmentsGetPrivateEndpointConnection200Response extends HttpResponse {
  status: "200";
  body: RemotePrivateEndpointConnectionARMResourceOutput;
}

/** Gets a private endpoint connection */
export interface AppServiceEnvironmentsGetPrivateEndpointConnectionDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Approves or rejects a private endpoint connection */
export interface AppServiceEnvironmentsApproveOrRejectPrivateEndpointConnection200Response extends HttpResponse {
  status: "200";
  body: RemotePrivateEndpointConnectionARMResourceOutput;
}

/** Approves or rejects a private endpoint connection */
export interface AppServiceEnvironmentsApproveOrRejectPrivateEndpointConnection202Response extends HttpResponse {
  status: "202";
  body: RemotePrivateEndpointConnectionARMResourceOutput;
}

/** Approves or rejects a private endpoint connection */
export interface AppServiceEnvironmentsApproveOrRejectPrivateEndpointConnectionDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Deletes a private endpoint connection */
export interface AppServiceEnvironmentsDeletePrivateEndpointConnection200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Deletes a private endpoint connection */
export interface AppServiceEnvironmentsDeletePrivateEndpointConnection202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Deletes a private endpoint connection */
export interface AppServiceEnvironmentsDeletePrivateEndpointConnection204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Deletes a private endpoint connection */
export interface AppServiceEnvironmentsDeletePrivateEndpointConnectionDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets the private link resources */
export interface AppServiceEnvironmentsGetPrivateLinkResources200Response extends HttpResponse {
  status: "200";
  body: PrivateLinkResourcesWrapperOutput;
}

/** Gets the private link resources */
export interface AppServiceEnvironmentsGetPrivateLinkResourcesDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Reboot all machines in an App Service Environment. */
export interface AppServiceEnvironmentsReboot202Response extends HttpResponse {
  status: "202";
}

/** Reboot all machines in an App Service Environment. */
export interface AppServiceEnvironmentsRebootDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Resume an App Service Environment. */
export interface AppServiceEnvironmentsResume200Response extends HttpResponse {
  status: "200";
  body: WebAppCollectionOutput;
}

/** Resume an App Service Environment. */
export interface AppServiceEnvironmentsResume202Response extends HttpResponse {
  status: "202";
  body: WebAppCollectionOutput;
}

/** Resume an App Service Environment. */
export interface AppServiceEnvironmentsResumeDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get all App Service plans in an App Service Environment. */
export interface AppServiceEnvironmentsListAppServicePlans200Response extends HttpResponse {
  status: "200";
  body: AppServicePlanCollectionOutput;
}

/** Get all App Service plans in an App Service Environment. */
export interface AppServiceEnvironmentsListAppServicePlansDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get all apps in an App Service Environment. */
export interface AppServiceEnvironmentsListWebApps200Response extends HttpResponse {
  status: "200";
  body: WebAppCollectionOutput;
}

/** Get all apps in an App Service Environment. */
export interface AppServiceEnvironmentsListWebAppsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Suspend an App Service Environment. */
export interface AppServiceEnvironmentsSuspend200Response extends HttpResponse {
  status: "200";
  body: WebAppCollectionOutput;
}

/** Suspend an App Service Environment. */
export interface AppServiceEnvironmentsSuspend202Response extends HttpResponse {
  status: "202";
  body: WebAppCollectionOutput;
}

/** Suspend an App Service Environment. */
export interface AppServiceEnvironmentsSuspendDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get global usage metrics of an App Service Environment. */
export interface AppServiceEnvironmentsListUsages200Response extends HttpResponse {
  status: "200";
  body: CsmUsageQuotaCollectionOutput;
}

/** Get global usage metrics of an App Service Environment. */
export interface AppServiceEnvironmentsListUsagesDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get all worker pools of an App Service Environment. */
export interface AppServiceEnvironmentsListWorkerPools200Response extends HttpResponse {
  status: "200";
  body: WorkerPoolCollectionOutput;
}

/** Get all worker pools of an App Service Environment. */
export interface AppServiceEnvironmentsListWorkerPoolsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get properties of a worker pool. */
export interface AppServiceEnvironmentsGetWorkerPool200Response extends HttpResponse {
  status: "200";
  body: WorkerPoolResourceOutput;
}

/** Get properties of a worker pool. */
export interface AppServiceEnvironmentsGetWorkerPoolDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Create or update a worker pool. */
export interface AppServiceEnvironmentsCreateOrUpdateWorkerPool200Response extends HttpResponse {
  status: "200";
  body: WorkerPoolResourceOutput;
}

/** Create or update a worker pool. */
export interface AppServiceEnvironmentsCreateOrUpdateWorkerPool202Response extends HttpResponse {
  status: "202";
  body: WorkerPoolResourceOutput;
}

/** Create or update a worker pool. */
export interface AppServiceEnvironmentsCreateOrUpdateWorkerPoolDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Create or update a worker pool. */
export interface AppServiceEnvironmentsUpdateWorkerPool200Response extends HttpResponse {
  status: "200";
  body: WorkerPoolResourceOutput;
}

/** Create or update a worker pool. */
export interface AppServiceEnvironmentsUpdateWorkerPool202Response extends HttpResponse {
  status: "202";
  body: WorkerPoolResourceOutput;
}

/** Create or update a worker pool. */
export interface AppServiceEnvironmentsUpdateWorkerPoolDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get metric definitions for a specific instance of a worker pool of an App Service Environment. */
export interface AppServiceEnvironmentsListWorkerPoolInstanceMetricDefinitions200Response extends HttpResponse {
  status: "200";
  body: ResourceMetricDefinitionCollectionOutput;
}

/** Get metric definitions for a specific instance of a worker pool of an App Service Environment. */
export interface AppServiceEnvironmentsListWorkerPoolInstanceMetricDefinitionsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get metric definitions for a worker pool of an App Service Environment. */
export interface AppServiceEnvironmentsListWebWorkerMetricDefinitions200Response extends HttpResponse {
  status: "200";
  body: ResourceMetricDefinitionCollectionOutput;
}

/** Get metric definitions for a worker pool of an App Service Environment. */
export interface AppServiceEnvironmentsListWebWorkerMetricDefinitionsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get available SKUs for scaling a worker pool. */
export interface AppServiceEnvironmentsListWorkerPoolSkus200Response extends HttpResponse {
  status: "200";
  body: SkuInfoCollectionOutput;
}

/** Get available SKUs for scaling a worker pool. */
export interface AppServiceEnvironmentsListWorkerPoolSkusDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get usage metrics for a worker pool of an App Service Environment. */
export interface AppServiceEnvironmentsListWebWorkerUsages200Response extends HttpResponse {
  status: "200";
  body: UsageCollectionOutput;
}

/** Get usage metrics for a worker pool of an App Service Environment. */
export interface AppServiceEnvironmentsListWebWorkerUsagesDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get all App Service plans for a subscription. */
export interface AppServicePlansList200Response extends HttpResponse {
  status: "200";
  body: AppServicePlanCollectionOutput;
}

/** Get all App Service plans for a subscription. */
export interface AppServicePlansListDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get all App Service plans in a resource group. */
export interface AppServicePlansListByResourceGroup200Response extends HttpResponse {
  status: "200";
  body: AppServicePlanCollectionOutput;
}

/** Get all App Service plans in a resource group. */
export interface AppServicePlansListByResourceGroupDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get an App Service plan. */
export interface AppServicePlansGet200Response extends HttpResponse {
  status: "200";
  body: AppServicePlanOutput;
}

/** Get an App Service plan. */
export interface AppServicePlansGet404Response extends HttpResponse {
  status: "404";
}

/** Get an App Service plan. */
export interface AppServicePlansGetDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Creates or updates an App Service Plan. */
export interface AppServicePlansCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: AppServicePlanOutput;
}

/** Creates or updates an App Service Plan. */
export interface AppServicePlansCreateOrUpdate202Response extends HttpResponse {
  status: "202";
  body: AppServicePlanOutput;
}

/** Creates or updates an App Service Plan. */
export interface AppServicePlansCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Delete an App Service plan. */
export interface AppServicePlansDelete200Response extends HttpResponse {
  status: "200";
}

/** Delete an App Service plan. */
export interface AppServicePlansDelete204Response extends HttpResponse {
  status: "204";
}

/** Delete an App Service plan. */
export interface AppServicePlansDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Creates or updates an App Service Plan. */
export interface AppServicePlansUpdate200Response extends HttpResponse {
  status: "200";
  body: AppServicePlanOutput;
}

/** Creates or updates an App Service Plan. */
export interface AppServicePlansUpdate202Response extends HttpResponse {
  status: "202";
  body: AppServicePlanOutput;
}

/** Creates or updates an App Service Plan. */
export interface AppServicePlansUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** List all capabilities of an App Service plan. */
export interface AppServicePlansListCapabilities200Response extends HttpResponse {
  status: "200";
  body: Array<CapabilityOutput>;
}

/** List all capabilities of an App Service plan. */
export interface AppServicePlansListCapabilitiesDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Retrieve a Hybrid Connection in use in an App Service plan. */
export interface AppServicePlansGetHybridConnection200Response extends HttpResponse {
  status: "200";
  body: HybridConnectionOutput;
}

/** Retrieve a Hybrid Connection in use in an App Service plan. */
export interface AppServicePlansGetHybridConnectionDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Delete a Hybrid Connection in use in an App Service plan. */
export interface AppServicePlansDeleteHybridConnection200Response extends HttpResponse {
  status: "200";
}

/** Delete a Hybrid Connection in use in an App Service plan. */
export interface AppServicePlansDeleteHybridConnection204Response extends HttpResponse {
  status: "204";
}

/** Delete a Hybrid Connection in use in an App Service plan. */
export interface AppServicePlansDeleteHybridConnectionDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get the send key name and value of a Hybrid Connection. */
export interface AppServicePlansListHybridConnectionKeys200Response extends HttpResponse {
  status: "200";
  body: HybridConnectionKeyOutput;
}

/** Get the send key name and value of a Hybrid Connection. */
export interface AppServicePlansListHybridConnectionKeysDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get all apps that use a Hybrid Connection in an App Service Plan. */
export interface AppServicePlansListWebAppsByHybridConnection200Response extends HttpResponse {
  status: "200";
  body: ResourceCollectionOutput;
}

/** Get all apps that use a Hybrid Connection in an App Service Plan. */
export interface AppServicePlansListWebAppsByHybridConnectionDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get the maximum number of Hybrid Connections allowed in an App Service plan. */
export interface AppServicePlansGetHybridConnectionPlanLimit200Response extends HttpResponse {
  status: "200";
  body: HybridConnectionLimitsOutput;
}

/** Get the maximum number of Hybrid Connections allowed in an App Service plan. */
export interface AppServicePlansGetHybridConnectionPlanLimitDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Retrieve all Hybrid Connections in use in an App Service plan. */
export interface AppServicePlansListHybridConnections200Response extends HttpResponse {
  status: "200";
  body: HybridConnectionCollectionOutput;
}

/** Retrieve all Hybrid Connections in use in an App Service plan. */
export interface AppServicePlansListHybridConnectionsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Restart all apps in an App Service plan. */
export interface AppServicePlansRestartWebApps204Response extends HttpResponse {
  status: "204";
}

/** Restart all apps in an App Service plan. */
export interface AppServicePlansRestartWebAppsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get all apps associated with an App Service plan. */
export interface AppServicePlansListWebApps200Response extends HttpResponse {
  status: "200";
  body: WebAppCollectionOutput;
}

/** Get all apps associated with an App Service plan. */
export interface AppServicePlansListWebAppsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets all selectable SKUs for a given App Service Plan */
export interface AppServicePlansGetServerFarmSkus200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Gets all selectable SKUs for a given App Service Plan */
export interface AppServicePlansGetServerFarmSkusDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets server farm usage information */
export interface AppServicePlansListUsages200Response extends HttpResponse {
  status: "200";
  body: CsmUsageQuotaCollectionOutput;
}

/** Gets server farm usage information */
export interface AppServicePlansListUsagesDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get all Virtual Networks associated with an App Service plan. */
export interface AppServicePlansListVnets200Response extends HttpResponse {
  status: "200";
  body: Array<VnetInfoResourceOutput>;
}

/** Get all Virtual Networks associated with an App Service plan. */
export interface AppServicePlansListVnetsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get a Virtual Network associated with an App Service plan. */
export interface AppServicePlansGetVnetFromServerFarm200Response extends HttpResponse {
  status: "200";
  body: VnetInfoResourceOutput;
}

/** Get a Virtual Network associated with an App Service plan. */
export interface AppServicePlansGetVnetFromServerFarm404Response extends HttpResponse {
  status: "404";
}

/** Get a Virtual Network associated with an App Service plan. */
export interface AppServicePlansGetVnetFromServerFarmDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get a Virtual Network gateway. */
export interface AppServicePlansGetVnetGateway200Response extends HttpResponse {
  status: "200";
  body: VnetGatewayOutput;
}

/** Get a Virtual Network gateway. */
export interface AppServicePlansGetVnetGatewayDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Update a Virtual Network gateway. */
export interface AppServicePlansUpdateVnetGateway200Response extends HttpResponse {
  status: "200";
  body: VnetGatewayOutput;
}

/** Update a Virtual Network gateway. */
export interface AppServicePlansUpdateVnetGatewayDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get all routes that are associated with a Virtual Network in an App Service plan. */
export interface AppServicePlansListRoutesForVnet200Response extends HttpResponse {
  status: "200";
  body: Array<VnetRouteOutput>;
}

/** Get all routes that are associated with a Virtual Network in an App Service plan. */
export interface AppServicePlansListRoutesForVnetDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get a Virtual Network route in an App Service plan. */
export interface AppServicePlansGetRouteForVnet200Response extends HttpResponse {
  status: "200";
  body: Array<VnetRouteOutput>;
}

/** Get a Virtual Network route in an App Service plan. */
export interface AppServicePlansGetRouteForVnet404Response extends HttpResponse {
  status: "404";
}

/** Get a Virtual Network route in an App Service plan. */
export interface AppServicePlansGetRouteForVnetDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Create or update a Virtual Network route in an App Service plan. */
export interface AppServicePlansCreateOrUpdateVnetRoute200Response extends HttpResponse {
  status: "200";
  body: VnetRouteOutput;
}

/** Create or update a Virtual Network route in an App Service plan. */
export interface AppServicePlansCreateOrUpdateVnetRoute400Response extends HttpResponse {
  status: "400";
}

/** Create or update a Virtual Network route in an App Service plan. */
export interface AppServicePlansCreateOrUpdateVnetRoute404Response extends HttpResponse {
  status: "404";
}

/** Create or update a Virtual Network route in an App Service plan. */
export interface AppServicePlansCreateOrUpdateVnetRouteDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Delete a Virtual Network route in an App Service plan. */
export interface AppServicePlansDeleteVnetRoute200Response extends HttpResponse {
  status: "200";
}

/** Delete a Virtual Network route in an App Service plan. */
export interface AppServicePlansDeleteVnetRoute404Response extends HttpResponse {
  status: "404";
}

/** Delete a Virtual Network route in an App Service plan. */
export interface AppServicePlansDeleteVnetRouteDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Create or update a Virtual Network route in an App Service plan. */
export interface AppServicePlansUpdateVnetRoute200Response extends HttpResponse {
  status: "200";
  body: VnetRouteOutput;
}

/** Create or update a Virtual Network route in an App Service plan. */
export interface AppServicePlansUpdateVnetRoute400Response extends HttpResponse {
  status: "400";
}

/** Create or update a Virtual Network route in an App Service plan. */
export interface AppServicePlansUpdateVnetRoute404Response extends HttpResponse {
  status: "404";
}

/** Create or update a Virtual Network route in an App Service plan. */
export interface AppServicePlansUpdateVnetRouteDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Reboot a worker machine in an App Service plan. */
export interface AppServicePlansRebootWorker204Response extends HttpResponse {
  status: "204";
}

/** Reboot a worker machine in an App Service plan. */
export interface AppServicePlansRebootWorkerDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get all certificates for a subscription. */
export interface CertificatesList200Response extends HttpResponse {
  status: "200";
  body: CertificateCollectionOutput;
}

/** Get all certificates for a subscription. */
export interface CertificatesListDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get all certificates in a resource group. */
export interface CertificatesListByResourceGroup200Response extends HttpResponse {
  status: "200";
  body: CertificateCollectionOutput;
}

/** Get all certificates in a resource group. */
export interface CertificatesListByResourceGroupDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get a certificate. */
export interface CertificatesGet200Response extends HttpResponse {
  status: "200";
  body: CertificateOutput;
}

/** Get a certificate. */
export interface CertificatesGetDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Create or update a certificate. */
export interface CertificatesCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: CertificateOutput;
}

/** Create or update a certificate. */
export interface CertificatesCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Delete a certificate. */
export interface CertificatesDelete200Response extends HttpResponse {
  status: "200";
}

/** Delete a certificate. */
export interface CertificatesDelete204Response extends HttpResponse {
  status: "204";
}

/** Delete a certificate. */
export interface CertificatesDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Create or update a certificate. */
export interface CertificatesUpdate200Response extends HttpResponse {
  status: "200";
  body: CertificateOutput;
}

/** Create or update a certificate. */
export interface CertificatesUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get the Container Apps in a given subscription. */
export interface ContainerAppsListBySubscription200Response extends HttpResponse {
  status: "200";
  body: ContainerAppCollectionOutput;
}

/** Get the Container Apps in a given subscription. */
export interface ContainerAppsListBySubscriptionDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get the Container Apps in a given resource group. */
export interface ContainerAppsListByResourceGroup200Response extends HttpResponse {
  status: "200";
  body: ContainerAppCollectionOutput;
}

/** Get the Container Apps in a given resource group. */
export interface ContainerAppsListByResourceGroupDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get the properties of a Container App. */
export interface ContainerAppsGet200Response extends HttpResponse {
  status: "200";
  body: ContainerAppOutput;
}

/** Get the properties of a Container App. */
export interface ContainerAppsGet404Response extends HttpResponse {
  status: "404";
}

/** Get the properties of a Container App. */
export interface ContainerAppsGetDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Create or update a Container App. */
export interface ContainerAppsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: ContainerAppOutput;
}

/** Create or update a Container App. */
export interface ContainerAppsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: ContainerAppOutput;
}

/** Create or update a Container App. */
export interface ContainerAppsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Delete a Container App. */
export interface ContainerAppsDelete200Response extends HttpResponse {
  status: "200";
}

/** Delete a Container App. */
export interface ContainerAppsDelete202Response extends HttpResponse {
  status: "202";
}

/** Delete a Container App. */
export interface ContainerAppsDelete204Response extends HttpResponse {
  status: "204";
}

/** Delete a Container App. */
export interface ContainerAppsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** List secrets for a container app */
export interface ContainerAppsListSecrets200Response extends HttpResponse {
  status: "200";
  body: SecretsCollectionOutput;
}

/** List secrets for a container app */
export interface ContainerAppsListSecretsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get the Revisions for a given Container App. */
export interface ContainerAppsRevisionsListRevisions200Response extends HttpResponse {
  status: "200";
  body: RevisionCollectionOutput;
}

/** Get the Revisions for a given Container App. */
export interface ContainerAppsRevisionsListRevisionsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get a revision of a Container App. */
export interface ContainerAppsRevisionsGetRevision200Response extends HttpResponse {
  status: "200";
  body: RevisionOutput;
}

/** Get a revision of a Container App. */
export interface ContainerAppsRevisionsGetRevisionDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Activates a revision for a Container App */
export interface ContainerAppsRevisionsActivateRevision200Response extends HttpResponse {
  status: "200";
}

/** Activates a revision for a Container App */
export interface ContainerAppsRevisionsActivateRevisionDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Deactivates a revision for a Container App */
export interface ContainerAppsRevisionsDeactivateRevision200Response extends HttpResponse {
  status: "200";
}

/** Deactivates a revision for a Container App */
export interface ContainerAppsRevisionsDeactivateRevisionDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Restarts a revision for a Container App */
export interface ContainerAppsRevisionsRestartRevision200Response extends HttpResponse {
  status: "200";
}

/** Restarts a revision for a Container App */
export interface ContainerAppsRevisionsRestartRevisionDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get all deleted apps for a subscription. */
export interface DeletedWebAppsList200Response extends HttpResponse {
  status: "200";
  body: DeletedWebAppCollectionOutput;
}

/** Get all deleted apps for a subscription. */
export interface DeletedWebAppsListDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get all deleted apps for a subscription at location */
export interface DeletedWebAppsListByLocation200Response extends HttpResponse {
  status: "200";
  body: DeletedWebAppCollectionOutput;
}

/** Get all deleted apps for a subscription at location */
export interface DeletedWebAppsListByLocationDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get deleted app for a subscription at location. */
export interface DeletedWebAppsGetDeletedWebAppByLocation200Response extends HttpResponse {
  status: "200";
  body: DeletedSiteOutput;
}

/** Get deleted app for a subscription at location. */
export interface DeletedWebAppsGetDeletedWebAppByLocationDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** List Hosting Environment Detector Responses */
export interface DiagnosticsListHostingEnvironmentDetectorResponses200Response extends HttpResponse {
  status: "200";
  body: DetectorResponseCollectionOutput;
}

/** List Hosting Environment Detector Responses */
export interface DiagnosticsListHostingEnvironmentDetectorResponsesDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get Hosting Environment Detector Response */
export interface DiagnosticsGetHostingEnvironmentDetectorResponse200Response extends HttpResponse {
  status: "200";
  body: DetectorResponseOutput;
}

/** Get Hosting Environment Detector Response */
export interface DiagnosticsGetHostingEnvironmentDetectorResponseDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** List Site Detector Responses */
export interface DiagnosticsListSiteDetectorResponses200Response extends HttpResponse {
  status: "200";
  body: DetectorResponseCollectionOutput;
}

/** List Site Detector Responses */
export interface DiagnosticsListSiteDetectorResponsesDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get site detector response */
export interface DiagnosticsGetSiteDetectorResponse200Response extends HttpResponse {
  status: "200";
  body: DetectorResponseOutput;
}

/** Get site detector response */
export interface DiagnosticsGetSiteDetectorResponseDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get Diagnostics Categories */
export interface DiagnosticsListSiteDiagnosticCategories200Response extends HttpResponse {
  status: "200";
  body: DiagnosticCategoryCollectionOutput;
}

/** Get Diagnostics Categories */
export interface DiagnosticsListSiteDiagnosticCategoriesDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get Diagnostics Category */
export interface DiagnosticsGetSiteDiagnosticCategory200Response extends HttpResponse {
  status: "200";
  body: DiagnosticCategoryOutput;
}

/** Get Diagnostics Category */
export interface DiagnosticsGetSiteDiagnosticCategoryDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get Site Analyses */
export interface DiagnosticsListSiteAnalyses200Response extends HttpResponse {
  status: "200";
  body: DiagnosticAnalysisCollectionOutput;
}

/** Get Site Analyses */
export interface DiagnosticsListSiteAnalysesDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get Site Analysis */
export interface DiagnosticsGetSiteAnalysis200Response extends HttpResponse {
  status: "200";
  body: AnalysisDefinitionOutput;
}

/** Get Site Analysis */
export interface DiagnosticsGetSiteAnalysisDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Execute Analysis */
export interface DiagnosticsExecuteSiteAnalysis200Response extends HttpResponse {
  status: "200";
  body: DiagnosticAnalysisOutput;
}

/** Execute Analysis */
export interface DiagnosticsExecuteSiteAnalysisDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get Detectors */
export interface DiagnosticsListSiteDetectors200Response extends HttpResponse {
  status: "200";
  body: DiagnosticDetectorCollectionOutput;
}

/** Get Detectors */
export interface DiagnosticsListSiteDetectorsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get Detector */
export interface DiagnosticsGetSiteDetector200Response extends HttpResponse {
  status: "200";
  body: DetectorDefinitionResourceOutput;
}

/** Get Detector */
export interface DiagnosticsGetSiteDetectorDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Execute Detector */
export interface DiagnosticsExecuteSiteDetector200Response extends HttpResponse {
  status: "200";
  body: DiagnosticDetectorResponseOutput;
}

/** Execute Detector */
export interface DiagnosticsExecuteSiteDetectorDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** List Site Detector Responses */
export interface DiagnosticsListSiteDetectorResponsesSlot200Response extends HttpResponse {
  status: "200";
  body: DetectorResponseCollectionOutput;
}

/** List Site Detector Responses */
export interface DiagnosticsListSiteDetectorResponsesSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get site detector response */
export interface DiagnosticsGetSiteDetectorResponseSlot200Response extends HttpResponse {
  status: "200";
  body: DetectorResponseOutput;
}

/** Get site detector response */
export interface DiagnosticsGetSiteDetectorResponseSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get Diagnostics Categories */
export interface DiagnosticsListSiteDiagnosticCategoriesSlot200Response extends HttpResponse {
  status: "200";
  body: DiagnosticCategoryCollectionOutput;
}

/** Get Diagnostics Categories */
export interface DiagnosticsListSiteDiagnosticCategoriesSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get Diagnostics Category */
export interface DiagnosticsGetSiteDiagnosticCategorySlot200Response extends HttpResponse {
  status: "200";
  body: DiagnosticCategoryOutput;
}

/** Get Diagnostics Category */
export interface DiagnosticsGetSiteDiagnosticCategorySlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get Site Analyses */
export interface DiagnosticsListSiteAnalysesSlot200Response extends HttpResponse {
  status: "200";
  body: DiagnosticAnalysisCollectionOutput;
}

/** Get Site Analyses */
export interface DiagnosticsListSiteAnalysesSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get Site Analysis */
export interface DiagnosticsGetSiteAnalysisSlot200Response extends HttpResponse {
  status: "200";
  body: AnalysisDefinitionOutput;
}

/** Get Site Analysis */
export interface DiagnosticsGetSiteAnalysisSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Execute Analysis */
export interface DiagnosticsExecuteSiteAnalysisSlot200Response extends HttpResponse {
  status: "200";
  body: DiagnosticAnalysisOutput;
}

/** Execute Analysis */
export interface DiagnosticsExecuteSiteAnalysisSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get Detectors */
export interface DiagnosticsListSiteDetectorsSlot200Response extends HttpResponse {
  status: "200";
  body: DiagnosticDetectorCollectionOutput;
}

/** Get Detectors */
export interface DiagnosticsListSiteDetectorsSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get Detector */
export interface DiagnosticsGetSiteDetectorSlot200Response extends HttpResponse {
  status: "200";
  body: DetectorDefinitionResourceOutput;
}

/** Get Detector */
export interface DiagnosticsGetSiteDetectorSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Execute Detector */
export interface DiagnosticsExecuteSiteDetectorSlot200Response extends HttpResponse {
  status: "200";
  body: DiagnosticDetectorResponseOutput;
}

/** Execute Detector */
export interface DiagnosticsExecuteSiteDetectorSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get deleted app for a subscription. */
export interface GlobalGetDeletedWebApp200Response extends HttpResponse {
  status: "200";
  body: DeletedSiteOutput;
}

/** Get deleted app for a subscription. */
export interface GlobalGetDeletedWebAppDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get all deleted apps for a subscription. */
export interface GlobalGetDeletedWebAppSnapshots200Response extends HttpResponse {
  status: "200";
  body: Array<SnapshotOutput>;
}

/** Get all deleted apps for a subscription. */
export interface GlobalGetDeletedWebAppSnapshotsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets an operation in a subscription and given region */
export interface GlobalGetSubscriptionOperationWithAsyncResponse204Response extends HttpResponse {
  status: "204";
}

/** Gets an operation in a subscription and given region */
export interface GlobalGetSubscriptionOperationWithAsyncResponseDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get all Kubernetes Environments for a subscription. */
export interface KubeEnvironmentsListBySubscription200Response extends HttpResponse {
  status: "200";
  body: KubeEnvironmentCollectionOutput;
}

/** Get all Kubernetes Environments for a subscription. */
export interface KubeEnvironmentsListBySubscriptionDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get all the Kubernetes Environments in a resource group. */
export interface KubeEnvironmentsListByResourceGroup200Response extends HttpResponse {
  status: "200";
  body: KubeEnvironmentCollectionOutput;
}

/** Get all the Kubernetes Environments in a resource group. */
export interface KubeEnvironmentsListByResourceGroupDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get the properties of a Kubernetes Environment. */
export interface KubeEnvironmentsGet200Response extends HttpResponse {
  status: "200";
  body: KubeEnvironmentOutput;
}

/** Get the properties of a Kubernetes Environment. */
export interface KubeEnvironmentsGetDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Creates or updates a Kubernetes Environment. */
export interface KubeEnvironmentsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: KubeEnvironmentOutput;
}

/** Creates or updates a Kubernetes Environment. */
export interface KubeEnvironmentsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: KubeEnvironmentOutput;
}

/** Creates or updates a Kubernetes Environment. */
export interface KubeEnvironmentsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Delete a Kubernetes Environment. */
export interface KubeEnvironmentsDelete200Response extends HttpResponse {
  status: "200";
}

/** Delete a Kubernetes Environment. */
export interface KubeEnvironmentsDelete202Response extends HttpResponse {
  status: "202";
}

/** Delete a Kubernetes Environment. */
export interface KubeEnvironmentsDelete204Response extends HttpResponse {
  status: "204";
}

/** Delete a Kubernetes Environment. */
export interface KubeEnvironmentsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Creates or updates a Kubernetes Environment. */
export interface KubeEnvironmentsUpdate200Response extends HttpResponse {
  status: "200";
  body: KubeEnvironmentOutput;
}

/** Creates or updates a Kubernetes Environment. */
export interface KubeEnvironmentsUpdate201Response extends HttpResponse {
  status: "201";
  body: KubeEnvironmentOutput;
}

/** Creates or updates a Kubernetes Environment. */
export interface KubeEnvironmentsUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get available application frameworks and their versions */
export interface ProviderGetAvailableStacks200Response extends HttpResponse {
  status: "200";
  body: ApplicationStackCollectionOutput;
}

/** Get available application frameworks and their versions */
export interface ProviderGetAvailableStacksDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get available Function app frameworks and their versions */
export interface ProviderGetFunctionAppStacks200Response extends HttpResponse {
  status: "200";
  body: FunctionAppStackCollectionOutput;
}

/** Get available Function app frameworks and their versions */
export interface ProviderGetFunctionAppStacksDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get available Function app frameworks and their versions for location */
export interface ProviderGetFunctionAppStacksForLocation200Response extends HttpResponse {
  status: "200";
  body: FunctionAppStackCollectionOutput;
}

/** Get available Function app frameworks and their versions for location */
export interface ProviderGetFunctionAppStacksForLocationDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get available Web app frameworks and their versions for location */
export interface ProviderGetWebAppStacksForLocation200Response extends HttpResponse {
  status: "200";
  body: WebAppStackCollectionOutput;
}

/** Get available Web app frameworks and their versions for location */
export interface ProviderGetWebAppStacksForLocationDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets all available operations for the Microsoft.Web resource provider. Also exposes resource metric definitions */
export interface ProviderListOperations200Response extends HttpResponse {
  status: "200";
  body: CsmOperationCollectionOutput;
}

/** Gets all available operations for the Microsoft.Web resource provider. Also exposes resource metric definitions */
export interface ProviderListOperationsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get available Web app frameworks and their versions */
export interface ProviderGetWebAppStacks200Response extends HttpResponse {
  status: "200";
  body: WebAppStackCollectionOutput;
}

/** Get available Web app frameworks and their versions */
export interface ProviderGetWebAppStacksDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get available application frameworks and their versions */
export interface ProviderGetAvailableStacksOnPrem200Response extends HttpResponse {
  status: "200";
  body: ApplicationStackCollectionOutput;
}

/** Get available application frameworks and their versions */
export interface ProviderGetAvailableStacksOnPremDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** List all recommendations for a subscription. */
export interface RecommendationsList200Response extends HttpResponse {
  status: "200";
  body: RecommendationCollectionOutput;
}

/** List all recommendations for a subscription. */
export interface RecommendationsListDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Reset all recommendation opt-out settings for a subscription. */
export interface RecommendationsResetAllFilters204Response extends HttpResponse {
  status: "204";
}

/** Reset all recommendation opt-out settings for a subscription. */
export interface RecommendationsResetAllFiltersDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Disables the specified rule so it will not apply to a subscription in the future. */
export interface RecommendationsDisableRecommendationForSubscription200Response extends HttpResponse {
  status: "200";
}

/** Disables the specified rule so it will not apply to a subscription in the future. */
export interface RecommendationsDisableRecommendationForSubscriptionDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get past recommendations for an app, optionally specified by the time range. */
export interface RecommendationsListHistoryForHostingEnvironment200Response extends HttpResponse {
  status: "200";
  body: RecommendationCollectionOutput;
}

/** Get past recommendations for an app, optionally specified by the time range. */
export interface RecommendationsListHistoryForHostingEnvironmentDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get all recommendations for a hosting environment. */
export interface RecommendationsListRecommendedRulesForHostingEnvironment200Response extends HttpResponse {
  status: "200";
  body: RecommendationCollectionOutput;
}

/** Get all recommendations for a hosting environment. */
export interface RecommendationsListRecommendedRulesForHostingEnvironmentDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Disable all recommendations for an app. */
export interface RecommendationsDisableAllForHostingEnvironment204Response extends HttpResponse {
  status: "204";
}

/** Disable all recommendations for an app. */
export interface RecommendationsDisableAllForHostingEnvironmentDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Reset all recommendation opt-out settings for an app. */
export interface RecommendationsResetAllFiltersForHostingEnvironment204Response extends HttpResponse {
  status: "204";
}

/** Reset all recommendation opt-out settings for an app. */
export interface RecommendationsResetAllFiltersForHostingEnvironmentDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get a recommendation rule for an app. */
export interface RecommendationsGetRuleDetailsByHostingEnvironment200Response extends HttpResponse {
  status: "200";
  body: RecommendationRuleOutput;
}

/** Get a recommendation rule for an app. */
export interface RecommendationsGetRuleDetailsByHostingEnvironmentDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Disables the specific rule for a web site permanently. */
export interface RecommendationsDisableRecommendationForHostingEnvironment200Response extends HttpResponse {
  status: "200";
}

/** Disables the specific rule for a web site permanently. */
export interface RecommendationsDisableRecommendationForHostingEnvironmentDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get past recommendations for an app, optionally specified by the time range. */
export interface RecommendationsListHistoryForWebApp200Response extends HttpResponse {
  status: "200";
  body: RecommendationCollectionOutput;
}

/** Get past recommendations for an app, optionally specified by the time range. */
export interface RecommendationsListHistoryForWebAppDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get all recommendations for an app. */
export interface RecommendationsListRecommendedRulesForWebApp200Response extends HttpResponse {
  status: "200";
  body: RecommendationCollectionOutput;
}

/** Get all recommendations for an app. */
export interface RecommendationsListRecommendedRulesForWebAppDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Disable all recommendations for an app. */
export interface RecommendationsDisableAllForWebApp204Response extends HttpResponse {
  status: "204";
}

/** Disable all recommendations for an app. */
export interface RecommendationsDisableAllForWebAppDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Reset all recommendation opt-out settings for an app. */
export interface RecommendationsResetAllFiltersForWebApp204Response extends HttpResponse {
  status: "204";
}

/** Reset all recommendation opt-out settings for an app. */
export interface RecommendationsResetAllFiltersForWebAppDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get a recommendation rule for an app. */
export interface RecommendationsGetRuleDetailsByWebApp200Response extends HttpResponse {
  status: "200";
  body: RecommendationRuleOutput;
}

/** Get a recommendation rule for an app. */
export interface RecommendationsGetRuleDetailsByWebAppDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Disables the specific rule for a web site permanently. */
export interface RecommendationsDisableRecommendationForSite200Response extends HttpResponse {
  status: "200";
}

/** Disables the specific rule for a web site permanently. */
export interface RecommendationsDisableRecommendationForSiteDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** List all ResourceHealthMetadata for all sites in the subscription. */
export interface ResourceHealthMetadataList200Response extends HttpResponse {
  status: "200";
  body: ResourceHealthMetadataCollectionOutput;
}

/** List all ResourceHealthMetadata for all sites in the subscription. */
export interface ResourceHealthMetadataListDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** List all ResourceHealthMetadata for all sites in the resource group in the subscription. */
export interface ResourceHealthMetadataListByResourceGroup200Response extends HttpResponse {
  status: "200";
  body: ResourceHealthMetadataCollectionOutput;
}

/** List all ResourceHealthMetadata for all sites in the resource group in the subscription. */
export interface ResourceHealthMetadataListByResourceGroupDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets the category of ResourceHealthMetadata to use for the given site as a collection */
export interface ResourceHealthMetadataListBySite200Response extends HttpResponse {
  status: "200";
  body: ResourceHealthMetadataCollectionOutput;
}

/** Gets the category of ResourceHealthMetadata to use for the given site as a collection */
export interface ResourceHealthMetadataListBySiteDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets the category of ResourceHealthMetadata to use for the given site */
export interface ResourceHealthMetadataGetBySite200Response extends HttpResponse {
  status: "200";
  body: ResourceHealthMetadataOutput;
}

/** Gets the category of ResourceHealthMetadata to use for the given site */
export interface ResourceHealthMetadataGetBySiteDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets the category of ResourceHealthMetadata to use for the given site as a collection */
export interface ResourceHealthMetadataListBySiteSlot200Response extends HttpResponse {
  status: "200";
  body: ResourceHealthMetadataCollectionOutput;
}

/** Gets the category of ResourceHealthMetadata to use for the given site as a collection */
export interface ResourceHealthMetadataListBySiteSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets the category of ResourceHealthMetadata to use for the given site */
export interface ResourceHealthMetadataGetBySiteSlot200Response extends HttpResponse {
  status: "200";
  body: ResourceHealthMetadataOutput;
}

/** Gets the category of ResourceHealthMetadata to use for the given site */
export interface ResourceHealthMetadataGetBySiteSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets publishing user */
export interface GetPublishingUser200Response extends HttpResponse {
  status: "200";
  body: UserOutput;
}

/** Gets publishing user */
export interface GetPublishingUserDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Updates publishing user */
export interface UpdatePublishingUser200Response extends HttpResponse {
  status: "200";
  body: UserOutput;
}

/** Updates publishing user */
export interface UpdatePublishingUserDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets the source controls available for Azure websites. */
export interface ListSourceControls200Response extends HttpResponse {
  status: "200";
  body: SourceControlCollectionOutput;
}

/** Gets the source controls available for Azure websites. */
export interface ListSourceControlsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets source control token */
export interface GetSourceControl200Response extends HttpResponse {
  status: "200";
  body: SourceControlOutput;
}

/** Gets source control token */
export interface GetSourceControlDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Updates source control token */
export interface UpdateSourceControl200Response extends HttpResponse {
  status: "200";
  body: SourceControlOutput;
}

/** Updates source control token */
export interface UpdateSourceControlDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets a list of meters for a given location. */
export interface ListBillingMeters200Response extends HttpResponse {
  status: "200";
  body: BillingMeterCollectionOutput;
}

/** Gets a list of meters for a given location. */
export interface ListBillingMetersDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Check if a resource name is available. */
export interface CheckNameAvailability200Response extends HttpResponse {
  status: "200";
  body: ResourceNameAvailabilityOutput;
}

/** Check if a resource name is available. */
export interface CheckNameAvailabilityDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get custom hostnames under this subscription */
export interface ListCustomHostNameSites200Response extends HttpResponse {
  status: "200";
  body: CustomHostnameSitesCollectionOutput;
}

/** Get custom hostnames under this subscription */
export interface ListCustomHostNameSitesDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets list of available geo regions plus ministamps */
export interface GetSubscriptionDeploymentLocations200Response extends HttpResponse {
  status: "200";
  body: DeploymentLocationsOutput;
}

/** Gets list of available geo regions plus ministamps */
export interface GetSubscriptionDeploymentLocationsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get a list of available geographical regions. */
export interface ListGeoRegions200Response extends HttpResponse {
  status: "200";
  body: GeoRegionCollectionOutput;
}

/** Get a list of available geographical regions. */
export interface ListGeoRegionsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** List all apps that are assigned to a hostname. */
export interface ListSiteIdentifiersAssignedToHostName200Response extends HttpResponse {
  status: "200";
  body: IdentifierCollectionOutput;
}

/** List all apps that are assigned to a hostname. */
export interface ListSiteIdentifiersAssignedToHostNameDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** List all premier add-on offers. */
export interface ListPremierAddOnOffers200Response extends HttpResponse {
  status: "200";
  body: PremierAddOnOfferCollectionOutput;
}

/** List all premier add-on offers. */
export interface ListPremierAddOnOffersDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** List all SKUs. */
export interface ListSkus200Response extends HttpResponse {
  status: "200";
  body: SkuInfosOutput;
}

/** List all SKUs. */
export interface ListSkusDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Verifies if this VNET is compatible with an App Service Environment by analyzing the Network Security Group rules. */
export interface VerifyHostingEnvironmentVnet200Response extends HttpResponse {
  status: "200";
  body: VnetValidationFailureDetailsOutput;
}

/** Verifies if this VNET is compatible with an App Service Environment by analyzing the Network Security Group rules. */
export interface VerifyHostingEnvironmentVnetDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Move resources between resource groups. */
export interface Move204Response extends HttpResponse {
  status: "204";
}

/** Move resources between resource groups. */
export interface MoveDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Validate if a resource can be created. */
export interface Validate200Response extends HttpResponse {
  status: "200";
  body: ValidateResponseOutput;
}

/** Validate if a resource can be created. */
export interface ValidateDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Validate whether a resource can be moved. */
export interface ValidateMove204Response extends HttpResponse {
  status: "204";
}

/** Validate whether a resource can be moved. */
export interface ValidateMoveDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Generates a preview workflow file for the static site */
export interface StaticSitesPreviewWorkflow200Response extends HttpResponse {
  status: "200";
  body: StaticSitesWorkflowPreviewOutput;
}

/** Generates a preview workflow file for the static site */
export interface StaticSitesPreviewWorkflowDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get all Static Sites for a subscription. */
export interface StaticSitesList200Response extends HttpResponse {
  status: "200";
  body: StaticSiteCollectionOutput;
}

/** Get all Static Sites for a subscription. */
export interface StaticSitesListDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets all static sites in the specified resource group. */
export interface StaticSitesGetStaticSitesByResourceGroup200Response extends HttpResponse {
  status: "200";
  body: StaticSiteCollectionOutput;
}

/** Gets all static sites in the specified resource group. */
export interface StaticSitesGetStaticSitesByResourceGroupDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets the details of a static site. */
export interface StaticSitesGetStaticSite200Response extends HttpResponse {
  status: "200";
  body: StaticSiteARMResourceOutput;
}

/** Gets the details of a static site. */
export interface StaticSitesGetStaticSiteDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Creates a new static site in an existing resource group, or updates an existing static site. */
export interface StaticSitesCreateOrUpdateStaticSite200Response extends HttpResponse {
  status: "200";
  body: StaticSiteARMResourceOutput;
}

/** Creates a new static site in an existing resource group, or updates an existing static site. */
export interface StaticSitesCreateOrUpdateStaticSite202Response extends HttpResponse {
  status: "202";
  body: StaticSiteARMResourceOutput;
}

/** Creates a new static site in an existing resource group, or updates an existing static site. */
export interface StaticSitesCreateOrUpdateStaticSiteDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Deletes a static site. */
export interface StaticSitesDeleteStaticSite200Response extends HttpResponse {
  status: "200";
}

/** Deletes a static site. */
export interface StaticSitesDeleteStaticSite202Response extends HttpResponse {
  status: "202";
}

/** Deletes a static site. */
export interface StaticSitesDeleteStaticSiteDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Creates a new static site in an existing resource group, or updates an existing static site. */
export interface StaticSitesUpdateStaticSite200Response extends HttpResponse {
  status: "200";
  body: StaticSiteARMResourceOutput;
}

/** Creates a new static site in an existing resource group, or updates an existing static site. */
export interface StaticSitesUpdateStaticSite202Response extends HttpResponse {
  status: "202";
  body: StaticSiteARMResourceOutput;
}

/** Creates a new static site in an existing resource group, or updates an existing static site. */
export interface StaticSitesUpdateStaticSiteDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets the list of users of a static site. */
export interface StaticSitesListStaticSiteUsers200Response extends HttpResponse {
  status: "200";
  body: StaticSiteUserCollectionOutput;
}

/** Gets the list of users of a static site. */
export interface StaticSitesListStaticSiteUsersDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Deletes the user entry from the static site. */
export interface StaticSitesDeleteStaticSiteUser200Response extends HttpResponse {
  status: "200";
}

/** Deletes the user entry from the static site. */
export interface StaticSitesDeleteStaticSiteUserDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Updates a user entry with the listed roles */
export interface StaticSitesUpdateStaticSiteUser200Response extends HttpResponse {
  status: "200";
  body: StaticSiteUserARMResourceOutput;
}

/** Updates a user entry with the listed roles */
export interface StaticSitesUpdateStaticSiteUserDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets all static site builds for a particular static site. */
export interface StaticSitesGetStaticSiteBuilds200Response extends HttpResponse {
  status: "200";
  body: StaticSiteBuildCollectionOutput;
}

/** Gets all static site builds for a particular static site. */
export interface StaticSitesGetStaticSiteBuildsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets the details of a static site build. */
export interface StaticSitesGetStaticSiteBuild200Response extends HttpResponse {
  status: "200";
  body: StaticSiteBuildARMResourceOutput;
}

/** Gets the details of a static site build. */
export interface StaticSitesGetStaticSiteBuildDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Deletes a static site build. */
export interface StaticSitesDeleteStaticSiteBuild200Response extends HttpResponse {
  status: "200";
}

/** Deletes a static site build. */
export interface StaticSitesDeleteStaticSiteBuild202Response extends HttpResponse {
  status: "202";
}

/** Deletes a static site build. */
export interface StaticSitesDeleteStaticSiteBuild204Response extends HttpResponse {
  status: "204";
}

/** Deletes a static site build. */
export interface StaticSitesDeleteStaticSiteBuildDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Creates or updates the app settings of a static site build. */
export interface StaticSitesCreateOrUpdateStaticSiteBuildAppSettings200Response extends HttpResponse {
  status: "200";
  body: StringDictionaryOutput;
}

/** Creates or updates the app settings of a static site build. */
export interface StaticSitesCreateOrUpdateStaticSiteBuildAppSettingsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Creates or updates the function app settings of a static site build. */
export interface StaticSitesCreateOrUpdateStaticSiteBuildFunctionAppSettings200Response extends HttpResponse {
  status: "200";
  body: StringDictionaryOutput;
}

/** Creates or updates the function app settings of a static site build. */
export interface StaticSitesCreateOrUpdateStaticSiteBuildFunctionAppSettingsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets the functions of a particular static site build. */
export interface StaticSitesListStaticSiteBuildFunctions200Response extends HttpResponse {
  status: "200";
  body: StaticSiteFunctionOverviewCollectionOutput;
}

/** Gets the functions of a particular static site build. */
export interface StaticSitesListStaticSiteBuildFunctionsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets the application settings of a static site build. */
export interface StaticSitesListStaticSiteBuildAppSettings200Response extends HttpResponse {
  status: "200";
  body: StringDictionaryOutput;
}

/** Gets the application settings of a static site build. */
export interface StaticSitesListStaticSiteBuildAppSettingsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets the application settings of a static site build. */
export interface StaticSitesListStaticSiteBuildFunctionAppSettings200Response extends HttpResponse {
  status: "200";
  body: StringDictionaryOutput;
}

/** Gets the application settings of a static site build. */
export interface StaticSitesListStaticSiteBuildFunctionAppSettingsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets the details of the user provided function apps registered with a static site build */
export interface StaticSitesGetUserProvidedFunctionAppsForStaticSiteBuild200Response extends HttpResponse {
  status: "200";
  body: StaticSiteUserProvidedFunctionAppsCollectionOutput;
}

/** Gets the details of the user provided function apps registered with a static site build */
export interface StaticSitesGetUserProvidedFunctionAppsForStaticSiteBuildDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets the details of the user provided function app registered with a static site build */
export interface StaticSitesGetUserProvidedFunctionAppForStaticSiteBuild200Response extends HttpResponse {
  status: "200";
  body: StaticSiteUserProvidedFunctionAppARMResourceOutput;
}

/** Gets the details of the user provided function app registered with a static site build */
export interface StaticSitesGetUserProvidedFunctionAppForStaticSiteBuildDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Register a user provided function app with a static site build */
export interface StaticSitesRegisterUserProvidedFunctionAppWithStaticSiteBuild200Response extends HttpResponse {
  status: "200";
  body: StaticSiteUserProvidedFunctionAppARMResourceOutput;
}

/** Register a user provided function app with a static site build */
export interface StaticSitesRegisterUserProvidedFunctionAppWithStaticSiteBuild202Response extends HttpResponse {
  status: "202";
  body: StaticSiteUserProvidedFunctionAppARMResourceOutput;
}

/** Register a user provided function app with a static site build */
export interface StaticSitesRegisterUserProvidedFunctionAppWithStaticSiteBuildDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Detach the user provided function app from the static site build */
export interface StaticSitesDetachUserProvidedFunctionAppFromStaticSiteBuild200Response extends HttpResponse {
  status: "200";
}

/** Detach the user provided function app from the static site build */
export interface StaticSitesDetachUserProvidedFunctionAppFromStaticSiteBuild204Response extends HttpResponse {
  status: "204";
}

/** Detach the user provided function app from the static site build */
export interface StaticSitesDetachUserProvidedFunctionAppFromStaticSiteBuildDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Deploys zipped content to a specific environment of a static site. */
export interface StaticSitesCreateZipDeploymentForStaticSiteBuild200Response extends HttpResponse {
  status: "200";
}

/** Deploys zipped content to a specific environment of a static site. */
export interface StaticSitesCreateZipDeploymentForStaticSiteBuild202Response extends HttpResponse {
  status: "202";
}

/** Deploys zipped content to a specific environment of a static site. */
export interface StaticSitesCreateZipDeploymentForStaticSiteBuildDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Creates or updates the app settings of a static site. */
export interface StaticSitesCreateOrUpdateStaticSiteAppSettings200Response extends HttpResponse {
  status: "200";
  body: StringDictionaryOutput;
}

/** Creates or updates the app settings of a static site. */
export interface StaticSitesCreateOrUpdateStaticSiteAppSettingsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Creates or updates the function app settings of a static site. */
export interface StaticSitesCreateOrUpdateStaticSiteFunctionAppSettings200Response extends HttpResponse {
  status: "200";
  body: StringDictionaryOutput;
}

/** Creates or updates the function app settings of a static site. */
export interface StaticSitesCreateOrUpdateStaticSiteFunctionAppSettingsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Creates an invitation link for a user with the role */
export interface StaticSitesCreateUserRolesInvitationLink200Response extends HttpResponse {
  status: "200";
  body: StaticSiteUserInvitationResponseResourceOutput;
}

/** Creates an invitation link for a user with the role */
export interface StaticSitesCreateUserRolesInvitationLinkDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets all static site custom domains for a particular static site. */
export interface StaticSitesListStaticSiteCustomDomains200Response extends HttpResponse {
  status: "200";
  body: StaticSiteCustomDomainOverviewCollectionOutput;
}

/** Gets all static site custom domains for a particular static site. */
export interface StaticSitesListStaticSiteCustomDomainsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets an existing custom domain for a particular static site. */
export interface StaticSitesGetStaticSiteCustomDomain200Response extends HttpResponse {
  status: "200";
  body: StaticSiteCustomDomainOverviewARMResourceOutput;
}

/** Gets an existing custom domain for a particular static site. */
export interface StaticSitesGetStaticSiteCustomDomainDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Creates a new static site custom domain in an existing resource group and static site. */
export interface StaticSitesCreateOrUpdateStaticSiteCustomDomain200Response extends HttpResponse {
  status: "200";
  body: StaticSiteCustomDomainOverviewARMResourceOutput;
}

/** Creates a new static site custom domain in an existing resource group and static site. */
export interface StaticSitesCreateOrUpdateStaticSiteCustomDomain202Response extends HttpResponse {
  status: "202";
  body: StaticSiteCustomDomainOverviewARMResourceOutput;
}

/** Creates a new static site custom domain in an existing resource group and static site. */
export interface StaticSitesCreateOrUpdateStaticSiteCustomDomainDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Deletes a custom domain. */
export interface StaticSitesDeleteStaticSiteCustomDomain200Response extends HttpResponse {
  status: "200";
}

/** Deletes a custom domain. */
export interface StaticSitesDeleteStaticSiteCustomDomain202Response extends HttpResponse {
  status: "202";
}

/** Deletes a custom domain. */
export interface StaticSitesDeleteStaticSiteCustomDomainDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Validates a particular custom domain can be added to a static site. */
export interface StaticSitesValidateCustomDomainCanBeAddedToStaticSite200Response extends HttpResponse {
  status: "200";
}

/** Validates a particular custom domain can be added to a static site. */
export interface StaticSitesValidateCustomDomainCanBeAddedToStaticSite202Response extends HttpResponse {
  status: "202";
}

/** Validates a particular custom domain can be added to a static site. */
export interface StaticSitesValidateCustomDomainCanBeAddedToStaticSiteDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Detaches a static site. */
export interface StaticSitesDetachStaticSite200Response extends HttpResponse {
  status: "200";
}

/** Detaches a static site. */
export interface StaticSitesDetachStaticSite202Response extends HttpResponse {
  status: "202";
}

/** Detaches a static site. */
export interface StaticSitesDetachStaticSiteDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets the functions of a static site. */
export interface StaticSitesListStaticSiteFunctions200Response extends HttpResponse {
  status: "200";
  body: StaticSiteFunctionOverviewCollectionOutput;
}

/** Gets the functions of a static site. */
export interface StaticSitesListStaticSiteFunctionsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets the application settings of a static site. */
export interface StaticSitesListStaticSiteAppSettings200Response extends HttpResponse {
  status: "200";
  body: StringDictionaryOutput;
}

/** Gets the application settings of a static site. */
export interface StaticSitesListStaticSiteAppSettingsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Lists the roles configured for the static site. */
export interface StaticSitesListStaticSiteConfiguredRoles200Response extends HttpResponse {
  status: "200";
  body: StringListOutput;
}

/** Lists the roles configured for the static site. */
export interface StaticSitesListStaticSiteConfiguredRolesDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets the application settings of a static site. */
export interface StaticSitesListStaticSiteFunctionAppSettings200Response extends HttpResponse {
  status: "200";
  body: StringDictionaryOutput;
}

/** Gets the application settings of a static site. */
export interface StaticSitesListStaticSiteFunctionAppSettingsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Lists the secrets for an existing static site. */
export interface StaticSitesListStaticSiteSecrets200Response extends HttpResponse {
  status: "200";
  body: StringDictionaryOutput;
}

/** Lists the secrets for an existing static site. */
export interface StaticSitesListStaticSiteSecretsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets the list of private endpoint connections associated with a static site */
export interface StaticSitesGetPrivateEndpointConnectionList200Response extends HttpResponse {
  status: "200";
  body: PrivateEndpointConnectionCollectionOutput;
}

/** Gets the list of private endpoint connections associated with a static site */
export interface StaticSitesGetPrivateEndpointConnectionListDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets a private endpoint connection */
export interface StaticSitesGetPrivateEndpointConnection200Response extends HttpResponse {
  status: "200";
  body: RemotePrivateEndpointConnectionARMResourceOutput;
}

/** Gets a private endpoint connection */
export interface StaticSitesGetPrivateEndpointConnectionDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Approves or rejects a private endpoint connection */
export interface StaticSitesApproveOrRejectPrivateEndpointConnection200Response extends HttpResponse {
  status: "200";
  body: RemotePrivateEndpointConnectionARMResourceOutput;
}

/** Approves or rejects a private endpoint connection */
export interface StaticSitesApproveOrRejectPrivateEndpointConnection202Response extends HttpResponse {
  status: "202";
  body: RemotePrivateEndpointConnectionARMResourceOutput;
}

/** Approves or rejects a private endpoint connection */
export interface StaticSitesApproveOrRejectPrivateEndpointConnectionDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Deletes a private endpoint connection */
export interface StaticSitesDeletePrivateEndpointConnection200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Deletes a private endpoint connection */
export interface StaticSitesDeletePrivateEndpointConnection202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Deletes a private endpoint connection */
export interface StaticSitesDeletePrivateEndpointConnection204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Deletes a private endpoint connection */
export interface StaticSitesDeletePrivateEndpointConnectionDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets the private link resources */
export interface StaticSitesGetPrivateLinkResources200Response extends HttpResponse {
  status: "200";
  body: PrivateLinkResourcesWrapperOutput;
}

/** Gets the private link resources */
export interface StaticSitesGetPrivateLinkResourcesDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Resets the api key for an existing static site. */
export interface StaticSitesResetStaticSiteApiKey200Response extends HttpResponse {
  status: "200";
}

/** Resets the api key for an existing static site. */
export interface StaticSitesResetStaticSiteApiKeyDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets the details of the user provided function apps registered with a static site */
export interface StaticSitesGetUserProvidedFunctionAppsForStaticSite200Response extends HttpResponse {
  status: "200";
  body: StaticSiteUserProvidedFunctionAppsCollectionOutput;
}

/** Gets the details of the user provided function apps registered with a static site */
export interface StaticSitesGetUserProvidedFunctionAppsForStaticSiteDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets the details of the user provided function app registered with a static site */
export interface StaticSitesGetUserProvidedFunctionAppForStaticSite200Response extends HttpResponse {
  status: "200";
  body: StaticSiteUserProvidedFunctionAppARMResourceOutput;
}

/** Gets the details of the user provided function app registered with a static site */
export interface StaticSitesGetUserProvidedFunctionAppForStaticSiteDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Register a user provided function app with a static site */
export interface StaticSitesRegisterUserProvidedFunctionAppWithStaticSite200Response extends HttpResponse {
  status: "200";
  body: StaticSiteUserProvidedFunctionAppARMResourceOutput;
}

/** Register a user provided function app with a static site */
export interface StaticSitesRegisterUserProvidedFunctionAppWithStaticSite202Response extends HttpResponse {
  status: "202";
  body: StaticSiteUserProvidedFunctionAppARMResourceOutput;
}

/** Register a user provided function app with a static site */
export interface StaticSitesRegisterUserProvidedFunctionAppWithStaticSiteDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Detach the user provided function app from the static site */
export interface StaticSitesDetachUserProvidedFunctionAppFromStaticSite200Response extends HttpResponse {
  status: "200";
}

/** Detach the user provided function app from the static site */
export interface StaticSitesDetachUserProvidedFunctionAppFromStaticSite204Response extends HttpResponse {
  status: "204";
}

/** Detach the user provided function app from the static site */
export interface StaticSitesDetachUserProvidedFunctionAppFromStaticSiteDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Deploys zipped content to a static site. */
export interface StaticSitesCreateZipDeploymentForStaticSite200Response extends HttpResponse {
  status: "200";
}

/** Deploys zipped content to a static site. */
export interface StaticSitesCreateZipDeploymentForStaticSite202Response extends HttpResponse {
  status: "202";
}

/** Deploys zipped content to a static site. */
export interface StaticSitesCreateZipDeploymentForStaticSiteDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get all apps for a subscription. */
export interface WebAppsList200Response extends HttpResponse {
  status: "200";
  body: WebAppCollectionOutput;
}

/** Get all apps for a subscription. */
export interface WebAppsListDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets all web, mobile, and API apps in the specified resource group. */
export interface WebAppsListByResourceGroup200Response extends HttpResponse {
  status: "200";
  body: WebAppCollectionOutput;
}

/** Gets all web, mobile, and API apps in the specified resource group. */
export interface WebAppsListByResourceGroupDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets the details of a web, mobile, or API app. */
export interface WebAppsGet200Response extends HttpResponse {
  status: "200";
  body: SiteOutput;
}

/** Gets the details of a web, mobile, or API app. */
export interface WebAppsGet404Response extends HttpResponse {
  status: "404";
}

/** Gets the details of a web, mobile, or API app. */
export interface WebAppsGetDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Creates a new web, mobile, or API app in an existing resource group, or updates an existing app. */
export interface WebAppsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: SiteOutput;
}

/** Creates a new web, mobile, or API app in an existing resource group, or updates an existing app. */
export interface WebAppsCreateOrUpdate202Response extends HttpResponse {
  status: "202";
  body: SiteOutput;
}

/** Creates a new web, mobile, or API app in an existing resource group, or updates an existing app. */
export interface WebAppsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Deletes a web, mobile, or API app, or one of the deployment slots. */
export interface WebAppsDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes a web, mobile, or API app, or one of the deployment slots. */
export interface WebAppsDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes a web, mobile, or API app, or one of the deployment slots. */
export interface WebAppsDelete404Response extends HttpResponse {
  status: "404";
}

/** Deletes a web, mobile, or API app, or one of the deployment slots. */
export interface WebAppsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Creates a new web, mobile, or API app in an existing resource group, or updates an existing app. */
export interface WebAppsUpdate200Response extends HttpResponse {
  status: "200";
  body: SiteOutput;
}

/** Creates a new web, mobile, or API app in an existing resource group, or updates an existing app. */
export interface WebAppsUpdate202Response extends HttpResponse {
  status: "202";
  body: SiteOutput;
}

/** Creates a new web, mobile, or API app in an existing resource group, or updates an existing app. */
export interface WebAppsUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Analyze a custom hostname. */
export interface WebAppsAnalyzeCustomHostname200Response extends HttpResponse {
  status: "200";
  body: CustomHostnameAnalysisResultOutput;
}

/** Analyze a custom hostname. */
export interface WebAppsAnalyzeCustomHostnameDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Applies the configuration settings from the target slot onto the current slot. */
export interface WebAppsApplySlotConfigToProduction200Response extends HttpResponse {
  status: "200";
}

/** Applies the configuration settings from the target slot onto the current slot. */
export interface WebAppsApplySlotConfigToProductionDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Creates a backup of an app. */
export interface WebAppsBackup200Response extends HttpResponse {
  status: "200";
  body: BackupItemOutput;
}

/** Creates a backup of an app. */
export interface WebAppsBackupDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets existing backups of an app. */
export interface WebAppsListBackups200Response extends HttpResponse {
  status: "200";
  body: BackupItemCollectionOutput;
}

/** Gets existing backups of an app. */
export interface WebAppsListBackupsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets a backup of an app by its ID. */
export interface WebAppsGetBackupStatus200Response extends HttpResponse {
  status: "200";
  body: BackupItemOutput;
}

/** Gets a backup of an app by its ID. */
export interface WebAppsGetBackupStatusDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Deletes a backup of an app by its ID. */
export interface WebAppsDeleteBackup200Response extends HttpResponse {
  status: "200";
}

/** Deletes a backup of an app by its ID. */
export interface WebAppsDeleteBackup404Response extends HttpResponse {
  status: "404";
}

/** Deletes a backup of an app by its ID. */
export interface WebAppsDeleteBackupDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets status of a web app backup that may be in progress, including secrets associated with the backup, such as the Azure Storage SAS URL. Also can be used to update the SAS URL for the backup if a new URL is passed in the request body. */
export interface WebAppsListBackupStatusSecrets200Response extends HttpResponse {
  status: "200";
  body: BackupItemOutput;
}

/** Gets status of a web app backup that may be in progress, including secrets associated with the backup, such as the Azure Storage SAS URL. Also can be used to update the SAS URL for the backup if a new URL is passed in the request body. */
export interface WebAppsListBackupStatusSecretsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Restores a specific backup to another app (or deployment slot, if specified). */
export interface WebAppsRestore200Response extends HttpResponse {
  status: "200";
}

/** Restores a specific backup to another app (or deployment slot, if specified). */
export interface WebAppsRestore202Response extends HttpResponse {
  status: "202";
}

/** Restores a specific backup to another app (or deployment slot, if specified). */
export interface WebAppsRestoreDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Returns whether Scm basic auth is allowed and whether Ftp is allowed for a given site. */
export interface WebAppsListBasicPublishingCredentialsPolicies200Response extends HttpResponse {
  status: "200";
  body: PublishingCredentialsPoliciesCollectionOutput;
}

/** Returns whether Scm basic auth is allowed and whether Ftp is allowed for a given site. */
export interface WebAppsListBasicPublishingCredentialsPoliciesDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Returns whether FTP is allowed on the site or not. */
export interface WebAppsGetFtpAllowed200Response extends HttpResponse {
  status: "200";
  body: CsmPublishingCredentialsPoliciesEntityOutput;
}

/** Returns whether FTP is allowed on the site or not. */
export interface WebAppsGetFtpAllowedDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Updates whether FTP is allowed on the site or not. */
export interface WebAppsUpdateFtpAllowed200Response extends HttpResponse {
  status: "200";
  body: CsmPublishingCredentialsPoliciesEntityOutput;
}

/** Updates whether FTP is allowed on the site or not. */
export interface WebAppsUpdateFtpAllowedDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Returns whether Scm basic auth is allowed on the site or not. */
export interface WebAppsGetScmAllowed200Response extends HttpResponse {
  status: "200";
  body: CsmPublishingCredentialsPoliciesEntityOutput;
}

/** Returns whether Scm basic auth is allowed on the site or not. */
export interface WebAppsGetScmAllowedDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Updates whether user publishing credentials are allowed on the site or not. */
export interface WebAppsUpdateScmAllowed200Response extends HttpResponse {
  status: "200";
  body: CsmPublishingCredentialsPoliciesEntityOutput;
}

/** Updates whether user publishing credentials are allowed on the site or not. */
export interface WebAppsUpdateScmAllowedDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** List the configurations of an app */
export interface WebAppsListConfigurations200Response extends HttpResponse {
  status: "200";
  body: SiteConfigResourceCollectionOutput;
}

/** List the configurations of an app */
export interface WebAppsListConfigurationsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Replaces the application settings of an app. */
export interface WebAppsUpdateApplicationSettings200Response extends HttpResponse {
  status: "200";
  body: StringDictionaryOutput;
}

/** Replaces the application settings of an app. */
export interface WebAppsUpdateApplicationSettingsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets the application settings of an app. */
export interface WebAppsListApplicationSettings200Response extends HttpResponse {
  status: "200";
  body: StringDictionaryOutput;
}

/** Gets the application settings of an app. */
export interface WebAppsListApplicationSettingsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Updates the Authentication / Authorization settings associated with web app. */
export interface WebAppsUpdateAuthSettings200Response extends HttpResponse {
  status: "200";
  body: SiteAuthSettingsOutput;
}

/** Updates the Authentication / Authorization settings associated with web app. */
export interface WebAppsUpdateAuthSettingsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets the Authentication/Authorization settings of an app. */
export interface WebAppsGetAuthSettings200Response extends HttpResponse {
  status: "200";
  body: SiteAuthSettingsOutput;
}

/** Gets the Authentication/Authorization settings of an app. */
export interface WebAppsGetAuthSettingsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets site's Authentication / Authorization settings for apps via the V2 format */
export interface WebAppsGetAuthSettingsV2WithoutSecrets200Response extends HttpResponse {
  status: "200";
  body: SiteAuthSettingsV2Output;
}

/** Gets site's Authentication / Authorization settings for apps via the V2 format */
export interface WebAppsGetAuthSettingsV2WithoutSecretsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Updates site's Authentication / Authorization settings for apps via the V2 format */
export interface WebAppsUpdateAuthSettingsV2200Response extends HttpResponse {
  status: "200";
  body: SiteAuthSettingsV2Output;
}

/** Updates site's Authentication / Authorization settings for apps via the V2 format */
export interface WebAppsUpdateAuthSettingsV2DefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets site's Authentication / Authorization settings for apps via the V2 format */
export interface WebAppsGetAuthSettingsV2200Response extends HttpResponse {
  status: "200";
  body: SiteAuthSettingsV2Output;
}

/** Gets site's Authentication / Authorization settings for apps via the V2 format */
export interface WebAppsGetAuthSettingsV2DefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Updates the Azure storage account configurations of an app. */
export interface WebAppsUpdateAzureStorageAccounts200Response extends HttpResponse {
  status: "200";
  body: AzureStoragePropertyDictionaryResourceOutput;
}

/** Updates the Azure storage account configurations of an app. */
export interface WebAppsUpdateAzureStorageAccountsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets the Azure storage account configurations of an app. */
export interface WebAppsListAzureStorageAccounts200Response extends HttpResponse {
  status: "200";
  body: AzureStoragePropertyDictionaryResourceOutput;
}

/** Gets the Azure storage account configurations of an app. */
export interface WebAppsListAzureStorageAccountsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Updates the backup configuration of an app. */
export interface WebAppsUpdateBackupConfiguration200Response extends HttpResponse {
  status: "200";
  body: BackupRequestOutput;
}

/** Updates the backup configuration of an app. */
export interface WebAppsUpdateBackupConfigurationDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Deletes the backup configuration of an app. */
export interface WebAppsDeleteBackupConfiguration200Response extends HttpResponse {
  status: "200";
}

/** Deletes the backup configuration of an app. */
export interface WebAppsDeleteBackupConfigurationDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets the backup configuration of an app. */
export interface WebAppsGetBackupConfiguration200Response extends HttpResponse {
  status: "200";
  body: BackupRequestOutput;
}

/** Gets the backup configuration of an app. */
export interface WebAppsGetBackupConfigurationDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets the config reference app settings and status of an app */
export interface WebAppsGetAppSettingsKeyVaultReferences200Response extends HttpResponse {
  status: "200";
  body: ApiKVReferenceCollectionOutput;
}

/** Gets the config reference app settings and status of an app */
export interface WebAppsGetAppSettingsKeyVaultReferencesDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets the config reference and status of an app */
export interface WebAppsGetAppSettingKeyVaultReference200Response extends HttpResponse {
  status: "200";
  body: ApiKVReferenceOutput;
}

/** Gets the config reference and status of an app */
export interface WebAppsGetAppSettingKeyVaultReferenceDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets the config reference app settings and status of an app */
export interface WebAppsGetSiteConnectionStringKeyVaultReferences200Response extends HttpResponse {
  status: "200";
  body: ApiKVReferenceCollectionOutput;
}

/** Gets the config reference app settings and status of an app */
export interface WebAppsGetSiteConnectionStringKeyVaultReferencesDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets the config reference and status of an app */
export interface WebAppsGetSiteConnectionStringKeyVaultReference200Response extends HttpResponse {
  status: "200";
  body: ApiKVReferenceOutput;
}

/** Gets the config reference and status of an app */
export interface WebAppsGetSiteConnectionStringKeyVaultReferenceDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Replaces the connection strings of an app. */
export interface WebAppsUpdateConnectionStrings200Response extends HttpResponse {
  status: "200";
  body: ConnectionStringDictionaryOutput;
}

/** Replaces the connection strings of an app. */
export interface WebAppsUpdateConnectionStringsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets the connection strings of an app. */
export interface WebAppsListConnectionStrings200Response extends HttpResponse {
  status: "200";
  body: ConnectionStringDictionaryOutput;
}

/** Gets the connection strings of an app. */
export interface WebAppsListConnectionStringsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets the logging configuration of an app. */
export interface WebAppsGetDiagnosticLogsConfiguration200Response extends HttpResponse {
  status: "200";
  body: SiteLogsConfigOutput;
}

/** Gets the logging configuration of an app. */
export interface WebAppsGetDiagnosticLogsConfigurationDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Updates the logging configuration of an app. */
export interface WebAppsUpdateDiagnosticLogsConfig200Response extends HttpResponse {
  status: "200";
  body: SiteLogsConfigOutput;
}

/** Updates the logging configuration of an app. */
export interface WebAppsUpdateDiagnosticLogsConfigDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Replaces the metadata of an app. */
export interface WebAppsUpdateMetadata200Response extends HttpResponse {
  status: "200";
  body: StringDictionaryOutput;
}

/** Replaces the metadata of an app. */
export interface WebAppsUpdateMetadataDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets the metadata of an app. */
export interface WebAppsListMetadata200Response extends HttpResponse {
  status: "200";
  body: StringDictionaryOutput;
}

/** Gets the metadata of an app. */
export interface WebAppsListMetadataDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets the Git/FTP publishing credentials of an app. */
export interface WebAppsListPublishingCredentials200Response extends HttpResponse {
  status: "200";
  body: UserOutput;
}

/** Gets the Git/FTP publishing credentials of an app. */
export interface WebAppsListPublishingCredentialsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Updates the Push settings associated with web app. */
export interface WebAppsUpdateSitePushSettings200Response extends HttpResponse {
  status: "200";
  body: PushSettingsOutput;
}

/** Updates the Push settings associated with web app. */
export interface WebAppsUpdateSitePushSettingsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets the Push settings associated with web app. */
export interface WebAppsListSitePushSettings200Response extends HttpResponse {
  status: "200";
  body: PushSettingsOutput;
}

/** Gets the Push settings associated with web app. */
export interface WebAppsListSitePushSettingsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets the names of app settings and connection strings that stick to the slot (not swapped). */
export interface WebAppsListSlotConfigurationNames200Response extends HttpResponse {
  status: "200";
  body: SlotConfigNamesResourceOutput;
}

/** Gets the names of app settings and connection strings that stick to the slot (not swapped). */
export interface WebAppsListSlotConfigurationNamesDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Updates the names of application settings and connection string that remain with the slot during swap operation. */
export interface WebAppsUpdateSlotConfigurationNames200Response extends HttpResponse {
  status: "200";
  body: SlotConfigNamesResourceOutput;
}

/** Updates the names of application settings and connection string that remain with the slot during swap operation. */
export interface WebAppsUpdateSlotConfigurationNamesDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets the configuration of an app, such as platform version and bitness, default documents, virtual applications, Always On, etc. */
export interface WebAppsGetConfiguration200Response extends HttpResponse {
  status: "200";
  body: SiteConfigResourceOutput;
}

/** Gets the configuration of an app, such as platform version and bitness, default documents, virtual applications, Always On, etc. */
export interface WebAppsGetConfigurationDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Updates the configuration of an app. */
export interface WebAppsCreateOrUpdateConfiguration200Response extends HttpResponse {
  status: "200";
  body: SiteConfigResourceOutput;
}

/** Updates the configuration of an app. */
export interface WebAppsCreateOrUpdateConfigurationDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Updates the configuration of an app. */
export interface WebAppsUpdateConfiguration200Response extends HttpResponse {
  status: "200";
  body: SiteConfigResourceOutput;
}

/** Updates the configuration of an app. */
export interface WebAppsUpdateConfigurationDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets a list of web app configuration snapshots identifiers. Each element of the list contains a timestamp and the ID of the snapshot. */
export interface WebAppsListConfigurationSnapshotInfo200Response extends HttpResponse {
  status: "200";
  body: SiteConfigurationSnapshotInfoCollectionOutput;
}

/** Gets a list of web app configuration snapshots identifiers. Each element of the list contains a timestamp and the ID of the snapshot. */
export interface WebAppsListConfigurationSnapshotInfoDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets a snapshot of the configuration of an app at a previous point in time. */
export interface WebAppsGetConfigurationSnapshot200Response extends HttpResponse {
  status: "200";
  body: SiteConfigResourceOutput;
}

/** Gets a snapshot of the configuration of an app at a previous point in time. */
export interface WebAppsGetConfigurationSnapshotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Reverts the configuration of an app to a previous snapshot. */
export interface WebAppsRecoverSiteConfigurationSnapshot204Response extends HttpResponse {
  status: "204";
}

/** Reverts the configuration of an app to a previous snapshot. */
export interface WebAppsRecoverSiteConfigurationSnapshotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets the last lines of docker logs for the given site */
export interface WebAppsGetWebSiteContainerLogs200Response extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
}

/** Gets the last lines of docker logs for the given site */
export interface WebAppsGetWebSiteContainerLogs204Response extends HttpResponse {
  status: "204";
}

/** Gets the last lines of docker logs for the given site */
export interface WebAppsGetWebSiteContainerLogsDefaultResponse extends HttpResponse {
  status: string;
}

/** Gets the ZIP archived docker log files for the given site */
export interface WebAppsGetContainerLogsZip200Response extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
}

/** Gets the ZIP archived docker log files for the given site */
export interface WebAppsGetContainerLogsZip204Response extends HttpResponse {
  status: "204";
}

/** Gets the ZIP archived docker log files for the given site */
export interface WebAppsGetContainerLogsZipDefaultResponse extends HttpResponse {
  status: string;
}

/** List continuous web jobs for an app, or a deployment slot. */
export interface WebAppsListContinuousWebJobs200Response extends HttpResponse {
  status: "200";
  body: ContinuousWebJobCollectionOutput;
}

/** List continuous web jobs for an app, or a deployment slot. */
export interface WebAppsListContinuousWebJobsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets a continuous web job by its ID for an app, or a deployment slot. */
export interface WebAppsGetContinuousWebJob200Response extends HttpResponse {
  status: "200";
  body: ContinuousWebJobOutput;
}

/** Gets a continuous web job by its ID for an app, or a deployment slot. */
export interface WebAppsGetContinuousWebJob404Response extends HttpResponse {
  status: "404";
}

/** Gets a continuous web job by its ID for an app, or a deployment slot. */
export interface WebAppsGetContinuousWebJobDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Delete a continuous web job by its ID for an app, or a deployment slot. */
export interface WebAppsDeleteContinuousWebJob200Response extends HttpResponse {
  status: "200";
}

/** Delete a continuous web job by its ID for an app, or a deployment slot. */
export interface WebAppsDeleteContinuousWebJob204Response extends HttpResponse {
  status: "204";
}

/** Delete a continuous web job by its ID for an app, or a deployment slot. */
export interface WebAppsDeleteContinuousWebJobDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Start a continuous web job for an app, or a deployment slot. */
export interface WebAppsStartContinuousWebJob200Response extends HttpResponse {
  status: "200";
}

/** Start a continuous web job for an app, or a deployment slot. */
export interface WebAppsStartContinuousWebJob404Response extends HttpResponse {
  status: "404";
}

/** Start a continuous web job for an app, or a deployment slot. */
export interface WebAppsStartContinuousWebJobDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Stop a continuous web job for an app, or a deployment slot. */
export interface WebAppsStopContinuousWebJob200Response extends HttpResponse {
  status: "200";
}

/** Stop a continuous web job for an app, or a deployment slot. */
export interface WebAppsStopContinuousWebJob404Response extends HttpResponse {
  status: "404";
}

/** Stop a continuous web job for an app, or a deployment slot. */
export interface WebAppsStopContinuousWebJobDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** List deployments for an app, or a deployment slot. */
export interface WebAppsListDeployments200Response extends HttpResponse {
  status: "200";
  body: DeploymentCollectionOutput;
}

/** List deployments for an app, or a deployment slot. */
export interface WebAppsListDeploymentsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get a deployment by its ID for an app, or a deployment slot. */
export interface WebAppsGetDeployment200Response extends HttpResponse {
  status: "200";
  body: DeploymentOutput;
}

/** Get a deployment by its ID for an app, or a deployment slot. */
export interface WebAppsGetDeploymentDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Create a deployment for an app, or a deployment slot. */
export interface WebAppsCreateDeployment200Response extends HttpResponse {
  status: "200";
  body: DeploymentOutput;
}

/** Create a deployment for an app, or a deployment slot. */
export interface WebAppsCreateDeploymentDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Delete a deployment by its ID for an app, or a deployment slot. */
export interface WebAppsDeleteDeployment200Response extends HttpResponse {
  status: "200";
}

/** Delete a deployment by its ID for an app, or a deployment slot. */
export interface WebAppsDeleteDeployment204Response extends HttpResponse {
  status: "204";
}

/** Delete a deployment by its ID for an app, or a deployment slot. */
export interface WebAppsDeleteDeploymentDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** List deployment log for specific deployment for an app, or a deployment slot. */
export interface WebAppsListDeploymentLog200Response extends HttpResponse {
  status: "200";
  body: DeploymentOutput;
}

/** List deployment log for specific deployment for an app, or a deployment slot. */
export interface WebAppsListDeploymentLogDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Discovers an existing app backup that can be restored from a blob in Azure storage. Use this to get information about the databases stored in a backup. */
export interface WebAppsDiscoverBackup200Response extends HttpResponse {
  status: "200";
  body: RestoreRequestOutput;
}

/** Discovers an existing app backup that can be restored from a blob in Azure storage. Use this to get information about the databases stored in a backup. */
export interface WebAppsDiscoverBackupDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Lists ownership identifiers for domain associated with web app. */
export interface WebAppsListDomainOwnershipIdentifiers200Response extends HttpResponse {
  status: "200";
  body: IdentifierCollectionOutput;
}

/** Lists ownership identifiers for domain associated with web app. */
export interface WebAppsListDomainOwnershipIdentifiersDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get domain ownership identifier for web app. */
export interface WebAppsGetDomainOwnershipIdentifier200Response extends HttpResponse {
  status: "200";
  body: IdentifierOutput;
}

/** Get domain ownership identifier for web app. */
export interface WebAppsGetDomainOwnershipIdentifierDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Creates a domain ownership identifier for web app, or updates an existing ownership identifier. */
export interface WebAppsCreateOrUpdateDomainOwnershipIdentifier200Response extends HttpResponse {
  status: "200";
  body: IdentifierOutput;
}

/** Creates a domain ownership identifier for web app, or updates an existing ownership identifier. */
export interface WebAppsCreateOrUpdateDomainOwnershipIdentifierDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Deletes a domain ownership identifier for a web app. */
export interface WebAppsDeleteDomainOwnershipIdentifier200Response extends HttpResponse {
  status: "200";
}

/** Deletes a domain ownership identifier for a web app. */
export interface WebAppsDeleteDomainOwnershipIdentifier204Response extends HttpResponse {
  status: "204";
}

/** Deletes a domain ownership identifier for a web app. */
export interface WebAppsDeleteDomainOwnershipIdentifierDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Creates a domain ownership identifier for web app, or updates an existing ownership identifier. */
export interface WebAppsUpdateDomainOwnershipIdentifier200Response extends HttpResponse {
  status: "200";
  body: IdentifierOutput;
}

/** Creates a domain ownership identifier for web app, or updates an existing ownership identifier. */
export interface WebAppsUpdateDomainOwnershipIdentifierDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get the status of the last MSDeploy operation. */
export interface WebAppsGetMSDeployStatus200Response extends HttpResponse {
  status: "200";
  body: MSDeployStatusOutput;
}

/** Get the status of the last MSDeploy operation. */
export interface WebAppsGetMSDeployStatusDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Invoke the MSDeploy web app extension. */
export interface WebAppsCreateMSDeployOperation201Response extends HttpResponse {
  status: "201";
  body: MSDeployStatusOutput;
}

/** Invoke the MSDeploy web app extension. */
export interface WebAppsCreateMSDeployOperation409Response extends HttpResponse {
  status: "409";
}

/** Invoke the MSDeploy web app extension. */
export interface WebAppsCreateMSDeployOperationDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get the MSDeploy Log for the last MSDeploy operation. */
export interface WebAppsGetMSDeployLog200Response extends HttpResponse {
  status: "200";
  body: MSDeployLogOutput;
}

/** Get the MSDeploy Log for the last MSDeploy operation. */
export interface WebAppsGetMSDeployLog404Response extends HttpResponse {
  status: "404";
}

/** Get the MSDeploy Log for the last MSDeploy operation. */
export interface WebAppsGetMSDeployLogDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Invoke onedeploy status API /api/deployments and gets the deployment status for the site */
export interface WebAppsGetOneDeployStatus200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Invoke onedeploy status API /api/deployments and gets the deployment status for the site */
export interface WebAppsGetOneDeployStatusDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Invoke the OneDeploy publish web app extension. */
export interface WebAppsCreateOneDeployOperation200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Invoke the OneDeploy publish web app extension. */
export interface WebAppsCreateOneDeployOperationDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** List the functions for a web site, or a deployment slot. */
export interface WebAppsListFunctions200Response extends HttpResponse {
  status: "200";
  body: FunctionEnvelopeCollectionOutput;
}

/** List the functions for a web site, or a deployment slot. */
export interface WebAppsListFunctions404Response extends HttpResponse {
  status: "404";
}

/** List the functions for a web site, or a deployment slot. */
export interface WebAppsListFunctionsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Fetch a short lived token that can be exchanged for a master key. */
export interface WebAppsGetFunctionsAdminToken200Response extends HttpResponse {
  status: "200";
  body: string;
}

/** Fetch a short lived token that can be exchanged for a master key. */
export interface WebAppsGetFunctionsAdminTokenDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get function information by its ID for web site, or a deployment slot. */
export interface WebAppsGetFunction200Response extends HttpResponse {
  status: "200";
  body: FunctionEnvelopeOutput;
}

/** Get function information by its ID for web site, or a deployment slot. */
export interface WebAppsGetFunction404Response extends HttpResponse {
  status: "404";
}

/** Get function information by its ID for web site, or a deployment slot. */
export interface WebAppsGetFunctionDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Create function for web site, or a deployment slot. */
export interface WebAppsCreateFunction201Response extends HttpResponse {
  status: "201";
  body: FunctionEnvelopeOutput;
}

/** Create function for web site, or a deployment slot. */
export interface WebAppsCreateFunctionDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Delete a function for web site, or a deployment slot. */
export interface WebAppsDeleteFunction204Response extends HttpResponse {
  status: "204";
}

/** Delete a function for web site, or a deployment slot. */
export interface WebAppsDeleteFunction404Response extends HttpResponse {
  status: "404";
}

/** Delete a function for web site, or a deployment slot. */
export interface WebAppsDeleteFunctionDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Add or update a function secret. */
export interface WebAppsCreateOrUpdateFunctionSecret200Response extends HttpResponse {
  status: "200";
  body: KeyInfoOutput;
}

/** Add or update a function secret. */
export interface WebAppsCreateOrUpdateFunctionSecret201Response extends HttpResponse {
  status: "201";
  body: KeyInfoOutput;
}

/** Add or update a function secret. */
export interface WebAppsCreateOrUpdateFunctionSecretDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Delete a function secret. */
export interface WebAppsDeleteFunctionSecret204Response extends HttpResponse {
  status: "204";
}

/** Delete a function secret. */
export interface WebAppsDeleteFunctionSecret404Response extends HttpResponse {
  status: "404";
}

/** Delete a function secret. */
export interface WebAppsDeleteFunctionSecretDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get function keys for a function in a web site, or a deployment slot. */
export interface WebAppsListFunctionKeys200Response extends HttpResponse {
  status: "200";
  body: StringDictionaryOutput;
}

/** Get function keys for a function in a web site, or a deployment slot. */
export interface WebAppsListFunctionKeysDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get function secrets for a function in a web site, or a deployment slot. */
export interface WebAppsListFunctionSecrets200Response extends HttpResponse {
  status: "200";
  body: FunctionSecretsOutput;
}

/** Get function secrets for a function in a web site, or a deployment slot. */
export interface WebAppsListFunctionSecretsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get host secrets for a function app. */
export interface WebAppsListHostKeys200Response extends HttpResponse {
  status: "200";
  body: HostKeysOutput;
}

/** Get host secrets for a function app. */
export interface WebAppsListHostKeysDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** This is to allow calling via powershell and ARM template. */
export interface WebAppsListSyncStatus204Response extends HttpResponse {
  status: "204";
}

/** This is to allow calling via powershell and ARM template. */
export interface WebAppsListSyncStatusDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Syncs function trigger metadata to the management database */
export interface WebAppsSyncFunctions204Response extends HttpResponse {
  status: "204";
}

/** Syncs function trigger metadata to the management database */
export interface WebAppsSyncFunctionsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Add or update a host level secret. */
export interface WebAppsCreateOrUpdateHostSecret200Response extends HttpResponse {
  status: "200";
  body: KeyInfoOutput;
}

/** Add or update a host level secret. */
export interface WebAppsCreateOrUpdateHostSecret201Response extends HttpResponse {
  status: "201";
  body: KeyInfoOutput;
}

/** Add or update a host level secret. */
export interface WebAppsCreateOrUpdateHostSecretDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Delete a host level secret. */
export interface WebAppsDeleteHostSecret204Response extends HttpResponse {
  status: "204";
}

/** Delete a host level secret. */
export interface WebAppsDeleteHostSecret404Response extends HttpResponse {
  status: "404";
}

/** Delete a host level secret. */
export interface WebAppsDeleteHostSecretDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get hostname bindings for an app or a deployment slot. */
export interface WebAppsListHostNameBindings200Response extends HttpResponse {
  status: "200";
  body: HostNameBindingCollectionOutput;
}

/** Get hostname bindings for an app or a deployment slot. */
export interface WebAppsListHostNameBindingsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get the named hostname binding for an app (or deployment slot, if specified). */
export interface WebAppsGetHostNameBinding200Response extends HttpResponse {
  status: "200";
  body: HostNameBindingOutput;
}

/** Get the named hostname binding for an app (or deployment slot, if specified). */
export interface WebAppsGetHostNameBindingDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Creates a hostname binding for an app. */
export interface WebAppsCreateOrUpdateHostNameBinding200Response extends HttpResponse {
  status: "200";
  body: HostNameBindingOutput;
}

/** Creates a hostname binding for an app. */
export interface WebAppsCreateOrUpdateHostNameBindingDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Deletes a hostname binding for an app. */
export interface WebAppsDeleteHostNameBinding200Response extends HttpResponse {
  status: "200";
}

/** Deletes a hostname binding for an app. */
export interface WebAppsDeleteHostNameBinding204Response extends HttpResponse {
  status: "204";
}

/** Deletes a hostname binding for an app. */
export interface WebAppsDeleteHostNameBindingDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Retrieves a specific Service Bus Hybrid Connection used by this Web App. */
export interface WebAppsGetHybridConnection200Response extends HttpResponse {
  status: "200";
  body: HybridConnectionOutput;
}

/** Retrieves a specific Service Bus Hybrid Connection used by this Web App. */
export interface WebAppsGetHybridConnectionDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Creates a new Hybrid Connection using a Service Bus relay. */
export interface WebAppsCreateOrUpdateHybridConnection200Response extends HttpResponse {
  status: "200";
  body: HybridConnectionOutput;
}

/** Creates a new Hybrid Connection using a Service Bus relay. */
export interface WebAppsCreateOrUpdateHybridConnectionDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Removes a Hybrid Connection from this site. */
export interface WebAppsDeleteHybridConnection200Response extends HttpResponse {
  status: "200";
}

/** Removes a Hybrid Connection from this site. */
export interface WebAppsDeleteHybridConnection404Response extends HttpResponse {
  status: "404";
}

/** Removes a Hybrid Connection from this site. */
export interface WebAppsDeleteHybridConnectionDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Creates a new Hybrid Connection using a Service Bus relay. */
export interface WebAppsUpdateHybridConnection200Response extends HttpResponse {
  status: "200";
  body: HybridConnectionOutput;
}

/** Creates a new Hybrid Connection using a Service Bus relay. */
export interface WebAppsUpdateHybridConnectionDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Retrieves all Service Bus Hybrid Connections used by this Web App. */
export interface WebAppsListHybridConnections200Response extends HttpResponse {
  status: "200";
  body: HybridConnectionOutput;
}

/** Retrieves all Service Bus Hybrid Connections used by this Web App. */
export interface WebAppsListHybridConnectionsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets hybrid connections configured for an app (or deployment slot, if specified). */
export interface WebAppsListRelayServiceConnections200Response extends HttpResponse {
  status: "200";
  body: RelayServiceConnectionEntityOutput;
}

/** Gets hybrid connections configured for an app (or deployment slot, if specified). */
export interface WebAppsListRelayServiceConnectionsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets a hybrid connection configuration by its name. */
export interface WebAppsGetRelayServiceConnection200Response extends HttpResponse {
  status: "200";
  body: RelayServiceConnectionEntityOutput;
}

/** Gets a hybrid connection configuration by its name. */
export interface WebAppsGetRelayServiceConnectionDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Creates a new hybrid connection configuration (PUT), or updates an existing one (PATCH). */
export interface WebAppsCreateOrUpdateRelayServiceConnection200Response extends HttpResponse {
  status: "200";
  body: RelayServiceConnectionEntityOutput;
}

/** Creates a new hybrid connection configuration (PUT), or updates an existing one (PATCH). */
export interface WebAppsCreateOrUpdateRelayServiceConnectionDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Deletes a relay service connection by its name. */
export interface WebAppsDeleteRelayServiceConnection200Response extends HttpResponse {
  status: "200";
}

/** Deletes a relay service connection by its name. */
export interface WebAppsDeleteRelayServiceConnection404Response extends HttpResponse {
  status: "404";
}

/** Deletes a relay service connection by its name. */
export interface WebAppsDeleteRelayServiceConnectionDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Creates a new hybrid connection configuration (PUT), or updates an existing one (PATCH). */
export interface WebAppsUpdateRelayServiceConnection200Response extends HttpResponse {
  status: "200";
  body: RelayServiceConnectionEntityOutput;
}

/** Creates a new hybrid connection configuration (PUT), or updates an existing one (PATCH). */
export interface WebAppsUpdateRelayServiceConnectionDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets all scale-out instances of an app. */
export interface WebAppsListInstanceIdentifiers200Response extends HttpResponse {
  status: "200";
  body: WebAppInstanceStatusCollectionOutput;
}

/** Gets all scale-out instances of an app. */
export interface WebAppsListInstanceIdentifiersDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets all scale-out instances of an app. */
export interface WebAppsGetInstanceInfo200Response extends HttpResponse {
  status: "200";
  body: WebSiteInstanceStatusOutput;
}

/** Gets all scale-out instances of an app. */
export interface WebAppsGetInstanceInfoDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get the status of the last MSDeploy operation. */
export interface WebAppsGetInstanceMsDeployStatus200Response extends HttpResponse {
  status: "200";
  body: MSDeployStatusOutput;
}

/** Get the status of the last MSDeploy operation. */
export interface WebAppsGetInstanceMsDeployStatusDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Invoke the MSDeploy web app extension. */
export interface WebAppsCreateInstanceMSDeployOperation201Response extends HttpResponse {
  status: "201";
  body: MSDeployStatusOutput;
}

/** Invoke the MSDeploy web app extension. */
export interface WebAppsCreateInstanceMSDeployOperation409Response extends HttpResponse {
  status: "409";
}

/** Invoke the MSDeploy web app extension. */
export interface WebAppsCreateInstanceMSDeployOperationDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get the MSDeploy Log for the last MSDeploy operation. */
export interface WebAppsGetInstanceMSDeployLog200Response extends HttpResponse {
  status: "200";
  body: MSDeployLogOutput;
}

/** Get the MSDeploy Log for the last MSDeploy operation. */
export interface WebAppsGetInstanceMSDeployLog404Response extends HttpResponse {
  status: "404";
}

/** Get the MSDeploy Log for the last MSDeploy operation. */
export interface WebAppsGetInstanceMSDeployLogDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get list of processes for a web site, or a deployment slot, or for a specific scaled-out instance in a web site. */
export interface WebAppsListInstanceProcesses200Response extends HttpResponse {
  status: "200";
  body: ProcessInfoCollectionOutput;
}

/** Get list of processes for a web site, or a deployment slot, or for a specific scaled-out instance in a web site. */
export interface WebAppsListInstanceProcesses404Response extends HttpResponse {
  status: "404";
}

/** Get list of processes for a web site, or a deployment slot, or for a specific scaled-out instance in a web site. */
export interface WebAppsListInstanceProcessesDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get process information by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsGetInstanceProcess200Response extends HttpResponse {
  status: "200";
  body: ProcessInfoOutput;
}

/** Get process information by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsGetInstanceProcess404Response extends HttpResponse {
  status: "404";
}

/** Get process information by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsGetInstanceProcessDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Terminate a process by its ID for a web site, or a deployment slot, or specific scaled-out instance in a web site. */
export interface WebAppsDeleteInstanceProcess204Response extends HttpResponse {
  status: "204";
}

/** Terminate a process by its ID for a web site, or a deployment slot, or specific scaled-out instance in a web site. */
export interface WebAppsDeleteInstanceProcess404Response extends HttpResponse {
  status: "404";
}

/** Terminate a process by its ID for a web site, or a deployment slot, or specific scaled-out instance in a web site. */
export interface WebAppsDeleteInstanceProcessDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get a memory dump of a process by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsGetInstanceProcessDump200Response extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
}

/** Get a memory dump of a process by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsGetInstanceProcessDump404Response extends HttpResponse {
  status: "404";
}

/** Get a memory dump of a process by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsGetInstanceProcessDumpDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** List module information for a process by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsListInstanceProcessModules200Response extends HttpResponse {
  status: "200";
  body: ProcessModuleInfoCollectionOutput;
}

/** List module information for a process by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsListInstanceProcessModules404Response extends HttpResponse {
  status: "404";
}

/** List module information for a process by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsListInstanceProcessModulesDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get process information by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsGetInstanceProcessModule200Response extends HttpResponse {
  status: "200";
  body: ProcessModuleInfoOutput;
}

/** Get process information by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsGetInstanceProcessModule404Response extends HttpResponse {
  status: "404";
}

/** Get process information by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsGetInstanceProcessModuleDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** List the threads in a process by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsListInstanceProcessThreads200Response extends HttpResponse {
  status: "200";
  body: ProcessThreadInfoCollectionOutput;
}

/** List the threads in a process by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsListInstanceProcessThreads404Response extends HttpResponse {
  status: "404";
}

/** List the threads in a process by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsListInstanceProcessThreadsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Shows whether an app can be cloned to another resource group or subscription. */
export interface WebAppsIsCloneable200Response extends HttpResponse {
  status: "200";
  body: SiteCloneabilityOutput;
}

/** Shows whether an app can be cloned to another resource group or subscription. */
export interface WebAppsIsCloneableDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets existing backups of an app. */
export interface WebAppsListSiteBackups200Response extends HttpResponse {
  status: "200";
  body: BackupItemCollectionOutput;
}

/** Gets existing backups of an app. */
export interface WebAppsListSiteBackupsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** This is to allow calling via powershell and ARM template. */
export interface WebAppsListSyncFunctionTriggers200Response extends HttpResponse {
  status: "200";
  body: FunctionSecretsOutput;
}

/** This is to allow calling via powershell and ARM template. */
export interface WebAppsListSyncFunctionTriggersDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Restores a web app. */
export interface WebAppsMigrateStorage200Response extends HttpResponse {
  status: "200";
  body: StorageMigrationResponseOutput;
}

/** Restores a web app. */
export interface WebAppsMigrateStorageDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Migrates a local (in-app) MySql database to a remote MySql database. */
export interface WebAppsMigrateMySql200Response extends HttpResponse {
  status: "200";
  body: OperationOutput;
}

/** Migrates a local (in-app) MySql database to a remote MySql database. */
export interface WebAppsMigrateMySqlDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Returns the status of MySql in app migration, if one is active, and whether or not MySql in app is enabled */
export interface WebAppsGetMigrateMySqlStatus200Response extends HttpResponse {
  status: "200";
  body: MigrateMySqlStatusOutput;
}

/** Returns the status of MySql in app migration, if one is active, and whether or not MySql in app is enabled */
export interface WebAppsGetMigrateMySqlStatusDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets a Swift Virtual Network connection. */
export interface WebAppsGetSwiftVirtualNetworkConnection200Response extends HttpResponse {
  status: "200";
  body: SwiftVirtualNetworkOutput;
}

/** Gets a Swift Virtual Network connection. */
export interface WebAppsGetSwiftVirtualNetworkConnectionDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/**
 * Integrates this Web App with a Virtual Network. This requires that 1) "swiftSupported" is true when doing a GET against this resource, and 2) that the target Subnet has already been delegated, and is not
 * in use by another App Service Plan other than the one this App is in.
 */
export interface WebAppsCreateOrUpdateSwiftVirtualNetworkConnectionWithCheck200Response extends HttpResponse {
  status: "200";
  body: SwiftVirtualNetworkOutput;
}

/**
 * Integrates this Web App with a Virtual Network. This requires that 1) "swiftSupported" is true when doing a GET against this resource, and 2) that the target Subnet has already been delegated, and is not
 * in use by another App Service Plan other than the one this App is in.
 */
export interface WebAppsCreateOrUpdateSwiftVirtualNetworkConnectionWithCheckDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Deletes a Swift Virtual Network connection from an app (or deployment slot). */
export interface WebAppsDeleteSwiftVirtualNetwork200Response extends HttpResponse {
  status: "200";
}

/** Deletes a Swift Virtual Network connection from an app (or deployment slot). */
export interface WebAppsDeleteSwiftVirtualNetwork404Response extends HttpResponse {
  status: "404";
}

/** Deletes a Swift Virtual Network connection from an app (or deployment slot). */
export interface WebAppsDeleteSwiftVirtualNetworkDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/**
 * Integrates this Web App with a Virtual Network. This requires that 1) "swiftSupported" is true when doing a GET against this resource, and 2) that the target Subnet has already been delegated, and is not
 * in use by another App Service Plan other than the one this App is in.
 */
export interface WebAppsUpdateSwiftVirtualNetworkConnectionWithCheck200Response extends HttpResponse {
  status: "200";
  body: SwiftVirtualNetworkOutput;
}

/**
 * Integrates this Web App with a Virtual Network. This requires that 1) "swiftSupported" is true when doing a GET against this resource, and 2) that the target Subnet has already been delegated, and is not
 * in use by another App Service Plan other than the one this App is in.
 */
export interface WebAppsUpdateSwiftVirtualNetworkConnectionWithCheckDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets all network features used by the app (or deployment slot, if specified). */
export interface WebAppsListNetworkFeatures200Response extends HttpResponse {
  status: "200";
  body: NetworkFeaturesOutput;
}

/** Gets all network features used by the app (or deployment slot, if specified). */
export interface WebAppsListNetworkFeatures404Response extends HttpResponse {
  status: "404";
}

/** Gets all network features used by the app (or deployment slot, if specified). */
export interface WebAppsListNetworkFeaturesDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets a named operation for a network trace capturing (or deployment slot, if specified). */
export interface WebAppsGetNetworkTraceOperation200Response extends HttpResponse {
  status: "200";
  body: Array<NetworkTraceOutput>;
}

/** Gets a named operation for a network trace capturing (or deployment slot, if specified). */
export interface WebAppsGetNetworkTraceOperation202Response extends HttpResponse {
  status: "202";
  body: Array<NetworkTraceOutput>;
}

/** Gets a named operation for a network trace capturing (or deployment slot, if specified). */
export interface WebAppsGetNetworkTraceOperationDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Start capturing network packets for the site (To be deprecated). */
export interface WebAppsStartWebSiteNetworkTrace200Response extends HttpResponse {
  status: "200";
  body: string;
}

/** Start capturing network packets for the site (To be deprecated). */
export interface WebAppsStartWebSiteNetworkTraceDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Start capturing network packets for the site. */
export interface WebAppsStartWebSiteNetworkTraceOperation200Response extends HttpResponse {
  status: "200";
  body: Array<NetworkTraceOutput>;
}

/** Start capturing network packets for the site. */
export interface WebAppsStartWebSiteNetworkTraceOperation202Response extends HttpResponse {
  status: "202";
  body: Array<NetworkTraceOutput>;
}

/** Start capturing network packets for the site. */
export interface WebAppsStartWebSiteNetworkTraceOperationDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Stop ongoing capturing network packets for the site. */
export interface WebAppsStopWebSiteNetworkTrace200Response extends HttpResponse {
  status: "200";
}

/** Stop ongoing capturing network packets for the site. */
export interface WebAppsStopWebSiteNetworkTrace204Response extends HttpResponse {
  status: "204";
}

/** Stop ongoing capturing network packets for the site. */
export interface WebAppsStopWebSiteNetworkTraceDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets a named operation for a network trace capturing (or deployment slot, if specified). */
export interface WebAppsGetNetworkTraces200Response extends HttpResponse {
  status: "200";
  body: Array<NetworkTraceOutput>;
}

/** Gets a named operation for a network trace capturing (or deployment slot, if specified). */
export interface WebAppsGetNetworkTracesDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets a named operation for a network trace capturing (or deployment slot, if specified). */
export interface WebAppsGetNetworkTraceOperationV2200Response extends HttpResponse {
  status: "200";
  body: Array<NetworkTraceOutput>;
}

/** Gets a named operation for a network trace capturing (or deployment slot, if specified). */
export interface WebAppsGetNetworkTraceOperationV2202Response extends HttpResponse {
  status: "202";
  body: Array<NetworkTraceOutput>;
}

/** Gets a named operation for a network trace capturing (or deployment slot, if specified). */
export interface WebAppsGetNetworkTraceOperationV2DefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets a named operation for a network trace capturing (or deployment slot, if specified). */
export interface WebAppsGetNetworkTracesV2200Response extends HttpResponse {
  status: "200";
  body: Array<NetworkTraceOutput>;
}

/** Gets a named operation for a network trace capturing (or deployment slot, if specified). */
export interface WebAppsGetNetworkTracesV2DefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Generates a new publishing password for an app (or deployment slot, if specified). */
export interface WebAppsGenerateNewSitePublishingPassword200Response extends HttpResponse {
  status: "200";
}

/** Generates a new publishing password for an app (or deployment slot, if specified). */
export interface WebAppsGenerateNewSitePublishingPassword204Response extends HttpResponse {
  status: "204";
}

/** Generates a new publishing password for an app (or deployment slot, if specified). */
export interface WebAppsGenerateNewSitePublishingPasswordDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets perfmon counters for web app. */
export interface WebAppsListPerfMonCounters200Response extends HttpResponse {
  status: "200";
  body: PerfMonCounterCollectionOutput;
}

/** Gets perfmon counters for web app. */
export interface WebAppsListPerfMonCountersDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets web app's event logs. */
export interface WebAppsGetSitePhpErrorLogFlag200Response extends HttpResponse {
  status: "200";
  body: SitePhpErrorLogFlagOutput;
}

/** Gets web app's event logs. */
export interface WebAppsGetSitePhpErrorLogFlagDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets the premier add-ons of an app. */
export interface WebAppsListPremierAddOns200Response extends HttpResponse {
  status: "200";
  body: PremierAddOnOutput;
}

/** Gets the premier add-ons of an app. */
export interface WebAppsListPremierAddOnsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets a named add-on of an app. */
export interface WebAppsGetPremierAddOn200Response extends HttpResponse {
  status: "200";
  body: PremierAddOnOutput;
}

/** Gets a named add-on of an app. */
export interface WebAppsGetPremierAddOnDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Updates a named add-on of an app. */
export interface WebAppsAddPremierAddOn200Response extends HttpResponse {
  status: "200";
  body: PremierAddOnOutput;
}

/** Updates a named add-on of an app. */
export interface WebAppsAddPremierAddOnDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Delete a premier add-on from an app. */
export interface WebAppsDeletePremierAddOn200Response extends HttpResponse {
  status: "200";
}

/** Delete a premier add-on from an app. */
export interface WebAppsDeletePremierAddOnDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Updates a named add-on of an app. */
export interface WebAppsUpdatePremierAddOn200Response extends HttpResponse {
  status: "200";
  body: PremierAddOnOutput;
}

/** Updates a named add-on of an app. */
export interface WebAppsUpdatePremierAddOnDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets data around private site access enablement and authorized Virtual Networks that can access the site. */
export interface WebAppsGetPrivateAccess200Response extends HttpResponse {
  status: "200";
  body: PrivateAccessOutput;
}

/** Gets data around private site access enablement and authorized Virtual Networks that can access the site. */
export interface WebAppsGetPrivateAccessDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Sets data around private site access enablement and authorized Virtual Networks that can access the site. */
export interface WebAppsPutPrivateAccessVnet200Response extends HttpResponse {
  status: "200";
  body: PrivateAccessOutput;
}

/** Sets data around private site access enablement and authorized Virtual Networks that can access the site. */
export interface WebAppsPutPrivateAccessVnetDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets the list of private endpoint connections associated with a site */
export interface WebAppsGetPrivateEndpointConnectionList200Response extends HttpResponse {
  status: "200";
  body: PrivateEndpointConnectionCollectionOutput;
}

/** Gets the list of private endpoint connections associated with a site */
export interface WebAppsGetPrivateEndpointConnectionListDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets a private endpoint connection */
export interface WebAppsGetPrivateEndpointConnection200Response extends HttpResponse {
  status: "200";
  body: RemotePrivateEndpointConnectionARMResourceOutput;
}

/** Gets a private endpoint connection */
export interface WebAppsGetPrivateEndpointConnectionDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Approves or rejects a private endpoint connection */
export interface WebAppsApproveOrRejectPrivateEndpointConnection200Response extends HttpResponse {
  status: "200";
  body: RemotePrivateEndpointConnectionARMResourceOutput;
}

/** Approves or rejects a private endpoint connection */
export interface WebAppsApproveOrRejectPrivateEndpointConnection202Response extends HttpResponse {
  status: "202";
  body: RemotePrivateEndpointConnectionARMResourceOutput;
}

/** Approves or rejects a private endpoint connection */
export interface WebAppsApproveOrRejectPrivateEndpointConnectionDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Deletes a private endpoint connection */
export interface WebAppsDeletePrivateEndpointConnection200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Deletes a private endpoint connection */
export interface WebAppsDeletePrivateEndpointConnection202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Deletes a private endpoint connection */
export interface WebAppsDeletePrivateEndpointConnection204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Deletes a private endpoint connection */
export interface WebAppsDeletePrivateEndpointConnectionDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets the private link resources */
export interface WebAppsGetPrivateLinkResources200Response extends HttpResponse {
  status: "200";
  body: PrivateLinkResourcesWrapperOutput;
}

/** Gets the private link resources */
export interface WebAppsGetPrivateLinkResourcesDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get list of processes for a web site, or a deployment slot, or for a specific scaled-out instance in a web site. */
export interface WebAppsListProcesses200Response extends HttpResponse {
  status: "200";
  body: ProcessInfoCollectionOutput;
}

/** Get list of processes for a web site, or a deployment slot, or for a specific scaled-out instance in a web site. */
export interface WebAppsListProcesses404Response extends HttpResponse {
  status: "404";
}

/** Get list of processes for a web site, or a deployment slot, or for a specific scaled-out instance in a web site. */
export interface WebAppsListProcessesDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get process information by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsGetProcess200Response extends HttpResponse {
  status: "200";
  body: ProcessInfoOutput;
}

/** Get process information by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsGetProcess404Response extends HttpResponse {
  status: "404";
}

/** Get process information by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsGetProcessDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Terminate a process by its ID for a web site, or a deployment slot, or specific scaled-out instance in a web site. */
export interface WebAppsDeleteProcess204Response extends HttpResponse {
  status: "204";
}

/** Terminate a process by its ID for a web site, or a deployment slot, or specific scaled-out instance in a web site. */
export interface WebAppsDeleteProcess404Response extends HttpResponse {
  status: "404";
}

/** Terminate a process by its ID for a web site, or a deployment slot, or specific scaled-out instance in a web site. */
export interface WebAppsDeleteProcessDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get a memory dump of a process by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsGetProcessDump200Response extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
}

/** Get a memory dump of a process by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsGetProcessDump404Response extends HttpResponse {
  status: "404";
}

/** Get a memory dump of a process by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsGetProcessDumpDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** List module information for a process by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsListProcessModules200Response extends HttpResponse {
  status: "200";
  body: ProcessModuleInfoCollectionOutput;
}

/** List module information for a process by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsListProcessModules404Response extends HttpResponse {
  status: "404";
}

/** List module information for a process by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsListProcessModulesDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get process information by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsGetProcessModule200Response extends HttpResponse {
  status: "200";
  body: ProcessModuleInfoOutput;
}

/** Get process information by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsGetProcessModule404Response extends HttpResponse {
  status: "404";
}

/** Get process information by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsGetProcessModuleDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** List the threads in a process by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsListProcessThreads200Response extends HttpResponse {
  status: "200";
  body: ProcessThreadInfoCollectionOutput;
}

/** List the threads in a process by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsListProcessThreads404Response extends HttpResponse {
  status: "404";
}

/** List the threads in a process by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsListProcessThreadsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get public certificates for an app or a deployment slot. */
export interface WebAppsListPublicCertificates200Response extends HttpResponse {
  status: "200";
  body: PublicCertificateCollectionOutput;
}

/** Get public certificates for an app or a deployment slot. */
export interface WebAppsListPublicCertificatesDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get the named public certificate for an app (or deployment slot, if specified). */
export interface WebAppsGetPublicCertificate200Response extends HttpResponse {
  status: "200";
  body: PublicCertificateOutput;
}

/** Get the named public certificate for an app (or deployment slot, if specified). */
export interface WebAppsGetPublicCertificateDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Creates a hostname binding for an app. */
export interface WebAppsCreateOrUpdatePublicCertificate200Response extends HttpResponse {
  status: "200";
  body: PublicCertificateOutput;
}

/** Creates a hostname binding for an app. */
export interface WebAppsCreateOrUpdatePublicCertificateDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Deletes a hostname binding for an app. */
export interface WebAppsDeletePublicCertificate200Response extends HttpResponse {
  status: "200";
}

/** Deletes a hostname binding for an app. */
export interface WebAppsDeletePublicCertificate204Response extends HttpResponse {
  status: "204";
}

/** Deletes a hostname binding for an app. */
export interface WebAppsDeletePublicCertificateDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets the publishing profile for an app (or deployment slot, if specified). */
export interface WebAppsListPublishingProfileXmlWithSecrets200Response extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
}

/** Gets the publishing profile for an app (or deployment slot, if specified). */
export interface WebAppsListPublishingProfileXmlWithSecretsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Resets the configuration settings of the current slot if they were previously modified by calling the API with POST. */
export interface WebAppsResetProductionSlotConfig200Response extends HttpResponse {
  status: "200";
}

/** Resets the configuration settings of the current slot if they were previously modified by calling the API with POST. */
export interface WebAppsResetProductionSlotConfigDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Restarts an app (or deployment slot, if specified). */
export interface WebAppsRestart200Response extends HttpResponse {
  status: "200";
}

/** Restarts an app (or deployment slot, if specified). */
export interface WebAppsRestartDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Restores an app from a backup blob in Azure Storage. */
export interface WebAppsRestoreFromBackupBlob200Response extends HttpResponse {
  status: "200";
}

/** Restores an app from a backup blob in Azure Storage. */
export interface WebAppsRestoreFromBackupBlob202Response extends HttpResponse {
  status: "202";
}

/** Restores an app from a backup blob in Azure Storage. */
export interface WebAppsRestoreFromBackupBlobDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Restores a deleted web app to this web app. */
export interface WebAppsRestoreFromDeletedApp200Response extends HttpResponse {
  status: "200";
}

/** Restores a deleted web app to this web app. */
export interface WebAppsRestoreFromDeletedApp202Response extends HttpResponse {
  status: "202";
}

/** Restores a deleted web app to this web app. */
export interface WebAppsRestoreFromDeletedAppDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Restores a web app from a snapshot. */
export interface WebAppsRestoreSnapshot200Response extends HttpResponse {
  status: "200";
}

/** Restores a web app from a snapshot. */
export interface WebAppsRestoreSnapshot202Response extends HttpResponse {
  status: "202";
}

/** Restores a web app from a snapshot. */
export interface WebAppsRestoreSnapshotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get list of siteextensions for a web site, or a deployment slot. */
export interface WebAppsListSiteExtensions200Response extends HttpResponse {
  status: "200";
  body: SiteExtensionInfoCollectionOutput;
}

/** Get list of siteextensions for a web site, or a deployment slot. */
export interface WebAppsListSiteExtensions404Response extends HttpResponse {
  status: "404";
}

/** Get list of siteextensions for a web site, or a deployment slot. */
export interface WebAppsListSiteExtensionsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get site extension information by its ID for a web site, or a deployment slot. */
export interface WebAppsGetSiteExtension200Response extends HttpResponse {
  status: "200";
  body: SiteExtensionInfoOutput;
}

/** Get site extension information by its ID for a web site, or a deployment slot. */
export interface WebAppsGetSiteExtension404Response extends HttpResponse {
  status: "404";
}

/** Get site extension information by its ID for a web site, or a deployment slot. */
export interface WebAppsGetSiteExtensionDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Install site extension on a web site, or a deployment slot. */
export interface WebAppsInstallSiteExtension200Response extends HttpResponse {
  status: "200";
  body: SiteExtensionInfoOutput;
}

/** Install site extension on a web site, or a deployment slot. */
export interface WebAppsInstallSiteExtension201Response extends HttpResponse {
  status: "201";
  body: SiteExtensionInfoOutput;
}

/** Install site extension on a web site, or a deployment slot. */
export interface WebAppsInstallSiteExtension429Response extends HttpResponse {
  status: "429";
}

/** Install site extension on a web site, or a deployment slot. */
export interface WebAppsInstallSiteExtensionDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Remove a site extension from a web site, or a deployment slot. */
export interface WebAppsDeleteSiteExtension204Response extends HttpResponse {
  status: "204";
}

/** Remove a site extension from a web site, or a deployment slot. */
export interface WebAppsDeleteSiteExtension404Response extends HttpResponse {
  status: "404";
}

/** Remove a site extension from a web site, or a deployment slot. */
export interface WebAppsDeleteSiteExtensionDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets an app's deployment slots. */
export interface WebAppsListSlots200Response extends HttpResponse {
  status: "200";
  body: WebAppCollectionOutput;
}

/** Gets an app's deployment slots. */
export interface WebAppsListSlotsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets the details of a web, mobile, or API app. */
export interface WebAppsGetSlot200Response extends HttpResponse {
  status: "200";
  body: SiteOutput;
}

/** Gets the details of a web, mobile, or API app. */
export interface WebAppsGetSlot404Response extends HttpResponse {
  status: "404";
}

/** Gets the details of a web, mobile, or API app. */
export interface WebAppsGetSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Creates a new web, mobile, or API app in an existing resource group, or updates an existing app. */
export interface WebAppsCreateOrUpdateSlot200Response extends HttpResponse {
  status: "200";
  body: SiteOutput;
}

/** Creates a new web, mobile, or API app in an existing resource group, or updates an existing app. */
export interface WebAppsCreateOrUpdateSlot202Response extends HttpResponse {
  status: "202";
  body: SiteOutput;
}

/** Creates a new web, mobile, or API app in an existing resource group, or updates an existing app. */
export interface WebAppsCreateOrUpdateSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Deletes a web, mobile, or API app, or one of the deployment slots. */
export interface WebAppsDeleteSlot200Response extends HttpResponse {
  status: "200";
}

/** Deletes a web, mobile, or API app, or one of the deployment slots. */
export interface WebAppsDeleteSlot204Response extends HttpResponse {
  status: "204";
}

/** Deletes a web, mobile, or API app, or one of the deployment slots. */
export interface WebAppsDeleteSlot404Response extends HttpResponse {
  status: "404";
}

/** Deletes a web, mobile, or API app, or one of the deployment slots. */
export interface WebAppsDeleteSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Creates a new web, mobile, or API app in an existing resource group, or updates an existing app. */
export interface WebAppsUpdateSlot200Response extends HttpResponse {
  status: "200";
  body: SiteOutput;
}

/** Creates a new web, mobile, or API app in an existing resource group, or updates an existing app. */
export interface WebAppsUpdateSlot202Response extends HttpResponse {
  status: "202";
  body: SiteOutput;
}

/** Creates a new web, mobile, or API app in an existing resource group, or updates an existing app. */
export interface WebAppsUpdateSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Analyze a custom hostname. */
export interface WebAppsAnalyzeCustomHostnameSlot200Response extends HttpResponse {
  status: "200";
  body: CustomHostnameAnalysisResultOutput;
}

/** Analyze a custom hostname. */
export interface WebAppsAnalyzeCustomHostnameSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Applies the configuration settings from the target slot onto the current slot. */
export interface WebAppsApplySlotConfigurationSlot200Response extends HttpResponse {
  status: "200";
}

/** Applies the configuration settings from the target slot onto the current slot. */
export interface WebAppsApplySlotConfigurationSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Creates a backup of an app. */
export interface WebAppsBackupSlot200Response extends HttpResponse {
  status: "200";
  body: BackupItemOutput;
}

/** Creates a backup of an app. */
export interface WebAppsBackupSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets existing backups of an app. */
export interface WebAppsListBackupsSlot200Response extends HttpResponse {
  status: "200";
  body: BackupItemCollectionOutput;
}

/** Gets existing backups of an app. */
export interface WebAppsListBackupsSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets a backup of an app by its ID. */
export interface WebAppsGetBackupStatusSlot200Response extends HttpResponse {
  status: "200";
  body: BackupItemOutput;
}

/** Gets a backup of an app by its ID. */
export interface WebAppsGetBackupStatusSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Deletes a backup of an app by its ID. */
export interface WebAppsDeleteBackupSlot200Response extends HttpResponse {
  status: "200";
}

/** Deletes a backup of an app by its ID. */
export interface WebAppsDeleteBackupSlot404Response extends HttpResponse {
  status: "404";
}

/** Deletes a backup of an app by its ID. */
export interface WebAppsDeleteBackupSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets status of a web app backup that may be in progress, including secrets associated with the backup, such as the Azure Storage SAS URL. Also can be used to update the SAS URL for the backup if a new URL is passed in the request body. */
export interface WebAppsListBackupStatusSecretsSlot200Response extends HttpResponse {
  status: "200";
  body: BackupItemOutput;
}

/** Gets status of a web app backup that may be in progress, including secrets associated with the backup, such as the Azure Storage SAS URL. Also can be used to update the SAS URL for the backup if a new URL is passed in the request body. */
export interface WebAppsListBackupStatusSecretsSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Restores a specific backup to another app (or deployment slot, if specified). */
export interface WebAppsRestoreSlot200Response extends HttpResponse {
  status: "200";
}

/** Restores a specific backup to another app (or deployment slot, if specified). */
export interface WebAppsRestoreSlot202Response extends HttpResponse {
  status: "202";
}

/** Restores a specific backup to another app (or deployment slot, if specified). */
export interface WebAppsRestoreSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Returns whether Scm basic auth is allowed and whether Ftp is allowed for a given site. */
export interface WebAppsListBasicPublishingCredentialsPoliciesSlot200Response extends HttpResponse {
  status: "200";
  body: PublishingCredentialsPoliciesCollectionOutput;
}

/** Returns whether Scm basic auth is allowed and whether Ftp is allowed for a given site. */
export interface WebAppsListBasicPublishingCredentialsPoliciesSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Returns whether FTP is allowed on the site or not. */
export interface WebAppsGetFtpAllowedSlot200Response extends HttpResponse {
  status: "200";
  body: CsmPublishingCredentialsPoliciesEntityOutput;
}

/** Returns whether FTP is allowed on the site or not. */
export interface WebAppsGetFtpAllowedSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Updates whether FTP is allowed on the site or not. */
export interface WebAppsUpdateFtpAllowedSlot200Response extends HttpResponse {
  status: "200";
  body: CsmPublishingCredentialsPoliciesEntityOutput;
}

/** Updates whether FTP is allowed on the site or not. */
export interface WebAppsUpdateFtpAllowedSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Returns whether Scm basic auth is allowed on the site or not. */
export interface WebAppsGetScmAllowedSlot200Response extends HttpResponse {
  status: "200";
  body: CsmPublishingCredentialsPoliciesEntityOutput;
}

/** Returns whether Scm basic auth is allowed on the site or not. */
export interface WebAppsGetScmAllowedSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Updates whether user publishing credentials are allowed on the site or not. */
export interface WebAppsUpdateScmAllowedSlot200Response extends HttpResponse {
  status: "200";
  body: CsmPublishingCredentialsPoliciesEntityOutput;
}

/** Updates whether user publishing credentials are allowed on the site or not. */
export interface WebAppsUpdateScmAllowedSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** List the configurations of an app */
export interface WebAppsListConfigurationsSlot200Response extends HttpResponse {
  status: "200";
  body: SiteConfigResourceCollectionOutput;
}

/** List the configurations of an app */
export interface WebAppsListConfigurationsSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Replaces the application settings of an app. */
export interface WebAppsUpdateApplicationSettingsSlot200Response extends HttpResponse {
  status: "200";
  body: StringDictionaryOutput;
}

/** Replaces the application settings of an app. */
export interface WebAppsUpdateApplicationSettingsSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets the application settings of an app. */
export interface WebAppsListApplicationSettingsSlot200Response extends HttpResponse {
  status: "200";
  body: StringDictionaryOutput;
}

/** Gets the application settings of an app. */
export interface WebAppsListApplicationSettingsSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Updates the Authentication / Authorization settings associated with web app. */
export interface WebAppsUpdateAuthSettingsSlot200Response extends HttpResponse {
  status: "200";
  body: SiteAuthSettingsOutput;
}

/** Updates the Authentication / Authorization settings associated with web app. */
export interface WebAppsUpdateAuthSettingsSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets the Authentication/Authorization settings of an app. */
export interface WebAppsGetAuthSettingsSlot200Response extends HttpResponse {
  status: "200";
  body: SiteAuthSettingsOutput;
}

/** Gets the Authentication/Authorization settings of an app. */
export interface WebAppsGetAuthSettingsSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets site's Authentication / Authorization settings for apps via the V2 format */
export interface WebAppsGetAuthSettingsV2WithoutSecretsSlot200Response extends HttpResponse {
  status: "200";
  body: SiteAuthSettingsV2Output;
}

/** Gets site's Authentication / Authorization settings for apps via the V2 format */
export interface WebAppsGetAuthSettingsV2WithoutSecretsSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Updates site's Authentication / Authorization settings for apps via the V2 format */
export interface WebAppsUpdateAuthSettingsV2Slot200Response extends HttpResponse {
  status: "200";
  body: SiteAuthSettingsV2Output;
}

/** Updates site's Authentication / Authorization settings for apps via the V2 format */
export interface WebAppsUpdateAuthSettingsV2SlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets site's Authentication / Authorization settings for apps via the V2 format */
export interface WebAppsGetAuthSettingsV2Slot200Response extends HttpResponse {
  status: "200";
  body: SiteAuthSettingsV2Output;
}

/** Gets site's Authentication / Authorization settings for apps via the V2 format */
export interface WebAppsGetAuthSettingsV2SlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Updates the Azure storage account configurations of an app. */
export interface WebAppsUpdateAzureStorageAccountsSlot200Response extends HttpResponse {
  status: "200";
  body: AzureStoragePropertyDictionaryResourceOutput;
}

/** Updates the Azure storage account configurations of an app. */
export interface WebAppsUpdateAzureStorageAccountsSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets the Azure storage account configurations of an app. */
export interface WebAppsListAzureStorageAccountsSlot200Response extends HttpResponse {
  status: "200";
  body: AzureStoragePropertyDictionaryResourceOutput;
}

/** Gets the Azure storage account configurations of an app. */
export interface WebAppsListAzureStorageAccountsSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Updates the backup configuration of an app. */
export interface WebAppsUpdateBackupConfigurationSlot200Response extends HttpResponse {
  status: "200";
  body: BackupRequestOutput;
}

/** Updates the backup configuration of an app. */
export interface WebAppsUpdateBackupConfigurationSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Deletes the backup configuration of an app. */
export interface WebAppsDeleteBackupConfigurationSlot200Response extends HttpResponse {
  status: "200";
}

/** Deletes the backup configuration of an app. */
export interface WebAppsDeleteBackupConfigurationSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets the backup configuration of an app. */
export interface WebAppsGetBackupConfigurationSlot200Response extends HttpResponse {
  status: "200";
  body: BackupRequestOutput;
}

/** Gets the backup configuration of an app. */
export interface WebAppsGetBackupConfigurationSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets the config reference app settings and status of an app */
export interface WebAppsGetAppSettingsKeyVaultReferencesSlot200Response extends HttpResponse {
  status: "200";
  body: ApiKVReferenceCollectionOutput;
}

/** Gets the config reference app settings and status of an app */
export interface WebAppsGetAppSettingsKeyVaultReferencesSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets the config reference and status of an app */
export interface WebAppsGetAppSettingKeyVaultReferenceSlot200Response extends HttpResponse {
  status: "200";
  body: ApiKVReferenceOutput;
}

/** Gets the config reference and status of an app */
export interface WebAppsGetAppSettingKeyVaultReferenceSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets the config reference app settings and status of an app */
export interface WebAppsGetSiteConnectionStringKeyVaultReferencesSlot200Response extends HttpResponse {
  status: "200";
  body: ApiKVReferenceCollectionOutput;
}

/** Gets the config reference app settings and status of an app */
export interface WebAppsGetSiteConnectionStringKeyVaultReferencesSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets the config reference and status of an app */
export interface WebAppsGetSiteConnectionStringKeyVaultReferenceSlot200Response extends HttpResponse {
  status: "200";
  body: ApiKVReferenceOutput;
}

/** Gets the config reference and status of an app */
export interface WebAppsGetSiteConnectionStringKeyVaultReferenceSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Replaces the connection strings of an app. */
export interface WebAppsUpdateConnectionStringsSlot200Response extends HttpResponse {
  status: "200";
  body: ConnectionStringDictionaryOutput;
}

/** Replaces the connection strings of an app. */
export interface WebAppsUpdateConnectionStringsSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets the connection strings of an app. */
export interface WebAppsListConnectionStringsSlot200Response extends HttpResponse {
  status: "200";
  body: ConnectionStringDictionaryOutput;
}

/** Gets the connection strings of an app. */
export interface WebAppsListConnectionStringsSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets the logging configuration of an app. */
export interface WebAppsGetDiagnosticLogsConfigurationSlot200Response extends HttpResponse {
  status: "200";
  body: SiteLogsConfigOutput;
}

/** Gets the logging configuration of an app. */
export interface WebAppsGetDiagnosticLogsConfigurationSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Updates the logging configuration of an app. */
export interface WebAppsUpdateDiagnosticLogsConfigSlot200Response extends HttpResponse {
  status: "200";
  body: SiteLogsConfigOutput;
}

/** Updates the logging configuration of an app. */
export interface WebAppsUpdateDiagnosticLogsConfigSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Replaces the metadata of an app. */
export interface WebAppsUpdateMetadataSlot200Response extends HttpResponse {
  status: "200";
  body: StringDictionaryOutput;
}

/** Replaces the metadata of an app. */
export interface WebAppsUpdateMetadataSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets the metadata of an app. */
export interface WebAppsListMetadataSlot200Response extends HttpResponse {
  status: "200";
  body: StringDictionaryOutput;
}

/** Gets the metadata of an app. */
export interface WebAppsListMetadataSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets the Git/FTP publishing credentials of an app. */
export interface WebAppsListPublishingCredentialsSlot200Response extends HttpResponse {
  status: "200";
  body: UserOutput;
}

/** Gets the Git/FTP publishing credentials of an app. */
export interface WebAppsListPublishingCredentialsSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Updates the Push settings associated with web app. */
export interface WebAppsUpdateSitePushSettingsSlot200Response extends HttpResponse {
  status: "200";
  body: PushSettingsOutput;
}

/** Updates the Push settings associated with web app. */
export interface WebAppsUpdateSitePushSettingsSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets the Push settings associated with web app. */
export interface WebAppsListSitePushSettingsSlot200Response extends HttpResponse {
  status: "200";
  body: PushSettingsOutput;
}

/** Gets the Push settings associated with web app. */
export interface WebAppsListSitePushSettingsSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets the configuration of an app, such as platform version and bitness, default documents, virtual applications, Always On, etc. */
export interface WebAppsGetConfigurationSlot200Response extends HttpResponse {
  status: "200";
  body: SiteConfigResourceOutput;
}

/** Gets the configuration of an app, such as platform version and bitness, default documents, virtual applications, Always On, etc. */
export interface WebAppsGetConfigurationSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Updates the configuration of an app. */
export interface WebAppsCreateOrUpdateConfigurationSlot200Response extends HttpResponse {
  status: "200";
  body: SiteConfigResourceOutput;
}

/** Updates the configuration of an app. */
export interface WebAppsCreateOrUpdateConfigurationSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Updates the configuration of an app. */
export interface WebAppsUpdateConfigurationSlot200Response extends HttpResponse {
  status: "200";
  body: SiteConfigResourceOutput;
}

/** Updates the configuration of an app. */
export interface WebAppsUpdateConfigurationSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets a list of web app configuration snapshots identifiers. Each element of the list contains a timestamp and the ID of the snapshot. */
export interface WebAppsListConfigurationSnapshotInfoSlot200Response extends HttpResponse {
  status: "200";
  body: SiteConfigurationSnapshotInfoCollectionOutput;
}

/** Gets a list of web app configuration snapshots identifiers. Each element of the list contains a timestamp and the ID of the snapshot. */
export interface WebAppsListConfigurationSnapshotInfoSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets a snapshot of the configuration of an app at a previous point in time. */
export interface WebAppsGetConfigurationSnapshotSlot200Response extends HttpResponse {
  status: "200";
  body: SiteConfigResourceOutput;
}

/** Gets a snapshot of the configuration of an app at a previous point in time. */
export interface WebAppsGetConfigurationSnapshotSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Reverts the configuration of an app to a previous snapshot. */
export interface WebAppsRecoverSiteConfigurationSnapshotSlot204Response extends HttpResponse {
  status: "204";
}

/** Reverts the configuration of an app to a previous snapshot. */
export interface WebAppsRecoverSiteConfigurationSnapshotSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets the last lines of docker logs for the given site */
export interface WebAppsGetWebSiteContainerLogsSlot200Response extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
}

/** Gets the last lines of docker logs for the given site */
export interface WebAppsGetWebSiteContainerLogsSlot204Response extends HttpResponse {
  status: "204";
}

/** Gets the last lines of docker logs for the given site */
export interface WebAppsGetWebSiteContainerLogsSlotDefaultResponse extends HttpResponse {
  status: string;
}

/** Gets the ZIP archived docker log files for the given site */
export interface WebAppsGetContainerLogsZipSlot200Response extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
}

/** Gets the ZIP archived docker log files for the given site */
export interface WebAppsGetContainerLogsZipSlot204Response extends HttpResponse {
  status: "204";
}

/** Gets the ZIP archived docker log files for the given site */
export interface WebAppsGetContainerLogsZipSlotDefaultResponse extends HttpResponse {
  status: string;
}

/** List continuous web jobs for an app, or a deployment slot. */
export interface WebAppsListContinuousWebJobsSlot200Response extends HttpResponse {
  status: "200";
  body: ContinuousWebJobCollectionOutput;
}

/** List continuous web jobs for an app, or a deployment slot. */
export interface WebAppsListContinuousWebJobsSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets a continuous web job by its ID for an app, or a deployment slot. */
export interface WebAppsGetContinuousWebJobSlot200Response extends HttpResponse {
  status: "200";
  body: ContinuousWebJobOutput;
}

/** Gets a continuous web job by its ID for an app, or a deployment slot. */
export interface WebAppsGetContinuousWebJobSlot404Response extends HttpResponse {
  status: "404";
}

/** Gets a continuous web job by its ID for an app, or a deployment slot. */
export interface WebAppsGetContinuousWebJobSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Delete a continuous web job by its ID for an app, or a deployment slot. */
export interface WebAppsDeleteContinuousWebJobSlot200Response extends HttpResponse {
  status: "200";
}

/** Delete a continuous web job by its ID for an app, or a deployment slot. */
export interface WebAppsDeleteContinuousWebJobSlot204Response extends HttpResponse {
  status: "204";
}

/** Delete a continuous web job by its ID for an app, or a deployment slot. */
export interface WebAppsDeleteContinuousWebJobSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Start a continuous web job for an app, or a deployment slot. */
export interface WebAppsStartContinuousWebJobSlot200Response extends HttpResponse {
  status: "200";
}

/** Start a continuous web job for an app, or a deployment slot. */
export interface WebAppsStartContinuousWebJobSlot404Response extends HttpResponse {
  status: "404";
}

/** Start a continuous web job for an app, or a deployment slot. */
export interface WebAppsStartContinuousWebJobSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Stop a continuous web job for an app, or a deployment slot. */
export interface WebAppsStopContinuousWebJobSlot200Response extends HttpResponse {
  status: "200";
}

/** Stop a continuous web job for an app, or a deployment slot. */
export interface WebAppsStopContinuousWebJobSlot404Response extends HttpResponse {
  status: "404";
}

/** Stop a continuous web job for an app, or a deployment slot. */
export interface WebAppsStopContinuousWebJobSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** List deployments for an app, or a deployment slot. */
export interface WebAppsListDeploymentsSlot200Response extends HttpResponse {
  status: "200";
  body: DeploymentCollectionOutput;
}

/** List deployments for an app, or a deployment slot. */
export interface WebAppsListDeploymentsSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get a deployment by its ID for an app, or a deployment slot. */
export interface WebAppsGetDeploymentSlot200Response extends HttpResponse {
  status: "200";
  body: DeploymentOutput;
}

/** Get a deployment by its ID for an app, or a deployment slot. */
export interface WebAppsGetDeploymentSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Create a deployment for an app, or a deployment slot. */
export interface WebAppsCreateDeploymentSlot200Response extends HttpResponse {
  status: "200";
  body: DeploymentOutput;
}

/** Create a deployment for an app, or a deployment slot. */
export interface WebAppsCreateDeploymentSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Delete a deployment by its ID for an app, or a deployment slot. */
export interface WebAppsDeleteDeploymentSlot200Response extends HttpResponse {
  status: "200";
}

/** Delete a deployment by its ID for an app, or a deployment slot. */
export interface WebAppsDeleteDeploymentSlot204Response extends HttpResponse {
  status: "204";
}

/** Delete a deployment by its ID for an app, or a deployment slot. */
export interface WebAppsDeleteDeploymentSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** List deployment log for specific deployment for an app, or a deployment slot. */
export interface WebAppsListDeploymentLogSlot200Response extends HttpResponse {
  status: "200";
  body: DeploymentOutput;
}

/** List deployment log for specific deployment for an app, or a deployment slot. */
export interface WebAppsListDeploymentLogSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Discovers an existing app backup that can be restored from a blob in Azure storage. Use this to get information about the databases stored in a backup. */
export interface WebAppsDiscoverBackupSlot200Response extends HttpResponse {
  status: "200";
  body: RestoreRequestOutput;
}

/** Discovers an existing app backup that can be restored from a blob in Azure storage. Use this to get information about the databases stored in a backup. */
export interface WebAppsDiscoverBackupSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Lists ownership identifiers for domain associated with web app. */
export interface WebAppsListDomainOwnershipIdentifiersSlot200Response extends HttpResponse {
  status: "200";
  body: IdentifierCollectionOutput;
}

/** Lists ownership identifiers for domain associated with web app. */
export interface WebAppsListDomainOwnershipIdentifiersSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get domain ownership identifier for web app. */
export interface WebAppsGetDomainOwnershipIdentifierSlot200Response extends HttpResponse {
  status: "200";
  body: IdentifierOutput;
}

/** Get domain ownership identifier for web app. */
export interface WebAppsGetDomainOwnershipIdentifierSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Creates a domain ownership identifier for web app, or updates an existing ownership identifier. */
export interface WebAppsCreateOrUpdateDomainOwnershipIdentifierSlot200Response extends HttpResponse {
  status: "200";
  body: IdentifierOutput;
}

/** Creates a domain ownership identifier for web app, or updates an existing ownership identifier. */
export interface WebAppsCreateOrUpdateDomainOwnershipIdentifierSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Deletes a domain ownership identifier for a web app. */
export interface WebAppsDeleteDomainOwnershipIdentifierSlot200Response extends HttpResponse {
  status: "200";
}

/** Deletes a domain ownership identifier for a web app. */
export interface WebAppsDeleteDomainOwnershipIdentifierSlot204Response extends HttpResponse {
  status: "204";
}

/** Deletes a domain ownership identifier for a web app. */
export interface WebAppsDeleteDomainOwnershipIdentifierSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Creates a domain ownership identifier for web app, or updates an existing ownership identifier. */
export interface WebAppsUpdateDomainOwnershipIdentifierSlot200Response extends HttpResponse {
  status: "200";
  body: IdentifierOutput;
}

/** Creates a domain ownership identifier for web app, or updates an existing ownership identifier. */
export interface WebAppsUpdateDomainOwnershipIdentifierSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get the status of the last MSDeploy operation. */
export interface WebAppsGetMSDeployStatusSlot200Response extends HttpResponse {
  status: "200";
  body: MSDeployStatusOutput;
}

/** Get the status of the last MSDeploy operation. */
export interface WebAppsGetMSDeployStatusSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Invoke the MSDeploy web app extension. */
export interface WebAppsCreateMSDeployOperationSlot201Response extends HttpResponse {
  status: "201";
  body: MSDeployStatusOutput;
}

/** Invoke the MSDeploy web app extension. */
export interface WebAppsCreateMSDeployOperationSlot409Response extends HttpResponse {
  status: "409";
}

/** Invoke the MSDeploy web app extension. */
export interface WebAppsCreateMSDeployOperationSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get the MSDeploy Log for the last MSDeploy operation. */
export interface WebAppsGetMSDeployLogSlot200Response extends HttpResponse {
  status: "200";
  body: MSDeployLogOutput;
}

/** Get the MSDeploy Log for the last MSDeploy operation. */
export interface WebAppsGetMSDeployLogSlot404Response extends HttpResponse {
  status: "404";
}

/** Get the MSDeploy Log for the last MSDeploy operation. */
export interface WebAppsGetMSDeployLogSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** List the functions for a web site, or a deployment slot. */
export interface WebAppsListInstanceFunctionsSlot200Response extends HttpResponse {
  status: "200";
  body: FunctionEnvelopeCollectionOutput;
}

/** List the functions for a web site, or a deployment slot. */
export interface WebAppsListInstanceFunctionsSlot404Response extends HttpResponse {
  status: "404";
}

/** List the functions for a web site, or a deployment slot. */
export interface WebAppsListInstanceFunctionsSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Fetch a short lived token that can be exchanged for a master key. */
export interface WebAppsGetFunctionsAdminTokenSlot200Response extends HttpResponse {
  status: "200";
  body: string;
}

/** Fetch a short lived token that can be exchanged for a master key. */
export interface WebAppsGetFunctionsAdminTokenSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get function information by its ID for web site, or a deployment slot. */
export interface WebAppsGetInstanceFunctionSlot200Response extends HttpResponse {
  status: "200";
  body: FunctionEnvelopeOutput;
}

/** Get function information by its ID for web site, or a deployment slot. */
export interface WebAppsGetInstanceFunctionSlot404Response extends HttpResponse {
  status: "404";
}

/** Get function information by its ID for web site, or a deployment slot. */
export interface WebAppsGetInstanceFunctionSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Create function for web site, or a deployment slot. */
export interface WebAppsCreateInstanceFunctionSlot201Response extends HttpResponse {
  status: "201";
  body: FunctionEnvelopeOutput;
}

/** Create function for web site, or a deployment slot. */
export interface WebAppsCreateInstanceFunctionSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Delete a function for web site, or a deployment slot. */
export interface WebAppsDeleteInstanceFunctionSlot204Response extends HttpResponse {
  status: "204";
}

/** Delete a function for web site, or a deployment slot. */
export interface WebAppsDeleteInstanceFunctionSlot404Response extends HttpResponse {
  status: "404";
}

/** Delete a function for web site, or a deployment slot. */
export interface WebAppsDeleteInstanceFunctionSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Add or update a function secret. */
export interface WebAppsCreateOrUpdateFunctionSecretSlot200Response extends HttpResponse {
  status: "200";
  body: KeyInfoOutput;
}

/** Add or update a function secret. */
export interface WebAppsCreateOrUpdateFunctionSecretSlot201Response extends HttpResponse {
  status: "201";
  body: KeyInfoOutput;
}

/** Add or update a function secret. */
export interface WebAppsCreateOrUpdateFunctionSecretSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Delete a function secret. */
export interface WebAppsDeleteFunctionSecretSlot204Response extends HttpResponse {
  status: "204";
}

/** Delete a function secret. */
export interface WebAppsDeleteFunctionSecretSlot404Response extends HttpResponse {
  status: "404";
}

/** Delete a function secret. */
export interface WebAppsDeleteFunctionSecretSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get function keys for a function in a web site, or a deployment slot. */
export interface WebAppsListFunctionKeysSlot200Response extends HttpResponse {
  status: "200";
  body: StringDictionaryOutput;
}

/** Get function keys for a function in a web site, or a deployment slot. */
export interface WebAppsListFunctionKeysSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get function secrets for a function in a web site, or a deployment slot. */
export interface WebAppsListFunctionSecretsSlot200Response extends HttpResponse {
  status: "200";
  body: FunctionSecretsOutput;
}

/** Get function secrets for a function in a web site, or a deployment slot. */
export interface WebAppsListFunctionSecretsSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get host secrets for a function app. */
export interface WebAppsListHostKeysSlot200Response extends HttpResponse {
  status: "200";
  body: HostKeysOutput;
}

/** Get host secrets for a function app. */
export interface WebAppsListHostKeysSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** This is to allow calling via powershell and ARM template. */
export interface WebAppsListSyncStatusSlot204Response extends HttpResponse {
  status: "204";
}

/** This is to allow calling via powershell and ARM template. */
export interface WebAppsListSyncStatusSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Syncs function trigger metadata to the management database */
export interface WebAppsSyncFunctionsSlot204Response extends HttpResponse {
  status: "204";
}

/** Syncs function trigger metadata to the management database */
export interface WebAppsSyncFunctionsSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Add or update a host level secret. */
export interface WebAppsCreateOrUpdateHostSecretSlot200Response extends HttpResponse {
  status: "200";
  body: KeyInfoOutput;
}

/** Add or update a host level secret. */
export interface WebAppsCreateOrUpdateHostSecretSlot201Response extends HttpResponse {
  status: "201";
  body: KeyInfoOutput;
}

/** Add or update a host level secret. */
export interface WebAppsCreateOrUpdateHostSecretSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Delete a host level secret. */
export interface WebAppsDeleteHostSecretSlot204Response extends HttpResponse {
  status: "204";
}

/** Delete a host level secret. */
export interface WebAppsDeleteHostSecretSlot404Response extends HttpResponse {
  status: "404";
}

/** Delete a host level secret. */
export interface WebAppsDeleteHostSecretSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get hostname bindings for an app or a deployment slot. */
export interface WebAppsListHostNameBindingsSlot200Response extends HttpResponse {
  status: "200";
  body: HostNameBindingCollectionOutput;
}

/** Get hostname bindings for an app or a deployment slot. */
export interface WebAppsListHostNameBindingsSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get the named hostname binding for an app (or deployment slot, if specified). */
export interface WebAppsGetHostNameBindingSlot200Response extends HttpResponse {
  status: "200";
  body: HostNameBindingOutput;
}

/** Get the named hostname binding for an app (or deployment slot, if specified). */
export interface WebAppsGetHostNameBindingSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Creates a hostname binding for an app. */
export interface WebAppsCreateOrUpdateHostNameBindingSlot200Response extends HttpResponse {
  status: "200";
  body: HostNameBindingOutput;
}

/** Creates a hostname binding for an app. */
export interface WebAppsCreateOrUpdateHostNameBindingSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Deletes a hostname binding for an app. */
export interface WebAppsDeleteHostNameBindingSlot200Response extends HttpResponse {
  status: "200";
}

/** Deletes a hostname binding for an app. */
export interface WebAppsDeleteHostNameBindingSlot204Response extends HttpResponse {
  status: "204";
}

/** Deletes a hostname binding for an app. */
export interface WebAppsDeleteHostNameBindingSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Retrieves a specific Service Bus Hybrid Connection used by this Web App. */
export interface WebAppsGetHybridConnectionSlot200Response extends HttpResponse {
  status: "200";
  body: HybridConnectionOutput;
}

/** Retrieves a specific Service Bus Hybrid Connection used by this Web App. */
export interface WebAppsGetHybridConnectionSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Creates a new Hybrid Connection using a Service Bus relay. */
export interface WebAppsCreateOrUpdateHybridConnectionSlot200Response extends HttpResponse {
  status: "200";
  body: HybridConnectionOutput;
}

/** Creates a new Hybrid Connection using a Service Bus relay. */
export interface WebAppsCreateOrUpdateHybridConnectionSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Removes a Hybrid Connection from this site. */
export interface WebAppsDeleteHybridConnectionSlot200Response extends HttpResponse {
  status: "200";
}

/** Removes a Hybrid Connection from this site. */
export interface WebAppsDeleteHybridConnectionSlot404Response extends HttpResponse {
  status: "404";
}

/** Removes a Hybrid Connection from this site. */
export interface WebAppsDeleteHybridConnectionSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Creates a new Hybrid Connection using a Service Bus relay. */
export interface WebAppsUpdateHybridConnectionSlot200Response extends HttpResponse {
  status: "200";
  body: HybridConnectionOutput;
}

/** Creates a new Hybrid Connection using a Service Bus relay. */
export interface WebAppsUpdateHybridConnectionSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Retrieves all Service Bus Hybrid Connections used by this Web App. */
export interface WebAppsListHybridConnectionsSlot200Response extends HttpResponse {
  status: "200";
  body: HybridConnectionOutput;
}

/** Retrieves all Service Bus Hybrid Connections used by this Web App. */
export interface WebAppsListHybridConnectionsSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets hybrid connections configured for an app (or deployment slot, if specified). */
export interface WebAppsListRelayServiceConnectionsSlot200Response extends HttpResponse {
  status: "200";
  body: RelayServiceConnectionEntityOutput;
}

/** Gets hybrid connections configured for an app (or deployment slot, if specified). */
export interface WebAppsListRelayServiceConnectionsSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets a hybrid connection configuration by its name. */
export interface WebAppsGetRelayServiceConnectionSlot200Response extends HttpResponse {
  status: "200";
  body: RelayServiceConnectionEntityOutput;
}

/** Gets a hybrid connection configuration by its name. */
export interface WebAppsGetRelayServiceConnectionSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Creates a new hybrid connection configuration (PUT), or updates an existing one (PATCH). */
export interface WebAppsCreateOrUpdateRelayServiceConnectionSlot200Response extends HttpResponse {
  status: "200";
  body: RelayServiceConnectionEntityOutput;
}

/** Creates a new hybrid connection configuration (PUT), or updates an existing one (PATCH). */
export interface WebAppsCreateOrUpdateRelayServiceConnectionSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Deletes a relay service connection by its name. */
export interface WebAppsDeleteRelayServiceConnectionSlot200Response extends HttpResponse {
  status: "200";
}

/** Deletes a relay service connection by its name. */
export interface WebAppsDeleteRelayServiceConnectionSlot404Response extends HttpResponse {
  status: "404";
}

/** Deletes a relay service connection by its name. */
export interface WebAppsDeleteRelayServiceConnectionSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Creates a new hybrid connection configuration (PUT), or updates an existing one (PATCH). */
export interface WebAppsUpdateRelayServiceConnectionSlot200Response extends HttpResponse {
  status: "200";
  body: RelayServiceConnectionEntityOutput;
}

/** Creates a new hybrid connection configuration (PUT), or updates an existing one (PATCH). */
export interface WebAppsUpdateRelayServiceConnectionSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets all scale-out instances of an app. */
export interface WebAppsListInstanceIdentifiersSlot200Response extends HttpResponse {
  status: "200";
  body: WebAppInstanceStatusCollectionOutput;
}

/** Gets all scale-out instances of an app. */
export interface WebAppsListInstanceIdentifiersSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets all scale-out instances of an app. */
export interface WebAppsGetInstanceInfoSlot200Response extends HttpResponse {
  status: "200";
  body: WebSiteInstanceStatusOutput;
}

/** Gets all scale-out instances of an app. */
export interface WebAppsGetInstanceInfoSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get the status of the last MSDeploy operation. */
export interface WebAppsGetInstanceMsDeployStatusSlot200Response extends HttpResponse {
  status: "200";
  body: MSDeployStatusOutput;
}

/** Get the status of the last MSDeploy operation. */
export interface WebAppsGetInstanceMsDeployStatusSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Invoke the MSDeploy web app extension. */
export interface WebAppsCreateInstanceMSDeployOperationSlot201Response extends HttpResponse {
  status: "201";
  body: MSDeployStatusOutput;
}

/** Invoke the MSDeploy web app extension. */
export interface WebAppsCreateInstanceMSDeployOperationSlot409Response extends HttpResponse {
  status: "409";
}

/** Invoke the MSDeploy web app extension. */
export interface WebAppsCreateInstanceMSDeployOperationSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get the MSDeploy Log for the last MSDeploy operation. */
export interface WebAppsGetInstanceMSDeployLogSlot200Response extends HttpResponse {
  status: "200";
  body: MSDeployLogOutput;
}

/** Get the MSDeploy Log for the last MSDeploy operation. */
export interface WebAppsGetInstanceMSDeployLogSlot404Response extends HttpResponse {
  status: "404";
}

/** Get the MSDeploy Log for the last MSDeploy operation. */
export interface WebAppsGetInstanceMSDeployLogSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get list of processes for a web site, or a deployment slot, or for a specific scaled-out instance in a web site. */
export interface WebAppsListInstanceProcessesSlot200Response extends HttpResponse {
  status: "200";
  body: ProcessInfoCollectionOutput;
}

/** Get list of processes for a web site, or a deployment slot, or for a specific scaled-out instance in a web site. */
export interface WebAppsListInstanceProcessesSlot404Response extends HttpResponse {
  status: "404";
}

/** Get list of processes for a web site, or a deployment slot, or for a specific scaled-out instance in a web site. */
export interface WebAppsListInstanceProcessesSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get process information by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsGetInstanceProcessSlot200Response extends HttpResponse {
  status: "200";
  body: ProcessInfoOutput;
}

/** Get process information by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsGetInstanceProcessSlot404Response extends HttpResponse {
  status: "404";
}

/** Get process information by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsGetInstanceProcessSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Terminate a process by its ID for a web site, or a deployment slot, or specific scaled-out instance in a web site. */
export interface WebAppsDeleteInstanceProcessSlot204Response extends HttpResponse {
  status: "204";
}

/** Terminate a process by its ID for a web site, or a deployment slot, or specific scaled-out instance in a web site. */
export interface WebAppsDeleteInstanceProcessSlot404Response extends HttpResponse {
  status: "404";
}

/** Terminate a process by its ID for a web site, or a deployment slot, or specific scaled-out instance in a web site. */
export interface WebAppsDeleteInstanceProcessSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get a memory dump of a process by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsGetInstanceProcessDumpSlot200Response extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
}

/** Get a memory dump of a process by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsGetInstanceProcessDumpSlot404Response extends HttpResponse {
  status: "404";
}

/** Get a memory dump of a process by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsGetInstanceProcessDumpSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** List module information for a process by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsListInstanceProcessModulesSlot200Response extends HttpResponse {
  status: "200";
  body: ProcessModuleInfoCollectionOutput;
}

/** List module information for a process by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsListInstanceProcessModulesSlot404Response extends HttpResponse {
  status: "404";
}

/** List module information for a process by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsListInstanceProcessModulesSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get process information by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsGetInstanceProcessModuleSlot200Response extends HttpResponse {
  status: "200";
  body: ProcessModuleInfoOutput;
}

/** Get process information by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsGetInstanceProcessModuleSlot404Response extends HttpResponse {
  status: "404";
}

/** Get process information by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsGetInstanceProcessModuleSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** List the threads in a process by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsListInstanceProcessThreadsSlot200Response extends HttpResponse {
  status: "200";
  body: ProcessThreadInfoCollectionOutput;
}

/** List the threads in a process by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsListInstanceProcessThreadsSlot404Response extends HttpResponse {
  status: "404";
}

/** List the threads in a process by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsListInstanceProcessThreadsSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Shows whether an app can be cloned to another resource group or subscription. */
export interface WebAppsIsCloneableSlot200Response extends HttpResponse {
  status: "200";
  body: SiteCloneabilityOutput;
}

/** Shows whether an app can be cloned to another resource group or subscription. */
export interface WebAppsIsCloneableSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets existing backups of an app. */
export interface WebAppsListSiteBackupsSlot200Response extends HttpResponse {
  status: "200";
  body: BackupItemCollectionOutput;
}

/** Gets existing backups of an app. */
export interface WebAppsListSiteBackupsSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** This is to allow calling via powershell and ARM template. */
export interface WebAppsListSyncFunctionTriggersSlot200Response extends HttpResponse {
  status: "200";
  body: FunctionSecretsOutput;
}

/** This is to allow calling via powershell and ARM template. */
export interface WebAppsListSyncFunctionTriggersSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Returns the status of MySql in app migration, if one is active, and whether or not MySql in app is enabled */
export interface WebAppsGetMigrateMySqlStatusSlot200Response extends HttpResponse {
  status: "200";
  body: MigrateMySqlStatusOutput;
}

/** Returns the status of MySql in app migration, if one is active, and whether or not MySql in app is enabled */
export interface WebAppsGetMigrateMySqlStatusSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets a Swift Virtual Network connection. */
export interface WebAppsGetSwiftVirtualNetworkConnectionSlot200Response extends HttpResponse {
  status: "200";
  body: SwiftVirtualNetworkOutput;
}

/** Gets a Swift Virtual Network connection. */
export interface WebAppsGetSwiftVirtualNetworkConnectionSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/**
 * Integrates this Web App with a Virtual Network. This requires that 1) "swiftSupported" is true when doing a GET against this resource, and 2) that the target Subnet has already been delegated, and is not
 * in use by another App Service Plan other than the one this App is in.
 */
export interface WebAppsCreateOrUpdateSwiftVirtualNetworkConnectionWithCheckSlot200Response extends HttpResponse {
  status: "200";
  body: SwiftVirtualNetworkOutput;
}

/**
 * Integrates this Web App with a Virtual Network. This requires that 1) "swiftSupported" is true when doing a GET against this resource, and 2) that the target Subnet has already been delegated, and is not
 * in use by another App Service Plan other than the one this App is in.
 */
export interface WebAppsCreateOrUpdateSwiftVirtualNetworkConnectionWithCheckSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Deletes a Swift Virtual Network connection from an app (or deployment slot). */
export interface WebAppsDeleteSwiftVirtualNetworkSlot200Response extends HttpResponse {
  status: "200";
}

/** Deletes a Swift Virtual Network connection from an app (or deployment slot). */
export interface WebAppsDeleteSwiftVirtualNetworkSlot404Response extends HttpResponse {
  status: "404";
}

/** Deletes a Swift Virtual Network connection from an app (or deployment slot). */
export interface WebAppsDeleteSwiftVirtualNetworkSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/**
 * Integrates this Web App with a Virtual Network. This requires that 1) "swiftSupported" is true when doing a GET against this resource, and 2) that the target Subnet has already been delegated, and is not
 * in use by another App Service Plan other than the one this App is in.
 */
export interface WebAppsUpdateSwiftVirtualNetworkConnectionWithCheckSlot200Response extends HttpResponse {
  status: "200";
  body: SwiftVirtualNetworkOutput;
}

/**
 * Integrates this Web App with a Virtual Network. This requires that 1) "swiftSupported" is true when doing a GET against this resource, and 2) that the target Subnet has already been delegated, and is not
 * in use by another App Service Plan other than the one this App is in.
 */
export interface WebAppsUpdateSwiftVirtualNetworkConnectionWithCheckSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets all network features used by the app (or deployment slot, if specified). */
export interface WebAppsListNetworkFeaturesSlot200Response extends HttpResponse {
  status: "200";
  body: NetworkFeaturesOutput;
}

/** Gets all network features used by the app (or deployment slot, if specified). */
export interface WebAppsListNetworkFeaturesSlot404Response extends HttpResponse {
  status: "404";
}

/** Gets all network features used by the app (or deployment slot, if specified). */
export interface WebAppsListNetworkFeaturesSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets a named operation for a network trace capturing (or deployment slot, if specified). */
export interface WebAppsGetNetworkTraceOperationSlot200Response extends HttpResponse {
  status: "200";
  body: Array<NetworkTraceOutput>;
}

/** Gets a named operation for a network trace capturing (or deployment slot, if specified). */
export interface WebAppsGetNetworkTraceOperationSlot202Response extends HttpResponse {
  status: "202";
  body: Array<NetworkTraceOutput>;
}

/** Gets a named operation for a network trace capturing (or deployment slot, if specified). */
export interface WebAppsGetNetworkTraceOperationSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Start capturing network packets for the site (To be deprecated). */
export interface WebAppsStartWebSiteNetworkTraceSlot200Response extends HttpResponse {
  status: "200";
  body: string;
}

/** Start capturing network packets for the site (To be deprecated). */
export interface WebAppsStartWebSiteNetworkTraceSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Start capturing network packets for the site. */
export interface WebAppsStartWebSiteNetworkTraceOperationSlot200Response extends HttpResponse {
  status: "200";
  body: Array<NetworkTraceOutput>;
}

/** Start capturing network packets for the site. */
export interface WebAppsStartWebSiteNetworkTraceOperationSlot202Response extends HttpResponse {
  status: "202";
  body: Array<NetworkTraceOutput>;
}

/** Start capturing network packets for the site. */
export interface WebAppsStartWebSiteNetworkTraceOperationSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Stop ongoing capturing network packets for the site. */
export interface WebAppsStopWebSiteNetworkTraceSlot200Response extends HttpResponse {
  status: "200";
}

/** Stop ongoing capturing network packets for the site. */
export interface WebAppsStopWebSiteNetworkTraceSlot204Response extends HttpResponse {
  status: "204";
}

/** Stop ongoing capturing network packets for the site. */
export interface WebAppsStopWebSiteNetworkTraceSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets a named operation for a network trace capturing (or deployment slot, if specified). */
export interface WebAppsGetNetworkTracesSlot200Response extends HttpResponse {
  status: "200";
  body: Array<NetworkTraceOutput>;
}

/** Gets a named operation for a network trace capturing (or deployment slot, if specified). */
export interface WebAppsGetNetworkTracesSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets a named operation for a network trace capturing (or deployment slot, if specified). */
export interface WebAppsGetNetworkTraceOperationSlotV2200Response extends HttpResponse {
  status: "200";
  body: Array<NetworkTraceOutput>;
}

/** Gets a named operation for a network trace capturing (or deployment slot, if specified). */
export interface WebAppsGetNetworkTraceOperationSlotV2202Response extends HttpResponse {
  status: "202";
  body: Array<NetworkTraceOutput>;
}

/** Gets a named operation for a network trace capturing (or deployment slot, if specified). */
export interface WebAppsGetNetworkTraceOperationSlotV2DefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets a named operation for a network trace capturing (or deployment slot, if specified). */
export interface WebAppsGetNetworkTracesSlotV2200Response extends HttpResponse {
  status: "200";
  body: Array<NetworkTraceOutput>;
}

/** Gets a named operation for a network trace capturing (or deployment slot, if specified). */
export interface WebAppsGetNetworkTracesSlotV2DefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Generates a new publishing password for an app (or deployment slot, if specified). */
export interface WebAppsGenerateNewSitePublishingPasswordSlot200Response extends HttpResponse {
  status: "200";
}

/** Generates a new publishing password for an app (or deployment slot, if specified). */
export interface WebAppsGenerateNewSitePublishingPasswordSlot204Response extends HttpResponse {
  status: "204";
}

/** Generates a new publishing password for an app (or deployment slot, if specified). */
export interface WebAppsGenerateNewSitePublishingPasswordSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets perfmon counters for web app. */
export interface WebAppsListPerfMonCountersSlot200Response extends HttpResponse {
  status: "200";
  body: PerfMonCounterCollectionOutput;
}

/** Gets perfmon counters for web app. */
export interface WebAppsListPerfMonCountersSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets web app's event logs. */
export interface WebAppsGetSitePhpErrorLogFlagSlot200Response extends HttpResponse {
  status: "200";
  body: SitePhpErrorLogFlagOutput;
}

/** Gets web app's event logs. */
export interface WebAppsGetSitePhpErrorLogFlagSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets the premier add-ons of an app. */
export interface WebAppsListPremierAddOnsSlot200Response extends HttpResponse {
  status: "200";
  body: PremierAddOnOutput;
}

/** Gets the premier add-ons of an app. */
export interface WebAppsListPremierAddOnsSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets a named add-on of an app. */
export interface WebAppsGetPremierAddOnSlot200Response extends HttpResponse {
  status: "200";
  body: PremierAddOnOutput;
}

/** Gets a named add-on of an app. */
export interface WebAppsGetPremierAddOnSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Updates a named add-on of an app. */
export interface WebAppsAddPremierAddOnSlot200Response extends HttpResponse {
  status: "200";
  body: PremierAddOnOutput;
}

/** Updates a named add-on of an app. */
export interface WebAppsAddPremierAddOnSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Delete a premier add-on from an app. */
export interface WebAppsDeletePremierAddOnSlot200Response extends HttpResponse {
  status: "200";
}

/** Delete a premier add-on from an app. */
export interface WebAppsDeletePremierAddOnSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Updates a named add-on of an app. */
export interface WebAppsUpdatePremierAddOnSlot200Response extends HttpResponse {
  status: "200";
  body: PremierAddOnOutput;
}

/** Updates a named add-on of an app. */
export interface WebAppsUpdatePremierAddOnSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets data around private site access enablement and authorized Virtual Networks that can access the site. */
export interface WebAppsGetPrivateAccessSlot200Response extends HttpResponse {
  status: "200";
  body: PrivateAccessOutput;
}

/** Gets data around private site access enablement and authorized Virtual Networks that can access the site. */
export interface WebAppsGetPrivateAccessSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Sets data around private site access enablement and authorized Virtual Networks that can access the site. */
export interface WebAppsPutPrivateAccessVnetSlot200Response extends HttpResponse {
  status: "200";
  body: PrivateAccessOutput;
}

/** Sets data around private site access enablement and authorized Virtual Networks that can access the site. */
export interface WebAppsPutPrivateAccessVnetSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets the list of private endpoint connections associated with a site */
export interface WebAppsGetPrivateEndpointConnectionListSlot200Response extends HttpResponse {
  status: "200";
  body: PrivateEndpointConnectionCollectionOutput;
}

/** Gets the list of private endpoint connections associated with a site */
export interface WebAppsGetPrivateEndpointConnectionListSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets a private endpoint connection */
export interface WebAppsGetPrivateEndpointConnectionSlot200Response extends HttpResponse {
  status: "200";
  body: RemotePrivateEndpointConnectionARMResourceOutput;
}

/** Gets a private endpoint connection */
export interface WebAppsGetPrivateEndpointConnectionSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Approves or rejects a private endpoint connection */
export interface WebAppsApproveOrRejectPrivateEndpointConnectionSlot200Response extends HttpResponse {
  status: "200";
  body: RemotePrivateEndpointConnectionARMResourceOutput;
}

/** Approves or rejects a private endpoint connection */
export interface WebAppsApproveOrRejectPrivateEndpointConnectionSlot202Response extends HttpResponse {
  status: "202";
  body: RemotePrivateEndpointConnectionARMResourceOutput;
}

/** Approves or rejects a private endpoint connection */
export interface WebAppsApproveOrRejectPrivateEndpointConnectionSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Deletes a private endpoint connection */
export interface WebAppsDeletePrivateEndpointConnectionSlot200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Deletes a private endpoint connection */
export interface WebAppsDeletePrivateEndpointConnectionSlot202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Deletes a private endpoint connection */
export interface WebAppsDeletePrivateEndpointConnectionSlot204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Deletes a private endpoint connection */
export interface WebAppsDeletePrivateEndpointConnectionSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets the private link resources */
export interface WebAppsGetPrivateLinkResourcesSlot200Response extends HttpResponse {
  status: "200";
  body: PrivateLinkResourcesWrapperOutput;
}

/** Gets the private link resources */
export interface WebAppsGetPrivateLinkResourcesSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get list of processes for a web site, or a deployment slot, or for a specific scaled-out instance in a web site. */
export interface WebAppsListProcessesSlot200Response extends HttpResponse {
  status: "200";
  body: ProcessInfoCollectionOutput;
}

/** Get list of processes for a web site, or a deployment slot, or for a specific scaled-out instance in a web site. */
export interface WebAppsListProcessesSlot404Response extends HttpResponse {
  status: "404";
}

/** Get list of processes for a web site, or a deployment slot, or for a specific scaled-out instance in a web site. */
export interface WebAppsListProcessesSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get process information by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsGetProcessSlot200Response extends HttpResponse {
  status: "200";
  body: ProcessInfoOutput;
}

/** Get process information by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsGetProcessSlot404Response extends HttpResponse {
  status: "404";
}

/** Get process information by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsGetProcessSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Terminate a process by its ID for a web site, or a deployment slot, or specific scaled-out instance in a web site. */
export interface WebAppsDeleteProcessSlot204Response extends HttpResponse {
  status: "204";
}

/** Terminate a process by its ID for a web site, or a deployment slot, or specific scaled-out instance in a web site. */
export interface WebAppsDeleteProcessSlot404Response extends HttpResponse {
  status: "404";
}

/** Terminate a process by its ID for a web site, or a deployment slot, or specific scaled-out instance in a web site. */
export interface WebAppsDeleteProcessSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get a memory dump of a process by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsGetProcessDumpSlot200Response extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
}

/** Get a memory dump of a process by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsGetProcessDumpSlot404Response extends HttpResponse {
  status: "404";
}

/** Get a memory dump of a process by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsGetProcessDumpSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** List module information for a process by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsListProcessModulesSlot200Response extends HttpResponse {
  status: "200";
  body: ProcessModuleInfoCollectionOutput;
}

/** List module information for a process by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsListProcessModulesSlot404Response extends HttpResponse {
  status: "404";
}

/** List module information for a process by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsListProcessModulesSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get process information by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsGetProcessModuleSlot200Response extends HttpResponse {
  status: "200";
  body: ProcessModuleInfoOutput;
}

/** Get process information by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsGetProcessModuleSlot404Response extends HttpResponse {
  status: "404";
}

/** Get process information by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsGetProcessModuleSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** List the threads in a process by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsListProcessThreadsSlot200Response extends HttpResponse {
  status: "200";
  body: ProcessThreadInfoCollectionOutput;
}

/** List the threads in a process by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsListProcessThreadsSlot404Response extends HttpResponse {
  status: "404";
}

/** List the threads in a process by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsListProcessThreadsSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get public certificates for an app or a deployment slot. */
export interface WebAppsListPublicCertificatesSlot200Response extends HttpResponse {
  status: "200";
  body: PublicCertificateCollectionOutput;
}

/** Get public certificates for an app or a deployment slot. */
export interface WebAppsListPublicCertificatesSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get the named public certificate for an app (or deployment slot, if specified). */
export interface WebAppsGetPublicCertificateSlot200Response extends HttpResponse {
  status: "200";
  body: PublicCertificateOutput;
}

/** Get the named public certificate for an app (or deployment slot, if specified). */
export interface WebAppsGetPublicCertificateSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Creates a hostname binding for an app. */
export interface WebAppsCreateOrUpdatePublicCertificateSlot200Response extends HttpResponse {
  status: "200";
  body: PublicCertificateOutput;
}

/** Creates a hostname binding for an app. */
export interface WebAppsCreateOrUpdatePublicCertificateSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Deletes a hostname binding for an app. */
export interface WebAppsDeletePublicCertificateSlot200Response extends HttpResponse {
  status: "200";
}

/** Deletes a hostname binding for an app. */
export interface WebAppsDeletePublicCertificateSlot204Response extends HttpResponse {
  status: "204";
}

/** Deletes a hostname binding for an app. */
export interface WebAppsDeletePublicCertificateSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets the publishing profile for an app (or deployment slot, if specified). */
export interface WebAppsListPublishingProfileXmlWithSecretsSlot200Response extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
}

/** Gets the publishing profile for an app (or deployment slot, if specified). */
export interface WebAppsListPublishingProfileXmlWithSecretsSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Resets the configuration settings of the current slot if they were previously modified by calling the API with POST. */
export interface WebAppsResetSlotConfigurationSlot200Response extends HttpResponse {
  status: "200";
}

/** Resets the configuration settings of the current slot if they were previously modified by calling the API with POST. */
export interface WebAppsResetSlotConfigurationSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Restarts an app (or deployment slot, if specified). */
export interface WebAppsRestartSlot200Response extends HttpResponse {
  status: "200";
}

/** Restarts an app (or deployment slot, if specified). */
export interface WebAppsRestartSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Restores an app from a backup blob in Azure Storage. */
export interface WebAppsRestoreFromBackupBlobSlot200Response extends HttpResponse {
  status: "200";
}

/** Restores an app from a backup blob in Azure Storage. */
export interface WebAppsRestoreFromBackupBlobSlot202Response extends HttpResponse {
  status: "202";
}

/** Restores an app from a backup blob in Azure Storage. */
export interface WebAppsRestoreFromBackupBlobSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Restores a deleted web app to this web app. */
export interface WebAppsRestoreFromDeletedAppSlot200Response extends HttpResponse {
  status: "200";
}

/** Restores a deleted web app to this web app. */
export interface WebAppsRestoreFromDeletedAppSlot202Response extends HttpResponse {
  status: "202";
}

/** Restores a deleted web app to this web app. */
export interface WebAppsRestoreFromDeletedAppSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Restores a web app from a snapshot. */
export interface WebAppsRestoreSnapshotSlot200Response extends HttpResponse {
  status: "200";
}

/** Restores a web app from a snapshot. */
export interface WebAppsRestoreSnapshotSlot202Response extends HttpResponse {
  status: "202";
}

/** Restores a web app from a snapshot. */
export interface WebAppsRestoreSnapshotSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get list of siteextensions for a web site, or a deployment slot. */
export interface WebAppsListSiteExtensionsSlot200Response extends HttpResponse {
  status: "200";
  body: SiteExtensionInfoCollectionOutput;
}

/** Get list of siteextensions for a web site, or a deployment slot. */
export interface WebAppsListSiteExtensionsSlot404Response extends HttpResponse {
  status: "404";
}

/** Get list of siteextensions for a web site, or a deployment slot. */
export interface WebAppsListSiteExtensionsSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get site extension information by its ID for a web site, or a deployment slot. */
export interface WebAppsGetSiteExtensionSlot200Response extends HttpResponse {
  status: "200";
  body: SiteExtensionInfoOutput;
}

/** Get site extension information by its ID for a web site, or a deployment slot. */
export interface WebAppsGetSiteExtensionSlot404Response extends HttpResponse {
  status: "404";
}

/** Get site extension information by its ID for a web site, or a deployment slot. */
export interface WebAppsGetSiteExtensionSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Install site extension on a web site, or a deployment slot. */
export interface WebAppsInstallSiteExtensionSlot200Response extends HttpResponse {
  status: "200";
  body: SiteExtensionInfoOutput;
}

/** Install site extension on a web site, or a deployment slot. */
export interface WebAppsInstallSiteExtensionSlot201Response extends HttpResponse {
  status: "201";
  body: SiteExtensionInfoOutput;
}

/** Install site extension on a web site, or a deployment slot. */
export interface WebAppsInstallSiteExtensionSlot429Response extends HttpResponse {
  status: "429";
}

/** Install site extension on a web site, or a deployment slot. */
export interface WebAppsInstallSiteExtensionSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Remove a site extension from a web site, or a deployment slot. */
export interface WebAppsDeleteSiteExtensionSlot204Response extends HttpResponse {
  status: "204";
}

/** Remove a site extension from a web site, or a deployment slot. */
export interface WebAppsDeleteSiteExtensionSlot404Response extends HttpResponse {
  status: "404";
}

/** Remove a site extension from a web site, or a deployment slot. */
export interface WebAppsDeleteSiteExtensionSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get the difference in configuration settings between two web app slots. */
export interface WebAppsListSlotDifferencesSlot200Response extends HttpResponse {
  status: "200";
  body: SlotDifferenceCollectionOutput;
}

/** Get the difference in configuration settings between two web app slots. */
export interface WebAppsListSlotDifferencesSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Swaps two deployment slots of an app. */
export interface WebAppsSwapSlot200Response extends HttpResponse {
  status: "200";
}

/** Swaps two deployment slots of an app. */
export interface WebAppsSwapSlot202Response extends HttpResponse {
  status: "202";
}

/** Swaps two deployment slots of an app. */
export interface WebAppsSwapSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Returns all Snapshots to the user. */
export interface WebAppsListSnapshotsSlot200Response extends HttpResponse {
  status: "200";
  body: SnapshotCollectionOutput;
}

/** Returns all Snapshots to the user. */
export interface WebAppsListSnapshotsSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Returns all Snapshots to the user from DRSecondary endpoint. */
export interface WebAppsListSnapshotsFromDRSecondarySlot200Response extends HttpResponse {
  status: "200";
  body: SnapshotCollectionOutput;
}

/** Returns all Snapshots to the user from DRSecondary endpoint. */
export interface WebAppsListSnapshotsFromDRSecondarySlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets the source control configuration of an app. */
export interface WebAppsGetSourceControlSlot200Response extends HttpResponse {
  status: "200";
  body: SiteSourceControlOutput;
}

/** Gets the source control configuration of an app. */
export interface WebAppsGetSourceControlSlot201Response extends HttpResponse {
  status: "201";
  body: SiteSourceControlOutput;
}

/** Gets the source control configuration of an app. */
export interface WebAppsGetSourceControlSlot202Response extends HttpResponse {
  status: "202";
  body: SiteSourceControlOutput;
}

/** Gets the source control configuration of an app. */
export interface WebAppsGetSourceControlSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Updates the source control configuration of an app. */
export interface WebAppsCreateOrUpdateSourceControlSlot200Response extends HttpResponse {
  status: "200";
  body: SiteSourceControlOutput;
}

/** Updates the source control configuration of an app. */
export interface WebAppsCreateOrUpdateSourceControlSlot201Response extends HttpResponse {
  status: "201";
  body: SiteSourceControlOutput;
}

/** Updates the source control configuration of an app. */
export interface WebAppsCreateOrUpdateSourceControlSlot202Response extends HttpResponse {
  status: "202";
  body: SiteSourceControlOutput;
}

/** Updates the source control configuration of an app. */
export interface WebAppsCreateOrUpdateSourceControlSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Deletes the source control configuration of an app. */
export interface WebAppsDeleteSourceControlSlot200Response extends HttpResponse {
  status: "200";
}

/** Deletes the source control configuration of an app. */
export interface WebAppsDeleteSourceControlSlot202Response extends HttpResponse {
  status: "202";
}

/** Deletes the source control configuration of an app. */
export interface WebAppsDeleteSourceControlSlot404Response extends HttpResponse {
  status: "404";
}

/** Deletes the source control configuration of an app. */
export interface WebAppsDeleteSourceControlSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Updates the source control configuration of an app. */
export interface WebAppsUpdateSourceControlSlot200Response extends HttpResponse {
  status: "200";
  body: SiteSourceControlOutput;
}

/** Updates the source control configuration of an app. */
export interface WebAppsUpdateSourceControlSlot201Response extends HttpResponse {
  status: "201";
  body: SiteSourceControlOutput;
}

/** Updates the source control configuration of an app. */
export interface WebAppsUpdateSourceControlSlot202Response extends HttpResponse {
  status: "202";
  body: SiteSourceControlOutput;
}

/** Updates the source control configuration of an app. */
export interface WebAppsUpdateSourceControlSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Starts an app (or deployment slot, if specified). */
export interface WebAppsStartSlot200Response extends HttpResponse {
  status: "200";
}

/** Starts an app (or deployment slot, if specified). */
export interface WebAppsStartSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Start capturing network packets for the site. */
export interface WebAppsStartNetworkTraceSlot200Response extends HttpResponse {
  status: "200";
  body: Array<NetworkTraceOutput>;
}

/** Start capturing network packets for the site. */
export interface WebAppsStartNetworkTraceSlot202Response extends HttpResponse {
  status: "202";
  body: Array<NetworkTraceOutput>;
}

/** Start capturing network packets for the site. */
export interface WebAppsStartNetworkTraceSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Stops an app (or deployment slot, if specified). */
export interface WebAppsStopSlot200Response extends HttpResponse {
  status: "200";
}

/** Stops an app (or deployment slot, if specified). */
export interface WebAppsStopSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Stop ongoing capturing network packets for the site. */
export interface WebAppsStopNetworkTraceSlot200Response extends HttpResponse {
  status: "200";
}

/** Stop ongoing capturing network packets for the site. */
export interface WebAppsStopNetworkTraceSlot204Response extends HttpResponse {
  status: "204";
}

/** Stop ongoing capturing network packets for the site. */
export interface WebAppsStopNetworkTraceSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Sync web app repository. */
export interface WebAppsSyncRepositorySlot200Response extends HttpResponse {
  status: "200";
}

/** Sync web app repository. */
export interface WebAppsSyncRepositorySlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Syncs function trigger metadata to the management database */
export interface WebAppsSyncFunctionTriggersSlot204Response extends HttpResponse {
  status: "204";
}

/** Syncs function trigger metadata to the management database */
export interface WebAppsSyncFunctionTriggersSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** List triggered web jobs for an app, or a deployment slot. */
export interface WebAppsListTriggeredWebJobsSlot200Response extends HttpResponse {
  status: "200";
  body: TriggeredWebJobCollectionOutput;
}

/** List triggered web jobs for an app, or a deployment slot. */
export interface WebAppsListTriggeredWebJobsSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets a triggered web job by its ID for an app, or a deployment slot. */
export interface WebAppsGetTriggeredWebJobSlot200Response extends HttpResponse {
  status: "200";
  body: TriggeredWebJobOutput;
}

/** Gets a triggered web job by its ID for an app, or a deployment slot. */
export interface WebAppsGetTriggeredWebJobSlot404Response extends HttpResponse {
  status: "404";
}

/** Gets a triggered web job by its ID for an app, or a deployment slot. */
export interface WebAppsGetTriggeredWebJobSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Delete a triggered web job by its ID for an app, or a deployment slot. */
export interface WebAppsDeleteTriggeredWebJobSlot200Response extends HttpResponse {
  status: "200";
}

/** Delete a triggered web job by its ID for an app, or a deployment slot. */
export interface WebAppsDeleteTriggeredWebJobSlot204Response extends HttpResponse {
  status: "204";
}

/** Delete a triggered web job by its ID for an app, or a deployment slot. */
export interface WebAppsDeleteTriggeredWebJobSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** List a triggered web job's history for an app, or a deployment slot. */
export interface WebAppsListTriggeredWebJobHistorySlot200Response extends HttpResponse {
  status: "200";
  body: TriggeredJobHistoryCollectionOutput;
}

/** List a triggered web job's history for an app, or a deployment slot. */
export interface WebAppsListTriggeredWebJobHistorySlot404Response extends HttpResponse {
  status: "404";
}

/** List a triggered web job's history for an app, or a deployment slot. */
export interface WebAppsListTriggeredWebJobHistorySlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets a triggered web job's history by its ID for an app, , or a deployment slot. */
export interface WebAppsGetTriggeredWebJobHistorySlot200Response extends HttpResponse {
  status: "200";
  body: TriggeredJobHistoryOutput;
}

/** Gets a triggered web job's history by its ID for an app, , or a deployment slot. */
export interface WebAppsGetTriggeredWebJobHistorySlot404Response extends HttpResponse {
  status: "404";
}

/** Gets a triggered web job's history by its ID for an app, , or a deployment slot. */
export interface WebAppsGetTriggeredWebJobHistorySlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Run a triggered web job for an app, or a deployment slot. */
export interface WebAppsRunTriggeredWebJobSlot200Response extends HttpResponse {
  status: "200";
}

/** Run a triggered web job for an app, or a deployment slot. */
export interface WebAppsRunTriggeredWebJobSlot404Response extends HttpResponse {
  status: "404";
}

/** Run a triggered web job for an app, or a deployment slot. */
export interface WebAppsRunTriggeredWebJobSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets the quota usage information of an app (or deployment slot, if specified). */
export interface WebAppsListUsagesSlot200Response extends HttpResponse {
  status: "200";
  body: CsmUsageQuotaCollectionOutput;
}

/** Gets the quota usage information of an app (or deployment slot, if specified). */
export interface WebAppsListUsagesSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets the virtual networks the app (or deployment slot) is connected to. */
export interface WebAppsListVnetConnectionsSlot200Response extends HttpResponse {
  status: "200";
  body: Array<VnetInfoResourceOutput>;
}

/** Gets the virtual networks the app (or deployment slot) is connected to. */
export interface WebAppsListVnetConnectionsSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets a virtual network the app (or deployment slot) is connected to by name. */
export interface WebAppsGetVnetConnectionSlot200Response extends HttpResponse {
  status: "200";
  body: VnetInfoResourceOutput;
}

/** Gets a virtual network the app (or deployment slot) is connected to by name. */
export interface WebAppsGetVnetConnectionSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Adds a Virtual Network connection to an app or slot (PUT) or updates the connection properties (PATCH). */
export interface WebAppsCreateOrUpdateVnetConnectionSlot200Response extends HttpResponse {
  status: "200";
  body: VnetInfoResourceOutput;
}

/** Adds a Virtual Network connection to an app or slot (PUT) or updates the connection properties (PATCH). */
export interface WebAppsCreateOrUpdateVnetConnectionSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Deletes a connection from an app (or deployment slot to a named virtual network. */
export interface WebAppsDeleteVnetConnectionSlot200Response extends HttpResponse {
  status: "200";
}

/** Deletes a connection from an app (or deployment slot to a named virtual network. */
export interface WebAppsDeleteVnetConnectionSlot404Response extends HttpResponse {
  status: "404";
}

/** Deletes a connection from an app (or deployment slot to a named virtual network. */
export interface WebAppsDeleteVnetConnectionSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Adds a Virtual Network connection to an app or slot (PUT) or updates the connection properties (PATCH). */
export interface WebAppsUpdateVnetConnectionSlot200Response extends HttpResponse {
  status: "200";
  body: VnetInfoResourceOutput;
}

/** Adds a Virtual Network connection to an app or slot (PUT) or updates the connection properties (PATCH). */
export interface WebAppsUpdateVnetConnectionSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets an app's Virtual Network gateway. */
export interface WebAppsGetVnetConnectionGatewaySlot200Response extends HttpResponse {
  status: "200";
  body: VnetGatewayOutput;
}

/** Gets an app's Virtual Network gateway. */
export interface WebAppsGetVnetConnectionGatewaySlot404Response extends HttpResponse {
  status: "404";
}

/** Gets an app's Virtual Network gateway. */
export interface WebAppsGetVnetConnectionGatewaySlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Adds a gateway to a connected Virtual Network (PUT) or updates it (PATCH). */
export interface WebAppsCreateOrUpdateVnetConnectionGatewaySlot200Response extends HttpResponse {
  status: "200";
  body: VnetGatewayOutput;
}

/** Adds a gateway to a connected Virtual Network (PUT) or updates it (PATCH). */
export interface WebAppsCreateOrUpdateVnetConnectionGatewaySlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Adds a gateway to a connected Virtual Network (PUT) or updates it (PATCH). */
export interface WebAppsUpdateVnetConnectionGatewaySlot200Response extends HttpResponse {
  status: "200";
  body: VnetGatewayOutput;
}

/** Adds a gateway to a connected Virtual Network (PUT) or updates it (PATCH). */
export interface WebAppsUpdateVnetConnectionGatewaySlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** List webjobs for an app, or a deployment slot. */
export interface WebAppsListWebJobsSlot200Response extends HttpResponse {
  status: "200";
  body: WebJobCollectionOutput;
}

/** List webjobs for an app, or a deployment slot. */
export interface WebAppsListWebJobsSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get webjob information for an app, or a deployment slot. */
export interface WebAppsGetWebJobSlot200Response extends HttpResponse {
  status: "200";
  body: WebJobOutput;
}

/** Get webjob information for an app, or a deployment slot. */
export interface WebAppsGetWebJobSlotDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get the difference in configuration settings between two web app slots. */
export interface WebAppsListSlotDifferencesFromProduction200Response extends HttpResponse {
  status: "200";
  body: SlotDifferenceCollectionOutput;
}

/** Get the difference in configuration settings between two web app slots. */
export interface WebAppsListSlotDifferencesFromProductionDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Swaps two deployment slots of an app. */
export interface WebAppsSwapSlotWithProduction200Response extends HttpResponse {
  status: "200";
}

/** Swaps two deployment slots of an app. */
export interface WebAppsSwapSlotWithProduction202Response extends HttpResponse {
  status: "202";
}

/** Swaps two deployment slots of an app. */
export interface WebAppsSwapSlotWithProductionDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Returns all Snapshots to the user. */
export interface WebAppsListSnapshots200Response extends HttpResponse {
  status: "200";
  body: SnapshotCollectionOutput;
}

/** Returns all Snapshots to the user. */
export interface WebAppsListSnapshotsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Returns all Snapshots to the user from DRSecondary endpoint. */
export interface WebAppsListSnapshotsFromDRSecondary200Response extends HttpResponse {
  status: "200";
  body: SnapshotCollectionOutput;
}

/** Returns all Snapshots to the user from DRSecondary endpoint. */
export interface WebAppsListSnapshotsFromDRSecondaryDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets the source control configuration of an app. */
export interface WebAppsGetSourceControl200Response extends HttpResponse {
  status: "200";
  body: SiteSourceControlOutput;
}

/** Gets the source control configuration of an app. */
export interface WebAppsGetSourceControl201Response extends HttpResponse {
  status: "201";
  body: SiteSourceControlOutput;
}

/** Gets the source control configuration of an app. */
export interface WebAppsGetSourceControl202Response extends HttpResponse {
  status: "202";
  body: SiteSourceControlOutput;
}

/** Gets the source control configuration of an app. */
export interface WebAppsGetSourceControlDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Updates the source control configuration of an app. */
export interface WebAppsCreateOrUpdateSourceControl200Response extends HttpResponse {
  status: "200";
  body: SiteSourceControlOutput;
}

/** Updates the source control configuration of an app. */
export interface WebAppsCreateOrUpdateSourceControl201Response extends HttpResponse {
  status: "201";
  body: SiteSourceControlOutput;
}

/** Updates the source control configuration of an app. */
export interface WebAppsCreateOrUpdateSourceControl202Response extends HttpResponse {
  status: "202";
  body: SiteSourceControlOutput;
}

/** Updates the source control configuration of an app. */
export interface WebAppsCreateOrUpdateSourceControlDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Deletes the source control configuration of an app. */
export interface WebAppsDeleteSourceControl200Response extends HttpResponse {
  status: "200";
}

/** Deletes the source control configuration of an app. */
export interface WebAppsDeleteSourceControl202Response extends HttpResponse {
  status: "202";
}

/** Deletes the source control configuration of an app. */
export interface WebAppsDeleteSourceControl404Response extends HttpResponse {
  status: "404";
}

/** Deletes the source control configuration of an app. */
export interface WebAppsDeleteSourceControlDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Updates the source control configuration of an app. */
export interface WebAppsUpdateSourceControl200Response extends HttpResponse {
  status: "200";
  body: SiteSourceControlOutput;
}

/** Updates the source control configuration of an app. */
export interface WebAppsUpdateSourceControl201Response extends HttpResponse {
  status: "201";
  body: SiteSourceControlOutput;
}

/** Updates the source control configuration of an app. */
export interface WebAppsUpdateSourceControl202Response extends HttpResponse {
  status: "202";
  body: SiteSourceControlOutput;
}

/** Updates the source control configuration of an app. */
export interface WebAppsUpdateSourceControlDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Starts an app (or deployment slot, if specified). */
export interface WebAppsStart200Response extends HttpResponse {
  status: "200";
}

/** Starts an app (or deployment slot, if specified). */
export interface WebAppsStartDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Start capturing network packets for the site. */
export interface WebAppsStartNetworkTrace200Response extends HttpResponse {
  status: "200";
  body: Array<NetworkTraceOutput>;
}

/** Start capturing network packets for the site. */
export interface WebAppsStartNetworkTrace202Response extends HttpResponse {
  status: "202";
  body: Array<NetworkTraceOutput>;
}

/** Start capturing network packets for the site. */
export interface WebAppsStartNetworkTraceDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Stops an app (or deployment slot, if specified). */
export interface WebAppsStop200Response extends HttpResponse {
  status: "200";
}

/** Stops an app (or deployment slot, if specified). */
export interface WebAppsStopDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Stop ongoing capturing network packets for the site. */
export interface WebAppsStopNetworkTrace200Response extends HttpResponse {
  status: "200";
}

/** Stop ongoing capturing network packets for the site. */
export interface WebAppsStopNetworkTrace204Response extends HttpResponse {
  status: "204";
}

/** Stop ongoing capturing network packets for the site. */
export interface WebAppsStopNetworkTraceDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Sync web app repository. */
export interface WebAppsSyncRepository200Response extends HttpResponse {
  status: "200";
}

/** Sync web app repository. */
export interface WebAppsSyncRepositoryDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Syncs function trigger metadata to the management database */
export interface WebAppsSyncFunctionTriggers204Response extends HttpResponse {
  status: "204";
}

/** Syncs function trigger metadata to the management database */
export interface WebAppsSyncFunctionTriggersDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** List triggered web jobs for an app, or a deployment slot. */
export interface WebAppsListTriggeredWebJobs200Response extends HttpResponse {
  status: "200";
  body: TriggeredWebJobCollectionOutput;
}

/** List triggered web jobs for an app, or a deployment slot. */
export interface WebAppsListTriggeredWebJobsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets a triggered web job by its ID for an app, or a deployment slot. */
export interface WebAppsGetTriggeredWebJob200Response extends HttpResponse {
  status: "200";
  body: TriggeredWebJobOutput;
}

/** Gets a triggered web job by its ID for an app, or a deployment slot. */
export interface WebAppsGetTriggeredWebJob404Response extends HttpResponse {
  status: "404";
}

/** Gets a triggered web job by its ID for an app, or a deployment slot. */
export interface WebAppsGetTriggeredWebJobDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Delete a triggered web job by its ID for an app, or a deployment slot. */
export interface WebAppsDeleteTriggeredWebJob200Response extends HttpResponse {
  status: "200";
}

/** Delete a triggered web job by its ID for an app, or a deployment slot. */
export interface WebAppsDeleteTriggeredWebJob204Response extends HttpResponse {
  status: "204";
}

/** Delete a triggered web job by its ID for an app, or a deployment slot. */
export interface WebAppsDeleteTriggeredWebJobDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** List a triggered web job's history for an app, or a deployment slot. */
export interface WebAppsListTriggeredWebJobHistory200Response extends HttpResponse {
  status: "200";
  body: TriggeredJobHistoryCollectionOutput;
}

/** List a triggered web job's history for an app, or a deployment slot. */
export interface WebAppsListTriggeredWebJobHistory404Response extends HttpResponse {
  status: "404";
}

/** List a triggered web job's history for an app, or a deployment slot. */
export interface WebAppsListTriggeredWebJobHistoryDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets a triggered web job's history by its ID for an app, , or a deployment slot. */
export interface WebAppsGetTriggeredWebJobHistory200Response extends HttpResponse {
  status: "200";
  body: TriggeredJobHistoryOutput;
}

/** Gets a triggered web job's history by its ID for an app, , or a deployment slot. */
export interface WebAppsGetTriggeredWebJobHistory404Response extends HttpResponse {
  status: "404";
}

/** Gets a triggered web job's history by its ID for an app, , or a deployment slot. */
export interface WebAppsGetTriggeredWebJobHistoryDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Run a triggered web job for an app, or a deployment slot. */
export interface WebAppsRunTriggeredWebJob200Response extends HttpResponse {
  status: "200";
}

/** Run a triggered web job for an app, or a deployment slot. */
export interface WebAppsRunTriggeredWebJob404Response extends HttpResponse {
  status: "404";
}

/** Run a triggered web job for an app, or a deployment slot. */
export interface WebAppsRunTriggeredWebJobDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets the quota usage information of an app (or deployment slot, if specified). */
export interface WebAppsListUsages200Response extends HttpResponse {
  status: "200";
  body: CsmUsageQuotaCollectionOutput;
}

/** Gets the quota usage information of an app (or deployment slot, if specified). */
export interface WebAppsListUsagesDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets the virtual networks the app (or deployment slot) is connected to. */
export interface WebAppsListVnetConnections200Response extends HttpResponse {
  status: "200";
  body: Array<VnetInfoResourceOutput>;
}

/** Gets the virtual networks the app (or deployment slot) is connected to. */
export interface WebAppsListVnetConnectionsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets a virtual network the app (or deployment slot) is connected to by name. */
export interface WebAppsGetVnetConnection200Response extends HttpResponse {
  status: "200";
  body: VnetInfoResourceOutput;
}

/** Gets a virtual network the app (or deployment slot) is connected to by name. */
export interface WebAppsGetVnetConnectionDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Adds a Virtual Network connection to an app or slot (PUT) or updates the connection properties (PATCH). */
export interface WebAppsCreateOrUpdateVnetConnection200Response extends HttpResponse {
  status: "200";
  body: VnetInfoResourceOutput;
}

/** Adds a Virtual Network connection to an app or slot (PUT) or updates the connection properties (PATCH). */
export interface WebAppsCreateOrUpdateVnetConnectionDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Deletes a connection from an app (or deployment slot to a named virtual network. */
export interface WebAppsDeleteVnetConnection200Response extends HttpResponse {
  status: "200";
}

/** Deletes a connection from an app (or deployment slot to a named virtual network. */
export interface WebAppsDeleteVnetConnection404Response extends HttpResponse {
  status: "404";
}

/** Deletes a connection from an app (or deployment slot to a named virtual network. */
export interface WebAppsDeleteVnetConnectionDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Adds a Virtual Network connection to an app or slot (PUT) or updates the connection properties (PATCH). */
export interface WebAppsUpdateVnetConnection200Response extends HttpResponse {
  status: "200";
  body: VnetInfoResourceOutput;
}

/** Adds a Virtual Network connection to an app or slot (PUT) or updates the connection properties (PATCH). */
export interface WebAppsUpdateVnetConnectionDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Gets an app's Virtual Network gateway. */
export interface WebAppsGetVnetConnectionGateway200Response extends HttpResponse {
  status: "200";
  body: VnetGatewayOutput;
}

/** Gets an app's Virtual Network gateway. */
export interface WebAppsGetVnetConnectionGateway404Response extends HttpResponse {
  status: "404";
}

/** Gets an app's Virtual Network gateway. */
export interface WebAppsGetVnetConnectionGatewayDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Adds a gateway to a connected Virtual Network (PUT) or updates it (PATCH). */
export interface WebAppsCreateOrUpdateVnetConnectionGateway200Response extends HttpResponse {
  status: "200";
  body: VnetGatewayOutput;
}

/** Adds a gateway to a connected Virtual Network (PUT) or updates it (PATCH). */
export interface WebAppsCreateOrUpdateVnetConnectionGatewayDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Adds a gateway to a connected Virtual Network (PUT) or updates it (PATCH). */
export interface WebAppsUpdateVnetConnectionGateway200Response extends HttpResponse {
  status: "200";
  body: VnetGatewayOutput;
}

/** Adds a gateway to a connected Virtual Network (PUT) or updates it (PATCH). */
export interface WebAppsUpdateVnetConnectionGatewayDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** List webjobs for an app, or a deployment slot. */
export interface WebAppsListWebJobs200Response extends HttpResponse {
  status: "200";
  body: WebJobCollectionOutput;
}

/** List webjobs for an app, or a deployment slot. */
export interface WebAppsListWebJobsDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}

/** Get webjob information for an app, or a deployment slot. */
export interface WebAppsGetWebJob200Response extends HttpResponse {
  status: "200";
  body: WebJobOutput;
}

/** Get webjob information for an app, or a deployment slot. */
export interface WebAppsGetWebJobDefaultResponse extends HttpResponse {
  status: string;
  body: DefaultErrorResponseOutput;
}
