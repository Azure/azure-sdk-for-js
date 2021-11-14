let nock = require('nock');

module.exports.hash = "48b6edfc408c755cac39ec112cb4b77e";

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
  '9f2a07e2-2a5f-4d52-857e-9dcaff950500',
  'x-ms-ests-server',
  '2.1.12197.4 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AnMQgI1YCrlMn3G6leT7pe8; expires=Fri, 03-Dec-2021 09:46:17 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrlsPKjjQonfh1o5NumowjSlSCjT0JER-9nJz8GvzEoZ4nLRLrz5ywy7spz8J_8vNG9dBMIq5N-PU2FmZDfRfgJbatQtpyPuN8M8dhzFFhrJ3MoGAesXk3mO6Bt9Qb9fN5gUl_S9FlpVMP0ZspTNHq7cTPcwL6Na3a4CwbWhmPjJwgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 03 Nov 2021 09:46:16 GMT',
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
  '561aaf9e-25b5-44db-9d11-585d1d240500',
  'x-ms-ests-server',
  '2.1.12197.4 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AtzMjDM6Br1Jp6oAYXYVb00; expires=Fri, 03-Dec-2021 09:46:17 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr-VuS9UQyN2Zrw-SPNprTQPtJ3aNNOdJGBUBv40OpJbOcrcWXTmTiH0s2_3eFnRqjNHVMbZ5sleiqf9dV_Yq-3ceCv7wimDzj4RfdqHt4HvKi09CZDSFYcV7ER5teWYQLa7k8qFdXFGZtJQYNR5wFVC-cCsVbNAbvlPEkokDZsR4gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 03 Nov 2021 09:46:16 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=3a1b49f5-1ec3-4475-932d-70104053846b&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '17dca5ec-0afc-442e-a44f-9ebbb7660500',
  'x-ms-ests-server',
  '2.1.12197.4 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AvPnhYTRsJ5NhsZrm0C--jkWPr5BAQAAAGhRFNkOAAAA; expires=Fri, 03-Dec-2021 09:46:17 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 03 Nov 2021 09:46:17 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ContainerRegistry/registries/myregistryxxxyy/importPipelines/myimportpipelinexxx')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147edf52affe8d1475f14d3ba6aaaf3767c522ddbac58e6f5abfca268dafafa6e2dbf147973b758acaaba7d59acf2929a341f8d3e2aab69d616d592609c1ebf7ef3d56bfaac98e5cbb668af3f7af48b3f5ad5c5725aacb2f26c464df6ef3ffc74b6973ddcde3fc8a6dbfbf7ef4fb6279feededf7eb897657bf71eecdd9beeef1180365f66cb96df78b077fef0e06072be7df0e9f9eef6fe6e76befd70379b6cefcd1e4c673bbbbbb3c9fe03bc21c368ae9b365f1c374d71b1cc671ffd12e0421fdf6dd693665a172b60dadc7d4830efcf0eceb7ef4d3f7d4030f7f609e6f4c1f6c1f47c87a04ecef7f677efd67953adeb69fe795dad57cdddc5f54f13e8a6bdbbaaab4b1a60dddcbd25cd16d7fac7f5bb77efaeafbb34a4efe593957e42ad6840cb6c8101c5bf94613ecdda0c249ed679d6e6b32744ef8fceb3fd07d9eebd9dedf3ec3e117836d9d97e389ddedf9e4c3fbdbf737f7ab0ff80c9655f7923743b5eadca4227d27e7bdcd2377b3b7bbbdbbbbbdb3bf7deec3c7cb4ffe9a3ddbdf1debdfbfb3b9fee7fb2b3f3686787da9759d37e51cd8af30220e9a55b6211be1745c56f724b7c68d2698e5679dd12f5411f9947fca65c72fc83759dbf6eab3abbc89f94d5c44e1f75b8ae0b6a316fdb55f3e8eedd6c3aadd6cb1693319e50cbf1b4aaf3f155b19c5557cd7899b777a7e65db4a1f7dfe6d73f99adcbf6ab00cee2fa121f8ee5df0cfdf3db4d4eb46e1beaa796796eb2060320ceb9b8207c0867c1fe8df7419bb56b1ad847a7cb6c5282cbe9854a58fba347dffbe8cbcbbcbeaa8b367f935d40429fe665dee6af190c46fbe5f2f57a3acd1b7c879117cb75fee5f2b4aeabbaf9e8fb4cbccba22168c5f2e235f5058af11bf98c","3bfb7f001de0615f34040000"], [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'Vary',
  'Accept-Encoding',
  'api-supported-versions',
  '2019-12-01-preview, 2020-11-01-preview, 2021-06-01-preview, 2021-08-01-preview',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11983',
  'x-ms-request-id',
  '650c6f0e-a284-461e-954a-eec760b0d172',
  'x-ms-correlation-request-id',
  '650c6f0e-a284-461e-954a-eec760b0d172',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211103T094618Z:650c6f0e-a284-461e-954a-eec760b0d172',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 03 Nov 2021 09:46:17 GMT'
]);
