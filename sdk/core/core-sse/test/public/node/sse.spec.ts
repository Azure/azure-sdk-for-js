// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { buildSseTests } from "../sse.js";
import { createStream } from "./util.js";

buildSseTests("Node", createStream);
