let nock = require("nock");

module.exports.hash = "2fd03e41c0e19c1533542a027f592e78";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://login.microsoftonline.com:443", { encodedQueryParams: true })
  .get("/common/discovery/instance")
  .query(true)
  .reply(
    200,
    {
      tenant_discovery_endpoint:
        "https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/v2.0/.well-known/openid-configuration",
      "api-version": "1.1",
      metadata: [
        {
          preferred_network: "login.microsoftonline.com",
          preferred_cache: "login.windows.net",
          aliases: [
            "login.microsoftonline.com",
            "login.windows.net",
            "login.microsoft.com",
            "sts.windows.net"
          ]
        },
        {
          preferred_network: "login.partner.microsoftonline.cn",
          preferred_cache: "login.partner.microsoftonline.cn",
          aliases: ["login.partner.microsoftonline.cn", "login.chinacloudapi.cn"]
        },
        {
          preferred_network: "login.microsoftonline.de",
          preferred_cache: "login.microsoftonline.de",
          aliases: ["login.microsoftonline.de"]
        },
        {
          preferred_network: "login.microsoftonline.us",
          preferred_cache: "login.microsoftonline.us",
          aliases: ["login.microsoftonline.us", "login.usgovcloudapi.net"]
        },
        {
          preferred_network: "login-us.microsoftonline.com",
          preferred_cache: "login-us.microsoftonline.com",
          aliases: ["login-us.microsoftonline.com"]
        }
      ]
    },
    [
      "Cache-Control",
      "max-age=86400, private",
      "Content-Type",
      "application/json; charset=utf-8",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
      "X-Content-Type-Options",
      "nosniff",
      "Access-Control-Allow-Origin",
      "*",
      "Access-Control-Allow-Methods",
      "GET, OPTIONS",
      "P3P",
      'CP="DSP CUR OTPi IND OTRi ONL FIN"',
      "x-ms-request-id",
      "1a7e119f-7f03-48c7-9167-43a739932300",
      "x-ms-ests-server",
      "2.1.11829.4 - EUS ProdSlices",
      "Set-Cookie",
      "fpc=AqKv1ITPGqNOizUDgikpmKnKOuyWAwAAAPekVdgOAAAA; expires=Sun, 11-Jul-2021 18:40:03 GMT; path=/; secure; HttpOnly; SameSite=None",
      "Set-Cookie",
      "esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevroTZuBEtBPeOCmaRiRo5WEq-VxNEiiGfLb6UoQrjjswxq_0uNPAj_b3BN5hQxr4SIt403F9eWPO32iAqLWWmIm5YqQHSremgZ2eql27pXEXWHs0EjIkkrarThxQTkSKlkDvAi1zxNk6wpHDsbBZuWe6ZUr4hetT_L-fsSdy9OtPUgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None",
      "Set-Cookie",
      "x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly",
      "Set-Cookie",
      "stsservicecookie=estsfd; path=/; secure; samesite=none; httponly",
      "Date",
      "Fri, 11 Jun 2021 18:40:02 GMT",
      "Content-Length",
      "980"
    ]
  );

