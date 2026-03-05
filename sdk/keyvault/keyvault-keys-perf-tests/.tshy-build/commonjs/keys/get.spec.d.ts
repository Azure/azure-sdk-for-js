import { PerfOptionDictionary, PerfTest } from "@azure-tools/test-perf";
import { KeyClient } from "@azure/keyvault-keys";
interface KeyPerfTestOptions {
    keySize: number;
}
export declare abstract class KeyTest extends PerfTest<KeyPerfTestOptions> {
    options: PerfOptionDictionary<KeyPerfTestOptions>;
    keyClient: KeyClient;
    static keyName: string;
    constructor();
    globalSetup(): Promise<void>;
    globalCleanup(): Promise<void>;
}
export declare class GetKeyTest extends KeyTest {
    run(): Promise<void>;
}
export {};
//# sourceMappingURL=get.spec.d.ts.map