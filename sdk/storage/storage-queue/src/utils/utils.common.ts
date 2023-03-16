// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { AbortSignalLike } from "@azure/abort-controller";
import { HttpHeaders, createHttpHeaders } from "@azure/core-rest-pipeline";
import {
  HeaderConstants,
  URLConstants,
  DevelopmentConnectionString,
  PathStylePorts,
} from "./constants";
import { StorageClient as GeneratedStorageClient } from "../generated/src/storageClient";
import { Pipeline, StoragePipelineOptions } from "@azure/storage-common";
import { ExtendedServiceClientOptions } from "@azure/core-http-compat";
import { HttpClient, Pipeline as CorePipeline } from "@azure/core-rest-pipeline";

let testOnlyHttpClient: HttpClient | undefined;

/**
 * Append a string to URL path. Will remove duplicated "/" in front of the string
 * when URL path ends with a "/".
 *
 * @param url - Source URL string
 * @param name - String to be appended to URL
 * @returns An updated URL string
 */
export function appendToURLPath(url: string, name: string): string {
  const urlParsed = new URL(url);

  let path = urlParsed.pathname;
  path = path ? (path.endsWith("/") ? `${path}${name}` : `${path}/${name}`) : name;
  urlParsed.pathname = path;

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
  const urlParsed = new URL(url);
  const encodedName = encodeURIComponent(name);
  const encodedValue = value ? encodeURIComponent(value) : undefined;
  // mutating searchParams will change the encoding, so we have to do this ourselves
  const searchString = urlParsed.search === "" ? "?" : urlParsed.search;

  const searchPieces: string[] = [];

  for (const pair of searchString.slice(1).split("&")) {
    if (pair) {
      const [key] = pair.split("=", 2);
      if (key !== encodedName) {
        searchPieces.push(pair);
      }
    }
  }
  if (encodedValue) {
    searchPieces.push(`${encodedName}=${encodedValue}`);
  }

  urlParsed.search = searchPieces.length ? `?${searchPieces.join("&")}` : "";
  return urlParsed.toString();
}

/**
 * Get URL parameter by name.
 *
 * @param url - URL string
 * @param name - Parameter name
 * @returns Parameter value(s) for the given parameter name.
 */
export function getURLParameter(url: string, name: string): string | string[] | undefined {
  const urlParsed = new URL(url);
  return urlParsed.searchParams.get(name) ?? undefined;
}

/**
 * Set URL host.
 *
 * @param url - Source URL string
 * @param host - New host string
 * @returns An updated URL string
 */
export function setURLHost(url: string, host: string): string {
  const urlParsed = new URL(url);
  urlParsed.hostname = host;
  return urlParsed.toString();
}

/**
 * Gets URL path from an URL string.
 *
 * @param url - Source URL string
 * @returns The path part of the given URL string.
 */
export function getURLPath(url: string): string | undefined {
  try {
    const urlParsed = new URL(url);
    return urlParsed.pathname;
  } catch (e) {
    return undefined;
  }
}

/**
 * Gets URL query key value pairs from an URL string.
 *
 * @param url -
 * @returns query key value string pairs from the given URL string.
 */
