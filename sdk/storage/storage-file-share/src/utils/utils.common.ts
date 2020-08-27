// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { AbortSignalLike } from "@azure/abort-controller";
import { HttpHeaders, isNode, URLBuilder } from "@azure/core-http";
import { HeaderConstants, URLConstants } from "./constants";

/**
 * Reserved URL characters must be properly escaped for Storage services like Blob or File.
 *
 * ## URL encode and escape strategy for JS SDKs
 *
 * When customers pass a URL string into XXXClient classes constructor, the URL string may already be URL encoded or not.
 * But before sending to Azure Storage server, the URL must be encoded. However, it's hard for a SDK to guess whether the URL
 * string has been encoded or not. We have 2 potential strategies, and chose strategy two for the XXXClient constructors.
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
 * If customer needs to create a blob with "%" in it's blob name, use "%25" insead of "%". Just like above 3rd sample.
 * And following URL strings are invalid:
 * - "http://account.blob.core.windows.net/con/b%"
 * - "http://account.blob.core.windows.net/con/b%2"
 * - "http://account.blob.core.windows.net/con/b%G"
 *
 * Another special character is "?", use "%2F" to represent a blob name with "?" in a URL string.
 *
 * ### Strategy for containerName, blobName or other specific XXXName parameters in methods such as `ContainerClient.getBlobClient(blobName)`
 *
 * We will apply strategy one, and call encodeURIComponent for these parameters like blobName. Because what customers passes in is a plain name instead of a URL.
 *
 * @see https://docs.microsoft.com/en-us/rest/api/storageservices/naming-and-referencing-containers--blobs--and-metadata
 * @see https://docs.microsoft.com/en-us/rest/api/storageservices/naming-and-referencing-shares--directories--files--and-metadata
 *
 * @export
 * @param {string} url
 * @returns {string}
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
}

function getValueInConnString(
  connectionString: string,
  argument:
    | "FileEndpoint"
    | "AccountName"
    | "AccountKey"
    | "DefaultEndpointsProtocol"
    | "EndpointSuffix"
    | "SharedAccessSignature"
) {
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
 * @export
 * @param {string} connectionString Connection string.
 * @returns {ConnectionString} String key value pairs of the storage account's url and credentials.
 */
export function extractConnectionStringParts(connectionString: string): ConnectionString {
  // Matching FileEndpoint in the Account connection string
  let fileEndpoint = getValueInConnString(connectionString, "FileEndpoint");
  // Slicing off '/' at the end if exists
  // (The methods that use `extractConnectionStringParts` expect the url to not have `/` at the end)
  fileEndpoint = fileEndpoint.endsWith("/") ? fileEndpoint.slice(0, -1) : fileEndpoint;

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

    if (!fileEndpoint) {
      // FileEndpoint is not present in the Account connection string
      // Can be obtained from `${defaultEndpointsProtocol}://${accountName}.file.${endpointSuffix}`

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
      fileEndpoint = `${defaultEndpointsProtocol}://${accountName}.file.${endpointSuffix}`;
    }

    if (!accountName) {
      throw new Error("Invalid AccountName in the provided Connection String");
    } else if (accountKey.length === 0) {
      throw new Error("Invalid AccountKey in the provided Connection String");
    }

    return {
      kind: "AccountConnString",
      url: fileEndpoint,
      accountName,
      accountKey
    };
  } else {
    // SAS connection string
    let accountSas = getValueInConnString(connectionString, "SharedAccessSignature");
    let accountName = getAccountNameFromUrl(fileEndpoint);
    if (!fileEndpoint) {
      throw new Error("Invalid FileEndpoint in the provided SAS Connection String");
    } else if (!accountSas) {
      throw new Error("Invalid SharedAccessSignature in the provided SAS Connection String");
    }

    return { kind: "SASConnString", url: fileEndpoint, accountName, accountSas };
  }
}

