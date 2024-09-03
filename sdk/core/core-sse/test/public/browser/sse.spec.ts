// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { buildSseTests } from "../sse.js";
import { createStream } from "./util.js";

buildSseTests("Browser", createStream);
