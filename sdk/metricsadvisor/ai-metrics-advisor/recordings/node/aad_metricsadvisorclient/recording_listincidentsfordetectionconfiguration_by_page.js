let nock = require('nock');

module.exports.hash = "072ffcc80609cb05570495546aeff4b5";

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
  'aed16057-a7cc-4b5f-a630-67ff14900100',
  'x-ms-ests-server',
  '2.1.12231.7 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AuwqdkyPQ1JKnHRFjOsONl8; expires=Sun, 12-Dec-2021 00:56:53 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrACwqlp7VlB2qYgL_zDHTVyWSWhhwMcxxEVxKFfG6poRVLVkAiFnPgBSNbDkeWHaEGwVtuxF1cTD2hzvot_z-T7-FZ7FV7DZou8u-Uor68W8F1M1QXbX86e7jshJiPaBp4FPD7WjqqzNzpkNViqmabsiZwvDN-Pmjf3w9Hepcng8gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 12 Nov 2021 00:56:52 GMT',
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
  '5eaff8c9-9f73-41a9-9237-a13e16a16a00',
  'x-ms-ests-server',
  '2.1.12231.7 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=As8LUHeWjNtLq6Mmm4QZMu8; expires=Sun, 12-Dec-2021 00:56:53 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevriRm_2Dj5hnw5HEehFIvS-LdYXci0DnGo0ItjDh6-h3IT_yi6Q0KylRYWAQrtIoQ4lp1oqY_-R3HOqrcMNel--TSbJe98QjwIOEvGhk4nHRURURa6Wbdi3dAsc9V3D0DMgSVBAt9LV6d7vWm3YtBhGLyfNnFL3F9kuzlx0jkz_qggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 12 Nov 2021 00:56:53 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/72698866-8641-4147-9144-24744011447/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=07d9d29c-582f-4c5e-8d9c-69ae8e2dc061&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'bf26bac2-1d7e-40de-aab8-e551d64d5500',
  'x-ms-ests-server',
  '2.1.12231.7 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Ah4NEJmWVTRHrvlW5TD83YTGLH8mAQAAANWyH9kOAAAA; expires=Sun, 12-Dec-2021 00:56:54 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 12 Nov 2021 00:56:53 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/incidents/query', {"startTime":"2021-05-05T00:00:00.000Z","endTime":"2021-11-01T00:00:00.000Z","filter":{}})
  .query(true)
  .reply(200, {"value":[{"incidentId":"9eacfa65b7c794522d388fcf5bf0a463-17cd3a55400","startTime":"2021-10-29T00:00:00Z","lastTime":"2021-10-31T00:00:00Z","rootNode":{"dimension":{"region":"__SUM__","category":"Electronics (Consumer)"}},"property":{"maxSeverity":"Medium","incidentStatus":"Active","valueOfRootNode":4329.599999999999,"expectedValueOfRootNode":887.4922268404557}},{"incidentId":"67fc98695447cda7a0cb9369c0ad9dc7-17cd3a55400","startTime":"2021-10-30T00:00:00Z","lastTime":"2021-10-31T00:00:00Z","rootNode":{"dimension":{"region":"Tianjin","category":"Shoes Handbags & Sunglasses"}},"property":{"maxSeverity":"Medium","incidentStatus":"Active","valueOfRootNode":756713.8,"expectedValueOfRootNode":953426.1197261562}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/incidents/query?$maxpagesize=2&$token=eyJtZXRyaWNJZCI6IjM5MGQxMTM5LTk4ZmItNDVhZi1iODMxLThkNWFkNjFiMTUwYSIsImRldGVjdENvbmZpZ0lkIjoiZWZhZWUzMDUtZjA0OS00M2VjLTlmOWItNzYwMjZkNTVjMTRhIiwic3RhcnRUaW1lIjoiMjAyMS0wNS0wNVQwMDowMDowMFoiLCJlbmRUaW1lIjoiMjAyMS0xMS0wMVQwMDowMDowMFoiLCJuZXh0IjoiTWpBeU1TMHhNUzB3TVZRd01Eb3dNRG93TUZvakl5TTVaV0ZqWm1FMk5XSTNZemM1TkRVeU1tUXpPRGhtWTJZMVltWXdZVFEyTXc9PSIsImxpbWl0IjoyLCJmaWx0ZXIiOnt9fQ=="}, [
  'Content-Length',
  '1309',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'e51c74ae-d0bb-4aea-a9da-d9ad7f9ebc93',
  'x-envoy-upstream-service-time',
  '217',
  'apim-request-id',
  'e51c74ae-d0bb-4aea-a9da-d9ad7f9ebc93',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 12 Nov 2021 00:56:54 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/incidents/query')
  .query(true)
  .reply(200, {"value":[{"incidentId":"aa9caa4df53ef3f10504cea6ed8f801b-17cd3a55400","startTime":"2021-10-30T00:00:00Z","lastTime":"2021-10-31T00:00:00Z","rootNode":{"dimension":{"region":"__SUM__","category":"Office Products"}},"property":{"maxSeverity":"Medium","incidentStatus":"Active","valueOfRootNode":1818552.5999999999,"expectedValueOfRootNode":2559990.8909058906}},{"incidentId":"00ab1db37f0ed4589c6f4350bc8ef1c0-17cc9589c00","startTime":"2021-10-29T00:00:00Z","lastTime":"2021-10-29T00:00:00Z","rootNode":{"dimension":{"region":"Cairo","category":"Shoes Handbags & Sunglasses"}},"property":{"maxSeverity":"Medium","incidentStatus":"Active","valueOfRootNode":3582575.2,"expectedValueOfRootNode":1781526.1389258874}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/incidents/query?$maxpagesize=2&$token=eyJtZXRyaWNJZCI6IjM5MGQxMTM5LTk4ZmItNDVhZi1iODMxLThkNWFkNjFiMTUwYSIsImRldGVjdENvbmZpZ0lkIjoiZWZhZWUzMDUtZjA0OS00M2VjLTlmOWItNzYwMjZkNTVjMTRhIiwic3RhcnRUaW1lIjoiMjAyMS0wNS0wNVQwMDowMDowMFoiLCJlbmRUaW1lIjoiMjAyMS0xMS0wMVQwMDowMDowMFoiLCJuZXh0IjoiTWpBeU1TMHhNQzB6TUZRd01Eb3dNRG93TUZvakl5TXdNR0ZpTVdSaU16ZG1NR1ZrTkRVNE9XTTJaalF6TlRCaVl6aGxaakZqTUE9PSIsImxpbWl0IjoyLCJmaWx0ZXIiOnt9fQ=="}, [
  'Content-Length',
  '1304',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '006d8a83-701d-435e-baaf-d7b4cea0a638',
  'x-envoy-upstream-service-time',
  '285',
  'apim-request-id',
  '006d8a83-701d-435e-baaf-d7b4cea0a638',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 12 Nov 2021 00:56:54 GMT',
  'Connection',
  'close'
]);
