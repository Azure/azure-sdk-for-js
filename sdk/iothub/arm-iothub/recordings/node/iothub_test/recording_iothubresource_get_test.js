let nock = require('nock');

module.exports.hash = "37a08100ed6592cd54bb718b89d4b663";

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
  'dcafaee2-9c12-45a9-a0d1-ebaa6cbe0000',
  'x-ms-ests-server',
  '2.1.12249.16 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AlvqnpETRf5CjznMnHuHzgE; expires=Sun, 02-Jan-2022 03:27:42 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrxykfXgO4rC5fEqvOjk9gVg2WbMQcbhJ3jNg_Odnd9gy8K7_qP1vlGPGtSokPKqCVg6fPYImcFb2BbWriDmrP14_nKvUY5ZrUrlgBk6gOW2LF8eeSNQp_gxGQS1d_-uq2_aeRiKdhXXBCEoaBkFWft4SsQ-ZKZTFqo0bjnepxpawgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 03 Dec 2021 03:27:41 GMT',
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
  'bbfb67ff-5b09-4779-bb31-06127faa0000',
  'x-ms-ests-server',
  '2.1.12249.16 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AoI9flSqP6JFlj4-RHPD_2I; expires=Sun, 02-Jan-2022 03:27:42 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrhQyXe9Tgu9-BsFvI_ClElYxXylgrtdTThUOyxHk-FymRpcpctpd5Udto9aRqvnaJKuQr8zrDb-F_z8LhAbrQxROIiJMjscYL7ffZVDK51KVc7ZN6N-TE4_s_ejfztQV8ABoM8eugnUKN12SCAVwoD3laC4wooLu_VPAvoC-QUgkgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 03 Dec 2021 03:27:41 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=060565dd-f28a-4057-8521-fc220b92cbf4&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'fcfcd085-9713-4d36-a14a-41d9f2b60000',
  'x-ms-ests-server',
  '2.1.12249.16 - SEASLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AiOUgHbTS25Fu1f2E_9YxFoWPr5BAQAAAK2FO9kOAAAA; expires=Sun, 02-Jan-2022 03:27:42 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 03 Dec 2021 03:27:42 GMT',
  'Content-Length',
  '1374'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Devices/IotHubs/myiothubxxxxyyyjjrr')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8e9fe697c5346fee9e55edb7a9276a5c54ed7c3d7947cff5f5f54fff745d7f34fa68992d724226fe657bbdc2978330a949594d330c809ae559d3aef1599b5d341f3dfac51fbdcdafe9e3cbac5ce7bb1ffd92d147fe809904b71933c133a3bec0a8e935336cfa2aa7bee893637a9e3edbfffc177de7e033fa94c8b1caebb6c8190d8322fdf13df717bd754a08a75fbda617eaaac4405775b1c8ea6bc23568f75dea2b68d7e4d36a39e396dfa761b5598b4f8fa76d7199532beafeb268e8dd6279f15abf7cbd9e4ef37c96cfe8fb62f5ac28dbbc7eb52e81212175ce7fbfc8782e6afa18c3ce081ef77f4cafae30da62f545d6bca54f76efed8e77771f8c77ef3f1cdfbfc7582cf3f6aaaadf02e6ebbc25b0bff8a3597e9eadcb1678319ca7f9f29aa064ab5579fda67ab2a64ecf96a797f9129379ba9cadaa62d97ef4a8add739fa02288273337a65595dd107c3d8d1dccfaba65500115e1b673f58d7f9f64cd86b4c632178790733c2e517cb87fc5b9db7f42ba1f0a658e467cba7d9357dbc4bd4cf68e6f1f949b5c670f6bc8fce66d4e67b1fed10f4dd8f8868abac9dc731a216b9f64b0d9ac9a3bb77a5cdf6b2d976edb7773fddfb747fe7c1fdeddd3cdbbfff303b38988d9bbcc63826eb667c552c67d5158fe8ee47bf84e8402cdc125b6000063ea1f48b3fd2779eac9b9f58e76ba63be1e73e7d53ad8aa97eca3420c2e89f4d5bd5d9457e522ddbac589212c0c7da9501749e95e5249bbe7d85cfd09fcafdef66bea0f18a90d18722e55fe44d436021d0e076a61f7d09eea08f0cf29853f4214835206ad19c2eb34949acfe88a0373986ad380653f9bb297fe2f7266bdeb4e57173d654079feeec523f2fdfec7e9bfaa1ae973973daebb666c27d249fca58d13d3e421f8408214c6d825e8877f317555b9c1722cffc2109f7dba7eb9a3fe874fa05816fa3a82cb2774ff39244bcbe56d6dadd41bf398f96443aff6a5556d9acd31bd380502eabf5ec4d25b4050e31702323b371629c9306e1c9a2d7bfd1219ce7594b0248d87ef4a25a627e17c5f24dd9fc247113c1a78f77c77bf429314b7595cf9efda2d9f279410a98788bde6edeae8191b2d46b2887b6c86bfcde66d093507ad36c954d8b962cc22ebd42c68a64177ffd626365b8e35ff2","4bfe1f9628517f1e070000"], [
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
  '11934',
  'x-ms-request-id',
  '3a77e4d9-4793-4943-939c-2962432aad02',
  'x-ms-correlation-request-id',
  '3a77e4d9-4793-4943-939c-2962432aad02',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211203T032742Z:3a77e4d9-4793-4943-939c-2962432aad02',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 03 Dec 2021 03:27:42 GMT'
]);
