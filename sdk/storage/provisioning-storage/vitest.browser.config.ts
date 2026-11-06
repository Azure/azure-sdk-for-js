// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig } from "vitest/config";
import base from "../../../eng/vitestconfigs/browser.config.ts";

export default defineConfig({
  ...base,
  test: {
    ...base.test,
    include: ["test/generated/**/*.spec.ts"],
  },
});
