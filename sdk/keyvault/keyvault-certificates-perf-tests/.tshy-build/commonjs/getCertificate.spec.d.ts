import { PerfTest } from "@azure-tools/test-perf";
import { CertificateClient } from "@azure/keyvault-certificates";
export declare abstract class CertificateTest extends PerfTest {
    options: {};
    certificateClient: CertificateClient;
    static certificateName: string;
    constructor();
    globalSetup(): Promise<void>;
    globalCleanup(): Promise<void>;
}
export declare class GetCertificateTest extends CertificateTest {
    options: {};
    run(): Promise<void>;
}
//# sourceMappingURL=getCertificate.spec.d.ts.map