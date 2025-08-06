// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** A list of REST API operations supported by an Azure Resource Provider. It contains an URL link to get the next set of results. */
export interface _OperationListResult {
  /** The Operation items on this page */
  value: Operation[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _operationListResultDeserializer(
  item: any,
): _OperationListResult {
  return {
    value: operationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function operationArrayDeserializer(result: Array<Operation>): any[] {
  return result.map((item) => {
    return operationDeserializer(item);
  });
}

/** Details of a REST API operation, returned from the Resource Provider Operations API */
export interface Operation {
  /** The name of the operation, as per Resource-Based Access Control (RBAC). Examples: "Microsoft.Compute/virtualMachines/write", "Microsoft.Compute/virtualMachines/capture/action" */
  readonly name?: string;
  /** Whether the operation applies to data-plane. This is "true" for data-plane operations and "false" for Azure Resource Manager/control-plane operations. */
  readonly isDataAction?: boolean;
  /** Localized display information for this particular operation. */
  display?: OperationDisplay;
  /** The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" */
  readonly origin?: Origin;
  /** Extensible enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. */
  readonly actionType?: ActionType;
}

export function operationDeserializer(item: any): Operation {
  return {
    name: item["name"],
    isDataAction: item["isDataAction"],
    display: !item["display"]
      ? item["display"]
      : operationDisplayDeserializer(item["display"]),
    origin: item["origin"],
    actionType: item["actionType"],
  };
}

/** Localized display information for and operation. */
export interface OperationDisplay {
  /** The localized friendly form of the resource provider name, e.g. "Microsoft Monitoring Insights" or "Microsoft Compute". */
  readonly provider?: string;
  /** The localized friendly name of the resource type related to this operation. E.g. "Virtual Machines" or "Job Schedule Collections". */
  readonly resource?: string;
  /** The concise, localized friendly name for the operation; suitable for dropdowns. E.g. "Create or Update Virtual Machine", "Restart Virtual Machine". */
  readonly operation?: string;
  /** The short, localized friendly description of the operation; suitable for tool tips and detailed views. */
  readonly description?: string;
}

export function operationDisplayDeserializer(item: any): OperationDisplay {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

/** The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" */
export enum KnownOrigin {
  /** Indicates the operation is initiated by a user. */
  User = "user",
  /** Indicates the operation is initiated by a system. */
  System = "system",
  /** Indicates the operation is initiated by a user or system. */
  UserSystem = "user,system",
}

/**
 * The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" \
 * {@link KnownOrigin} can be used interchangeably with Origin,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **user**: Indicates the operation is initiated by a user. \
 * **system**: Indicates the operation is initiated by a system. \
 * **user,system**: Indicates the operation is initiated by a user or system.
 */
export type Origin = string;

/** Extensible enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. */
export enum KnownActionType {
  /** Actions are for internal-only APIs. */
  Internal = "Internal",
}

/**
 * Extensible enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. \
 * {@link KnownActionType} can be used interchangeably with ActionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Internal**: Actions are for internal-only APIs.
 */
export type ActionType = string;

/** Common error response for all Azure Resource Manager APIs to return error details for failed operations. */
export interface ErrorResponse {
  /** The error object. */
  error?: ErrorDetail;
}

export function errorResponseDeserializer(item: any): ErrorResponse {
  return {
    error: !item["error"]
      ? item["error"]
      : errorDetailDeserializer(item["error"]),
  };
}

/** The error detail. */
export interface ErrorDetail {
  /** The error code. */
  readonly code?: string;
  /** The error message. */
  readonly message?: string;
  /** The error target. */
  readonly target?: string;
  /** The error details. */
  readonly details?: ErrorDetail[];
  /** The error additional info. */
  readonly additionalInfo?: ErrorAdditionalInfo[];
}

export function errorDetailDeserializer(item: any): ErrorDetail {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    details: !item["details"]
      ? item["details"]
      : errorDetailArrayDeserializer(item["details"]),
    additionalInfo: !item["additionalInfo"]
      ? item["additionalInfo"]
      : errorAdditionalInfoArrayDeserializer(item["additionalInfo"]),
  };
}

export function errorDetailArrayDeserializer(
  result: Array<ErrorDetail>,
): any[] {
  return result.map((item) => {
    return errorDetailDeserializer(item);
  });
}

export function errorAdditionalInfoArrayDeserializer(
  result: Array<ErrorAdditionalInfo>,
): any[] {
  return result.map((item) => {
    return errorAdditionalInfoDeserializer(item);
  });
}

/** The resource management error additional info. */
export interface ErrorAdditionalInfo {
  /** The additional info type. */
  readonly type?: string;
  /** The additional info. */
  readonly info?: any;
}

export function errorAdditionalInfoDeserializer(
  item: any,
): ErrorAdditionalInfo {
  return {
    type: item["type"],
    info: item["info"],
  };
}

/** A Connector resource Azure */
export interface MessagingConnector extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: ConnectorPropertiesUnion;
}

export function messagingConnectorSerializer(item: MessagingConnector): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : connectorPropertiesUnionSerializer(item["properties"]),
  };
}

export function messagingConnectorDeserializer(item: any): MessagingConnector {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : connectorPropertiesUnionDeserializer(item["properties"]),
  };
}

/** Properties of one Azure MessagingConnector resource */
export interface ConnectorProperties {
  /** Direction of connector */
  /** The discriminator possible values: Source */
  direction: Direction;
  /** Max Tasks count of the Connector. */
  maxTasks: number;
  /** networkProperties config. */
  networkProperties?: NetworkProperties;
  /** Scale config. */
  scalingProperties: ScalingPropertiesUnion;
  /** State of the MessagingConnector */
  connectorState?: ConnectorState;
  /** State of provisioning of the MessagingConnector ARM Resource */
  readonly provisioningState?: ConnectorProvisioningState;
}

export function connectorPropertiesSerializer(item: ConnectorProperties): any {
  return {
    direction: item["direction"],
    maxTasks: item["maxTasks"],
    networkProperties: !item["networkProperties"]
      ? item["networkProperties"]
      : networkPropertiesSerializer(item["networkProperties"]),
    scalingProperties: scalingPropertiesUnionSerializer(
      item["scalingProperties"],
    ),
    connectorState: item["connectorState"],
  };
}

export function connectorPropertiesDeserializer(
  item: any,
): ConnectorProperties {
  return {
    direction: item["direction"],
    maxTasks: item["maxTasks"],
    networkProperties: !item["networkProperties"]
      ? item["networkProperties"]
      : networkPropertiesDeserializer(item["networkProperties"]),
    scalingProperties: scalingPropertiesUnionDeserializer(
      item["scalingProperties"],
    ),
    connectorState: item["connectorState"],
    provisioningState: item["provisioningState"],
  };
}

/** Alias for ConnectorPropertiesUnion */
export type ConnectorPropertiesUnion =
  | SourceConnectorProperties
  | ConnectorProperties;

export function connectorPropertiesUnionSerializer(
  item: ConnectorPropertiesUnion,
): any {
  switch (item.direction) {
    case "Source":
      return sourceConnectorPropertiesSerializer(
        item as SourceConnectorProperties,
      );

    default:
      return connectorPropertiesSerializer(item);
  }
}

export function connectorPropertiesUnionDeserializer(
  item: any,
): ConnectorPropertiesUnion {
  switch (item.direction) {
    case "Source":
      return sourceConnectorPropertiesDeserializer(
        item as SourceConnectorProperties,
      );

    default:
      return connectorPropertiesDeserializer(item);
  }
}

/** Enum of Directions of Connector */
export enum KnownDirection {
  /** Source Connector */
  Source = "Source",
  /** Sink Connector */
  Sink = "Sink",
}

/**
 * Enum of Directions of Connector \
 * {@link KnownDirection} can be used interchangeably with Direction,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Source**: Source Connector \
 * **Sink**: Sink Connector
 */
export type Direction = string;

/** Properties of network */
export interface NetworkProperties {
  /** Subnet properties */
  subnetProperties?: SubnetProperties;
}

export function networkPropertiesSerializer(item: NetworkProperties): any {
  return {
    subnetProperties: !item["subnetProperties"]
      ? item["subnetProperties"]
      : subnetPropertiesSerializer(item["subnetProperties"]),
  };
}

export function networkPropertiesDeserializer(item: any): NetworkProperties {
  return {
    subnetProperties: !item["subnetProperties"]
      ? item["subnetProperties"]
      : subnetPropertiesDeserializer(item["subnetProperties"]),
  };
}

/** Properties of network */
export interface SubnetProperties {
  /** Vnet resource id */
  subnetResourceId: string;
}

export function subnetPropertiesSerializer(item: SubnetProperties): any {
  return { subnetResourceId: item["subnetResourceId"] };
}

export function subnetPropertiesDeserializer(item: any): SubnetProperties {
  return {
    subnetResourceId: item["subnetResourceId"],
  };
}

/** Base properties for scaling. */
export interface ScalingProperties {
  /** Type of the Scale type. */
  /** The discriminator possible values: AutoScaling, StaticScaling */
  scalingType: ScalingType;
}

export function scalingPropertiesSerializer(item: ScalingProperties): any {
  return { scalingType: item["scalingType"] };
}

export function scalingPropertiesDeserializer(item: any): ScalingProperties {
  return {
    scalingType: item["scalingType"],
  };
}

/** Alias for ScalingPropertiesUnion */
export type ScalingPropertiesUnion =
  | AutoScalingProperties
  | StaticScalingProperties
  | ScalingProperties;

export function scalingPropertiesUnionSerializer(
  item: ScalingPropertiesUnion,
): any {
  switch (item.scalingType) {
    case "AutoScaling":
      return autoScalingPropertiesSerializer(item as AutoScalingProperties);

    case "StaticScaling":
      return staticScalingPropertiesSerializer(item as StaticScalingProperties);

    default:
      return scalingPropertiesSerializer(item);
  }
}

export function scalingPropertiesUnionDeserializer(
  item: any,
): ScalingPropertiesUnion {
  switch (item.scalingType) {
    case "AutoScaling":
      return autoScalingPropertiesDeserializer(item as AutoScalingProperties);

    case "StaticScaling":
      return staticScalingPropertiesDeserializer(
        item as StaticScalingProperties,
      );

    default:
      return scalingPropertiesDeserializer(item);
  }
}

/** Scale types */
export enum KnownScalingType {
  /** Static scaling type. */
  StaticScaling = "StaticScaling",
  /** AutoHorizontal scaling type. */
  AutoScaling = "AutoScaling",
}

/**
 * Scale types \
 * {@link KnownScalingType} can be used interchangeably with ScalingType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **StaticScaling**: Static scaling type. \
 * **AutoScaling**: AutoHorizontal scaling type.
 */
export type ScalingType = string;

/** Properties for Auto scaling. */
export interface AutoScalingProperties extends ScalingProperties {
  /** Type of the Scale type. */
  scalingType: "AutoScaling";
  /** Max parallelism count. */
  maxParallelism: number;
  /** Current parallelism count. */
  readonly currentParallelism?: number;
}

export function autoScalingPropertiesSerializer(
  item: AutoScalingProperties,
): any {
  return {
    scalingType: item["scalingType"],
    maxParallelism: item["maxParallelism"],
  };
}

export function autoScalingPropertiesDeserializer(
  item: any,
): AutoScalingProperties {
  return {
    scalingType: item["scalingType"],
    maxParallelism: item["maxParallelism"],
    currentParallelism: item["currentParallelism"],
  };
}

/** Properties for Static scaling. */
export interface StaticScalingProperties extends ScalingProperties {
  /** Type of the Scale type. */
  scalingType: "StaticScaling";
  /** Parallelism count. */
  parallelism: number;
}

export function staticScalingPropertiesSerializer(
  item: StaticScalingProperties,
): any {
  return { scalingType: item["scalingType"], parallelism: item["parallelism"] };
}

export function staticScalingPropertiesDeserializer(
  item: any,
): StaticScalingProperties {
  return {
    scalingType: item["scalingType"],
    parallelism: item["parallelism"],
  };
}

/** Connector job execution status */
export enum KnownConnectorState {
  /** Unknown State */
  Unknown = "Unknown",
  /** Creating State */
  Creating = "Creating",
  /** Initializing State */
  Initializing = "Initializing",
  /** Running State */
  Running = "Running",
  /** Updating State */
  Updating = "Updating",
  /** Degraded State */
  Degraded = "Degraded",
  /** Stopped State */
  Stopped = "Stopped",
  /** Paused State */
  Paused = "Paused",
  /** Deleting State */
  Deleting = "Deleting",
  /** Failed State */
  Failed = "Failed",
}

/**
 * Connector job execution status \
 * {@link KnownConnectorState} can be used interchangeably with ConnectorState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: Unknown State \
 * **Creating**: Creating State \
 * **Initializing**: Initializing State \
 * **Running**: Running State \
 * **Updating**: Updating State \
 * **Degraded**: Degraded State \
 * **Stopped**: Stopped State \
 * **Paused**: Paused State \
 * **Deleting**: Deleting State \
 * **Failed**: Failed State
 */
export type ConnectorState = string;

/** Provisioning states of Connector ARM Resource */
export enum KnownConnectorProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** Accepted State */
  Accepted = "Accepted",
  /** Creating State */
  Creating = "Creating",
  /** Updating State */
  Updating = "Updating",
}

/**
 * Provisioning states of Connector ARM Resource \
 * {@link KnownConnectorProvisioningState} can be used interchangeably with ConnectorProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Accepted**: Accepted State \
 * **Creating**: Creating State \
 * **Updating**: Updating State
 */
export type ConnectorProvisioningState = string;

/** Base properties for Source Connector */
export interface SourceConnectorProperties extends ConnectorProperties {
  /** Source Connector */
  direction: "Source";
  /** Type of the Connector. */
  converterConfig: ConverterConfigUnion;
  /** connectionString of the EventHub. */
  eventHubConfig: EventHubConfig;
  /** Data format of the data source */
  sourceDataFormat?: SourceDataFormatUnion;
  /** Cloud events config */
  cloudEventsConfig?: CloudEventsConfigUnion;
  /** Special properties for source. */
  dataSourceProperties: DataSourcePropertiesUnion;
}

export function sourceConnectorPropertiesSerializer(
  item: SourceConnectorProperties,
): any {
  return {
    direction: item["direction"],
    maxTasks: item["maxTasks"],
    networkProperties: !item["networkProperties"]
      ? item["networkProperties"]
      : networkPropertiesSerializer(item["networkProperties"]),
    scalingProperties: scalingPropertiesUnionSerializer(
      item["scalingProperties"],
    ),
    connectorState: item["connectorState"],
    converterConfig: converterConfigUnionSerializer(item["converterConfig"]),
    eventHubConfig: eventHubConfigSerializer(item["eventHubConfig"]),
    sourceDataFormat: !item["sourceDataFormat"]
      ? item["sourceDataFormat"]
      : sourceDataFormatUnionSerializer(item["sourceDataFormat"]),
    cloudEventsConfig: !item["cloudEventsConfig"]
      ? item["cloudEventsConfig"]
      : cloudEventsConfigUnionSerializer(item["cloudEventsConfig"]),
    dataSourceProperties: dataSourcePropertiesUnionSerializer(
      item["dataSourceProperties"],
    ),
  };
}

export function sourceConnectorPropertiesDeserializer(
  item: any,
): SourceConnectorProperties {
  return {
    direction: item["direction"],
    maxTasks: item["maxTasks"],
    networkProperties: !item["networkProperties"]
      ? item["networkProperties"]
      : networkPropertiesDeserializer(item["networkProperties"]),
    scalingProperties: scalingPropertiesUnionDeserializer(
      item["scalingProperties"],
    ),
    connectorState: item["connectorState"],
    provisioningState: item["provisioningState"],
    converterConfig: converterConfigUnionDeserializer(item["converterConfig"]),
    eventHubConfig: eventHubConfigDeserializer(item["eventHubConfig"]),
    sourceDataFormat: !item["sourceDataFormat"]
      ? item["sourceDataFormat"]
      : sourceDataFormatUnionDeserializer(item["sourceDataFormat"]),
    cloudEventsConfig: !item["cloudEventsConfig"]
      ? item["cloudEventsConfig"]
      : cloudEventsConfigUnionDeserializer(item["cloudEventsConfig"]),
    dataSourceProperties: dataSourcePropertiesUnionDeserializer(
      item["dataSourceProperties"],
    ),
  };
}

/** Base class for Converter config */
export interface ConverterConfig {
  /** Type of converter. */
  /** The discriminator possible values: CsvConverter, AvroConverter, StringConverter, ByteArrayConverter, JsonConverter */
  type: ConverterType;
}

export function converterConfigSerializer(item: ConverterConfig): any {
  return { type: item["type"] };
}

export function converterConfigDeserializer(item: any): ConverterConfig {
  return {
    type: item["type"],
  };
}

/** Alias for ConverterConfigUnion */
export type ConverterConfigUnion =
  | CsvConverterConfig
  | AvroConverterConfig
  | StringConverterConfig
  | ByteArrayConverterConfig
  | JsonConverterConfig
  | ConverterConfig;

export function converterConfigUnionSerializer(
  item: ConverterConfigUnion,
): any {
  switch (item.type) {
    case "CsvConverter":
      return csvConverterConfigSerializer(item as CsvConverterConfig);

    case "AvroConverter":
      return avroConverterConfigSerializer(item as AvroConverterConfig);

    case "StringConverter":
      return stringConverterConfigSerializer(item as StringConverterConfig);

    case "ByteArrayConverter":
      return byteArrayConverterConfigSerializer(
        item as ByteArrayConverterConfig,
      );

    case "JsonConverter":
      return jsonConverterConfigSerializer(item as JsonConverterConfig);

    default:
      return converterConfigSerializer(item);
  }
}

export function converterConfigUnionDeserializer(
  item: any,
): ConverterConfigUnion {
  switch (item.type) {
    case "CsvConverter":
      return csvConverterConfigDeserializer(item as CsvConverterConfig);

    case "AvroConverter":
      return avroConverterConfigDeserializer(item as AvroConverterConfig);

    case "StringConverter":
      return stringConverterConfigDeserializer(item as StringConverterConfig);

    case "ByteArrayConverter":
      return byteArrayConverterConfigDeserializer(
        item as ByteArrayConverterConfig,
      );

    case "JsonConverter":
      return jsonConverterConfigDeserializer(item as JsonConverterConfig);

    default:
      return converterConfigDeserializer(item);
  }
}

/** Enum of the type of Converter */
export enum KnownConverterType {
  /** This represents a converter for byte arrays format. */
  ByteArrayConverter = "ByteArrayConverter",
  /** This represents a converter for string format. */
  StringConverter = "StringConverter",
  /** This represents a converter for json format. */
  JsonConverter = "JsonConverter",
  /** This represents a converter for Avro format. */
  AvroConverter = "AvroConverter",
  /** This represents a converter for csv format. */
  CsvConverter = "CsvConverter",
}

/**
 * Enum of the type of Converter \
 * {@link KnownConverterType} can be used interchangeably with ConverterType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ByteArrayConverter**: This represents a converter for byte arrays format. \
 * **StringConverter**: This represents a converter for string format. \
 * **JsonConverter**: This represents a converter for json format. \
 * **AvroConverter**: This represents a converter for Avro format. \
 * **CsvConverter**: This represents a converter for csv format.
 */
