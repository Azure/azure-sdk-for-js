import type { HttpPolicy, HttpRequest, HttpResponse } from "some-http-lib";
export interface ClientOptions {
    endpoint: string;
    timeout?: number;
    policies?: HttpPolicy[];
}
export interface Resource {
    id: string;
    name: string;
    createdAt: Date;
}
export declare abstract class BaseClient {
    protected readonly endpoint: string;
    constructor(options: ClientOptions);
    abstract listResources(): Promise<Resource[]>;
    abstract sendRequest(request: HttpRequest): Promise<HttpResponse>;
}
