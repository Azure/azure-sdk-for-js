// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../../static-helpers/serialization/check-prop-undefined.js";
import type { Severity, ResourceDetails, ResourceDetailsUnion } from "../common/models.js";
import {
  resourceDetailsUnionSerializer,
  resourceDetailsUnionDeserializer,
} from "../common/models.js";
import type { ProxyResource, Resource, ExtensionResource } from "../models.js";
import { systemDataDeserializer } from "../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Security assessment metadata response */
export interface SecurityAssessmentMetadataResponse extends ProxyResource {
  /** User friendly display name of the assessment */
  displayName?: string;
  /** Azure resource ID of the policy definition that turns this assessment calculation on */
  readonly policyDefinitionId?: string;
  /** Human readable description of the assessment */
  description?: string;
  /** Human readable description of what you should do to mitigate this security issue */
  remediationDescription?: string;
  categories?: Categories[];
  /** The severity level of the assessment */
  severity?: Severity;
  /** The user impact of the assessment */
  userImpact?: UserImpact;
  /** The implementation effort required to remediate this assessment */
  implementationEffort?: ImplementationEffort;
  threats?: Threats[];
  /** True if this assessment is in preview release status */
  preview?: boolean;
  /** BuiltIn if the assessment based on built-in Azure Policy definition, Custom if the assessment based on custom Azure Policy definition */
  assessmentType?: AssessmentType;
  /** Describes the partner that created the assessment */
  partnerData?: SecurityAssessmentMetadataPartnerData;
  publishDates?: SecurityAssessmentMetadataPropertiesResponsePublishDates;
  plannedDeprecationDate?: string;
  tactics?: Tactics[];
  techniques?: Techniques[];
}

export function securityAssessmentMetadataResponseSerializer(
  item: SecurityAssessmentMetadataResponse,
): any {
  return {
    properties: areAllPropsUndefined(item, [
      "displayName",
      "description",
      "remediationDescription",
      "categories",
      "severity",
      "userImpact",
      "implementationEffort",
      "threats",
      "preview",
      "assessmentType",
      "partnerData",
      "publishDates",
      "plannedDeprecationDate",
      "tactics",
      "techniques",
    ])
      ? undefined
      : _securityAssessmentMetadataResponsePropertiesSerializer(item),
  };
}

export function securityAssessmentMetadataResponseDeserializer(
  item: any,
): SecurityAssessmentMetadataResponse {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _securityAssessmentMetadataResponsePropertiesDeserializer(item["properties"])),
  };
}

/** Describes properties of an assessment metadata response. */
export interface SecurityAssessmentMetadataPropertiesResponse extends SecurityAssessmentMetadataProperties {
  publishDates?: SecurityAssessmentMetadataPropertiesResponsePublishDates;
  plannedDeprecationDate?: string;
  tactics?: Tactics[];
  techniques?: Techniques[];
}

export function securityAssessmentMetadataPropertiesResponseSerializer(
  item: SecurityAssessmentMetadataPropertiesResponse,
): any {
  return {
    displayName: item["displayName"],
    description: item["description"],
    remediationDescription: item["remediationDescription"],
    categories: !item["categories"]
      ? item["categories"]
      : item["categories"].map((p: any) => {
          return p;
        }),
    severity: item["severity"],
    userImpact: item["userImpact"],
    implementationEffort: item["implementationEffort"],
    threats: !item["threats"]
      ? item["threats"]
      : item["threats"].map((p: any) => {
          return p;
        }),
    preview: item["preview"],
    assessmentType: item["assessmentType"],
    partnerData: !item["partnerData"]
      ? item["partnerData"]
      : securityAssessmentMetadataPartnerDataSerializer(item["partnerData"]),
    publishDates: !item["publishDates"]
      ? item["publishDates"]
      : securityAssessmentMetadataPropertiesResponsePublishDatesSerializer(item["publishDates"]),
    plannedDeprecationDate: item["plannedDeprecationDate"],
    tactics: !item["tactics"]
      ? item["tactics"]
      : item["tactics"].map((p: any) => {
          return p;
        }),
    techniques: !item["techniques"]
      ? item["techniques"]
      : item["techniques"].map((p: any) => {
          return p;
        }),
  };
}

export function securityAssessmentMetadataPropertiesResponseDeserializer(
  item: any,
): SecurityAssessmentMetadataPropertiesResponse {
  return {
    displayName: item["displayName"],
    policyDefinitionId: item["policyDefinitionId"],
    description: item["description"],
    remediationDescription: item["remediationDescription"],
    categories: !item["categories"]
      ? item["categories"]
      : item["categories"].map((p: any) => {
          return p;
        }),
    severity: item["severity"],
    userImpact: item["userImpact"],
    implementationEffort: item["implementationEffort"],
    threats: !item["threats"]
      ? item["threats"]
      : item["threats"].map((p: any) => {
          return p;
        }),
    preview: item["preview"],
    assessmentType: item["assessmentType"],
    partnerData: !item["partnerData"]
      ? item["partnerData"]
      : securityAssessmentMetadataPartnerDataDeserializer(item["partnerData"]),
    publishDates: !item["publishDates"]
      ? item["publishDates"]
      : securityAssessmentMetadataPropertiesResponsePublishDatesDeserializer(item["publishDates"]),
    plannedDeprecationDate: item["plannedDeprecationDate"],
    tactics: !item["tactics"]
      ? item["tactics"]
      : item["tactics"].map((p: any) => {
          return p;
        }),
    techniques: !item["techniques"]
      ? item["techniques"]
      : item["techniques"].map((p: any) => {
          return p;
        }),
  };
}

/** model interface SecurityAssessmentMetadataPropertiesResponsePublishDates */
export interface SecurityAssessmentMetadataPropertiesResponsePublishDates {
  ga?: string;
  public: string;
}

export function securityAssessmentMetadataPropertiesResponsePublishDatesSerializer(
  item: SecurityAssessmentMetadataPropertiesResponsePublishDates,
): any {
  return { GA: item["ga"], public: item["public"] };
}

export function securityAssessmentMetadataPropertiesResponsePublishDatesDeserializer(
  item: any,
): SecurityAssessmentMetadataPropertiesResponsePublishDates {
  return {
    ga: item["GA"],
    public: item["public"],
  };
}

/** Tactic of the assessment */
export enum KnownTactics {
  /** Reconnaissance */
  Reconnaissance = "Reconnaissance",
  /** Resource Development */
  ResourceDevelopment = "Resource Development",
  /** Initial Access */
  InitialAccess = "Initial Access",
  /** Execution */
  Execution = "Execution",
  /** Persistence */
  Persistence = "Persistence",
  /** Privilege Escalation */
  PrivilegeEscalation = "Privilege Escalation",
  /** Defense Evasion */
  DefenseEvasion = "Defense Evasion",
  /** Credential Access */
  CredentialAccess = "Credential Access",
  /** Discovery */
  Discovery = "Discovery",
  /** Lateral Movement */
  LateralMovement = "Lateral Movement",
  /** Collection */
  Collection = "Collection",
  /** Command and Control */
  CommandAndControl = "Command and Control",
  /** Exfiltration */
  Exfiltration = "Exfiltration",
  /** Impact */
  Impact = "Impact",
}

