let nock = require("nock");

module.exports.hash = "5903f00c312e087726bd614c8a1fdf09";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://login.microsoftonline.com:443", { encodedQueryParams: true })
  .post(
    "/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token",
    "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fmanagement.core.windows.net%2F.default"
  )
  .reply(
    200,
    {
      token_type: "Bearer",
      expires_in: 86399,
      ext_expires_in: 86399,
      access_token: "access_token"
    },
    [
      "Cache-Control",
      "no-store, no-cache",
      "Pragma",
      "no-cache",
      "Content-Length",
      "1361",
      "Content-Type",
      "application/json; charset=utf-8",
      "Expires",
      "-1",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
      "X-Content-Type-Options",
      "nosniff",
      "P3P",
      'CP="DSP CUR OTPi IND OTRi ONL FIN"',
      "x-ms-request-id",
      "dbb157e9-2b32-4b4f-a860-e78a79f30700",
      "x-ms-ests-server",
      "2.1.11562.10 - EUS ProdSlices",
      "Set-Cookie",
      "fpc=AubVabojdJVHvZY0mJSQ0Yl12iTZAQAAAFeL-dcOAAAA; expires=Sun, 02-May-2021 22:02:00 GMT; path=/; secure; HttpOnly; SameSite=None",
      "Set-Cookie",
      "x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly",
      "Set-Cookie",
      "stsservicecookie=estsfd; path=/; secure; samesite=none; httponly",
      "Date",
      "Fri, 02 Apr 2021 22:01:59 GMT",
      "Connection",
      "close"
    ]
  );

nock("https://myregistry.azurecr.io:443", { encodedQueryParams: true })
  .get("/acr/v1/_catalog")
  .reply(
    401,
    {
      errors: [
        {
          code: "UNAUTHORIZED",
          message:
            "authentication required, visit https://aka.ms/acr/authorization for more information.",
          detail: [{ Type: "registry", Name: "catalog", Action: "*" }]
        }
      ]
    },
    [
      "Server",
      "openresty",
      "Date",
      "Fri, 02 Apr 2021 22:02:00 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "196",
      "Connection",
      "close",
      "Access-Control-Expose-Headers",
      "Docker-Content-Digest",
      "Access-Control-Expose-Headers",
      "WWW-Authenticate",
      "Access-Control-Expose-Headers",
      "Link",
      "Access-Control-Expose-Headers",
      "X-Ms-Correlation-Request-Id",
      "Docker-Distribution-Api-Version",
      "registry/2.0",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
      "Www-Authenticate",
      'Bearer realm="https://myregistry.azurecr.io/oauth2/token",service="myregistry.azurecr.io",scope="registry:catalog:*",error="invalid_token"',
      "X-Content-Type-Options",
      "nosniff",
      "X-Ms-Correlation-Request-Id",
      "e3e860e3-d414-4c0a-b0ea-5cf8b4dc8965",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    ]
  );

nock("https://myregistry.azurecr.io:443", { encodedQueryParams: true })
  .post(
    "/oauth2/exchange",
    "grant_type=access_token&service=myregistry.azurecr.io&access_token=access_token"
  )
  .reply(200, { refresh_token: "refresh_token" }, [
    "Server",
    "openresty",
    "Date",
    "Fri, 02 Apr 2021 22:02:01 GMT",
    "Content-Type",
    "application/json; charset=utf-8",
    "Transfer-Encoding",
    "chunked",
    "Connection",
    "close",
    "X-Ms-Correlation-Request-Id",
    "a7cb89bb-679c-4fe5-8c13-f33e1638d676",
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains"
  ]);

nock("https://myregistry.azurecr.io:443", { encodedQueryParams: true })
  .post(
    "/oauth2/token",
    "grant_type=refresh_token&service=myregistry.azurecr.io&refresh_token=refresh_token&scope=registry%3Acatalog%3A*"
  )
  .reply(200, { access_token: "access_token" }, [
    "Server",
    "openresty",
    "Date",
    "Fri, 02 Apr 2021 22:02:01 GMT",
    "Content-Type",
    "application/json; charset=utf-8",
    "Transfer-Encoding",
    "chunked",
    "Connection",
    "close",
    "X-Ms-Correlation-Request-Id",
    "6729ddff-a1bf-4dde-8ac9-e109b5dec5ef",
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains"
  ]);

