// Copyright (c) Microsoft.
// Licensed under the MIT license.


/**
 * isValidDtmi
 * @description given a dtmi it will validate it matches the convention.
 * This is based on the DTMI spec:
 * https://github.com/Azure/opendigitaltwins-dtdl/blob/master/DTDL/v2/dtdlv2.md#digital-twin-model-identifier
 * 
 * @param dtmi 
 * @returns {boolean}
 */
export function isValidDtmi(dtmi: string): boolean {
  if (typeof dtmi !== "string") return false;
  const re = /^dtmi:[A-Za-z](?:[A-Za-z0-9_]*[A-Za-z0-9])?(?::[A-Za-z](?:[A-Za-z0-9_]*[A-Za-z0-9])?)*;[1-9][0-9]{0,8}$/;
  return re.test(dtmi); // true if dtmi matches regular expression, false otherwise
}

/**
 * getModelUri
 * @description given the dtmi and repository uri, will get a fully qualified model uri.
 * 
 * @param dtmi 
 * @param repositoryUri 
 * @param expanded 
 * @returns {string}
 */
export function getModelUri(dtmi: string, repositoryUri: string, expanded: boolean = false): string {
  // TODO: Make sure this works with Windows UNC Filesystem Path.
  if (!repositoryUri.endsWith("/")) {
    repositoryUri = repositoryUri.concat("/");
  }
  const modelUri = repositoryUri + convertDtmiToPath(dtmi, expanded);
  return modelUri;
}


/**
 * convertDtmiToPath
 * @description converts a dtmi into the model path format.
 * 
 * @param dtmi 
 * @param expanded 
 * @internal 
 */
export function convertDtmiToPath(dtmi: string, expanded: boolean): string {
  // presently this dtmi to path function does not return the path with a
  // file format at the end, i.e. does not append .json or .expanded.json.
  // that happens in the dtmiToQualifiedPath function

  if (isValidDtmi(dtmi)) {
    let thePath = `${dtmi
      .toLowerCase()
      .replace(/:/gm, "/")
      .replace(/;/gm, "-")}.json`;
    if (expanded) {
      thePath = thePath.replace(".json", ".expanded.json");
    }
    return thePath;
  } else {
    throw new Error("DTMI provided is invalid. Ensure it follows DTMI conventions.");
  }
}
