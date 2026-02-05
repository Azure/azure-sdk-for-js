// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import viteConfig from "../../../vitest.shared.config.ts";
import dotenv from "dotenv/config";

const config = {
    ...viteConfig,
    test: {
        ...viteConfig.test,
        exclude: ["test/**/browser/*.spec.ts", "test/snippets.spec.ts", "test/stress/**/*.ts"]
    },
}
export default config;

