import type { SasTokenProperties } from "../client/SasToken/SasTokenProperties.js";
/**
 * Experimental internal only
 * Generates the payload representing the permission configuration for the sas token.
 */
export declare function createAuthorizationSasToken(masterKey: string, sasTokenProperties: SasTokenProperties): Promise<string>;
/**
 * @hidden
 */
export declare function utcsecondsSinceEpoch(date: Date): number;
//# sourceMappingURL=SasToken.d.ts.map