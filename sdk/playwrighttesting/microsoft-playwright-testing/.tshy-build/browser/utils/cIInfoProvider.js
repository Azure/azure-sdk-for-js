// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
export var CI_PROVIDERS;
(function (CI_PROVIDERS) {
    CI_PROVIDERS["GITHUB"] = "GITHUB";
    CI_PROVIDERS["ADO"] = "ADO";
    CI_PROVIDERS["DEFAULT"] = "DEFAULT";
    // Add more CI providers as needed
})(CI_PROVIDERS || (CI_PROVIDERS = {}));
export class CIInfoProvider {
    static isGitHubActions() {
        return process.env["GITHUB_ACTIONS"] === "true";
    }
    static getCIProvider() {
        if (CIInfoProvider.isGitHubActions()) {
            return CI_PROVIDERS.GITHUB;
        }
        else if (CIInfoProvider.isAzureDevOps()) {
            return CI_PROVIDERS.ADO;
        }
        else {
            return CI_PROVIDERS.DEFAULT;
        }
    }
    static getCIInfo() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const ciProvider = CIInfoProvider.getCIProvider();
        if (ciProvider === CI_PROVIDERS.GITHUB) {
            // Logic to get GitHub Actions CIInfo
            return {
                provider: CI_PROVIDERS.GITHUB,
                repo: process.env["GITHUB_REPOSITORY_ID"] || null,
                branch: this.getGHBranchName() || null,
                author: process.env["GITHUB_ACTOR"] || null,
                commitId: process.env["GITHUB_SHA"] || null,
                revisionUrl: process.env["GITHUB_SERVER_URL"]
                    ? `${process.env["GITHUB_SERVER_URL"]}/${process.env["GITHUB_REPOSITORY"]}/commit/${process.env["GITHUB_SHA"]}`
                    : null,
                runId: process.env["GITHUB_RUN_ID"] || null,
                runAttempt: process.env["GITHUB_RUN_ATTEMPT"]
                    ? parseInt(process.env["GITHUB_RUN_ATTEMPT"], 10)
                    : null,
                jobName: process.env["GITHUB_JOB"] || null,
            };
        }
        else if (ciProvider === CI_PROVIDERS.ADO) {
            // Logic to get Azure DevOps CIInfo
            return {
                provider: CI_PROVIDERS.ADO,
                repo: process.env["BUILD_REPOSITORY_ID"] || null,
                branch: process.env["BUILD_SOURCEBRANCH"] || null,
                author: process.env["BUILD_REQUESTEDFOR"] || null,
                commitId: process.env["BUILD_SOURCEVERSION"] || null,
                revisionUrl: process.env["SYSTEM_TEAMFOUNDATIONCOLLECTIONURI"]
                    ? `${process.env["SYSTEM_TEAMFOUNDATIONCOLLECTIONURI"]}${process.env["SYSTEM_TEAMPROJECT"]}/_git/${process.env["BUILD_REPOSITORY_NAME"]}/commit/${process.env["BUILD_SOURCEVERSION"]}`
                    : null,
                runId: this.getADORunId() || null,
                runAttempt: process.env["RELEASE_ATTEMPTNUMBER"]
                    ? parseInt(process.env["RELEASE_ATTEMPTNUMBER"], 10)
                    : parseInt((_a = process.env["SYSTEM_JOBATTEMPT"]) !== null && _a !== void 0 ? _a : "", 10),
                jobName: process.env["SYSTEM_JOBDISPLAYNAME"] || process.env["RELEASE_DEPLOYMENTID"] || null,
            };
        }
        else {
            // Handle unsupported CI provider
            return {
                provider: CI_PROVIDERS.DEFAULT,
                repo: (_b = process.env["REPO"]) !== null && _b !== void 0 ? _b : null,
                branch: (_c = process.env["BRANCH"]) !== null && _c !== void 0 ? _c : null,
                author: (_d = process.env["AUTHOR"]) !== null && _d !== void 0 ? _d : null,
                commitId: (_e = process.env["COMMIT_ID"]) !== null && _e !== void 0 ? _e : null,
                revisionUrl: (_f = process.env["REVISION_URL"]) !== null && _f !== void 0 ? _f : null,
                runId: (_g = process.env["RUN_ID"]) !== null && _g !== void 0 ? _g : null,
                runAttempt: process.env["RUN_ATTEMPT"] ? parseInt(process.env["RUN_ATTEMPT"], 10) : null,
                jobName: (_h = process.env["JOB_ID"]) !== null && _h !== void 0 ? _h : null,
            };
        }
    }
    static isAzureDevOps() {
        return (process.env["AZURE_HTTP_USER_AGENT"] !== undefined && process.env["TF_BUILD"] !== undefined);
    }
    static getADORunId() {
        if (process.env["RELEASE_DEFINITIONID"] && process.env["RELEASE_DEPLOYMENTID"]) {
            return `${process.env["RELEASE_DEFINITIONID"]}-${process.env["RELEASE_DEPLOYMENTID"]}`;
        }
        else if (process.env["SYSTEM_DEFINITIONID"] && process.env["SYSTEM_JOBID"]) {
            return `${process.env["SYSTEM_DEFINITIONID"]}-${process.env["SYSTEM_JOBID"]}`;
        }
        return null;
    }
    static getGHBranchName() {
        if (process.env["GITHUB_EVENT_NAME"] === "pull_request" ||
            process.env["GITHUB_EVENT_NAME"] === "pull_request_target") {
            return process.env["GITHUB_HEAD_REF"];
        }
        else {
            return process.env["GITHUB_REF_NAME"];
        }
    }
}
//# sourceMappingURL=cIInfoProvider.js.map