let nock = require("nock");

module.exports.hash = "b328ccbfb4446ba83fa648dca8fea70a";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://keyvault_name.vault.azure.net:443", { encodedQueryParams: true })
  .post("/certificates/CRUDCertificateName-usingbeginDeleteCertificatespoller-/create")
  .query(true)
  .reply(
    401,
    {
      error: {
        code: "Unauthorized",
        message: "AKV10000: Request is missing a Bearer or PoP token.",
      },
    },
    [
      "Cache-Control",
      "no-cache",
      "Pragma",
      "no-cache",
      "Content-Length",
      "97",
      "Content-Type",
      "application/json; charset=utf-8",
      "Expires",
      "-1",
      "WWW-Authenticate",
      'Bearer authorization="https://login.windows.net/12345678-1234-1234-1234-123456789012", resource="https://vault.azure.net"',
      "x-ms-keyvault-region",
      "westus2",
      "x-ms-client-request-id",
      "31277ac3-6cec-4448-bd34-744e99583288",
      "x-ms-request-id",
      "285f30f7-fef0-4d19-aea1-f370a0b62d29",
      "x-ms-keyvault-service-version",
      "1.9.264.1",
      "x-ms-keyvault-network-info",
      "conn_type=Ipv4;addr=50.35.229.43;act_addr_fam=InterNetwork;",
      "X-Powered-By",
      "ASP.NET",
      "Strict-Transport-Security",
      "max-age=31536000;includeSubDomains",
      "X-Content-Type-Options",
      "nosniff",
      "Date",
      "Wed, 19 Jan 2022 16:22:21 GMT",
    ]
  );

nock("https://login.microsoftonline.com:443", { encodedQueryParams: true })
  .get("/common/discovery/instance")
  .query(true)
  .reply(
    200,
    {
      tenant_discovery_endpoint:
        "https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration",
      "api-version": "1.1",
      metadata: [
        {
          preferred_network: "login.microsoftonline.com",
          preferred_cache: "login.windows.net",
          aliases: [
            "login.microsoftonline.com",
            "login.windows.net",
            "login.microsoft.com",
            "sts.windows.net",
          ],
        },
        {
          preferred_network: "login.partner.microsoftonline.cn",
          preferred_cache: "login.partner.microsoftonline.cn",
          aliases: ["login.partner.microsoftonline.cn", "login.chinacloudapi.cn"],
        },
        {
          preferred_network: "login.microsoftonline.de",
          preferred_cache: "login.microsoftonline.de",
          aliases: ["login.microsoftonline.de"],
        },
        {
          preferred_network: "login.microsoftonline.us",
          preferred_cache: "login.microsoftonline.us",
          aliases: ["login.microsoftonline.us", "login.usgovcloudapi.net"],
        },
        {
          preferred_network: "login-us.microsoftonline.com",
          preferred_cache: "login-us.microsoftonline.com",
          aliases: ["login-us.microsoftonline.com"],
        },
      ],
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
      "e5c97899-e35f-46e9-82b5-9a956fd00000",
      "x-ms-ests-server",
      "2.1.12261.17 - NCUS ProdSlices",
      "Set-Cookie",
      "fpc=AuowlA6AO-ZFg8oXr1ZLbnE; expires=Fri, 18-Feb-2022 16:22:22 GMT; path=/; secure; HttpOnly; SameSite=None",
      "Set-Cookie",
      "esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrCS_HJpymn38EkjrlXIRpNpjtK5cpKi0Kiz7rPe0OdQB-b04w1s7kSRxXKNCggAOZTHdlxgYZYsmGTG2kA8e6NdsFVapRHW0VHKcLUoGUcMxpuAEF7LQWIEQumt8Bfc4XhesbwtvVlz5brZkP8z7JPSNCW5s6RvZ2bQFQV7M86gQgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None",
      "Set-Cookie",
      "x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly",
      "Set-Cookie",
      "stsservicecookie=estsfd; path=/; secure; samesite=none; httponly",
      "Date",
      "Wed, 19 Jan 2022 16:22:21 GMT",
      "Content-Length",
      "980",
    ]
  );

