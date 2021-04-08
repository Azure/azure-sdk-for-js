let nock = require("nock");

module.exports.hash = "c6be3e1ca6c8e7d6a40db1b5a8899f2a";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://login.microsoftonline.com:443", { encodedQueryParams: true })
  .post(
    "/azure_tenant_id/oauth2/v2.0/token",
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
      "9971c67a-a8b8-4dbd-9a37-e12bdc5b0700",
      "x-ms-ests-server",
      "2.1.11562.10 - NCUS ProdSlices",
      "Set-Cookie",
      "fpc=AubVabojdJVHvZY0mJSQ0Yl12iTZAwAAAFeL-dcOAAAA; expires=Sun, 02-May-2021 22:02:46 GMT; path=/; secure; HttpOnly; SameSite=None",
      "Set-Cookie",
      "x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly",
      "Set-Cookie",
      "stsservicecookie=estsfd; path=/; secure; samesite=none; httponly",
      "Date",
      "Fri, 02 Apr 2021 22:02:45 GMT",
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
      "Fri, 02 Apr 2021 22:02:46 GMT",
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
      "d36934d7-b8cb-49eb-94cc-a964eb26b269",
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
    "Fri, 02 Apr 2021 22:02:47 GMT",
    "Content-Type",
    "application/json; charset=utf-8",
    "Transfer-Encoding",
    "chunked",
    "Connection",
    "close",
    "X-Ms-Correlation-Request-Id",
    "45657ed9-ef47-4b51-80fd-efe0a874ca2f",
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
    "Fri, 02 Apr 2021 22:02:47 GMT",
    "Content-Type",
    "application/json; charset=utf-8",
    "Transfer-Encoding",
    "chunked",
    "Connection",
    "close",
    "X-Ms-Correlation-Request-Id",
    "f9c7635a-8158-4d13-92ae-0a3543bce99e",
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains"
  ]);

nock("https://myregistry.azurecr.io:443", { encodedQueryParams: true })
  .get("/acr/v1/_catalog")
  .reply(200, { repositories: null }, [
    "Server",
    "openresty",
    "Date",
    "Fri, 02 Apr 2021 22:02:47 GMT",
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
    "876460cc-f3a4-48b4-b163-94d9f0d027c6",
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains"
  ]);

nock("https://login.microsoftonline.com:443", { encodedQueryParams: true })
  .post(
    "/azure_tenant_id/oauth2/token",
    "grant_type=client_credentials&client_id=azure_client_id&resource=https%3A%2F%2Fmanagement.core.windows.net%2F&client_secret=azure_client_secret"
  )
  .query(true)
  .reply(
    200,
    {
      token_type: "Bearer",
      expires_in: "86399",
      ext_expires_in: "86399",
      expires_on: "1617487367",
      not_before: "1617400667",
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
      "d38bd7e2-eb3f-479c-b17f-ef03bba9b24c",
      "x-ms-request-id",
      "3616576e-337c-4431-ac5e-c0a4eb5d0600",
      "x-ms-ests-server",
      "2.1.11562.10 - SCUS ProdSlices",
      "x-ms-clitelem",
      "1,0,0,,",
      "Set-Cookie",
      "fpc=AvuAErDs5khIhr1c_o03iu1I-ePCAQAAAIaL-dcOAAAA; expires=Sun, 02-May-2021 22:02:47 GMT; path=/; secure; HttpOnly; SameSite=None",
      "Set-Cookie",
      "x-ms-gateway-slice=estsfd; path=/; secure; httponly",
      "Set-Cookie",
      "stsservicecookie=estsfd; path=/; secure; httponly",
      "Date",
      "Fri, 02 Apr 2021 22:02:47 GMT",
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
      "769200bb-0a40-4707-af69-a580b306e7bc",
      "x-ms-correlation-request-id",
      "769200bb-0a40-4707-af69-a580b306e7bc",
      "x-ms-routing-request-id",
      "WESTUS2:20210402T220248Z:769200bb-0a40-4707-af69-a580b306e7bc",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
      "X-Content-Type-Options",
      "nosniff",
      "Date",
      "Fri, 02 Apr 2021 22:02:47 GMT",
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
      targetTags: ["library/hello-world:test1", "library/hello-world:test-delete"],
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
    "https://management.azure.com/subscriptions/subscription_id/providers/Microsoft.ContainerRegistry/locations/CENTRALUS/operationResults/registries-57e9ab63-8ea3-4e81-8d73-bfed5d1b4e2b?api-version=2019-12-01-preview",
    "Retry-After",
    "10",
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains",
    "x-ms-ratelimit-remaining-subscription-writes",
    "1199",
    "Server",
    "Microsoft-HTTPAPI/2.0",
    "x-ms-request-id",
    "b2343dbc-65fb-479d-b25a-bc919b54c05e",
    "x-ms-correlation-request-id",
    "b2343dbc-65fb-479d-b25a-bc919b54c05e",
    "x-ms-routing-request-id",
    "WESTUS2:20210402T220248Z:b2343dbc-65fb-479d-b25a-bc919b54c05e",
    "X-Content-Type-Options",
    "nosniff",
    "Date",
    "Fri, 02 Apr 2021 22:02:48 GMT",
    "Connection",
    "close"
  ]);