export type ConverterType = string;

/** CsvConverter config */
export interface CsvConverterConfig extends ConverterConfig {
  /** Type of converter. */
  type: "CsvConverter";
}

export function csvConverterConfigSerializer(item: CsvConverterConfig): any {
  return { type: item["type"] };
}

export function csvConverterConfigDeserializer(item: any): CsvConverterConfig {
  return {
    type: item["type"],
  };
}

/** AvroConverter config */
export interface AvroConverterConfig extends ConverterConfig {
  /** Type of converter. */
  type: "AvroConverter";
}

export function avroConverterConfigSerializer(item: AvroConverterConfig): any {
  return { type: item["type"] };
}

export function avroConverterConfigDeserializer(
  item: any,
): AvroConverterConfig {
  return {
    type: item["type"],
  };
}

/** StringConverter config */
export interface StringConverterConfig extends ConverterConfig {
  /** Type of converter. */
  type: "StringConverter";
}

export function stringConverterConfigSerializer(
  item: StringConverterConfig,
): any {
  return { type: item["type"] };
}

export function stringConverterConfigDeserializer(
  item: any,
): StringConverterConfig {
  return {
    type: item["type"],
  };
}

/** ByteArrayConverter config */
export interface ByteArrayConverterConfig extends ConverterConfig {
  /** Type of converter. */
  type: "ByteArrayConverter";
}

export function byteArrayConverterConfigSerializer(
  item: ByteArrayConverterConfig,
): any {
  return { type: item["type"] };
}

export function byteArrayConverterConfigDeserializer(
  item: any,
): ByteArrayConverterConfig {
  return {
    type: item["type"],
  };
}

/** JsonConverter config */
export interface JsonConverterConfig extends ConverterConfig {
  /** Type of converter. */
  type: "JsonConverter";
  /** Whether schemas enabled. */
  schemasEnabled?: boolean;
  /** Format for Decimal type. */
  decimalFormat?: JsonDecimalFormat;
}

export function jsonConverterConfigSerializer(item: JsonConverterConfig): any {
  return {
    type: item["type"],
    schemasEnabled: item["schemasEnabled"],
    decimalFormat: item["decimalFormat"],
  };
}

export function jsonConverterConfigDeserializer(
  item: any,
): JsonConverterConfig {
  return {
    type: item["type"],
    schemasEnabled: item["schemasEnabled"],
    decimalFormat: item["decimalFormat"],
  };
}

/** Json Decimal Format configuration */
export enum KnownJsonDecimalFormat {
  /** Type of Base64. */
  Base64 = "Base64",
  /** Type of Numeric. */
  Numeric = "Numeric",
}

/**
 * Json Decimal Format configuration \
 * {@link KnownJsonDecimalFormat} can be used interchangeably with JsonDecimalFormat,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Base64**: Type of Base64. \
 * **Numeric**: Type of Numeric.
 */
export type JsonDecimalFormat = string;

/** Basic info for EventHub */
export interface EventHubConfig {
  /** namespace of the EventHub. */
  namespaceHostName: string;
  /** name of the EventHub. */
  eventHubName: string;
  /** Auth of Eventhub */
  authentication: AuthenticationUnion;
}

export function eventHubConfigSerializer(item: EventHubConfig): any {
  return {
    namespaceHostName: item["namespaceHostName"],
    eventHubName: item["eventHubName"],
    authentication: authenticationUnionSerializer(item["authentication"]),
  };
}

export function eventHubConfigDeserializer(item: any): EventHubConfig {
  return {
    namespaceHostName: item["namespaceHostName"],
    eventHubName: item["eventHubName"],
    authentication: authenticationUnionDeserializer(item["authentication"]),
  };
}

/** Base properties for auth. */
export interface Authentication {
  /** Type of the Auth Model. */
  /** The discriminator possible values: ConnectionString, UsernamePassword, AccessKey, SasToken, OAuth */
  authenticationMode: AuthenticationMode;
}

export function authenticationSerializer(item: Authentication): any {
  return { authenticationMode: item["authenticationMode"] };
}

export function authenticationDeserializer(item: any): Authentication {
  return {
    authenticationMode: item["authenticationMode"],
  };
}

/** Alias for AuthenticationUnion */
export type AuthenticationUnion =
  | ConnectionStringAuthentication
  | UsernamePasswordAuthentication
  | AccessKeyAuthentication
  | SasTokenAuthentication
  | OAuthAuthentication
  | Authentication;

export function authenticationUnionSerializer(item: AuthenticationUnion): any {
  switch (item.authenticationMode) {
    case "ConnectionString":
      return connectionStringAuthenticationSerializer(
        item as ConnectionStringAuthentication,
      );

    case "UsernamePassword":
      return usernamePasswordAuthenticationSerializer(
        item as UsernamePasswordAuthentication,
      );

    case "AccessKey":
      return accessKeyAuthenticationSerializer(item as AccessKeyAuthentication);

    case "SasToken":
      return sasTokenAuthenticationSerializer(item as SasTokenAuthentication);

    case "OAuth":
      return oAuthAuthenticationSerializer(item as OAuthAuthentication);

    default:
      return authenticationSerializer(item);
  }
}

export function authenticationUnionDeserializer(
  item: any,
): AuthenticationUnion {
  switch (item.authenticationMode) {
    case "ConnectionString":
      return connectionStringAuthenticationDeserializer(
        item as ConnectionStringAuthentication,
      );

    case "UsernamePassword":
      return usernamePasswordAuthenticationDeserializer(
        item as UsernamePasswordAuthentication,
      );

    case "AccessKey":
      return accessKeyAuthenticationDeserializer(
        item as AccessKeyAuthentication,
      );

    case "SasToken":
      return sasTokenAuthenticationDeserializer(item as SasTokenAuthentication);

    case "OAuth":
      return oAuthAuthenticationDeserializer(item as OAuthAuthentication);

    default:
      return authenticationDeserializer(item);
  }
}

/** Auth Model types */
export enum KnownAuthenticationMode {
  /** OAuth model. */
  OAuth = "OAuth",
  /** ConnectionString model. */
  ConnectionString = "ConnectionString",
  /** UsernamePassword model. */
  UsernamePassword = "UsernamePassword",
  /** AccessKey model. */
  AccessKey = "AccessKey",
  /** SasToken model. */
  SasToken = "SasToken",
  /** Anonymous model. */
  Anonymous = "Anonymous",
}

/**
 * Auth Model types \
 * {@link KnownAuthenticationMode} can be used interchangeably with AuthenticationMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **OAuth**: OAuth model. \
 * **ConnectionString**: ConnectionString model. \
 * **UsernamePassword**: UsernamePassword model. \
 * **AccessKey**: AccessKey model. \
 * **SasToken**: SasToken model. \
 * **Anonymous**: Anonymous model.
 */
export type AuthenticationMode = string;

/** ConnectionString Model. */
export interface ConnectionStringAuthentication extends Authentication {
  /** Type of the Auth Model. */
  authenticationMode: "ConnectionString";
  /** ConnectionString secret. */
  connectionString: string;
}

export function connectionStringAuthenticationSerializer(
  item: ConnectionStringAuthentication,
): any {
  return {
    authenticationMode: item["authenticationMode"],
    connectionString: item["connectionString"],
  };
}

export function connectionStringAuthenticationDeserializer(
  item: any,
): ConnectionStringAuthentication {
  return {
    authenticationMode: item["authenticationMode"],
    connectionString: item["connectionString"],
  };
}

/** UsernamePassword Model. */
export interface UsernamePasswordAuthentication extends Authentication {
  /** Type of the Auth Model. */
  authenticationMode: "UsernamePassword";
  /** Username for auth. */
  username: string;
  /** Password for auth. */
  password: string;
}

export function usernamePasswordAuthenticationSerializer(
  item: UsernamePasswordAuthentication,
): any {
  return {
    authenticationMode: item["authenticationMode"],
    username: item["username"],
    password: item["password"],
  };
}

export function usernamePasswordAuthenticationDeserializer(
  item: any,
): UsernamePasswordAuthentication {
  return {
    authenticationMode: item["authenticationMode"],
    username: item["username"],
    password: item["password"],
  };
}

/** AccessKey Model. */
export interface AccessKeyAuthentication extends Authentication {
  /** Type of the Auth Model. */
  authenticationMode: "AccessKey";
  /** AccessKey secret. */
  accessKey: string;
}

export function accessKeyAuthenticationSerializer(
  item: AccessKeyAuthentication,
): any {
  return {
    authenticationMode: item["authenticationMode"],
    accessKey: item["accessKey"],
  };
}

export function accessKeyAuthenticationDeserializer(
  item: any,
): AccessKeyAuthentication {
  return {
    authenticationMode: item["authenticationMode"],
    accessKey: item["accessKey"],
  };
}

/** SasToken Model. */
export interface SasTokenAuthentication extends Authentication {
  /** Type of the Auth Model. */
  authenticationMode: "SasToken";
  /** SasToken secret. */
  sasToken: string;
}

export function sasTokenAuthenticationSerializer(
  item: SasTokenAuthentication,
): any {
  return {
    authenticationMode: item["authenticationMode"],
    sasToken: item["sasToken"],
  };
}

export function sasTokenAuthenticationDeserializer(
  item: any,
): SasTokenAuthentication {
  return {
    authenticationMode: item["authenticationMode"],
    sasToken: item["sasToken"],
  };
}

/** OAuth Model. */
export interface OAuthAuthentication extends Authentication {
  /** Type of the Auth Model. */
  authenticationMode: "OAuth";
  /** AccessToken for OAuth. */
  accessToken: string;
}

export function oAuthAuthenticationSerializer(item: OAuthAuthentication): any {
  return {
    authenticationMode: item["authenticationMode"],
    accessToken: item["accessToken"],
  };
}

export function oAuthAuthenticationDeserializer(
  item: any,
): OAuthAuthentication {
  return {
    authenticationMode: item["authenticationMode"],
    accessToken: item["accessToken"],
  };
}

/** Source data format base model */
export interface SourceDataFormat {
  /** Type of data format */
  /** The discriminator possible values: Json, Csv, ConfluentAvro, Avro */
  type: SourceDataFormatType;
}

export function sourceDataFormatSerializer(item: SourceDataFormat): any {
  return { type: item["type"] };
}

export function sourceDataFormatDeserializer(item: any): SourceDataFormat {
  return {
    type: item["type"],
  };
}

/** Alias for SourceDataFormatUnion */
export type SourceDataFormatUnion =
  | JsonSourceDataFormat
  | CsvSourceDataFormat
  | ConfluentAvroSourceDataFormat
  | AvroSourceDataFormat
  | SourceDataFormat;

export function sourceDataFormatUnionSerializer(
  item: SourceDataFormatUnion,
): any {
  switch (item.type) {
    case "Json":
      return jsonSourceDataFormatSerializer(item as JsonSourceDataFormat);

    case "Csv":
      return csvSourceDataFormatSerializer(item as CsvSourceDataFormat);

    case "ConfluentAvro":
      return confluentAvroSourceDataFormatSerializer(
        item as ConfluentAvroSourceDataFormat,
      );

    case "Avro":
      return avroSourceDataFormatSerializer(item as AvroSourceDataFormat);

    default:
      return sourceDataFormatSerializer(item);
  }
}

export function sourceDataFormatUnionDeserializer(
  item: any,
): SourceDataFormatUnion {
  switch (item.type) {
    case "Json":
      return jsonSourceDataFormatDeserializer(item as JsonSourceDataFormat);

    case "Csv":
      return csvSourceDataFormatDeserializer(item as CsvSourceDataFormat);

    case "ConfluentAvro":
      return confluentAvroSourceDataFormatDeserializer(
        item as ConfluentAvroSourceDataFormat,
      );

    case "Avro":
      return avroSourceDataFormatDeserializer(item as AvroSourceDataFormat);

    default:
      return sourceDataFormatDeserializer(item);
  }
}

/** Source data format Types */
export enum KnownSourceDataFormatType {
  /** Json format */
  Json = "Json",
  /** Csv format */
  Csv = "Csv",
  /** ConfluentAvro format */
  ConfluentAvro = "ConfluentAvro",
  /** Avro format */
  Avro = "Avro",
}

/**
 * Source data format Types \
 * {@link KnownSourceDataFormatType} can be used interchangeably with SourceDataFormatType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Json**: Json format \
 * **Csv**: Csv format \
 * **ConfluentAvro**: ConfluentAvro format \
 * **Avro**: Avro format
 */
export type SourceDataFormatType = string;

/** JSON source data format model */
export interface JsonSourceDataFormat extends SourceDataFormat {
  /** Type of data format */
  type: "Json";
  /** Charset supported by Java language */
  textCharset: string;
}

export function jsonSourceDataFormatSerializer(
  item: JsonSourceDataFormat,
): any {
  return { type: item["type"], textCharset: item["textCharset"] };
}

export function jsonSourceDataFormatDeserializer(
  item: any,
): JsonSourceDataFormat {
  return {
    type: item["type"],
    textCharset: item["textCharset"],
  };
}

/** CSV Source data format model */
export interface CsvSourceDataFormat extends SourceDataFormat {
  /** Type of data format */
  type: "Csv";
  /** Whether the CSV data has a header row. */
  dataWithHeader?: boolean;
  /** Default is UTF-8. Supported Encodings: https://docs.oracle.com/javase/8/docs/technotes/guides/intl/encoding.doc.html */
  textCharset?: string;
  /** The character used to separate columns in the CSV data. */
  columnSeparator?: string;
}

export function csvSourceDataFormatSerializer(item: CsvSourceDataFormat): any {
  return {
    type: item["type"],
    dataWithHeader: item["dataWithHeader"],
    textCharset: item["textCharset"],
    columnSeparator: item["columnSeparator"],
  };
}

export function csvSourceDataFormatDeserializer(
  item: any,
): CsvSourceDataFormat {
  return {
    type: item["type"],
    dataWithHeader: item["dataWithHeader"],
    textCharset: item["textCharset"],
    columnSeparator: item["columnSeparator"],
  };
}

/** ConfluentAvro Source data format model */
export interface ConfluentAvroSourceDataFormat extends SourceDataFormat {
  /** Type of data format */
  type: "ConfluentAvro";
  /** Registry url for Confluent. */
  schemaRegistryUrl: string;
  /** Access key for Confluent. */
  key: string;
  /** Secret for Confluent. */
  secret: string;
  /** subject name. */
  subjectName?: string;
  /** schema context. */
  schemaContext?: string;
}

export function confluentAvroSourceDataFormatSerializer(
  item: ConfluentAvroSourceDataFormat,
): any {
  return {
    type: item["type"],
    schemaRegistryUrl: item["schemaRegistryUrl"],
    key: item["key"],
    secret: item["secret"],
    subjectName: item["subjectName"],
    schemaContext: item["schemaContext"],
  };
}

export function confluentAvroSourceDataFormatDeserializer(
  item: any,
): ConfluentAvroSourceDataFormat {
  return {
    type: item["type"],
    schemaRegistryUrl: item["schemaRegistryUrl"],
    key: item["key"],
    secret: item["secret"],
    subjectName: item["subjectName"],
    schemaContext: item["schemaContext"],
  };
}

/** Avro Source data format model */
export interface AvroSourceDataFormat extends SourceDataFormat {
  /** Type of data format */
  type: "Avro";
}

export function avroSourceDataFormatSerializer(
  item: AvroSourceDataFormat,
): any {
  return { type: item["type"] };
}

export function avroSourceDataFormatDeserializer(
  item: any,
): AvroSourceDataFormat {
  return {
    type: item["type"],
  };
}

/** Cloud events config */
export interface CloudEventsConfig {
  /** Type of CloudEventsConfig. */
  /** The discriminator possible values: Catalog, EventSchemaSet */
  type: CloudEventsType;
}

export function cloudEventsConfigSerializer(item: CloudEventsConfig): any {
  return { type: item["type"] };
}

export function cloudEventsConfigDeserializer(item: any): CloudEventsConfig {
  return {
    type: item["type"],
  };
}

/** Alias for CloudEventsConfigUnion */
export type CloudEventsConfigUnion =
  | CatalogCloudEventsConfig
  | EventSchemaSetCloudEventsConfig
  | CloudEventsConfig;

export function cloudEventsConfigUnionSerializer(
  item: CloudEventsConfigUnion,
): any {
  switch (item.type) {
    case "Catalog":
      return catalogCloudEventsConfigSerializer(
        item as CatalogCloudEventsConfig,
      );

    case "EventSchemaSet":
      return eventSchemaSetCloudEventsConfigSerializer(
        item as EventSchemaSetCloudEventsConfig,
      );

    default:
      return cloudEventsConfigSerializer(item);
  }
}

export function cloudEventsConfigUnionDeserializer(
  item: any,
): CloudEventsConfigUnion {
  switch (item.type) {
    case "Catalog":
      return catalogCloudEventsConfigDeserializer(
        item as CatalogCloudEventsConfig,
      );

    case "EventSchemaSet":
      return eventSchemaSetCloudEventsConfigDeserializer(
        item as EventSchemaSetCloudEventsConfig,
      );

    default:
      return cloudEventsConfigDeserializer(item);
  }
}

/** CloudEvents types */
export enum KnownCloudEventsType {
  /** CatalogCloudEventsConfig */
  Catalog = "Catalog",
  /** EventSchemaSetCloudEventsConfig */
  EventSchemaSet = "EventSchemaSet",
}

/**
 * CloudEvents types \
 * {@link KnownCloudEventsType} can be used interchangeably with CloudEventsType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Catalog**: CatalogCloudEventsConfig \
 * **EventSchemaSet**: EventSchemaSetCloudEventsConfig
 */
export type CloudEventsType = string;

/** Catalog cloud events transform config. */
export interface CatalogCloudEventsConfig extends CloudEventsConfig {
  /** Type of CatalogCloudEventsConfig. */
  type: "Catalog";
  /** Whether auto-register new schemas. */
  autoRegisterSchemas: boolean;
  /** Catalog schemaIds. */
  catalogSchemaIds: CatalogSchemaId[];
  /** Auth of Catalog */
  authentication: AuthenticationUnion;
}

export function catalogCloudEventsConfigSerializer(
  item: CatalogCloudEventsConfig,
): any {
  return {
    type: item["type"],
    autoRegisterSchemas: item["autoRegisterSchemas"],
    catalogSchemaIds: catalogSchemaIdArraySerializer(item["catalogSchemaIds"]),
    authentication: authenticationUnionSerializer(item["authentication"]),
  };
}

export function catalogCloudEventsConfigDeserializer(
  item: any,
): CatalogCloudEventsConfig {
  return {
    type: item["type"],
    autoRegisterSchemas: item["autoRegisterSchemas"],
    catalogSchemaIds: catalogSchemaIdArrayDeserializer(
      item["catalogSchemaIds"],
    ),
    authentication: authenticationUnionDeserializer(item["authentication"]),
  };
}

export function catalogSchemaIdArraySerializer(
  result: Array<CatalogSchemaId>,
): any[] {
  return result.map((item) => {
    return catalogSchemaIdSerializer(item);
  });
}

