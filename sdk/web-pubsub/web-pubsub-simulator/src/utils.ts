// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export function getDataType(contentTypeHeader: string | undefined): string {
  switch (contentTypeHeader) {
    case "text/plain":
      return "text";
    case "application/json":
      return "json";
    case "application/octet-stream":
      return "binary";
    default:
      return "json";
  }
}