nock("https://login.microsoftonline.com:443", { encodedQueryParams: true })
  .get("/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration")
  .reply(
    200,
    {
      token_endpoint:
        "https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token",
      token_endpoint_auth_methods_supported: [
        "client_secret_post",
        "private_key_jwt",
        "client_secret_basic",
      ],
      jwks_uri:
        "https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/discovery/v2.0/keys",
      response_modes_supported: ["query", "fragment", "form_post"],
      subject_types_supported: ["pairwise"],
      id_token_signing_alg_values_supported: ["RS256"],
      response_types_supported: ["code", "id_token", "code id_token", "id_token token"],
      scopes_supported: ["openid", "profile", "email", "offline_access"],
      issuer: "https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0",
      request_uri_parameter_supported: false,
      userinfo_endpoint: "https://graph.microsoft.com/oidc/userinfo",
      authorization_endpoint:
        "https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/authorize",
      device_authorization_endpoint:
        "https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/devicecode",
      http_logout_supported: true,
      frontchannel_logout_supported: true,
      end_session_endpoint:
        "https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/logout",
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
        "email",
      ],
      kerberos_endpoint:
        "https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/kerberos",
      tenant_region_scope: "WW",
      cloud_instance_name: "microsoftonline.com",
      cloud_graph_host_name: "graph.windows.net",
      msgraph_host: "graph.microsoft.com",
      rbac_url: "https://pas.windows.net",
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
      "19bd8e27-8d58-4567-ab8f-d6585e3ca400",
      "x-ms-ests-server",
      "2.1.12261.22 - SCUS ProdSlices",
      "Set-Cookie",
      "fpc=AojpC1T1gTBJrQQGth0Btuk; expires=Fri, 18-Feb-2022 16:22:22 GMT; path=/; secure; HttpOnly; SameSite=None",
      "Set-Cookie",
      "esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevraWEVvPc4i_qbQaL2fAmHGjy3PW6fb--OWNLREghxFJzE41KBWvwq22XwcikBssw7oCaI3MojX86cvgx_OhKBbYpslmvA1bFTOPIl6M_I3jSGoSfUXF9Vvo9jnh2UsoHU9P9OfL6U-tftMgNHjMNuhRz6ibyEF-NM-um9-b2-mTkgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None",
      "Set-Cookie",
      "x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly",
      "Set-Cookie",
      "stsservicecookie=estsfd; path=/; secure; samesite=none; httponly",
      "Date",
      "Wed, 19 Jan 2022 16:22:21 GMT",
      "Content-Length",
      "1753",
    ]
  );

nock("https://login.microsoftonline.com:443", { encodedQueryParams: true })
  .post(
    "/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token",
    "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.5.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=8987b6d0-92a3-4b85-9f0b-f6cfb35085ed&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D"
  )
  .reply(
    200,
    {
      token_type: "Bearer",
      expires_in: 86399,
      ext_expires_in: 86399,
      access_token: "access_token",
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
      "ca4e30f5-4747-445c-8dd6-6efab7dcc700",
      "x-ms-ests-server",
      "2.1.12261.22 - SCUS ProdSlices",
      "x-ms-clitelem",
      "1,0,0,,",
      "Set-Cookie",
      "fpc=AmC3R_uYX8BKtbKDyLvohhIbo76lAQAAAL4xetkOAAAA; expires=Fri, 18-Feb-2022 16:22:22 GMT; path=/; secure; HttpOnly; SameSite=None",
      "Set-Cookie",
      "x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly",
      "Set-Cookie",
      "stsservicecookie=estsfd; path=/; secure; samesite=none; httponly",
      "Date",
      "Wed, 19 Jan 2022 16:22:22 GMT",
      "Content-Length",
      "1315",
    ]
  );

nock("https://keyvault_name.vault.azure.net:443", { encodedQueryParams: true })
  .post("/certificates/CRUDCertificateName-usingbeginDeleteCertificatespoller-/create", {
    policy: {
      key_props: {},
      secret_props: {},
      x509_props: { subject: "cn=MyCert", sans: {} },
      issuer: { name: "Self" },
      attributes: {},
    },
    attributes: {},
  })
  .query(true)
  .reply(
    202,
    {
      id: "https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-usingbeginDeleteCertificatespoller-/pending",
      issuer: { name: "Self" },
      csr: "MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsBSsBZSM146xGh+k7kDfM+YlOcUI3YbEZZyZ6oRMRlOYCGnjnBApzbWYmxcdXFGYT5b1zGIiu7D9g479QpZxE37aUDeTArO8ykNSzmKaoYI8P9SqWZ9lGS3NjNAaeZibZgWkhYM+o/WQ52EHgU2tgwJbRCfhu6PhZumTdRIIoCYeJWjc2owOpaG0YXNezRp11q23xhSawKetr48MDzdQRCfgta0GioC86+Do5Z7FMqqJxbrUHSIqSpGmw8Sz1c62YrgSm+6ncdCDa8Ijr2WeLixlZLHtPVbvh42DQHzWy240g2eTd7rfNKuNkyiktTuf2VvGyGpP0yUKmCNx3Q1A2QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBADfXX2jaeqEiZafZSxAkGXaKUNCUY8CAz3Kty/WQSWplIRLOo2EcXj+4r5sFyw48UTMfCUJih7ZvHoTDmx6O2hdTg8W95BOQy3dv24OVfdfEyRcRCpXj0/zN4huwrPz6dfY9aU1wBDa0GOC0G7UJoQld1agKtg7Ahv1yXhfLW7m/vBcffTHQAWoKQn0XXKXx3vCb+P1NM/13RtA8dPW0c3JH5uv2d5oXS88WSPx/5hOwEmwbcBBVHhI2i2v2fXkqzmFrLJiVuL5HbFlH0K4OqTvr/9Kb0GAIIf0R6elPRl7coK5jlYWO2V19ToxIEvOGVfJljnxZsvikVTic/Mf+qy8=",
      cancellation_requested: false,
      status: "inProgress",
      status_details:
        "Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.",
      request_id: "5b85b7e2ffc542018c831041399383e0",
    },
    [
      "Cache-Control",
      "no-cache",
      "Pragma",
      "no-cache",
      "Content-Type",
      "application/json; charset=utf-8",
      "Expires",
      "-1",
      "Location",
      "https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-usingbeginDeleteCertificatespoller-/pending?api-version=7.3&request_id=5b85b7e2ffc542018c831041399383e0",
      "Retry-After",
      "0",
      "x-ms-keyvault-region",
      "westus2",
      "x-ms-client-request-id",
      "31277ac3-6cec-4448-bd34-744e99583288",
      "x-ms-request-id",
      "c76dab99-ea9e-4682-9992-6c377f479c12",
      "x-ms-keyvault-service-version",
      "1.9.264.1",
      "x-ms-keyvault-network-info",
      "conn_type=Ipv4;addr=50.35.229.43;act_addr_fam=InterNetwork;",
      "x-ms-keyvault-rbac-assignment-id",
      "493e6a87-eee5-5f30-b8a6-6f7952d3341d",
      "x-ms-keyvault-rbac-cache",
      "ra_age=43;da_age=10586;rd_age=10586;brd_age=20922;ra_notif_age=154;dec_lev=2;",
      "X-Powered-By",
      "ASP.NET",
      "Strict-Transport-Security",
      "max-age=31536000;includeSubDomains",
      "X-Content-Type-Options",
      "nosniff",
      "Date",
      "Wed, 19 Jan 2022 16:22:23 GMT",
      "Content-Length",
      "1345",
    ]
  );