export function catalogSchemaIdArrayDeserializer(
  result: Array<CatalogSchemaId>,
): any[] {
  return result.map((item) => {
    return catalogSchemaIdDeserializer(item);
  });
}

/** Catalog schema id config */
export interface CatalogSchemaId {
  /** The schema group id in the catalog, which can be obtained from the catalog cloud provider. */
  schemaGroupId: string;
  /** The schema id in schema group. */
  schemaId: string;
  /** Endpoint for catalog. */
  endpoint: string;
}

export function catalogSchemaIdSerializer(item: CatalogSchemaId): any {
  return {
    schemaGroupId: item["schemaGroupId"],
    schemaId: item["schemaId"],
    endpoint: item["endpoint"],
  };
}

export function catalogSchemaIdDeserializer(item: any): CatalogSchemaId {
  return {
    schemaGroupId: item["schemaGroupId"],
    schemaId: item["schemaId"],
    endpoint: item["endpoint"],
  };
}

/** EventSchemaSet cloud events transform config. */
export interface EventSchemaSetCloudEventsConfig extends CloudEventsConfig {
  /** Type of EventSchemaSetCloudEventsConfig. */
  type: "EventSchemaSet";
  /** Endpoint of EventSchemaSet. */
  endpoint: string;
  /** Id list of MessagingGroup. */
  messageGroupIds: string[];
  /** Auth of EventSchemaSet */
  authentication: AuthenticationUnion;
}

export function eventSchemaSetCloudEventsConfigSerializer(
  item: EventSchemaSetCloudEventsConfig,
): any {
  return {
    type: item["type"],
    endpoint: item["endpoint"],
    messageGroupIds: item["messageGroupIds"].map((p: any) => {
      return p;
    }),
    authentication: authenticationUnionSerializer(item["authentication"]),
  };
}

export function eventSchemaSetCloudEventsConfigDeserializer(
  item: any,
): EventSchemaSetCloudEventsConfig {
  return {
    type: item["type"],
    endpoint: item["endpoint"],
    messageGroupIds: item["messageGroupIds"].map((p: any) => {
      return p;
    }),
    authentication: authenticationUnionDeserializer(item["authentication"]),
  };
}

/** Base properties for source. */
export interface DataSourceProperties {
  /** Type of the Connector. */
  /** The discriminator possible values: AzureDataExplorerSource, AzureServiceBusSource, ConfluentSource, CosmosDbSource, GooglePubSubSource, HanaDatabaseSource, KinesisSource, MqttSource, MySqlSource, PostgreSqlSource, SqlServerSource, SolacePubsubSource, ManagedAzureMapsWeatherSource, EventHubSource, DataverseSource, SampleDataSource, AzureBlobSource, OracleSource, HttpSource, MongoDbSource */
  connectorType: ConnectorType;
  /** Subtype of the Connector. */
  connectorSubType?: ConnectorSubType;
}

export function dataSourcePropertiesSerializer(
  item: DataSourceProperties,
): any {
  return {
    connectorType: item["connectorType"],
    connectorSubType: item["connectorSubType"],
  };
}

export function dataSourcePropertiesDeserializer(
  item: any,
): DataSourceProperties {
  return {
    connectorType: item["connectorType"],
    connectorSubType: item["connectorSubType"],
  };
}

/** Alias for DataSourcePropertiesUnion */
export type DataSourcePropertiesUnion =
  | AzureDataExplorerSourceConnectorProperties
  | AzureServiceBusSourceConnectorProperties
  | ConfluentSourceConnectorProperties
  | CosmosDbSourceConnectorProperties
  | GooglePubSubSourceConnectorProperties
  | HanaDatabaseSourceConnectorProperties
  | KinesisSourceConnectorProperties
  | MqttSourceConnectorProperties
  | MySqlSourceConnectorProperties
  | PostgreSqlSourceConnectorProperties
  | SqlServerSourceConnectorProperties
  | SolacePubsubSourceConnectorProperties
  | ManagedAzureMapsWeatherSourceConnectorProperties
  | EventHubSourceConnectorProperties
  | DataverseSourceConnectorProperties
  | SampleDataSourceConnectorProperties
  | AzureBlobSourceConnectorProperties
  | OracleSourceConnectorProperties
  | HttpSourceConnectorProperties
  | MongoDbSourceConnectorProperties
  | DataSourceProperties;

export function dataSourcePropertiesUnionSerializer(
  item: DataSourcePropertiesUnion,
): any {
  switch (item.connectorType) {
    case "AzureDataExplorerSource":
      return azureDataExplorerSourceConnectorPropertiesSerializer(
        item as AzureDataExplorerSourceConnectorProperties,
      );

    case "AzureServiceBusSource":
      return azureServiceBusSourceConnectorPropertiesSerializer(
        item as AzureServiceBusSourceConnectorProperties,
      );

    case "ConfluentSource":
      return confluentSourceConnectorPropertiesSerializer(
        item as ConfluentSourceConnectorProperties,
      );

    case "CosmosDbSource":
      return cosmosDbSourceConnectorPropertiesSerializer(
        item as CosmosDbSourceConnectorProperties,
      );

    case "GooglePubSubSource":
      return googlePubSubSourceConnectorPropertiesSerializer(
        item as GooglePubSubSourceConnectorProperties,
      );

    case "HanaDatabaseSource":
      return hanaDatabaseSourceConnectorPropertiesSerializer(
        item as HanaDatabaseSourceConnectorProperties,
      );

    case "KinesisSource":
      return kinesisSourceConnectorPropertiesSerializer(
        item as KinesisSourceConnectorProperties,
      );

    case "MqttSource":
      return mqttSourceConnectorPropertiesSerializer(
        item as MqttSourceConnectorProperties,
      );

    case "MySqlSource":
      return mySqlSourceConnectorPropertiesSerializer(
        item as MySqlSourceConnectorProperties,
      );

    case "PostgreSqlSource":
      return postgreSqlSourceConnectorPropertiesSerializer(
        item as PostgreSqlSourceConnectorProperties,
      );

    case "SqlServerSource":
      return sqlServerSourceConnectorPropertiesSerializer(
        item as SqlServerSourceConnectorProperties,
      );

    case "SolacePubsubSource":
      return solacePubsubSourceConnectorPropertiesSerializer(
        item as SolacePubsubSourceConnectorProperties,
      );

    case "ManagedAzureMapsWeatherSource":
      return managedAzureMapsWeatherSourceConnectorPropertiesSerializer(
        item as ManagedAzureMapsWeatherSourceConnectorProperties,
      );

    case "EventHubSource":
      return eventHubSourceConnectorPropertiesSerializer(
        item as EventHubSourceConnectorProperties,
      );

    case "DataverseSource":
      return dataverseSourceConnectorPropertiesSerializer(
        item as DataverseSourceConnectorProperties,
      );

    case "SampleDataSource":
      return sampleDataSourceConnectorPropertiesSerializer(
        item as SampleDataSourceConnectorProperties,
      );

    case "AzureBlobSource":
      return azureBlobSourceConnectorPropertiesSerializer(
        item as AzureBlobSourceConnectorProperties,
      );

    case "OracleSource":
      return oracleSourceConnectorPropertiesSerializer(
        item as OracleSourceConnectorProperties,
      );

    case "HttpSource":
      return httpSourceConnectorPropertiesSerializer(
        item as HttpSourceConnectorProperties,
      );

    case "MongoDbSource":
      return mongoDbSourceConnectorPropertiesSerializer(
        item as MongoDbSourceConnectorProperties,
      );

    default:
      return dataSourcePropertiesSerializer(item);
  }
}

export function dataSourcePropertiesUnionDeserializer(
  item: any,
): DataSourcePropertiesUnion {
  switch (item.connectorType) {
    case "AzureDataExplorerSource":
      return azureDataExplorerSourceConnectorPropertiesDeserializer(
        item as AzureDataExplorerSourceConnectorProperties,
      );

    case "AzureServiceBusSource":
      return azureServiceBusSourceConnectorPropertiesDeserializer(
        item as AzureServiceBusSourceConnectorProperties,
      );

    case "ConfluentSource":
      return confluentSourceConnectorPropertiesDeserializer(
        item as ConfluentSourceConnectorProperties,
      );

    case "CosmosDbSource":
      return cosmosDbSourceConnectorPropertiesDeserializer(
        item as CosmosDbSourceConnectorProperties,
      );

    case "GooglePubSubSource":
      return googlePubSubSourceConnectorPropertiesDeserializer(
        item as GooglePubSubSourceConnectorProperties,
      );

    case "HanaDatabaseSource":
      return hanaDatabaseSourceConnectorPropertiesDeserializer(
        item as HanaDatabaseSourceConnectorProperties,
      );

    case "KinesisSource":
      return kinesisSourceConnectorPropertiesDeserializer(
        item as KinesisSourceConnectorProperties,
      );

    case "MqttSource":
      return mqttSourceConnectorPropertiesDeserializer(
        item as MqttSourceConnectorProperties,
      );

    case "MySqlSource":
      return mySqlSourceConnectorPropertiesDeserializer(
        item as MySqlSourceConnectorProperties,
      );

    case "PostgreSqlSource":
      return postgreSqlSourceConnectorPropertiesDeserializer(
        item as PostgreSqlSourceConnectorProperties,
      );

    case "SqlServerSource":
      return sqlServerSourceConnectorPropertiesDeserializer(
        item as SqlServerSourceConnectorProperties,
      );

    case "SolacePubsubSource":
      return solacePubsubSourceConnectorPropertiesDeserializer(
        item as SolacePubsubSourceConnectorProperties,
      );

    case "ManagedAzureMapsWeatherSource":
      return managedAzureMapsWeatherSourceConnectorPropertiesDeserializer(
        item as ManagedAzureMapsWeatherSourceConnectorProperties,
      );

    case "EventHubSource":
      return eventHubSourceConnectorPropertiesDeserializer(
        item as EventHubSourceConnectorProperties,
      );

    case "DataverseSource":
      return dataverseSourceConnectorPropertiesDeserializer(
        item as DataverseSourceConnectorProperties,
      );

    case "SampleDataSource":
      return sampleDataSourceConnectorPropertiesDeserializer(
        item as SampleDataSourceConnectorProperties,
      );

    case "AzureBlobSource":
      return azureBlobSourceConnectorPropertiesDeserializer(
        item as AzureBlobSourceConnectorProperties,
      );

    case "OracleSource":
      return oracleSourceConnectorPropertiesDeserializer(
        item as OracleSourceConnectorProperties,
      );

    case "HttpSource":
      return httpSourceConnectorPropertiesDeserializer(
        item as HttpSourceConnectorProperties,
      );

    case "MongoDbSource":
      return mongoDbSourceConnectorPropertiesDeserializer(
        item as MongoDbSourceConnectorProperties,
      );

    default:
      return dataSourcePropertiesDeserializer(item);
  }
}

/** Enum of the type of Connector */
export enum KnownConnectorType {
  /** Google pub sub source connector. */
  GooglePubSubSource = "GooglePubSubSource",
  /** Amazon kinesis source connector. */
  KinesisSource = "KinesisSource",
  /** Postgre sql source connector. */
  PostgreSqlSource = "PostgreSqlSource",
  /** Sql server source connector. */
  SqlServerSource = "SqlServerSource",
  /** Cosmos db source connector. */
  CosmosDbSource = "CosmosDbSource",
  /** Confluent source connector. */
  ConfluentSource = "ConfluentSource",
  /** Mysql source connector. */
  MySqlSource = "MySqlSource",
  /** Servicebus source connector. */
  AzureServiceBusSource = "AzureServiceBusSource",
  /** Hana database source connector. */
  HanaDatabaseSource = "HanaDatabaseSource",
  /** Azure Data Explorer source connector. */
  AzureDataExplorerSource = "AzureDataExplorerSource",
  /** Mqtt source connector. */
  MqttSource = "MqttSource",
  /** SolacePubsub source connector. */
  SolacePubsubSource = "SolacePubsubSource",
  /** ManagedAzureMapsWeatherSource source connector. */
  ManagedAzureMapsWeatherSource = "ManagedAzureMapsWeatherSource",
  /** EventHub source connector. */
  EventHubSource = "EventHubSource",
  /** Dataverse source connector. */
  DataverseSource = "DataverseSource",
  /** Dataverse source connector. */
  AzureBlobSource = "AzureBlobSource",
  /** SampleData source connector. */
  SampleDataSource = "SampleDataSource",
  /** Oracle source connector. */
  OracleSource = "OracleSource",
  /** Http source connector. */
  HttpSource = "HttpSource",
  /** MongoDb source connector. */
  MongoDbSource = "MongoDbSource",
}

/**
 * Enum of the type of Connector \
 * {@link KnownConnectorType} can be used interchangeably with ConnectorType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **GooglePubSubSource**: Google pub sub source connector. \
 * **KinesisSource**: Amazon kinesis source connector. \
 * **PostgreSqlSource**: Postgre sql source connector. \
 * **SqlServerSource**: Sql server source connector. \
 * **CosmosDbSource**: Cosmos db source connector. \
 * **ConfluentSource**: Confluent source connector. \
 * **MySqlSource**: Mysql source connector. \
 * **AzureServiceBusSource**: Servicebus source connector. \
 * **HanaDatabaseSource**: Hana database source connector. \
 * **AzureDataExplorerSource**: Azure Data Explorer source connector. \
 * **MqttSource**: Mqtt source connector. \
 * **SolacePubsubSource**: SolacePubsub source connector. \
 * **ManagedAzureMapsWeatherSource**: ManagedAzureMapsWeatherSource source connector. \
 * **EventHubSource**: EventHub source connector. \
 * **DataverseSource**: Dataverse source connector. \
 * **AzureBlobSource**: Dataverse source connector. \
 * **SampleDataSource**: SampleData source connector. \
 * **OracleSource**: Oracle source connector. \
 * **HttpSource**: Http source connector. \
 * **MongoDbSource**: MongoDb source connector.
 */
export type ConnectorType = string;

/** Enum of the type of Connector */
export enum KnownConnectorSubType {
  /** EventHub Source. */
  EventHubSource = "EventHubSource",
  /** IoTHub Source. */
  IoTHubSource = "IoTHubSource",
}

/**
 * Enum of the type of Connector \
 * {@link KnownConnectorSubType} can be used interchangeably with ConnectorSubType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **EventHubSource**: EventHub Source. \
 * **IoTHubSource**: IoTHub Source.
 */
export type ConnectorSubType = string;

/** Configuration for AzureDataExplorerSourceConnector */
export interface AzureDataExplorerSourceConnectorProperties
  extends DataSourceProperties {
  /** Type of AzureDataExplorerSourceConnector */
  connectorType: "AzureDataExplorerSource";
  /** Url of AzureDataExplorer cluster. */
  clusterUrl: string;
  /** Database name for AzureDataExplorer. */
  database: string;
  /** AzureDataExplorer table names use commas to separate multiple tables. */
  tableNames: string;
  /** The OAuth accessToken */
  authentication: AuthenticationUnion;
}

export function azureDataExplorerSourceConnectorPropertiesSerializer(
  item: AzureDataExplorerSourceConnectorProperties,
): any {
  return {
    connectorType: item["connectorType"],
    connectorSubType: item["connectorSubType"],
    clusterUrl: item["clusterUrl"],
    database: item["database"],
    tableNames: item["tableNames"],
    authentication: authenticationUnionSerializer(item["authentication"]),
  };
}

export function azureDataExplorerSourceConnectorPropertiesDeserializer(
  item: any,
): AzureDataExplorerSourceConnectorProperties {
  return {
    connectorType: item["connectorType"],
    connectorSubType: item["connectorSubType"],
    clusterUrl: item["clusterUrl"],
    database: item["database"],
    tableNames: item["tableNames"],
    authentication: authenticationUnionDeserializer(item["authentication"]),
  };
}

/** Configuration for AzureServiceBusSourceConnector */
export interface AzureServiceBusSourceConnectorProperties
  extends DataSourceProperties {
  /** Type of AzureServiceBusSource */
  connectorType: "AzureServiceBusSource";
  /** Name for topic Or Queue. */
  topicOrQueueName: string;
  /** Gets or sets the connection string for the Azure Servicebus instance. */
  connectionString: string;
  /** Name for subscription. */
  subscriptionName?: string;
  /** AzureServiceBusSource type. */
  serviceBusType: AzureServiceBusType;
}

export function azureServiceBusSourceConnectorPropertiesSerializer(
  item: AzureServiceBusSourceConnectorProperties,
): any {
  return {
    connectorType: item["connectorType"],
    connectorSubType: item["connectorSubType"],
    topicOrQueueName: item["topicOrQueueName"],
    connectionString: item["connectionString"],
    subscriptionName: item["subscriptionName"],
    serviceBusType: item["serviceBusType"],
  };
}

export function azureServiceBusSourceConnectorPropertiesDeserializer(
  item: any,
): AzureServiceBusSourceConnectorProperties {
  return {
    connectorType: item["connectorType"],
    connectorSubType: item["connectorSubType"],
    topicOrQueueName: item["topicOrQueueName"],
    connectionString: item["connectionString"],
    subscriptionName: item["subscriptionName"],
    serviceBusType: item["serviceBusType"],
  };
}

/** Type of AzureServiceBusType */
export enum KnownAzureServiceBusType {
  /** Queue type */
  Queue = "Queue",
  /** Topic type */
  Topic = "Topic",
}

/**
 * Type of AzureServiceBusType \
 * {@link KnownAzureServiceBusType} can be used interchangeably with AzureServiceBusType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Queue**: Queue type \
 * **Topic**: Topic type
 */
export type AzureServiceBusType = string;

/** Configuration for ConfluentSourceConnector */
export interface ConfluentSourceConnectorProperties
  extends DataSourceProperties {
  /** Type of ConfluentSourceConnector */
  connectorType: "ConfluentSource";
  /** bootstrapServers of the Confluent server. */
  bootstrapServers: string;
  /** Topic of the Confluent. */
  topic: string;
  /** ConsumerGroup of the Confluent. */
  consumerGroup: string;
  /** What to do when there is no initial offset in ZooKeeper or if an offset is out of range. */
  autoOffsetReset: ConfluentAutoOffsetReset;
  /** UserName+Password Or OAuth for Confluent. */
  authentication: AuthenticationUnion;
  /** Security protocol of the confluent. */
  securityProtocol?: ConfluentSecurityProtocol;
  /** Sasl mechanism of the confluent. */
  saslMechanism?: ConfluentSaslMechanism;
  /** OffsetStartTime in utcDateTime zone. */
  offsetStartTime?: Date;
}

export function confluentSourceConnectorPropertiesSerializer(
  item: ConfluentSourceConnectorProperties,
): any {
  return {
    connectorType: item["connectorType"],
    connectorSubType: item["connectorSubType"],
    bootstrapServers: item["bootstrapServers"],
    topic: item["topic"],
    consumerGroup: item["consumerGroup"],
    autoOffsetReset: item["autoOffsetReset"],
    authentication: authenticationUnionSerializer(item["authentication"]),
    securityProtocol: item["securityProtocol"],
    saslMechanism: item["saslMechanism"],
    offsetStartTime: !item["offsetStartTime"]
      ? item["offsetStartTime"]
      : item["offsetStartTime"].toISOString(),
  };
}

