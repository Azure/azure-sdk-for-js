let nock = require('nock');

module.exports.hash = "13802c79e02b4fee488f24f8f8b04aee";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://identity.confidential-ledger.core.azure.com:443', {"encodedQueryParams":true})
  .get('/ledgerIdentity/emily-java-sdk-tests')
  .reply(200, {"ledgerTlsCertificate":"-----BEGIN CERTIFICATE-----\nMIIBejCCASCgAwIBAgIQMNwF270tS2Ex6jsW6jP46TAKBggqhkjOPQQDAjAWMRQw\nEgYDVQQDDAtDQ0YgTmV0d29yazAeFw0yMjA3MDYyMTA0NDBaFw0yMjEwMDQyMTA0\nMzlaMBYxFDASBgNVBAMMC0NDRiBOZXR3b3JrMFkwEwYHKoZIzj0CAQYIKoZIzj0D\nAQcDQgAEDUWr/JYiEUnNS+4Ndfcci6yGRXhVWSnabgvShqrdxW4RBmsKZ+qsAWJP\nnavsVjf8Zgd8gghMm1y4Zl4PoHzTxKNQME4wDAYDVR0TBAUwAwEB/zAdBgNVHQ4E\nFgQUiIlVb/2YkHp4mXRhBuLaadG82zYwHwYDVR0jBBgwFoAUiIlVb/2YkHp4mXRh\nBuLaadG82zYwCgYIKoZIzj0EAwIDSAAwRQIgfYFw63rQ8RrH0BBs6yWbYbm+OWCq\nwyWR8oAT90gwHtACIQDNJ3eIewMJNDtUSJaRYhOIOu10evuW63wBLP/kftLAmw==\n-----END CERTIFICATE-----\n","ledgerId":"emily-java-sdk-tests"}, [
  'Date',
  'Thu, 08 Sep 2022 21:36:09 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Kestrel',
  'Transfer-Encoding',
  'chunked',
  'x-ms-correlation-request-id',
  '09f2c9b5-ffa0-4690-9c4d-47d51ecd8632',
  'x-ms-client-request-id',
  '92570274-cc18-474b-b811-4861cdced667',
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
  'a803e8b5-5b79-4000-a2df-0552c6340201',
  'x-ms-ests-server',
  '2.1.13562.12 - NCUS ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=Ao9jYsU_zSBBk3sd05RAp28; expires=Sat, 08-Oct-2022 21:36:09 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrpOrWKAu7BWMdxAmeb6nv54mcKEFTP9TskeF4pv16AhQXViLFA6m3z5cGJwacTfiYuKFCgl0a478xLPqtugIvHCjMO4RRlGlcZhiZHDgEEd6m6q6b517mR8SGlCpNMYMpaYeFFsabEUPvzHIYNsjKj5ogoZsoblMX2VtOpS0t4UEgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 08 Sep 2022 21:36:09 GMT',
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
  '568ef7b2-30af-460b-b48a-36b7279b7900',
  'x-ms-ests-server',
  '2.1.13622.6 - SCUS ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AhMOlnuQgXBBjPl0aFCyomo; expires=Sat, 08-Oct-2022 21:36:09 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrfs9ss6FMl9oHb4Q_2d9AfnOkDHLh9KOwDfuDKSZ8rNmb-1mYILpbO9Zu3mdH6P4mJGh0v-mzVwF_zENW3ESNWHdQmFoWzEomIcBuuwM6Xt6nHQCHbJLwMMDpSM2HU1ytCMlSJ5S0vRpN7BhV-txJB0eBdj7ru6l7JIm0io72HOUgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 08 Sep 2022 21:36:09 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.12.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=71d22139-1a66-424d-8a78-e0ca40e12c24&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'f14d7c48-79d9-4024-b83c-7e499b1e6e00',
  'x-ms-ests-server',
  '2.1.13622.6 - EUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AlfE-yht1-9Irxb30b-66yMsHfw7AQAAAElXrNoOAAAA; expires=Sat, 08-Oct-2022 21:36:09 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 08 Sep 2022 21:36:09 GMT',
  'Content-Length',
  '1334'
]);

nock('https://emily-java-sdk-tests.confidential-ledger.azure.com:443', {"encodedQueryParams":true})
  .get('/app/governance/members')
  .query(true)
  .reply(200, {"members":[{"certificate":"-----BEGIN CERTIFICATE-----\nMIIB9zCCAX2gAwIBAgIQVmi3xxPoS2CSW0trX6PMbDAKBggqhkjOPQQDAzAgMR4w\nHAYDVQQDExVDQ0YgR292ZXJub3IgSWRlbnRpdHkwHhcNMjIwOTA2MjA1MDM5WhcN\nMjIxMjA2MjEwMDM5WjAgMR4wHAYDVQQDExVDQ0YgR292ZXJub3IgSWRlbnRpdHkw\ndjAQBgcqhkjOPQIBBgUrgQQAIgNiAARCnVrG2N2DOe14Lf4Fl7nVgFu+hQFURiow\nuKZ+cn5FIR+JX+2uFZZSePElv2pXaWZNXTjPcKd1e+nd2rNYS6RIxad5w6XekxtW\n/keVzHTBTZyROxFoyIc3zrQvgFlKV7qjfDB6MA4GA1UdDwEB/wQEAwIHgDAJBgNV\nHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAW\ngBT86ZpcCCgMm5UBZzjHoqJ9LG2YEzAdBgNVHQ4EFgQU/OmaXAgoDJuVAWc4x6Ki\nfSxtmBMwCgYIKoZIzj0EAwMDaAAwZQIxAJAg3YajqoBvOSTTf9uPUgOafrZ8Rm/1\n19TWTS9crEHP2PeXZMYI8kVHHNVIx7C8ggIwcKTiiZIoAJcmY0VVd43VQC5B0bOI\n/zpSGEul/b7d+eMw1gHKhLGOBQxnO15+UQGR\n-----END CERTIFICATE-----","id":"01d2ba6dc3cbe28812aea79d322e97b8c4eabde61c6f8b6c312d5fa5c97f95dd"}]}, [
  'content-length',
  '856',
  'content-type',
  'application/json',
  'x-ms-ccf-transaction-id',
  '4.29157',
  'x-ms-client-request-id',
  'd92e3ada-5a9f-4a83-b1c4-86f3dc378207',
  'x-ms-request-id',
  '1856683073'
]);
