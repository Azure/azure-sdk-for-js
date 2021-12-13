let nock = require('nock');

module.exports.hash = "e70b0fdea06a5e63617ec273e122b1d8";

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
  'e80ac778-5740-4244-80b0-912c76b91f00',
  'x-ms-ests-server',
  '2.1.12261.14 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AvRPMjUmkA1Nus6Z7dmuqqU; expires=Wed, 12-Jan-2022 04:04:40 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr5n7rS_dYYzM-r0C5wz3VBWO0hbJGeqBNzyhMNkIhysog5pSX3QhuJMKJV4ioZvFwWDSeO35PVkZlIWx1ie6u5QkNf9SY0QijLyr4FrIXumLsMzDijoqiU3Ib5gaF6KXwHE9Cj8fjp0X1Rz5ruzqrR72llidK5M6C2BX1lgERM9ggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 13 Dec 2021 04:04:39 GMT',
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
  '2f2a3fa4-e575-45d7-8873-faa582831e00',
  'x-ms-ests-server',
  '2.1.12261.14 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=Ap74a8nI5shJlfocgyXNW_8; expires=Wed, 12-Jan-2022 04:04:41 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevronnWu_smwYbiAZDlHZB8cudjvbkAepnO549x9Mp3LbEYs_cYhcxDmFA_dPBTeNUH2KQVEOEBDvmm9IjDtN-DZsrBp8kGcXIm4BFkJFIxcg0-URhDxI6cBMJqO72EVSm6oIZtnVawcRA8Lp6KXZN0b9VmijX9MvZpavn-Ki5Hf0EgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 13 Dec 2021 04:04:40 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=69152960-c84a-4280-baa6-9ab7c6b67940&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '59116ad3-9ebb-4758-b576-daba718d2100',
  'x-ms-ests-server',
  '2.1.12261.14 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AlHVDZ3_VBlJsCs7UuaopdkWPr5BAQAAAFi9SNkOAAAA; expires=Wed, 12-Jan-2022 04:04:41 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 13 Dec 2021 04:04:40 GMT',
  'Content-Length',
  '1374'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bd5ffc5131fbe8d147779bf5a499d6c5aa2daa6573f7e1def9c3fbb383f3ed7bd34f1f6cefefeeed6f3fdc9d3ed83e989eef3c98ce26e77bfbbb77ebbca9d6f534ffbcaed6abe6eee2faa79b366fdabbabbaba2c6679dddcfda298d655539db7e3e355f145b6cc2ef245be6cef36797d594c737a457fbbbebedefb68f4d1325b104e1f753f6eaf57f8f8066868985d341f3dfac5bf64f451594d330c855e3bcd9a36fdea357d9dd3f7f4c1313f4fbeb3beae3ea34f09dd555eb7458e573f5aad2765d1ccf3fa74911525b53eafaadf735a2d5bea793cad1678c1347921e8520bfa7459b5c57921bdbece97347e03215b158b8b45bbbdacea7c555eff9ef8787c552c67d55593fd605de7062ee8d6d0ebc5f2e2759bb580fd7a3d9de6f92c9fd1f76d565fe4edcb482bfa725ae7f4fbecb8fdaa9dd2277b3b7bbbdbbb7bdbbbf7deecdc7bb477ffd1dedef8e0dedefec37bf77e8a5a5f50dbabecfaab1af8cddb76d53cba1bcec69831db26dcc7cbbc75afbcca2fa8efacdcf0ea764e145f37db3bbbe35a5bf7a0adaabadd08642c2d7a2fcef2cbbcc484bde4ef3741b04d7b4016967988933681700d7b309ae962d39bf475ef9579d5b460f1936a795e5cac6be615e23a124265719adc77d7da52b92b04db05992fa71571c7091898b98f5e59aecb72f4d1dbfcfa27b375d99e9178cb2753d7e865d63457556dbf5ae617c4bef4c54959d0600370e759d9e4c1dbe6ad597e8e1e5e37e513e266e2c78f1eb5f59ada92f42fdba2bd1668510c5eb3eaa0f13d591784e492c6e27f4b8cbd26cae0b55ff27d621788dcf4ece5f16c465aa781a87e8f789c587abc7b6f77bc77efe023b4aa8b4b7a39680608a38fb2d9ac00b1b3f2b92a06fbd56551b7ebac7c91b74490b7c1d49826d375d3560b9a1be225a3279c32fa2e8d9d24f91833136aa6f1e7840dc9ccf8753e5dd7448f31c168ab695536e33765b3bb43c37f06ead2e0bf0978bbdf203c9ad47b1f8edf49b1223d49d8916529f3a779b3fbe9c107037d924ddf9282f590c5e03f1cd938dc0f276a1fee0711d703438a81b4dbb74901ed596864fc42967e23aae545b544579e90111f0b7fcf8a269b94b97660259eb4cc4fd2e491209054346d9d15cb16acbf289684997e2530a85315d195ca9e137af94291392673d650c71f9d2ed125cc9a4aede972b6aaa807ea6b994f217ed44c2194597b5ed50bdbe5474d7bb98791366fd7c0084a953e25adb19c65a4d56898d92a9b12f13f7ab44bcd8c3e32007f40b4b0d09b6b725b164fb3360328b5a34fa8ed47e7d9fe836cf7decef679767fbabd3f9bec6c3f9c4eef6f4fa69fdedfb93f3dd87fb0ff007d995794d2c7ab150d583488fdf69848471aab6f9577761feeedeeb0552eb3a6fda29ad1f4001ab5bf2502e17b512cfc2637a3f24b7ec9f7","7fc9ff03c222eb89230a0000"], [
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
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'f09f41a5-c047-4d77-9f34-3b08aa7e69df',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6187',
  'x-ms-correlation-request-id',
  'be039ba5-7682-442a-b7ca-f7a9bd0a2e2a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040442Z:be039ba5-7682-442a-b7ca-f7a9bd0a2e2a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:04:41 GMT'
]);
