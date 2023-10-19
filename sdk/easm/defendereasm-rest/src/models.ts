// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/** The items in the current page of results. */
export interface AssetResourceParent {
  /** The caller provided unique name for the resource. */
  name?: string;
  /** The name that can be used for display purposes. */
  displayName?: string;
  /** Global UUID for the asset. */
  uuid?: string;
  /** The date this asset was first added to this workspace. */
  createdDate?: Date | string;
  /** The date this asset was last updated for this workspace. */
  updatedDate?: Date | string;
  /** Possible values: candidate, confirmed, dismissed, candidateInvestigate, associatedPartner, associatedThirdparty, archived */
  state?: string;
  /** An optional customer provided identifier for this asset. */
  externalId?: string;
  /** Customer labels assigned to this asset. */
  labels?: string[];
  /** An indicator of whether this asset represents a wildcard rollup of assets on this domain. */
  wildcard?: boolean;
  /** The name of the DiscoGroup that brought added this asset to the workspace. */
  discoGroupName?: string;
  /** The history of how this asset was pulled into the workspace through the discovery process. */
  auditTrail?: Array<AuditTrailItem>;
  reason?: string;
  kind: string;
}

/** The history of how this asset was pulled into the workspace through the discovery process. */
export interface AuditTrailItem {
  /** The system generated unique id for the resource. */
  id?: string;
  /** The caller provided unique name for the resource. */
  name?: string;
  /** The name that can be used for display purposes. */
  displayName?: string;
  /**
   * The kind of asset.
   *
   * Possible values: as, contact, domain, host, ipAddress, ipBlock, page, sslCert
   */
  kind?: string;
  /** An explanation of why this audit trail node was discovered from the previous node. */
  reason?: string;
}

export interface AsAssetResource extends AssetResourceParent {
  /** The kind of AssetResource */
  kind: "as";
  /** asset */
  asset: AsAsset;
}

export interface AsAsset extends InventoryAsset {
  asn?: number;
  asNames?: Array<ObservedString>;
  orgNames?: Array<ObservedString>;
  orgIds?: Array<ObservedString>;
  countries?: Array<ObservedString>;
  registries?: Array<ObservedString>;
  sources?: Array<Source>;
  firstSeen?: Date | string;
  lastSeen?: Date | string;
  count?: number;
  registrarCreatedAt?: Array<ObservedLong>;
  registrarUpdatedAt?: Array<ObservedLong>;
  registrantContacts?: Array<ObservedString>;
  adminContacts?: Array<ObservedString>;
  technicalContacts?: Array<ObservedString>;
  registrarNames?: Array<ObservedString>;
  registrantNames?: Array<ObservedString>;
  adminNames?: Array<ObservedString>;
  technicalNames?: Array<ObservedString>;
  adminOrgs?: Array<ObservedString>;
  technicalOrgs?: Array<ObservedString>;
  registrantPhones?: Array<ObservedString>;
  adminPhones?: Array<ObservedString>;
  technicalPhones?: Array<ObservedString>;
  detailedFromWhoisAt?: Date | string;
}

export interface ObservedString extends ObservedValue {
  value?: string;
  sources?: Array<Source>;
}

export interface Source {
  source?: string;
  firstSeen?: Date | string;
  lastSeen?: Date | string;
  count?: number;
  reason?: string;
}

/** Template model for observed values */
export interface ObservedValue {
  firstSeen?: Date | string;
  lastSeen?: Date | string;
  count?: number;
  recent?: boolean;
}

export interface ObservedLong extends ObservedValue {
  value?: number;
  sources?: Array<Source>;
}

export interface ObservedInteger extends ObservedValue {
  value?: number;
  sources?: Array<Source>;
}

export interface ObservedBoolean extends ObservedValue {
  value?: boolean;
  sources?: Array<Source>;
}

export interface ObservedHeader extends ObservedValue {
  headerName?: string;
  headerValue?: string;
}

export interface ObservedPortState extends ObservedValue {
  /** Possible values: open, closed, filtered */
  value?: string;
  port?: number;
}

export interface ObservedLocation extends ObservedValue {
  value?: Location;
  sources?: Array<Source>;
}