/**
 * Tactic of the assessment \
 * {@link KnownTactics} can be used interchangeably with Tactics,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Reconnaissance**: Reconnaissance \
 * **Resource Development**: Resource Development \
 * **Initial Access**: Initial Access \
 * **Execution**: Execution \
 * **Persistence**: Persistence \
 * **Privilege Escalation**: Privilege Escalation \
 * **Defense Evasion**: Defense Evasion \
 * **Credential Access**: Credential Access \
 * **Discovery**: Discovery \
 * **Lateral Movement**: Lateral Movement \
 * **Collection**: Collection \
 * **Command and Control**: Command and Control \
 * **Exfiltration**: Exfiltration \
 * **Impact**: Impact
 */
export type Tactics = string;

/** Techniques of the assessment */
export enum KnownTechniques {
  /** Abuse Elevation Control Mechanism */
  AbuseElevationControlMechanism = "Abuse Elevation Control Mechanism",
  /** Access Token Manipulation */
  AccessTokenManipulation = "Access Token Manipulation",
  /** Account Discovery */
  AccountDiscovery = "Account Discovery",
  /** Account Manipulation */
  AccountManipulation = "Account Manipulation",
  /** Active Scanning */
  ActiveScanning = "Active Scanning",
  /** Application Layer Protocol */
  ApplicationLayerProtocol = "Application Layer Protocol",
  /** Audio Capture */
  AudioCapture = "Audio Capture",
  /** Boot or Logon Autostart Execution */
  BootOrLogonAutostartExecution = "Boot or Logon Autostart Execution",
  /** Boot or Logon Initialization Scripts */
  BootOrLogonInitializationScripts = "Boot or Logon Initialization Scripts",
  /** Brute Force */
  BruteForce = "Brute Force",
  /** Cloud Infrastructure Discovery */
  CloudInfrastructureDiscovery = "Cloud Infrastructure Discovery",
  /** Cloud Service Dashboard */
  CloudServiceDashboard = "Cloud Service Dashboard",
  /** Cloud Service Discovery */
  CloudServiceDiscovery = "Cloud Service Discovery",
  /** Command and Scripting Interpreter */
  CommandAndScriptingInterpreter = "Command and Scripting Interpreter",
  /** Compromise Client Software Binary */
  CompromiseClientSoftwareBinary = "Compromise Client Software Binary",
  /** Compromise Infrastructure */
  CompromiseInfrastructure = "Compromise Infrastructure",
  /** Container and Resource Discovery */
  ContainerAndResourceDiscovery = "Container and Resource Discovery",
  /** Create Account */
  CreateAccount = "Create Account",
  /** Create or Modify System Process */
  CreateOrModifySystemProcess = "Create or Modify System Process",
  /** Credentials from Password Stores */
  CredentialsFromPasswordStores = "Credentials from Password Stores",
  /** Data Destruction */
  DataDestruction = "Data Destruction",
  /** Data Encrypted for Impact */
  DataEncryptedForImpact = "Data Encrypted for Impact",
  /** Data from Cloud Storage Object */
  DataFromCloudStorageObject = "Data from Cloud Storage Object",
  /** Data from Configuration Repository */
  DataFromConfigurationRepository = "Data from Configuration Repository",
  /** Data from Information Repositories */
  DataFromInformationRepositories = "Data from Information Repositories",
  /** Data from Local System */
  DataFromLocalSystem = "Data from Local System",
  /** Data Manipulation */
  DataManipulation = "Data Manipulation",
  /** Data Staged */
  DataStaged = "Data Staged",
  /** Defacement */
  Defacement = "Defacement",
  /** Deobfuscate/Decode Files or Information */
  DeobfuscateDecodeFilesOrInformation = "Deobfuscate/Decode Files or Information",
  /** Disk Wipe */
  DiskWipe = "Disk Wipe",
  /** Domain Trust Discovery */
  DomainTrustDiscovery = "Domain Trust Discovery",
  /** Drive-by Compromise */
  DriveByCompromise = "Drive-by Compromise",
  /** Dynamic Resolution */
  DynamicResolution = "Dynamic Resolution",
  /** Endpoint Denial of Service */
  EndpointDenialOfService = "Endpoint Denial of Service",
  /** Event Triggered Execution */
  EventTriggeredExecution = "Event Triggered Execution",
  /** Exfiltration Over Alternative Protocol */
  ExfiltrationOverAlternativeProtocol = "Exfiltration Over Alternative Protocol",
  /** Exploit Public-Facing Application */
  ExploitPublicFacingApplication = "Exploit Public-Facing Application",
  /** Exploitation for Client Execution */
  ExploitationForClientExecution = "Exploitation for Client Execution",
  /** Exploitation for Credential Access */
  ExploitationForCredentialAccess = "Exploitation for Credential Access",
  /** Exploitation for Defense Evasion */
  ExploitationForDefenseEvasion = "Exploitation for Defense Evasion",
  /** Exploitation for Privilege Escalation */
  ExploitationForPrivilegeEscalation = "Exploitation for Privilege Escalation",
  /** Exploitation of Remote Services */
  ExploitationOfRemoteServices = "Exploitation of Remote Services",
  /** External Remote Services */
  ExternalRemoteServices = "External Remote Services",
  /** Fallback Channels */
  FallbackChannels = "Fallback Channels",
  /** File and Directory Discovery */
  FileAndDirectoryDiscovery = "File and Directory Discovery",
  /** Gather Victim Network Information */
  GatherVictimNetworkInformation = "Gather Victim Network Information",
  /** Hide Artifacts */
  HideArtifacts = "Hide Artifacts",
  /** Hijack Execution Flow */
  HijackExecutionFlow = "Hijack Execution Flow",
  /** Impair Defenses */
  ImpairDefenses = "Impair Defenses",
  /** Implant Container Image */
  ImplantContainerImage = "Implant Container Image",
  /** Indicator Removal on Host */
  IndicatorRemovalOnHost = "Indicator Removal on Host",
  /** Indirect Command Execution */
  IndirectCommandExecution = "Indirect Command Execution",
  /** Ingress Tool Transfer */
  IngressToolTransfer = "Ingress Tool Transfer",
  /** Input Capture */
  InputCapture = "Input Capture",
  /** Inter-Process Communication */
  InterProcessCommunication = "Inter-Process Communication",
  /** Lateral Tool Transfer */
  LateralToolTransfer = "Lateral Tool Transfer",
  /** Man-in-the-Middle */
  ManInTheMiddle = "Man-in-the-Middle",
  /** Masquerading */
  Masquerading = "Masquerading",
  /** Modify Authentication Process */
  ModifyAuthenticationProcess = "Modify Authentication Process",
  /** Modify Registry */
  ModifyRegistry = "Modify Registry",
  /** Network Denial of Service */
  NetworkDenialOfService = "Network Denial of Service",
  /** Network Service Scanning */
  NetworkServiceScanning = "Network Service Scanning",
  /** Network Sniffing */
  NetworkSniffing = "Network Sniffing",
  /** Non-Application Layer Protocol */
  NonApplicationLayerProtocol = "Non-Application Layer Protocol",
  /** Non-Standard Port */
  NonStandardPort = "Non-Standard Port",
  /** Obtain Capabilities */
  ObtainCapabilities = "Obtain Capabilities",
  /** Obfuscated Files or Information */
  ObfuscatedFilesOrInformation = "Obfuscated Files or Information",
  /** Office Application Startup */
  OfficeApplicationStartup = "Office Application Startup",
  /** OS Credential Dumping */
  OSCredentialDumping = "OS Credential Dumping",
  /** Permission Groups Discovery */
  PermissionGroupsDiscovery = "Permission Groups Discovery",
  /** Phishing */
  Phishing = "Phishing",
  /** Pre-OS Boot */
  PreOSBoot = "Pre-OS Boot",
  /** Process Discovery */
  ProcessDiscovery = "Process Discovery",
  /** Process Injection */
  ProcessInjection = "Process Injection",
  /** Protocol Tunneling */
  ProtocolTunneling = "Protocol Tunneling",
  /** Proxy */
  Proxy = "Proxy",
  /** Query Registry */
  QueryRegistry = "Query Registry",
  /** Remote Access Software */
  RemoteAccessSoftware = "Remote Access Software",
  /** Remote Service Session Hijacking */
  RemoteServiceSessionHijacking = "Remote Service Session Hijacking",
  /** Remote Services */
  RemoteServices = "Remote Services",
  /** Remote System Discovery */
  RemoteSystemDiscovery = "Remote System Discovery",
  /** Resource Hijacking */
  ResourceHijacking = "Resource Hijacking",
  /** Scheduled Task/Job */
  ScheduledTaskJob = "Scheduled Task/Job",
  /** Screen Capture */
  ScreenCapture = "Screen Capture",
  /** Search Victim-Owned Websites */
  SearchVictimOwnedWebsites = "Search Victim-Owned Websites",
  /** Server Software Component */
  ServerSoftwareComponent = "Server Software Component",
  /** Service Stop */
  ServiceStop = "Service Stop",
  /** Signed Binary Proxy Execution */
  SignedBinaryProxyExecution = "Signed Binary Proxy Execution",
  /** Software Deployment Tools */
  SoftwareDeploymentTools = "Software Deployment Tools",
  /** SQL Stored Procedures */
  SQLStoredProcedures = "SQL Stored Procedures",
  /** Steal or Forge Kerberos Tickets */
  StealOrForgeKerberosTickets = "Steal or Forge Kerberos Tickets",
  /** Subvert Trust Controls */
  SubvertTrustControls = "Subvert Trust Controls",
  /** Supply Chain Compromise */
  SupplyChainCompromise = "Supply Chain Compromise",
  /** System Information Discovery */
  SystemInformationDiscovery = "System Information Discovery",
  /** Taint Shared Content */
  TaintSharedContent = "Taint Shared Content",
  /** Traffic Signaling */
  TrafficSignaling = "Traffic Signaling",
  /** Transfer Data to Cloud Account */
  TransferDataToCloudAccount = "Transfer Data to Cloud Account",
  /** Trusted Relationship */
  TrustedRelationship = "Trusted Relationship",
  /** Unsecured Credentials */
  UnsecuredCredentials = "Unsecured Credentials",
  /** User Execution */
  UserExecution = "User Execution",
  /** Valid Accounts */
  ValidAccounts = "Valid Accounts",
  /** Windows Management Instrumentation */
  WindowsManagementInstrumentation = "Windows Management Instrumentation",
  /** File and Directory Permissions Modification */
  FileAndDirectoryPermissionsModification = "File and Directory Permissions Modification",
}