/**
 * Internal escape method implemented Strategy Two mentioned in escapeURL() description.
 *
 * @param {string} text
 * @returns {string}
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
 * @export
 * @param {string} url Source URL string
 * @param {string} name String to be appended to URL
 * @returns {string} An updated URL string
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
 * @export
 * @param {string} url Source URL string
 * @param {string} name Parameter name
 * @param {string} [value] Parameter value
 * @returns {string} An updated URL string
 */
export function setURLParameter(url: string, name: string, value?: string): string {
  const urlParsed = URLBuilder.parse(url);
  urlParsed.setQueryParameter(name, value);
  return urlParsed.toString();
}

/**
 * Get URL parameter by name.
 *
 * @export
 * @param {string} url
 * @param {string} name
 * @returns {(string | string[] | undefined)}
 */
export function getURLParameter(url: string, name: string): string | string[] | undefined {
  const urlParsed = URLBuilder.parse(url);
  return urlParsed.getQueryParameterValue(name);
}

/**
 * Set URL host.
 *
 * @export
 * @param {string} url Source URL string
 * @param {string} host New host string
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
 * @export
 * @param {string} url Source URL string
 * @returns {(string | undefined)}
 */
export function getURLPath(url: string): string | undefined {
  const urlParsed = URLBuilder.parse(url);
  return urlParsed.getPath();
}

/**
 * Get URL query key value pairs from an URL string.
 *
 * @export
 * @param {string} url
 * @returns {{[key: string]: string}}
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
    return indexOfEqual > 0 && indexOfEqual === lastIndexOfEqual;
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
 * Rounds a date off to seconds.
 *
 * @export
 * @param {Date} date
 * @param {boolean} [withMilliseconds=true] If true, YYYY-MM-DDThh:mm:ss.fffffffZ will be returned;
 *                                          If false, YYYY-MM-DDThh:mm:ssZ will be returned.
 * @returns {string} Date string in ISO8061 format, with or without 7 milliseconds component
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
 * @export
 * @param {string} content
 * @returns {string}
 */
export function base64encode(content: string): string {
  return !isNode ? btoa(content) : Buffer.from(content).toString("base64");
}

/**
 * Base64 decode.
 *
 * @export
 * @param {string} encodedString
 * @returns {string}
 */
export function base64decode(encodedString: string): string {
  return !isNode ? atob(encodedString) : Buffer.from(encodedString, "base64").toString();
}

/**
 * Delay specified time interval.
 *
 * @export
 * @param {number} timeInMs
 * @param {AbortSignalLike} [aborter]
 * @param {Error} [abortError]
 */
