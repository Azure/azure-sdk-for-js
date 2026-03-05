import { SecretClient } from "@azure/keyvault-secrets";
import { PerfTest } from "@azure-tools/test-perf";
export declare abstract class SecretTest<TOptions = Record<string, unknown>> extends PerfTest<TOptions> {
    secretClient: SecretClient;
    constructor();
    deleteAndPurgeSecrets(...names: string[]): Promise<void>;
}
//# sourceMappingURL=secretTest.d.ts.map