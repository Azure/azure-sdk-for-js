let nock = require('nock');

module.exports.hash = "bcaa1e46fa744ef0157b55f899ebaba8";

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
  'e64f853d-c3ea-4b39-a1b7-d973d1761f00',
  'x-ms-ests-server',
  '2.1.12261.14 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Av59zU9xOlNFmK7QAzoK6Go; expires=Wed, 12-Jan-2022 02:53:37 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrX8jz1jsH_on7NUconofn-nMJpCpJpjYbgDMmjvcUA62AW4FhFFLbQq4i9Ou-KG2cK-zml4LhmuQW35zsNMAe9R27i4Dr1Pe8EHRIenXUAW3iM60W1lvwV-2LE6_gEiHeZ7xTHhN2fMgfg5mTWHQMEzUjc41LZtsc0kOVx-_71FIgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 13 Dec 2021 02:53:37 GMT',
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
  'e80ac778-5740-4244-80b0-912cb0311f00',
  'x-ms-ests-server',
  '2.1.12261.14 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AokUgEVWPiJFr_nUkq9S09k; expires=Wed, 12-Jan-2022 02:53:37 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr3N7Nw4nsr6vjPZS39MEoRGxrMRlsS2sSXtooDZQdLgJM9Qbt9p-glRBjLL1ubgI0Y9o2rI06Pc4nYYN2Gtl22Zfzs_fk3dErzO-0kJwAulu4v1DeKVKQ4nHwplUWK7Su06DRbWwyvRmPhHGVVANtJv47dcEfbB_uYHj91yt_8XMgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 13 Dec 2021 02:53:37 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=1dfbb416-8671-4915-8112-4b530583e5fa&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'c2ed4d2b-7cf9-4dd9-8b78-50e20e901d00',
  'x-ms-ests-server',
  '2.1.12261.14 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AnZb8X83jAFEpae78wbdKYEWPr5BAQAAALGsSNkOAAAA; expires=Wed, 12-Jan-2022 02:53:37 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 13 Dec 2021 02:53:37 GMT',
  'Content-Length',
  '1374'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Media/mediaservices/mymediaxxx')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef16f9ca4e947cb6c917ff4e8a3c5f5229f15d9bb77ef3e1a7d54cce893bbcd7ad24ceb62d516d5b2b9fb70effce1fdd9c1f9f6bde9a70fb6f777f7f6b71fee4e1f6c1f4ccf771e4c6793f3bdfdddbb75de54eb7a9a7f5e57eb55737771fdd34d9b37eddd555d5d16b3bc6eee7e514cebaaa9cedbf117e8ef2ef7dae4f56531cdf102ff2d58b4d72b60b6f10d6a5656d30c2852d3d3ac69d3af5ed387d4e12aafdb825a3ce271d248f9c5d7f2e21946b8f729e17cfffec3ede90e8d6bffd3fde9f6c37bf7e89f3c7fb877ffe1fd9dd9c37d82d5b4559d5de4c7d369b55eb604f07b02304d15329e1f0ecd5e0b2a773b28d14bfa49269f04047c59178bacbefec820fb4be497efbb91addb79be6c0b4bc7d7042e5f10847c39adaf7930968c3454852bad7eafdc40fe25a38fdee6d74ff3b2b8cca93bef05c22a6f9a936ad9d655e97d415fcdf2f36c5db6c753e9e4a3e3b2acaea8e762c5bf3d2f9ad623381ef7fbf7cdaf3a224260b59e94c5f445de5e55f55b220f754b404f97d9a4cc678c27356a18f1a7599b595c3e9ad679d6e6b32784f747e7d9fe836cf7decef679767fbabd3f9bec6c3f9c4eef6f4fa69fdedfb93f3dd87fb0ff8050b4afbc117a1caf56d4b7d0d07e7b4ce87fb4b7b3b7bbbdbbb7bd7befcdcedea3fbf71eddbb37fe9438effe83fb3f454d4b62db2faa59715e001ab5bf2502e17b512cfc2637a3025a102d7f","c9ff0398a698e41a040000"], [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; odata.metadata=minimal',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'Vary',
  'Accept-Encoding',
  'x-ms-request-id',
  'd6995f82-ec06-450a-80c5-6e23514dffb8',
  'x-ms-client-request-id',
  '1ec62d37-e05d-486f-b16d-8bfd17869446',
  'OData-Version',
  '4.0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11999',
  'x-ms-correlation-request-id',
  '50928e0a-7dcf-44e7-a807-7ca5ccee85ba',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T025338Z:50928e0a-7dcf-44e7-a807-7ca5ccee85ba',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 02:53:37 GMT'
]);
