declare class CustomerConfig {
    private static instance;
    globalSetup?: string | string[];
    globalTeardown?: string | string[];
    static getInstance(): CustomerConfig;
}
declare const customerConfig: CustomerConfig;
export default customerConfig;
//# sourceMappingURL=customerConfig.d.ts.map