export function confluentSourceConnectorPropertiesDeserializer(
  item: any,
): ConfluentSourceConnectorProperties {
  return {
    connectorType: item["connectorType"],
    connectorSubType: item["connectorSubType"],
    bootstrapServers: item["bootstrapServers"],
    topic: item["topic"],
    consumerGroup: item["consumerGroup"],
    autoOffsetReset: item["autoOffsetReset"],
    authentication: authenticationUnionDeserializer(item["authentication"]),
    securityProtocol: item["securityProtocol"],
    saslMechanism: item["saslMechanism"],
    offsetStartTime: !item["offsetStartTime"]
      ? item["offsetStartTime"]
      : new Date(item["offsetStartTime"]),
  };
}

/** What to do when there is no initial offset in ZooKeeper or if an offset is out of range. */
export enum KnownConfluentAutoOffsetReset {
  /** Automatically reset the offset to the latest offset. */
  Latest = "Latest",
  /** Automatically reset the offset to the earliest offset. */
  Earliest = "Earliest",
  /** None reset. */
  None = "None",
}

/**
 * What to do when there is no initial offset in ZooKeeper or if an offset is out of range. \
 * {@link KnownConfluentAutoOffsetReset} can be used interchangeably with ConfluentAutoOffsetReset,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Latest**: Automatically reset the offset to the latest offset. \
 * **Earliest**: Automatically reset the offset to the earliest offset. \
 * **None**: None reset.
 */
export type ConfluentAutoOffsetReset = string;

/** Enum of the SecurityProtocol for Confluent connector */
export enum KnownConfluentSecurityProtocol {
  /** The SASL_PLAINTEXT security protocol. */
  SaslPlaintext = "SASL_PLAINTEXT",
  /** The PLAINTEXT security protocol. */
  Plaintext = "PLAINTEXT",
  /** The SASL_SSL security protocol. */
  SaslSsl = "SASL_SSL",
  /** The SSL security protocol. */
  Ssl = "SSL",
}

/**
 * Enum of the SecurityProtocol for Confluent connector \
 * {@link KnownConfluentSecurityProtocol} can be used interchangeably with ConfluentSecurityProtocol,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SASL_PLAINTEXT**: The SASL_PLAINTEXT security protocol. \
 * **PLAINTEXT**: The PLAINTEXT security protocol. \
 * **SASL_SSL**: The SASL_SSL security protocol. \
 * **SSL**: The SSL security protocol.
 */
export type ConfluentSecurityProtocol = string;

/** Enum of the SaslMechanism for Confluent connector */
export enum KnownConfluentSaslMechanism {
  /** The PLAIN sasl mechanism. */
  Plain = "PLAIN",
  /** The SCRAM-SHA-256 sasl mechanism. */
  ScramSha256 = "SCRAM-SHA-256",
  /** The SCRAM-SHA-512 sasl mechanism. */
  ScramSha512 = "SCRAM-SHA-512",
}

/**
 * Enum of the SaslMechanism for Confluent connector \
 * {@link KnownConfluentSaslMechanism} can be used interchangeably with ConfluentSaslMechanism,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PLAIN**: The PLAIN sasl mechanism. \
 * **SCRAM-SHA-256**: The SCRAM-SHA-256 sasl mechanism. \
 * **SCRAM-SHA-512**: The SCRAM-SHA-512 sasl mechanism.
 */
export type ConfluentSaslMechanism = string;

/** Configuration for CosmosDbSourceConnector */
export interface CosmosDbSourceConnectorProperties
  extends DataSourceProperties {
  /** Type of CosmosDbSourceConnector */
  connectorType: "CosmosDbSource";
  /** PollIntervalInMs policy. */
  pollIntervalInMs: number;
  /** Endpoint of CosmosDB. */
  cosmosEndpoint: string;
  /** DatabaseName for CosmosDB server. */
  databaseName: string;
  /** Container for CosmosDB server. */
  container: string;
  /** masterKey for CosmosDB server. */
  masterKey: string;
  /** useLatestOffset policy */
  offsetPolicy: CosmosDbOffsetPolicy;
}

export function cosmosDbSourceConnectorPropertiesSerializer(
  item: CosmosDbSourceConnectorProperties,
): any {
  return {
    connectorType: item["connectorType"],
    connectorSubType: item["connectorSubType"],
    pollIntervalInMs: item["pollIntervalInMs"],
    cosmosEndpoint: item["cosmosEndpoint"],
    databaseName: item["databaseName"],
    container: item["container"],
    masterKey: item["masterKey"],
    offsetPolicy: item["offsetPolicy"],
  };
}

export function cosmosDbSourceConnectorPropertiesDeserializer(
  item: any,
): CosmosDbSourceConnectorProperties {
  return {
    connectorType: item["connectorType"],
    connectorSubType: item["connectorSubType"],
    pollIntervalInMs: item["pollIntervalInMs"],
    cosmosEndpoint: item["cosmosEndpoint"],
    databaseName: item["databaseName"],
    container: item["container"],
    masterKey: item["masterKey"],
    offsetPolicy: item["offsetPolicy"],
  };
}

/** Enum of the OffsetPolicy for CosmosDB connector */
export enum KnownCosmosDbOffsetPolicy {
  /** use the latest (most recent) source offset */
  UseLatestSourceOffset = "UseLatestSourceOffset",
  /** use the earliest recorded offset */
  UseEarliestRecordedOffset = "UseEarliestRecordedOffset",
}

/**
 * Enum of the OffsetPolicy for CosmosDB connector \
 * {@link KnownCosmosDbOffsetPolicy} can be used interchangeably with CosmosDbOffsetPolicy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **UseLatestSourceOffset**: use the latest (most recent) source offset \
 * **UseEarliestRecordedOffset**: use the earliest recorded offset
 */
export type CosmosDbOffsetPolicy = string;

/** Configuration for GooglePubSubSourceConnector */
export interface GooglePubSubSourceConnectorProperties
  extends DataSourceProperties {
  /** Type of GooglePubSubSourceConnector */
  connectorType: "GooglePubSubSource";
  /** Google Cloud project ID where the Pub/Sub instance resides, assigned by GCP. */
  projectId: string;
  /** Google Cloud subscription name where the Pub/Sub instance resides. */
  subscriptionName: string;
  /** Google Cloud account key, assigned by GCP. */
  accountKey: string;
}

export function googlePubSubSourceConnectorPropertiesSerializer(
  item: GooglePubSubSourceConnectorProperties,
): any {
  return {
    connectorType: item["connectorType"],
    connectorSubType: item["connectorSubType"],
    projectId: item["projectId"],
    subscriptionName: item["subscriptionName"],
    accountKey: item["accountKey"],
  };
}

export function googlePubSubSourceConnectorPropertiesDeserializer(
  item: any,
): GooglePubSubSourceConnectorProperties {
  return {
    connectorType: item["connectorType"],
    connectorSubType: item["connectorSubType"],
    projectId: item["projectId"],
    subscriptionName: item["subscriptionName"],
    accountKey: item["accountKey"],
  };
}

/** Configuration for HanaDatabaseSourceConnector */
export interface HanaDatabaseSourceConnectorProperties
  extends DataSourceProperties {
  /** Type of HanaDatabaseSourceConnector */
  connectorType: "HanaDatabaseSource";
  /** HANA JDBC connection URI, e.g. jdbc:sap://127.0.0.1:30015. */
  connectionUrl: string;
  /** HANA JDBC connection username. */
  userName: string;
  /** HANA JDBC connection password. */
  password: string;
  /** HANA schema to source data from. */
  schema?: string;
  /** The mode in which data should be fetched from SAP DB table. Default is bulk. And supported values are bulk, incrementing. */
  mode?: HanaMode;
  /** In order to fetch data from a SAP DB table when mode is set to incrementing, an incremental (or auto-incremental) column needs to be provided. */
  incrementingColumn?: string;
  /** The query mode in which data should be fetched from SAP DB table. */
  queryMode?: HanaQueryMode;
  /** the SAP DB table name where the data needs to be read from. */
  table?: string;
  /** The query statement when queryMode is set to query. */
  query?: string;
  /** Max rows to include in a single batch call. Should be an integer. */
  batch?: number;
  /** The poll interval at which the data should be fetched from SAP DB table, the default value in server end is 60000 with millisecond unit. */
  interval?: number;
  /** The number of topic partitions that the Source connector can use to publish the data. */
  partitions?: number;
  /** Whether the DECIMAL column types are mapped to the default decimal type or one of the primitive types. */
  numericMapping?: HanaNumericMapping;
}

export function hanaDatabaseSourceConnectorPropertiesSerializer(
  item: HanaDatabaseSourceConnectorProperties,
): any {
  return {
    connectorType: item["connectorType"],
    connectorSubType: item["connectorSubType"],
    connectionUrl: item["connectionUrl"],
    userName: item["userName"],
    password: item["password"],
    schema: item["schema"],
    mode: item["mode"],
    incrementingColumn: item["incrementingColumn"],
    queryMode: item["queryMode"],
    table: item["table"],
    query: item["query"],
    batch: item["batch"],
    interval: item["interval"],
    partitions: item["partitions"],
    numericMapping: item["numericMapping"],
  };
}

export function hanaDatabaseSourceConnectorPropertiesDeserializer(
  item: any,
): HanaDatabaseSourceConnectorProperties {
  return {
    connectorType: item["connectorType"],
    connectorSubType: item["connectorSubType"],
    connectionUrl: item["connectionUrl"],
    userName: item["userName"],
    password: item["password"],
    schema: item["schema"],
    mode: item["mode"],
    incrementingColumn: item["incrementingColumn"],
    queryMode: item["queryMode"],
    table: item["table"],
    query: item["query"],
    batch: item["batch"],
    interval: item["interval"],
    partitions: item["partitions"],
    numericMapping: item["numericMapping"],
  };
}

/** Specify the mode in which data should be fetched from SAP DB table */
export enum KnownHanaMode {
  /** Bulk mode to fetch from SAP table. */
  Bulk = "Bulk",
  /** Incrementing mode to fetch from SAP table. */
  Incrementing = "Incrementing",
}

/**
 * Specify the mode in which data should be fetched from SAP DB table \
 * {@link KnownHanaMode} can be used interchangeably with HanaMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Bulk**: Bulk mode to fetch from SAP table. \
 * **Incrementing**: Incrementing mode to fetch from SAP table.
 */
export type HanaMode = string;

/** Specify the query mode in which data should be fetched from SAP DB table */
export enum KnownHanaQueryMode {
  /** Query HANA by Schema and Table. */
  Table = "Table",
  /** Query HANA by specific SQL query. */
  Query = "Query",
}

/**
 * Specify the query mode in which data should be fetched from SAP DB table \
 * {@link KnownHanaQueryMode} can be used interchangeably with HanaQueryMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Table**: Query HANA by Schema and Table. \
 * **Query**: Query HANA by specific SQL query.
 */
export type HanaQueryMode = string;

/** Control whether the DECIMAL column types are mapped to the default decimal type or one of the primitive types. */
export enum KnownHanaNumericMapping {
  /** HanaNumericMapping of none. */
  None = "None",
  /** HanaNumericMapping of best_fit. */
  BestFit = "BestFit",
  /** HanaNumericMapping of best_fit_eager_double. */
  BestFitEagerDouble = "BestFitEagerDouble",
}

/**
 * Control whether the DECIMAL column types are mapped to the default decimal type or one of the primitive types. \
 * {@link KnownHanaNumericMapping} can be used interchangeably with HanaNumericMapping,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: HanaNumericMapping of none. \
 * **BestFit**: HanaNumericMapping of best_fit. \
 * **BestFitEagerDouble**: HanaNumericMapping of best_fit_eager_double.
 */
export type HanaNumericMapping = string;

/** Configuration for KinesisSourceConnector */
export interface KinesisSourceConnectorProperties extends DataSourceProperties {
  /** Type of KinesisSourceConnector */
  connectorType: "KinesisSource";
  /** AccessKeyId for AWS Kinesis Server. */
  awsAccessKeyId: string;
  /** SecretAccessKey for AWS Kinesis Server. */
  awsSecretAccessKey: string;
  /** Region of AWS Kinesis Server. */
  awsKinesisRegion: string;
  /** StreamName in AWS Kinesis Server. */
  awsKinesisStreamName: string;
  /** startPosition supported by Kinesis. */
  startPosition: KinesisStartPositionType;
  /** startSequence for startPosition. */
  startSequence?: string;
  /** startTime for startPosition. */
  startTime?: Date;
}

export function kinesisSourceConnectorPropertiesSerializer(
  item: KinesisSourceConnectorProperties,
): any {
  return {
    connectorType: item["connectorType"],
    connectorSubType: item["connectorSubType"],
    awsAccessKeyId: item["awsAccessKeyId"],
    awsSecretAccessKey: item["awsSecretAccessKey"],
    awsKinesisRegion: item["awsKinesisRegion"],
    awsKinesisStreamName: item["awsKinesisStreamName"],
    startPosition: item["startPosition"],
    startSequence: item["startSequence"],
    startTime: !item["startTime"]
      ? item["startTime"]
      : item["startTime"].toISOString(),
  };
}

export function kinesisSourceConnectorPropertiesDeserializer(
  item: any,
): KinesisSourceConnectorProperties {
  return {
    connectorType: item["connectorType"],
    connectorSubType: item["connectorSubType"],
    awsAccessKeyId: item["awsAccessKeyId"],
    awsSecretAccessKey: item["awsSecretAccessKey"],
    awsKinesisRegion: item["awsKinesisRegion"],
    awsKinesisStreamName: item["awsKinesisStreamName"],
    startPosition: item["startPosition"],
    startSequence: item["startSequence"],
    startTime: !item["startTime"]
      ? item["startTime"]
      : new Date(item["startTime"]),
  };
}

/** StartPosition types for Kinesis, https://docs.aws.amazon.com/kinesis/latest/APIReference/API_StartingPosition.html */
export enum KnownKinesisStartPositionType {
  /** TrimHorizon type */
  TrimHorizon = "TrimHorizon",
  /** Latest type */
  Latest = "Latest",
  /** AtSequenceNumber type */
  AtSequenceNumber = "AtSequenceNumber",
  /** AfterSequenceNumber type */
  AfterSequenceNumber = "AfterSequenceNumber",
  /** AtTimestamp type */
  AtTimestamp = "AtTimestamp",
}

/**
 * StartPosition types for Kinesis, https://docs.aws.amazon.com/kinesis/latest/APIReference/API_StartingPosition.html \
 * {@link KnownKinesisStartPositionType} can be used interchangeably with KinesisStartPositionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **TrimHorizon**: TrimHorizon type \
 * **Latest**: Latest type \
 * **AtSequenceNumber**: AtSequenceNumber type \
 * **AfterSequenceNumber**: AfterSequenceNumber type \
 * **AtTimestamp**: AtTimestamp type
 */
export type KinesisStartPositionType = string;

/** Configuration for MqttSourceConnector */
export interface MqttSourceConnectorProperties extends DataSourceProperties {
  /** Type of MqttSourceConnector */
  connectorType: "MqttSource";
  /** Mqtt server version. */
  serverVersion: MqttVersion;
  /** Topic to subscribe to. */
  topic: string;
  /** URL of the broker where to establish the connection. */
  brokerUrl: string;
  /** Username to use when connecting to the Mqtt v5 compliant broker. */
  username?: string;
  /** Password to use when connecting to the Mqtt v5 compliant broker. */
  password?: string;
}

export function mqttSourceConnectorPropertiesSerializer(
  item: MqttSourceConnectorProperties,
): any {
  return {
    connectorType: item["connectorType"],
    connectorSubType: item["connectorSubType"],
    serverVersion: item["serverVersion"],
    topic: item["topic"],
    brokerUrl: item["brokerUrl"],
    username: item["username"],
    password: item["password"],
  };
}

export function mqttSourceConnectorPropertiesDeserializer(
  item: any,
): MqttSourceConnectorProperties {
  return {
    connectorType: item["connectorType"],
    connectorSubType: item["connectorSubType"],
    serverVersion: item["serverVersion"],
    topic: item["topic"],
    brokerUrl: item["brokerUrl"],
    username: item["username"],
    password: item["password"],
  };
}

/** Version for Mqtt server */
export enum KnownMqttVersion {
  /** Mqtt v5 */
  V5 = "V5",
  /** Mqtt v3 and below */
  V3AndBelow = "V3AndBelow",
}

/**
 * Version for Mqtt server \
 * {@link KnownMqttVersion} can be used interchangeably with MqttVersion,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **V5**: Mqtt v5 \
 * **V3AndBelow**: Mqtt v3 and below
 */
export type MqttVersion = string;

/** Configuration for MySqlSourceConnector */
export interface MySqlSourceConnectorProperties extends DataSourceProperties {
  /** Type of MySqlSourceConnector */
  connectorType: "MySqlSource";
  /** HostName for MySql. */
  hostName: string;
  /** Port for MySql. */
  port: number;
  /** DatabaseName for MySql. */
  databaseName: string;
  /** Username for MySql. */
  username: string;
  /** Password for MySql. */
  password: string;
  /** Server id for MySql. */
  serverId: number;
  /** Tables used as source. */
  tableNames: string;
  /** Snapshot Locking Mode. */
  snapshotLockingMode?: MySqlSnapshotLockingMode;
  /** Tables used as source. */
  tableIncludeList?: string;
  /** Tables to be excluded. */
  tableExcludeList?: string;
  /** Columns to be included. */
  columnIncludeList?: string;
  /** Columns to be excluded. */
  columnExcludeList?: string;
  /** Handling mode for DECIMAL and NUMERIC. */
  decimalHandlingMode?: MySqlDecimalHandlingMode;
  /** Select table rows to include in the snapshot. */
  snapshotSelectStatementOverrides?: MySqlSnapshotSelectStatementOverrideItem[];
  /** Operation types to be skipped. */
  skippedOperations?: MySqlSkippedOperationsMode[];
  /** Specifies the criteria for running a snapshot when the connector starts. */
  snapshotMode?: MySqlSnapshotMode;
}

export function mySqlSourceConnectorPropertiesSerializer(
  item: MySqlSourceConnectorProperties,
): any {
  return {
    connectorType: item["connectorType"],
    connectorSubType: item["connectorSubType"],
    hostName: item["hostName"],
    port: item["port"],
    databaseName: item["databaseName"],
    username: item["username"],
    password: item["password"],
    serverId: item["serverId"],
    tableNames: item["tableNames"],
    snapshotLockingMode: item["snapshotLockingMode"],
    tableIncludeList: item["tableIncludeList"],
    tableExcludeList: item["tableExcludeList"],
    columnIncludeList: item["columnIncludeList"],
    columnExcludeList: item["columnExcludeList"],
    decimalHandlingMode: item["decimalHandlingMode"],
    snapshotSelectStatementOverrides: !item["snapshotSelectStatementOverrides"]
      ? item["snapshotSelectStatementOverrides"]
      : mySqlSnapshotSelectStatementOverrideItemArraySerializer(
          item["snapshotSelectStatementOverrides"],
        ),
    skippedOperations: !item["skippedOperations"]
      ? item["skippedOperations"]
      : item["skippedOperations"].map((p: any) => {
          return p;
        }),
    snapshotMode: item["snapshotMode"],
  };
}

