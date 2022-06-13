// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike } from "@azure/abort-controller";
import { HttpHeaders, isNode, URLBuilder, TokenCredential } from "@azure/core-http";

import {
  BlobQueryArrowConfiguration,
  BlobQueryCsvTextConfiguration,
  BlobQueryJsonTextConfiguration,
  BlobQueryParquetConfiguration,
} from "../Clients";
import {
  QuerySerialization,
  BlobTags,
  BlobName,
  ListBlobsFlatSegmentResponse,
  ListBlobsHierarchySegmentResponse,
  BlobItemInternal,
  BlobPrefix,
  BlobType,
  LeaseStatusType,
  LeaseStateType,
  LeaseDurationType,
  CopyStatusType,
  AccessTier,
  ArchiveStatus,
  RehydratePriority,
  BlobImmutabilityPolicyMode,
  BlobTag,
  PageRange,
  ClearRange,
  BlobPropertiesInternal,
} from "../generated/src/models";
import { DevelopmentConnectionString, HeaderConstants, URLConstants } from "./constants";
import {
  Tags,
  ObjectReplicationPolicy,
  ObjectReplicationRule,
  ObjectReplicationStatus,
  HttpAuthorization,
} from "../models";
import {
  ListBlobsFlatSegmentResponseModel,
  BlobItemInternal as BlobItemInternalModel,
  ListBlobsHierarchySegmentResponseModel,
  BlobPrefix as BlobPrefixModel,
  PageBlobGetPageRangesDiffResponseModel,
  PageRangeInfo,
} from "../generatedModels";

/**
 * Reserved URL characters must be properly escaped for Storage services like Blob or File.
 *
 * ## URL encode and escape strategy for JS SDKs
 *
 * When customers pass a URL string into XxxClient classes constructor, the URL string may already be URL encoded or not.
 * But before sending to Azure Storage server, the URL must be encoded. However, it's hard for a SDK to guess whether the URL
 * string has been encoded or not. We have 2 potential strategies, and chose strategy two for the XxxClient constructors.
 *
 * ### Strategy One: Assume the customer URL string is not encoded, and always encode URL string in SDK.
 *
 * This is what legacy V2 SDK does, simple and works for most of the cases.
 * - When customer URL string is "http://account.blob.core.windows.net/con/b:",
 *   SDK will encode it to "http://account.blob.core.windows.net/con/b%3A" and send to server. A blob named "b:" will be created.
 * - When customer URL string is "http://account.blob.core.windows.net/con/b%3A",
 *   SDK will encode it to "http://account.blob.core.windows.net/con/b%253A" and send to server. A blob named "b%3A" will be created.
 *
 * But this strategy will make it not possible to create a blob with "?" in it's name. Because when customer URL string is
 * "http://account.blob.core.windows.net/con/blob?name", the "?name" will be treated as URL paramter instead of blob name.
 * If customer URL string is "http://account.blob.core.windows.net/con/blob%3Fname", a blob named "blob%3Fname" will be created.
 * V2 SDK doesn't have this issue because it doesn't allow customer pass in a full URL, it accepts a separate blob name and encodeURIComponent for it.
 * We cannot accept a SDK cannot create a blob name with "?". So we implement strategy two:
 *
 * ### Strategy Two: SDK doesn't assume the URL has been encoded or not. It will just escape the special characters.
 *
 * This is what V10 Blob Go SDK does. It accepts a URL type in Go, and call url.EscapedPath() to escape the special chars unescaped.
 * - When customer URL string is "http://account.blob.core.windows.net/con/b:",
 *   SDK will escape ":" like "http://account.blob.core.windows.net/con/b%3A" and send to server. A blob named "b:" will be created.
 * - When customer URL string is "http://account.blob.core.windows.net/con/b%3A",
 *   There is no special characters, so send "http://account.blob.core.windows.net/con/b%3A" to server. A blob named "b:" will be created.
 * - When customer URL string is "http://account.blob.core.windows.net/con/b%253A",
 *   There is no special characters, so send "http://account.blob.core.windows.net/con/b%253A" to server. A blob named "b%3A" will be created.
 *
 * This strategy gives us flexibility to create with any special characters. But "%" will be treated as a special characters, if the URL string
 * is not encoded, there shouldn't a "%" in the URL string, otherwise the URL is not a valid URL.
 * If customer needs to create a blob with "%" in it's blob name, use "%25" instead of "%". Just like above 3rd sample.
 * And following URL strings are invalid:
 * - "http://account.blob.core.windows.net/con/b%"
 * - "http://account.blob.core.windows.net/con/b%2"
 * - "http://account.blob.core.windows.net/con/b%G"
 *
 * Another special character is "?", use "%2F" to represent a blob name with "?" in a URL string.
 *
 * ### Strategy for containerName, blobName or other specific XXXName parameters in methods such as `containerClient.getBlobClient(blobName)`
 *
 * We will apply strategy one, and call encodeURIComponent for these parameters like blobName. Because what customers passes in is a plain name instead of a URL.
 *
 * @see https://docs.microsoft.com/en-us/rest/api/storageservices/naming-and-referencing-containers--blobs--and-metadata
 * @see https://docs.microsoft.com/en-us/rest/api/storageservices/naming-and-referencing-shares--directories--files--and-metadata
 *
 * @param url -
 */
