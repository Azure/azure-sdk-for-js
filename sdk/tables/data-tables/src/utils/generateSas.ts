import { NamedKeyCredential } from "@azure/core-auth";
import { URL } from "./url";
import { computeHMACSHA256 } from "./computeHMACSHA256";

const SASConstants = {
  ServiceVersion: "2019-02-02",
  Parameters: {
    Version: "sv",
    TableName: "tn",
    StartPartitionKey: "spk",
    EndPartitionKey: "epk",
    StartRowKey: "srk",
    EndRowKey: "erk",
    TableNameUpper: "TN",
    VersionUpper: "SV",
    Services: "ss",
    ServicesUpper: "SS",
    ResourceTypes: "srt",
    ResourceTypesUpper: "SRT",
    Protocol: "spr",
    ProtocolUpper: "SPR",
    StartTime: "st",
    StartTimeUpper: "ST",
    ExpiryTime: "se",
    ExpiryTimeUpper: "SE",
    IPRange: "sip",
    IPRangeUpper: "SIP",
    Identifier: "si",
    IdentifierUpper: "SI",
    Resource: "sr",
    ResourceUpper: "SR",
    Permissions: "sp",
    PermissionsUpper: "SP",
    Signature: "sig",
    SignatureUpper: "SIG"
  }
};

export interface TableAccountSASQueryParameters {
  version: string;
  resourceTypes: string; // TODO: type
  protocol: "https" | "https,http";
  startsOn: string;
  expiresOn: string;
  ipRange: string;
  identifier: string;
  resource: string;
  permissions: string;
  services?: string;
}

export interface TableSASQueryParameters extends TableAccountSASQueryParameters {
  tableName: string;
  startPartitionKey?: string;
  startRowKey?: string;
  endPartitionKey?: string;
  endRowKey?: string;
}

/**
 * Permissions on the resource allowed with a SAS token
 */
export interface AccountSASPermissions {
  /**
   * Delete entities.
   */
  delete?: boolean;
  /**
   * Get entities and query entities.
   */
  list?: boolean;
  /**
   * Add entities. Note: Add and Update permissions are required for upsert operations.
   */
  create?: boolean;
  /**
   * Update entities. Note: Add and Update permissions are required for upsert operations.
   */
  update?: boolean;
}

/**
 * Represents an ip range
 */
export interface SasIPRange {
  /**
   * Starting IP address in the IP range.
   * If end IP doesn't provide, start IP will the only IP allowed.
   */
  start: string;
  /**
   * Optional. IP address that ends the IP range.
   * If not provided, start IP will the only IP allowed.
   */
  end?: string;
}

/**
 * Optional settings fo generating a SAS
 */
export interface GenerateSASTokenOptions {
  /**
   * Specifies an IP address or a range of IP addresses from which to accept requests.
   * If the IP address from which the request originates does not match the IP address
   * or address range specified on the SAS token, the request is not authenticated.
   * For example, specifying sip=168.1.5.65 or sip=168.1.5.60-168.1.5.70 on the SAS
   * restricts the request to those IP addresses.
   */
  ipRange?: SasIPRange;
  /**
   * Specifies the protocol permitted for a request made.
   */
  protocol?: "https" | "https,http";
  /**
   * Expiry time. Specified in UTC time.
   */
  expiresOn?: Date;
  /**
   * Start Time. Specified in UTC time. If you want the SAS to be valid immediately, omit the start time
   */
  startsOn?: Date;
  /**
   *  Service version of the shared access signature. This value specifies the version of Shared Key authorization used by this shared access signature (in the signature field),
   *  and also specifies the service version for requests made with this shared access signature
   */
  version?: string;
}

/**
 * Resource type to get a SAS for
 */
export type TableAccountSASResourceTypes = "Service" | "Container" | "Object" | "All";

/**
 *  Generates a SAS Token for the Table Account
 */
export function generateAccountSAS(
  permissions: AccountSASPermissions,
  resourceTypes: TableAccountSASResourceTypes,
  credential: NamedKeyCredential,
  options: GenerateSASTokenOptions = {}
): string {
  console.log(permissions, resourceTypes, credential, options);
  throw new Error("NYI");
}

