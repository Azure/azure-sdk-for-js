// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as fs from "fs";
import { HttpHeaders, isNode, URLBuilder } from "@azure/core-http";
import { HeaderConstants, URLConstants } from "./constants";

/**
 * Reserved URL characters must be properly escaped for Storage services like Blob or File.
 *
 * ## URL encode and escape strategy for JS SDKs
 *
 * When customers pass a URL string into XxxClient classes constrcutor, the URL string may already be URL encoded or not.
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
 * If customer needs to create a blob with "%" in it's blob name, use "%25" insead of "%". Just like above 3rd sample.
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

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * Extracts the parts of an Azure Storage account connection string.
 *
 * @export
 * @param {string} connectionString Connection string.
 * @returns {{ [key: string]: any }} String key value pairs of the storage account's base url for Blob, account name, and account key.
 */
export function extractConnectionStringParts(connectionString: string): { [key: string]: any } {
  const matchCredentials = connectionString.match(
    "DefaultEndpointsProtocol=(.*);AccountName=(.*);AccountKey=(.*);EndpointSuffix=(.*)"
  );

  let defaultEndpointsProtocol;
  let accountName;
  let accountKey;
  let endpointSuffix;

  try {
    defaultEndpointsProtocol = matchCredentials![1] || "";
    accountName = matchCredentials![2] || "";
    accountKey = Buffer.from(matchCredentials![3], "base64");
    endpointSuffix = matchCredentials![4] || "";
  } catch (err) {
    throw new Error("Invalid Connection String");
  }

  const protocol = defaultEndpointsProtocol.toLowerCase();
  if (protocol !== "https" && protocol !== "http") {
    throw new Error(
      "Invalid DefaultEndpointsProtocol in the provided Connection String. Expecting 'https' or 'http'"
    );
  } else if (!accountName) {
    throw new Error("Invalid AccountName in the provided Connection String");
  } else if (accountKey.length === 0) {
    throw new Error("Invalid AccountKey in the provided Connection String");
  } else if (!endpointSuffix) {
    throw new Error("Invalid EndpointSuffix in the provided Connection String");
  }

  const url = `${defaultEndpointsProtocol}://${accountName}.blob.${endpointSuffix}`;

  return {
    url: url,
    accountName: accountName,
    accountKey: accountKey
  };
}
/**
 * Internal escape method implmented Strategy Two mentioned in escapeURL() description.
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
 * Generate a 64 bytes base64 block ID string.
 *
 * @export
 * @param {number} blockIndex
 * @returns {string}
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
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * Writes the content of a readstream to a local file. Returns a Promise which is completed after the file handle is closed.
 * If Promise is rejected, the reason will be set to the first error raised by either the
 * ReadableStream or the fs.WriteStream.
 *
 * @export
 * @param {NodeJS.ReadableStream} rs The read stream.
 * @param {string} file Destination file path.
 * @returns {Promise<void>}
 */
export async function readStreamToLocalFile(
  rs: NodeJS.ReadableStream,
  file: string
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const ws = fs.createWriteStream(file);

    // Set STREAM_DEBUG env var to log stream events while running tests
    if (process.env.STREAM_DEBUG) {
      rs.on("close", () => console.log("rs.close"));
      rs.on("data", () => console.log("rs.data"));
      rs.on("end", () => console.log("rs.end"));
      rs.on("error", () => console.log("rs.error"));

      ws.on("close", () => console.log("ws.close"));
      ws.on("drain", () => console.log("ws.drain"));
      ws.on("error", () => console.log("ws.error"));
      ws.on("finish", () => console.log("ws.finish"));
      ws.on("pipe", () => console.log("ws.pipe"));
      ws.on("unpipe", () => console.log("ws.unpipe"));
    }

    let error: Error;

    rs.on("error", (err: Error) => {
      // First error wins
      if (!error) {
        error = err;
      }

      // When rs.error is raised, rs.end will never be raised automatically, so it must be raised manually
      // to ensure ws.close is eventually raised.
      rs.emit("end");
    });

    ws.on("error", (err: Error) => {
      // First error wins
      if (!error) {
        error = err;
      }
    });

    ws.on("close", () => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });

    rs.pipe(ws);
  });
}