export function escapeURLPath(url: string): string {
  const urlParsed = URLBuilder.parse(url);

  let path = urlParsed.getPath();
  path = path || "/";

  path = escape(path);
  urlParsed.setPath(path);

  return urlParsed.toString();
}

export interface ConnectionString {
  kind: "AccountConnString" | "SASConnString";
  url: string;
  accountName: string;
  accountKey?: any;
  accountSas?: string;
  proxyUri?: string; // Development Connection String may contain proxyUri
}

function getProxyUriFromDevConnString(connectionString: string): string {
  // Development Connection String
  // https://docs.microsoft.com/en-us/azure/storage/common/storage-configure-connection-string#connect-to-the-emulator-account-using-the-well-known-account-name-and-key
  let proxyUri = "";
  if (connectionString.search("DevelopmentStorageProxyUri=") !== -1) {
    // CONNECTION_STRING=UseDevelopmentStorage=true;DevelopmentStorageProxyUri=http://myProxyUri
    const matchCredentials = connectionString.split(";");
    for (const element of matchCredentials) {
      if (element.trim().startsWith("DevelopmentStorageProxyUri=")) {
        proxyUri = element.trim().match("DevelopmentStorageProxyUri=(.*)")![1];
      }
    }
  }
  return proxyUri;
}

export function getValueInConnString(
  connectionString: string,
  argument:
    | "BlobEndpoint"
    | "AccountName"
    | "AccountKey"
    | "DefaultEndpointsProtocol"
    | "EndpointSuffix"
    | "SharedAccessSignature"
): string {
  const elements = connectionString.split(";");
  for (const element of elements) {
    if (element.trim().startsWith(argument)) {
      return element.trim().match(argument + "=(.*)")![1];
    }
  }
  return "";
}

/**
 * Extracts the parts of an Azure Storage account connection string.
 *
 * @param connectionString - Connection string.
 * @returns String key value pairs of the storage account's url and credentials.
 */
export function extractConnectionStringParts(connectionString: string): ConnectionString {
  let proxyUri = "";

  if (connectionString.startsWith("UseDevelopmentStorage=true")) {
    // Development connection string
    proxyUri = getProxyUriFromDevConnString(connectionString);
    connectionString = DevelopmentConnectionString;
  }

  // Matching BlobEndpoint in the Account connection string
  let blobEndpoint = getValueInConnString(connectionString, "BlobEndpoint");
  // Slicing off '/' at the end if exists
  // (The methods that use `extractConnectionStringParts` expect the url to not have `/` at the end)
  blobEndpoint = blobEndpoint.endsWith("/") ? blobEndpoint.slice(0, -1) : blobEndpoint;

  if (
    connectionString.search("DefaultEndpointsProtocol=") !== -1 &&
    connectionString.search("AccountKey=") !== -1
  ) {
    // Account connection string

    let defaultEndpointsProtocol = "";
    let accountName = "";
    let accountKey = Buffer.from("accountKey", "base64");
    let endpointSuffix = "";

    // Get account name and key
    accountName = getValueInConnString(connectionString, "AccountName");
    accountKey = Buffer.from(getValueInConnString(connectionString, "AccountKey"), "base64");

    if (!blobEndpoint) {
      // BlobEndpoint is not present in the Account connection string
      // Can be obtained from `${defaultEndpointsProtocol}://${accountName}.blob.${endpointSuffix}`

      defaultEndpointsProtocol = getValueInConnString(connectionString, "DefaultEndpointsProtocol");
      const protocol = defaultEndpointsProtocol!.toLowerCase();
      if (protocol !== "https" && protocol !== "http") {
        throw new Error(
          "Invalid DefaultEndpointsProtocol in the provided Connection String. Expecting 'https' or 'http'"
        );
      }

      endpointSuffix = getValueInConnString(connectionString, "EndpointSuffix");
      if (!endpointSuffix) {
        throw new Error("Invalid EndpointSuffix in the provided Connection String");
      }
      blobEndpoint = `${defaultEndpointsProtocol}://${accountName}.blob.${endpointSuffix}`;
    }

    if (!accountName) {
      throw new Error("Invalid AccountName in the provided Connection String");
    } else if (accountKey.length === 0) {
      throw new Error("Invalid AccountKey in the provided Connection String");
    }

    return {
      kind: "AccountConnString",
      url: blobEndpoint,
      accountName,
      accountKey,
      proxyUri,
    };
  } else {
    // SAS connection string

    const accountSas = getValueInConnString(connectionString, "SharedAccessSignature");
    const accountName = getAccountNameFromUrl(blobEndpoint);
    if (!blobEndpoint) {
      throw new Error("Invalid BlobEndpoint in the provided SAS Connection String");
    } else if (!accountSas) {
      throw new Error("Invalid SharedAccessSignature in the provided SAS Connection String");
    }

    return { kind: "SASConnString", url: blobEndpoint, accountName, accountSas };
  }
}

/**
 * Internal escape method implemented Strategy Two mentioned in escapeURL() description.
 *
 * @param text -
 */
