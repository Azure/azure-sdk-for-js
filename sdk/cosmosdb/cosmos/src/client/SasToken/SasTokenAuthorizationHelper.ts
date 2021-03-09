// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export function isSasToken(token: string): boolean {
  const typeSeparatorPosition: number = token.indexOf("&");
  if (typeSeparatorPosition === -1) {
    return false;
  }

  const authType: string = token.substring(0, typeSeparatorPosition);
  const typeKeyValueSepartorPosition: number = authType.indexOf("=");
  if (
    typeKeyValueSepartorPosition === -1 ||
    !(authType.substring(0, typeKeyValueSepartorPosition).toLowerCase() === "type")
  ) {
    return false;
  }

  const authTypeValue: string = authType.substring(typeKeyValueSepartorPosition + 1);
  return authTypeValue.toLowerCase() === "sas";
}
