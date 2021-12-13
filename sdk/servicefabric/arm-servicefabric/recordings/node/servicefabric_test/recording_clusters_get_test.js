let nock = require('nock');

module.exports.hash = "fce818aafeae983ee9f8248fc2c124fb";

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
  '311b60c9-0dff-4e90-abb2-27289cc51f00',
  'x-ms-ests-server',
  '2.1.12261.14 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Aip7KqCAuzNHg6tWkcMjqVM; expires=Wed, 12-Jan-2022 05:36:01 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr-T5qzEZ-5cBkJ5FyLeMlLRB9DuLvdfOUsGTB5pDFCbQ_KuoEWX1FjOy97T4BUZYpXpVABtvX8SLvxTLCzJ9fUnUhC1bpjDqFXss58wMs81jbUcAWcK6IXO2RsHpbKsZAN-a4zI76naCmUQTKDcTCdv9-9REgniPLlgt0HKGTR30gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 13 Dec 2021 05:36:00 GMT',
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
  '89baab6e-fe24-4d4d-94c1-3b256a682000',
  'x-ms-ests-server',
  '2.1.12261.14 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AmdGmNUtin5KqYIRXnewUhI; expires=Wed, 12-Jan-2022 05:36:01 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrAV7STK3mkEyMrijizz2NCLJcCvbJySO7ee0HATZju3Ruw4Ooyx0VpEc-iSmfqwujhnEGIgb-3zJ1i_bBR84VmvCfBaYfv-dZhOEca7ZheuwPje6pdyF4tVa_6FlbnWwFPWi8B31sRFbn2pdvXu_FLyI7suRmxKzAT1uV8ZAqWlcgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 13 Dec 2021 05:36:00 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=98b17cd6-99f6-43d9-a39c-ef15a5e78011&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '1a38419d-bfc2-443e-bb1b-f20cf5552100',
  'x-ms-ests-server',
  '2.1.12261.14 - KRSLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AtwJJDMeKwpIl4yq7TXBIzcWPr5BAQAAAMHSSNkOAAAA; expires=Wed, 12-Jan-2022 05:36:01 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 13 Dec 2021 05:36:00 GMT',
  'Content-Length',
  '1374'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ServiceFabric/clusters/myclusterxxxy')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef16f9ca4e947edf52affe851fad117c5b4ae9aeabc1dbfceebcb629a3fcb267531bd3b2dd74d9bd7cd47236e5e56d3ac2daa255ec9b3a65d9b2f8a193ebadbac27cdb42e5668d3dc7db877fef0feece07cfbdef4d307dbfbbb7bfbdb0f77a70fb60fa6e73b0fa6b3c9f9defeeedd3a6faa753dcd2fea6abd6aee2eae7f9a3a6cdabbabbaba2c66d4f5dd9b70a377f4d777efde5d2b42cb6cc1038b7d97b7d905befbeedddff7a34fef3d78b0fff0c1cefdfb070feedfdfdfd97df8fb7ea4cd9a6b7a6ff1346b336acce4a20fa7759eb5f9ecc9357df6d179b6ff20dbbdb7b37d9edd9f6eefcf263bdb0fa7d3fbdb93e9a7f777ee4f0ff61fec3f1060fe9b6f94e6c7ab5559283d3b8d8e5b34d8dbd9dbdddedddbdebdf766e7fea37bf71fdd7f30bef7e0e0c1c34f0f3ed9d979b4b3635f2b692ebea866c579810ef0ee7ba116bebe093fbfe56d91c4abbf84017c4493bacaebb6c81b7ad590943ebc2c1aeaa5585ebc6e69f8f4dd47afd7d3699ecff299ed5ae7f18c392d7f904fa7f7ceb3ede9c1c3bdedfdfce03e71d5ec607b96dfbb7f6fe7d3c9c1f9c387dd374faa59fe93c42fd413401c8cf7c6bb7bf7ee8f1fde7fe828a96d2d1edfcd8a96f07a56d52fe87565776ab7c896d945bec897ede972b6aa8a251363deb6ab477789214f04cc5884643c2dabf52c5badc6d90fd6753e9e568b47bb0f770e7add766135044c4134c2fbe71978dfc1b95baf976db1c89d34bc27690a1ac209e6e41c739dbf99af1793554d38608abef7fdc18627d562512d5f9098850d05c1d7790bb2f157f2456ae61b8f15cfaf56177536cb55b00d5a783e5a653535c290a8a10582c70384c70223867d5995e5d9925ebacce8e7eb7c5a2d6776d2ccf3117db9e6373e15ee34cf2f717f7cdffcaa9fd9f1d579596493a22cdaebe7f9655e02cceba2bccc6bd3cd474be214085180b887b44578d9ee5e2ecc6b780c99abe5329f42f00c43bcac6a300531cdce8edf1e4cf239cdc655761d69fac06f4aec67c4194d809c87133568daac366fef513f7e47f475be9ce997f7e8bb1df79dc8b63c1fe5ab3949459d9568bbb98f7dc270b08f4ff7e94bf75dd047d1bcac8b455643d1b5f53af7bf9badebeeec3ca9abe50f42deba5c9c2d0995e594d898e4875addf7bf2e1a96ff326f3082f3ac6c72f36d971d664576b1ac9ab698d23b554d3ae1783a054c9ac3f30266c6128006ef3780e8d0d70cc12147da9087468da8f7df2bc718d520e1f9a86196ded080b4694bbc93cfa801baa116a6a71041fa62d77b6f525613c342680cce82fa017a637c49da8654ce55b19c5557cd7899b777bdb77fd13a5fe783aff3b71bdf6fb34939fc3e7fbbf1fd8151ef01948ab861a18fd6a273c88c31558ed76db520b1981a701f65975951a24bd5e26a34c00b51719e12246d434de28605cf47cd7ab522f63e7db72aeaebafda295a3fa407f6f3deee9bbd7b8fee3fa4ff8de9233cc1bbf9f2b2204686c5c16bdf153ae8d86874f28be54b1de477b34b1e247e8aaea386","bfe4ff01399f4519fc090000"], [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11999',
  'x-ms-request-id',
  'd30fa343-c949-41e0-8c06-b9abc555799b',
  'x-ms-correlation-request-id',
  'd30fa343-c949-41e0-8c06-b9abc555799b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T053601Z:d30fa343-c949-41e0-8c06-b9abc555799b',
  'Date',
  'Mon, 13 Dec 2021 05:36:01 GMT'
]);
