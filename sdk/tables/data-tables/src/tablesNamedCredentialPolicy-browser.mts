// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NamedKeyCredential } from "@azure/core-auth";
import type { PipelineRequest } from "@azure/core-rest-pipeline";

export function tablesNamedKeyCredentialPolicy(_credential: NamedKeyCredential): never {
  throw new Error("Shared Access Key authentication is not supported in the browser");
}

export function getAuthorizationHeader(
  _request: PipelineRequest,
  _credential: NamedKeyCredential,
): never {
  throw new Error("Shared Access Key authentication is not supported in the browser");
}