export interface Location {
  countryCode?: string;
  countryName?: string;
  region?: string;
  regionName?: string;
  city?: string;
  areaCode?: number;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
  dmaCode?: number;
  metroCodeId?: number;
}

export interface ObservedIntegers extends ObservedValue {
  values?: number[];
  sources?: Array<Source>;
}

export interface InventoryAsset {}

export interface ContactAsset extends InventoryAsset {
  email?: string;
  names?: Array<ObservedString>;
  organizations?: Array<ObservedString>;
  sources?: Array<Source>;
  firstSeen?: Date | string;
  lastSeen?: Date | string;
  count?: number;
}

export interface DomainAsset extends InventoryAsset {
  domain?: string;
  whoisId?: number;
  registrarIanaIds?: Array<ObservedInteger>;
  registrantContacts?: Array<ObservedString>;
  registrantOrgs?: Array<ObservedString>;
  adminContacts?: Array<ObservedString>;
  technicalContacts?: Array<ObservedString>;
  alexaInfos?: Array<AlexaInfo>;
  nameServers?: Array<ObservedString>;
  mailServers?: Array<ObservedString>;
  whoisServers?: Array<ObservedString>;
  domainStatuses?: Array<ObservedString>;
  registrarCreatedAt?: Array<ObservedLong>;
  registrarUpdatedAt?: Array<ObservedLong>;
  registrarExpiresAt?: Array<ObservedLong>;
  soaRecords?: Array<SoaRecord>;
  detailedFromWhoisAt?: Date | string;
  registrarNames?: Array<ObservedString>;
  sources?: Array<Source>;
  firstSeen?: Date | string;
  lastSeen?: Date | string;
  count?: number;
  parkedDomain?: Array<ObservedBoolean>;
  registrantNames?: Array<ObservedString>;
  adminNames?: Array<ObservedString>;
  technicalNames?: Array<ObservedString>;
  adminOrgs?: Array<ObservedString>;
  technicalOrgs?: Array<ObservedString>;
  registrantPhones?: Array<ObservedString>;
  adminPhones?: Array<ObservedString>;
  technicalPhones?: Array<ObservedString>;
}

export interface AlexaInfo {
  alexaRank?: number;
  category?: string;
  firstSeen?: Date | string;
  lastSeen?: Date | string;
  count?: number;
  recent?: boolean;
}

export interface SoaRecord {
  nameServer?: string;
  email?: string;
  firstSeen?: Date | string;
  lastSeen?: Date | string;
  count?: number;
  serialNumber?: number;
  recent?: boolean;
}

export interface HostAsset extends InventoryAsset {
  host?: string;
  domain?: string;
  ipAddresses?: Array<ObservedString>;
  webComponents?: Array<WebComponent>;
  headers?: Array<ObservedHeader>;
  attributes?: Array<Attribute>;
  cookies?: Array<Cookie>;
  sslCerts?: Array<SslCertAsset>;
  parentHosts?: Array<ObservedString>;
  childHosts?: Array<ObservedString>;
  hostCore?: HostCore;
  services?: Array<Service>;
  cnames?: Array<ObservedString>;
  sources?: Array<Source>;
  firstSeen?: Date | string;
  lastSeen?: Date | string;
  count?: number;
  resourceUrls?: Array<ResourceUrl>;
  scanMetadata?: Array<ScanMetadata>;
  asns?: Array<ObservedLong>;
  ipBlocks?: Array<IpBlock>;
  responseBodies?: Array<ObservedString>;
  domainAsset?: DomainAsset;
  nsRecord?: Array<ObservedBoolean>;
  mxRecord?: Array<ObservedBoolean>;
  webserver?: Array<ObservedBoolean>;
  location?: Array<ObservedLocation>;
  nxdomain?: Array<ObservedBoolean>;
  sslServerConfig?: Array<SslServerConfig>;
  isWildcard?: Array<ObservedBoolean>;
  banners?: Array<Banner>;
  ipv4?: Array<ObservedBoolean>;
  ipv6?: Array<ObservedBoolean>;
}

export interface WebComponent {
  name?: string;
  type?: string;
  version?: string;
  ruleId?: string[];
  firstSeen?: Date | string;
  lastSeen?: Date | string;
  count?: number;
  cve?: Array<Cve>;
  endOfLife?: number;
  recent?: boolean;
  ports?: Array<Port>;
  sources?: Array<Source>;
  service?: string;
}