export function mySqlSourceConnectorPropertiesDeserializer(
  item: any,
): MySqlSourceConnectorProperties {
  return {
    connectorType: item["connectorType"],
    connectorSubType: item["connectorSubType"],
    hostName: item["hostName"],
    port: item["port"],
    databaseName: item["databaseName"],
    username: item["username"],
    password: item["password"],
    serverId: item["serverId"],
    tableNames: item["tableNames"],
    snapshotLockingMode: item["snapshotLockingMode"],
    tableIncludeList: item["tableIncludeList"],
    tableExcludeList: item["tableExcludeList"],
    columnIncludeList: item["columnIncludeList"],
    columnExcludeList: item["columnExcludeList"],
    decimalHandlingMode: item["decimalHandlingMode"],
    snapshotSelectStatementOverrides: !item["snapshotSelectStatementOverrides"]
      ? item["snapshotSelectStatementOverrides"]
      : mySqlSnapshotSelectStatementOverrideItemArrayDeserializer(
          item["snapshotSelectStatementOverrides"],
        ),
    skippedOperations: !item["skippedOperations"]
      ? item["skippedOperations"]
      : item["skippedOperations"].map((p: any) => {
          return p;
        }),
    snapshotMode: item["snapshotMode"],
  };
}

/** Type of SnapshotLockingMode */
export enum KnownMySqlSnapshotLockingMode {
  /** None type */
  None = "None",
  /** Minimal type */
  Minimal = "Minimal",
  /** Extended type */
  Extended = "Extended",
}

/**
 * Type of SnapshotLockingMode \
 * {@link KnownMySqlSnapshotLockingMode} can be used interchangeably with MySqlSnapshotLockingMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: None type \
 * **Minimal**: Minimal type \
 * **Extended**: Extended type
 */
export type MySqlSnapshotLockingMode = string;

/** Enum DecimalHandlingMode for mysql */
export enum KnownMySqlDecimalHandlingMode {
  /** The Precise mode. */
  PreciseMode = "Precise",
  /** The Double mode. */
  DoubleMode = "Double",
  /** The String mode. */
  StringMode = "String",
}

/**
 * Enum DecimalHandlingMode for mysql \
 * {@link KnownMySqlDecimalHandlingMode} can be used interchangeably with MySqlDecimalHandlingMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Precise**: The Precise mode. \
 * **Double**: The Double mode. \
 * **String**: The String mode.
 */
export type MySqlDecimalHandlingMode = string;

export function mySqlSnapshotSelectStatementOverrideItemArraySerializer(
  result: Array<MySqlSnapshotSelectStatementOverrideItem>,
): any[] {
  return result.map((item) => {
    return mySqlSnapshotSelectStatementOverrideItemSerializer(item);
  });
}

export function mySqlSnapshotSelectStatementOverrideItemArrayDeserializer(
  result: Array<MySqlSnapshotSelectStatementOverrideItem>,
): any[] {
  return result.map((item) => {
    return mySqlSnapshotSelectStatementOverrideItemDeserializer(item);
  });
}

/** SnapshotSelectStatementOverride Item */
export interface MySqlSnapshotSelectStatementOverrideItem {
  /** Table name */
  tableName: string;
  /** select statement */
  selectStatement: string;
}

export function mySqlSnapshotSelectStatementOverrideItemSerializer(
  item: MySqlSnapshotSelectStatementOverrideItem,
): any {
  return {
    tableName: item["tableName"],
    selectStatement: item["selectStatement"],
  };
}

export function mySqlSnapshotSelectStatementOverrideItemDeserializer(
  item: any,
): MySqlSnapshotSelectStatementOverrideItem {
  return {
    tableName: item["tableName"],
    selectStatement: item["selectStatement"],
  };
}

/** Enum SkippedOperationsMode for mysql */
export enum KnownMySqlSkippedOperationsMode {
  /** The InsertOrCreate mode. */
  InsertOrCreate = "InsertOrCreate",
  /** The Update mode. */
  Update = "Update",
  /** The Delete mode. */
  Delete = "Delete",
  /** The Truncate mode. */
  Truncate = "Truncate",
  /** The None mode. */
  None = "None",
}

/**
 * Enum SkippedOperationsMode for mysql \
 * {@link KnownMySqlSkippedOperationsMode} can be used interchangeably with MySqlSkippedOperationsMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **InsertOrCreate**: The InsertOrCreate mode. \
 * **Update**: The Update mode. \
 * **Delete**: The Delete mode. \
 * **Truncate**: The Truncate mode. \
 * **None**: The None mode.
 */
export type MySqlSkippedOperationsMode = string;

/** Specifies the criteria for running a snapshot when the connector starts */
export enum KnownMySqlSnapshotMode {
  /** The connector runs a snapshot only when no offsets have been recorded for the logical server name, or if it detects that an earlier snapshot failed to complete. After the snapshot completes, the connector begins to stream event records for subsequent database changes. */
  Initial = "Initial",
  /** The connector runs a snapshot only when no offsets have been recorded for the logical server name. After the snapshot completes, the connector stops. It does not transition to streaming to read change events from the binlog. */
  InitialOnly = "InitialOnly",
  /** The connector runs a snapshot that captures only the schema, but not any table data. Set this option if you do not need the topics to contain a consistent snapshot of the data, but you want to capture any schema changes that were applied after the last connector restart. */
  NoData = "NoData",
}

/**
 * Specifies the criteria for running a snapshot when the connector starts \
 * {@link KnownMySqlSnapshotMode} can be used interchangeably with MySqlSnapshotMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Initial**: The connector runs a snapshot only when no offsets have been recorded for the logical server name, or if it detects that an earlier snapshot failed to complete. After the snapshot completes, the connector begins to stream event records for subsequent database changes. \
 * **InitialOnly**: The connector runs a snapshot only when no offsets have been recorded for the logical server name. After the snapshot completes, the connector stops. It does not transition to streaming to read change events from the binlog. \
 * **NoData**: The connector runs a snapshot that captures only the schema, but not any table data. Set this option if you do not need the topics to contain a consistent snapshot of the data, but you want to capture any schema changes that were applied after the last connector restart.
 */
export type MySqlSnapshotMode = string;

/** Configuration for PostgreSqlSourceConnector */
export interface PostgreSqlSourceConnectorProperties
  extends DataSourceProperties {
  /** Type of PostgreSqlSourceConnector */
  connectorType: "PostgreSqlSource";
  /** HostName for PostgreSql Server. */
  hostName: string;
  /** Port for PostgreSql Server. */
  port: number;
  /** DatabaseName for PostgreSql Server. */
  databaseName: string;
  /** Username for PostgreSql Server. */
  username: string;
  /** Password for PostgreSql Server. */
  password: string;
  /** ReplicationSlotName for PostgreSql Server. */
  replicationSlotName: string;
  /** Tables used as source. */
  tableNames: string;
  /** Tables used as source. */
  tableIncludeList?: string;
  /** Tables to be excluded. */
  tableExcludeList?: string;
  /** Columns to be included. */
  columnIncludeList?: string;
  /** Columns to be excluded. */
  columnExcludeList?: string;
  /** Handling mode for DECIMAL and NUMERIC. */
  decimalHandlingMode?: PostgreSqlDecimalHandlingMode;
  /** Select table rows to include in the snapshot. */
  snapshotSelectStatementOverrides?: PostgreSqlSnapshotSelectStatementOverrideItem[];
  /** Publication creation mode. */
  publicationAutocreateMode?: PostgreSqlPublicationAutocreateMode;
  /** Operation types to be skipped. */
  skippedOperations?: PostgreSqlSkippedOperationsMode[];
  /** Publication Name of Postgre. */
  publicationName?: string;
  /** Specifies the criteria for running a snapshot when the connector starts. */
  snapshotMode?: PostgreSqlSnapshotMode;
  /** Whether to use an encrypted connection to the PostgreSQL server */
  sslmode?: PostgreSqlSslMode;
  /** Fully-qualified name of the data collection that is used to send signals to the connector. Use the following format to specify the collection name:schemaName.tableName */
  signalDataCollection?: string;
  /** Controls how frequently the connector sends heartbeat messages to a Kafka topic. The default behavior is that the connector does not send heartbeat messages. */
  heartbeatIntervalMs?: number;
  /** Specifies a query that the connector executes on the source database when the connector sends a heartbeat message. */
  heartbeatActionQuery?: string;
  /** Positive integer value that specifies the maximum size of each batch of events that the connector processes. */
  maxBatchSize?: number;
  /** Positive integer value that specifies the maximum number of records that the blocking queue can hold. */
  maxQueueSize?: number;
  /** Positive integer value that specifies the number of milliseconds the connector should wait for new change events to appear before it starts processing a batch of events. */
  pollIntervalMs?: number;
  /** Specifies whether the connector creates a failover slot. If you omit this setting, or if the primary server runs PostgreSQL 16 or earlier, the connector does not create a failover slot. */
  slotFailover?: boolean;
  /** Specifies how schema names should be adjusted for compatibility with the message converter used by the connector. */
  schemaNameAdjustmentMode?: PostgreSqlSchemaNameAdjustmentMode;
  /** Specifies how field names should be adjusted for compatibility with the message converter used by the connector. */
  fieldNameAdjustmentMode?: PostgreSqlFieldNameAdjustmentMode;
  /** Time, date, and timestamps can be represented with different kinds of precision. */
  timePrecisionMode?: PostgreSqlTimePrecisionMode;
}

export function postgreSqlSourceConnectorPropertiesSerializer(
  item: PostgreSqlSourceConnectorProperties,
): any {
  return {
    connectorType: item["connectorType"],
    connectorSubType: item["connectorSubType"],
    hostName: item["hostName"],
    port: item["port"],
    databaseName: item["databaseName"],
    username: item["username"],
    password: item["password"],
    replicationSlotName: item["replicationSlotName"],
    tableNames: item["tableNames"],
    tableIncludeList: item["tableIncludeList"],
    tableExcludeList: item["tableExcludeList"],
    columnIncludeList: item["columnIncludeList"],
    columnExcludeList: item["columnExcludeList"],
    decimalHandlingMode: item["decimalHandlingMode"],
    snapshotSelectStatementOverrides: !item["snapshotSelectStatementOverrides"]
      ? item["snapshotSelectStatementOverrides"]
      : postgreSqlSnapshotSelectStatementOverrideItemArraySerializer(
          item["snapshotSelectStatementOverrides"],
        ),
    publicationAutocreateMode: item["publicationAutocreateMode"],
    skippedOperations: !item["skippedOperations"]
      ? item["skippedOperations"]
      : item["skippedOperations"].map((p: any) => {
          return p;
        }),
    publicationName: item["publicationName"],
    snapshotMode: item["snapshotMode"],
    sslmode: item["sslmode"],
    signalDataCollection: item["signalDataCollection"],
    heartbeatIntervalMs: item["heartbeatIntervalMs"],
    heartbeatActionQuery: item["heartbeatActionQuery"],
    maxBatchSize: item["maxBatchSize"],
    maxQueueSize: item["maxQueueSize"],
    pollIntervalMs: item["pollIntervalMs"],
    slotFailover: item["slotFailover"],
    schemaNameAdjustmentMode: item["schemaNameAdjustmentMode"],
    fieldNameAdjustmentMode: item["fieldNameAdjustmentMode"],
    timePrecisionMode: item["timePrecisionMode"],
  };
}

export function postgreSqlSourceConnectorPropertiesDeserializer(
  item: any,
): PostgreSqlSourceConnectorProperties {
  return {
    connectorType: item["connectorType"],
    connectorSubType: item["connectorSubType"],
    hostName: item["hostName"],
    port: item["port"],
    databaseName: item["databaseName"],
    username: item["username"],
    password: item["password"],
    replicationSlotName: item["replicationSlotName"],
    tableNames: item["tableNames"],
    tableIncludeList: item["tableIncludeList"],
    tableExcludeList: item["tableExcludeList"],
    columnIncludeList: item["columnIncludeList"],
    columnExcludeList: item["columnExcludeList"],
    decimalHandlingMode: item["decimalHandlingMode"],
    snapshotSelectStatementOverrides: !item["snapshotSelectStatementOverrides"]
      ? item["snapshotSelectStatementOverrides"]
      : postgreSqlSnapshotSelectStatementOverrideItemArrayDeserializer(
          item["snapshotSelectStatementOverrides"],
        ),
    publicationAutocreateMode: item["publicationAutocreateMode"],
    skippedOperations: !item["skippedOperations"]
      ? item["skippedOperations"]
      : item["skippedOperations"].map((p: any) => {
          return p;
        }),
    publicationName: item["publicationName"],
    snapshotMode: item["snapshotMode"],
    sslmode: item["sslmode"],
    signalDataCollection: item["signalDataCollection"],
    heartbeatIntervalMs: item["heartbeatIntervalMs"],
    heartbeatActionQuery: item["heartbeatActionQuery"],
    maxBatchSize: item["maxBatchSize"],
    maxQueueSize: item["maxQueueSize"],
    pollIntervalMs: item["pollIntervalMs"],
    slotFailover: item["slotFailover"],
    schemaNameAdjustmentMode: item["schemaNameAdjustmentMode"],
    fieldNameAdjustmentMode: item["fieldNameAdjustmentMode"],
    timePrecisionMode: item["timePrecisionMode"],
  };
}

/** Enum DecimalHandlingMode for postgresql */
export enum KnownPostgreSqlDecimalHandlingMode {
  /** The Precise mode. */
  PreciseMode = "Precise",
  /** The Double mode. */
  DoubleMode = "Double",
  /** The String mode. */
  StringMode = "String",
}

/**
 * Enum DecimalHandlingMode for postgresql \
 * {@link KnownPostgreSqlDecimalHandlingMode} can be used interchangeably with PostgreSqlDecimalHandlingMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Precise**: The Precise mode. \
 * **Double**: The Double mode. \
 * **String**: The String mode.
 */
export type PostgreSqlDecimalHandlingMode = string;

export function postgreSqlSnapshotSelectStatementOverrideItemArraySerializer(
  result: Array<PostgreSqlSnapshotSelectStatementOverrideItem>,
): any[] {
  return result.map((item) => {
    return postgreSqlSnapshotSelectStatementOverrideItemSerializer(item);
  });
}

export function postgreSqlSnapshotSelectStatementOverrideItemArrayDeserializer(
  result: Array<PostgreSqlSnapshotSelectStatementOverrideItem>,
): any[] {
  return result.map((item) => {
    return postgreSqlSnapshotSelectStatementOverrideItemDeserializer(item);
  });
}

/** SnapshotSelectStatementOverride Item */
export interface PostgreSqlSnapshotSelectStatementOverrideItem {
  /** Table name */
  tableName: string;
  /** select statement */
  selectStatement: string;
}

export function postgreSqlSnapshotSelectStatementOverrideItemSerializer(
  item: PostgreSqlSnapshotSelectStatementOverrideItem,
): any {
  return {
    tableName: item["tableName"],
    selectStatement: item["selectStatement"],
  };
}

export function postgreSqlSnapshotSelectStatementOverrideItemDeserializer(
  item: any,
): PostgreSqlSnapshotSelectStatementOverrideItem {
  return {
    tableName: item["tableName"],
    selectStatement: item["selectStatement"],
  };
}

/** Type of PublicationAutocreateMode */
export enum KnownPostgreSqlPublicationAutocreateMode {
  /** The AllTables mode. */
  AllTables = "AllTables",
  /** The Disabled mode. */
  Disabled = "Disabled",
  /** The Filtered mode. */
  Filtered = "Filtered",
}

/**
 * Type of PublicationAutocreateMode \
 * {@link KnownPostgreSqlPublicationAutocreateMode} can be used interchangeably with PostgreSqlPublicationAutocreateMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AllTables**: The AllTables mode. \
 * **Disabled**: The Disabled mode. \
 * **Filtered**: The Filtered mode.
 */
export type PostgreSqlPublicationAutocreateMode = string;

/** Enum SkippedOperationsMode for postgresql */
export enum KnownPostgreSqlSkippedOperationsMode {
  /** The InsertOrCreate mode. */
  InsertOrCreate = "InsertOrCreate",
  /** The Update mode. */
  Update = "Update",
  /** The Delete mode. */
  Delete = "Delete",
  /** The Truncate mode. */
  Truncate = "Truncate",
  /** The None mode. */
  None = "None",
}

/**
 * Enum SkippedOperationsMode for postgresql \
 * {@link KnownPostgreSqlSkippedOperationsMode} can be used interchangeably with PostgreSqlSkippedOperationsMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **InsertOrCreate**: The InsertOrCreate mode. \
 * **Update**: The Update mode. \
 * **Delete**: The Delete mode. \
 * **Truncate**: The Truncate mode. \
 * **None**: The None mode.
 */
export type PostgreSqlSkippedOperationsMode = string;

/** Specifies the criteria for running a snapshot when the connector starts */
export enum KnownPostgreSqlSnapshotMode {
  /** The connector performs a snapshot only when no offsets have been recorded for the logical server name. */
  Initial = "Initial",
  /** The connector performs an initial snapshot and then stops, without processing any subsequent changes. */
  InitialOnly = "InitialOnly",
  /** The connector never performs snapshots. When a connector is configured this way, after it starts. */
  NoData = "NoData",
}

/**
 * Specifies the criteria for running a snapshot when the connector starts \
 * {@link KnownPostgreSqlSnapshotMode} can be used interchangeably with PostgreSqlSnapshotMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Initial**: The connector performs a snapshot only when no offsets have been recorded for the logical server name. \
 * **InitialOnly**: The connector performs an initial snapshot and then stops, without processing any subsequent changes. \
 * **NoData**: The connector never performs snapshots. When a connector is configured this way, after it starts.
 */
export type PostgreSqlSnapshotMode = string;

/** Specifies the criteria for running a snapshot when the connector starts */
export enum KnownPostgreSqlSslMode {
  /** Allow attempts to use an unencrypted connection first and, failing that, a secure (encrypted) connection. */
  Allow = "Allow",
  /** Prefer attempts to use a secure (encrypted) connection first and, failing that, an unencrypted connection. */
  Prefer = "Prefer",
  /** Require uses a secure (encrypted) connection, and fails if one cannot be established. */
  Require = "Require",
  /** Verify-ca behaves like require but also verifies the server TLS certificate against the configured Certificate Authority (CA) certificates, or fails if no valid matching CA certificates are found. */
  VerifyCa = "VerifyCa",
  /** Verify-full behaves like verify-ca but also verifies that the server certificate matches the host to which the connector is trying to connect. */
  VerifyFull = "VerifyFull",
}