nock("https://login.microsoftonline.com:443", { encodedQueryParams: true })
  .get("/88888888-8888-8888-8888-888888888888/v2.0/.well-known/openid-configuration")
  .reply(
    200,
    {
      token_endpoint:
        "https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token",
      token_endpoint_auth_methods_supported: [
        "client_secret_post",
        "private_key_jwt",
        "client_secret_basic"
      ],
      jwks_uri:
        "https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/discovery/v2.0/keys",
      response_modes_supported: ["query", "fragment", "form_post"],
      subject_types_supported: ["pairwise"],
      id_token_signing_alg_values_supported: ["RS256"],
      response_types_supported: ["code", "id_token", "code id_token", "id_token token"],
      scopes_supported: ["openid", "profile", "email", "offline_access"],
      issuer: "https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/v2.0",
      request_uri_parameter_supported: false,
      userinfo_endpoint: "https://graph.microsoft.com/oidc/userinfo",
      authorization_endpoint:
        "https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/authorize",
      device_authorization_endpoint:
        "https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/devicecode",
      http_logout_supported: true,
      frontchannel_logout_supported: true,
      end_session_endpoint:
        "https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/logout",
      claims_supported: [
        "sub",
        "iss",
        "cloud_instance_name",
        "cloud_instance_host_name",
        "cloud_graph_host_name",
        "msgraph_host",
        "aud",
        "exp",
        "iat",
        "auth_time",
        "acr",
        "nonce",
        "preferred_username",
        "name",
        "tid",
        "ver",
        "at_hash",
        "c_hash",
        "email"
      ],
      kerberos_endpoint:
        "https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/kerberos",
      tenant_region_scope: "WW",
      cloud_instance_name: "microsoftonline.com",
      cloud_graph_host_name: "graph.windows.net",
      msgraph_host: "graph.microsoft.com",
      rbac_url: "https://pas.windows.net"
    },
    [
      "Cache-Control",
      "max-age=86400, private",
      "Content-Type",
      "application/json; charset=utf-8",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
      "X-Content-Type-Options",
      "nosniff",
      "Access-Control-Allow-Origin",
      "*",
      "Access-Control-Allow-Methods",
      "GET, OPTIONS",
      "P3P",
      'CP="DSP CUR OTPi IND OTRi ONL FIN"',
      "x-ms-request-id",
      "ee6d2b44-9510-4c18-b2d5-1af8c2411900",
      "x-ms-ests-server",
      "2.1.11829.4 - EUS ProdSlices",
      "Set-Cookie",
      "fpc=AqKv1ITPGqNOizUDgikpmKnKOuyWAwAAAPekVdgOAAAA; expires=Sun, 11-Jul-2021 18:40:03 GMT; path=/; secure; HttpOnly; SameSite=None",
      "Set-Cookie",
      "esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrQiRLCRLvQMzW9PdnExl9SnJKpINFpi04DtqggRNPBKsl1h3IXBDOZuicS7Z6BjkmkZgIJULDGSptUz01AIHGs7uGbDgHDhvk50taaXvvxvqsAq6cDNEQksxGpja-l42qx8iyN8w9bp_bxn_D9yiN-yXWy_-iQjyokwkptyZJZOQgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None",
      "Set-Cookie",
      "x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly",
      "Set-Cookie",
      "stsservicecookie=estsfd; path=/; secure; samesite=none; httponly",
      "Date",
      "Fri, 11 Jun 2021 18:40:02 GMT",
      "Content-Length",
      "1753"
    ]
  );

nock("https://login.microsoftonline.com:443", { encodedQueryParams: true })
  .post(
    "/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token",
    "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&client-request-id=a659b27d-5e21-401b-a487-c13af77bbe1f&client_secret=azure_client_secret"
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
      "af8f1119-be9e-4d06-b6fd-737a39e32400",
      "x-ms-ests-server",
      "2.1.11829.4 - NCUS ProdSlices",
      "x-ms-clitelem",
      "1,0,0,,",
      "Set-Cookie",
      "fpc=AqKv1ITPGqNOizUDgikpmKnKOuyWAwAAAPekVdgOAAAA; expires=Sun, 11-Jul-2021 18:40:03 GMT; path=/; secure; HttpOnly; SameSite=None",
      "Set-Cookie",
      "x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly",
      "Set-Cookie",
      "stsservicecookie=estsfd; path=/; secure; samesite=none; httponly",
      "Date",
      "Fri, 11 Jun 2021 18:40:02 GMT",
      "Content-Length",
      "1322"
    ]
  );

nock("https://testaccount.dev.azuresynapse.net", { encodedQueryParams: true })
  .post("/dataflows/testdataflow/rename", { newName: "testdataflow2" })
  .query(true)
  .reply(
    202,
    {
      id:
        "/subscriptions/faa080af-c1d8-40ad-9cce-e1a450ca5b57/resourceGroups/xiangyan/providers/Microsoft.Synapse/workspaces/xysynapsetest/dataflows/testdataflow",
      recordId: 1884904,
      state: "Renaming",
      created: "2021-06-11T18:39:53.86Z",
      changed: "2021-06-11T18:39:56.1533333Z",
      type: "DataFlow",
      name: "testdataflow",
      operationId: "645d8c0c-a00e-4d40-aca7-4b814e087368",
      artifactId: "F6F6D00C-2932-4419-8996-F40EEDB97310"
    },
    [
      "Content-Length",
      "420",
      "Content-Type",
      "application/json; charset=utf-8",
      "Location",
      "https://testaccount.dev.azuresynapse.net/operationResults/645d8c0c-a00e-4d40-aca7-4b814e087368?api-version=2020-12-01",
      "Retry-After",
      "1",
      "Server",
      "Microsoft-HTTPAPI/2.0",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
      "Access-Control-Allow-Headers",
      "Location",
      "Access-Control-Allow-Headers",
      "Retry-After",
      "Access-Control-Expose-Headers",
      "Location",
      "Access-Control-Expose-Headers",
      "Retry-After",
      "x-ms-request-id",
      "69bc7e7f-faee-4d3e-80f3-1b50de3c1960",
      "Date",
      "Fri, 11 Jun 2021 18:40:03 GMT",
      "Connection",
      "close"
    ]
  );