nock("https://myregistry.azurecr.io:443", { encodedQueryParams: true })
  .get("/acr/v1/_catalog")
  .reply(200, { repositories: null }, [
    "Server",
    "openresty",
    "Date",
    "Fri, 02 Apr 2021 22:02:02 GMT",
    "Content-Type",
    "application/json; charset=utf-8",
    "Content-Length",
    "22",
    "Connection",
    "close",
    "Access-Control-Expose-Headers",
    "Docker-Content-Digest",
    "Access-Control-Expose-Headers",
    "WWW-Authenticate",
    "Access-Control-Expose-Headers",
    "Link",
    "Access-Control-Expose-Headers",
    "X-Ms-Correlation-Request-Id",
    "Docker-Distribution-Api-Version",
    "registry/2.0",
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains",
    "X-Content-Type-Options",
    "nosniff",
    "X-Ms-Correlation-Request-Id",
    "09974c71-4002-4be1-9381-84f4f3ae0cbc",
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains"
  ]);

nock("https://login.microsoftonline.com:443", { encodedQueryParams: true })
  .post(
    "/12345678-1234-1234-1234-123456789012/oauth2/token",
    "grant_type=client_credentials&client_id=azure_client_id&resource=https%3A%2F%2Fmanagement.core.windows.net%2F&client_secret=azure_client_secret"
  )
  .query(true)
  .reply(
    200,
    {
      token_type: "Bearer",
      expires_in: "86399",
      ext_expires_in: "86399",
      expires_on: "1617487322",
      not_before: "1617400622",
      resource: "https://management.core.windows.net/",
      access_token: "access_token"
    },
    [
      "Cache-Control",
      "no-store, no-cache",
      "Pragma",
      "no-cache",
      "Content-Length",
      "1468",
      "Content-Type",
      "application/json; charset=utf-8",
      "Expires",
      "-1",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
      "X-Content-Type-Options",
      "nosniff",
      "P3P",
      'CP="DSP CUR OTPi IND OTRi ONL FIN"',
      "client-request-id",
      "66eddc73-5eaa-4ccd-9c08-dc75a639b8ef",
      "x-ms-request-id",
      "f2c44925-8756-4542-afc7-f80caa870c00",
      "x-ms-ests-server",
      "2.1.11622.19 - WUS2 ProdSlices",
      "x-ms-clitelem",
      "1,0,0,,",
      "Set-Cookie",
      "fpc=ArIXbTH2lsRGkx1rfJEYq5BI-ePCAQAAAFqL-dcOAAAA; expires=Sun, 02-May-2021 22:02:02 GMT; path=/; secure; HttpOnly; SameSite=None",
      "Set-Cookie",
      "x-ms-gateway-slice=estsfd; path=/; secure; httponly",
      "Set-Cookie",
      "stsservicecookie=estsfd; path=/; secure; httponly",
      "Date",
      "Fri, 02 Apr 2021 22:02:02 GMT",
      "Connection",
      "close"
    ]
  );

