import type { SipTrunk } from "./models.js";
import type { TrunkUpdate as RestSipTrunk } from "./generated/src/siprouting/models/index.js";
/**
 * @internal
 * Transforming SIP trunks REST model to SDK model
 */
export declare function transformFromRestModel(trunks: {
    [propertyName: string]: RestSipTrunk;
} | undefined): SipTrunk[];
/**
 * @internal
 * Transforming SIP trunks SDK model to REST model
 */
export declare function transformIntoRestModel(trunks: SipTrunk[]): {
    [propertyName: string]: RestSipTrunk;
};
//# sourceMappingURL=mappers.d.ts.map