/**
 * Specifies the criteria for running a snapshot when the connector starts \
 * {@link KnownPostgreSqlSslMode} can be used interchangeably with PostgreSqlSslMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Allow**: Allow attempts to use an unencrypted connection first and, failing that, a secure (encrypted) connection. \
 * **Prefer**: Prefer attempts to use a secure (encrypted) connection first and, failing that, an unencrypted connection. \
 * **Require**: Require uses a secure (encrypted) connection, and fails if one cannot be established. \
 * **VerifyCa**: Verify-ca behaves like require but also verifies the server TLS certificate against the configured Certificate Authority (CA) certificates, or fails if no valid matching CA certificates are found. \
 * **VerifyFull**: Verify-full behaves like verify-ca but also verifies that the server certificate matches the host to which the connector is trying to connect.
 */
export type PostgreSqlSslMode = string;

/** Specifies how schema names should be adjusted for compatibility with the message converter used by the connector */
export enum KnownPostgreSqlSchemaNameAdjustmentMode {
  /** Does not apply any adjustment. */
  None = "None",
  /** Replaces the characters that cannot be used in the Avro type name with underscore. */
  Avro = "Avro",
  /** Replaces the underscore or characters that cannot be used in the Avro type name with corresponding Unicode characters. */
  AvroUnicode = "AvroUnicode",
}

/**
 * Specifies how schema names should be adjusted for compatibility with the message converter used by the connector \
 * {@link KnownPostgreSqlSchemaNameAdjustmentMode} can be used interchangeably with PostgreSqlSchemaNameAdjustmentMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: Does not apply any adjustment. \
 * **Avro**: Replaces the characters that cannot be used in the Avro type name with underscore. \
 * **AvroUnicode**: Replaces the underscore or characters that cannot be used in the Avro type name with corresponding Unicode characters.
 */
export type PostgreSqlSchemaNameAdjustmentMode = string;

/** Specifies how field names should be adjusted for compatibility with the message converter used by the connector. */
export enum KnownPostgreSqlFieldNameAdjustmentMode {
  /** Does not apply any adjustment. */
  None = "None",
  /** Replaces the characters that cannot be used in the Avro type name with underscore. */
  Avro = "Avro",
  /** Replaces the underscore or characters that cannot be used in the Avro type name with corresponding Unicode characters. */
  AvroUnicode = "AvroUnicode",
}

/**
 * Specifies how field names should be adjusted for compatibility with the message converter used by the connector. \
 * {@link KnownPostgreSqlFieldNameAdjustmentMode} can be used interchangeably with PostgreSqlFieldNameAdjustmentMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: Does not apply any adjustment. \
 * **Avro**: Replaces the characters that cannot be used in the Avro type name with underscore. \
 * **AvroUnicode**: Replaces the underscore or characters that cannot be used in the Avro type name with corresponding Unicode characters.
 */
export type PostgreSqlFieldNameAdjustmentMode = string;

/** Controls whether a tombstone event should be generated after a delete event */
export enum KnownPostgreSqlTimePrecisionMode {
  /** Captures the time and timestamp values exactly as in the database using either millisecond, microsecond, or nanosecond precision values based on the database column’s type. */
  Adaptive = "Adaptive",
  /** Captures the date, datetime and timestamp values exactly as in the database using either millisecond, microsecond, or nanosecond precision values based on the database column’s type. An exception is TIME type fields, which are always captured as microseconds. */
  AdaptiveTimeMicroseconds = "AdaptiveTimeMicroseconds",
  /** Always represents time and timestamp values by using Kafka Connect’s built-in representations for Time, Date, and Timestamp, which use millisecond precision regardless of the database columns' precision. */
  Connect = "Connect",
}

/**
 * Controls whether a tombstone event should be generated after a delete event \
 * {@link KnownPostgreSqlTimePrecisionMode} can be used interchangeably with PostgreSqlTimePrecisionMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Adaptive**: Captures the time and timestamp values exactly as in the database using either millisecond, microsecond, or nanosecond precision values based on the database column’s type. \
 * **AdaptiveTimeMicroseconds**: Captures the date, datetime and timestamp values exactly as in the database using either millisecond, microsecond, or nanosecond precision values based on the database column’s type. An exception is TIME type fields, which are always captured as microseconds. \
 * **Connect**: Always represents time and timestamp values by using Kafka Connect’s built-in representations for Time, Date, and Timestamp, which use millisecond precision regardless of the database columns' precision.
 */
export type PostgreSqlTimePrecisionMode = string;

/** Configuration for SqlServerSourceConnector */
export interface SqlServerSourceConnectorProperties
  extends DataSourceProperties {
  /** Type of SqlServerSourceConnector */
  connectorType: "SqlServerSource";
  /** HostName for SqlServer. */
  hostName: string;
  /** Port for SqlServer. */
  port: number;
  /** DatabaseName for SqlServer. */
  databaseName: string;
  /** Username for SqlServer. */
  username: string;
  /** Password for SqlServer. */
  password: string;
  /** Tables used as source. */
  tableNames: string;
  /** Tables used as source. */
  tableIncludeList?: string;
  /** Tables to be excluded. */
  tableExcludeList?: string;
  /** Columns to be included. */
  columnIncludeList?: string;
  /** Columns to be excluded. */
  columnExcludeList?: string;
  /** Handling mode for DECIMAL and NUMERIC. */
  decimalHandlingMode?: SqlServerDecimalHandlingMode;
  /** Select table rows to include in the snapshot. */
  snapshotSelectStatementOverrides?: SqlServerSnapshotSelectStatementOverrideItem[];
  /** Operation types to be skipped. */
  skippedOperations?: SqlServerSkippedOperationsMode[];
  /** Whether read replica only. */
  isReadOnlyReplica?: boolean;
  /** Specifies the criteria for running a snapshot when the connector starts. */
  snapshotMode?: SqlServerSnapshotMode;
}

export function sqlServerSourceConnectorPropertiesSerializer(
  item: SqlServerSourceConnectorProperties,
): any {
  return {
    connectorType: item["connectorType"],
    connectorSubType: item["connectorSubType"],
    hostName: item["hostName"],
    port: item["port"],
    databaseName: item["databaseName"],
    username: item["username"],
    password: item["password"],
    tableNames: item["tableNames"],
    tableIncludeList: item["tableIncludeList"],
    tableExcludeList: item["tableExcludeList"],
    columnIncludeList: item["columnIncludeList"],
    columnExcludeList: item["columnExcludeList"],
    decimalHandlingMode: item["decimalHandlingMode"],
    snapshotSelectStatementOverrides: !item["snapshotSelectStatementOverrides"]
      ? item["snapshotSelectStatementOverrides"]
      : sqlServerSnapshotSelectStatementOverrideItemArraySerializer(
          item["snapshotSelectStatementOverrides"],
        ),
    skippedOperations: !item["skippedOperations"]
      ? item["skippedOperations"]
      : item["skippedOperations"].map((p: any) => {
          return p;
        }),
    isReadOnlyReplica: item["isReadOnlyReplica"],
    snapshotMode: item["snapshotMode"],
  };
}

export function sqlServerSourceConnectorPropertiesDeserializer(
  item: any,
): SqlServerSourceConnectorProperties {
  return {
    connectorType: item["connectorType"],
    connectorSubType: item["connectorSubType"],
    hostName: item["hostName"],
    port: item["port"],
    databaseName: item["databaseName"],
    username: item["username"],
    password: item["password"],
    tableNames: item["tableNames"],
    tableIncludeList: item["tableIncludeList"],
    tableExcludeList: item["tableExcludeList"],
    columnIncludeList: item["columnIncludeList"],
    columnExcludeList: item["columnExcludeList"],
    decimalHandlingMode: item["decimalHandlingMode"],
    snapshotSelectStatementOverrides: !item["snapshotSelectStatementOverrides"]
      ? item["snapshotSelectStatementOverrides"]
      : sqlServerSnapshotSelectStatementOverrideItemArrayDeserializer(
          item["snapshotSelectStatementOverrides"],
        ),
    skippedOperations: !item["skippedOperations"]
      ? item["skippedOperations"]
      : item["skippedOperations"].map((p: any) => {
          return p;
        }),
    isReadOnlyReplica: item["isReadOnlyReplica"],
    snapshotMode: item["snapshotMode"],
  };
}

/** Enum DecimalHandlingMode for SqlServer */
export enum KnownSqlServerDecimalHandlingMode {
  /** The Precise mode. */
  PreciseMode = "Precise",
  /** The Double mode. */
  DoubleMode = "Double",
  /** The String mode. */
  StringMode = "String",
}

/**
 * Enum DecimalHandlingMode for SqlServer \
 * {@link KnownSqlServerDecimalHandlingMode} can be used interchangeably with SqlServerDecimalHandlingMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Precise**: The Precise mode. \
 * **Double**: The Double mode. \
 * **String**: The String mode.
 */
export type SqlServerDecimalHandlingMode = string;

export function sqlServerSnapshotSelectStatementOverrideItemArraySerializer(
  result: Array<SqlServerSnapshotSelectStatementOverrideItem>,
): any[] {
  return result.map((item) => {
    return sqlServerSnapshotSelectStatementOverrideItemSerializer(item);
  });
}

export function sqlServerSnapshotSelectStatementOverrideItemArrayDeserializer(
  result: Array<SqlServerSnapshotSelectStatementOverrideItem>,
): any[] {
  return result.map((item) => {
    return sqlServerSnapshotSelectStatementOverrideItemDeserializer(item);
  });
}

/** SnapshotSelectStatementOverride Item */
export interface SqlServerSnapshotSelectStatementOverrideItem {
  /** Table name */
  tableName: string;
  /** select statement */
  selectStatement: string;
}

export function sqlServerSnapshotSelectStatementOverrideItemSerializer(
  item: SqlServerSnapshotSelectStatementOverrideItem,
): any {
  return {
    tableName: item["tableName"],
    selectStatement: item["selectStatement"],
  };
}

export function sqlServerSnapshotSelectStatementOverrideItemDeserializer(
  item: any,
): SqlServerSnapshotSelectStatementOverrideItem {
  return {
    tableName: item["tableName"],
    selectStatement: item["selectStatement"],
  };
}

/** Enum SkippedOperationsMode for SqlServer */
export enum KnownSqlServerSkippedOperationsMode {
  /** The InsertOrCreate mode. */
  InsertOrCreate = "InsertOrCreate",
  /** The Update mode. */
  Update = "Update",
  /** The Delete mode. */
  Delete = "Delete",
  /** The Truncate mode. */
  Truncate = "Truncate",
  /** The None mode. */
  None = "None",
}

/**
 * Enum SkippedOperationsMode for SqlServer \
 * {@link KnownSqlServerSkippedOperationsMode} can be used interchangeably with SqlServerSkippedOperationsMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **InsertOrCreate**: The InsertOrCreate mode. \
 * **Update**: The Update mode. \
 * **Delete**: The Delete mode. \
 * **Truncate**: The Truncate mode. \
 * **None**: The None mode.
 */
export type SqlServerSkippedOperationsMode = string;

/** Specifies the criteria for running a snapshot when the connector starts */
export enum KnownSqlServerSnapshotMode {
  /** The connector performs a database snapshot as described in the default workflow for creating an initial snapshot. After the snapshot completes, the connector begins to stream event records for subsequent database changes. */
  Initial = "Initial",
  /** The connector performs a database snapshot and stops before streaming any change event records, not allowing any subsequent change events to be captured. */
  InitialOnly = "InitialOnly",
  /** The connector captures the structure of all relevant tables, performing all the steps described in the default snapshot workflow, except that it does not create READ events to represent the data set at the point of the connector’s start-up (Step 7.b). */
  NoData = "NoData",
}

/**
 * Specifies the criteria for running a snapshot when the connector starts \
 * {@link KnownSqlServerSnapshotMode} can be used interchangeably with SqlServerSnapshotMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Initial**: The connector performs a database snapshot as described in the default workflow for creating an initial snapshot. After the snapshot completes, the connector begins to stream event records for subsequent database changes. \
 * **InitialOnly**: The connector performs a database snapshot and stops before streaming any change event records, not allowing any subsequent change events to be captured. \
 * **NoData**: The connector captures the structure of all relevant tables, performing all the steps described in the default snapshot workflow, except that it does not create READ events to represent the data set at the point of the connector’s start-up (Step 7.b).
 */
export type SqlServerSnapshotMode = string;

/** Configuration for SolacePubsubSource */
export interface SolacePubsubSourceConnectorProperties
  extends DataSourceProperties {
  /** Type of SolacePubsubSourceConnector */
  connectorType: "SolacePubsubSource";
  /** Solace Pubsub+ connection URI, e.g. tcp://127.0.0.1:55555. */
  connectionUri: string;
  /** Solace Pubsub+ connection username. Note: Currently we support only username/password. expose TLS related, properties is we want to support client certificate authentication */
  userName: string;
  /** Solace Pubsub+ connection password. */
  password: string;
  /** Solace Pubsub+ message VPN name. */
  messageVpn: string;
  /** Comma separated list of PubSub+ topics to subscribe to. */
  solaceTopics?: string[];
  /** PubSub+ queue name to consume from, must exist on event broker. */
  solaceQueue?: string;
  /** PubSub+ Kafka Source connector message processor. PubSub+ Kafka Source connector message processor Refer to https://github.com/SolaceProducts/pubsubplus-connector-kafka-source */
  messageProcessor?: string;
  /** If enabled, maps/forwards the user properties Map from Solace message to Kafka record headers. */
  mapUserProperties?: boolean;
  /** If enabled, maps/forwards the Solace message standard properties (e.g. correlationId, applicationMessageId, redelivered, dmqEligible, COS etc) to Kafka record headers */
  mapSolaceProperties?: boolean;
  /** When using SolaceSampleKeyedMessageProcessor, defines which part of a PubSub+ message shall be converted to a Kafka record key */
  kafkaMessageKey?: string;
}

export function solacePubsubSourceConnectorPropertiesSerializer(
  item: SolacePubsubSourceConnectorProperties,
): any {
  return {
    connectorType: item["connectorType"],
    connectorSubType: item["connectorSubType"],
    connectionUri: item["connectionUri"],
    userName: item["userName"],
    password: item["password"],
    messageVpn: item["messageVpn"],
    solaceTopics: !item["solaceTopics"]
      ? item["solaceTopics"]
      : item["solaceTopics"].map((p: any) => {
          return p;
        }),
    solaceQueue: item["solaceQueue"],
    messageProcessor: item["messageProcessor"],
    mapUserProperties: item["mapUserProperties"],
    mapSolaceProperties: item["mapSolaceProperties"],
    kafkaMessageKey: item["kafkaMessageKey"],
  };
}

export function solacePubsubSourceConnectorPropertiesDeserializer(
  item: any,
): SolacePubsubSourceConnectorProperties {
  return {
    connectorType: item["connectorType"],
    connectorSubType: item["connectorSubType"],
    connectionUri: item["connectionUri"],
    userName: item["userName"],
    password: item["password"],
    messageVpn: item["messageVpn"],
    solaceTopics: !item["solaceTopics"]
      ? item["solaceTopics"]
      : item["solaceTopics"].map((p: any) => {
          return p;
        }),
    solaceQueue: item["solaceQueue"],
    messageProcessor: item["messageProcessor"],
    mapUserProperties: item["mapUserProperties"],
    mapSolaceProperties: item["mapSolaceProperties"],
    kafkaMessageKey: item["kafkaMessageKey"],
  };
}

/** Configuration for ManagedAzureMapsWeatherSourceConnector */
export interface ManagedAzureMapsWeatherSourceConnectorProperties
  extends DataSourceProperties {
  /** Type of ManagedAzureMapsWeatherSource */
  connectorType: "ManagedAzureMapsWeatherSource";
  /** Longitude of the location. */
  longitude: number;
  /** Latitude of the location. */
  latitude: number;
  /** Whether get the full details for the weather data. */
  details?: boolean;
  /** The language of the weather data. */
  language?: string;
  /** The data unit for the weather. */
  unit?: WeatherDataUnit;
  /** The polling interval in minutes. */
  pollIntervalInMinutes?: number;
}

export function managedAzureMapsWeatherSourceConnectorPropertiesSerializer(
  item: ManagedAzureMapsWeatherSourceConnectorProperties,
): any {
  return {
    connectorType: item["connectorType"],
    connectorSubType: item["connectorSubType"],
    longitude: item["longitude"],
    latitude: item["latitude"],
    details: item["details"],
    language: item["language"],
    unit: item["unit"],
    pollIntervalInMinutes: item["pollIntervalInMinutes"],
  };
}

export function managedAzureMapsWeatherSourceConnectorPropertiesDeserializer(
  item: any,
): ManagedAzureMapsWeatherSourceConnectorProperties {
  return {
    connectorType: item["connectorType"],
    connectorSubType: item["connectorSubType"],
    longitude: item["longitude"],
    latitude: item["latitude"],
    details: item["details"],
    language: item["language"],
    unit: item["unit"],
    pollIntervalInMinutes: item["pollIntervalInMinutes"],
  };
}

/** Type of weather data unit */
export enum KnownWeatherDataUnit {
  /** Metric data unit */
  Metric = "Metric",
  /** Imperial data unit */
  Imperial = "Imperial",
}

/**
 * Type of weather data unit \
 * {@link KnownWeatherDataUnit} can be used interchangeably with WeatherDataUnit,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Metric**: Metric data unit \
 * **Imperial**: Imperial data unit
 */
export type WeatherDataUnit = string;

/** Configuration for EventHubSourceConnector */
export interface EventHubSourceConnectorProperties
  extends DataSourceProperties {
  /** Type of EventHubSourceConnector */
  connectorType: "EventHubSource";
  /** namespace of the EventHub. */
  eventHubNamespaceHostname: string;
  /** Name of the EventHub. */
  eventHub: string;
  /** ConsumerGroup of the EventHub. */
  consumerGroup: string;
  /** The position of events in an Event Hub partition. */
  startEventPosition: EventHubEventPosition;
  /** Authentication for EventHub, OAuth or ConnectionString. */
  authentication: AuthenticationUnion;
  /** OffsetStartTime in utcDateTime zone. */
  offsetStartTime?: Date;
}

export function eventHubSourceConnectorPropertiesSerializer(
  item: EventHubSourceConnectorProperties,
): any {
  return {
    connectorType: item["connectorType"],
    connectorSubType: item["connectorSubType"],
    eventHubNamespaceHostname: item["eventHubNamespaceHostname"],
    eventHub: item["eventHub"],
    consumerGroup: item["consumerGroup"],
    startEventPosition: item["startEventPosition"],
    authentication: authenticationUnionSerializer(item["authentication"]),
    offsetStartTime: !item["offsetStartTime"]
      ? item["offsetStartTime"]
      : item["offsetStartTime"].toISOString(),
  };
}

export function eventHubSourceConnectorPropertiesDeserializer(
  item: any,
): EventHubSourceConnectorProperties {
  return {
    connectorType: item["connectorType"],
    connectorSubType: item["connectorSubType"],
    eventHubNamespaceHostname: item["eventHubNamespaceHostname"],
    eventHub: item["eventHub"],
    consumerGroup: item["consumerGroup"],
    startEventPosition: item["startEventPosition"],
    authentication: authenticationUnionDeserializer(item["authentication"]),
    offsetStartTime: !item["offsetStartTime"]
      ? item["offsetStartTime"]
      : new Date(item["offsetStartTime"]),
  };
}

