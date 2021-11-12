let nock = require('nock');

module.exports.hash = "4b064248061c9457dc568643df832bb0";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/72698866-8641-4147-9144-24744011447/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
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
  '399a104f-4e45-4104-8f75-fa808da64b01',
  'x-ms-ests-server',
  '2.1.12197.4 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=Avfqs-fKustBouG7YCtTs8E; expires=Sun, 12-Dec-2021 00:57:26 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrkb2jwnL-AqjY6dLDvxUlzk3Ekf5n_Z8Dv5hs8CD4760k73zlL4ZDSemsVok9qJPieJUBt55L59JDTMgMIJHsZtv-KDnuEdsGRauL1mxBTVHpl8TU6xsTm7lOf8QQWsgmNFXzM-M8U9Iy8aB4FbRAZn5YmmJnrrPaCGcvDsbIKCYgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 12 Nov 2021 00:57:25 GMT',
  'Connection',
  'close',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/72698866-8641-4147-9144-24744011447/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/72698866-8641-4147-9144-24744011447/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/72698866-8641-4147-9144-24744011447/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/72698866-8641-4147-9144-24744011447/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/72698866-8641-4147-9144-24744011447/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/72698866-8641-4147-9144-24744011447/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/72698866-8641-4147-9144-24744011447/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/72698866-8641-4147-9144-24744011447/kerberos","tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  '9e7703ea-ff64-4ac3-8109-58419d5b5d00',
  'x-ms-ests-server',
  '2.1.12231.7 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Al8yhCFHhxlIoIhIQ4605M8; expires=Sun, 12-Dec-2021 00:57:26 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrYEPmcFHaM2MVL8arNqabGBzeGIdMw5K-NIzt2O_juq1rchucYkxDzNW6Cnzc7VO9rEX-B9rYtiJK2VWH6iKyiFdvJ7wv44wrji_bvhCTRjwqFXpzKIJfxWMpS_PUrvkBNbH7PqhYl70UUVJiIEaXrwg1GtrKLYW9r6mNtNDc6vUgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 12 Nov 2021 00:57:25 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/72698866-8641-4147-9144-24744011447/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=619660ca-819c-4900-a9fe-c5810d08da6b&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'f300b8b7-7121-4a07-a443-87f68a865200',
  'x-ms-ests-server',
  '2.1.12231.7 - NCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Ajao2P4OMxFEuE5zmOzRcUHGLH8mAQAAAPayH9kOAAAA; expires=Sun, 12-Dec-2021 00:57:26 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 12 Nov 2021 00:57:26 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/data/query', {"startTime":"2021-08-05T00:00:00.000Z","endTime":"2021-09-05T00:00:00.000Z","series":[{"category":"Home & Garden","region":"Cairo"},{"category":"Shoes Handbags & Sunglasses","region":"Manila"}]})
  .reply(200, {"value":[{"id":{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"category":"Home & Garden","region":"Cairo"}},"timestampList":["2021-08-05T00:00:00Z","2021-08-06T00:00:00Z","2021-08-07T00:00:00Z","2021-08-08T00:00:00Z","2021-08-09T00:00:00Z","2021-08-10T00:00:00Z","2021-08-11T00:00:00Z","2021-08-12T00:00:00Z","2021-08-13T00:00:00Z","2021-08-14T00:00:00Z","2021-08-15T00:00:00Z","2021-08-16T00:00:00Z","2021-08-17T00:00:00Z","2021-08-18T00:00:00Z","2021-08-19T00:00:00Z","2021-08-20T00:00:00Z","2021-08-21T00:00:00Z","2021-08-22T00:00:00Z","2021-08-23T00:00:00Z","2021-08-24T00:00:00Z","2021-08-25T00:00:00Z","2021-08-26T00:00:00Z","2021-08-27T00:00:00Z","2021-08-28T00:00:00Z","2021-08-29T00:00:00Z","2021-08-30T00:00:00Z","2021-08-31T00:00:00Z","2021-09-01T00:00:00Z","2021-09-02T00:00:00Z","2021-09-03T00:00:00Z","2021-09-04T00:00:00Z"],"valueList":[4741.4,4060.2,2324,2783.8,4648,4862.6,4685.2,4578.6,3682,2327.8,2983,4783.2,4997.6,5108,4773.2,3915.6,2638.4,3182,5056,5200.2,5022.4,5359.6,4518.2,2684.8,3235.6,4845.2,4821,5200,5068,4024.4,2574.6]},{"id":{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"category":"Shoes Handbags & Sunglasses","region":"Manila"}},"timestampList":[],"valueList":[]}]}, [
  'Content-Length',
  '1256',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'd9ee1841-bc5a-4488-bc56-755b854c39fb',
  'x-envoy-upstream-service-time',
  '323',
  'apim-request-id',
  'd9ee1841-bc5a-4488-bc56-755b854c39fb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 12 Nov 2021 00:57:26 GMT',
  'Connection',
  'close'
]);