/**
 * Techniques of the assessment \
 * {@link KnownTechniques} can be used interchangeably with Techniques,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Abuse Elevation Control Mechanism**: Abuse Elevation Control Mechanism \
 * **Access Token Manipulation**: Access Token Manipulation \
 * **Account Discovery**: Account Discovery \
 * **Account Manipulation**: Account Manipulation \
 * **Active Scanning**: Active Scanning \
 * **Application Layer Protocol**: Application Layer Protocol \
 * **Audio Capture**: Audio Capture \
 * **Boot or Logon Autostart Execution**: Boot or Logon Autostart Execution \
 * **Boot or Logon Initialization Scripts**: Boot or Logon Initialization Scripts \
 * **Brute Force**: Brute Force \
 * **Cloud Infrastructure Discovery**: Cloud Infrastructure Discovery \
 * **Cloud Service Dashboard**: Cloud Service Dashboard \
 * **Cloud Service Discovery**: Cloud Service Discovery \
 * **Command and Scripting Interpreter**: Command and Scripting Interpreter \
 * **Compromise Client Software Binary**: Compromise Client Software Binary \
 * **Compromise Infrastructure**: Compromise Infrastructure \
 * **Container and Resource Discovery**: Container and Resource Discovery \
 * **Create Account**: Create Account \
 * **Create or Modify System Process**: Create or Modify System Process \
 * **Credentials from Password Stores**: Credentials from Password Stores \
 * **Data Destruction**: Data Destruction \
 * **Data Encrypted for Impact**: Data Encrypted for Impact \
 * **Data from Cloud Storage Object**: Data from Cloud Storage Object \
 * **Data from Configuration Repository**: Data from Configuration Repository \
 * **Data from Information Repositories**: Data from Information Repositories \
 * **Data from Local System**: Data from Local System \
 * **Data Manipulation**: Data Manipulation \
 * **Data Staged**: Data Staged \
 * **Defacement**: Defacement \
 * **Deobfuscate\/Decode Files or Information**: Deobfuscate\/Decode Files or Information \
 * **Disk Wipe**: Disk Wipe \
 * **Domain Trust Discovery**: Domain Trust Discovery \
 * **Drive-by Compromise**: Drive-by Compromise \
 * **Dynamic Resolution**: Dynamic Resolution \
 * **Endpoint Denial of Service**: Endpoint Denial of Service \
 * **Event Triggered Execution**: Event Triggered Execution \
 * **Exfiltration Over Alternative Protocol**: Exfiltration Over Alternative Protocol \
 * **Exploit Public-Facing Application**: Exploit Public-Facing Application \
 * **Exploitation for Client Execution**: Exploitation for Client Execution \
 * **Exploitation for Credential Access**: Exploitation for Credential Access \
 * **Exploitation for Defense Evasion**: Exploitation for Defense Evasion \
 * **Exploitation for Privilege Escalation**: Exploitation for Privilege Escalation \
 * **Exploitation of Remote Services**: Exploitation of Remote Services \
 * **External Remote Services**: External Remote Services \
 * **Fallback Channels**: Fallback Channels \
 * **File and Directory Discovery**: File and Directory Discovery \
 * **Gather Victim Network Information**: Gather Victim Network Information \
 * **Hide Artifacts**: Hide Artifacts \
 * **Hijack Execution Flow**: Hijack Execution Flow \
 * **Impair Defenses**: Impair Defenses \
 * **Implant Container Image**: Implant Container Image \
 * **Indicator Removal on Host**: Indicator Removal on Host \
 * **Indirect Command Execution**: Indirect Command Execution \
 * **Ingress Tool Transfer**: Ingress Tool Transfer \
 * **Input Capture**: Input Capture \
 * **Inter-Process Communication**: Inter-Process Communication \
 * **Lateral Tool Transfer**: Lateral Tool Transfer \
 * **Man-in-the-Middle**: Man-in-the-Middle \
 * **Masquerading**: Masquerading \
 * **Modify Authentication Process**: Modify Authentication Process \
 * **Modify Registry**: Modify Registry \
 * **Network Denial of Service**: Network Denial of Service \
 * **Network Service Scanning**: Network Service Scanning \
 * **Network Sniffing**: Network Sniffing \
 * **Non-Application Layer Protocol**: Non-Application Layer Protocol \
 * **Non-Standard Port**: Non-Standard Port \
 * **Obtain Capabilities**: Obtain Capabilities \
 * **Obfuscated Files or Information**: Obfuscated Files or Information \
 * **Office Application Startup**: Office Application Startup \
 * **OS Credential Dumping**: OS Credential Dumping \
 * **Permission Groups Discovery**: Permission Groups Discovery \
 * **Phishing**: Phishing \
 * **Pre-OS Boot**: Pre-OS Boot \
 * **Process Discovery**: Process Discovery \
 * **Process Injection**: Process Injection \
 * **Protocol Tunneling**: Protocol Tunneling \
 * **Proxy**: Proxy \
 * **Query Registry**: Query Registry \
 * **Remote Access Software**: Remote Access Software \
 * **Remote Service Session Hijacking**: Remote Service Session Hijacking \
 * **Remote Services**: Remote Services \
 * **Remote System Discovery**: Remote System Discovery \
 * **Resource Hijacking**: Resource Hijacking \
 * **Scheduled Task\/Job**: Scheduled Task\/Job \
 * **Screen Capture**: Screen Capture \
 * **Search Victim-Owned Websites**: Search Victim-Owned Websites \
 * **Server Software Component**: Server Software Component \
 * **Service Stop**: Service Stop \
 * **Signed Binary Proxy Execution**: Signed Binary Proxy Execution \
 * **Software Deployment Tools**: Software Deployment Tools \
 * **SQL Stored Procedures**: SQL Stored Procedures \
 * **Steal or Forge Kerberos Tickets**: Steal or Forge Kerberos Tickets \
 * **Subvert Trust Controls**: Subvert Trust Controls \
 * **Supply Chain Compromise**: Supply Chain Compromise \
 * **System Information Discovery**: System Information Discovery \
 * **Taint Shared Content**: Taint Shared Content \
 * **Traffic Signaling**: Traffic Signaling \
 * **Transfer Data to Cloud Account**: Transfer Data to Cloud Account \
 * **Trusted Relationship**: Trusted Relationship \
 * **Unsecured Credentials**: Unsecured Credentials \
 * **User Execution**: User Execution \
 * **Valid Accounts**: Valid Accounts \
 * **Windows Management Instrumentation**: Windows Management Instrumentation \
 * **File and Directory Permissions Modification**: File and Directory Permissions Modification
 */
