"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("vitest/config");
var test_recorder_1 = require("@azure-tools/test-recorder");
process.env.RECORDINGS_RELATIVE_PATH = (0, test_recorder_1.relativeRecordingsPath)();
exports.default = (0, config_1.defineConfig)({
    define: {
        "process.env": process.env,
    },
    optimizeDeps: {
        include: ["@azure-tools/test-recorder"],
    },
    test: {
        testTimeout: 18000,
        reporters: ["verbose", "junit"],
        outputFile: {
            junit: "test-results.browser.xml",
        },
        browser: {
            instances: [
                {
                    browser: "chromium",
                    launch: {
                        args: ["--disable-web-security"],
                    },
                },
            ],
            enabled: true,
            headless: true,
            provider: "playwright",
        },
        fakeTimers: {
            toFake: ["setTimeout", "Date"],
        },
        watch: false,
        coverage: {
            include: ["dist-test/browser/**/*.js"],
            exclude: [
                "dist-test/browser/**/*./*-browser.mjs",
                "dist-test/browser/**/*./*-react-native.mjs",
            ],
            provider: "istanbul",
            reporter: ["text", "json", "html"],
            reportsDirectory: "coverage-browser",
        },
    },
});
