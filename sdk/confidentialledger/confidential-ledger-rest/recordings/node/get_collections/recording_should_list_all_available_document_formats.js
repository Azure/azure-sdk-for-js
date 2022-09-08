let nock = require('nock');

module.exports.hash = "ee83f75ca99cfa6d6e4693195b074f48";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://identity.confidential-ledger.core.azure.com:443', {"encodedQueryParams":true})
  .get('/ledgerIdentity/emily-java-sdk-tests')
  .reply(200, {"ledgerTlsCertificate":"-----BEGIN CERTIFICATE-----\nMIIBejCCASCgAwIBAgIQMNwF270tS2Ex6jsW6jP46TAKBggqhkjOPQQDAjAWMRQw\nEgYDVQQDDAtDQ0YgTmV0d29yazAeFw0yMjA3MDYyMTA0NDBaFw0yMjEwMDQyMTA0\nMzlaMBYxFDASBgNVBAMMC0NDRiBOZXR3b3JrMFkwEwYHKoZIzj0CAQYIKoZIzj0D\nAQcDQgAEDUWr/JYiEUnNS+4Ndfcci6yGRXhVWSnabgvShqrdxW4RBmsKZ+qsAWJP\nnavsVjf8Zgd8gghMm1y4Zl4PoHzTxKNQME4wDAYDVR0TBAUwAwEB/zAdBgNVHQ4E\nFgQUiIlVb/2YkHp4mXRhBuLaadG82zYwHwYDVR0jBBgwFoAUiIlVb/2YkHp4mXRh\nBuLaadG82zYwCgYIKoZIzj0EAwIDSAAwRQIgfYFw63rQ8RrH0BBs6yWbYbm+OWCq\nwyWR8oAT90gwHtACIQDNJ3eIewMJNDtUSJaRYhOIOu10evuW63wBLP/kftLAmw==\n-----END CERTIFICATE-----\n","ledgerId":"emily-java-sdk-tests"}, [
  'Date',
  'Thu, 08 Sep 2022 21:36:10 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Kestrel',
  'Transfer-Encoding',
  'chunked',
  'x-ms-correlation-request-id',
  '24ebc365-43d5-4aba-950f-22cb6b173bee',
  'x-ms-client-request-id',
  '9cfea83a-b9cc-4aaa-ba69-a64c56ad155b',
  'x-ms-machineName',
  'identityservice-69c77996fb-fq8xn',
  'x-ms-image-digest',
  'sha256:ff7211ed279924272e3c73dad9a7b9a438c814cee7fca952eed9f38b393580ef',
  'x-ms-image-tag',
  '1.0.02049.29-cb8535e39ba27833da973165c9003a442deb7d8d'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
  'Cache-Control',
  'max-age=86400, private',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Methods',
  'GET, OPTIONS',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  '207e54d6-9d81-41e4-9985-824f73a87701',
  'x-ms-ests-server',
  '2.1.13562.12 - SCUS ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=Ah1OFkVl3rlBpftPBXLQg4g; expires=Sat, 08-Oct-2022 21:36:11 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrfW0Y2RCdIOeWj48FoXZLw8dzCcJ4LdyZWHzvi56e67HcM1vkZEPCwm_NcjdafkwkbL3wvPB-LukY091gF1cGlMrqUkDFDHDPpPo45A9q0v9LjGKriMUgVXXgELA3ZDadpyv1gk00Rxwp0e4DDPWCx-4iaAe-7kK_Lpc1VSn8RQ8gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 08 Sep 2022 21:36:11 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/88888888-8888-8888-8888-888888888888/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/kerberos","tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
  'Cache-Control',
  'max-age=86400, private',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Methods',
  'GET, OPTIONS',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  '979bdd3e-2f63-4362-b281-795d92a47000',
  'x-ms-ests-server',
  '2.1.13622.6 - WUS2 ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AnAW7HZw7WtMtXED9LtjnWE; expires=Sat, 08-Oct-2022 21:36:11 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr0lJ2pVVBuCxO_EBwsz1AW6q9RzYWVTueZ0G_SZKwUddEdZS5lvE-kBitjsh5nsArrdYIWi2bYyZRFb2J6Dk97wNiQEklx2yWAmOb3KC4xxpzzdq02IY6LCSjwAiYcKfUc5hDbcrc_v1uUlxqU653s3AysENHiC_r1sdaiD8YFN8gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 08 Sep 2022 21:36:11 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.12.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=6059b956-c930-4255-aaba-48129dbae946&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  'e4b27afc-c3ec-453e-938a-5fd68cd36f00',
  'x-ms-ests-server',
  '2.1.13622.6 - EUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AmCELeod6eRCswDtD0N3lQA; expires=Sat, 08-Oct-2022 21:36:11 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 08 Sep 2022 21:36:11 GMT',
  'Content-Length',
  '1334'
]);

