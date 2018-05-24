// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

/**
 * The format that will be used to join an array of values together for a query parameter value.
 */
export enum QueryCollectionFormat {
  Csv,
  Ssv,
  Tsv,
  Pipes,
  Multi,
}

/**
 * Get the separator string that will be used to join a sequence of values together in a query
 * parameter value.
 * @param {QueryCollectionFormat} queryCollectionFormat The format to get a string separator for.
 * @returns {string} The separator for the provided format.
 */
export function getQueryCollectionFormatSeparator(queryCollectionFormat: QueryCollectionFormat): string {
  let separator: string;
  switch (queryCollectionFormat) {
    case QueryCollectionFormat.Csv:
      separator = ",";
      break;
    case QueryCollectionFormat.Pipes:
      separator = "|";
      break;
    case QueryCollectionFormat.Ssv:
      separator = " ";
      break;
    case QueryCollectionFormat.Tsv:
      separator = "\t";
      break;
    default:
      throw new Error(`No separator specified for QueryCollectionFormat: ${QueryCollectionFormat[queryCollectionFormat]}`);
  }
  return separator;
}