export interface Cve {
  name?: string;
  cweId?: string;
  cvssScore?: number;
  cvss3Summary?: Cvss3Summary;
}

export interface Cvss3Summary {
  version?: string;
  vectorString?: string;
  attackVector?: string;
  attackComplexity?: string;
  privilegesRequired?: string;
  userInteraction?: string;
  scope?: string;
  confidentialityImpact?: string;
  integrityImpact?: string;
  availabilityImpact?: string;
  baseScore?: number;
  baseSeverity?: string;
  exploitCodeMaturity?: string;
  remediationLevel?: string;
  reportConfidence?: string;
  exploitabilityScore?: number;
  impactScore?: number;
}

export interface Port {
  port?: number;
  firstSeen?: Date | string;
  lastSeen?: Date | string;
  count?: number;
}

export interface Attribute {
  attributeType?: string;
  attributeValue?: string;
  sources?: Array<Source>;
  firstSeen?: Date | string;
  lastSeen?: Date | string;
  count?: number;
  recent?: boolean;
}

export interface Cookie {
  cookieName?: string;
  cookieDomain?: string;
  firstSeen?: Date | string;
  lastSeen?: Date | string;
  count?: number;
  recent?: boolean;
  cookieExpiryDate?: Date | string;
}

export interface SslCertAsset extends InventoryAsset {
  sha1?: string;
  subjectCommonNames?: string[];
  organizations?: string[];
  organizationalUnits?: string[];
  issuerCommonNames?: string[];
  sigAlgName?: string;
  invalidAfter?: Date | string;
  serialNumber?: string;
  subjectAlternativeNames?: string[];
  issuerAlternativeNames?: string[];
  sources?: Array<Source>;
  firstSeen?: Date | string;
  lastSeen?: Date | string;
  count?: number;
  invalidBefore?: Date | string;
  keySize?: number;
  keyAlgorithm?: string;
  subjectLocality?: string[];
  subjectState?: string[];
  subjectCountry?: string[];
  issuerLocality?: string[];
  issuerState?: string[];
  issuerCountry?: string[];
  subjectOrganizations?: string[];
  subjectOrganizationalUnits?: string[];
  issuerOrganizations?: string[];
  issuerOrganizationalUnits?: string[];
  version?: number;
  certificateAuthority?: boolean;
  selfSigned?: boolean;
  sigAlgOid?: string;
  recent?: boolean;
  /** Possible values: domainValidation, organizationValidation, extendedValidation */
  validationType?: string;
}

export interface HostCore {
  host?: string;
  domain?: string;
  firstSeen?: Date | string;
  lastSeen?: Date | string;
  count?: number;
  blacklistCauseFirstSeen?: Date | string;
  blacklistCauseLastSeen?: Date | string;
  blacklistCauseCount?: number;
  blacklistResourceFirstSeen?: Date | string;
  blacklistResourceLastSeen?: Date | string;
  blacklistResourceCount?: number;
  blacklistSequenceFirstSeen?: Date | string;
  blacklistSequenceLastSeen?: Date | string;
  blacklistSequenceCount?: number;
  phishCauseCount?: number;
  malwareCauseCount?: number;
  spamCauseCount?: number;
  scamCauseCount?: number;
  phishResourceCount?: number;
  malwareResourceCount?: number;
  spamResourceCount?: number;
  scamResourceCount?: number;
  phishSequenceCount?: number;
  malwareSequenceCount?: number;
  spamSequenceCount?: number;
  scamSequenceCount?: number;
  alexaRank?: number;
  hostReputationScore?: number;
  hostPhishReputationScore?: number;
  hostMalwareReputationScore?: number;
  hostSpamReputationScore?: number;
  hostScamReputationScore?: number;
  domainReputationScore?: number;
  domainPhishReputationScore?: number;
  domainMalwareReputationScore?: number;
  domainSpamReputationScore?: number;
  domainScamReputationScore?: number;
  uuid?: string;
}

