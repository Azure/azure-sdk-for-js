let nock = require('nock');

module.exports.hash = "5dec168509fae01d2804d56dfe9ed9ab";

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
  '09582076-0227-4a71-a36b-6f1ed2ee1900',
  'x-ms-ests-server',
  '2.1.12171.15 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=Aun1egKD4MxFr-kllxxASP0; expires=Wed, 01-Dec-2021 08:00:46 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrp4l3Z3-se7NuLSV4k3U2DdLkE2A0y0NPU7VCMADopsY9_HwfWJB8PSOBvbVfsDQoQNzg7s5Or2WxKVk3grE7X3qJfgVZIokmr3nAOEAQEvdw5KVp15s9Oy6OfRb61dzc2Ar7DaoAbF7FRFvu1k_j4PSSJwyec0Ephx34AtJgHrcgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 01 Nov 2021 08:00:46 GMT',
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
  '09582076-0227-4a71-a36b-6f1ee2ee1900',
  'x-ms-ests-server',
  '2.1.12171.15 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AhQYJSwmdFdNqEqoMW-qSvw; expires=Wed, 01-Dec-2021 08:00:49 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevreGFlr3WiiNCJGqSIplWQtidBhj0nOFJRU1WLmaYiCBJCgIEj15XHuTejo5XU797nY8Cp0yyQDnnzjnotNGbuXYz6-OVz55M8YJrOfg_jonOATUhEg1pdTf6cXZ8z2ac_ehvyvOzNhASA_rCktOwA13s46Qq4bNcE_w_2gdtQLHkgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 01 Nov 2021 08:00:49 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=7714625b-6297-4433-98c8-beddc5d4ec7f&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  'd9cb6e0a-e9ac-46aa-b1df-0635ff491a00',
  'x-ms-ests-server',
  '2.1.12171.15 - KRSLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Amm3LDE-X7FKgoDJ2hEQerIWPr5BAQAAALKVEdkOAAAA; expires=Wed, 01-Dec-2021 08:00:50 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 01 Nov 2021 08:00:50 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.NotificationHubs/namespaces/mynamespacexxx')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147cddbf5478f7ef147cb6c917ff4e8a367759e7ff44b461fadea6a95d76d9137f892feba2c9aa25a16cb8bd76dd6a2e5ebf5749ae7b37cf6d1e8a3863e5b53cb8f8ea76d7199d327d33aa766b3e3963edcdbd9dbdddeddddded97db373f06867e7d1fec1787f6f07cf4f51d3f56a7643d307d4929b36797d594cf327ebe674395b55c512efccdb76d53cba7b77718d3134ab6c9abf7bf76eac6d27eb667c552c67d555335ee6eda3fdfd7b770952becc2625e1fea8add739d02dda629a951f3d3acfca863ef841b5cc5fe5b3f57296a113fe94c852d01b1fdd6dd69386de58b54491e6eec3bdf387f76707e7dbf7a69f3ed8dedfdddbdf7eb83b7db07d303ddf79309d4dcef7f677efd67953adeb69fe795dad570de1fad34d9b37ed5da6ec2caf9bbb5f14d3ba6aaaf376fca26a8b73c206e0bf4d5dddb5e3c28bf60f1a240d047f124ebdcfdbeb153ebf15546a5e56f20dbd729a356dfad56bfab0cd2e68527ff12ff925","ff0f76f8048426020000"], [
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
  'x-ms-ratelimit-remaining-subscription-reads',
  '11993',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'TrackingId',
  '2d13359c-d4a0-4cb1-a0b2-83d96684871d',
  'x-ms-correlation-request-id',
  '42fc159d-32c0-487c-8720-cbb886a15845',
  'api-supported-versions',
  '2014-09-01, 2016-03-01, 2017-04-01, 2020-01-01-preview',
  'Server',
  'Kestrel',
  'x-ms-request-id',
  '42fc159d-32c0-487c-8720-cbb886a15845',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211101T080051Z:42fc159d-32c0-487c-8720-cbb886a15845',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 01 Nov 2021 08:00:50 GMT'
]);
