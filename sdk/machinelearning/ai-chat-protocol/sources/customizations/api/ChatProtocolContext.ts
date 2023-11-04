// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ClientOptions } from "@azure-rest/core-client";

export interface ChatProtocolClientOptions extends ClientOptions {
  chatRoute?: string;

  authorizationScopes?: string[];

  apiKeyHeader?: string;
}
