import type { PlaywrightServiceAdditionalOptions, OsType } from "./types.js";
declare class PlaywrightServiceConfig {
    serviceOs: OsType;
    runId: string;
    timeout: number;
    slowMo: number;
    exposeNetwork: string;
    runName: string;
    constructor();
    setOptions: (options?: PlaywrightServiceAdditionalOptions) => void;
}
export { PlaywrightServiceConfig };
//# sourceMappingURL=playwrightServiceConfig.d.ts.map