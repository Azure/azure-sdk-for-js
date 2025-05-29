import * as coreHttpCompat from "@azure/core-http-compat";
import { Service, Queue, Messages, MessageId } from "./operationsInterfaces/index.js";
import { StorageClientOptionalParams } from "./models/index.js";
export declare class StorageClient extends coreHttpCompat.ExtendedServiceClient {
    url: string;
    version: string;
    /**
     * Initializes a new instance of the StorageClient class.
     * @param url The URL of the service account, queue or message that is the target of the desired
     *            operation.
     * @param options The parameter options
     */
    constructor(url: string, options?: StorageClientOptionalParams);
    service: Service;
    queue: Queue;
    messages: Messages;
    messageId: MessageId;
}
//# sourceMappingURL=storageClient.d.ts.map