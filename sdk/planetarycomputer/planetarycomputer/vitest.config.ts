// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { mergeConfig } from "vitest/config";
import viteConfig from "../../../vitest.shared.config.ts";

export default mergeConfig(viteConfig, {
  test: {
    // Disable parallelization to ensure tests run sequentially in lexicographical order
    fileParallelism: false,
    // Disable test parallelism within files
    pool: "forks",
    poolOptions: {
      forks: {
        singleFork: true,
      },
    },
    // Ensure tests run in sequence
    sequence: {
      shuffle: false,
    },
  },
});