function escape(text: string): string {
  return encodeURIComponent(text)
    .replace(/%2F/g, "/") // Don't escape for "/"
    .replace(/'/g, "%27") // Escape for "'"
    .replace(/\+/g, "%20")
    .replace(/%25/g, "%"); // Revert encoded "%"
}

/**
 * Append a string to URL path. Will remove duplicated "/" in front of the string
 * when URL path ends with a "/".
 *
 * @param url - Source URL string
 * @param name - String to be appended to URL
 * @returns An updated URL string
 */
export function appendToURLPath(url: string, name: string): string {
  const urlParsed = URLBuilder.parse(url);

  let path = urlParsed.getPath();
  path = path ? (path.endsWith("/") ? `${path}${name}` : `${path}/${name}`) : name;
  urlParsed.setPath(path);

  return urlParsed.toString();
}

/**
 * Set URL parameter name and value. If name exists in URL parameters, old value
 * will be replaced by name key. If not provide value, the parameter will be deleted.
 *
 * @param url - Source URL string
 * @param name - Parameter name
 * @param value - Parameter value
 * @returns An updated URL string
 */
export function setURLParameter(url: string, name: string, value?: string): string {
  const urlParsed = URLBuilder.parse(url);
  urlParsed.setQueryParameter(name, value);
  return urlParsed.toString();
}

/**
 * Get URL parameter by name.
 *
 * @param url -
 * @param name -
 */
export function getURLParameter(url: string, name: string): string | string[] | undefined {
  const urlParsed = URLBuilder.parse(url);
  return urlParsed.getQueryParameterValue(name);
}

/**
 * Set URL host.
 *
 * @param url - Source URL string
 * @param host - New host string
 * @returns An updated URL string
 */
export function setURLHost(url: string, host: string): string {
  const urlParsed = URLBuilder.parse(url);
  urlParsed.setHost(host);
  return urlParsed.toString();
}

/**
 * Get URL path from an URL string.
 *
 * @param url - Source URL string
 */
export function getURLPath(url: string): string | undefined {
  const urlParsed = URLBuilder.parse(url);
  return urlParsed.getPath();
}

/**
 * Get URL scheme from an URL string.
 *
 * @param url - Source URL string
 */
export function getURLScheme(url: string): string | undefined {
  const urlParsed = URLBuilder.parse(url);
  return urlParsed.getScheme();
}

/**
 * Get URL path and query from an URL string.
 *
 * @param url - Source URL string
 */
export function getURLPathAndQuery(url: string): string | undefined {
  const urlParsed = URLBuilder.parse(url);
  const pathString = urlParsed.getPath();
  if (!pathString) {
    throw new RangeError("Invalid url without valid path.");
  }

  let queryString = urlParsed.getQuery() || "";
  queryString = queryString.trim();
  if (queryString !== "") {
    queryString = queryString.startsWith("?") ? queryString : `?${queryString}`; // Ensure query string start with '?'
  }

  return `${pathString}${queryString}`;
}

/**
 * Get URL query key value pairs from an URL string.
 *
 * @param url -
 */
export function getURLQueries(url: string): { [key: string]: string } {
  let queryString = URLBuilder.parse(url).getQuery();
  if (!queryString) {
    return {};
  }

  queryString = queryString.trim();
  queryString = queryString.startsWith("?") ? queryString.substr(1) : queryString;

  let querySubStrings: string[] = queryString.split("&");
  querySubStrings = querySubStrings.filter((value: string) => {
    const indexOfEqual = value.indexOf("=");
    const lastIndexOfEqual = value.lastIndexOf("=");
    return (
      indexOfEqual > 0 && indexOfEqual === lastIndexOfEqual && lastIndexOfEqual < value.length - 1
    );
  });

  const queries: { [key: string]: string } = {};
  for (const querySubString of querySubStrings) {
    const splitResults = querySubString.split("=");
    const key: string = splitResults[0];
    const value: string = splitResults[1];
    queries[key] = value;
  }

  return queries;
}

/**
 * Append a string to URL query.
 *
 * @param url - Source URL string.
 * @param queryParts - String to be appended to the URL query.
 * @returns An updated URL string.
 */
export function appendToURLQuery(url: string, queryParts: string): string {
  const urlParsed = URLBuilder.parse(url);

  let query = urlParsed.getQuery();
  if (query) {
    query += "&" + queryParts;
  } else {
    query = queryParts;
  }

  urlParsed.setQuery(query);
  return urlParsed.toString();
}

/**
 * Rounds a date off to seconds.
 *
 * @param date -
 * @param withMilliseconds - If true, YYYY-MM-DDThh:mm:ss.fffffffZ will be returned;
 *                                          If false, YYYY-MM-DDThh:mm:ssZ will be returned.
 * @returns Date string in ISO8061 format, with or without 7 milliseconds component
 */
export function truncatedISO8061Date(date: Date, withMilliseconds: boolean = true): string {
  // Date.toISOString() will return like "2018-10-29T06:34:36.139Z"
  const dateString = date.toISOString();

  return withMilliseconds
    ? dateString.substring(0, dateString.length - 1) + "0000" + "Z"
    : dateString.substring(0, dateString.length - 5) + "Z";
}

/**
 * Base64 encode.
 *
 * @param content -
 */
export function base64encode(content: string): string {
  return !isNode ? btoa(content) : Buffer.from(content).toString("base64");
}

/**
 * Base64 decode.
 *
 * @param encodedString -
 */
export function base64decode(encodedString: string): string {
  return !isNode ? atob(encodedString) : Buffer.from(encodedString, "base64").toString();
}

/**
 * Generate a 64 bytes base64 block ID string.
 *
 * @param blockIndex -
 */
export function generateBlockID(blockIDPrefix: string, blockIndex: number): string {
  // To generate a 64 bytes base64 string, source string should be 48
  const maxSourceStringLength = 48;

  // A blob can have a maximum of 100,000 uncommitted blocks at any given time
  const maxBlockIndexLength = 6;

  const maxAllowedBlockIDPrefixLength = maxSourceStringLength - maxBlockIndexLength;

  if (blockIDPrefix.length > maxAllowedBlockIDPrefixLength) {
    blockIDPrefix = blockIDPrefix.slice(0, maxAllowedBlockIDPrefixLength);
  }
  const res =
    blockIDPrefix +
    padStart(blockIndex.toString(), maxSourceStringLength - blockIDPrefix.length, "0");
  return base64encode(res);
}

/**
 * Delay specified time interval.
 *
 * @param timeInMs -
 * @param aborter -
 * @param abortError -
 */
export async function delay(
  timeInMs: number,
  aborter?: AbortSignalLike,
  abortError?: Error
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    /* eslint-disable-next-line prefer-const */
    let timeout: any;

    const abortHandler = () => {
      if (timeout !== undefined) {
        clearTimeout(timeout);
      }
      reject(abortError);
    };

    const resolveHandler = () => {
      if (aborter !== undefined) {
        aborter.removeEventListener("abort", abortHandler);
      }
      resolve();
    };

    timeout = setTimeout(resolveHandler, timeInMs);

    if (aborter !== undefined) {
      aborter.addEventListener("abort", abortHandler);
    }
  });
}

