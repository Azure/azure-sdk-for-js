import type { IncomingMessage, ServerResponse } from "node:http";
import type { WebPubSubEventHandlerOptions } from "./cloudEventsProtocols.js";
/**
 * @internal
 */
export declare class CloudEventsDispatcher {
    private hub;
    private eventHandler?;
    private readonly _allowAll;
    private readonly _allowedOrigins;
    constructor(hub: string, eventHandler?: WebPubSubEventHandlerOptions | undefined);
    handlePreflight(req: IncomingMessage, res: ServerResponse): boolean;
    handleRequest(request: IncomingMessage, response: ServerResponse): Promise<boolean>;
}
//# sourceMappingURL=cloudEventsDispatcher.d.ts.map