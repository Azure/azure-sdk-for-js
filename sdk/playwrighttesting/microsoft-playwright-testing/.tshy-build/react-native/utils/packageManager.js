// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
export class NPM {
    constructor() {
        this.runCommand = (command, args) => {
            return `npx ${command} ${args}`;
        };
        this.getVersionFromStdout = (stdout) => {
            const match = stdout.match(/Version\s(\d+\.\d+\.\d+(-\w+-\d{4}-\d{2}-\d{2})?)/);
            return match ? match[1] : "Unknown version";
        };
    }
}
export class PNPM {
    constructor() {
        this.runCommand = (command, args) => {
            return `pnpm ${command} ${args}`;
        };
        this.getVersionFromStdout = (stdout) => {
            const match = stdout.match(/Version\s(\d+\.\d+\.\d+(-\w+-\d{4}-\d{2}-\d{2})?)/);
            return match ? match[1] : "Unknown version";
        };
    }
}
export class Yarn {
    constructor() {
        this.runCommand = (command, args) => {
            return `yarn ${command} ${args}`;
        };
        this.getVersionFromStdout = (stdout) => {
            const match = stdout.match(/Version\s(\d+\.\d+\.\d+(-\w+-\d{4}-\d{2}-\d{2})?)/);
            return match ? match[1] : "Unknown version";
        };
    }
}
// https://stackoverflow.com/questions/68133683/is-there-a-cross-platform-way-to-get-the-name-of-the-parent-process-in-node-js
export const getPackageManager = () => {
    if (process.env["npm_config_user_agent"]) {
        const userAgent = process.env["npm_config_user_agent"];
        if (userAgent.includes("yarn"))
            return new Yarn();
        if (userAgent.includes("pnpm"))
            return new PNPM();
    }
    return new NPM();
};
//# sourceMappingURL=packageManager.js.map