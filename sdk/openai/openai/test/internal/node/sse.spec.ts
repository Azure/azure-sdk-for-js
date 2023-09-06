// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { buildSseTests } from "../sse.js";
import { createClient, createStream } from "./util.js";

buildSseTests("Node", createClient, createStream);
