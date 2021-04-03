let nock = require("nock");

module.exports.hash = "4b644a3a4de1b95ee31429b07ed2eaf1";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://azure_managedhsm.managedhsm.azure.net:443", { encodedQueryParams: true })
  .post("/keys/cryptography-client-test/create")
  .query(true)
  .reply(401, "", [
    "content-type",
    "application/json; charset=utf-8",
    "x-ms-server-latency",
    "1",
    "x-content-type-options",
    "nosniff",
    "www-authenticate",
    'Bearer authorization="https://login.microsoftonline.com/azure_tenant_id", resource="https://managedhsm.azure.net"',
    "x-frame-options",
    "SAMEORIGIN",
    "content-length",
    "0",
    "x-ms-request-id",
    "c4f32c3a-7303-11eb-bf79-0242ac120006",
    "strict-transport-security",
    "max-age=31536000; includeSubDomains",
    "content-security-policy",
    "default-src 'self'",
    "cache-control",
    "no-cache"
  ]);

nock("https://login.microsoftonline.com:443", { encodedQueryParams: true })
  .post(
    "/azure_tenant_id/oauth2/v2.0/token",
    "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fmanagedhsm.azure.net%2F.default"
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
      "63ca4872-c129-4d73-865a-2f12483a3700",
      "x-ms-ests-server",
      "2.1.11496.7 - NCUS ProdSlices",
      "Set-Cookie",
      "fpc=AoCBmAFNJcxCmRJtqAiMqNf8QxJoAQAAAN41wtcOAAAA; expires=Sun, 21-Mar-2021 22:42:39 GMT; path=/; secure; HttpOnly; SameSite=None",
      "Set-Cookie",
      "x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly",
      "Set-Cookie",
      "stsservicecookie=estsfd; path=/; secure; samesite=none; httponly",
      "Date",
      "Fri, 19 Feb 2021 22:42:39 GMT",
      "Content-Length",
      "1322"
    ]
  );

nock("https://azure_managedhsm.managedhsm.azure.net:443", { encodedQueryParams: true })
  .post("/keys/cryptography-client-test/create", { kty: "AES", key_size: 256, attributes: {} })
  .query(true)
  .reply(
    200,
    {
      attributes: {
        created: 1613774559,
        enabled: true,
        exportable: false,
        recoverableDays: 90,
        recoveryLevel: "Recoverable+Purgeable",
        updated: 1613774559
      },
      key: {
        key_ops: ["wrapKey", "unwrapKey", "decrypt", "encrypt"],
        kid:
          "https://azure_managedhsm.managedhsm.azure.net/keys/cryptography-client-test/c1a3cd3849514cc08cb716a73da476d8",
        kty: "oct-HSM"
      }
    },
    [
      "content-type",
      "application/json; charset=utf-8",
      "x-content-type-options",
      "nosniff",
      "content-length",
      "360",
      "x-ms-request-id",
      "c52305f4-7303-11eb-bf79-0242ac120006",
      "x-ms-keyvault-region",
      "westeurope",
      "strict-transport-security",
      "max-age=31536000; includeSubDomains",
      "content-security-policy",
      "default-src 'self'",
      "x-ms-keyvault-network-info",
      "addr=50.35.231.105",
      "x-ms-server-latency",
      "183",
      "cache-control",
      "no-cache",
      "x-frame-options",
      "SAMEORIGIN"
    ]
  );

nock("https://azure_managedhsm.managedhsm.azure.net:443", { encodedQueryParams: true })
  .get("/keys/cryptography-client-test/c1a3cd3849514cc08cb716a73da476d8")
  .query(true)
  .reply(401, "OK", [
    "content-type",
    "application/json; charset=utf-8",
    "x-content-type-options",
    "nosniff",
    "www-authenticate",
    'Bearer authorization="https://login.microsoftonline.com/azure_tenant_id", resource="https://managedhsm.azure.net"',
    "x-frame-options",
    "SAMEORIGIN",
    "content-length",
    "2",
    "x-ms-request-id",
    "c557f7b4-7303-11eb-bf79-0242ac120006",
    "strict-transport-security",
    "max-age=31536000; includeSubDomains",
    "content-security-policy",
    "default-src 'self'",
    "x-ms-build-version",
    "1.0.20210204-1-c9f88df4-develop",
    "cache-control",
    "no-cache",
    "x-ms-server-latency",
    "0"
  ]);

