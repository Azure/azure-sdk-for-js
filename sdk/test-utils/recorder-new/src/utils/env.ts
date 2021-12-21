// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as dotenv from "dotenv";

// Initialize the environment
dotenv.config();

export const env = process.env as Record<string, string | undefined>;
