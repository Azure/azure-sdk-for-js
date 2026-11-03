# Additional Policy for Debug Logging

| :boom: | **This is meant to be used by Azure SDK developers investigating bugs. The request policy on this page ***WILL*** log sensitive information to the Node.js console.** |
|-----------|-------|

Default Azure SDK logging systems do not log request bodies, even in _verbose_ mode. This is to prevent the logging of sensitive information from the request body.

Sometimes, it's useful to be able to dump a request trace to the console anyway. You may need to do so to investigate a bug or to accurately report an issue. For those cases, an "additional policy" may be used in the pipeline that logs the request contents.

Such policies must _ONLY_ be used for debugging, as the information in the request and response must be assumed to be sensitive.

Here's one that logs the request headers and body as well as the response information (status code, headers, and body).

```ts
import { PipelineResponse } from "@azure/core-rest-pipeline";
import { AdditionalPolicyConfig } from "@azure/core-client";

const debugLoggingPolicy: AdditionalPolicyConfig = {
  position: "perCall",
  policy: {
    name: "debugLoggingPolicy",
    async sendRequest(request, next) {
      console.log(`${request.method} ${request.url}`);
      console.log("  Headers:");
      for (const [header, value] of request.headers) {
        console.log(`    ${header}: ${value}`);
      }
      console.log(
        `  Body: ${
          request.headers.get("Content-Type")?.trim().startsWith("application/json")
            ? JSON.stringify(JSON.parse(request.body?.toString() ?? ""), null, 4)
            : JSON.stringify(request.body?.toString())
        }`
      );

      const response: PipelineResponse = await next(request);

      console.log("Response:");
      console.log(
        `  Status: ${response.status} ${httpStatusNames[response.status] ?? "<unknown>"}`
      );
      console.log("  Headers:");
      for (const [header, value] of response.headers) {
        console.log(`    ${header}: ${value}`);
      }
      console.log(
        `  Body: ${
          response.headers.get("content-type")?.trim().startsWith("application/json")
            ? JSON.stringify(JSON.parse(response.bodyAsText ?? ""), null, 4)
            : JSON.stringify(response.bodyAsText)
        }`
      );

      return response;
    },
  },
};

const httpStatusNames = {
  200: "OK",
  201: "Created",
  202: "Accepted",
  203: "Non-Authoritative Information",
  204: "No Content",
  205: "Reset Content",
  206: "Partial Content",
  207: "Multi-Status",
  208: "Already Reported",
  226: "IM Used",

  300: "Multiple Choices",
  301: "Moved Permanently",
  302: "Found",
  303: "See Other",
  304: "Not Modified",
  305: "Use Proxy",
  306: "unused",
  307: "Temporary Redirect",
  308: "Permanent Redirect",

  400: "Bad Request",
  401: "Unauthorized",
  402: "Payment Required",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  406: "Not Acceptable",
  407: "Proxy Authentication Required",
  408: "Request Timeout",
  409: "Conflict",
  410: "Gone",
  411: "Length Required",
  412: "Precondition Failed",
  413: "Payload Too Large",
  414: "URI Too Long",
  415: "Unsupported Media Type",
  416: "Range Not Satisfiable",
  417: "Expectation Failed",
  418: "I'm a teapot",
  421: "Misdirected Request",
  422: "Unprocessable Content",
  423: "Locked",
  424: "Failed Dependency",
  425: "Too Early",
  426: "Upgrade Required",
  428: "Precondition Required",
  429: "Too Many Requests",
  431: "Request Header Fields Too Large",
  451: "Unavailable For Legal Reasons",

  500: "Internal Server Error",
  501: "Not Implemented",
  502: "Bad Gateway",
  503: "Service Unavailable",
  504: "Gateway Timeout",
  505: "HTTP Version Not Supported",
  506: "Variant Also Negotiates",
  507: "Insufficient Storage",
  508: "Loop Detected",
  510: "Not Extended",
  511: "Network Authentication Required",
} as { [code: number]: string | undefined };
```

This may be installed into a client during construction using the `additionalPolicies` option:

```ts
// Assuming the options bag inherits from CommonClientOptions as it should
const client = new Client(endpoint, credential, {
  additionalPolicies: [debugLoggingPolicy],
});
```

Note that the policy runs _after_ the default policies but _before_ any policies that are appended to the pipeline by the client itself, so for example it runs _after_ the retry policy, but _before_ an appended KeyCredentialPolicy or BearerTokenAuthenticationPolicy.