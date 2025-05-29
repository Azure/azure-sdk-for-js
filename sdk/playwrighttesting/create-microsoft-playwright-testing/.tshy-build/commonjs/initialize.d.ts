import type { PlaywrightServiceInitConfig } from "./types.js";
export declare class PlaywrightServiceInitialize {
    private _setupConfig;
    private _packageManager;
    constructor(setupConfig: PlaywrightServiceInitConfig);
    addServiceSupportToTestSuite: () => Promise<void>;
    private checkIfServiceConfigCanBeAdded;
    private promptOnCancel;
    private isServiceConfigFileAlreadyPresent;
    private displayAdditionalInformation;
    private installServicePackage;
    private createServiceConfig;
    private getServiceConfigContent;
    private getServiceConfigFileName;
}
//# sourceMappingURL=initialize.d.ts.map