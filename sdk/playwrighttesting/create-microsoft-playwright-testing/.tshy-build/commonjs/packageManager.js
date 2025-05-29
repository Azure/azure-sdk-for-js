"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPackageManager = exports.Yarn = exports.PNPM = exports.NPM = void 0;
const node_fs_1 = require("node:fs");
const node_process_1 = require("node:process");
const node_path_1 = require("node:path");
class NPM {
    constructor() {
        this.installDevDependencyCommand = (packageName) => {
            return `npm install --save-dev ${packageName}`;
        };
        this.runCommand = (command, args) => {
            return `npx ${command} ${args}`;
        };
    }
}
exports.NPM = NPM;
class PNPM {
    constructor() {
        this.useWorkspace = false;
        this.installDevDependencyCommand = (packageName) => {
            return `pnpm add --save-dev ${this.useWorkspace ? "-w " : ""}${packageName}`;
        };
        this.runCommand = (command, args) => {
            return `pnpm ${command} ${args}`;
        };
        this.useWorkspace = (0, node_fs_1.existsSync)((0, node_path_1.resolve)((0, node_process_1.cwd)(), "pnpm-workspace.yaml"));
    }
}
exports.PNPM = PNPM;
class Yarn {
    constructor() {
        this.installDevDependencyCommand = (packageName) => {
            return `yarn add --dev ${packageName}`;
        };
        this.runCommand = (command, args) => {
            return `yarn ${command} ${args}`;
        };
    }
}
exports.Yarn = Yarn;
// https://stackoverflow.com/questions/68133683/is-there-a-cross-platform-way-to-get-the-name-of-the-parent-process-in-node-js
const getPackageManager = () => {
    if (process.env["npm_config_user_agent"]) {
        const userAgent = process.env["npm_config_user_agent"];
        if (userAgent.includes("yarn"))
            return new Yarn();
        if (userAgent.includes("pnpm"))
            return new PNPM();
    }
    return new NPM();
};
exports.getPackageManager = getPackageManager;
//# sourceMappingURL=packageManager.js.map