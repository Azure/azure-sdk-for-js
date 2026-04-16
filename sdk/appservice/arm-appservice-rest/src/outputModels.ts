// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** Collection of certificate orders. */
export interface AppServiceCertificateOrderCollectionOutput {
  /** Collection of resources. */
  value: Array<AppServiceCertificateOrderOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** SSL certificate purchase order. */
export interface AppServiceCertificateOrderOutput extends ResourceOutput {
  /** AppServiceCertificateOrder resource specific properties */
  properties?: AppServiceCertificateOrderPropertiesOutput;
}

/** AppServiceCertificateOrder resource specific properties */
export interface AppServiceCertificateOrderPropertiesOutput {
  /** State of the Key Vault secret. */
  certificates?: Record<string, AppServiceCertificateOutput>;
  /** Certificate distinguished name. */
  distinguishedName?: string;
  /** Domain verification token. */
  readonly domainVerificationToken?: string;
  /** Duration in years (must be 1). */
  validityInYears?: number;
  /** Certificate key size. */
  keySize?: number;
  /** Certificate product type. */
  productType: "StandardDomainValidatedSsl" | "StandardDomainValidatedWildCardSsl";
  /** <code>true</code> if the certificate should be automatically renewed when it expires; otherwise, <code>false</code>. */
  autoRenew?: boolean;
  /** Status of certificate order. */
  readonly provisioningState?: "Succeeded" | "Failed" | "Canceled" | "InProgress" | "Deleting";
  /** Current order status. */
  readonly status?:
    | "Pendingissuance"
    | "Issued"
    | "Revoked"
    | "Canceled"
    | "Denied"
    | "Pendingrevocation"
    | "PendingRekey"
    | "Unused"
    | "Expired"
    | "NotSubmitted";
  /** Signed certificate. */
  readonly signedCertificate?: CertificateDetailsOutput;
  /** Last CSR that was created for this order. */
  csr?: string;
  /** Intermediate certificate. */
  readonly intermediate?: CertificateDetailsOutput;
  /** Root certificate. */
  readonly root?: CertificateDetailsOutput;
  /** Current serial number of the certificate. */
  readonly serialNumber?: string;
  /** Certificate last issuance time. */
  readonly lastCertificateIssuanceTime?: string;
  /** Certificate expiration time. */
  readonly expirationTime?: string;
  /** <code>true</code> if private key is external; otherwise, <code>false</code>. */
  readonly isPrivateKeyExternal?: boolean;
  /** Reasons why App Service Certificate is not renewable at the current moment. */
  readonly appServiceCertificateNotRenewableReasons?: Array<
    | "RegistrationStatusNotSupportedForRenewal"
    | "ExpirationNotInRenewalTimeRange"
    | "SubscriptionNotActive"
  >;
  /** Time stamp when the certificate would be auto renewed next */
  readonly nextAutoRenewalTimeStamp?: string;
  /** Contact info */
  readonly contact?: CertificateOrderContactOutput;
}

/** Key Vault container for a certificate that is purchased through Azure. */
export interface AppServiceCertificateOutput {
  /** Key Vault resource Id. */
  keyVaultId?: string;
  /** Key Vault secret name. */
  keyVaultSecretName?: string;
  /** Status of the Key Vault secret. */
  readonly provisioningState?:
    | "Initialized"
    | "WaitingOnCertificateOrder"
    | "Succeeded"
    | "CertificateOrderFailed"
    | "OperationNotPermittedOnKeyVault"
    | "AzureServiceUnauthorizedToAccessKeyVault"
    | "KeyVaultDoesNotExist"
    | "KeyVaultSecretDoesNotExist"
    | "UnknownError"
    | "ExternalPrivateKey"
    | "Unknown";
}

/** SSL certificate details. */
export interface CertificateDetailsOutput {
  /** Certificate Version. */
  readonly version?: number;
  /** Certificate Serial Number. */
  readonly serialNumber?: string;
  /** Certificate Thumbprint. */
  readonly thumbprint?: string;
  /** Certificate Subject. */
  readonly subject?: string;
  /** Date Certificate is valid from. */
  readonly notBefore?: string;
  /** Date Certificate is valid to. */
  readonly notAfter?: string;
  /** Certificate Signature algorithm. */
  readonly signatureAlgorithm?: string;
  /** Certificate Issuer. */
  readonly issuer?: string;
  /** Raw certificate data. */
  readonly rawData?: string;
}

export interface CertificateOrderContactOutput {
  email?: string;
  nameFirst?: string;
  nameLast?: string;
  phone?: string;
}

/** Azure resource. This resource is tracked in Azure Resource Manager */
export interface ResourceOutput {
  /** Resource Id. */
  readonly id?: string;
  /** Resource Name. */
  readonly name?: string;
  /** Kind of resource. */
  kind?: string;
  /** Resource Location. */
  location: string;
  /** Resource type. */
  readonly type?: string;
  /** Resource tags. */
  tags?: Record<string, string>;
}

/** App Service error response. */
export interface DefaultErrorResponseOutput {
  /** Error model. */
  readonly error?: DefaultErrorResponseErrorOutput;
}

/** Error model. */
export interface DefaultErrorResponseErrorOutput {
  /** Standardized string to programmatically identify the error. */
  readonly code?: string;
  /** Detailed error description and debugging information. */
  readonly message?: string;
  /** Detailed error description and debugging information. */
  readonly target?: string;
  details?: Array<DefaultErrorResponseErrorDetailsItemOutput>;
  /** More information to debug error. */
  readonly innererror?: string;
}

/** Detailed errors. */
export interface DefaultErrorResponseErrorDetailsItemOutput {
  /** Standardized string to programmatically identify the error. */
  readonly code?: string;
  /** Detailed error description and debugging information. */
  readonly message?: string;
  /** Detailed error description and debugging information. */
  readonly target?: string;
}

/** ARM resource for a certificate order that is purchased through Azure. */
export interface AppServiceCertificateOrderPatchResourceOutput extends ProxyOnlyResourceOutput {
  /** AppServiceCertificateOrderPatchResource resource specific properties */
  properties?: AppServiceCertificateOrderPatchResourcePropertiesOutput;
}

/** AppServiceCertificateOrderPatchResource resource specific properties */
export interface AppServiceCertificateOrderPatchResourcePropertiesOutput {
  /** State of the Key Vault secret. */
  certificates?: Record<string, AppServiceCertificateOutput>;
  /** Certificate distinguished name. */
  distinguishedName?: string;
  /** Domain verification token. */
  readonly domainVerificationToken?: string;
  /** Duration in years (must be 1). */
  validityInYears?: number;
  /** Certificate key size. */
  keySize?: number;
  /** Certificate product type. */
  productType: "StandardDomainValidatedSsl" | "StandardDomainValidatedWildCardSsl";
  /** <code>true</code> if the certificate should be automatically renewed when it expires; otherwise, <code>false</code>. */
  autoRenew?: boolean;
  /** Status of certificate order. */
  readonly provisioningState?: "Succeeded" | "Failed" | "Canceled" | "InProgress" | "Deleting";
  /** Current order status. */
  readonly status?:
    | "Pendingissuance"
    | "Issued"
    | "Revoked"
    | "Canceled"
    | "Denied"
    | "Pendingrevocation"
    | "PendingRekey"
    | "Unused"
    | "Expired"
    | "NotSubmitted";
  /** Signed certificate. */
  readonly signedCertificate?: CertificateDetailsOutput;
  /** Last CSR that was created for this order. */
  csr?: string;
  /** Intermediate certificate. */
  readonly intermediate?: CertificateDetailsOutput;
  /** Root certificate. */
  readonly root?: CertificateDetailsOutput;
  /** Current serial number of the certificate. */
  readonly serialNumber?: string;
  /** Certificate last issuance time. */
  readonly lastCertificateIssuanceTime?: string;
  /** Certificate expiration time. */
  readonly expirationTime?: string;
  /** <code>true</code> if private key is external; otherwise, <code>false</code>. */
  readonly isPrivateKeyExternal?: boolean;
  /** Reasons why App Service Certificate is not renewable at the current moment. */
  readonly appServiceCertificateNotRenewableReasons?: Array<
    | "RegistrationStatusNotSupportedForRenewal"
    | "ExpirationNotInRenewalTimeRange"
    | "SubscriptionNotActive"
  >;
  /** Time stamp when the certificate would be auto renewed next */
  readonly nextAutoRenewalTimeStamp?: string;
  /** Contact info */
  readonly contact?: CertificateOrderContactOutput;
}

/** Azure proxy only resource. This resource is not tracked by Azure Resource Manager. */
export interface ProxyOnlyResourceOutput {
  /** Resource Id. */
  readonly id?: string;
  /** Resource Name. */
  readonly name?: string;
  /** Kind of resource. */
  kind?: string;
  /** Resource type. */
  readonly type?: string;
}

/** Collection of certificate order certificates. */
export interface AppServiceCertificateCollectionOutput {
  /** Collection of resources. */
  value: Array<AppServiceCertificateResourceOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** Key Vault container ARM resource for a certificate that is purchased through Azure. */
export interface AppServiceCertificateResourceOutput extends ResourceOutput {
  /** Core resource properties */
  properties?: AppServiceCertificateOutput;
}

/** Key Vault container ARM resource for a certificate that is purchased through Azure. */
export interface AppServiceCertificatePatchResourceOutput extends ProxyOnlyResourceOutput {
  /** Core resource properties */
  properties?: AppServiceCertificateOutput;
}

/** Class representing certificate reissue request. */
export interface ReissueCertificateOrderRequestOutput extends ProxyOnlyResourceOutput {
  /** ReissueCertificateOrderRequest resource specific properties */
  properties?: ReissueCertificateOrderRequestPropertiesOutput;
}

/** ReissueCertificateOrderRequest resource specific properties */
export interface ReissueCertificateOrderRequestPropertiesOutput {
  /** Certificate Key Size. */
  keySize?: number;
  /** Delay in hours to revoke existing certificate after the new certificate is issued. */
  delayExistingRevokeInHours?: number;
  /** Csr to be used for re-key operation. */
  csr?: string;
  /** Should we change the ASC type (from managed private key to external private key and vice versa). */
  isPrivateKeyExternal?: boolean;
}

/** Class representing certificate renew request. */
export interface RenewCertificateOrderRequestOutput extends ProxyOnlyResourceOutput {
  /** RenewCertificateOrderRequest resource specific properties */
  properties?: RenewCertificateOrderRequestPropertiesOutput;
}

/** RenewCertificateOrderRequest resource specific properties */
export interface RenewCertificateOrderRequestPropertiesOutput {
  /** Certificate Key Size. */
  keySize?: number;
  /** Csr to be used for re-key operation. */
  csr?: string;
  /** Should we change the ASC type (from managed private key to external private key and vice versa). */
  isPrivateKeyExternal?: boolean;
}

/** Identifies an object. */
export interface NameIdentifierOutput {
  /** Name of the object. */
  name?: string;
}

/** Site seal */
export interface SiteSealOutput {
  /** HTML snippet */
  html: string;
}

/** Certificate order action. */
export interface CertificateOrderActionOutput extends ProxyOnlyResourceOutput {
  /** CertificateOrderAction resource specific properties */
  properties?: CertificateOrderActionPropertiesOutput;
}

/** CertificateOrderAction resource specific properties */
export interface CertificateOrderActionPropertiesOutput {
  /** Action type. */
  readonly actionType?:
    | "CertificateIssued"
    | "CertificateOrderCanceled"
    | "CertificateOrderCreated"
    | "CertificateRevoked"
    | "DomainValidationComplete"
    | "FraudDetected"
    | "OrgNameChange"
    | "OrgValidationComplete"
    | "SanDrop"
    | "FraudCleared"
    | "CertificateExpired"
    | "CertificateExpirationWarning"
    | "FraudDocumentationRequired"
    | "Unknown";
  /** Time at which the certificate action was performed. */
  readonly createdAt?: string;
}

/** SSL certificate email. */
export interface CertificateEmailOutput extends ProxyOnlyResourceOutput {
  /** CertificateEmail resource specific properties */
  properties?: CertificateEmailPropertiesOutput;
}

/** CertificateEmail resource specific properties */
export interface CertificateEmailPropertiesOutput {
  /** Email id. */
  emailId?: string;
  /** Time stamp. */
  timeStamp?: string;
}

/** Collection of detector responses */
export interface DetectorResponseCollectionOutput {
  /** Collection of resources. */
  value: Array<DetectorResponseOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** Class representing Response from Detector */
export interface DetectorResponseOutput extends ProxyOnlyResourceOutput {
  /** DetectorResponse resource specific properties */
  properties?: DetectorResponsePropertiesOutput;
}

/** DetectorResponse resource specific properties */
export interface DetectorResponsePropertiesOutput {
  /** metadata for the detector */
  metadata?: DetectorInfoOutput;
  /** Data Set */
  dataset?: Array<DiagnosticDataOutput>;
  /** Indicates status of the most severe insight. */
  status?: StatusOutput;
  /** Additional configuration for different data providers to be used by the UI */
  dataProvidersMetadata?: Array<DataProviderMetadataOutput>;
  /** Suggested utterances where the detector can be applicable. */
  suggestedUtterances?: QueryUtterancesResultsOutput;
}

/** Definition of Detector */
export interface DetectorInfoOutput {
  /** Id of detector */
  readonly id?: string;
  /** Name of detector */
  readonly name?: string;
  /** Short description of the detector and its purpose. */
  readonly description?: string;
  /** Author of the detector. */
  readonly author?: string;
  /** Problem category. This serves for organizing group for detectors. */
  readonly category?: string;
  /** List of Support Topics for which this detector is enabled. */
  readonly supportTopicList?: Array<SupportTopicOutput>;
  /** Analysis Types for which this detector should apply to. */
  readonly analysisType?: Array<string>;
  /** Whether this detector is an Analysis Detector or not. */
  readonly type?: "Detector" | "Analysis" | "CategoryOverview";
  /** Defines score of a detector to power ML based matching. */
  readonly score?: number;
}

/** Defines a unique Support Topic */
export interface SupportTopicOutput {
  /** Support Topic Id */
  readonly id?: string;
  /** Unique resource Id */
  readonly pesId?: string;
}

/** Set of data with rendering instructions */
export interface DiagnosticDataOutput {
  /** Data in table form */
  table?: DataTableResponseObjectOutput;
  /** Properties that describe how the table should be rendered */
  renderingProperties?: RenderingOutput;
}

/** Data Table which defines columns and raw row values */
export interface DataTableResponseObjectOutput {
  /** Name of the table */
  tableName?: string;
  /** List of columns with data types */
  columns?: Array<DataTableResponseColumnOutput>;
  /** Raw row values */
  rows?: Array<Array<string>>;
}

/** Column definition */
export interface DataTableResponseColumnOutput {
  /** Name of the column */
  columnName?: string;
  /** Data type which looks like 'String' or 'Int32'. */
  dataType?: string;
  /** Column Type */
  columnType?: string;
}

/** Instructions for rendering the data */
export interface RenderingOutput {
  /** Rendering Type */
  type?:
    | "NoGraph"
    | "Table"
    | "TimeSeries"
    | "TimeSeriesPerInstance"
    | "PieChart"
    | "DataSummary"
    | "Email"
    | "Insights"
    | "DynamicInsight"
    | "Markdown"
    | "Detector"
    | "DropDown"
    | "Card"
    | "Solution"
    | "Guage"
    | "Form"
    | "ChangeSets"
    | "ChangeAnalysisOnboarding"
    | "ChangesView"
    | "AppInsight"
    | "DependencyGraph"
    | "DownTime"
    | "SummaryCard"
    | "SearchComponent"
    | "AppInsightEnablement";
  /** Title of data */
  title?: string;
  /** Description of the data that will help it be interpreted */
  description?: string;
}

/** Identify the status of the most severe insight generated by the detector. */
export interface StatusOutput {
  /** Descriptive message. */
  message?: string;
  /** Level of the most severe insight generated by the detector. */
  statusId?: "Critical" | "Warning" | "Info" | "Success" | "None";
}

/** Additional configuration for a data providers */
export interface DataProviderMetadataOutput {
  providerName?: string;
  /** Settings for the data provider */
  readonly propertyBag?: Array<KeyValuePairStringObjectOutput>;
}

export interface KeyValuePairStringObjectOutput {
  readonly key?: string;
  /** Any object */
  readonly value?: Record<string, unknown>;
}

/** Suggested utterances where the detector can be applicable */
export interface QueryUtterancesResultsOutput {
  /** Search Query. */
  query?: string;
  /** Array of utterance results for search query. */
  results?: Array<QueryUtterancesResultOutput>;
}

/** Result for utterances query. */
export interface QueryUtterancesResultOutput {
  /** A sample utterance. */
  sampleUtterance?: SampleUtteranceOutput;
  /** Score of a sample utterance. */
  score?: number;
}

/** Sample utterance. */
export interface SampleUtteranceOutput {
  /** Text attribute of sample utterance. */
  text?: string;
  /** Links attribute of sample utterance. */
  links?: Array<string>;
  /** Question id of sample utterance (for stackoverflow questions titles). */
  qid?: string;
}

/** Collection of Azure resource manager operation metadata. */
export interface CsmOperationCollectionOutput {
  /** Collection of resources. */
  value: Array<CsmOperationDescriptionOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** Description of an operation available for Microsoft.Web resource provider. */
export interface CsmOperationDescriptionOutput {
  name?: string;
  isDataAction?: boolean;
  /** Meta data about operation used for display in portal. */
  display?: CsmOperationDisplayOutput;
  origin?: string;
  /** Properties available for a Microsoft.Web resource provider operation. */
  properties?: CsmOperationDescriptionPropertiesOutput;
}

/** Meta data about operation used for display in portal. */
export interface CsmOperationDisplayOutput {
  provider?: string;
  resource?: string;
  operation?: string;
  description?: string;
}

/** Properties available for a Microsoft.Web resource provider operation. */
export interface CsmOperationDescriptionPropertiesOutput {
  /** Resource metrics service provided by Microsoft.Insights resource provider. */
  serviceSpecification?: ServiceSpecificationOutput;
}

/** Resource metrics service provided by Microsoft.Insights resource provider. */
export interface ServiceSpecificationOutput {
  metricSpecifications?: Array<MetricSpecificationOutput>;
  logSpecifications?: Array<LogSpecificationOutput>;
}

/** Definition of a single resource metric. */
export interface MetricSpecificationOutput {
  name?: string;
  displayName?: string;
  displayDescription?: string;
  unit?: string;
  aggregationType?: string;
  supportsInstanceLevelAggregation?: boolean;
  enableRegionalMdmAccount?: boolean;
  sourceMdmAccount?: string;
  sourceMdmNamespace?: string;
  metricFilterPattern?: string;
  fillGapWithZero?: boolean;
  isInternal?: boolean;
  dimensions?: Array<DimensionOutput>;
  category?: string;
  availabilities?: Array<MetricAvailabilityOutput>;
  supportedTimeGrainTypes?: Array<string>;
  supportedAggregationTypes?: Array<string>;
}

/**
 * Dimension of a resource metric. For e.g. instance specific HTTP requests for a web app,
 * where instance name is dimension of the metric HTTP request
 */
export interface DimensionOutput {
  name?: string;
  displayName?: string;
  internalName?: string;
  toBeExportedForShoebox?: boolean;
}

/** Retention policy of a resource metric. */
export interface MetricAvailabilityOutput {
  timeGrain?: string;
  blobDuration?: string;
}

/** Log Definition of a single resource metric. */
export interface LogSpecificationOutput {
  name?: string;
  displayName?: string;
  blobDuration?: string;
  logFilterPattern?: string;
}

/** Domain availability check result. */
export interface DomainAvailabilityCheckResultOutput {
  /** Name of the domain. */
  name?: string;
  /** <code>true</code> if domain can be purchased using CreateDomain API; otherwise, <code>false</code>. */
  available?: boolean;
  /** Valid values are Regular domain: Azure will charge the full price of domain registration, SoftDeleted: Purchasing this domain will simply restore it and this operation will not cost anything. */
  domainType?: "Regular" | "SoftDeleted";
}

/** Collection of domains. */
export interface DomainCollectionOutput {
  /** Collection of resources. */
  value: Array<DomainOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** Information about a domain. */
export interface DomainOutput extends ResourceOutput {
  /** Domain resource specific properties */
  properties?: DomainPropertiesOutput;
}

/** Domain resource specific properties */
export interface DomainPropertiesOutput {
  /** Administrative contact. */
  contactAdmin: ContactOutput;
  /** Billing contact. */
  contactBilling: ContactOutput;
  /** Registrant contact. */
  contactRegistrant: ContactOutput;
  /** Technical contact. */
  contactTech: ContactOutput;
  /** Domain registration status. */
  readonly registrationStatus?:
    | "Active"
    | "Awaiting"
    | "Cancelled"
    | "Confiscated"
    | "Disabled"
    | "Excluded"
    | "Expired"
    | "Failed"
    | "Held"
    | "Locked"
    | "Parked"
    | "Pending"
    | "Reserved"
    | "Reverted"
    | "Suspended"
    | "Transferred"
    | "Unknown"
    | "Unlocked"
    | "Unparked"
    | "Updated"
    | "JsonConverterFailed";
  /** Domain provisioning state. */
  readonly provisioningState?: "Succeeded" | "Failed" | "Canceled" | "InProgress" | "Deleting";
  /** Name servers. */
  readonly nameServers?: Array<string>;
  /** <code>true</code> if domain privacy is enabled for this domain; otherwise, <code>false</code>. */
  privacy?: boolean;
  /** Domain creation timestamp. */
  readonly createdTime?: string;
  /** Domain expiration timestamp. */
  readonly expirationTime?: string;
  /** Timestamp when the domain was renewed last time. */
  readonly lastRenewedTime?: string;
  /** <code>true</code> if the domain should be automatically renewed; otherwise, <code>false</code>. */
  autoRenew?: boolean;
  /**
   * <code>true</code> if Azure can assign this domain to App Service apps; otherwise, <code>false</code>. This value will be <code>true</code> if domain registration status is active and
   *  it is hosted on name servers Azure has programmatic access to.
   */
  readonly readyForDnsRecordManagement?: boolean;
  /** All hostnames derived from the domain and assigned to Azure resources. */
  readonly managedHostNames?: Array<HostNameOutput>;
  /** Legal agreement consent. */
  consent: DomainPurchaseConsentOutput;
  /** Reasons why domain is not renewable. */
  readonly domainNotRenewableReasons?: Array<
    | "RegistrationStatusNotSupportedForRenewal"
    | "ExpirationNotInRenewalTimeRange"
    | "SubscriptionNotActive"
  >;
  /** Current DNS type */
  dnsType?: "AzureDns" | "DefaultDomainRegistrarDns";
  /** Azure DNS Zone to use */
  dnsZoneId?: string;
  /** Target DNS type (would be used for migration) */
  targetDnsType?: "AzureDns" | "DefaultDomainRegistrarDns";
  authCode?: string;
}

/**
 * Contact information for domain registration. If 'Domain Privacy' option is not selected then the contact information is made publicly available through the Whois
 * directories as per ICANN requirements.
 */
export interface ContactOutput {
  /** Mailing address. */
  addressMailing?: AddressOutput;
  /** Email address. */
  email: string;
  /** Fax number. */
  fax?: string;
  /** Job title. */
  jobTitle?: string;
  /** First name. */
  nameFirst: string;
  /** Last name. */
  nameLast: string;
  /** Middle name. */
  nameMiddle?: string;
  /** Organization contact belongs to. */
  organization?: string;
  /** Phone number. */
  phone: string;
}

/** Address information for domain registration. */
export interface AddressOutput {
  /** First line of an Address. */
  address1: string;
  /** The second line of the Address. Optional. */
  address2?: string;
  /** The city for the address. */
  city: string;
  /** The country for the address. */
  country: string;
  /** The postal code for the address. */
  postalCode: string;
  /** The state or province for the address. */
  state: string;
}

/** Details of a hostname derived from a domain. */
export interface HostNameOutput {
  /** Name of the hostname. */
  name?: string;
  /** List of apps the hostname is assigned to. This list will have more than one app only if the hostname is pointing to a Traffic Manager. */
  siteNames?: Array<string>;
  /** Name of the Azure resource the hostname is assigned to. If it is assigned to a Traffic Manager then it will be the Traffic Manager name otherwise it will be the app name. */
  azureResourceName?: string;
  /** Type of the Azure resource the hostname is assigned to. */
  azureResourceType?: "Website" | "TrafficManager";
  /** Type of the DNS record. */
  customHostNameDnsRecordType?: "CName" | "A";
  /** Type of the hostname. */
  hostNameType?: "Verified" | "Managed";
}

/** Domain purchase consent object, representing acceptance of applicable legal agreements. */
export interface DomainPurchaseConsentOutput {
  /** List of applicable legal agreement keys. This list can be retrieved using ListLegalAgreements API under <code>TopLevelDomain</code> resource. */
  agreementKeys?: Array<string>;
  /** Client IP address. */
  agreedBy?: string;
  /** Timestamp when the agreements were accepted. */
  agreedAt?: string;
}

/** Single sign-on request information for domain management. */
export interface DomainControlCenterSsoRequestOutput {
  /** URL where the single sign-on request is to be made. */
  readonly url?: string;
  /** Post parameter key. */
  readonly postParameterKey?: string;
  /** Post parameter value. Client should use 'application/x-www-form-urlencoded' encoding for this value. */
  readonly postParameterValue?: string;
}

/** Collection of domain name identifiers. */
export interface NameIdentifierCollectionOutput {
  /** Collection of resources. */
  value: Array<NameIdentifierOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** ARM resource for a domain. */
export interface DomainPatchResourceOutput extends ProxyOnlyResourceOutput {
  /** DomainPatchResource resource specific properties */
  properties?: DomainPatchResourcePropertiesOutput;
}

/** DomainPatchResource resource specific properties */
export interface DomainPatchResourcePropertiesOutput {
  /** Administrative contact. */
  contactAdmin: ContactOutput;
  /** Billing contact. */
  contactBilling: ContactOutput;
  /** Registrant contact. */
  contactRegistrant: ContactOutput;
  /** Technical contact. */
  contactTech: ContactOutput;
  /** Domain registration status. */
  readonly registrationStatus?:
    | "Active"
    | "Awaiting"
    | "Cancelled"
    | "Confiscated"
    | "Disabled"
    | "Excluded"
    | "Expired"
    | "Failed"
    | "Held"
    | "Locked"
    | "Parked"
    | "Pending"
    | "Reserved"
    | "Reverted"
    | "Suspended"
    | "Transferred"
    | "Unknown"
    | "Unlocked"
    | "Unparked"
    | "Updated"
    | "JsonConverterFailed";
  /** Domain provisioning state. */
  readonly provisioningState?: "Succeeded" | "Failed" | "Canceled" | "InProgress" | "Deleting";
  /** Name servers. */
  readonly nameServers?: Array<string>;
  /** <code>true</code> if domain privacy is enabled for this domain; otherwise, <code>false</code>. */
  privacy?: boolean;
  /** Domain creation timestamp. */
  readonly createdTime?: string;
  /** Domain expiration timestamp. */
  readonly expirationTime?: string;
  /** Timestamp when the domain was renewed last time. */
  readonly lastRenewedTime?: string;
  /** <code>true</code> if the domain should be automatically renewed; otherwise, <code>false</code>. */
  autoRenew?: boolean;
  /**
   * <code>true</code> if Azure can assign this domain to App Service apps; otherwise, <code>false</code>. This value will be <code>true</code> if domain registration status is active and
   *  it is hosted on name servers Azure has programmatic access to.
   */
  readonly readyForDnsRecordManagement?: boolean;
  /** All hostnames derived from the domain and assigned to Azure resources. */
  readonly managedHostNames?: Array<HostNameOutput>;
  /** Legal agreement consent. */
  consent: DomainPurchaseConsentOutput;
  /** Reasons why domain is not renewable. */
  readonly domainNotRenewableReasons?: Array<
    | "RegistrationStatusNotSupportedForRenewal"
    | "ExpirationNotInRenewalTimeRange"
    | "SubscriptionNotActive"
  >;
  /** Current DNS type */
  dnsType?: "AzureDns" | "DefaultDomainRegistrarDns";
  /** Azure DNS Zone to use */
  dnsZoneId?: string;
  /** Target DNS type (would be used for migration) */
  targetDnsType?: "AzureDns" | "DefaultDomainRegistrarDns";
  authCode?: string;
}

/** Collection of domain ownership identifiers. */
export interface DomainOwnershipIdentifierCollectionOutput {
  /** Collection of resources. */
  value: Array<DomainOwnershipIdentifierOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** Domain ownership Identifier. */
export interface DomainOwnershipIdentifierOutput extends ProxyOnlyResourceOutput {
  /** DomainOwnershipIdentifier resource specific properties */
  properties?: DomainOwnershipIdentifierPropertiesOutput;
}

/** DomainOwnershipIdentifier resource specific properties */
export interface DomainOwnershipIdentifierPropertiesOutput {
  /** Ownership Id. */
  ownershipId?: string;
}

/** Collection of Top-level domains. */
export interface TopLevelDomainCollectionOutput {
  /** Collection of resources. */
  value: Array<TopLevelDomainOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** A top level domain object. */
export interface TopLevelDomainOutput extends ProxyOnlyResourceOutput {
  /** TopLevelDomain resource specific properties */
  properties?: TopLevelDomainPropertiesOutput;
}

/** TopLevelDomain resource specific properties */
export interface TopLevelDomainPropertiesOutput {
  /** If <code>true</code>, then the top level domain supports domain privacy; otherwise, <code>false</code>. */
  privacy?: boolean;
}

/** Collection of top-level domain legal agreements. */
export interface TldLegalAgreementCollectionOutput {
  /** Collection of resources. */
  value: Array<TldLegalAgreementOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** Legal agreement for a top level domain. */
export interface TldLegalAgreementOutput {
  /** Unique identifier for the agreement. */
  agreementKey: string;
  /** Agreement title. */
  title: string;
  /** Agreement details. */
  content: string;
  /** URL where a copy of the agreement details is hosted. */
  url?: string;
}

/** Collection of App Service Environments. */
export interface AppServiceEnvironmentCollectionOutput {
  /** Collection of resources. */
  value: Array<AppServiceEnvironmentResourceOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** App Service Environment ARM resource. */
export interface AppServiceEnvironmentResourceOutput extends ResourceOutput {
  /** Core resource properties */
  properties?: AppServiceEnvironmentOutput;
}

/** Description of an App Service Environment. */
export interface AppServiceEnvironmentOutput {
  /** Provisioning state of the App Service Environment. */
  readonly provisioningState?: "Succeeded" | "Failed" | "Canceled" | "InProgress" | "Deleting";
  /** Current status of the App Service Environment. */
  readonly status?: "Preparing" | "Ready" | "Scaling" | "Deleting";
  /** Description of the Virtual Network. */
  virtualNetwork: VirtualNetworkProfileOutput;
  /** Specifies which endpoints to serve internally in the Virtual Network for the App Service Environment. */
  internalLoadBalancingMode?: "None" | "Web" | "Publishing" | "Web, Publishing";
  /** Front-end VM size, e.g. "Medium", "Large". */
  multiSize?: string;
  /** Number of front-end instances. */
  readonly multiRoleCount?: number;
  /** Number of IP SSL addresses reserved for the App Service Environment. */
  ipsslAddressCount?: number;
  /** DNS suffix of the App Service Environment. */
  dnsSuffix?: string;
  /** Maximum number of VMs in the App Service Environment. */
  readonly maximumNumberOfMachines?: number;
  /** Scale factor for front-ends. */
  frontEndScaleFactor?: number;
  /**
   * <code>true</code> if the App Service Environment is suspended; otherwise, <code>false</code>. The environment can be suspended, e.g. when the management endpoint is no longer available
   *  (most likely because NSG blocked the incoming traffic).
   */
  readonly suspended?: boolean;
  /** Custom settings for changing the behavior of the App Service Environment. */
  clusterSettings?: Array<NameValuePairOutput>;
  /** User added ip ranges to whitelist on ASE db */
  userWhitelistedIpRanges?: Array<string>;
  /** Flag that displays whether an ASE has linux workers or not */
  readonly hasLinuxWorkers?: boolean;
  /** Dedicated Host Count */
  dedicatedHostCount?: number;
  /** Whether or not this App Service Environment is zone-redundant. */
  zoneRedundant?: boolean;
}

/** Specification for using a Virtual Network. */
export interface VirtualNetworkProfileOutput {
  /** Resource id of the Virtual Network. */
  id: string;
  /** Name of the Virtual Network (read-only). */
  readonly name?: string;
  /** Resource type of the Virtual Network (read-only). */
  readonly type?: string;
  /** Subnet within the Virtual Network. */
  subnet?: string;
}

/** Name value pair. */
export interface NameValuePairOutput {
  /** Pair name. */
  name?: string;
  /** Pair value. */
  value?: string;
}

/** ARM resource for a app service environment. */
export interface AppServiceEnvironmentPatchResourceOutput extends ProxyOnlyResourceOutput {
  /** Core resource properties */
  properties?: AppServiceEnvironmentOutput;
}

/** Collection of stamp capacities. */
export interface StampCapacityCollectionOutput {
  /** Collection of resources. */
  value: Array<StampCapacityOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** Stamp capacity information. */
export interface StampCapacityOutput {
  /** Name of the stamp. */
  name?: string;
  /** Available capacity (# of machines, bytes of storage etc...). */
  availableCapacity?: number;
  /** Total capacity (# of machines, bytes of storage etc...). */
  totalCapacity?: number;
  /** Name of the unit. */
  unit?: string;
  /** Shared/dedicated workers. */
  computeMode?: "Shared" | "Dedicated" | "Dynamic";
  /** Size of the machines. */
  workerSize?:
    | "Small"
    | "Medium"
    | "Large"
    | "D1"
    | "D2"
    | "D3"
    | "SmallV3"
    | "MediumV3"
    | "LargeV3"
    | "NestedSmall"
    | "NestedSmallLinux"
    | "Default";
  /**
   * Size ID of machines:
   * 0 - Small
   * 1 - Medium
   * 2 - Large
   */
  workerSizeId?: number;
  /**
   * If <code>true</code>, it includes basic apps.
   * Basic apps are not used for capacity allocation.
   */
  excludeFromCapacityAllocation?: boolean;
  /** <code>true</code> if capacity is applicable for all apps; otherwise, <code>false</code>. */
  isApplicableForAllComputeModes?: boolean;
  /** Shared or Dedicated. */
  siteMode?: string;
  /** Is this a linux stamp capacity */
  isLinux?: boolean;
}

/** Describes main public IP address and any extra virtual IPs. */
export interface AddressResponseOutput extends ProxyOnlyResourceOutput {
  /** AddressResponse resource specific properties */
  properties?: AddressResponsePropertiesOutput;
}

/** AddressResponse resource specific properties */
export interface AddressResponsePropertiesOutput {
  /** Main public virtual IP. */
  serviceIpAddress?: string;
  /** Virtual Network internal IP address of the App Service Environment if it is in internal load-balancing mode. */
  internalIpAddress?: string;
  /** IP addresses appearing on outbound connections. */
  outboundIpAddresses?: Array<string>;
  /** Additional virtual IPs. */
  vipMappings?: Array<VirtualIPMappingOutput>;
}

/** Virtual IP mapping. */
export interface VirtualIPMappingOutput {
  /** Virtual IP address. */
  virtualIP?: string;
  /** Internal HTTP port. */
  internalHttpPort?: number;
  /** Internal HTTPS port. */
  internalHttpsPort?: number;
  /** Is virtual IP mapping in use. */
  inUse?: boolean;
  /** name of the service that virtual IP is assigned to */
  serviceName?: string;
}

/** Collection of App Service apps. */
export interface WebAppCollectionOutput {
  /** Collection of resources. */
  value: Array<SiteOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** A web app, a mobile app backend, or an API app. */
export interface SiteOutput extends ResourceOutput {
  /** Site resource specific properties */
  properties?: SitePropertiesOutput;
  /** Managed service identity. */
  identity?: ManagedServiceIdentityOutput;
  /** Extended Location. */
  extendedLocation?: ExtendedLocationOutput;
}

/** Site resource specific properties */
export interface SitePropertiesOutput {
  /** Current state of the app. */
  readonly state?: string;
  /** Hostnames associated with the app. */
  readonly hostNames?: Array<string>;
  /** Name of the repository site. */
  readonly repositorySiteName?: string;
  /** State indicating whether the app has exceeded its quota usage. Read-only. */
  readonly usageState?: "Normal" | "Exceeded";
  /** <code>true</code> if the app is enabled; otherwise, <code>false</code>. Setting this value to false disables the app (takes the app offline). */
  enabled?: boolean;
  /**
   * Enabled hostnames for the app.Hostnames need to be assigned (see HostNames) AND enabled. Otherwise,
   * the app is not served on those hostnames.
   */
  readonly enabledHostNames?: Array<string>;
  /** Management information availability state for the app. */
  readonly availabilityState?: "Normal" | "Limited" | "DisasterRecoveryMode";
  /** Hostname SSL states are used to manage the SSL bindings for app's hostnames. */
  hostNameSslStates?: Array<HostNameSslStateOutput>;
  /** Resource ID of the associated App Service plan, formatted as: "/subscriptions/{subscriptionID}/resourceGroups/{groupName}/providers/Microsoft.Web/serverfarms/{appServicePlanName}". */
  serverFarmId?: string;
  /** <code>true</code> if reserved; otherwise, <code>false</code>. */
  reserved?: boolean;
  /** Obsolete: Hyper-V sandbox. */
  isXenon?: boolean;
  /** Hyper-V sandbox. */
  hyperV?: boolean;
  /** Last time the app was modified, in UTC. Read-only. */
  readonly lastModifiedTimeUtc?: string;
  /** Configuration of the app. */
  siteConfig?: SiteConfigOutput;
  /** Azure Traffic Manager hostnames associated with the app. Read-only. */
  readonly trafficManagerHostNames?: Array<string>;
  /** <code>true</code> to stop SCM (KUDU) site when the app is stopped; otherwise, <code>false</code>. The default is <code>false</code>. */
  scmSiteAlsoStopped?: boolean;
  /** Specifies which deployment slot this app will swap into. Read-only. */
  readonly targetSwapSlot?: string;
  /** App Service Environment to use for the app. */
  hostingEnvironmentProfile?: HostingEnvironmentProfileOutput;
  /** <code>true</code> to enable client affinity; <code>false</code> to stop sending session affinity cookies, which route client requests in the same session to the same instance. Default is <code>true</code>. */
  clientAffinityEnabled?: boolean;
  /** <code>true</code> to enable client certificate authentication (TLS mutual authentication); otherwise, <code>false</code>. Default is <code>false</code>. */
  clientCertEnabled?: boolean;
  /**
   * This composes with ClientCertEnabled setting.
   * - ClientCertEnabled: false means ClientCert is ignored.
   * - ClientCertEnabled: true and ClientCertMode: Required means ClientCert is required.
   * - ClientCertEnabled: true and ClientCertMode: Optional means ClientCert is optional or accepted.
   */
  clientCertMode?: "Required" | "Optional" | "OptionalInteractiveUser";
  /** client certificate authentication comma-separated exclusion paths */
  clientCertExclusionPaths?: string;
  /**
   * <code>true</code> to disable the public hostnames of the app; otherwise, <code>false</code>.
   *  If <code>true</code>, the app is only accessible via API management process.
   */
  hostNamesDisabled?: boolean;
  /** Unique identifier that verifies the custom domains assigned to the app. Customer will add this id to a txt record for verification. */
  customDomainVerificationId?: string;
  /** List of IP addresses that the app uses for outbound connections (e.g. database access). Includes VIPs from tenants that site can be hosted with current settings. Read-only. */
  readonly outboundIpAddresses?: string;
  /** List of IP addresses that the app uses for outbound connections (e.g. database access). Includes VIPs from all tenants except dataComponent. Read-only. */
  readonly possibleOutboundIpAddresses?: string;
  /** Size of the function container. */
  containerSize?: number;
  /** Maximum allowed daily memory-time quota (applicable on dynamic apps only). */
  dailyMemoryTimeQuota?: number;
  /** App suspended till in case memory-time quota is exceeded. */
  readonly suspendedTill?: string;
  /**
   * Maximum number of workers.
   * This only applies to Functions container.
   */
  readonly maxNumberOfWorkers?: number;
  /** If specified during app creation, the app is cloned from a source app. */
  cloningInfo?: CloningInfoOutput;
  /** Name of the resource group the app belongs to. Read-only. */
  readonly resourceGroup?: string;
  /** <code>true</code> if the app is a default container; otherwise, <code>false</code>. */
  readonly isDefaultContainer?: boolean;
  /** Default hostname of the app. Read-only. */
  readonly defaultHostName?: string;
  /** Status of the last deployment slot swap operation. */
  readonly slotSwapStatus?: SlotSwapStatusOutput;
  /**
   * HttpsOnly: configures a web site to accept only https requests. Issues redirect for
   * http requests
   */
  httpsOnly?: boolean;
  /** Site redundancy mode */
  redundancyMode?: "None" | "Manual" | "Failover" | "ActiveActive" | "GeoRedundant";
  /**
   * Specifies an operation id if this site has a pending operation.
   *
   * Value may contain a UUID
   */
  readonly inProgressOperationId?: string;
  /** Checks if Customer provided storage account is required */
  storageAccountRequired?: boolean;
  /** Identity to use for Key Vault Reference authentication. */
  keyVaultReferenceIdentity?: string;
  /**
   * Azure Resource Manager ID of the Virtual network and subnet to be joined by Regional VNET Integration.
   * This must be of the form /subscriptions/{subscriptionName}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{vnetName}/subnets/{subnetName}
   */
  virtualNetworkSubnetId?: string;
}

/** SSL-enabled hostname. */
export interface HostNameSslStateOutput {
  /** Hostname. */
  name?: string;
  /** SSL type. */
  sslState?: "Disabled" | "SniEnabled" | "IpBasedEnabled";
  /** Virtual IP address assigned to the hostname if IP based SSL is enabled. */
  virtualIP?: string;
  /** SSL certificate thumbprint. */
  thumbprint?: string;
  /** Set to <code>true</code> to update existing hostname. */
  toUpdate?: boolean;
  /** Indicates whether the hostname is a standard or repository hostname. */
  hostType?: "Standard" | "Repository";
}

/** Configuration of an App Service app. */
export interface SiteConfigOutput {
  /** Number of workers. */
  numberOfWorkers?: number;
  /** Default documents. */
  defaultDocuments?: Array<string>;
  /** .NET Framework version. */
  netFrameworkVersion?: string;
  /** Version of PHP. */
  phpVersion?: string;
  /** Version of Python. */
  pythonVersion?: string;
  /** Version of Node.js. */
  nodeVersion?: string;
  /** Version of PowerShell. */
  powerShellVersion?: string;
  /** Linux App Framework and version */
  linuxFxVersion?: string;
  /** Xenon App Framework and version */
  windowsFxVersion?: string;
  /** <code>true</code> if request tracing is enabled; otherwise, <code>false</code>. */
  requestTracingEnabled?: boolean;
  /** Request tracing expiration time. */
  requestTracingExpirationTime?: string;
  /** <code>true</code> if remote debugging is enabled; otherwise, <code>false</code>. */
  remoteDebuggingEnabled?: boolean;
  /** Remote debugging version. */
  remoteDebuggingVersion?: string;
  /** <code>true</code> if HTTP logging is enabled; otherwise, <code>false</code>. */
  httpLoggingEnabled?: boolean;
  /** Flag to use Managed Identity Creds for ACR pull */
  acrUseManagedIdentityCreds?: boolean;
  /** If using user managed identity, the user managed identity ClientId */
  acrUserManagedIdentityID?: string;
  /** HTTP logs directory size limit. */
  logsDirectorySizeLimit?: number;
  /** <code>true</code> if detailed error logging is enabled; otherwise, <code>false</code>. */
  detailedErrorLoggingEnabled?: boolean;
  /** Publishing user name. */
  publishingUsername?: string;
  /** Application settings. */
  appSettings?: Array<NameValuePairOutput>;
  /** Connection strings. */
  connectionStrings?: Array<ConnStringInfoOutput>;
  /** Site MachineKey. */
  readonly machineKey?: SiteMachineKeyOutput;
  /** Handler mappings. */
  handlerMappings?: Array<HandlerMappingOutput>;
  /** Document root. */
  documentRoot?: string;
  /** SCM type. */
  scmType?:
    | "None"
    | "Dropbox"
    | "Tfs"
    | "LocalGit"
    | "GitHub"
    | "CodePlexGit"
    | "CodePlexHg"
    | "BitbucketGit"
    | "BitbucketHg"
    | "ExternalGit"
    | "ExternalHg"
    | "OneDrive"
    | "VSO"
    | "VSTSRM";
  /** <code>true</code> to use 32-bit worker process; otherwise, <code>false</code>. */
  use32BitWorkerProcess?: boolean;
  /** <code>true</code> if WebSocket is enabled; otherwise, <code>false</code>. */
  webSocketsEnabled?: boolean;
  /** <code>true</code> if Always On is enabled; otherwise, <code>false</code>. */
  alwaysOn?: boolean;
  /** Java version. */
  javaVersion?: string;
  /** Java container. */
  javaContainer?: string;
  /** Java container version. */
  javaContainerVersion?: string;
  /** App command line to launch. */
  appCommandLine?: string;
  /** Managed pipeline mode. */
  managedPipelineMode?: "Integrated" | "Classic";
  /** Virtual applications. */
  virtualApplications?: Array<VirtualApplicationOutput>;
  /** Site load balancing. */
  loadBalancing?:
    | "WeightedRoundRobin"
    | "LeastRequests"
    | "LeastResponseTime"
    | "WeightedTotalTraffic"
    | "RequestHash"
    | "PerSiteRoundRobin";
  /** This is work around for polymorphic types. */
  experiments?: ExperimentsOutput;
  /** Site limits. */
  limits?: SiteLimitsOutput;
  /** <code>true</code> if Auto Heal is enabled; otherwise, <code>false</code>. */
  autoHealEnabled?: boolean;
  /** Auto Heal rules. */
  autoHealRules?: AutoHealRulesOutput;
  /** Tracing options. */
  tracingOptions?: string;
  /** Virtual Network name. */
  vnetName?: string;
  /** Virtual Network Route All enabled. This causes all outbound traffic to have Virtual Network Security Groups and User Defined Routes applied. */
  vnetRouteAllEnabled?: boolean;
  /** The number of private ports assigned to this app. These will be assigned dynamically on runtime. */
  vnetPrivatePortsCount?: number;
  /** Cross-Origin Resource Sharing (CORS) settings. */
  cors?: CorsSettingsOutput;
  /** Push endpoint settings. */
  push?: PushSettingsOutput;
  /** Information about the formal API definition for the app. */
  apiDefinition?: ApiDefinitionInfoOutput;
  /** Azure API management settings linked to the app. */
  apiManagementConfig?: ApiManagementConfigOutput;
  /** Auto-swap slot name. */
  autoSwapSlotName?: string;
  /** <code>true</code> to enable local MySQL; otherwise, <code>false</code>. */
  localMySqlEnabled?: boolean;
  /** Managed Service Identity Id */
  managedServiceIdentityId?: number;
  /** Explicit Managed Service Identity Id */
  xManagedServiceIdentityId?: number;
  /** Identity to use for Key Vault Reference authentication. */
  keyVaultReferenceIdentity?: string;
  /** IP security restrictions for main. */
  ipSecurityRestrictions?: Array<IpSecurityRestrictionOutput>;
  /** IP security restrictions for scm. */
  scmIpSecurityRestrictions?: Array<IpSecurityRestrictionOutput>;
  /** IP security restrictions for scm to use main. */
  scmIpSecurityRestrictionsUseMain?: boolean;
  /** Http20Enabled: configures a web site to allow clients to connect over http2.0 */
  http20Enabled?: boolean;
  /** MinTlsVersion: configures the minimum version of TLS required for SSL requests */
  minTlsVersion?: "1.0" | "1.1" | "1.2";
  /** ScmMinTlsVersion: configures the minimum version of TLS required for SSL requests for SCM site */
  scmMinTlsVersion?: "1.0" | "1.1" | "1.2";
  /** State of FTP / FTPS service */
  ftpsState?: "AllAllowed" | "FtpsOnly" | "Disabled";
  /**
   * Number of preWarmed instances.
   * This setting only applies to the Consumption and Elastic Plans
   */
  preWarmedInstanceCount?: number;
  /**
   * Maximum number of workers that a site can scale out to.
   * This setting only applies to the Consumption and Elastic Premium Plans
   */
  functionAppScaleLimit?: number;
  /** Health check path */
  healthCheckPath?: string;
  /**
   * Gets or sets a value indicating whether functions runtime scale monitoring is enabled. When enabled,
   * the ScaleController will not monitor event sources directly, but will instead call to the
   * runtime to get scale status.
   */
  functionsRuntimeScaleMonitoringEnabled?: boolean;
  /** Sets the time zone a site uses for generating timestamps. Compatible with Linux and Windows App Service. Setting the WEBSITE_TIME_ZONE app setting takes precedence over this config. For Linux, expects tz database values https://www.iana.org/time-zones (for a quick reference see https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). For Windows, expects one of the time zones listed under HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Time Zones */
  websiteTimeZone?: string;
  /**
   * Number of minimum instance count for a site
   * This setting only applies to the Elastic Plans
   */
  minimumElasticInstanceCount?: number;
  /** List of Azure Storage Accounts. */
  azureStorageAccounts?: Record<string, AzureStorageInfoValueOutput>;
  /** Property to allow or block all public traffic. */
  publicNetworkAccess?: string;
}

/** Database connection string information. */
export interface ConnStringInfoOutput {
  /** Name of connection string. */
  name?: string;
  /** Connection string value. */
  connectionString?: string;
  /** Type of database. */
  type?:
    | "MySql"
    | "SQLServer"
    | "SQLAzure"
    | "Custom"
    | "NotificationHub"
    | "ServiceBus"
    | "EventHub"
    | "ApiHub"
    | "DocDb"
    | "RedisCache"
    | "PostgreSQL";
}

/** MachineKey of an app. */
export interface SiteMachineKeyOutput {
  /** MachineKey validation. */
  validation?: string;
  /** Validation key. */
  validationKey?: string;
  /** Algorithm used for decryption. */
  decryption?: string;
  /** Decryption key. */
  decryptionKey?: string;
}

/**
 * The IIS handler mappings used to define which handler processes HTTP requests with certain extension.
 * For example, it is used to configure php-cgi.exe process to handle all HTTP requests with *.php extension.
 */
export interface HandlerMappingOutput {
  /** Requests with this extension will be handled using the specified FastCGI application. */
  extension?: string;
  /** The absolute path to the FastCGI application. */
  scriptProcessor?: string;
  /** Command-line arguments to be passed to the script processor. */
  arguments?: string;
}

/** Virtual application in an app. */
export interface VirtualApplicationOutput {
  /** Virtual path. */
  virtualPath?: string;
  /** Physical path. */
  physicalPath?: string;
  /** <code>true</code> if preloading is enabled; otherwise, <code>false</code>. */
  preloadEnabled?: boolean;
  /** Virtual directories for virtual application. */
  virtualDirectories?: Array<VirtualDirectoryOutput>;
}

/** Directory for virtual application. */
export interface VirtualDirectoryOutput {
  /** Path to virtual application. */
  virtualPath?: string;
  /** Physical path. */
  physicalPath?: string;
}

/** Routing rules in production experiments. */
export interface ExperimentsOutput {
  /** List of ramp-up rules. */
  rampUpRules?: Array<RampUpRuleOutput>;
}

/** Routing rules for ramp up testing. This rule allows to redirect static traffic % to a slot or to gradually change routing % based on performance. */
export interface RampUpRuleOutput {
  /** Hostname of a slot to which the traffic will be redirected if decided to. E.g. myapp-stage.azurewebsites.net. */
  actionHostName?: string;
  /** Percentage of the traffic which will be redirected to <code>ActionHostName</code>. */
  reroutePercentage?: number;
  /**
   * In auto ramp up scenario this is the step to add/remove from <code>ReroutePercentage</code> until it reaches \n<code>MinReroutePercentage</code> or
   * <code>MaxReroutePercentage</code>. Site metrics are checked every N minutes specified in <code>ChangeIntervalInMinutes</code>.\nCustom decision algorithm
   * can be provided in TiPCallback site extension which URL can be specified in <code>ChangeDecisionCallbackUrl</code>.
   */
  changeStep?: number;
  /** Specifies interval in minutes to reevaluate ReroutePercentage. */
  changeIntervalInMinutes?: number;
  /** Specifies lower boundary above which ReroutePercentage will stay. */
  minReroutePercentage?: number;
  /** Specifies upper boundary below which ReroutePercentage will stay. */
  maxReroutePercentage?: number;
  /**
   * Custom decision algorithm can be provided in TiPCallback site extension which URL can be specified. See TiPCallback site extension for the scaffold and contracts.
   * https://www.siteextensions.net/packages/TiPCallback/
   */
  changeDecisionCallbackUrl?: string;
  /** Name of the routing rule. The recommended name would be to point to the slot which will receive the traffic in the experiment. */
  name?: string;
}

/** Metric limits set on an app. */
export interface SiteLimitsOutput {
  /** Maximum allowed CPU usage percentage. */
  maxPercentageCpu?: number;
  /** Maximum allowed memory usage in MB. */
  maxMemoryInMb?: number;
  /** Maximum allowed disk size usage in MB. */
  maxDiskSizeInMb?: number;
}

/** Rules that can be defined for auto-heal. */
export interface AutoHealRulesOutput {
  /** Conditions that describe when to execute the auto-heal actions. */
  triggers?: AutoHealTriggersOutput;
  /** Actions to be executed when a rule is triggered. */
  actions?: AutoHealActionsOutput;
}

/** Triggers for auto-heal. */
export interface AutoHealTriggersOutput {
  /** A rule based on total requests. */
  requests?: RequestsBasedTriggerOutput;
  /** A rule based on private bytes. */
  privateBytesInKB?: number;
  /** A rule based on status codes. */
  statusCodes?: Array<StatusCodesBasedTriggerOutput>;
  /** A rule based on request execution time. */
  slowRequests?: SlowRequestsBasedTriggerOutput;
  /** A rule based on multiple Slow Requests Rule with path */
  slowRequestsWithPath?: Array<SlowRequestsBasedTriggerOutput>;
  /** A rule based on status codes ranges. */
  statusCodesRange?: Array<StatusCodesRangeBasedTriggerOutput>;
}

/** Trigger based on total requests. */
export interface RequestsBasedTriggerOutput {
  /** Request Count. */
  count?: number;
  /** Time interval. */
  timeInterval?: string;
}

/** Trigger based on status code. */
export interface StatusCodesBasedTriggerOutput {
  /** HTTP status code. */
  status?: number;
  /** Request Sub Status. */
  subStatus?: number;
  /** Win32 error code. */
  win32Status?: number;
  /** Request Count. */
  count?: number;
  /** Time interval. */
  timeInterval?: string;
  /** Request Path */
  path?: string;
}

/** Trigger based on request execution time. */
export interface SlowRequestsBasedTriggerOutput {
  /** Time taken. */
  timeTaken?: string;
  /** Request Path. */
  path?: string;
  /** Request Count. */
  count?: number;
  /** Time interval. */
  timeInterval?: string;
}

/** Trigger based on range of status codes. */
export interface StatusCodesRangeBasedTriggerOutput {
  /** HTTP status code. */
  statusCodes?: string;
  path?: string;
  /** Request Count. */
  count?: number;
  /** Time interval. */
  timeInterval?: string;
}

/** Actions which to take by the auto-heal module when a rule is triggered. */
export interface AutoHealActionsOutput {
  /** Predefined action to be taken. */
  actionType?: "Recycle" | "LogEvent" | "CustomAction";
  /** Custom action to be taken. */
  customAction?: AutoHealCustomActionOutput;
  /**
   * Minimum time the process must execute
   * before taking the action
   */
  minProcessExecutionTime?: string;
}

/**
 * Custom action to be executed
 * when an auto heal rule is triggered.
 */
export interface AutoHealCustomActionOutput {
  /** Executable to be run. */
  exe?: string;
  /** Parameters for the executable. */
  parameters?: string;
}

/** Cross-Origin Resource Sharing (CORS) settings for the app. */
export interface CorsSettingsOutput {
  /**
   * Gets or sets the list of origins that should be allowed to make cross-origin
   * calls (for example: http://example.com:12345). Use "*" to allow all.
   */
  allowedOrigins?: Array<string>;
  /**
   * Gets or sets whether CORS requests with credentials are allowed. See
   * https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#Requests_with_credentials
   * for more details.
   */
  supportCredentials?: boolean;
}

/** Push settings for the App. */
export interface PushSettingsOutput extends ProxyOnlyResourceOutput {
  /** PushSettings resource specific properties */
  properties?: PushSettingsPropertiesOutput;
}

/** PushSettings resource specific properties */
export interface PushSettingsPropertiesOutput {
  /** Gets or sets a flag indicating whether the Push endpoint is enabled. */
  isPushEnabled: boolean;
  /** Gets or sets a JSON string containing a list of tags that are whitelisted for use by the push registration endpoint. */
  tagWhitelistJson?: string;
  /**
   * Gets or sets a JSON string containing a list of tags that require user authentication to be used in the push registration endpoint.
   * Tags can consist of alphanumeric characters and the following:
   * '_', '@', '#', '.', ':', '-'.
   * Validation should be performed at the PushRequestHandler.
   */
  tagsRequiringAuth?: string;
  /** Gets or sets a JSON string containing a list of dynamic tags that will be evaluated from user claims in the push registration endpoint. */
  dynamicTagsJson?: string;
}

/** Information about the formal API definition for the app. */
export interface ApiDefinitionInfoOutput {
  /** The URL of the API definition. */
  url?: string;
}

/** Azure API management (APIM) configuration linked to the app. */
export interface ApiManagementConfigOutput {
  /** APIM-Api Identifier. */
  id?: string;
}

/** IP security restriction on an app. */
export interface IpSecurityRestrictionOutput {
  /**
   * IP address the security restriction is valid for.
   * It can be in form of pure ipv4 address (required SubnetMask property) or
   * CIDR notation such as ipv4/mask (leading bit match). For CIDR,
   * SubnetMask property must not be specified.
   */
  ipAddress?: string;
  /** Subnet mask for the range of IP addresses the restriction is valid for. */
  subnetMask?: string;
  /** Virtual network resource id */
  vnetSubnetResourceId?: string;
  /** (internal) Vnet traffic tag */
  vnetTrafficTag?: number;
  /** (internal) Subnet traffic tag */
  subnetTrafficTag?: number;
  /** Allow or Deny access for this IP range. */
  action?: string;
  /** Defines what this IP filter will be used for. This is to support IP filtering on proxies. */
  tag?: "Default" | "XffProxy" | "ServiceTag";
  /** Priority of IP restriction rule. */
  priority?: number;
  /** IP restriction rule name. */
  name?: string;
  /** IP restriction rule description. */
  description?: string;
  /**
   * IP restriction rule headers.
   * X-Forwarded-Host (https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Forwarded-Host#Examples).
   * The matching logic is ..
   * - If the property is null or empty (default), all hosts(or lack of) are allowed.
   * - A value is compared using ordinal-ignore-case (excluding port number).
   * - Subdomain wildcards are permitted but don't match the root domain. For example, *.contoso.com matches the subdomain foo.contoso.com
   *  but not the root domain contoso.com or multi-level foo.bar.contoso.com
   * - Unicode host names are allowed but are converted to Punycode for matching.
   *
   * X-Forwarded-For (https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Forwarded-For#Examples).
   * The matching logic is ..
   * - If the property is null or empty (default), any forwarded-for chains (or lack of) are allowed.
   * - If any address (excluding port number) in the chain (comma separated) matches the CIDR defined by the property.
   *
   * X-Azure-FDID and X-FD-HealthProbe.
   * The matching logic is exact match.
   */
  headers?: Record<string, Array<string>>;
}

/** Azure Files or Blob Storage access information value for dictionary storage. */
export interface AzureStorageInfoValueOutput {
  /** Type of storage. */
  type?: "AzureFiles" | "AzureBlob";
  /** Name of the storage account. */
  accountName?: string;
  /** Name of the file share (container name, for Blob storage). */
  shareName?: string;
  /** Access key for the storage account. */
  accessKey?: string;
  /** Path to mount the storage within the site's runtime environment. */
  mountPath?: string;
  /** State of the storage account. */
  readonly state?: "Ok" | "InvalidCredentials" | "InvalidShare" | "NotValidated";
}

/** Specification for an App Service Environment to use for this resource. */
export interface HostingEnvironmentProfileOutput {
  /** Resource ID of the App Service Environment. */
  id?: string;
  /** Name of the App Service Environment. */
  readonly name?: string;
  /** Resource type of the App Service Environment. */
  readonly type?: string;
}

/** Information needed for cloning operation. */
export interface CloningInfoOutput {
  /**
   * Correlation ID of cloning operation. This ID ties multiple cloning operations
   * together to use the same snapshot.
   *
   * Value may contain a UUID
   */
  correlationId?: string;
  /** <code>true</code> to overwrite destination app; otherwise, <code>false</code>. */
  overwrite?: boolean;
  /** <code>true</code> to clone custom hostnames from source app; otherwise, <code>false</code>. */
  cloneCustomHostNames?: boolean;
  /** <code>true</code> to clone source control from source app; otherwise, <code>false</code>. */
  cloneSourceControl?: boolean;
  /**
   * ARM resource ID of the source app. App resource ID is of the form
   * /subscriptions/{subId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{siteName} for production slots and
   * /subscriptions/{subId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{siteName}/slots/{slotName} for other slots.
   */
  sourceWebAppId: string;
  /** Location of source app ex: West US or North Europe */
  sourceWebAppLocation?: string;
  /** App Service Environment. */
  hostingEnvironment?: string;
  /**
   * Application setting overrides for cloned app. If specified, these settings override the settings cloned
   * from source app. Otherwise, application settings from source app are retained.
   */
  appSettingsOverrides?: Record<string, string>;
  /** <code>true</code> to configure load balancing for source and destination app. */
  configureLoadBalancing?: boolean;
  /**
   * ARM resource ID of the Traffic Manager profile to use, if it exists. Traffic Manager resource ID is of the form
   * /subscriptions/{subId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/trafficManagerProfiles/{profileName}.
   */
  trafficManagerProfileId?: string;
  /** Name of Traffic Manager profile to create. This is only needed if Traffic Manager profile does not already exist. */
  trafficManagerProfileName?: string;
}

/** The status of the last successful slot swap operation. */
export interface SlotSwapStatusOutput {
  /** The time the last successful slot swap completed. */
  readonly timestampUtc?: string;
  /** The source slot of the last swap operation. */
  readonly sourceSlotName?: string;
  /** The destination slot of the last swap operation. */
  readonly destinationSlotName?: string;
}

/** Managed service identity. */
export interface ManagedServiceIdentityOutput {
  /** Type of managed service identity. */
  type?: "SystemAssigned" | "UserAssigned" | "SystemAssigned, UserAssigned" | "None";
  /** Tenant of managed service identity. */
  readonly tenantId?: string;
  /** Principal Id of managed service identity. */
  readonly principalId?: string;
  /** The list of user assigned identities associated with the resource. The user identity dictionary key references will be ARM resource ids in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName} */
  userAssignedIdentities?: Record<string, UserAssignedIdentityOutput>;
}

/** User Assigned identity. */
export interface UserAssignedIdentityOutput {
  /** Principal Id of user assigned identity */
  readonly principalId?: string;
  /** Client Id of user assigned identity */
  readonly clientId?: string;
}

/** Extended Location. */
export interface ExtendedLocationOutput {
  /** Name of extended location. */
  name?: string;
  /** Type of extended location. */
  readonly type?: string;
}

/** Full view of networking configuration for an ASE. */
export interface AseV3NetworkingConfigurationOutput extends ProxyOnlyResourceOutput {
  /** AseV3NetworkingConfiguration resource specific properties */
  properties?: AseV3NetworkingConfigurationPropertiesOutput;
}

/** AseV3NetworkingConfiguration resource specific properties */
export interface AseV3NetworkingConfigurationPropertiesOutput {
  readonly windowsOutboundIpAddresses?: Array<string>;
  readonly linuxOutboundIpAddresses?: Array<string>;
  readonly externalInboundIpAddresses?: Array<string>;
  readonly internalInboundIpAddresses?: Array<string>;
  /** Property to enable and disable new private endpoint connection creation on ASE */
  allowNewPrivateEndpointConnections?: boolean;
}

/** Diagnostics for an App Service Environment. */
export interface HostingEnvironmentDiagnosticsOutput {
  /** Name/identifier of the diagnostics. */
  name?: string;
  /** Diagnostics output. */
  diagnosticsOutput?: string;
}

/** Collection of Inbound Environment Endpoints */
export interface InboundEnvironmentEndpointCollectionOutput {
  /** Collection of resources. */
  value: Array<InboundEnvironmentEndpointOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** The IP Addresses and Ports that require inbound network access to and within the subnet of the App Service Environment. */
export interface InboundEnvironmentEndpointOutput {
  /** Short text describing the purpose of the network traffic. */
  description?: string;
  /** The IP addresses that network traffic will originate from in cidr notation. */
  endpoints?: Array<string>;
  /** The ports that network traffic will arrive to the App Service Environment at. */
  ports?: Array<string>;
}

/** Collection of worker pools. */
export interface WorkerPoolCollectionOutput {
  /** Collection of resources. */
  value: Array<WorkerPoolResourceOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** Worker pool of an App Service Environment ARM resource. */
export interface WorkerPoolResourceOutput extends ProxyOnlyResourceOutput {
  /** Core resource properties */
  properties?: WorkerPoolOutput;
  /** Description of a SKU for a scalable resource. */
  sku?: SkuDescriptionOutput;
}

/** Worker pool of an App Service Environment. */
export interface WorkerPoolOutput {
  /** Worker size ID for referencing this worker pool. */
  workerSizeId?: number;
  /** Shared or dedicated app hosting. */
  computeMode?: "Shared" | "Dedicated" | "Dynamic";
  /** VM size of the worker pool instances. */
  workerSize?: string;
  /** Number of instances in the worker pool. */
  workerCount?: number;
  /** Names of all instances in the worker pool (read only). */
  readonly instanceNames?: Array<string>;
}

/** Description of a SKU for a scalable resource. */
export interface SkuDescriptionOutput {
  /** Name of the resource SKU. */
  name?: string;
  /** Service tier of the resource SKU. */
  tier?: string;
  /** Size specifier of the resource SKU. */
  size?: string;
  /** Family code of the resource SKU. */
  family?: string;
  /** Current number of instances assigned to the resource. */
  capacity?: number;
  /** Min, max, and default scale values of the SKU. */
  skuCapacity?: SkuCapacityOutput;
  /** Locations of the SKU. */
  locations?: Array<string>;
  /** Capabilities of the SKU, e.g., is traffic manager enabled? */
  capabilities?: Array<CapabilityOutput>;
}

/** Description of the App Service plan scale options. */
export interface SkuCapacityOutput {
  /** Minimum number of workers for this App Service plan SKU. */
  minimum?: number;
  /** Maximum number of workers for this App Service plan SKU. */
  maximum?: number;
  /** Maximum number of Elastic workers for this App Service plan SKU. */
  elasticMaximum?: number;
  /** Default number of workers for this App Service plan SKU. */
  default?: number;
  /** Available scale configurations for an App Service plan. */
  scaleType?: string;
}

/** Describes the capabilities/features allowed for a specific SKU. */
export interface CapabilityOutput {
  /** Name of the SKU capability. */
  name?: string;
  /** Value of the SKU capability. */
  value?: string;
  /** Reason of the SKU capability. */
  reason?: string;
}

/** Collection of metric definitions. */
export interface ResourceMetricDefinitionCollectionOutput {
  /** Collection of resources. */
  value: Array<ResourceMetricDefinitionOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** Metadata for the metrics. */
export interface ResourceMetricDefinitionOutput extends ProxyOnlyResourceOutput {
  /** ResourceMetricDefinition resource specific properties */
  properties?: ResourceMetricDefinitionPropertiesOutput;
}

/** ResourceMetricDefinition resource specific properties */
export interface ResourceMetricDefinitionPropertiesOutput {
  /** Unit of the metric. */
  readonly unit?: string;
  /** Primary aggregation type. */
  readonly primaryAggregationType?: string;
  /** List of time grains supported for the metric together with retention period. */
  readonly metricAvailabilities?: Array<ResourceMetricAvailabilityOutput>;
  /** Resource URI. */
  readonly resourceUri?: string;
  /** Resource metric definition properties. */
  readonly properties?: Record<string, string>;
}

/** Metrics availability and retention. */
export interface ResourceMetricAvailabilityOutput {
  /** Time grain . */
  readonly timeGrain?: string;
  /** Retention period for the current time grain. */
  readonly retention?: string;
}

/** Collection of SKU information. */
export interface SkuInfoCollectionOutput {
  /** Collection of resources. */
  value: Array<SkuInfoOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** SKU discovery information. */
export interface SkuInfoOutput {
  /** Resource type that this SKU applies to. */
  resourceType?: string;
  /** Name and tier of the SKU. */
  sku?: SkuDescriptionOutput;
  /** Min, max, and default scale values of the SKU. */
  capacity?: SkuCapacityOutput;
}

/** Collection of usages. */
export interface UsageCollectionOutput {
  /** Collection of resources. */
  value: Array<UsageOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** Usage of the quota resource. */
export interface UsageOutput extends ProxyOnlyResourceOutput {
  /** Usage resource specific properties */
  properties?: UsagePropertiesOutput;
}

/** Usage resource specific properties */
export interface UsagePropertiesOutput {
  /** Friendly name shown in the UI. */
  readonly displayName?: string;
  /** Name of the quota resource. */
  readonly resourceName?: string;
  /** Units of measurement for the quota resource. */
  readonly unit?: string;
  /** The current value of the resource counter. */
  readonly currentValue?: number;
  /** The resource limit. */
  readonly limit?: number;
  /** Next reset time for the resource counter. */
  readonly nextResetTime?: string;
  /** Compute mode used for this usage. */
  readonly computeMode?: "Shared" | "Dedicated" | "Dynamic";
  /** Site mode used for this usage. */
  readonly siteMode?: string;
}

/** An operation on a resource. */
export interface OperationOutput {
  /** Operation ID. */
  id?: string;
  /** Operation name. */
  name?: string;
  /** The current status of the operation. */
  status?: "InProgress" | "Failed" | "Succeeded" | "TimedOut" | "Created";
  /** Any errors associate with the operation. */
  errors?: Array<ErrorEntityOutput>;
  /** Time when operation has started. */
  createdTime?: string;
  /** Time when operation has been updated. */
  modifiedTime?: string;
  /** Time when operation will expire. */
  expirationTime?: string;
  /**
   * Applicable only for stamp operation ids.
   *
   * Value may contain a UUID
   */
  geoMasterOperationId?: string;
}

/** Body of the error response returned from the API. */
export interface ErrorEntityOutput {
  /** Type of error. */
  extendedCode?: string;
  /** Message template. */
  messageTemplate?: string;
  /** Parameters for the template. */
  parameters?: Array<string>;
  /** Inner errors. */
  innerErrors?: Array<ErrorEntityOutput>;
  /** Error Details. */
  details?: Array<ErrorEntityOutput>;
  /** The error target. */
  target?: string;
  /** Basic error code. */
  code?: string;
  /** Any details of the error. */
  message?: string;
}

/** Collection of Outbound Environment Endpoints */
export interface OutboundEnvironmentEndpointCollectionOutput {
  /** Collection of resources. */
  value: Array<OutboundEnvironmentEndpointOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** Endpoints accessed for a common purpose that the App Service Environment requires outbound network access to. */
export interface OutboundEnvironmentEndpointOutput {
  /** The type of service accessed by the App Service Environment, e.g., Azure Storage, Azure SQL Database, and Azure Active Directory. */
  category?: string;
  /** The endpoints that the App Service Environment reaches the service at. */
  endpoints?: Array<EndpointDependencyOutput>;
}

/** A domain name that a service is reached at, including details of the current connection status. */
export interface EndpointDependencyOutput {
  /** The domain name of the dependency. */
  domainName?: string;
  /** The IP Addresses and Ports used when connecting to DomainName. */
  endpointDetails?: Array<EndpointDetailOutput>;
}

/** Current TCP connectivity information from the App Service Environment to a single endpoint. */
export interface EndpointDetailOutput {
  /** An IP Address that Domain Name currently resolves to. */
  ipAddress?: string;
  /** The port an endpoint is connected to. */
  port?: number;
  /** The time in milliseconds it takes for a TCP connection to be created from the App Service Environment to this IpAddress at this Port. */
  latency?: number;
  /** Whether it is possible to create a TCP connection from the App Service Environment to this IpAddress at this Port. */
  isAccessible?: boolean;
}

export interface PrivateEndpointConnectionCollectionOutput {
  /** Collection of resources. */
  value: Array<RemotePrivateEndpointConnectionARMResourceOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** Remote Private Endpoint Connection ARM resource. */
export interface RemotePrivateEndpointConnectionARMResourceOutput extends ProxyOnlyResourceOutput {
  /** RemotePrivateEndpointConnectionARMResource resource specific properties */
  properties?: RemotePrivateEndpointConnectionARMResourcePropertiesOutput;
}

/** RemotePrivateEndpointConnectionARMResource resource specific properties */
export interface RemotePrivateEndpointConnectionARMResourcePropertiesOutput {
  readonly provisioningState?: string;
  /** PrivateEndpoint of a remote private endpoint connection */
  privateEndpoint?: ArmIdWrapperOutput;
  /** The state of a private link connection */
  privateLinkServiceConnectionState?: PrivateLinkConnectionStateOutput;
  /** Private IPAddresses mapped to the remote private endpoint */
  ipAddresses?: Array<string>;
}

/** A wrapper for an ARM resource id */
export interface ArmIdWrapperOutput {
  readonly id?: string;
}

/** The state of a private link connection */
export interface PrivateLinkConnectionStateOutput {
  /** Status of a private link connection */
  status?: string;
  /** Description of a private link connection */
  description?: string;
  /** ActionsRequired for a private link connection */
  actionsRequired?: string;
}

/** Private Endpoint Connection Approval ARM resource. */
export interface PrivateLinkConnectionApprovalRequestResourceOutput extends ProxyOnlyResourceOutput {
  /** Core resource properties */
  properties?: PrivateLinkConnectionApprovalRequestOutput;
}

/** A request to approve or reject a private endpoint connection */
export interface PrivateLinkConnectionApprovalRequestOutput {
  /** The state of a private link connection */
  privateLinkServiceConnectionState?: PrivateLinkConnectionStateOutput;
}

/** Wrapper for a collection of private link resources */
export interface PrivateLinkResourcesWrapperOutput {
  value: Array<PrivateLinkResourceOutput>;
}

/** A private link resource */
export interface PrivateLinkResourceOutput {
  id: string;
  /** Name of a private link resource */
  name: string;
  type: string;
  /** Properties of a private link resource */
  properties: PrivateLinkResourcePropertiesOutput;
}

/** Properties of a private link resource */
export interface PrivateLinkResourcePropertiesOutput {
  /** GroupId of a private link resource */
  readonly groupId?: string;
  /** RequiredMembers of a private link resource */
  readonly requiredMembers?: Array<string>;
  /** RequiredZoneNames of a private link resource */
  readonly requiredZoneNames?: Array<string>;
}

/** Collection of App Service plans. */
export interface AppServicePlanCollectionOutput {
  /** Collection of resources. */
  value: Array<AppServicePlanOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** App Service plan. */
export interface AppServicePlanOutput extends ResourceOutput {
  /** AppServicePlan resource specific properties */
  properties?: AppServicePlanPropertiesOutput;
  /** Description of a SKU for a scalable resource. */
  sku?: SkuDescriptionOutput;
  /** Extended Location. */
  extendedLocation?: ExtendedLocationOutput;
}

/** AppServicePlan resource specific properties */
export interface AppServicePlanPropertiesOutput {
  /** Target worker tier assigned to the App Service plan. */
  workerTierName?: string;
  /** App Service plan status. */
  readonly status?: "Ready" | "Pending" | "Creating";
  /** App Service plan subscription. */
  readonly subscription?: string;
  /** Specification for the App Service Environment to use for the App Service plan. */
  hostingEnvironmentProfile?: HostingEnvironmentProfileOutput;
  /** Maximum number of instances that can be assigned to this App Service plan. */
  readonly maximumNumberOfWorkers?: number;
  /** Geographical location for the App Service plan. */
  readonly geoRegion?: string;
  /**
   * If <code>true</code>, apps assigned to this App Service plan can be scaled independently.
   * If <code>false</code>, apps assigned to this App Service plan will scale to all instances of the plan.
   */
  perSiteScaling?: boolean;
  /** ServerFarm supports ElasticScale. Apps in this plan will scale as if the ServerFarm was ElasticPremium sku */
  elasticScaleEnabled?: boolean;
  /** Maximum number of total workers allowed for this ElasticScaleEnabled App Service Plan */
  maximumElasticWorkerCount?: number;
  /** Number of apps assigned to this App Service plan. */
  readonly numberOfSites?: number;
  /** If <code>true</code>, this App Service Plan owns spot instances. */
  isSpot?: boolean;
  /** The time when the server farm expires. Valid only if it is a spot server farm. */
  spotExpirationTime?: string;
  /** The time when the server farm free offer expires. */
  freeOfferExpirationTime?: string;
  /** Resource group of the App Service plan. */
  readonly resourceGroup?: string;
  /** If Linux app service plan <code>true</code>, <code>false</code> otherwise. */
  reserved?: boolean;
  /** Obsolete: If Hyper-V container app service plan <code>true</code>, <code>false</code> otherwise. */
  isXenon?: boolean;
  /** If Hyper-V container app service plan <code>true</code>, <code>false</code> otherwise. */
  hyperV?: boolean;
  /** Scaling worker count. */
  targetWorkerCount?: number;
  /** Scaling worker size ID. */
  targetWorkerSizeId?: number;
  /** Provisioning state of the App Service Plan. */
  readonly provisioningState?: "Succeeded" | "Failed" | "Canceled" | "InProgress" | "Deleting";
  /** Specification for the Kubernetes Environment to use for the App Service plan. */
  kubeEnvironmentProfile?: KubeEnvironmentProfileOutput;
  /**
   * If <code>true</code>, this App Service Plan will perform availability zone balancing.
   * If <code>false</code>, this App Service Plan will not perform availability zone balancing.
   */
  zoneRedundant?: boolean;
}

/** Specification for a Kubernetes Environment to use for this resource. */
export interface KubeEnvironmentProfileOutput {
  /** Resource ID of the Kubernetes Environment. */
  id?: string;
  /** Name of the Kubernetes Environment. */
  readonly name?: string;
  /** Resource type of the Kubernetes Environment. */
  readonly type?: string;
}

/** Collection of CSM usage quotas. */
export interface CsmUsageQuotaCollectionOutput {
  /** Collection of resources. */
  value: Array<CsmUsageQuotaOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** Usage of the quota resource. */
export interface CsmUsageQuotaOutput {
  /** Units of measurement for the quota resource. */
  unit?: string;
  /** Next reset time for the resource counter. */
  nextResetTime?: string;
  /** The current value of the resource counter. */
  currentValue?: number;
  /** The resource limit. */
  limit?: number;
  /** Quota name. */
  name?: LocalizableStringOutput;
}

/** Localizable string object containing the name and a localized value. */
export interface LocalizableStringOutput {
  /** Non-localized name. */
  value?: string;
  /** Localized name. */
  localizedValue?: string;
}

/** ARM resource for a app service plan. */
export interface AppServicePlanPatchResourceOutput extends ProxyOnlyResourceOutput {
  /** AppServicePlanPatchResource resource specific properties */
  properties?: AppServicePlanPatchResourcePropertiesOutput;
}

/** AppServicePlanPatchResource resource specific properties */
export interface AppServicePlanPatchResourcePropertiesOutput {
  /** Target worker tier assigned to the App Service plan. */
  workerTierName?: string;
  /** App Service plan status. */
  readonly status?: "Ready" | "Pending" | "Creating";
  /** App Service plan subscription. */
  readonly subscription?: string;
  /** Specification for the App Service Environment to use for the App Service plan. */
  hostingEnvironmentProfile?: HostingEnvironmentProfileOutput;
  /** Maximum number of instances that can be assigned to this App Service plan. */
  readonly maximumNumberOfWorkers?: number;
  /** Geographical location for the App Service plan. */
  readonly geoRegion?: string;
  /**
   * If <code>true</code>, apps assigned to this App Service plan can be scaled independently.
   * If <code>false</code>, apps assigned to this App Service plan will scale to all instances of the plan.
   */
  perSiteScaling?: boolean;
  /** ServerFarm supports ElasticScale. Apps in this plan will scale as if the ServerFarm was ElasticPremium sku */
  elasticScaleEnabled?: boolean;
  /** Maximum number of total workers allowed for this ElasticScaleEnabled App Service Plan */
  maximumElasticWorkerCount?: number;
  /** Number of apps assigned to this App Service plan. */
  readonly numberOfSites?: number;
  /** If <code>true</code>, this App Service Plan owns spot instances. */
  isSpot?: boolean;
  /** The time when the server farm expires. Valid only if it is a spot server farm. */
  spotExpirationTime?: string;
  /** The time when the server farm free offer expires. */
  freeOfferExpirationTime?: string;
  /** Resource group of the App Service plan. */
  readonly resourceGroup?: string;
  /** If Linux app service plan <code>true</code>, <code>false</code> otherwise. */
  reserved?: boolean;
  /** Obsolete: If Hyper-V container app service plan <code>true</code>, <code>false</code> otherwise. */
  isXenon?: boolean;
  /** If Hyper-V container app service plan <code>true</code>, <code>false</code> otherwise. */
  hyperV?: boolean;
  /** Scaling worker count. */
  targetWorkerCount?: number;
  /** Scaling worker size ID. */
  targetWorkerSizeId?: number;
  /** Provisioning state of the App Service Plan. */
  readonly provisioningState?: "Succeeded" | "Failed" | "Canceled" | "InProgress" | "Deleting";
  /** Specification for the Kubernetes Environment to use for the App Service plan. */
  kubeEnvironmentProfile?: KubeEnvironmentProfileOutput;
  /**
   * If <code>true</code>, this App Service Plan will perform availability zone balancing.
   * If <code>false</code>, this App Service Plan will not perform availability zone balancing.
   */
  zoneRedundant?: boolean;
}

/** Hybrid Connection contract. This is used to configure a Hybrid Connection. */
export interface HybridConnectionOutput extends ProxyOnlyResourceOutput {
  /** HybridConnection resource specific properties */
  properties?: HybridConnectionPropertiesOutput;
}

/** HybridConnection resource specific properties */
export interface HybridConnectionPropertiesOutput {
  /** The name of the Service Bus namespace. */
  serviceBusNamespace?: string;
  /** The name of the Service Bus relay. */
  relayName?: string;
  /** The ARM URI to the Service Bus relay. */
  relayArmUri?: string;
  /** The hostname of the endpoint. */
  hostname?: string;
  /** The port of the endpoint. */
  port?: number;
  /** The name of the Service Bus key which has Send permissions. This is used to authenticate to Service Bus. */
  sendKeyName?: string;
  /**
   * The value of the Service Bus key. This is used to authenticate to Service Bus. In ARM this key will not be returned
   * normally, use the POST /listKeys API instead.
   */
  sendKeyValue?: string;
  /** The suffix for the service bus endpoint. By default this is .servicebus.windows.net */
  serviceBusSuffix?: string;
}

/** Hybrid Connection key contract. This has the send key name and value for a Hybrid Connection. */
export interface HybridConnectionKeyOutput extends ProxyOnlyResourceOutput {
  /** HybridConnectionKey resource specific properties */
  properties?: HybridConnectionKeyPropertiesOutput;
}

/** HybridConnectionKey resource specific properties */
export interface HybridConnectionKeyPropertiesOutput {
  /** The name of the send key. */
  readonly sendKeyName?: string;
  /** The value of the send key. */
  readonly sendKeyValue?: string;
}

/** Collection of resources. */
export interface ResourceCollectionOutput {
  /** Collection of resources. */
  value: Array<string>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** Hybrid Connection limits contract. This is used to return the plan limits of Hybrid Connections. */
export interface HybridConnectionLimitsOutput extends ProxyOnlyResourceOutput {
  /** HybridConnectionLimits resource specific properties */
  properties?: HybridConnectionLimitsPropertiesOutput;
}

/** HybridConnectionLimits resource specific properties */
export interface HybridConnectionLimitsPropertiesOutput {
  /** The current number of Hybrid Connections. */
  readonly current?: number;
  /** The maximum number of Hybrid Connections allowed. */
  readonly maximum?: number;
}

/** Collection of hostname bindings. */
export interface HybridConnectionCollectionOutput {
  /** Collection of resources. */
  value: Array<HybridConnectionOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** Virtual Network information ARM resource. */
export interface VnetInfoResourceOutput extends ProxyOnlyResourceOutput {
  /** Core resource properties */
  properties?: VnetInfoOutput;
}

/** Virtual Network information contract. */
export interface VnetInfoOutput {
  /** The Virtual Network's resource ID. */
  vnetResourceId?: string;
  /** The client certificate thumbprint. */
  readonly certThumbprint?: string;
  /**
   * A certificate file (.cer) blob containing the public key of the private key used to authenticate a
   * Point-To-Site VPN connection.
   */
  certBlob?: string;
  /** The routes that this Virtual Network connection uses. */
  readonly routes?: Array<VnetRouteOutput>;
  /** <code>true</code> if a resync is required; otherwise, <code>false</code>. */
  readonly resyncRequired?: boolean;
  /** DNS servers to be used by this Virtual Network. This should be a comma-separated list of IP addresses. */
  dnsServers?: string;
  /** Flag that is used to denote if this is VNET injection */
  isSwift?: boolean;
}

/** Virtual Network route contract used to pass routing information for a Virtual Network. */
export interface VnetRouteOutput extends ProxyOnlyResourceOutput {
  /** VnetRoute resource specific properties */
  properties?: VnetRoutePropertiesOutput;
}

/** VnetRoute resource specific properties */
export interface VnetRoutePropertiesOutput {
  /** The starting address for this route. This may also include a CIDR notation, in which case the end address must not be specified. */
  startAddress?: string;
  /** The ending address for this route. If the start address is specified in CIDR notation, this must be omitted. */
  endAddress?: string;
  /**
   * The type of route this is:
   * DEFAULT - By default, every app has routes to the local address ranges specified by RFC1918
   * INHERITED - Routes inherited from the real Virtual Network routes
   * STATIC - Static route set on the app only
   *
   * These values will be used for syncing an app's routes with those from a Virtual Network.
   */
  routeType?: "DEFAULT" | "INHERITED" | "STATIC";
}

/** The Virtual Network gateway contract. This is used to give the Virtual Network gateway access to the VPN package. */
export interface VnetGatewayOutput extends ProxyOnlyResourceOutput {
  /** VnetGateway resource specific properties */
  properties?: VnetGatewayPropertiesOutput;
}

/** VnetGateway resource specific properties */
export interface VnetGatewayPropertiesOutput {
  /** The Virtual Network name. */
  vnetName?: string;
  /** The URI where the VPN package can be downloaded. */
  vpnPackageUri: string;
}

/** Collection of certificates. */
export interface CertificateCollectionOutput {
  /** Collection of resources. */
  value: Array<CertificateOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** SSL certificate for an app. */
export interface CertificateOutput extends ResourceOutput {
  /** Certificate resource specific properties */
  properties?: CertificatePropertiesOutput;
}

/** Certificate resource specific properties */
export interface CertificatePropertiesOutput {
  /** Certificate password. */
  password?: string;
  /** Friendly name of the certificate. */
  readonly friendlyName?: string;
  /** Subject name of the certificate. */
  readonly subjectName?: string;
  /** Host names the certificate applies to. */
  hostNames?: Array<string>;
  /**
   * Pfx blob.
   *
   * Value may contain base64 encoded characters
   */
  pfxBlob?: string;
  /** App name. */
  readonly siteName?: string;
  /** Self link. */
  readonly selfLink?: string;
  /** Certificate issuer. */
  readonly issuer?: string;
  /** Certificate issue Date. */
  readonly issueDate?: string;
  /** Certificate expiration date. */
  readonly expirationDate?: string;
  /** Certificate thumbprint. */
  readonly thumbprint?: string;
  /** Is the certificate valid?. */
  readonly valid?: boolean;
  /**
   * Raw bytes of .cer file
   *
   * Value may contain base64 encoded characters
   */
  readonly cerBlob?: string;
  /** Public key hash. */
  readonly publicKeyHash?: string;
  /** Specification for the App Service Environment to use for the certificate. */
  readonly hostingEnvironmentProfile?: HostingEnvironmentProfileOutput;
  /** Key Vault Csm resource Id. */
  keyVaultId?: string;
  /** Key Vault secret name. */
  keyVaultSecretName?: string;
  /** Status of the Key Vault secret. */
  readonly keyVaultSecretStatus?:
    | "Initialized"
    | "WaitingOnCertificateOrder"
    | "Succeeded"
    | "CertificateOrderFailed"
    | "OperationNotPermittedOnKeyVault"
    | "AzureServiceUnauthorizedToAccessKeyVault"
    | "KeyVaultDoesNotExist"
    | "KeyVaultSecretDoesNotExist"
    | "UnknownError"
    | "ExternalPrivateKey"
    | "Unknown";
  /** Resource ID of the associated App Service plan, formatted as: "/subscriptions/{subscriptionID}/resourceGroups/{groupName}/providers/Microsoft.Web/serverfarms/{appServicePlanName}". */
  serverFarmId?: string;
  /** CNAME of the certificate to be issued via free certificate */
  canonicalName?: string;
  /** Method of domain validation for free cert */
  domainValidationMethod?: string;
}

/** ARM resource for a certificate. */
export interface CertificatePatchResourceOutput extends ProxyOnlyResourceOutput {
  /** CertificatePatchResource resource specific properties */
  properties?: CertificatePatchResourcePropertiesOutput;
}

/** CertificatePatchResource resource specific properties */
export interface CertificatePatchResourcePropertiesOutput {
  /** Certificate password. */
  password?: string;
  /** Friendly name of the certificate. */
  readonly friendlyName?: string;
  /** Subject name of the certificate. */
  readonly subjectName?: string;
  /** Host names the certificate applies to. */
  hostNames?: Array<string>;
  /**
   * Pfx blob.
   *
   * Value may contain base64 encoded characters
   */
  pfxBlob?: string;
  /** App name. */
  readonly siteName?: string;
  /** Self link. */
  readonly selfLink?: string;
  /** Certificate issuer. */
  readonly issuer?: string;
  /** Certificate issue Date. */
  readonly issueDate?: string;
  /** Certificate expiration date. */
  readonly expirationDate?: string;
  /** Certificate thumbprint. */
  readonly thumbprint?: string;
  /** Is the certificate valid?. */
  readonly valid?: boolean;
  /**
   * Raw bytes of .cer file
   *
   * Value may contain base64 encoded characters
   */
  readonly cerBlob?: string;
  /** Public key hash. */
  readonly publicKeyHash?: string;
  /** Specification for the App Service Environment to use for the certificate. */
  readonly hostingEnvironmentProfile?: HostingEnvironmentProfileOutput;
  /** Key Vault Csm resource Id. */
  keyVaultId?: string;
  /** Key Vault secret name. */
  keyVaultSecretName?: string;
  /** Status of the Key Vault secret. */
  readonly keyVaultSecretStatus?:
    | "Initialized"
    | "WaitingOnCertificateOrder"
    | "Succeeded"
    | "CertificateOrderFailed"
    | "OperationNotPermittedOnKeyVault"
    | "AzureServiceUnauthorizedToAccessKeyVault"
    | "KeyVaultDoesNotExist"
    | "KeyVaultSecretDoesNotExist"
    | "UnknownError"
    | "ExternalPrivateKey"
    | "Unknown";
  /** Resource ID of the associated App Service plan, formatted as: "/subscriptions/{subscriptionID}/resourceGroups/{groupName}/providers/Microsoft.Web/serverfarms/{appServicePlanName}". */
  serverFarmId?: string;
  /** CNAME of the certificate to be issued via free certificate */
  canonicalName?: string;
  /** Method of domain validation for free cert */
  domainValidationMethod?: string;
}

/** Container App collection ARM resource. */
export interface ContainerAppCollectionOutput {
  /** Collection of resources. */
  value: Array<ContainerAppOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** Container App. */
export interface ContainerAppOutput extends ResourceOutput {
  /** ContainerApp resource specific properties */
  properties?: ContainerAppPropertiesOutput;
}

/** ContainerApp resource specific properties */
export interface ContainerAppPropertiesOutput {
  /** Provisioning state of the Container App. */
  readonly provisioningState?: "InProgress" | "Succeeded" | "Failed" | "Canceled";
  /** Resource ID of the Container App's KubeEnvironment. */
  kubeEnvironmentId?: string;
  /** Name of the latest revision of the Container App. */
  readonly latestRevisionName?: string;
  /** Fully Qualified Domain Name of the latest revision of the Container App. */
  readonly latestRevisionFqdn?: string;
  /** Non versioned Container App configuration properties. */
  configuration?: ConfigurationOutput;
  /** Container App versioned application definition. */
  template?: TemplateOutput;
}

/** Non versioned Container App configuration properties that define the mutable settings of a Container app */
export interface ConfigurationOutput {
  /** Collection of secrets used by a Container app */
  secrets?: Array<SecretOutput>;
  /**
   * ActiveRevisionsMode controls how active revisions are handled for the Container app:
   * <list><item>Multiple: multiple revisions can be active. If no value if provided, this is the default</item><item>Single: Only one revision can be active at a time. Revision weights can not be used in this mode</item></list>
   */
  activeRevisionsMode?: "multiple" | "single";
  /** Ingress configurations. */
  ingress?: IngressOutput;
  /** Collection of private container registry credentials for containers used by the Container app */
  registries?: Array<RegistryCredentialsOutput>;
}

/** Container App Secret. */
export interface SecretOutput {
  /** Secret Name. */
  name?: string;
  /** Secret Value. */
  value?: string;
}

/** Container App Ingress configuration. */
export interface IngressOutput {
  /** Hostname. */
  readonly fqdn?: string;
  /** Bool indicating if app exposes an external http endpoint */
  external?: boolean;
  /** Target Port in containers for traffic from ingress */
  targetPort?: number;
  /** Ingress transport protocol */
  transport?: "auto" | "http" | "http2";
  traffic?: Array<TrafficWeightOutput>;
  /** Bool indicating if HTTP connections to is allowed. If set to false HTTP connections are automatically redirected to HTTPS connections */
  allowInsecure?: boolean;
}

/** Traffic weight assigned to a revision */
export interface TrafficWeightOutput {
  /** Name of a revision */
  revisionName?: string;
  /** Traffic weight assigned to a revision */
  weight?: number;
  /** Indicates that the traffic weight belongs to a latest stable revision */
  latestRevision?: boolean;
}

/** Container App Private Registry */
export interface RegistryCredentialsOutput {
  /** Container Registry Server */
  server?: string;
  /** Container Registry Username */
  username?: string;
  /** The name of the Secret that contains the registry login password */
  passwordSecretRef?: string;
}

/**
 * Container App versioned application definition.
 * Defines the desired state of an immutable revision.
 * Any changes to this section Will result in a new revision being created
 */
export interface TemplateOutput {
  /** User friendly suffix that is appended to the revision name */
  revisionSuffix?: string;
  /** List of container definitions for the Container App. */
  containers?: Array<ContainerOutput>;
  /** Scaling properties for the Container App. */
  scale?: ScaleOutput;
  /** Dapr configuration for the Container App. */
  dapr?: DaprOutput;
}

/** Container App container definition. */
export interface ContainerOutput {
  /** Container image tag. */
  image?: string;
  /** Custom container name. */
  name?: string;
  /** Container start command. */
  command?: Array<string>;
  /** Container start command arguments. */
  args?: Array<string>;
  /** Container environment variables. */
  env?: Array<EnvironmentVarOutput>;
  /** Container resource requirements. */
  resources?: ContainerResourcesOutput;
}

/** Container App container environment variable. */
export interface EnvironmentVarOutput {
  /** Environment variable name. */
  name?: string;
  /** Non-secret environment variable value. */
  value?: string;
  /** Name of the Container App secret from which to pull the environment variable value. */
  secretRef?: string;
}

/** Container App container resource requirements. */
export interface ContainerResourcesOutput {
  /** Required CPU in cores, e.g. 0.5 */
  cpu?: number;
  /** Required memory, e.g. "250Mb" */
  memory?: string;
}

/** Container App scaling configurations. */
export interface ScaleOutput {
  /** Optional. Minimum number of container replicas. */
  minReplicas?: number;
  /** Optional. Maximum number of container replicas. Defaults to 10 if not set. */
  maxReplicas?: number;
  /** Scaling rules. */
  rules?: Array<ScaleRuleOutput>;
}

/** Container App container scaling rule. */
export interface ScaleRuleOutput {
  /** Scale Rule Name */
  name?: string;
  /** Azure Queue based scaling. */
  azureQueue?: QueueScaleRuleOutput;
  /** Custom scale rule. */
  custom?: CustomScaleRuleOutput;
  /** HTTP requests based scaling. */
  http?: HttpScaleRuleOutput;
}

/** Container App container Azure Queue based scaling rule. */
export interface QueueScaleRuleOutput {
  /** Queue name. */
  queueName?: string;
  /** Queue length. */
  queueLength?: number;
  /** Authentication secrets for the queue scale rule. */
  auth?: Array<ScaleRuleAuthOutput>;
}

/** Auth Secrets for Container App Scale Rule */
export interface ScaleRuleAuthOutput {
  /** Name of the Container App secret from which to pull the auth params. */
  secretRef?: string;
  /** Trigger Parameter that uses the secret */
  triggerParameter?: string;
}

/** Container App container Custom scaling rule. */
export interface CustomScaleRuleOutput {
  /**
   * Type of the custom scale rule
   * eg: azure-servicebus, redis etc.
   */
  type?: string;
  /** Metadata properties to describe custom scale rule. */
  metadata?: Record<string, string>;
  /** Authentication secrets for the custom scale rule. */
  auth?: Array<ScaleRuleAuthOutput>;
}

/** Container App container Custom scaling rule. */
export interface HttpScaleRuleOutput {
  /** Metadata properties to describe http scale rule. */
  metadata?: Record<string, string>;
  /** Authentication secrets for the custom scale rule. */
  auth?: Array<ScaleRuleAuthOutput>;
}

/** Container App Dapr configuration. */
export interface DaprOutput {
  /** Boolean indicating if the Dapr side car is enabled */
  enabled?: boolean;
  /** Dapr application identifier */
  appId?: string;
  /** Port on which the Dapr side car */
  appPort?: number;
  /** Collection of Dapr components */
  components?: Array<DaprComponentOutput>;
}

/** Dapr component configuration */
export interface DaprComponentOutput {
  /** Component name */
  name?: string;
  /** Component type */
  type?: string;
  /** Component version */
  version?: string;
  /** Component metadata */
  metadata?: Array<DaprMetadataOutput>;
}

/** Container App Dapr component metadata. */
export interface DaprMetadataOutput {
  /** Metadata property name. */
  name?: string;
  /** Metadata property value. */
  value?: string;
  /** Name of the Container App secret from which to pull the metadata property value. */
  secretRef?: string;
}

/** Container App Secrets Collection ARM resource. */
export interface SecretsCollectionOutput {
  /** Collection of resources. */
  value: Array<ContainerAppSecretOutput>;
}

/** Container App Secret. */
export interface ContainerAppSecretOutput {
  /** Secret Name. */
  readonly name?: string;
  /** Secret Value. */
  readonly value?: string;
}

/** Container App Revisions collection ARM resource. */
export interface RevisionCollectionOutput {
  /** Collection of resources. */
  value: Array<RevisionOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** Container App Revision. */
export interface RevisionOutput extends ResourceOutput {
  /** Revision resource specific properties */
  properties?: RevisionPropertiesOutput;
}

/** Revision resource specific properties */
export interface RevisionPropertiesOutput {
  /**
   * Timestamp describing when the revision was created
   * by controller
   */
  readonly createdTime?: string;
  /** Fully qualified domain name of the revision */
  readonly fqdn?: string;
  /**
   * Container App Revision Template with all possible settings and the
   * defaults if user did not provide them. The defaults are populated
   * as they were at the creation time
   */
  readonly template?: TemplateOutput;
  /** Boolean describing if the Revision is Active */
  readonly active?: boolean;
  /** Number of pods currently running for this revision */
  readonly replicas?: number;
  /** Traffic weight assigned to this revision */
  readonly trafficWeight?: number;
  /** Optional Field - Platform Error Message */
  readonly provisioningError?: string;
  /** Current health State of the revision */
  readonly healthState?: "Healthy" | "Unhealthy" | "None";
  /** Current provisioning State of the revision */
  readonly provisioningState?:
    | "Provisioning"
    | "Provisioned"
    | "Failed"
    | "Deprovisioning"
    | "Deprovisioned";
}

/** Collection of deleted apps. */
export interface DeletedWebAppCollectionOutput {
  /** Collection of resources. */
  value: Array<DeletedSiteOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** A deleted app. */
export interface DeletedSiteOutput extends ProxyOnlyResourceOutput {
  /** DeletedSite resource specific properties */
  properties?: DeletedSitePropertiesOutput;
}

/** DeletedSite resource specific properties */
export interface DeletedSitePropertiesOutput {
  /** Numeric id for the deleted site */
  readonly deletedSiteId?: number;
  /** Time in UTC when the app was deleted. */
  readonly deletedTimestamp?: string;
  /** Subscription containing the deleted site */
  readonly subscription?: string;
  /** ResourceGroup that contained the deleted site */
  readonly resourceGroup?: string;
  /** Name of the deleted site */
  readonly deletedSiteName?: string;
  /** Slot of the deleted site */
  readonly slot?: string;
  /** Kind of site that was deleted */
  readonly kind?: string;
  /** Geo Region of the deleted site */
  readonly geoRegionName?: string;
}

/** Collection of Diagnostic Categories */
export interface DiagnosticCategoryCollectionOutput {
  /** Collection of resources. */
  value: Array<DiagnosticCategoryOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** Class representing detector definition */
export interface DiagnosticCategoryOutput extends ProxyOnlyResourceOutput {
  /** DiagnosticCategory resource specific properties */
  properties?: DiagnosticCategoryPropertiesOutput;
}

/** DiagnosticCategory resource specific properties */
export interface DiagnosticCategoryPropertiesOutput {
  /** Description of the diagnostic category */
  readonly description?: string;
}

/** Collection of Diagnostic Analyses */
export interface DiagnosticAnalysisCollectionOutput {
  /** Collection of resources. */
  value: Array<AnalysisDefinitionOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** Definition of Analysis */
export interface AnalysisDefinitionOutput extends ProxyOnlyResourceOutput {
  /** AnalysisDefinition resource specific properties */
  properties?: AnalysisDefinitionPropertiesOutput;
}

/** AnalysisDefinition resource specific properties */
export interface AnalysisDefinitionPropertiesOutput {
  /** Description of the Analysis */
  readonly description?: string;
}

/** Class representing a diagnostic analysis done on an application */
export interface DiagnosticAnalysisOutput extends ProxyOnlyResourceOutput {
  /** DiagnosticAnalysis resource specific properties */
  properties?: DiagnosticAnalysisPropertiesOutput;
}

/** DiagnosticAnalysis resource specific properties */
export interface DiagnosticAnalysisPropertiesOutput {
  /** Start time of the period */
  startTime?: string;
  /** End time of the period */
  endTime?: string;
  /** List of time periods. */
  abnormalTimePeriods?: Array<AbnormalTimePeriodOutput>;
  /** Data by each detector */
  payload?: Array<AnalysisDataOutput>;
  /** Data by each detector for detectors that did not corelate */
  nonCorrelatedDetectors?: Array<DetectorDefinitionOutput>;
}

/** Class representing Abnormal Time Period identified in diagnosis */
export interface AbnormalTimePeriodOutput {
  /** Start time of the downtime */
  startTime?: string;
  /** End time of the downtime */
  endTime?: string;
  /** List of Possible Cause of downtime */
  events?: Array<DetectorAbnormalTimePeriodOutput>;
  /** List of proposed solutions */
  solutions?: Array<SolutionOutput>;
}

/** Class representing Abnormal Time Period detected. */
export interface DetectorAbnormalTimePeriodOutput {
  /** Start time of the correlated event */
  startTime?: string;
  /** End time of the correlated event */
  endTime?: string;
  /** Message describing the event */
  message?: string;
  /** Represents the name of the Detector */
  source?: string;
  /** Represents the rank of the Detector */
  priority?: number;
  /** Downtime metadata */
  metaData?: Array<Array<NameValuePairOutput>>;
  /** Represents the type of the Detector */
  type?:
    | "ServiceIncident"
    | "AppDeployment"
    | "AppCrash"
    | "RuntimeIssueDetected"
    | "AseDeployment"
    | "UserIssue"
    | "PlatformIssue"
    | "Other";
  /** List of proposed solutions */
  solutions?: Array<SolutionOutput>;
}

/** Class Representing Solution for problems detected. */
export interface SolutionOutput {
  /** Solution Id. */
  id?: number;
  /** Display Name of the solution */
  displayName?: string;
  /** Order of the solution. */
  order?: number;
  /** Description of the solution */
  description?: string;
  /** Type of Solution */
  type?: "QuickSolution" | "DeepInvestigation" | "BestPractices";
  /** Solution Data. */
  data?: Array<Array<NameValuePairOutput>>;
  /** Solution Metadata. */
  metadata?: Array<Array<NameValuePairOutput>>;
}

/** Class Representing Detector Evidence used for analysis */
export interface AnalysisDataOutput {
  /** Name of the Detector */
  source?: string;
  /** Detector Definition */
  detectorDefinition?: DetectorDefinitionOutput;
  /** Source Metrics */
  metrics?: Array<DiagnosticMetricSetOutput>;
  /** Additional Source Data */
  data?: Array<Array<NameValuePairOutput>>;
  /** Detector Meta Data */
  detectorMetaData?: ResponseMetaDataOutput;
}

/** Class representing detector definition */
export interface DetectorDefinitionOutput {
  /** Display name of the detector */
  readonly displayName?: string;
  /** Description of the detector */
  readonly description?: string;
  /** Detector Rank */
  readonly rank?: number;
  /** Flag representing whether detector is enabled or not. */
  readonly isEnabled?: boolean;
}

/** Class representing Diagnostic Metric information */
export interface DiagnosticMetricSetOutput {
  /** Name of the metric */
  name?: string;
  /** Metric's unit */
  unit?: string;
  /** Start time of the period */
  startTime?: string;
  /** End time of the period */
  endTime?: string;
  /** Presented time grain. Supported grains at the moment are PT1M, PT1H, P1D */
  timeGrain?: string;
  /** Collection of metric values for the selected period based on the {Microsoft.Web.Hosting.Administration.DiagnosticMetricSet.TimeGrain} */
  values?: Array<DiagnosticMetricSampleOutput>;
}

/** Class representing Diagnostic Metric */
export interface DiagnosticMetricSampleOutput {
  /** Time at which metric is measured */
  timestamp?: string;
  /**
   * Role Instance. Null if this counter is not per instance
   * This is returned and should be whichever instance name we desire to be returned
   * i.e. CPU and Memory return RDWORKERNAME (LargeDed..._IN_0)
   * where RDWORKERNAME is Machine name below and RoleInstance name in parenthesis
   */
  roleInstance?: string;
  /** Total value of the metric. If multiple measurements are made this will have sum of all. */
  total?: number;
  /** Maximum of the metric sampled during the time period */
  maximum?: number;
  /** Minimum of the metric sampled during the time period */
  minimum?: number;
  /** Whether the values are aggregates across all workers or not */
  isAggregated?: boolean;
}

export interface ResponseMetaDataOutput {
  /** Source of the Data */
  dataSource?: DataSourceOutput;
}

/** Class representing data source used by the detectors */
export interface DataSourceOutput {
  /** Instructions if any for the data source */
  instructions?: Array<string>;
  /** Datasource Uri Links */
  dataSourceUri?: Array<NameValuePairOutput>;
}

/** Collection of Diagnostic Detectors */
export interface DiagnosticDetectorCollectionOutput {
  /** Collection of resources. */
  value: Array<DetectorDefinitionResourceOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** ARM resource for a detector definition */
export interface DetectorDefinitionResourceOutput extends ProxyOnlyResourceOutput {
  /** Core resource properties */
  properties?: DetectorDefinitionOutput;
}

/** Class representing Response from Diagnostic Detectors */
export interface DiagnosticDetectorResponseOutput extends ProxyOnlyResourceOutput {
  /** DiagnosticDetectorResponse resource specific properties */
  properties?: DiagnosticDetectorResponsePropertiesOutput;
}

/** DiagnosticDetectorResponse resource specific properties */
export interface DiagnosticDetectorResponsePropertiesOutput {
  /** Start time of the period */
  startTime?: string;
  /** End time of the period */
  endTime?: string;
  /** Flag representing Issue was detected. */
  issueDetected?: boolean;
  /** Detector's definition */
  detectorDefinition?: DetectorDefinitionOutput;
  /** Metrics provided by the detector */
  metrics?: Array<DiagnosticMetricSetOutput>;
  /** List of Correlated events found by the detector */
  abnormalTimePeriods?: Array<DetectorAbnormalTimePeriodOutput>;
  /** Additional Data that detector wants to send. */
  data?: Array<Array<NameValuePairOutput>>;
  /** Meta Data */
  responseMetaData?: ResponseMetaDataOutput;
}

/** A snapshot of an app. */
export interface SnapshotOutput extends ProxyOnlyResourceOutput {
  /** Snapshot resource specific properties */
  properties?: SnapshotPropertiesOutput;
}

/** Snapshot resource specific properties */
export interface SnapshotPropertiesOutput {
  /** The time the snapshot was taken. */
  readonly time?: string;
}

/** Collection of Kubernetes Environments */
export interface KubeEnvironmentCollectionOutput {
  /** Collection of resources. */
  value: Array<KubeEnvironmentOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** A Kubernetes cluster specialized for web workloads by Azure App Service */
export interface KubeEnvironmentOutput extends ResourceOutput {
  /** KubeEnvironment resource specific properties */
  properties?: KubeEnvironmentPropertiesOutput;
  /** Extended Location. */
  extendedLocation?: ExtendedLocationOutput;
}

/** KubeEnvironment resource specific properties */
export interface KubeEnvironmentPropertiesOutput {
  /** Provisioning state of the Kubernetes Environment. */
  readonly provisioningState?:
    | "Succeeded"
    | "Failed"
    | "Canceled"
    | "Waiting"
    | "InitializationInProgress"
    | "InfrastructureSetupInProgress"
    | "InfrastructureSetupComplete"
    | "ScheduledForDelete"
    | "UpgradeRequested"
    | "UpgradeFailed";
  /** Any errors that occurred during deployment or deployment validation */
  readonly deploymentErrors?: string;
  /** Only visible within Vnet/Subnet */
  internalLoadBalancerEnabled?: boolean;
  /** Default Domain Name for the cluster */
  readonly defaultDomain?: string;
  /** Static IP of the KubeEnvironment */
  staticIp?: string;
  /** Type of Kubernetes Environment. Only supported for Container App Environments with value as Managed */
  environmentType?: string;
  /**
   * Cluster configuration which determines the ARC cluster
   * components types. Eg: Choosing between BuildService kind,
   * FrontEnd Service ArtifactsStorageType etc.
   */
  arcConfiguration?: ArcConfigurationOutput;
  /**
   * Cluster configuration which enables the log daemon to export
   * app logs to a destination. Currently only "log-analytics" is
   * supported
   */
  appLogsConfiguration?: AppLogsConfigurationOutput;
  /** Cluster configuration for Container Apps Environments to configure Dapr Instrumentation Key and VNET Configuration */
  containerAppsConfiguration?: ContainerAppsConfigurationOutput;
  aksResourceID?: string;
}

export interface ArcConfigurationOutput {
  artifactsStorageType?: "LocalNode" | "NetworkFileSystem";
  artifactStorageClassName?: string;
  artifactStorageMountPath?: string;
  artifactStorageNodeName?: string;
  artifactStorageAccessMode?: string;
  frontEndServiceConfiguration?: FrontEndConfigurationOutput;
  kubeConfig?: string;
}

export interface FrontEndConfigurationOutput {
  kind?: "NodePort" | "LoadBalancer";
}

export interface AppLogsConfigurationOutput {
  destination?: string;
  logAnalyticsConfiguration?: LogAnalyticsConfigurationOutput;
}

export interface LogAnalyticsConfigurationOutput {
  customerId?: string;
  sharedKey?: string;
}

export interface ContainerAppsConfigurationOutput {
  /** Azure Monitor instrumentation key used by Dapr to export Service to Service communication telemetry */
  daprAIInstrumentationKey?: string;
  /** IP range in CIDR notation that can be reserved for environment infrastructure IP addresses. It must not overlap with any other Subnet IP ranges. */
  platformReservedCidr?: string;
  /** An IP address from the IP range defined by platformReservedCidr that will be reserved for the internal DNS server */
  platformReservedDnsIP?: string;
  /** Resource ID of a subnet for control plane infrastructure components. This subnet must be in the same VNET as the subnet defined in appSubnetResourceId. Must not overlap with the IP range defined in platformReservedCidr, if defined. */
  controlPlaneSubnetResourceId?: string;
  /** Resource ID of a subnet for control plane infrastructure components. This subnet must be in the same VNET as the subnet defined in appSubnetResourceId. Must not overlap with the IP range defined in platformReservedCidr, if defined. */
  appSubnetResourceId?: string;
  /** CIDR notation IP range assigned to the Docker bridge network. It must not overlap with any Subnet IP ranges or the IP range defined in platformReservedCidr, if defined. */
  dockerBridgeCidr?: string;
}

/** ARM resource for a KubeEnvironment when patching */
export interface KubeEnvironmentPatchResourceOutput extends ProxyOnlyResourceOutput {
  /** KubeEnvironmentPatchResource resource specific properties */
  properties?: KubeEnvironmentPatchResourcePropertiesOutput;
}

/** KubeEnvironmentPatchResource resource specific properties */
export interface KubeEnvironmentPatchResourcePropertiesOutput {
  /** Provisioning state of the Kubernetes Environment. */
  readonly provisioningState?:
    | "Succeeded"
    | "Failed"
    | "Canceled"
    | "Waiting"
    | "InitializationInProgress"
    | "InfrastructureSetupInProgress"
    | "InfrastructureSetupComplete"
    | "ScheduledForDelete"
    | "UpgradeRequested"
    | "UpgradeFailed";
  /** Any errors that occurred during deployment or deployment validation */
  readonly deploymentErrors?: string;
  /** Only visible within Vnet/Subnet */
  internalLoadBalancerEnabled?: boolean;
  /** Default Domain Name for the cluster */
  readonly defaultDomain?: string;
  /** Static IP of the KubeEnvironment */
  staticIp?: string;
  /**
   * Cluster configuration which determines the ARC cluster
   * components types. Eg: Choosing between BuildService kind,
   * FrontEnd Service ArtifactsStorageType etc.
   */
  arcConfiguration?: ArcConfigurationOutput;
  /**
   * Cluster configuration which enables the log daemon to export
   * app logs to a destination. Currently only "log-analytics" is
   * supported
   */
  appLogsConfiguration?: AppLogsConfigurationOutput;
  /** Cluster configuration for Container Apps Environments to configure Dapr Instrumentation Key and VNET Configuration */
  containerAppsConfiguration?: ContainerAppsConfigurationOutput;
  aksResourceID?: string;
}

/** Collection of Application Stacks */
export interface ApplicationStackCollectionOutput {
  /** Collection of resources. */
  value: Array<ApplicationStackResourceOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** ARM resource for a ApplicationStack. */
export interface ApplicationStackResourceOutput extends ProxyOnlyResourceOutput {
  /** Core resource properties */
  properties?: ApplicationStackOutput;
}

/** Application stack. */
export interface ApplicationStackOutput {
  /** Application stack name. */
  name?: string;
  /** Application stack display name. */
  display?: string;
  /** Application stack dependency. */
  dependency?: string;
  /** List of major versions available. */
  majorVersions?: Array<StackMajorVersionOutput>;
  /** List of frameworks associated with application stack. */
  frameworks?: Array<ApplicationStackOutput>;
  /** <code>true</code> if this is the stack is deprecated; otherwise, <code>false</code>. */
  isDeprecated?: Array<ApplicationStackOutput>;
}

/** Application stack major version. */
export interface StackMajorVersionOutput {
  /** Application stack major version (display only). */
  displayVersion?: string;
  /** Application stack major version (runtime only). */
  runtimeVersion?: string;
  /** <code>true</code> if this is the default major version; otherwise, <code>false</code>. */
  isDefault?: boolean;
  /** Minor versions associated with the major version. */
  minorVersions?: Array<StackMinorVersionOutput>;
  /** <code>true</code> if this supports Application Insights; otherwise, <code>false</code>. */
  applicationInsights?: boolean;
  /** <code>true</code> if this stack is in Preview, otherwise <code>false</code>. */
  isPreview?: boolean;
  /** <code>true</code> if this stack has been deprecated, otherwise <code>false</code>. */
  isDeprecated?: boolean;
  /** <code>true</code> if this stack should be hidden for new customers on portal, otherwise <code>false</code>. */
  isHidden?: boolean;
  /**
   * <appSettings>
   *  <appSetting name="FUNCTIONS_WORKER_RUNTIME" value="dotnet" />
   * </appSettings>
   *  Example: All the function apps need AppSetting: "FUNCTIONS_WORKER_RUNTIME" to be set stack name
   */
  appSettingsDictionary?: Record<string, Record<string, unknown>>;
  /**
   * <siteConfigProperties>
   *  <siteConfigProperty name="Use32BitWorkerProcess" value="false" />
   * </siteConfigProperties>
   *  Example: All Linux Function Apps, need Use32BitWorkerProcess to be set to 0
   */
  siteConfigPropertiesDictionary?: Record<string, Record<string, unknown>>;
}

/** Application stack minor version. */
export interface StackMinorVersionOutput {
  /** Application stack minor version (display only). */
  displayVersion?: string;
  /** Application stack minor version (runtime only). */
  runtimeVersion?: string;
  /** <code>true</code> if this is the default minor version; otherwise, <code>false</code>. */
  isDefault?: boolean;
  /** <code>true</code> if this supports Remote Debugging, otherwise <code>false</code>. */
  isRemoteDebuggingEnabled?: boolean;
}

/** Collection of Function app Stacks */
export interface FunctionAppStackCollectionOutput {
  /** Collection of resources. */
  value: Array<FunctionAppStackOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** Function App Stack. */
export interface FunctionAppStackOutput extends ProxyOnlyResourceOutput {
  /** Function App stack location. */
  readonly location?: string;
  /** FunctionAppStack resource specific properties */
  properties?: FunctionAppStackPropertiesOutput;
}

/** FunctionAppStack resource specific properties */
export interface FunctionAppStackPropertiesOutput {
  /** Function App stack (display only). */
  readonly displayText?: string;
  /** Function App stack name. */
  readonly value?: string;
  /** List of major versions available. */
  readonly majorVersions?: Array<FunctionAppMajorVersionOutput>;
  /** Function App stack preferred OS. */
  readonly preferredOs?: "Windows" | "Linux";
}

/** Function App stack major version. */
export interface FunctionAppMajorVersionOutput {
  /** Function App stack major version (display only). */
  readonly displayText?: string;
  /** Function App stack major version name. */
  readonly value?: string;
  /** Minor versions associated with the major version. */
  readonly minorVersions?: Array<FunctionAppMinorVersionOutput>;
}

/** Function App stack minor version. */
export interface FunctionAppMinorVersionOutput {
  /** Function App stack (display only). */
  readonly displayText?: string;
  /** Function App stack name. */
  readonly value?: string;
  /** Settings associated with the minor version. */
  readonly stackSettings?: FunctionAppRuntimesOutput;
}

/** Function App stack runtimes. */
export interface FunctionAppRuntimesOutput {
  /** Linux-specific settings associated with the minor version. */
  readonly linuxRuntimeSettings?: FunctionAppRuntimeSettingsOutput;
  /** Windows-specific settings associated with the minor version. */
  readonly windowsRuntimeSettings?: FunctionAppRuntimeSettingsOutput;
}

/** Function App runtime settings. */
export interface FunctionAppRuntimeSettingsOutput {
  /** Function App stack minor version (runtime only). */
  readonly runtimeVersion?: string;
  /** <code>true</code> if remote debugging is supported for the stack; otherwise, <code>false</code>. */
  readonly remoteDebuggingSupported?: boolean;
  /** Application Insights settings associated with the minor version. */
  readonly appInsightsSettings?: AppInsightsWebAppStackSettingsOutput;
  /** GitHub Actions settings associated with the minor version. */
  readonly gitHubActionSettings?: GitHubActionWebAppStackSettingsOutput;
  /** Application settings associated with the minor version. */
  readonly appSettingsDictionary?: Record<string, string>;
  /** Configuration settings associated with the minor version. */
  readonly siteConfigPropertiesDictionary?: SiteConfigPropertiesDictionaryOutput;
  /** List of supported Functions extension versions. */
  readonly supportedFunctionsExtensionVersions?: Array<string>;
  /** <code>true</code> if the stack is in preview; otherwise, <code>false</code>. */
  readonly isPreview?: boolean;
  /** <code>true</code> if the stack is deprecated; otherwise, <code>false</code>. */
  readonly isDeprecated?: boolean;
  /** <code>true</code> if the stack should be hidden; otherwise, <code>false</code>. */
  readonly isHidden?: boolean;
  /** End-of-life date for the minor version. */
  readonly endOfLifeDate?: string;
  /** <code>true</code> if the stack version is auto-updated; otherwise, <code>false</code>. */
  readonly isAutoUpdate?: boolean;
  /** <code>true</code> if the minor version is early-access; otherwise, <code>false</code>. */
  readonly isEarlyAccess?: boolean;
  /** <code>true</code> if the minor version the default; otherwise, <code>false</code>. */
  readonly isDefault?: boolean;
}

/** App Insights Web App stack settings. */
export interface AppInsightsWebAppStackSettingsOutput {
  /** <code>true</code> if remote Application Insights is supported for the stack; otherwise, <code>false</code>. */
  readonly isSupported?: boolean;
  /** <code>true</code> if Application Insights is disabled by default for the stack; otherwise, <code>false</code>. */
  readonly isDefaultOff?: boolean;
}

/** GitHub Actions Web App stack settings. */
export interface GitHubActionWebAppStackSettingsOutput {
  /** <code>true</code> if GitHub Actions is supported for the stack; otherwise, <code>false</code>. */
  readonly isSupported?: boolean;
  /** The minor version that is supported for GitHub Actions. */
  readonly supportedVersion?: string;
}

/** Site config properties dictionary. */
export interface SiteConfigPropertiesDictionaryOutput {
  /** <code>true</code> if use32BitWorkerProcess should be set to true for the stack; otherwise, <code>false</code>. */
  readonly use32BitWorkerProcess?: boolean;
  /** LinuxFxVersion configuration setting. */
  readonly linuxFxVersion?: string;
  /** JavaVersion configuration setting. */
  readonly javaVersion?: string;
  /** PowerShellVersion configuration setting. */
  readonly powerShellVersion?: string;
}

/** Collection of Web app Stacks */
export interface WebAppStackCollectionOutput {
  /** Collection of resources. */
  value: Array<WebAppStackOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** Web App stack. */
export interface WebAppStackOutput extends ProxyOnlyResourceOutput {
  /** Web App stack location. */
  readonly location?: string;
  /** WebAppStack resource specific properties */
  properties?: WebAppStackPropertiesOutput;
}

/** WebAppStack resource specific properties */
export interface WebAppStackPropertiesOutput {
  /** Web App stack (display only). */
  readonly displayText?: string;
  /** Web App stack name. */
  readonly value?: string;
  /** List of major versions available. */
  readonly majorVersions?: Array<WebAppMajorVersionOutput>;
  /** Web App stack preferred OS. */
  readonly preferredOs?: "Windows" | "Linux";
}

/** Web App stack major version. */
export interface WebAppMajorVersionOutput {
  /** Web App stack major version (display only). */
  readonly displayText?: string;
  /** Web App stack major version name. */
  readonly value?: string;
  /** Minor versions associated with the major version. */
  readonly minorVersions?: Array<WebAppMinorVersionOutput>;
}

/** Web App stack minor version. */
export interface WebAppMinorVersionOutput {
  /** Web App stack minor version (display only). */
  readonly displayText?: string;
  /** Web App stack major version name. */
  readonly value?: string;
  /** Settings associated with the minor version. */
  readonly stackSettings?: WebAppRuntimesOutput;
}

/** Web App stack runtimes. */
export interface WebAppRuntimesOutput {
  /** Linux-specific settings associated with the minor version. */
  readonly linuxRuntimeSettings?: WebAppRuntimeSettingsOutput;
  /** Windows-specific settings associated with the minor version. */
  readonly windowsRuntimeSettings?: WebAppRuntimeSettingsOutput;
  /** Linux-specific settings associated with the Java container minor version. */
  readonly linuxContainerSettings?: LinuxJavaContainerSettingsOutput;
  /** Windows-specific settings associated with the Java container minor version. */
  readonly windowsContainerSettings?: WindowsJavaContainerSettingsOutput;
}

/** Web App runtime settings. */
export interface WebAppRuntimeSettingsOutput {
  /** Web App stack minor version (runtime only). */
  readonly runtimeVersion?: string;
  /** <code>true</code> if remote debugging is supported for the stack; otherwise, <code>false</code>. */
  readonly remoteDebuggingSupported?: boolean;
  /** Application Insights settings associated with the minor version. */
  readonly appInsightsSettings?: AppInsightsWebAppStackSettingsOutput;
  /** GitHub Actions settings associated with the minor version. */
  readonly gitHubActionSettings?: GitHubActionWebAppStackSettingsOutput;
  /** <code>true</code> if the stack is in preview; otherwise, <code>false</code>. */
  readonly isPreview?: boolean;
  /** <code>true</code> if the stack is deprecated; otherwise, <code>false</code>. */
  readonly isDeprecated?: boolean;
  /** <code>true</code> if the stack should be hidden; otherwise, <code>false</code>. */
  readonly isHidden?: boolean;
  /** End-of-life date for the minor version. */
  readonly endOfLifeDate?: string;
  /** <code>true</code> if the stack version is auto-updated; otherwise, <code>false</code>. */
  readonly isAutoUpdate?: boolean;
  /** <code>true</code> if the minor version is early-access; otherwise, <code>false</code>. */
  readonly isEarlyAccess?: boolean;
}

/** Linux Java Container settings. */
export interface LinuxJavaContainerSettingsOutput {
  /** Java 11 version (runtime only). */
  readonly java11Runtime?: string;
  /** Java 8 version (runtime only). */
  readonly java8Runtime?: string;
  /** <code>true</code> if the stack is in preview; otherwise, <code>false</code>. */
  readonly isPreview?: boolean;
  /** <code>true</code> if the stack is deprecated; otherwise, <code>false</code>. */
  readonly isDeprecated?: boolean;
  /** <code>true</code> if the stack should be hidden; otherwise, <code>false</code>. */
  readonly isHidden?: boolean;
  /** End-of-life date for the minor version. */
  readonly endOfLifeDate?: string;
  /** <code>true</code> if the stack version is auto-updated; otherwise, <code>false</code>. */
  readonly isAutoUpdate?: boolean;
  /** <code>true</code> if the minor version is early-access; otherwise, <code>false</code>. */
  readonly isEarlyAccess?: boolean;
}

/** Windows Java Container settings. */
export interface WindowsJavaContainerSettingsOutput {
  /** Java container (runtime only). */
  readonly javaContainer?: string;
  /** Java container version (runtime only). */
  readonly javaContainerVersion?: string;
  /** <code>true</code> if the stack is in preview; otherwise, <code>false</code>. */
  readonly isPreview?: boolean;
  /** <code>true</code> if the stack is deprecated; otherwise, <code>false</code>. */
  readonly isDeprecated?: boolean;
  /** <code>true</code> if the stack should be hidden; otherwise, <code>false</code>. */
  readonly isHidden?: boolean;
  /** End-of-life date for the minor version. */
  readonly endOfLifeDate?: string;
  /** <code>true</code> if the stack version is auto-updated; otherwise, <code>false</code>. */
  readonly isAutoUpdate?: boolean;
  /** <code>true</code> if the minor version is early-access; otherwise, <code>false</code>. */
  readonly isEarlyAccess?: boolean;
}

/** Collection of recommendations. */
export interface RecommendationCollectionOutput {
  /** Collection of resources. */
  value: Array<RecommendationOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** Represents a recommendation result generated by the recommendation engine. */
export interface RecommendationOutput extends ProxyOnlyResourceOutput {
  /** Recommendation resource specific properties */
  properties?: RecommendationPropertiesOutput;
}

/** Recommendation resource specific properties */
export interface RecommendationPropertiesOutput {
  /** Timestamp when this instance was created. */
  creationTime?: string;
  /**
   * A GUID value that each recommendation object is associated with.
   *
   * Value may contain a UUID
   */
  recommendationId?: string;
  /** Full ARM resource ID string that this recommendation object is associated with. */
  resourceId?: string;
  /** Name of a resource type this recommendation applies, e.g. Subscription, ServerFarm, Site. */
  resourceScope?: "ServerFarm" | "Subscription" | "WebSite";
  /** Unique name of the rule. */
  ruleName?: string;
  /** UI friendly name of the rule (may not be unique). */
  displayName?: string;
  /** Recommendation text. */
  message?: string;
  /** Level indicating how critical this recommendation can impact. */
  level?: "Critical" | "Warning" | "Information" | "NonUrgentSuggestion";
  /** List of channels that this recommendation can apply. */
  channels?: "Notification" | "Api" | "Email" | "Webhook" | "All";
  /** The list of category tags that this recommendation belongs to. */
  readonly categoryTags?: Array<string>;
  /** Name of action recommended by this object. */
  actionName?: string;
  /** True if this recommendation is still valid (i.e. "actionable"). False if it is invalid. */
  enabled?: number;
  /** The list of states of this recommendation. If it's null then it should be considered "Active". */
  states?: Array<string>;
  /** The beginning time in UTC of a range that the recommendation refers to. */
  startTime?: string;
  /** The end time in UTC of a range that the recommendation refers to. */
  endTime?: string;
  /** When to notify this recommendation next in UTC. Null means that this will never be notified anymore. */
  nextNotificationTime?: string;
  /** Date and time in UTC when this notification expires. */
  notificationExpirationTime?: string;
  /** Last timestamp in UTC this instance was actually notified. Null means that this recommendation hasn't been notified yet. */
  notifiedTime?: string;
  /** A metric value measured by the rule. */
  score?: number;
  /** True if this is associated with a dynamically added rule */
  isDynamic?: boolean;
  /** Extension name of the portal if exists. */
  extensionName?: string;
  /** Deep link to a blade on the portal. */
  bladeName?: string;
  /** Forward link to an external document associated with the rule. */
  forwardLink?: string;
}

/** Represents a recommendation rule that the recommendation engine can perform. */
export interface RecommendationRuleOutput extends ProxyOnlyResourceOutput {
  /** RecommendationRule resource specific properties */
  properties?: RecommendationRulePropertiesOutput;
}

/** RecommendationRule resource specific properties */
export interface RecommendationRulePropertiesOutput {
  /** Unique name of the rule. */
  recommendationName?: string;
  /** UI friendly name of the rule. */
  displayName?: string;
  /** Localized name of the rule (Good for UI). */
  message?: string;
  /**
   * Recommendation ID of an associated recommendation object tied to the rule, if exists.
   * If such an object doesn't exist, it is set to null.
   *
   * Value may contain a UUID
   */
  recommendationId?: string;
  /** Localized detailed description of the rule. */
  description?: string;
  /** Name of action that is recommended by this rule in string. */
  actionName?: string;
  /** Level of impact indicating how critical this rule is. */
  level?: "Critical" | "Warning" | "Information" | "NonUrgentSuggestion";
  /** List of available channels that this rule applies. */
  channels?: "Notification" | "Api" | "Email" | "Webhook" | "All";
  /** The list of category tags that this recommendation rule belongs to. */
  readonly categoryTags?: Array<string>;
  /** True if this is associated with a dynamically added rule */
  isDynamic?: boolean;
  /** Extension name of the portal if exists. Applicable to dynamic rule only. */
  extensionName?: string;
  /** Deep link to a blade on the portal. Applicable to dynamic rule only. */
  bladeName?: string;
  /** Forward link to an external document associated with the rule. Applicable to dynamic rule only. */
  forwardLink?: string;
}

/** Collection of resource health metadata. */
export interface ResourceHealthMetadataCollectionOutput {
  /** Collection of resources. */
  value: Array<ResourceHealthMetadataOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** Used for getting ResourceHealthCheck settings. */
export interface ResourceHealthMetadataOutput extends ProxyOnlyResourceOutput {
  /** ResourceHealthMetadata resource specific properties */
  properties?: ResourceHealthMetadataPropertiesOutput;
}

/** ResourceHealthMetadata resource specific properties */
export interface ResourceHealthMetadataPropertiesOutput {
  /** The category that the resource matches in the RHC Policy File */
  category?: string;
  /** Is there a health signal for the resource */
  signalAvailability?: boolean;
}

/** User credentials used for publishing activity. */
export interface UserOutput extends ProxyOnlyResourceOutput {
  /** User resource specific properties */
  properties?: UserPropertiesOutput;
}

/** User resource specific properties */
export interface UserPropertiesOutput {
  /** Username used for publishing. */
  publishingUserName: string;
  /**
   * Password used for publishing.
   *
   * Value may contain a password
   */
  publishingPassword?: string;
  /**
   * Password hash used for publishing.
   *
   * Value may contain a password
   */
  publishingPasswordHash?: string;
  /**
   * Password hash salt used for publishing.
   *
   * Value may contain a password
   */
  publishingPasswordHashSalt?: string;
  /** Url of SCM site. */
  scmUri?: string;
}

/** Collection of source controls. */
export interface SourceControlCollectionOutput {
  /** Collection of resources. */
  value: Array<SourceControlOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** The source control OAuth token. */
export interface SourceControlOutput extends ProxyOnlyResourceOutput {
  /** SourceControl resource specific properties */
  properties?: SourceControlPropertiesOutput;
}

/** SourceControl resource specific properties */
export interface SourceControlPropertiesOutput {
  /** OAuth access token. */
  token?: string;
  /** OAuth access token secret. */
  tokenSecret?: string;
  /** OAuth refresh token. */
  refreshToken?: string;
  /** OAuth token expiration. */
  expirationTime?: string;
}

/** Collection of Billing Meters */
export interface BillingMeterCollectionOutput {
  /** Collection of resources. */
  value: Array<BillingMeterOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** App Service billing entity that contains information about meter which the Azure billing system utilizes to charge users for services. */
export interface BillingMeterOutput extends ProxyOnlyResourceOutput {
  /** BillingMeter resource specific properties */
  properties?: BillingMeterPropertiesOutput;
}

/** BillingMeter resource specific properties */
export interface BillingMeterPropertiesOutput {
  /** Meter GUID onboarded in Commerce */
  meterId?: string;
  /** Azure Location of billable resource */
  billingLocation?: string;
  /** Short Name from App Service Azure pricing Page */
  shortName?: string;
  /** Friendly name of the meter */
  friendlyName?: string;
  /** App Service ResourceType meter used for */
  resourceType?: string;
  /** App Service OS type meter used for */
  osType?: string;
  /** Meter Multiplier */
  multiplier?: number;
}

/** Information regarding availability of a resource name. */
export interface ResourceNameAvailabilityOutput {
  /** <code>true</code> indicates name is valid and available. <code>false</code> indicates the name is invalid, unavailable, or both. */
  nameAvailable?: boolean;
  /** <code>Invalid</code> indicates the name provided does not match Azure App Service naming requirements. <code>AlreadyExists</code> indicates that the name is already in use and is therefore unavailable. */
  reason?: "Invalid" | "AlreadyExists";
  /** If reason == invalid, provide the user with the reason why the given name is invalid, and provide the resource naming requirements so that the user can select a valid name. If reason == AlreadyExists, explain that resource name is already in use, and direct them to select a different name. */
  message?: string;
}

/** Collection of custom hostname sites */
export interface CustomHostnameSitesCollectionOutput {
  /** Collection of resources. */
  value: Array<CustomHostnameSitesOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** A hostname and its assigned sites */
export interface CustomHostnameSitesOutput extends ProxyOnlyResourceOutput {
  /** CustomHostnameSites resource specific properties */
  properties?: CustomHostnameSitesPropertiesOutput;
}

/** CustomHostnameSites resource specific properties */
export interface CustomHostnameSitesPropertiesOutput {
  customHostname?: string;
  region?: string;
  siteResourceIds?: Array<IdentifierOutput>;
}

/** A domain specific resource identifier. */
export interface IdentifierOutput extends ProxyOnlyResourceOutput {
  /** Identifier resource specific properties */
  properties?: IdentifierPropertiesOutput;
}

/** Identifier resource specific properties */
export interface IdentifierPropertiesOutput {
  /** String representation of the identity. */
  id?: string;
}

/**
 * List of available locations (regions or App Service Environments) for
 * deployment of App Service resources.
 */
export interface DeploymentLocationsOutput {
  /** Available regions. */
  locations?: Array<GeoRegionOutput>;
  /** Available App Service Environments with full descriptions of the environments. */
  hostingEnvironments?: Array<AppServiceEnvironmentOutput>;
  /** Available App Service Environments with basic information. */
  hostingEnvironmentDeploymentInfos?: Array<HostingEnvironmentDeploymentInfoOutput>;
}

/** Geographical region. */
export interface GeoRegionOutput extends ProxyOnlyResourceOutput {
  /** GeoRegion resource specific properties */
  properties?: GeoRegionPropertiesOutput;
}

/** GeoRegion resource specific properties */
export interface GeoRegionPropertiesOutput {
  /** Region description. */
  readonly description?: string;
  /** Display name for region. */
  readonly displayName?: string;
  /** Display name for region. */
  readonly orgDomain?: string;
}

/** Information needed to create resources on an App Service Environment. */
export interface HostingEnvironmentDeploymentInfoOutput {
  /** Name of the App Service Environment. */
  name?: string;
  /** Location of the App Service Environment. */
  location?: string;
}

/** Collection of geographical regions. */
export interface GeoRegionCollectionOutput {
  /** Collection of resources. */
  value: Array<GeoRegionOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** Collection of identifiers. */
export interface IdentifierCollectionOutput {
  /** Collection of resources. */
  value: Array<IdentifierOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** Collection of premier add-on offers. */
export interface PremierAddOnOfferCollectionOutput {
  /** Collection of resources. */
  value: Array<PremierAddOnOfferOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** Premier add-on offer. */
export interface PremierAddOnOfferOutput extends ProxyOnlyResourceOutput {
  /** PremierAddOnOffer resource specific properties */
  properties?: PremierAddOnOfferPropertiesOutput;
}

/** PremierAddOnOffer resource specific properties */
export interface PremierAddOnOfferPropertiesOutput {
  /** Premier add on SKU. */
  sku?: string;
  /** Premier add on offer Product. */
  product?: string;
  /** Premier add on offer Vendor. */
  vendor?: string;
  /** <code>true</code> if promotion code is required; otherwise, <code>false</code>. */
  promoCodeRequired?: boolean;
  /** Premier add on offer Quota. */
  quota?: number;
  /** App Service plans this offer is restricted to. */
  webHostingPlanRestrictions?: "None" | "Free" | "Shared" | "Basic" | "Standard" | "Premium";
  /** Privacy policy URL. */
  privacyPolicyUrl?: string;
  /** Legal terms URL. */
  legalTermsUrl?: string;
  /** Marketplace publisher. */
  marketplacePublisher?: string;
  /** Marketplace offer. */
  marketplaceOffer?: string;
}

/** Collection of SKU information. */
export interface SkuInfosOutput {
  /** Resource type that this SKU applies to. */
  resourceType?: string;
  /** List of SKUs the subscription is able to use. */
  skus?: Array<GlobalCsmSkuDescriptionOutput>;
}

/** A Global SKU Description. */
export interface GlobalCsmSkuDescriptionOutput {
  /** Name of the resource SKU. */
  name?: string;
  /** Service Tier of the resource SKU. */
  tier?: string;
  /** Size specifier of the resource SKU. */
  size?: string;
  /** Family code of the resource SKU. */
  family?: string;
  /** Min, max, and default scale values of the SKU. */
  capacity?: SkuCapacityOutput;
  /** Locations of the SKU. */
  locations?: Array<string>;
  /** Capabilities of the SKU, e.g., is traffic manager enabled? */
  capabilities?: Array<CapabilityOutput>;
}

/** The required set of inputs to validate a VNET */
export interface VnetParametersOutput extends ProxyOnlyResourceOutput {
  /** VnetParameters resource specific properties */
  properties?: VnetParametersPropertiesOutput;
}

/** VnetParameters resource specific properties */
export interface VnetParametersPropertiesOutput {
  /** The Resource Group of the VNET to be validated */
  vnetResourceGroup?: string;
  /** The name of the VNET to be validated */
  vnetName?: string;
  /** The subnet name to be validated */
  vnetSubnetName?: string;
  /** The ARM Resource ID of the subnet to validate */
  subnetResourceId?: string;
}

/** A class that describes the reason for a validation failure. */
export interface VnetValidationFailureDetailsOutput extends ProxyOnlyResourceOutput {
  /** VnetValidationFailureDetails resource specific properties */
  properties?: VnetValidationFailureDetailsPropertiesOutput;
}

/** VnetValidationFailureDetails resource specific properties */
export interface VnetValidationFailureDetailsPropertiesOutput {
  /** Text describing the validation outcome. */
  message?: string;
  /** A flag describing whether or not validation failed. */
  failed?: boolean;
  /** A list of tests that failed in the validation. */
  failedTests?: Array<VnetValidationTestFailureOutput>;
  /** A list of warnings generated during validation. */
  warnings?: Array<VnetValidationTestFailureOutput>;
}

/** A class that describes a test that failed during NSG and UDR validation. */
export interface VnetValidationTestFailureOutput extends ProxyOnlyResourceOutput {
  /** VnetValidationTestFailure resource specific properties */
  properties?: VnetValidationTestFailurePropertiesOutput;
}

/** VnetValidationTestFailure resource specific properties */
export interface VnetValidationTestFailurePropertiesOutput {
  /** The name of the test that failed. */
  testName?: string;
  /** The details of what caused the failure, e.g. the blocking rule name, etc. */
  details?: string;
}

/** Describes the result of resource validation. */
export interface ValidateResponseOutput {
  /** Result of validation. */
  status?: string;
  /** Error details for the case when validation fails. */
  error?: ValidateResponseErrorOutput;
}

/** Error details for when validation fails. */
export interface ValidateResponseErrorOutput {
  /** Validation error code. */
  code?: string;
  /** Validation error message. */
  message?: string;
}

/** Request entity for previewing the Static Site workflow */
export interface StaticSitesWorkflowPreviewRequestOutput extends ProxyOnlyResourceOutput {
  /** StaticSitesWorkflowPreviewRequest resource specific properties */
  properties?: StaticSitesWorkflowPreviewRequestPropertiesOutput;
}

/** StaticSitesWorkflowPreviewRequest resource specific properties */
export interface StaticSitesWorkflowPreviewRequestPropertiesOutput {
  /** URL for the repository of the static site. */
  repositoryUrl?: string;
  /** The target branch in the repository. */
  branch?: string;
  /** Build properties to configure on the repository. */
  buildProperties?: StaticSiteBuildPropertiesOutput;
}

/** Build properties for the static site. */
export interface StaticSiteBuildPropertiesOutput {
  /** The path to the app code within the repository. */
  appLocation?: string;
  /** The path to the api code within the repository. */
  apiLocation?: string;
  /** Deprecated: The path of the app artifacts after building (deprecated in favor of OutputLocation) */
  appArtifactLocation?: string;
  /** The output path of the app after building. */
  outputLocation?: string;
  /** A custom command to run during deployment of the static content application. */
  appBuildCommand?: string;
  /** A custom command to run during deployment of the Azure Functions API application. */
  apiBuildCommand?: string;
  /** Skip Github Action workflow generation. */
  skipGithubActionWorkflowGeneration?: boolean;
  /** Github Action secret name override. */
  githubActionSecretNameOverride?: string;
}

/** Preview for the Static Site Workflow to be generated */
export interface StaticSitesWorkflowPreviewOutput extends ProxyOnlyResourceOutput {
  /** StaticSitesWorkflowPreview resource specific properties */
  properties?: StaticSitesWorkflowPreviewPropertiesOutput;
}

/** StaticSitesWorkflowPreview resource specific properties */
export interface StaticSitesWorkflowPreviewPropertiesOutput {
  /** The path for the workflow file to be generated */
  readonly path?: string;
  /** The contents for the workflow file to be generated */
  readonly contents?: string;
}

/** Collection of static sites. */
export interface StaticSiteCollectionOutput {
  /** Collection of resources. */
  value: Array<StaticSiteARMResourceOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** Static Site ARM resource. */
export interface StaticSiteARMResourceOutput extends ResourceOutput {
  /** Core resource properties */
  properties?: StaticSiteOutput;
  /** Description of a SKU for a scalable resource. */
  sku?: SkuDescriptionOutput;
  /** Managed service identity. */
  identity?: ManagedServiceIdentityOutput;
}

/** A static site. */
export interface StaticSiteOutput {
  /** The default autogenerated hostname for the static site. */
  readonly defaultHostname?: string;
  /** URL for the repository of the static site. */
  repositoryUrl?: string;
  /** The target branch in the repository. */
  branch?: string;
  /** The custom domains associated with this static site. */
  readonly customDomains?: Array<string>;
  /** A user's github repository token. This is used to setup the Github Actions workflow file and API secrets. */
  repositoryToken?: string;
  /** Build properties to configure on the repository. */
  buildProperties?: StaticSiteBuildPropertiesOutput;
  /** Private endpoint connections */
  readonly privateEndpointConnections?: Array<ResponseMessageEnvelopeRemotePrivateEndpointConnectionOutput>;
  /** State indicating whether staging environments are allowed or not allowed for a static web app. */
  stagingEnvironmentPolicy?: "Enabled" | "Disabled";
  /** <code>false</code> if config file is locked for this static web app; otherwise, <code>true</code>. */
  allowConfigFileUpdates?: boolean;
  /** Template options for generating a new repository. */
  templateProperties?: StaticSiteTemplateOptionsOutput;
  /** The content distribution endpoint for the static site. */
  readonly contentDistributionEndpoint?: string;
  /** Identity to use for Key Vault Reference authentication. */
  readonly keyVaultReferenceIdentity?: string;
  /** User provided function apps registered with the static site */
  readonly userProvidedFunctionApps?: Array<StaticSiteUserProvidedFunctionAppOutput>;
  /** The provider that submitted the last deployment to the primary environment of the static site. */
  provider?: string;
  /** State indicating the status of the enterprise grade CDN serving traffic to the static web app. */
  enterpriseGradeCdnStatus?: "Enabled" | "Enabling" | "Disabled" | "Disabling";
}

/** Message envelope that contains the common Azure resource manager properties and the resource provider specific content. */
export interface ResponseMessageEnvelopeRemotePrivateEndpointConnectionOutput {
  /**
   * Resource Id. Typically ID is populated only for responses to GET requests. Caller is responsible for passing in this
   * value for GET requests only.
   * For example: /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupId}/providers/Microsoft.Web/sites/{sitename}
   */
  id?: string;
  /** Name of resource. */
  name?: string;
  /** Type of resource e.g "Microsoft.Web/sites". */
  type?: string;
  /** Geographical region resource belongs to e.g. SouthCentralUS, SouthEastAsia. */
  location?: string;
  /** Tags associated with resource. */
  tags?: Record<string, string>;
  /** Azure resource manager plan. */
  plan?: ArmPlanOutput;
  /** Resource specific properties. */
  properties?: RemotePrivateEndpointConnectionOutput;
  /** SKU description of the resource. */
  sku?: SkuDescriptionOutput;
  /** Azure-AsyncOperation Status info. */
  status?: string;
  /** Azure-AsyncOperation Error info. */
  error?: ErrorEntityOutput;
  /** MSI resource */
  identity?: ManagedServiceIdentityOutput;
  /** Logical Availability Zones the service is hosted in */
  zones?: Array<string>;
}

/** The plan object in Azure Resource Manager, represents a marketplace plan. */
export interface ArmPlanOutput {
  /** The name. */
  name?: string;
  /** The publisher. */
  publisher?: string;
  /** The product. */
  product?: string;
  /** The promotion code. */
  promotionCode?: string;
  /** Version of product. */
  version?: string;
}

/** A remote private endpoint connection */
export interface RemotePrivateEndpointConnectionOutput extends ProxyOnlyResourceOutput {
  /** RemotePrivateEndpointConnection resource specific properties */
  properties?: RemotePrivateEndpointConnectionPropertiesOutput;
}

/** RemotePrivateEndpointConnection resource specific properties */
export interface RemotePrivateEndpointConnectionPropertiesOutput {
  readonly provisioningState?: string;
  /** PrivateEndpoint of a remote private endpoint connection */
  privateEndpoint?: ArmIdWrapperOutput;
  /** The state of a private link connection */
  privateLinkServiceConnectionState?: PrivateLinkConnectionStateOutput;
  /** Private IPAddresses mapped to the remote private endpoint */
  ipAddresses?: Array<string>;
}

/** Template Options for the static site. */
export interface StaticSiteTemplateOptionsOutput {
  /** URL of the template repository. The newly generated repository will be based on this one. */
  templateRepositoryUrl?: string;
  /** Owner of the newly generated repository. */
  owner?: string;
  /** Name of the newly generated repository. */
  repositoryName?: string;
  /** Description of the newly generated repository. */
  description?: string;
  /** Whether or not the newly generated repository is a private repository. Defaults to false (i.e. public). */
  isPrivate?: boolean;
}

/** A static site user provided function. */
export interface StaticSiteUserProvidedFunctionAppOutput extends ProxyOnlyResourceOutput {
  /** StaticSiteUserProvidedFunctionApp resource specific properties */
  properties?: StaticSiteUserProvidedFunctionAppPropertiesOutput;
}

/** StaticSiteUserProvidedFunctionApp resource specific properties */
export interface StaticSiteUserProvidedFunctionAppPropertiesOutput {
  /** The resource id of the function app registered with the static site */
  functionAppResourceId?: string;
  /** The region of the function app registered with the static site */
  functionAppRegion?: string;
  /** The date and time on which the function app was registered with the static site. */
  readonly createdOn?: string;
}

/** ARM resource for a static site when patching */
export interface StaticSitePatchResourceOutput extends ProxyOnlyResourceOutput {
  /** Core resource properties */
  properties?: StaticSiteOutput;
}

/** Collection of static site custom users. */
export interface StaticSiteUserCollectionOutput {
  /** Collection of resources. */
  value: Array<StaticSiteUserARMResourceOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** Static Site User ARM resource. */
export interface StaticSiteUserARMResourceOutput extends ProxyOnlyResourceOutput {
  /** StaticSiteUserARMResource resource specific properties */
  properties?: StaticSiteUserARMResourcePropertiesOutput;
}

/** StaticSiteUserARMResource resource specific properties */
export interface StaticSiteUserARMResourcePropertiesOutput {
  /** The identity provider for the static site user. */
  readonly provider?: string;
  /** The user id for the static site user. */
  readonly userId?: string;
  /** The display name for the static site user. */
  readonly displayName?: string;
  /** The roles for the static site user, in free-form string format */
  roles?: string;
}

/** Collection of static site builds. */
export interface StaticSiteBuildCollectionOutput {
  /** Collection of resources. */
  value: Array<StaticSiteBuildARMResourceOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** Static Site Build ARM resource. */
export interface StaticSiteBuildARMResourceOutput extends ProxyOnlyResourceOutput {
  /** StaticSiteBuildARMResource resource specific properties */
  properties?: StaticSiteBuildARMResourcePropertiesOutput;
}

/** StaticSiteBuildARMResource resource specific properties */
export interface StaticSiteBuildARMResourcePropertiesOutput {
  /** An identifier for the static site build. */
  readonly buildId?: string;
  /** The source branch. */
  readonly sourceBranch?: string;
  /** The title of a pull request that a static site build is related to. */
  readonly pullRequestTitle?: string;
  /** The hostname for a static site build. */
  readonly hostname?: string;
  /** When this build was created. */
  readonly createdTimeUtc?: string;
  /** When this build was updated. */
  readonly lastUpdatedOn?: string;
  /** The status of the static site build. */
  readonly status?:
    | "WaitingForDeployment"
    | "Uploading"
    | "Deploying"
    | "Ready"
    | "Failed"
    | "Deleting"
    | "Detached";
  /** User provided function apps registered with the static site build */
  readonly userProvidedFunctionApps?: Array<StaticSiteUserProvidedFunctionAppOutput>;
}

/** String dictionary resource. */
export interface StringDictionaryOutput extends ProxyOnlyResourceOutput {
  /** Settings. */
  properties?: Record<string, string>;
}

/** Collection of static site functions. */
export interface StaticSiteFunctionOverviewCollectionOutput {
  /** Collection of resources. */
  value: Array<StaticSiteFunctionOverviewARMResourceOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** Static Site Function Overview ARM resource. */
export interface StaticSiteFunctionOverviewARMResourceOutput extends ProxyOnlyResourceOutput {
  /** StaticSiteFunctionOverviewARMResource resource specific properties */
  properties?: StaticSiteFunctionOverviewARMResourcePropertiesOutput;
}

/** StaticSiteFunctionOverviewARMResource resource specific properties */
export interface StaticSiteFunctionOverviewARMResourcePropertiesOutput {
  /** The name for the function */
  readonly functionName?: string;
  /** The trigger type of the function */
  readonly triggerType?: "HttpTrigger" | "Unknown";
}

/** Collection of static site user provided function apps. */
export interface StaticSiteUserProvidedFunctionAppsCollectionOutput {
  /** Collection of resources. */
  value: Array<StaticSiteUserProvidedFunctionAppARMResourceOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** Static Site User Provided Function App ARM resource. */
export interface StaticSiteUserProvidedFunctionAppARMResourceOutput extends ProxyOnlyResourceOutput {
  /** StaticSiteUserProvidedFunctionAppARMResource resource specific properties */
  properties?: StaticSiteUserProvidedFunctionAppARMResourcePropertiesOutput;
}

/** StaticSiteUserProvidedFunctionAppARMResource resource specific properties */
export interface StaticSiteUserProvidedFunctionAppARMResourcePropertiesOutput {
  /** The resource id of the function app registered with the static site */
  functionAppResourceId?: string;
  /** The region of the function app registered with the static site */
  functionAppRegion?: string;
  /** The date and time on which the function app was registered with the static site. */
  readonly createdOn?: string;
}

/** Static site zip deployment ARM resource. */
export interface StaticSiteZipDeploymentARMResourceOutput extends ProxyOnlyResourceOutput {
  /** Core resource properties */
  properties?: StaticSiteZipDeploymentOutput;
}

/** A static site zip deployment. */
export interface StaticSiteZipDeploymentOutput {
  /** URL for the zipped app content */
  appZipUrl?: string;
  /** URL for the zipped api content */
  apiZipUrl?: string;
  /** A title to label the deployment */
  deploymentTitle?: string;
  /** The provider submitting this deployment */
  provider?: string;
  /** The language of the api content, if it exists */
  functionLanguage?: string;
}

/** Static sites user roles invitation resource. */
export interface StaticSiteUserInvitationRequestResourceOutput extends ProxyOnlyResourceOutput {
  /** StaticSiteUserInvitationRequestResource resource specific properties */
  properties?: StaticSiteUserInvitationRequestResourcePropertiesOutput;
}

/** StaticSiteUserInvitationRequestResource resource specific properties */
export interface StaticSiteUserInvitationRequestResourcePropertiesOutput {
  /** The domain name for the static site custom domain. */
  domain?: string;
  /** The identity provider for the static site user. */
  provider?: string;
  /** The user id for the static site user. */
  userDetails?: string;
  /** The roles for the static site user, in free-form string format */
  roles?: string;
  /** The number of hours the sas token stays valid */
  numHoursToExpiration?: number;
}

/** Static sites user roles invitation link resource. */
export interface StaticSiteUserInvitationResponseResourceOutput extends ProxyOnlyResourceOutput {
  /** StaticSiteUserInvitationResponseResource resource specific properties */
  properties?: StaticSiteUserInvitationResponseResourcePropertiesOutput;
}

/** StaticSiteUserInvitationResponseResource resource specific properties */
export interface StaticSiteUserInvitationResponseResourcePropertiesOutput {
  /** The expiration time of the invitation */
  readonly expiresOn?: string;
  /** The url for the invitation link */
  readonly invitationUrl?: string;
}

/** Collection of static site custom domains. */
export interface StaticSiteCustomDomainOverviewCollectionOutput {
  /** Collection of resources. */
  value: Array<StaticSiteCustomDomainOverviewARMResourceOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** Static Site Custom Domain Overview ARM resource. */
export interface StaticSiteCustomDomainOverviewARMResourceOutput extends ProxyOnlyResourceOutput {
  /** StaticSiteCustomDomainOverviewARMResource resource specific properties */
  properties?: StaticSiteCustomDomainOverviewARMResourcePropertiesOutput;
}

/** StaticSiteCustomDomainOverviewARMResource resource specific properties */
export interface StaticSiteCustomDomainOverviewARMResourcePropertiesOutput {
  /** The domain name for the static site custom domain. */
  readonly domainName?: string;
  /** The date and time on which the custom domain was created for the static site. */
  readonly createdOn?: string;
  /** The status of the custom domain */
  readonly status?:
    | "RetrievingValidationToken"
    | "Validating"
    | "Adding"
    | "Ready"
    | "Failed"
    | "Deleting";
  /** The TXT record validation token */
  readonly validationToken?: string;
  readonly errorMessage?: string;
}

/** Static Site Custom Domain Request Properties ARM resource. */
export interface StaticSiteCustomDomainRequestPropertiesARMResourceOutput extends ProxyOnlyResourceOutput {
  /** StaticSiteCustomDomainRequestPropertiesARMResource resource specific properties */
  properties?: StaticSiteCustomDomainRequestPropertiesARMResourcePropertiesOutput;
}

/** StaticSiteCustomDomainRequestPropertiesARMResource resource specific properties */
export interface StaticSiteCustomDomainRequestPropertiesARMResourcePropertiesOutput {
  /** Validation method for adding a custom domain */
  validationMethod?: string;
}

/** String list resource. */
export interface StringListOutput extends ProxyOnlyResourceOutput {
  /** List of string resources. */
  properties?: Array<string>;
}

/** Static Site Reset Properties ARM resource. */
export interface StaticSiteResetPropertiesARMResourceOutput extends ProxyOnlyResourceOutput {
  /** StaticSiteResetPropertiesARMResource resource specific properties */
  properties?: StaticSiteResetPropertiesARMResourcePropertiesOutput;
}

/** StaticSiteResetPropertiesARMResource resource specific properties */
export interface StaticSiteResetPropertiesARMResourcePropertiesOutput {
  /** The token which proves admin privileges to the repository. */
  repositoryToken?: string;
  /** Determines whether the repository should be updated with the new properties. */
  shouldUpdateRepository?: boolean;
}

/** ARM resource for a site. */
export interface SitePatchResourceOutput extends ProxyOnlyResourceOutput {
  /** SitePatchResource resource specific properties */
  properties?: SitePatchResourcePropertiesOutput;
  /** Managed service identity. */
  identity?: ManagedServiceIdentityOutput;
}

/** SitePatchResource resource specific properties */
export interface SitePatchResourcePropertiesOutput {
  /** Current state of the app. */
  readonly state?: string;
  /** Hostnames associated with the app. */
  readonly hostNames?: Array<string>;
  /** Name of the repository site. */
  readonly repositorySiteName?: string;
  /** State indicating whether the app has exceeded its quota usage. Read-only. */
  readonly usageState?: "Normal" | "Exceeded";
  /** <code>true</code> if the app is enabled; otherwise, <code>false</code>. Setting this value to false disables the app (takes the app offline). */
  enabled?: boolean;
  /**
   * Enabled hostnames for the app.Hostnames need to be assigned (see HostNames) AND enabled. Otherwise,
   * the app is not served on those hostnames.
   */
  readonly enabledHostNames?: Array<string>;
  /** Management information availability state for the app. */
  readonly availabilityState?: "Normal" | "Limited" | "DisasterRecoveryMode";
  /** Hostname SSL states are used to manage the SSL bindings for app's hostnames. */
  hostNameSslStates?: Array<HostNameSslStateOutput>;
  /** Resource ID of the associated App Service plan, formatted as: "/subscriptions/{subscriptionID}/resourceGroups/{groupName}/providers/Microsoft.Web/serverfarms/{appServicePlanName}". */
  serverFarmId?: string;
  /** <code>true</code> if reserved; otherwise, <code>false</code>. */
  reserved?: boolean;
  /** Obsolete: Hyper-V sandbox. */
  isXenon?: boolean;
  /** Hyper-V sandbox. */
  hyperV?: boolean;
  /** Last time the app was modified, in UTC. Read-only. */
  readonly lastModifiedTimeUtc?: string;
  /** Configuration of the app. */
  siteConfig?: SiteConfigOutput;
  /** Azure Traffic Manager hostnames associated with the app. Read-only. */
  readonly trafficManagerHostNames?: Array<string>;
  /** <code>true</code> to stop SCM (KUDU) site when the app is stopped; otherwise, <code>false</code>. The default is <code>false</code>. */
  scmSiteAlsoStopped?: boolean;
  /** Specifies which deployment slot this app will swap into. Read-only. */
  readonly targetSwapSlot?: string;
  /** App Service Environment to use for the app. */
  hostingEnvironmentProfile?: HostingEnvironmentProfileOutput;
  /** <code>true</code> to enable client affinity; <code>false</code> to stop sending session affinity cookies, which route client requests in the same session to the same instance. Default is <code>true</code>. */
  clientAffinityEnabled?: boolean;
  /** <code>true</code> to enable client certificate authentication (TLS mutual authentication); otherwise, <code>false</code>. Default is <code>false</code>. */
  clientCertEnabled?: boolean;
  /**
   * This composes with ClientCertEnabled setting.
   * - ClientCertEnabled: false means ClientCert is ignored.
   * - ClientCertEnabled: true and ClientCertMode: Required means ClientCert is required.
   * - ClientCertEnabled: true and ClientCertMode: Optional means ClientCert is optional or accepted.
   */
  clientCertMode?: "Required" | "Optional" | "OptionalInteractiveUser";
  /** client certificate authentication comma-separated exclusion paths */
  clientCertExclusionPaths?: string;
  /**
   * <code>true</code> to disable the public hostnames of the app; otherwise, <code>false</code>.
   *  If <code>true</code>, the app is only accessible via API management process.
   */
  hostNamesDisabled?: boolean;
  /** Unique identifier that verifies the custom domains assigned to the app. Customer will add this id to a txt record for verification. */
  customDomainVerificationId?: string;
  /** List of IP addresses that the app uses for outbound connections (e.g. database access). Includes VIPs from tenants that site can be hosted with current settings. Read-only. */
  readonly outboundIpAddresses?: string;
  /** List of IP addresses that the app uses for outbound connections (e.g. database access). Includes VIPs from all tenants except dataComponent. Read-only. */
  readonly possibleOutboundIpAddresses?: string;
  /** Size of the function container. */
  containerSize?: number;
  /** Maximum allowed daily memory-time quota (applicable on dynamic apps only). */
  dailyMemoryTimeQuota?: number;
  /** App suspended till in case memory-time quota is exceeded. */
  readonly suspendedTill?: string;
  /**
   * Maximum number of workers.
   * This only applies to Functions container.
   */
  readonly maxNumberOfWorkers?: number;
  /** If specified during app creation, the app is cloned from a source app. */
  cloningInfo?: CloningInfoOutput;
  /** Name of the resource group the app belongs to. Read-only. */
  readonly resourceGroup?: string;
  /** <code>true</code> if the app is a default container; otherwise, <code>false</code>. */
  readonly isDefaultContainer?: boolean;
  /** Default hostname of the app. Read-only. */
  readonly defaultHostName?: string;
  /** Status of the last deployment slot swap operation. */
  readonly slotSwapStatus?: SlotSwapStatusOutput;
  /**
   * HttpsOnly: configures a web site to accept only https requests. Issues redirect for
   * http requests
   */
  httpsOnly?: boolean;
  /** Site redundancy mode */
  redundancyMode?: "None" | "Manual" | "Failover" | "ActiveActive" | "GeoRedundant";
  /**
   * Specifies an operation id if this site has a pending operation.
   *
   * Value may contain a UUID
   */
  readonly inProgressOperationId?: string;
  /** Checks if Customer provided storage account is required */
  storageAccountRequired?: boolean;
  /** Identity to use for Key Vault Reference authentication. */
  keyVaultReferenceIdentity?: string;
  /**
   * Azure Resource Manager ID of the Virtual network and subnet to be joined by Regional VNET Integration.
   * This must be of the form /subscriptions/{subscriptionName}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{vnetName}/subnets/{subnetName}
   */
  virtualNetworkSubnetId?: string;
}

/** Custom domain analysis. */
export interface CustomHostnameAnalysisResultOutput extends ProxyOnlyResourceOutput {
  /** CustomHostnameAnalysisResult resource specific properties */
  properties?: CustomHostnameAnalysisResultPropertiesOutput;
}

/** CustomHostnameAnalysisResult resource specific properties */
export interface CustomHostnameAnalysisResultPropertiesOutput {
  /** <code>true</code> if hostname is already verified; otherwise, <code>false</code>. */
  readonly isHostnameAlreadyVerified?: boolean;
  /** DNS verification test result. */
  readonly customDomainVerificationTest?: "Passed" | "Failed" | "Skipped";
  /** Raw failure information if DNS verification fails. */
  readonly customDomainVerificationFailureInfo?: ErrorEntityOutput;
  /** <code>true</code> if there is a conflict on a scale unit; otherwise, <code>false</code>. */
  readonly hasConflictOnScaleUnit?: boolean;
  /** <code>true</code> if there is a conflict across subscriptions; otherwise, <code>false</code>. */
  readonly hasConflictAcrossSubscription?: boolean;
  /** Name of the conflicting app on scale unit if it's within the same subscription. */
  readonly conflictingAppResourceId?: string;
  /** CName records controller can see for this hostname. */
  cNameRecords?: Array<string>;
  /** TXT records controller can see for this hostname. */
  txtRecords?: Array<string>;
  /** A records controller can see for this hostname. */
  aRecords?: Array<string>;
  /** Alternate CName records controller can see for this hostname. */
  alternateCNameRecords?: Array<string>;
  /** Alternate TXT records controller can see for this hostname. */
  alternateTxtRecords?: Array<string>;
}

/** Description of a backup which will be performed. */
export interface BackupRequestOutput extends ProxyOnlyResourceOutput {
  /** BackupRequest resource specific properties */
  properties?: BackupRequestPropertiesOutput;
}

/** BackupRequest resource specific properties */
export interface BackupRequestPropertiesOutput {
  /** Name of the backup. */
  backupName?: string;
  /** True if the backup schedule is enabled (must be included in that case), false if the backup schedule should be disabled. */
  enabled?: boolean;
  /** SAS URL to the container. */
  storageAccountUrl: string;
  /** Schedule for the backup if it is executed periodically. */
  backupSchedule?: BackupScheduleOutput;
  /** Databases included in the backup. */
  databases?: Array<DatabaseBackupSettingOutput>;
}

/** Description of a backup schedule. Describes how often should be the backup performed and what should be the retention policy. */
export interface BackupScheduleOutput {
  /** How often the backup should be executed (e.g. for weekly backup, this should be set to 7 and FrequencyUnit should be set to Day) */
  frequencyInterval: number;
  /** The unit of time for how often the backup should be executed (e.g. for weekly backup, this should be set to Day and FrequencyInterval should be set to 7) */
  frequencyUnit: "Day" | "Hour";
  /** True if the retention policy should always keep at least one backup in the storage account, regardless how old it is; false otherwise. */
  keepAtLeastOneBackup: boolean;
  /** After how many days backups should be deleted. */
  retentionPeriodInDays: number;
  /** When the schedule should start working. */
  startTime?: string;
  /** Last time when this schedule was triggered. */
  readonly lastExecutionTime?: string;
}

/** Database backup settings. */
export interface DatabaseBackupSettingOutput {
  /** Database type (e.g. SqlAzure / MySql). */
  databaseType: "SqlAzure" | "MySql" | "LocalMySql" | "PostgreSql";
  name?: string;
  /**
   * Contains a connection string name that is linked to the SiteConfig.ConnectionStrings.
   * This is used during restore with overwrite connection strings options.
   */
  connectionStringName?: string;
  /** Contains a connection string to a database which is being backed up or restored. If the restore should happen to a new database, the database name inside is the new one. */
  connectionString?: string;
}

/** Backup description. */
export interface BackupItemOutput extends ProxyOnlyResourceOutput {
  /** BackupItem resource specific properties */
  properties?: BackupItemPropertiesOutput;
}

/** BackupItem resource specific properties */
export interface BackupItemPropertiesOutput {
  /** Id of the backup. */
  readonly id?: number;
  /** SAS URL for the storage account container which contains this backup. */
  readonly storageAccountUrl?: string;
  /** Name of the blob which contains data for this backup. */
  readonly blobName?: string;
  /** Name of this backup. */
  readonly name?: string;
  /** Backup status. */
  readonly status?:
    | "InProgress"
    | "Failed"
    | "Succeeded"
    | "TimedOut"
    | "Created"
    | "Skipped"
    | "PartiallySucceeded"
    | "DeleteInProgress"
    | "DeleteFailed"
    | "Deleted";
  /** Size of the backup in bytes. */
  readonly sizeInBytes?: number;
  /** Timestamp of the backup creation. */
  readonly created?: string;
  /** Details regarding this backup. Might contain an error message. */
  readonly log?: string;
  /** List of databases included in the backup. */
  readonly databases?: Array<DatabaseBackupSettingOutput>;
  /** True if this backup has been created due to a schedule being triggered. */
  readonly scheduled?: boolean;
  /** Timestamp of a last restore operation which used this backup. */
  readonly lastRestoreTimeStamp?: string;
  /** Timestamp when this backup finished. */
  readonly finishedTimeStamp?: string;
  /** Unique correlation identifier. Please use this along with the timestamp while communicating with Azure support. */
  readonly correlationId?: string;
  /** Size of the original web app which has been backed up. */
  readonly websiteSizeInBytes?: number;
}

/** Collection of backup items. */
export interface BackupItemCollectionOutput {
  /** Collection of resources. */
  value: Array<BackupItemOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** Description of a restore request. */
export interface RestoreRequestOutput extends ProxyOnlyResourceOutput {
  /** RestoreRequest resource specific properties */
  properties?: RestoreRequestPropertiesOutput;
}

/** RestoreRequest resource specific properties */
export interface RestoreRequestPropertiesOutput {
  /** SAS URL to the container. */
  storageAccountUrl: string;
  /** Name of a blob which contains the backup. */
  blobName?: string;
  /** <code>true</code> if the restore operation can overwrite target app; otherwise, <code>false</code>. <code>true</code> is needed if trying to restore over an existing app. */
  overwrite: boolean;
  /** Name of an app. */
  siteName?: string;
  /** Collection of databases which should be restored. This list has to match the list of databases included in the backup. */
  databases?: Array<DatabaseBackupSettingOutput>;
  /**
   * Changes a logic when restoring an app with custom domains. <code>true</code> to remove custom domains automatically. If <code>false</code>, custom domains are added to
   * the app's object when it is being restored, but that might fail due to conflicts during the operation.
   */
  ignoreConflictingHostNames?: boolean;
  /** Ignore the databases and only restore the site content */
  ignoreDatabases?: boolean;
  /** Specify app service plan that will own restored site. */
  appServicePlan?: string;
  /** Operation type. */
  operationType?: "Default" | "Clone" | "Relocation" | "Snapshot" | "CloudFS";
  /** <code>true</code> if SiteConfig.ConnectionStrings should be set in new app; otherwise, <code>false</code>. */
  adjustConnectionStrings?: boolean;
  /** App Service Environment name, if needed (only when restoring an app to an App Service Environment). */
  hostingEnvironment?: string;
}

/** Publishing Credentials Policies entity collection ARM resource. */
export interface PublishingCredentialsPoliciesCollectionOutput {
  /** Collection of resources. */
  value: Array<CsmPublishingCredentialsPoliciesEntityOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** Publishing Credentials Policies parameters. */
export interface CsmPublishingCredentialsPoliciesEntityOutput extends ProxyOnlyResourceOutput {
  /** CsmPublishingCredentialsPoliciesEntity resource specific properties */
  properties?: CsmPublishingCredentialsPoliciesEntityPropertiesOutput;
}

/** CsmPublishingCredentialsPoliciesEntity resource specific properties */
export interface CsmPublishingCredentialsPoliciesEntityPropertiesOutput {
  /** <code>true</code> to allow access to a publishing method; otherwise, <code>false</code>. */
  allow: boolean;
}

/** Collection of site configurations. */
export interface SiteConfigResourceCollectionOutput {
  /** Collection of resources. */
  value: Array<SiteConfigResourceOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** Web app configuration ARM resource. */
export interface SiteConfigResourceOutput extends ProxyOnlyResourceOutput {
  /** Core resource properties */
  properties?: SiteConfigOutput;
}

/** Configuration settings for the Azure App Service Authentication / Authorization feature. */
export interface SiteAuthSettingsOutput extends ProxyOnlyResourceOutput {
  /** SiteAuthSettings resource specific properties */
  properties?: SiteAuthSettingsPropertiesOutput;
}

/** SiteAuthSettings resource specific properties */
export interface SiteAuthSettingsPropertiesOutput {
  /** <code>true</code> if the Authentication / Authorization feature is enabled for the current app; otherwise, <code>false</code>. */
  enabled?: boolean;
  /**
   * The RuntimeVersion of the Authentication / Authorization feature in use for the current app.
   * The setting in this value can control the behavior of certain features in the Authentication / Authorization module.
   */
  runtimeVersion?: string;
  /** The action to take when an unauthenticated client attempts to access the app. */
  unauthenticatedClientAction?: "RedirectToLoginPage" | "AllowAnonymous";
  /**
   * <code>true</code> to durably store platform-specific security tokens that are obtained during login flows; otherwise, <code>false</code>.
   *  The default is <code>false</code>.
   */
  tokenStoreEnabled?: boolean;
  /**
   * External URLs that can be redirected to as part of logging in or logging out of the app. Note that the query string part of the URL is ignored.
   * This is an advanced setting typically only needed by Windows Store application backends.
   * Note that URLs within the current domain are always implicitly allowed.
   */
  allowedExternalRedirectUrls?: Array<string>;
  /**
   * The default authentication provider to use when multiple providers are configured.
   * This setting is only needed if multiple providers are configured and the unauthenticated client
   * action is set to "RedirectToLoginPage".
   */
  defaultProvider?:
    | "AzureActiveDirectory"
    | "Facebook"
    | "Google"
    | "MicrosoftAccount"
    | "Twitter"
    | "Github";
  /**
   * The number of hours after session token expiration that a session token can be used to
   * call the token refresh API. The default is 72 hours.
   */
  tokenRefreshExtensionHours?: number;
  /**
   * The Client ID of this relying party application, known as the client_id.
   * This setting is required for enabling OpenID Connection authentication with Azure Active Directory or
   * other 3rd party OpenID Connect providers.
   * More information on OpenID Connect: http://openid.net/specs/openid-connect-core-1_0.html
   */
  clientId?: string;
  /**
   * The Client Secret of this relying party application (in Azure Active Directory, this is also referred to as the Key).
   * This setting is optional. If no client secret is configured, the OpenID Connect implicit auth flow is used to authenticate end users.
   * Otherwise, the OpenID Connect Authorization Code Flow is used to authenticate end users.
   * More information on OpenID Connect: http://openid.net/specs/openid-connect-core-1_0.html
   */
  clientSecret?: string;
  /** The app setting name that contains the client secret of the relying party application. */
  clientSecretSettingName?: string;
  /**
   * An alternative to the client secret, that is the thumbprint of a certificate used for signing purposes. This property acts as
   * a replacement for the Client Secret. It is also optional.
   */
  clientSecretCertificateThumbprint?: string;
  /**
   * The OpenID Connect Issuer URI that represents the entity which issues access tokens for this application.
   * When using Azure Active Directory, this value is the URI of the directory tenant, e.g. https://sts.windows.net/{tenant-guid}/.
   * This URI is a case-sensitive identifier for the token issuer.
   * More information on OpenID Connect Discovery: http://openid.net/specs/openid-connect-discovery-1_0.html
   */
  issuer?: string;
  /** Gets a value indicating whether the issuer should be a valid HTTPS url and be validated as such. */
  validateIssuer?: boolean;
  /**
   * Allowed audience values to consider when validating JWTs issued by
   * Azure Active Directory. Note that the <code>ClientID</code> value is always considered an
   * allowed audience, regardless of this setting.
   */
  allowedAudiences?: Array<string>;
  /**
   * Login parameters to send to the OpenID Connect authorization endpoint when
   * a user logs in. Each parameter must be in the form "key=value".
   */
  additionalLoginParams?: Array<string>;
  /** Gets a JSON string containing the Azure AD Acl settings. */
  aadClaimsAuthorization?: string;
  /**
   * The OpenID Connect Client ID for the Google web application.
   * This setting is required for enabling Google Sign-In.
   * Google Sign-In documentation: https://developers.google.com/identity/sign-in/web/
   */
  googleClientId?: string;
  /**
   * The client secret associated with the Google web application.
   * This setting is required for enabling Google Sign-In.
   * Google Sign-In documentation: https://developers.google.com/identity/sign-in/web/
   */
  googleClientSecret?: string;
  /**
   * The app setting name that contains the client secret associated with
   * the Google web application.
   */
  googleClientSecretSettingName?: string;
  /**
   * The OAuth 2.0 scopes that will be requested as part of Google Sign-In authentication.
   * This setting is optional. If not specified, "openid", "profile", and "email" are used as default scopes.
   * Google Sign-In documentation: https://developers.google.com/identity/sign-in/web/
   */
  googleOAuthScopes?: Array<string>;
  /**
   * The App ID of the Facebook app used for login.
   * This setting is required for enabling Facebook Login.
   * Facebook Login documentation: https://developers.facebook.com/docs/facebook-login
   */
  facebookAppId?: string;
  /**
   * The App Secret of the Facebook app used for Facebook Login.
   * This setting is required for enabling Facebook Login.
   * Facebook Login documentation: https://developers.facebook.com/docs/facebook-login
   */
  facebookAppSecret?: string;
  /** The app setting name that contains the app secret used for Facebook Login. */
  facebookAppSecretSettingName?: string;
  /**
   * The OAuth 2.0 scopes that will be requested as part of Facebook Login authentication.
   * This setting is optional.
   * Facebook Login documentation: https://developers.facebook.com/docs/facebook-login
   */
  facebookOAuthScopes?: Array<string>;
  /**
   * The Client Id of the GitHub app used for login.
   * This setting is required for enabling Github login
   */
  gitHubClientId?: string;
  /**
   * The Client Secret of the GitHub app used for Github Login.
   * This setting is required for enabling Github login.
   */
  gitHubClientSecret?: string;
  /**
   * The app setting name that contains the client secret of the Github
   * app used for GitHub Login.
   */
  gitHubClientSecretSettingName?: string;
  /**
   * The OAuth 2.0 scopes that will be requested as part of GitHub Login authentication.
   * This setting is optional
   */
  gitHubOAuthScopes?: Array<string>;
  /**
   * The OAuth 1.0a consumer key of the Twitter application used for sign-in.
   * This setting is required for enabling Twitter Sign-In.
   * Twitter Sign-In documentation: https://dev.twitter.com/web/sign-in
   */
  twitterConsumerKey?: string;
  /**
   * The OAuth 1.0a consumer secret of the Twitter application used for sign-in.
   * This setting is required for enabling Twitter Sign-In.
   * Twitter Sign-In documentation: https://dev.twitter.com/web/sign-in
   */
  twitterConsumerSecret?: string;
  /**
   * The app setting name that contains the OAuth 1.0a consumer secret of the Twitter
   * application used for sign-in.
   */
  twitterConsumerSecretSettingName?: string;
  /**
   * The OAuth 2.0 client ID that was created for the app used for authentication.
   * This setting is required for enabling Microsoft Account authentication.
   * Microsoft Account OAuth documentation: https://dev.onedrive.com/auth/msa_oauth.htm
   */
  microsoftAccountClientId?: string;
  /**
   * The OAuth 2.0 client secret that was created for the app used for authentication.
   * This setting is required for enabling Microsoft Account authentication.
   * Microsoft Account OAuth documentation: https://dev.onedrive.com/auth/msa_oauth.htm
   */
  microsoftAccountClientSecret?: string;
  /**
   * The app setting name containing the OAuth 2.0 client secret that was created for the
   * app used for authentication.
   */
  microsoftAccountClientSecretSettingName?: string;
  /**
   * The OAuth 2.0 scopes that will be requested as part of Microsoft Account authentication.
   * This setting is optional. If not specified, "wl.basic" is used as the default scope.
   * Microsoft Account Scopes and permissions documentation: https://msdn.microsoft.com/en-us/library/dn631845.aspx
   */
  microsoftAccountOAuthScopes?: Array<string>;
  /**
   * "true" if the auth config settings should be read from a file,
   * "false" otherwise
   */
  isAuthFromFile?: string;
  /**
   * The path of the config file containing auth settings.
   * If the path is relative, base will the site's root directory.
   */
  authFilePath?: string;
  /**
   * The ConfigVersion of the Authentication / Authorization feature in use for the current app.
   * The setting in this value can control the behavior of the control plane for Authentication / Authorization.
   */
  configVersion?: string;
}

/** Configuration settings for the Azure App Service Authentication / Authorization V2 feature. */
export interface SiteAuthSettingsV2Output extends ProxyOnlyResourceOutput {
  /** SiteAuthSettingsV2 resource specific properties */
  properties?: SiteAuthSettingsV2PropertiesOutput;
}

/** SiteAuthSettingsV2 resource specific properties */
export interface SiteAuthSettingsV2PropertiesOutput {
  /** The configuration settings of the platform of App Service Authentication/Authorization. */
  platform?: AuthPlatformOutput;
  /** The configuration settings that determines the validation flow of users using App Service Authentication/Authorization. */
  globalValidation?: GlobalValidationOutput;
  /** The configuration settings of each of the identity providers used to configure App Service Authentication/Authorization. */
  identityProviders?: IdentityProvidersOutput;
  /** The configuration settings of the login flow of users using App Service Authentication/Authorization. */
  login?: LoginOutput;
  /** The configuration settings of the HTTP requests for authentication and authorization requests made against App Service Authentication/Authorization. */
  httpSettings?: HttpSettingsOutput;
}

/** The configuration settings of the platform of App Service Authentication/Authorization. */
export interface AuthPlatformOutput {
  /** <code>true</code> if the Authentication / Authorization feature is enabled for the current app; otherwise, <code>false</code>. */
  enabled?: boolean;
  /**
   * The RuntimeVersion of the Authentication / Authorization feature in use for the current app.
   * The setting in this value can control the behavior of certain features in the Authentication / Authorization module.
   */
  runtimeVersion?: string;
  /**
   * The path of the config file containing auth settings if they come from a file.
   * If the path is relative, base will the site's root directory.
   */
  configFilePath?: string;
}

/** The configuration settings that determines the validation flow of users using App Service Authentication/Authorization. */
export interface GlobalValidationOutput {
  /** <code>true</code> if the authentication flow is required any request is made; otherwise, <code>false</code>. */
  requireAuthentication?: boolean;
  /** The action to take when an unauthenticated client attempts to access the app. */
  unauthenticatedClientAction?:
    | "RedirectToLoginPage"
    | "AllowAnonymous"
    | "Return401"
    | "Return403";
  /**
   * The default authentication provider to use when multiple providers are configured.
   * This setting is only needed if multiple providers are configured and the unauthenticated client
   * action is set to "RedirectToLoginPage".
   */
  redirectToProvider?: string;
  /** The paths for which unauthenticated flow would not be redirected to the login page. */
  excludedPaths?: Array<string>;
}

/** The configuration settings of each of the identity providers used to configure App Service Authentication/Authorization. */
export interface IdentityProvidersOutput {
  /** The configuration settings of the Azure Active directory provider. */
  azureActiveDirectory?: AzureActiveDirectoryOutput;
  /** The configuration settings of the Facebook provider. */
  facebook?: FacebookOutput;
  /** The configuration settings of the GitHub provider. */
  gitHub?: GitHubOutput;
  /** The configuration settings of the Google provider. */
  google?: GoogleOutput;
  /** The configuration settings of the legacy Microsoft Account provider. */
  legacyMicrosoftAccount?: LegacyMicrosoftAccountOutput;
  /** The configuration settings of the Twitter provider. */
  twitter?: TwitterOutput;
  /** The configuration settings of the Apple provider. */
  apple?: AppleOutput;
  /** The configuration settings of the Azure Static Web Apps provider. */
  azureStaticWebApps?: AzureStaticWebAppsOutput;
  /**
   * The map of the name of the alias of each custom Open ID Connect provider to the
   * configuration settings of the custom Open ID Connect provider.
   */
  customOpenIdConnectProviders?: Record<string, CustomOpenIdConnectProviderOutput>;
}

/** The configuration settings of the Azure Active directory provider. */
export interface AzureActiveDirectoryOutput {
  /** <code>false</code> if the Azure Active Directory provider should not be enabled despite the set registration; otherwise, <code>true</code>. */
  enabled?: boolean;
  /** The configuration settings of the Azure Active Directory app registration. */
  registration?: AzureActiveDirectoryRegistrationOutput;
  /** The configuration settings of the Azure Active Directory login flow. */
  login?: AzureActiveDirectoryLoginOutput;
  /** The configuration settings of the Azure Active Directory token validation flow. */
  validation?: AzureActiveDirectoryValidationOutput;
  /**
   * Gets a value indicating whether the Azure AD configuration was auto-provisioned using 1st party tooling.
   * This is an internal flag primarily intended to support the Azure Management Portal. Users should not
   * read or write to this property.
   */
  isAutoProvisioned?: boolean;
}

/** The configuration settings of the Azure Active Directory app registration. */
export interface AzureActiveDirectoryRegistrationOutput {
  /**
   * The OpenID Connect Issuer URI that represents the entity which issues access tokens for this application.
   * When using Azure Active Directory, this value is the URI of the directory tenant, e.g. https://login.microsoftonline.com/v2.0/{tenant-guid}/.
   * This URI is a case-sensitive identifier for the token issuer.
   * More information on OpenID Connect Discovery: http://openid.net/specs/openid-connect-discovery-1_0.html
   */
  openIdIssuer?: string;
  /**
   * The Client ID of this relying party application, known as the client_id.
   * This setting is required for enabling OpenID Connection authentication with Azure Active Directory or
   * other 3rd party OpenID Connect providers.
   * More information on OpenID Connect: http://openid.net/specs/openid-connect-core-1_0.html
   */
  clientId?: string;
  /** The app setting name that contains the client secret of the relying party application. */
  clientSecretSettingName?: string;
  /**
   * An alternative to the client secret, that is the thumbprint of a certificate used for signing purposes. This property acts as
   * a replacement for the Client Secret. It is also optional.
   */
  clientSecretCertificateThumbprint?: string;
  /**
   * An alternative to the client secret thumbprint, that is the subject alternative name of a certificate used for signing purposes. This property acts as
   * a replacement for the Client Secret Certificate Thumbprint. It is also optional.
   */
  clientSecretCertificateSubjectAlternativeName?: string;
  /**
   * An alternative to the client secret thumbprint, that is the issuer of a certificate used for signing purposes. This property acts as
   * a replacement for the Client Secret Certificate Thumbprint. It is also optional.
   */
  clientSecretCertificateIssuer?: string;
}

/** The configuration settings of the Azure Active Directory login flow. */
export interface AzureActiveDirectoryLoginOutput {
  /**
   * Login parameters to send to the OpenID Connect authorization endpoint when
   * a user logs in. Each parameter must be in the form "key=value".
   */
  loginParameters?: Array<string>;
  /** <code>true</code> if the www-authenticate provider should be omitted from the request; otherwise, <code>false</code>. */
  disableWWWAuthenticate?: boolean;
}

/** The configuration settings of the Azure Active Directory token validation flow. */
export interface AzureActiveDirectoryValidationOutput {
  /** The configuration settings of the checks that should be made while validating the JWT Claims. */
  jwtClaimChecks?: JwtClaimChecksOutput;
  /** The list of audiences that can make successful authentication/authorization requests. */
  allowedAudiences?: Array<string>;
  /** The configuration settings of the default authorization policy. */
  defaultAuthorizationPolicy?: DefaultAuthorizationPolicyOutput;
}

/** The configuration settings of the checks that should be made while validating the JWT Claims. */
export interface JwtClaimChecksOutput {
  /** The list of the allowed groups. */
  allowedGroups?: Array<string>;
  /** The list of the allowed client applications. */
  allowedClientApplications?: Array<string>;
}

/** The configuration settings of the Azure Active Directory default authorization policy. */
export interface DefaultAuthorizationPolicyOutput {
  /** The configuration settings of the Azure Active Directory allowed principals. */
  allowedPrincipals?: AllowedPrincipalsOutput;
  /** The configuration settings of the Azure Active Directory allowed applications. */
  allowedApplications?: Array<string>;
}

/** The configuration settings of the Azure Active Directory allowed principals. */
export interface AllowedPrincipalsOutput {
  /** The list of the allowed groups. */
  groups?: Array<string>;
  /** The list of the allowed identities. */
  identities?: Array<string>;
}

/** The configuration settings of the Facebook provider. */
export interface FacebookOutput {
  /** <code>false</code> if the Facebook provider should not be enabled despite the set registration; otherwise, <code>true</code>. */
  enabled?: boolean;
  /** The configuration settings of the app registration for the Facebook provider. */
  registration?: AppRegistrationOutput;
  /** The version of the Facebook api to be used while logging in. */
  graphApiVersion?: string;
  /** The configuration settings of the login flow. */
  login?: LoginScopesOutput;
}

/** The configuration settings of the app registration for providers that have app ids and app secrets */
export interface AppRegistrationOutput {
  /** The App ID of the app used for login. */
  appId?: string;
  /** The app setting name that contains the app secret. */
  appSecretSettingName?: string;
}

/** The configuration settings of the login flow, including the scopes that should be requested. */
export interface LoginScopesOutput {
  /** A list of the scopes that should be requested while authenticating. */
  scopes?: Array<string>;
}

/** The configuration settings of the GitHub provider. */
export interface GitHubOutput {
  /** <code>false</code> if the GitHub provider should not be enabled despite the set registration; otherwise, <code>true</code>. */
  enabled?: boolean;
  /** The configuration settings of the app registration for the GitHub provider. */
  registration?: ClientRegistrationOutput;
  /** The configuration settings of the login flow. */
  login?: LoginScopesOutput;
}

/** The configuration settings of the app registration for providers that have client ids and client secrets */
export interface ClientRegistrationOutput {
  /** The Client ID of the app used for login. */
  clientId?: string;
  /** The app setting name that contains the client secret. */
  clientSecretSettingName?: string;
}

/** The configuration settings of the Google provider. */
export interface GoogleOutput {
  /** <code>false</code> if the Google provider should not be enabled despite the set registration; otherwise, <code>true</code>. */
  enabled?: boolean;
  /** The configuration settings of the app registration for the Google provider. */
  registration?: ClientRegistrationOutput;
  /** The configuration settings of the login flow. */
  login?: LoginScopesOutput;
  /** The configuration settings of the Azure Active Directory token validation flow. */
  validation?: AllowedAudiencesValidationOutput;
}

/** The configuration settings of the Allowed Audiences validation flow. */
export interface AllowedAudiencesValidationOutput {
  /** The configuration settings of the allowed list of audiences from which to validate the JWT token. */
  allowedAudiences?: Array<string>;
}

/** The configuration settings of the legacy Microsoft Account provider. */
export interface LegacyMicrosoftAccountOutput {
  /** <code>false</code> if the legacy Microsoft Account provider should not be enabled despite the set registration; otherwise, <code>true</code>. */
  enabled?: boolean;
  /** The configuration settings of the app registration for the legacy Microsoft Account provider. */
  registration?: ClientRegistrationOutput;
  /** The configuration settings of the login flow. */
  login?: LoginScopesOutput;
  /** The configuration settings of the legacy Microsoft Account provider token validation flow. */
  validation?: AllowedAudiencesValidationOutput;
}

/** The configuration settings of the Twitter provider. */
export interface TwitterOutput {
  /** <code>false</code> if the Twitter provider should not be enabled despite the set registration; otherwise, <code>true</code>. */
  enabled?: boolean;
  /** The configuration settings of the app registration for the Twitter provider. */
  registration?: TwitterRegistrationOutput;
}

/** The configuration settings of the app registration for the Twitter provider. */
export interface TwitterRegistrationOutput {
  /**
   * The OAuth 1.0a consumer key of the Twitter application used for sign-in.
   * This setting is required for enabling Twitter Sign-In.
   * Twitter Sign-In documentation: https://dev.twitter.com/web/sign-in
   */
  consumerKey?: string;
  /**
   * The app setting name that contains the OAuth 1.0a consumer secret of the Twitter
   * application used for sign-in.
   */
  consumerSecretSettingName?: string;
}

/** The configuration settings of the Apple provider. */
export interface AppleOutput {
  /** <code>false</code> if the Apple provider should not be enabled despite the set registration; otherwise, <code>true</code>. */
  enabled?: boolean;
  /** The configuration settings of the Apple registration. */
  registration?: AppleRegistrationOutput;
  /** The configuration settings of the login flow. */
  login?: LoginScopesOutput;
}

/** The configuration settings of the registration for the Apple provider */
export interface AppleRegistrationOutput {
  /** The Client ID of the app used for login. */
  clientId?: string;
  /** The app setting name that contains the client secret. */
  clientSecretSettingName?: string;
}

/** The configuration settings of the Azure Static Web Apps provider. */
export interface AzureStaticWebAppsOutput {
  /** <code>false</code> if the Azure Static Web Apps provider should not be enabled despite the set registration; otherwise, <code>true</code>. */
  enabled?: boolean;
  /** The configuration settings of the Azure Static Web Apps registration. */
  registration?: AzureStaticWebAppsRegistrationOutput;
}

/** The configuration settings of the registration for the Azure Static Web Apps provider */
export interface AzureStaticWebAppsRegistrationOutput {
  /** The Client ID of the app used for login. */
  clientId?: string;
}

/** The configuration settings of the custom Open ID Connect provider. */
export interface CustomOpenIdConnectProviderOutput {
  /** <code>false</code> if the custom Open ID provider provider should not be enabled; otherwise, <code>true</code>. */
  enabled?: boolean;
  /** The configuration settings of the app registration for the custom Open ID Connect provider. */
  registration?: OpenIdConnectRegistrationOutput;
  /** The configuration settings of the login flow of the custom Open ID Connect provider. */
  login?: OpenIdConnectLoginOutput;
}

/** The configuration settings of the app registration for the custom Open ID Connect provider. */
export interface OpenIdConnectRegistrationOutput {
  /** The client id of the custom Open ID Connect provider. */
  clientId?: string;
  /** The authentication credentials of the custom Open ID Connect provider. */
  clientCredential?: OpenIdConnectClientCredentialOutput;
  /** The configuration settings of the endpoints used for the custom Open ID Connect provider. */
  openIdConnectConfiguration?: OpenIdConnectConfigOutput;
}

/** The authentication client credentials of the custom Open ID Connect provider. */
export interface OpenIdConnectClientCredentialOutput {
  /** The method that should be used to authenticate the user. */
  method?: "ClientSecretPost";
  /** The app setting that contains the client secret for the custom Open ID Connect provider. */
  clientSecretSettingName?: string;
}

/** The configuration settings of the endpoints used for the custom Open ID Connect provider. */
export interface OpenIdConnectConfigOutput {
  /** The endpoint to be used to make an authorization request. */
  authorizationEndpoint?: string;
  /** The endpoint to be used to request a token. */
  tokenEndpoint?: string;
  /** The endpoint that issues the token. */
  issuer?: string;
  /** The endpoint that provides the keys necessary to validate the token. */
  certificationUri?: string;
  /** The endpoint that contains all the configuration endpoints for the provider. */
  wellKnownOpenIdConfiguration?: string;
}

/** The configuration settings of the login flow of the custom Open ID Connect provider. */
export interface OpenIdConnectLoginOutput {
  /** The name of the claim that contains the users name. */
  nameClaimType?: string;
  /** A list of the scopes that should be requested while authenticating. */
  scopes?: Array<string>;
}

/** The configuration settings of the login flow of users using App Service Authentication/Authorization. */
export interface LoginOutput {
  /** The routes that specify the endpoints used for login and logout requests. */
  routes?: LoginRoutesOutput;
  /** The configuration settings of the token store. */
  tokenStore?: TokenStoreOutput;
  /** <code>true</code> if the fragments from the request are preserved after the login request is made; otherwise, <code>false</code>. */
  preserveUrlFragmentsForLogins?: boolean;
  /**
   * External URLs that can be redirected to as part of logging in or logging out of the app. Note that the query string part of the URL is ignored.
   * This is an advanced setting typically only needed by Windows Store application backends.
   * Note that URLs within the current domain are always implicitly allowed.
   */
  allowedExternalRedirectUrls?: Array<string>;
  /** The configuration settings of the session cookie's expiration. */
  cookieExpiration?: CookieExpirationOutput;
  /** The configuration settings of the nonce used in the login flow. */
  nonce?: NonceOutput;
}

/** The routes that specify the endpoints used for login and logout requests. */
export interface LoginRoutesOutput {
  /** The endpoint at which a logout request should be made. */
  logoutEndpoint?: string;
}

/** The configuration settings of the token store. */
export interface TokenStoreOutput {
  /**
   * <code>true</code> to durably store platform-specific security tokens that are obtained during login flows; otherwise, <code>false</code>.
   *  The default is <code>false</code>.
   */
  enabled?: boolean;
  /**
   * The number of hours after session token expiration that a session token can be used to
   * call the token refresh API. The default is 72 hours.
   */
  tokenRefreshExtensionHours?: number;
  /** The configuration settings of the storage of the tokens if a file system is used. */
  fileSystem?: FileSystemTokenStoreOutput;
  /** The configuration settings of the storage of the tokens if blob storage is used. */
  azureBlobStorage?: BlobStorageTokenStoreOutput;
}

/** The configuration settings of the storage of the tokens if a file system is used. */
export interface FileSystemTokenStoreOutput {
  /** The directory in which the tokens will be stored. */
  directory?: string;
}

/** The configuration settings of the storage of the tokens if blob storage is used. */
export interface BlobStorageTokenStoreOutput {
  /** The name of the app setting containing the SAS URL of the blob storage containing the tokens. */
  sasUrlSettingName?: string;
}

/** The configuration settings of the session cookie's expiration. */
export interface CookieExpirationOutput {
  /** The convention used when determining the session cookie's expiration. */
  convention?: "FixedTime" | "IdentityProviderDerived";
  /** The time after the request is made when the session cookie should expire. */
  timeToExpiration?: string;
}

/** The configuration settings of the nonce used in the login flow. */
export interface NonceOutput {
  /** <code>false</code> if the nonce should not be validated while completing the login flow; otherwise, <code>true</code>. */
  validateNonce?: boolean;
  /** The time after the request is made when the nonce should expire. */
  nonceExpirationInterval?: string;
}

/** The configuration settings of the HTTP requests for authentication and authorization requests made against App Service Authentication/Authorization. */
export interface HttpSettingsOutput {
  /** <code>false</code> if the authentication/authorization responses not having the HTTPS scheme are permissible; otherwise, <code>true</code>. */
  requireHttps?: boolean;
  /** The configuration settings of the paths HTTP requests. */
  routes?: HttpSettingsRoutesOutput;
  /** The configuration settings of a forward proxy used to make the requests. */
  forwardProxy?: ForwardProxyOutput;
}

/** The configuration settings of the paths HTTP requests. */
export interface HttpSettingsRoutesOutput {
  /** The prefix that should precede all the authentication/authorization paths. */
  apiPrefix?: string;
}

/** The configuration settings of a forward proxy used to make the requests. */
export interface ForwardProxyOutput {
  /** The convention used to determine the url of the request made. */
  convention?: "NoProxy" | "Standard" | "Custom";
  /** The name of the header containing the host of the request. */
  customHostHeaderName?: string;
  /** The name of the header containing the scheme of the request. */
  customProtoHeaderName?: string;
}

/** AzureStorageInfo dictionary resource. */
export interface AzureStoragePropertyDictionaryResourceOutput extends ProxyOnlyResourceOutput {
  /** Azure storage accounts. */
  properties?: Record<string, AzureStorageInfoValueOutput>;
}

export interface ApiKVReferenceCollectionOutput {
  /** Collection of resources. */
  value: Array<ApiKVReferenceOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** Description of site key vault references. */
export interface ApiKVReferenceOutput extends ProxyOnlyResourceOutput {
  /** ApiKVReference resource specific properties */
  properties?: ApiKVReferencePropertiesOutput;
}

/** ApiKVReference resource specific properties */
export interface ApiKVReferencePropertiesOutput {
  reference?: string;
  status?:
    | "Initialized"
    | "Resolved"
    | "InvalidSyntax"
    | "MSINotEnabled"
    | "VaultNotFound"
    | "SecretNotFound"
    | "SecretVersionNotFound"
    | "AccessToKeyVaultDenied"
    | "OtherReasons"
    | "FetchTimedOut"
    | "UnauthorizedClient";
  vaultName?: string;
  secretName?: string;
  secretVersion?: string;
  /** Managed service identity. */
  identityType?: ManagedServiceIdentityOutput;
  details?: string;
  source?: "KeyVault";
  activeVersion?: string;
}

/** String dictionary resource. */
export interface ConnectionStringDictionaryOutput extends ProxyOnlyResourceOutput {
  /** Connection strings. */
  properties?: Record<string, ConnStringValueTypePairOutput>;
}

/** Database connection string value to type pair. */
export interface ConnStringValueTypePairOutput {
  /** Value of pair. */
  value: string;
  /** Type of database. */
  type:
    | "MySql"
    | "SQLServer"
    | "SQLAzure"
    | "Custom"
    | "NotificationHub"
    | "ServiceBus"
    | "EventHub"
    | "ApiHub"
    | "DocDb"
    | "RedisCache"
    | "PostgreSQL";
}

/** Configuration of App Service site logs. */
export interface SiteLogsConfigOutput extends ProxyOnlyResourceOutput {
  /** SiteLogsConfig resource specific properties */
  properties?: SiteLogsConfigPropertiesOutput;
}

/** SiteLogsConfig resource specific properties */
export interface SiteLogsConfigPropertiesOutput {
  /** Application logs configuration. */
  applicationLogs?: ApplicationLogsConfigOutput;
  /** HTTP logs configuration. */
  httpLogs?: HttpLogsConfigOutput;
  /** Failed requests tracing configuration. */
  failedRequestsTracing?: EnabledConfigOutput;
  /** Detailed error messages configuration. */
  detailedErrorMessages?: EnabledConfigOutput;
}

/** Application logs configuration. */
export interface ApplicationLogsConfigOutput {
  /** Application logs to file system configuration. */
  fileSystem?: FileSystemApplicationLogsConfigOutput;
  /** Application logs to azure table storage configuration. */
  azureTableStorage?: AzureTableStorageApplicationLogsConfigOutput;
  /** Application logs to blob storage configuration. */
  azureBlobStorage?: AzureBlobStorageApplicationLogsConfigOutput;
}

/** Application logs to file system configuration. */
export interface FileSystemApplicationLogsConfigOutput {
  /** Log level. */
  level?: "Off" | "Verbose" | "Information" | "Warning" | "Error";
}

/** Application logs to Azure table storage configuration. */
export interface AzureTableStorageApplicationLogsConfigOutput {
  /** Log level. */
  level?: "Off" | "Verbose" | "Information" | "Warning" | "Error";
  /** SAS URL to an Azure table with add/query/delete permissions. */
  sasUrl: string;
}

/** Application logs azure blob storage configuration. */
export interface AzureBlobStorageApplicationLogsConfigOutput {
  /** Log level. */
  level?: "Off" | "Verbose" | "Information" | "Warning" | "Error";
  /** SAS url to a azure blob container with read/write/list/delete permissions. */
  sasUrl?: string;
  /**
   * Retention in days.
   * Remove blobs older than X days.
   * 0 or lower means no retention.
   */
  retentionInDays?: number;
}

/** Http logs configuration. */
export interface HttpLogsConfigOutput {
  /** Http logs to file system configuration. */
  fileSystem?: FileSystemHttpLogsConfigOutput;
  /** Http logs to azure blob storage configuration. */
  azureBlobStorage?: AzureBlobStorageHttpLogsConfigOutput;
}

/** Http logs to file system configuration. */
export interface FileSystemHttpLogsConfigOutput {
  /**
   * Maximum size in megabytes that http log files can use.
   * When reached old log files will be removed to make space for new ones.
   * Value can range between 25 and 100.
   */
  retentionInMb?: number;
  /**
   * Retention in days.
   * Remove files older than X days.
   * 0 or lower means no retention.
   */
  retentionInDays?: number;
  /** True if configuration is enabled, false if it is disabled and null if configuration is not set. */
  enabled?: boolean;
}

/** Http logs to azure blob storage configuration. */
export interface AzureBlobStorageHttpLogsConfigOutput {
  /** SAS url to a azure blob container with read/write/list/delete permissions. */
  sasUrl?: string;
  /**
   * Retention in days.
   * Remove blobs older than X days.
   * 0 or lower means no retention.
   */
  retentionInDays?: number;
  /** True if configuration is enabled, false if it is disabled and null if configuration is not set. */
  enabled?: boolean;
}

/** Enabled configuration. */
export interface EnabledConfigOutput {
  /** True if configuration is enabled, false if it is disabled and null if configuration is not set. */
  enabled?: boolean;
}

/** Slot Config names azure resource. */
export interface SlotConfigNamesResourceOutput extends ProxyOnlyResourceOutput {
  /** Core resource properties */
  properties?: SlotConfigNamesOutput;
}

/**
 * Names for connection strings, application settings, and external Azure storage account configuration
 * identifiers to be marked as sticky to the deployment slot and not moved during a swap operation.
 * This is valid for all deployment slots in an app.
 */
export interface SlotConfigNamesOutput {
  /** List of connection string names. */
  connectionStringNames?: Array<string>;
  /** List of application settings names. */
  appSettingNames?: Array<string>;
  /** List of external Azure storage account identifiers. */
  azureStorageConfigNames?: Array<string>;
}

/** Collection of metadata for the app configuration snapshots that can be restored. */
export interface SiteConfigurationSnapshotInfoCollectionOutput {
  /** Collection of resources. */
  value: Array<SiteConfigurationSnapshotInfoOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** A snapshot of a web app configuration. */
export interface SiteConfigurationSnapshotInfoOutput extends ProxyOnlyResourceOutput {
  /** SiteConfigurationSnapshotInfo resource specific properties */
  properties?: SiteConfigurationSnapshotInfoPropertiesOutput;
}

/** SiteConfigurationSnapshotInfo resource specific properties */
export interface SiteConfigurationSnapshotInfoPropertiesOutput {
  /** The time the snapshot was taken. */
  readonly time?: string;
  /** The id of the snapshot */
  readonly snapshotId?: number;
}

/** Collection of Kudu continuous web job information elements. */
export interface ContinuousWebJobCollectionOutput {
  /** Collection of resources. */
  value: Array<ContinuousWebJobOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** Continuous Web Job Information. */
export interface ContinuousWebJobOutput extends ProxyOnlyResourceOutput {
  /** ContinuousWebJob resource specific properties */
  properties?: ContinuousWebJobPropertiesOutput;
}

/** ContinuousWebJob resource specific properties */
export interface ContinuousWebJobPropertiesOutput {
  /** Job status. */
  status?: "Initializing" | "Starting" | "Running" | "PendingRestart" | "Stopped";
  /** Detailed status. */
  detailed_status?: string;
  /** Log URL. */
  log_url?: string;
  /** Run command. */
  run_command?: string;
  /** Job URL. */
  url?: string;
  /** Extra Info URL. */
  extra_info_url?: string;
  /** Job type. */
  web_job_type?: "Continuous" | "Triggered";
  /** Error information. */
  error?: string;
  /** Using SDK? */
  using_sdk?: boolean;
  /** Job settings. */
  settings?: Record<string, Record<string, unknown>>;
}

/** Collection of app deployments. */
export interface DeploymentCollectionOutput {
  /** Collection of resources. */
  value: Array<DeploymentOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** User credentials used for publishing activity. */
export interface DeploymentOutput extends ProxyOnlyResourceOutput {
  /** Deployment resource specific properties */
  properties?: DeploymentPropertiesOutput;
}

/** Deployment resource specific properties */
export interface DeploymentPropertiesOutput {
  /** Deployment status. */
  status?: number;
  /** Details about deployment status. */
  message?: string;
  /** Who authored the deployment. */
  author?: string;
  /** Who performed the deployment. */
  deployer?: string;
  /** Author email. */
  author_email?: string;
  /** Start time. */
  start_time?: string;
  /** End time. */
  end_time?: string;
  /** True if deployment is currently active, false if completed and null if not started. */
  active?: boolean;
  /** Details on deployment. */
  details?: string;
}

/** MSDeploy ARM response */
export interface MSDeployStatusOutput extends ProxyOnlyResourceOutput {
  /** MSDeployStatus resource specific properties */
  properties?: MSDeployStatusPropertiesOutput;
}

/** MSDeployStatus resource specific properties */
export interface MSDeployStatusPropertiesOutput {
  /** Username of deployer */
  readonly deployer?: string;
  /** Provisioning state */
  readonly provisioningState?: "accepted" | "running" | "succeeded" | "failed" | "canceled";
  /** Start time of deploy operation */
  readonly startTime?: string;
  /** End time of deploy operation */
  readonly endTime?: string;
  /** Whether the deployment operation has completed */
  readonly complete?: boolean;
}

/** MSDeploy ARM PUT information */
export interface MSDeployOutput extends ProxyOnlyResourceOutput {
  /** Core resource properties */
  properties?: MSDeployCoreOutput;
}

/** MSDeploy ARM PUT core information */
export interface MSDeployCoreOutput {
  /** Package URI */
  packageUri?: string;
  /** SQL Connection String */
  connectionString?: string;
  /** Database Type */
  dbType?: string;
  /** URI of MSDeploy Parameters file. Must not be set if SetParameters is used. */
  setParametersXmlFileUri?: string;
  /** MSDeploy Parameters. Must not be set if SetParametersXmlFileUri is used. */
  setParameters?: Record<string, string>;
  /**
   * Controls whether the MSDeploy operation skips the App_Data directory.
   * If set to <code>true</code>, the existing App_Data directory on the destination
   * will not be deleted, and any App_Data directory in the source will be ignored.
   * Setting is <code>false</code> by default.
   */
  skipAppData?: boolean;
  /**
   * Sets the AppOffline rule while the MSDeploy operation executes.
   * Setting is <code>false</code> by default.
   */
  appOffline?: boolean;
}

/** MSDeploy log */
export interface MSDeployLogOutput extends ProxyOnlyResourceOutput {
  /** MSDeployLog resource specific properties */
  properties?: MSDeployLogPropertiesOutput;
}

/** MSDeployLog resource specific properties */
export interface MSDeployLogPropertiesOutput {
  /** List of log entry messages */
  readonly entries?: Array<MSDeployLogEntryOutput>;
}

/** MSDeploy log entry */
export interface MSDeployLogEntryOutput {
  /** Timestamp of log entry */
  readonly time?: string;
  /** Log entry type */
  readonly type?: "Message" | "Warning" | "Error";
  /** Log entry message */
  readonly message?: string;
}

/** Collection of Kudu function information elements. */
export interface FunctionEnvelopeCollectionOutput {
  /** Collection of resources. */
  value: Array<FunctionEnvelopeOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** Function information. */
export interface FunctionEnvelopeOutput extends ProxyOnlyResourceOutput {
  /** FunctionEnvelope resource specific properties */
  properties?: FunctionEnvelopePropertiesOutput;
}

/** FunctionEnvelope resource specific properties */
export interface FunctionEnvelopePropertiesOutput {
  /** Function App ID. */
  function_app_id?: string;
  /** Script root path URI. */
  script_root_path_href?: string;
  /** Script URI. */
  script_href?: string;
  /** Config URI. */
  config_href?: string;
  /** Test data URI. */
  test_data_href?: string;
  /** Secrets file URI. */
  secrets_file_href?: string;
  /** Function URI. */
  href?: string;
  /** Config information. */
  config?: Record<string, unknown>;
  /** File list. */
  files?: Record<string, string>;
  /** Test data used when testing via the Azure Portal. */
  test_data?: string;
  /** The invocation URL */
  invoke_url_template?: string;
  /** The function language */
  language?: string;
  /** Gets or sets a value indicating whether the function is disabled */
  isDisabled?: boolean;
}

/** Function key info. */
export interface KeyInfoOutput {
  /** Key name */
  name?: string;
  /** Key value */
  value?: string;
}

/** Function secrets. */
export interface FunctionSecretsOutput {
  /** Secret key. */
  key?: string;
  /** Trigger URL. */
  trigger_url?: string;
}

/** Functions host level keys. */
export interface HostKeysOutput {
  /** Secret key. */
  masterKey?: string;
  /** Host level function keys. */
  functionKeys?: Record<string, string>;
  /** System keys. */
  systemKeys?: Record<string, string>;
}

/** Collection of hostname bindings. */
export interface HostNameBindingCollectionOutput {
  /** Collection of resources. */
  value: Array<HostNameBindingOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** A hostname binding object. */
export interface HostNameBindingOutput extends ProxyOnlyResourceOutput {
  /** HostNameBinding resource specific properties */
  properties?: HostNameBindingPropertiesOutput;
}

/** HostNameBinding resource specific properties */
export interface HostNameBindingPropertiesOutput {
  /** App Service app name. */
  siteName?: string;
  /** Fully qualified ARM domain resource URI. */
  domainId?: string;
  /** Azure resource name. */
  azureResourceName?: string;
  /** Azure resource type. */
  azureResourceType?: "Website" | "TrafficManager";
  /** Custom DNS record type. */
  customHostNameDnsRecordType?: "CName" | "A";
  /** Hostname type. */
  hostNameType?: "Verified" | "Managed";
  /** SSL type */
  sslState?: "Disabled" | "SniEnabled" | "IpBasedEnabled";
  /** SSL certificate thumbprint */
  thumbprint?: string;
  /** Virtual IP address assigned to the hostname if IP based SSL is enabled. */
  readonly virtualIP?: string;
}

/** Hybrid Connection for an App Service app. */
export interface RelayServiceConnectionEntityOutput extends ProxyOnlyResourceOutput {
  /** RelayServiceConnectionEntity resource specific properties */
  properties?: RelayServiceConnectionEntityPropertiesOutput;
}

/** RelayServiceConnectionEntity resource specific properties */
export interface RelayServiceConnectionEntityPropertiesOutput {
  entityName?: string;
  entityConnectionString?: string;
  resourceType?: string;
  resourceConnectionString?: string;
  hostname?: string;
  port?: number;
  biztalkUri?: string;
}

/** Collection of app instances. */
export interface WebAppInstanceStatusCollectionOutput {
  /** Collection of resources. */
  value: Array<WebSiteInstanceStatusOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

export interface WebSiteInstanceStatusOutput extends ProxyOnlyResourceOutput {
  /** WebSiteInstanceStatus resource specific properties */
  properties?: WebSiteInstanceStatusPropertiesOutput;
}

/** WebSiteInstanceStatus resource specific properties */
export interface WebSiteInstanceStatusPropertiesOutput {
  state?: "READY" | "STOPPED" | "UNKNOWN";
  /** Link to the GetStatusApi in Kudu */
  statusUrl?: string;
  /** Link to the Diagnose and Solve Portal */
  detectorUrl?: string;
  /** Link to the console to web app instance */
  consoleUrl?: string;
  /** Link to the console to web app instance */
  healthCheckUrl?: string;
  /** Dictionary of <ContainerInfo> */
  containers?: Record<string, ContainerInfoOutput>;
}

export interface ContainerInfoOutput {
  currentTimeStamp?: string;
  previousTimeStamp?: string;
  currentCpuStats?: ContainerCpuStatisticsOutput;
  previousCpuStats?: ContainerCpuStatisticsOutput;
  memoryStats?: ContainerMemoryStatisticsOutput;
  name?: string;
  id?: string;
  eth0?: ContainerNetworkInterfaceStatisticsOutput;
}

export interface ContainerCpuStatisticsOutput {
  cpuUsage?: ContainerCpuUsageOutput;
  systemCpuUsage?: number;
  onlineCpuCount?: number;
  throttlingData?: ContainerThrottlingDataOutput;
}

export interface ContainerCpuUsageOutput {
  totalUsage?: number;
  perCpuUsage?: Array<number>;
  kernelModeUsage?: number;
  userModeUsage?: number;
}

export interface ContainerThrottlingDataOutput {
  periods?: number;
  throttledPeriods?: number;
  throttledTime?: number;
}

export interface ContainerMemoryStatisticsOutput {
  usage?: number;
  maxUsage?: number;
  limit?: number;
}

export interface ContainerNetworkInterfaceStatisticsOutput {
  rxBytes?: number;
  rxPackets?: number;
  rxErrors?: number;
  rxDropped?: number;
  txBytes?: number;
  txPackets?: number;
  txErrors?: number;
  txDropped?: number;
}

/** Collection of Kudu process information elements. */
export interface ProcessInfoCollectionOutput {
  /** Collection of resources. */
  value: Array<ProcessInfoOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** Process Information. */
export interface ProcessInfoOutput extends ProxyOnlyResourceOutput {
  /** ProcessInfo resource specific properties */
  properties?: ProcessInfoPropertiesOutput;
}

/** ProcessInfo resource specific properties */
export interface ProcessInfoPropertiesOutput {
  /** ARM Identifier for deployment. */
  readonly identifier?: number;
  /** Deployment name. */
  deployment_name?: string;
  /** HRef URI. */
  href?: string;
  /** Minidump URI. */
  minidump?: string;
  /** Is profile running? */
  is_profile_running?: boolean;
  /** Is the IIS Profile running? */
  is_iis_profile_running?: boolean;
  /** IIS Profile timeout (seconds). */
  iis_profile_timeout_in_seconds?: number;
  /** Parent process. */
  parent?: string;
  /** Child process list. */
  children?: Array<string>;
  /** Thread list. */
  threads?: Array<ProcessThreadInfoOutput>;
  /** List of open files. */
  open_file_handles?: Array<string>;
  /** List of modules. */
  modules?: Array<ProcessModuleInfoOutput>;
  /** File name of this process. */
  file_name?: string;
  /** Command line. */
  command_line?: string;
  /** User name. */
  user_name?: string;
  /** Handle count. */
  handle_count?: number;
  /** Module count. */
  module_count?: number;
  /** Thread count. */
  thread_count?: number;
  /** Start time. */
  start_time?: string;
  /** Total CPU time. */
  total_cpu_time?: string;
  /** User CPU time. */
  user_cpu_time?: string;
  /** Privileged CPU time. */
  privileged_cpu_time?: string;
  /** Working set. */
  working_set?: number;
  /** Peak working set. */
  peak_working_set?: number;
  /** Private memory size. */
  private_memory?: number;
  /** Virtual memory size. */
  virtual_memory?: number;
  /** Peak virtual memory usage. */
  peak_virtual_memory?: number;
  /** Paged system memory. */
  paged_system_memory?: number;
  /** Non-paged system memory. */
  non_paged_system_memory?: number;
  /** Paged memory. */
  paged_memory?: number;
  /** Peak paged memory. */
  peak_paged_memory?: number;
  /** Time stamp. */
  time_stamp?: string;
  /** List of environment variables. */
  environment_variables?: Record<string, string>;
  /** Is this the SCM site? */
  is_scm_site?: boolean;
  /** Is this a Web Job? */
  is_webjob?: boolean;
  /** Description of process. */
  description?: string;
}

/** Process Thread Information. */
export interface ProcessThreadInfoOutput extends ProxyOnlyResourceOutput {
  /** ProcessThreadInfo resource specific properties */
  properties?: ProcessThreadInfoPropertiesOutput;
}

/** ProcessThreadInfo resource specific properties */
export interface ProcessThreadInfoPropertiesOutput {
  /** Site extension ID. */
  readonly identifier?: number;
  /** HRef URI. */
  href?: string;
  /** Process URI. */
  process?: string;
  /** Start address. */
  start_address?: string;
  /** Current thread priority. */
  current_priority?: number;
  /** Thread priority level. */
  priority_level?: string;
  /** Base priority. */
  base_priority?: number;
  /** Start time. */
  start_time?: string;
  /** Total processor time. */
  total_processor_time?: string;
  /** User processor time. */
  user_processor_time?: string;
  /** Thread state. */
  state?: string;
  /** Wait reason. */
  wait_reason?: string;
}

/** Process Module Information. */
export interface ProcessModuleInfoOutput extends ProxyOnlyResourceOutput {
  /** ProcessModuleInfo resource specific properties */
  properties?: ProcessModuleInfoPropertiesOutput;
}

/** ProcessModuleInfo resource specific properties */
export interface ProcessModuleInfoPropertiesOutput {
  /** Base address. Used as module identifier in ARM resource URI. */
  base_address?: string;
  /** File name. */
  file_name?: string;
  /** HRef URI. */
  href?: string;
  /** File path. */
  file_path?: string;
  /** Module memory size. */
  module_memory_size?: number;
  /** File version. */
  file_version?: string;
  /** File description. */
  file_description?: string;
  /** Product name. */
  product?: string;
  /** Product version. */
  product_version?: string;
  /** Is debug? */
  is_debug?: boolean;
  /** Module language (locale). */
  language?: string;
}

/** Collection of Kudu thread information elements. */
export interface ProcessModuleInfoCollectionOutput {
  /** Collection of resources. */
  value: Array<ProcessModuleInfoOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** Collection of Kudu thread information elements. */
export interface ProcessThreadInfoCollectionOutput {
  /** Collection of resources. */
  value: Array<ProcessThreadInfoOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** Represents whether or not an app is cloneable. */
export interface SiteCloneabilityOutput {
  /** Name of app. */
  result?: "Cloneable" | "PartiallyCloneable" | "NotCloneable";
  /** List of features enabled on app that prevent cloning. */
  blockingFeatures?: Array<SiteCloneabilityCriterionOutput>;
  /**
   * List of features enabled on app that are non-blocking but cannot be cloned. The app can still be cloned
   * but the features in this list will not be set up on cloned app.
   */
  unsupportedFeatures?: Array<SiteCloneabilityCriterionOutput>;
  /** List of blocking application characteristics. */
  blockingCharacteristics?: Array<SiteCloneabilityCriterionOutput>;
}

/** An app cloneability criterion. */
export interface SiteCloneabilityCriterionOutput {
  /** Name of criterion. */
  name?: string;
  /** Description of criterion. */
  description?: string;
}

/** Options for app content migration. */
export interface StorageMigrationOptionsOutput extends ProxyOnlyResourceOutput {
  /** StorageMigrationOptions resource specific properties */
  properties?: StorageMigrationOptionsPropertiesOutput;
}

/** StorageMigrationOptions resource specific properties */
export interface StorageMigrationOptionsPropertiesOutput {
  /** AzureFiles connection string. */
  azurefilesConnectionString: string;
  /** AzureFiles share. */
  azurefilesShare: string;
  /** <code>true</code>if the app should be switched over; otherwise, <code>false</code>. */
  switchSiteAfterMigration?: boolean;
  /** <code>true</code> if the app should be read only during copy operation; otherwise, <code>false</code>. */
  blockWriteAccessToSite?: boolean;
}

/** Response for a migration of app content request. */
export interface StorageMigrationResponseOutput extends ProxyOnlyResourceOutput {
  /** StorageMigrationResponse resource specific properties */
  properties?: StorageMigrationResponsePropertiesOutput;
}

/** StorageMigrationResponse resource specific properties */
export interface StorageMigrationResponsePropertiesOutput {
  /** When server starts the migration process, it will return an operation ID identifying that particular migration operation. */
  readonly operationId?: string;
}

/** MySQL migration request. */
export interface MigrateMySqlRequestOutput extends ProxyOnlyResourceOutput {
  /** MigrateMySqlRequest resource specific properties */
  properties?: MigrateMySqlRequestPropertiesOutput;
}

/** MigrateMySqlRequest resource specific properties */
export interface MigrateMySqlRequestPropertiesOutput {
  /** Connection string to the remote MySQL database. */
  connectionString: string;
  /** The type of migration operation to be done */
  migrationType: "LocalToRemote" | "RemoteToLocal";
}

/** MySQL migration status. */
export interface MigrateMySqlStatusOutput extends ProxyOnlyResourceOutput {
  /** MigrateMySqlStatus resource specific properties */
  properties?: MigrateMySqlStatusPropertiesOutput;
}

/** MigrateMySqlStatus resource specific properties */
export interface MigrateMySqlStatusPropertiesOutput {
  /** Status of the migration task. */
  readonly migrationOperationStatus?:
    | "InProgress"
    | "Failed"
    | "Succeeded"
    | "TimedOut"
    | "Created";
  /** Operation ID for the migration task. */
  readonly operationId?: string;
  /** True if the web app has in app MySql enabled */
  readonly localMySqlEnabled?: boolean;
}

/** Swift Virtual Network Contract. This is used to enable the new Swift way of doing virtual network integration. */
export interface SwiftVirtualNetworkOutput extends ProxyOnlyResourceOutput {
  /** SwiftVirtualNetwork resource specific properties */
  properties?: SwiftVirtualNetworkPropertiesOutput;
}

/** SwiftVirtualNetwork resource specific properties */
export interface SwiftVirtualNetworkPropertiesOutput {
  /** The Virtual Network subnet's resource ID. This is the subnet that this Web App will join. This subnet must have a delegation to Microsoft.Web/serverFarms defined first. */
  subnetResourceId?: string;
  /** A flag that specifies if the scale unit this Web App is on supports Swift integration. */
  swiftSupported?: boolean;
}

/** Full view of network features for an app (presently VNET integration and Hybrid Connections). */
export interface NetworkFeaturesOutput extends ProxyOnlyResourceOutput {
  /** NetworkFeatures resource specific properties */
  properties?: NetworkFeaturesPropertiesOutput;
}

/** NetworkFeatures resource specific properties */
export interface NetworkFeaturesPropertiesOutput {
  /** The Virtual Network name. */
  readonly virtualNetworkName?: string;
  /** The Virtual Network summary view. */
  readonly virtualNetworkConnection?: VnetInfoOutput;
  /** The Hybrid Connections summary view. */
  readonly hybridConnections?: Array<RelayServiceConnectionEntityOutput>;
  /** The Hybrid Connection V2 (Service Bus) view. */
  readonly hybridConnectionsV2?: Array<HybridConnectionOutput>;
}

/** Network trace */
export interface NetworkTraceOutput {
  /** Local file path for the captured network trace file. */
  path?: string;
  /** Current status of the network trace operation, same as Operation.Status (InProgress/Succeeded/Failed). */
  status?: string;
  /** Detailed message of a network trace operation, e.g. error message in case of failure. */
  message?: string;
}

/** Collection of performance monitor counters. */
export interface PerfMonCounterCollectionOutput {
  /** Collection of resources. */
  value: Array<PerfMonResponseOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** Performance monitor API response. */
export interface PerfMonResponseOutput {
  /** The response code. */
  code?: string;
  /** The message. */
  message?: string;
  /** The performance monitor counters. */
  data?: PerfMonSetOutput;
}

/** Metric information. */
export interface PerfMonSetOutput {
  /** Unique key name of the counter. */
  name?: string;
  /** Start time of the period. */
  startTime?: string;
  /** End time of the period. */
  endTime?: string;
  /** Presented time grain. */
  timeGrain?: string;
  /** Collection of workers that are active during this time. */
  values?: Array<PerfMonSampleOutput>;
}

/** Performance monitor sample in a set. */
export interface PerfMonSampleOutput {
  /** Point in time for which counter was measured. */
  time?: string;
  /** Name of the server on which the measurement is made. */
  instanceName?: string;
  /** Value of counter at a certain time. */
  value?: number;
}

/** Used for getting PHP error logging flag. */
export interface SitePhpErrorLogFlagOutput extends ProxyOnlyResourceOutput {
  /** SitePhpErrorLogFlag resource specific properties */
  properties?: SitePhpErrorLogFlagPropertiesOutput;
}

/** SitePhpErrorLogFlag resource specific properties */
export interface SitePhpErrorLogFlagPropertiesOutput {
  /** Local log_errors setting. */
  localLogErrors?: string;
  /** Master log_errors setting. */
  masterLogErrors?: string;
  /** Local log_errors_max_len setting. */
  localLogErrorsMaxLength?: string;
  /** Master log_errors_max_len setting. */
  masterLogErrorsMaxLength?: string;
}

/** Premier add-on. */
export interface PremierAddOnOutput extends ResourceOutput {
  /** PremierAddOn resource specific properties */
  properties?: PremierAddOnPropertiesOutput;
}

/** PremierAddOn resource specific properties */
export interface PremierAddOnPropertiesOutput {
  /** Premier add on SKU. */
  sku?: string;
  /** Premier add on Product. */
  product?: string;
  /** Premier add on Vendor. */
  vendor?: string;
  /** Premier add on Marketplace publisher. */
  marketplacePublisher?: string;
  /** Premier add on Marketplace offer. */
  marketplaceOffer?: string;
}

/** ARM resource for a PremierAddOn. */
export interface PremierAddOnPatchResourceOutput extends ProxyOnlyResourceOutput {
  /** PremierAddOnPatchResource resource specific properties */
  properties?: PremierAddOnPatchResourcePropertiesOutput;
}

/** PremierAddOnPatchResource resource specific properties */
export interface PremierAddOnPatchResourcePropertiesOutput {
  /** Premier add on SKU. */
  sku?: string;
  /** Premier add on Product. */
  product?: string;
  /** Premier add on Vendor. */
  vendor?: string;
  /** Premier add on Marketplace publisher. */
  marketplacePublisher?: string;
  /** Premier add on Marketplace offer. */
  marketplaceOffer?: string;
}

/** Description of the parameters of Private Access for a Web Site. */
export interface PrivateAccessOutput extends ProxyOnlyResourceOutput {
  /** PrivateAccess resource specific properties */
  properties?: PrivateAccessPropertiesOutput;
}

/** PrivateAccess resource specific properties */
export interface PrivateAccessPropertiesOutput {
  /** Whether private access is enabled or not. */
  enabled?: boolean;
  /** The Virtual Networks (and subnets) allowed to access the site privately. */
  virtualNetworks?: Array<PrivateAccessVirtualNetworkOutput>;
}

/** Description of a Virtual Network that is useable for private site access. */
export interface PrivateAccessVirtualNetworkOutput {
  /** The name of the Virtual Network. */
  name?: string;
  /** The key (ID) of the Virtual Network. */
  key?: number;
  /** The ARM uri of the Virtual Network */
  resourceId?: string;
  /** A List of subnets that access is allowed to on this Virtual Network. An empty array (but not null) is interpreted to mean that all subnets are allowed within this Virtual Network. */
  subnets?: Array<PrivateAccessSubnetOutput>;
}

/** Description of a Virtual Network subnet that is useable for private site access. */
export interface PrivateAccessSubnetOutput {
  /** The name of the subnet. */
  name?: string;
  /** The key (ID) of the subnet. */
  key?: number;
}

/** Collection of public certificates */
export interface PublicCertificateCollectionOutput {
  /** Collection of resources. */
  value: Array<PublicCertificateOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** Public certificate object */
export interface PublicCertificateOutput extends ProxyOnlyResourceOutput {
  /** PublicCertificate resource specific properties */
  properties?: PublicCertificatePropertiesOutput;
}

/** PublicCertificate resource specific properties */
export interface PublicCertificatePropertiesOutput {
  /**
   * Public Certificate byte array
   *
   * Value may contain base64 encoded characters
   */
  blob?: string;
  /** Public Certificate Location */
  publicCertificateLocation?: "CurrentUserMy" | "LocalMachineMy" | "Unknown";
  /** Certificate Thumbprint */
  readonly thumbprint?: string;
}

/** Details about restoring a deleted app. */
export interface DeletedAppRestoreRequestOutput extends ProxyOnlyResourceOutput {
  /** DeletedAppRestoreRequest resource specific properties */
  properties?: DeletedAppRestoreRequestPropertiesOutput;
}

/** DeletedAppRestoreRequest resource specific properties */
export interface DeletedAppRestoreRequestPropertiesOutput {
  /**
   * ARM resource ID of the deleted app. Example:
   * /subscriptions/{subId}/providers/Microsoft.Web/deletedSites/{deletedSiteId}
   */
  deletedSiteId?: string;
  /** If true, deleted site configuration, in addition to content, will be restored. */
  recoverConfiguration?: boolean;
  /**
   * Point in time to restore the deleted app from, formatted as a DateTime string.
   * If unspecified, default value is the time that the app was deleted.
   */
  snapshotTime?: string;
  /** If true, the snapshot is retrieved from DRSecondary endpoint. */
  useDRSecondary?: boolean;
}

/** Details about app recovery operation. */
export interface SnapshotRestoreRequestOutput extends ProxyOnlyResourceOutput {
  /** SnapshotRestoreRequest resource specific properties */
  properties?: SnapshotRestoreRequestPropertiesOutput;
}

/** SnapshotRestoreRequest resource specific properties */
export interface SnapshotRestoreRequestPropertiesOutput {
  /** Point in time in which the app restore should be done, formatted as a DateTime string. */
  snapshotTime?: string;
  /**
   * Optional. Specifies the web app that snapshot contents will be retrieved from.
   * If empty, the targeted web app will be used as the source.
   */
  recoverySource?: SnapshotRecoverySourceOutput;
  /** If <code>true</code> the restore operation can overwrite source app; otherwise, <code>false</code>. */
  overwrite: boolean;
  /** If true, site configuration, in addition to content, will be reverted. */
  recoverConfiguration?: boolean;
  /**
   * If true, custom hostname conflicts will be ignored when recovering to a target web app.
   * This setting is only necessary when RecoverConfiguration is enabled.
   */
  ignoreConflictingHostNames?: boolean;
  /** If true, the snapshot is retrieved from DRSecondary endpoint. */
  useDRSecondary?: boolean;
}

/** Specifies the web app that snapshot contents will be retrieved from. */
export interface SnapshotRecoverySourceOutput {
  /** Geographical location of the source web app, e.g. SouthEastAsia, SouthCentralUS */
  location?: string;
  /**
   * ARM resource ID of the source app.
   * /subscriptions/{subId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{siteName} for production slots and
   * /subscriptions/{subId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{siteName}/slots/{slotName} for other slots.
   */
  id?: string;
}

/** Collection of Kudu site extension information elements. */
export interface SiteExtensionInfoCollectionOutput {
  /** Collection of resources. */
  value: Array<SiteExtensionInfoOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** Site Extension Information. */
export interface SiteExtensionInfoOutput extends ProxyOnlyResourceOutput {
  /** SiteExtensionInfo resource specific properties */
  properties?: SiteExtensionInfoPropertiesOutput;
}

/** SiteExtensionInfo resource specific properties */
export interface SiteExtensionInfoPropertiesOutput {
  /** Site extension ID. */
  extension_id?: string;
  title?: string;
  /** Site extension type. */
  extension_type?: "Gallery" | "WebRoot";
  /** Summary description. */
  summary?: string;
  /** Detailed description. */
  description?: string;
  /** Version information. */
  version?: string;
  /** Extension URL. */
  extension_url?: string;
  /** Project URL. */
  project_url?: string;
  /** Icon URL. */
  icon_url?: string;
  /** License URL. */
  license_url?: string;
  /** Feed URL. */
  feed_url?: string;
  /** List of authors. */
  authors?: Array<string>;
  /** Installer command line parameters. */
  installer_command_line_params?: string;
  /** Published timestamp. */
  published_date_time?: string;
  /** Count of downloads. */
  download_count?: number;
  /** <code>true</code> if the local version is the latest version; <code>false</code> otherwise. */
  local_is_latest_version?: boolean;
  /** Local path. */
  local_path?: string;
  /** Installed timestamp. */
  installed_date_time?: string;
  /** Provisioning state. */
  provisioningState?: string;
  /** Site Extension comment. */
  comment?: string;
}

/** Collection of slot differences. */
export interface SlotDifferenceCollectionOutput {
  /** Collection of resources. */
  value: Array<SlotDifferenceOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** A setting difference between two deployment slots of an app. */
export interface SlotDifferenceOutput extends ProxyOnlyResourceOutput {
  /** SlotDifference resource specific properties */
  properties?: SlotDifferencePropertiesOutput;
}

/** SlotDifference resource specific properties */
export interface SlotDifferencePropertiesOutput {
  /** Level of the difference: Information, Warning or Error. */
  readonly level?: string;
  /** The type of the setting: General, AppSetting or ConnectionString. */
  readonly settingType?: string;
  /** Rule that describes how to process the setting difference during a slot swap. */
  readonly diffRule?: string;
  /** Name of the setting. */
  readonly settingName?: string;
  /** Value of the setting in the current slot. */
  readonly valueInCurrentSlot?: string;
  /** Value of the setting in the target slot. */
  readonly valueInTargetSlot?: string;
  /** Description of the setting difference. */
  readonly description?: string;
}

/** Collection of snapshots which can be used to revert an app to a previous time. */
export interface SnapshotCollectionOutput {
  /** Collection of resources. */
  value: Array<SnapshotOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** Source control configuration for an app. */
export interface SiteSourceControlOutput extends ProxyOnlyResourceOutput {
  /** SiteSourceControl resource specific properties */
  properties?: SiteSourceControlPropertiesOutput;
}

/** SiteSourceControl resource specific properties */
export interface SiteSourceControlPropertiesOutput {
  /** Repository or source control URL. */
  repoUrl?: string;
  /** Name of branch to use for deployment. */
  branch?: string;
  /** <code>true</code> to limit to manual integration; <code>false</code> to enable continuous integration (which configures webhooks into online repos like GitHub). */
  isManualIntegration?: boolean;
  /** <code>true</code> if this is deployed via GitHub action. */
  isGitHubAction?: boolean;
  /** <code>true</code> to enable deployment rollback; otherwise, <code>false</code>. */
  deploymentRollbackEnabled?: boolean;
  /** <code>true</code> for a Mercurial repository; <code>false</code> for a Git repository. */
  isMercurial?: boolean;
  /** If GitHub Action is selected, than the associated configuration. */
  gitHubActionConfiguration?: GitHubActionConfigurationOutput;
}

/** The GitHub action configuration. */
export interface GitHubActionConfigurationOutput {
  /** GitHub Action code configuration. */
  codeConfiguration?: GitHubActionCodeConfigurationOutput;
  /** GitHub Action container configuration. */
  containerConfiguration?: GitHubActionContainerConfigurationOutput;
  /** This will help determine the workflow configuration to select. */
  isLinux?: boolean;
  /** Workflow option to determine whether the workflow file should be generated and written to the repository. */
  generateWorkflowFile?: boolean;
}

/** The GitHub action code configuration. */
export interface GitHubActionCodeConfigurationOutput {
  /** Runtime stack is used to determine the workflow file content for code base apps. */
  runtimeStack?: string;
  /** Runtime version is used to determine what build version to set in the workflow file. */
  runtimeVersion?: string;
}

/** The GitHub action container configuration. */
export interface GitHubActionContainerConfigurationOutput {
  /** The server URL for the container registry where the build will be hosted. */
  serverUrl?: string;
  /** The image name for the build. */
  imageName?: string;
  /** The username used to upload the image to the container registry. */
  username?: string;
  /** The password used to upload the image to the container registry. */
  password?: string;
}

/** Collection of Kudu continuous web job information elements. */
export interface TriggeredWebJobCollectionOutput {
  /** Collection of resources. */
  value: Array<TriggeredWebJobOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** Triggered Web Job Information. */
export interface TriggeredWebJobOutput extends ProxyOnlyResourceOutput {
  /** TriggeredWebJob resource specific properties */
  properties?: TriggeredWebJobPropertiesOutput;
}

/** TriggeredWebJob resource specific properties */
export interface TriggeredWebJobPropertiesOutput {
  /** Latest job run information. */
  latest_run?: TriggeredJobRunOutput;
  /** History URL. */
  history_url?: string;
  /** Scheduler Logs URL. */
  scheduler_logs_url?: string;
  /** Run command. */
  run_command?: string;
  /** Job URL. */
  url?: string;
  /** Extra Info URL. */
  extra_info_url?: string;
  /** Job type. */
  web_job_type?: "Continuous" | "Triggered";
  /** Error information. */
  error?: string;
  /** Using SDK? */
  using_sdk?: boolean;
  /** Job settings. */
  settings?: Record<string, Record<string, unknown>>;
}

/** Triggered Web Job Run Information. */
export interface TriggeredJobRunOutput {
  /** Job ID. */
  web_job_id?: string;
  /** Job name. */
  web_job_name?: string;
  /** Job status. */
  status?: "Success" | "Failed" | "Error";
  /** Start time. */
  start_time?: string;
  /** End time. */
  end_time?: string;
  /** Job duration. */
  duration?: string;
  /** Output URL. */
  output_url?: string;
  /** Error URL. */
  error_url?: string;
  /** Job URL. */
  url?: string;
  /** Job name. */
  job_name?: string;
  /** Job trigger. */
  trigger?: string;
}

/** Collection of Kudu continuous web job information elements. */
export interface TriggeredJobHistoryCollectionOutput {
  /** Collection of resources. */
  value: Array<TriggeredJobHistoryOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** Triggered Web Job History. List of Triggered Web Job Run Information elements. */
export interface TriggeredJobHistoryOutput extends ProxyOnlyResourceOutput {
  /** TriggeredJobHistory resource specific properties */
  properties?: TriggeredJobHistoryPropertiesOutput;
}

/** TriggeredJobHistory resource specific properties */
export interface TriggeredJobHistoryPropertiesOutput {
  /** List of triggered web job runs. */
  runs?: Array<TriggeredJobRunOutput>;
}

/** Collection of Kudu web job information elements. */
export interface WebJobCollectionOutput {
  /** Collection of resources. */
  value: Array<WebJobOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** Web Job Information. */
export interface WebJobOutput extends ProxyOnlyResourceOutput {
  /** WebJob resource specific properties */
  properties?: WebJobPropertiesOutput;
}

/** WebJob resource specific properties */
export interface WebJobPropertiesOutput {
  /** Run command. */
  run_command?: string;
  /** Job URL. */
  url?: string;
  /** Extra Info URL. */
  extra_info_url?: string;
  /** Job type. */
  web_job_type?: "Continuous" | "Triggered";
  /** Error information. */
  error?: string;
  /** Using SDK? */
  using_sdk?: boolean;
  /** Job settings. */
  settings?: Record<string, Record<string, unknown>>;
}
