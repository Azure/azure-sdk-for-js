let nock = require('nock');

module.exports.hash = "4e47848003a4f74b73262cd4a838afa8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

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
  'e407fa4b-b48e-461f-b002-2daf1aee0400',
  'x-ms-ests-server',
  '2.1.12261.14 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AnXCAflXoS9Eo-HXq-8g2v4; expires=Sat, 08-Jan-2022 09:55:51 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrZXAWt4xJhaqvqn2rNtfVEEnZoA4I3CjGTIqbzCFXJ5TlQywtPfV-HrH6DDk939UyPGGmiibDy2D8c12TxJMqTcZU8sqQmSyuHEd7FPczUJz9Js4Xj7P2ZlfyW5OJSBSGClz-FHNzWd89fMNV-KAENkdT34bUblI1hCp6ZqimAxwgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 09 Dec 2021 09:55:51 GMT',
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
  'e64ab049-807d-4477-81d6-ab38d3e90300',
  'x-ms-ests-server',
  '2.1.12261.14 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AkzasMtKU9pElZK3AZdcrmk; expires=Sat, 08-Jan-2022 09:55:51 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr0eDQEHhjDBqrP-K8_fQzr0verM_ojqZMGQBaXaKKee0UDriubaOezboAAPJHIZQcSDqIowUpu0WGPpmkzQDZo0gnkV-V9hVW3pgr4qmozALM8hskfQwRkFNSE-LySbTaekBVQLArsjcAvuMyboO_7Ka9ddeNBELm7lekD1wenaIgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 09 Dec 2021 09:55:51 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=49db6498-5a39-48cb-bd84-a6fc6154c2cb&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '8072c932-7798-47de-b5c9-945719f80300',
  'x-ms-ests-server',
  '2.1.12261.14 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AqZt2mqY7RlJpgPlcOg9mqIWPr5BAQAAAKfJQ9kOAAAA; expires=Sat, 08-Jan-2022 09:55:51 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 09 Dec 2021 09:55:51 GMT',
  'Content-Length',
  '1374'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.DocumentDB/databaseAccounts/myaccountxxx5')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8e9f56d3f5225fb64f9fdc9d656d36c99afc783aadd6cb162f66f2ebbb77efee7f34fa68992d7242a9fb71594d3360475f9d664d9b7ef59a3e6caf57687bab8ea8f9db6289d17e5e5693ac744de99b36bb683e7af48b7fc9e8a3e69a86b1784a2fd3df1f4deb3c6bf3d9714bafededeced6eefee6def3c7cb3f3f0d1fddd47f73e1defeeeddedbfbf4a73ea21769dcabbc6e8b1c80f0d765d110bec5f2e2754b3008c0ebf5749ae7b37c461dceb4f7d3e56c55154bc09fb7edaa79743724c8d8346cc6d90fd6753e9e568b47fbfbf7ee128cd57a5216d317797b55d56f699879435d7f74bacc2625f791f36fc7ebb65a10e9a6cfb2a2ac2ef3faa347e759d9e4e6fb2fd6655baccafcbb75d1e6cf95ca042868f432a391e18bdf2bbffe8206d5560e4cd1fc6451b7ebac544c9e15659bd7060dd3ea3268f36a5d824edffbfec8e07bbc2aded06cd2871fbdfe4525613f2b1a7c411d3ea1599c7d91b719a694d1348355d882e3b33acfdf14bdf11d2fb3f29a869f95af09ebec826642bfcfbadf9c54cbf3e2625d3309308bcd749e2f32e045687d372fcba7f979b1a451d17c17cba6cd96d3fc8cc6f8d1dec3fd8793c9f9bded87fbf74862f207f9f6e4de79b6fde0fedec1fe642fdf7ff0f01c63a201783cf9e5f9795e2b746292e52cab316fb3fc3ca349399bd1b417ed357df9aca89b1673706d3f244111521e4fcb27d7ab0ce4f8e845b5cce91b251d26b3a4e99fdb114f69660be2efe5f4fa6545bc43b07fb1e98e066fbe7b9e5fe625817b4d440625461f2db277674b9ad5cbac3c5bbece09ce8cfabbcf5f10e665bea4a62f6ba2cebb8f1eedeeec107da88d23e697c4773569057a0942768549047af88e3efb9eeaa180f5b7af489dac21b746f65f886af82e7d2ef26f84e3262952501b85e906813d57e979591715614f94db211e687e8a28fe2a9fad69eed03dd3f997105793de98fdff7780a3e870c81eb4f329f55e67656c58aff17d7a220dde737c21ec6f769c7bef39ce3c03ad0954677cce2e19f46e1c9680fa6687b33b381ce24b83f28f7832e361fd88277bc31250dfec7036f2a46d0e93c4fed3d7654d0bc9764c96280a2b9c3b7ab50333c2177de07b03c08582f44a07a89b8c3eac5d50625ad5183d7ecb56d9a428c9e7627ad027c5ca739a26d9f4ed7ac504a3777fb171845fe6046f564ca907f245f9d72faa59fe32704de55d67cebf28966bf2dc6938fb245df2edab9c1c0160ee9a7d9bbc7d6a74609aa8cf642614787cf4795e7df44bc8be775d93571a2b9cc16bf8def7a905f902041f03b7c8b3f3f24b","7ec9ff03e5248b6b930c0000"], [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'Content-Encoding',
  'gzip',
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-gatewayversion',
  'version=2.14.0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11143',
  'x-ms-request-id',
  '2a7ec6bb-9311-4ca9-8889-8eb9b3980166',
  'x-ms-correlation-request-id',
  '2a7ec6bb-9311-4ca9-8889-8eb9b3980166',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211209T095551Z:2a7ec6bb-9311-4ca9-8889-8eb9b3980166',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 09 Dec 2021 09:55:50 GMT'
]);
