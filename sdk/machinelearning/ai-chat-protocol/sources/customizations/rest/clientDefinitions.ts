// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Client } from "@azure-rest/core-client";
import { CreateStreaming } from "../../generated/src/rest/clientDefinitions.js";

export interface Routes {
  // @azsdk-remove
  (path: "/{operationRoute}", operationRoute: string): CreateStreaming;
  (path: string): CreateStreaming;
}

export type ChatProtocolContext = Client & {
  path: Routes;
  chatRoute: string;
};
