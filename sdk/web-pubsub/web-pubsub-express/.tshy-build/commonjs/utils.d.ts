import type { IncomingMessage } from "node:http";
export declare function toBase64JsonString(obj: Record<string, any>): string;
export declare function fromBase64JsonString(base64String: string | undefined): Record<string, any>;
export declare function getHttpHeader(req: IncomingMessage, key: string): string | undefined;
export declare function readRequestBody(req: IncomingMessage): Promise<Buffer>;
//# sourceMappingURL=utils.d.ts.map