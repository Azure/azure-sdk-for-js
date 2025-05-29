import type { VersionInfo } from "../common/types.js";
import type { TokenCredential } from "@azure/identity";
export { getPlaywrightVersion } from "./getPlaywrightVersion.js";
export { parseJwt } from "./parseJwt.js";
export declare const exitWithFailureMessage: (error: {
    key: string;
    message: string;
}) => never;
export declare const populateValuesFromServiceUrl: () => {
    region: string;
    accountId: string;
} | null;
export declare const getAccessToken: () => string | undefined;
export declare const getServiceBaseURL: () => string | undefined;
export declare const getAndSetRunId: () => string;
export declare const getServiceWSEndpoint: (runId: string, os: string) => string;
export declare const validateServiceUrl: () => void;
export declare const validateMptPAT: (validationFailureCallback: (error: {
    key: string;
    message: string;
}) => void) => void;
export declare const warnIfAccessTokenCloseToExpiry: () => void;
export declare const fetchOrValidateAccessToken: (credential?: TokenCredential) => Promise<string>;
export declare const emitReportingUrl: () => void;
export declare const getPackageVersion: () => string;
export declare const getVersionInfo: (version: string) => VersionInfo;
export declare const validatePlaywrightVersion: () => void;
//# sourceMappingURL=utils.d.ts.map