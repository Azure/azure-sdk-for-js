// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { URLBuilder, isNode } from "@azure/core-http";
import { TableServiceClientOptions } from "../generatedModels";
import { SharedKeyCredential } from "../SharedKeyCredential";

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
    | "TableEndpoint"
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
 * Extracts the parts of an Storage account connection string.
 *
 * @export
 * @param {string} connectionString Connection string.
 * @returns {ConnectionString} String key value pairs of the storage account's url and credentials.
 */
export function extractConnectionStringParts(connectionString: string): ConnectionString {
  // Matching TableEndpoint in the Account connection string
  let tableEndpoint = getValueInConnString(connectionString, "TableEndpoint");
  // Slicing off '/' at the end if exists
  // (The methods that use `extractConnectionStringParts` expect the url to not have `/` at the end)
  tableEndpoint = tableEndpoint.endsWith("/") ? tableEndpoint.slice(0, -1) : tableEndpoint;

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

    if (!tableEndpoint) {
      // TableEndpoint is not present in the Account connection string
      // Can be obtained from `${defaultEndpointsProtocol}://${accountName}.table.${endpointSuffix}`

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
      tableEndpoint = `${defaultEndpointsProtocol}://${accountName}.table.${endpointSuffix}`;
    }

    if (!accountName) {
      throw new Error("Invalid AccountName in the provided Connection String");
    } else if (accountKey.length === 0) {
      throw new Error("Invalid AccountKey in the provided Connection String");
    }

    return {
      kind: "AccountConnString",
      url: tableEndpoint,
      accountName,
      accountKey
    };
  } else {
    // SAS connection string

    let accountName = getAccountNameFromUrl(tableEndpoint);
    let accountSas = getValueInConnString(connectionString, "SharedAccessSignature");
    if (!tableEndpoint) {
      throw new Error("Invalid TableEndpoint in the provided SAS Connection String");
    } else if (!accountSas) {
      throw new Error("Invalid SharedAccessSignature in the provided SAS Connection String");
    } else if (!accountName) {
      throw new Error("Invalid AccountName in the provided SAS Connection String");
    }

    return { kind: "SASConnString", url: tableEndpoint, accountName, accountSas };
  }
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

export interface ClientParamsFromConnectionString {
  url: string;
  options: TableServiceClientOptions;
}

export function clientParamsFromConnectionString(
  connectionString: string,
  options?: TableServiceClientOptions
) {
  const extractedCreds = extractConnectionStringParts(connectionString);
  if (extractedCreds.kind === "AccountConnString") {
    if (isNode) {
      const sharedKeyCredential = new SharedKeyCredential(
        extractedCreds.accountName!,
        extractedCreds.accountKey
      );
      const optionsWithCredentials: TableServiceClientOptions = {
        ...options,
        requestPolicyFactories: (defaultFactories) => [...defaultFactories, sharedKeyCredential]
      };

      return {
        url: extractedCreds.url,
        options: optionsWithCredentials
      };
    } else {
      throw new Error("Account connection string is only supported in Node.js environment");
    }
  } else if (extractedCreds.kind === "SASConnString") {
    return {
      url: `${extractedCreds.url}?${extractedCreds.accountSas}`,
      options
    };
  } else {
    throw new Error(
      "Connection string must be either an Account connection string or a SAS connection string"
    );
  }
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
    if (parsedUrl.getHost()!.split(".")[1] === "table") {
      // `${defaultEndpointsProtocol}://${accountName}.table.${endpointSuffix}`;
      // Slicing off '/' at the end if exists
      url = url.endsWith("/") ? url.slice(0, -1) : url;

      accountName = parsedUrl.getHost()!.split(".")[0];
    } else {
      // IPv4/IPv6 address hosts... Example - http://192.0.0.10:10001/devstoreaccount1/
      // Single word domain without a [dot] in the endpoint... Example - http://localhost:10001/devstoreaccount1/
      // .getPath() -> /devstoreaccount1/
      accountName = parsedUrl.getPath()!.split("/")[1];
    }

    if (!accountName) {
      throw new Error("Provided accountName is invalid.");
    }
    return accountName;
  } catch (error) {
    throw new Error("Unable to extract accountName with provided information.");
  }
}
