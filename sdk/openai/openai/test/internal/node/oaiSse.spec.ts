// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { buildOaiSseTests } from "../oaiSse.js";
import { createClient, createStream } from "./util.js";

buildOaiSseTests("Node", createClient, createStream);
