let nock = require('nock');

module.exports.hash = "c183f90de1d80e43b44dc392c8135c40";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
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
  '2f6258c4-8dd7-4612-9d39-c870e14b4101',
  'x-ms-ests-server',
  '2.1.11722.21 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=ApkDqNpQ57tNkXRRzlIgAuCU1ubLDgAAAEU0P9gOAAAA; expires=Thu, 24-Jun-2021 18:11:34 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrfFofVUNvRiVrycyBgQSOkqHO9nKbjAeNhJ7u2E7YWKWznwIYOtDeFL3Hcekqhl0t-iXhcW0FXvKtZOMNFFii9h_UGC06Af8aH9pYe3aOGUXa4Cpb9nnU2APHblppK2km_cYYmKUA-gimsQrvKKh6FCvmiz30GqNhmxnfy19LzVogAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 25 May 2021 18:11:33 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
  'Cache-Control',
  'max-age=86400, private',
  'Content-Length',
  '1651',
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
  '1a1715eb-17cf-443c-96ea-3222ef921c00',
  'x-ms-ests-server',
  '2.1.11774.11 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=ApkDqNpQ57tNkXRRzlIgAuCU1ubLDgAAAEU0P9gOAAAA; expires=Thu, 24-Jun-2021 18:11:34 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrnboZkVJqcr-7hh7HE2ACwhEdOms8iZ0gfr_RqTfvElq3mSCaPVXxN0-VEOgMg7ozDTrfwOkrm0WTpOV3pxtYsLQ3GyiJXsX3TtJ9hwIutv0T1Y5Dk0puX75ucVrucAGTrRfEY3soOe5_yjhKzHxeM_mW68BGGkzOgkPvQPmAIL4gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 25 May 2021 18:11:33 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default%20openid%20profile%20offline_access&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.1.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=2|771,0|,&x-client-last-telemetry=2|0|||0,0&client-request-id=e8303d4e-df31-42bd-9f76-b81b350dfd31&client_secret=azure_client_secret")
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
  '18d28e0b-2a6d-4aa6-9df5-46ed8aa81b00',
  'x-ms-ests-server',
  '2.1.11774.11 - NCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=ApkDqNpQ57tNkXRRzlIgAuCU1ubLDgAAAEU0P9gOAAAA; expires=Thu, 24-Jun-2021 18:11:34 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 25 May 2021 18:11:33 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1/prebuilt/businessCard/analyze', {"source":"https://storageaccount/testingdata/businessCard.png?sastoken"})
  .reply(202, "", [
  'Content-Length',
  '0',
  'Operation-Location',
  'https://endpoint/formrecognizer/v2.1/prebuilt/businessCard/analyzeResults/ff7aa93d-968c-4d5c-9dda-95d0dfa94f74',
  'x-envoy-upstream-service-time',
  '1779',
  'apim-request-id',
  'ff7aa93d-968c-4d5c-9dda-95d0dfa94f74',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:11:35 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/prebuilt/businessCard/analyzeResults/ff7aa93d-968c-4d5c-9dda-95d0dfa94f74')
  .reply(200, {"status":"running","createdDateTime":"2021-05-25T18:11:35Z","lastUpdatedDateTime":"2021-05-25T18:11:36Z"}, [
  'Content-Length',
  '106',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  '2b990f27-4bde-4eae-8265-02f6bc86d075',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:11:35 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/prebuilt/businessCard/analyzeResults/ff7aa93d-968c-4d5c-9dda-95d0dfa94f74')
  .reply(200, {"status":"running","createdDateTime":"2021-05-25T18:11:35Z","lastUpdatedDateTime":"2021-05-25T18:11:36Z"}, [
  'Content-Length',
  '106',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  'fa2f3840-a6b7-4dc3-badb-f98d8dad9aa6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:11:35 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/prebuilt/businessCard/analyzeResults/ff7aa93d-968c-4d5c-9dda-95d0dfa94f74')
  .reply(200, {"status":"succeeded","createdDateTime":"2021-05-25T18:11:35Z","lastUpdatedDateTime":"2021-05-25T18:11:39Z","analyzeResult":{"version":"2.1.0","readResults":[{"page":1,"angle":-16.693,"width":4032,"height":3024,"unit":"pixel"}],"documentResults":[{"docType":"prebuilt:businesscard","pageRange":[1,1],"fields":{"Addresses":{"type":"array","valueArray":[{"type":"string","valueString":"2 Kingdom Street Paddington, London, W2 6BD","text":"2 Kingdom Street Paddington, London, W2 6BD","boundingBox":[1227.4,2138.3,2528.6,1688.4,2605.1,1909.5,1303.9,2359.4],"page":1,"confidence":0.98}]},"CompanyNames":{"type":"array","valueArray":[{"type":"string","valueString":"Contoso","text":"Contoso","boundingBox":[1146,1927,2231,1585,2293,1753,1202,2099],"page":1,"confidence":0.168}]},"ContactNames":{"type":"array","valueArray":[{"type":"object","valueObject":{"FirstName":{"type":"string","valueString":"Avery","text":"Avery","boundingBox":[667,1102,1111,995,1141,1114,696,1216],"page":1},"LastName":{"type":"string","valueString":"Smith","text":"Smith","boundingBox":[1170,981,1570,881,1600,1000,1200,1100],"page":1}},"text":"Dr. Avery Smith","boundingBox":[414.1,1152.8,1571.9,880.5,1601.4,1005.8,443.5,1278],"page":1,"confidence":0.979}]},"Departments":{"type":"array","valueArray":[{"type":"string","valueString":"Cloud & Al Department","text":"Cloud & Al Department","boundingBox":[472,1403,1589,1133,1610.7,1223,493.7,1493],"page":1,"confidence":0.989}]},"Emails":{"type":"array","valueArray":[{"type":"string","valueString":"avery.smith@contoso.com","text":"avery.smith@contoso.com","boundingBox":[2106,934,2909,706,2922,768,2122,993],"page":1,"confidence":0.99}]},"Faxes":{"type":"array","valueArray":[{"type":"phoneNumber","text":"+44 (0) 20 6789 2345","boundingBox":[2519.4,1195,3189.9,984.7,3213.7,1060.6,2543.2,1270.9],"page":1,"confidence":0.99}]},"JobTitles":{"type":"array","valueArray":[{"type":"string","valueString":"Senior Researcher","text":"Senior Researcher","boundingBox":[449.9,1311.6,1315,1104,1334.1,1183.4,469,1391],"page":1,"confidence":0.99}]},"MobilePhones":{"type":"array","valueArray":[{"type":"phoneNumber","text":"+44 (0) 7911 123456","boundingBox":[2426.8,1039.4,3065,847.5,3086.5,919.2,2448.3,1111.1],"page":1,"confidence":0.99}]},"Websites":{"type":"array","valueArray":[{"type":"string","valueString":"https://www.contoso.com/","text":"https://www.contoso.com/","boundingBox":[2120,1003,2980,757,3005,824,2139,1075],"page":1,"confidence":0.99}]},"WorkPhones":{"type":"array","valueArray":[{"type":"phoneNumber","text":"+44 (0) 20 9876 5432","boundingBox":[2468.3,1118.6,3128.3,914.9,3151,988.1,2490.9,1191.9],"page":1,"confidence":0.989}]}}}]}}, [
  'Content-Length',
  '2673',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '18',
  'apim-request-id',
  'f6604384-f031-45c9-b5f6-fd1dfbd2fa0e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:11:41 GMT'
]);
