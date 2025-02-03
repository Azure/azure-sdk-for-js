// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectsClient, AIProjectsClientOptions } from "./aiProjectsClient.js";
import { ProjectsClientOptions } from "./generated/src/projectsClient.js";
export { AgentsOperations } from "./agents/index.js";
export { ConnectionsOperations } from "./connections/index.js";
export { TelemetryOperations, TelemetryOptions } from "./telemetry/index.js";

export * from "./agents/inputOutputs.js";
export * from "./connections/inputOutput.js";

export { AIProjectsClient, AIProjectsClientOptions, ProjectsClientOptions };
