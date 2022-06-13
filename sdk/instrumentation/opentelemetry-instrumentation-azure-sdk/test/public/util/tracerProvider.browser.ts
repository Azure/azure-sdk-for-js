// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { BasicTracerProvider } from "@opentelemetry/sdk-trace-base";

// Use BasicTracerProvider in the browser.
export const tracerProvider = new BasicTracerProvider();