nock("https://keyvault_name.vault.azure.net:443", { encodedQueryParams: true })
  .get("/certificates/CRUDCertificateName-usingbeginDeleteCertificatespoller-/pending")
  .query(true)
  .reply(
    200,
    {
      id: "https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-usingbeginDeleteCertificatespoller-/pending",
      issuer: { name: "Self" },
      csr: "MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsBSsBZSM146xGh+k7kDfM+YlOcUI3YbEZZyZ6oRMRlOYCGnjnBApzbWYmxcdXFGYT5b1zGIiu7D9g479QpZxE37aUDeTArO8ykNSzmKaoYI8P9SqWZ9lGS3NjNAaeZibZgWkhYM+o/WQ52EHgU2tgwJbRCfhu6PhZumTdRIIoCYeJWjc2owOpaG0YXNezRp11q23xhSawKetr48MDzdQRCfgta0GioC86+Do5Z7FMqqJxbrUHSIqSpGmw8Sz1c62YrgSm+6ncdCDa8Ijr2WeLixlZLHtPVbvh42DQHzWy240g2eTd7rfNKuNkyiktTuf2VvGyGpP0yUKmCNx3Q1A2QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBADfXX2jaeqEiZafZSxAkGXaKUNCUY8CAz3Kty/WQSWplIRLOo2EcXj+4r5sFyw48UTMfCUJih7ZvHoTDmx6O2hdTg8W95BOQy3dv24OVfdfEyRcRCpXj0/zN4huwrPz6dfY9aU1wBDa0GOC0G7UJoQld1agKtg7Ahv1yXhfLW7m/vBcffTHQAWoKQn0XXKXx3vCb+P1NM/13RtA8dPW0c3JH5uv2d5oXS88WSPx/5hOwEmwbcBBVHhI2i2v2fXkqzmFrLJiVuL5HbFlH0K4OqTvr/9Kb0GAIIf0R6elPRl7coK5jlYWO2V19ToxIEvOGVfJljnxZsvikVTic/Mf+qy8=",
      cancellation_requested: false,
      status: "inProgress",
      status_details:
        "Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.",
      request_id: "5b85b7e2ffc542018c831041399383e0",
    },
    [
      "Cache-Control",
      "no-cache",
      "Pragma",
      "no-cache",
      "Content-Type",
      "application/json; charset=utf-8",
      "Expires",
      "-1",
      "Retry-After",
      "0",
      "x-ms-keyvault-region",
      "westus2",
      "x-ms-client-request-id",
      "a536b713-9d73-4607-a7a5-648033b97210",
      "x-ms-request-id",
      "892979c9-e995-4f6e-ba0e-3b8fdf4d6af6",
      "x-ms-keyvault-service-version",
      "1.9.264.1",
      "x-ms-keyvault-network-info",
      "conn_type=Ipv4;addr=50.35.229.43;act_addr_fam=InterNetwork;",
      "x-ms-keyvault-rbac-assignment-id",
      "493e6a87-eee5-5f30-b8a6-6f7952d3341d",
      "x-ms-keyvault-rbac-cache",
      "ra_age=44;da_age=10587;rd_age=10587;brd_age=20923;ra_notif_age=155;dec_lev=0;",
      "X-Powered-By",
      "ASP.NET",
      "Strict-Transport-Security",
      "max-age=31536000;includeSubDomains",
      "X-Content-Type-Options",
      "nosniff",
      "Date",
      "Wed, 19 Jan 2022 16:22:23 GMT",
      "Content-Length",
      "1345",
    ]
  );

