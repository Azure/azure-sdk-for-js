// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** SSL certificate purchase order. */
export interface AppServiceCertificateOrder extends Resource {
  /** AppServiceCertificateOrder resource specific properties */
  properties?: AppServiceCertificateOrderProperties;
}

/** AppServiceCertificateOrder resource specific properties */
export interface AppServiceCertificateOrderProperties {
  /** State of the Key Vault secret. */
  certificates?: Record<string, AppServiceCertificate>;
  /** Certificate distinguished name. */
  distinguishedName?: string;
  /** Duration in years (must be 1). */
  validityInYears?: number;
  /** Certificate key size. */
  keySize?: number;
  /** Certificate product type. */
  productType: "StandardDomainValidatedSsl" | "StandardDomainValidatedWildCardSsl";
  /** <code>true</code> if the certificate should be automatically renewed when it expires; otherwise, <code>false</code>. */
  autoRenew?: boolean;
  /** Last CSR that was created for this order. */
  csr?: string;
}

/** Key Vault container for a certificate that is purchased through Azure. */
export interface AppServiceCertificate {
  /** Key Vault resource Id. */
  keyVaultId?: string;
  /** Key Vault secret name. */
  keyVaultSecretName?: string;
}

/** SSL certificate details. */
export interface CertificateDetails {}

export interface CertificateOrderContact {
  email?: string;
  nameFirst?: string;
  nameLast?: string;
  phone?: string;
}

/** Azure resource. This resource is tracked in Azure Resource Manager */
export interface Resource {
  /** Kind of resource. */
  kind?: string;
  /** Resource Location. */
  location: string;
  /** Resource tags. */
  tags?: Record<string, string>;
}

/** ARM resource for a certificate order that is purchased through Azure. */
export interface AppServiceCertificateOrderPatchResource extends ProxyOnlyResource {
  /** AppServiceCertificateOrderPatchResource resource specific properties */
  properties?: AppServiceCertificateOrderPatchResourceProperties;
}

/** AppServiceCertificateOrderPatchResource resource specific properties */
export interface AppServiceCertificateOrderPatchResourceProperties {
  /** State of the Key Vault secret. */
  certificates?: Record<string, AppServiceCertificate>;
  /** Certificate distinguished name. */
  distinguishedName?: string;
  /** Duration in years (must be 1). */
  validityInYears?: number;
  /** Certificate key size. */
  keySize?: number;
  /** Certificate product type. */
  productType: "StandardDomainValidatedSsl" | "StandardDomainValidatedWildCardSsl";
  /** <code>true</code> if the certificate should be automatically renewed when it expires; otherwise, <code>false</code>. */
  autoRenew?: boolean;
  /** Last CSR that was created for this order. */
  csr?: string;
}

/** Azure proxy only resource. This resource is not tracked by Azure Resource Manager. */
export interface ProxyOnlyResource {
  /** Kind of resource. */
  kind?: string;
}

/** Key Vault container ARM resource for a certificate that is purchased through Azure. */
export interface AppServiceCertificateResource extends Resource {
  /** Core resource properties */
  properties?: AppServiceCertificate;
}

/** Key Vault container ARM resource for a certificate that is purchased through Azure. */
export interface AppServiceCertificatePatchResource extends ProxyOnlyResource {
  /** Core resource properties */
  properties?: AppServiceCertificate;
}

/** Class representing certificate reissue request. */
export interface ReissueCertificateOrderRequest extends ProxyOnlyResource {
  /** ReissueCertificateOrderRequest resource specific properties */
  properties?: ReissueCertificateOrderRequestProperties;
}