nock("https://management.azure.com:443", { encodedQueryParams: true })
  .get(
    "/subscriptions/subscription_id/providers/Microsoft.ContainerRegistry/locations/CENTRALUS/operationResults/registries-57e9ab63-8ea3-4e81-8d73-bfed5d1b4e2b"
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
      "11999",
      "Server",
      "Microsoft-HTTPAPI/2.0",
      "x-ms-request-id",
      "59601741-b23a-48c8-b69f-1d8e6d2fcbf1",
      "x-ms-correlation-request-id",
      "59601741-b23a-48c8-b69f-1d8e6d2fcbf1",
      "x-ms-routing-request-id",
      "WESTUS2:20210402T220319Z:59601741-b23a-48c8-b69f-1d8e6d2fcbf1",
      "X-Content-Type-Options",
      "nosniff",
      "Date",
      "Fri, 02 Apr 2021 22:03:18 GMT",
      "Connection",
      "close"
    ]
  );

nock("https://login.microsoftonline.com:443", { encodedQueryParams: true })
  .post(
    "/azure_tenant_id/oauth2/v2.0/token",
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
      "fbf886bd-d635-4307-b0ad-4395f6a90700",
      "x-ms-ests-server",
      "2.1.11562.10 - EUS ProdSlices",
      "Set-Cookie",
      "fpc=AubVabojdJVHvZY0mJSQ0Yl12iTZBAAAAFeL-dcOAAAA; expires=Sun, 02-May-2021 22:03:19 GMT; path=/; secure; HttpOnly; SameSite=None",
      "Set-Cookie",
      "x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly",
      "Set-Cookie",
      "stsservicecookie=estsfd; path=/; secure; samesite=none; httponly",
      "Date",
      "Fri, 02 Apr 2021 22:03:18 GMT",
      "Connection",
      "close",
      "Content-Length",
      "1361"
    ]
  );

nock("https://myregistry.azurecr.io:443", { encodedQueryParams: true })
  .get("/acr/v1/library%2Fhello-world/_tags")
  .reply(
    401,
    {
      errors: [
        {
          code: "UNAUTHORIZED",
          message:
            "authentication required, visit https://aka.ms/acr/authorization for more information.",
          detail: [{ Type: "repository", Name: "library/hello-world", Action: "metadata_read" }]
        }
      ]
    },
    [
      "Server",
      "openresty",
      "Date",
      "Fri, 02 Apr 2021 22:03:19 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "222",
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
      'Bearer realm="https://myregistry.azurecr.io/oauth2/token",service="myregistry.azurecr.io",scope="repository:library/hello-world:metadata_read",error="invalid_token"',
      "X-Content-Type-Options",
      "nosniff",
      "X-Ms-Correlation-Request-Id",
      "c23f4f2a-6aca-41a6-80f9-24fb003c6b7b",
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
    "Fri, 02 Apr 2021 22:03:20 GMT",
    "Content-Type",
    "application/json; charset=utf-8",
    "Transfer-Encoding",
    "chunked",
    "Connection",
    "close",
    "X-Ms-Correlation-Request-Id",
    "caf9feb6-ea25-4e4c-b915-deb9af6464da",
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains"
  ]);

nock("https://myregistry.azurecr.io:443", { encodedQueryParams: true })
  .post(
    "/oauth2/token",
    "grant_type=refresh_token&service=myregistry.azurecr.io&refresh_token=refresh_token&scope=repository%3Alibrary%2Fhello-world%3Ametadata_read"
  )
  .reply(200, { access_token: "access_token" }, [
    "Server",
    "openresty",
    "Date",
    "Fri, 02 Apr 2021 22:03:20 GMT",
    "Content-Type",
    "application/json; charset=utf-8",
    "Transfer-Encoding",
    "chunked",
    "Connection",
    "close",
    "X-Ms-Correlation-Request-Id",
    "17ff8218-338c-4a5e-9589-c7489669876a",
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains"
  ]);

nock("https://myregistry.azurecr.io:443", { encodedQueryParams: true })
  .get("/acr/v1/library%2Fhello-world/_tags")
  .reply(
    200,
    {
      registry: "myregistry.azurecr.io",
      imageName: "library/hello-world",
      tags: [
        {
          name: "test-delete",
          digest: "sha256:308866a43596e83578c7dfa15e27a73011bdd402185a84c5cd7f32a88b501a24",
          createdTime: "2021-04-02T22:02:52.9100099Z",
          lastUpdateTime: "2021-04-02T22:02:52.9100099Z",
          signed: false,
          changeableAttributes: {
            deleteEnabled: true,
            writeEnabled: true,
            readEnabled: true,
            listEnabled: true
          }
        },
        {
          name: "test1",
          digest: "sha256:308866a43596e83578c7dfa15e27a73011bdd402185a84c5cd7f32a88b501a24",
          createdTime: "2021-04-02T22:02:51.7577005Z",
          lastUpdateTime: "2021-04-02T22:02:51.7577005Z",
          signed: false,
          changeableAttributes: {
            deleteEnabled: true,
            writeEnabled: true,
            readEnabled: true,
            listEnabled: true
          }
        }
      ]
    },
    [
      "Server",
      "openresty",
      "Date",
      "Fri, 02 Apr 2021 22:03:20 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "709",
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
      "aba4b31a-5283-484d-9f9f-44fd052bcadf",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    ]
  );
