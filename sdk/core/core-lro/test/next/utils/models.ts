// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ResponseBody } from "../../../src/next/http/models";

export type ImplementationName = "createPollerSync";
export type Result = ResponseBody & { statusCode: number };
