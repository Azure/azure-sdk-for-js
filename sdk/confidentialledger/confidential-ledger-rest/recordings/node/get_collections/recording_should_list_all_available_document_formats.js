let nock = require('nock');

module.exports.hash = "ee83f75ca99cfa6d6e4693195b074f48";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://identity.confidential-ledger.core.azure.com:443', {"encodedQueryParams":true})
  .get('/ledgerIdentity/emily-java-sdk-tests')
  .reply(200, {"ledgerTlsCertificate":"-----BEGIN CERTIFICATE-----\nMIIBejCCASCgAwIBAgIQMNwF270tS2Ex6jsW6jP46TAKBggqhkjOPQQDAjAWMRQw\nEgYDVQQDDAtDQ0YgTmV0d29yazAeFw0yMjA3MDYyMTA0NDBaFw0yMjEwMDQyMTA0\nMzlaMBYxFDASBgNVBAMMC0NDRiBOZXR3b3JrMFkwEwYHKoZIzj0CAQYIKoZIzj0D\nAQcDQgAEDUWr/JYiEUnNS+4Ndfcci6yGRXhVWSnabgvShqrdxW4RBmsKZ+qsAWJP\nnavsVjf8Zgd8gghMm1y4Zl4PoHzTxKNQME4wDAYDVR0TBAUwAwEB/zAdBgNVHQ4E\nFgQUiIlVb/2YkHp4mXRhBuLaadG82zYwHwYDVR0jBBgwFoAUiIlVb/2YkHp4mXRh\nBuLaadG82zYwCgYIKoZIzj0EAwIDSAAwRQIgfYFw63rQ8RrH0BBs6yWbYbm+OWCq\nwyWR8oAT90gwHtACIQDNJ3eIewMJNDtUSJaRYhOIOu10evuW63wBLP/kftLAmw==\n-----END CERTIFICATE-----\n","ledgerId":"emily-java-sdk-tests"}, [
  'Date',
  'Tue, 13 Sep 2022 15:27:58 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Kestrel',
  'Transfer-Encoding',
  'chunked',
  'x-ms-correlation-request-id',
  'f28fb98d-f745-492e-8a2b-eac7d91245e4',
  'x-ms-client-request-id',
  '63311a40-1c8a-4ee1-bc4f-f1f7acc46f54',
  'x-ms-machineName',
  'identityservice-69c77996fb-fffmx',
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
  'd8787eee-8986-4709-83db-279982522800',
  'x-ms-ests-server',
  '2.1.13672.7 - SCUS ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AlsLoItlWB1DjCN8i0YwFa8; expires=Thu, 13-Oct-2022 15:27:58 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrnOupcXXqJtD5uKGnsA2esU6Ebme6F3V634r9Z2FtN7qumDhTTNeup6s1oRtxxrGI1Gdus41frjgNG-TFJU_kFUeneLDXgqgq9IVg96894g1RqGMHUqDaiK401YLKdvJ1QABUYvJls0IRavYshyu71rYP8zBvRnlxDqqVn0PU64wgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 13 Sep 2022 15:27:58 GMT',
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
  'd3624cd9-d016-46ee-9f55-af21a00e1e00',
  'x-ms-ests-server',
  '2.1.13672.7 - SCUS ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=ArMr8xNirblDsZDo7b65bFg; expires=Thu, 13-Oct-2022 15:27:58 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrV2SllMFSOEKXpb-CVSx4wxT6O1H3VQDZzKt7U84DAFgXaEhD71_rEYjJIruXFvliHysiqYJpGGD-TSZf67YNaotYReAFoWUSbwW0HBfuZPLRj7FpbbLY8BzK99kRQ5tDwEu2TXqBP70avzIJdo0xuJ2-u5MXoER5MEEpES_IW5IgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 13 Sep 2022 15:27:58 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.12.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=0143367b-68be-4460-bc55-6838c2024d91&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '2ff3f08d-7767-4ad2-bfd7-089ff2532600',
  'x-ms-ests-server',
  '2.1.13672.7 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=Aomea4d73kdMhM36zB9XPHosHfw7AQAAAH6YstoOAAAA; expires=Thu, 13-Oct-2022 15:27:58 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 13 Sep 2022 15:27:58 GMT',
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
  '4.39025',
  'x-ms-client-request-id',
  '4c53233f-b5f0-4ce3-a8ab-f6055130723b',
  'x-ms-request-id',
  '743423390'
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
  '4.39026',
  'x-ms-client-request-id',
  '5962bd95-8bc1-49f9-adc2-e83047cf7f7a',
  'x-ms-request-id',
  '1310406793'
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
  '4.39027',
  'x-ms-client-request-id',
  '11624d3f-2b94-42c8-8bb7-2c9dbf27fa4a',
  'x-ms-request-id',
  '435897543'
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
  '4.39028',
  'x-ms-client-request-id',
  'c1187746-d30e-4923-ab86-bc6261a0d273',
  'x-ms-request-id',
  '1774833049'
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
  '4.39029',
  'x-ms-client-request-id',
  'eb1d4634-8326-44b6-a94b-4a262efc084a',
  'x-ms-request-id',
  '571960891'
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
  '4.39030',
  'x-ms-client-request-id',
  '46278938-64be-4786-bbd7-8a7c5b1009bb',
  'x-ms-request-id',
  '1587296197'
]);