export type Techniques = string;

/** Describes properties of an assessment metadata. */
export interface SecurityAssessmentMetadataProperties {
  /** User friendly display name of the assessment */
  displayName: string;
  /** Azure resource ID of the policy definition that turns this assessment calculation on */
  readonly policyDefinitionId?: string;
  /** Human readable description of the assessment */
  description?: string;
  /** Human readable description of what you should do to mitigate this security issue */
  remediationDescription?: string;
  categories?: Categories[];
  /** The severity level of the assessment */
  severity: Severity;
  /** The user impact of the assessment */
  userImpact?: UserImpact;
  /** The implementation effort required to remediate this assessment */
  implementationEffort?: ImplementationEffort;
  threats?: Threats[];
  /** True if this assessment is in preview release status */
  preview?: boolean;
  /** BuiltIn if the assessment based on built-in Azure Policy definition, Custom if the assessment based on custom Azure Policy definition */
  assessmentType: AssessmentType;
  /** Describes the partner that created the assessment */
  partnerData?: SecurityAssessmentMetadataPartnerData;
}

export function securityAssessmentMetadataPropertiesSerializer(
  item: SecurityAssessmentMetadataProperties,
): any {
  return {
    displayName: item["displayName"],
    description: item["description"],
    remediationDescription: item["remediationDescription"],
    categories: !item["categories"]
      ? item["categories"]
      : item["categories"].map((p: any) => {
          return p;
        }),
    severity: item["severity"],
    userImpact: item["userImpact"],
    implementationEffort: item["implementationEffort"],
    threats: !item["threats"]
      ? item["threats"]
      : item["threats"].map((p: any) => {
          return p;
        }),
    preview: item["preview"],
    assessmentType: item["assessmentType"],
    partnerData: !item["partnerData"]
      ? item["partnerData"]
      : securityAssessmentMetadataPartnerDataSerializer(item["partnerData"]),
  };
}

export function securityAssessmentMetadataPropertiesDeserializer(
  item: any,
): SecurityAssessmentMetadataProperties {
  return {
    displayName: item["displayName"],
    policyDefinitionId: item["policyDefinitionId"],
    description: item["description"],
    remediationDescription: item["remediationDescription"],
    categories: !item["categories"]
      ? item["categories"]
      : item["categories"].map((p: any) => {
          return p;
        }),
    severity: item["severity"],
    userImpact: item["userImpact"],
    implementationEffort: item["implementationEffort"],
    threats: !item["threats"]
      ? item["threats"]
      : item["threats"].map((p: any) => {
          return p;
        }),
    preview: item["preview"],
    assessmentType: item["assessmentType"],
    partnerData: !item["partnerData"]
      ? item["partnerData"]
      : securityAssessmentMetadataPartnerDataDeserializer(item["partnerData"]),
  };
}

/** The categories of resource that is at risk when the assessment is unhealthy */
export enum KnownCategories {
  /** Compute */
  Compute = "Compute",
  /** Networking */
  Networking = "Networking",
  /** Data */
  Data = "Data",
  /** IdentityAndAccess */
  IdentityAndAccess = "IdentityAndAccess",
  /** IoT */
  IoT = "IoT",
  /** Container */
  Container = "Container",
  /** AppServices */
  AppServices = "AppServices",
}

/**
 * The categories of resource that is at risk when the assessment is unhealthy \
 * {@link KnownCategories} can be used interchangeably with Categories,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Compute**: Compute \
 * **Networking**: Networking \
 * **Data**: Data \
 * **IdentityAndAccess**: IdentityAndAccess \
 * **IoT**: IoT \
 * **Container**: Container \
 * **AppServices**: AppServices
 */
export type Categories = string;

/** The user impact of the assessment */
export enum KnownUserImpact {
  /** Low */
  Low = "Low",
  /** Moderate */
  Moderate = "Moderate",
  /** High */
  High = "High",
}

/**
 * The user impact of the assessment \
 * {@link KnownUserImpact} can be used interchangeably with UserImpact,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Low**: Low \
 * **Moderate**: Moderate \
 * **High**: High
 */
export type UserImpact = string;

/** The implementation effort required to remediate this assessment */
export enum KnownImplementationEffort {
  /** Low */
  Low = "Low",
  /** Moderate */
  Moderate = "Moderate",
  /** High */
  High = "High",
}

/**
 * The implementation effort required to remediate this assessment \
 * {@link KnownImplementationEffort} can be used interchangeably with ImplementationEffort,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Low**: Low \
 * **Moderate**: Moderate \
 * **High**: High
 */
