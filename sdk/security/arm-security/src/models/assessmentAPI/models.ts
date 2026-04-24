// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../../static-helpers/serialization/check-prop-undefined.js";
import type {
  CommonSeverity,
  CommonResourceDetails,
  CommonResourceDetailsUnion,
} from "../common/models.js";
import {
  commonResourceDetailsUnionSerializer,
  commonResourceDetailsUnionDeserializer,
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
export interface AssessmentAPISecurityAssessmentMetadataResponse extends ProxyResource {
  /** User friendly display name of the assessment */
  displayName?: string;
  /** Azure resource ID of the policy definition that turns this assessment calculation on */
  readonly policyDefinitionId?: string;
  /** Human readable description of the assessment */
  description?: string;
  /** Human readable description of what you should do to mitigate this security issue */
  remediationDescription?: string;
  categories?: AssessmentAPICategories[];
  /** The severity level of the assessment */
  severity?: CommonSeverity;
  /** The user impact of the assessment */
  userImpact?: AssessmentAPIUserImpact;
  /** The implementation effort required to remediate this assessment */
  implementationEffort?: AssessmentAPIImplementationEffort;
  threats?: AssessmentAPIThreats[];
  /** True if this assessment is in preview release status */
  preview?: boolean;
  /** BuiltIn if the assessment based on built-in Azure Policy definition, Custom if the assessment based on custom Azure Policy definition */
  assessmentType?: AssessmentAPIAssessmentType;
  /** Describes the partner that created the assessment */
  partnerData?: AssessmentAPISecurityAssessmentMetadataPartnerData;
  publishDates?: AssessmentAPISecurityAssessmentMetadataPropertiesResponsePublishDates;
  plannedDeprecationDate?: string;
  tactics?: AssessmentAPITactics[];
  techniques?: AssessmentAPITechniques[];
}

export function assessmentAPISecurityAssessmentMetadataResponseSerializer(
  item: AssessmentAPISecurityAssessmentMetadataResponse,
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

export function assessmentAPISecurityAssessmentMetadataResponseDeserializer(
  item: any,
): AssessmentAPISecurityAssessmentMetadataResponse {
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
export interface AssessmentAPISecurityAssessmentMetadataPropertiesResponse extends AssessmentAPISecurityAssessmentMetadataProperties {
  publishDates?: AssessmentAPISecurityAssessmentMetadataPropertiesResponsePublishDates;
  plannedDeprecationDate?: string;
  tactics?: AssessmentAPITactics[];
  techniques?: AssessmentAPITechniques[];
}

export function assessmentAPISecurityAssessmentMetadataPropertiesResponseSerializer(
  item: AssessmentAPISecurityAssessmentMetadataPropertiesResponse,
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
      : assessmentAPISecurityAssessmentMetadataPartnerDataSerializer(item["partnerData"]),
    publishDates: !item["publishDates"]
      ? item["publishDates"]
      : assessmentAPISecurityAssessmentMetadataPropertiesResponsePublishDatesSerializer(
          item["publishDates"],
        ),
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

export function assessmentAPISecurityAssessmentMetadataPropertiesResponseDeserializer(
  item: any,
): AssessmentAPISecurityAssessmentMetadataPropertiesResponse {
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
      : assessmentAPISecurityAssessmentMetadataPartnerDataDeserializer(item["partnerData"]),
    publishDates: !item["publishDates"]
      ? item["publishDates"]
      : assessmentAPISecurityAssessmentMetadataPropertiesResponsePublishDatesDeserializer(
          item["publishDates"],
        ),
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

/** model interface AssessmentAPISecurityAssessmentMetadataPropertiesResponsePublishDates */
export interface AssessmentAPISecurityAssessmentMetadataPropertiesResponsePublishDates {
  ga?: string;
  public: string;
}

export function assessmentAPISecurityAssessmentMetadataPropertiesResponsePublishDatesSerializer(
  item: AssessmentAPISecurityAssessmentMetadataPropertiesResponsePublishDates,
): any {
  return { GA: item["ga"], public: item["public"] };
}

export function assessmentAPISecurityAssessmentMetadataPropertiesResponsePublishDatesDeserializer(
  item: any,
): AssessmentAPISecurityAssessmentMetadataPropertiesResponsePublishDates {
  return {
    ga: item["GA"],
    public: item["public"],
  };
}

/** Tactic of the assessment */
export enum KnownAssessmentAPITactics {
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
 * {@link KnownAssessmentAPITactics} can be used interchangeably with AssessmentAPITactics,
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
export type AssessmentAPITactics = string;

/** Techniques of the assessment */
export enum KnownAssessmentAPITechniques {
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
 * {@link KnownAssessmentAPITechniques} can be used interchangeably with AssessmentAPITechniques,
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
export type AssessmentAPITechniques = string;

/** Describes properties of an assessment metadata. */
export interface AssessmentAPISecurityAssessmentMetadataProperties {
  /** User friendly display name of the assessment */
  displayName: string;
  /** Azure resource ID of the policy definition that turns this assessment calculation on */
  readonly policyDefinitionId?: string;
  /** Human readable description of the assessment */
  description?: string;
  /** Human readable description of what you should do to mitigate this security issue */
  remediationDescription?: string;
  categories?: AssessmentAPICategories[];
  /** The severity level of the assessment */
  severity: CommonSeverity;
  /** The user impact of the assessment */
  userImpact?: AssessmentAPIUserImpact;
  /** The implementation effort required to remediate this assessment */
  implementationEffort?: AssessmentAPIImplementationEffort;
  threats?: AssessmentAPIThreats[];
  /** True if this assessment is in preview release status */
  preview?: boolean;
  /** BuiltIn if the assessment based on built-in Azure Policy definition, Custom if the assessment based on custom Azure Policy definition */
  assessmentType: AssessmentAPIAssessmentType;
  /** Describes the partner that created the assessment */
  partnerData?: AssessmentAPISecurityAssessmentMetadataPartnerData;
}

export function assessmentAPISecurityAssessmentMetadataPropertiesSerializer(
  item: AssessmentAPISecurityAssessmentMetadataProperties,
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
      : assessmentAPISecurityAssessmentMetadataPartnerDataSerializer(item["partnerData"]),
  };
}

export function assessmentAPISecurityAssessmentMetadataPropertiesDeserializer(
  item: any,
): AssessmentAPISecurityAssessmentMetadataProperties {
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
      : assessmentAPISecurityAssessmentMetadataPartnerDataDeserializer(item["partnerData"]),
  };
}

/** The categories of resource that is at risk when the assessment is unhealthy */
export enum KnownAssessmentAPICategories {
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
 * {@link KnownAssessmentAPICategories} can be used interchangeably with AssessmentAPICategories,
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
export type AssessmentAPICategories = string;

/** The user impact of the assessment */
export enum KnownAssessmentAPIUserImpact {
  /** Low */
  Low = "Low",
  /** Moderate */
  Moderate = "Moderate",
  /** High */
  High = "High",
}

/**
 * The user impact of the assessment \
 * {@link KnownAssessmentAPIUserImpact} can be used interchangeably with AssessmentAPIUserImpact,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Low**: Low \
 * **Moderate**: Moderate \
 * **High**: High
 */
export type AssessmentAPIUserImpact = string;

/** The implementation effort required to remediate this assessment */
export enum KnownAssessmentAPIImplementationEffort {
  /** Low */
  Low = "Low",
  /** Moderate */
  Moderate = "Moderate",
  /** High */
  High = "High",
}

/**
 * The implementation effort required to remediate this assessment \
 * {@link KnownAssessmentAPIImplementationEffort} can be used interchangeably with AssessmentAPIImplementationEffort,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Low**: Low \
 * **Moderate**: Moderate \
 * **High**: High
 */
export type AssessmentAPIImplementationEffort = string;

/** Threats impact of the assessment */
export enum KnownAssessmentAPIThreats {
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
 * {@link KnownAssessmentAPIThreats} can be used interchangeably with AssessmentAPIThreats,
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
export type AssessmentAPIThreats = string;

/** BuiltIn if the assessment based on built-in Azure Policy definition, Custom if the assessment based on custom Azure Policy definition */
export enum KnownAssessmentAPIAssessmentType {
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
 * {@link KnownAssessmentAPIAssessmentType} can be used interchangeably with AssessmentAPIAssessmentType,
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
export type AssessmentAPIAssessmentType = string;

/** Describes the partner that created the assessment */
export interface AssessmentAPISecurityAssessmentMetadataPartnerData {
  /** Name of the company of the partner */
  partnerName: string;
  /** Name of the product of the partner that created the assessment */
  productName?: string;
  /** Secret to authenticate the partner and verify it created the assessment - write only */
  secret: string;
}

export function assessmentAPISecurityAssessmentMetadataPartnerDataSerializer(
  item: AssessmentAPISecurityAssessmentMetadataPartnerData,
): any {
  return {
    partnerName: item["partnerName"],
    productName: item["productName"],
    secret: item["secret"],
  };
}

export function assessmentAPISecurityAssessmentMetadataPartnerDataDeserializer(
  item: any,
): AssessmentAPISecurityAssessmentMetadataPartnerData {
  return {
    partnerName: item["partnerName"],
    productName: item["productName"],
    secret: item["secret"],
  };
}

/** List of security assessment metadata */
export interface _AssessmentAPISecurityAssessmentMetadataResponseList {
  readonly value?: AssessmentAPISecurityAssessmentMetadataResponse[];
  /** The URI to fetch the next page. */
  nextLink?: string;
}

export function _assessmentAPISecurityAssessmentMetadataResponseListDeserializer(
  item: any,
): _AssessmentAPISecurityAssessmentMetadataResponseList {
  return {
    value: !item["value"]
      ? item["value"]
      : assessmentAPISecurityAssessmentMetadataResponseArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function assessmentAPISecurityAssessmentMetadataResponseArraySerializer(
  result: Array<AssessmentAPISecurityAssessmentMetadataResponse>,
): any[] {
  return result.map((item) => {
    return assessmentAPISecurityAssessmentMetadataResponseSerializer(item);
  });
}

export function assessmentAPISecurityAssessmentMetadataResponseArrayDeserializer(
  result: Array<AssessmentAPISecurityAssessmentMetadataResponse>,
): any[] {
  return result.map((item) => {
    return assessmentAPISecurityAssessmentMetadataResponseDeserializer(item);
  });
}

/** Security assessment on a resource - response format */
export interface AssessmentAPISecurityAssessmentResponse extends ExtensionResource {
  /** External model of risk result */
  risk?: AssessmentAPISecurityAssessmentPropertiesBaseRisk;
  /** Details of the resource that was assessed */
  resourceDetails?: CommonResourceDetailsUnion;
  /** User friendly display name of the assessment */
  readonly displayName?: string;
  /** Additional data regarding the assessment */
  additionalData?: Record<string, string>;
  /** Links relevant to the assessment */
  readonly links?: AssessmentAPIAssessmentLinks;
  /** Describes properties of an assessment metadata. */
  metadata?: AssessmentAPISecurityAssessmentMetadataProperties;
  /** Data regarding 3rd party partner integration */
  partnersData?: AssessmentAPISecurityAssessmentPartnerData;
  /** The result of the assessment */
  status?: AssessmentAPIAssessmentStatusResponse;
}

export function assessmentAPISecurityAssessmentResponseDeserializer(
  item: any,
): AssessmentAPISecurityAssessmentResponse {
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
export interface AssessmentAPISecurityAssessmentPropertiesResponse extends AssessmentAPISecurityAssessmentPropertiesBase {
  /** The result of the assessment */
  status: AssessmentAPIAssessmentStatusResponse;
}

export function assessmentAPISecurityAssessmentPropertiesResponseDeserializer(
  item: any,
): AssessmentAPISecurityAssessmentPropertiesResponse {
  return {
    risk: !item["risk"]
      ? item["risk"]
      : assessmentAPISecurityAssessmentPropertiesBaseRiskDeserializer(item["risk"]),
    resourceDetails: commonResourceDetailsUnionDeserializer(item["resourceDetails"]),
    displayName: item["displayName"],
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : Object.fromEntries(
          Object.entries(item["additionalData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    links: !item["links"] ? item["links"] : assessmentAPIAssessmentLinksDeserializer(item["links"]),
    metadata: !item["metadata"]
      ? item["metadata"]
      : assessmentAPISecurityAssessmentMetadataPropertiesDeserializer(item["metadata"]),
    partnersData: !item["partnersData"]
      ? item["partnersData"]
      : assessmentAPISecurityAssessmentPartnerDataDeserializer(item["partnersData"]),
    status: assessmentAPIAssessmentStatusResponseDeserializer(item["status"]),
  };
}

/** The result of the assessment */
export interface AssessmentAPIAssessmentStatusResponse extends AssessmentAPIAssessmentStatus {
  /** The time that the assessment was created and first evaluated. Returned as UTC time in ISO 8601 format */
  readonly firstEvaluationDate?: Date;
  /** The time that the status of the assessment last changed. Returned as UTC time in ISO 8601 format */
  readonly statusChangeDate?: Date;
}

export function assessmentAPIAssessmentStatusResponseDeserializer(
  item: any,
): AssessmentAPIAssessmentStatusResponse {
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
export interface AssessmentAPIAssessmentStatus {
  /** Programmatic code for the status of the assessment */
  code: AssessmentAPIAssessmentStatusCode;
  /** Programmatic code for the cause of the assessment status */
  cause?: string;
  /** Human readable description of the assessment status */
  description?: string;
}

export function assessmentAPIAssessmentStatusSerializer(item: AssessmentAPIAssessmentStatus): any {
  return { code: item["code"], cause: item["cause"], description: item["description"] };
}

export function assessmentAPIAssessmentStatusDeserializer(
  item: any,
): AssessmentAPIAssessmentStatus {
  return {
    code: item["code"],
    cause: item["cause"],
    description: item["description"],
  };
}

/** Programmatic code for the status of the assessment */
export enum KnownAssessmentAPIAssessmentStatusCode {
  /** The resource is healthy */
  Healthy = "Healthy",
  /** The resource has a security issue that needs to be addressed */
  Unhealthy = "Unhealthy",
  /** Assessment for this resource did not happen */
  NotApplicable = "NotApplicable",
}

/**
 * Programmatic code for the status of the assessment \
 * {@link KnownAssessmentAPIAssessmentStatusCode} can be used interchangeably with AssessmentAPIAssessmentStatusCode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Healthy**: The resource is healthy \
 * **Unhealthy**: The resource has a security issue that needs to be addressed \
 * **NotApplicable**: Assessment for this resource did not happen
 */
export type AssessmentAPIAssessmentStatusCode = string;

/** Describes properties of an assessment. */
export interface AssessmentAPISecurityAssessmentPropertiesBase {
  /** External model of risk result */
  risk?: AssessmentAPISecurityAssessmentPropertiesBaseRisk;
  /** Details of the resource that was assessed */
  resourceDetails: CommonResourceDetailsUnion;
  /** User friendly display name of the assessment */
  readonly displayName?: string;
  /** Additional data regarding the assessment */
  additionalData?: Record<string, string>;
  /** Links relevant to the assessment */
  readonly links?: AssessmentAPIAssessmentLinks;
  /** Describes properties of an assessment metadata. */
  metadata?: AssessmentAPISecurityAssessmentMetadataProperties;
  /** Data regarding 3rd party partner integration */
  partnersData?: AssessmentAPISecurityAssessmentPartnerData;
}

export function assessmentAPISecurityAssessmentPropertiesBaseSerializer(
  item: AssessmentAPISecurityAssessmentPropertiesBase,
): any {
  return {
    risk: !item["risk"]
      ? item["risk"]
      : assessmentAPISecurityAssessmentPropertiesBaseRiskSerializer(item["risk"]),
    resourceDetails: commonResourceDetailsUnionSerializer(item["resourceDetails"]),
    additionalData: item["additionalData"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : assessmentAPISecurityAssessmentMetadataPropertiesSerializer(item["metadata"]),
    partnersData: !item["partnersData"]
      ? item["partnersData"]
      : assessmentAPISecurityAssessmentPartnerDataSerializer(item["partnersData"]),
  };
}

export function assessmentAPISecurityAssessmentPropertiesBaseDeserializer(
  item: any,
): AssessmentAPISecurityAssessmentPropertiesBase {
  return {
    risk: !item["risk"]
      ? item["risk"]
      : assessmentAPISecurityAssessmentPropertiesBaseRiskDeserializer(item["risk"]),
    resourceDetails: commonResourceDetailsUnionDeserializer(item["resourceDetails"]),
    displayName: item["displayName"],
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : Object.fromEntries(
          Object.entries(item["additionalData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    links: !item["links"] ? item["links"] : assessmentAPIAssessmentLinksDeserializer(item["links"]),
    metadata: !item["metadata"]
      ? item["metadata"]
      : assessmentAPISecurityAssessmentMetadataPropertiesDeserializer(item["metadata"]),
    partnersData: !item["partnersData"]
      ? item["partnersData"]
      : assessmentAPISecurityAssessmentPartnerDataDeserializer(item["partnersData"]),
  };
}

/** External model of risk result */
export interface AssessmentAPISecurityAssessmentPropertiesBaseRisk {
  /** The factors of the risk adding base factor */
  riskFactors?: string[];
  /** The risk level */
  level?: AssessmentAPIRiskLevel;
  /** The attack paths references of the risk */
  attackPathsReferences?: string[];
  paths?: AssessmentAPISecurityAssessmentPropertiesBaseRiskPathsItem[];
  /** Indicates if the risk is contextual or static */
  isContextualRisk?: boolean;
}

export function assessmentAPISecurityAssessmentPropertiesBaseRiskSerializer(
  item: AssessmentAPISecurityAssessmentPropertiesBaseRisk,
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
      : assessmentAPISecurityAssessmentPropertiesBaseRiskPathsItemArraySerializer(item["paths"]),
    isContextualRisk: item["isContextualRisk"],
  };
}

export function assessmentAPISecurityAssessmentPropertiesBaseRiskDeserializer(
  item: any,
): AssessmentAPISecurityAssessmentPropertiesBaseRisk {
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
      : assessmentAPISecurityAssessmentPropertiesBaseRiskPathsItemArrayDeserializer(item["paths"]),
    isContextualRisk: item["isContextualRisk"],
  };
}

/** The risk level */
export enum KnownAssessmentAPIRiskLevel {
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
 * {@link KnownAssessmentAPIRiskLevel} can be used interchangeably with AssessmentAPIRiskLevel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: None \
 * **Low**: Low \
 * **Medium**: Medium \
 * **High**: High \
 * **Critical**: Critical
 */
export type AssessmentAPIRiskLevel = string;

export function assessmentAPISecurityAssessmentPropertiesBaseRiskPathsItemArraySerializer(
  result: Array<AssessmentAPISecurityAssessmentPropertiesBaseRiskPathsItem>,
): any[] {
  return result.map((item) => {
    return assessmentAPISecurityAssessmentPropertiesBaseRiskPathsItemSerializer(item);
  });
}

export function assessmentAPISecurityAssessmentPropertiesBaseRiskPathsItemArrayDeserializer(
  result: Array<AssessmentAPISecurityAssessmentPropertiesBaseRiskPathsItem>,
): any[] {
  return result.map((item) => {
    return assessmentAPISecurityAssessmentPropertiesBaseRiskPathsItemDeserializer(item);
  });
}

/** model interface AssessmentAPISecurityAssessmentPropertiesBaseRiskPathsItem */
export interface AssessmentAPISecurityAssessmentPropertiesBaseRiskPathsItem {
  /** Unique identifier for the path */
  id?: string;
  nodes?: AssessmentAPISecurityAssessmentPropertiesBaseRiskPathsItemNodesItem[];
  /** Connections between nodes */
  edges?: AssessmentAPISecurityAssessmentPropertiesBaseRiskPathsItemEdgeItem[];
}

export function assessmentAPISecurityAssessmentPropertiesBaseRiskPathsItemSerializer(
  item: AssessmentAPISecurityAssessmentPropertiesBaseRiskPathsItem,
): any {
  return {
    id: item["id"],
    nodes: !item["nodes"]
      ? item["nodes"]
      : assessmentAPISecurityAssessmentPropertiesBaseRiskPathsItemNodesItemArraySerializer(
          item["nodes"],
        ),
    edges: !item["edges"]
      ? item["edges"]
      : assessmentAPISecurityAssessmentPropertiesBaseRiskPathsItemEdgeItemArraySerializer(
          item["edges"],
        ),
  };
}

export function assessmentAPISecurityAssessmentPropertiesBaseRiskPathsItemDeserializer(
  item: any,
): AssessmentAPISecurityAssessmentPropertiesBaseRiskPathsItem {
  return {
    id: item["id"],
    nodes: !item["nodes"]
      ? item["nodes"]
      : assessmentAPISecurityAssessmentPropertiesBaseRiskPathsItemNodesItemArrayDeserializer(
          item["nodes"],
        ),
    edges: !item["edges"]
      ? item["edges"]
      : assessmentAPISecurityAssessmentPropertiesBaseRiskPathsItemEdgeItemArrayDeserializer(
          item["edges"],
        ),
  };
}

export function assessmentAPISecurityAssessmentPropertiesBaseRiskPathsItemNodesItemArraySerializer(
  result: Array<AssessmentAPISecurityAssessmentPropertiesBaseRiskPathsItemNodesItem>,
): any[] {
  return result.map((item) => {
    return assessmentAPISecurityAssessmentPropertiesBaseRiskPathsItemNodesItemSerializer(item);
  });
}

export function assessmentAPISecurityAssessmentPropertiesBaseRiskPathsItemNodesItemArrayDeserializer(
  result: Array<AssessmentAPISecurityAssessmentPropertiesBaseRiskPathsItemNodesItem>,
): any[] {
  return result.map((item) => {
    return assessmentAPISecurityAssessmentPropertiesBaseRiskPathsItemNodesItemDeserializer(item);
  });
}

/** model interface AssessmentAPISecurityAssessmentPropertiesBaseRiskPathsItemNodesItem */
export interface AssessmentAPISecurityAssessmentPropertiesBaseRiskPathsItemNodesItem {
  /** Node identifier */
  id?: string;
  /** Properties associated with the node */
  nodePropertiesLabel?: string[];
}

export function assessmentAPISecurityAssessmentPropertiesBaseRiskPathsItemNodesItemSerializer(
  item: AssessmentAPISecurityAssessmentPropertiesBaseRiskPathsItemNodesItem,
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

export function assessmentAPISecurityAssessmentPropertiesBaseRiskPathsItemNodesItemDeserializer(
  item: any,
): AssessmentAPISecurityAssessmentPropertiesBaseRiskPathsItemNodesItem {
  return {
    id: item["id"],
    nodePropertiesLabel: !item["nodePropertiesLabel"]
      ? item["nodePropertiesLabel"]
      : item["nodePropertiesLabel"].map((p: any) => {
          return p;
        }),
  };
}

export function assessmentAPISecurityAssessmentPropertiesBaseRiskPathsItemEdgeItemArraySerializer(
  result: Array<AssessmentAPISecurityAssessmentPropertiesBaseRiskPathsItemEdgeItem>,
): any[] {
  return result.map((item) => {
    return assessmentAPISecurityAssessmentPropertiesBaseRiskPathsItemEdgeItemSerializer(item);
  });
}

export function assessmentAPISecurityAssessmentPropertiesBaseRiskPathsItemEdgeItemArrayDeserializer(
  result: Array<AssessmentAPISecurityAssessmentPropertiesBaseRiskPathsItemEdgeItem>,
): any[] {
  return result.map((item) => {
    return assessmentAPISecurityAssessmentPropertiesBaseRiskPathsItemEdgeItemDeserializer(item);
  });
}

/** model interface AssessmentAPISecurityAssessmentPropertiesBaseRiskPathsItemEdgeItem */
export interface AssessmentAPISecurityAssessmentPropertiesBaseRiskPathsItemEdgeItem {
  /** Edge identifier */
  id: string;
  /** Target node identifier */
  targetId: string;
  /** Source node identifier */
  sourceId: string;
}

export function assessmentAPISecurityAssessmentPropertiesBaseRiskPathsItemEdgeItemSerializer(
  item: AssessmentAPISecurityAssessmentPropertiesBaseRiskPathsItemEdgeItem,
): any {
  return { id: item["id"], targetId: item["targetId"], sourceId: item["sourceId"] };
}

export function assessmentAPISecurityAssessmentPropertiesBaseRiskPathsItemEdgeItemDeserializer(
  item: any,
): AssessmentAPISecurityAssessmentPropertiesBaseRiskPathsItemEdgeItem {
  return {
    id: item["id"],
    targetId: item["targetId"],
    sourceId: item["sourceId"],
  };
}

/** Details of the Azure resource that was assessed */
export interface AssessmentAPIAzureResourceDetails extends CommonResourceDetails {
  /** Azure resource Id of the assessed resource */
  readonly id?: string;
  /** The platform where the assessed resource resides */
  source: "Azure";
}

export function assessmentAPIAzureResourceDetailsSerializer(
  item: AssessmentAPIAzureResourceDetails,
): any {
  return { source: item["source"] };
}

export function assessmentAPIAzureResourceDetailsDeserializer(
  item: any,
): AssessmentAPIAzureResourceDetails {
  return {
    source: item["source"],
    id: item["id"],
  };
}

/** Links relevant to the assessment */
export interface AssessmentAPIAssessmentLinks {
  /** Link to assessment in Azure Portal */
  readonly azurePortalUri?: string;
}

export function assessmentAPIAssessmentLinksDeserializer(item: any): AssessmentAPIAssessmentLinks {
  return {
    azurePortalUri: item["azurePortalUri"],
  };
}

/** Data regarding 3rd party partner integration */
export interface AssessmentAPISecurityAssessmentPartnerData {
  /** Name of the company of the partner */
  partnerName: string;
  /** secret to authenticate the partner - write only */
  secret: string;
}

export function assessmentAPISecurityAssessmentPartnerDataSerializer(
  item: AssessmentAPISecurityAssessmentPartnerData,
): any {
  return { partnerName: item["partnerName"], secret: item["secret"] };
}

export function assessmentAPISecurityAssessmentPartnerDataDeserializer(
  item: any,
): AssessmentAPISecurityAssessmentPartnerData {
  return {
    partnerName: item["partnerName"],
    secret: item["secret"],
  };
}

/** Security assessment on a resource */
export interface AssessmentAPISecurityAssessment extends Resource {
  /** External model of risk result */
  risk?: AssessmentAPISecurityAssessmentPropertiesBaseRisk;
  /** Details of the resource that was assessed */
  resourceDetails?: CommonResourceDetailsUnion;
  /** User friendly display name of the assessment */
  readonly displayName?: string;
  /** Additional data regarding the assessment */
  additionalData?: Record<string, string>;
  /** Links relevant to the assessment */
  readonly links?: AssessmentAPIAssessmentLinks;
  /** Describes properties of an assessment metadata. */
  metadata?: AssessmentAPISecurityAssessmentMetadataProperties;
  /** Data regarding 3rd party partner integration */
  partnersData?: AssessmentAPISecurityAssessmentPartnerData;
  /** The result of the assessment */
  status?: AssessmentAPIAssessmentStatus;
}

export function assessmentAPISecurityAssessmentSerializer(
  item: AssessmentAPISecurityAssessment,
): any {
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
export interface AssessmentAPISecurityAssessmentProperties extends AssessmentAPISecurityAssessmentPropertiesBase {
  /** The result of the assessment */
  status: AssessmentAPIAssessmentStatus;
}

export function assessmentAPISecurityAssessmentPropertiesSerializer(
  item: AssessmentAPISecurityAssessmentProperties,
): any {
  return {
    risk: !item["risk"]
      ? item["risk"]
      : assessmentAPISecurityAssessmentPropertiesBaseRiskSerializer(item["risk"]),
    resourceDetails: commonResourceDetailsUnionSerializer(item["resourceDetails"]),
    additionalData: item["additionalData"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : assessmentAPISecurityAssessmentMetadataPropertiesSerializer(item["metadata"]),
    partnersData: !item["partnersData"]
      ? item["partnersData"]
      : assessmentAPISecurityAssessmentPartnerDataSerializer(item["partnersData"]),
    status: assessmentAPIAssessmentStatusSerializer(item["status"]),
  };
}

/** Page of a security assessments list */
export interface _AssessmentAPISecurityAssessmentList {
  /** Collection of security assessments in this page */
  readonly value?: AssessmentAPISecurityAssessmentResponse[];
  /** The URI to fetch the next page. */
  nextLink?: string;
}

export function _assessmentAPISecurityAssessmentListDeserializer(
  item: any,
): _AssessmentAPISecurityAssessmentList {
  return {
    value: !item["value"]
      ? item["value"]
      : assessmentAPISecurityAssessmentResponseArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function assessmentAPISecurityAssessmentResponseArrayDeserializer(
  result: Array<AssessmentAPISecurityAssessmentResponse>,
): any[] {
  return result.map((item) => {
    return assessmentAPISecurityAssessmentResponseDeserializer(item);
  });
}

/** Known values of {@link ExpandEnum} that the service accepts. */
export enum KnownAssessmentAPIExpandEnum {
  /** All links associated with an assessment */
  Links = "links",
  /** Assessment metadata */
  Metadata = "metadata",
}

/** Type of AssessmentAPIExpandEnum */
export type AssessmentAPIExpandEnum = string;

export function _securityAssessmentMetadataResponsePropertiesSerializer(
  item: AssessmentAPISecurityAssessmentMetadataResponse,
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
      : assessmentAPISecurityAssessmentMetadataPartnerDataSerializer(item["partnerData"]),
    publishDates: !item["publishDates"]
      ? item["publishDates"]
      : assessmentAPISecurityAssessmentMetadataPropertiesResponsePublishDatesSerializer(
          item["publishDates"],
        ),
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
      : assessmentAPISecurityAssessmentMetadataPartnerDataDeserializer(item["partnerData"]),
    publishDates: !item["publishDates"]
      ? item["publishDates"]
      : assessmentAPISecurityAssessmentMetadataPropertiesResponsePublishDatesDeserializer(
          item["publishDates"],
        ),
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
      : assessmentAPISecurityAssessmentPropertiesBaseRiskDeserializer(item["risk"]),
    resourceDetails: !item["resourceDetails"]
      ? item["resourceDetails"]
      : commonResourceDetailsUnionDeserializer(item["resourceDetails"]),
    displayName: item["displayName"],
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : Object.fromEntries(
          Object.entries(item["additionalData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    links: !item["links"] ? item["links"] : assessmentAPIAssessmentLinksDeserializer(item["links"]),
    metadata: !item["metadata"]
      ? item["metadata"]
      : assessmentAPISecurityAssessmentMetadataPropertiesDeserializer(item["metadata"]),
    partnersData: !item["partnersData"]
      ? item["partnersData"]
      : assessmentAPISecurityAssessmentPartnerDataDeserializer(item["partnersData"]),
    status: !item["status"]
      ? item["status"]
      : assessmentAPIAssessmentStatusResponseDeserializer(item["status"]),
  };
}

export function _securityAssessmentPropertiesSerializer(
  item: AssessmentAPISecurityAssessment,
): any {
  return {
    risk: !item["risk"]
      ? item["risk"]
      : assessmentAPISecurityAssessmentPropertiesBaseRiskSerializer(item["risk"]),
    resourceDetails: !item["resourceDetails"]
      ? item["resourceDetails"]
      : commonResourceDetailsUnionSerializer(item["resourceDetails"]),
    additionalData: item["additionalData"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : assessmentAPISecurityAssessmentMetadataPropertiesSerializer(item["metadata"]),
    partnersData: !item["partnersData"]
      ? item["partnersData"]
      : assessmentAPISecurityAssessmentPartnerDataSerializer(item["partnersData"]),
    status: !item["status"]
      ? item["status"]
      : assessmentAPIAssessmentStatusSerializer(item["status"]),
  };
}