nock("https://testaccount.dev.azuresynapse.net", { encodedQueryParams: true })
  .get("/operationResults/645d8c0c-a00e-4d40-aca7-4b814e087368")
  .query(true)
  .reply(202, { status: "InProgress" }, [
    "Content-Length",
    "23",
    "Content-Type",
    "application/json; charset=utf-8",
    "Location",
    "https://testaccount.dev.azuresynapse.net/operationResults/645d8c0c-a00e-4d40-aca7-4b814e087368?api-version=2020-12-01",
    "Retry-After",
    "1",
    "Server",
    "Microsoft-HTTPAPI/2.0",
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains",
    "Access-Control-Allow-Headers",
    "Location",
    "Access-Control-Allow-Headers",
    "Retry-After",
    "Access-Control-Expose-Headers",
    "Location",
    "Access-Control-Expose-Headers",
    "Retry-After",
    "x-ms-request-id",
    "408ad0c6-60b9-4ce8-81a4-eadb1f20285a",
    "Date",
    "Fri, 11 Jun 2021 18:40:03 GMT",
    "Connection",
    "close"
  ]);

nock("https://testaccount.dev.azuresynapse.net", { encodedQueryParams: true })
  .get("/operationResults/645d8c0c-a00e-4d40-aca7-4b814e087368")
  .query(true)
  .reply(202, { status: "InProgress" }, [
    "Content-Length",
    "23",
    "Content-Type",
    "application/json; charset=utf-8",
    "Location",
    "https://testaccount.dev.azuresynapse.net/operationResults/645d8c0c-a00e-4d40-aca7-4b814e087368?api-version=2020-12-01",
    "Retry-After",
    "1",
    "Server",
    "Microsoft-HTTPAPI/2.0",
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains",
    "Access-Control-Allow-Headers",
    "Location",
    "Access-Control-Allow-Headers",
    "Retry-After",
    "Access-Control-Expose-Headers",
    "Location",
    "Access-Control-Expose-Headers",
    "Retry-After",
    "x-ms-request-id",
    "8475f265-e039-4fcf-b329-2b6639d7a78a",
    "Date",
    "Fri, 11 Jun 2021 18:40:05 GMT",
    "Connection",
    "close"
  ]);

nock("https://testaccount.dev.azuresynapse.net", { encodedQueryParams: true })
  .get("/operationResults/645d8c0c-a00e-4d40-aca7-4b814e087368")
  .query(true)
  .reply(202, { status: "InProgress" }, [
    "Content-Length",
    "23",
    "Content-Type",
    "application/json; charset=utf-8",
    "Location",
    "https://testaccount.dev.azuresynapse.net/operationResults/645d8c0c-a00e-4d40-aca7-4b814e087368?api-version=2020-12-01",
    "Retry-After",
    "1",
    "Server",
    "Microsoft-HTTPAPI/2.0",
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains",
    "Access-Control-Allow-Headers",
    "Location",
    "Access-Control-Allow-Headers",
    "Retry-After",
    "Access-Control-Expose-Headers",
    "Location",
    "Access-Control-Expose-Headers",
    "Retry-After",
    "x-ms-request-id",
    "f561955e-984a-424d-9fc9-94222b73c51d",
    "Date",
    "Fri, 11 Jun 2021 18:40:07 GMT",
    "Connection",
    "close"
  ]);

nock("https://testaccount.dev.azuresynapse.net", { encodedQueryParams: true })
  .get("/operationResults/645d8c0c-a00e-4d40-aca7-4b814e087368")
  .query(true)
  .reply(202, { status: "InProgress" }, [
    "Content-Length",
    "23",
    "Content-Type",
    "application/json; charset=utf-8",
    "Location",
    "https://testaccount.dev.azuresynapse.net/operationResults/645d8c0c-a00e-4d40-aca7-4b814e087368?api-version=2020-12-01",
    "Retry-After",
    "1",
    "Server",
    "Microsoft-HTTPAPI/2.0",
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains",
    "Access-Control-Allow-Headers",
    "Location",
    "Access-Control-Allow-Headers",
    "Retry-After",
    "Access-Control-Expose-Headers",
    "Location",
    "Access-Control-Expose-Headers",
    "Retry-After",
    "x-ms-request-id",
    "c9f2b9ff-d465-43d5-8ed8-3b710eb19992",
    "Date",
    "Fri, 11 Jun 2021 18:40:09 GMT",
    "Connection",
    "close"
  ]);