export interface Service {
  scheme?: string;
  port?: number;
  webComponents?: Array<WebComponent>;
  sslCerts?: Array<SslCertAsset>;
  exceptions?: Array<ObservedString>;
  sources?: Array<Source>;
  firstSeen?: Date | string;
  lastSeen?: Date | string;
  count?: number;
  recent?: boolean;
  portStates?: Array<ObservedPortState>;
}

export interface ResourceUrl {
  url?: string;
  resources?: Array<DependentResource>;
  firstSeen?: Date | string;
  lastSeen?: Date | string;
  count?: number;
  recent?: boolean;
}

export interface DependentResource {
  md5?: string;
  responseBodySize?: number;
  firstSeen?: Date | string;
  lastSeen?: Date | string;
  count?: number;
  firstSeenCrawlGuid?: string;
  firstSeenPageGuid?: string;
  firstSeenResourceGuid?: string;
  lastSeenCrawlGuid?: string;
  lastSeenPageGuid?: string;
  lastSeenResourceGuid?: string;
  responseBodyMinhash?: number[];
  contentType?: string;
  sha256?: string;
  sha384?: string;
  sha512?: string;
  url?: string;
  cached?: boolean;
  sriChecks?: Array<SubResourceIntegrityCheck>;
  host?: string;
  lastObservedViolation?: Date | string;
  lastObservedValidation?: Date | string;
  lastObservedActualSriHash?: string;
  lastObservedExpectedSriHash?: string;
}

export interface SubResourceIntegrityCheck {
  violation?: boolean;
  firstSeen?: Date | string;
  lastSeen?: Date | string;
  count?: number;
  causePageUrl?: string;
  crawlGuid?: string;
  pageGuid?: string;
  resourceGuid?: string;
  expectedHash?: string;
}

export interface ScanMetadata {
  port?: number;
  bannerMetadata?: string;
  startScan?: Date | string;
  endScan?: Date | string;
}

export interface IpBlock {
  ipBlock?: string;
  sources?: Array<Source>;
  firstSeen?: Date | string;
  lastSeen?: Date | string;
  count?: number;
  recent?: boolean;
}

export interface SslServerConfig {
  tlsVersions?: string[];
  cipherSuites?: string[];
  firstSeen?: Date | string;
  lastSeen?: Date | string;
  count?: number;
  sources?: Array<Source>;
}

export interface Banner {
  port?: number;
  banner?: string;
  firstSeen?: Date | string;
  lastSeen?: Date | string;
  count?: number;
  scanType?: string;
  bannerMetadata?: string;
  recent?: boolean;
  sha256?: string;
  sources?: Array<Source>;
}

export interface IpAddressAsset extends InventoryAsset {
  ipAddress?: string;
  asns?: Array<ObservedLong>;
  reputations?: Array<Reputation>;
  webComponents?: Array<WebComponent>;
  netRanges?: Array<ObservedString>;
  headers?: Array<ObservedHeader>;
  attributes?: Array<Attribute>;
  cookies?: Array<Cookie>;
  sslCerts?: Array<SslCertAsset>;
  services?: Array<Service>;
  ipBlocks?: Array<IpBlock>;
  sources?: Array<Source>;
  firstSeen?: Date | string;
  lastSeen?: Date | string;
  count?: number;
  banners?: Array<Banner>;
  scanMetadata?: Array<ScanMetadata>;
  nsRecord?: Array<ObservedBoolean>;
  mxRecord?: Array<ObservedBoolean>;
  location?: Array<ObservedLocation>;
  hosts?: Array<ObservedString>;
  nxdomain?: Array<ObservedBoolean>;
  sslServerConfig?: Array<SslServerConfig>;
  ipv4?: boolean;
  ipv6?: boolean;
}

export interface Reputation {
  listName?: string;
  threatType?: string;
  trusted?: boolean;
  cidr?: string;
  firstSeen?: Date | string;
  lastSeen?: Date | string;
  listUpdatedAt?: Date | string;
  recent?: boolean;
}

