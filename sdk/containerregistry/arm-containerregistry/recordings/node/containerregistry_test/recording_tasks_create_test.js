let nock = require('nock');

module.exports.hash = "c99415df90fe8363d69b304973445b4b";

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
  'd4101ec2-ba9d-4bf0-b788-a4a2ebdb0400',
  'x-ms-ests-server',
  '2.1.12197.4 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AtPA65nVnEJNjSYTMpVqhMk; expires=Fri, 03-Dec-2021 09:46:23 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr5M8dqJBaeydbt_QWQKvyUmcuqTWfcxj93IpI0qyYCKIdXfOI003B8DJRkr7iJjiaJ1jz8XXiW8G5rRjFFij2qp27fPymXMAQMQix56HyLaRssr4KcTxfmlSRrHDT2rLRHpoUkfTW8IhH5fmGxXMNGsDG7qH3PxZB2VG0aTCxt9UgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 03 Nov 2021 09:46:23 GMT',
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
  'c62deb8d-f9b3-498a-868e-f4d0e47e0600',
  'x-ms-ests-server',
  '2.1.12197.4 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AooaPbFmzspBoP7_6qHoTIo; expires=Fri, 03-Dec-2021 09:46:24 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrwfJXr61iPmq6mqP2p0BK5ElN3drkXVODKAciWgzMzR-OR78Xh0BN3QxsUFtrPIVtJo0Szy-ULCTBGZVAzcMtEoJG9nnXvLtZrKdDoMeWrm-LIgJcvlbiDBRYilfqtFFZq-vkxeSB_ecKJ6OwMpIDBGrVkO60K-SsA0on-W1G3ksgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 03 Nov 2021 09:46:23 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=4691f7f9-05c0-45af-b81a-15bdb9708819&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  'edf2b598-6436-4d5a-afcb-728aa0820500',
  'x-ms-ests-server',
  '2.1.12197.4 - SEASLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Ao6_k1Ym1YBHrqZZI7NcxpUWPr5BAQAAAG9RFNkOAAAA; expires=Fri, 03-Dec-2021 09:46:24 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 03 Nov 2021 09:46:23 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .put('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ContainerRegistry/registries/myregistryxxxyy/tasks/mytaskxxx', {"location":"eastus","tags":{"testkey":"value"},"properties":{"status":"Enabled","platform":{"os":"Linux","architecture":"amd64"},"agentConfiguration":{"cpu":2},"step":{"type":"Docker","contextPath":"https://github.com/SteveLasker/node-helloworld","imageNames":["testtask:v1"],"isPushEnabled":true,"noCache":false,"dockerFilePath":"DockerFile"},"trigger":{"baseImageTrigger":{"baseImageTriggerType":"Runtime","updateTriggerPayloadType":"Default","status":"Enabled","name":"myBaseImageTrigger"}}}})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147edf52affe8d1475f14d3ba6aaaf3767c522ddbac58e6f5abfca268dafafa6e2dbf147973b7cd9ab7cd47a38f5675b5caeb963efae8d12fc65f97455354cb6279f1bacd5a007cbd9e4ef37c96cfa8f5b4ceb396be7e2a5fededeced6eefee6eefdc7bb3f3f0d1fea78ff60ec69fee1decee7ffae9273b3b8f7676e89586c0ac09f847a7cb6c5232945599b5e755bd408f15be7a5e2cd7efe88bac9ece8b369fb6eb1ae0b3c5ecd3fd8f7e097d7e912f5b1ace7971b1ae1901bc3a5dad3f7ab4475fb7c522afd6ed478fee7dbab3831ef315be57823cada66ff39aa0170b82f3225b60a8dffba8cd9b16447874b9fbd1f7e9cbe6e5ba991b1c1fb5f53a1f7db4ac4eb2e99c809c6765437fcf18d4b3a2cc5f66eddcc2c607047f4af4cedfb5fad5bc6d57cda3bb772f8a76be9e8ca7d5e2eeeb36bfcc9f539f797d7759cdf2ed795e96d5555597338c9226e6e2823025d42759939f01dd37c39fbd91e1bd5a2f317eea7fbd9ad1b4e8b72fb3ebb2ca66dae8697e9eadcb961a45a6634924a10f16d74f3a3d7cf44b7e09a15510393ebadbac27cdb42e56207e73f7e1def9c3fbb383f3ed7bd34f1f6cefefeeed6f3fdc9d3ed83e989eef3c98ce26e77bfbbb77ebbca9d6f534ffbcaed6abe6eee2faa769669af62e33d92caf9bbbb7e4d5c5b5fe71fdeeddbbeb6be15dfa143fe9137f08eea336bba061121750976ff36bfaf6322bd739085d565365a28ff2ac0139882ed784dc82f83ac34bcce7f9ec095e3bcff61f64bbf776b6cfb3fbd3edfdd96467fbe1747a7f7b32fdf4fecefde9c1fe83fd0704c0bea2243f5eadca42fbb1df1e139346a4e6c1f8d3ddfbf73ffdf4a1959a92f0faa29a15e70540d24bb7c4227c2f8a8adfe496f8fc925f","f2ff006a308dc45f040000"], [
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
  'Accept-Encoding,Accept-Encoding',
  'x-ms-correlation-request-id',
  'ee757b04-d487-49b5-940a-9fb837f66943',
  'x-ms-ratelimit-remaining-subscription-writes',
  '1193',
  'x-ms-request-id',
  'c682ce30-12f4-409a-853e-97723200568a',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Server',
  'nginx/1.15.10',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211103T094630Z:ee757b04-d487-49b5-940a-9fb837f66943',
  'Date',
  'Wed, 03 Nov 2021 09:46:29 GMT'
]);