/**
 * String.prototype.padStart()
 *
 * @param currentString -
 * @param targetLength -
 * @param padString -
 */
export function padStart(
  currentString: string,
  targetLength: number,
  padString: string = " "
): string {
  // @ts-expect-error: TS doesn't know this code needs to run downlevel sometimes
  if (String.prototype.padStart) {
    return currentString.padStart(targetLength, padString);
  }

  padString = padString || " ";
  if (currentString.length > targetLength) {
    return currentString;
  } else {
    targetLength = targetLength - currentString.length;
    if (targetLength > padString.length) {
      padString += padString.repeat(targetLength / padString.length);
    }
    return padString.slice(0, targetLength) + currentString;
  }
}

export function sanitizeURL(url: string): string {
  let safeURL: string = url;
  if (getURLParameter(safeURL, URLConstants.Parameters.SIGNATURE)) {
    safeURL = setURLParameter(safeURL, URLConstants.Parameters.SIGNATURE, "*****");
  }

  return safeURL;
}

export function sanitizeHeaders(originalHeader: HttpHeaders): HttpHeaders {
  const headers: HttpHeaders = new HttpHeaders();
  for (const header of originalHeader.headersArray()) {
    if (header.name.toLowerCase() === HeaderConstants.AUTHORIZATION.toLowerCase()) {
      headers.set(header.name, "*****");
    } else if (header.name.toLowerCase() === HeaderConstants.X_MS_COPY_SOURCE) {
      headers.set(header.name, sanitizeURL(header.value));
    } else {
      headers.set(header.name, header.value);
    }
  }

  return headers;
}
/**
 * If two strings are equal when compared case insensitive.
 *
 * @param str1 -
 * @param str2 -
 */
export function iEqual(str1: string, str2: string): boolean {
  return str1.toLocaleLowerCase() === str2.toLocaleLowerCase();
}

/**
 * Extracts account name from the url
 * @param url - url to extract the account name from
 * @returns with the account name
 */
export function getAccountNameFromUrl(url: string): string {
  const parsedUrl: URLBuilder = URLBuilder.parse(url);
  let accountName;
  try {
    if (parsedUrl.getHost()!.split(".")[1] === "blob") {
      // `${defaultEndpointsProtocol}://${accountName}.blob.${endpointSuffix}`;
      accountName = parsedUrl.getHost()!.split(".")[0];
    } else if (isIpEndpointStyle(parsedUrl)) {
      // IPv4/IPv6 address hosts... Example - http://192.0.0.10:10001/devstoreaccount1/
      // Single word domain without a [dot] in the endpoint... Example - http://localhost:10001/devstoreaccount1/
      // .getPath() -> /devstoreaccount1/
      accountName = parsedUrl.getPath()!.split("/")[1];
    } else {
      // Custom domain case: "https://customdomain.com/containername/blob".
      accountName = "";
    }
    return accountName;
  } catch (error: any) {
    throw new Error("Unable to extract accountName with provided information.");
  }
}

export function isIpEndpointStyle(parsedUrl: URLBuilder): boolean {
  if (parsedUrl.getHost() === undefined) {
    return false;
  }

  const host =
    parsedUrl.getHost()! + (parsedUrl.getPort() === undefined ? "" : ":" + parsedUrl.getPort());

  // Case 1: Ipv6, use a broad regex to find out candidates whose host contains two ':'.
  // Case 2: localhost(:port), use broad regex to match port part.
  // Case 3: Ipv4, use broad regex which just check if host contains Ipv4.
  // For valid host please refer to https://man7.org/linux/man-pages/man7/hostname.7.html.
  return /^.*:.*:.*$|^localhost(:[0-9]+)?$|^(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])(\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])){3}(:[0-9]+)?$/.test(
    host
  );
}