export interface IpBlockAsset extends InventoryAsset {
  ipBlock?: string;
  asns?: Array<ObservedLong>;
  bgpPrefixes?: Array<ObservedString>;
  netNames?: Array<ObservedString>;
  registrantContacts?: Array<ObservedString>;
  registrantOrgs?: Array<ObservedString>;
  adminContacts?: Array<ObservedString>;
  technicalContacts?: Array<ObservedString>;
  registrarCreatedAt?: Array<ObservedLong>;
  registrarUpdatedAt?: Array<ObservedLong>;
  netRanges?: Array<ObservedString>;
  startIp?: string;
  endIp?: string;
  reputations?: Array<Reputation>;
  detailedFromWhoisAt?: Date | string;
  sources?: Array<Source>;
  firstSeen?: Date | string;
  lastSeen?: Date | string;
  count?: number;
  location?: Array<ObservedLocation>;
  registrarExpiresAt?: Array<ObservedLong>;
  registrantNames?: Array<ObservedString>;
  adminNames?: Array<ObservedString>;
  technicalNames?: Array<ObservedString>;
  adminOrgs?: Array<ObservedString>;
  technicalOrgs?: Array<ObservedString>;
  registrantPhones?: Array<ObservedString>;
  adminPhones?: Array<ObservedString>;
  technicalPhones?: Array<ObservedString>;
  ipv4?: boolean;
  ipv6?: boolean;
}

export interface PageAsset extends InventoryAsset {
  url?: string;
  httpMethod?: string;
  service?: string;
  ipAddresses?: Array<ObservedString>;
  successful?: Array<ObservedBoolean>;
  httpResponseCodes?: Array<ObservedInteger>;
  httpResponseMessages?: Array<ObservedString>;
  responseTimes?: Array<ObservedLong>;
  frames?: Array<ObservedBoolean>;
  windows?: Array<ObservedBoolean>;
  nonHtmlFrames?: Array<ObservedBoolean>;
  undirectedContent?: Array<ObservedBoolean>;
  contentTypes?: Array<ObservedString>;
  contentLengths?: Array<ObservedLong>;
  windowNames?: Array<ObservedString>;
  charsets?: Array<ObservedString>;
  titles?: Array<ObservedString>;
  languages?: Array<ObservedString>;
  responseHeaders?: Array<ObservedHeader>;
  cookies?: Array<Cookie>;
  webComponents?: Array<WebComponent>;
  attributes?: Array<Attribute>;
  assetSecurityPolicies?: Array<AssetSecurityPolicy>;
  responseBodyMinhashSignatures?: Array<ObservedIntegers>;
  fullDomMinhashSignatures?: Array<ObservedIntegers>;
  responseBodyHashSignatures?: Array<ObservedString>;
  errors?: Array<ObservedString>;
  sslCerts?: Array<SslCertAsset>;
  sources?: Array<Source>;
  firstSeen?: Date | string;
  lastSeen?: Date | string;
  count?: number;
  cause?: PageCause;
  referrer?: string;
  redirectUrls?: Array<ObservedString>;
  /** Possible values: httpHeader, metaRefresh, javascript, final */
  redirectType?: string;
  finalUrls?: Array<ObservedString>;
  finalResponseCodes?: Array<ObservedInteger>;
  parkedPage?: Array<ObservedBoolean>;
  resourceUrls?: Array<ResourceUrl>;
  guids?: Array<GuidPair>;
  finalIpAddresses?: Array<ObservedString>;
  asns?: Array<ObservedLong>;
  ipBlocks?: Array<IpBlock>;
  finalAsns?: Array<ObservedLong>;
  finalIpBlocks?: Array<IpBlock>;
  responseBodies?: Array<ObservedString>;
  domainAsset?: DomainAsset;
  rootUrl?: ObservedBoolean;
  isRootUrl?: boolean;
  location?: Array<ObservedLocation>;
  services?: Array<Service>;
  siteStatus?: string;
  cnames?: Array<ObservedString>;
  cdns?: Array<ObservedString>;
  host?: string;
  domain?: string;
  sslServerConfig?: Array<SslServerConfig>;
  gdprAssetSecurityPolicies?: Array<AssetSecurityPolicy>;
  ipv4?: Array<ObservedBoolean>;
  ipv6?: Array<ObservedBoolean>;
}

export interface AssetSecurityPolicy {
  policyName?: string;
  isAffected?: boolean;
  description?: string;
  firstSeen?: Date | string;
  lastSeen?: Date | string;
  count?: number;
  recent?: boolean;
  sources?: Array<Source>;
}