export type ImplementationEffort = string;

/** Threats impact of the assessment */
export enum KnownThreats {
  /** accountBreach */
  AccountBreach = "accountBreach",
  /** dataExfiltration */
  DataExfiltration = "dataExfiltration",
  /** dataSpillage */
  DataSpillage = "dataSpillage",
  /** maliciousInsider */
  MaliciousInsider = "maliciousInsider",
  /** elevationOfPrivilege */
  ElevationOfPrivilege = "elevationOfPrivilege",
  /** threatResistance */
  ThreatResistance = "threatResistance",
  /** missingCoverage */
  MissingCoverage = "missingCoverage",
  /** denialOfService */
  DenialOfService = "denialOfService",
}

/**
 * Threats impact of the assessment \
 * {@link KnownThreats} can be used interchangeably with Threats,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **accountBreach**: accountBreach \
 * **dataExfiltration**: dataExfiltration \
 * **dataSpillage**: dataSpillage \
 * **maliciousInsider**: maliciousInsider \
 * **elevationOfPrivilege**: elevationOfPrivilege \
 * **threatResistance**: threatResistance \
 * **missingCoverage**: missingCoverage \
 * **denialOfService**: denialOfService
 */
export type Threats = string;

/** BuiltIn if the assessment based on built-in Azure Policy definition, Custom if the assessment based on custom Azure Policy definition */
export enum KnownAssessmentType {
  /** Unknown assessment type */
  Unknown = "Unknown",
  /** Microsoft Defender for Cloud managed assessments */
  BuiltIn = "BuiltIn",
  /** User defined custom assessments */
  Custom = "Custom",
  /** User defined policies that are automatically ingested from Azure Policy to Microsoft Defender for Cloud */
  CustomPolicy = "CustomPolicy",
  /** User assessments pushed directly by the user or other third party to Microsoft Defender for Cloud */
  CustomerManaged = "CustomerManaged",
  /** Microsoft Defender for Cloud managed policies */
  BuiltInPolicy = "BuiltInPolicy",
  /** Third party assessments that are verified by Microsoft Defender for Cloud */
  VerifiedPartner = "VerifiedPartner",
  /** Microsoft Defender for Cloud managed policies that are manually created by the user */
  ManualBuiltInPolicy = "ManualBuiltInPolicy",
  /** Microsoft Defender for Cloud managed assessments that are manually created by the user */
  ManualBuiltIn = "ManualBuiltIn",
  /** User defined policies that are manually created by the user */
  ManualCustomPolicy = "ManualCustomPolicy",
  /** Microsoft Defender for Cloud managed assessments that are dynamically created by the system */
  DynamicBuiltIn = "DynamicBuiltIn",
}

/**
 * BuiltIn if the assessment based on built-in Azure Policy definition, Custom if the assessment based on custom Azure Policy definition \
 * {@link KnownAssessmentType} can be used interchangeably with AssessmentType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: Unknown assessment type \
 * **BuiltIn**: Microsoft Defender for Cloud managed assessments \
 * **Custom**: User defined custom assessments \
 * **CustomPolicy**: User defined policies that are automatically ingested from Azure Policy to Microsoft Defender for Cloud \
 * **CustomerManaged**: User assessments pushed directly by the user or other third party to Microsoft Defender for Cloud \
 * **BuiltInPolicy**: Microsoft Defender for Cloud managed policies \
 * **VerifiedPartner**: Third party assessments that are verified by Microsoft Defender for Cloud \
 * **ManualBuiltInPolicy**: Microsoft Defender for Cloud managed policies that are manually created by the user \
 * **ManualBuiltIn**: Microsoft Defender for Cloud managed assessments that are manually created by the user \
 * **ManualCustomPolicy**: User defined policies that are manually created by the user \
 * **DynamicBuiltIn**: Microsoft Defender for Cloud managed assessments that are dynamically created by the system
 */
export type AssessmentType = string;

/** Describes the partner that created the assessment */
export interface SecurityAssessmentMetadataPartnerData {
  /** Name of the company of the partner */
  partnerName: string;
  /** Name of the product of the partner that created the assessment */
  productName?: string;
  /** Secret to authenticate the partner and verify it created the assessment - write only */
  secret: string;
}

export function securityAssessmentMetadataPartnerDataSerializer(
  item: SecurityAssessmentMetadataPartnerData,
): any {
  return {
    partnerName: item["partnerName"],
    productName: item["productName"],
    secret: item["secret"],
  };
}

export function securityAssessmentMetadataPartnerDataDeserializer(
  item: any,
): SecurityAssessmentMetadataPartnerData {
  return {
    partnerName: item["partnerName"],
    productName: item["productName"],
    secret: item["secret"],
  };
}

/** List of security assessment metadata */
export interface _SecurityAssessmentMetadataResponseList {
  readonly value?: SecurityAssessmentMetadataResponse[];
  /** The URI to fetch the next page. */
  nextLink?: string;
}

export function _securityAssessmentMetadataResponseListDeserializer(
  item: any,
): _SecurityAssessmentMetadataResponseList {
  return {
    value: !item["value"]
      ? item["value"]
      : securityAssessmentMetadataResponseArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function securityAssessmentMetadataResponseArraySerializer(
  result: Array<SecurityAssessmentMetadataResponse>,
): any[] {
  return result.map((item) => {
    return securityAssessmentMetadataResponseSerializer(item);
  });
}

export function securityAssessmentMetadataResponseArrayDeserializer(
  result: Array<SecurityAssessmentMetadataResponse>,
): any[] {
  return result.map((item) => {
    return securityAssessmentMetadataResponseDeserializer(item);
  });
}

/** Security assessment on a resource - response format */
export interface SecurityAssessmentResponse extends ExtensionResource {
  /** External model of risk result */
  risk?: SecurityAssessmentPropertiesBaseRisk;
  /** Details of the resource that was assessed */
  resourceDetails?: ResourceDetailsUnion;
  /** User friendly display name of the assessment */
  readonly displayName?: string;
  /** Additional data regarding the assessment */
  additionalData?: Record<string, string>;
  /** Links relevant to the assessment */
  readonly links?: AssessmentLinks;
  /** Describes properties of an assessment metadata. */
  metadata?: SecurityAssessmentMetadataProperties;
  /** Data regarding 3rd party partner integration */
  partnersData?: SecurityAssessmentPartnerData;
  /** The result of the assessment */
  status?: AssessmentStatusResponse;
}

export function securityAssessmentResponseDeserializer(item: any): SecurityAssessmentResponse {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _securityAssessmentResponsePropertiesDeserializer(item["properties"])),
  };
}

/** Describes properties of an assessment. */
export interface SecurityAssessmentPropertiesResponse extends SecurityAssessmentPropertiesBase {
  /** The result of the assessment */
  status: AssessmentStatusResponse;
}

