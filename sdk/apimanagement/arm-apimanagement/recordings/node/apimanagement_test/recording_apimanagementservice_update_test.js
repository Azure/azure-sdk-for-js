let nock = require('nock');

module.exports.hash = "1e39384ddc97ce1263cbd2a2f71b03e4";

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
  '38719b22-bb0c-4fad-9308-c2ad03230900',
  'x-ms-ests-server',
  '2.1.12071.13 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AvEx6aDbG0hClB4DxJPqkaw; expires=Sun, 24-Oct-2021 09:04:20 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr68ZGa5oJmsvp8o4DDlGv9pAdL4oy1hvi20I8wUlz3Psu3tM3XSnszWFuRGxFSu24TiunCZEKNAIWZ_E9mONU80iCFWbTG4PpRuhcMv3yMag9tXzz0mQUQyGkvjp7cMMsRkClcajRepDT3lbQJIe6AiJH9i_5vw7e8Ratp8mwLkYgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 24 Sep 2021 09:04:20 GMT',
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
  '9ba6f45d-c4e8-4eef-b292-a7c2d3ef0900',
  'x-ms-ests-server',
  '2.1.12071.13 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AkxSuW9cBctDqRcKDCMVxXw; expires=Sun, 24-Oct-2021 09:04:20 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrQXOHsAdmvS45-1QirE-0KYn6Bzizv-DBOj1eQjS8KTlE3iXvCIGDiCrzeBEXpdhhebfLUmC8uPP38Ix5teySwvH1seX-D7PITvrQwmx-kpC42FxNbqcGDb_I-YXdXGwEiAY2L7DbUWuK9m25rE6Gf1TMig3PRK4qI7r98EhWIIUgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 24 Sep 2021 09:04:20 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.1&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=d6c9f879-a117-4d9a-bc55-438d07a34e3b&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '6332f45a-4a68-47f2-bf85-b9e3090e0a00',
  'x-ms-ests-server',
  '2.1.12071.13 - KRSLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Ah7AfULD-QVDvfOwtlmme5UWPr5BAQAAAJSL39gOAAAA; expires=Sun, 24-Oct-2021 09:04:20 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 24 Sep 2021 09:04:20 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8e8f57c517d932bbc817f9b2bddbe4f56531cde915fdedfafa7aefa3d147cb6c911332dd8fdbeb153ebe011a1a6617cd478f7ef12f197d5456d30c43a1d74eb3a64dbf7a4d5fe7f43d7d70cccf93272fee7ef5197d4ae8aef2ba2d72bcfad16a3d298b669ed7a78bac28a9f57955fd9ed36ad952cfe369b5c00ba6c90b41975ad0a7cbaa2dce0be9f575bea4f11b08d9aa585c2cdaed6555e7abf2faf7c4c7e3ab6239abae9aec07eb3a377041b7865e2f9617afdbac05ecd7ebe934cf67f98cbe6fb3fa226f5f465ad197d33aa7df67c7ed57ed943ed9dbd9dbddde79b8bdb7ff66e7e0d1decea37b9f8e0ff6f6eeef3dbcff53d4fa82da5e65d75fd5c06fdeb6abe6d1dd7036c68cd936e13e5ee6ad7be5557e417d67e58657b773a2f8bad9ded91dd7daba076d55d5ed46206369d17b71965fe62526ec257fbf09826dda03b2b0cc439cb409846bd883d14c179bdea4af7bafccaba6058b9f54cbf3e2625d33af10d77def171b16a7c97d77ad2d95bb42b05d90f9725a11779c808199fbe895e5ba2c471fbdcdaf7f325b97ed1989b77c32758d5e664d7355d5f6ab657e41ec4b5f9c94050d3600779e954d1ebc6dde9ae5e7e8e175533e216e267efce8515bafa92d49ffb22dda6b8116c5e035ab0e1adf937541482e692cfeb7c4d86ba20c5efb25df277681c84dcf5e1ecf66a4751a88eaf73ebabf37de3d38183f7838de7df0e023b4aa8b4b7a39680608a38fb2d9ac00b1b3f2b92a06fbd56551b7ebac7c91b74490b7c1d49826d375d3560b9a1be225a3279c32fa2e8d9d24f91833136aa6f1e7840dc9ccf8753e5dd7448f31c168ab695536e33765b3bb43c37f06ead2e0bf0978bbdf203c9ad47b1f8edf49b1223d49d8916529f3a779b3fbe9c107037d924ddf9282f590c5e03f1cd938dc0f276a1fee0711d703438a81b4dbb74901ed596864fc42967e23aae545b544579e90111f0b7fcf8a269b94b97660259eb4cc4fd2e491209054346d9d15cb16acbf289684997e2530a85315d195ca9e137af94291392673d650c71f9d2ed125cc9a4aede972b6aaa807ea6b994f217ed44c2194597b5ed50bdbe5474d7bb98791366fd7c0084a953e25adb19c65a4d56898d92a9b12f13f7ab44bcd8c3e32007f40b4b0d09b6b725b164fb3360328b5a34fa8ed47e7d9fe836cf7decef679767fbabd3f9bec6c3f9c4eef6f4fa69fdedfb93f3dd87fb0ff007d995794d2c7ab150d583488fdf6984817b1caf7c707bbf7f61eeeedc22a9759d37e51cd687a008ddadf1281f0bd28167e939b51f925bf","e4ff01d43eaf38170a0000"], [
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
  'ETag',
  '"AAAAAABBN/U="',
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'f1334f66-8210-44d1-a985-e8821c76b2f3',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5594',
  'x-ms-correlation-request-id',
  '97b07125-f4e5-4660-94fe-a6895362abd6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090421Z:97b07125-f4e5-4660-94fe-a6895362abd6',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:20 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .patch('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2', {"properties":{"customProperties":{"Microsoft.WindowsAzure.ApiManagement.Gateway.Security.Protocols.Tls10":"false"}}})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8e8f57c517d932bbc817f9b2bddbe4f56531cde915fdedfafa7aefa3d147cb6c911332dd8fdbeb153ebe011a1a6617cd478f7ef12f197d5456d30c43a1d74eb3a64dbf7a4d5fe7f43d7d70cccf93272fee7ef5197d4ae8aef2ba2d72bcfad16a3d298b669ed7a78bac28a9f57955fd9ed36ad952cfe369b5c00ba6c90b41975ad0a7cbaa2dce0be9f575bea4f11b08d9aa585c2cdaed6555e7abf2faf7c4c7e3ab6239abae9aec07eb3a377041b7865e2f9617afdbac05ecd7ebe934cf67f98cbe6fb3fa226f5f465ad197d33aa7df67c7ed57ed943ed9dbd9dbddde79b8bdb7ff66e7e0d1decea37b9f8e0ff6f6eeef3dbcff53d4fa82da5e65d75fd5c06fdeb6abe6d1dd7036c68cd936e13e5ee6ad7be5557e417d67e58657b773a2f8bad9ded91dd7daba076d55d5ed46206369d17b71965fe62526ec257fbf09826dda03b2b0cc439cb409846bd883d14c179bdea4af7bafccaba6058b9f54cbf3e2625d33af10d77def171b16a7c97d77ad2d95bb42b05d90f9725a11779c808199fbe895e5ba2c471fbdcdaf7f325b97ed1989b77c32758d5e664d7355d5f6ab657e41ec4b5f9c94050d3600779e954d1ebc6dde9ae5e7e8e175533e216e267efce8515bafa92d49ffb22dda6b8116c5e035ab0e1adf937541482e692cfeb7c4d86ba20c5efb25df277681c84dcf5e1ecf66a4751a88eaf73ebabf37de3d38183f7838de7df0e023b4aa8b4b7a39680608a38fb2d9ac00b1b3f2b92a06fbd56551b7ebac7c91b74490b7c1d49826d375d3560b9a1be225a3279c32fa2e8d9d24f91833136aa6f1e7840dc9ccf8753e5dd7448f31c168ab695536e33765b3bb43c37f06ead2e0bf0978bbdf203c9ad47b1f8edf49b1223d49d8916529f3a779b3fbe9c107037d924ddf9282f590c5e03f1cd938dc0f276a1fee0711d703438a81b4dbb74901ed596864fc42967e23aae545b544579e90111f0b7fcf8a269b94b97660259eb4cc4fd2e491209054346d9d15cb16acbf289684997e2530a85315d195ca9e137af94291392673d650c71f9d2ed125cc9a4aede972b6aaa807ea6b994f217ed44c2194597b5ed50bdbe5474d7bb98791366fd7c0084a953e25adb19c65a4d56898d92a9b12f13f7ab44bcd8c3e32007f40b4b0d09b6b725b164fb3360328b5a34fa8ed47e7d9fe836cf7decef679767fbabd3f9bec6c3f9c4eef6f4fa69fdedfb93f3dd87fb0ff007d995794d2c7ab150d583488fdf6984817b1caf7c707bbf7f61eeeedc22a9759d37e51cd687a008ddadf1281f0bd28167e939b51f925bf","e4ff01d43eaf38170a0000"], [
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
  'ETag',
  '"AAAAAABBN/U="',
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '4532ff96-9cfd-439d-8287-0ce582cb9f5e',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-writes',
  '1198',
  'x-ms-correlation-request-id',
  'b5a215b4-1477-48a3-999f-22084bbb870c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090422Z:b5a215b4-1477-48a3-999f-22084bbb870c',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:21 GMT'
]);