nock("https://keyvault_name.vault.azure.net:443", { encodedQueryParams: true })
  .get("/certificates/CRUDCertificateName-usingbeginDeleteCertificatespoller-/pending")
  .query(true)
  .reply(
    200,
    {
      id: "https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-usingbeginDeleteCertificatespoller-/pending",
      issuer: { name: "Self" },
      csr: "MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsBSsBZSM146xGh+k7kDfM+YlOcUI3YbEZZyZ6oRMRlOYCGnjnBApzbWYmxcdXFGYT5b1zGIiu7D9g479QpZxE37aUDeTArO8ykNSzmKaoYI8P9SqWZ9lGS3NjNAaeZibZgWkhYM+o/WQ52EHgU2tgwJbRCfhu6PhZumTdRIIoCYeJWjc2owOpaG0YXNezRp11q23xhSawKetr48MDzdQRCfgta0GioC86+Do5Z7FMqqJxbrUHSIqSpGmw8Sz1c62YrgSm+6ncdCDa8Ijr2WeLixlZLHtPVbvh42DQHzWy240g2eTd7rfNKuNkyiktTuf2VvGyGpP0yUKmCNx3Q1A2QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBADfXX2jaeqEiZafZSxAkGXaKUNCUY8CAz3Kty/WQSWplIRLOo2EcXj+4r5sFyw48UTMfCUJih7ZvHoTDmx6O2hdTg8W95BOQy3dv24OVfdfEyRcRCpXj0/zN4huwrPz6dfY9aU1wBDa0GOC0G7UJoQld1agKtg7Ahv1yXhfLW7m/vBcffTHQAWoKQn0XXKXx3vCb+P1NM/13RtA8dPW0c3JH5uv2d5oXS88WSPx/5hOwEmwbcBBVHhI2i2v2fXkqzmFrLJiVuL5HbFlH0K4OqTvr/9Kb0GAIIf0R6elPRl7coK5jlYWO2V19ToxIEvOGVfJljnxZsvikVTic/Mf+qy8=",
      cancellation_requested: false,
      status: "inProgress",
      status_details:
        "Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.",
      request_id: "5b85b7e2ffc542018c831041399383e0",
    },
    [
      "Cache-Control",
      "no-cache",
      "Pragma",
      "no-cache",
      "Content-Type",
      "application/json; charset=utf-8",
      "Expires",
      "-1",
      "Retry-After",
      "0",
      "x-ms-keyvault-region",
      "westus2",
      "x-ms-client-request-id",
      "c2d99f38-4adf-40a9-a798-316706c3c978",
      "x-ms-request-id",
      "d5d77fe2-763a-4e6e-8ac2-fc0eeca77333",
      "x-ms-keyvault-service-version",
      "1.9.264.1",
      "x-ms-keyvault-network-info",
      "conn_type=Ipv4;addr=50.35.229.43;act_addr_fam=InterNetwork;",
      "x-ms-keyvault-rbac-assignment-id",
      "493e6a87-eee5-5f30-b8a6-6f7952d3341d",
      "x-ms-keyvault-rbac-cache",
      "ra_age=44;da_age=10587;rd_age=10587;brd_age=20923;ra_notif_age=155;dec_lev=0;",
      "X-Powered-By",
      "ASP.NET",
      "Strict-Transport-Security",
      "max-age=31536000;includeSubDomains",
      "X-Content-Type-Options",
      "nosniff",
      "Date",
      "Wed, 19 Jan 2022 16:22:23 GMT",
      "Content-Length",
      "1345",
    ]
  );

nock("https://keyvault_name.vault.azure.net:443", { encodedQueryParams: true })
  .get("/certificates/CRUDCertificateName-usingbeginDeleteCertificatespoller-/pending")
  .query(true)
  .reply(
    200,
    {
      id: "https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-usingbeginDeleteCertificatespoller-/pending",
      issuer: { name: "Self" },
      csr: "MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsBSsBZSM146xGh+k7kDfM+YlOcUI3YbEZZyZ6oRMRlOYCGnjnBApzbWYmxcdXFGYT5b1zGIiu7D9g479QpZxE37aUDeTArO8ykNSzmKaoYI8P9SqWZ9lGS3NjNAaeZibZgWkhYM+o/WQ52EHgU2tgwJbRCfhu6PhZumTdRIIoCYeJWjc2owOpaG0YXNezRp11q23xhSawKetr48MDzdQRCfgta0GioC86+Do5Z7FMqqJxbrUHSIqSpGmw8Sz1c62YrgSm+6ncdCDa8Ijr2WeLixlZLHtPVbvh42DQHzWy240g2eTd7rfNKuNkyiktTuf2VvGyGpP0yUKmCNx3Q1A2QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBADfXX2jaeqEiZafZSxAkGXaKUNCUY8CAz3Kty/WQSWplIRLOo2EcXj+4r5sFyw48UTMfCUJih7ZvHoTDmx6O2hdTg8W95BOQy3dv24OVfdfEyRcRCpXj0/zN4huwrPz6dfY9aU1wBDa0GOC0G7UJoQld1agKtg7Ahv1yXhfLW7m/vBcffTHQAWoKQn0XXKXx3vCb+P1NM/13RtA8dPW0c3JH5uv2d5oXS88WSPx/5hOwEmwbcBBVHhI2i2v2fXkqzmFrLJiVuL5HbFlH0K4OqTvr/9Kb0GAIIf0R6elPRl7coK5jlYWO2V19ToxIEvOGVfJljnxZsvikVTic/Mf+qy8=",
      cancellation_requested: false,
      status: "completed",
      target:
        "https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-usingbeginDeleteCertificatespoller-",
      request_id: "5b85b7e2ffc542018c831041399383e0",
    },
    [
      "Cache-Control",
      "no-cache",
      "Pragma",
      "no-cache",
      "Content-Type",
      "application/json; charset=utf-8",
      "Expires",
      "-1",
      "x-ms-keyvault-region",
      "westus2",
      "x-ms-client-request-id",
      "93fad7c0-1c91-44ca-b704-e80ec675b2fa",
      "x-ms-request-id",
      "70481a8b-93eb-4fdc-a415-6aa80052a2a9",
      "x-ms-keyvault-service-version",
      "1.9.264.1",
      "x-ms-keyvault-network-info",
      "conn_type=Ipv4;addr=50.35.229.43;act_addr_fam=InterNetwork;",
      "x-ms-keyvault-rbac-assignment-id",
      "493e6a87-eee5-5f30-b8a6-6f7952d3341d",
      "x-ms-keyvault-rbac-cache",
      "ra_age=54;da_age=10597;rd_age=10597;brd_age=20933;ra_notif_age=165;dec_lev=0;",
      "X-Powered-By",
      "ASP.NET",
      "Strict-Transport-Security",
      "max-age=31536000;includeSubDomains",
      "X-Content-Type-Options",
      "nosniff",
      "Date",
      "Wed, 19 Jan 2022 16:22:33 GMT",
      "Content-Length",
      "1317",
    ]
  );

