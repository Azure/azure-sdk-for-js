// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TableServiceClientOptions } from "../models";
import { fromAccountConnectionString, getAccountConnectionString } from "./accountConnectionString";
import { ClientParamsFromConnectionString, ConnectionString } from "./internalModels";
import { URL } from "./url";

const DevelopmentConnectionString =
  "DefaultEndpointsProtocol=http;AccountName=devstoreaccount1;AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==;TableEndpoint=http://127.0.0.1:10002/devstoreaccount1";

/**
 * This function parses a connection string into a set of
 * parameters to pass to be passed to TableClientService,
 * depending on the connection string type these parameter would
 * contain:
 * - Account Connection String:  A pipeline to sign the request with a SharedKey
 * - SAS Connection String: Attach a SAS token to the storage account url for authentication
 * @param connectionString - Connection string to parse
 * @param options - TableService client options
 */
export function getClientParamsFromConnectionString(
  connectionString: string,
  options?: TableServiceClientOptions
): ClientParamsFromConnectionString {
  if (connectionString.toLowerCase().indexOf("usedevelopmentstorage=true") !== -1) {
    connectionString = DevelopmentConnectionString;
  }
  const extractedCreds = extractConnectionStringParts(connectionString);
  if (extractedCreds.kind === "AccountConnString") {
    return fromAccountConnectionString(extractedCreds, options);
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
 * Extracts the parts of an Storage account connection string.
 *
 * @param connectionString - Connection string.
 * @returns String key value pairs of the storage account's url and credentials.
 */
export function extractConnectionStringParts(connectionString: string): ConnectionString {
  // Matching TableEndpoint in the Account connection string
  let tableEndpoint = getValueInConnString(connectionString, "TableEndpoint");
  // Slicing off '/' at the end if exists
  // (The methods that use `extractConnectionStringParts` expect the url to not have `/` at the end)
  tableEndpoint = tableEndpoint.endsWith("/") ? tableEndpoint.slice(0, -1) : tableEndpoint;

  const isAccountConnectionString =
    connectionString.search("DefaultEndpointsProtocol=") !== -1 &&
    connectionString.search("AccountKey=") !== -1;

  if (isAccountConnectionString) {
    return getAccountConnectionString(
      getValueInConnString(connectionString, "AccountName"),
      getValueInConnString(connectionString, "AccountKey"),
      getValueInConnString(connectionString, "DefaultEndpointsProtocol"),
      getValueInConnString(connectionString, "EndpointSuffix"),
      tableEndpoint
    );
  } else {
    return getSASConnectionString(connectionString, tableEndpoint);
  }
}

function getSASConnectionString(connectionString: string, tableEndpoint: string): ConnectionString {
  const accountName = getAccountNameFromUrl(tableEndpoint);
  const accountSas = getValueInConnString(connectionString, "SharedAccessSignature");
  if (!tableEndpoint) {
    throw new Error("Invalid TableEndpoint in the provided SAS Connection String");
  } else if (!accountSas) {
    throw new Error("Invalid SharedAccessSignature in the provided SAS Connection String");
  } else if (!accountName) {
    throw new Error("Invalid AccountName in the provided SAS Connection String");
  }

  return { kind: "SASConnString", url: tableEndpoint, accountName, accountSas };
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
 * Extracts account name from the url
 * @param url - URL to extract the account name from
 * @returns The account name
 */
function getAccountNameFromUrl(url: string): string {
  if (!url) {
    return url;
  }

  const parsedUrl = new URL(url);
  let accountName;

  const host = parsedUrl.host || "";
  const path = parsedUrl.pathname || "";
  const hostParts = host.split(".");
  const pathParts = path.split("/");

  if (hostParts.length >= 1 && hostParts[1] === "table") {
    // `${defaultEndpointsProtocol}://${accountName}.table.${endpointSuffix}`;
    // Slicing off '/' at the end if exists
    url = url.endsWith("/") ? url.slice(0, -1) : url;
    accountName = host.split(".")[0];
  } else if (pathParts.length >= 1) {
    // IPv4/IPv6 address hosts... Example - http://192.0.0.10:10001/devstoreaccount1/
    // Single word domain without a [dot] in the endpoint... Example - http://localhost:10001/devstoreaccount1/
    // .getPath() -> /devstoreaccount1/
    accountName = pathParts[1];
  } else {
    throw new Error("Unable to extract accountName with provided information.");
  }

  return accountName;
}
