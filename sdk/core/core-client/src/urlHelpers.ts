// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { URL } from "./url";
import { OperationSpec, OperationArguments, QueryCollectionFormat } from "./interfaces";
import { getOperationArgumentValueFromParameter } from "./operationHelpers";
import { getPathStringFromParameter } from "./interfaceHelpers";

const CollectionFormatToDelimiterMap: { [key in QueryCollectionFormat]: string } = {
  CSV: ",",
  SSV: " ",
  Multi: "Multi",
  TSV: "\t",
  Pipes: "|"
};

export function getRequestUrl(
  baseUri: string,
  operationSpec: OperationSpec,
  operationArguments: OperationArguments,
  fallbackObject: { [parameterName: string]: any }
): string {
  const urlReplacements = calculateUrlReplacements(
    operationSpec,
    operationArguments,
    fallbackObject
  );

  let requestUrl = replaceAll(baseUri, urlReplacements);
  if (operationSpec.path) {
    const path = replaceAll(operationSpec.path, urlReplacements);
    // QUIRK: sometimes we get a path component like {nextLink}
    // which may be a fully formed URL. In that case, we should
    // ignore the baseUri.
    if (isAbsoluteUrl(path)) {
      requestUrl = path;
    } else {
      requestUrl = appendPath(requestUrl, path);
    }
  }

  const queryParams = calculateQueryParameters(operationSpec, operationArguments, fallbackObject);
  requestUrl = appendQueryParams(requestUrl, queryParams);

  return requestUrl;
}

function replaceAll(input: string, replacements: Map<string, string>): string {
  let result = input;
  for (const [searchValue, replaceValue] of replacements) {
    result = result.split(searchValue).join(replaceValue);
  }
  return result;
}

function calculateUrlReplacements(
  operationSpec: OperationSpec,
  operationArguments: OperationArguments,
  fallbackObject: { [parameterName: string]: any }
): Map<string, string> {
  const result = new Map<string, string>();
  if (operationSpec.urlParameters?.length) {
    for (const urlParameter of operationSpec.urlParameters) {
      let urlParameterValue: string = getOperationArgumentValueFromParameter(
        operationArguments,
        urlParameter,
        fallbackObject
      );
      const parameterPathString = getPathStringFromParameter(urlParameter);
      urlParameterValue = operationSpec.serializer.serialize(
        urlParameter.mapper,
        urlParameterValue,
        parameterPathString
      );
      if (!urlParameter.skipEncoding) {
        urlParameterValue = encodeURIComponent(urlParameterValue);
      }
      result.set(
        `{${urlParameter.mapper.serializedName || parameterPathString}}`,
        urlParameterValue
      );
    }
  }
  return result;
}

function isAbsoluteUrl(url: string): boolean {
  return url.includes("://");
}

function appendPath(url: string, pathToAppend?: string): string {
  if (!pathToAppend) {
    return url;
  }

  const parsedUrl = new URL(url);
  let newPath = parsedUrl.pathname;

  if (!newPath.endsWith("/")) {
    newPath = `${newPath}/`;
  }

  if (pathToAppend.startsWith("/")) {
    pathToAppend = pathToAppend.substring(1);
  }

  const searchStart = pathToAppend.indexOf("?");
  if (searchStart !== -1) {
    const path = pathToAppend.substring(0, searchStart);
    const search = pathToAppend.substring(searchStart + 1);
    newPath = newPath + path;
    if (search) {
      parsedUrl.search = parsedUrl.search ? `${parsedUrl.search}&${search}` : search;
    }
  } else {
    newPath = newPath + pathToAppend;
  }

  parsedUrl.pathname = newPath;

  return parsedUrl.toString();
}

