import * as http from "http";
import * as https from "https";
import * as url from "url";
import { NodejsPlatformConfig } from "../../types";

/**
 * TODO: These were not added to @types/node until v12,
 * but are available as of node 6.3. Move to imports once node types
 * support this.
 */
const constants = require('crypto');

// Used when sending via HTTPS without a passed in agent. Use one that enforces our TLS rules
const tlsRestrictedAgent = new https.Agent(<any>{
  secureOptions:
    // eslint-disable-next-line no-bitwise
    constants.SSL_OP_NO_SSLv2 |
    constants.SSL_OP_NO_SSLv3 |
    constants.SSL_OP_NO_TLSv1 |
    constants.SSL_OP_NO_TLSv1_1,
});

export function makeRequest(
  config: NodejsPlatformConfig,
  endpointUrl: string,
  requestOptions: http.RequestOptions | https.RequestOptions,
  requestCallback: (res: http.IncomingMessage) => void,
): http.ClientRequest {
  let requestUrl = endpointUrl;
  if (requestUrl && requestUrl.startsWith("//")) {
    requestUrl = `https:${requestUrl}`;
  }

  const requestUrlParsed = new url.URL(requestUrl);
  let options = {
    ...requestOptions,
    host: requestUrlParsed.hostname,
    port: requestUrlParsed.port,
    path: requestUrlParsed.pathname,
  };

  let proxyUrl: string | undefined;

  if (requestUrlParsed.protocol === "https:") {
    proxyUrl = config.proxyHttpsUrl || undefined;
  }
  if (requestUrlParsed.protocol === "http:") {
    proxyUrl = config.proxyHttpUrl || undefined;
  }

  if (proxyUrl) {
    if (proxyUrl.startsWith("//")) {
      proxyUrl = `http:${proxyUrl}`;
    }
    const proxyUrlParsed = new url.URL(proxyUrl);

    // https is not supported at the moment
    if (proxyUrlParsed.protocol === "https:") {
      proxyUrl = undefined;
    } else {
      options = {
        ...options,
        host: proxyUrlParsed.hostname,
        port: proxyUrlParsed.port || "80",
        path: requestUrl,
        headers: { ...options.headers, Host: requestUrlParsed.hostname },
      };
    }
  }

  const isHttps = requestUrlParsed.protocol === "https:" && !proxyUrl;

  if (isHttps && config.httpsAgent !== undefined) {
    options.agent = config.httpsAgent;
  } else if (!isHttps && config.httpAgent !== undefined) {
    options.agent = config.httpAgent;
  } else if (isHttps) {
    // HTTPS without a passed in agent. Use one that enforces our TLS rules
    options.agent = tlsRestrictedAgent;
  }

  if (isHttps) {
    return https.request(<any>options, requestCallback);
  }
  return http.request(<any>options, requestCallback);
}