/**
 * Convert Tags to encoded string.
 *
 * @param tags -
 */
export function toBlobTagsString(tags?: Tags): string | undefined {
  if (tags === undefined) {
    return undefined;
  }

  const tagPairs = [];
  for (const key in tags) {
    if (Object.prototype.hasOwnProperty.call(tags, key)) {
      const value = tags[key];
      tagPairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    }
  }

  return tagPairs.join("&");
}

/**
 * Convert Tags type to BlobTags.
 *
 * @param tags -
 */
export function toBlobTags(tags?: Tags): BlobTags | undefined {
  if (tags === undefined) {
    return undefined;
  }

  const res: BlobTags = {
    blobTagSet: [],
  };

  for (const key in tags) {
    if (Object.prototype.hasOwnProperty.call(tags, key)) {
      const value = tags[key];
      res.blobTagSet.push({
        key,
        value,
      });
    }
  }
  return res;
}

/**
 * Covert BlobTags to Tags type.
 *
 * @param tags -
 */
export function toTags(tags?: BlobTags): Tags | undefined {
  if (tags === undefined) {
    return undefined;
  }

  const res: Tags = {};
  for (const blobTag of tags.blobTagSet) {
    res[blobTag.key] = blobTag.value;
  }
  return res;
}

/**
 * Convert BlobQueryTextConfiguration to QuerySerialization type.
 *
 * @param textConfiguration -
 */
export function toQuerySerialization(
  textConfiguration?:
    | BlobQueryJsonTextConfiguration
    | BlobQueryCsvTextConfiguration
    | BlobQueryArrowConfiguration
    | BlobQueryParquetConfiguration
): QuerySerialization | undefined {
  if (textConfiguration === undefined) {
    return undefined;
  }

  switch (textConfiguration.kind) {
    case "csv":
      return {
        format: {
          type: "delimited",
          delimitedTextConfiguration: {
            columnSeparator: textConfiguration.columnSeparator || ",",
            fieldQuote: textConfiguration.fieldQuote || "",
            recordSeparator: textConfiguration.recordSeparator,
            escapeChar: textConfiguration.escapeCharacter || "",
            headersPresent: textConfiguration.hasHeaders || false,
          },
        },
      };
    case "json":
      return {
        format: {
          type: "json",
          jsonTextConfiguration: {
            recordSeparator: textConfiguration.recordSeparator,
          },
        },
      };
    case "arrow":
      return {
        format: {
          type: "arrow",
          arrowConfiguration: {
            schema: textConfiguration.schema,
          },
        },
      };
    case "parquet":
      return {
        format: {
          type: "parquet",
        },
      };

    default:
      throw Error("Invalid BlobQueryTextConfiguration.");
  }
}

export function parseObjectReplicationRecord(
  objectReplicationRecord?: Record<string, string>
): ObjectReplicationPolicy[] | undefined {
  if (!objectReplicationRecord) {
    return undefined;
  }

  if ("policy-id" in objectReplicationRecord) {
    // If the dictionary contains a key with policy id, we are not required to do any parsing since
    // the policy id should already be stored in the ObjectReplicationDestinationPolicyId.
    return undefined;
  }

  const orProperties: ObjectReplicationPolicy[] = [];
  for (const key in objectReplicationRecord) {
    const ids = key.split("_");
    const policyPrefix = "or-";
    if (ids[0].startsWith(policyPrefix)) {
      ids[0] = ids[0].substring(policyPrefix.length);
    }
    const rule: ObjectReplicationRule = {
      ruleId: ids[1],
      replicationStatus: objectReplicationRecord[key] as ObjectReplicationStatus,
    };
    const policyIndex = orProperties.findIndex((policy) => policy.policyId === ids[0]);
    if (policyIndex > -1) {
      orProperties[policyIndex].rules.push(rule);
    } else {
      orProperties.push({
        policyId: ids[0],
        rules: [rule],
      });
    }
  }
  return orProperties;
}

/**
 * Attach a TokenCredential to an object.
 *
 * @param thing -
 * @param credential -
 */
export function attachCredential<T>(thing: T, credential: TokenCredential): T {
  (thing as any).credential = credential;
  return thing;
}

export function httpAuthorizationToString(
  httpAuthorization?: HttpAuthorization
): string | undefined {
  return httpAuthorization ? httpAuthorization.scheme + " " + httpAuthorization.value : undefined;
}

export function BlobNameToString(name: BlobName): string {
  if (name.encoded) {
    return decodeURIComponent(name.content!);
  } else {
    return name.content!;
  }
}

export function ConvertInternalResponseOfListBlobFlat(
  internalResponse: ListBlobsFlatSegmentResponse
): ListBlobsFlatSegmentResponseModel {
  return {
    ...internalResponse,
    segment: {
      blobItems: internalResponse.segment.blobItems.map((blobItemInteral) => {
        const blobItem: BlobItemInternalModel = {
          ...blobItemInteral,
          name: BlobNameToString(blobItemInteral.name),
        };
        return blobItem;
      }),
    },
  };
}

