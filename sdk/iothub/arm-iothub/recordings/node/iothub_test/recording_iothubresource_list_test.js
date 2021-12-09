let nock = require('nock');

module.exports.hash = "8e5894c76622a8c97acb6ec3ef36fa63";

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
  '8072c932-7798-47de-b5c9-9457188a0300',
  'x-ms-ests-server',
  '2.1.12261.14 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=ArlOHEO75ctOuXJo1hBQpkI; expires=Sat, 08-Jan-2022 09:00:20 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr5XVM6RHrHb-OAfYeIYU5CFw5-2eArGd3H-GnEPnC3Fe8fQ4WRu4S4gayQv3pNsGy7VW6oLuZNfhlQyA7BoInqvvUVzWlHMIZTVSSyFNzo97bYYQRG50uaU00Ldgwa7b1r0r34poru37da0dA7Lg2KY83lpNL2A9k-mh15eghoMkgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 09 Dec 2021 09:00:19 GMT',
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
  '35c844ca-d564-432c-ba13-b3e979c10300',
  'x-ms-ests-server',
  '2.1.12261.14 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AqLbqOsEtpVGn9qbJGHDh7E; expires=Sat, 08-Jan-2022 09:00:20 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrezPg4hicaD4IkMeHx-mkzrm1bwOxFJXhqD2knkdf2ZC60VGX7lvjB7-djt9AQmlQTyIhqJw_lACIdl84wd2m3JO9DrB2Llj-mwmghPI-emgWTI75J2v7xwq7xjnD0S_8FAuAzS-WeAh2ywE0QCfTddhMM9Sgl7bTEBYPWro5CSYgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 09 Dec 2021 09:00:19 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=1a1c8e66-82ca-41c8-83f7-7e1ebeab87fc&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '518e4bd1-1302-465e-a88a-d334c6ad0300',
  'x-ms-ests-server',
  '2.1.12261.14 - SEASLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Antprp-Q9uRKqo-IobVemicWPr5BAQAAAKO8Q9kOAAAA; expires=Sat, 08-Jan-2022 09:00:20 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 09 Dec 2021 09:00:19 GMT',
  'Content-Length',
  '1374'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Devices/IotHubs')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bd5ffc5131fbe8d147779bf5a499d6c5aa2daa6573f7e1def9c3fbb383f3ed7bd34f1f6cefefeeed6f3fdc9d3ed83e989eef3c98ce26e77bfbbb77ebbca9d6f534ffbcaed6abe6eee2faa79b366fdabbabbaba2c6679dddcfda298d655539db7e3a7f96531cd9bbb6755fb6dea891a17553b5f4fded1737d7dfdd33f5dd71f8d3e5a660bc2e9a3f897edf50a5f0ec2a4266535cd30006a96674dbbc6676d76d17cf4e8177ff436bfa68f79d8bb1ffd92d147fe809904b71933c133a3bec0a8e935336cfa2aa7bee893637a9e3ebbff743dd9f98c3e2572acf2ba2d7246c3a0487f10edcd5ff4d629219c7ef59a5ea8ab12035dd5c522abaf09d7a0dd77a9afa05d934fabe58c5b7e9f86d5662d3e3d9eb6c5654eada8fbcba2a1778be5c56bfdf2f57a3acdf3593ea3ef8bd5b3a26cf3fad5ba048684d439fffd22e3b9a8e9630c3b2378dcff31bdbac2688bd51759f3963ed9bdb73bdedd7d30debdff707cff1e63b1ccdbabaa7e0b98aff396c0fee28f66f979b62e5be0c5709ee6cb6b8292ad56e5f59beac99a3a3d5b9e5ee64b4ce6e972b6aa8a65fbd1a3b65ee7e80ba008cecde8956575451f0c6347733faf9a560144786d9cfd605de7db3361af318d85e0e51dcc08975f2c1ff26f75ded2af84c29b62919f2d9f66d7f4f12e513fa399c7e727d51ac3d9f33e3a9b519bef7db443d0773f22a2adb2761ec7885ae4da2f3568268feede9536dbcb66dbb5dfdefdf4dede834f1f7eba7d6f67772f9bee4e670fc64d5e631c937533be2a96b3ea8a4774f7a35f427420166e892d3000039f50fac51fe93b4fd6cd4facf335d39df0739fbea956c5543f651a1061f4cfa6adeaec223fa9966d562c4909e063edca003acfca72924ddfbec267e84fe5fe77335fd07845c8e84391f22ff2a621b01068703bd38fbe0477d0470679cc29fa10a41a10b5684e97d9a424567f44d09b1cc3561c83a9fcdd943ff17b93356fdaf2b8396baa834f7776a99f976f76bf4dfd50d7cb9c39ed755b33e13e924f65ace81e1fa10f428410a636412fc4bbf98baa2dce0b9167fe9084fbedd375cd1f743afd82c0b7515416d9bba77949225e5f2b6bedeea0df9c474b229d7fb52aab6cd6e98d69402897d57af6a612da028718b89191d93831ce4983f064d1ebdfe810cef3ac2501246c3f7a512d31bf8b62f9a66c7e92b889e0d3c7bbe33dfa9498a5baca67cf7ed16cf9bc20054cbc456f376fd7c04859ea3594435be4357e6f33e84928bd69b6caa6454b1661975e216345b28bbf7eb1b132dcf12ff925dfff","25ff0fb42fe2002a070000"], [
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
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11949',
  'x-ms-request-id',
  '3c7a2df9-31af-4700-abb7-1ac65c9fb653',
  'x-ms-correlation-request-id',
  '3c7a2df9-31af-4700-abb7-1ac65c9fb653',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211209T090020Z:3c7a2df9-31af-4700-abb7-1ac65c9fb653',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 09 Dec 2021 09:00:19 GMT'
]);
