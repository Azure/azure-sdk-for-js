// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export function getStringTailLowerCase(val: string, tailLength: number) {
  if (tailLength <= 0) {
    return "";
  }

  if (tailLength >= val.length) {
    return val.toLowerCase();
  }

  return val.substring(val.length - tailLength).toLowerCase();
}
