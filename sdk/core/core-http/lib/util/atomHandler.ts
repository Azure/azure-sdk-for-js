// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Constants } from "./constants";

/**
 * Type representing the JSON representation of XML request data
 */
export interface XMLRequestInJSON {
  [key: string]: {
    $: { xmlns: string };
    [key: string]: any;
  };
}

/**
 * Type representing the JSON representation of XML response data
 */
export interface XMLResponseInJSON {
  [key: string]: any;
}

/**
 * Utility to deserialize the given JSON content even further based on
 * if it's a single `entry` or `feed`
 * @param {object} atomResponseInJson
 * */
export function parseResultFromAtomResponse(
  atomResponseInJson: any
): XMLResponseInJSON[] | XMLResponseInJSON | undefined {
  if (!atomResponseInJson) {
    return;
  }

  if (atomResponseInJson.feed) {
    return parseFeedResult(atomResponseInJson.feed);
  }

  if (atomResponseInJson.entry) {
    return parseEntryResult(atomResponseInJson.entry);
  }

  throw new Error("Unrecognized result: " + JSON.stringify(atomResponseInJson));
}

/**
 * @ignore
 * Utility to help parse given `entry` result
 * @param entry
 */
function parseEntryResult(entry: any): XMLResponseInJSON | undefined {
  let result: XMLResponseInJSON;

  if (
    typeof entry !== "object" ||
    entry == null ||
    typeof entry.content !== "object" ||
    entry.content == null
  ) {
    return undefined;
  }

  const contentElementNames = Object.keys(entry.content).filter(function(key) {
    return key !== Constants.XML_METADATA_MARKER;
  });

  if (contentElementNames && contentElementNames[0]) {
    const contentRootElementName = contentElementNames[0];
    delete entry.content[contentRootElementName][Constants.XML_METADATA_MARKER];
    result = entry.content[contentRootElementName];

    if (result) {
      if (entry[Constants.XML_METADATA_MARKER]) {
        result[Constants.ATOM_METADATA_MARKER] = entry[Constants.XML_METADATA_MARKER];
      } else {
        result[Constants.ATOM_METADATA_MARKER] = {};
      }

      result[Constants.ATOM_METADATA_MARKER]["ContentRootElement"] = contentRootElementName;

      Object.keys(entry).forEach((property: string) => {
        if (property !== "content" && property !== Constants.XML_METADATA_MARKER) {
          result[Constants.ATOM_METADATA_MARKER][property] = entry[property];
        }
      });

      return result;
    }
  }

  return undefined;
}

/**
 * @ignore
 * Utility to help parse given `feed` result
 * @param feed
 */
function parseFeedResult(feed: any): XMLResponseInJSON[] {
  const result = [];
  if (typeof feed === "object" && feed != null && feed.entry) {
    if (Array.isArray(feed.entry)) {
      feed.entry.forEach((entry: any) => {
        const parsedEntryResult = parseEntryResult(entry);
        if (parsedEntryResult) {
          result.push(parsedEntryResult);
        }
      });
    } else {
      const parsedEntryResult = parseEntryResult(feed.entry);
      if (parsedEntryResult) {
        result.push(parsedEntryResult);
      }
    }
  }
  return result;
}
