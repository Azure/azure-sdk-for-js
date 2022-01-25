declare module "node-fetch" {
  import { Agent } from "http";

  interface URLLike {
    href: string;
}
  export type RequestInfo = string | URLLike | Request;
  export interface RequestInit {
    // whatwg/fetch standard options
    body?: BodyInit | undefined;
    headers?: HeadersInit | undefined;
    method?: string | undefined;
    redirect?: RequestRedirect | undefined;
    signal?: AbortSignal | null | undefined;

    // node-fetch extensions
    agent?: Agent | ((parsedUrl: URL) => Agent) | undefined; // =null http.Agent instance, allows custom proxy, certificate etc.
    compress?: boolean | undefined; // =true support gzip/deflate content encoding. false to disable
    follow?: number | undefined; // =20 maximum redirect count. 0 to not follow redirect
    size?: number | undefined; // =0 maximum response body size in bytes. 0 to disable
    timeout?: number | undefined; // =0 req/res timeout in ms, it resets on redirect. 0 to disable (OS limit applies)

    // node-fetch does not support mode, cache or credentials options
}

  export default function fetch(
    url: RequestInfo,
    init?: RequestInit
): Promise<Response>;}