nock("https://testaccount.dev.azuresynapse.net", { encodedQueryParams: true })
  .get("/operationResults/645d8c0c-a00e-4d40-aca7-4b814e087368")
  .query(true)
  .reply(202, { status: "InProgress" }, [
    "Content-Length",
    "23",
    "Content-Type",
    "application/json; charset=utf-8",
    "Location",
    "https://testaccount.dev.azuresynapse.net/operationResults/645d8c0c-a00e-4d40-aca7-4b814e087368?api-version=2020-12-01",
    "Retry-After",
    "1",
    "Server",
    "Microsoft-HTTPAPI/2.0",
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains",
    "Access-Control-Allow-Headers",
    "Location",
    "Access-Control-Allow-Headers",
    "Retry-After",
    "Access-Control-Expose-Headers",
    "Location",
    "Access-Control-Expose-Headers",
    "Retry-After",
    "x-ms-request-id",
    "cc6e0850-f029-4086-a9bd-b216e40482b0",
    "Date",
    "Fri, 11 Jun 2021 18:40:11 GMT",
    "Connection",
    "close"
  ]);

nock("https://testaccount.dev.azuresynapse.net", { encodedQueryParams: true })
  .get("/operationResults/645d8c0c-a00e-4d40-aca7-4b814e087368")
  .query(true)
  .reply(202, { status: "InProgress" }, [
    "Content-Length",
    "23",
    "Content-Type",
    "application/json; charset=utf-8",
    "Location",
    "https://testaccount.dev.azuresynapse.net/operationResults/645d8c0c-a00e-4d40-aca7-4b814e087368?api-version=2020-12-01",
    "Retry-After",
    "1",
    "Server",
    "Microsoft-HTTPAPI/2.0",
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains",
    "Access-Control-Allow-Headers",
    "Location",
    "Access-Control-Allow-Headers",
    "Retry-After",
    "Access-Control-Expose-Headers",
    "Location",
    "Access-Control-Expose-Headers",
    "Retry-After",
    "x-ms-request-id",
    "48931870-9eff-4e67-be0e-2dff0d4c57d8",
    "Date",
    "Fri, 11 Jun 2021 18:40:14 GMT",
    "Connection",
    "close"
  ]);

nock("https://testaccount.dev.azuresynapse.net", { encodedQueryParams: true })
  .get("/operationResults/645d8c0c-a00e-4d40-aca7-4b814e087368")
  .query(true)
  .reply(202, { status: "InProgress" }, [
    "Content-Length",
    "23",
    "Content-Type",
    "application/json; charset=utf-8",
    "Location",
    "https://testaccount.dev.azuresynapse.net/operationResults/645d8c0c-a00e-4d40-aca7-4b814e087368?api-version=2020-12-01",
    "Retry-After",
    "1",
    "Server",
    "Microsoft-HTTPAPI/2.0",
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains",
    "Access-Control-Allow-Headers",
    "Location",
    "Access-Control-Allow-Headers",
    "Retry-After",
    "Access-Control-Expose-Headers",
    "Location",
    "Access-Control-Expose-Headers",
    "Retry-After",
    "x-ms-request-id",
    "b752f7db-7924-4cc5-9df6-79bde4d1dbf4",
    "Date",
    "Fri, 11 Jun 2021 18:40:15 GMT",
    "Connection",
    "close"
  ]);

nock("https://testaccount.dev.azuresynapse.net", { encodedQueryParams: true })
  .get("/operationResults/645d8c0c-a00e-4d40-aca7-4b814e087368")
  .query(true)
  .reply(202, { status: "InProgress" }, [
    "Content-Length",
    "23",
    "Content-Type",
    "application/json; charset=utf-8",
    "Location",
    "https://testaccount.dev.azuresynapse.net/operationResults/645d8c0c-a00e-4d40-aca7-4b814e087368?api-version=2020-12-01",
    "Retry-After",
    "1",
    "Server",
    "Microsoft-HTTPAPI/2.0",
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains",
    "Access-Control-Allow-Headers",
    "Location",
    "Access-Control-Allow-Headers",
    "Retry-After",
    "Access-Control-Expose-Headers",
    "Location",
    "Access-Control-Expose-Headers",
    "Retry-After",
    "x-ms-request-id",
    "9fa4b136-bf73-438c-ac6b-a3aa9f38cd09",
    "Date",
    "Fri, 11 Jun 2021 18:40:18 GMT",
    "Connection",
    "close"
  ]);

nock("https://testaccount.dev.azuresynapse.net", { encodedQueryParams: true })
  .get("/operationResults/645d8c0c-a00e-4d40-aca7-4b814e087368")
  .query(true)
  .reply(200, "", [
    "Content-Length",
    "0",
    "Server",
    "Microsoft-HTTPAPI/2.0",
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains",
    "x-ms-request-id",
    "bc84fdec-5b4b-40ca-88bc-ffdc459e4e9c",
    "Date",
    "Fri, 11 Jun 2021 18:40:20 GMT",
    "Connection",
    "close"
  ]);