function calculateQueryParameters(
  operationSpec: OperationSpec,
  operationArguments: OperationArguments,
  fallbackObject: { [parameterName: string]: any }
): Map<string, string | string[]> {
  const result = new Map<string, string | string[]>();
  if (operationSpec.queryParameters?.length) {
    for (const queryParameter of operationSpec.queryParameters) {
      let queryParameterValue: string | string[] = getOperationArgumentValueFromParameter(
        operationArguments,
        queryParameter,
        fallbackObject
      );
      if (
        (queryParameterValue !== undefined && queryParameterValue !== null) ||
        queryParameter.mapper.required
      ) {
        queryParameterValue = operationSpec.serializer.serialize(
          queryParameter.mapper,
          queryParameterValue,
          getPathStringFromParameter(queryParameter)
        );

        const delimiter = queryParameter.collectionFormat
          ? CollectionFormatToDelimiterMap[queryParameter.collectionFormat]
          : "";
        if (Array.isArray(queryParameterValue)) {
          // replace null and undefined
          queryParameterValue = queryParameterValue.map((item) => {
            if (item === null || item === undefined) {
              return "";
            }

            return item;
          });
        }
        if (queryParameter.collectionFormat === "Multi" && queryParameterValue.length === 0) {
          continue;
        } else if (
          Array.isArray(queryParameterValue) &&
          (queryParameter.collectionFormat === "SSV" || queryParameter.collectionFormat === "TSV")
        ) {
          queryParameterValue = queryParameterValue.join(delimiter);
        }
        if (!queryParameter.skipEncoding) {
          if (Array.isArray(queryParameterValue)) {
            queryParameterValue = queryParameterValue.map((item: string) => {
              return encodeURIComponent(item);
            });
          } else {
            queryParameterValue = encodeURIComponent(queryParameterValue);
          }
        }

        // Join pipes and CSV *after* encoding, or the server will be upset.
        if (
          Array.isArray(queryParameterValue) &&
          (queryParameter.collectionFormat === "CSV" || queryParameter.collectionFormat === "Pipes")
        ) {
          queryParameterValue = queryParameterValue.join(delimiter);
        }

        result.set(
          queryParameter.mapper.serializedName || getPathStringFromParameter(queryParameter),
          queryParameterValue
        );
      }
    }
  }
  return result;
}

function simpleParseQueryParams(queryString: string): Array<[string, string]> {
  if (!queryString || queryString[0] !== "?") {
    return [];
  }

  // remove the leading ?
  queryString = queryString.slice(1);

  const pairs = queryString.split("&");

  return pairs.map((pair) => {
    const [name, value] = pair.split("=", 2);
    return [name, value];
  });
}

function appendQueryParams(url: string, queryParams: Map<string, string | string[]>): string {
  if (queryParams.size === 0) {
    return url;
  }

  const parsedUrl = new URL(url);

  // QUIRK: parsedUrl.searchParams will have their name/value pairs decoded, which
  // can change their meaning to the server, such as in the case of a SAS signature.
  // To avoid accidentally un-encoding a query param, we parse the key/values ourselves
  const existingParams = simpleParseQueryParams(parsedUrl.search);
  const combinedParams = new Map<string, string | string[]>(existingParams);

  for (const [name, value] of queryParams) {
    const existingValue = combinedParams.get(name);
    if (Array.isArray(existingValue)) {
      existingValue.push(...value);
    } else if (existingValue) {
      combinedParams.set(name, [existingValue, ...value]);
    } else {
      combinedParams.set(name, value);
    }
  }

  const searchPieces: string[] = [];
  for (const [name, value] of combinedParams) {
    if (typeof value === "string") {
      searchPieces.push(`${name}=${value}`);
    } else {
      // QUIRK: If we get an array of values, include multiple key/value pairs
      for (const subValue of value) {
        searchPieces.push(`${name}=${subValue}`);
      }
    }
  }

  // QUIRK: we have to set search manually as searchParams will encode comma when it shouldn't.
  parsedUrl.search = searchPieces.length ? `?${searchPieces.join("&")}` : "";
  return parsedUrl.toString();
}