export async function delay(timeInMs: number, aborter?: AbortSignalLike, abortError?: Error) {
  return new Promise((resolve, reject) => {
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
 * @export
 * @param {string} currentString
 * @param {number} targetLength
 * @param {string} [padString=" "]
 * @returns {string}
 */
export function padStart(
  currentString: string,
  targetLength: number,
  padString: string = " "
): string {
  // TS doesn't know this code needs to run downlevel sometimes.
  // @ts-expect-error
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
    if (header.name.toLowerCase() === HeaderConstants.AUTHORIZATION) {
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
 * Extracts account name from the url
 * @param {string} url url to extract the account name from
 * @returns {string} with the account name
 */
export function getAccountNameFromUrl(url: string): string {
  const parsedUrl: URLBuilder = URLBuilder.parse(url);
  let accountName;
  try {
    if (parsedUrl.getHost()!.split(".")[1] === "file") {
      // `${defaultEndpointsProtocol}://${accountName}.file.${endpointSuffix}`;
      // Slicing off '/' at the end if exists
      url = url.endsWith("/") ? url.slice(0, -1) : url;

      accountName = parsedUrl.getHost()!.split(".")[0];
    } else if (isIpEndpointStyle(parsedUrl)) {
      // IPv4/IPv6 address hosts... Example - http://192.0.0.10:10001/devstoreaccount1/
      // Single word domain without a [dot] in the endpoint... Example - http://localhost:10001/devstoreaccount1/
      // .getPath() -> /devstoreaccount1/
      accountName = parsedUrl.getPath()!.split("/")[1];
    } else {
      // Custom domain case: "https://customdomain.com/containername/blob".
      accountName = '';
    }
    return accountName;
  } catch (error) {
    throw new Error("Unable to extract accountName with provided information.");
  }
}

export function isIpEndpointStyle(parsedUrl: URLBuilder): boolean {
  if (parsedUrl.getHost() == undefined) {
    return false;
  }

  const host = parsedUrl.getHost()! + (parsedUrl.getPort() == undefined ? '' : ':' + parsedUrl.getPort());

  // Case 1: Ipv6, use a broad regex to find out candidates whose host contains two ':'.
  // Case 2: localhost(:port), use broad regex to match port part.
  // Case 3: Ipv4, use broad regex which just check if host contains Ipv4.
  // For valid host please refer to https://man7.org/linux/man-pages/man7/hostname.7.html.
  return /^.*:.*:.*$|^localhost(:[0-9]+)?$|^(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])(\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])){3}(:[0-9]+)?$/.test(host);
}

export function getShareNameAndPathFromUrl(
  url: string
): { baseName: string; shareName: string; path: string } {
  //  URL may look like the following
  // "https://myaccount.file.core.windows.net/myshare/mydirectory/file?sasString";
  // "https://myaccount.file.core.windows.net/myshare/mydirectory/file";
  // "https://myaccount.file.core.windows.net/myshare/mydirectory?sasString";
  // "https://myaccount.file.core.windows.net/myshare/mydirectory";
  // "https://myaccount.file.core.windows.net/myshare?sasString";
  // "https://myaccount.file.core.windows.net/myshare";
  // IPv4/IPv6 address hosts, Endpoints - `http://187.24.0.1:1000/devstoreaccount1/mydirectory/file`
  // http://localhost:1000/devstoreaccount1/mydirectory/file
  // mydirectory can consist of multiple directories - dir1/dir2/dir3

  let shareName;
  let path;
  let baseName;

  try {
    const parsedUrl = URLBuilder.parse(url);
    if (parsedUrl.getHost()!.split(".")[1] === "file") {
      // "https://myaccount.file.core.windows.net/myshare/mydirectory/file";
      // .getPath() -> /myshare/mydirectory/file
      const pathComponents = parsedUrl.getPath()!.match("/([^/]*)(/(.*))?");
      shareName = pathComponents![1];
      path = pathComponents![3];
    } else if (isIpEndpointStyle(parsedUrl)) {
      // IPv4/IPv6 address hosts... Example - http://187.24.0.1:1000/devstoreaccount1/mydirectory/file
      // Single word domain without a [dot] in the endpoint... Example - http://localhost:1000/devstoreaccount1/mydirectory/file
      // .getPath() -> /devstoreaccount1/mydirectory/file
      const pathComponents = parsedUrl.getPath()!.match("/([^/]*)/([^/]*)(/(.*))?");
      shareName = pathComponents![2];
      path = pathComponents![4];
    } else {
      // "https://customdomain.com/myshare/mydirectory/file";
      // .getPath() -> /myshare/mydirectory/file
      const pathComponents = parsedUrl.getPath()!.match("/([^/]*)(/(.*))?");
      shareName = pathComponents![1];
      path = pathComponents![3];
    }

    // decode the encoded shareName and filePath - to get all the special characters that might be present in it
    shareName = decodeURIComponent(shareName);
    path = decodeURIComponent(path);

    // Cast to string is required as TypeScript cannot infer that split() always returns
    // an array with length >= 1
    baseName = path.split("/").pop() as string;

    if (!shareName) {
      throw new Error("Provided shareName is invalid.");
    } else {
      return { baseName, shareName, path };
    }
  } catch (error) {
    throw new Error(
      "Unable to extract shareName and filePath/directoryPath with provided information."
    );
  }
}