/** The position of events in an Event Hub partition */
export enum KnownEventHubEventPosition {
  /** Corresponds to the first record of the partition. */
  Earliest = "Earliest",
  /** Corresponds to the end of the partition. */
  Latest = "Latest",
}

/**
 * The position of events in an Event Hub partition \
 * {@link KnownEventHubEventPosition} can be used interchangeably with EventHubEventPosition,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Earliest**: Corresponds to the first record of the partition. \
 * **Latest**: Corresponds to the end of the partition.
 */
export type EventHubEventPosition = string;

/** Configuration for DataverseSourceConnector */
export interface DataverseSourceConnectorProperties
  extends DataSourceProperties {
  /** Type of DataverseSourceConnector */
  connectorType: "DataverseSource";
  /** Namespace of the EventHub. */
  eventHubNamespaceHostname: string;
  /** Name of the EventHub. */
  eventHub: string;
  /** ConsumerGroup of the EventHub. */
  consumerGroup: string;
  /** The position of events in an Event Hub partition. */
  startEventPosition: DataverseEventPosition;
  /** Authentication for EventHub, OAuth or ConnectionString. */
  authentication: AuthenticationUnion;
  /** OffsetStartTime in utcDateTime zone. */
  offsetStartTime?: Date;
  /** List of post entity images */
  postEntityImages: string[];
}

export function dataverseSourceConnectorPropertiesSerializer(
  item: DataverseSourceConnectorProperties,
): any {
  return {
    connectorType: item["connectorType"],
    connectorSubType: item["connectorSubType"],
    eventHubNamespaceHostname: item["eventHubNamespaceHostname"],
    eventHub: item["eventHub"],
    consumerGroup: item["consumerGroup"],
    startEventPosition: item["startEventPosition"],
    authentication: authenticationUnionSerializer(item["authentication"]),
    offsetStartTime: !item["offsetStartTime"]
      ? item["offsetStartTime"]
      : item["offsetStartTime"].toISOString(),
    postEntityImages: item["postEntityImages"].map((p: any) => {
      return p;
    }),
  };
}

export function dataverseSourceConnectorPropertiesDeserializer(
  item: any,
): DataverseSourceConnectorProperties {
  return {
    connectorType: item["connectorType"],
    connectorSubType: item["connectorSubType"],
    eventHubNamespaceHostname: item["eventHubNamespaceHostname"],
    eventHub: item["eventHub"],
    consumerGroup: item["consumerGroup"],
    startEventPosition: item["startEventPosition"],
    authentication: authenticationUnionDeserializer(item["authentication"]),
    offsetStartTime: !item["offsetStartTime"]
      ? item["offsetStartTime"]
      : new Date(item["offsetStartTime"]),
    postEntityImages: item["postEntityImages"].map((p: any) => {
      return p;
    }),
  };
}

/** The position of events in an Event Hub partition */
export enum KnownDataverseEventPosition {
  /** Corresponds to the first record of the partition. */
  Earliest = "Earliest",
  /** Corresponds to the end of the partition. */
  Latest = "Latest",
}

/**
 * The position of events in an Event Hub partition \
 * {@link KnownDataverseEventPosition} can be used interchangeably with DataverseEventPosition,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Earliest**: Corresponds to the first record of the partition. \
 * **Latest**: Corresponds to the end of the partition.
 */
export type DataverseEventPosition = string;

/** Configuration for SampleDataSourceConnector */
export interface SampleDataSourceConnectorProperties
  extends DataSourceProperties {
  /** Type of SampleDataSourceConnector */
  connectorType: "SampleDataSource";
  /** Sample Data Type */
  type: SampleDataDataType;
}

export function sampleDataSourceConnectorPropertiesSerializer(
  item: SampleDataSourceConnectorProperties,
): any {
  return {
    connectorType: item["connectorType"],
    connectorSubType: item["connectorSubType"],
    type: item["type"],
  };
}

export function sampleDataSourceConnectorPropertiesDeserializer(
  item: any,
): SampleDataSourceConnectorProperties {
  return {
    connectorType: item["connectorType"],
    connectorSubType: item["connectorSubType"],
    type: item["type"],
  };
}

/** Sample Data Type */
export enum KnownSampleDataDataType {
  /** Bicycles data type */
  Bicycles = "Bicycles",
  /** Yellow Taxi  data type */
  YellowTaxi = "YellowTaxi",
  /** Stock Market  data type */
  StockMarket = "StockMarket",
  /** Buses data type */
  Buses = "Buses",
  /** SP500Stocks data type */
  SP500Stocks = "SP500Stocks",
  /** Semantic Model Logs data type */
  SemanticModelLogs = "SemanticModelLogs",
}

/**
 * Sample Data Type \
 * {@link KnownSampleDataDataType} can be used interchangeably with SampleDataDataType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Bicycles**: Bicycles data type \
 * **YellowTaxi**: Yellow Taxi  data type \
 * **StockMarket**: Stock Market  data type \
 * **Buses**: Buses data type \
 * **SP500Stocks**: SP500Stocks data type \
 * **SemanticModelLogs**: Semantic Model Logs data type
 */
export type SampleDataDataType = string;

/** Configuration for AzureBlobSourceConnector */
export interface AzureBlobSourceConnectorProperties
  extends DataSourceProperties {
  /** Type of AzureBlobSourceConnector */
  connectorType: "AzureBlobSource";
  /** The name of the storage account where the blob files are located */
  accountName: string;
  /** Authentication for AzureBlob */
  authentication: AuthenticationUnion;
  /** Container name */
  containerName: string;
  /** The path pattern to locate the files, default to * to poll all */
  pathPattern?: string;
  /** Compression type */
  compression?: AzureBlobCompression;
  /** the datetime to start processing files, files whose creation time earlier than this will be ignored */
  discoveryDateTime?: Date;
  /** Date format of {date} variable in path pattern */
  pathDateFormat?: string;
  /** Time format of {time} variable in path pattern, support only hours currently */
  pathTimeFormat?: string;
  /** For how many hours late that we still consider a file to be on time */
  outOfOrderHours?: number;
}

export function azureBlobSourceConnectorPropertiesSerializer(
  item: AzureBlobSourceConnectorProperties,
): any {
  return {
    connectorType: item["connectorType"],
    connectorSubType: item["connectorSubType"],
    accountName: item["accountName"],
    authentication: authenticationUnionSerializer(item["authentication"]),
    containerName: item["containerName"],
    pathPattern: item["pathPattern"],
    compression: item["compression"],
    discoveryDateTime: !item["discoveryDateTime"]
      ? item["discoveryDateTime"]
      : item["discoveryDateTime"].toISOString(),
    pathDateFormat: item["pathDateFormat"],
    pathTimeFormat: item["pathTimeFormat"],
    outOfOrderHours: item["outOfOrderHours"],
  };
}

export function azureBlobSourceConnectorPropertiesDeserializer(
  item: any,
): AzureBlobSourceConnectorProperties {
  return {
    connectorType: item["connectorType"],
    connectorSubType: item["connectorSubType"],
    accountName: item["accountName"],
    authentication: authenticationUnionDeserializer(item["authentication"]),
    containerName: item["containerName"],
    pathPattern: item["pathPattern"],
    compression: item["compression"],
    discoveryDateTime: !item["discoveryDateTime"]
      ? item["discoveryDateTime"]
      : new Date(item["discoveryDateTime"]),
    pathDateFormat: item["pathDateFormat"],
    pathTimeFormat: item["pathTimeFormat"],
    outOfOrderHours: item["outOfOrderHours"],
  };
}

/** Type of File Compression Mode */
export enum KnownAzureBlobCompression {
  /** Not Compressed */
  None = "None",
  /** Gzip Compression */
  Gzip = "Gzip",
}

/**
 * Type of File Compression Mode \
 * {@link KnownAzureBlobCompression} can be used interchangeably with AzureBlobCompression,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: Not Compressed \
 * **Gzip**: Gzip Compression
 */
export type AzureBlobCompression = string;

/** Configuration for OracleSourceConnector */
export interface OracleSourceConnectorProperties extends DataSourceProperties {
  /** Type of OracleSourceConnector */
  connectorType: "OracleSource";
  /** HostName for Oracle DB. */
  hostName: string;
  /** Port for Oracle DB. */
  port: number;
  /** DatabaseName for Oracle DB. */
  databaseName: string;
  /** Username for Oracle DB. */
  username: string;
  /** Password for Oracle DB. */
  password: string;
  /** The name of the Oracle pluggable database that the connector captures changes from. Used in container database (CDB) installations only. */
  databasePdbName?: string;
  /** Snapshot Locking Mode. */
  oracleSnapshotLockingMode?: OracleSnapshotLockingMode;
  /** Snapshot Mode. */
  oracleSnapshotMode?: OracleSnapshotMode;
  /** Tables used as source. */
  tableIncludeList?: string;
  /** Tables to be excluded. */
  tableExcludeList?: string;
  /** Columns to be included. */
  columnIncludeList?: string;
  /** Columns to be excluded. */
  columnExcludeList?: string;
  /** Handling mode for DECIMAL and NUMERIC. */
  oracleDecimalHandlingMode?: OracleDecimalHandlingMode;
}

export function oracleSourceConnectorPropertiesSerializer(
  item: OracleSourceConnectorProperties,
): any {
  return {
    connectorType: item["connectorType"],
    connectorSubType: item["connectorSubType"],
    hostName: item["hostName"],
    port: item["port"],
    databaseName: item["databaseName"],
    username: item["username"],
    password: item["password"],
    databasePdbName: item["databasePdbName"],
    oracleSnapshotLockingMode: item["oracleSnapshotLockingMode"],
    oracleSnapshotMode: item["oracleSnapshotMode"],
    tableIncludeList: item["tableIncludeList"],
    tableExcludeList: item["tableExcludeList"],
    columnIncludeList: item["columnIncludeList"],
    columnExcludeList: item["columnExcludeList"],
    oracleDecimalHandlingMode: item["oracleDecimalHandlingMode"],
  };
}

export function oracleSourceConnectorPropertiesDeserializer(
  item: any,
): OracleSourceConnectorProperties {
  return {
    connectorType: item["connectorType"],
    connectorSubType: item["connectorSubType"],
    hostName: item["hostName"],
    port: item["port"],
    databaseName: item["databaseName"],
    username: item["username"],
    password: item["password"],
    databasePdbName: item["databasePdbName"],
    oracleSnapshotLockingMode: item["oracleSnapshotLockingMode"],
    oracleSnapshotMode: item["oracleSnapshotMode"],
    tableIncludeList: item["tableIncludeList"],
    tableExcludeList: item["tableExcludeList"],
    columnIncludeList: item["columnIncludeList"],
    columnExcludeList: item["columnExcludeList"],
    oracleDecimalHandlingMode: item["oracleDecimalHandlingMode"],
  };
}

/** Type of SnapshotLockingMode */
export enum KnownOracleSnapshotLockingMode {
  /** None type */
  None = "None",
  /** Shared type */
  Shared = "Shared",
}

/**
 * Type of SnapshotLockingMode \
 * {@link KnownOracleSnapshotLockingMode} can be used interchangeably with OracleSnapshotLockingMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: None type \
 * **Shared**: Shared type
 */
export type OracleSnapshotLockingMode = string;

/** Type of SnapshotMode */
export enum KnownOracleSnapshotMode {
  /** When the connector starts, it performs an initial database snapshot. After the snapshot completes, the connector begins to stream event records for subsequent database changes. */
  Initial = "Initial",
  /** The connector performs a database a snapshot only when no offsets have been recorded for the logical server name. After the snapshot completes, the connector stops. It does not transition to streaming event records for subsequent database changes. */
  InitialOnly = "InitialOnly",
  /** The connector runs a snapshot that captures the structure of all relevant tables, but it does not create READ events to represent the data set at the point of the connector’s start-up. */
  NoData = "NoData",
}

/**
 * Type of SnapshotMode \
 * {@link KnownOracleSnapshotMode} can be used interchangeably with OracleSnapshotMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Initial**: When the connector starts, it performs an initial database snapshot. After the snapshot completes, the connector begins to stream event records for subsequent database changes. \
 * **InitialOnly**: The connector performs a database a snapshot only when no offsets have been recorded for the logical server name. After the snapshot completes, the connector stops. It does not transition to streaming event records for subsequent database changes. \
 * **NoData**: The connector runs a snapshot that captures the structure of all relevant tables, but it does not create READ events to represent the data set at the point of the connector’s start-up.
 */
export type OracleSnapshotMode = string;

/** Enum DecimalHandlingMode for Cdc */
export enum KnownOracleDecimalHandlingMode {
  /** The Precise mode. */
  PreciseMode = "Precise",
  /** The Double mode. */
  DoubleMode = "Double",
  /** The String mode. */
  StringMode = "String",
}

/**
 * Enum DecimalHandlingMode for Cdc \
 * {@link KnownOracleDecimalHandlingMode} can be used interchangeably with OracleDecimalHandlingMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Precise**: The Precise mode. \
 * **Double**: The Double mode. \
 * **String**: The String mode.
 */
export type OracleDecimalHandlingMode = string;

/** Configuration for HttpSourceConnector */
export interface HttpSourceConnectorProperties extends DataSourceProperties {
  /** Type of HttpSourceConnector */
  connectorType: "HttpSource";
  /** HTTP URL to fetch from. */
  url: string;
  /** HTTP request method. GET or POST. */
  method: HttpMethod;
  /** HTTP parameters to be added to request. */
  requestParameters?: HttpKeyValuePair[];
  /** Path variables to be substituted. */
  pathVariables?: HttpKeyValuePair[];
  /** HTTP headers to include in the request. */
  headers?: HttpKeyValuePair[];
  /** HTTP request body sent with POST request. */
  body?: string;
  /** Polling interval in milliseconds. */
  pollIntervalMs?: number;
  /** Maximum number of retry attempts on error before failing the task. */
  maxRetries?: number;
  /** Time to wait in ms before retrying after an error. */
  retryBackoffMs?: number;
  /** HTTP status codes or ranges to retry on. */
  retriableHttpStatusCodes?: string;
  /** Authentication for HTTP */
  authentication: AuthenticationUnion;
}

export function httpSourceConnectorPropertiesSerializer(
  item: HttpSourceConnectorProperties,
): any {
  return {
    connectorType: item["connectorType"],
    connectorSubType: item["connectorSubType"],
    url: item["url"],
    method: item["method"],
    requestParameters: !item["requestParameters"]
      ? item["requestParameters"]
      : httpKeyValuePairArraySerializer(item["requestParameters"]),
    pathVariables: !item["pathVariables"]
      ? item["pathVariables"]
      : httpKeyValuePairArraySerializer(item["pathVariables"]),
    headers: !item["headers"]
      ? item["headers"]
      : httpKeyValuePairArraySerializer(item["headers"]),
    body: item["body"],
    pollIntervalMs: item["pollIntervalMs"],
    maxRetries: item["maxRetries"],
    retryBackoffMs: item["retryBackoffMs"],
    retriableHttpStatusCodes: item["retriableHttpStatusCodes"],
    authentication: authenticationUnionSerializer(item["authentication"]),
  };
}

export function httpSourceConnectorPropertiesDeserializer(
  item: any,
): HttpSourceConnectorProperties {
  return {
    connectorType: item["connectorType"],
    connectorSubType: item["connectorSubType"],
    url: item["url"],
    method: item["method"],
    requestParameters: !item["requestParameters"]
      ? item["requestParameters"]
      : httpKeyValuePairArrayDeserializer(item["requestParameters"]),
    pathVariables: !item["pathVariables"]
      ? item["pathVariables"]
      : httpKeyValuePairArrayDeserializer(item["pathVariables"]),
    headers: !item["headers"]
      ? item["headers"]
      : httpKeyValuePairArrayDeserializer(item["headers"]),
    body: item["body"],
    pollIntervalMs: item["pollIntervalMs"],
    maxRetries: item["maxRetries"],
    retryBackoffMs: item["retryBackoffMs"],
    retriableHttpStatusCodes: item["retriableHttpStatusCodes"],
    authentication: authenticationUnionDeserializer(item["authentication"]),
  };
}

/** Supported HTTP request methods */
export enum KnownHttpMethod {
  /** HTTP GET method */
  GET = "GET",
  /** HTTP POST method */
  Post = "POST",
}

/**
 * Supported HTTP request methods \
 * {@link KnownHttpMethod} can be used interchangeably with HttpMethod,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **GET**: HTTP GET method \
 * **POST**: HTTP POST method
 */
export type HttpMethod = string;

export function httpKeyValuePairArraySerializer(
  result: Array<HttpKeyValuePair>,
): any[] {
  return result.map((item) => {
    return httpKeyValuePairSerializer(item);
  });
}

export function httpKeyValuePairArrayDeserializer(
  result: Array<HttpKeyValuePair>,
): any[] {
  return result.map((item) => {
    return httpKeyValuePairDeserializer(item);
  });
}

/** HTTP key-value pair */
export interface HttpKeyValuePair {
  /** HTTP header, request parameter, or path variable name */
  key: string;
  /** Value associated with the key */
  value: string;
}

export function httpKeyValuePairSerializer(item: HttpKeyValuePair): any {
  return { key: item["key"], value: item["value"] };
}

export function httpKeyValuePairDeserializer(item: any): HttpKeyValuePair {
  return {
    key: item["key"],
    value: item["value"],
  };
}

/** MongoDbConnector tracks a MongoDb replica set or a MongoDb shared cluster for document changes in databases and collections, recording those changes as events in Kafka topics */
export interface MongoDbSourceConnectorProperties extends DataSourceProperties {
  /** Type of MongoDbSourceConnector */
  connectorType: "MongoDbSource";
  /** Server address of MongoDb Server. */
  server: string;
  /** Username for MongoDb. */
  username: string;
  /** Password for MongoDb. */
  password: string;
  /** Name of the MongoDb replica set. */
  replicaSet?: string;
  /** Enables or disables TLS/SSL for the connection. */
  enableTls?: boolean;
  /** A comma-separated list of regular expressions that match database names to be monitored. By default, all databases are monitored. */
  databaseIncludeList?: string;
  /** A comma-separated list of regular expressions that match database names to be excluded from monitoring. */
  databaseExcludeList?: string;
  /** A comma-separated list of regular expressions that match fully-qualified namespaces for MongoDb collections to be monitored. By default, the connector monitors all collections except those in the local and admin databases. */
  collectionIncludeList?: string;
  /** A comma-separated list of regular expressions that match fully-qualified namespaces for MongoDb collections to be excluded from monitoring. */
  collectionExcludeList?: string;
  /** Specifies the criteria for performing a snapshot when the connector starts. */
  snapshotMode?: MongoDbSnapshotMode;
  /** Specifies the maximum number of documents that should be read in one go from each collection while taking a snapshot. */
  snapshotFetchSize?: number;
}

export function mongoDbSourceConnectorPropertiesSerializer(
  item: MongoDbSourceConnectorProperties,
): any {
  return {
    connectorType: item["connectorType"],
    connectorSubType: item["connectorSubType"],
    server: item["server"],
    username: item["username"],
    password: item["password"],
    replicaSet: item["replicaSet"],
    enableTls: item["enableTls"],
    databaseIncludeList: item["databaseIncludeList"],
    databaseExcludeList: item["databaseExcludeList"],
    collectionIncludeList: item["collectionIncludeList"],
    collectionExcludeList: item["collectionExcludeList"],
    snapshotMode: item["snapshotMode"],
    snapshotFetchSize: item["snapshotFetchSize"],
  };
}

