// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { buildSseTests } from "../sse.js";
import { createSSEStream } from "./util.js";

buildSseTests("Browser", createSSEStream);