/** ReissueCertificateOrderRequest resource specific properties */
export interface ReissueCertificateOrderRequestProperties {
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
export interface RenewCertificateOrderRequest extends ProxyOnlyResource {
  /** RenewCertificateOrderRequest resource specific properties */
  properties?: RenewCertificateOrderRequestProperties;
}

/** RenewCertificateOrderRequest resource specific properties */
export interface RenewCertificateOrderRequestProperties {
  /** Certificate Key Size. */
  keySize?: number;
  /** Csr to be used for re-key operation. */
  csr?: string;
  /** Should we change the ASC type (from managed private key to external private key and vice versa). */
  isPrivateKeyExternal?: boolean;
}

/** Identifies an object. */
export interface NameIdentifier {
  /** Name of the object. */
  name?: string;
}

/** Site seal request. */
export interface SiteSealRequest {
  /** If <code>true</code> use the light color theme for site seal; otherwise, use the default color theme. */
  lightTheme?: boolean;
  /** Locale of site seal. */
  locale?: string;
}

/** Certificate order action. */
export interface CertificateOrderAction extends ProxyOnlyResource {
  /** CertificateOrderAction resource specific properties */
  properties?: CertificateOrderActionProperties;
}

/** CertificateOrderAction resource specific properties */
export interface CertificateOrderActionProperties {}

/** SSL certificate email. */
export interface CertificateEmail extends ProxyOnlyResource {
  /** CertificateEmail resource specific properties */
  properties?: CertificateEmailProperties;
}

/** CertificateEmail resource specific properties */
export interface CertificateEmailProperties {
  /** Email id. */
  emailId?: string;
  /** Time stamp. */
  timeStamp?: Date | string;
}

/** Class representing Response from Detector */
export interface DetectorResponse extends ProxyOnlyResource {
  /** DetectorResponse resource specific properties */
  properties?: DetectorResponseProperties;
}

/** DetectorResponse resource specific properties */
export interface DetectorResponseProperties {
  /** metadata for the detector */
  metadata?: DetectorInfo;
  /** Data Set */
  dataset?: Array<DiagnosticData>;
  /** Indicates status of the most severe insight. */
  status?: Status;
  /** Additional configuration for different data providers to be used by the UI */
  dataProvidersMetadata?: Array<DataProviderMetadata>;
  /** Suggested utterances where the detector can be applicable. */
  suggestedUtterances?: QueryUtterancesResults;
}

/** Definition of Detector */
export interface DetectorInfo {}

/** Defines a unique Support Topic */
export interface SupportTopic {}

/** Set of data with rendering instructions */
export interface DiagnosticData {
  /** Data in table form */
  table?: DataTableResponseObject;
  /** Properties that describe how the table should be rendered */
  renderingProperties?: Rendering;
}

/** Data Table which defines columns and raw row values */
export interface DataTableResponseObject {
  /** Name of the table */
  tableName?: string;
  /** List of columns with data types */
  columns?: Array<DataTableResponseColumn>;
  /** Raw row values */
  rows?: Array<Array<string>>;
}

/** Column definition */
export interface DataTableResponseColumn {
  /** Name of the column */
  columnName?: string;
  /** Data type which looks like 'String' or 'Int32'. */
  dataType?: string;
  /** Column Type */
  columnType?: string;
}

/** Instructions for rendering the data */
export interface Rendering {
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
export interface Status {
  /** Descriptive message. */
  message?: string;
  /** Level of the most severe insight generated by the detector. */
  statusId?: "Critical" | "Warning" | "Info" | "Success" | "None";
}

/** Additional configuration for a data providers */
export interface DataProviderMetadata {
  providerName?: string;
}

export interface KeyValuePairStringObject {}

/** Suggested utterances where the detector can be applicable */
export interface QueryUtterancesResults {
  /** Search Query. */
  query?: string;
  /** Array of utterance results for search query. */
  results?: Array<QueryUtterancesResult>;
}

/** Result for utterances query. */
export interface QueryUtterancesResult {
  /** A sample utterance. */
  sampleUtterance?: SampleUtterance;
  /** Score of a sample utterance. */
  score?: number;
}

/** Sample utterance. */
export interface SampleUtterance {
  /** Text attribute of sample utterance. */
  text?: string;
  /** Links attribute of sample utterance. */
  links?: Array<string>;
  /** Question id of sample utterance (for stackoverflow questions titles). */
  qid?: string;
}

/** Information about a domain. */
export interface Domain extends Resource {
  /** Domain resource specific properties */
  properties?: DomainProperties;
}

/** Domain resource specific properties */
export interface DomainProperties {
  /** Administrative contact. */
  contactAdmin: Contact;
  /** Billing contact. */
  contactBilling: Contact;
  /** Registrant contact. */
  contactRegistrant: Contact;
  /** Technical contact. */
  contactTech: Contact;
  /** <code>true</code> if domain privacy is enabled for this domain; otherwise, <code>false</code>. */
  privacy?: boolean;
  /** <code>true</code> if the domain should be automatically renewed; otherwise, <code>false</code>. */
  autoRenew?: boolean;
  /** Legal agreement consent. */
  consent: DomainPurchaseConsent;
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
export interface Contact {
  /** Mailing address. */
  addressMailing?: Address;
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
export interface Address {
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
export interface HostName {
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
export interface DomainPurchaseConsent {
  /** List of applicable legal agreement keys. This list can be retrieved using ListLegalAgreements API under <code>TopLevelDomain</code> resource. */
  agreementKeys?: Array<string>;
  /** Client IP address. */
  agreedBy?: string;
  /** Timestamp when the agreements were accepted. */
  agreedAt?: Date | string;
}

/** Domain recommendation search parameters. */
export interface DomainRecommendationSearchParameters {
  /** Keywords to be used for generating domain recommendations. */
  keywords?: string;
  /** Maximum number of recommendations. */
  maxDomainRecommendations?: number;
}

/** ARM resource for a domain. */
export interface DomainPatchResource extends ProxyOnlyResource {
  /** DomainPatchResource resource specific properties */
  properties?: DomainPatchResourceProperties;
}

/** DomainPatchResource resource specific properties */
export interface DomainPatchResourceProperties {
  /** Administrative contact. */
  contactAdmin: Contact;
  /** Billing contact. */
  contactBilling: Contact;
  /** Registrant contact. */
  contactRegistrant: Contact;
  /** Technical contact. */
  contactTech: Contact;
  /** <code>true</code> if domain privacy is enabled for this domain; otherwise, <code>false</code>. */
  privacy?: boolean;
  /** <code>true</code> if the domain should be automatically renewed; otherwise, <code>false</code>. */
  autoRenew?: boolean;
  /** Legal agreement consent. */
  consent: DomainPurchaseConsent;
  /** Current DNS type */
  dnsType?: "AzureDns" | "DefaultDomainRegistrarDns";
  /** Azure DNS Zone to use */
  dnsZoneId?: string;
  /** Target DNS type (would be used for migration) */
  targetDnsType?: "AzureDns" | "DefaultDomainRegistrarDns";
  authCode?: string;
}

/** Domain ownership Identifier. */
export interface DomainOwnershipIdentifier extends ProxyOnlyResource {
  /** DomainOwnershipIdentifier resource specific properties */
  properties?: DomainOwnershipIdentifierProperties;
}

/** DomainOwnershipIdentifier resource specific properties */
export interface DomainOwnershipIdentifierProperties {
  /** Ownership Id. */
  ownershipId?: string;
}

/** A top level domain object. */
export interface TopLevelDomain extends ProxyOnlyResource {
  /** TopLevelDomain resource specific properties */
  properties?: TopLevelDomainProperties;
}

/** TopLevelDomain resource specific properties */
export interface TopLevelDomainProperties {
  /** If <code>true</code>, then the top level domain supports domain privacy; otherwise, <code>false</code>. */
  privacy?: boolean;
}

/** Options for retrieving the list of top level domain legal agreements. */
export interface TopLevelDomainAgreementOption {
  /** If <code>true</code>, then the list of agreements will include agreements for domain privacy as well; otherwise, <code>false</code>. */
  includePrivacy?: boolean;
  /** If <code>true</code>, then the list of agreements will include agreements for domain transfer as well; otherwise, <code>false</code>. */
  forTransfer?: boolean;
}

/** App Service Environment ARM resource. */
export interface AppServiceEnvironmentResource extends Resource {
  /** Core resource properties */
  properties?: AppServiceEnvironment;
}

/** Description of an App Service Environment. */
export interface AppServiceEnvironment {
  /** Description of the Virtual Network. */
  virtualNetwork: VirtualNetworkProfile;
  /** Specifies which endpoints to serve internally in the Virtual Network for the App Service Environment. */
  internalLoadBalancingMode?: "None" | "Web" | "Publishing" | "Web, Publishing";
  /** Front-end VM size, e.g. "Medium", "Large". */
  multiSize?: string;
  /** Number of IP SSL addresses reserved for the App Service Environment. */
  ipsslAddressCount?: number;
  /** DNS suffix of the App Service Environment. */
  dnsSuffix?: string;
  /** Scale factor for front-ends. */
  frontEndScaleFactor?: number;
  /** Custom settings for changing the behavior of the App Service Environment. */
  clusterSettings?: Array<NameValuePair>;
  /** User added ip ranges to whitelist on ASE db */
  userWhitelistedIpRanges?: Array<string>;
  /** Dedicated Host Count */
  dedicatedHostCount?: number;
  /** Whether or not this App Service Environment is zone-redundant. */
  zoneRedundant?: boolean;
}

/** Specification for using a Virtual Network. */
export interface VirtualNetworkProfile {
  /** Resource id of the Virtual Network. */
  id: string;
  /** Subnet within the Virtual Network. */
  subnet?: string;
}

/** Name value pair. */
export interface NameValuePair {
  /** Pair name. */
  name?: string;
  /** Pair value. */
  value?: string;
}

/** ARM resource for a app service environment. */
export interface AppServiceEnvironmentPatchResource extends ProxyOnlyResource {
  /** Core resource properties */
  properties?: AppServiceEnvironment;
}

/** Describes main public IP address and any extra virtual IPs. */
export interface AddressResponse extends ProxyOnlyResource {
  /** AddressResponse resource specific properties */
  properties?: AddressResponseProperties;
}

/** AddressResponse resource specific properties */
export interface AddressResponseProperties {
  /** Main public virtual IP. */
  serviceIpAddress?: string;
  /** Virtual Network internal IP address of the App Service Environment if it is in internal load-balancing mode. */
  internalIpAddress?: string;
  /** IP addresses appearing on outbound connections. */
  outboundIpAddresses?: Array<string>;
  /** Additional virtual IPs. */
  vipMappings?: Array<VirtualIPMapping>;
}

/** Virtual IP mapping. */
export interface VirtualIPMapping {
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

/** A web app, a mobile app backend, or an API app. */
export interface Site extends Resource {
  /** Site resource specific properties */
  properties?: SiteProperties;
  /** Managed service identity. */
  identity?: ManagedServiceIdentity;
  /** Extended Location. */
  extendedLocation?: ExtendedLocation;
}

/** Site resource specific properties */
export interface SiteProperties {
  /** <code>true</code> if the app is enabled; otherwise, <code>false</code>. Setting this value to false disables the app (takes the app offline). */
  enabled?: boolean;
  /** Hostname SSL states are used to manage the SSL bindings for app's hostnames. */
  hostNameSslStates?: Array<HostNameSslState>;
  /** Resource ID of the associated App Service plan, formatted as: "/subscriptions/{subscriptionID}/resourceGroups/{groupName}/providers/Microsoft.Web/serverfarms/{appServicePlanName}". */
  serverFarmId?: string;
  /** <code>true</code> if reserved; otherwise, <code>false</code>. */
  reserved?: boolean;
  /** Obsolete: Hyper-V sandbox. */
  isXenon?: boolean;
  /** Hyper-V sandbox. */
  hyperV?: boolean;
  /** Configuration of the app. */
  siteConfig?: SiteConfig;
  /** <code>true</code> to stop SCM (KUDU) site when the app is stopped; otherwise, <code>false</code>. The default is <code>false</code>. */
  scmSiteAlsoStopped?: boolean;
  /** App Service Environment to use for the app. */
  hostingEnvironmentProfile?: HostingEnvironmentProfile;
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
  /** Size of the function container. */
  containerSize?: number;
  /** Maximum allowed daily memory-time quota (applicable on dynamic apps only). */
  dailyMemoryTimeQuota?: number;
  /** If specified during app creation, the app is cloned from a source app. */
  cloningInfo?: CloningInfo;
  /**
   * HttpsOnly: configures a web site to accept only https requests. Issues redirect for
   * http requests
   */
  httpsOnly?: boolean;
  /** Site redundancy mode */
  redundancyMode?: "None" | "Manual" | "Failover" | "ActiveActive" | "GeoRedundant";
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
export interface HostNameSslState {
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
export interface SiteConfig {
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
  requestTracingExpirationTime?: Date | string;
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
  appSettings?: Array<NameValuePair>;
  /** Connection strings. */
  connectionStrings?: Array<ConnStringInfo>;
  /** Handler mappings. */
  handlerMappings?: Array<HandlerMapping>;
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
  virtualApplications?: Array<VirtualApplication>;
  /** Site load balancing. */
  loadBalancing?:
    | "WeightedRoundRobin"
    | "LeastRequests"
    | "LeastResponseTime"
    | "WeightedTotalTraffic"
    | "RequestHash"
    | "PerSiteRoundRobin";
  /** This is work around for polymorphic types. */
  experiments?: Experiments;
  /** Site limits. */
  limits?: SiteLimits;
  /** <code>true</code> if Auto Heal is enabled; otherwise, <code>false</code>. */
  autoHealEnabled?: boolean;
  /** Auto Heal rules. */
  autoHealRules?: AutoHealRules;
  /** Tracing options. */
  tracingOptions?: string;
  /** Virtual Network name. */
  vnetName?: string;
  /** Virtual Network Route All enabled. This causes all outbound traffic to have Virtual Network Security Groups and User Defined Routes applied. */
  vnetRouteAllEnabled?: boolean;
  /** The number of private ports assigned to this app. These will be assigned dynamically on runtime. */
  vnetPrivatePortsCount?: number;
  /** Cross-Origin Resource Sharing (CORS) settings. */
  cors?: CorsSettings;
  /** Push endpoint settings. */
  push?: PushSettings;
  /** Information about the formal API definition for the app. */
  apiDefinition?: ApiDefinitionInfo;
  /** Azure API management settings linked to the app. */
  apiManagementConfig?: ApiManagementConfig;
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
  ipSecurityRestrictions?: Array<IpSecurityRestriction>;
  /** IP security restrictions for scm. */
  scmIpSecurityRestrictions?: Array<IpSecurityRestriction>;
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
  azureStorageAccounts?: Record<string, AzureStorageInfoValue>;
  /** Property to allow or block all public traffic. */
  publicNetworkAccess?: string;
}

/** Database connection string information. */
export interface ConnStringInfo {
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
export interface SiteMachineKey {
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
export interface HandlerMapping {
  /** Requests with this extension will be handled using the specified FastCGI application. */
  extension?: string;
  /** The absolute path to the FastCGI application. */
  scriptProcessor?: string;
  /** Command-line arguments to be passed to the script processor. */
  arguments?: string;
}

/** Virtual application in an app. */
export interface VirtualApplication {
  /** Virtual path. */
  virtualPath?: string;
  /** Physical path. */
  physicalPath?: string;
  /** <code>true</code> if preloading is enabled; otherwise, <code>false</code>. */
  preloadEnabled?: boolean;
  /** Virtual directories for virtual application. */
  virtualDirectories?: Array<VirtualDirectory>;
}

/** Directory for virtual application. */
export interface VirtualDirectory {
  /** Path to virtual application. */
  virtualPath?: string;
  /** Physical path. */
  physicalPath?: string;
}

/** Routing rules in production experiments. */
export interface Experiments {
  /** List of ramp-up rules. */
  rampUpRules?: Array<RampUpRule>;
}

/** Routing rules for ramp up testing. This rule allows to redirect static traffic % to a slot or to gradually change routing % based on performance. */
export interface RampUpRule {
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
export interface SiteLimits {
  /** Maximum allowed CPU usage percentage. */
  maxPercentageCpu?: number;
  /** Maximum allowed memory usage in MB. */
  maxMemoryInMb?: number;
  /** Maximum allowed disk size usage in MB. */
  maxDiskSizeInMb?: number;
}

/** Rules that can be defined for auto-heal. */
export interface AutoHealRules {
  /** Conditions that describe when to execute the auto-heal actions. */
  triggers?: AutoHealTriggers;
  /** Actions to be executed when a rule is triggered. */
  actions?: AutoHealActions;
}

/** Triggers for auto-heal. */
export interface AutoHealTriggers {
  /** A rule based on total requests. */
  requests?: RequestsBasedTrigger;
  /** A rule based on private bytes. */
  privateBytesInKB?: number;
  /** A rule based on status codes. */
  statusCodes?: Array<StatusCodesBasedTrigger>;
  /** A rule based on request execution time. */
  slowRequests?: SlowRequestsBasedTrigger;
  /** A rule based on multiple Slow Requests Rule with path */
  slowRequestsWithPath?: Array<SlowRequestsBasedTrigger>;
  /** A rule based on status codes ranges. */
  statusCodesRange?: Array<StatusCodesRangeBasedTrigger>;
}

/** Trigger based on total requests. */
export interface RequestsBasedTrigger {
  /** Request Count. */
  count?: number;
  /** Time interval. */
  timeInterval?: string;
}

/** Trigger based on status code. */
export interface StatusCodesBasedTrigger {
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
export interface SlowRequestsBasedTrigger {
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
export interface StatusCodesRangeBasedTrigger {
  /** HTTP status code. */
  statusCodes?: string;
  path?: string;
  /** Request Count. */
  count?: number;
  /** Time interval. */
  timeInterval?: string;
}

/** Actions which to take by the auto-heal module when a rule is triggered. */
export interface AutoHealActions {
  /** Predefined action to be taken. */
  actionType?: "Recycle" | "LogEvent" | "CustomAction";
  /** Custom action to be taken. */
  customAction?: AutoHealCustomAction;
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
export interface AutoHealCustomAction {
  /** Executable to be run. */
  exe?: string;
  /** Parameters for the executable. */
  parameters?: string;
}

/** Cross-Origin Resource Sharing (CORS) settings for the app. */
export interface CorsSettings {
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
export interface PushSettings extends ProxyOnlyResource {
  /** PushSettings resource specific properties */
  properties?: PushSettingsProperties;
}

/** PushSettings resource specific properties */
export interface PushSettingsProperties {
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
export interface ApiDefinitionInfo {
  /** The URL of the API definition. */
  url?: string;
}

/** Azure API management (APIM) configuration linked to the app. */
export interface ApiManagementConfig {
  /** APIM-Api Identifier. */
  id?: string;
}

/** IP security restriction on an app. */
export interface IpSecurityRestriction {
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
export interface AzureStorageInfoValue {
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
}

/** Specification for an App Service Environment to use for this resource. */
export interface HostingEnvironmentProfile {
  /** Resource ID of the App Service Environment. */
  id?: string;
}

/** Information needed for cloning operation. */
export interface CloningInfo {
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
export interface SlotSwapStatus {}

/** Managed service identity. */
export interface ManagedServiceIdentity {
  /** Type of managed service identity. */
  type?: "SystemAssigned" | "UserAssigned" | "SystemAssigned, UserAssigned" | "None";
  /** The list of user assigned identities associated with the resource. The user identity dictionary key references will be ARM resource ids in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName} */
  userAssignedIdentities?: Record<string, UserAssignedIdentity>;
}

/** User Assigned identity. */
export interface UserAssignedIdentity {}

/** Extended Location. */
export interface ExtendedLocation {
  /** Name of extended location. */
  name?: string;
}

/** Full view of networking configuration for an ASE. */
export interface AseV3NetworkingConfiguration extends ProxyOnlyResource {
  /** AseV3NetworkingConfiguration resource specific properties */
  properties?: AseV3NetworkingConfigurationProperties;
}

/** AseV3NetworkingConfiguration resource specific properties */
export interface AseV3NetworkingConfigurationProperties {
  /** Property to enable and disable new private endpoint connection creation on ASE */
  allowNewPrivateEndpointConnections?: boolean;
}

/** Worker pool of an App Service Environment ARM resource. */
export interface WorkerPoolResource extends ProxyOnlyResource {
  /** Core resource properties */
  properties?: WorkerPool;
  /** Description of a SKU for a scalable resource. */
  sku?: SkuDescription;
}

/** Worker pool of an App Service Environment. */
export interface WorkerPool {
  /** Worker size ID for referencing this worker pool. */
  workerSizeId?: number;
  /** Shared or dedicated app hosting. */
  computeMode?: "Shared" | "Dedicated" | "Dynamic";
  /** VM size of the worker pool instances. */
  workerSize?: string;
  /** Number of instances in the worker pool. */
  workerCount?: number;
}

/** Description of a SKU for a scalable resource. */
export interface SkuDescription {
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
  skuCapacity?: SkuCapacity;
  /** Locations of the SKU. */
  locations?: Array<string>;
  /** Capabilities of the SKU, e.g., is traffic manager enabled? */
  capabilities?: Array<Capability>;
}

/** Description of the App Service plan scale options. */
export interface SkuCapacity {
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
export interface Capability {
  /** Name of the SKU capability. */
  name?: string;
  /** Value of the SKU capability. */
  value?: string;
  /** Reason of the SKU capability. */
  reason?: string;
}

/** Metadata for the metrics. */
export interface ResourceMetricDefinition extends ProxyOnlyResource {
  /** ResourceMetricDefinition resource specific properties */
  properties?: ResourceMetricDefinitionProperties;
}

/** ResourceMetricDefinition resource specific properties */
export interface ResourceMetricDefinitionProperties {}

/** Metrics availability and retention. */
export interface ResourceMetricAvailability {}

/** Usage of the quota resource. */
export interface Usage extends ProxyOnlyResource {
  /** Usage resource specific properties */
  properties?: UsageProperties;
}

/** Usage resource specific properties */
export interface UsageProperties {}

/** Body of the error response returned from the API. */
export interface ErrorEntity {
  /** Type of error. */
  extendedCode?: string;
  /** Message template. */
  messageTemplate?: string;
  /** Parameters for the template. */
  parameters?: Array<string>;
  /** Inner errors. */
  innerErrors?: Array<ErrorEntity>;
  /** Error Details. */
  details?: Array<ErrorEntity>;
  /** The error target. */
  target?: string;
  /** Basic error code. */
  code?: string;
  /** Any details of the error. */
  message?: string;
}

/** Remote Private Endpoint Connection ARM resource. */
export interface RemotePrivateEndpointConnectionARMResource extends ProxyOnlyResource {
  /** RemotePrivateEndpointConnectionARMResource resource specific properties */
  properties?: RemotePrivateEndpointConnectionARMResourceProperties;
}

/** RemotePrivateEndpointConnectionARMResource resource specific properties */
export interface RemotePrivateEndpointConnectionARMResourceProperties {
  /** PrivateEndpoint of a remote private endpoint connection */
  privateEndpoint?: ArmIdWrapper;
  /** The state of a private link connection */
  privateLinkServiceConnectionState?: PrivateLinkConnectionState;
  /** Private IPAddresses mapped to the remote private endpoint */
  ipAddresses?: Array<string>;
}

/** A wrapper for an ARM resource id */
export interface ArmIdWrapper {}

/** The state of a private link connection */
export interface PrivateLinkConnectionState {
  /** Status of a private link connection */
  status?: string;
  /** Description of a private link connection */
  description?: string;
  /** ActionsRequired for a private link connection */
  actionsRequired?: string;
}

/** Private Endpoint Connection Approval ARM resource. */
export interface PrivateLinkConnectionApprovalRequestResource extends ProxyOnlyResource {
  /** Core resource properties */
  properties?: PrivateLinkConnectionApprovalRequest;
}

/** A request to approve or reject a private endpoint connection */
export interface PrivateLinkConnectionApprovalRequest {
  /** The state of a private link connection */
  privateLinkServiceConnectionState?: PrivateLinkConnectionState;
}

/** App Service plan. */
export interface AppServicePlan extends Resource {
  /** AppServicePlan resource specific properties */
  properties?: AppServicePlanProperties;
  /** Description of a SKU for a scalable resource. */
  sku?: SkuDescription;
  /** Extended Location. */
  extendedLocation?: ExtendedLocation;
}

/** AppServicePlan resource specific properties */
export interface AppServicePlanProperties {
  /** Target worker tier assigned to the App Service plan. */
  workerTierName?: string;
  /** Specification for the App Service Environment to use for the App Service plan. */
  hostingEnvironmentProfile?: HostingEnvironmentProfile;
  /**
   * If <code>true</code>, apps assigned to this App Service plan can be scaled independently.
   * If <code>false</code>, apps assigned to this App Service plan will scale to all instances of the plan.
   */
  perSiteScaling?: boolean;
  /** ServerFarm supports ElasticScale. Apps in this plan will scale as if the ServerFarm was ElasticPremium sku */
  elasticScaleEnabled?: boolean;
  /** Maximum number of total workers allowed for this ElasticScaleEnabled App Service Plan */
  maximumElasticWorkerCount?: number;
  /** If <code>true</code>, this App Service Plan owns spot instances. */
  isSpot?: boolean;
  /** The time when the server farm expires. Valid only if it is a spot server farm. */
  spotExpirationTime?: Date | string;
  /** The time when the server farm free offer expires. */
  freeOfferExpirationTime?: Date | string;
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
  /** Specification for the Kubernetes Environment to use for the App Service plan. */
  kubeEnvironmentProfile?: KubeEnvironmentProfile;
  /**
   * If <code>true</code>, this App Service Plan will perform availability zone balancing.
   * If <code>false</code>, this App Service Plan will not perform availability zone balancing.
   */
  zoneRedundant?: boolean;
}

/** Specification for a Kubernetes Environment to use for this resource. */
export interface KubeEnvironmentProfile {
  /** Resource ID of the Kubernetes Environment. */
  id?: string;
}

/** ARM resource for a app service plan. */
export interface AppServicePlanPatchResource extends ProxyOnlyResource {
  /** AppServicePlanPatchResource resource specific properties */
  properties?: AppServicePlanPatchResourceProperties;
}

/** AppServicePlanPatchResource resource specific properties */
export interface AppServicePlanPatchResourceProperties {
  /** Target worker tier assigned to the App Service plan. */
  workerTierName?: string;
  /** Specification for the App Service Environment to use for the App Service plan. */
  hostingEnvironmentProfile?: HostingEnvironmentProfile;
  /**
   * If <code>true</code>, apps assigned to this App Service plan can be scaled independently.
   * If <code>false</code>, apps assigned to this App Service plan will scale to all instances of the plan.
   */
  perSiteScaling?: boolean;
  /** ServerFarm supports ElasticScale. Apps in this plan will scale as if the ServerFarm was ElasticPremium sku */
  elasticScaleEnabled?: boolean;
  /** Maximum number of total workers allowed for this ElasticScaleEnabled App Service Plan */
  maximumElasticWorkerCount?: number;
  /** If <code>true</code>, this App Service Plan owns spot instances. */
  isSpot?: boolean;
  /** The time when the server farm expires. Valid only if it is a spot server farm. */
  spotExpirationTime?: Date | string;
  /** The time when the server farm free offer expires. */
  freeOfferExpirationTime?: Date | string;
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
  /** Specification for the Kubernetes Environment to use for the App Service plan. */
  kubeEnvironmentProfile?: KubeEnvironmentProfile;
  /**
   * If <code>true</code>, this App Service Plan will perform availability zone balancing.
   * If <code>false</code>, this App Service Plan will not perform availability zone balancing.
   */
  zoneRedundant?: boolean;
}

/** Hybrid Connection contract. This is used to configure a Hybrid Connection. */
export interface HybridConnection extends ProxyOnlyResource {
  /** HybridConnection resource specific properties */
  properties?: HybridConnectionProperties;
}

/** HybridConnection resource specific properties */
export interface HybridConnectionProperties {
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
export interface HybridConnectionKey extends ProxyOnlyResource {
  /** HybridConnectionKey resource specific properties */
  properties?: HybridConnectionKeyProperties;
}

/** HybridConnectionKey resource specific properties */
export interface HybridConnectionKeyProperties {}

/** Hybrid Connection limits contract. This is used to return the plan limits of Hybrid Connections. */
export interface HybridConnectionLimits extends ProxyOnlyResource {
  /** HybridConnectionLimits resource specific properties */
  properties?: HybridConnectionLimitsProperties;
}

/** HybridConnectionLimits resource specific properties */
export interface HybridConnectionLimitsProperties {}

/** Virtual Network information ARM resource. */
export interface VnetInfoResource extends ProxyOnlyResource {
  /** Core resource properties */
  properties?: VnetInfo;
}

/** Virtual Network information contract. */
export interface VnetInfo {
  /** The Virtual Network's resource ID. */
  vnetResourceId?: string;
  /**
   * A certificate file (.cer) blob containing the public key of the private key used to authenticate a
   * Point-To-Site VPN connection.
   */
  certBlob?: string;
  /** DNS servers to be used by this Virtual Network. This should be a comma-separated list of IP addresses. */
  dnsServers?: string;
  /** Flag that is used to denote if this is VNET injection */
  isSwift?: boolean;
}

/** Virtual Network route contract used to pass routing information for a Virtual Network. */
export interface VnetRoute extends ProxyOnlyResource {
  /** VnetRoute resource specific properties */
  properties?: VnetRouteProperties;
}

/** VnetRoute resource specific properties */
export interface VnetRouteProperties {
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
export interface VnetGateway extends ProxyOnlyResource {
  /** VnetGateway resource specific properties */
  properties?: VnetGatewayProperties;
}

/** VnetGateway resource specific properties */
export interface VnetGatewayProperties {
  /** The Virtual Network name. */
  vnetName?: string;
  /** The URI where the VPN package can be downloaded. */
  vpnPackageUri: string;
}

/** SSL certificate for an app. */
export interface Certificate extends Resource {
  /** Certificate resource specific properties */
  properties?: CertificateProperties;
}

/** Certificate resource specific properties */
export interface CertificateProperties {
  /** Certificate password. */
  password?: string;
  /** Host names the certificate applies to. */
  hostNames?: Array<string>;
  /**
   * Pfx blob.
   *
   * Value may contain base64 encoded characters
   */
  pfxBlob?: string;
  /** Key Vault Csm resource Id. */
  keyVaultId?: string;
  /** Key Vault secret name. */
  keyVaultSecretName?: string;
  /** Resource ID of the associated App Service plan, formatted as: "/subscriptions/{subscriptionID}/resourceGroups/{groupName}/providers/Microsoft.Web/serverfarms/{appServicePlanName}". */
  serverFarmId?: string;
  /** CNAME of the certificate to be issued via free certificate */
  canonicalName?: string;
  /** Method of domain validation for free cert */
  domainValidationMethod?: string;
}

/** ARM resource for a certificate. */
export interface CertificatePatchResource extends ProxyOnlyResource {
  /** CertificatePatchResource resource specific properties */
  properties?: CertificatePatchResourceProperties;
}

/** CertificatePatchResource resource specific properties */
export interface CertificatePatchResourceProperties {
  /** Certificate password. */
  password?: string;
  /** Host names the certificate applies to. */
  hostNames?: Array<string>;
  /**
   * Pfx blob.
   *
   * Value may contain base64 encoded characters
   */
  pfxBlob?: string;
  /** Key Vault Csm resource Id. */
  keyVaultId?: string;
  /** Key Vault secret name. */
  keyVaultSecretName?: string;
  /** Resource ID of the associated App Service plan, formatted as: "/subscriptions/{subscriptionID}/resourceGroups/{groupName}/providers/Microsoft.Web/serverfarms/{appServicePlanName}". */
  serverFarmId?: string;
  /** CNAME of the certificate to be issued via free certificate */
  canonicalName?: string;
  /** Method of domain validation for free cert */
  domainValidationMethod?: string;
}

/** Container App. */
export interface ContainerApp extends Resource {
  /** ContainerApp resource specific properties */
  properties?: ContainerAppProperties;
}

/** ContainerApp resource specific properties */
export interface ContainerAppProperties {
  /** Resource ID of the Container App's KubeEnvironment. */
  kubeEnvironmentId?: string;
  /** Non versioned Container App configuration properties. */
  configuration?: Configuration;
  /** Container App versioned application definition. */
  template?: Template;
}

/** Non versioned Container App configuration properties that define the mutable settings of a Container app */
export interface Configuration {
  /** Collection of secrets used by a Container app */
  secrets?: Array<Secret>;
  /**
   * ActiveRevisionsMode controls how active revisions are handled for the Container app:
   * <list><item>Multiple: multiple revisions can be active. If no value if provided, this is the default</item><item>Single: Only one revision can be active at a time. Revision weights can not be used in this mode</item></list>
   */
  activeRevisionsMode?: "multiple" | "single";
  /** Ingress configurations. */
  ingress?: Ingress;
  /** Collection of private container registry credentials for containers used by the Container app */
  registries?: Array<RegistryCredentials>;
}

/** Container App Secret. */
export interface Secret {
  /** Secret Name. */
  name?: string;
  /** Secret Value. */
  value?: string;
}

/** Container App Ingress configuration. */
export interface Ingress {
  /** Bool indicating if app exposes an external http endpoint */
  external?: boolean;
  /** Target Port in containers for traffic from ingress */
  targetPort?: number;
  /** Ingress transport protocol */
  transport?: "auto" | "http" | "http2";
  traffic?: Array<TrafficWeight>;
  /** Bool indicating if HTTP connections to is allowed. If set to false HTTP connections are automatically redirected to HTTPS connections */
  allowInsecure?: boolean;
}

/** Traffic weight assigned to a revision */
export interface TrafficWeight {
  /** Name of a revision */
  revisionName?: string;
  /** Traffic weight assigned to a revision */
  weight?: number;
  /** Indicates that the traffic weight belongs to a latest stable revision */
  latestRevision?: boolean;
}

/** Container App Private Registry */
export interface RegistryCredentials {
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
export interface Template {
  /** User friendly suffix that is appended to the revision name */
  revisionSuffix?: string;
  /** List of container definitions for the Container App. */
  containers?: Array<Container>;
  /** Scaling properties for the Container App. */
  scale?: Scale;
  /** Dapr configuration for the Container App. */
  dapr?: Dapr;
}

/** Container App container definition. */
export interface Container {
  /** Container image tag. */
  image?: string;
  /** Custom container name. */
  name?: string;
  /** Container start command. */
  command?: Array<string>;
  /** Container start command arguments. */
  args?: Array<string>;
  /** Container environment variables. */
  env?: Array<EnvironmentVar>;
  /** Container resource requirements. */
  resources?: ContainerResources;
}

/** Container App container environment variable. */
export interface EnvironmentVar {
  /** Environment variable name. */
  name?: string;
  /** Non-secret environment variable value. */
  value?: string;
  /** Name of the Container App secret from which to pull the environment variable value. */
  secretRef?: string;
}

/** Container App container resource requirements. */
export interface ContainerResources {
  /** Required CPU in cores, e.g. 0.5 */
  cpu?: number;
  /** Required memory, e.g. "250Mb" */
  memory?: string;
}

/** Container App scaling configurations. */
export interface Scale {
  /** Optional. Minimum number of container replicas. */
  minReplicas?: number;
  /** Optional. Maximum number of container replicas. Defaults to 10 if not set. */
  maxReplicas?: number;
  /** Scaling rules. */
  rules?: Array<ScaleRule>;
}

/** Container App container scaling rule. */
export interface ScaleRule {
  /** Scale Rule Name */
  name?: string;
  /** Azure Queue based scaling. */
  azureQueue?: QueueScaleRule;
  /** Custom scale rule. */
  custom?: CustomScaleRule;
  /** HTTP requests based scaling. */
  http?: HttpScaleRule;
}

/** Container App container Azure Queue based scaling rule. */
export interface QueueScaleRule {
  /** Queue name. */
  queueName?: string;
  /** Queue length. */
  queueLength?: number;
  /** Authentication secrets for the queue scale rule. */
  auth?: Array<ScaleRuleAuth>;
}

/** Auth Secrets for Container App Scale Rule */
export interface ScaleRuleAuth {
  /** Name of the Container App secret from which to pull the auth params. */
  secretRef?: string;
  /** Trigger Parameter that uses the secret */
  triggerParameter?: string;
}

/** Container App container Custom scaling rule. */
export interface CustomScaleRule {
  /**
   * Type of the custom scale rule
   * eg: azure-servicebus, redis etc.
   */
  type?: string;
  /** Metadata properties to describe custom scale rule. */
  metadata?: Record<string, string>;
  /** Authentication secrets for the custom scale rule. */
  auth?: Array<ScaleRuleAuth>;
}

/** Container App container Custom scaling rule. */
export interface HttpScaleRule {
  /** Metadata properties to describe http scale rule. */
  metadata?: Record<string, string>;
  /** Authentication secrets for the custom scale rule. */
  auth?: Array<ScaleRuleAuth>;
}

/** Container App Dapr configuration. */
export interface Dapr {
  /** Boolean indicating if the Dapr side car is enabled */
  enabled?: boolean;
  /** Dapr application identifier */
  appId?: string;
  /** Port on which the Dapr side car */
  appPort?: number;
  /** Collection of Dapr components */
  components?: Array<DaprComponent>;
}

/** Dapr component configuration */
export interface DaprComponent {
  /** Component name */
  name?: string;
  /** Component type */
  type?: string;
  /** Component version */
  version?: string;
  /** Component metadata */
  metadata?: Array<DaprMetadata>;
}

/** Container App Dapr component metadata. */
export interface DaprMetadata {
  /** Metadata property name. */
  name?: string;
  /** Metadata property value. */
  value?: string;
  /** Name of the Container App secret from which to pull the metadata property value. */
  secretRef?: string;
}

/** Container App Revision. */
export interface Revision extends Resource {
  /** Revision resource specific properties */
  properties?: RevisionProperties;
}

/** Revision resource specific properties */
export interface RevisionProperties {}

/** A deleted app. */
export interface DeletedSite extends ProxyOnlyResource {
  /** DeletedSite resource specific properties */
  properties?: DeletedSiteProperties;
}

/** DeletedSite resource specific properties */
export interface DeletedSiteProperties {}

/** Class representing detector definition */
export interface DiagnosticCategory extends ProxyOnlyResource {
  /** DiagnosticCategory resource specific properties */
  properties?: DiagnosticCategoryProperties;
}

/** DiagnosticCategory resource specific properties */
export interface DiagnosticCategoryProperties {}

/** Definition of Analysis */
export interface AnalysisDefinition extends ProxyOnlyResource {
  /** AnalysisDefinition resource specific properties */
  properties?: AnalysisDefinitionProperties;
}

/** AnalysisDefinition resource specific properties */
export interface AnalysisDefinitionProperties {}

/** Class representing a diagnostic analysis done on an application */
export interface DiagnosticAnalysis extends ProxyOnlyResource {
  /** DiagnosticAnalysis resource specific properties */
  properties?: DiagnosticAnalysisProperties;
}

/** DiagnosticAnalysis resource specific properties */
export interface DiagnosticAnalysisProperties {
  /** Start time of the period */
  startTime?: Date | string;
  /** End time of the period */
  endTime?: Date | string;
  /** List of time periods. */
  abnormalTimePeriods?: Array<AbnormalTimePeriod>;
  /** Data by each detector */
  payload?: Array<AnalysisData>;
  /** Data by each detector for detectors that did not corelate */
  nonCorrelatedDetectors?: Array<DetectorDefinition>;
}

/** Class representing Abnormal Time Period identified in diagnosis */
export interface AbnormalTimePeriod {
  /** Start time of the downtime */
  startTime?: Date | string;
  /** End time of the downtime */
  endTime?: Date | string;
  /** List of Possible Cause of downtime */
  events?: Array<DetectorAbnormalTimePeriod>;
  /** List of proposed solutions */
  solutions?: Array<Solution>;
}

/** Class representing Abnormal Time Period detected. */
export interface DetectorAbnormalTimePeriod {
  /** Start time of the correlated event */
  startTime?: Date | string;
  /** End time of the correlated event */
  endTime?: Date | string;
  /** Message describing the event */
  message?: string;
  /** Represents the name of the Detector */
  source?: string;
  /** Represents the rank of the Detector */
  priority?: number;
  /** Downtime metadata */
  metaData?: Array<Array<NameValuePair>>;
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
  solutions?: Array<Solution>;
}

/** Class Representing Solution for problems detected. */
export interface Solution {
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
  data?: Array<Array<NameValuePair>>;
  /** Solution Metadata. */
  metadata?: Array<Array<NameValuePair>>;
}

/** Class Representing Detector Evidence used for analysis */
export interface AnalysisData {
  /** Name of the Detector */
  source?: string;
  /** Detector Definition */
  detectorDefinition?: DetectorDefinition;
  /** Source Metrics */
  metrics?: Array<DiagnosticMetricSet>;
  /** Additional Source Data */
  data?: Array<Array<NameValuePair>>;
  /** Detector Meta Data */
  detectorMetaData?: ResponseMetaData;
}

/** Class representing detector definition */
export interface DetectorDefinition {}

/** Class representing Diagnostic Metric information */
export interface DiagnosticMetricSet {
  /** Name of the metric */
  name?: string;
  /** Metric's unit */
  unit?: string;
  /** Start time of the period */
  startTime?: Date | string;
  /** End time of the period */
  endTime?: Date | string;
  /** Presented time grain. Supported grains at the moment are PT1M, PT1H, P1D */
  timeGrain?: string;
  /** Collection of metric values for the selected period based on the {Microsoft.Web.Hosting.Administration.DiagnosticMetricSet.TimeGrain} */
  values?: Array<DiagnosticMetricSample>;
}

/** Class representing Diagnostic Metric */
export interface DiagnosticMetricSample {
  /** Time at which metric is measured */
  timestamp?: Date | string;
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

export interface ResponseMetaData {
  /** Source of the Data */
  dataSource?: DataSource;
}

/** Class representing data source used by the detectors */
export interface DataSource {
  /** Instructions if any for the data source */
  instructions?: Array<string>;
  /** Datasource Uri Links */
  dataSourceUri?: Array<NameValuePair>;
}

/** ARM resource for a detector definition */
export interface DetectorDefinitionResource extends ProxyOnlyResource {
  /** Core resource properties */
  properties?: DetectorDefinition;
}

/** Class representing Response from Diagnostic Detectors */
export interface DiagnosticDetectorResponse extends ProxyOnlyResource {
  /** DiagnosticDetectorResponse resource specific properties */
  properties?: DiagnosticDetectorResponseProperties;
}

/** DiagnosticDetectorResponse resource specific properties */
export interface DiagnosticDetectorResponseProperties {
  /** Start time of the period */
  startTime?: Date | string;
  /** End time of the period */
  endTime?: Date | string;
  /** Flag representing Issue was detected. */
  issueDetected?: boolean;
  /** Detector's definition */
  detectorDefinition?: DetectorDefinition;
  /** Metrics provided by the detector */
  metrics?: Array<DiagnosticMetricSet>;
  /** List of Correlated events found by the detector */
  abnormalTimePeriods?: Array<DetectorAbnormalTimePeriod>;
  /** Additional Data that detector wants to send. */
  data?: Array<Array<NameValuePair>>;
  /** Meta Data */
  responseMetaData?: ResponseMetaData;
}

/** A snapshot of an app. */
export interface Snapshot extends ProxyOnlyResource {
  /** Snapshot resource specific properties */
  properties?: SnapshotProperties;
}

/** Snapshot resource specific properties */
export interface SnapshotProperties {}

/** A Kubernetes cluster specialized for web workloads by Azure App Service */
export interface KubeEnvironment extends Resource {
  /** KubeEnvironment resource specific properties */
  properties?: KubeEnvironmentProperties;
  /** Extended Location. */
  extendedLocation?: ExtendedLocation;
}

/** KubeEnvironment resource specific properties */
export interface KubeEnvironmentProperties {
  /** Only visible within Vnet/Subnet */
  internalLoadBalancerEnabled?: boolean;
  /** Static IP of the KubeEnvironment */
  staticIp?: string;
  /** Type of Kubernetes Environment. Only supported for Container App Environments with value as Managed */
  environmentType?: string;
  /**
   * Cluster configuration which determines the ARC cluster
   * components types. Eg: Choosing between BuildService kind,
   * FrontEnd Service ArtifactsStorageType etc.
   */
  arcConfiguration?: ArcConfiguration;
  /**
   * Cluster configuration which enables the log daemon to export
   * app logs to a destination. Currently only "log-analytics" is
   * supported
   */
  appLogsConfiguration?: AppLogsConfiguration;
  /** Cluster configuration for Container Apps Environments to configure Dapr Instrumentation Key and VNET Configuration */
  containerAppsConfiguration?: ContainerAppsConfiguration;
  aksResourceID?: string;
}

export interface ArcConfiguration {
  artifactsStorageType?: "LocalNode" | "NetworkFileSystem";
  artifactStorageClassName?: string;
  artifactStorageMountPath?: string;
  artifactStorageNodeName?: string;
  artifactStorageAccessMode?: string;
  frontEndServiceConfiguration?: FrontEndConfiguration;
  kubeConfig?: string;
}

export interface FrontEndConfiguration {
  kind?: "NodePort" | "LoadBalancer";
}

export interface AppLogsConfiguration {
  destination?: string;
  logAnalyticsConfiguration?: LogAnalyticsConfiguration;
}

export interface LogAnalyticsConfiguration {
  customerId?: string;
  sharedKey?: string;
}

export interface ContainerAppsConfiguration {
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
export interface KubeEnvironmentPatchResource extends ProxyOnlyResource {
  /** KubeEnvironmentPatchResource resource specific properties */
  properties?: KubeEnvironmentPatchResourceProperties;
}

/** KubeEnvironmentPatchResource resource specific properties */
export interface KubeEnvironmentPatchResourceProperties {
  /** Only visible within Vnet/Subnet */
  internalLoadBalancerEnabled?: boolean;
  /** Static IP of the KubeEnvironment */
  staticIp?: string;
  /**
   * Cluster configuration which determines the ARC cluster
   * components types. Eg: Choosing between BuildService kind,
   * FrontEnd Service ArtifactsStorageType etc.
   */
  arcConfiguration?: ArcConfiguration;
  /**
   * Cluster configuration which enables the log daemon to export
   * app logs to a destination. Currently only "log-analytics" is
   * supported
   */
  appLogsConfiguration?: AppLogsConfiguration;
  /** Cluster configuration for Container Apps Environments to configure Dapr Instrumentation Key and VNET Configuration */
  containerAppsConfiguration?: ContainerAppsConfiguration;
  aksResourceID?: string;
}

/** ARM resource for a ApplicationStack. */
export interface ApplicationStackResource extends ProxyOnlyResource {
  /** Core resource properties */
  properties?: ApplicationStack;
}

/** Application stack. */
export interface ApplicationStack {
  /** Application stack name. */
  name?: string;
  /** Application stack display name. */
  display?: string;
  /** Application stack dependency. */
  dependency?: string;
  /** List of major versions available. */
  majorVersions?: Array<StackMajorVersion>;
  /** List of frameworks associated with application stack. */
  frameworks?: Array<ApplicationStack>;
  /** <code>true</code> if this is the stack is deprecated; otherwise, <code>false</code>. */
  isDeprecated?: Array<ApplicationStack>;
}

/** Application stack major version. */
export interface StackMajorVersion {
  /** Application stack major version (display only). */
  displayVersion?: string;
  /** Application stack major version (runtime only). */
  runtimeVersion?: string;
  /** <code>true</code> if this is the default major version; otherwise, <code>false</code>. */
  isDefault?: boolean;
  /** Minor versions associated with the major version. */
  minorVersions?: Array<StackMinorVersion>;
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
export interface StackMinorVersion {
  /** Application stack minor version (display only). */
  displayVersion?: string;
  /** Application stack minor version (runtime only). */
  runtimeVersion?: string;
  /** <code>true</code> if this is the default minor version; otherwise, <code>false</code>. */
  isDefault?: boolean;
  /** <code>true</code> if this supports Remote Debugging, otherwise <code>false</code>. */
  isRemoteDebuggingEnabled?: boolean;
}

/** Function App Stack. */
export interface FunctionAppStack extends ProxyOnlyResource {
  /** FunctionAppStack resource specific properties */
  properties?: FunctionAppStackProperties;
}

/** FunctionAppStack resource specific properties */
export interface FunctionAppStackProperties {}

/** Function App stack major version. */
export interface FunctionAppMajorVersion {}

/** Function App stack minor version. */
export interface FunctionAppMinorVersion {}

/** Function App stack runtimes. */
export interface FunctionAppRuntimes {}

/** Function App runtime settings. */
export interface FunctionAppRuntimeSettings {}

/** App Insights Web App stack settings. */
export interface AppInsightsWebAppStackSettings {}

/** GitHub Actions Web App stack settings. */
export interface GitHubActionWebAppStackSettings {}

/** Site config properties dictionary. */
export interface SiteConfigPropertiesDictionary {}

/** Web App stack. */
export interface WebAppStack extends ProxyOnlyResource {
  /** WebAppStack resource specific properties */
  properties?: WebAppStackProperties;
}

/** WebAppStack resource specific properties */
export interface WebAppStackProperties {}

/** Web App stack major version. */
export interface WebAppMajorVersion {}

/** Web App stack minor version. */
export interface WebAppMinorVersion {}

/** Web App stack runtimes. */
export interface WebAppRuntimes {}

/** Web App runtime settings. */
export interface WebAppRuntimeSettings {}

/** Linux Java Container settings. */
export interface LinuxJavaContainerSettings {}

/** Windows Java Container settings. */
export interface WindowsJavaContainerSettings {}

/** Represents a recommendation result generated by the recommendation engine. */
export interface Recommendation extends ProxyOnlyResource {
  /** Recommendation resource specific properties */
  properties?: RecommendationProperties;
}

/** Recommendation resource specific properties */
export interface RecommendationProperties {
  /** Timestamp when this instance was created. */
  creationTime?: Date | string;
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
  /** Name of action recommended by this object. */
  actionName?: string;
  /** True if this recommendation is still valid (i.e. "actionable"). False if it is invalid. */
  enabled?: number;
  /** The list of states of this recommendation. If it's null then it should be considered "Active". */
  states?: Array<string>;
  /** The beginning time in UTC of a range that the recommendation refers to. */
  startTime?: Date | string;
  /** The end time in UTC of a range that the recommendation refers to. */
  endTime?: Date | string;
  /** When to notify this recommendation next in UTC. Null means that this will never be notified anymore. */
  nextNotificationTime?: Date | string;
  /** Date and time in UTC when this notification expires. */
  notificationExpirationTime?: Date | string;
  /** Last timestamp in UTC this instance was actually notified. Null means that this recommendation hasn't been notified yet. */
  notifiedTime?: Date | string;
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
export interface RecommendationRule extends ProxyOnlyResource {
  /** RecommendationRule resource specific properties */
  properties?: RecommendationRuleProperties;
}

/** RecommendationRule resource specific properties */
export interface RecommendationRuleProperties {
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
  /** True if this is associated with a dynamically added rule */
  isDynamic?: boolean;
  /** Extension name of the portal if exists. Applicable to dynamic rule only. */
  extensionName?: string;
  /** Deep link to a blade on the portal. Applicable to dynamic rule only. */
  bladeName?: string;
  /** Forward link to an external document associated with the rule. Applicable to dynamic rule only. */
  forwardLink?: string;
}

/** Used for getting ResourceHealthCheck settings. */
export interface ResourceHealthMetadata extends ProxyOnlyResource {
  /** ResourceHealthMetadata resource specific properties */
  properties?: ResourceHealthMetadataProperties;
}

/** ResourceHealthMetadata resource specific properties */
export interface ResourceHealthMetadataProperties {
  /** The category that the resource matches in the RHC Policy File */
  category?: string;
  /** Is there a health signal for the resource */
  signalAvailability?: boolean;
}

/** User credentials used for publishing activity. */
export interface User extends ProxyOnlyResource {
  /** User resource specific properties */
  properties?: UserProperties;
}

/** User resource specific properties */
export interface UserProperties {
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

/** The source control OAuth token. */
export interface SourceControl extends ProxyOnlyResource {
  /** SourceControl resource specific properties */
  properties?: SourceControlProperties;
}

/** SourceControl resource specific properties */
export interface SourceControlProperties {
  /** OAuth access token. */
  token?: string;
  /** OAuth access token secret. */
  tokenSecret?: string;
  /** OAuth refresh token. */
  refreshToken?: string;
  /** OAuth token expiration. */
  expirationTime?: Date | string;
}

/** App Service billing entity that contains information about meter which the Azure billing system utilizes to charge users for services. */
export interface BillingMeter extends ProxyOnlyResource {
  /** BillingMeter resource specific properties */
  properties?: BillingMeterProperties;
}

/** BillingMeter resource specific properties */
export interface BillingMeterProperties {
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

/** Resource name availability request content. */
export interface ResourceNameAvailabilityRequest {
  /** Resource name to verify. */
  name: string;
  /** Resource type used for verification. */
  type:
    | "Site"
    | "Slot"
    | "HostingEnvironment"
    | "PublishingUser"
    | "Microsoft.Web/sites"
    | "Microsoft.Web/sites/slots"
    | "Microsoft.Web/hostingEnvironments"
    | "Microsoft.Web/publishingUsers";
  /** Is fully qualified domain name. */
  isFqdn?: boolean;
}

/** A hostname and its assigned sites */
export interface CustomHostnameSites extends ProxyOnlyResource {
  /** CustomHostnameSites resource specific properties */
  properties?: CustomHostnameSitesProperties;
}

/** CustomHostnameSites resource specific properties */
export interface CustomHostnameSitesProperties {
  customHostname?: string;
  region?: string;
  siteResourceIds?: Array<Identifier>;
}

/** A domain specific resource identifier. */
export interface Identifier extends ProxyOnlyResource {
  /** Identifier resource specific properties */
  properties?: IdentifierProperties;
}

/** Identifier resource specific properties */
export interface IdentifierProperties {
  /** String representation of the identity. */
  id?: string;
}

/** Geographical region. */
export interface GeoRegion extends ProxyOnlyResource {
  /** GeoRegion resource specific properties */
  properties?: GeoRegionProperties;
}

/** GeoRegion resource specific properties */
export interface GeoRegionProperties {}

/** Premier add-on offer. */
export interface PremierAddOnOffer extends ProxyOnlyResource {
  /** PremierAddOnOffer resource specific properties */
  properties?: PremierAddOnOfferProperties;
}

/** PremierAddOnOffer resource specific properties */
export interface PremierAddOnOfferProperties {
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

/** The required set of inputs to validate a VNET */
export interface VnetParameters extends ProxyOnlyResource {
  /** VnetParameters resource specific properties */
  properties?: VnetParametersProperties;
}

/** VnetParameters resource specific properties */
export interface VnetParametersProperties {
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
export interface VnetValidationFailureDetails extends ProxyOnlyResource {
  /** VnetValidationFailureDetails resource specific properties */
  properties?: VnetValidationFailureDetailsProperties;
}

/** VnetValidationFailureDetails resource specific properties */
export interface VnetValidationFailureDetailsProperties {
  /** Text describing the validation outcome. */
  message?: string;
  /** A flag describing whether or not validation failed. */
  failed?: boolean;
  /** A list of tests that failed in the validation. */
  failedTests?: Array<VnetValidationTestFailure>;
  /** A list of warnings generated during validation. */
  warnings?: Array<VnetValidationTestFailure>;
}

/** A class that describes a test that failed during NSG and UDR validation. */
export interface VnetValidationTestFailure extends ProxyOnlyResource {
  /** VnetValidationTestFailure resource specific properties */
  properties?: VnetValidationTestFailureProperties;
}

/** VnetValidationTestFailure resource specific properties */
export interface VnetValidationTestFailureProperties {
  /** The name of the test that failed. */
  testName?: string;
  /** The details of what caused the failure, e.g. the blocking rule name, etc. */
  details?: string;
}

/** Object with a list of the resources that need to be moved and the resource group they should be moved to. */
export interface CsmMoveResourceEnvelope {
  targetResourceGroup?: string;
  resources?: Array<string>;
}

/** Resource validation request content. */
export interface ValidateRequest {
  /** Resource name to verify. */
  name: string;
  /** Resource type used for verification. */
  type: "ServerFarm" | "Site" | "Microsoft.Web/hostingEnvironments";
  /** Expected location of the resource. */
  location: string;
  /** Properties of the resource to validate. */
  properties: ValidateProperties;
}

/** App properties used for validation. */
export interface ValidateProperties {
  /** ARM resource ID of an App Service plan that would host the app. */
  serverFarmId?: string;
  /** Name of the target SKU for the App Service plan. */
  skuName?: string;
  /** <code>true</code> if App Service plan is for Linux workers; otherwise, <code>false</code>. */
  needLinuxWorkers?: boolean;
  /** <code>true</code> if App Service plan is for Spot instances; otherwise, <code>false</code>. */
  isSpot?: boolean;
  /** Target capacity of the App Service plan (number of VMs). */
  capacity?: number;
  /** Name of App Service Environment where app or App Service plan should be created. */
  hostingEnvironment?: string;
  /** <code>true</code> if App Service plan is running as a windows container */
  isXenon?: boolean;
  /** Base URL of the container registry */
  containerRegistryBaseUrl?: string;
  /** Username for to access the container registry */
  containerRegistryUsername?: string;
  /** Password for to access the container registry */
  containerRegistryPassword?: string;
  /** Repository name (image name) */
  containerImageRepository?: string;
  /** Image tag */
  containerImageTag?: string;
  /** Platform (windows or linux) */
  containerImagePlatform?: string;
  /** App Service Environment Properties */
  appServiceEnvironment?: AppServiceEnvironment;
}

/** Request entity for previewing the Static Site workflow */
export interface StaticSitesWorkflowPreviewRequest extends ProxyOnlyResource {
  /** StaticSitesWorkflowPreviewRequest resource specific properties */
  properties?: StaticSitesWorkflowPreviewRequestProperties;
}

/** StaticSitesWorkflowPreviewRequest resource specific properties */
export interface StaticSitesWorkflowPreviewRequestProperties {
  /** URL for the repository of the static site. */
  repositoryUrl?: string;
  /** The target branch in the repository. */
  branch?: string;
  /** Build properties to configure on the repository. */
  buildProperties?: StaticSiteBuildProperties;
}

/** Build properties for the static site. */
export interface StaticSiteBuildProperties {
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
export interface StaticSitesWorkflowPreview extends ProxyOnlyResource {
  /** StaticSitesWorkflowPreview resource specific properties */
  properties?: StaticSitesWorkflowPreviewProperties;
}

/** StaticSitesWorkflowPreview resource specific properties */
export interface StaticSitesWorkflowPreviewProperties {}

/** Static Site ARM resource. */
export interface StaticSiteARMResource extends Resource {
  /** Core resource properties */
  properties?: StaticSite;
  /** Description of a SKU for a scalable resource. */
  sku?: SkuDescription;
  /** Managed service identity. */
  identity?: ManagedServiceIdentity;
}

/** A static site. */
export interface StaticSite {
  /** URL for the repository of the static site. */
  repositoryUrl?: string;
  /** The target branch in the repository. */
  branch?: string;
  /** A user's github repository token. This is used to setup the Github Actions workflow file and API secrets. */
  repositoryToken?: string;
  /** Build properties to configure on the repository. */
  buildProperties?: StaticSiteBuildProperties;
  /** State indicating whether staging environments are allowed or not allowed for a static web app. */
  stagingEnvironmentPolicy?: "Enabled" | "Disabled";
  /** <code>false</code> if config file is locked for this static web app; otherwise, <code>true</code>. */
  allowConfigFileUpdates?: boolean;
  /** Template options for generating a new repository. */
  templateProperties?: StaticSiteTemplateOptions;
  /** The provider that submitted the last deployment to the primary environment of the static site. */
  provider?: string;
  /** State indicating the status of the enterprise grade CDN serving traffic to the static web app. */
  enterpriseGradeCdnStatus?: "Enabled" | "Enabling" | "Disabled" | "Disabling";
}

/** Message envelope that contains the common Azure resource manager properties and the resource provider specific content. */
export interface ResponseMessageEnvelopeRemotePrivateEndpointConnection {
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
  plan?: ArmPlan;
  /** Resource specific properties. */
  properties?: RemotePrivateEndpointConnection;
  /** SKU description of the resource. */
  sku?: SkuDescription;
  /** Azure-AsyncOperation Status info. */
  status?: string;
  /** Azure-AsyncOperation Error info. */
  error?: ErrorEntity;
  /** MSI resource */
  identity?: ManagedServiceIdentity;
  /** Logical Availability Zones the service is hosted in */
  zones?: Array<string>;
}

/** The plan object in Azure Resource Manager, represents a marketplace plan. */
export interface ArmPlan {
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
export interface RemotePrivateEndpointConnection extends ProxyOnlyResource {
  /** RemotePrivateEndpointConnection resource specific properties */
  properties?: RemotePrivateEndpointConnectionProperties;
}

/** RemotePrivateEndpointConnection resource specific properties */
export interface RemotePrivateEndpointConnectionProperties {
  /** PrivateEndpoint of a remote private endpoint connection */
  privateEndpoint?: ArmIdWrapper;
  /** The state of a private link connection */
  privateLinkServiceConnectionState?: PrivateLinkConnectionState;
  /** Private IPAddresses mapped to the remote private endpoint */
  ipAddresses?: Array<string>;
}

/** Template Options for the static site. */
export interface StaticSiteTemplateOptions {
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
export interface StaticSiteUserProvidedFunctionApp extends ProxyOnlyResource {
  /** StaticSiteUserProvidedFunctionApp resource specific properties */
  properties?: StaticSiteUserProvidedFunctionAppProperties;
}

/** StaticSiteUserProvidedFunctionApp resource specific properties */
export interface StaticSiteUserProvidedFunctionAppProperties {
  /** The resource id of the function app registered with the static site */
  functionAppResourceId?: string;
  /** The region of the function app registered with the static site */
  functionAppRegion?: string;
}

/** ARM resource for a static site when patching */
export interface StaticSitePatchResource extends ProxyOnlyResource {
  /** Core resource properties */
  properties?: StaticSite;
}

/** Static Site User ARM resource. */
export interface StaticSiteUserARMResource extends ProxyOnlyResource {
  /** StaticSiteUserARMResource resource specific properties */
  properties?: StaticSiteUserARMResourceProperties;
}

/** StaticSiteUserARMResource resource specific properties */
export interface StaticSiteUserARMResourceProperties {
  /** The roles for the static site user, in free-form string format */
  roles?: string;
}

/** Static Site Build ARM resource. */
export interface StaticSiteBuildARMResource extends ProxyOnlyResource {
  /** StaticSiteBuildARMResource resource specific properties */
  properties?: StaticSiteBuildARMResourceProperties;
}

/** StaticSiteBuildARMResource resource specific properties */
export interface StaticSiteBuildARMResourceProperties {}

/** String dictionary resource. */
export interface StringDictionary extends ProxyOnlyResource {
  /** Settings. */
  properties?: Record<string, string>;
}

/** Static Site Function Overview ARM resource. */
export interface StaticSiteFunctionOverviewARMResource extends ProxyOnlyResource {
  /** StaticSiteFunctionOverviewARMResource resource specific properties */
  properties?: StaticSiteFunctionOverviewARMResourceProperties;
}

/** StaticSiteFunctionOverviewARMResource resource specific properties */
export interface StaticSiteFunctionOverviewARMResourceProperties {}

/** Static Site User Provided Function App ARM resource. */
export interface StaticSiteUserProvidedFunctionAppARMResource extends ProxyOnlyResource {
  /** StaticSiteUserProvidedFunctionAppARMResource resource specific properties */
  properties?: StaticSiteUserProvidedFunctionAppARMResourceProperties;
}

/** StaticSiteUserProvidedFunctionAppARMResource resource specific properties */
export interface StaticSiteUserProvidedFunctionAppARMResourceProperties {
  /** The resource id of the function app registered with the static site */
  functionAppResourceId?: string;
  /** The region of the function app registered with the static site */
  functionAppRegion?: string;
}

/** Static site zip deployment ARM resource. */
export interface StaticSiteZipDeploymentARMResource extends ProxyOnlyResource {
  /** Core resource properties */
  properties?: StaticSiteZipDeployment;
}

/** A static site zip deployment. */
export interface StaticSiteZipDeployment {
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
export interface StaticSiteUserInvitationRequestResource extends ProxyOnlyResource {
  /** StaticSiteUserInvitationRequestResource resource specific properties */
  properties?: StaticSiteUserInvitationRequestResourceProperties;
}

/** StaticSiteUserInvitationRequestResource resource specific properties */
export interface StaticSiteUserInvitationRequestResourceProperties {
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
export interface StaticSiteUserInvitationResponseResource extends ProxyOnlyResource {
  /** StaticSiteUserInvitationResponseResource resource specific properties */
  properties?: StaticSiteUserInvitationResponseResourceProperties;
}

/** StaticSiteUserInvitationResponseResource resource specific properties */
export interface StaticSiteUserInvitationResponseResourceProperties {}

/** Static Site Custom Domain Overview ARM resource. */
export interface StaticSiteCustomDomainOverviewARMResource extends ProxyOnlyResource {
  /** StaticSiteCustomDomainOverviewARMResource resource specific properties */
  properties?: StaticSiteCustomDomainOverviewARMResourceProperties;
}

/** StaticSiteCustomDomainOverviewARMResource resource specific properties */
export interface StaticSiteCustomDomainOverviewARMResourceProperties {}

/** Static Site Custom Domain Request Properties ARM resource. */
export interface StaticSiteCustomDomainRequestPropertiesARMResource extends ProxyOnlyResource {
  /** StaticSiteCustomDomainRequestPropertiesARMResource resource specific properties */
  properties?: StaticSiteCustomDomainRequestPropertiesARMResourceProperties;
}

/** StaticSiteCustomDomainRequestPropertiesARMResource resource specific properties */
export interface StaticSiteCustomDomainRequestPropertiesARMResourceProperties {
  /** Validation method for adding a custom domain */
  validationMethod?: string;
}

/** String list resource. */
export interface StringList extends ProxyOnlyResource {
  /** List of string resources. */
  properties?: Array<string>;
}

/** Static Site Reset Properties ARM resource. */
export interface StaticSiteResetPropertiesARMResource extends ProxyOnlyResource {
  /** StaticSiteResetPropertiesARMResource resource specific properties */
  properties?: StaticSiteResetPropertiesARMResourceProperties;
}

/** StaticSiteResetPropertiesARMResource resource specific properties */
export interface StaticSiteResetPropertiesARMResourceProperties {
  /** The token which proves admin privileges to the repository. */
  repositoryToken?: string;
  /** Determines whether the repository should be updated with the new properties. */
  shouldUpdateRepository?: boolean;
}

/** ARM resource for a site. */
export interface SitePatchResource extends ProxyOnlyResource {
  /** SitePatchResource resource specific properties */
  properties?: SitePatchResourceProperties;
  /** Managed service identity. */
  identity?: ManagedServiceIdentity;
}

/** SitePatchResource resource specific properties */
export interface SitePatchResourceProperties {
  /** <code>true</code> if the app is enabled; otherwise, <code>false</code>. Setting this value to false disables the app (takes the app offline). */
  enabled?: boolean;
  /** Hostname SSL states are used to manage the SSL bindings for app's hostnames. */
  hostNameSslStates?: Array<HostNameSslState>;
  /** Resource ID of the associated App Service plan, formatted as: "/subscriptions/{subscriptionID}/resourceGroups/{groupName}/providers/Microsoft.Web/serverfarms/{appServicePlanName}". */
  serverFarmId?: string;
  /** <code>true</code> if reserved; otherwise, <code>false</code>. */
  reserved?: boolean;
  /** Obsolete: Hyper-V sandbox. */
  isXenon?: boolean;
  /** Hyper-V sandbox. */
  hyperV?: boolean;
  /** Configuration of the app. */
  siteConfig?: SiteConfig;
  /** <code>true</code> to stop SCM (KUDU) site when the app is stopped; otherwise, <code>false</code>. The default is <code>false</code>. */
  scmSiteAlsoStopped?: boolean;
  /** App Service Environment to use for the app. */
  hostingEnvironmentProfile?: HostingEnvironmentProfile;
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
  /** Size of the function container. */
  containerSize?: number;
  /** Maximum allowed daily memory-time quota (applicable on dynamic apps only). */
  dailyMemoryTimeQuota?: number;
  /** If specified during app creation, the app is cloned from a source app. */
  cloningInfo?: CloningInfo;
  /**
   * HttpsOnly: configures a web site to accept only https requests. Issues redirect for
   * http requests
   */
  httpsOnly?: boolean;
  /** Site redundancy mode */
  redundancyMode?: "None" | "Manual" | "Failover" | "ActiveActive" | "GeoRedundant";
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
export interface CustomHostnameAnalysisResult extends ProxyOnlyResource {
  /** CustomHostnameAnalysisResult resource specific properties */
  properties?: CustomHostnameAnalysisResultProperties;
}

/** CustomHostnameAnalysisResult resource specific properties */
export interface CustomHostnameAnalysisResultProperties {
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

/** Deployment slot parameters. */
export interface CsmSlotEntity {
  /** Destination deployment slot during swap operation. */
  targetSlot: string;
  /** <code>true</code> to preserve Virtual Network to the slot during swap; otherwise, <code>false</code>. */
  preserveVnet: boolean;
}

/** Description of a backup which will be performed. */
export interface BackupRequest extends ProxyOnlyResource {
  /** BackupRequest resource specific properties */
  properties?: BackupRequestProperties;
}

/** BackupRequest resource specific properties */
export interface BackupRequestProperties {
  /** Name of the backup. */
  backupName?: string;
  /** True if the backup schedule is enabled (must be included in that case), false if the backup schedule should be disabled. */
  enabled?: boolean;
  /** SAS URL to the container. */
  storageAccountUrl: string;
  /** Schedule for the backup if it is executed periodically. */
  backupSchedule?: BackupSchedule;
  /** Databases included in the backup. */
  databases?: Array<DatabaseBackupSetting>;
}

/** Description of a backup schedule. Describes how often should be the backup performed and what should be the retention policy. */
export interface BackupSchedule {
  /** How often the backup should be executed (e.g. for weekly backup, this should be set to 7 and FrequencyUnit should be set to Day) */
  frequencyInterval: number;
  /** The unit of time for how often the backup should be executed (e.g. for weekly backup, this should be set to Day and FrequencyInterval should be set to 7) */
  frequencyUnit: "Day" | "Hour";
  /** True if the retention policy should always keep at least one backup in the storage account, regardless how old it is; false otherwise. */
  keepAtLeastOneBackup: boolean;
  /** After how many days backups should be deleted. */
  retentionPeriodInDays: number;
  /** When the schedule should start working. */
  startTime?: Date | string;
}

/** Database backup settings. */
export interface DatabaseBackupSetting {
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
export interface BackupItem extends ProxyOnlyResource {
  /** BackupItem resource specific properties */
  properties?: BackupItemProperties;
}

/** BackupItem resource specific properties */
export interface BackupItemProperties {}

/** Description of a restore request. */
export interface RestoreRequest extends ProxyOnlyResource {
  /** RestoreRequest resource specific properties */
  properties?: RestoreRequestProperties;
}

/** RestoreRequest resource specific properties */
export interface RestoreRequestProperties {
  /** SAS URL to the container. */
  storageAccountUrl: string;
  /** Name of a blob which contains the backup. */
  blobName?: string;
  /** <code>true</code> if the restore operation can overwrite target app; otherwise, <code>false</code>. <code>true</code> is needed if trying to restore over an existing app. */
  overwrite: boolean;
  /** Name of an app. */
  siteName?: string;
  /** Collection of databases which should be restored. This list has to match the list of databases included in the backup. */
  databases?: Array<DatabaseBackupSetting>;
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

/** Publishing Credentials Policies parameters. */
export interface CsmPublishingCredentialsPoliciesEntity extends ProxyOnlyResource {
  /** CsmPublishingCredentialsPoliciesEntity resource specific properties */
  properties?: CsmPublishingCredentialsPoliciesEntityProperties;
}

/** CsmPublishingCredentialsPoliciesEntity resource specific properties */
export interface CsmPublishingCredentialsPoliciesEntityProperties {
  /** <code>true</code> to allow access to a publishing method; otherwise, <code>false</code>. */
  allow: boolean;
}

/** Web app configuration ARM resource. */
export interface SiteConfigResource extends ProxyOnlyResource {
  /** Core resource properties */
  properties?: SiteConfig;
}

/** Configuration settings for the Azure App Service Authentication / Authorization feature. */
export interface SiteAuthSettings extends ProxyOnlyResource {
  /** SiteAuthSettings resource specific properties */
  properties?: SiteAuthSettingsProperties;
}

/** SiteAuthSettings resource specific properties */
export interface SiteAuthSettingsProperties {
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
export interface SiteAuthSettingsV2 extends ProxyOnlyResource {
  /** SiteAuthSettingsV2 resource specific properties */
  properties?: SiteAuthSettingsV2Properties;
}

/** SiteAuthSettingsV2 resource specific properties */
export interface SiteAuthSettingsV2Properties {
  /** The configuration settings of the platform of App Service Authentication/Authorization. */
  platform?: AuthPlatform;
  /** The configuration settings that determines the validation flow of users using App Service Authentication/Authorization. */
  globalValidation?: GlobalValidation;
  /** The configuration settings of each of the identity providers used to configure App Service Authentication/Authorization. */
  identityProviders?: IdentityProviders;
  /** The configuration settings of the login flow of users using App Service Authentication/Authorization. */
  login?: Login;
  /** The configuration settings of the HTTP requests for authentication and authorization requests made against App Service Authentication/Authorization. */
  httpSettings?: HttpSettings;
}

/** The configuration settings of the platform of App Service Authentication/Authorization. */
export interface AuthPlatform {
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
export interface GlobalValidation {
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
export interface IdentityProviders {
  /** The configuration settings of the Azure Active directory provider. */
  azureActiveDirectory?: AzureActiveDirectory;
  /** The configuration settings of the Facebook provider. */
  facebook?: Facebook;
  /** The configuration settings of the GitHub provider. */
  gitHub?: GitHub;
  /** The configuration settings of the Google provider. */
  google?: Google;
  /** The configuration settings of the legacy Microsoft Account provider. */
  legacyMicrosoftAccount?: LegacyMicrosoftAccount;
  /** The configuration settings of the Twitter provider. */
  twitter?: Twitter;
  /** The configuration settings of the Apple provider. */
  apple?: Apple;
  /** The configuration settings of the Azure Static Web Apps provider. */
  azureStaticWebApps?: AzureStaticWebApps;
  /**
   * The map of the name of the alias of each custom Open ID Connect provider to the
   * configuration settings of the custom Open ID Connect provider.
   */
  customOpenIdConnectProviders?: Record<string, CustomOpenIdConnectProvider>;
}

/** The configuration settings of the Azure Active directory provider. */
export interface AzureActiveDirectory {
  /** <code>false</code> if the Azure Active Directory provider should not be enabled despite the set registration; otherwise, <code>true</code>. */
  enabled?: boolean;
  /** The configuration settings of the Azure Active Directory app registration. */
  registration?: AzureActiveDirectoryRegistration;
  /** The configuration settings of the Azure Active Directory login flow. */
  login?: AzureActiveDirectoryLogin;
  /** The configuration settings of the Azure Active Directory token validation flow. */
  validation?: AzureActiveDirectoryValidation;
  /**
   * Gets a value indicating whether the Azure AD configuration was auto-provisioned using 1st party tooling.
   * This is an internal flag primarily intended to support the Azure Management Portal. Users should not
   * read or write to this property.
   */
  isAutoProvisioned?: boolean;
}

/** The configuration settings of the Azure Active Directory app registration. */
export interface AzureActiveDirectoryRegistration {
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
export interface AzureActiveDirectoryLogin {
  /**
   * Login parameters to send to the OpenID Connect authorization endpoint when
   * a user logs in. Each parameter must be in the form "key=value".
   */
  loginParameters?: Array<string>;
  /** <code>true</code> if the www-authenticate provider should be omitted from the request; otherwise, <code>false</code>. */
  disableWWWAuthenticate?: boolean;
}

/** The configuration settings of the Azure Active Directory token validation flow. */
export interface AzureActiveDirectoryValidation {
  /** The configuration settings of the checks that should be made while validating the JWT Claims. */
  jwtClaimChecks?: JwtClaimChecks;
  /** The list of audiences that can make successful authentication/authorization requests. */
  allowedAudiences?: Array<string>;
  /** The configuration settings of the default authorization policy. */
  defaultAuthorizationPolicy?: DefaultAuthorizationPolicy;
}

/** The configuration settings of the checks that should be made while validating the JWT Claims. */
export interface JwtClaimChecks {
  /** The list of the allowed groups. */
  allowedGroups?: Array<string>;
  /** The list of the allowed client applications. */
  allowedClientApplications?: Array<string>;
}

/** The configuration settings of the Azure Active Directory default authorization policy. */
export interface DefaultAuthorizationPolicy {
  /** The configuration settings of the Azure Active Directory allowed principals. */
  allowedPrincipals?: AllowedPrincipals;
  /** The configuration settings of the Azure Active Directory allowed applications. */
  allowedApplications?: Array<string>;
}

/** The configuration settings of the Azure Active Directory allowed principals. */
export interface AllowedPrincipals {
  /** The list of the allowed groups. */
  groups?: Array<string>;
  /** The list of the allowed identities. */
  identities?: Array<string>;
}

/** The configuration settings of the Facebook provider. */
export interface Facebook {
  /** <code>false</code> if the Facebook provider should not be enabled despite the set registration; otherwise, <code>true</code>. */
  enabled?: boolean;
  /** The configuration settings of the app registration for the Facebook provider. */
  registration?: AppRegistration;
  /** The version of the Facebook api to be used while logging in. */
  graphApiVersion?: string;
  /** The configuration settings of the login flow. */
  login?: LoginScopes;
}

/** The configuration settings of the app registration for providers that have app ids and app secrets */
export interface AppRegistration {
  /** The App ID of the app used for login. */
  appId?: string;
  /** The app setting name that contains the app secret. */
  appSecretSettingName?: string;
}

/** The configuration settings of the login flow, including the scopes that should be requested. */
export interface LoginScopes {
  /** A list of the scopes that should be requested while authenticating. */
  scopes?: Array<string>;
}

/** The configuration settings of the GitHub provider. */
export interface GitHub {
  /** <code>false</code> if the GitHub provider should not be enabled despite the set registration; otherwise, <code>true</code>. */
  enabled?: boolean;
  /** The configuration settings of the app registration for the GitHub provider. */
  registration?: ClientRegistration;
  /** The configuration settings of the login flow. */
  login?: LoginScopes;
}

/** The configuration settings of the app registration for providers that have client ids and client secrets */
export interface ClientRegistration {
  /** The Client ID of the app used for login. */
  clientId?: string;
  /** The app setting name that contains the client secret. */
  clientSecretSettingName?: string;
}

/** The configuration settings of the Google provider. */
export interface Google {
  /** <code>false</code> if the Google provider should not be enabled despite the set registration; otherwise, <code>true</code>. */
  enabled?: boolean;
  /** The configuration settings of the app registration for the Google provider. */
  registration?: ClientRegistration;
  /** The configuration settings of the login flow. */
  login?: LoginScopes;
  /** The configuration settings of the Azure Active Directory token validation flow. */
  validation?: AllowedAudiencesValidation;
}

/** The configuration settings of the Allowed Audiences validation flow. */
export interface AllowedAudiencesValidation {
  /** The configuration settings of the allowed list of audiences from which to validate the JWT token. */
  allowedAudiences?: Array<string>;
}

/** The configuration settings of the legacy Microsoft Account provider. */
export interface LegacyMicrosoftAccount {
  /** <code>false</code> if the legacy Microsoft Account provider should not be enabled despite the set registration; otherwise, <code>true</code>. */
  enabled?: boolean;
  /** The configuration settings of the app registration for the legacy Microsoft Account provider. */
  registration?: ClientRegistration;
  /** The configuration settings of the login flow. */
  login?: LoginScopes;
  /** The configuration settings of the legacy Microsoft Account provider token validation flow. */
  validation?: AllowedAudiencesValidation;
}

/** The configuration settings of the Twitter provider. */
export interface Twitter {
  /** <code>false</code> if the Twitter provider should not be enabled despite the set registration; otherwise, <code>true</code>. */
  enabled?: boolean;
  /** The configuration settings of the app registration for the Twitter provider. */
  registration?: TwitterRegistration;
}

/** The configuration settings of the app registration for the Twitter provider. */
export interface TwitterRegistration {
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
export interface Apple {
  /** <code>false</code> if the Apple provider should not be enabled despite the set registration; otherwise, <code>true</code>. */
  enabled?: boolean;
  /** The configuration settings of the Apple registration. */
  registration?: AppleRegistration;
  /** The configuration settings of the login flow. */
  login?: LoginScopes;
}

/** The configuration settings of the registration for the Apple provider */
export interface AppleRegistration {
  /** The Client ID of the app used for login. */
  clientId?: string;
  /** The app setting name that contains the client secret. */
  clientSecretSettingName?: string;
}

/** The configuration settings of the Azure Static Web Apps provider. */
export interface AzureStaticWebApps {
  /** <code>false</code> if the Azure Static Web Apps provider should not be enabled despite the set registration; otherwise, <code>true</code>. */
  enabled?: boolean;
  /** The configuration settings of the Azure Static Web Apps registration. */
  registration?: AzureStaticWebAppsRegistration;
}

/** The configuration settings of the registration for the Azure Static Web Apps provider */
export interface AzureStaticWebAppsRegistration {
  /** The Client ID of the app used for login. */
  clientId?: string;
}

/** The configuration settings of the custom Open ID Connect provider. */
export interface CustomOpenIdConnectProvider {
  /** <code>false</code> if the custom Open ID provider provider should not be enabled; otherwise, <code>true</code>. */
  enabled?: boolean;
  /** The configuration settings of the app registration for the custom Open ID Connect provider. */
  registration?: OpenIdConnectRegistration;
  /** The configuration settings of the login flow of the custom Open ID Connect provider. */
  login?: OpenIdConnectLogin;
}

/** The configuration settings of the app registration for the custom Open ID Connect provider. */
export interface OpenIdConnectRegistration {
  /** The client id of the custom Open ID Connect provider. */
  clientId?: string;
  /** The authentication credentials of the custom Open ID Connect provider. */
  clientCredential?: OpenIdConnectClientCredential;
  /** The configuration settings of the endpoints used for the custom Open ID Connect provider. */
  openIdConnectConfiguration?: OpenIdConnectConfig;
}

/** The authentication client credentials of the custom Open ID Connect provider. */
export interface OpenIdConnectClientCredential {
  /** The method that should be used to authenticate the user. */
  method?: "ClientSecretPost";
  /** The app setting that contains the client secret for the custom Open ID Connect provider. */
  clientSecretSettingName?: string;
}

/** The configuration settings of the endpoints used for the custom Open ID Connect provider. */
export interface OpenIdConnectConfig {
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
export interface OpenIdConnectLogin {
  /** The name of the claim that contains the users name. */
  nameClaimType?: string;
  /** A list of the scopes that should be requested while authenticating. */
  scopes?: Array<string>;
}

/** The configuration settings of the login flow of users using App Service Authentication/Authorization. */
export interface Login {
  /** The routes that specify the endpoints used for login and logout requests. */
  routes?: LoginRoutes;
  /** The configuration settings of the token store. */
  tokenStore?: TokenStore;
  /** <code>true</code> if the fragments from the request are preserved after the login request is made; otherwise, <code>false</code>. */
  preserveUrlFragmentsForLogins?: boolean;
  /**
   * External URLs that can be redirected to as part of logging in or logging out of the app. Note that the query string part of the URL is ignored.
   * This is an advanced setting typically only needed by Windows Store application backends.
   * Note that URLs within the current domain are always implicitly allowed.
   */
  allowedExternalRedirectUrls?: Array<string>;
  /** The configuration settings of the session cookie's expiration. */
  cookieExpiration?: CookieExpiration;
  /** The configuration settings of the nonce used in the login flow. */
  nonce?: Nonce;
}

/** The routes that specify the endpoints used for login and logout requests. */
export interface LoginRoutes {
  /** The endpoint at which a logout request should be made. */
  logoutEndpoint?: string;
}

/** The configuration settings of the token store. */
export interface TokenStore {
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
  fileSystem?: FileSystemTokenStore;
  /** The configuration settings of the storage of the tokens if blob storage is used. */
  azureBlobStorage?: BlobStorageTokenStore;
}

/** The configuration settings of the storage of the tokens if a file system is used. */
export interface FileSystemTokenStore {
  /** The directory in which the tokens will be stored. */
  directory?: string;
}

/** The configuration settings of the storage of the tokens if blob storage is used. */
export interface BlobStorageTokenStore {
  /** The name of the app setting containing the SAS URL of the blob storage containing the tokens. */
  sasUrlSettingName?: string;
}

/** The configuration settings of the session cookie's expiration. */
export interface CookieExpiration {
  /** The convention used when determining the session cookie's expiration. */
  convention?: "FixedTime" | "IdentityProviderDerived";
  /** The time after the request is made when the session cookie should expire. */
  timeToExpiration?: string;
}

/** The configuration settings of the nonce used in the login flow. */
export interface Nonce {
  /** <code>false</code> if the nonce should not be validated while completing the login flow; otherwise, <code>true</code>. */
  validateNonce?: boolean;
  /** The time after the request is made when the nonce should expire. */
  nonceExpirationInterval?: string;
}

/** The configuration settings of the HTTP requests for authentication and authorization requests made against App Service Authentication/Authorization. */
export interface HttpSettings {
  /** <code>false</code> if the authentication/authorization responses not having the HTTPS scheme are permissible; otherwise, <code>true</code>. */
  requireHttps?: boolean;
  /** The configuration settings of the paths HTTP requests. */
  routes?: HttpSettingsRoutes;
  /** The configuration settings of a forward proxy used to make the requests. */
  forwardProxy?: ForwardProxy;
}

/** The configuration settings of the paths HTTP requests. */
export interface HttpSettingsRoutes {
  /** The prefix that should precede all the authentication/authorization paths. */
  apiPrefix?: string;
}

/** The configuration settings of a forward proxy used to make the requests. */
export interface ForwardProxy {
  /** The convention used to determine the url of the request made. */
  convention?: "NoProxy" | "Standard" | "Custom";
  /** The name of the header containing the host of the request. */
  customHostHeaderName?: string;
  /** The name of the header containing the scheme of the request. */
  customProtoHeaderName?: string;
}

/** AzureStorageInfo dictionary resource. */
export interface AzureStoragePropertyDictionaryResource extends ProxyOnlyResource {
  /** Azure storage accounts. */
  properties?: Record<string, AzureStorageInfoValue>;
}

/** Description of site key vault references. */
export interface ApiKVReference extends ProxyOnlyResource {
  /** ApiKVReference resource specific properties */
  properties?: ApiKVReferenceProperties;
}

/** ApiKVReference resource specific properties */
export interface ApiKVReferenceProperties {
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
  identityType?: ManagedServiceIdentity;
  details?: string;
  source?: "KeyVault";
  activeVersion?: string;
}

/** String dictionary resource. */
export interface ConnectionStringDictionary extends ProxyOnlyResource {
  /** Connection strings. */
  properties?: Record<string, ConnStringValueTypePair>;
}

/** Database connection string value to type pair. */
export interface ConnStringValueTypePair {
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
export interface SiteLogsConfig extends ProxyOnlyResource {
  /** SiteLogsConfig resource specific properties */
  properties?: SiteLogsConfigProperties;
}

/** SiteLogsConfig resource specific properties */
export interface SiteLogsConfigProperties {
  /** Application logs configuration. */
  applicationLogs?: ApplicationLogsConfig;
  /** HTTP logs configuration. */
  httpLogs?: HttpLogsConfig;
  /** Failed requests tracing configuration. */
  failedRequestsTracing?: EnabledConfig;
  /** Detailed error messages configuration. */
  detailedErrorMessages?: EnabledConfig;
}

/** Application logs configuration. */
export interface ApplicationLogsConfig {
  /** Application logs to file system configuration. */
  fileSystem?: FileSystemApplicationLogsConfig;
  /** Application logs to azure table storage configuration. */
  azureTableStorage?: AzureTableStorageApplicationLogsConfig;
  /** Application logs to blob storage configuration. */
  azureBlobStorage?: AzureBlobStorageApplicationLogsConfig;
}

/** Application logs to file system configuration. */
export interface FileSystemApplicationLogsConfig {
  /** Log level. */
  level?: "Off" | "Verbose" | "Information" | "Warning" | "Error";
}

/** Application logs to Azure table storage configuration. */
export interface AzureTableStorageApplicationLogsConfig {
  /** Log level. */
  level?: "Off" | "Verbose" | "Information" | "Warning" | "Error";
  /** SAS URL to an Azure table with add/query/delete permissions. */
  sasUrl: string;
}

/** Application logs azure blob storage configuration. */
export interface AzureBlobStorageApplicationLogsConfig {
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
export interface HttpLogsConfig {
  /** Http logs to file system configuration. */
  fileSystem?: FileSystemHttpLogsConfig;
  /** Http logs to azure blob storage configuration. */
  azureBlobStorage?: AzureBlobStorageHttpLogsConfig;
}

/** Http logs to file system configuration. */
export interface FileSystemHttpLogsConfig {
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
export interface AzureBlobStorageHttpLogsConfig {
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
export interface EnabledConfig {
  /** True if configuration is enabled, false if it is disabled and null if configuration is not set. */
  enabled?: boolean;
}

/** Slot Config names azure resource. */
export interface SlotConfigNamesResource extends ProxyOnlyResource {
  /** Core resource properties */
  properties?: SlotConfigNames;
}

/**
 * Names for connection strings, application settings, and external Azure storage account configuration
 * identifiers to be marked as sticky to the deployment slot and not moved during a swap operation.
 * This is valid for all deployment slots in an app.
 */
export interface SlotConfigNames {
  /** List of connection string names. */
  connectionStringNames?: Array<string>;
  /** List of application settings names. */
  appSettingNames?: Array<string>;
  /** List of external Azure storage account identifiers. */
  azureStorageConfigNames?: Array<string>;
}

/** A snapshot of a web app configuration. */
export interface SiteConfigurationSnapshotInfo extends ProxyOnlyResource {
  /** SiteConfigurationSnapshotInfo resource specific properties */
  properties?: SiteConfigurationSnapshotInfoProperties;
}

/** SiteConfigurationSnapshotInfo resource specific properties */
export interface SiteConfigurationSnapshotInfoProperties {}

/** Continuous Web Job Information. */
export interface ContinuousWebJob extends ProxyOnlyResource {
  /** ContinuousWebJob resource specific properties */
  properties?: ContinuousWebJobProperties;
}

/** ContinuousWebJob resource specific properties */
export interface ContinuousWebJobProperties {
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

/** User credentials used for publishing activity. */
export interface Deployment extends ProxyOnlyResource {
  /** Deployment resource specific properties */
  properties?: DeploymentProperties;
}

/** Deployment resource specific properties */
export interface DeploymentProperties {
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
  start_time?: Date | string;
  /** End time. */
  end_time?: Date | string;
  /** True if deployment is currently active, false if completed and null if not started. */
  active?: boolean;
  /** Details on deployment. */
  details?: string;
}

/** MSDeploy ARM response */
export interface MSDeployStatus extends ProxyOnlyResource {
  /** MSDeployStatus resource specific properties */
  properties?: MSDeployStatusProperties;
}

/** MSDeployStatus resource specific properties */
export interface MSDeployStatusProperties {}

/** MSDeploy ARM PUT information */
export interface MSDeploy extends ProxyOnlyResource {
  /** Core resource properties */
  properties?: MSDeployCore;
}

/** MSDeploy ARM PUT core information */
export interface MSDeployCore {
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
export interface MSDeployLog extends ProxyOnlyResource {
  /** MSDeployLog resource specific properties */
  properties?: MSDeployLogProperties;
}

/** MSDeployLog resource specific properties */
export interface MSDeployLogProperties {}

/** MSDeploy log entry */
export interface MSDeployLogEntry {}

/** Function information. */
export interface FunctionEnvelope extends ProxyOnlyResource {
  /** FunctionEnvelope resource specific properties */
  properties?: FunctionEnvelopeProperties;
}

/** FunctionEnvelope resource specific properties */
export interface FunctionEnvelopeProperties {
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
export interface KeyInfo {
  /** Key name */
  name?: string;
  /** Key value */
  value?: string;
}

/** A hostname binding object. */
export interface HostNameBinding extends ProxyOnlyResource {
  /** HostNameBinding resource specific properties */
  properties?: HostNameBindingProperties;
}

/** HostNameBinding resource specific properties */
export interface HostNameBindingProperties {
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
}

/** Hybrid Connection for an App Service app. */
export interface RelayServiceConnectionEntity extends ProxyOnlyResource {
  /** RelayServiceConnectionEntity resource specific properties */
  properties?: RelayServiceConnectionEntityProperties;
}

/** RelayServiceConnectionEntity resource specific properties */
export interface RelayServiceConnectionEntityProperties {
  entityName?: string;
  entityConnectionString?: string;
  resourceType?: string;
  resourceConnectionString?: string;
  hostname?: string;
  port?: number;
  biztalkUri?: string;
}

export interface WebSiteInstanceStatus extends ProxyOnlyResource {
  /** WebSiteInstanceStatus resource specific properties */
  properties?: WebSiteInstanceStatusProperties;
}

/** WebSiteInstanceStatus resource specific properties */
export interface WebSiteInstanceStatusProperties {
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
  containers?: Record<string, ContainerInfo>;
}

export interface ContainerInfo {
  currentTimeStamp?: Date | string;
  previousTimeStamp?: Date | string;
  currentCpuStats?: ContainerCpuStatistics;
  previousCpuStats?: ContainerCpuStatistics;
  memoryStats?: ContainerMemoryStatistics;
  name?: string;
  id?: string;
  eth0?: ContainerNetworkInterfaceStatistics;
}

export interface ContainerCpuStatistics {
  cpuUsage?: ContainerCpuUsage;
  systemCpuUsage?: number;
  onlineCpuCount?: number;
  throttlingData?: ContainerThrottlingData;
}

export interface ContainerCpuUsage {
  totalUsage?: number;
  perCpuUsage?: Array<number>;
  kernelModeUsage?: number;
  userModeUsage?: number;
}

export interface ContainerThrottlingData {
  periods?: number;
  throttledPeriods?: number;
  throttledTime?: number;
}

export interface ContainerMemoryStatistics {
  usage?: number;
  maxUsage?: number;
  limit?: number;
}

export interface ContainerNetworkInterfaceStatistics {
  rxBytes?: number;
  rxPackets?: number;
  rxErrors?: number;
  rxDropped?: number;
  txBytes?: number;
  txPackets?: number;
  txErrors?: number;
  txDropped?: number;
}

/** Process Information. */
export interface ProcessInfo extends ProxyOnlyResource {
  /** ProcessInfo resource specific properties */
  properties?: ProcessInfoProperties;
}

/** ProcessInfo resource specific properties */
export interface ProcessInfoProperties {
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
  threads?: Array<ProcessThreadInfo>;
  /** List of open files. */
  open_file_handles?: Array<string>;
  /** List of modules. */
  modules?: Array<ProcessModuleInfo>;
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
  start_time?: Date | string;
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
  time_stamp?: Date | string;
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
export interface ProcessThreadInfo extends ProxyOnlyResource {
  /** ProcessThreadInfo resource specific properties */
  properties?: ProcessThreadInfoProperties;
}

/** ProcessThreadInfo resource specific properties */
export interface ProcessThreadInfoProperties {
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
  start_time?: Date | string;
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
export interface ProcessModuleInfo extends ProxyOnlyResource {
  /** ProcessModuleInfo resource specific properties */
  properties?: ProcessModuleInfoProperties;
}

/** ProcessModuleInfo resource specific properties */
export interface ProcessModuleInfoProperties {
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

/** Options for app content migration. */
export interface StorageMigrationOptions extends ProxyOnlyResource {
  /** StorageMigrationOptions resource specific properties */
  properties?: StorageMigrationOptionsProperties;
}

/** StorageMigrationOptions resource specific properties */
export interface StorageMigrationOptionsProperties {
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
export interface StorageMigrationResponse extends ProxyOnlyResource {
  /** StorageMigrationResponse resource specific properties */
  properties?: StorageMigrationResponseProperties;
}

/** StorageMigrationResponse resource specific properties */
export interface StorageMigrationResponseProperties {}

/** MySQL migration request. */
export interface MigrateMySqlRequest extends ProxyOnlyResource {
  /** MigrateMySqlRequest resource specific properties */
  properties?: MigrateMySqlRequestProperties;
}

/** MigrateMySqlRequest resource specific properties */
export interface MigrateMySqlRequestProperties {
  /** Connection string to the remote MySQL database. */
  connectionString: string;
  /** The type of migration operation to be done */
  migrationType: "LocalToRemote" | "RemoteToLocal";
}

/** MySQL migration status. */
export interface MigrateMySqlStatus extends ProxyOnlyResource {
  /** MigrateMySqlStatus resource specific properties */
  properties?: MigrateMySqlStatusProperties;
}

/** MigrateMySqlStatus resource specific properties */
export interface MigrateMySqlStatusProperties {}

/** Swift Virtual Network Contract. This is used to enable the new Swift way of doing virtual network integration. */
export interface SwiftVirtualNetwork extends ProxyOnlyResource {
  /** SwiftVirtualNetwork resource specific properties */
  properties?: SwiftVirtualNetworkProperties;
}

/** SwiftVirtualNetwork resource specific properties */
export interface SwiftVirtualNetworkProperties {
  /** The Virtual Network subnet's resource ID. This is the subnet that this Web App will join. This subnet must have a delegation to Microsoft.Web/serverFarms defined first. */
  subnetResourceId?: string;
  /** A flag that specifies if the scale unit this Web App is on supports Swift integration. */
  swiftSupported?: boolean;
}

/** Full view of network features for an app (presently VNET integration and Hybrid Connections). */
export interface NetworkFeatures extends ProxyOnlyResource {
  /** NetworkFeatures resource specific properties */
  properties?: NetworkFeaturesProperties;
}

/** NetworkFeatures resource specific properties */
export interface NetworkFeaturesProperties {}

/** Used for getting PHP error logging flag. */
export interface SitePhpErrorLogFlag extends ProxyOnlyResource {
  /** SitePhpErrorLogFlag resource specific properties */
  properties?: SitePhpErrorLogFlagProperties;
}

/** SitePhpErrorLogFlag resource specific properties */
export interface SitePhpErrorLogFlagProperties {
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
export interface PremierAddOn extends Resource {
  /** PremierAddOn resource specific properties */
  properties?: PremierAddOnProperties;
}

/** PremierAddOn resource specific properties */
export interface PremierAddOnProperties {
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
export interface PremierAddOnPatchResource extends ProxyOnlyResource {
  /** PremierAddOnPatchResource resource specific properties */
  properties?: PremierAddOnPatchResourceProperties;
}

/** PremierAddOnPatchResource resource specific properties */
export interface PremierAddOnPatchResourceProperties {
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
export interface PrivateAccess extends ProxyOnlyResource {
  /** PrivateAccess resource specific properties */
  properties?: PrivateAccessProperties;
}

/** PrivateAccess resource specific properties */
export interface PrivateAccessProperties {
  /** Whether private access is enabled or not. */
  enabled?: boolean;
  /** The Virtual Networks (and subnets) allowed to access the site privately. */
  virtualNetworks?: Array<PrivateAccessVirtualNetwork>;
}

/** Description of a Virtual Network that is useable for private site access. */
export interface PrivateAccessVirtualNetwork {
  /** The name of the Virtual Network. */
  name?: string;
  /** The key (ID) of the Virtual Network. */
  key?: number;
  /** The ARM uri of the Virtual Network */
  resourceId?: string;
  /** A List of subnets that access is allowed to on this Virtual Network. An empty array (but not null) is interpreted to mean that all subnets are allowed within this Virtual Network. */
  subnets?: Array<PrivateAccessSubnet>;
}

/** Description of a Virtual Network subnet that is useable for private site access. */
export interface PrivateAccessSubnet {
  /** The name of the subnet. */
  name?: string;
  /** The key (ID) of the subnet. */
  key?: number;
}

/** Public certificate object */
export interface PublicCertificate extends ProxyOnlyResource {
  /** PublicCertificate resource specific properties */
  properties?: PublicCertificateProperties;
}

/** PublicCertificate resource specific properties */
export interface PublicCertificateProperties {
  /**
   * Public Certificate byte array
   *
   * Value may contain base64 encoded characters
   */
  blob?: string;
  /** Public Certificate Location */
  publicCertificateLocation?: "CurrentUserMy" | "LocalMachineMy" | "Unknown";
}

/** Publishing options for requested profile. */
export interface CsmPublishingProfileOptions {
  /**
   * Name of the format. Valid values are:
   * FileZilla3
   * WebDeploy -- default
   * Ftp
   */
  format?: "FileZilla3" | "WebDeploy" | "Ftp";
  /** Include the DisasterRecover endpoint if true */
  includeDisasterRecoveryEndpoints?: boolean;
}

/** Details about restoring a deleted app. */
export interface DeletedAppRestoreRequest extends ProxyOnlyResource {
  /** DeletedAppRestoreRequest resource specific properties */
  properties?: DeletedAppRestoreRequestProperties;
}

/** DeletedAppRestoreRequest resource specific properties */
export interface DeletedAppRestoreRequestProperties {
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
export interface SnapshotRestoreRequest extends ProxyOnlyResource {
  /** SnapshotRestoreRequest resource specific properties */
  properties?: SnapshotRestoreRequestProperties;
}

/** SnapshotRestoreRequest resource specific properties */
export interface SnapshotRestoreRequestProperties {
  /** Point in time in which the app restore should be done, formatted as a DateTime string. */
  snapshotTime?: string;
  /**
   * Optional. Specifies the web app that snapshot contents will be retrieved from.
   * If empty, the targeted web app will be used as the source.
   */
  recoverySource?: SnapshotRecoverySource;
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
export interface SnapshotRecoverySource {
  /** Geographical location of the source web app, e.g. SouthEastAsia, SouthCentralUS */
  location?: string;
  /**
   * ARM resource ID of the source app.
   * /subscriptions/{subId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{siteName} for production slots and
   * /subscriptions/{subId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{siteName}/slots/{slotName} for other slots.
   */
  id?: string;
}

/** Site Extension Information. */
export interface SiteExtensionInfo extends ProxyOnlyResource {
  /** SiteExtensionInfo resource specific properties */
  properties?: SiteExtensionInfoProperties;
}

/** SiteExtensionInfo resource specific properties */
export interface SiteExtensionInfoProperties {
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
  published_date_time?: Date | string;
  /** Count of downloads. */
  download_count?: number;
  /** <code>true</code> if the local version is the latest version; <code>false</code> otherwise. */
  local_is_latest_version?: boolean;
  /** Local path. */
  local_path?: string;
  /** Installed timestamp. */
  installed_date_time?: Date | string;
  /** Provisioning state. */
  provisioningState?: string;
  /** Site Extension comment. */
  comment?: string;
}

/** A setting difference between two deployment slots of an app. */
export interface SlotDifference extends ProxyOnlyResource {
  /** SlotDifference resource specific properties */
  properties?: SlotDifferenceProperties;
}

/** SlotDifference resource specific properties */
export interface SlotDifferenceProperties {}

/** Source control configuration for an app. */
export interface SiteSourceControl extends ProxyOnlyResource {
  /** SiteSourceControl resource specific properties */
  properties?: SiteSourceControlProperties;
}

/** SiteSourceControl resource specific properties */
export interface SiteSourceControlProperties {
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
  gitHubActionConfiguration?: GitHubActionConfiguration;
}

/** The GitHub action configuration. */
export interface GitHubActionConfiguration {
  /** GitHub Action code configuration. */
  codeConfiguration?: GitHubActionCodeConfiguration;
  /** GitHub Action container configuration. */
  containerConfiguration?: GitHubActionContainerConfiguration;
  /** This will help determine the workflow configuration to select. */
  isLinux?: boolean;
  /** Workflow option to determine whether the workflow file should be generated and written to the repository. */
  generateWorkflowFile?: boolean;
}

/** The GitHub action code configuration. */
export interface GitHubActionCodeConfiguration {
  /** Runtime stack is used to determine the workflow file content for code base apps. */
  runtimeStack?: string;
  /** Runtime version is used to determine what build version to set in the workflow file. */
  runtimeVersion?: string;
}

/** The GitHub action container configuration. */
export interface GitHubActionContainerConfiguration {
  /** The server URL for the container registry where the build will be hosted. */
  serverUrl?: string;
  /** The image name for the build. */
  imageName?: string;
  /** The username used to upload the image to the container registry. */
  username?: string;
  /** The password used to upload the image to the container registry. */
  password?: string;
}

/** Triggered Web Job Information. */
export interface TriggeredWebJob extends ProxyOnlyResource {
  /** TriggeredWebJob resource specific properties */
  properties?: TriggeredWebJobProperties;
}

/** TriggeredWebJob resource specific properties */
export interface TriggeredWebJobProperties {
  /** Latest job run information. */
  latest_run?: TriggeredJobRun;
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
export interface TriggeredJobRun {
  /** Job ID. */
  web_job_id?: string;
  /** Job name. */
  web_job_name?: string;
  /** Job status. */
  status?: "Success" | "Failed" | "Error";
  /** Start time. */
  start_time?: Date | string;
  /** End time. */
  end_time?: Date | string;
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

/** Triggered Web Job History. List of Triggered Web Job Run Information elements. */
export interface TriggeredJobHistory extends ProxyOnlyResource {
  /** TriggeredJobHistory resource specific properties */
  properties?: TriggeredJobHistoryProperties;
}

/** TriggeredJobHistory resource specific properties */
export interface TriggeredJobHistoryProperties {
  /** List of triggered web job runs. */
  runs?: Array<TriggeredJobRun>;
}

/** Web Job Information. */
export interface WebJob extends ProxyOnlyResource {
  /** WebJob resource specific properties */
  properties?: WebJobProperties;
}

/** WebJob resource specific properties */
export interface WebJobProperties {
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
