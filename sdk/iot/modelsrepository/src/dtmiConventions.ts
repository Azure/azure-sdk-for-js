// Copyright (c) Microsoft.
// Licensed under the MIT license.

export function isValidDtmi(dtmi: string): boolean {
  if (dtmi) {
    const re = /^dtmi:[A-Za-z](?:[A-Za-z0-9_]*[A-Za-z0-9])?(?::[A-Za-z](?:[A-Za-z0-9_]*[A-Za-z0-9])?)*;[1-9][0-9]{0,8}$/;
    return re.test(dtmi); // true if dtmi matches regular expression, false otherwise
  }
  return false; // if not a string return false.
}

export function getModelUri(dtmi: string, repositoryUri: string, expanded: boolean = false): string {
  if (!repositoryUri.endsWith("/")) {
    repositoryUri = repositoryUri.concat("/");
  }
  const modelUri = repositoryUri + convertDtmiToPath(dtmi, expanded);
  return modelUri;
}

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
