import type { CommunicationTokenCredential } from "@azure/communication-common";
import type { PipelinePolicy } from "@azure/core-rest-pipeline";
/**
 * Creates a new CommunicationTokenCredentialPolicy factory.
 *
 * @param credential - The CommunicationTokenCredential implementation that can supply the user credential.
 */
export declare const createCommunicationTokenCredentialPolicy: (credential: CommunicationTokenCredential) => PipelinePolicy;
//# sourceMappingURL=communicationTokenCredentialPolicy.d.ts.map