// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { inject } from "vitest";

export const endpoint = inject("cosmosEndpoint");
// This is used for skipping tests for features not available on staging accounts used in signoff pipelines
export const skipTestForSignOff: boolean = inject("skipTestForSignOff");
// When true, integration tests that require the Cosmos emulator should be skipped
export const emulatorUnavailable: boolean = inject("emulatorUnavailable");