nock("https://keyvault_name.vault.azure.net:443", { encodedQueryParams: true })
  .get("/certificates/CRUDCertificateName-usingbeginDeleteCertificatespoller-/")
  .query(true)
  .reply(
    200,
    {
      id: "https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-usingbeginDeleteCertificatespoller-/b334629a1c124393bca79e1ed92d94af",
      kid: "https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-usingbeginDeleteCertificatespoller-/b334629a1c124393bca79e1ed92d94af",
      sid: "https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-usingbeginDeleteCertificatespoller-/b334629a1c124393bca79e1ed92d94af",
      x5t: "C3n2huSRGCRZ5JrRe-ESK6roVn8",
      cer: "MIIDKDCCAhCgAwIBAgIQcyMBfq01RTy1zXunJ0D4FDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjIwMTE5MTYxMjI2WhcNMjMwMTE5MTYyMjI2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCwFKwFlIzXjrEaH6TuQN8z5iU5xQjdhsRlnJnqhExGU5gIaeOcECnNtZibFx1cUZhPlvXMYiK7sP2Djv1ClnETftpQN5MCs7zKQ1LOYpqhgjw/1KpZn2UZLc2M0Bp5mJtmBaSFgz6j9ZDnYQeBTa2DAltEJ+G7o+Fm6ZN1EgigJh4laNzajA6lobRhc17NGnXWrbfGFJrAp62vjwwPN1BEJ+C1rQaKgLzr4OjlnsUyqonFutQdIipKkabDxLPVzrZiuBKb7qdx0INrwiOvZZ4uLGVkse09Vu+HjYNAfNbLbjSDZ5N3ut80q42TKKS1O5/ZW8bIak/TJQqYI3HdDUDZAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBT9W35KcGndxHvMf/CC15QrnenNXTAdBgNVHQ4EFgQU/Vt+SnBp3cR7zH/wgteUK53pzV0wDQYJKoZIhvcNAQELBQADggEBAEGCuJpnqO+VEQYGlEkModUeBxwmiw+zD4FVDSBia+DaLuPCE4s/RcY3M+oXCiZ4JoCEHh8kZQBQNDL2yX/UJ9tADzrinX482tZFuzf4GUhBg8O2tAP2oloXo3KXZzv+SRYgZxzlOjen+KxmPVwgC4JlnOc0KcCjnBGGiV+o19dADIKOKxPS9FM8lXAbsFfK8Fdra2SzIpSIv4FN/0E67ipbuA4ybz7yWMNRxc+pwoZWIfmUqQ4/66JZO5pAGgi61ldkYYTRkwwL8JDzoJAtsn6TXWEJVkrMWhg4/4IjpM8XlP2g7e+yKjVgpEB9zqjhd18B2HjDDrSFHGmW6PljHgY=",
      attributes: {
        enabled: true,
        nbf: 1642608746,
        exp: 1674145346,
        created: 1642609346,
        updated: 1642609346,
        recoveryLevel: "CustomizedRecoverable+Purgeable",
        recoverableDays: 7,
      },
      policy: {
        id: "https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-usingbeginDeleteCertificatespoller-/policy",
        key_props: { exportable: true, kty: "RSA", key_size: 2048, reuse_key: false },
        secret_props: { contentType: "application/x-pkcs12" },
        x509_props: {
          subject: "cn=MyCert",
          sans: {},
          ekus: ["1.3.6.1.5.5.7.3.1", "1.3.6.1.5.5.7.3.2"],
          key_usage: ["digitalSignature", "keyEncipherment"],
          validity_months: 12,
          basic_constraints: { ca: false },
        },
        lifetime_actions: [
          { trigger: { lifetime_percentage: 80 }, action: { action_type: "AutoRenew" } },
        ],
        issuer: { name: "Self" },
        attributes: { enabled: true, created: 1642609343, updated: 1642609343 },
      },
      pending: {
        id: "https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-usingbeginDeleteCertificatespoller-/pending",
      },
    },
    [
      "Cache-Control",
      "no-cache",
      "Pragma",
      "no-cache",
      "Content-Type",
      "application/json; charset=utf-8",
      "Expires",
      "-1",
      "x-ms-keyvault-region",
      "westus2",
      "x-ms-client-request-id",
      "47de458e-c54b-4ab4-a81f-ea8426a1db8e",
      "x-ms-request-id",
      "050df944-8aa3-4781-a31d-33c7a7a7bb45",
      "x-ms-keyvault-service-version",
      "1.9.264.1",
      "x-ms-keyvault-network-info",
      "conn_type=Ipv4;addr=50.35.229.43;act_addr_fam=InterNetwork;",
      "x-ms-keyvault-rbac-assignment-id",
      "493e6a87-eee5-5f30-b8a6-6f7952d3341d",
      "x-ms-keyvault-rbac-cache",
      "ra_age=54;da_age=10597;rd_age=10597;brd_age=20933;ra_notif_age=165;dec_lev=1;",
      "X-Powered-By",
      "ASP.NET",
      "Strict-Transport-Security",
      "max-age=31536000;includeSubDomains",
      "X-Content-Type-Options",
      "nosniff",
      "Date",
      "Wed, 19 Jan 2022 16:22:33 GMT",
      "Content-Length",
      "2624",
    ]
  );

