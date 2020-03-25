// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// This shim just declares "document" to be defined in this scope.
// If you really need access to browser features with strong
// type-checking, extend the shim to the extent you require or use:
//
// /// <reference lib="dom" />
declare const document: any;

export default function(str: string): void {
  document.write(str);
}