export function getURLQueries(url: string): { [key: string]: string } {
  let queryString = new URL(url).search;
  if (!queryString) {
    return {};
  }

  queryString = queryString.trim();
  queryString = queryString.startsWith("?") ? queryString.substring(1) : queryString;

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

/**
 *
 * @param connectionString - Account connection string.
 * @param argument - property to get value from the connection string.
 * @returns Value of the property specified in argument.
 */
export function getValueInConnString(
  connectionString: string,
  argument:
    | "QueueEndpoint"
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

  // Matching QueueEndpoint in the Account connection string
  let queueEndpoint = getValueInConnString(connectionString, "QueueEndpoint");
  // Slicing off '/' at the end if exists
  // (The methods that use `extractConnectionStringParts` expect the url to not have `/` at the end)
  queueEndpoint = queueEndpoint.endsWith("/") ? queueEndpoint.slice(0, -1) : queueEndpoint;

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

    if (!queueEndpoint) {
      // QueueEndpoint is not present in the Account connection string
      // Can be obtained from `${defaultEndpointsProtocol}://${accountName}.queue.${endpointSuffix}`

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
      queueEndpoint = `${defaultEndpointsProtocol}://${accountName}.queue.${endpointSuffix}`;
    }

    if (!accountName) {
      throw new Error("Invalid AccountName in the provided Connection String");
    } else if (accountKey.length === 0) {
      throw new Error("Invalid AccountKey in the provided Connection String");
    }

    return {
      kind: "AccountConnString",
      url: queueEndpoint,
      accountName,
      accountKey,
      proxyUri,
    };
  } else {
    // SAS connection string

    const accountSas = getValueInConnString(connectionString, "SharedAccessSignature");
    const accountName = getAccountNameFromUrl(queueEndpoint);
    if (!queueEndpoint) {
      throw new Error("Invalid QueueEndpoint in the provided SAS Connection String");
    } else if (!accountSas) {
      throw new Error("Invalid SharedAccessSignature in the provided SAS Connection String");
    }

    return { kind: "SASConnString", url: queueEndpoint, accountName, accountSas };
  }
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
    /* eslint-disable-next-line prefer-const*/
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
 * Sanitizes a url by removing the Signature parameter
 * @param url - to sanitize
 * @returns sanitized string
 */
export function sanitizeURL(url: string): string {
  let safeURL: string = url;
  if (getURLParameter(safeURL, URLConstants.Parameters.SIGNATURE)) {
    safeURL = setURLParameter(safeURL, URLConstants.Parameters.SIGNATURE, "*****");
  }

  return safeURL;
}

/**
 * Sanitize headers by removing sensitive values such as AUTHORIZATION and X_MS_COPY_SOURCE
 * @param originalHeader - original headers
 * @returns sanitized headers
 */
export function sanitizeHeaders(originalHeaders: HttpHeaders): HttpHeaders {
  const headers: HttpHeaders = createHttpHeaders();
  for (const [name, value] of originalHeaders) {
    if (name.toLowerCase() === HeaderConstants.AUTHORIZATION) {
      headers.set(name, "*****");
    } else if (name.toLowerCase() === HeaderConstants.X_MS_COPY_SOURCE) {
      headers.set(name, sanitizeURL(value));
    } else {
      headers.set(name, value);
    }
  }

  return headers;
}

/**
 * Extracts account name from the url
 * @param url - url to extract the account name from
 * @returns with the account name
 */
export function getAccountNameFromUrl(url: string): string {
  const parsedUrl = new URL(url);
  let accountName;
  try {
    if (parsedUrl.hostname.split(".")[1] === "blob") {
      // `${defaultEndpointsProtocol}://${accountName}.blob.${endpointSuffix}`;
      accountName = parsedUrl.hostname.split(".")[0];
    } else if (isIpEndpointStyle(parsedUrl)) {
      // IPv4/IPv6 address hosts... Example - http://192.0.0.10:10001/devstoreaccount1/
      // Single word domain without a [dot] in the endpoint... Example - http://localhost:10001/devstoreaccount1/
      // .getPath() -> /devstoreaccount1/
      accountName = parsedUrl.pathname.split("/")[1];
    } else {
      // Custom domain case: "https://customdomain.com/containername/blob".
      accountName = "";
    }
    return accountName;
  } catch (error: any) {
    throw new Error("Unable to extract accountName with provided information.");
  }
}

export function isIpEndpointStyle(parsedUrl: URL): boolean {
  const host = parsedUrl.host;

  // Case 1: Ipv6, use a broad regex to find out candidates whose host contains two ':'.
  // Case 2: localhost(:port), use broad regex to match port part.
  // Case 3: Ipv4, use broad regex which just check if host contains Ipv4.
  // For valid host please refer to https://man7.org/linux/man-pages/man7/hostname.7.html.
  return (
    /^.*:.*:.*$|^localhost(:[0-9]+)?$|^(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])(\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])){3}(:[0-9]+)?$/.test(
      host
    ) ||
    (Boolean(parsedUrl.port) && PathStylePorts.includes(parsedUrl.port))
  );
}

/**
 * Gets a new StorageClientContext
 * @param url - Url used for the StorageClientContext
 * @param pipeline - a pipeline containing HTTP request policies
 * @returns new StorageClientContext
 */
export function getStorageClientContext(url: string, pipeline: Pipeline): GeneratedStorageClient {
  const storageClientContext = new GeneratedStorageClient(url, getCoreClientOptions(pipeline));

  // Override protocol layer's default content-type
  (storageClientContext as any).requestContentType = undefined;
  return storageClientContext;
}

// This function relies on the Pipeline already being initialized by a storage-blob client
function getCoreClientOptions(pipeline: Pipeline): ExtendedServiceClientOptions {
  const { httpClient: v1Client, ...restOptions } = pipeline.options as StoragePipelineOptions;
  let httpClient: HttpClient = (pipeline as any)._coreHttpClient;
  if (!httpClient) {
    throw new Error("Pipeline not correctly initialized; missing V2 HttpClient");
  }

  // check if we're running in a browser test mode and use the xhr client
  if (testOnlyHttpClient && httpClient !== testOnlyHttpClient) {
    httpClient = testOnlyHttpClient;
    (pipeline as any)._coreHttpClient = testOnlyHttpClient;
  }

  const corePipeline: CorePipeline = (pipeline as any)._corePipeline;
  if (!corePipeline) {
    throw new Error("Pipeline not correctly initialized; missing V2 Pipeline");
  }
  return {
    ...restOptions,
    httpClient,
    pipeline: corePipeline,
  };
}

/**
 * Append a string to URL query.
 *
 * @param url - Source URL string.
 * @param queryParts - String to be appended to the URL query.
 * @returns An updated URL string.
 */
export function appendToURLQuery(url: string, queryParts: string): string {
  const urlParsed = new URL(url);

  let query = urlParsed.search;
  if (query) {
    query += "&" + queryParts;
  } else {
    query = queryParts;
  }

  urlParsed.search = query;
  return urlParsed.toString();
}
