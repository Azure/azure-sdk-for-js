// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Client } from "@azure-rest/core-client";

export interface Routes {}

export type SystemEventsContext = Client & {
  path: Routes;
};