export function securityAssessmentPropertiesResponseDeserializer(
  item: any,
): SecurityAssessmentPropertiesResponse {
  return {
    risk: !item["risk"]
      ? item["risk"]
      : securityAssessmentPropertiesBaseRiskDeserializer(item["risk"]),
    resourceDetails: resourceDetailsUnionDeserializer(item["resourceDetails"]),
    displayName: item["displayName"],
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : Object.fromEntries(
          Object.entries(item["additionalData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    links: !item["links"] ? item["links"] : assessmentLinksDeserializer(item["links"]),
    metadata: !item["metadata"]
      ? item["metadata"]
      : securityAssessmentMetadataPropertiesDeserializer(item["metadata"]),
    partnersData: !item["partnersData"]
      ? item["partnersData"]
      : securityAssessmentPartnerDataDeserializer(item["partnersData"]),
    status: assessmentStatusResponseDeserializer(item["status"]),
  };
}

/** The result of the assessment */
export interface AssessmentStatusResponse extends AssessmentStatus {
  /** The time that the assessment was created and first evaluated. Returned as UTC time in ISO 8601 format */
  readonly firstEvaluationDate?: Date;
  /** The time that the status of the assessment last changed. Returned as UTC time in ISO 8601 format */
  readonly statusChangeDate?: Date;
}

export function assessmentStatusResponseDeserializer(item: any): AssessmentStatusResponse {
  return {
    code: item["code"],
    cause: item["cause"],
    description: item["description"],
    firstEvaluationDate: !item["firstEvaluationDate"]
      ? item["firstEvaluationDate"]
      : new Date(item["firstEvaluationDate"]),
    statusChangeDate: !item["statusChangeDate"]
      ? item["statusChangeDate"]
      : new Date(item["statusChangeDate"]),
  };
}

/** The result of the assessment */
export interface AssessmentStatus {
  /** Programmatic code for the status of the assessment */
  code: AssessmentStatusCode;
  /** Programmatic code for the cause of the assessment status */
  cause?: string;
  /** Human readable description of the assessment status */
  description?: string;
}

export function assessmentStatusSerializer(item: AssessmentStatus): any {
  return { code: item["code"], cause: item["cause"], description: item["description"] };
}

export function assessmentStatusDeserializer(item: any): AssessmentStatus {
  return {
    code: item["code"],
    cause: item["cause"],
    description: item["description"],
  };
}

/** Programmatic code for the status of the assessment */
export enum KnownAssessmentStatusCode {
  /** The resource is healthy */
  Healthy = "Healthy",
  /** The resource has a security issue that needs to be addressed */
  Unhealthy = "Unhealthy",
  /** Assessment for this resource did not happen */
  NotApplicable = "NotApplicable",
}

/**
 * Programmatic code for the status of the assessment \
 * {@link KnownAssessmentStatusCode} can be used interchangeably with AssessmentStatusCode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Healthy**: The resource is healthy \
 * **Unhealthy**: The resource has a security issue that needs to be addressed \
 * **NotApplicable**: Assessment for this resource did not happen
 */
export type AssessmentStatusCode = string;

/** Describes properties of an assessment. */
export interface SecurityAssessmentPropertiesBase {
  /** External model of risk result */
  risk?: SecurityAssessmentPropertiesBaseRisk;
  /** Details of the resource that was assessed */
  resourceDetails: ResourceDetailsUnion;
  /** User friendly display name of the assessment */
  readonly displayName?: string;
  /** Additional data regarding the assessment */
  additionalData?: Record<string, string>;
  /** Links relevant to the assessment */
  readonly links?: AssessmentLinks;
  /** Describes properties of an assessment metadata. */
  metadata?: SecurityAssessmentMetadataProperties;
  /** Data regarding 3rd party partner integration */
  partnersData?: SecurityAssessmentPartnerData;
}

export function securityAssessmentPropertiesBaseSerializer(
  item: SecurityAssessmentPropertiesBase,
): any {
  return {
    risk: !item["risk"]
      ? item["risk"]
      : securityAssessmentPropertiesBaseRiskSerializer(item["risk"]),
    resourceDetails: resourceDetailsUnionSerializer(item["resourceDetails"]),
    additionalData: item["additionalData"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : securityAssessmentMetadataPropertiesSerializer(item["metadata"]),
    partnersData: !item["partnersData"]
      ? item["partnersData"]
      : securityAssessmentPartnerDataSerializer(item["partnersData"]),
  };
}

export function securityAssessmentPropertiesBaseDeserializer(
  item: any,
): SecurityAssessmentPropertiesBase {
  return {
    risk: !item["risk"]
      ? item["risk"]
      : securityAssessmentPropertiesBaseRiskDeserializer(item["risk"]),
    resourceDetails: resourceDetailsUnionDeserializer(item["resourceDetails"]),
    displayName: item["displayName"],
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : Object.fromEntries(
          Object.entries(item["additionalData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    links: !item["links"] ? item["links"] : assessmentLinksDeserializer(item["links"]),
    metadata: !item["metadata"]
      ? item["metadata"]
      : securityAssessmentMetadataPropertiesDeserializer(item["metadata"]),
    partnersData: !item["partnersData"]
      ? item["partnersData"]
      : securityAssessmentPartnerDataDeserializer(item["partnersData"]),
  };
}

/** External model of risk result */
export interface SecurityAssessmentPropertiesBaseRisk {
  /** The factors of the risk adding base factor */
  riskFactors?: string[];
  /** The risk level */
  level?: RiskLevel;
  /** The attack paths references of the risk */
  attackPathsReferences?: string[];
  paths?: SecurityAssessmentPropertiesBaseRiskPathsItem[];
  /** Indicates if the risk is contextual or static */
  isContextualRisk?: boolean;
}

export function securityAssessmentPropertiesBaseRiskSerializer(
  item: SecurityAssessmentPropertiesBaseRisk,
): any {
  return {
    riskFactors: !item["riskFactors"]
      ? item["riskFactors"]
      : item["riskFactors"].map((p: any) => {
          return p;
        }),
    level: item["level"],
    attackPathsReferences: !item["attackPathsReferences"]
      ? item["attackPathsReferences"]
      : item["attackPathsReferences"].map((p: any) => {
          return p;
        }),
    paths: !item["paths"]
      ? item["paths"]
      : securityAssessmentPropertiesBaseRiskPathsItemArraySerializer(item["paths"]),
    isContextualRisk: item["isContextualRisk"],
  };
}

export function securityAssessmentPropertiesBaseRiskDeserializer(
  item: any,
): SecurityAssessmentPropertiesBaseRisk {
  return {
    riskFactors: !item["riskFactors"]
      ? item["riskFactors"]
      : item["riskFactors"].map((p: any) => {
          return p;
        }),
    level: item["level"],
    attackPathsReferences: !item["attackPathsReferences"]
      ? item["attackPathsReferences"]
      : item["attackPathsReferences"].map((p: any) => {
          return p;
        }),
    paths: !item["paths"]
      ? item["paths"]
      : securityAssessmentPropertiesBaseRiskPathsItemArrayDeserializer(item["paths"]),
    isContextualRisk: item["isContextualRisk"],
  };
}

/** The risk level */
export enum KnownRiskLevel {
  /** None */
  None = "None",
  /** Low */
  Low = "Low",
  /** Medium */
  Medium = "Medium",
  /** High */
  High = "High",
  /** Critical */
  Critical = "Critical",
}

/**
 * The risk level \
 * {@link KnownRiskLevel} can be used interchangeably with RiskLevel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: None \
 * **Low**: Low \
 * **Medium**: Medium \
 * **High**: High \
 * **Critical**: Critical
 */
export type RiskLevel = string;

export function securityAssessmentPropertiesBaseRiskPathsItemArraySerializer(
  result: Array<SecurityAssessmentPropertiesBaseRiskPathsItem>,
): any[] {
  return result.map((item) => {
    return securityAssessmentPropertiesBaseRiskPathsItemSerializer(item);
  });
}

export function securityAssessmentPropertiesBaseRiskPathsItemArrayDeserializer(
  result: Array<SecurityAssessmentPropertiesBaseRiskPathsItem>,
): any[] {
  return result.map((item) => {
    return securityAssessmentPropertiesBaseRiskPathsItemDeserializer(item);
  });
}

/** model interface SecurityAssessmentPropertiesBaseRiskPathsItem */
export interface SecurityAssessmentPropertiesBaseRiskPathsItem {
  /** Unique identifier for the path */
  id?: string;
  nodes?: SecurityAssessmentPropertiesBaseRiskPathsItemNodesItem[];
  /** Connections between nodes */
  edges?: SecurityAssessmentPropertiesBaseRiskPathsItemEdgeItem[];
}

export function securityAssessmentPropertiesBaseRiskPathsItemSerializer(
  item: SecurityAssessmentPropertiesBaseRiskPathsItem,
): any {
  return {
    id: item["id"],
    nodes: !item["nodes"]
      ? item["nodes"]
      : securityAssessmentPropertiesBaseRiskPathsItemNodesItemArraySerializer(item["nodes"]),
    edges: !item["edges"]
      ? item["edges"]
      : securityAssessmentPropertiesBaseRiskPathsItemEdgeItemArraySerializer(item["edges"]),
  };
}

export function securityAssessmentPropertiesBaseRiskPathsItemDeserializer(
  item: any,
): SecurityAssessmentPropertiesBaseRiskPathsItem {
  return {
    id: item["id"],
    nodes: !item["nodes"]
      ? item["nodes"]
      : securityAssessmentPropertiesBaseRiskPathsItemNodesItemArrayDeserializer(item["nodes"]),
    edges: !item["edges"]
      ? item["edges"]
      : securityAssessmentPropertiesBaseRiskPathsItemEdgeItemArrayDeserializer(item["edges"]),
  };
}

export function securityAssessmentPropertiesBaseRiskPathsItemNodesItemArraySerializer(
  result: Array<SecurityAssessmentPropertiesBaseRiskPathsItemNodesItem>,
): any[] {
  return result.map((item) => {
    return securityAssessmentPropertiesBaseRiskPathsItemNodesItemSerializer(item);
  });
}

export function securityAssessmentPropertiesBaseRiskPathsItemNodesItemArrayDeserializer(
  result: Array<SecurityAssessmentPropertiesBaseRiskPathsItemNodesItem>,
): any[] {
  return result.map((item) => {
    return securityAssessmentPropertiesBaseRiskPathsItemNodesItemDeserializer(item);
  });
}

/** model interface SecurityAssessmentPropertiesBaseRiskPathsItemNodesItem */
export interface SecurityAssessmentPropertiesBaseRiskPathsItemNodesItem {
  /** Node identifier */
  id?: string;
  /** Properties associated with the node */
  nodePropertiesLabel?: string[];
}

export function securityAssessmentPropertiesBaseRiskPathsItemNodesItemSerializer(
  item: SecurityAssessmentPropertiesBaseRiskPathsItemNodesItem,
): any {
  return {
    id: item["id"],
    nodePropertiesLabel: !item["nodePropertiesLabel"]
      ? item["nodePropertiesLabel"]
      : item["nodePropertiesLabel"].map((p: any) => {
          return p;
        }),
  };
}

export function securityAssessmentPropertiesBaseRiskPathsItemNodesItemDeserializer(
  item: any,
): SecurityAssessmentPropertiesBaseRiskPathsItemNodesItem {
  return {
    id: item["id"],
    nodePropertiesLabel: !item["nodePropertiesLabel"]
      ? item["nodePropertiesLabel"]
      : item["nodePropertiesLabel"].map((p: any) => {
          return p;
        }),
  };
}

export function securityAssessmentPropertiesBaseRiskPathsItemEdgeItemArraySerializer(
  result: Array<SecurityAssessmentPropertiesBaseRiskPathsItemEdgeItem>,
): any[] {
  return result.map((item) => {
    return securityAssessmentPropertiesBaseRiskPathsItemEdgeItemSerializer(item);
  });
}

export function securityAssessmentPropertiesBaseRiskPathsItemEdgeItemArrayDeserializer(
  result: Array<SecurityAssessmentPropertiesBaseRiskPathsItemEdgeItem>,
): any[] {
  return result.map((item) => {
    return securityAssessmentPropertiesBaseRiskPathsItemEdgeItemDeserializer(item);
  });
}

/** model interface SecurityAssessmentPropertiesBaseRiskPathsItemEdgeItem */
export interface SecurityAssessmentPropertiesBaseRiskPathsItemEdgeItem {
  /** Edge identifier */
  id: string;
  /** Target node identifier */
  targetId: string;
  /** Source node identifier */
  sourceId: string;
}

export function securityAssessmentPropertiesBaseRiskPathsItemEdgeItemSerializer(
  item: SecurityAssessmentPropertiesBaseRiskPathsItemEdgeItem,
): any {
  return { id: item["id"], targetId: item["targetId"], sourceId: item["sourceId"] };
}

export function securityAssessmentPropertiesBaseRiskPathsItemEdgeItemDeserializer(
  item: any,
): SecurityAssessmentPropertiesBaseRiskPathsItemEdgeItem {
  return {
    id: item["id"],
    targetId: item["targetId"],
    sourceId: item["sourceId"],
  };
}

/** Details of the Azure resource that was assessed */
export interface AzureResourceDetails extends ResourceDetails {
  /** Azure resource Id of the assessed resource */
  readonly id?: string;
  /** The platform where the assessed resource resides */
  source: "Azure";
}

export function azureResourceDetailsSerializer(item: AzureResourceDetails): any {
  return { source: item["source"] };
}

export function azureResourceDetailsDeserializer(item: any): AzureResourceDetails {
  return {
    source: item["source"],
    id: item["id"],
  };
}

/** Links relevant to the assessment */
export interface AssessmentLinks {
  /** Link to assessment in Azure Portal */
  readonly azurePortalUri?: string;
}

export function assessmentLinksDeserializer(item: any): AssessmentLinks {
  return {
    azurePortalUri: item["azurePortalUri"],
  };
}

/** Data regarding 3rd party partner integration */
export interface SecurityAssessmentPartnerData {
  /** Name of the company of the partner */
  partnerName: string;
  /** secret to authenticate the partner - write only */
  secret: string;
}

export function securityAssessmentPartnerDataSerializer(item: SecurityAssessmentPartnerData): any {
  return { partnerName: item["partnerName"], secret: item["secret"] };
}

export function securityAssessmentPartnerDataDeserializer(
  item: any,
): SecurityAssessmentPartnerData {
  return {
    partnerName: item["partnerName"],
    secret: item["secret"],
  };
}

/** Security assessment on a resource */
export interface SecurityAssessment extends Resource {
  /** External model of risk result */
  risk?: SecurityAssessmentPropertiesBaseRisk;
  /** Details of the resource that was assessed */
  resourceDetails?: ResourceDetailsUnion;
  /** User friendly display name of the assessment */
  readonly displayName?: string;
  /** Additional data regarding the assessment */
  additionalData?: Record<string, string>;
  /** Links relevant to the assessment */
  readonly links?: AssessmentLinks;
  /** Describes properties of an assessment metadata. */
  metadata?: SecurityAssessmentMetadataProperties;
  /** Data regarding 3rd party partner integration */
  partnersData?: SecurityAssessmentPartnerData;
  /** The result of the assessment */
  status?: AssessmentStatus;
}

export function securityAssessmentSerializer(item: SecurityAssessment): any {
  return {
    properties: areAllPropsUndefined(item, [
      "risk",
      "resourceDetails",
      "additionalData",
      "metadata",
      "partnersData",
      "status",
    ])
      ? undefined
      : _securityAssessmentPropertiesSerializer(item),
  };
}

/** Describes properties of an assessment. */
export interface SecurityAssessmentProperties extends SecurityAssessmentPropertiesBase {
  /** The result of the assessment */
  status: AssessmentStatus;
}

export function securityAssessmentPropertiesSerializer(item: SecurityAssessmentProperties): any {
  return {
    risk: !item["risk"]
      ? item["risk"]
      : securityAssessmentPropertiesBaseRiskSerializer(item["risk"]),
    resourceDetails: resourceDetailsUnionSerializer(item["resourceDetails"]),
    additionalData: item["additionalData"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : securityAssessmentMetadataPropertiesSerializer(item["metadata"]),
    partnersData: !item["partnersData"]
      ? item["partnersData"]
      : securityAssessmentPartnerDataSerializer(item["partnersData"]),
    status: assessmentStatusSerializer(item["status"]),
  };
}

/** Page of a security assessments list */
export interface _SecurityAssessmentList {
  /** Collection of security assessments in this page */
  readonly value?: SecurityAssessmentResponse[];
  /** The URI to fetch the next page. */
  nextLink?: string;
}

export function _securityAssessmentListDeserializer(item: any): _SecurityAssessmentList {
  return {
    value: !item["value"]
      ? item["value"]
      : securityAssessmentResponseArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function securityAssessmentResponseArrayDeserializer(
  result: Array<SecurityAssessmentResponse>,
): any[] {
  return result.map((item) => {
    return securityAssessmentResponseDeserializer(item);
  });
}

/** Known values of {@link ExpandEnum} that the service accepts. */
export enum KnownExpandEnum {
  /** All links associated with an assessment */
  Links = "links",
  /** Assessment metadata */
  Metadata = "metadata",
}

/** Type of ExpandEnum */
export type ExpandEnum = string;

export function _securityAssessmentMetadataResponsePropertiesSerializer(
  item: SecurityAssessmentMetadataResponse,
): any {
  return {
    displayName: item["displayName"],
    description: item["description"],
    remediationDescription: item["remediationDescription"],
    categories: !item["categories"]
      ? item["categories"]
      : item["categories"].map((p: any) => {
          return p;
        }),
    severity: item["severity"],
    userImpact: item["userImpact"],
    implementationEffort: item["implementationEffort"],
    threats: !item["threats"]
      ? item["threats"]
      : item["threats"].map((p: any) => {
          return p;
        }),
    preview: item["preview"],
    assessmentType: item["assessmentType"],
    partnerData: !item["partnerData"]
      ? item["partnerData"]
      : securityAssessmentMetadataPartnerDataSerializer(item["partnerData"]),
    publishDates: !item["publishDates"]
      ? item["publishDates"]
      : securityAssessmentMetadataPropertiesResponsePublishDatesSerializer(item["publishDates"]),
    plannedDeprecationDate: item["plannedDeprecationDate"],
    tactics: !item["tactics"]
      ? item["tactics"]
      : item["tactics"].map((p: any) => {
          return p;
        }),
    techniques: !item["techniques"]
      ? item["techniques"]
      : item["techniques"].map((p: any) => {
          return p;
        }),
  };
}

export function _securityAssessmentMetadataResponsePropertiesDeserializer(item: any) {
  return {
    displayName: item["displayName"],
    policyDefinitionId: item["policyDefinitionId"],
    description: item["description"],
    remediationDescription: item["remediationDescription"],
    categories: !item["categories"]
      ? item["categories"]
      : item["categories"].map((p: any) => {
          return p;
        }),
    severity: item["severity"],
    userImpact: item["userImpact"],
    implementationEffort: item["implementationEffort"],
    threats: !item["threats"]
      ? item["threats"]
      : item["threats"].map((p: any) => {
          return p;
        }),
    preview: item["preview"],
    assessmentType: item["assessmentType"],
    partnerData: !item["partnerData"]
      ? item["partnerData"]
      : securityAssessmentMetadataPartnerDataDeserializer(item["partnerData"]),
    publishDates: !item["publishDates"]
      ? item["publishDates"]
      : securityAssessmentMetadataPropertiesResponsePublishDatesDeserializer(item["publishDates"]),
    plannedDeprecationDate: item["plannedDeprecationDate"],
    tactics: !item["tactics"]
      ? item["tactics"]
      : item["tactics"].map((p: any) => {
          return p;
        }),
    techniques: !item["techniques"]
      ? item["techniques"]
      : item["techniques"].map((p: any) => {
          return p;
        }),
  };
}

export function _securityAssessmentResponsePropertiesDeserializer(item: any) {
  return {
    risk: !item["risk"]
      ? item["risk"]
      : securityAssessmentPropertiesBaseRiskDeserializer(item["risk"]),
    resourceDetails: !item["resourceDetails"]
      ? item["resourceDetails"]
      : resourceDetailsUnionDeserializer(item["resourceDetails"]),
    displayName: item["displayName"],
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : Object.fromEntries(
          Object.entries(item["additionalData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    links: !item["links"] ? item["links"] : assessmentLinksDeserializer(item["links"]),
    metadata: !item["metadata"]
      ? item["metadata"]
      : securityAssessmentMetadataPropertiesDeserializer(item["metadata"]),
    partnersData: !item["partnersData"]
      ? item["partnersData"]
      : securityAssessmentPartnerDataDeserializer(item["partnersData"]),
    status: !item["status"] ? item["status"] : assessmentStatusResponseDeserializer(item["status"]),
  };
}

export function _securityAssessmentPropertiesSerializer(item: SecurityAssessment): any {
  return {
    risk: !item["risk"]
      ? item["risk"]
      : securityAssessmentPropertiesBaseRiskSerializer(item["risk"]),
    resourceDetails: !item["resourceDetails"]
      ? item["resourceDetails"]
      : resourceDetailsUnionSerializer(item["resourceDetails"]),
    additionalData: item["additionalData"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : securityAssessmentMetadataPropertiesSerializer(item["metadata"]),
    partnersData: !item["partnersData"]
      ? item["partnersData"]
      : securityAssessmentPartnerDataSerializer(item["partnersData"]),
    status: !item["status"] ? item["status"] : assessmentStatusSerializer(item["status"]),
  };
}
