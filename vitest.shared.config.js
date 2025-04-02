"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("vitest/config");
exports.default = (0, config_1.defineConfig)({
    test: {
        testTimeout: 18000,
        reporters: ["verbose", "junit"],
        outputFile: {
            junit: "test-results.xml",
        },
        fakeTimers: {
            toFake: ["setTimeout", "Date"],
        },
        watch: false,
        include: ["test/**/*.spec.ts"],
        exclude: [
            "test/**/browser/*.spec.ts",
            "test/snippets.spec.ts",
            "test/integration/**/*.spec.ts",
            "test/stress/**/*.ts",
        ],
        coverage: {
            include: ["src/**/*.ts"],
            exclude: [
                "src/**/*-browser.mts",
                "src/**/*-react-native.mts",
                "vitest*.config.ts",
                "samples-dev/**/*.ts",
                "test/snippets.spec.ts",
            ],
            provider: "istanbul",
            reporter: ["text", "json", "html"],
            reportsDirectory: "coverage",
        },
        typecheck: {
            enabled: true,
            tsconfig: "tsconfig.test.json",
            include: ["test/**/*.ts", "test/**/*.mts", "test/**/*.cts"],
        },
    },
});