nock('https://emily-java-sdk-tests.confidential-ledger.azure.com:443', {"encodedQueryParams":true})
  .post('/app/transactions', {"contents":"add collection number 0"})
  .query(true)
  .reply(200, {"collectionId":"0"}, [
  'content-length',
  '20',
  'content-type',
  'application/json',
  'x-ms-ccf-transaction-id',
  '4.29158',
  'x-ms-client-request-id',
  '7c56df11-708e-4552-a2e0-a23be1a98856',
  'x-ms-request-id',
  '499240048'
]);

nock('https://emily-java-sdk-tests.confidential-ledger.azure.com:443', {"encodedQueryParams":true})
  .post('/app/transactions', {"contents":"add collection number 1"})
  .query(true)
  .reply(200, {"collectionId":"1"}, [
  'content-length',
  '20',
  'content-type',
  'application/json',
  'x-ms-ccf-transaction-id',
  '4.29159',
  'x-ms-client-request-id',
  '6450e2e6-68c6-4eb2-b9d0-aceef01623eb',
  'x-ms-request-id',
  '1130469563'
]);

nock('https://emily-java-sdk-tests.confidential-ledger.azure.com:443', {"encodedQueryParams":true})
  .post('/app/transactions', {"contents":"add collection number 2"})
  .query(true)
  .reply(200, {"collectionId":"2"}, [
  'content-length',
  '20',
  'content-type',
  'application/json',
  'x-ms-ccf-transaction-id',
  '4.29160',
  'x-ms-client-request-id',
  '0a9dcb7e-8dcd-4830-97be-8466e8a92cc0',
  'x-ms-request-id',
  '488584352'
]);

nock('https://emily-java-sdk-tests.confidential-ledger.azure.com:443', {"encodedQueryParams":true})
  .post('/app/transactions', {"contents":"add collection number 3"})
  .query(true)
  .reply(200, {"collectionId":"3"}, [
  'content-length',
  '20',
  'content-type',
  'application/json',
  'x-ms-ccf-transaction-id',
  '4.29162',
  'x-ms-client-request-id',
  '933c6593-8d50-40ee-b1b5-73880f621d8c',
  'x-ms-request-id',
  '814578722'
]);

nock('https://emily-java-sdk-tests.confidential-ledger.azure.com:443', {"encodedQueryParams":true})
  .post('/app/transactions', {"contents":"add collection number 4"})
  .query(true)
  .reply(200, {"collectionId":"4"}, [
  'content-length',
  '20',
  'content-type',
  'application/json',
  'x-ms-ccf-transaction-id',
  '4.29163',
  'x-ms-client-request-id',
  '67eb039f-fe71-41a2-88b2-4a5cf4497b8e',
  'x-ms-request-id',
  '150200921'
]);

nock('https://emily-java-sdk-tests.confidential-ledger.azure.com:443', {"encodedQueryParams":true})
  .get('/app/collections')
  .query(true)
  .reply(200, {"collections":[{"collectionId":"3"},{"collectionId":"0"},{"collectionId":"subledger:0"},{"collectionId":"1"},{"collectionId":"2"},{"collectionId":"collectionPost:0"},{"collectionId":"Messages from Alice"},{"collectionId":"4"}]}, [
  'content-length',
  '228',
  'content-type',
  'application/json',
  'x-ms-ccf-transaction-id',
  '4.29163',
  'x-ms-client-request-id',
  '24a4ee33-a637-466c-99db-1c2c9ce2d51d',
  'x-ms-request-id',
  '157737123'
]);
