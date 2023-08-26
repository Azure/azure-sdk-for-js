// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { buildSseTests } from "../sse";
import { createClient, createStream } from "./util";

buildSseTests("Node", createClient, createStream);
