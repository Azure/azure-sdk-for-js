import { HttpClient } from "@azure/core-rest-pipeline";
/**
 * Supposed to be used in record and playback modes.
 * Has no effect in live mode.
 *
 *  1. The key-value pairs will be used as the environment variables in playback mode.
 *  2. If the env variables are present in the recordings as plain strings, they will be replaced with the provided values in record mode
 */
export declare function handleEnvSetup(httpClient: HttpClient, url: string, recordingId: string, envSetupForPlayback: Record<string, string>): Promise<void>;
//# sourceMappingURL=envSetupForPlayback.d.ts.map