nock("https://keyvault_name.vault.azure.net:443", { encodedQueryParams: true })
  .delete("/certificates/CRUDCertificateName-usingbeginDeleteCertificatespoller-")
  .query(true)
  .reply(
    200,
    {
      recoveryId:
        "https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-usingbeginDeleteCertificatespoller-",
      deletedDate: 1642609353,
      scheduledPurgeDate: 1643214153,
      id: "https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-usingbeginDeleteCertificatespoller-/b334629a1c124393bca79e1ed92d94af",
      kid: "https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-usingbeginDeleteCertificatespoller-/b334629a1c124393bca79e1ed92d94af",
      sid: "https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-usingbeginDeleteCertificatespoller-/b334629a1c124393bca79e1ed92d94af",
      x5t: "C3n2huSRGCRZ5JrRe-ESK6roVn8",
      cer: "MIIDKDCCAhCgAwIBAgIQcyMBfq01RTy1zXunJ0D4FDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjIwMTE5MTYxMjI2WhcNMjMwMTE5MTYyMjI2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCwFKwFlIzXjrEaH6TuQN8z5iU5xQjdhsRlnJnqhExGU5gIaeOcECnNtZibFx1cUZhPlvXMYiK7sP2Djv1ClnETftpQN5MCs7zKQ1LOYpqhgjw/1KpZn2UZLc2M0Bp5mJtmBaSFgz6j9ZDnYQeBTa2DAltEJ+G7o+Fm6ZN1EgigJh4laNzajA6lobRhc17NGnXWrbfGFJrAp62vjwwPN1BEJ+C1rQaKgLzr4OjlnsUyqonFutQdIipKkabDxLPVzrZiuBKb7qdx0INrwiOvZZ4uLGVkse09Vu+HjYNAfNbLbjSDZ5N3ut80q42TKKS1O5/ZW8bIak/TJQqYI3HdDUDZAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBT9W35KcGndxHvMf/CC15QrnenNXTAdBgNVHQ4EFgQU/Vt+SnBp3cR7zH/wgteUK53pzV0wDQYJKoZIhvcNAQELBQADggEBAEGCuJpnqO+VEQYGlEkModUeBxwmiw+zD4FVDSBia+DaLuPCE4s/RcY3M+oXCiZ4JoCEHh8kZQBQNDL2yX/UJ9tADzrinX482tZFuzf4GUhBg8O2tAP2oloXo3KXZzv+SRYgZxzlOjen+KxmPVwgC4JlnOc0KcCjnBGGiV+o19dADIKOKxPS9FM8lXAbsFfK8Fdra2SzIpSIv4FN/0E67ipbuA4ybz7yWMNRxc+pwoZWIfmUqQ4/66JZO5pAGgi61ldkYYTRkwwL8JDzoJAtsn6TXWEJVkrMWhg4/4IjpM8XlP2g7e+yKjVgpEB9zqjhd18B2HjDDrSFHGmW6PljHgY=",
      attributes: {
        enabled: true,
        nbf: 1642608746,
        exp: 1674145346,
        created: 1642609346,
        updated: 1642609346,
        recoveryLevel: "CustomizedRecoverable+Purgeable",
        recoverableDays: 7,
      },
      policy: {
        id: "https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-usingbeginDeleteCertificatespoller-/policy",
        key_props: { exportable: true, kty: "RSA", key_size: 2048, reuse_key: false },
        secret_props: { contentType: "application/x-pkcs12" },
        x509_props: {
          subject: "cn=MyCert",
          sans: {},
          ekus: ["1.3.6.1.5.5.7.3.1", "1.3.6.1.5.5.7.3.2"],
          key_usage: ["digitalSignature", "keyEncipherment"],
          validity_months: 12,
          basic_constraints: { ca: false },
        },
        lifetime_actions: [
          { trigger: { lifetime_percentage: 80 }, action: { action_type: "AutoRenew" } },
        ],
        issuer: { name: "Self" },
        attributes: { enabled: true, created: 1642609343, updated: 1642609343 },
      },
      pending: {
        id: "https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-usingbeginDeleteCertificatespoller-/pending",
      },
    },
    [
      "Cache-Control",
      "no-cache",
      "Pragma",
      "no-cache",
      "Content-Type",
      "application/json; charset=utf-8",
      "Expires",
      "-1",
      "x-ms-keyvault-region",
      "westus2",
      "x-ms-client-request-id",
      "7f7e3a61-5383-4101-b2c2-6d667c23dc85",
      "x-ms-request-id",
      "f594f53c-fb60-4b17-ab57-5c1c672161f5",
      "x-ms-keyvault-service-version",
      "1.9.264.1",
      "x-ms-keyvault-network-info",
      "conn_type=Ipv4;addr=50.35.229.43;act_addr_fam=InterNetwork;",
      "x-ms-keyvault-rbac-assignment-id",
      "493e6a87-eee5-5f30-b8a6-6f7952d3341d",
      "x-ms-keyvault-rbac-cache",
      "ra_age=54;da_age=10597;rd_age=10597;brd_age=20933;ra_notif_age=165;dec_lev=1;",
      "X-Powered-By",
      "ASP.NET",
      "Strict-Transport-Security",
      "max-age=31536000;includeSubDomains",
      "X-Content-Type-Options",
      "nosniff",
      "Date",
      "Wed, 19 Jan 2022 16:22:33 GMT",
      "Content-Length",
      "2829",
    ]
  );