/**
 * Generates a SAS Token for a table resource
 */
export function generateTableSAS(
  tableName: string,
  permissions: AccountSASPermissions,
  credential: NamedKeyCredential,
  options: GenerateSASTokenOptions = {}
): string {
  const expiresOn = options.expiresOn?.toISOString() ?? "";
  const startsOn = options.startsOn?.toISOString() ?? "";
  const permissionsString =
    typeof permissions === "string" ? permissions : getPermissionsString(permissions);

  const ipRange = options.ipRange ? ipRangeToString(options.ipRange) : "";
  const protocol = options.protocol ?? "https,http";
  const startPartitionKey = ""; // TODO: uri
  const startRowKey = ""; //TODO: uri
  const endPartitionKey = ""; // TODO: uri
  const endRowKey = ""; //TODO: uri
  const identifier = ""; //TODO: uri
  const parameters: TableSASQueryParameters = {
    version: options.version ?? SASConstants.ServiceVersion,
    expiresOn,
    identifier,
    ipRange,
    permissions: permissionsString,
    protocol,
    resource: getCannonicalName(tableName, credential.name),
    resourceTypes: "",
    startsOn,
    tableName,
    endPartitionKey,
    endRowKey,
    startPartitionKey,
    startRowKey
  };

  const stringToSing = getStringToSign(parameters);
  const signature = computeHMACSHA256(stringToSing, credential.key);

  const queryParams = getTableSASQueryString(parameters, signature);

  return queryParams;
}

function getTableSASQueryString(parameters: TableSASQueryParameters, signature: string) {
  const dummyURL = new URL("https://localhost");
  if (parameters.version) {
    dummyURL.searchParams.append(SASConstants.Parameters.Version, parameters.version);
  }

  if (parameters.resourceTypes) {
    dummyURL.searchParams.append(SASConstants.Parameters.ResourceTypes, parameters.resourceTypes);
  }

  if (parameters.protocol) {
    dummyURL.searchParams.append(SASConstants.Parameters.Protocol, parameters.protocol);
  }

  if (parameters.startsOn) {
    // TODO: Do we need to URL encode the date?
    dummyURL.searchParams.append(SASConstants.Parameters.StartTime, parameters.startsOn);
  }

  if (parameters.expiresOn) {
    dummyURL.searchParams.append(SASConstants.Parameters.ExpiryTime, parameters.expiresOn);
  }

  if (parameters.ipRange) {
    dummyURL.searchParams.append(SASConstants.Parameters.IPRange, parameters.ipRange);
  }

  if (parameters.resource) {
    dummyURL.searchParams.append(SASConstants.Parameters.Resource, parameters.resource);
  }

  if (parameters.identifier) {
    dummyURL.searchParams.append(SASConstants.Parameters.Identifier, parameters.identifier);
  }

  if (parameters.permissions) {
    dummyURL.searchParams.append(SASConstants.Parameters.Permissions, parameters.permissions);
  }

  if (signature) {
    dummyURL.searchParams.append(SASConstants.Parameters.Signature, signature);
  }

  return dummyURL.searchParams.toString();
}

function getStringToSign(parameters: TableSASQueryParameters): string {
  return [
    parameters.permissions,
    parameters.startsOn,
    parameters.expiresOn,
    parameters.resource,
    parameters.identifier,
    parameters.ipRange,
    parameters.protocol,
    parameters.version,
    parameters.startPartitionKey,
    parameters.startRowKey,
    parameters.endPartitionKey,
    parameters.endRowKey
  ].join("\n");
}

function getCannonicalName(account: string, tableName: string) {
  // Table: "/table/account/tablename"
  return `/table/${account}/${tableName}`;
}

function getPermissionsString(sasPermissions: AccountSASPermissions) {
  let string = "";

  if (sasPermissions.list) {
    string += "r";
  }

  if (sasPermissions.create) {
    string += "a";
  }

  if (sasPermissions.update) {
    string += "u";
  }

  if (sasPermissions.delete) {
    string += "d";
  }

  return string;
}

function ipRangeToString(ipRange: SasIPRange): string {
  return ipRange.end ? `${ipRange.start}-${ipRange.end}` : ipRange.start;
}