export function mongoDbSourceConnectorPropertiesDeserializer(
  item: any,
): MongoDbSourceConnectorProperties {
  return {
    connectorType: item["connectorType"],
    connectorSubType: item["connectorSubType"],
    server: item["server"],
    username: item["username"],
    password: item["password"],
    replicaSet: item["replicaSet"],
    enableTls: item["enableTls"],
    databaseIncludeList: item["databaseIncludeList"],
    databaseExcludeList: item["databaseExcludeList"],
    collectionIncludeList: item["collectionIncludeList"],
    collectionExcludeList: item["collectionExcludeList"],
    snapshotMode: item["snapshotMode"],
    snapshotFetchSize: item["snapshotFetchSize"],
  };
}

/** Specifies the criteria for performing a snapshot when the connector starts. */
export enum KnownMongoDbSnapshotMode {
  /** When the connector starts, it performs an initial database snapshot. After the snapshot completes, the connector begins to stream event records for subsequent database changes. */
  Initial = "Initial",
  /** The connector performs a database a snapshot only when no offsets have been recorded for the logical server name. After the snapshot completes, the connector stops. It does not transition to streaming event records for subsequent database changes. */
  InitialOnly = "InitialOnly",
  /** The connector runs a snapshot that captures the structure of all relevant tables, but it does not create READ events to represent the data set at the point of the connector’s start-up. */
  NoData = "NoData",
}

/**
 * Specifies the criteria for performing a snapshot when the connector starts. \
 * {@link KnownMongoDbSnapshotMode} can be used interchangeably with MongoDbSnapshotMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Initial**: When the connector starts, it performs an initial database snapshot. After the snapshot completes, the connector begins to stream event records for subsequent database changes. \
 * **InitialOnly**: The connector performs a database a snapshot only when no offsets have been recorded for the logical server name. After the snapshot completes, the connector stops. It does not transition to streaming event records for subsequent database changes. \
 * **NoData**: The connector runs a snapshot that captures the structure of all relevant tables, but it does not create READ events to represent the data set at the point of the connector’s start-up.
 */
export type MongoDbSnapshotMode = string;

/** The resource model definition for an Azure Resource Manager tracked top level resource which has 'tags' and a 'location' */
export interface TrackedResource extends Resource {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location: string;
}

export function trackedResourceSerializer(item: TrackedResource): any {
  return { tags: item["tags"], location: item["location"] };
}

export function trackedResourceDeserializer(item: any): TrackedResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    tags: item["tags"],
    location: item["location"],
  };
}

/** Common fields that are returned in the response for all Azure Resource Manager resources */
export interface Resource {
  /** Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName} */
  readonly id?: string;
  /** The name of the resource */
  readonly name?: string;
  /** The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts" */
  readonly type?: string;
  /** Azure Resource Manager metadata containing createdBy and modifiedBy information. */
  readonly systemData?: SystemData;
}

export function resourceSerializer(item: Resource): any {
  return item;
}

export function resourceDeserializer(item: any): Resource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** Metadata pertaining to creation and last modification of the resource. */
export interface SystemData {
  /** The identity that created the resource. */
  createdBy?: string;
  /** The type of identity that created the resource. */
  createdByType?: CreatedByType;
  /** The timestamp of resource creation (UTC). */
  createdAt?: Date;
  /** The identity that last modified the resource. */
  lastModifiedBy?: string;
  /** The type of identity that last modified the resource. */
  lastModifiedByType?: CreatedByType;
  /** The timestamp of resource last modification (UTC) */
  lastModifiedAt?: Date;
}

export function systemDataDeserializer(item: any): SystemData {
  return {
    createdBy: item["createdBy"],
    createdByType: item["createdByType"],
    createdAt: !item["createdAt"]
      ? item["createdAt"]
      : new Date(item["createdAt"]),
    lastModifiedBy: item["lastModifiedBy"],
    lastModifiedByType: item["lastModifiedByType"],
    lastModifiedAt: !item["lastModifiedAt"]
      ? item["lastModifiedAt"]
      : new Date(item["lastModifiedAt"]),
  };
}

/** The kind of entity that created the resource. */
export enum KnownCreatedByType {
  /** The entity was created by a user. */
  User = "User",
  /** The entity was created by an application. */
  Application = "Application",
  /** The entity was created by a managed identity. */
  ManagedIdentity = "ManagedIdentity",
  /** The entity was created by a key. */
  Key = "Key",
}

/**
 * The kind of entity that created the resource. \
 * {@link KnowncreatedByType} can be used interchangeably with createdByType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **User**: The entity was created by a user. \
 * **Application**: The entity was created by an application. \
 * **ManagedIdentity**: The entity was created by a managed identity. \
 * **Key**: The entity was created by a key.
 */
export type CreatedByType = string;

/** The response of a MessagingConnector list operation. */
export interface _MessagingConnectorListResult {
  /** The MessagingConnector items on this page */
  value: MessagingConnector[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _messagingConnectorListResultDeserializer(
  item: any,
): _MessagingConnectorListResult {
  return {
    value: messagingConnectorArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function messagingConnectorArraySerializer(
  result: Array<MessagingConnector>,
): any[] {
  return result.map((item) => {
    return messagingConnectorSerializer(item);
  });
}

export function messagingConnectorArrayDeserializer(
  result: Array<MessagingConnector>,
): any[] {
  return result.map((item) => {
    return messagingConnectorDeserializer(item);
  });
}

/** The type used for updating tags in MessagingConnector resources. */
export interface MessagingConnectorTagsUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function messagingConnectorTagsUpdateSerializer(
  item: MessagingConnectorTagsUpdate,
): any {
  return { tags: item["tags"] };
}

/** Request of DataPreview */
export interface DataPreviewRequest {
  /** DataPreview properties */
  dataPreviewProperties: DataPreviewProperties;
  /** Skip validation or not */
  skipValidation?: boolean;
}

export function dataPreviewRequestSerializer(item: DataPreviewRequest): any {
  return {
    dataPreviewProperties: dataPreviewPropertiesSerializer(
      item["dataPreviewProperties"],
    ),
    skipValidation: item["skipValidation"],
  };
}

/** Properties of one DataPreview */
export interface DataPreviewProperties {
  /** Properties for the source */
  dataSourceProperties: DataSourcePropertiesUnion;
  /** DataRange for DataPreview */
  dataRange: DataRangeBaseConfigUnion;
  /** Data format of the data source */
  sourceDataFormat?: SourceDataFormatUnion;
  /** Cloud events config */
  cloudEventsConfig?: CloudEventsConfigUnion;
  /** networkProperties config. */
  networkProperties?: NetworkProperties;
}

export function dataPreviewPropertiesSerializer(
  item: DataPreviewProperties,
): any {
  return {
    dataSourceProperties: dataSourcePropertiesUnionSerializer(
      item["dataSourceProperties"],
    ),
    dataRange: dataRangeBaseConfigUnionSerializer(item["dataRange"]),
    sourceDataFormat: !item["sourceDataFormat"]
      ? item["sourceDataFormat"]
      : sourceDataFormatUnionSerializer(item["sourceDataFormat"]),
    cloudEventsConfig: !item["cloudEventsConfig"]
      ? item["cloudEventsConfig"]
      : cloudEventsConfigUnionSerializer(item["cloudEventsConfig"]),
    networkProperties: !item["networkProperties"]
      ? item["networkProperties"]
      : networkPropertiesSerializer(item["networkProperties"]),
  };
}

/** Base config for DataRange */
export interface DataRangeBaseConfig {
  /** type of dataRange */
  /** The discriminator possible values: Limit */
  type: DataRangeType;
}

export function dataRangeBaseConfigSerializer(item: DataRangeBaseConfig): any {
  return { type: item["type"] };
}

/** Alias for DataRangeBaseConfigUnion */
export type DataRangeBaseConfigUnion = DataRangeLimit | DataRangeBaseConfig;

export function dataRangeBaseConfigUnionSerializer(
  item: DataRangeBaseConfigUnion,
): any {
  switch (item.type) {
    case "Limit":
      return dataRangeLimitSerializer(item as DataRangeLimit);

    default:
      return dataRangeBaseConfigSerializer(item);
  }
}

/** Type of DataRange */
export enum KnownDataRangeType {
  /** Max limit range type */
  Limit = "Limit",
}

/**
 * Type of DataRange \
 * {@link KnownDataRangeType} can be used interchangeably with DataRangeType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Limit**: Max limit range type
 */
export type DataRangeType = string;

/** DataRange by max records limit */
export interface DataRangeLimit extends DataRangeBaseConfig {
  /** Limit type of DataRange */
  type: "Limit";
  /** Max Limit for DataRange */
  limit: number;
}

export function dataRangeLimitSerializer(item: DataRangeLimit): any {
  return { type: item["type"], limit: item["limit"] };
}

/** Properties of DataPreview results */
export interface DataPreviewResults {
  /** Content of DataPreview results in Json format. */
  results: JsonConvertedRecord[];
}

export function dataPreviewResultsDeserializer(item: any): DataPreviewResults {
  return {
    results: jsonConvertedRecordArrayDeserializer(item["results"]),
  };
}

export function jsonConvertedRecordArrayDeserializer(
  result: Array<JsonConvertedRecord>,
): any[] {
  return result.map((item) => {
    return jsonConvertedRecordDeserializer(item);
  });
}

/** Preview result */
export interface JsonConvertedRecord {
  /** Header of DataPreview result */
  headers: DataHeader[];
  /** Key of DataPreview result */
  key: string;
  /** ValueSchema of DataPreview result */
  valueSchema: string;
  /** Value of DataPreview result */
  value: string;
}

export function jsonConvertedRecordDeserializer(
  item: any,
): JsonConvertedRecord {
  return {
    headers: dataHeaderArrayDeserializer(item["headers"]),
    key: item["key"],
    valueSchema: item["valueSchema"],
    value: item["value"],
  };
}

export function dataHeaderArrayDeserializer(result: Array<DataHeader>): any[] {
  return result.map((item) => {
    return dataHeaderDeserializer(item);
  });
}

/** Header item */
export interface DataHeader {
  /** Header key */
  key: string;
  /** Header value */
  value: string;
}

export function dataHeaderDeserializer(item: any): DataHeader {
  return {
    key: item["key"],
    value: item["value"],
  };
}

/** properties of fetch Schema */
export interface SchemaRequestProperties {
  /** schema config for connector */
  connectorSchemaConfig: ConnectorSchemaConfigUnion;
  /** Schema Format */
  format: SchemaFormat;
}

export function schemaRequestPropertiesSerializer(
  item: SchemaRequestProperties,
): any {
  return {
    connectorSchemaConfig: connectorSchemaConfigUnionSerializer(
      item["connectorSchemaConfig"],
    ),
    format: schemaFormatSerializer(item["format"]),
  };
}

/** Connector Schema Config */
export interface ConnectorSchemaConfig {
  /** connector Type. */
  /** The discriminator possible values: SqlServerSource */
  connectorType: ConnectorType;
}

export function connectorSchemaConfigSerializer(
  item: ConnectorSchemaConfig,
): any {
  return { connectorType: item["connectorType"] };
}

/** Alias for ConnectorSchemaConfigUnion */
export type ConnectorSchemaConfigUnion =
  | SqlServerSourceConnectorSchemaConfig
  | ConnectorSchemaConfig;

export function connectorSchemaConfigUnionSerializer(
  item: ConnectorSchemaConfigUnion,
): any {
  switch (item.connectorType) {
    case "SqlServerSource":
      return sqlServerSourceConnectorSchemaConfigSerializer(
        item as SqlServerSourceConnectorSchemaConfig,
      );

    default:
      return connectorSchemaConfigSerializer(item);
  }
}

/** SqlServerSource Schema Config */
export interface SqlServerSourceConnectorSchemaConfig
  extends ConnectorSchemaConfig {
  /** SqlServerSource Connector */
  connectorType: "SqlServerSource";
  /** Servername string */
  serverName: string;
  /** Port of Server */
  port: number;
  /** databaseName of Server */
  databaseName: string;
  /** username of Server */
  userName: string;
  /** password of Server */
  password: string;
  /** tables of Server */
  tables: string;
}

export function sqlServerSourceConnectorSchemaConfigSerializer(
  item: SqlServerSourceConnectorSchemaConfig,
): any {
  return {
    connectorType: item["connectorType"],
    serverName: item["serverName"],
    port: item["port"],
    databaseName: item["databaseName"],
    userName: item["userName"],
    password: item["password"],
    tables: item["tables"],
  };
}

/** Schema format */
export interface SchemaFormat {
  /** type of schema */
  type: SchemaFormatType;
  /** version of schema */
  version: string;
}

export function schemaFormatSerializer(item: SchemaFormat): any {
  return { type: item["type"], version: item["version"] };
}

export function schemaFormatDeserializer(item: any): SchemaFormat {
  return {
    type: item["type"],
    version: item["version"],
  };
}

/** Schema format Types */
export enum KnownSchemaFormatType {
  /** Avro format */
  Avro = "Avro",
  /** Json format */
  Json = "Json",
  /** Protobuf format */
  Protobuf = "Protobuf",
}

/**
 * Schema format Types \
 * {@link KnownSchemaFormatType} can be used interchangeably with SchemaFormatType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Avro**: Avro format \
 * **Json**: Json format \
 * **Protobuf**: Protobuf format
 */
export type SchemaFormatType = string;

/** Properties of Schema results */
export interface SchemaResult {
  /** Content of DataPreview results */
  schemas: Schema[];
}

export function schemaResultDeserializer(item: any): SchemaResult {
  return {
    schemas: schemaArrayDeserializer(item["schemas"]),
  };
}

export function schemaArrayDeserializer(result: Array<Schema>): any[] {
  return result.map((item) => {
    return schemaDeserializer(item);
  });
}

/** Response item of Schema */
export interface Schema {
  /** Schema format */
  schemaFormat: SchemaFormat;
  /** Schema content */
  schemaJson: string;
  /** special schema Properties */
  schemaProperties: SchemaPropertiesUnion;
}

export function schemaDeserializer(item: any): Schema {
  return {
    schemaFormat: schemaFormatDeserializer(item["schemaFormat"]),
    schemaJson: item["schemaJson"],
    schemaProperties: schemaPropertiesUnionDeserializer(
      item["schemaProperties"],
    ),
  };
}

/** special connector SchemaProperties */
export interface SchemaProperties {
  type: SchemaPropertiesType;
}

export function schemaPropertiesDeserializer(item: any): SchemaProperties {
  return {
    type: item["type"],
  };
}

/** Alias for SchemaPropertiesUnion */
export type SchemaPropertiesUnion = CdcSchemaProperties | SchemaProperties;

export function schemaPropertiesUnionDeserializer(
  item: any,
): SchemaPropertiesUnion {
  switch (item.type) {
    case "Cdc":
      return cdcSchemaPropertiesDeserializer(item as CdcSchemaProperties);

    default:
      return schemaPropertiesDeserializer(item);
  }
}

/** Schema Properties Types */
export enum KnownSchemaPropertiesType {
  /** change data capture(CDC) Schema Properties Types */
  Cdc = "Cdc",
}

/**
 * Schema Properties Types \
 * {@link KnownSchemaPropertiesType} can be used interchangeably with SchemaPropertiesType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Cdc**: change data capture(CDC) Schema Properties Types
 */
export type SchemaPropertiesType = string;

/** cdc connector SchemaProperties */
export interface CdcSchemaProperties extends SchemaProperties {
  /** cdc SchemaProperties type */
  type: "Cdc";
  /** cdc event type */
  cdcEventType: CdcEventType;
  /** table id */
  tableId: TableId;
}

export function cdcSchemaPropertiesDeserializer(
  item: any,
): CdcSchemaProperties {
  return {
    type: item["type"],
    cdcEventType: item["cdcEventType"],
    tableId: tableIdDeserializer(item["tableId"]),
  };
}

/** change data capture(cdc) event type */
export enum KnownCdcEventType {
  /** DataChange type */
  DataChange = "DataChange",
  /** SchemaChange type */
  SchemaChange = "SchemaChange",
}

/**
 * change data capture(cdc) event type \
 * {@link KnownCdcEventType} can be used interchangeably with CdcEventType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **DataChange**: DataChange type \
 * **SchemaChange**: SchemaChange type
 */
export type CdcEventType = string;

/** cdc table name */
export interface TableId {
  /** database name of table */
  databaseName: string;
  /** schema name of table */
  schemaName: string;
  /** table name of table */
  tableName: string;
}

export function tableIdDeserializer(item: any): TableId {
  return {
    databaseName: item["databaseName"],
    schemaName: item["schemaName"],
    tableName: item["tableName"],
  };
}

/** Request of connector configuration validation */
export interface ConnectorConfigurationValidationRequest {
  /** Connector properties */
  connectorProperties: ConnectorPropertiesUnion;
}

export function connectorConfigurationValidationRequestSerializer(
  item: ConnectorConfigurationValidationRequest,
): any {
  return {
    connectorProperties: connectorPropertiesUnionSerializer(
      item["connectorProperties"],
    ),
  };
}

/** Result of validation */
export interface ValidationResult {
  /** Validation success or failed */
  result: ValidationResultStatus;
  /** Validation errors. */
  errors?: ValidationError[];
}

export function validationResultDeserializer(item: any): ValidationResult {
  return {
    result: item["result"],
    errors: !item["errors"]
      ? item["errors"]
      : validationErrorArrayDeserializer(item["errors"]),
  };
}

/** Result of validation */
export enum KnownValidationResultStatus {
  /** Validation success. */
  Success = "Success",
  /** Validation failed. */
  Failed = "Failed",
}

/**
 * Result of validation \
 * {@link KnownValidationResultStatus} can be used interchangeably with ValidationResultStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Success**: Validation success. \
 * **Failed**: Validation failed.
 */
export type ValidationResultStatus = string;

export function validationErrorArrayDeserializer(
  result: Array<ValidationError>,
): any[] {
  return result.map((item) => {
    return validationErrorDeserializer(item);
  });
}

/** Validation error. */
export interface ValidationError {
  /** Error message. */
  message: string;
  /** Error code. */
  code: string;
}

export function validationErrorDeserializer(item: any): ValidationError {
  return {
    message: item["message"],
    code: item["code"],
  };
}

/** Request of datapreview configuration validation */
export interface DataPreviewConfigurationValidationRequest {
  /** Datapreview properties */
  dataPreviewProperties: DataPreviewProperties;
}

export function dataPreviewConfigurationValidationRequestSerializer(
  item: DataPreviewConfigurationValidationRequest,
): any {
  return {
    dataPreviewProperties: dataPreviewPropertiesSerializer(
      item["dataPreviewProperties"],
    ),
  };
}

/** Microsoft.MessagingConnectors api versions. */
export enum KnownVersions {
  /** 2025-08-01-preview version */
  V20250801Preview = "2025-08-01-preview",
}