nock("https://keyvault_name.vault.azure.net:443", { encodedQueryParams: true })
  .get("/deletedcertificates/CRUDCertificateName-usingbeginDeleteCertificatespoller-")
  .query(true)
  .reply(
    404,
    {
      error: {
        code: "CertificateNotFound",
        message:
          "Deleted Certificate not found: CRUDCertificateName-usingbeginDeleteCertificatespoller-",
      },
    },
    [
      "Cache-Control",
      "no-cache",
      "Pragma",
      "no-cache",
      "Content-Length",
      "156",
      "Content-Type",
      "application/json; charset=utf-8",
      "Expires",
      "-1",
      "x-ms-keyvault-region",
      "westus2",
      "x-ms-client-request-id",
      "6e9e0378-cc59-4caa-bb4b-681a674f1108",
      "x-ms-request-id",
      "c33797f6-b611-42d3-b9d5-95ce534b63f7",
      "x-ms-keyvault-service-version",
      "1.9.264.1",
      "x-ms-keyvault-network-info",
      "conn_type=Ipv4;addr=50.35.229.43;act_addr_fam=InterNetwork;",
      "x-ms-keyvault-rbac-assignment-id",
      "493e6a87-eee5-5f30-b8a6-6f7952d3341d",
      "x-ms-keyvault-rbac-cache",
      "ra_age=55;da_age=10597;rd_age=10597;brd_age=20933;ra_notif_age=165;dec_lev=0;",
      "X-Powered-By",
      "ASP.NET",
      "Strict-Transport-Security",
      "max-age=31536000;includeSubDomains",
      "X-Content-Type-Options",
      "nosniff",
      "Date",
      "Wed, 19 Jan 2022 16:22:33 GMT",
    ]
  );

nock("https://keyvault_name.vault.azure.net:443", { encodedQueryParams: true })
  .get("/deletedcertificates/CRUDCertificateName-usingbeginDeleteCertificatespoller-")
  .query(true)
  .reply(
    404,
    {
      error: {
        code: "CertificateNotFound",
        message:
          "Deleted Certificate not found: CRUDCertificateName-usingbeginDeleteCertificatespoller-",
      },
    },
    [
      "Cache-Control",
      "no-cache",
      "Pragma",
      "no-cache",
      "Content-Length",
      "156",
      "Content-Type",
      "application/json; charset=utf-8",
      "Expires",
      "-1",
      "x-ms-keyvault-region",
      "westus2",
      "x-ms-client-request-id",
      "0b6c52f7-0bf8-4ee3-80e8-ad97bb8daf34",
      "x-ms-request-id",
      "23abbf04-6371-4f9d-bdba-c544d7363de8",
      "x-ms-keyvault-service-version",
      "1.9.264.1",
      "x-ms-keyvault-network-info",
      "conn_type=Ipv4;addr=50.35.229.43;act_addr_fam=InterNetwork;",
      "x-ms-keyvault-rbac-assignment-id",
      "493e6a87-eee5-5f30-b8a6-6f7952d3341d",
      "x-ms-keyvault-rbac-cache",
      "ra_age=55;da_age=10597;rd_age=10597;brd_age=20933;ra_notif_age=165;dec_lev=0;",
      "X-Powered-By",
      "ASP.NET",
      "Strict-Transport-Security",
      "max-age=31536000;includeSubDomains",
      "X-Content-Type-Options",
      "nosniff",
      "Date",
      "Wed, 19 Jan 2022 16:22:34 GMT",
    ]
  );

