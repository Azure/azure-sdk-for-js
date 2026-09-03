// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { relativeRecordingsPath } from "@azure-tools/test-recorder";

process.env.RECORDINGS_RELATIVE_PATH = relativeRecordingsPath();

export { default } from "../../../eng/vitestconfigs/browser.config.ts";
