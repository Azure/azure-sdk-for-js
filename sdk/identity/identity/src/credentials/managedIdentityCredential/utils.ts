// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DefaultScopeSuffix } from "./constants";

export function mapScopesToResource(scopes: string | string[]): string {
  let scope = "";
  if (Array.isArray(scopes)) {
    if (scopes.length !== 1) {
      throw new Error(
        "To convert to a resource string the specified array must be exactly length 1"
      );
    }

    scope = scopes[0];
  } else if (typeof scopes === "string") {
    scope = scopes;
  }

  if (!scope.endsWith(DefaultScopeSuffix)) {
    return scope;
  }

  return scope.substr(0, scope.lastIndexOf(DefaultScopeSuffix));
}