export function ConvertInternalResponseOfListBlobHierarchy(
  internalResponse: ListBlobsHierarchySegmentResponse
): ListBlobsHierarchySegmentResponseModel {
  return {
    ...internalResponse,
    segment: {
      blobPrefixes: internalResponse.segment.blobPrefixes?.map((blobPrefixInternal) => {
        const blobPrefix: BlobPrefixModel = {
          name: BlobNameToString(blobPrefixInternal.name),
        };
        return blobPrefix;
      }),
      blobItems: internalResponse.segment.blobItems.map((blobItemInteral) => {
        const blobItem: BlobItemInternalModel = {
          ...blobItemInteral,
          name: BlobNameToString(blobItemInteral.name),
        };
        return blobItem;
      }),
    },
  };
}

function decodeBase64String(value: string): Uint8Array {
  if (isNode) {
    return Buffer.from(value, "base64");
  } else {
    const byteString = atob(value);
    const arr = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      arr[i] = byteString.charCodeAt(i);
    }
    return arr;
  }
}

function ParseBoolean(content: any) {
  if (content === undefined) return undefined;
  if (content === "true") return true;
  if (content === "false") return false;
  return undefined;
}

function ParseBlobName(blobNameInXML: any): BlobName {
  if (blobNameInXML["$"] !== undefined && blobNameInXML["#"] !== undefined) {
    return {
      encoded: ParseBoolean(blobNameInXML["$"]["Encoded"]),
      content: blobNameInXML["#"] as string,
    };
  } else {
    return {
      encoded: false,
      content: blobNameInXML as string,
    };
  }
}

