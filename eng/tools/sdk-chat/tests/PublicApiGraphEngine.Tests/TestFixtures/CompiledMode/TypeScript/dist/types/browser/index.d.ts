import type { HttpRequest, HttpResponse } from "some-http-lib";
import { BaseClient, ClientOptions, Resource } from "../index.js";
export interface BrowserClientOptions extends ClientOptions {
    useAbortController?: boolean;
    fetchImpl?: typeof fetch;
}
export declare class BrowserClient extends BaseClient {
    constructor(options: BrowserClientOptions);
    listResources(): Promise<Resource[]>;
    openInNewTab(resourceId: string): void;
    downloadAsBlob(resourceId: string): Promise<Blob>;
    sendRequest(request: HttpRequest): Promise<HttpResponse>;
}
export { ClientOptions, Resource } from "../index.js";