nock("https://login.microsoftonline.com:443", { encodedQueryParams: true })
  .post(
    "/azure_tenant_id/oauth2/v2.0/token",
    "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fmanagedhsm.azure.net%2F.default"
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
      "e8a99aa4-34b3-4a27-9aca-48e899b93500",
      "x-ms-ests-server",
      "2.1.11496.7 - EUS ProdSlices",
      "Set-Cookie",
      "fpc=AoCBmAFNJcxCmRJtqAiMqNf8QxJoAgAAAN41wtcOAAAA; expires=Sun, 21-Mar-2021 22:42:39 GMT; path=/; secure; HttpOnly; SameSite=None",
      "Set-Cookie",
      "x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly",
      "Set-Cookie",
      "stsservicecookie=estsfd; path=/; secure; samesite=none; httponly",
      "Date",
      "Fri, 19 Feb 2021 22:42:39 GMT",
      "Content-Length",
      "1322"
    ]
  );

nock("https://azure_managedhsm.managedhsm.azure.net:443", { encodedQueryParams: true })
  .get("/keys/cryptography-client-test/c1a3cd3849514cc08cb716a73da476d8")
  .query(true)
  .reply(
    200,
    {
      attributes: {
        created: 1613774559,
        enabled: true,
        exportable: false,
        recoverableDays: 90,
        recoveryLevel: "Recoverable+Purgeable",
        updated: 1613774559
      },
      key: {
        key_ops: ["wrapKey", "unwrapKey", "encrypt", "decrypt"],
        kid:
          "https://azure_managedhsm.managedhsm.azure.net/keys/cryptography-client-test/c1a3cd3849514cc08cb716a73da476d8",
        kty: "oct-HSM"
      }
    },
    [
      "x-frame-options",
      "SAMEORIGIN",
      "x-ms-request-id",
      "c582db6e-7303-11eb-bf79-0242ac120006",
      "content-type",
      "application/json; charset=utf-8",
      "x-ms-keyvault-region",
      "westeurope",
      "content-length",
      "360",
      "strict-transport-security",
      "max-age=31536000; includeSubDomains",
      "content-security-policy",
      "default-src 'self'",
      "cache-control",
      "no-cache",
      "x-content-type-options",
      "nosniff",
      "x-ms-build-version",
      "1.0.20210204-1-c9f88df4-develop",
      "x-ms-keyvault-network-info",
      "addr=50.35.231.105",
      "x-ms-server-latency",
      "98"
    ]
  );

nock("https://azure_managedhsm.managedhsm.azure.net:443", { encodedQueryParams: true })
  .post("/keys/cryptography-client-test/c1a3cd3849514cc08cb716a73da476d8", {
    alg: "A256GCM",
    value: "ZW5jcnlwdHMgYW5kIGRlY3J5cHRzIHVzaW5nIEFFUy1HQ00"
  })
  .query(true)
  .reply(
    200,
    {
      alg: "A256GCM",
      iv: "HOI5mYwDclJrTsgRAAAAAA",
      kid:
        "https://azure_managedhsm.managedhsm.azure.net/keys/cryptography-client-test/c1a3cd3849514cc08cb716a73da476d8",
      tag: "WWiBimsoY-fvV60dl0m2ZQ",
      value: "uanyK_j7Fs9YGCslN9g-iqJruA2SC8vgrvTQ_6gwjCl4AQA"
    },
    [
      "content-type",
      "application/json; charset=utf-8",
      "x-content-type-options",
      "nosniff",
      "content-length",
      "265",
      "x-ms-request-id",
      "c5aa2372-7303-11eb-bf79-0242ac120006",
      "x-ms-keyvault-region",
      "westeurope",
      "strict-transport-security",
      "max-age=31536000; includeSubDomains",
      "content-security-policy",
      "default-src 'self'",
      "x-ms-keyvault-network-info",
      "addr=50.35.231.105",
      "x-ms-server-latency",
      "0",
      "cache-control",
      "no-cache",
      "x-frame-options",
      "SAMEORIGIN"
    ]
  );

nock("https://azure_managedhsm.managedhsm.azure.net:443", { encodedQueryParams: true })
  .post("/keys/cryptography-client-test/c1a3cd3849514cc08cb716a73da476d8/decrypt", {
    alg: "A256GCM",
    value: "uanyK_j7Fs9YGCslN9g-iqJruA2SC8vgrvTQ_6gwjCl4AQA",
    iv: "HOI5mYwDclJrTsgRAAAAAA",
    tag: "WWiBimsoY-fvV60dl0m2ZQ"
  })
  .query(true)
  .reply(
    200,
    {
      alg: "A256GCM",
      kid:
        "https://azure_managedhsm.managedhsm.azure.net/keys/cryptography-client-test/c1a3cd3849514cc08cb716a73da476d8",
      value: "ZW5jcnlwdHMgYW5kIGRlY3J5cHRzIHVzaW5nIEFFUy1HQ00"
    },
    [
      "content-type",
      "application/json; charset=utf-8",
      "x-content-type-options",
      "nosniff",
      "content-length",
      "204",
      "x-ms-request-id",
      "c5c47466-7303-11eb-bf79-0242ac120006",
      "x-ms-keyvault-region",
      "westeurope",
      "strict-transport-security",
      "max-age=31536000; includeSubDomains",
      "content-security-policy",
      "default-src 'self'",
      "x-ms-keyvault-network-info",
      "addr=50.35.231.105",
      "x-ms-server-latency",
      "0",
      "cache-control",
      "no-cache",
      "x-frame-options",
      "SAMEORIGIN"
    ]
  );