export interface PageCause {
  cause?: string;
  causeElementXPath?: string;
  location?: string;
  possibleMatches?: number;
  loopDetected?: boolean;
  version?: number;
  domChangeIndex?: number;
}

export interface GuidPair {
  pageGuid?: string;
  crawlStateGuid?: string;
  loadDate?: Date | string;
  recent?: boolean;
}

export interface ContactAssetResource extends AssetResourceParent {
  /** The kind of AssetResource */
  kind: "contact";
  /** asset */
  asset: ContactAsset;
}

export interface DomainAssetResource extends AssetResourceParent {
  /** The kind of AssetResource */
  kind: "domain";
  /** asset */
  asset: DomainAsset;
}

export interface HostAssetResource extends AssetResourceParent {
  /** The kind of AssetResource */
  kind: "host";
  /** asset */
  asset: HostAsset;
}

export interface IpAddressAssetResource extends AssetResourceParent {
  /** The kind of AssetResource */
  kind: "ipAddress";
  /** asset */
  asset: IpAddressAsset;
}

export interface IpBlockAssetResource extends AssetResourceParent {
  /** The kind of AssetResource */
  kind: "ipBlock";
  /** asset */
  asset: IpBlockAsset;
}

export interface PageAssetResource extends AssetResourceParent {
  /** The kind of AssetResource */
  kind: "page";
  /** asset */
  asset: PageAsset;
}

export interface SslCertAssetResource extends AssetResourceParent {
  /** The kind of AssetResource */
  kind: "sslCert";
  /** asset */
  asset: SslCertAsset;
}

export interface DataConnectionParent {
  /** The system generated unique id for the resource. */
  id?: string;
  /** The name that can be used for display purposes. */
  displayName?: string;
  /**
   * The type of data the data connection will transfer
   *
   * Possible values: assets, attackSurfaceInsights
   */
  content?: string;
  /**
   * The rate at which the data connection will receive updates.
   *
   * Possible values: daily, weekly, monthly
   */
  frequency?: string;
  /** The day to update the data connection on. */
  frequencyOffset?: number;
  /** An indicator of whether the data connection is active. */
  active?: boolean;
  kind: string;
}

export interface LogAnalyticsDataConnection extends DataConnectionParent {
  /** The kind of DataConnection */
  kind: "logAnalytics";
  /** properties */
  properties: LogAnalyticsDataConnectionProperties;
}

export interface LogAnalyticsDataConnectionProperties
  extends DataConnectionProperties {
  /** log analytics api key */
  apiKey?: string;
  /** log analytics workspace id */
  workspaceId?: string;
}

/** The properties required to establish connection to a particular service */
export interface DataConnectionProperties {}

export interface AzureDataExplorerDataConnectionProperties
  extends DataConnectionProperties {
  /** The azure data explorer cluster name */
  clusterName?: string;
  /** The azure data explorer region */
  region?: string;
  /** The azure data explorer database name */
  databaseName?: string;
}

export interface AzureDataExplorerDataConnection extends DataConnectionParent {
  /** The kind of DataConnection */
  kind: "azureDataExplorer";
  /** properties */
  properties: AzureDataExplorerDataConnectionProperties;
}

export interface DataConnectionDataParent {
  /** The name of data connection */
  name?: string;
  /**
   * The type of data the data connection will transfer.
   *
   * Possible values: assets, attackSurfaceInsights
   */
  content?: string;
  /**
   * The rate at which the data connection will receive updates.
   *
   * Possible values: daily, weekly, monthly
   */
  frequency?: string;
  /** The day to update the data connection on. (1-7 for weekly, 1-31 for monthly) */
  frequencyOffset?: number;
  kind: string;
}

export interface DiscoGroup {
  /** The system generated unique id for the resource. */
  id?: string;
  /** The name that can be used for display purposes. */
  displayName?: string;
  /** The description for a disco group. */
  description?: string;
  /** The tier for the disco group which will affect the algorithm used for the disco runs in this group. */
  tier?: string;
  /** The frequency at which the disco group is supposed to be rerun in milliseconds. */
  frequencyMilliseconds?: number;
  /** The list of seeds used for the disco group runs. */
  seeds?: Array<DiscoSource>;
  /** The list of names used for the disco group runs. */
  names?: string[];
  /** The list of excludes used for the disco group runs, aka assets to exclude from the discovery algorithm. */
  excludes?: Array<DiscoSource>;
  /** The latest run of this disco group with some limited information, null if the group has never been run. */
  latestRun?: DiscoRunResult;
  /** The date for the disco group was created. */
  createdDate?: Date | string;
  /** The unique identifier for the disco template used for the disco group creation. */
  templateId?: string;
}

