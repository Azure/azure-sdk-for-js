let nock = require('nock');

module.exports.hash = "45a517c30943c68673113ef0bcaf2d64";

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
  '6eeb2d70-6410-4e2f-a1f5-6473ba848f02',
  'x-ms-ests-server',
  '2.1.11722.21 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=ApkDqNpQ57tNkXRRzlIgAuCU1ubLBgAAAO0xP9gOAAAA; expires=Thu, 24-Jun-2021 17:59:55 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrqxef3KgK7l9RZQD8s-w1zxItDWb9vtmz1-X2RQWocnhO7RK8c94G1OXhH5qoKYAazQHI86bZ9ubef9uulbkn4mKcVXdZxGwQV1kMB3DCovw-umIHGffDS8i0Zb9rdhjrm3fhupPbWdcim1sctaEBUz6J63d4Pz88dy35uOAOHQggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 25 May 2021 17:59:54 GMT',
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
  'eb12d49d-f81e-4430-8bd3-d73b1d492300',
  'x-ms-ests-server',
  '2.1.11774.11 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=ApkDqNpQ57tNkXRRzlIgAuCU1ubLBgAAAO0xP9gOAAAA; expires=Thu, 24-Jun-2021 17:59:55 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevryTYS_K5Qs87EzP3YmpPb5F3u6G8Rs9eHIr8j_JfgysOjhrg2nbw8pVGnt4AE9lxYvTCHn1U5W11979OoCQXCzFOWdFCzqXLm6NT1NTPH7PuJ8tCWaLmHQdtLvgqLE7zwOySUkmqclSKE3LuxkicGgdiengUmxRbauWaA66On6eYgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 25 May 2021 17:59:54 GMT',
  'Content-Length',
  '1651'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default%20openid%20profile%20offline_access&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.1.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=2|771,0|,&x-client-last-telemetry=2|0|||0,0&client-request-id=2d90497b-2433-4850-b573-08759f4e1bf9&client_secret=azure_client_secret")
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
  '845fddfa-321f-405f-8f05-9aeed5b11e00',
  'x-ms-ests-server',
  '2.1.11774.11 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=ApkDqNpQ57tNkXRRzlIgAuCU1ubLBgAAAO0xP9gOAAAA; expires=Thu, 24-Jun-2021 17:59:55 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 25 May 2021 17:59:54 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1/custom/models/2dec6a34-4ad1-4b62-b239-eb08c7972aff/analyze', {"source":"https://storageaccount/testingdata/Form_1.jpg?sastoken"})
  .reply(202, "", [
  'Content-Length',
  '0',
  'Operation-Location',
  'https://endpoint/formrecognizer/v2.1/custom/models/2dec6a34-4ad1-4b62-b239-eb08c7972aff/analyzeresults/5b534ac6-b21b-4ff3-a9bf-70370160157a',
  'x-envoy-upstream-service-time',
  '436',
  'apim-request-id',
  'e9eed177-dcbd-4435-acd8-6d2c9c328f8c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 17:59:55 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/2dec6a34-4ad1-4b62-b239-eb08c7972aff/analyzeResults/5b534ac6-b21b-4ff3-a9bf-70370160157a')
  .reply(200, {"status":"notStarted","createdDateTime":"2021-05-25T17:59:56Z","lastUpdatedDateTime":"2021-05-25T17:59:56Z"}, [
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  '8c6d2fb6-ef85-4eda-9499-28632f952620',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 17:59:55 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/2dec6a34-4ad1-4b62-b239-eb08c7972aff/analyzeResults/5b534ac6-b21b-4ff3-a9bf-70370160157a')
  .reply(200, {"status":"notStarted","createdDateTime":"2021-05-25T17:59:56Z","lastUpdatedDateTime":"2021-05-25T17:59:56Z"}, [
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  '52127f69-edbb-4c8a-be14-55efb79aab88',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 17:59:55 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/2dec6a34-4ad1-4b62-b239-eb08c7972aff/analyzeResults/5b534ac6-b21b-4ff3-a9bf-70370160157a')
  .reply(200, {"status":"notStarted","createdDateTime":"2021-05-25T17:59:56Z","lastUpdatedDateTime":"2021-05-25T17:59:59Z"}, [
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '18',
  'apim-request-id',
  'f049070c-8422-4560-9992-cd4e1caac678',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:00:00 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/2dec6a34-4ad1-4b62-b239-eb08c7972aff/analyzeResults/5b534ac6-b21b-4ff3-a9bf-70370160157a')
  .reply(200, {"status":"succeeded","createdDateTime":"2021-05-25T17:59:56Z","lastUpdatedDateTime":"2021-05-25T18:00:03Z","analyzeResult":{"version":"2.1.0","readResults":[{"page":1,"angle":0,"width":1700,"height":2200,"unit":"pixel"}],"pageResults":[{"page":1,"tables":[{"rows":5,"columns":4,"cells":[{"rowIndex":0,"columnIndex":0,"text":"Details","boundingBox":[156,1037,847,1037,847,1086,156,1086],"isHeader":true},{"rowIndex":0,"columnIndex":1,"text":"Quantity","boundingBox":[847,1037,1071,1038,1071,1086,847,1086],"isHeader":true},{"rowIndex":0,"columnIndex":2,"text":"Unit Price","boundingBox":[1071,1038,1309,1038,1309,1086,1071,1086],"isHeader":true},{"rowIndex":0,"columnIndex":3,"text":"Total","boundingBox":[1309,1038,1543,1038,1543,1086,1309,1086],"isHeader":true},{"rowIndex":1,"columnIndex":0,"text":"Bindings","boundingBox":[156,1086,847,1086,847,1127,156,1127],"isHeader":false},{"rowIndex":1,"columnIndex":1,"text":"20","boundingBox":[847,1086,1071,1086,1071,1127,847,1127],"isHeader":false},{"rowIndex":1,"columnIndex":2,"text":"1.00","boundingBox":[1071,1086,1309,1086,1309,1127,1071,1127],"isHeader":false},{"rowIndex":1,"columnIndex":3,"text":"20.00","boundingBox":[1309,1086,1543,1086,1543,1127,1309,1127],"isHeader":false},{"rowIndex":2,"columnIndex":0,"text":"Covers Small","boundingBox":[156,1127,847,1127,847,1171,156,1171],"isHeader":false},{"rowIndex":2,"columnIndex":1,"text":"20","boundingBox":[847,1127,1071,1127,1071,1171,847,1171],"isHeader":false},{"rowIndex":2,"columnIndex":2,"text":"1.00","boundingBox":[1071,1127,1309,1127,1309,1171,1071,1171],"isHeader":false},{"rowIndex":2,"columnIndex":3,"text":"20.00","boundingBox":[1309,1127,1543,1127,1543,1171,1309,1171],"isHeader":false},{"rowIndex":3,"columnIndex":0,"text":"Feather Bookmark","boundingBox":[156,1171,847,1171,847,1214,156,1214],"isHeader":false},{"rowIndex":3,"columnIndex":1,"text":"20","boundingBox":[847,1171,1071,1171,1071,1214,847,1214],"isHeader":false},{"rowIndex":3,"columnIndex":2,"text":"5.00","boundingBox":[1071,1171,1309,1171,1309,1214,1071,1214],"isHeader":false},{"rowIndex":3,"columnIndex":3,"text":"100.00","boundingBox":[1309,1171,1543,1171,1543,1215,1309,1214],"isHeader":false},{"rowIndex":4,"columnIndex":0,"text":"Copper Swirl Marker","boundingBox":[156,1214,847,1214,847,1258,156,1258],"isHeader":false},{"rowIndex":4,"columnIndex":1,"text":"20","boundingBox":[847,1214,1071,1214,1071,1258,847,1258],"isHeader":false},{"rowIndex":4,"columnIndex":2,"text":"5.00","boundingBox":[1071,1214,1309,1214,1309,1258,1071,1258],"isHeader":false},{"rowIndex":4,"columnIndex":3,"text":"100.00","boundingBox":[1309,1214,1543,1215,1543,1260,1309,1258],"isHeader":false}],"boundingBox":[153,1036,1547,1037,1547,1265,153,1265]},{"rows":4,"columns":2,"cells":[{"rowIndex":0,"columnIndex":0,"text":"SUBTOTAL","boundingBox":[1070,1564,1307,1564,1308,1609,1071,1608],"isHeader":true},{"rowIndex":0,"columnIndex":1,"text":"$140.00","boundingBox":[1307,1564,1544,1564,1544,1609,1308,1609],"isHeader":true},{"rowIndex":1,"columnIndex":0,"text":"TAX","boundingBox":[1071,1608,1308,1609,1308,1652,1071,1653],"isHeader":false},{"rowIndex":1,"columnIndex":1,"text":"$4.00","boundingBox":[1308,1609,1544,1609,1544,1652,1308,1652],"isHeader":false},{"rowIndex":2,"columnIndex":0,"text":"","boundingBox":[1071,1653,1308,1652,1308,1664,1071,1664],"isHeader":false},{"rowIndex":2,"columnIndex":1,"text":"","boundingBox":[1308,1652,1544,1652,1544,1665,1308,1664],"isHeader":false},{"rowIndex":3,"columnIndex":0,"text":"TOTAL","boundingBox":[1071,1664,1308,1664,1308,1707,1071,1707],"isHeader":false},{"rowIndex":3,"columnIndex":1,"text":"$144.00","boundingBox":[1308,1664,1544,1665,1544,1707,1308,1707],"isHeader":false}],"boundingBox":[1058,1563,1555,1563,1555,1707,1058,1707]}]}],"documentResults":[{"docType":"custom:modelName162196558922408414","modelId":"2dec6a34-4ad1-4b62-b239-eb08c7972aff","pageRange":[1,1],"fields":{"Email":{"type":"string","valueString":"accounts@herolimited.com","text":"accounts@herolimited.com","page":1,"boundingBox":[164,479,471,479,471,503,164,503],"confidence":0.953},"Subtotal":{"type":"string","valueString":"$140.00","text":"$140.00","page":1,"boundingBox":[1428,1572,1528,1572,1528,1599,1428,1599],"confidence":0.994},"Total":{"type":"string","valueString":"$144.00","text":"$144.00","page":1,"boundingBox":[1427,1669,1527,1669,1527,1698,1427,1698],"confidence":0.995},"Tax":{"type":"string","valueString":"$4.00","text":"$4.00","page":1,"boundingBox":[1458,1615,1529,1615,1529,1643,1458,1643],"confidence":0.994},"Website":{"type":"string","valueString":"www.herolimited.com","text":"www.herolimited.com","page":1,"boundingBox":[273,393,524,393,524,418,273,418],"confidence":0.992},"Signature":{"type":"string","valueString":"Bernie Sanders","text":"Bernie Sanders","page":1,"boundingBox":[484,1670,762,1670,762,1708,484,1708],"confidence":0.437},"PurchaseOrderNumber":{"type":"string","valueString":"948284","text":"948284","page":1,"boundingBox":[1278,461,1372,461,1372,489,1278,489],"confidence":0.994},"Quantity":{"type":"number","valueNumber":20,"text":"20","page":1,"boundingBox":[860,1094,888,1094,888,1119,860,1119],"confidence":0.99},"CompanyPhoneNumber":{"type":"string","valueString":"938-294-2949","text":"938-294-2949","page":1,"boundingBox":[709,722,882,722,882,749,709,749],"confidence":0.995},"CompanyName":{"type":"string","valueString":"Higgly Wiggly Books","text":"Higgly Wiggly Books","page":1,"boundingBox":[375,646,629,646,629,679,375,679],"confidence":0.993},"Merchant":{"type":"string","valueString":"Hero Limited","text":"Hero Limited","page":1,"boundingBox":[620,205,1062,205,1062,266,620,266],"confidence":0.99},"VendorName":{"type":"string","valueString":"Hillary Swank","text":"Hillary Swank","page":1,"boundingBox":[349,609,520,609,520,639,349,639],"confidence":0.991},"CompanyAddress":{"type":"string","valueString":"938 NE Burner Road Boulder City, CO 92848","text":"938 NE Burner Road Boulder City, CO 92848","page":1,"boundingBox":[275,685,561,685,561,751,275,751],"confidence":0.622},"PhoneNumber":{"type":"string","valueString":"555-348-6512","text":"555-348-6512","page":1,"boundingBox":[365,351,525,351,525,378,365,378],"confidence":0.992},"DatedAs":{"type":"string","valueString":"12/20/2020","text":"12/20/2020","page":1,"boundingBox":[1163,420,1310,420,1310,449,1163,449],"confidence":0.994}},"docTypeConfidence":0.92}],"errors":[]}}, [
  'Content-Length',
  '6632',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '18',
  'apim-request-id',
  'a49b197b-d5ea-401c-859a-8b769ab2ff65',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:00:05 GMT'
]);
