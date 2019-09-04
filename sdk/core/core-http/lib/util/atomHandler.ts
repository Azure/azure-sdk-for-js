import { Constants } from "./constants";

/**
 * Utility to deserialize the given JSON content even further based on
 * if it's a single `entry` or `feed`
 * @param {object} xmlInJson
 * */
export function parseResultFromAtomResponse(atomResponseInJson: any): any {
  if (!atomResponseInJson) {
    return;
  }

  if (atomResponseInJson.feed) {
    return parseFeedResult(atomResponseInJson.feed);
  }

  if (atomResponseInJson.entry) {
    return parseEntryResult(atomResponseInJson.entry);
  }

  throw new Error("Unrecognized result: " + atomResponseInJson);
}

function parseEntryResult(entry: any): any {
  const contentElementName = Object.keys(entry.content).filter(function(key) {
    return key !== Constants.XML_METADATA_MARKER;
  })[0];

  delete entry.content[contentElementName][Constants.XML_METADATA_MARKER];
  const result = entry.content[contentElementName];

  if (result) {
    if (entry[Constants.XML_METADATA_MARKER]) {
      result[Constants.ATOM_METADATA_MARKER] = entry[Constants.XML_METADATA_MARKER];
    } else {
      result[Constants.ATOM_METADATA_MARKER] = {};
    }

    result[Constants.ATOM_METADATA_MARKER]["ContentRootElement"] = contentElementName;

    Object.keys(entry).forEach((property: string) => {
      if (property !== "content" && property !== Constants.XML_METADATA_MARKER) {
        result[Constants.ATOM_METADATA_MARKER][property] = entry[property];
      }
    });
  }

  return result;
}

function parseFeedResult(feed: any): any[] {
  const result = [];
  if (feed.entry) {
    if (Array.isArray(feed.entry)) {
      feed.entry.forEach((entry: any) => {
        result.push(parseEntryResult(entry));
      });
    } else {
      result.push(parseEntryResult(feed.entry));
    }
  }
  return result;
}
