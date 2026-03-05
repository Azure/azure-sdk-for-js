import { PerfOptionDictionary } from "@azure-tools/test-perf";
import { SecretTest } from "./secretTest.js";
interface ListSecretPerfTestOptions {
    count: number;
}
export declare class ListSecretsTest extends SecretTest<ListSecretPerfTestOptions> {
    static secretsToDelete: string[];
    options: PerfOptionDictionary<ListSecretPerfTestOptions>;
    globalSetup(): Promise<void>;
    run(): Promise<void>;
    globalCleanup(): Promise<void>;
}
export {};
//# sourceMappingURL=listSecrets.spec.d.ts.map