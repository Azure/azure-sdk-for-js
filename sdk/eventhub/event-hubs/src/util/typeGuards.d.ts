import type { NamedKeyCredential, SASCredential, TokenCredential } from "@azure/core-auth";
/**
 * Typeguard that checks if the input is a credential type the clients accept.
 * @param thing - Any object.
 * @internal
 */
export declare function isCredential(thing: unknown): thing is TokenCredential | NamedKeyCredential | SASCredential;
//# sourceMappingURL=typeGuards.d.ts.map