function ParseBlobProperties(blobPropertiesInXML: any): BlobPropertiesInternal {
  const blobProperties = blobPropertiesInXML;
  if (blobPropertiesInXML["Creation-Time"]) {
    blobProperties.createdOn = new Date(blobPropertiesInXML["Creation-Time"] as string);
    delete blobProperties["Creation-Time"];
  }

  if (blobPropertiesInXML["Last-Modified"]) {
    blobProperties.lastModified = new Date(blobPropertiesInXML["Last-Modified"] as string);
    delete blobProperties["Last-Modified"];
  }

  if (blobPropertiesInXML["Etag"]) {
    blobProperties.etag = blobPropertiesInXML["Etag"] as string;
    delete blobProperties["Etag"];
  }

  if (blobPropertiesInXML["Content-Length"]) {
    blobProperties.contentLength = parseFloat(blobPropertiesInXML["Content-Length"] as string);
    delete blobProperties["Content-Length"];
  }

  if (blobPropertiesInXML["Content-Type"]) {
    blobProperties.contentType = blobPropertiesInXML["Content-Type"] as string;
    delete blobProperties["Content-Type"];
  }

  if (blobPropertiesInXML["Content-Encoding"]) {
    blobProperties.contentEncoding = blobPropertiesInXML["Content-Encoding"] as string;
    delete blobProperties["Content-Encoding"];
  }

  if (blobPropertiesInXML["Content-Language"]) {
    blobProperties.contentLanguage = blobPropertiesInXML["Content-Language"] as string;
    delete blobProperties["Content-Language"];
  }

  if (blobPropertiesInXML["Content-MD5"]) {
    blobProperties.contentMD5 = decodeBase64String(blobPropertiesInXML["Content-MD5"] as string);
    delete blobProperties["Content-MD5"];
  }

  if (blobPropertiesInXML["Content-Disposition"]) {
    blobProperties.contentDisposition = blobPropertiesInXML["Content-Disposition"] as string;
    delete blobProperties["Content-Disposition"];
  }

  if (blobPropertiesInXML["Cache-Control"]) {
    blobProperties.cacheControl = blobPropertiesInXML["Cache-Control"] as string;
    delete blobProperties["Cache-Control"];
  }

  if (blobPropertiesInXML["x-ms-blob-sequence-number"]) {
    blobProperties.blobSequenceNumber = parseFloat(
      blobPropertiesInXML["x-ms-blob-sequence-number"] as string
    );
    delete blobProperties["x-ms-blob-sequence-number"];
  }

  if (blobPropertiesInXML["BlobType"]) {
    blobProperties.blobType = blobPropertiesInXML["BlobType"] as BlobType;
    delete blobProperties["BlobType"];
  }

  if (blobPropertiesInXML["LeaseStatus"]) {
    blobProperties.leaseStatus = blobPropertiesInXML["LeaseStatus"] as LeaseStatusType;
    delete blobProperties["LeaseStatus"];
  }

  if (blobPropertiesInXML["LeaseState"]) {
    blobProperties.leaseState = blobPropertiesInXML["LeaseState"] as LeaseStateType;
    delete blobProperties["LeaseState"];
  }

  if (blobPropertiesInXML["LeaseDuration"]) {
    blobProperties.leaseDuration = blobPropertiesInXML["LeaseDuration"] as LeaseDurationType;
    delete blobProperties["LeaseDuration"];
  }

  if (blobPropertiesInXML["CopyId"]) {
    blobProperties.copyId = blobPropertiesInXML["CopyId"] as string;
    delete blobProperties["CopyId"];
  }

  if (blobPropertiesInXML["CopyStatus"]) {
    blobProperties.copyStatus = blobPropertiesInXML["CopyStatus"] as CopyStatusType;
    delete blobProperties["CopyStatus"];
  }

  if (blobPropertiesInXML["CopySource"]) {
    blobProperties.copySource = blobPropertiesInXML["CopySource"] as string;
    delete blobProperties["CopySource"];
  }

  if (blobPropertiesInXML["CopyProgress"]) {
    blobProperties.copyProgress = blobPropertiesInXML["CopyProgress"] as string;
    delete blobProperties["CopyProgress"];
  }

  if (blobPropertiesInXML["CopyCompletionTime"]) {
    blobProperties.copyCompletedOn = new Date(blobPropertiesInXML["CopyCompletionTime"] as string);
    delete blobProperties["CopyCompletionTime"];
  }

  if (blobPropertiesInXML["CopyStatusDescription"]) {
    blobProperties.copyStatusDescription = blobPropertiesInXML["CopyStatusDescription"] as string;
    delete blobProperties["CopyStatusDescription"];
  }

  if (blobPropertiesInXML["ServerEncrypted"]) {
    blobProperties.serverEncrypted = ParseBoolean(blobPropertiesInXML["ServerEncrypted"]);
    delete blobProperties["ServerEncrypted"];
  }

  if (blobPropertiesInXML["IncrementalCopy"]) {
    blobProperties.incrementalCopy = ParseBoolean(blobPropertiesInXML["IncrementalCopy"]);
    delete blobProperties["IncrementalCopy"];
  }

  if (blobPropertiesInXML["DestinationSnapshot"]) {
    blobProperties.destinationSnapshot = blobPropertiesInXML["DestinationSnapshot"] as string;
    delete blobProperties["DestinationSnapshot"];
  }

  if (blobPropertiesInXML["DeletedTime"]) {
    blobProperties.deletedOn = new Date(blobPropertiesInXML["DeletedTime"] as string);
    delete blobProperties["DeletedTime"];
  }

  if (blobPropertiesInXML["RemainingRetentionDays"]) {
    blobProperties.remainingRetentionDays = parseFloat(
      blobPropertiesInXML["RemainingRetentionDays"] as string
    );
    delete blobProperties["RemainingRetentionDays"];
  }

  if (blobPropertiesInXML["AccessTier"]) {
    blobProperties.accessTier = blobPropertiesInXML["AccessTier"] as AccessTier;
    delete blobProperties["AccessTier"];
  }

  if (blobPropertiesInXML["AccessTierInferred"]) {
    blobProperties.accessTierInferred = ParseBoolean(blobPropertiesInXML["AccessTierInferred"]);
    delete blobProperties["AccessTierInferred"];
  }

  if (blobPropertiesInXML["ArchiveStatus"]) {
    blobProperties.archiveStatus = blobPropertiesInXML["ArchiveStatus"] as ArchiveStatus;
    delete blobProperties["ArchiveStatus"];
  }

  if (blobPropertiesInXML["CustomerProvidedKeySha256"]) {
    blobProperties.customerProvidedKeySha256 = blobPropertiesInXML[
      "CustomerProvidedKeySha256"
    ] as string;
    delete blobProperties["CustomerProvidedKeySha256"];
  }

  if (blobPropertiesInXML["EncryptionScope"]) {
    blobProperties.encryptionScope = blobPropertiesInXML["EncryptionScope"] as string;
    delete blobProperties["EncryptionScope"];
  }

  if (blobPropertiesInXML["AccessTierChangeTime"]) {
    blobProperties.accessTierChangedOn = new Date(
      blobPropertiesInXML["AccessTierChangeTime"] as string
    );
    delete blobProperties["AccessTierChangeTime"];
  }

  if (blobPropertiesInXML["TagCount"]) {
    blobProperties.tagCount = parseFloat(blobPropertiesInXML["TagCount"] as string);
    delete blobProperties["TagCount"];
  }

  if (blobPropertiesInXML["Expiry-Time"]) {
    blobProperties.expiresOn = new Date(blobPropertiesInXML["Expiry-Time"] as string);
    delete blobProperties["Expiry-Time"];
  }

  if (blobPropertiesInXML["Sealed"]) {
    blobProperties.isSealed = ParseBoolean(blobPropertiesInXML["Sealed"]);
    delete blobProperties["Sealed"];
  }

  if (blobPropertiesInXML["RehydratePriority"]) {
    blobProperties.rehydratePriority = blobPropertiesInXML[
      "RehydratePriority"
    ] as RehydratePriority;
    delete blobProperties["RehydratePriority"];
  }

  if (blobPropertiesInXML["LastAccessTime"]) {
    blobProperties.lastAccessedOn = new Date(blobPropertiesInXML["LastAccessTime"] as string);
    delete blobProperties["LastAccessTime"];
  }

  if (blobPropertiesInXML["ImmutabilityPolicyUntilDate"]) {
    blobProperties.immutabilityPolicyExpiresOn = new Date(
      blobPropertiesInXML["ImmutabilityPolicyUntilDate"] as string
    );
    delete blobProperties["ImmutabilityPolicyUntilDate"];
  }

  if (blobPropertiesInXML["ImmutabilityPolicyMode"]) {
    blobProperties.immutabilityPolicyMode = blobPropertiesInXML[
      "ImmutabilityPolicyMode"
    ] as BlobImmutabilityPolicyMode;
    delete blobProperties["ImmutabilityPolicyMode"];
  }

  if (blobPropertiesInXML["LegalHold"]) {
    blobProperties.legalHold = ParseBoolean(blobPropertiesInXML["LegalHold"]);
    delete blobProperties["LegalHold"];
  }

  return blobProperties;
}

