import { PerfOptionDictionary, PerfTest } from "@azure-tools/test-perf";
import { CryptographyClient, KeyClient } from "@azure/keyvault-keys";
interface CryptographyPerfTestOptions {
    keySize: number;
}
export declare abstract class CryptographyTest extends PerfTest<CryptographyPerfTestOptions> {
    options: PerfOptionDictionary<CryptographyPerfTestOptions>;
    keyClient: KeyClient;
    static cryptoClient?: CryptographyClient;
    static keyName: string;
    constructor();
    globalSetup(): Promise<void>;
    globalCleanup(): Promise<void>;
}
export {};
//# sourceMappingURL=cryptography.spec.d.ts.map