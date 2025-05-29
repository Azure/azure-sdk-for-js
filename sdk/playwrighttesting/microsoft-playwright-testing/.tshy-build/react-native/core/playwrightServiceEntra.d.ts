import type { TokenCredential } from "@azure/identity";
declare class PlaywrightServiceEntra {
    private _entraIdAccessTokenRotationInterval?;
    private static instance;
    private _entraIdAccessToken;
    static getInstance: () => PlaywrightServiceEntra;
    set entraIdAccessToken(credential: TokenCredential);
    constructor();
    globalSetup: () => Promise<void>;
    globalTeardown: () => void;
    private entraIdGlobalSetupRotationHandler;
    private entraIdAccessTokenRotation;
}
declare const instance: PlaywrightServiceEntra;
export default instance;
//# sourceMappingURL=playwrightServiceEntra.d.ts.map