/** Source entity used to drive discovery. */
export interface DiscoSource {
  /**
   * The kind of disco source.
   *
   * Possible values: as, attribute, contact, domain, host, ipBlock
   */
  kind?: string;
  /** The name for the disco source. */
  name?: string;
}

/** The latest run of this disco group with some limited information, null if the group has never been run. */
export interface DiscoRunResult {
  /** The date for when the disco run was created in the system. */
  submittedDate?: Date | string;
  /** The date for when the disco run was actually started by the system. */
  startedDate?: Date | string;
  /** The date for when the disco run was completed by the system. */
  completedDate?: Date | string;
  /** The tier which will affect the algorithm used for the disco run. */
  tier?: string;
  /**
   * The State of the disco run.
   *
   * Possible values: pending, running, completed, failed
   */
  state?: string;
  /** The total count of assets that were found this disco run. */
  totalAssetsFoundCount?: number;
  /** The list of seeds used for the disco run. */
  seeds?: Array<DiscoSource>;
  /** The list of excludes used for the disco run, aka assets to exclude from the discovery algorithm. */
  excludes?: Array<DiscoSource>;
  /** The list of names used for the disco run. */
  names?: string[];
}

/** A request body used to create a discovery group. */
export interface DiscoGroupData {
  /** The name for a disco group. */
  name?: string;
  /** The description for a disco group. */
  description?: string;
  /** The tier for the disco group which will affect the algorithm used for the disco runs in this group. */
  tier?: string;
  /** The frequency at which the disco group is supposed to be rerun in milliseconds. */
  frequencyMilliseconds?: number;
  /** The list of seeds used for the disco group runs. */
  seeds?: Array<DiscoSource>;
  /** The list of names used for the disco group runs. */
  names?: string[];
  /** The list of excludes used for the disco group runs, aka assets to exclude from the discovery algorithm. */
  excludes?: Array<DiscoSource>;
  /** The unique identifier for the disco template used for the disco group creation. */
  templateId?: string;
}

/** A request body used to retrieve an asset report snapshot. */
export interface ReportAssetSnapshotRequest {
  /** The metric to retrieve a snapshot for. */
  metric?: string;
  /** The name of the label to retrieve a snapshot for. */
  labelName?: string;
  /** The number of assets per page. */
  size?: number;
  /** The page to retrieve. */
  page?: number;
}

/** A request body used to retrieve summary asset information. One and only one collection of summary identifiers must be provided: filters, metrics, or metricCategories. */
export interface ReportAssetSummaryRequest {
  /** Categories to retrieve risk reporting data for. */
  metricCategories?: string[];
  /** Metrics to retrieve risk reporting data for. */
  metrics?: string[];
  /** Query filters to apply to the asset summary. */
  filters?: string[];
  /** A parameter to group the assets by (first level facet field), only used when the chosen summary identifier is filters. */
  groupBy?: string;
  /** A parameter to segment the assets by (second level facet field), only used when the chosen summary identifier is filters. */
  segmentBy?: string;
  /** Currently unused. */
  labelName?: string;
}

export interface SavedFilter {
  /** The system generated unique id for the resource. */
  id?: string;
  /** The name that can be used for display purposes. */
  displayName?: string;
  filter?: string;
  description?: string;
}

/** The items in the current page of results. */
export type AssetResource =
  | AsAssetResource
  | ContactAssetResource
  | DomainAssetResource
  | HostAssetResource
  | IpAddressAssetResource
  | IpBlockAssetResource
  | PageAssetResource
  | SslCertAssetResource;
export type DataConnection =
  | LogAnalyticsDataConnection
  | AzureDataExplorerDataConnection;
export type DataConnectionData =
  | LogAnalyticsDataConnectionData
  | AzureDataExplorerDataConnectionData;
