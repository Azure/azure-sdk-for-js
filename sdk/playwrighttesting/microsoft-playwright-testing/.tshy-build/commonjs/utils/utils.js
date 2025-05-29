"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePlaywrightVersion = exports.getVersionInfo = exports.getPackageVersion = exports.emitReportingUrl = exports.fetchOrValidateAccessToken = exports.warnIfAccessTokenCloseToExpiry = exports.validateMptPAT = exports.validateServiceUrl = exports.getServiceWSEndpoint = exports.getAndSetRunId = exports.getServiceBaseURL = exports.getAccessToken = exports.populateValuesFromServiceUrl = exports.exitWithFailureMessage = exports.parseJwt = exports.getPlaywrightVersion = void 0;
const tslib_1 = require("tslib");
const constants_js_1 = require("../common/constants.js");
const messages_js_1 = require("../common/messages.js");
const logger_js_1 = require("../common/logger.js");
const reporterUtils_js_1 = tslib_1.__importDefault(require("./reporterUtils.js"));
const cIInfoProvider_js_1 = require("./cIInfoProvider.js");
const process = tslib_1.__importStar(require("node:process"));
const parseJwt_js_1 = require("./parseJwt.js");
const getPlaywrightVersion_js_1 = require("./getPlaywrightVersion.js");
const entraIdAccessToken_js_1 = require("../common/entraIdAccessToken.js");
// Re-exporting for backward compatibility
var getPlaywrightVersion_js_2 = require("./getPlaywrightVersion.js");
Object.defineProperty(exports, "getPlaywrightVersion", { enumerable: true, get: function () { return getPlaywrightVersion_js_2.getPlaywrightVersion; } });
var parseJwt_js_2 = require("./parseJwt.js");
Object.defineProperty(exports, "parseJwt", { enumerable: true, get: function () { return parseJwt_js_2.parseJwt; } });
const exitWithFailureMessage = (error) => {
    console.log();
    console.error(error.message);
    // eslint-disable-next-line n/no-process-exit
    process.exit(1);
};
exports.exitWithFailureMessage = exitWithFailureMessage;
const populateValuesFromServiceUrl = () => {
    // Service URL format: wss://<region>.api.playwright.microsoft.com/accounts/<workspace-id>/browsers
    const url = process.env["PLAYWRIGHT_SERVICE_URL"];
    if (!reporterUtils_js_1.default.isNullOrEmpty(url)) {
        const parts = url.split("/");
        if (parts.length > 2) {
            const subdomainParts = parts[2].split(".");
            const region = subdomainParts.length > 0 ? subdomainParts[0] : null;
            const accountId = parts[4];
            return { region: region, accountId: accountId };
        }
    }
    return null;
};
exports.populateValuesFromServiceUrl = populateValuesFromServiceUrl;
const getAccessToken = () => {
    return process.env[constants_js_1.ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN];
};
exports.getAccessToken = getAccessToken;
const getServiceBaseURL = () => {
    return process.env[constants_js_1.ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_URL];
};
exports.getServiceBaseURL = getServiceBaseURL;
const getAndSetRunId = () => {
    const runId = reporterUtils_js_1.default.getRunId(cIInfoProvider_js_1.CIInfoProvider.getCIInfo());
    process.env[constants_js_1.InternalEnvironmentVariables.MPT_SERVICE_RUN_ID] = runId;
    return runId;
};
exports.getAndSetRunId = getAndSetRunId;
const getServiceWSEndpoint = (runId, os) => {
    return `${(0, exports.getServiceBaseURL)()}?runId=${encodeURIComponent(runId)}&os=${os}&api-version=${constants_js_1.API_VERSION}`;
};
exports.getServiceWSEndpoint = getServiceWSEndpoint;
const validateServiceUrl = () => {
    const serviceUrl = (0, exports.getServiceBaseURL)();
    if (!serviceUrl) {
        (0, exports.exitWithFailureMessage)(messages_js_1.ServiceErrorMessageConstants.NO_SERVICE_URL_ERROR);
    }
};
exports.validateServiceUrl = validateServiceUrl;
const validateMptPAT = (validationFailureCallback) => {
    try {
        const accessToken = (0, exports.getAccessToken)();
        const result = (0, exports.populateValuesFromServiceUrl)();
        if (!accessToken) {
            validationFailureCallback(messages_js_1.ServiceErrorMessageConstants.NO_AUTH_ERROR);
        }
        const claims = (0, parseJwt_js_1.parseJwt)(accessToken);
        if (!claims.exp) {
            validationFailureCallback(messages_js_1.ServiceErrorMessageConstants.INVALID_MPT_PAT_ERROR);
        }
        if (Date.now() >= claims.exp * 1000) {
            validationFailureCallback(messages_js_1.ServiceErrorMessageConstants.EXPIRED_MPT_PAT_ERROR);
        }
        if (result.accountId !== claims.aid) {
            validationFailureCallback(messages_js_1.ServiceErrorMessageConstants.WORKSPACE_MISMATCH_ERROR);
        }
    }
    catch (err) {
        logger_js_1.coreLogger.error(err);
        (0, exports.exitWithFailureMessage)(messages_js_1.ServiceErrorMessageConstants.INVALID_MPT_PAT_ERROR);
    }
};
exports.validateMptPAT = validateMptPAT;
const isTokenExpiringSoon = (expirationTime, currentTime) => {
    return expirationTime * 1000 - currentTime <= constants_js_1.Constants.sevenDaysInMs;
};
const warnAboutTokenExpiry = (expirationTime, currentTime) => {
    const daysToExpiration = Math.ceil((expirationTime * 1000 - currentTime) / constants_js_1.Constants.oneDayInMs);
    const expirationDate = new Date(expirationTime * 1000).toLocaleDateString();
    const expirationWarning = `Warning: The access token used for this test run will expire in ${daysToExpiration} days on ${expirationDate}. Generate a new token from the portal to avoid failures. For a simpler, more secure solution, switch to Microsoft Entra ID and eliminate token management. https://learn.microsoft.com/en-us/entra/identity/`;
    console.warn(expirationWarning);
};
const warnIfAccessTokenCloseToExpiry = () => {
    const accessToken = (0, exports.getAccessToken)();
    const claims = (0, parseJwt_js_1.parseJwt)(accessToken);
    const currentTime = Date.now();
    if (isTokenExpiringSoon(claims.exp, currentTime)) {
        warnAboutTokenExpiry(claims.exp, currentTime);
    }
};
exports.warnIfAccessTokenCloseToExpiry = warnIfAccessTokenCloseToExpiry;
const fetchOrValidateAccessToken = async (credential) => {
    const entraIdAccessToken = (0, entraIdAccessToken_js_1.createEntraIdAccessToken)(credential);
    if (entraIdAccessToken.token && entraIdAccessToken.doesEntraIdAccessTokenNeedRotation()) {
        await entraIdAccessToken.fetchEntraIdAccessToken();
    }
    if (!(0, exports.getAccessToken)()) {
        throw new Error(messages_js_1.ServiceErrorMessageConstants.NO_AUTH_ERROR.message);
    }
    return (0, exports.getAccessToken)();
};
exports.fetchOrValidateAccessToken = fetchOrValidateAccessToken;
const emitReportingUrl = () => {
    const regex = /wss:\/\/([\w-]+)\.api\.(playwright(?:-test|-int)?\.io|playwright\.microsoft\.com)\//;
    const url = (0, exports.getServiceBaseURL)();
    const match = url === null || url === void 0 ? void 0 : url.match(regex);
    if (match && match.length >= 3) {
        const [, region, domain] = match;
        process.env[constants_js_1.InternalEnvironmentVariables.MPT_SERVICE_REPORTING_URL] =
            `https://${region}.reporting.api.${domain}`;
    }
};
exports.emitReportingUrl = emitReportingUrl;
const getPackageVersion = () => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const version = require("../../package.json").version;
        return version;
    }
    catch (error) {
        console.error("Error fetching package version:", error);
        return "unknown version";
    }
};
exports.getPackageVersion = getPackageVersion;
const getVersionInfo = (version) => {
    const regex = /^(\d+)(?:\.(\d+))?(?:\.(\d+))?/;
    const match = version.match(regex);
    const versionInfo = {
        major: 0,
        minor: 0,
        patch: 0,
    };
    versionInfo.major = match && match[1] ? parseInt(match[1], 10) : 0;
    versionInfo.minor = match && match[2] ? parseInt(match[2], 10) : 0;
    versionInfo.patch = match && match[3] ? parseInt(match[3], 10) : 0;
    return versionInfo;
};
exports.getVersionInfo = getVersionInfo;
const validatePlaywrightVersion = () => {
    const minimumSupportedVersion = constants_js_1.MINIMUM_SUPPORTED_PLAYWRIGHT_VERSION;
    const installedVersion = (0, getPlaywrightVersion_js_1.getPlaywrightVersion)();
    const minimumSupportedVersionInfo = (0, exports.getVersionInfo)(minimumSupportedVersion);
    const installedVersionInfo = (0, exports.getVersionInfo)(installedVersion);
    const isInstalledVersionGreater = installedVersionInfo.major > minimumSupportedVersionInfo.major ||
        (installedVersionInfo.major === minimumSupportedVersionInfo.major &&
            installedVersionInfo.minor >= minimumSupportedVersionInfo.minor);
    if (!isInstalledVersionGreater) {
        (0, exports.exitWithFailureMessage)(messages_js_1.ServiceErrorMessageConstants.INVALID_PLAYWRIGHT_VERSION_ERROR);
    }
};
exports.validatePlaywrightVersion = validatePlaywrightVersion;
//# sourceMappingURL=utils.js.map