function ParseBlobItem(blobInXML: any): BlobItemInternal {
  const blobItem = blobInXML;
  blobItem.properties = ParseBlobProperties(blobInXML["Properties"]);
  delete blobItem["Properties"];

  blobItem.name = ParseBlobName(blobInXML["Name"]);
  delete blobItem["Name"];
  blobItem.deleted = ParseBoolean(blobInXML["Deleted"])!;
  delete blobItem["Deleted"];

  if (blobInXML["Snapshot"]) {
    blobItem.snapshot = blobInXML["Snapshot"] as string;
    delete blobItem["Snapshot"];
  }

  if (blobInXML["VersionId"]) {
    blobItem.versionId = blobInXML["VersionId"] as string;
    delete blobItem["VersionId"];
  }

  if (blobInXML["IsCurrentVersion"]) {
    blobItem.isCurrentVersion = ParseBoolean(blobInXML["IsCurrentVersion"]);
    delete blobItem["IsCurrentVersion"];
  }

  if (blobInXML["Metadata"]) {
    blobItem.metadata = blobInXML["Metadata"];
    delete blobItem["Metadata"];
  }

  if (blobInXML["Tags"]) {
    blobItem.blobTags = ParseBlobTags(blobInXML["Tags"]);
    delete blobItem["Tags"];
  }

  if (blobInXML["OrMetadata"]) {
    blobItem.objectReplicationMetadata = blobInXML["OrMetadata"];
    delete blobItem["OrMetadata"];
  }

  if (blobInXML["HasVersionsOnly"]) {
    blobItem.hasVersionsOnly = ParseBoolean(blobInXML["HasVersionsOnly"]);
    delete blobItem["HasVersionsOnly"];
  }
  return blobItem;
}

function ParseBlobPrefix(blobPrefixInXML: any): BlobPrefix {
  return {
    name: ParseBlobName(blobPrefixInXML["Name"]),
  };
}

function ParseBlobTag(blobTagInXML: any): BlobTag {
  return {
    key: blobTagInXML["Key"],
    value: blobTagInXML["Value"],
  };
}

function ParseBlobTags(blobTagsInXML: any): BlobTags | undefined {
  if (
    blobTagsInXML === undefined ||
    blobTagsInXML["TagSet"] === undefined ||
    blobTagsInXML["TagSet"]["Tag"] === undefined
  ) {
    return undefined;
  }

  const blobTagSet = [];
  if (blobTagsInXML["TagSet"]["Tag"] instanceof Array) {
    blobTagsInXML["TagSet"]["Tag"].forEach((blobTagInXML: any) => {
      blobTagSet.push(ParseBlobTag(blobTagInXML));
    });
  } else {
    blobTagSet.push(ParseBlobTag(blobTagsInXML["TagSet"]["Tag"]));
  }

  return { blobTagSet: blobTagSet };
}

export function ProcessBlobItems(blobArrayInXML: any[]): BlobItemInternal[] {
  const blobItems = [];

  if (blobArrayInXML instanceof Array) {
    blobArrayInXML.forEach((blobInXML: any) => {
      blobItems.push(ParseBlobItem(blobInXML));
    });
  } else {
    blobItems.push(ParseBlobItem(blobArrayInXML));
  }

  return blobItems;
}

export function ProcessBlobPrefixes(blobPrefixesInXML: any[]): BlobPrefix[] {
  const blobPrefixes = [];

  if (blobPrefixesInXML instanceof Array) {
    blobPrefixesInXML.forEach((blobPrefixInXML: any) => {
      blobPrefixes.push(ParseBlobPrefix(blobPrefixInXML));
    });
  } else {
    blobPrefixes.push(ParseBlobPrefix(blobPrefixesInXML));
  }

  return blobPrefixes;
}

export function* ExtractPageRangeInfoItems(
  getPageRangesSegment: PageBlobGetPageRangesDiffResponseModel
): IterableIterator<PageRangeInfo> {
  let pageRange: PageRange[] = [];
  let clearRange: ClearRange[] = [];

  if (getPageRangesSegment.pageRange) pageRange = getPageRangesSegment.pageRange;
  if (getPageRangesSegment.clearRange) clearRange = getPageRangesSegment.clearRange;

  let pageRangeIndex = 0;
  let clearRangeIndex = 0;

  while (pageRangeIndex < pageRange.length && clearRangeIndex < clearRange.length) {
    if (pageRange[pageRangeIndex].start < clearRange[clearRangeIndex].start) {
      yield {
        start: pageRange[pageRangeIndex].start,
        end: pageRange[pageRangeIndex].end,
        isClear: false,
      };
      ++pageRangeIndex;
    } else {
      yield {
        start: clearRange[clearRangeIndex].start,
        end: clearRange[clearRangeIndex].end,
        isClear: true,
      };
      ++clearRangeIndex;
    }
  }

  for (; pageRangeIndex < pageRange.length; ++pageRangeIndex) {
    yield {
      start: pageRange[pageRangeIndex].start,
      end: pageRange[pageRangeIndex].end,
      isClear: false,
    };
  }

  for (; clearRangeIndex < clearRange.length; ++clearRangeIndex) {
    yield {
      start: clearRange[clearRangeIndex].start,
      end: clearRange[clearRangeIndex].end,
      isClear: true,
    };
  }
}