nock("https://management.azure.com:443", { encodedQueryParams: true })
  .get("/subscriptions")
  .query(true)
  .reply(
    200,
    [
      "1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bd5ffc5131fbe8d147779bf5a499d6c5aa2daa6573f73ccb760e76b2f3ede9eeec607b7f279b6d3f9c4ef3ed7c37dbbfbf33cdee4fee3ff868f451b66ee7555dfc20c35bafab753d25901fbdaacafc49d6e4336ae1833d4347b7843c2b9a55995dbfc8168078fc83759da7af9ffe5ee9d3fc322fab555ea72fe9eb8bba5a2fb99b366bd1f074994dca5ec72fabb2981679f3d1a35ffc51594d195b7a7d9a2ff265cb589d2ddbbc5e66e5efbfb7b3bbbfbdf3707b679760fca275d5661bbe6f56f972562c2f9e178ba2a5565f9e9f7ff44b7ec9f77fc9ff035d6f48b25e010000"
    ],
    [
      "Cache-Control",
      "no-cache",
      "Pragma",
      "no-cache",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Encoding",
      "gzip",
      "Expires",
      "-1",
      "Vary",
      "Accept-Encoding",
      "x-ms-ratelimit-remaining-tenant-reads",
      "11999",
      "x-ms-request-id",
      "1e65b610-5ee5-4c5f-ab1d-234c25699521",
      "x-ms-correlation-request-id",
      "1e65b610-5ee5-4c5f-ab1d-234c25699521",
      "x-ms-routing-request-id",
      "WESTUS2:20210402T220202Z:1e65b610-5ee5-4c5f-ab1d-234c25699521",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
      "X-Content-Type-Options",
      "nosniff",
      "Date",
      "Fri, 02 Apr 2021 22:02:02 GMT",
      "Connection",
      "close",
      "Content-Length",
      "343"
    ]
  );

nock("https://management.azure.com:443", { encodedQueryParams: true })
  .post(
    "/subscriptions/subscription_id/resourceGroups/resource_group_id/providers/Microsoft.ContainerRegistry/registries/myregistry/importImage",
    {
      source: { registryUri: "registry.hub.docker.com", sourceImage: "library/hello-world" },
      targetTags: ["library/hello-world:latest"],
      mode: "Force"
    }
  )
  .query(true)
  .reply(202, null, [
    "Cache-Control",
    "no-cache",
    "Pragma",
    "no-cache",
    "Content-Length",
    "4",
    "Content-Type",
    "application/json; charset=utf-8",
    "Expires",
    "-1",
    "Location",
    "https://management.azure.com/subscriptions/subscription_id/providers/Microsoft.ContainerRegistry/locations/CENTRALUS/operationResults/registries-66803969-c824-4834-8a12-19cc7601a6e3?api-version=2019-12-01-preview",
    "Retry-After",
    "10",
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains",
    "x-ms-ratelimit-remaining-subscription-writes",
    "1199",
    "Server",
    "Microsoft-HTTPAPI/2.0",
    "x-ms-request-id",
    "6a6fb691-6717-41fe-83f8-0b3418a5de87",
    "x-ms-correlation-request-id",
    "6a6fb691-6717-41fe-83f8-0b3418a5de87",
    "x-ms-routing-request-id",
    "WESTUS2:20210402T220203Z:6a6fb691-6717-41fe-83f8-0b3418a5de87",
    "X-Content-Type-Options",
    "nosniff",
    "Date",
    "Fri, 02 Apr 2021 22:02:03 GMT",
    "Connection",
    "close"
  ]);

nock("https://management.azure.com:443", { encodedQueryParams: true })
  .get(
    "/subscriptions/subscription_id/providers/Microsoft.ContainerRegistry/locations/CENTRALUS/operationResults/registries-66803969-c824-4834-8a12-19cc7601a6e3"
  )
  .query(true)
  .reply(
    200,
    [
      "1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1474d9bb5ebe6a3471fbd5e4fa7793ecb671ffd",
      "92ff0720887be416000000"
    ],
    [
      "Cache-Control",
      "no-cache",
      "Pragma",
      "no-cache",
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Encoding",
      "gzip",
      "Expires",
      "-1",
      "Vary",
      "Accept-Encoding",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
      "x-ms-ratelimit-remaining-subscription-reads",
      "11997",
      "Server",
      "Microsoft-HTTPAPI/2.0",
      "x-ms-request-id",
      "4331c4b6-7c80-47ac-b0fd-fb1d6d3d5e41",
      "x-ms-correlation-request-id",
      "4331c4b6-7c80-47ac-b0fd-fb1d6d3d5e41",
      "x-ms-routing-request-id",
      "WESTUS2:20210402T220234Z:4331c4b6-7c80-47ac-b0fd-fb1d6d3d5e41",
      "X-Content-Type-Options",
      "nosniff",
      "Date",
      "Fri, 02 Apr 2021 22:02:33 GMT",
      "Connection",
      "close"
    ]
  );

