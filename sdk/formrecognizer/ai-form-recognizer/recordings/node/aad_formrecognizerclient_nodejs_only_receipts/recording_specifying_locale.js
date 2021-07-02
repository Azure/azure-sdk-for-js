let nock = require('nock');

module.exports.hash = "cc8335d3f814b7dc5fa1169bc0a92aa6";

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
  '68f53978-256b-47fe-a306-bc1e297c5c00',
  'x-ms-ests-server',
  '2.1.11722.21 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=ApkDqNpQ57tNkXRRzlIgAuCU1ubLDgAAAEU0P9gOAAAA; expires=Thu, 24-Jun-2021 18:11:20 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrgG1INsj_93JXw-iSlQ0IrLJ6PtfzAP1pekHp1jiaw13j5-PWSP_fmBCx9I2DzaI2875tKnhRp9JCuY1vznU9mCMg3-q1YAy_nGM_U1zTelrHlLyUYDienS--7dXBO7ECyr0bLNyrqYHxEe6BJZEknFemh6ZYzYdIE7EfPenJVE8gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 25 May 2021 18:11:19 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  'eb12d49d-f81e-4430-8bd3-d73bea992300',
  'x-ms-ests-server',
  '2.1.11774.11 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=ApkDqNpQ57tNkXRRzlIgAuCU1ubLDgAAAEU0P9gOAAAA; expires=Thu, 24-Jun-2021 18:11:20 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevraN8fsianudLNEAe-vlLewtgF4E7ZEaMm3qAT5YxChzjU2jsgUPbojLjliwvLnT8yXr0O6tVtAmTtR2wTeAeQ4QQvHuDlib4n-lVkwRlXrl7-4qAttL5tJzNT1xjTPqZTZH4WZs8o1P5oyqBp0ITulzTJjh2OXzuSpnvU6jgDCCIgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 25 May 2021 18:11:19 GMT',
  'Content-Length',
  '1651'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default%20openid%20profile%20offline_access&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.1.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=2|771,0|,&x-client-last-telemetry=2|0|||0,0&client-request-id=3d9249c3-b18e-48fd-b898-023d54b2bfc3&client_secret=azure_client_secret")
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
  '34c2cc85-ab44-44f3-abf6-0d76b2151d00',
  'x-ms-ests-server',
  '2.1.11774.11 - NCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=ApkDqNpQ57tNkXRRzlIgAuCU1ubLDgAAAEU0P9gOAAAA; expires=Thu, 24-Jun-2021 18:11:20 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 25 May 2021 18:11:20 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1/prebuilt/receipt/analyze', {"source":"https://storageaccount/testingdata/contoso-allinone.jpg?sastoken"})
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Operation-Location',
  'https://endpoint/formrecognizer/v2.1/prebuilt/receipt/analyzeResults/43e4c167-8be5-4cee-8213-dcdf2c5e46a0',
  'x-envoy-upstream-service-time',
  '731',
  'apim-request-id',
  '43e4c167-8be5-4cee-8213-dcdf2c5e46a0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:11:21 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/prebuilt/receipt/analyzeResults/43e4c167-8be5-4cee-8213-dcdf2c5e46a0')
  .reply(200, {"status":"running","createdDateTime":"2021-05-25T18:11:21Z","lastUpdatedDateTime":"2021-05-25T18:11:21Z"}, [
  'Content-Length',
  '106',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  'e0e891e0-6dc6-4b2a-bb95-05d67cea3f38',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:11:21 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/prebuilt/receipt/analyzeResults/43e4c167-8be5-4cee-8213-dcdf2c5e46a0')
  .reply(200, {"status":"running","createdDateTime":"2021-05-25T18:11:21Z","lastUpdatedDateTime":"2021-05-25T18:11:21Z"}, [
  'Content-Length',
  '106',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '71c4d621-6d8e-4acf-a248-d4c798bc41b9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:11:21 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/prebuilt/receipt/analyzeResults/43e4c167-8be5-4cee-8213-dcdf2c5e46a0')
  .reply(200, {"status":"succeeded","createdDateTime":"2021-05-25T18:11:21Z","lastUpdatedDateTime":"2021-05-25T18:11:25Z","analyzeResult":{"version":"2.1.0","readResults":[{"page":1,"angle":0.1273,"width":1688,"height":3000,"unit":"pixel"}],"documentResults":[{"docType":"prebuilt:receipt","pageRange":[1,1],"fields":{"Items":{"type":"array","valueArray":[{"type":"object","valueObject":{"Name":{"type":"string","valueString":"Cappuccino","text":"Cappuccino","boundingBox":[304,1585,658,1598,657,1688,302,1679],"page":1,"confidence":0.558},"Quantity":{"type":"number","valueNumber":1,"text":"1","boundingBox":[244,1581,286,1584,283,1678,241,1675],"page":1,"confidence":0.936},"TotalPrice":{"type":"number","valueNumber":2.2,"text":"$2.20","boundingBox":[1106,1579,1260,1574,1263,1656,1108,1662],"page":1,"confidence":0.972}}},{"type":"object","valueObject":{"Name":{"type":"string","valueString":"BACON & EGGS","text":"BACON & EGGS","boundingBox":[293,1839,737,1839,737,1924,293,1924],"page":1,"confidence":0.906},"Quantity":{"type":"number","valueNumber":1,"text":"1","boundingBox":[227,1839,275,1839,275,1924,226,1924],"page":1,"confidence":0.936},"TotalPrice":{"type":"number","valueNumber":9.5,"text":"$9.5","boundingBox":[1134,1948,1252,1948,1252,2041,1134,2041],"page":1,"confidence":0.977}}}]},"MerchantAddress":{"type":"string","valueString":"123 Main Street Redmond, WA 98052","text":"123 Main Street Redmond, WA 98052","boundingBox":[298.6,675.8,844.8,782.2,810.6,957.9,264.4,851.5],"page":1,"confidence":0.974},"MerchantName":{"type":"string","valueString":"Contoso","text":"Contoso","boundingBox":[308,570,515,627,500,685,290,634],"page":1,"confidence":0.974},"MerchantPhoneNumber":{"type":"phoneNumber","valuePhoneNumber":"+919876543210","text":"987-654-3210","boundingBox":[274,1000,651,1049,643,1125,268,1076],"page":1,"confidence":0.987},"ReceiptType":{"type":"string","valueString":"Itemized","confidence":0.99},"Subtotal":{"type":"number","valueNumber":11.7,"text":"$ 11.70","boundingBox":[1082,2225.1,1307.1,2228,1306,2315.4,1080.9,2312.5],"page":1,"confidence":0.967},"Tax":{"type":"number","valueNumber":1.17,"text":"$ 1.17","boundingBox":[1125,2352.1,1307.4,2361,1303,2452.9,1120.6,2444],"page":1,"confidence":0.985},"Tip":{"type":"number","valueNumber":1.63,"text":"$ 1.63","boundingBox":[1034,2481.7,1268.6,2488,1266,2583.5,1031.5,2577.2],"page":1,"confidence":0.941},"Total":{"type":"number","valueNumber":14.5,"text":"$14.50","boundingBox":[1033,2623,1374,2641,1368,2757,1027,2740],"page":1,"confidence":0.978},"TransactionDate":{"type":"date","valueDate":"2019-10-06","text":"6/10/2019","boundingBox":[259,1224,514,1247,509,1331,255,1312],"page":1,"confidence":0.987},"TransactionTime":{"type":"time","valueTime":"13:59:00","text":"13:59","boundingBox":[531,1248,681,1262,675,1341,526,1333],"page":1,"confidence":0.985}}}]}}, [
  'Content-Length',
  '2837',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  '94071719-097c-4c6d-8c9a-b5f4c8b8dc9b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:11:25 GMT'
]);
