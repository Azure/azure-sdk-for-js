import { HttpClient } from "@azure/core-rest-pipeline";
export type RecordingOptions = {
    handleRedirects?: boolean;
    tlsValidationCert?: string;
};
export declare function setRecordingOptions(recorderUrl: string, httpClient: HttpClient, { handleRedirects, tlsValidationCert }: RecordingOptions): Promise<void>;
//# sourceMappingURL=options.d.ts.map