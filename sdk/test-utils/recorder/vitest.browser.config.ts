// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { relativeRecordingsPath } from "./src";
import viteConfig from "../../../vitest.browser.base.config.ts";

process.env.RECORDINGS_RELATIVE_PATH = relativeRecordingsPath();

export default viteConfig;
