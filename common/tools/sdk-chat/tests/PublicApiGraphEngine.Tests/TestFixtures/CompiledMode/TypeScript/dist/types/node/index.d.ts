import type { HttpRequest, HttpResponse } from "some-http-lib";
import { BaseClient, ClientOptions, Resource } from "../index.js";
export interface NodeClientOptions extends ClientOptions {
    certPath?: string;
    useHttp2?: boolean;
}
export declare class NodeClient extends BaseClient {
    constructor(options: NodeClientOptions);
    listResources(): Promise<Resource[]>;
    streamToFile(resourceId: string, filePath: string): Promise<void>;
    readFromFile(filePath: string): Promise<Resource>;
    sendRequest(request: HttpRequest): Promise<HttpResponse>;
}
export { ClientOptions, Resource } from "../index.js";
