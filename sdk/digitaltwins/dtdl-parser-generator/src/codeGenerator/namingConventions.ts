// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export function pascalToSnake(text: string): string {
  // we could do this by setting the regex to a negative lookbehind on the starting character,
  // but this is not compatible with all browsers. Therefore we use a little workaround
  // to see if an unnecessary underscore was added, and if so, remove it.
  const regex = /(?=[A-Z][a-z])/g;
  const intermediate = text.replace(regex, (match) => `_${match}`).toLowerCase();
  return intermediate.startsWith("_") ? intermediate.substring(1) : intermediate;
}

export function pascalToCamel(text: string): string {
  // we could do this by setting the regex to a negative lookbehind on the starting character,
  // but this is not compatible with all browsers. Therefore we use a little workaround
  // to see if an unnecessary underscore was added, and if so, remove it.
  let intermediate = "";
  if (text.startsWith("DT")) {
    intermediate = text.replace("DT", "dt");
  } else {
    intermediate = text.replace(/\b(\w)/g, (match) => match.toLowerCase());
  }
  return intermediate;
}