nock("https://azure_managedhsm.managedhsm.azure.net:443", { encodedQueryParams: true })
  .delete("/keys/cryptography-client-test")
  .query(true)
  .reply(
    200,
    {
      attributes: {
        created: 1613774559,
        enabled: true,
        exportable: false,
        recoverableDays: 90,
        recoveryLevel: "Recoverable+Purgeable",
        updated: 1613774559
      },
      deletedDate: 1613774560,
      key: {
        key_ops: ["unwrapKey", "wrapKey", "decrypt", "encrypt"],
        kid:
          "https://azure_managedhsm.managedhsm.azure.net/keys/cryptography-client-test/c1a3cd3849514cc08cb716a73da476d8",
        kty: "oct-HSM"
      },
      recoveryId:
        "https://azure_managedhsm.managedhsm.azure.net/deletedkeys/cryptography-client-test",
      scheduledPurgeDate: 1621550560
    },
    [
      "content-type",
      "application/json; charset=utf-8",
      "x-content-type-options",
      "nosniff",
      "content-length",
      "527",
      "x-ms-request-id",
      "c5dcf1b2-7303-11eb-bf79-0242ac120006",
      "x-ms-keyvault-region",
      "westeurope",
      "strict-transport-security",
      "max-age=31536000; includeSubDomains",
      "content-security-policy",
      "default-src 'self'",
      "x-ms-keyvault-network-info",
      "addr=50.35.231.105",
      "x-ms-server-latency",
      "75",
      "cache-control",
      "no-cache",
      "x-frame-options",
      "SAMEORIGIN"
    ]
  );

nock("https://azure_managedhsm.managedhsm.azure.net:443", { encodedQueryParams: true })
  .get("/deletedkeys/cryptography-client-test")
  .query(true)
  .reply(
    200,
    {
      attributes: {
        created: 1613774559,
        enabled: true,
        exportable: false,
        recoverableDays: 90,
        recoveryLevel: "Recoverable+Purgeable",
        updated: 1613774559
      },
      deletedDate: 1613774560,
      key: {
        key_ops: ["encrypt", "decrypt", "unwrapKey", "wrapKey"],
        kid:
          "https://azure_managedhsm.managedhsm.azure.net/keys/cryptography-client-test/c1a3cd3849514cc08cb716a73da476d8",
        kty: "oct-HSM"
      },
      recoveryId:
        "https://azure_managedhsm.managedhsm.azure.net/deletedkeys/cryptography-client-test",
      scheduledPurgeDate: 1621550560
    },
    [
      "x-frame-options",
      "SAMEORIGIN",
      "x-ms-request-id",
      "c6009acc-7303-11eb-bf79-0242ac120006",
      "content-type",
      "application/json; charset=utf-8",
      "x-ms-keyvault-region",
      "westeurope",
      "content-length",
      "527",
      "strict-transport-security",
      "max-age=31536000; includeSubDomains",
      "content-security-policy",
      "default-src 'self'",
      "cache-control",
      "no-cache",
      "x-content-type-options",
      "nosniff",
      "x-ms-build-version",
      "1.0.20210204-1-c9f88df4-develop",
      "x-ms-keyvault-network-info",
      "addr=50.35.231.105",
      "x-ms-server-latency",
      "34"
    ]
  );

nock("https://azure_managedhsm.managedhsm.azure.net:443", { encodedQueryParams: true })
  .delete("/deletedkeys/cryptography-client-test")
  .query(true)
  .reply(204, "", [
    "content-type",
    "application/json; charset=utf-8",
    "x-content-type-options",
    "nosniff",
    "content-length",
    "0",
    "x-ms-request-id",
    "c61e7a06-7303-11eb-bf79-0242ac120006",
    "x-ms-keyvault-region",
    "westeurope",
    "strict-transport-security",
    "max-age=31536000; includeSubDomains",
    "content-security-policy",
    "default-src 'self'",
    "x-ms-keyvault-network-info",
    "addr=50.35.231.105",
    "x-ms-server-latency",
    "105",
    "cache-control",
    "no-cache",
    "x-frame-options",
    "SAMEORIGIN"
  ]);
