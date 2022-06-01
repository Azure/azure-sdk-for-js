// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * isValidDtmi validates if a given dtmi matches the convention.
 * This is based on the DTMI spec:
 * https://github.com/Azure/opendigitaltwins-dtdl/blob/master/DTDL/v2/dtdlv2.md#digital-twin-model-identifier
 *
 * @param dtmi - digital twins model identifier string
 */
export function isValidDtmi(dtmi: string): boolean {
  if (typeof dtmi !== "string") return false;
  const re =
    /^dtmi:[A-Za-z](?:[A-Za-z0-9_]*[A-Za-z0-9])?(?::[A-Za-z](?:[A-Za-z0-9_]*[A-Za-z0-9])?)*;[1-9][0-9]{0,8}$/;
  return re.test(dtmi); // true if dtmi matches regular expression, false otherwise
}

/**
 * Given the dtmi and repository uri, will get a fully qualified model uri.
 *
 * @param dtmi - digital twins model identifier string
 * @param repositoryUri - base URI for repository
 * @param expanded - is the Model URI .json or .expanded.json
 */
export function getModelUri(
  dtmi: string,
  repositoryUri: string,
  expanded: boolean = false
): string {
  if (!repositoryUri.endsWith("/")) {
    repositoryUri = repositoryUri.concat("/");
  }
  const modelUri = repositoryUri + convertDtmiToPath(dtmi, expanded);
  return modelUri;
}

/**
 * convertDtmiToPath converts a given dtmi string to a path.
 *
 * @param dtmi - digital twins model identifier string
 * @param expanded - is the Model URI .json or .expanded.json
 * @internal
 */
export function convertDtmiToPath(dtmi: string, expanded: boolean): string {
  // presently this dtmi to path function does not return the path with a
  // file format at the end, i.e. does not append .json or .expanded.json.
  // that happens in the dtmiToQualifiedPath function

  if (isValidDtmi(dtmi)) {
    let thePath = `${dtmi.toLowerCase().replace(/:/gm, "/").replace(/;/gm, "-")}.json`;
    if (expanded) {
      thePath = thePath.replace(".json", ".expanded.json");
    }
    return thePath;
  } else {
    throw new Error("DTMI provided is invalid. Ensure it follows DTMI conventions.");
  }
}