nock("https://keyvault_name.vault.azure.net:443", { encodedQueryParams: true })
  .get("/deletedcertificates/CRUDCertificateName-usingbeginDeleteCertificatespoller-")
  .query(true)
  .reply(
    200,
    {
      recoveryId:
        "https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-usingbeginDeleteCertificatespoller-",
      deletedDate: 1642609353,
      scheduledPurgeDate: 1643214153,
      id: "https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-usingbeginDeleteCertificatespoller-/b334629a1c124393bca79e1ed92d94af",
      kid: "https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-usingbeginDeleteCertificatespoller-/b334629a1c124393bca79e1ed92d94af",
      sid: "https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-usingbeginDeleteCertificatespoller-/b334629a1c124393bca79e1ed92d94af",
      x5t: "C3n2huSRGCRZ5JrRe-ESK6roVn8",
      cer: "MIIDKDCCAhCgAwIBAgIQcyMBfq01RTy1zXunJ0D4FDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjIwMTE5MTYxMjI2WhcNMjMwMTE5MTYyMjI2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCwFKwFlIzXjrEaH6TuQN8z5iU5xQjdhsRlnJnqhExGU5gIaeOcECnNtZibFx1cUZhPlvXMYiK7sP2Djv1ClnETftpQN5MCs7zKQ1LOYpqhgjw/1KpZn2UZLc2M0Bp5mJtmBaSFgz6j9ZDnYQeBTa2DAltEJ+G7o+Fm6ZN1EgigJh4laNzajA6lobRhc17NGnXWrbfGFJrAp62vjwwPN1BEJ+C1rQaKgLzr4OjlnsUyqonFutQdIipKkabDxLPVzrZiuBKb7qdx0INrwiOvZZ4uLGVkse09Vu+HjYNAfNbLbjSDZ5N3ut80q42TKKS1O5/ZW8bIak/TJQqYI3HdDUDZAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBT9W35KcGndxHvMf/CC15QrnenNXTAdBgNVHQ4EFgQU/Vt+SnBp3cR7zH/wgteUK53pzV0wDQYJKoZIhvcNAQELBQADggEBAEGCuJpnqO+VEQYGlEkModUeBxwmiw+zD4FVDSBia+DaLuPCE4s/RcY3M+oXCiZ4JoCEHh8kZQBQNDL2yX/UJ9tADzrinX482tZFuzf4GUhBg8O2tAP2oloXo3KXZzv+SRYgZxzlOjen+KxmPVwgC4JlnOc0KcCjnBGGiV+o19dADIKOKxPS9FM8lXAbsFfK8Fdra2SzIpSIv4FN/0E67ipbuA4ybz7yWMNRxc+pwoZWIfmUqQ4/66JZO5pAGgi61ldkYYTRkwwL8JDzoJAtsn6TXWEJVkrMWhg4/4IjpM8XlP2g7e+yKjVgpEB9zqjhd18B2HjDDrSFHGmW6PljHgY=",
      attributes: {
        enabled: true,
        nbf: 1642608746,
        exp: 1674145346,
        created: 1642609346,
        updated: 1642609346,
        recoveryLevel: "CustomizedRecoverable+Purgeable",
        recoverableDays: 7,
      },
      policy: {
        id: "https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-usingbeginDeleteCertificatespoller-/policy",
        key_props: { exportable: true, kty: "RSA", key_size: 2048, reuse_key: false },
        secret_props: { contentType: "application/x-pkcs12" },
        x509_props: {
          subject: "cn=MyCert",
          sans: {},
          ekus: ["1.3.6.1.5.5.7.3.1", "1.3.6.1.5.5.7.3.2"],
          key_usage: ["digitalSignature", "keyEncipherment"],
          validity_months: 12,
          basic_constraints: { ca: false },
        },
        lifetime_actions: [
          { trigger: { lifetime_percentage: 80 }, action: { action_type: "AutoRenew" } },
        ],
        issuer: { name: "Self" },
        attributes: { enabled: true, created: 1642609343, updated: 1642609343 },
      },
      pending: {
        id: "https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-usingbeginDeleteCertificatespoller-/pending",
      },
    },
    [
      "Cache-Control",
      "no-cache",
      "Pragma",
      "no-cache",
      "Content-Type",
      "application/json; charset=utf-8",
      "Expires",
      "-1",
      "x-ms-keyvault-region",
      "westus2",
      "x-ms-client-request-id",
      "9a38ae0e-c13e-4c4f-841c-5c78694d6d42",
      "x-ms-request-id",
      "5cab401d-e0a9-4c95-bf42-21b92296100a",
      "x-ms-keyvault-service-version",
      "1.9.264.1",
      "x-ms-keyvault-network-info",
      "conn_type=Ipv4;addr=50.35.229.43;act_addr_fam=InterNetwork;",
      "x-ms-keyvault-rbac-assignment-id",
      "493e6a87-eee5-5f30-b8a6-6f7952d3341d",
      "x-ms-keyvault-rbac-cache",
      "ra_age=65;da_age=10607;rd_age=10607;brd_age=20943;ra_notif_age=175;dec_lev=0;",
      "X-Powered-By",
      "ASP.NET",
      "Strict-Transport-Security",
      "max-age=31536000;includeSubDomains",
      "X-Content-Type-Options",
      "nosniff",
      "Date",
      "Wed, 19 Jan 2022 16:22:43 GMT",
      "Content-Length",
      "2829",
    ]
  );