nock("https://myregistry.azurecr.io:443", { encodedQueryParams: true })
  .get("/acr/v1/_catalog")
  .reply(
    401,
    {
      errors: [
        {
          code: "UNAUTHORIZED",
          message:
            "authentication required, visit https://aka.ms/acr/authorization for more information.",
          detail: [{ Type: "registry", Name: "catalog", Action: "*" }]
        }
      ]
    },
    [
      "Server",
      "openresty",
      "Date",
      "Fri, 02 Apr 2021 22:02:34 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "196",
      "Connection",
      "close",
      "Access-Control-Expose-Headers",
      "Docker-Content-Digest",
      "Access-Control-Expose-Headers",
      "WWW-Authenticate",
      "Access-Control-Expose-Headers",
      "Link",
      "Access-Control-Expose-Headers",
      "X-Ms-Correlation-Request-Id",
      "Docker-Distribution-Api-Version",
      "registry/2.0",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
      "Www-Authenticate",
      'Bearer realm="https://myregistry.azurecr.io/oauth2/token",service="myregistry.azurecr.io",scope="registry:catalog:*",error="invalid_token"',
      "X-Content-Type-Options",
      "nosniff",
      "X-Ms-Correlation-Request-Id",
      "149be127-9c5a-4b14-9f4f-e6307911b988",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    ]
  );

nock("https://myregistry.azurecr.io:443", { encodedQueryParams: true })
  .post(
    "/oauth2/exchange",
    "grant_type=access_token&service=myregistry.azurecr.io&access_token=access_token"
  )
  .reply(200, { refresh_token: "refresh_token" }, [
    "Server",
    "openresty",
    "Date",
    "Fri, 02 Apr 2021 22:02:34 GMT",
    "Content-Type",
    "application/json; charset=utf-8",
    "Transfer-Encoding",
    "chunked",
    "Connection",
    "close",
    "X-Ms-Correlation-Request-Id",
    "bc9e2480-a07d-4673-aead-4591a297b0da",
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains"
  ]);

nock("https://myregistry.azurecr.io:443", { encodedQueryParams: true })
  .post(
    "/oauth2/token",
    "grant_type=refresh_token&service=myregistry.azurecr.io&refresh_token=refresh_token&scope=registry%3Acatalog%3A*"
  )
  .reply(200, { access_token: "access_token" }, [
    "Server",
    "openresty",
    "Date",
    "Fri, 02 Apr 2021 22:02:34 GMT",
    "Content-Type",
    "application/json; charset=utf-8",
    "Transfer-Encoding",
    "chunked",
    "Connection",
    "close",
    "X-Ms-Correlation-Request-Id",
    "e4b56790-3859-4d80-923e-36bda9e97995",
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains"
  ]);

nock("https://myregistry.azurecr.io:443", { encodedQueryParams: true })
  .get("/acr/v1/_catalog")
  .reply(200, { repositories: ["library/hello-world"] }, [
    "Server",
    "openresty",
    "Date",
    "Fri, 02 Apr 2021 22:02:35 GMT",
    "Content-Type",
    "application/json; charset=utf-8",
    "Content-Length",
    "41",
    "Connection",
    "close",
    "Access-Control-Expose-Headers",
    "Docker-Content-Digest",
    "Access-Control-Expose-Headers",
    "WWW-Authenticate",
    "Access-Control-Expose-Headers",
    "Link",
    "Access-Control-Expose-Headers",
    "X-Ms-Correlation-Request-Id",
    "Docker-Distribution-Api-Version",
    "registry/2.0",
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains",
    "X-Content-Type-Options",
    "nosniff",
    "X-Ms-Correlation-Request-Id",
    "81af5754-59b4-42b4-b34c-55f551bf1449",
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains"
  ]);
