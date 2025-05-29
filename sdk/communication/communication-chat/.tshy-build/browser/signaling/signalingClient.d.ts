import type { SignalingClient } from "@azure/communication-signaling";
import type { CommunicationTokenCredential } from "@azure/communication-common";
import type { AzureLogger } from "@azure/logger";
import type { SignalingClientOptions } from "./signalingClientOptions.js";
export declare const getSignalingClient: (credential: CommunicationTokenCredential, logger: AzureLogger, options?: SignalingClientOptions) => SignalingClient | undefined;
//# sourceMappingURL=signalingClient-browser.d.mts.map