// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpResponse } from "@azure-rest/core-client";
import {
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
} from "./outputModels";

/** List all certificate orders in a subscription. */
export interface AppServiceCertificateOrdersList200Response extends HttpResponse {
  status: "200";
  body: AppServiceCertificateOrderCollectionOutput;
}

/** List all certificate orders in a subscription. */
export interface AppServiceCertificateOrdersListdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Validate information for a certificate order. */
export interface AppServiceCertificateOrdersValidatePurchaseInformation204Response
  extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Validate information for a certificate order. */
export interface AppServiceCertificateOrdersValidatePurchaseInformationdefaultResponse
  extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get certificate orders in a resource group. */
export interface AppServiceCertificateOrdersListByResourceGroup200Response extends HttpResponse {
  status: "200";
  body: AppServiceCertificateOrderCollectionOutput;
}

/** Get certificate orders in a resource group. */
export interface AppServiceCertificateOrdersListByResourceGroupdefaultResponse
  extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get a certificate order. */
export interface AppServiceCertificateOrdersGet200Response extends HttpResponse {
  status: "200";
  body: AppServiceCertificateOrderOutput;
}

/** Get a certificate order. */
export interface AppServiceCertificateOrdersGetdefaultResponse extends HttpResponse {
  status: "500";
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
export interface AppServiceCertificateOrdersCreateOrUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Delete an existing certificate order. */
export interface AppServiceCertificateOrdersDelete200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Delete an existing certificate order. */
export interface AppServiceCertificateOrdersDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete an existing certificate order. */
export interface AppServiceCertificateOrdersDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Create or update a certificate purchase order. */
export interface AppServiceCertificateOrdersUpdate200Response extends HttpResponse {
  status: "200";
  body: AppServiceCertificateOrderOutput;
}

/** Create or update a certificate purchase order. */
export interface AppServiceCertificateOrdersUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** List all certificates associated with a certificate order. */
export interface AppServiceCertificateOrdersListCertificates200Response extends HttpResponse {
  status: "200";
  body: AppServiceCertificateCollectionOutput;
}

/** List all certificates associated with a certificate order. */
export interface AppServiceCertificateOrdersListCertificatesdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get the certificate associated with a certificate order. */
export interface AppServiceCertificateOrdersGetCertificate200Response extends HttpResponse {
  status: "200";
  body: AppServiceCertificateResourceOutput;
}

/** Get the certificate associated with a certificate order. */
export interface AppServiceCertificateOrdersGetCertificatedefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Creates or updates a certificate and associates with key vault secret. */
export interface AppServiceCertificateOrdersCreateOrUpdateCertificate200Response
  extends HttpResponse {
  status: "200";
  body: AppServiceCertificateResourceOutput;
}

/** Creates or updates a certificate and associates with key vault secret. */
export interface AppServiceCertificateOrdersCreateOrUpdateCertificate201Response
  extends HttpResponse {
  status: "201";
  body: AppServiceCertificateResourceOutput;
}

/** Creates or updates a certificate and associates with key vault secret. */
export interface AppServiceCertificateOrdersCreateOrUpdateCertificatedefaultResponse
  extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Delete the certificate associated with a certificate order. */
export interface AppServiceCertificateOrdersDeleteCertificate200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Delete the certificate associated with a certificate order. */
export interface AppServiceCertificateOrdersDeleteCertificate204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete the certificate associated with a certificate order. */
export interface AppServiceCertificateOrdersDeleteCertificatedefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Creates or updates a certificate and associates with key vault secret. */
export interface AppServiceCertificateOrdersUpdateCertificate200Response extends HttpResponse {
  status: "200";
  body: AppServiceCertificateResourceOutput;
}

/** Creates or updates a certificate and associates with key vault secret. */
export interface AppServiceCertificateOrdersUpdateCertificatedefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Reissue an existing certificate order. */
export interface AppServiceCertificateOrdersReissue204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Reissue an existing certificate order. */
export interface AppServiceCertificateOrdersReissuedefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Renew an existing certificate order. */
export interface AppServiceCertificateOrdersRenew204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Renew an existing certificate order. */
export interface AppServiceCertificateOrdersRenewdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Resend certificate email. */
export interface AppServiceCertificateOrdersResendEmail204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Resend certificate email. */
export interface AppServiceCertificateOrdersResendEmaildefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Resend domain verification ownership email containing steps on how to verify a domain for a given certificate order */
export interface AppServiceCertificateOrdersResendRequestEmails204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Resend domain verification ownership email containing steps on how to verify a domain for a given certificate order */
export interface AppServiceCertificateOrdersResendRequestEmailsdefaultResponse
  extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** This method is used to obtain the site seal information for an issued certificate. A site seal is a graphic that the certificate purchaser can embed on their web site to show their visitors information about their SSL certificate. If a web site visitor clicks on the site seal image, a pop-up page is displayed that contains detailed information about the SSL certificate. The site seal token is used to link the site seal graphic image to the appropriate certificate details pop-up page display when a user clicks on the site seal. The site seal images are expected to be static images and hosted by the reseller, to minimize delays for customer page load times. */
export interface AppServiceCertificateOrdersRetrieveSiteSeal200Response extends HttpResponse {
  status: "200";
  body: SiteSealOutput;
}

/** This method is used to obtain the site seal information for an issued certificate. A site seal is a graphic that the certificate purchaser can embed on their web site to show their visitors information about their SSL certificate. If a web site visitor clicks on the site seal image, a pop-up page is displayed that contains detailed information about the SSL certificate. The site seal token is used to link the site seal graphic image to the appropriate certificate details pop-up page display when a user clicks on the site seal. The site seal images are expected to be static images and hosted by the reseller, to minimize delays for customer page load times. */
export interface AppServiceCertificateOrdersRetrieveSiteSealdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Verify domain ownership for this certificate order. */
export interface AppServiceCertificateOrdersVerifyDomainOwnership204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Verify domain ownership for this certificate order. */
export interface AppServiceCertificateOrdersVerifyDomainOwnershipdefaultResponse
  extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Retrieve the list of certificate actions. */
export interface AppServiceCertificateOrdersRetrieveCertificateActions200Response
  extends HttpResponse {
  status: "200";
  body: Array<CertificateOrderActionOutput>;
}

/** Retrieve the list of certificate actions. */
export interface AppServiceCertificateOrdersRetrieveCertificateActionsdefaultResponse
  extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Retrieve email history. */
export interface AppServiceCertificateOrdersRetrieveCertificateEmailHistory200Response
  extends HttpResponse {
  status: "200";
  body: Array<CertificateEmailOutput>;
}

/** Retrieve email history. */
export interface AppServiceCertificateOrdersRetrieveCertificateEmailHistorydefaultResponse
  extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Microsoft.CertificateRegistration to get the list of detectors for this RP. */
export interface CertificateOrdersDiagnosticsListAppServiceCertificateOrderDetectorResponse200Response
  extends HttpResponse {
  status: "200";
  body: DetectorResponseCollectionOutput;
}

/** Microsoft.CertificateRegistration to get the list of detectors for this RP. */
export interface CertificateOrdersDiagnosticsListAppServiceCertificateOrderDetectorResponsedefaultResponse
  extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Microsoft.CertificateRegistration call to get a detector response from App Lens. */
export interface CertificateOrdersDiagnosticsGetAppServiceCertificateOrderDetectorResponse200Response
  extends HttpResponse {
  status: "200";
  body: DetectorResponseOutput;
}

/** Microsoft.CertificateRegistration call to get a detector response from App Lens. */
export interface CertificateOrdersDiagnosticsGetAppServiceCertificateOrderDetectorResponsedefaultResponse
  extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Implements Csm operations Api to exposes the list of available Csm Apis under the resource provider */
export interface CertificateRegistrationProviderListOperations200Response extends HttpResponse {
  status: "200";
  body: CsmOperationCollectionOutput;
}

/** Implements Csm operations Api to exposes the list of available Csm Apis under the resource provider */
export interface CertificateRegistrationProviderListOperationsdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Check if a domain is available for registration. */
export interface DomainsCheckAvailability200Response extends HttpResponse {
  status: "200";
  body: DomainAvailabilityCheckResultOutput;
}

/** Check if a domain is available for registration. */
export interface DomainsCheckAvailabilitydefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get all domains in a subscription. */
export interface DomainsList200Response extends HttpResponse {
  status: "200";
  body: DomainCollectionOutput;
}

/** Get all domains in a subscription. */
export interface DomainsListdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Generate a single sign-on request for the domain management portal. */
export interface DomainsGetControlCenterSsoRequest200Response extends HttpResponse {
  status: "200";
  body: DomainControlCenterSsoRequestOutput;
}

/** Generate a single sign-on request for the domain management portal. */
export interface DomainsGetControlCenterSsoRequestdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get domain name recommendations based on keywords. */
export interface DomainsListRecommendations200Response extends HttpResponse {
  status: "200";
  body: NameIdentifierCollectionOutput;
}

/** Get domain name recommendations based on keywords. */
export interface DomainsListRecommendationsdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get all domains in a resource group. */
export interface DomainsListByResourceGroup200Response extends HttpResponse {
  status: "200";
  body: DomainCollectionOutput;
}

/** Get all domains in a resource group. */
export interface DomainsListByResourceGroupdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get a domain. */
export interface DomainsGet200Response extends HttpResponse {
  status: "200";
  body: DomainOutput;
}

/** Get a domain. */
export interface DomainsGetdefaultResponse extends HttpResponse {
  status: "500";
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
export interface DomainsCreateOrUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Delete a domain. */
export interface DomainsDelete200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Delete a domain. */
export interface DomainsDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete a domain. */
export interface DomainsDeletedefaultResponse extends HttpResponse {
  status: "500";
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
export interface DomainsUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Lists domain ownership identifiers. */
export interface DomainsListOwnershipIdentifiers200Response extends HttpResponse {
  status: "200";
  body: DomainOwnershipIdentifierCollectionOutput;
}

/** Lists domain ownership identifiers. */
export interface DomainsListOwnershipIdentifiersdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get ownership identifier for domain */
export interface DomainsGetOwnershipIdentifier200Response extends HttpResponse {
  status: "200";
  body: DomainOwnershipIdentifierOutput;
}

/** Get ownership identifier for domain */
export interface DomainsGetOwnershipIdentifierdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Creates an ownership identifier for a domain or updates identifier details for an existing identifier */
export interface DomainsCreateOrUpdateOwnershipIdentifier200Response extends HttpResponse {
  status: "200";
  body: DomainOwnershipIdentifierOutput;
}

/** Creates an ownership identifier for a domain or updates identifier details for an existing identifier */
export interface DomainsCreateOrUpdateOwnershipIdentifierdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Delete ownership identifier for domain */
export interface DomainsDeleteOwnershipIdentifier200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Delete ownership identifier for domain */
export interface DomainsDeleteOwnershipIdentifier204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete ownership identifier for domain */
export interface DomainsDeleteOwnershipIdentifierdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Creates an ownership identifier for a domain or updates identifier details for an existing identifier */
export interface DomainsUpdateOwnershipIdentifier200Response extends HttpResponse {
  status: "200";
  body: DomainOwnershipIdentifierOutput;
}

/** Creates an ownership identifier for a domain or updates identifier details for an existing identifier */
export interface DomainsUpdateOwnershipIdentifierdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Renew a domain. */
export interface DomainsRenew200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Renew a domain. */
export interface DomainsRenew202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Renew a domain. */
export interface DomainsRenew204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Renew a domain. */
export interface DomainsRenewdefaultResponse extends HttpResponse {
  status: "500";
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
  body: Record<string, unknown>;
}

/** Transfer out domain to another registrar */
export interface DomainsTransferOutdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get all top-level domains supported for registration. */
export interface TopLevelDomainsList200Response extends HttpResponse {
  status: "200";
  body: TopLevelDomainCollectionOutput;
}

/** Get all top-level domains supported for registration. */
export interface TopLevelDomainsListdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get details of a top-level domain. */
export interface TopLevelDomainsGet200Response extends HttpResponse {
  status: "200";
  body: TopLevelDomainOutput;
}

/** Get details of a top-level domain. */
export interface TopLevelDomainsGetdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets all legal agreements that user needs to accept before purchasing a domain. */
export interface TopLevelDomainsListAgreements200Response extends HttpResponse {
  status: "200";
  body: TldLegalAgreementCollectionOutput;
}

/** Gets all legal agreements that user needs to accept before purchasing a domain. */
export interface TopLevelDomainsListAgreementsdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Implements Csm operations Api to exposes the list of available Csm Apis under the resource provider */
export interface DomainRegistrationProviderListOperations200Response extends HttpResponse {
  status: "200";
  body: CsmOperationCollectionOutput;
}

/** Implements Csm operations Api to exposes the list of available Csm Apis under the resource provider */
export interface DomainRegistrationProviderListOperationsdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get all App Service Environments for a subscription. */
export interface AppServiceEnvironmentsList200Response extends HttpResponse {
  status: "200";
  body: AppServiceEnvironmentCollectionOutput;
}

/** Get all App Service Environments for a subscription. */
export interface AppServiceEnvironmentsListdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get all App Service Environments in a resource group. */
export interface AppServiceEnvironmentsListByResourceGroup200Response extends HttpResponse {
  status: "200";
  body: AppServiceEnvironmentCollectionOutput;
}

/** Get all App Service Environments in a resource group. */
export interface AppServiceEnvironmentsListByResourceGroupdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get the properties of an App Service Environment. */
export interface AppServiceEnvironmentsGet200Response extends HttpResponse {
  status: "200";
  body: AppServiceEnvironmentResourceOutput;
}

/** Get the properties of an App Service Environment. */
export interface AppServiceEnvironmentsGetdefaultResponse extends HttpResponse {
  status: "500";
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
export interface AppServiceEnvironmentsCreateOrUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Delete an App Service Environment. */
export interface AppServiceEnvironmentsDelete202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Delete an App Service Environment. */
export interface AppServiceEnvironmentsDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete an App Service Environment. */
export interface AppServiceEnvironmentsDeletedefaultResponse extends HttpResponse {
  status: "500";
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
export interface AppServiceEnvironmentsUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get the used, available, and total worker capacity an App Service Environment. */
export interface AppServiceEnvironmentsListCapacities200Response extends HttpResponse {
  status: "200";
  body: StampCapacityCollectionOutput;
}

/** Get the used, available, and total worker capacity an App Service Environment. */
export interface AppServiceEnvironmentsListCapacitiesdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get IP addresses assigned to an App Service Environment. */
export interface AppServiceEnvironmentsGetVipInfo200Response extends HttpResponse {
  status: "200";
  body: AddressResponseOutput;
}

/** Get IP addresses assigned to an App Service Environment. */
export interface AppServiceEnvironmentsGetVipInfodefaultResponse extends HttpResponse {
  status: "500";
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
export interface AppServiceEnvironmentsChangeVnetdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get networking configuration of an App Service Environment */
export interface AppServiceEnvironmentsGetAseV3NetworkingConfiguration200Response
  extends HttpResponse {
  status: "200";
  body: AseV3NetworkingConfigurationOutput;
}

/** Get networking configuration of an App Service Environment */
export interface AppServiceEnvironmentsGetAseV3NetworkingConfigurationdefaultResponse
  extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Update networking configuration of an App Service Environment */
export interface AppServiceEnvironmentsUpdateAseNetworkingConfiguration200Response
  extends HttpResponse {
  status: "200";
  body: AseV3NetworkingConfigurationOutput;
}

/** Update networking configuration of an App Service Environment */
export interface AppServiceEnvironmentsUpdateAseNetworkingConfigurationdefaultResponse
  extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get diagnostic information for an App Service Environment. */
export interface AppServiceEnvironmentsListDiagnostics200Response extends HttpResponse {
  status: "200";
  body: Array<HostingEnvironmentDiagnosticsOutput>;
}

/** Get diagnostic information for an App Service Environment. */
export interface AppServiceEnvironmentsListDiagnosticsdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get a diagnostics item for an App Service Environment. */
export interface AppServiceEnvironmentsGetDiagnosticsItem200Response extends HttpResponse {
  status: "200";
  body: HostingEnvironmentDiagnosticsOutput;
}

/** Get a diagnostics item for an App Service Environment. */
export interface AppServiceEnvironmentsGetDiagnosticsItemdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get the network endpoints of all inbound dependencies of an App Service Environment. */
export interface AppServiceEnvironmentsGetInboundNetworkDependenciesEndpoints200Response
  extends HttpResponse {
  status: "200";
  body: InboundEnvironmentEndpointCollectionOutput;
}

/** Get the network endpoints of all inbound dependencies of an App Service Environment. */
export interface AppServiceEnvironmentsGetInboundNetworkDependenciesEndpointsdefaultResponse
  extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get all multi-role pools. */
export interface AppServiceEnvironmentsListMultiRolePools200Response extends HttpResponse {
  status: "200";
  body: WorkerPoolCollectionOutput;
}

/** Get all multi-role pools. */
export interface AppServiceEnvironmentsListMultiRolePoolsdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get properties of a multi-role pool. */
export interface AppServiceEnvironmentsGetMultiRolePool200Response extends HttpResponse {
  status: "200";
  body: WorkerPoolResourceOutput;
}

/** Get properties of a multi-role pool. */
export interface AppServiceEnvironmentsGetMultiRolePooldefaultResponse extends HttpResponse {
  status: "500";
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
export interface AppServiceEnvironmentsCreateOrUpdateMultiRolePooldefaultResponse
  extends HttpResponse {
  status: "500";
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
export interface AppServiceEnvironmentsUpdateMultiRolePooldefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get metric definitions for a specific instance of a multi-role pool of an App Service Environment. */
export interface AppServiceEnvironmentsListMultiRolePoolInstanceMetricDefinitions200Response
  extends HttpResponse {
  status: "200";
  body: ResourceMetricDefinitionCollectionOutput;
}

/** Get metric definitions for a specific instance of a multi-role pool of an App Service Environment. */
export interface AppServiceEnvironmentsListMultiRolePoolInstanceMetricDefinitionsdefaultResponse
  extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get metric definitions for a multi-role pool of an App Service Environment. */
export interface AppServiceEnvironmentsListMultiRoleMetricDefinitions200Response
  extends HttpResponse {
  status: "200";
  body: ResourceMetricDefinitionCollectionOutput;
}

/** Get metric definitions for a multi-role pool of an App Service Environment. */
export interface AppServiceEnvironmentsListMultiRoleMetricDefinitionsdefaultResponse
  extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get available SKUs for scaling a multi-role pool. */
export interface AppServiceEnvironmentsListMultiRolePoolSkus200Response extends HttpResponse {
  status: "200";
  body: SkuInfoCollectionOutput;
}

/** Get available SKUs for scaling a multi-role pool. */
export interface AppServiceEnvironmentsListMultiRolePoolSkusdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get usage metrics for a multi-role pool of an App Service Environment. */
export interface AppServiceEnvironmentsListMultiRoleUsages200Response extends HttpResponse {
  status: "200";
  body: UsageCollectionOutput;
}

/** Get usage metrics for a multi-role pool of an App Service Environment. */
export interface AppServiceEnvironmentsListMultiRoleUsagesdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** List all currently running operations on the App Service Environment. */
export interface AppServiceEnvironmentsListOperations200Response extends HttpResponse {
  status: "200";
  body: Array<OperationOutput>;
}

/** List all currently running operations on the App Service Environment. */
export interface AppServiceEnvironmentsListOperationsdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get the network endpoints of all outbound dependencies of an App Service Environment. */
export interface AppServiceEnvironmentsGetOutboundNetworkDependenciesEndpoints200Response
  extends HttpResponse {
  status: "200";
  body: OutboundEnvironmentEndpointCollectionOutput;
}

/** Get the network endpoints of all outbound dependencies of an App Service Environment. */
export interface AppServiceEnvironmentsGetOutboundNetworkDependenciesEndpointsdefaultResponse
  extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets the list of private endpoints associated with a hosting environment */
export interface AppServiceEnvironmentsGetPrivateEndpointConnectionList200Response
  extends HttpResponse {
  status: "200";
  body: PrivateEndpointConnectionCollectionOutput;
}

/** Gets the list of private endpoints associated with a hosting environment */
export interface AppServiceEnvironmentsGetPrivateEndpointConnectionListdefaultResponse
  extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets a private endpoint connection */
export interface AppServiceEnvironmentsGetPrivateEndpointConnection200Response
  extends HttpResponse {
  status: "200";
  body: RemotePrivateEndpointConnectionARMResourceOutput;
}

/** Gets a private endpoint connection */
export interface AppServiceEnvironmentsGetPrivateEndpointConnectiondefaultResponse
  extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Approves or rejects a private endpoint connection */
export interface AppServiceEnvironmentsApproveOrRejectPrivateEndpointConnection200Response
  extends HttpResponse {
  status: "200";
  body: RemotePrivateEndpointConnectionARMResourceOutput;
}

/** Approves or rejects a private endpoint connection */
export interface AppServiceEnvironmentsApproveOrRejectPrivateEndpointConnection202Response
  extends HttpResponse {
  status: "202";
  body: RemotePrivateEndpointConnectionARMResourceOutput;
}

/** Approves or rejects a private endpoint connection */
export interface AppServiceEnvironmentsApproveOrRejectPrivateEndpointConnectiondefaultResponse
  extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Deletes a private endpoint connection */
export interface AppServiceEnvironmentsDeletePrivateEndpointConnection200Response
  extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Deletes a private endpoint connection */
export interface AppServiceEnvironmentsDeletePrivateEndpointConnection202Response
  extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Deletes a private endpoint connection */
export interface AppServiceEnvironmentsDeletePrivateEndpointConnection204Response
  extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Deletes a private endpoint connection */
export interface AppServiceEnvironmentsDeletePrivateEndpointConnectiondefaultResponse
  extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets the private link resources */
export interface AppServiceEnvironmentsGetPrivateLinkResources200Response extends HttpResponse {
  status: "200";
  body: PrivateLinkResourcesWrapperOutput;
}

/** Gets the private link resources */
export interface AppServiceEnvironmentsGetPrivateLinkResourcesdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Reboot all machines in an App Service Environment. */
export interface AppServiceEnvironmentsReboot202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Reboot all machines in an App Service Environment. */
export interface AppServiceEnvironmentsRebootdefaultResponse extends HttpResponse {
  status: "500";
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
export interface AppServiceEnvironmentsResumedefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get all App Service plans in an App Service Environment. */
export interface AppServiceEnvironmentsListAppServicePlans200Response extends HttpResponse {
  status: "200";
  body: AppServicePlanCollectionOutput;
}

/** Get all App Service plans in an App Service Environment. */
export interface AppServiceEnvironmentsListAppServicePlansdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get all apps in an App Service Environment. */
export interface AppServiceEnvironmentsListWebApps200Response extends HttpResponse {
  status: "200";
  body: WebAppCollectionOutput;
}

/** Get all apps in an App Service Environment. */
export interface AppServiceEnvironmentsListWebAppsdefaultResponse extends HttpResponse {
  status: "500";
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
export interface AppServiceEnvironmentsSuspenddefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get global usage metrics of an App Service Environment. */
export interface AppServiceEnvironmentsListUsages200Response extends HttpResponse {
  status: "200";
  body: CsmUsageQuotaCollectionOutput;
}

/** Get global usage metrics of an App Service Environment. */
export interface AppServiceEnvironmentsListUsagesdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get all worker pools of an App Service Environment. */
export interface AppServiceEnvironmentsListWorkerPools200Response extends HttpResponse {
  status: "200";
  body: WorkerPoolCollectionOutput;
}

/** Get all worker pools of an App Service Environment. */
export interface AppServiceEnvironmentsListWorkerPoolsdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get properties of a worker pool. */
export interface AppServiceEnvironmentsGetWorkerPool200Response extends HttpResponse {
  status: "200";
  body: WorkerPoolResourceOutput;
}

/** Get properties of a worker pool. */
export interface AppServiceEnvironmentsGetWorkerPooldefaultResponse extends HttpResponse {
  status: "500";
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
export interface AppServiceEnvironmentsCreateOrUpdateWorkerPooldefaultResponse
  extends HttpResponse {
  status: "500";
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
export interface AppServiceEnvironmentsUpdateWorkerPooldefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get metric definitions for a specific instance of a worker pool of an App Service Environment. */
export interface AppServiceEnvironmentsListWorkerPoolInstanceMetricDefinitions200Response
  extends HttpResponse {
  status: "200";
  body: ResourceMetricDefinitionCollectionOutput;
}

/** Get metric definitions for a specific instance of a worker pool of an App Service Environment. */
export interface AppServiceEnvironmentsListWorkerPoolInstanceMetricDefinitionsdefaultResponse
  extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get metric definitions for a worker pool of an App Service Environment. */
export interface AppServiceEnvironmentsListWebWorkerMetricDefinitions200Response
  extends HttpResponse {
  status: "200";
  body: ResourceMetricDefinitionCollectionOutput;
}

/** Get metric definitions for a worker pool of an App Service Environment. */
export interface AppServiceEnvironmentsListWebWorkerMetricDefinitionsdefaultResponse
  extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get available SKUs for scaling a worker pool. */
export interface AppServiceEnvironmentsListWorkerPoolSkus200Response extends HttpResponse {
  status: "200";
  body: SkuInfoCollectionOutput;
}

/** Get available SKUs for scaling a worker pool. */
export interface AppServiceEnvironmentsListWorkerPoolSkusdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get usage metrics for a worker pool of an App Service Environment. */
export interface AppServiceEnvironmentsListWebWorkerUsages200Response extends HttpResponse {
  status: "200";
  body: UsageCollectionOutput;
}

/** Get usage metrics for a worker pool of an App Service Environment. */
export interface AppServiceEnvironmentsListWebWorkerUsagesdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get all App Service plans for a subscription. */
export interface AppServicePlansList200Response extends HttpResponse {
  status: "200";
  body: AppServicePlanCollectionOutput;
}

/** Get all App Service plans for a subscription. */
export interface AppServicePlansListdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get all App Service plans in a resource group. */
export interface AppServicePlansListByResourceGroup200Response extends HttpResponse {
  status: "200";
  body: AppServicePlanCollectionOutput;
}

/** Get all App Service plans in a resource group. */
export interface AppServicePlansListByResourceGroupdefaultResponse extends HttpResponse {
  status: "500";
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
  body: Record<string, unknown>;
}

/** Get an App Service plan. */
export interface AppServicePlansGetdefaultResponse extends HttpResponse {
  status: "500";
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
export interface AppServicePlansCreateOrUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Delete an App Service plan. */
export interface AppServicePlansDelete200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Delete an App Service plan. */
export interface AppServicePlansDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete an App Service plan. */
export interface AppServicePlansDeletedefaultResponse extends HttpResponse {
  status: "500";
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
export interface AppServicePlansUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** List all capabilities of an App Service plan. */
export interface AppServicePlansListCapabilities200Response extends HttpResponse {
  status: "200";
  body: Array<CapabilityOutput>;
}

/** List all capabilities of an App Service plan. */
export interface AppServicePlansListCapabilitiesdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Retrieve a Hybrid Connection in use in an App Service plan. */
export interface AppServicePlansGetHybridConnection200Response extends HttpResponse {
  status: "200";
  body: HybridConnectionOutput;
}

/** Retrieve a Hybrid Connection in use in an App Service plan. */
export interface AppServicePlansGetHybridConnectiondefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Delete a Hybrid Connection in use in an App Service plan. */
export interface AppServicePlansDeleteHybridConnection200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Delete a Hybrid Connection in use in an App Service plan. */
export interface AppServicePlansDeleteHybridConnection204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete a Hybrid Connection in use in an App Service plan. */
export interface AppServicePlansDeleteHybridConnectiondefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get the send key name and value of a Hybrid Connection. */
export interface AppServicePlansListHybridConnectionKeys200Response extends HttpResponse {
  status: "200";
  body: HybridConnectionKeyOutput;
}

/** Get the send key name and value of a Hybrid Connection. */
export interface AppServicePlansListHybridConnectionKeysdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get all apps that use a Hybrid Connection in an App Service Plan. */
export interface AppServicePlansListWebAppsByHybridConnection200Response extends HttpResponse {
  status: "200";
  body: ResourceCollectionOutput;
}

/** Get all apps that use a Hybrid Connection in an App Service Plan. */
export interface AppServicePlansListWebAppsByHybridConnectiondefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get the maximum number of Hybrid Connections allowed in an App Service plan. */
export interface AppServicePlansGetHybridConnectionPlanLimit200Response extends HttpResponse {
  status: "200";
  body: HybridConnectionLimitsOutput;
}

/** Get the maximum number of Hybrid Connections allowed in an App Service plan. */
export interface AppServicePlansGetHybridConnectionPlanLimitdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Retrieve all Hybrid Connections in use in an App Service plan. */
export interface AppServicePlansListHybridConnections200Response extends HttpResponse {
  status: "200";
  body: HybridConnectionCollectionOutput;
}

/** Retrieve all Hybrid Connections in use in an App Service plan. */
export interface AppServicePlansListHybridConnectionsdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Restart all apps in an App Service plan. */
export interface AppServicePlansRestartWebApps204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Restart all apps in an App Service plan. */
export interface AppServicePlansRestartWebAppsdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get all apps associated with an App Service plan. */
export interface AppServicePlansListWebApps200Response extends HttpResponse {
  status: "200";
  body: WebAppCollectionOutput;
}

/** Get all apps associated with an App Service plan. */
export interface AppServicePlansListWebAppsdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets all selectable SKUs for a given App Service Plan */
export interface AppServicePlansGetServerFarmSkus200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Gets all selectable SKUs for a given App Service Plan */
export interface AppServicePlansGetServerFarmSkusdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets server farm usage information */
export interface AppServicePlansListUsages200Response extends HttpResponse {
  status: "200";
  body: CsmUsageQuotaCollectionOutput;
}

/** Gets server farm usage information */
export interface AppServicePlansListUsagesdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get all Virtual Networks associated with an App Service plan. */
export interface AppServicePlansListVnets200Response extends HttpResponse {
  status: "200";
  body: Array<VnetInfoResourceOutput>;
}

/** Get all Virtual Networks associated with an App Service plan. */
export interface AppServicePlansListVnetsdefaultResponse extends HttpResponse {
  status: "500";
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
  body: Record<string, unknown>;
}

/** Get a Virtual Network associated with an App Service plan. */
export interface AppServicePlansGetVnetFromServerFarmdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get a Virtual Network gateway. */
export interface AppServicePlansGetVnetGateway200Response extends HttpResponse {
  status: "200";
  body: VnetGatewayOutput;
}

/** Get a Virtual Network gateway. */
export interface AppServicePlansGetVnetGatewaydefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Update a Virtual Network gateway. */
export interface AppServicePlansUpdateVnetGateway200Response extends HttpResponse {
  status: "200";
  body: VnetGatewayOutput;
}

/** Update a Virtual Network gateway. */
export interface AppServicePlansUpdateVnetGatewaydefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get all routes that are associated with a Virtual Network in an App Service plan. */
export interface AppServicePlansListRoutesForVnet200Response extends HttpResponse {
  status: "200";
  body: Array<VnetRouteOutput>;
}

/** Get all routes that are associated with a Virtual Network in an App Service plan. */
export interface AppServicePlansListRoutesForVnetdefaultResponse extends HttpResponse {
  status: "500";
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
  body: Record<string, unknown>;
}

/** Get a Virtual Network route in an App Service plan. */
export interface AppServicePlansGetRouteForVnetdefaultResponse extends HttpResponse {
  status: "500";
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
  body: Record<string, unknown>;
}

/** Create or update a Virtual Network route in an App Service plan. */
export interface AppServicePlansCreateOrUpdateVnetRoute404Response extends HttpResponse {
  status: "404";
  body: Record<string, unknown>;
}

/** Create or update a Virtual Network route in an App Service plan. */
export interface AppServicePlansCreateOrUpdateVnetRoutedefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Delete a Virtual Network route in an App Service plan. */
export interface AppServicePlansDeleteVnetRoute200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Delete a Virtual Network route in an App Service plan. */
export interface AppServicePlansDeleteVnetRoute404Response extends HttpResponse {
  status: "404";
  body: Record<string, unknown>;
}

/** Delete a Virtual Network route in an App Service plan. */
export interface AppServicePlansDeleteVnetRoutedefaultResponse extends HttpResponse {
  status: "500";
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
  body: Record<string, unknown>;
}

/** Create or update a Virtual Network route in an App Service plan. */
export interface AppServicePlansUpdateVnetRoute404Response extends HttpResponse {
  status: "404";
  body: Record<string, unknown>;
}

/** Create or update a Virtual Network route in an App Service plan. */
export interface AppServicePlansUpdateVnetRoutedefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Reboot a worker machine in an App Service plan. */
export interface AppServicePlansRebootWorker204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Reboot a worker machine in an App Service plan. */
export interface AppServicePlansRebootWorkerdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get all certificates for a subscription. */
export interface CertificatesList200Response extends HttpResponse {
  status: "200";
  body: CertificateCollectionOutput;
}

/** Get all certificates for a subscription. */
export interface CertificatesListdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get all certificates in a resource group. */
export interface CertificatesListByResourceGroup200Response extends HttpResponse {
  status: "200";
  body: CertificateCollectionOutput;
}

/** Get all certificates in a resource group. */
export interface CertificatesListByResourceGroupdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get a certificate. */
export interface CertificatesGet200Response extends HttpResponse {
  status: "200";
  body: CertificateOutput;
}

/** Get a certificate. */
export interface CertificatesGetdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Create or update a certificate. */
export interface CertificatesCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: CertificateOutput;
}

/** Create or update a certificate. */
export interface CertificatesCreateOrUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Delete a certificate. */
export interface CertificatesDelete200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Delete a certificate. */
export interface CertificatesDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete a certificate. */
export interface CertificatesDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Create or update a certificate. */
export interface CertificatesUpdate200Response extends HttpResponse {
  status: "200";
  body: CertificateOutput;
}

/** Create or update a certificate. */
export interface CertificatesUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get the Container Apps in a given subscription. */
export interface ContainerAppsListBySubscription200Response extends HttpResponse {
  status: "200";
  body: ContainerAppCollectionOutput;
}

/** Get the Container Apps in a given subscription. */
export interface ContainerAppsListBySubscriptiondefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get the Container Apps in a given resource group. */
export interface ContainerAppsListByResourceGroup200Response extends HttpResponse {
  status: "200";
  body: ContainerAppCollectionOutput;
}

/** Get the Container Apps in a given resource group. */
export interface ContainerAppsListByResourceGroupdefaultResponse extends HttpResponse {
  status: "500";
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
  body: Record<string, unknown>;
}

/** Get the properties of a Container App. */
export interface ContainerAppsGetdefaultResponse extends HttpResponse {
  status: "500";
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
export interface ContainerAppsCreateOrUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Delete a Container App. */
export interface ContainerAppsDelete200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Delete a Container App. */
export interface ContainerAppsDelete202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Delete a Container App. */
export interface ContainerAppsDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete a Container App. */
export interface ContainerAppsDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** List secrets for a container app */
export interface ContainerAppsListSecrets200Response extends HttpResponse {
  status: "200";
  body: SecretsCollectionOutput;
}

/** List secrets for a container app */
export interface ContainerAppsListSecretsdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get the Revisions for a given Container App. */
export interface ContainerAppsRevisionsListRevisions200Response extends HttpResponse {
  status: "200";
  body: RevisionCollectionOutput;
}

/** Get the Revisions for a given Container App. */
export interface ContainerAppsRevisionsListRevisionsdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get a revision of a Container App. */
export interface ContainerAppsRevisionsGetRevision200Response extends HttpResponse {
  status: "200";
  body: RevisionOutput;
}

/** Get a revision of a Container App. */
export interface ContainerAppsRevisionsGetRevisiondefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Activates a revision for a Container App */
export interface ContainerAppsRevisionsActivateRevision200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Activates a revision for a Container App */
export interface ContainerAppsRevisionsActivateRevisiondefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Deactivates a revision for a Container App */
export interface ContainerAppsRevisionsDeactivateRevision200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Deactivates a revision for a Container App */
export interface ContainerAppsRevisionsDeactivateRevisiondefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Restarts a revision for a Container App */
export interface ContainerAppsRevisionsRestartRevision200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Restarts a revision for a Container App */
export interface ContainerAppsRevisionsRestartRevisiondefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get all deleted apps for a subscription. */
export interface DeletedWebAppsList200Response extends HttpResponse {
  status: "200";
  body: DeletedWebAppCollectionOutput;
}

/** Get all deleted apps for a subscription. */
export interface DeletedWebAppsListdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get all deleted apps for a subscription at location */
export interface DeletedWebAppsListByLocation200Response extends HttpResponse {
  status: "200";
  body: DeletedWebAppCollectionOutput;
}

/** Get all deleted apps for a subscription at location */
export interface DeletedWebAppsListByLocationdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get deleted app for a subscription at location. */
export interface DeletedWebAppsGetDeletedWebAppByLocation200Response extends HttpResponse {
  status: "200";
  body: DeletedSiteOutput;
}

/** Get deleted app for a subscription at location. */
export interface DeletedWebAppsGetDeletedWebAppByLocationdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** List Hosting Environment Detector Responses */
export interface DiagnosticsListHostingEnvironmentDetectorResponses200Response
  extends HttpResponse {
  status: "200";
  body: DetectorResponseCollectionOutput;
}

/** List Hosting Environment Detector Responses */
export interface DiagnosticsListHostingEnvironmentDetectorResponsesdefaultResponse
  extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get Hosting Environment Detector Response */
export interface DiagnosticsGetHostingEnvironmentDetectorResponse200Response extends HttpResponse {
  status: "200";
  body: DetectorResponseOutput;
}

/** Get Hosting Environment Detector Response */
export interface DiagnosticsGetHostingEnvironmentDetectorResponsedefaultResponse
  extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** List Site Detector Responses */
export interface DiagnosticsListSiteDetectorResponses200Response extends HttpResponse {
  status: "200";
  body: DetectorResponseCollectionOutput;
}

/** List Site Detector Responses */
export interface DiagnosticsListSiteDetectorResponsesdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get site detector response */
export interface DiagnosticsGetSiteDetectorResponse200Response extends HttpResponse {
  status: "200";
  body: DetectorResponseOutput;
}

/** Get site detector response */
export interface DiagnosticsGetSiteDetectorResponsedefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get Diagnostics Categories */
export interface DiagnosticsListSiteDiagnosticCategories200Response extends HttpResponse {
  status: "200";
  body: DiagnosticCategoryCollectionOutput;
}

/** Get Diagnostics Categories */
export interface DiagnosticsListSiteDiagnosticCategoriesdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get Diagnostics Category */
export interface DiagnosticsGetSiteDiagnosticCategory200Response extends HttpResponse {
  status: "200";
  body: DiagnosticCategoryOutput;
}

/** Get Diagnostics Category */
export interface DiagnosticsGetSiteDiagnosticCategorydefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get Site Analyses */
export interface DiagnosticsListSiteAnalyses200Response extends HttpResponse {
  status: "200";
  body: DiagnosticAnalysisCollectionOutput;
}

/** Get Site Analyses */
export interface DiagnosticsListSiteAnalysesdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get Site Analysis */
export interface DiagnosticsGetSiteAnalysis200Response extends HttpResponse {
  status: "200";
  body: AnalysisDefinitionOutput;
}

/** Get Site Analysis */
export interface DiagnosticsGetSiteAnalysisdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Execute Analysis */
export interface DiagnosticsExecuteSiteAnalysis200Response extends HttpResponse {
  status: "200";
  body: DiagnosticAnalysisOutput;
}

/** Execute Analysis */
export interface DiagnosticsExecuteSiteAnalysisdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get Detectors */
export interface DiagnosticsListSiteDetectors200Response extends HttpResponse {
  status: "200";
  body: DiagnosticDetectorCollectionOutput;
}

/** Get Detectors */
export interface DiagnosticsListSiteDetectorsdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get Detector */
export interface DiagnosticsGetSiteDetector200Response extends HttpResponse {
  status: "200";
  body: DetectorDefinitionResourceOutput;
}

/** Get Detector */
export interface DiagnosticsGetSiteDetectordefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Execute Detector */
export interface DiagnosticsExecuteSiteDetector200Response extends HttpResponse {
  status: "200";
  body: DiagnosticDetectorResponseOutput;
}

/** Execute Detector */
export interface DiagnosticsExecuteSiteDetectordefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** List Site Detector Responses */
export interface DiagnosticsListSiteDetectorResponsesSlot200Response extends HttpResponse {
  status: "200";
  body: DetectorResponseCollectionOutput;
}

/** List Site Detector Responses */
export interface DiagnosticsListSiteDetectorResponsesSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get site detector response */
export interface DiagnosticsGetSiteDetectorResponseSlot200Response extends HttpResponse {
  status: "200";
  body: DetectorResponseOutput;
}

/** Get site detector response */
export interface DiagnosticsGetSiteDetectorResponseSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get Diagnostics Categories */
export interface DiagnosticsListSiteDiagnosticCategoriesSlot200Response extends HttpResponse {
  status: "200";
  body: DiagnosticCategoryCollectionOutput;
}

/** Get Diagnostics Categories */
export interface DiagnosticsListSiteDiagnosticCategoriesSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get Diagnostics Category */
export interface DiagnosticsGetSiteDiagnosticCategorySlot200Response extends HttpResponse {
  status: "200";
  body: DiagnosticCategoryOutput;
}

/** Get Diagnostics Category */
export interface DiagnosticsGetSiteDiagnosticCategorySlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get Site Analyses */
export interface DiagnosticsListSiteAnalysesSlot200Response extends HttpResponse {
  status: "200";
  body: DiagnosticAnalysisCollectionOutput;
}

/** Get Site Analyses */
export interface DiagnosticsListSiteAnalysesSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get Site Analysis */
export interface DiagnosticsGetSiteAnalysisSlot200Response extends HttpResponse {
  status: "200";
  body: AnalysisDefinitionOutput;
}

/** Get Site Analysis */
export interface DiagnosticsGetSiteAnalysisSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Execute Analysis */
export interface DiagnosticsExecuteSiteAnalysisSlot200Response extends HttpResponse {
  status: "200";
  body: DiagnosticAnalysisOutput;
}

/** Execute Analysis */
export interface DiagnosticsExecuteSiteAnalysisSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get Detectors */
export interface DiagnosticsListSiteDetectorsSlot200Response extends HttpResponse {
  status: "200";
  body: DiagnosticDetectorCollectionOutput;
}

/** Get Detectors */
export interface DiagnosticsListSiteDetectorsSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get Detector */
export interface DiagnosticsGetSiteDetectorSlot200Response extends HttpResponse {
  status: "200";
  body: DetectorDefinitionResourceOutput;
}

/** Get Detector */
export interface DiagnosticsGetSiteDetectorSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Execute Detector */
export interface DiagnosticsExecuteSiteDetectorSlot200Response extends HttpResponse {
  status: "200";
  body: DiagnosticDetectorResponseOutput;
}

/** Execute Detector */
export interface DiagnosticsExecuteSiteDetectorSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get deleted app for a subscription. */
export interface GlobalGetDeletedWebApp200Response extends HttpResponse {
  status: "200";
  body: DeletedSiteOutput;
}

/** Get deleted app for a subscription. */
export interface GlobalGetDeletedWebAppdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get all deleted apps for a subscription. */
export interface GlobalGetDeletedWebAppSnapshots200Response extends HttpResponse {
  status: "200";
  body: Array<SnapshotOutput>;
}

/** Get all deleted apps for a subscription. */
export interface GlobalGetDeletedWebAppSnapshotsdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets an operation in a subscription and given region */
export interface GlobalGetSubscriptionOperationWithAsyncResponse204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Gets an operation in a subscription and given region */
export interface GlobalGetSubscriptionOperationWithAsyncResponsedefaultResponse
  extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get all Kubernetes Environments for a subscription. */
export interface KubeEnvironmentsListBySubscription200Response extends HttpResponse {
  status: "200";
  body: KubeEnvironmentCollectionOutput;
}

/** Get all Kubernetes Environments for a subscription. */
export interface KubeEnvironmentsListBySubscriptiondefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get all the Kubernetes Environments in a resource group. */
export interface KubeEnvironmentsListByResourceGroup200Response extends HttpResponse {
  status: "200";
  body: KubeEnvironmentCollectionOutput;
}

/** Get all the Kubernetes Environments in a resource group. */
export interface KubeEnvironmentsListByResourceGroupdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get the properties of a Kubernetes Environment. */
export interface KubeEnvironmentsGet200Response extends HttpResponse {
  status: "200";
  body: KubeEnvironmentOutput;
}

/** Get the properties of a Kubernetes Environment. */
export interface KubeEnvironmentsGetdefaultResponse extends HttpResponse {
  status: "500";
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
export interface KubeEnvironmentsCreateOrUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Delete a Kubernetes Environment. */
export interface KubeEnvironmentsDelete200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Delete a Kubernetes Environment. */
export interface KubeEnvironmentsDelete202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Delete a Kubernetes Environment. */
export interface KubeEnvironmentsDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete a Kubernetes Environment. */
export interface KubeEnvironmentsDeletedefaultResponse extends HttpResponse {
  status: "500";
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
export interface KubeEnvironmentsUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get available application frameworks and their versions */
export interface ProviderGetAvailableStacks200Response extends HttpResponse {
  status: "200";
  body: ApplicationStackCollectionOutput;
}

/** Get available application frameworks and their versions */
export interface ProviderGetAvailableStacksdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get available Function app frameworks and their versions */
export interface ProviderGetFunctionAppStacks200Response extends HttpResponse {
  status: "200";
  body: FunctionAppStackCollectionOutput;
}

/** Get available Function app frameworks and their versions */
export interface ProviderGetFunctionAppStacksdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get available Function app frameworks and their versions for location */
export interface ProviderGetFunctionAppStacksForLocation200Response extends HttpResponse {
  status: "200";
  body: FunctionAppStackCollectionOutput;
}

/** Get available Function app frameworks and their versions for location */
export interface ProviderGetFunctionAppStacksForLocationdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get available Web app frameworks and their versions for location */
export interface ProviderGetWebAppStacksForLocation200Response extends HttpResponse {
  status: "200";
  body: WebAppStackCollectionOutput;
}

/** Get available Web app frameworks and their versions for location */
export interface ProviderGetWebAppStacksForLocationdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets all available operations for the Microsoft.Web resource provider. Also exposes resource metric definitions */
export interface ProviderListOperations200Response extends HttpResponse {
  status: "200";
  body: CsmOperationCollectionOutput;
}

/** Gets all available operations for the Microsoft.Web resource provider. Also exposes resource metric definitions */
export interface ProviderListOperationsdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get available Web app frameworks and their versions */
export interface ProviderGetWebAppStacks200Response extends HttpResponse {
  status: "200";
  body: WebAppStackCollectionOutput;
}

/** Get available Web app frameworks and their versions */
export interface ProviderGetWebAppStacksdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get available application frameworks and their versions */
export interface ProviderGetAvailableStacksOnPrem200Response extends HttpResponse {
  status: "200";
  body: ApplicationStackCollectionOutput;
}

/** Get available application frameworks and their versions */
export interface ProviderGetAvailableStacksOnPremdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** List all recommendations for a subscription. */
export interface RecommendationsList200Response extends HttpResponse {
  status: "200";
  body: RecommendationCollectionOutput;
}

/** List all recommendations for a subscription. */
export interface RecommendationsListdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Reset all recommendation opt-out settings for a subscription. */
export interface RecommendationsResetAllFilters204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Reset all recommendation opt-out settings for a subscription. */
export interface RecommendationsResetAllFiltersdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Disables the specified rule so it will not apply to a subscription in the future. */
export interface RecommendationsDisableRecommendationForSubscription200Response
  extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Disables the specified rule so it will not apply to a subscription in the future. */
export interface RecommendationsDisableRecommendationForSubscriptiondefaultResponse
  extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get past recommendations for an app, optionally specified by the time range. */
export interface RecommendationsListHistoryForHostingEnvironment200Response extends HttpResponse {
  status: "200";
  body: RecommendationCollectionOutput;
}

/** Get past recommendations for an app, optionally specified by the time range. */
export interface RecommendationsListHistoryForHostingEnvironmentdefaultResponse
  extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get all recommendations for a hosting environment. */
export interface RecommendationsListRecommendedRulesForHostingEnvironment200Response
  extends HttpResponse {
  status: "200";
  body: RecommendationCollectionOutput;
}

/** Get all recommendations for a hosting environment. */
export interface RecommendationsListRecommendedRulesForHostingEnvironmentdefaultResponse
  extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Disable all recommendations for an app. */
export interface RecommendationsDisableAllForHostingEnvironment204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Disable all recommendations for an app. */
export interface RecommendationsDisableAllForHostingEnvironmentdefaultResponse
  extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Reset all recommendation opt-out settings for an app. */
export interface RecommendationsResetAllFiltersForHostingEnvironment204Response
  extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Reset all recommendation opt-out settings for an app. */
export interface RecommendationsResetAllFiltersForHostingEnvironmentdefaultResponse
  extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get a recommendation rule for an app. */
export interface RecommendationsGetRuleDetailsByHostingEnvironment200Response extends HttpResponse {
  status: "200";
  body: RecommendationRuleOutput;
}

/** Get a recommendation rule for an app. */
export interface RecommendationsGetRuleDetailsByHostingEnvironmentdefaultResponse
  extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Disables the specific rule for a web site permanently. */
export interface RecommendationsDisableRecommendationForHostingEnvironment200Response
  extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Disables the specific rule for a web site permanently. */
export interface RecommendationsDisableRecommendationForHostingEnvironmentdefaultResponse
  extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get past recommendations for an app, optionally specified by the time range. */
export interface RecommendationsListHistoryForWebApp200Response extends HttpResponse {
  status: "200";
  body: RecommendationCollectionOutput;
}

/** Get past recommendations for an app, optionally specified by the time range. */
export interface RecommendationsListHistoryForWebAppdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get all recommendations for an app. */
export interface RecommendationsListRecommendedRulesForWebApp200Response extends HttpResponse {
  status: "200";
  body: RecommendationCollectionOutput;
}

/** Get all recommendations for an app. */
export interface RecommendationsListRecommendedRulesForWebAppdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Disable all recommendations for an app. */
export interface RecommendationsDisableAllForWebApp204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Disable all recommendations for an app. */
export interface RecommendationsDisableAllForWebAppdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Reset all recommendation opt-out settings for an app. */
export interface RecommendationsResetAllFiltersForWebApp204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Reset all recommendation opt-out settings for an app. */
export interface RecommendationsResetAllFiltersForWebAppdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get a recommendation rule for an app. */
export interface RecommendationsGetRuleDetailsByWebApp200Response extends HttpResponse {
  status: "200";
  body: RecommendationRuleOutput;
}

/** Get a recommendation rule for an app. */
export interface RecommendationsGetRuleDetailsByWebAppdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Disables the specific rule for a web site permanently. */
export interface RecommendationsDisableRecommendationForSite200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Disables the specific rule for a web site permanently. */
export interface RecommendationsDisableRecommendationForSitedefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** List all ResourceHealthMetadata for all sites in the subscription. */
export interface ResourceHealthMetadataList200Response extends HttpResponse {
  status: "200";
  body: ResourceHealthMetadataCollectionOutput;
}

/** List all ResourceHealthMetadata for all sites in the subscription. */
export interface ResourceHealthMetadataListdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** List all ResourceHealthMetadata for all sites in the resource group in the subscription. */
export interface ResourceHealthMetadataListByResourceGroup200Response extends HttpResponse {
  status: "200";
  body: ResourceHealthMetadataCollectionOutput;
}

/** List all ResourceHealthMetadata for all sites in the resource group in the subscription. */
export interface ResourceHealthMetadataListByResourceGroupdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets the category of ResourceHealthMetadata to use for the given site as a collection */
export interface ResourceHealthMetadataListBySite200Response extends HttpResponse {
  status: "200";
  body: ResourceHealthMetadataCollectionOutput;
}

/** Gets the category of ResourceHealthMetadata to use for the given site as a collection */
export interface ResourceHealthMetadataListBySitedefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets the category of ResourceHealthMetadata to use for the given site */
export interface ResourceHealthMetadataGetBySite200Response extends HttpResponse {
  status: "200";
  body: ResourceHealthMetadataOutput;
}

/** Gets the category of ResourceHealthMetadata to use for the given site */
export interface ResourceHealthMetadataGetBySitedefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets the category of ResourceHealthMetadata to use for the given site as a collection */
export interface ResourceHealthMetadataListBySiteSlot200Response extends HttpResponse {
  status: "200";
  body: ResourceHealthMetadataCollectionOutput;
}

/** Gets the category of ResourceHealthMetadata to use for the given site as a collection */
export interface ResourceHealthMetadataListBySiteSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets the category of ResourceHealthMetadata to use for the given site */
export interface ResourceHealthMetadataGetBySiteSlot200Response extends HttpResponse {
  status: "200";
  body: ResourceHealthMetadataOutput;
}

/** Gets the category of ResourceHealthMetadata to use for the given site */
export interface ResourceHealthMetadataGetBySiteSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets publishing user */
export interface GetPublishingUser200Response extends HttpResponse {
  status: "200";
  body: UserOutput;
}

/** Gets publishing user */
export interface GetPublishingUserdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Updates publishing user */
export interface UpdatePublishingUser200Response extends HttpResponse {
  status: "200";
  body: UserOutput;
}

/** Updates publishing user */
export interface UpdatePublishingUserdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets the source controls available for Azure websites. */
export interface ListSourceControls200Response extends HttpResponse {
  status: "200";
  body: SourceControlCollectionOutput;
}

/** Gets the source controls available for Azure websites. */
export interface ListSourceControlsdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets source control token */
export interface GetSourceControl200Response extends HttpResponse {
  status: "200";
  body: SourceControlOutput;
}

/** Gets source control token */
export interface GetSourceControldefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Updates source control token */
export interface UpdateSourceControl200Response extends HttpResponse {
  status: "200";
  body: SourceControlOutput;
}

/** Updates source control token */
export interface UpdateSourceControldefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets a list of meters for a given location. */
export interface ListBillingMeters200Response extends HttpResponse {
  status: "200";
  body: BillingMeterCollectionOutput;
}

/** Gets a list of meters for a given location. */
export interface ListBillingMetersdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Check if a resource name is available. */
export interface CheckNameAvailability200Response extends HttpResponse {
  status: "200";
  body: ResourceNameAvailabilityOutput;
}

/** Check if a resource name is available. */
export interface CheckNameAvailabilitydefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get custom hostnames under this subscription */
export interface ListCustomHostNameSites200Response extends HttpResponse {
  status: "200";
  body: CustomHostnameSitesCollectionOutput;
}

/** Get custom hostnames under this subscription */
export interface ListCustomHostNameSitesdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets list of available geo regions plus ministamps */
export interface GetSubscriptionDeploymentLocations200Response extends HttpResponse {
  status: "200";
  body: DeploymentLocationsOutput;
}

/** Gets list of available geo regions plus ministamps */
export interface GetSubscriptionDeploymentLocationsdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get a list of available geographical regions. */
export interface ListGeoRegions200Response extends HttpResponse {
  status: "200";
  body: GeoRegionCollectionOutput;
}

/** Get a list of available geographical regions. */
export interface ListGeoRegionsdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** List all apps that are assigned to a hostname. */
export interface ListSiteIdentifiersAssignedToHostName200Response extends HttpResponse {
  status: "200";
  body: IdentifierCollectionOutput;
}

/** List all apps that are assigned to a hostname. */
export interface ListSiteIdentifiersAssignedToHostNamedefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** List all premier add-on offers. */
export interface ListPremierAddOnOffers200Response extends HttpResponse {
  status: "200";
  body: PremierAddOnOfferCollectionOutput;
}

/** List all premier add-on offers. */
export interface ListPremierAddOnOffersdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** List all SKUs. */
export interface ListSkus200Response extends HttpResponse {
  status: "200";
  body: SkuInfosOutput;
}

/** List all SKUs. */
export interface ListSkusdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Verifies if this VNET is compatible with an App Service Environment by analyzing the Network Security Group rules. */
export interface VerifyHostingEnvironmentVnet200Response extends HttpResponse {
  status: "200";
  body: VnetValidationFailureDetailsOutput;
}

/** Verifies if this VNET is compatible with an App Service Environment by analyzing the Network Security Group rules. */
export interface VerifyHostingEnvironmentVnetdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Move resources between resource groups. */
export interface Move204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Move resources between resource groups. */
export interface MovedefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Validate if a resource can be created. */
export interface Validate200Response extends HttpResponse {
  status: "200";
  body: ValidateResponseOutput;
}

/** Validate if a resource can be created. */
export interface ValidatedefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Validate whether a resource can be moved. */
export interface ValidateMove204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Validate whether a resource can be moved. */
export interface ValidateMovedefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Generates a preview workflow file for the static site */
export interface StaticSitesPreviewWorkflow200Response extends HttpResponse {
  status: "200";
  body: StaticSitesWorkflowPreviewOutput;
}

/** Generates a preview workflow file for the static site */
export interface StaticSitesPreviewWorkflowdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get all Static Sites for a subscription. */
export interface StaticSitesList200Response extends HttpResponse {
  status: "200";
  body: StaticSiteCollectionOutput;
}

/** Get all Static Sites for a subscription. */
export interface StaticSitesListdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets all static sites in the specified resource group. */
export interface StaticSitesGetStaticSitesByResourceGroup200Response extends HttpResponse {
  status: "200";
  body: StaticSiteCollectionOutput;
}

/** Gets all static sites in the specified resource group. */
export interface StaticSitesGetStaticSitesByResourceGroupdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets the details of a static site. */
export interface StaticSitesGetStaticSite200Response extends HttpResponse {
  status: "200";
  body: StaticSiteARMResourceOutput;
}

/** Gets the details of a static site. */
export interface StaticSitesGetStaticSitedefaultResponse extends HttpResponse {
  status: "500";
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
export interface StaticSitesCreateOrUpdateStaticSitedefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Deletes a static site. */
export interface StaticSitesDeleteStaticSite200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Deletes a static site. */
export interface StaticSitesDeleteStaticSite202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Deletes a static site. */
export interface StaticSitesDeleteStaticSitedefaultResponse extends HttpResponse {
  status: "500";
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
export interface StaticSitesUpdateStaticSitedefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets the list of users of a static site. */
export interface StaticSitesListStaticSiteUsers200Response extends HttpResponse {
  status: "200";
  body: StaticSiteUserCollectionOutput;
}

/** Gets the list of users of a static site. */
export interface StaticSitesListStaticSiteUsersdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Deletes the user entry from the static site. */
export interface StaticSitesDeleteStaticSiteUser200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Deletes the user entry from the static site. */
export interface StaticSitesDeleteStaticSiteUserdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Updates a user entry with the listed roles */
export interface StaticSitesUpdateStaticSiteUser200Response extends HttpResponse {
  status: "200";
  body: StaticSiteUserARMResourceOutput;
}

/** Updates a user entry with the listed roles */
export interface StaticSitesUpdateStaticSiteUserdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets all static site builds for a particular static site. */
export interface StaticSitesGetStaticSiteBuilds200Response extends HttpResponse {
  status: "200";
  body: StaticSiteBuildCollectionOutput;
}

/** Gets all static site builds for a particular static site. */
export interface StaticSitesGetStaticSiteBuildsdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets the details of a static site build. */
export interface StaticSitesGetStaticSiteBuild200Response extends HttpResponse {
  status: "200";
  body: StaticSiteBuildARMResourceOutput;
}

/** Gets the details of a static site build. */
export interface StaticSitesGetStaticSiteBuilddefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Deletes a static site build. */
export interface StaticSitesDeleteStaticSiteBuild200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Deletes a static site build. */
export interface StaticSitesDeleteStaticSiteBuild202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Deletes a static site build. */
export interface StaticSitesDeleteStaticSiteBuild204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Deletes a static site build. */
export interface StaticSitesDeleteStaticSiteBuilddefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Creates or updates the app settings of a static site build. */
export interface StaticSitesCreateOrUpdateStaticSiteBuildAppSettings200Response
  extends HttpResponse {
  status: "200";
  body: StringDictionaryOutput;
}

/** Creates or updates the app settings of a static site build. */
export interface StaticSitesCreateOrUpdateStaticSiteBuildAppSettingsdefaultResponse
  extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Creates or updates the function app settings of a static site build. */
export interface StaticSitesCreateOrUpdateStaticSiteBuildFunctionAppSettings200Response
  extends HttpResponse {
  status: "200";
  body: StringDictionaryOutput;
}

/** Creates or updates the function app settings of a static site build. */
export interface StaticSitesCreateOrUpdateStaticSiteBuildFunctionAppSettingsdefaultResponse
  extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets the functions of a particular static site build. */
export interface StaticSitesListStaticSiteBuildFunctions200Response extends HttpResponse {
  status: "200";
  body: StaticSiteFunctionOverviewCollectionOutput;
}

/** Gets the functions of a particular static site build. */
export interface StaticSitesListStaticSiteBuildFunctionsdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets the application settings of a static site build. */
export interface StaticSitesListStaticSiteBuildAppSettings200Response extends HttpResponse {
  status: "200";
  body: StringDictionaryOutput;
}

/** Gets the application settings of a static site build. */
export interface StaticSitesListStaticSiteBuildAppSettingsdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets the application settings of a static site build. */
export interface StaticSitesListStaticSiteBuildFunctionAppSettings200Response extends HttpResponse {
  status: "200";
  body: StringDictionaryOutput;
}

/** Gets the application settings of a static site build. */
export interface StaticSitesListStaticSiteBuildFunctionAppSettingsdefaultResponse
  extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets the details of the user provided function apps registered with a static site build */
export interface StaticSitesGetUserProvidedFunctionAppsForStaticSiteBuild200Response
  extends HttpResponse {
  status: "200";
  body: StaticSiteUserProvidedFunctionAppsCollectionOutput;
}

/** Gets the details of the user provided function apps registered with a static site build */
export interface StaticSitesGetUserProvidedFunctionAppsForStaticSiteBuilddefaultResponse
  extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets the details of the user provided function app registered with a static site build */
export interface StaticSitesGetUserProvidedFunctionAppForStaticSiteBuild200Response
  extends HttpResponse {
  status: "200";
  body: StaticSiteUserProvidedFunctionAppARMResourceOutput;
}

/** Gets the details of the user provided function app registered with a static site build */
export interface StaticSitesGetUserProvidedFunctionAppForStaticSiteBuilddefaultResponse
  extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Register a user provided function app with a static site build */
export interface StaticSitesRegisterUserProvidedFunctionAppWithStaticSiteBuild200Response
  extends HttpResponse {
  status: "200";
  body: StaticSiteUserProvidedFunctionAppARMResourceOutput;
}

/** Register a user provided function app with a static site build */
export interface StaticSitesRegisterUserProvidedFunctionAppWithStaticSiteBuild202Response
  extends HttpResponse {
  status: "202";
  body: StaticSiteUserProvidedFunctionAppARMResourceOutput;
}

/** Register a user provided function app with a static site build */
export interface StaticSitesRegisterUserProvidedFunctionAppWithStaticSiteBuilddefaultResponse
  extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Detach the user provided function app from the static site build */
export interface StaticSitesDetachUserProvidedFunctionAppFromStaticSiteBuild200Response
  extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Detach the user provided function app from the static site build */
export interface StaticSitesDetachUserProvidedFunctionAppFromStaticSiteBuild204Response
  extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Detach the user provided function app from the static site build */
export interface StaticSitesDetachUserProvidedFunctionAppFromStaticSiteBuilddefaultResponse
  extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Deploys zipped content to a specific environment of a static site. */
export interface StaticSitesCreateZipDeploymentForStaticSiteBuild200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Deploys zipped content to a specific environment of a static site. */
export interface StaticSitesCreateZipDeploymentForStaticSiteBuild202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Deploys zipped content to a specific environment of a static site. */
export interface StaticSitesCreateZipDeploymentForStaticSiteBuilddefaultResponse
  extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Creates or updates the app settings of a static site. */
export interface StaticSitesCreateOrUpdateStaticSiteAppSettings200Response extends HttpResponse {
  status: "200";
  body: StringDictionaryOutput;
}

/** Creates or updates the app settings of a static site. */
export interface StaticSitesCreateOrUpdateStaticSiteAppSettingsdefaultResponse
  extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Creates or updates the function app settings of a static site. */
export interface StaticSitesCreateOrUpdateStaticSiteFunctionAppSettings200Response
  extends HttpResponse {
  status: "200";
  body: StringDictionaryOutput;
}

/** Creates or updates the function app settings of a static site. */
export interface StaticSitesCreateOrUpdateStaticSiteFunctionAppSettingsdefaultResponse
  extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Creates an invitation link for a user with the role */
export interface StaticSitesCreateUserRolesInvitationLink200Response extends HttpResponse {
  status: "200";
  body: StaticSiteUserInvitationResponseResourceOutput;
}

/** Creates an invitation link for a user with the role */
export interface StaticSitesCreateUserRolesInvitationLinkdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets all static site custom domains for a particular static site. */
export interface StaticSitesListStaticSiteCustomDomains200Response extends HttpResponse {
  status: "200";
  body: StaticSiteCustomDomainOverviewCollectionOutput;
}

/** Gets all static site custom domains for a particular static site. */
export interface StaticSitesListStaticSiteCustomDomainsdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets an existing custom domain for a particular static site. */
export interface StaticSitesGetStaticSiteCustomDomain200Response extends HttpResponse {
  status: "200";
  body: StaticSiteCustomDomainOverviewARMResourceOutput;
}

/** Gets an existing custom domain for a particular static site. */
export interface StaticSitesGetStaticSiteCustomDomaindefaultResponse extends HttpResponse {
  status: "500";
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
export interface StaticSitesCreateOrUpdateStaticSiteCustomDomaindefaultResponse
  extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Deletes a custom domain. */
export interface StaticSitesDeleteStaticSiteCustomDomain200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Deletes a custom domain. */
export interface StaticSitesDeleteStaticSiteCustomDomain202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Deletes a custom domain. */
export interface StaticSitesDeleteStaticSiteCustomDomaindefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Validates a particular custom domain can be added to a static site. */
export interface StaticSitesValidateCustomDomainCanBeAddedToStaticSite200Response
  extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Validates a particular custom domain can be added to a static site. */
export interface StaticSitesValidateCustomDomainCanBeAddedToStaticSite202Response
  extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Validates a particular custom domain can be added to a static site. */
export interface StaticSitesValidateCustomDomainCanBeAddedToStaticSitedefaultResponse
  extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Detaches a static site. */
export interface StaticSitesDetachStaticSite200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Detaches a static site. */
export interface StaticSitesDetachStaticSite202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Detaches a static site. */
export interface StaticSitesDetachStaticSitedefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets the functions of a static site. */
export interface StaticSitesListStaticSiteFunctions200Response extends HttpResponse {
  status: "200";
  body: StaticSiteFunctionOverviewCollectionOutput;
}

/** Gets the functions of a static site. */
export interface StaticSitesListStaticSiteFunctionsdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets the application settings of a static site. */
export interface StaticSitesListStaticSiteAppSettings200Response extends HttpResponse {
  status: "200";
  body: StringDictionaryOutput;
}

/** Gets the application settings of a static site. */
export interface StaticSitesListStaticSiteAppSettingsdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Lists the roles configured for the static site. */
export interface StaticSitesListStaticSiteConfiguredRoles200Response extends HttpResponse {
  status: "200";
  body: StringListOutput;
}

/** Lists the roles configured for the static site. */
export interface StaticSitesListStaticSiteConfiguredRolesdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets the application settings of a static site. */
export interface StaticSitesListStaticSiteFunctionAppSettings200Response extends HttpResponse {
  status: "200";
  body: StringDictionaryOutput;
}

/** Gets the application settings of a static site. */
export interface StaticSitesListStaticSiteFunctionAppSettingsdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Lists the secrets for an existing static site. */
export interface StaticSitesListStaticSiteSecrets200Response extends HttpResponse {
  status: "200";
  body: StringDictionaryOutput;
}

/** Lists the secrets for an existing static site. */
export interface StaticSitesListStaticSiteSecretsdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets the list of private endpoint connections associated with a static site */
export interface StaticSitesGetPrivateEndpointConnectionList200Response extends HttpResponse {
  status: "200";
  body: PrivateEndpointConnectionCollectionOutput;
}

/** Gets the list of private endpoint connections associated with a static site */
export interface StaticSitesGetPrivateEndpointConnectionListdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets a private endpoint connection */
export interface StaticSitesGetPrivateEndpointConnection200Response extends HttpResponse {
  status: "200";
  body: RemotePrivateEndpointConnectionARMResourceOutput;
}

/** Gets a private endpoint connection */
export interface StaticSitesGetPrivateEndpointConnectiondefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Approves or rejects a private endpoint connection */
export interface StaticSitesApproveOrRejectPrivateEndpointConnection200Response
  extends HttpResponse {
  status: "200";
  body: RemotePrivateEndpointConnectionARMResourceOutput;
}

/** Approves or rejects a private endpoint connection */
export interface StaticSitesApproveOrRejectPrivateEndpointConnection202Response
  extends HttpResponse {
  status: "202";
  body: RemotePrivateEndpointConnectionARMResourceOutput;
}

/** Approves or rejects a private endpoint connection */
export interface StaticSitesApproveOrRejectPrivateEndpointConnectiondefaultResponse
  extends HttpResponse {
  status: "500";
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
export interface StaticSitesDeletePrivateEndpointConnectiondefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets the private link resources */
export interface StaticSitesGetPrivateLinkResources200Response extends HttpResponse {
  status: "200";
  body: PrivateLinkResourcesWrapperOutput;
}

/** Gets the private link resources */
export interface StaticSitesGetPrivateLinkResourcesdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Resets the api key for an existing static site. */
export interface StaticSitesResetStaticSiteApiKey200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Resets the api key for an existing static site. */
export interface StaticSitesResetStaticSiteApiKeydefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets the details of the user provided function apps registered with a static site */
export interface StaticSitesGetUserProvidedFunctionAppsForStaticSite200Response
  extends HttpResponse {
  status: "200";
  body: StaticSiteUserProvidedFunctionAppsCollectionOutput;
}

/** Gets the details of the user provided function apps registered with a static site */
export interface StaticSitesGetUserProvidedFunctionAppsForStaticSitedefaultResponse
  extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets the details of the user provided function app registered with a static site */
export interface StaticSitesGetUserProvidedFunctionAppForStaticSite200Response
  extends HttpResponse {
  status: "200";
  body: StaticSiteUserProvidedFunctionAppARMResourceOutput;
}

/** Gets the details of the user provided function app registered with a static site */
export interface StaticSitesGetUserProvidedFunctionAppForStaticSitedefaultResponse
  extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Register a user provided function app with a static site */
export interface StaticSitesRegisterUserProvidedFunctionAppWithStaticSite200Response
  extends HttpResponse {
  status: "200";
  body: StaticSiteUserProvidedFunctionAppARMResourceOutput;
}

/** Register a user provided function app with a static site */
export interface StaticSitesRegisterUserProvidedFunctionAppWithStaticSite202Response
  extends HttpResponse {
  status: "202";
  body: StaticSiteUserProvidedFunctionAppARMResourceOutput;
}

/** Register a user provided function app with a static site */
export interface StaticSitesRegisterUserProvidedFunctionAppWithStaticSitedefaultResponse
  extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Detach the user provided function app from the static site */
export interface StaticSitesDetachUserProvidedFunctionAppFromStaticSite200Response
  extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Detach the user provided function app from the static site */
export interface StaticSitesDetachUserProvidedFunctionAppFromStaticSite204Response
  extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Detach the user provided function app from the static site */
export interface StaticSitesDetachUserProvidedFunctionAppFromStaticSitedefaultResponse
  extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Deploys zipped content to a static site. */
export interface StaticSitesCreateZipDeploymentForStaticSite200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Deploys zipped content to a static site. */
export interface StaticSitesCreateZipDeploymentForStaticSite202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Deploys zipped content to a static site. */
export interface StaticSitesCreateZipDeploymentForStaticSitedefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get all apps for a subscription. */
export interface WebAppsList200Response extends HttpResponse {
  status: "200";
  body: WebAppCollectionOutput;
}

/** Get all apps for a subscription. */
export interface WebAppsListdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets all web, mobile, and API apps in the specified resource group. */
export interface WebAppsListByResourceGroup200Response extends HttpResponse {
  status: "200";
  body: WebAppCollectionOutput;
}

/** Gets all web, mobile, and API apps in the specified resource group. */
export interface WebAppsListByResourceGroupdefaultResponse extends HttpResponse {
  status: "500";
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
  body: Record<string, unknown>;
}

/** Gets the details of a web, mobile, or API app. */
export interface WebAppsGetdefaultResponse extends HttpResponse {
  status: "500";
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
export interface WebAppsCreateOrUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Deletes a web, mobile, or API app, or one of the deployment slots. */
export interface WebAppsDelete200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Deletes a web, mobile, or API app, or one of the deployment slots. */
export interface WebAppsDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Deletes a web, mobile, or API app, or one of the deployment slots. */
export interface WebAppsDelete404Response extends HttpResponse {
  status: "404";
  body: Record<string, unknown>;
}

/** Deletes a web, mobile, or API app, or one of the deployment slots. */
export interface WebAppsDeletedefaultResponse extends HttpResponse {
  status: "500";
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
export interface WebAppsUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Analyze a custom hostname. */
export interface WebAppsAnalyzeCustomHostname200Response extends HttpResponse {
  status: "200";
  body: CustomHostnameAnalysisResultOutput;
}

/** Analyze a custom hostname. */
export interface WebAppsAnalyzeCustomHostnamedefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Applies the configuration settings from the target slot onto the current slot. */
export interface WebAppsApplySlotConfigToProduction200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Applies the configuration settings from the target slot onto the current slot. */
export interface WebAppsApplySlotConfigToProductiondefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Creates a backup of an app. */
export interface WebAppsBackup200Response extends HttpResponse {
  status: "200";
  body: BackupItemOutput;
}

/** Creates a backup of an app. */
export interface WebAppsBackupdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets existing backups of an app. */
export interface WebAppsListBackups200Response extends HttpResponse {
  status: "200";
  body: BackupItemCollectionOutput;
}

/** Gets existing backups of an app. */
export interface WebAppsListBackupsdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets a backup of an app by its ID. */
export interface WebAppsGetBackupStatus200Response extends HttpResponse {
  status: "200";
  body: BackupItemOutput;
}

/** Gets a backup of an app by its ID. */
export interface WebAppsGetBackupStatusdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Deletes a backup of an app by its ID. */
export interface WebAppsDeleteBackup200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Deletes a backup of an app by its ID. */
export interface WebAppsDeleteBackup404Response extends HttpResponse {
  status: "404";
  body: Record<string, unknown>;
}

/** Deletes a backup of an app by its ID. */
export interface WebAppsDeleteBackupdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets status of a web app backup that may be in progress, including secrets associated with the backup, such as the Azure Storage SAS URL. Also can be used to update the SAS URL for the backup if a new URL is passed in the request body. */
export interface WebAppsListBackupStatusSecrets200Response extends HttpResponse {
  status: "200";
  body: BackupItemOutput;
}

/** Gets status of a web app backup that may be in progress, including secrets associated with the backup, such as the Azure Storage SAS URL. Also can be used to update the SAS URL for the backup if a new URL is passed in the request body. */
export interface WebAppsListBackupStatusSecretsdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Restores a specific backup to another app (or deployment slot, if specified). */
export interface WebAppsRestore200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Restores a specific backup to another app (or deployment slot, if specified). */
export interface WebAppsRestore202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Restores a specific backup to another app (or deployment slot, if specified). */
export interface WebAppsRestoredefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Returns whether Scm basic auth is allowed and whether Ftp is allowed for a given site. */
export interface WebAppsListBasicPublishingCredentialsPolicies200Response extends HttpResponse {
  status: "200";
  body: PublishingCredentialsPoliciesCollectionOutput;
}

/** Returns whether Scm basic auth is allowed and whether Ftp is allowed for a given site. */
export interface WebAppsListBasicPublishingCredentialsPoliciesdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Returns whether FTP is allowed on the site or not. */
export interface WebAppsGetFtpAllowed200Response extends HttpResponse {
  status: "200";
  body: CsmPublishingCredentialsPoliciesEntityOutput;
}

/** Returns whether FTP is allowed on the site or not. */
export interface WebAppsGetFtpAlloweddefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Updates whether FTP is allowed on the site or not. */
export interface WebAppsUpdateFtpAllowed200Response extends HttpResponse {
  status: "200";
  body: CsmPublishingCredentialsPoliciesEntityOutput;
}

/** Updates whether FTP is allowed on the site or not. */
export interface WebAppsUpdateFtpAlloweddefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Returns whether Scm basic auth is allowed on the site or not. */
export interface WebAppsGetScmAllowed200Response extends HttpResponse {
  status: "200";
  body: CsmPublishingCredentialsPoliciesEntityOutput;
}

/** Returns whether Scm basic auth is allowed on the site or not. */
export interface WebAppsGetScmAlloweddefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Updates whether user publishing credentials are allowed on the site or not. */
export interface WebAppsUpdateScmAllowed200Response extends HttpResponse {
  status: "200";
  body: CsmPublishingCredentialsPoliciesEntityOutput;
}

/** Updates whether user publishing credentials are allowed on the site or not. */
export interface WebAppsUpdateScmAlloweddefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** List the configurations of an app */
export interface WebAppsListConfigurations200Response extends HttpResponse {
  status: "200";
  body: SiteConfigResourceCollectionOutput;
}

/** List the configurations of an app */
export interface WebAppsListConfigurationsdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Replaces the application settings of an app. */
export interface WebAppsUpdateApplicationSettings200Response extends HttpResponse {
  status: "200";
  body: StringDictionaryOutput;
}

/** Replaces the application settings of an app. */
export interface WebAppsUpdateApplicationSettingsdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets the application settings of an app. */
export interface WebAppsListApplicationSettings200Response extends HttpResponse {
  status: "200";
  body: StringDictionaryOutput;
}

/** Gets the application settings of an app. */
export interface WebAppsListApplicationSettingsdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Updates the Authentication / Authorization settings associated with web app. */
export interface WebAppsUpdateAuthSettings200Response extends HttpResponse {
  status: "200";
  body: SiteAuthSettingsOutput;
}

/** Updates the Authentication / Authorization settings associated with web app. */
export interface WebAppsUpdateAuthSettingsdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets the Authentication/Authorization settings of an app. */
export interface WebAppsGetAuthSettings200Response extends HttpResponse {
  status: "200";
  body: SiteAuthSettingsOutput;
}

/** Gets the Authentication/Authorization settings of an app. */
export interface WebAppsGetAuthSettingsdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets site's Authentication / Authorization settings for apps via the V2 format */
export interface WebAppsGetAuthSettingsV2WithoutSecrets200Response extends HttpResponse {
  status: "200";
  body: SiteAuthSettingsV2Output;
}

/** Gets site's Authentication / Authorization settings for apps via the V2 format */
export interface WebAppsGetAuthSettingsV2WithoutSecretsdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Updates site's Authentication / Authorization settings for apps via the V2 format */
export interface WebAppsUpdateAuthSettingsV2200Response extends HttpResponse {
  status: "200";
  body: SiteAuthSettingsV2Output;
}

/** Updates site's Authentication / Authorization settings for apps via the V2 format */
export interface WebAppsUpdateAuthSettingsV2defaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets site's Authentication / Authorization settings for apps via the V2 format */
export interface WebAppsGetAuthSettingsV2200Response extends HttpResponse {
  status: "200";
  body: SiteAuthSettingsV2Output;
}

/** Gets site's Authentication / Authorization settings for apps via the V2 format */
export interface WebAppsGetAuthSettingsV2defaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Updates the Azure storage account configurations of an app. */
export interface WebAppsUpdateAzureStorageAccounts200Response extends HttpResponse {
  status: "200";
  body: AzureStoragePropertyDictionaryResourceOutput;
}

/** Updates the Azure storage account configurations of an app. */
export interface WebAppsUpdateAzureStorageAccountsdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets the Azure storage account configurations of an app. */
export interface WebAppsListAzureStorageAccounts200Response extends HttpResponse {
  status: "200";
  body: AzureStoragePropertyDictionaryResourceOutput;
}

/** Gets the Azure storage account configurations of an app. */
export interface WebAppsListAzureStorageAccountsdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Updates the backup configuration of an app. */
export interface WebAppsUpdateBackupConfiguration200Response extends HttpResponse {
  status: "200";
  body: BackupRequestOutput;
}

/** Updates the backup configuration of an app. */
export interface WebAppsUpdateBackupConfigurationdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Deletes the backup configuration of an app. */
export interface WebAppsDeleteBackupConfiguration200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Deletes the backup configuration of an app. */
export interface WebAppsDeleteBackupConfigurationdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets the backup configuration of an app. */
export interface WebAppsGetBackupConfiguration200Response extends HttpResponse {
  status: "200";
  body: BackupRequestOutput;
}

/** Gets the backup configuration of an app. */
export interface WebAppsGetBackupConfigurationdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets the config reference app settings and status of an app */
export interface WebAppsGetAppSettingsKeyVaultReferences200Response extends HttpResponse {
  status: "200";
  body: ApiKVReferenceCollectionOutput;
}

/** Gets the config reference app settings and status of an app */
export interface WebAppsGetAppSettingsKeyVaultReferencesdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets the config reference and status of an app */
export interface WebAppsGetAppSettingKeyVaultReference200Response extends HttpResponse {
  status: "200";
  body: ApiKVReferenceOutput;
}

/** Gets the config reference and status of an app */
export interface WebAppsGetAppSettingKeyVaultReferencedefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets the config reference app settings and status of an app */
export interface WebAppsGetSiteConnectionStringKeyVaultReferences200Response extends HttpResponse {
  status: "200";
  body: ApiKVReferenceCollectionOutput;
}

/** Gets the config reference app settings and status of an app */
export interface WebAppsGetSiteConnectionStringKeyVaultReferencesdefaultResponse
  extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets the config reference and status of an app */
export interface WebAppsGetSiteConnectionStringKeyVaultReference200Response extends HttpResponse {
  status: "200";
  body: ApiKVReferenceOutput;
}

/** Gets the config reference and status of an app */
export interface WebAppsGetSiteConnectionStringKeyVaultReferencedefaultResponse
  extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Replaces the connection strings of an app. */
export interface WebAppsUpdateConnectionStrings200Response extends HttpResponse {
  status: "200";
  body: ConnectionStringDictionaryOutput;
}

/** Replaces the connection strings of an app. */
export interface WebAppsUpdateConnectionStringsdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets the connection strings of an app. */
export interface WebAppsListConnectionStrings200Response extends HttpResponse {
  status: "200";
  body: ConnectionStringDictionaryOutput;
}

/** Gets the connection strings of an app. */
export interface WebAppsListConnectionStringsdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets the logging configuration of an app. */
export interface WebAppsGetDiagnosticLogsConfiguration200Response extends HttpResponse {
  status: "200";
  body: SiteLogsConfigOutput;
}

/** Gets the logging configuration of an app. */
export interface WebAppsGetDiagnosticLogsConfigurationdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Updates the logging configuration of an app. */
export interface WebAppsUpdateDiagnosticLogsConfig200Response extends HttpResponse {
  status: "200";
  body: SiteLogsConfigOutput;
}

/** Updates the logging configuration of an app. */
export interface WebAppsUpdateDiagnosticLogsConfigdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Replaces the metadata of an app. */
export interface WebAppsUpdateMetadata200Response extends HttpResponse {
  status: "200";
  body: StringDictionaryOutput;
}

/** Replaces the metadata of an app. */
export interface WebAppsUpdateMetadatadefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets the metadata of an app. */
export interface WebAppsListMetadata200Response extends HttpResponse {
  status: "200";
  body: StringDictionaryOutput;
}

/** Gets the metadata of an app. */
export interface WebAppsListMetadatadefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets the Git/FTP publishing credentials of an app. */
export interface WebAppsListPublishingCredentials200Response extends HttpResponse {
  status: "200";
  body: UserOutput;
}

/** Gets the Git/FTP publishing credentials of an app. */
export interface WebAppsListPublishingCredentialsdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Updates the Push settings associated with web app. */
export interface WebAppsUpdateSitePushSettings200Response extends HttpResponse {
  status: "200";
  body: PushSettingsOutput;
}

/** Updates the Push settings associated with web app. */
export interface WebAppsUpdateSitePushSettingsdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets the Push settings associated with web app. */
export interface WebAppsListSitePushSettings200Response extends HttpResponse {
  status: "200";
  body: PushSettingsOutput;
}

/** Gets the Push settings associated with web app. */
export interface WebAppsListSitePushSettingsdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets the names of app settings and connection strings that stick to the slot (not swapped). */
export interface WebAppsListSlotConfigurationNames200Response extends HttpResponse {
  status: "200";
  body: SlotConfigNamesResourceOutput;
}

/** Gets the names of app settings and connection strings that stick to the slot (not swapped). */
export interface WebAppsListSlotConfigurationNamesdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Updates the names of application settings and connection string that remain with the slot during swap operation. */
export interface WebAppsUpdateSlotConfigurationNames200Response extends HttpResponse {
  status: "200";
  body: SlotConfigNamesResourceOutput;
}

/** Updates the names of application settings and connection string that remain with the slot during swap operation. */
export interface WebAppsUpdateSlotConfigurationNamesdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets the configuration of an app, such as platform version and bitness, default documents, virtual applications, Always On, etc. */
export interface WebAppsGetConfiguration200Response extends HttpResponse {
  status: "200";
  body: SiteConfigResourceOutput;
}

/** Gets the configuration of an app, such as platform version and bitness, default documents, virtual applications, Always On, etc. */
export interface WebAppsGetConfigurationdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Updates the configuration of an app. */
export interface WebAppsCreateOrUpdateConfiguration200Response extends HttpResponse {
  status: "200";
  body: SiteConfigResourceOutput;
}

/** Updates the configuration of an app. */
export interface WebAppsCreateOrUpdateConfigurationdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Updates the configuration of an app. */
export interface WebAppsUpdateConfiguration200Response extends HttpResponse {
  status: "200";
  body: SiteConfigResourceOutput;
}

/** Updates the configuration of an app. */
export interface WebAppsUpdateConfigurationdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets a list of web app configuration snapshots identifiers. Each element of the list contains a timestamp and the ID of the snapshot. */
export interface WebAppsListConfigurationSnapshotInfo200Response extends HttpResponse {
  status: "200";
  body: SiteConfigurationSnapshotInfoCollectionOutput;
}

/** Gets a list of web app configuration snapshots identifiers. Each element of the list contains a timestamp and the ID of the snapshot. */
export interface WebAppsListConfigurationSnapshotInfodefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets a snapshot of the configuration of an app at a previous point in time. */
export interface WebAppsGetConfigurationSnapshot200Response extends HttpResponse {
  status: "200";
  body: SiteConfigResourceOutput;
}

/** Gets a snapshot of the configuration of an app at a previous point in time. */
export interface WebAppsGetConfigurationSnapshotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Reverts the configuration of an app to a previous snapshot. */
export interface WebAppsRecoverSiteConfigurationSnapshot204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Reverts the configuration of an app to a previous snapshot. */
export interface WebAppsRecoverSiteConfigurationSnapshotdefaultResponse extends HttpResponse {
  status: "500";
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
  body: Record<string, unknown>;
}

/** Gets the last lines of docker logs for the given site */
export interface WebAppsGetWebSiteContainerLogsdefaultResponse extends HttpResponse {
  status: "500";
  body: Record<string, unknown>;
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
  body: Record<string, unknown>;
}

/** Gets the ZIP archived docker log files for the given site */
export interface WebAppsGetContainerLogsZipdefaultResponse extends HttpResponse {
  status: "500";
  body: Record<string, unknown>;
}

/** List continuous web jobs for an app, or a deployment slot. */
export interface WebAppsListContinuousWebJobs200Response extends HttpResponse {
  status: "200";
  body: ContinuousWebJobCollectionOutput;
}

/** List continuous web jobs for an app, or a deployment slot. */
export interface WebAppsListContinuousWebJobsdefaultResponse extends HttpResponse {
  status: "500";
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
  body: Record<string, unknown>;
}

/** Gets a continuous web job by its ID for an app, or a deployment slot. */
export interface WebAppsGetContinuousWebJobdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Delete a continuous web job by its ID for an app, or a deployment slot. */
export interface WebAppsDeleteContinuousWebJob200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Delete a continuous web job by its ID for an app, or a deployment slot. */
export interface WebAppsDeleteContinuousWebJob204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete a continuous web job by its ID for an app, or a deployment slot. */
export interface WebAppsDeleteContinuousWebJobdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Start a continuous web job for an app, or a deployment slot. */
export interface WebAppsStartContinuousWebJob200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Start a continuous web job for an app, or a deployment slot. */
export interface WebAppsStartContinuousWebJob404Response extends HttpResponse {
  status: "404";
  body: Record<string, unknown>;
}

/** Start a continuous web job for an app, or a deployment slot. */
export interface WebAppsStartContinuousWebJobdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Stop a continuous web job for an app, or a deployment slot. */
export interface WebAppsStopContinuousWebJob200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Stop a continuous web job for an app, or a deployment slot. */
export interface WebAppsStopContinuousWebJob404Response extends HttpResponse {
  status: "404";
  body: Record<string, unknown>;
}

/** Stop a continuous web job for an app, or a deployment slot. */
export interface WebAppsStopContinuousWebJobdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** List deployments for an app, or a deployment slot. */
export interface WebAppsListDeployments200Response extends HttpResponse {
  status: "200";
  body: DeploymentCollectionOutput;
}

/** List deployments for an app, or a deployment slot. */
export interface WebAppsListDeploymentsdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get a deployment by its ID for an app, or a deployment slot. */
export interface WebAppsGetDeployment200Response extends HttpResponse {
  status: "200";
  body: DeploymentOutput;
}

/** Get a deployment by its ID for an app, or a deployment slot. */
export interface WebAppsGetDeploymentdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Create a deployment for an app, or a deployment slot. */
export interface WebAppsCreateDeployment200Response extends HttpResponse {
  status: "200";
  body: DeploymentOutput;
}

/** Create a deployment for an app, or a deployment slot. */
export interface WebAppsCreateDeploymentdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Delete a deployment by its ID for an app, or a deployment slot. */
export interface WebAppsDeleteDeployment200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Delete a deployment by its ID for an app, or a deployment slot. */
export interface WebAppsDeleteDeployment204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete a deployment by its ID for an app, or a deployment slot. */
export interface WebAppsDeleteDeploymentdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** List deployment log for specific deployment for an app, or a deployment slot. */
export interface WebAppsListDeploymentLog200Response extends HttpResponse {
  status: "200";
  body: DeploymentOutput;
}

/** List deployment log for specific deployment for an app, or a deployment slot. */
export interface WebAppsListDeploymentLogdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Discovers an existing app backup that can be restored from a blob in Azure storage. Use this to get information about the databases stored in a backup. */
export interface WebAppsDiscoverBackup200Response extends HttpResponse {
  status: "200";
  body: RestoreRequestOutput;
}

/** Discovers an existing app backup that can be restored from a blob in Azure storage. Use this to get information about the databases stored in a backup. */
export interface WebAppsDiscoverBackupdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Lists ownership identifiers for domain associated with web app. */
export interface WebAppsListDomainOwnershipIdentifiers200Response extends HttpResponse {
  status: "200";
  body: IdentifierCollectionOutput;
}

/** Lists ownership identifiers for domain associated with web app. */
export interface WebAppsListDomainOwnershipIdentifiersdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get domain ownership identifier for web app. */
export interface WebAppsGetDomainOwnershipIdentifier200Response extends HttpResponse {
  status: "200";
  body: IdentifierOutput;
}

/** Get domain ownership identifier for web app. */
export interface WebAppsGetDomainOwnershipIdentifierdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Creates a domain ownership identifier for web app, or updates an existing ownership identifier. */
export interface WebAppsCreateOrUpdateDomainOwnershipIdentifier200Response extends HttpResponse {
  status: "200";
  body: IdentifierOutput;
}

/** Creates a domain ownership identifier for web app, or updates an existing ownership identifier. */
export interface WebAppsCreateOrUpdateDomainOwnershipIdentifierdefaultResponse
  extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Deletes a domain ownership identifier for a web app. */
export interface WebAppsDeleteDomainOwnershipIdentifier200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Deletes a domain ownership identifier for a web app. */
export interface WebAppsDeleteDomainOwnershipIdentifier204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Deletes a domain ownership identifier for a web app. */
export interface WebAppsDeleteDomainOwnershipIdentifierdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Creates a domain ownership identifier for web app, or updates an existing ownership identifier. */
export interface WebAppsUpdateDomainOwnershipIdentifier200Response extends HttpResponse {
  status: "200";
  body: IdentifierOutput;
}

/** Creates a domain ownership identifier for web app, or updates an existing ownership identifier. */
export interface WebAppsUpdateDomainOwnershipIdentifierdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get the status of the last MSDeploy operation. */
export interface WebAppsGetMSDeployStatus200Response extends HttpResponse {
  status: "200";
  body: MSDeployStatusOutput;
}

/** Get the status of the last MSDeploy operation. */
export interface WebAppsGetMSDeployStatusdefaultResponse extends HttpResponse {
  status: "500";
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
  body: Record<string, unknown>;
}

/** Invoke the MSDeploy web app extension. */
export interface WebAppsCreateMSDeployOperationdefaultResponse extends HttpResponse {
  status: "500";
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
  body: Record<string, unknown>;
}

/** Get the MSDeploy Log for the last MSDeploy operation. */
export interface WebAppsGetMSDeployLogdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Invoke onedeploy status API /api/deployments and gets the deployment status for the site */
export interface WebAppsGetOneDeployStatus200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Invoke onedeploy status API /api/deployments and gets the deployment status for the site */
export interface WebAppsGetOneDeployStatusdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Invoke the OneDeploy publish web app extension. */
export interface WebAppsCreateOneDeployOperation200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Invoke the OneDeploy publish web app extension. */
export interface WebAppsCreateOneDeployOperationdefaultResponse extends HttpResponse {
  status: "500";
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
  body: Record<string, unknown>;
}

/** List the functions for a web site, or a deployment slot. */
export interface WebAppsListFunctionsdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Fetch a short lived token that can be exchanged for a master key. */
export interface WebAppsGetFunctionsAdminToken200Response extends HttpResponse {
  status: "200";
  body: string;
}

/** Fetch a short lived token that can be exchanged for a master key. */
export interface WebAppsGetFunctionsAdminTokendefaultResponse extends HttpResponse {
  status: "500";
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
  body: Record<string, unknown>;
}

/** Get function information by its ID for web site, or a deployment slot. */
export interface WebAppsGetFunctiondefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Create function for web site, or a deployment slot. */
export interface WebAppsCreateFunction201Response extends HttpResponse {
  status: "201";
  body: FunctionEnvelopeOutput;
}

/** Create function for web site, or a deployment slot. */
export interface WebAppsCreateFunctiondefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Delete a function for web site, or a deployment slot. */
export interface WebAppsDeleteFunction204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete a function for web site, or a deployment slot. */
export interface WebAppsDeleteFunction404Response extends HttpResponse {
  status: "404";
  body: Record<string, unknown>;
}

/** Delete a function for web site, or a deployment slot. */
export interface WebAppsDeleteFunctiondefaultResponse extends HttpResponse {
  status: "500";
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
export interface WebAppsCreateOrUpdateFunctionSecretdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Delete a function secret. */
export interface WebAppsDeleteFunctionSecret204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete a function secret. */
export interface WebAppsDeleteFunctionSecret404Response extends HttpResponse {
  status: "404";
  body: Record<string, unknown>;
}

/** Delete a function secret. */
export interface WebAppsDeleteFunctionSecretdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get function keys for a function in a web site, or a deployment slot. */
export interface WebAppsListFunctionKeys200Response extends HttpResponse {
  status: "200";
  body: StringDictionaryOutput;
}

/** Get function keys for a function in a web site, or a deployment slot. */
export interface WebAppsListFunctionKeysdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get function secrets for a function in a web site, or a deployment slot. */
export interface WebAppsListFunctionSecrets200Response extends HttpResponse {
  status: "200";
  body: FunctionSecretsOutput;
}

/** Get function secrets for a function in a web site, or a deployment slot. */
export interface WebAppsListFunctionSecretsdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get host secrets for a function app. */
export interface WebAppsListHostKeys200Response extends HttpResponse {
  status: "200";
  body: HostKeysOutput;
}

/** Get host secrets for a function app. */
export interface WebAppsListHostKeysdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** This is to allow calling via powershell and ARM template. */
export interface WebAppsListSyncStatus204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** This is to allow calling via powershell and ARM template. */
export interface WebAppsListSyncStatusdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Syncs function trigger metadata to the management database */
export interface WebAppsSyncFunctions204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Syncs function trigger metadata to the management database */
export interface WebAppsSyncFunctionsdefaultResponse extends HttpResponse {
  status: "500";
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
export interface WebAppsCreateOrUpdateHostSecretdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Delete a host level secret. */
export interface WebAppsDeleteHostSecret204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete a host level secret. */
export interface WebAppsDeleteHostSecret404Response extends HttpResponse {
  status: "404";
  body: Record<string, unknown>;
}

/** Delete a host level secret. */
export interface WebAppsDeleteHostSecretdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get hostname bindings for an app or a deployment slot. */
export interface WebAppsListHostNameBindings200Response extends HttpResponse {
  status: "200";
  body: HostNameBindingCollectionOutput;
}

/** Get hostname bindings for an app or a deployment slot. */
export interface WebAppsListHostNameBindingsdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get the named hostname binding for an app (or deployment slot, if specified). */
export interface WebAppsGetHostNameBinding200Response extends HttpResponse {
  status: "200";
  body: HostNameBindingOutput;
}

/** Get the named hostname binding for an app (or deployment slot, if specified). */
export interface WebAppsGetHostNameBindingdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Creates a hostname binding for an app. */
export interface WebAppsCreateOrUpdateHostNameBinding200Response extends HttpResponse {
  status: "200";
  body: HostNameBindingOutput;
}

/** Creates a hostname binding for an app. */
export interface WebAppsCreateOrUpdateHostNameBindingdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Deletes a hostname binding for an app. */
export interface WebAppsDeleteHostNameBinding200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Deletes a hostname binding for an app. */
export interface WebAppsDeleteHostNameBinding204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Deletes a hostname binding for an app. */
export interface WebAppsDeleteHostNameBindingdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Retrieves a specific Service Bus Hybrid Connection used by this Web App. */
export interface WebAppsGetHybridConnection200Response extends HttpResponse {
  status: "200";
  body: HybridConnectionOutput;
}

/** Retrieves a specific Service Bus Hybrid Connection used by this Web App. */
export interface WebAppsGetHybridConnectiondefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Creates a new Hybrid Connection using a Service Bus relay. */
export interface WebAppsCreateOrUpdateHybridConnection200Response extends HttpResponse {
  status: "200";
  body: HybridConnectionOutput;
}

/** Creates a new Hybrid Connection using a Service Bus relay. */
export interface WebAppsCreateOrUpdateHybridConnectiondefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Removes a Hybrid Connection from this site. */
export interface WebAppsDeleteHybridConnection200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Removes a Hybrid Connection from this site. */
export interface WebAppsDeleteHybridConnection404Response extends HttpResponse {
  status: "404";
  body: Record<string, unknown>;
}

/** Removes a Hybrid Connection from this site. */
export interface WebAppsDeleteHybridConnectiondefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Creates a new Hybrid Connection using a Service Bus relay. */
export interface WebAppsUpdateHybridConnection200Response extends HttpResponse {
  status: "200";
  body: HybridConnectionOutput;
}

/** Creates a new Hybrid Connection using a Service Bus relay. */
export interface WebAppsUpdateHybridConnectiondefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Retrieves all Service Bus Hybrid Connections used by this Web App. */
export interface WebAppsListHybridConnections200Response extends HttpResponse {
  status: "200";
  body: HybridConnectionOutput;
}

/** Retrieves all Service Bus Hybrid Connections used by this Web App. */
export interface WebAppsListHybridConnectionsdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets hybrid connections configured for an app (or deployment slot, if specified). */
export interface WebAppsListRelayServiceConnections200Response extends HttpResponse {
  status: "200";
  body: RelayServiceConnectionEntityOutput;
}

/** Gets hybrid connections configured for an app (or deployment slot, if specified). */
export interface WebAppsListRelayServiceConnectionsdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets a hybrid connection configuration by its name. */
export interface WebAppsGetRelayServiceConnection200Response extends HttpResponse {
  status: "200";
  body: RelayServiceConnectionEntityOutput;
}

/** Gets a hybrid connection configuration by its name. */
export interface WebAppsGetRelayServiceConnectiondefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Creates a new hybrid connection configuration (PUT), or updates an existing one (PATCH). */
export interface WebAppsCreateOrUpdateRelayServiceConnection200Response extends HttpResponse {
  status: "200";
  body: RelayServiceConnectionEntityOutput;
}

/** Creates a new hybrid connection configuration (PUT), or updates an existing one (PATCH). */
export interface WebAppsCreateOrUpdateRelayServiceConnectiondefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Deletes a relay service connection by its name. */
export interface WebAppsDeleteRelayServiceConnection200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Deletes a relay service connection by its name. */
export interface WebAppsDeleteRelayServiceConnection404Response extends HttpResponse {
  status: "404";
  body: Record<string, unknown>;
}

/** Deletes a relay service connection by its name. */
export interface WebAppsDeleteRelayServiceConnectiondefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Creates a new hybrid connection configuration (PUT), or updates an existing one (PATCH). */
export interface WebAppsUpdateRelayServiceConnection200Response extends HttpResponse {
  status: "200";
  body: RelayServiceConnectionEntityOutput;
}

/** Creates a new hybrid connection configuration (PUT), or updates an existing one (PATCH). */
export interface WebAppsUpdateRelayServiceConnectiondefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets all scale-out instances of an app. */
export interface WebAppsListInstanceIdentifiers200Response extends HttpResponse {
  status: "200";
  body: WebAppInstanceStatusCollectionOutput;
}

/** Gets all scale-out instances of an app. */
export interface WebAppsListInstanceIdentifiersdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets all scale-out instances of an app. */
export interface WebAppsGetInstanceInfo200Response extends HttpResponse {
  status: "200";
  body: WebSiteInstanceStatusOutput;
}

/** Gets all scale-out instances of an app. */
export interface WebAppsGetInstanceInfodefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get the status of the last MSDeploy operation. */
export interface WebAppsGetInstanceMsDeployStatus200Response extends HttpResponse {
  status: "200";
  body: MSDeployStatusOutput;
}

/** Get the status of the last MSDeploy operation. */
export interface WebAppsGetInstanceMsDeployStatusdefaultResponse extends HttpResponse {
  status: "500";
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
  body: Record<string, unknown>;
}

/** Invoke the MSDeploy web app extension. */
export interface WebAppsCreateInstanceMSDeployOperationdefaultResponse extends HttpResponse {
  status: "500";
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
  body: Record<string, unknown>;
}

/** Get the MSDeploy Log for the last MSDeploy operation. */
export interface WebAppsGetInstanceMSDeployLogdefaultResponse extends HttpResponse {
  status: "500";
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
  body: Record<string, unknown>;
}

/** Get list of processes for a web site, or a deployment slot, or for a specific scaled-out instance in a web site. */
export interface WebAppsListInstanceProcessesdefaultResponse extends HttpResponse {
  status: "500";
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
  body: Record<string, unknown>;
}

/** Get process information by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsGetInstanceProcessdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Terminate a process by its ID for a web site, or a deployment slot, or specific scaled-out instance in a web site. */
export interface WebAppsDeleteInstanceProcess204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Terminate a process by its ID for a web site, or a deployment slot, or specific scaled-out instance in a web site. */
export interface WebAppsDeleteInstanceProcess404Response extends HttpResponse {
  status: "404";
  body: Record<string, unknown>;
}

/** Terminate a process by its ID for a web site, or a deployment slot, or specific scaled-out instance in a web site. */
export interface WebAppsDeleteInstanceProcessdefaultResponse extends HttpResponse {
  status: "500";
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
  body: Record<string, unknown>;
}

/** Get a memory dump of a process by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsGetInstanceProcessDumpdefaultResponse extends HttpResponse {
  status: "500";
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
  body: Record<string, unknown>;
}

/** List module information for a process by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsListInstanceProcessModulesdefaultResponse extends HttpResponse {
  status: "500";
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
  body: Record<string, unknown>;
}

/** Get process information by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsGetInstanceProcessModuledefaultResponse extends HttpResponse {
  status: "500";
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
  body: Record<string, unknown>;
}

/** List the threads in a process by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsListInstanceProcessThreadsdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Shows whether an app can be cloned to another resource group or subscription. */
export interface WebAppsIsCloneable200Response extends HttpResponse {
  status: "200";
  body: SiteCloneabilityOutput;
}

/** Shows whether an app can be cloned to another resource group or subscription. */
export interface WebAppsIsCloneabledefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets existing backups of an app. */
export interface WebAppsListSiteBackups200Response extends HttpResponse {
  status: "200";
  body: BackupItemCollectionOutput;
}

/** Gets existing backups of an app. */
export interface WebAppsListSiteBackupsdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** This is to allow calling via powershell and ARM template. */
export interface WebAppsListSyncFunctionTriggers200Response extends HttpResponse {
  status: "200";
  body: FunctionSecretsOutput;
}

/** This is to allow calling via powershell and ARM template. */
export interface WebAppsListSyncFunctionTriggersdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Restores a web app. */
export interface WebAppsMigrateStorage200Response extends HttpResponse {
  status: "200";
  body: StorageMigrationResponseOutput;
}

/** Restores a web app. */
export interface WebAppsMigrateStoragedefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Migrates a local (in-app) MySql database to a remote MySql database. */
export interface WebAppsMigrateMySql200Response extends HttpResponse {
  status: "200";
  body: OperationOutput;
}

/** Migrates a local (in-app) MySql database to a remote MySql database. */
export interface WebAppsMigrateMySqldefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Returns the status of MySql in app migration, if one is active, and whether or not MySql in app is enabled */
export interface WebAppsGetMigrateMySqlStatus200Response extends HttpResponse {
  status: "200";
  body: MigrateMySqlStatusOutput;
}

/** Returns the status of MySql in app migration, if one is active, and whether or not MySql in app is enabled */
export interface WebAppsGetMigrateMySqlStatusdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets a Swift Virtual Network connection. */
export interface WebAppsGetSwiftVirtualNetworkConnection200Response extends HttpResponse {
  status: "200";
  body: SwiftVirtualNetworkOutput;
}

/** Gets a Swift Virtual Network connection. */
export interface WebAppsGetSwiftVirtualNetworkConnectiondefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/**
 * Integrates this Web App with a Virtual Network. This requires that 1) "swiftSupported" is true when doing a GET against this resource, and 2) that the target Subnet has already been delegated, and is not
 * in use by another App Service Plan other than the one this App is in.
 */
export interface WebAppsCreateOrUpdateSwiftVirtualNetworkConnectionWithCheck200Response
  extends HttpResponse {
  status: "200";
  body: SwiftVirtualNetworkOutput;
}

/**
 * Integrates this Web App with a Virtual Network. This requires that 1) "swiftSupported" is true when doing a GET against this resource, and 2) that the target Subnet has already been delegated, and is not
 * in use by another App Service Plan other than the one this App is in.
 */
export interface WebAppsCreateOrUpdateSwiftVirtualNetworkConnectionWithCheckdefaultResponse
  extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Deletes a Swift Virtual Network connection from an app (or deployment slot). */
export interface WebAppsDeleteSwiftVirtualNetwork200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Deletes a Swift Virtual Network connection from an app (or deployment slot). */
export interface WebAppsDeleteSwiftVirtualNetwork404Response extends HttpResponse {
  status: "404";
  body: Record<string, unknown>;
}

/** Deletes a Swift Virtual Network connection from an app (or deployment slot). */
export interface WebAppsDeleteSwiftVirtualNetworkdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/**
 * Integrates this Web App with a Virtual Network. This requires that 1) "swiftSupported" is true when doing a GET against this resource, and 2) that the target Subnet has already been delegated, and is not
 * in use by another App Service Plan other than the one this App is in.
 */
export interface WebAppsUpdateSwiftVirtualNetworkConnectionWithCheck200Response
  extends HttpResponse {
  status: "200";
  body: SwiftVirtualNetworkOutput;
}

/**
 * Integrates this Web App with a Virtual Network. This requires that 1) "swiftSupported" is true when doing a GET against this resource, and 2) that the target Subnet has already been delegated, and is not
 * in use by another App Service Plan other than the one this App is in.
 */
export interface WebAppsUpdateSwiftVirtualNetworkConnectionWithCheckdefaultResponse
  extends HttpResponse {
  status: "500";
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
  body: Record<string, unknown>;
}

/** Gets all network features used by the app (or deployment slot, if specified). */
export interface WebAppsListNetworkFeaturesdefaultResponse extends HttpResponse {
  status: "500";
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
export interface WebAppsGetNetworkTraceOperationdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Start capturing network packets for the site (To be deprecated). */
export interface WebAppsStartWebSiteNetworkTrace200Response extends HttpResponse {
  status: "200";
  body: string;
}

/** Start capturing network packets for the site (To be deprecated). */
export interface WebAppsStartWebSiteNetworkTracedefaultResponse extends HttpResponse {
  status: "500";
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
export interface WebAppsStartWebSiteNetworkTraceOperationdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Stop ongoing capturing network packets for the site. */
export interface WebAppsStopWebSiteNetworkTrace200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Stop ongoing capturing network packets for the site. */
export interface WebAppsStopWebSiteNetworkTrace204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Stop ongoing capturing network packets for the site. */
export interface WebAppsStopWebSiteNetworkTracedefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets a named operation for a network trace capturing (or deployment slot, if specified). */
export interface WebAppsGetNetworkTraces200Response extends HttpResponse {
  status: "200";
  body: Array<NetworkTraceOutput>;
}

/** Gets a named operation for a network trace capturing (or deployment slot, if specified). */
export interface WebAppsGetNetworkTracesdefaultResponse extends HttpResponse {
  status: "500";
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
export interface WebAppsGetNetworkTraceOperationV2defaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets a named operation for a network trace capturing (or deployment slot, if specified). */
export interface WebAppsGetNetworkTracesV2200Response extends HttpResponse {
  status: "200";
  body: Array<NetworkTraceOutput>;
}

/** Gets a named operation for a network trace capturing (or deployment slot, if specified). */
export interface WebAppsGetNetworkTracesV2defaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Generates a new publishing password for an app (or deployment slot, if specified). */
export interface WebAppsGenerateNewSitePublishingPassword200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Generates a new publishing password for an app (or deployment slot, if specified). */
export interface WebAppsGenerateNewSitePublishingPassword204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Generates a new publishing password for an app (or deployment slot, if specified). */
export interface WebAppsGenerateNewSitePublishingPassworddefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets perfmon counters for web app. */
export interface WebAppsListPerfMonCounters200Response extends HttpResponse {
  status: "200";
  body: PerfMonCounterCollectionOutput;
}

/** Gets perfmon counters for web app. */
export interface WebAppsListPerfMonCountersdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets web app's event logs. */
export interface WebAppsGetSitePhpErrorLogFlag200Response extends HttpResponse {
  status: "200";
  body: SitePhpErrorLogFlagOutput;
}

/** Gets web app's event logs. */
export interface WebAppsGetSitePhpErrorLogFlagdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets the premier add-ons of an app. */
export interface WebAppsListPremierAddOns200Response extends HttpResponse {
  status: "200";
  body: PremierAddOnOutput;
}

/** Gets the premier add-ons of an app. */
export interface WebAppsListPremierAddOnsdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets a named add-on of an app. */
export interface WebAppsGetPremierAddOn200Response extends HttpResponse {
  status: "200";
  body: PremierAddOnOutput;
}

/** Gets a named add-on of an app. */
export interface WebAppsGetPremierAddOndefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Updates a named add-on of an app. */
export interface WebAppsAddPremierAddOn200Response extends HttpResponse {
  status: "200";
  body: PremierAddOnOutput;
}

/** Updates a named add-on of an app. */
export interface WebAppsAddPremierAddOndefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Delete a premier add-on from an app. */
export interface WebAppsDeletePremierAddOn200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Delete a premier add-on from an app. */
export interface WebAppsDeletePremierAddOndefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Updates a named add-on of an app. */
export interface WebAppsUpdatePremierAddOn200Response extends HttpResponse {
  status: "200";
  body: PremierAddOnOutput;
}

/** Updates a named add-on of an app. */
export interface WebAppsUpdatePremierAddOndefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets data around private site access enablement and authorized Virtual Networks that can access the site. */
export interface WebAppsGetPrivateAccess200Response extends HttpResponse {
  status: "200";
  body: PrivateAccessOutput;
}

/** Gets data around private site access enablement and authorized Virtual Networks that can access the site. */
export interface WebAppsGetPrivateAccessdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Sets data around private site access enablement and authorized Virtual Networks that can access the site. */
export interface WebAppsPutPrivateAccessVnet200Response extends HttpResponse {
  status: "200";
  body: PrivateAccessOutput;
}

/** Sets data around private site access enablement and authorized Virtual Networks that can access the site. */
export interface WebAppsPutPrivateAccessVnetdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets the list of private endpoint connections associated with a site */
export interface WebAppsGetPrivateEndpointConnectionList200Response extends HttpResponse {
  status: "200";
  body: PrivateEndpointConnectionCollectionOutput;
}

/** Gets the list of private endpoint connections associated with a site */
export interface WebAppsGetPrivateEndpointConnectionListdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets a private endpoint connection */
export interface WebAppsGetPrivateEndpointConnection200Response extends HttpResponse {
  status: "200";
  body: RemotePrivateEndpointConnectionARMResourceOutput;
}

/** Gets a private endpoint connection */
export interface WebAppsGetPrivateEndpointConnectiondefaultResponse extends HttpResponse {
  status: "500";
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
export interface WebAppsApproveOrRejectPrivateEndpointConnectiondefaultResponse
  extends HttpResponse {
  status: "500";
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
export interface WebAppsDeletePrivateEndpointConnectiondefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets the private link resources */
export interface WebAppsGetPrivateLinkResources200Response extends HttpResponse {
  status: "200";
  body: PrivateLinkResourcesWrapperOutput;
}

/** Gets the private link resources */
export interface WebAppsGetPrivateLinkResourcesdefaultResponse extends HttpResponse {
  status: "500";
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
  body: Record<string, unknown>;
}

/** Get list of processes for a web site, or a deployment slot, or for a specific scaled-out instance in a web site. */
export interface WebAppsListProcessesdefaultResponse extends HttpResponse {
  status: "500";
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
  body: Record<string, unknown>;
}

/** Get process information by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsGetProcessdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Terminate a process by its ID for a web site, or a deployment slot, or specific scaled-out instance in a web site. */
export interface WebAppsDeleteProcess204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Terminate a process by its ID for a web site, or a deployment slot, or specific scaled-out instance in a web site. */
export interface WebAppsDeleteProcess404Response extends HttpResponse {
  status: "404";
  body: Record<string, unknown>;
}

/** Terminate a process by its ID for a web site, or a deployment slot, or specific scaled-out instance in a web site. */
export interface WebAppsDeleteProcessdefaultResponse extends HttpResponse {
  status: "500";
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
  body: Record<string, unknown>;
}

/** Get a memory dump of a process by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsGetProcessDumpdefaultResponse extends HttpResponse {
  status: "500";
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
  body: Record<string, unknown>;
}

/** List module information for a process by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsListProcessModulesdefaultResponse extends HttpResponse {
  status: "500";
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
  body: Record<string, unknown>;
}

/** Get process information by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsGetProcessModuledefaultResponse extends HttpResponse {
  status: "500";
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
  body: Record<string, unknown>;
}

/** List the threads in a process by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsListProcessThreadsdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get public certificates for an app or a deployment slot. */
export interface WebAppsListPublicCertificates200Response extends HttpResponse {
  status: "200";
  body: PublicCertificateCollectionOutput;
}

/** Get public certificates for an app or a deployment slot. */
export interface WebAppsListPublicCertificatesdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get the named public certificate for an app (or deployment slot, if specified). */
export interface WebAppsGetPublicCertificate200Response extends HttpResponse {
  status: "200";
  body: PublicCertificateOutput;
}

/** Get the named public certificate for an app (or deployment slot, if specified). */
export interface WebAppsGetPublicCertificatedefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Creates a hostname binding for an app. */
export interface WebAppsCreateOrUpdatePublicCertificate200Response extends HttpResponse {
  status: "200";
  body: PublicCertificateOutput;
}

/** Creates a hostname binding for an app. */
export interface WebAppsCreateOrUpdatePublicCertificatedefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Deletes a hostname binding for an app. */
export interface WebAppsDeletePublicCertificate200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Deletes a hostname binding for an app. */
export interface WebAppsDeletePublicCertificate204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Deletes a hostname binding for an app. */
export interface WebAppsDeletePublicCertificatedefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets the publishing profile for an app (or deployment slot, if specified). */
export interface WebAppsListPublishingProfileXmlWithSecrets200Response extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
}

/** Gets the publishing profile for an app (or deployment slot, if specified). */
export interface WebAppsListPublishingProfileXmlWithSecretsdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Resets the configuration settings of the current slot if they were previously modified by calling the API with POST. */
export interface WebAppsResetProductionSlotConfig200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Resets the configuration settings of the current slot if they were previously modified by calling the API with POST. */
export interface WebAppsResetProductionSlotConfigdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Restarts an app (or deployment slot, if specified). */
export interface WebAppsRestart200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Restarts an app (or deployment slot, if specified). */
export interface WebAppsRestartdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Restores an app from a backup blob in Azure Storage. */
export interface WebAppsRestoreFromBackupBlob200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Restores an app from a backup blob in Azure Storage. */
export interface WebAppsRestoreFromBackupBlob202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Restores an app from a backup blob in Azure Storage. */
export interface WebAppsRestoreFromBackupBlobdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Restores a deleted web app to this web app. */
export interface WebAppsRestoreFromDeletedApp200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Restores a deleted web app to this web app. */
export interface WebAppsRestoreFromDeletedApp202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Restores a deleted web app to this web app. */
export interface WebAppsRestoreFromDeletedAppdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Restores a web app from a snapshot. */
export interface WebAppsRestoreSnapshot200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Restores a web app from a snapshot. */
export interface WebAppsRestoreSnapshot202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Restores a web app from a snapshot. */
export interface WebAppsRestoreSnapshotdefaultResponse extends HttpResponse {
  status: "500";
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
  body: Record<string, unknown>;
}

/** Get list of siteextensions for a web site, or a deployment slot. */
export interface WebAppsListSiteExtensionsdefaultResponse extends HttpResponse {
  status: "500";
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
  body: Record<string, unknown>;
}

/** Get site extension information by its ID for a web site, or a deployment slot. */
export interface WebAppsGetSiteExtensiondefaultResponse extends HttpResponse {
  status: "500";
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
  body: Record<string, unknown>;
}

/** Install site extension on a web site, or a deployment slot. */
export interface WebAppsInstallSiteExtensiondefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Remove a site extension from a web site, or a deployment slot. */
export interface WebAppsDeleteSiteExtension204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Remove a site extension from a web site, or a deployment slot. */
export interface WebAppsDeleteSiteExtension404Response extends HttpResponse {
  status: "404";
  body: Record<string, unknown>;
}

/** Remove a site extension from a web site, or a deployment slot. */
export interface WebAppsDeleteSiteExtensiondefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets an app's deployment slots. */
export interface WebAppsListSlots200Response extends HttpResponse {
  status: "200";
  body: WebAppCollectionOutput;
}

/** Gets an app's deployment slots. */
export interface WebAppsListSlotsdefaultResponse extends HttpResponse {
  status: "500";
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
  body: Record<string, unknown>;
}

/** Gets the details of a web, mobile, or API app. */
export interface WebAppsGetSlotdefaultResponse extends HttpResponse {
  status: "500";
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
export interface WebAppsCreateOrUpdateSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Deletes a web, mobile, or API app, or one of the deployment slots. */
export interface WebAppsDeleteSlot200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Deletes a web, mobile, or API app, or one of the deployment slots. */
export interface WebAppsDeleteSlot204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Deletes a web, mobile, or API app, or one of the deployment slots. */
export interface WebAppsDeleteSlot404Response extends HttpResponse {
  status: "404";
  body: Record<string, unknown>;
}

/** Deletes a web, mobile, or API app, or one of the deployment slots. */
export interface WebAppsDeleteSlotdefaultResponse extends HttpResponse {
  status: "500";
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
export interface WebAppsUpdateSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Analyze a custom hostname. */
export interface WebAppsAnalyzeCustomHostnameSlot200Response extends HttpResponse {
  status: "200";
  body: CustomHostnameAnalysisResultOutput;
}

/** Analyze a custom hostname. */
export interface WebAppsAnalyzeCustomHostnameSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Applies the configuration settings from the target slot onto the current slot. */
export interface WebAppsApplySlotConfigurationSlot200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Applies the configuration settings from the target slot onto the current slot. */
export interface WebAppsApplySlotConfigurationSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Creates a backup of an app. */
export interface WebAppsBackupSlot200Response extends HttpResponse {
  status: "200";
  body: BackupItemOutput;
}

/** Creates a backup of an app. */
export interface WebAppsBackupSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets existing backups of an app. */
export interface WebAppsListBackupsSlot200Response extends HttpResponse {
  status: "200";
  body: BackupItemCollectionOutput;
}

/** Gets existing backups of an app. */
export interface WebAppsListBackupsSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets a backup of an app by its ID. */
export interface WebAppsGetBackupStatusSlot200Response extends HttpResponse {
  status: "200";
  body: BackupItemOutput;
}

/** Gets a backup of an app by its ID. */
export interface WebAppsGetBackupStatusSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Deletes a backup of an app by its ID. */
export interface WebAppsDeleteBackupSlot200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Deletes a backup of an app by its ID. */
export interface WebAppsDeleteBackupSlot404Response extends HttpResponse {
  status: "404";
  body: Record<string, unknown>;
}

/** Deletes a backup of an app by its ID. */
export interface WebAppsDeleteBackupSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets status of a web app backup that may be in progress, including secrets associated with the backup, such as the Azure Storage SAS URL. Also can be used to update the SAS URL for the backup if a new URL is passed in the request body. */
export interface WebAppsListBackupStatusSecretsSlot200Response extends HttpResponse {
  status: "200";
  body: BackupItemOutput;
}

/** Gets status of a web app backup that may be in progress, including secrets associated with the backup, such as the Azure Storage SAS URL. Also can be used to update the SAS URL for the backup if a new URL is passed in the request body. */
export interface WebAppsListBackupStatusSecretsSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Restores a specific backup to another app (or deployment slot, if specified). */
export interface WebAppsRestoreSlot200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Restores a specific backup to another app (or deployment slot, if specified). */
export interface WebAppsRestoreSlot202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Restores a specific backup to another app (or deployment slot, if specified). */
export interface WebAppsRestoreSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Returns whether Scm basic auth is allowed and whether Ftp is allowed for a given site. */
export interface WebAppsListBasicPublishingCredentialsPoliciesSlot200Response extends HttpResponse {
  status: "200";
  body: PublishingCredentialsPoliciesCollectionOutput;
}

/** Returns whether Scm basic auth is allowed and whether Ftp is allowed for a given site. */
export interface WebAppsListBasicPublishingCredentialsPoliciesSlotdefaultResponse
  extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Returns whether FTP is allowed on the site or not. */
export interface WebAppsGetFtpAllowedSlot200Response extends HttpResponse {
  status: "200";
  body: CsmPublishingCredentialsPoliciesEntityOutput;
}

/** Returns whether FTP is allowed on the site or not. */
export interface WebAppsGetFtpAllowedSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Updates whether FTP is allowed on the site or not. */
export interface WebAppsUpdateFtpAllowedSlot200Response extends HttpResponse {
  status: "200";
  body: CsmPublishingCredentialsPoliciesEntityOutput;
}

/** Updates whether FTP is allowed on the site or not. */
export interface WebAppsUpdateFtpAllowedSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Returns whether Scm basic auth is allowed on the site or not. */
export interface WebAppsGetScmAllowedSlot200Response extends HttpResponse {
  status: "200";
  body: CsmPublishingCredentialsPoliciesEntityOutput;
}

/** Returns whether Scm basic auth is allowed on the site or not. */
export interface WebAppsGetScmAllowedSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Updates whether user publishing credentials are allowed on the site or not. */
export interface WebAppsUpdateScmAllowedSlot200Response extends HttpResponse {
  status: "200";
  body: CsmPublishingCredentialsPoliciesEntityOutput;
}

/** Updates whether user publishing credentials are allowed on the site or not. */
export interface WebAppsUpdateScmAllowedSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** List the configurations of an app */
export interface WebAppsListConfigurationsSlot200Response extends HttpResponse {
  status: "200";
  body: SiteConfigResourceCollectionOutput;
}

/** List the configurations of an app */
export interface WebAppsListConfigurationsSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Replaces the application settings of an app. */
export interface WebAppsUpdateApplicationSettingsSlot200Response extends HttpResponse {
  status: "200";
  body: StringDictionaryOutput;
}

/** Replaces the application settings of an app. */
export interface WebAppsUpdateApplicationSettingsSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets the application settings of an app. */
export interface WebAppsListApplicationSettingsSlot200Response extends HttpResponse {
  status: "200";
  body: StringDictionaryOutput;
}

/** Gets the application settings of an app. */
export interface WebAppsListApplicationSettingsSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Updates the Authentication / Authorization settings associated with web app. */
export interface WebAppsUpdateAuthSettingsSlot200Response extends HttpResponse {
  status: "200";
  body: SiteAuthSettingsOutput;
}

/** Updates the Authentication / Authorization settings associated with web app. */
export interface WebAppsUpdateAuthSettingsSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets the Authentication/Authorization settings of an app. */
export interface WebAppsGetAuthSettingsSlot200Response extends HttpResponse {
  status: "200";
  body: SiteAuthSettingsOutput;
}

/** Gets the Authentication/Authorization settings of an app. */
export interface WebAppsGetAuthSettingsSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets site's Authentication / Authorization settings for apps via the V2 format */
export interface WebAppsGetAuthSettingsV2WithoutSecretsSlot200Response extends HttpResponse {
  status: "200";
  body: SiteAuthSettingsV2Output;
}

/** Gets site's Authentication / Authorization settings for apps via the V2 format */
export interface WebAppsGetAuthSettingsV2WithoutSecretsSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Updates site's Authentication / Authorization settings for apps via the V2 format */
export interface WebAppsUpdateAuthSettingsV2Slot200Response extends HttpResponse {
  status: "200";
  body: SiteAuthSettingsV2Output;
}

/** Updates site's Authentication / Authorization settings for apps via the V2 format */
export interface WebAppsUpdateAuthSettingsV2SlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets site's Authentication / Authorization settings for apps via the V2 format */
export interface WebAppsGetAuthSettingsV2Slot200Response extends HttpResponse {
  status: "200";
  body: SiteAuthSettingsV2Output;
}

/** Gets site's Authentication / Authorization settings for apps via the V2 format */
export interface WebAppsGetAuthSettingsV2SlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Updates the Azure storage account configurations of an app. */
export interface WebAppsUpdateAzureStorageAccountsSlot200Response extends HttpResponse {
  status: "200";
  body: AzureStoragePropertyDictionaryResourceOutput;
}

/** Updates the Azure storage account configurations of an app. */
export interface WebAppsUpdateAzureStorageAccountsSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets the Azure storage account configurations of an app. */
export interface WebAppsListAzureStorageAccountsSlot200Response extends HttpResponse {
  status: "200";
  body: AzureStoragePropertyDictionaryResourceOutput;
}

/** Gets the Azure storage account configurations of an app. */
export interface WebAppsListAzureStorageAccountsSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Updates the backup configuration of an app. */
export interface WebAppsUpdateBackupConfigurationSlot200Response extends HttpResponse {
  status: "200";
  body: BackupRequestOutput;
}

/** Updates the backup configuration of an app. */
export interface WebAppsUpdateBackupConfigurationSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Deletes the backup configuration of an app. */
export interface WebAppsDeleteBackupConfigurationSlot200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Deletes the backup configuration of an app. */
export interface WebAppsDeleteBackupConfigurationSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets the backup configuration of an app. */
export interface WebAppsGetBackupConfigurationSlot200Response extends HttpResponse {
  status: "200";
  body: BackupRequestOutput;
}

/** Gets the backup configuration of an app. */
export interface WebAppsGetBackupConfigurationSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets the config reference app settings and status of an app */
export interface WebAppsGetAppSettingsKeyVaultReferencesSlot200Response extends HttpResponse {
  status: "200";
  body: ApiKVReferenceCollectionOutput;
}

/** Gets the config reference app settings and status of an app */
export interface WebAppsGetAppSettingsKeyVaultReferencesSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets the config reference and status of an app */
export interface WebAppsGetAppSettingKeyVaultReferenceSlot200Response extends HttpResponse {
  status: "200";
  body: ApiKVReferenceOutput;
}

/** Gets the config reference and status of an app */
export interface WebAppsGetAppSettingKeyVaultReferenceSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets the config reference app settings and status of an app */
export interface WebAppsGetSiteConnectionStringKeyVaultReferencesSlot200Response
  extends HttpResponse {
  status: "200";
  body: ApiKVReferenceCollectionOutput;
}

/** Gets the config reference app settings and status of an app */
export interface WebAppsGetSiteConnectionStringKeyVaultReferencesSlotdefaultResponse
  extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets the config reference and status of an app */
export interface WebAppsGetSiteConnectionStringKeyVaultReferenceSlot200Response
  extends HttpResponse {
  status: "200";
  body: ApiKVReferenceOutput;
}

/** Gets the config reference and status of an app */
export interface WebAppsGetSiteConnectionStringKeyVaultReferenceSlotdefaultResponse
  extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Replaces the connection strings of an app. */
export interface WebAppsUpdateConnectionStringsSlot200Response extends HttpResponse {
  status: "200";
  body: ConnectionStringDictionaryOutput;
}

/** Replaces the connection strings of an app. */
export interface WebAppsUpdateConnectionStringsSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets the connection strings of an app. */
export interface WebAppsListConnectionStringsSlot200Response extends HttpResponse {
  status: "200";
  body: ConnectionStringDictionaryOutput;
}

/** Gets the connection strings of an app. */
export interface WebAppsListConnectionStringsSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets the logging configuration of an app. */
export interface WebAppsGetDiagnosticLogsConfigurationSlot200Response extends HttpResponse {
  status: "200";
  body: SiteLogsConfigOutput;
}

/** Gets the logging configuration of an app. */
export interface WebAppsGetDiagnosticLogsConfigurationSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Updates the logging configuration of an app. */
export interface WebAppsUpdateDiagnosticLogsConfigSlot200Response extends HttpResponse {
  status: "200";
  body: SiteLogsConfigOutput;
}

/** Updates the logging configuration of an app. */
export interface WebAppsUpdateDiagnosticLogsConfigSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Replaces the metadata of an app. */
export interface WebAppsUpdateMetadataSlot200Response extends HttpResponse {
  status: "200";
  body: StringDictionaryOutput;
}

/** Replaces the metadata of an app. */
export interface WebAppsUpdateMetadataSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets the metadata of an app. */
export interface WebAppsListMetadataSlot200Response extends HttpResponse {
  status: "200";
  body: StringDictionaryOutput;
}

/** Gets the metadata of an app. */
export interface WebAppsListMetadataSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets the Git/FTP publishing credentials of an app. */
export interface WebAppsListPublishingCredentialsSlot200Response extends HttpResponse {
  status: "200";
  body: UserOutput;
}

/** Gets the Git/FTP publishing credentials of an app. */
export interface WebAppsListPublishingCredentialsSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Updates the Push settings associated with web app. */
export interface WebAppsUpdateSitePushSettingsSlot200Response extends HttpResponse {
  status: "200";
  body: PushSettingsOutput;
}

/** Updates the Push settings associated with web app. */
export interface WebAppsUpdateSitePushSettingsSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets the Push settings associated with web app. */
export interface WebAppsListSitePushSettingsSlot200Response extends HttpResponse {
  status: "200";
  body: PushSettingsOutput;
}

/** Gets the Push settings associated with web app. */
export interface WebAppsListSitePushSettingsSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets the configuration of an app, such as platform version and bitness, default documents, virtual applications, Always On, etc. */
export interface WebAppsGetConfigurationSlot200Response extends HttpResponse {
  status: "200";
  body: SiteConfigResourceOutput;
}

/** Gets the configuration of an app, such as platform version and bitness, default documents, virtual applications, Always On, etc. */
export interface WebAppsGetConfigurationSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Updates the configuration of an app. */
export interface WebAppsCreateOrUpdateConfigurationSlot200Response extends HttpResponse {
  status: "200";
  body: SiteConfigResourceOutput;
}

/** Updates the configuration of an app. */
export interface WebAppsCreateOrUpdateConfigurationSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Updates the configuration of an app. */
export interface WebAppsUpdateConfigurationSlot200Response extends HttpResponse {
  status: "200";
  body: SiteConfigResourceOutput;
}

/** Updates the configuration of an app. */
export interface WebAppsUpdateConfigurationSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets a list of web app configuration snapshots identifiers. Each element of the list contains a timestamp and the ID of the snapshot. */
export interface WebAppsListConfigurationSnapshotInfoSlot200Response extends HttpResponse {
  status: "200";
  body: SiteConfigurationSnapshotInfoCollectionOutput;
}

/** Gets a list of web app configuration snapshots identifiers. Each element of the list contains a timestamp and the ID of the snapshot. */
export interface WebAppsListConfigurationSnapshotInfoSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets a snapshot of the configuration of an app at a previous point in time. */
export interface WebAppsGetConfigurationSnapshotSlot200Response extends HttpResponse {
  status: "200";
  body: SiteConfigResourceOutput;
}

/** Gets a snapshot of the configuration of an app at a previous point in time. */
export interface WebAppsGetConfigurationSnapshotSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Reverts the configuration of an app to a previous snapshot. */
export interface WebAppsRecoverSiteConfigurationSnapshotSlot204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Reverts the configuration of an app to a previous snapshot. */
export interface WebAppsRecoverSiteConfigurationSnapshotSlotdefaultResponse extends HttpResponse {
  status: "500";
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
  body: Record<string, unknown>;
}

/** Gets the last lines of docker logs for the given site */
export interface WebAppsGetWebSiteContainerLogsSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: Record<string, unknown>;
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
  body: Record<string, unknown>;
}

/** Gets the ZIP archived docker log files for the given site */
export interface WebAppsGetContainerLogsZipSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: Record<string, unknown>;
}

/** List continuous web jobs for an app, or a deployment slot. */
export interface WebAppsListContinuousWebJobsSlot200Response extends HttpResponse {
  status: "200";
  body: ContinuousWebJobCollectionOutput;
}

/** List continuous web jobs for an app, or a deployment slot. */
export interface WebAppsListContinuousWebJobsSlotdefaultResponse extends HttpResponse {
  status: "500";
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
  body: Record<string, unknown>;
}

/** Gets a continuous web job by its ID for an app, or a deployment slot. */
export interface WebAppsGetContinuousWebJobSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Delete a continuous web job by its ID for an app, or a deployment slot. */
export interface WebAppsDeleteContinuousWebJobSlot200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Delete a continuous web job by its ID for an app, or a deployment slot. */
export interface WebAppsDeleteContinuousWebJobSlot204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete a continuous web job by its ID for an app, or a deployment slot. */
export interface WebAppsDeleteContinuousWebJobSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Start a continuous web job for an app, or a deployment slot. */
export interface WebAppsStartContinuousWebJobSlot200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Start a continuous web job for an app, or a deployment slot. */
export interface WebAppsStartContinuousWebJobSlot404Response extends HttpResponse {
  status: "404";
  body: Record<string, unknown>;
}

/** Start a continuous web job for an app, or a deployment slot. */
export interface WebAppsStartContinuousWebJobSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Stop a continuous web job for an app, or a deployment slot. */
export interface WebAppsStopContinuousWebJobSlot200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Stop a continuous web job for an app, or a deployment slot. */
export interface WebAppsStopContinuousWebJobSlot404Response extends HttpResponse {
  status: "404";
  body: Record<string, unknown>;
}

/** Stop a continuous web job for an app, or a deployment slot. */
export interface WebAppsStopContinuousWebJobSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** List deployments for an app, or a deployment slot. */
export interface WebAppsListDeploymentsSlot200Response extends HttpResponse {
  status: "200";
  body: DeploymentCollectionOutput;
}

/** List deployments for an app, or a deployment slot. */
export interface WebAppsListDeploymentsSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get a deployment by its ID for an app, or a deployment slot. */
export interface WebAppsGetDeploymentSlot200Response extends HttpResponse {
  status: "200";
  body: DeploymentOutput;
}

/** Get a deployment by its ID for an app, or a deployment slot. */
export interface WebAppsGetDeploymentSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Create a deployment for an app, or a deployment slot. */
export interface WebAppsCreateDeploymentSlot200Response extends HttpResponse {
  status: "200";
  body: DeploymentOutput;
}

/** Create a deployment for an app, or a deployment slot. */
export interface WebAppsCreateDeploymentSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Delete a deployment by its ID for an app, or a deployment slot. */
export interface WebAppsDeleteDeploymentSlot200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Delete a deployment by its ID for an app, or a deployment slot. */
export interface WebAppsDeleteDeploymentSlot204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete a deployment by its ID for an app, or a deployment slot. */
export interface WebAppsDeleteDeploymentSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** List deployment log for specific deployment for an app, or a deployment slot. */
export interface WebAppsListDeploymentLogSlot200Response extends HttpResponse {
  status: "200";
  body: DeploymentOutput;
}

/** List deployment log for specific deployment for an app, or a deployment slot. */
export interface WebAppsListDeploymentLogSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Discovers an existing app backup that can be restored from a blob in Azure storage. Use this to get information about the databases stored in a backup. */
export interface WebAppsDiscoverBackupSlot200Response extends HttpResponse {
  status: "200";
  body: RestoreRequestOutput;
}

/** Discovers an existing app backup that can be restored from a blob in Azure storage. Use this to get information about the databases stored in a backup. */
export interface WebAppsDiscoverBackupSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Lists ownership identifiers for domain associated with web app. */
export interface WebAppsListDomainOwnershipIdentifiersSlot200Response extends HttpResponse {
  status: "200";
  body: IdentifierCollectionOutput;
}

/** Lists ownership identifiers for domain associated with web app. */
export interface WebAppsListDomainOwnershipIdentifiersSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get domain ownership identifier for web app. */
export interface WebAppsGetDomainOwnershipIdentifierSlot200Response extends HttpResponse {
  status: "200";
  body: IdentifierOutput;
}

/** Get domain ownership identifier for web app. */
export interface WebAppsGetDomainOwnershipIdentifierSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Creates a domain ownership identifier for web app, or updates an existing ownership identifier. */
export interface WebAppsCreateOrUpdateDomainOwnershipIdentifierSlot200Response
  extends HttpResponse {
  status: "200";
  body: IdentifierOutput;
}

/** Creates a domain ownership identifier for web app, or updates an existing ownership identifier. */
export interface WebAppsCreateOrUpdateDomainOwnershipIdentifierSlotdefaultResponse
  extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Deletes a domain ownership identifier for a web app. */
export interface WebAppsDeleteDomainOwnershipIdentifierSlot200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Deletes a domain ownership identifier for a web app. */
export interface WebAppsDeleteDomainOwnershipIdentifierSlot204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Deletes a domain ownership identifier for a web app. */
export interface WebAppsDeleteDomainOwnershipIdentifierSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Creates a domain ownership identifier for web app, or updates an existing ownership identifier. */
export interface WebAppsUpdateDomainOwnershipIdentifierSlot200Response extends HttpResponse {
  status: "200";
  body: IdentifierOutput;
}

/** Creates a domain ownership identifier for web app, or updates an existing ownership identifier. */
export interface WebAppsUpdateDomainOwnershipIdentifierSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get the status of the last MSDeploy operation. */
export interface WebAppsGetMSDeployStatusSlot200Response extends HttpResponse {
  status: "200";
  body: MSDeployStatusOutput;
}

/** Get the status of the last MSDeploy operation. */
export interface WebAppsGetMSDeployStatusSlotdefaultResponse extends HttpResponse {
  status: "500";
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
  body: Record<string, unknown>;
}

/** Invoke the MSDeploy web app extension. */
export interface WebAppsCreateMSDeployOperationSlotdefaultResponse extends HttpResponse {
  status: "500";
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
  body: Record<string, unknown>;
}

/** Get the MSDeploy Log for the last MSDeploy operation. */
export interface WebAppsGetMSDeployLogSlotdefaultResponse extends HttpResponse {
  status: "500";
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
  body: Record<string, unknown>;
}

/** List the functions for a web site, or a deployment slot. */
export interface WebAppsListInstanceFunctionsSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Fetch a short lived token that can be exchanged for a master key. */
export interface WebAppsGetFunctionsAdminTokenSlot200Response extends HttpResponse {
  status: "200";
  body: string;
}

/** Fetch a short lived token that can be exchanged for a master key. */
export interface WebAppsGetFunctionsAdminTokenSlotdefaultResponse extends HttpResponse {
  status: "500";
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
  body: Record<string, unknown>;
}

/** Get function information by its ID for web site, or a deployment slot. */
export interface WebAppsGetInstanceFunctionSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Create function for web site, or a deployment slot. */
export interface WebAppsCreateInstanceFunctionSlot201Response extends HttpResponse {
  status: "201";
  body: FunctionEnvelopeOutput;
}

/** Create function for web site, or a deployment slot. */
export interface WebAppsCreateInstanceFunctionSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Delete a function for web site, or a deployment slot. */
export interface WebAppsDeleteInstanceFunctionSlot204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete a function for web site, or a deployment slot. */
export interface WebAppsDeleteInstanceFunctionSlot404Response extends HttpResponse {
  status: "404";
  body: Record<string, unknown>;
}

/** Delete a function for web site, or a deployment slot. */
export interface WebAppsDeleteInstanceFunctionSlotdefaultResponse extends HttpResponse {
  status: "500";
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
export interface WebAppsCreateOrUpdateFunctionSecretSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Delete a function secret. */
export interface WebAppsDeleteFunctionSecretSlot204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete a function secret. */
export interface WebAppsDeleteFunctionSecretSlot404Response extends HttpResponse {
  status: "404";
  body: Record<string, unknown>;
}

/** Delete a function secret. */
export interface WebAppsDeleteFunctionSecretSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get function keys for a function in a web site, or a deployment slot. */
export interface WebAppsListFunctionKeysSlot200Response extends HttpResponse {
  status: "200";
  body: StringDictionaryOutput;
}

/** Get function keys for a function in a web site, or a deployment slot. */
export interface WebAppsListFunctionKeysSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get function secrets for a function in a web site, or a deployment slot. */
export interface WebAppsListFunctionSecretsSlot200Response extends HttpResponse {
  status: "200";
  body: FunctionSecretsOutput;
}

/** Get function secrets for a function in a web site, or a deployment slot. */
export interface WebAppsListFunctionSecretsSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get host secrets for a function app. */
export interface WebAppsListHostKeysSlot200Response extends HttpResponse {
  status: "200";
  body: HostKeysOutput;
}

/** Get host secrets for a function app. */
export interface WebAppsListHostKeysSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** This is to allow calling via powershell and ARM template. */
export interface WebAppsListSyncStatusSlot204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** This is to allow calling via powershell and ARM template. */
export interface WebAppsListSyncStatusSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Syncs function trigger metadata to the management database */
export interface WebAppsSyncFunctionsSlot204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Syncs function trigger metadata to the management database */
export interface WebAppsSyncFunctionsSlotdefaultResponse extends HttpResponse {
  status: "500";
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
export interface WebAppsCreateOrUpdateHostSecretSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Delete a host level secret. */
export interface WebAppsDeleteHostSecretSlot204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete a host level secret. */
export interface WebAppsDeleteHostSecretSlot404Response extends HttpResponse {
  status: "404";
  body: Record<string, unknown>;
}

/** Delete a host level secret. */
export interface WebAppsDeleteHostSecretSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get hostname bindings for an app or a deployment slot. */
export interface WebAppsListHostNameBindingsSlot200Response extends HttpResponse {
  status: "200";
  body: HostNameBindingCollectionOutput;
}

/** Get hostname bindings for an app or a deployment slot. */
export interface WebAppsListHostNameBindingsSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get the named hostname binding for an app (or deployment slot, if specified). */
export interface WebAppsGetHostNameBindingSlot200Response extends HttpResponse {
  status: "200";
  body: HostNameBindingOutput;
}

/** Get the named hostname binding for an app (or deployment slot, if specified). */
export interface WebAppsGetHostNameBindingSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Creates a hostname binding for an app. */
export interface WebAppsCreateOrUpdateHostNameBindingSlot200Response extends HttpResponse {
  status: "200";
  body: HostNameBindingOutput;
}

/** Creates a hostname binding for an app. */
export interface WebAppsCreateOrUpdateHostNameBindingSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Deletes a hostname binding for an app. */
export interface WebAppsDeleteHostNameBindingSlot200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Deletes a hostname binding for an app. */
export interface WebAppsDeleteHostNameBindingSlot204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Deletes a hostname binding for an app. */
export interface WebAppsDeleteHostNameBindingSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Retrieves a specific Service Bus Hybrid Connection used by this Web App. */
export interface WebAppsGetHybridConnectionSlot200Response extends HttpResponse {
  status: "200";
  body: HybridConnectionOutput;
}

/** Retrieves a specific Service Bus Hybrid Connection used by this Web App. */
export interface WebAppsGetHybridConnectionSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Creates a new Hybrid Connection using a Service Bus relay. */
export interface WebAppsCreateOrUpdateHybridConnectionSlot200Response extends HttpResponse {
  status: "200";
  body: HybridConnectionOutput;
}

/** Creates a new Hybrid Connection using a Service Bus relay. */
export interface WebAppsCreateOrUpdateHybridConnectionSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Removes a Hybrid Connection from this site. */
export interface WebAppsDeleteHybridConnectionSlot200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Removes a Hybrid Connection from this site. */
export interface WebAppsDeleteHybridConnectionSlot404Response extends HttpResponse {
  status: "404";
  body: Record<string, unknown>;
}

/** Removes a Hybrid Connection from this site. */
export interface WebAppsDeleteHybridConnectionSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Creates a new Hybrid Connection using a Service Bus relay. */
export interface WebAppsUpdateHybridConnectionSlot200Response extends HttpResponse {
  status: "200";
  body: HybridConnectionOutput;
}

/** Creates a new Hybrid Connection using a Service Bus relay. */
export interface WebAppsUpdateHybridConnectionSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Retrieves all Service Bus Hybrid Connections used by this Web App. */
export interface WebAppsListHybridConnectionsSlot200Response extends HttpResponse {
  status: "200";
  body: HybridConnectionOutput;
}

/** Retrieves all Service Bus Hybrid Connections used by this Web App. */
export interface WebAppsListHybridConnectionsSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets hybrid connections configured for an app (or deployment slot, if specified). */
export interface WebAppsListRelayServiceConnectionsSlot200Response extends HttpResponse {
  status: "200";
  body: RelayServiceConnectionEntityOutput;
}

/** Gets hybrid connections configured for an app (or deployment slot, if specified). */
export interface WebAppsListRelayServiceConnectionsSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets a hybrid connection configuration by its name. */
export interface WebAppsGetRelayServiceConnectionSlot200Response extends HttpResponse {
  status: "200";
  body: RelayServiceConnectionEntityOutput;
}

/** Gets a hybrid connection configuration by its name. */
export interface WebAppsGetRelayServiceConnectionSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Creates a new hybrid connection configuration (PUT), or updates an existing one (PATCH). */
export interface WebAppsCreateOrUpdateRelayServiceConnectionSlot200Response extends HttpResponse {
  status: "200";
  body: RelayServiceConnectionEntityOutput;
}

/** Creates a new hybrid connection configuration (PUT), or updates an existing one (PATCH). */
export interface WebAppsCreateOrUpdateRelayServiceConnectionSlotdefaultResponse
  extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Deletes a relay service connection by its name. */
export interface WebAppsDeleteRelayServiceConnectionSlot200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Deletes a relay service connection by its name. */
export interface WebAppsDeleteRelayServiceConnectionSlot404Response extends HttpResponse {
  status: "404";
  body: Record<string, unknown>;
}

/** Deletes a relay service connection by its name. */
export interface WebAppsDeleteRelayServiceConnectionSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Creates a new hybrid connection configuration (PUT), or updates an existing one (PATCH). */
export interface WebAppsUpdateRelayServiceConnectionSlot200Response extends HttpResponse {
  status: "200";
  body: RelayServiceConnectionEntityOutput;
}

/** Creates a new hybrid connection configuration (PUT), or updates an existing one (PATCH). */
export interface WebAppsUpdateRelayServiceConnectionSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets all scale-out instances of an app. */
export interface WebAppsListInstanceIdentifiersSlot200Response extends HttpResponse {
  status: "200";
  body: WebAppInstanceStatusCollectionOutput;
}

/** Gets all scale-out instances of an app. */
export interface WebAppsListInstanceIdentifiersSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets all scale-out instances of an app. */
export interface WebAppsGetInstanceInfoSlot200Response extends HttpResponse {
  status: "200";
  body: WebSiteInstanceStatusOutput;
}

/** Gets all scale-out instances of an app. */
export interface WebAppsGetInstanceInfoSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get the status of the last MSDeploy operation. */
export interface WebAppsGetInstanceMsDeployStatusSlot200Response extends HttpResponse {
  status: "200";
  body: MSDeployStatusOutput;
}

/** Get the status of the last MSDeploy operation. */
export interface WebAppsGetInstanceMsDeployStatusSlotdefaultResponse extends HttpResponse {
  status: "500";
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
  body: Record<string, unknown>;
}

/** Invoke the MSDeploy web app extension. */
export interface WebAppsCreateInstanceMSDeployOperationSlotdefaultResponse extends HttpResponse {
  status: "500";
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
  body: Record<string, unknown>;
}

/** Get the MSDeploy Log for the last MSDeploy operation. */
export interface WebAppsGetInstanceMSDeployLogSlotdefaultResponse extends HttpResponse {
  status: "500";
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
  body: Record<string, unknown>;
}

/** Get list of processes for a web site, or a deployment slot, or for a specific scaled-out instance in a web site. */
export interface WebAppsListInstanceProcessesSlotdefaultResponse extends HttpResponse {
  status: "500";
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
  body: Record<string, unknown>;
}

/** Get process information by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsGetInstanceProcessSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Terminate a process by its ID for a web site, or a deployment slot, or specific scaled-out instance in a web site. */
export interface WebAppsDeleteInstanceProcessSlot204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Terminate a process by its ID for a web site, or a deployment slot, or specific scaled-out instance in a web site. */
export interface WebAppsDeleteInstanceProcessSlot404Response extends HttpResponse {
  status: "404";
  body: Record<string, unknown>;
}

/** Terminate a process by its ID for a web site, or a deployment slot, or specific scaled-out instance in a web site. */
export interface WebAppsDeleteInstanceProcessSlotdefaultResponse extends HttpResponse {
  status: "500";
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
  body: Record<string, unknown>;
}

/** Get a memory dump of a process by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsGetInstanceProcessDumpSlotdefaultResponse extends HttpResponse {
  status: "500";
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
  body: Record<string, unknown>;
}

/** List module information for a process by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsListInstanceProcessModulesSlotdefaultResponse extends HttpResponse {
  status: "500";
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
  body: Record<string, unknown>;
}

/** Get process information by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsGetInstanceProcessModuleSlotdefaultResponse extends HttpResponse {
  status: "500";
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
  body: Record<string, unknown>;
}

/** List the threads in a process by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsListInstanceProcessThreadsSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Shows whether an app can be cloned to another resource group or subscription. */
export interface WebAppsIsCloneableSlot200Response extends HttpResponse {
  status: "200";
  body: SiteCloneabilityOutput;
}

/** Shows whether an app can be cloned to another resource group or subscription. */
export interface WebAppsIsCloneableSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets existing backups of an app. */
export interface WebAppsListSiteBackupsSlot200Response extends HttpResponse {
  status: "200";
  body: BackupItemCollectionOutput;
}

/** Gets existing backups of an app. */
export interface WebAppsListSiteBackupsSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** This is to allow calling via powershell and ARM template. */
export interface WebAppsListSyncFunctionTriggersSlot200Response extends HttpResponse {
  status: "200";
  body: FunctionSecretsOutput;
}

/** This is to allow calling via powershell and ARM template. */
export interface WebAppsListSyncFunctionTriggersSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Returns the status of MySql in app migration, if one is active, and whether or not MySql in app is enabled */
export interface WebAppsGetMigrateMySqlStatusSlot200Response extends HttpResponse {
  status: "200";
  body: MigrateMySqlStatusOutput;
}

/** Returns the status of MySql in app migration, if one is active, and whether or not MySql in app is enabled */
export interface WebAppsGetMigrateMySqlStatusSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets a Swift Virtual Network connection. */
export interface WebAppsGetSwiftVirtualNetworkConnectionSlot200Response extends HttpResponse {
  status: "200";
  body: SwiftVirtualNetworkOutput;
}

/** Gets a Swift Virtual Network connection. */
export interface WebAppsGetSwiftVirtualNetworkConnectionSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/**
 * Integrates this Web App with a Virtual Network. This requires that 1) "swiftSupported" is true when doing a GET against this resource, and 2) that the target Subnet has already been delegated, and is not
 * in use by another App Service Plan other than the one this App is in.
 */
export interface WebAppsCreateOrUpdateSwiftVirtualNetworkConnectionWithCheckSlot200Response
  extends HttpResponse {
  status: "200";
  body: SwiftVirtualNetworkOutput;
}

/**
 * Integrates this Web App with a Virtual Network. This requires that 1) "swiftSupported" is true when doing a GET against this resource, and 2) that the target Subnet has already been delegated, and is not
 * in use by another App Service Plan other than the one this App is in.
 */
export interface WebAppsCreateOrUpdateSwiftVirtualNetworkConnectionWithCheckSlotdefaultResponse
  extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Deletes a Swift Virtual Network connection from an app (or deployment slot). */
export interface WebAppsDeleteSwiftVirtualNetworkSlot200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Deletes a Swift Virtual Network connection from an app (or deployment slot). */
export interface WebAppsDeleteSwiftVirtualNetworkSlot404Response extends HttpResponse {
  status: "404";
  body: Record<string, unknown>;
}

/** Deletes a Swift Virtual Network connection from an app (or deployment slot). */
export interface WebAppsDeleteSwiftVirtualNetworkSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/**
 * Integrates this Web App with a Virtual Network. This requires that 1) "swiftSupported" is true when doing a GET against this resource, and 2) that the target Subnet has already been delegated, and is not
 * in use by another App Service Plan other than the one this App is in.
 */
export interface WebAppsUpdateSwiftVirtualNetworkConnectionWithCheckSlot200Response
  extends HttpResponse {
  status: "200";
  body: SwiftVirtualNetworkOutput;
}

/**
 * Integrates this Web App with a Virtual Network. This requires that 1) "swiftSupported" is true when doing a GET against this resource, and 2) that the target Subnet has already been delegated, and is not
 * in use by another App Service Plan other than the one this App is in.
 */
export interface WebAppsUpdateSwiftVirtualNetworkConnectionWithCheckSlotdefaultResponse
  extends HttpResponse {
  status: "500";
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
  body: Record<string, unknown>;
}

/** Gets all network features used by the app (or deployment slot, if specified). */
export interface WebAppsListNetworkFeaturesSlotdefaultResponse extends HttpResponse {
  status: "500";
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
export interface WebAppsGetNetworkTraceOperationSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Start capturing network packets for the site (To be deprecated). */
export interface WebAppsStartWebSiteNetworkTraceSlot200Response extends HttpResponse {
  status: "200";
  body: string;
}

/** Start capturing network packets for the site (To be deprecated). */
export interface WebAppsStartWebSiteNetworkTraceSlotdefaultResponse extends HttpResponse {
  status: "500";
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
export interface WebAppsStartWebSiteNetworkTraceOperationSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Stop ongoing capturing network packets for the site. */
export interface WebAppsStopWebSiteNetworkTraceSlot200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Stop ongoing capturing network packets for the site. */
export interface WebAppsStopWebSiteNetworkTraceSlot204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Stop ongoing capturing network packets for the site. */
export interface WebAppsStopWebSiteNetworkTraceSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets a named operation for a network trace capturing (or deployment slot, if specified). */
export interface WebAppsGetNetworkTracesSlot200Response extends HttpResponse {
  status: "200";
  body: Array<NetworkTraceOutput>;
}

/** Gets a named operation for a network trace capturing (or deployment slot, if specified). */
export interface WebAppsGetNetworkTracesSlotdefaultResponse extends HttpResponse {
  status: "500";
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
export interface WebAppsGetNetworkTraceOperationSlotV2defaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets a named operation for a network trace capturing (or deployment slot, if specified). */
export interface WebAppsGetNetworkTracesSlotV2200Response extends HttpResponse {
  status: "200";
  body: Array<NetworkTraceOutput>;
}

/** Gets a named operation for a network trace capturing (or deployment slot, if specified). */
export interface WebAppsGetNetworkTracesSlotV2defaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Generates a new publishing password for an app (or deployment slot, if specified). */
export interface WebAppsGenerateNewSitePublishingPasswordSlot200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Generates a new publishing password for an app (or deployment slot, if specified). */
export interface WebAppsGenerateNewSitePublishingPasswordSlot204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Generates a new publishing password for an app (or deployment slot, if specified). */
export interface WebAppsGenerateNewSitePublishingPasswordSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets perfmon counters for web app. */
export interface WebAppsListPerfMonCountersSlot200Response extends HttpResponse {
  status: "200";
  body: PerfMonCounterCollectionOutput;
}

/** Gets perfmon counters for web app. */
export interface WebAppsListPerfMonCountersSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets web app's event logs. */
export interface WebAppsGetSitePhpErrorLogFlagSlot200Response extends HttpResponse {
  status: "200";
  body: SitePhpErrorLogFlagOutput;
}

/** Gets web app's event logs. */
export interface WebAppsGetSitePhpErrorLogFlagSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets the premier add-ons of an app. */
export interface WebAppsListPremierAddOnsSlot200Response extends HttpResponse {
  status: "200";
  body: PremierAddOnOutput;
}

/** Gets the premier add-ons of an app. */
export interface WebAppsListPremierAddOnsSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets a named add-on of an app. */
export interface WebAppsGetPremierAddOnSlot200Response extends HttpResponse {
  status: "200";
  body: PremierAddOnOutput;
}

/** Gets a named add-on of an app. */
export interface WebAppsGetPremierAddOnSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Updates a named add-on of an app. */
export interface WebAppsAddPremierAddOnSlot200Response extends HttpResponse {
  status: "200";
  body: PremierAddOnOutput;
}

/** Updates a named add-on of an app. */
export interface WebAppsAddPremierAddOnSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Delete a premier add-on from an app. */
export interface WebAppsDeletePremierAddOnSlot200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Delete a premier add-on from an app. */
export interface WebAppsDeletePremierAddOnSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Updates a named add-on of an app. */
export interface WebAppsUpdatePremierAddOnSlot200Response extends HttpResponse {
  status: "200";
  body: PremierAddOnOutput;
}

/** Updates a named add-on of an app. */
export interface WebAppsUpdatePremierAddOnSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets data around private site access enablement and authorized Virtual Networks that can access the site. */
export interface WebAppsGetPrivateAccessSlot200Response extends HttpResponse {
  status: "200";
  body: PrivateAccessOutput;
}

/** Gets data around private site access enablement and authorized Virtual Networks that can access the site. */
export interface WebAppsGetPrivateAccessSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Sets data around private site access enablement and authorized Virtual Networks that can access the site. */
export interface WebAppsPutPrivateAccessVnetSlot200Response extends HttpResponse {
  status: "200";
  body: PrivateAccessOutput;
}

/** Sets data around private site access enablement and authorized Virtual Networks that can access the site. */
export interface WebAppsPutPrivateAccessVnetSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets the list of private endpoint connections associated with a site */
export interface WebAppsGetPrivateEndpointConnectionListSlot200Response extends HttpResponse {
  status: "200";
  body: PrivateEndpointConnectionCollectionOutput;
}

/** Gets the list of private endpoint connections associated with a site */
export interface WebAppsGetPrivateEndpointConnectionListSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets a private endpoint connection */
export interface WebAppsGetPrivateEndpointConnectionSlot200Response extends HttpResponse {
  status: "200";
  body: RemotePrivateEndpointConnectionARMResourceOutput;
}

/** Gets a private endpoint connection */
export interface WebAppsGetPrivateEndpointConnectionSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Approves or rejects a private endpoint connection */
export interface WebAppsApproveOrRejectPrivateEndpointConnectionSlot200Response
  extends HttpResponse {
  status: "200";
  body: RemotePrivateEndpointConnectionARMResourceOutput;
}

/** Approves or rejects a private endpoint connection */
export interface WebAppsApproveOrRejectPrivateEndpointConnectionSlot202Response
  extends HttpResponse {
  status: "202";
  body: RemotePrivateEndpointConnectionARMResourceOutput;
}

/** Approves or rejects a private endpoint connection */
export interface WebAppsApproveOrRejectPrivateEndpointConnectionSlotdefaultResponse
  extends HttpResponse {
  status: "500";
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
export interface WebAppsDeletePrivateEndpointConnectionSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets the private link resources */
export interface WebAppsGetPrivateLinkResourcesSlot200Response extends HttpResponse {
  status: "200";
  body: PrivateLinkResourcesWrapperOutput;
}

/** Gets the private link resources */
export interface WebAppsGetPrivateLinkResourcesSlotdefaultResponse extends HttpResponse {
  status: "500";
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
  body: Record<string, unknown>;
}

/** Get list of processes for a web site, or a deployment slot, or for a specific scaled-out instance in a web site. */
export interface WebAppsListProcessesSlotdefaultResponse extends HttpResponse {
  status: "500";
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
  body: Record<string, unknown>;
}

/** Get process information by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsGetProcessSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Terminate a process by its ID for a web site, or a deployment slot, or specific scaled-out instance in a web site. */
export interface WebAppsDeleteProcessSlot204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Terminate a process by its ID for a web site, or a deployment slot, or specific scaled-out instance in a web site. */
export interface WebAppsDeleteProcessSlot404Response extends HttpResponse {
  status: "404";
  body: Record<string, unknown>;
}

/** Terminate a process by its ID for a web site, or a deployment slot, or specific scaled-out instance in a web site. */
export interface WebAppsDeleteProcessSlotdefaultResponse extends HttpResponse {
  status: "500";
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
  body: Record<string, unknown>;
}

/** Get a memory dump of a process by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsGetProcessDumpSlotdefaultResponse extends HttpResponse {
  status: "500";
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
  body: Record<string, unknown>;
}

/** List module information for a process by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsListProcessModulesSlotdefaultResponse extends HttpResponse {
  status: "500";
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
  body: Record<string, unknown>;
}

/** Get process information by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsGetProcessModuleSlotdefaultResponse extends HttpResponse {
  status: "500";
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
  body: Record<string, unknown>;
}

/** List the threads in a process by its ID for a specific scaled-out instance in a web site. */
export interface WebAppsListProcessThreadsSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get public certificates for an app or a deployment slot. */
export interface WebAppsListPublicCertificatesSlot200Response extends HttpResponse {
  status: "200";
  body: PublicCertificateCollectionOutput;
}

/** Get public certificates for an app or a deployment slot. */
export interface WebAppsListPublicCertificatesSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get the named public certificate for an app (or deployment slot, if specified). */
export interface WebAppsGetPublicCertificateSlot200Response extends HttpResponse {
  status: "200";
  body: PublicCertificateOutput;
}

/** Get the named public certificate for an app (or deployment slot, if specified). */
export interface WebAppsGetPublicCertificateSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Creates a hostname binding for an app. */
export interface WebAppsCreateOrUpdatePublicCertificateSlot200Response extends HttpResponse {
  status: "200";
  body: PublicCertificateOutput;
}

/** Creates a hostname binding for an app. */
export interface WebAppsCreateOrUpdatePublicCertificateSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Deletes a hostname binding for an app. */
export interface WebAppsDeletePublicCertificateSlot200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Deletes a hostname binding for an app. */
export interface WebAppsDeletePublicCertificateSlot204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Deletes a hostname binding for an app. */
export interface WebAppsDeletePublicCertificateSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets the publishing profile for an app (or deployment slot, if specified). */
export interface WebAppsListPublishingProfileXmlWithSecretsSlot200Response extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
}

/** Gets the publishing profile for an app (or deployment slot, if specified). */
export interface WebAppsListPublishingProfileXmlWithSecretsSlotdefaultResponse
  extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Resets the configuration settings of the current slot if they were previously modified by calling the API with POST. */
export interface WebAppsResetSlotConfigurationSlot200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Resets the configuration settings of the current slot if they were previously modified by calling the API with POST. */
export interface WebAppsResetSlotConfigurationSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Restarts an app (or deployment slot, if specified). */
export interface WebAppsRestartSlot200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Restarts an app (or deployment slot, if specified). */
export interface WebAppsRestartSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Restores an app from a backup blob in Azure Storage. */
export interface WebAppsRestoreFromBackupBlobSlot200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Restores an app from a backup blob in Azure Storage. */
export interface WebAppsRestoreFromBackupBlobSlot202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Restores an app from a backup blob in Azure Storage. */
export interface WebAppsRestoreFromBackupBlobSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Restores a deleted web app to this web app. */
export interface WebAppsRestoreFromDeletedAppSlot200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Restores a deleted web app to this web app. */
export interface WebAppsRestoreFromDeletedAppSlot202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Restores a deleted web app to this web app. */
export interface WebAppsRestoreFromDeletedAppSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Restores a web app from a snapshot. */
export interface WebAppsRestoreSnapshotSlot200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Restores a web app from a snapshot. */
export interface WebAppsRestoreSnapshotSlot202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Restores a web app from a snapshot. */
export interface WebAppsRestoreSnapshotSlotdefaultResponse extends HttpResponse {
  status: "500";
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
  body: Record<string, unknown>;
}

/** Get list of siteextensions for a web site, or a deployment slot. */
export interface WebAppsListSiteExtensionsSlotdefaultResponse extends HttpResponse {
  status: "500";
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
  body: Record<string, unknown>;
}

/** Get site extension information by its ID for a web site, or a deployment slot. */
export interface WebAppsGetSiteExtensionSlotdefaultResponse extends HttpResponse {
  status: "500";
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
  body: Record<string, unknown>;
}

/** Install site extension on a web site, or a deployment slot. */
export interface WebAppsInstallSiteExtensionSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Remove a site extension from a web site, or a deployment slot. */
export interface WebAppsDeleteSiteExtensionSlot204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Remove a site extension from a web site, or a deployment slot. */
export interface WebAppsDeleteSiteExtensionSlot404Response extends HttpResponse {
  status: "404";
  body: Record<string, unknown>;
}

/** Remove a site extension from a web site, or a deployment slot. */
export interface WebAppsDeleteSiteExtensionSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get the difference in configuration settings between two web app slots. */
export interface WebAppsListSlotDifferencesSlot200Response extends HttpResponse {
  status: "200";
  body: SlotDifferenceCollectionOutput;
}

/** Get the difference in configuration settings between two web app slots. */
export interface WebAppsListSlotDifferencesSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Swaps two deployment slots of an app. */
export interface WebAppsSwapSlot200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Swaps two deployment slots of an app. */
export interface WebAppsSwapSlot202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Swaps two deployment slots of an app. */
export interface WebAppsSwapSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Returns all Snapshots to the user. */
export interface WebAppsListSnapshotsSlot200Response extends HttpResponse {
  status: "200";
  body: SnapshotCollectionOutput;
}

/** Returns all Snapshots to the user. */
export interface WebAppsListSnapshotsSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Returns all Snapshots to the user from DRSecondary endpoint. */
export interface WebAppsListSnapshotsFromDRSecondarySlot200Response extends HttpResponse {
  status: "200";
  body: SnapshotCollectionOutput;
}

/** Returns all Snapshots to the user from DRSecondary endpoint. */
export interface WebAppsListSnapshotsFromDRSecondarySlotdefaultResponse extends HttpResponse {
  status: "500";
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
export interface WebAppsGetSourceControlSlotdefaultResponse extends HttpResponse {
  status: "500";
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
export interface WebAppsCreateOrUpdateSourceControlSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Deletes the source control configuration of an app. */
export interface WebAppsDeleteSourceControlSlot200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Deletes the source control configuration of an app. */
export interface WebAppsDeleteSourceControlSlot202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Deletes the source control configuration of an app. */
export interface WebAppsDeleteSourceControlSlot404Response extends HttpResponse {
  status: "404";
  body: Record<string, unknown>;
}

/** Deletes the source control configuration of an app. */
export interface WebAppsDeleteSourceControlSlotdefaultResponse extends HttpResponse {
  status: "500";
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
export interface WebAppsUpdateSourceControlSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Starts an app (or deployment slot, if specified). */
export interface WebAppsStartSlot200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Starts an app (or deployment slot, if specified). */
export interface WebAppsStartSlotdefaultResponse extends HttpResponse {
  status: "500";
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
export interface WebAppsStartNetworkTraceSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Stops an app (or deployment slot, if specified). */
export interface WebAppsStopSlot200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Stops an app (or deployment slot, if specified). */
export interface WebAppsStopSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Stop ongoing capturing network packets for the site. */
export interface WebAppsStopNetworkTraceSlot200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Stop ongoing capturing network packets for the site. */
export interface WebAppsStopNetworkTraceSlot204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Stop ongoing capturing network packets for the site. */
export interface WebAppsStopNetworkTraceSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Sync web app repository. */
export interface WebAppsSyncRepositorySlot200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Sync web app repository. */
export interface WebAppsSyncRepositorySlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Syncs function trigger metadata to the management database */
export interface WebAppsSyncFunctionTriggersSlot204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Syncs function trigger metadata to the management database */
export interface WebAppsSyncFunctionTriggersSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** List triggered web jobs for an app, or a deployment slot. */
export interface WebAppsListTriggeredWebJobsSlot200Response extends HttpResponse {
  status: "200";
  body: TriggeredWebJobCollectionOutput;
}

/** List triggered web jobs for an app, or a deployment slot. */
export interface WebAppsListTriggeredWebJobsSlotdefaultResponse extends HttpResponse {
  status: "500";
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
  body: Record<string, unknown>;
}

/** Gets a triggered web job by its ID for an app, or a deployment slot. */
export interface WebAppsGetTriggeredWebJobSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Delete a triggered web job by its ID for an app, or a deployment slot. */
export interface WebAppsDeleteTriggeredWebJobSlot200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Delete a triggered web job by its ID for an app, or a deployment slot. */
export interface WebAppsDeleteTriggeredWebJobSlot204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete a triggered web job by its ID for an app, or a deployment slot. */
export interface WebAppsDeleteTriggeredWebJobSlotdefaultResponse extends HttpResponse {
  status: "500";
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
  body: Record<string, unknown>;
}

/** List a triggered web job's history for an app, or a deployment slot. */
export interface WebAppsListTriggeredWebJobHistorySlotdefaultResponse extends HttpResponse {
  status: "500";
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
  body: Record<string, unknown>;
}

/** Gets a triggered web job's history by its ID for an app, , or a deployment slot. */
export interface WebAppsGetTriggeredWebJobHistorySlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Run a triggered web job for an app, or a deployment slot. */
export interface WebAppsRunTriggeredWebJobSlot200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Run a triggered web job for an app, or a deployment slot. */
export interface WebAppsRunTriggeredWebJobSlot404Response extends HttpResponse {
  status: "404";
  body: Record<string, unknown>;
}

/** Run a triggered web job for an app, or a deployment slot. */
export interface WebAppsRunTriggeredWebJobSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets the quota usage information of an app (or deployment slot, if specified). */
export interface WebAppsListUsagesSlot200Response extends HttpResponse {
  status: "200";
  body: CsmUsageQuotaCollectionOutput;
}

/** Gets the quota usage information of an app (or deployment slot, if specified). */
export interface WebAppsListUsagesSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets the virtual networks the app (or deployment slot) is connected to. */
export interface WebAppsListVnetConnectionsSlot200Response extends HttpResponse {
  status: "200";
  body: Array<VnetInfoResourceOutput>;
}

/** Gets the virtual networks the app (or deployment slot) is connected to. */
export interface WebAppsListVnetConnectionsSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets a virtual network the app (or deployment slot) is connected to by name. */
export interface WebAppsGetVnetConnectionSlot200Response extends HttpResponse {
  status: "200";
  body: VnetInfoResourceOutput;
}

/** Gets a virtual network the app (or deployment slot) is connected to by name. */
export interface WebAppsGetVnetConnectionSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Adds a Virtual Network connection to an app or slot (PUT) or updates the connection properties (PATCH). */
export interface WebAppsCreateOrUpdateVnetConnectionSlot200Response extends HttpResponse {
  status: "200";
  body: VnetInfoResourceOutput;
}

/** Adds a Virtual Network connection to an app or slot (PUT) or updates the connection properties (PATCH). */
export interface WebAppsCreateOrUpdateVnetConnectionSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Deletes a connection from an app (or deployment slot to a named virtual network. */
export interface WebAppsDeleteVnetConnectionSlot200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Deletes a connection from an app (or deployment slot to a named virtual network. */
export interface WebAppsDeleteVnetConnectionSlot404Response extends HttpResponse {
  status: "404";
  body: Record<string, unknown>;
}

/** Deletes a connection from an app (or deployment slot to a named virtual network. */
export interface WebAppsDeleteVnetConnectionSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Adds a Virtual Network connection to an app or slot (PUT) or updates the connection properties (PATCH). */
export interface WebAppsUpdateVnetConnectionSlot200Response extends HttpResponse {
  status: "200";
  body: VnetInfoResourceOutput;
}

/** Adds a Virtual Network connection to an app or slot (PUT) or updates the connection properties (PATCH). */
export interface WebAppsUpdateVnetConnectionSlotdefaultResponse extends HttpResponse {
  status: "500";
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
  body: Record<string, unknown>;
}

/** Gets an app's Virtual Network gateway. */
export interface WebAppsGetVnetConnectionGatewaySlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Adds a gateway to a connected Virtual Network (PUT) or updates it (PATCH). */
export interface WebAppsCreateOrUpdateVnetConnectionGatewaySlot200Response extends HttpResponse {
  status: "200";
  body: VnetGatewayOutput;
}

/** Adds a gateway to a connected Virtual Network (PUT) or updates it (PATCH). */
export interface WebAppsCreateOrUpdateVnetConnectionGatewaySlotdefaultResponse
  extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Adds a gateway to a connected Virtual Network (PUT) or updates it (PATCH). */
export interface WebAppsUpdateVnetConnectionGatewaySlot200Response extends HttpResponse {
  status: "200";
  body: VnetGatewayOutput;
}

/** Adds a gateway to a connected Virtual Network (PUT) or updates it (PATCH). */
export interface WebAppsUpdateVnetConnectionGatewaySlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** List webjobs for an app, or a deployment slot. */
export interface WebAppsListWebJobsSlot200Response extends HttpResponse {
  status: "200";
  body: WebJobCollectionOutput;
}

/** List webjobs for an app, or a deployment slot. */
export interface WebAppsListWebJobsSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get webjob information for an app, or a deployment slot. */
export interface WebAppsGetWebJobSlot200Response extends HttpResponse {
  status: "200";
  body: WebJobOutput;
}

/** Get webjob information for an app, or a deployment slot. */
export interface WebAppsGetWebJobSlotdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get the difference in configuration settings between two web app slots. */
export interface WebAppsListSlotDifferencesFromProduction200Response extends HttpResponse {
  status: "200";
  body: SlotDifferenceCollectionOutput;
}

/** Get the difference in configuration settings between two web app slots. */
export interface WebAppsListSlotDifferencesFromProductiondefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Swaps two deployment slots of an app. */
export interface WebAppsSwapSlotWithProduction200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Swaps two deployment slots of an app. */
export interface WebAppsSwapSlotWithProduction202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Swaps two deployment slots of an app. */
export interface WebAppsSwapSlotWithProductiondefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Returns all Snapshots to the user. */
export interface WebAppsListSnapshots200Response extends HttpResponse {
  status: "200";
  body: SnapshotCollectionOutput;
}

/** Returns all Snapshots to the user. */
export interface WebAppsListSnapshotsdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Returns all Snapshots to the user from DRSecondary endpoint. */
export interface WebAppsListSnapshotsFromDRSecondary200Response extends HttpResponse {
  status: "200";
  body: SnapshotCollectionOutput;
}

/** Returns all Snapshots to the user from DRSecondary endpoint. */
export interface WebAppsListSnapshotsFromDRSecondarydefaultResponse extends HttpResponse {
  status: "500";
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
export interface WebAppsGetSourceControldefaultResponse extends HttpResponse {
  status: "500";
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
export interface WebAppsCreateOrUpdateSourceControldefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Deletes the source control configuration of an app. */
export interface WebAppsDeleteSourceControl200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Deletes the source control configuration of an app. */
export interface WebAppsDeleteSourceControl202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Deletes the source control configuration of an app. */
export interface WebAppsDeleteSourceControl404Response extends HttpResponse {
  status: "404";
  body: Record<string, unknown>;
}

/** Deletes the source control configuration of an app. */
export interface WebAppsDeleteSourceControldefaultResponse extends HttpResponse {
  status: "500";
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
export interface WebAppsUpdateSourceControldefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Starts an app (or deployment slot, if specified). */
export interface WebAppsStart200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Starts an app (or deployment slot, if specified). */
export interface WebAppsStartdefaultResponse extends HttpResponse {
  status: "500";
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
export interface WebAppsStartNetworkTracedefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Stops an app (or deployment slot, if specified). */
export interface WebAppsStop200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Stops an app (or deployment slot, if specified). */
export interface WebAppsStopdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Stop ongoing capturing network packets for the site. */
export interface WebAppsStopNetworkTrace200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Stop ongoing capturing network packets for the site. */
export interface WebAppsStopNetworkTrace204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Stop ongoing capturing network packets for the site. */
export interface WebAppsStopNetworkTracedefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Sync web app repository. */
export interface WebAppsSyncRepository200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Sync web app repository. */
export interface WebAppsSyncRepositorydefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Syncs function trigger metadata to the management database */
export interface WebAppsSyncFunctionTriggers204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Syncs function trigger metadata to the management database */
export interface WebAppsSyncFunctionTriggersdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** List triggered web jobs for an app, or a deployment slot. */
export interface WebAppsListTriggeredWebJobs200Response extends HttpResponse {
  status: "200";
  body: TriggeredWebJobCollectionOutput;
}

/** List triggered web jobs for an app, or a deployment slot. */
export interface WebAppsListTriggeredWebJobsdefaultResponse extends HttpResponse {
  status: "500";
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
  body: Record<string, unknown>;
}

/** Gets a triggered web job by its ID for an app, or a deployment slot. */
export interface WebAppsGetTriggeredWebJobdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Delete a triggered web job by its ID for an app, or a deployment slot. */
export interface WebAppsDeleteTriggeredWebJob200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Delete a triggered web job by its ID for an app, or a deployment slot. */
export interface WebAppsDeleteTriggeredWebJob204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete a triggered web job by its ID for an app, or a deployment slot. */
export interface WebAppsDeleteTriggeredWebJobdefaultResponse extends HttpResponse {
  status: "500";
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
  body: Record<string, unknown>;
}

/** List a triggered web job's history for an app, or a deployment slot. */
export interface WebAppsListTriggeredWebJobHistorydefaultResponse extends HttpResponse {
  status: "500";
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
  body: Record<string, unknown>;
}

/** Gets a triggered web job's history by its ID for an app, , or a deployment slot. */
export interface WebAppsGetTriggeredWebJobHistorydefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Run a triggered web job for an app, or a deployment slot. */
export interface WebAppsRunTriggeredWebJob200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Run a triggered web job for an app, or a deployment slot. */
export interface WebAppsRunTriggeredWebJob404Response extends HttpResponse {
  status: "404";
  body: Record<string, unknown>;
}

/** Run a triggered web job for an app, or a deployment slot. */
export interface WebAppsRunTriggeredWebJobdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets the quota usage information of an app (or deployment slot, if specified). */
export interface WebAppsListUsages200Response extends HttpResponse {
  status: "200";
  body: CsmUsageQuotaCollectionOutput;
}

/** Gets the quota usage information of an app (or deployment slot, if specified). */
export interface WebAppsListUsagesdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets the virtual networks the app (or deployment slot) is connected to. */
export interface WebAppsListVnetConnections200Response extends HttpResponse {
  status: "200";
  body: Array<VnetInfoResourceOutput>;
}

/** Gets the virtual networks the app (or deployment slot) is connected to. */
export interface WebAppsListVnetConnectionsdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Gets a virtual network the app (or deployment slot) is connected to by name. */
export interface WebAppsGetVnetConnection200Response extends HttpResponse {
  status: "200";
  body: VnetInfoResourceOutput;
}

/** Gets a virtual network the app (or deployment slot) is connected to by name. */
export interface WebAppsGetVnetConnectiondefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Adds a Virtual Network connection to an app or slot (PUT) or updates the connection properties (PATCH). */
export interface WebAppsCreateOrUpdateVnetConnection200Response extends HttpResponse {
  status: "200";
  body: VnetInfoResourceOutput;
}

/** Adds a Virtual Network connection to an app or slot (PUT) or updates the connection properties (PATCH). */
export interface WebAppsCreateOrUpdateVnetConnectiondefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Deletes a connection from an app (or deployment slot to a named virtual network. */
export interface WebAppsDeleteVnetConnection200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Deletes a connection from an app (or deployment slot to a named virtual network. */
export interface WebAppsDeleteVnetConnection404Response extends HttpResponse {
  status: "404";
  body: Record<string, unknown>;
}

/** Deletes a connection from an app (or deployment slot to a named virtual network. */
export interface WebAppsDeleteVnetConnectiondefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Adds a Virtual Network connection to an app or slot (PUT) or updates the connection properties (PATCH). */
export interface WebAppsUpdateVnetConnection200Response extends HttpResponse {
  status: "200";
  body: VnetInfoResourceOutput;
}

/** Adds a Virtual Network connection to an app or slot (PUT) or updates the connection properties (PATCH). */
export interface WebAppsUpdateVnetConnectiondefaultResponse extends HttpResponse {
  status: "500";
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
  body: Record<string, unknown>;
}

/** Gets an app's Virtual Network gateway. */
export interface WebAppsGetVnetConnectionGatewaydefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Adds a gateway to a connected Virtual Network (PUT) or updates it (PATCH). */
export interface WebAppsCreateOrUpdateVnetConnectionGateway200Response extends HttpResponse {
  status: "200";
  body: VnetGatewayOutput;
}

/** Adds a gateway to a connected Virtual Network (PUT) or updates it (PATCH). */
export interface WebAppsCreateOrUpdateVnetConnectionGatewaydefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Adds a gateway to a connected Virtual Network (PUT) or updates it (PATCH). */
export interface WebAppsUpdateVnetConnectionGateway200Response extends HttpResponse {
  status: "200";
  body: VnetGatewayOutput;
}

/** Adds a gateway to a connected Virtual Network (PUT) or updates it (PATCH). */
export interface WebAppsUpdateVnetConnectionGatewaydefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** List webjobs for an app, or a deployment slot. */
export interface WebAppsListWebJobs200Response extends HttpResponse {
  status: "200";
  body: WebJobCollectionOutput;
}

/** List webjobs for an app, or a deployment slot. */
export interface WebAppsListWebJobsdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}

/** Get webjob information for an app, or a deployment slot. */
export interface WebAppsGetWebJob200Response extends HttpResponse {
  status: "200";
  body: WebJobOutput;
}

/** Get webjob information for an app, or a deployment slot. */
export interface WebAppsGetWebJobdefaultResponse extends HttpResponse {
  status: "500";
  body: DefaultErrorResponseOutput;
}
