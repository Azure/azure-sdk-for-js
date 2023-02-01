// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { env } from "./env";

export const isLive = env.TEST_MODE === "live";
