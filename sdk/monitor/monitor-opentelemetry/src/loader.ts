// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * ESM Loader entry point for Azure Monitor OpenTelemetry.
 *
 * For ESM applications, this loader MUST be used with the --import flag to ensure
 * instrumentation hooks are registered before any application modules are loaded.
 * This is required because ESM modules cannot be instrumented after they are loaded.
*/

import { registerInstrumentationLoader } from "./utils/instrumentationLoader.js";

// Register the instrumentation loader immediately when this module is imported
registerInstrumentationLoader();
