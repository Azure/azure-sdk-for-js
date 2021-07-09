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
  '9b36177e-c048-44ba-97dd-3b4f59b10001',
  'x-ms-ests-server',
  '2.1.11774.8 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=ApkDqNpQ57tNkXRRzlIgAuCU1ubLAwAAAO0xP9gOAAAA; expires=Thu, 24-Jun-2021 17:59:42 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrwiAX-bsGs57H1io3eA8Vx-AramdyoOiC5Y4xOCPagYilZBv2r12krUrOn23rMz24nu7XaQYpEye3Wq3lINsWSPDPMjpxS-Rr7ZBdLPV63Y-Srf1D_ZbQtrCg_6IjT1BEe40unslMRIHCUkG_XtRMYb5q7bJn9bml9niMmN77TaMgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 25 May 2021 17:59:42 GMT',
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
  '8f5bb59a-b881-43d1-a5c9-12e6c84a2000',
  'x-ms-ests-server',
  '2.1.11774.11 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=ApkDqNpQ57tNkXRRzlIgAuCU1ubLAwAAAO0xP9gOAAAA; expires=Thu, 24-Jun-2021 17:59:42 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrizKiTIlj4xLPCxzeF2NgU7ATGA9tudfYnz94x9WlVPUXM4l7gE6wLJ7EDpCdmJz7yqKYNQaZj4D8am9vWExnUMTl-OCBBAKB1nIh9XZ5UdPJaXY6pCBffuzru4TP6KMXoDEYlq2pr5OeX_AzlWZhJ3o2Yx5X4ZJP5R9W7G-3dXEgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 25 May 2021 17:59:42 GMT',
  'Content-Length',
  '1651'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default%20openid%20profile%20offline_access&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.1.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=2|771,0|,&x-client-last-telemetry=2|0|||0,0&client-request-id=c609a62b-a7f5-4d5a-82f9-c57af0b69ab6&client_secret=azure_client_secret")
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
  'f0841be0-1349-4df6-b5f3-69b26bdc2100',
  'x-ms-ests-server',
  '2.1.11774.11 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=ApkDqNpQ57tNkXRRzlIgAuCU1ubLBAAAAO0xP9gOAAAA; expires=Thu, 24-Jun-2021 17:59:42 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 25 May 2021 17:59:42 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1/custom/models/a0406a91-7525-4bab-94cb-ea4ce69866e9/analyze', {"source":"https://storageaccount/testingdata/Form_1.jpg?sastoken"})
  .reply(202, "", [
  'Content-Length',
  '0',
  'Operation-Location',
  'https://endpoint/formrecognizer/v2.1/custom/models/a0406a91-7525-4bab-94cb-ea4ce69866e9/analyzeresults/e2cef8f4-0112-413e-b496-d015ba3f2c11',
  'x-envoy-upstream-service-time',
  '565',
  'apim-request-id',
  '75e8ebb6-69bf-46be-a8fa-51132339b70b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 17:59:42 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/a0406a91-7525-4bab-94cb-ea4ce69866e9/analyzeResults/e2cef8f4-0112-413e-b496-d015ba3f2c11')
  .reply(200, {"status":"notStarted","createdDateTime":"2021-05-25T17:59:43Z","lastUpdatedDateTime":"2021-05-25T17:59:43Z"}, [
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  'f93b705e-e22e-4433-b55a-50a7e0795c11',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 17:59:43 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/a0406a91-7525-4bab-94cb-ea4ce69866e9/analyzeResults/e2cef8f4-0112-413e-b496-d015ba3f2c11')
  .reply(200, {"status":"notStarted","createdDateTime":"2021-05-25T17:59:43Z","lastUpdatedDateTime":"2021-05-25T17:59:43Z"}, [
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  '9010f35e-7bbc-4445-a821-1e4837b29de6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 17:59:43 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/a0406a91-7525-4bab-94cb-ea4ce69866e9/analyzeResults/e2cef8f4-0112-413e-b496-d015ba3f2c11')
  .reply(200, {"status":"succeeded","createdDateTime":"2021-05-25T17:59:43Z","lastUpdatedDateTime":"2021-05-25T17:59:47Z","analyzeResult":{"version":"2.1.0","readResults":[{"page":1,"angle":0,"width":1700,"height":2200,"unit":"pixel"}],"pageResults":[{"page":1,"tables":[{"rows":5,"columns":4,"cells":[{"rowIndex":0,"columnIndex":0,"text":"Details","boundingBox":[156,1037,847,1037,847,1086,156,1086],"isHeader":true},{"rowIndex":0,"columnIndex":1,"text":"Quantity","boundingBox":[847,1037,1071,1038,1071,1086,847,1086],"isHeader":true},{"rowIndex":0,"columnIndex":2,"text":"Unit Price","boundingBox":[1071,1038,1309,1038,1309,1086,1071,1086],"isHeader":true},{"rowIndex":0,"columnIndex":3,"text":"Total","boundingBox":[1309,1038,1543,1038,1543,1086,1309,1086],"isHeader":true},{"rowIndex":1,"columnIndex":0,"text":"Bindings","boundingBox":[156,1086,847,1086,847,1127,156,1127],"isHeader":false},{"rowIndex":1,"columnIndex":1,"text":"20","boundingBox":[847,1086,1071,1086,1071,1127,847,1127],"isHeader":false},{"rowIndex":1,"columnIndex":2,"text":"1.00","boundingBox":[1071,1086,1309,1086,1309,1127,1071,1127],"isHeader":false},{"rowIndex":1,"columnIndex":3,"text":"20.00","boundingBox":[1309,1086,1543,1086,1543,1127,1309,1127],"isHeader":false},{"rowIndex":2,"columnIndex":0,"text":"Covers Small","boundingBox":[156,1127,847,1127,847,1171,156,1171],"isHeader":false},{"rowIndex":2,"columnIndex":1,"text":"20","boundingBox":[847,1127,1071,1127,1071,1171,847,1171],"isHeader":false},{"rowIndex":2,"columnIndex":2,"text":"1.00","boundingBox":[1071,1127,1309,1127,1309,1171,1071,1171],"isHeader":false},{"rowIndex":2,"columnIndex":3,"text":"20.00","boundingBox":[1309,1127,1543,1127,1543,1171,1309,1171],"isHeader":false},{"rowIndex":3,"columnIndex":0,"text":"Feather Bookmark","boundingBox":[156,1171,847,1171,847,1214,156,1214],"isHeader":false},{"rowIndex":3,"columnIndex":1,"text":"20","boundingBox":[847,1171,1071,1171,1071,1214,847,1214],"isHeader":false},{"rowIndex":3,"columnIndex":2,"text":"5.00","boundingBox":[1071,1171,1309,1171,1309,1214,1071,1214],"isHeader":false},{"rowIndex":3,"columnIndex":3,"text":"100.00","boundingBox":[1309,1171,1543,1171,1543,1215,1309,1214],"isHeader":false},{"rowIndex":4,"columnIndex":0,"text":"Copper Swirl Marker","boundingBox":[156,1214,847,1214,847,1258,156,1258],"isHeader":false},{"rowIndex":4,"columnIndex":1,"text":"20","boundingBox":[847,1214,1071,1214,1071,1258,847,1258],"isHeader":false},{"rowIndex":4,"columnIndex":2,"text":"5.00","boundingBox":[1071,1214,1309,1214,1309,1258,1071,1258],"isHeader":false},{"rowIndex":4,"columnIndex":3,"text":"100.00","boundingBox":[1309,1214,1543,1215,1543,1260,1309,1258],"isHeader":false}],"boundingBox":[153,1036,1547,1037,1547,1265,153,1265]},{"rows":4,"columns":2,"cells":[{"rowIndex":0,"columnIndex":0,"text":"SUBTOTAL","boundingBox":[1070,1564,1307,1564,1308,1609,1071,1608],"isHeader":true},{"rowIndex":0,"columnIndex":1,"text":"$140.00","boundingBox":[1307,1564,1544,1564,1544,1609,1308,1609],"isHeader":true},{"rowIndex":1,"columnIndex":0,"text":"TAX","boundingBox":[1071,1608,1308,1609,1308,1652,1071,1653],"isHeader":false},{"rowIndex":1,"columnIndex":1,"text":"$4.00","boundingBox":[1308,1609,1544,1609,1544,1652,1308,1652],"isHeader":false},{"rowIndex":2,"columnIndex":0,"text":"","boundingBox":[1071,1653,1308,1652,1308,1664,1071,1664],"isHeader":false},{"rowIndex":2,"columnIndex":1,"text":"","boundingBox":[1308,1652,1544,1652,1544,1665,1308,1664],"isHeader":false},{"rowIndex":3,"columnIndex":0,"text":"TOTAL","boundingBox":[1071,1664,1308,1664,1308,1707,1071,1707],"isHeader":false},{"rowIndex":3,"columnIndex":1,"text":"$144.00","boundingBox":[1308,1664,1544,1665,1544,1707,1308,1707],"isHeader":false}],"boundingBox":[1058,1563,1555,1563,1555,1707,1058,1707]}]}],"documentResults":[{"docType":"custom:modelName162196557650600511","modelId":"a0406a91-7525-4bab-94cb-ea4ce69866e9","pageRange":[1,1],"fields":{"Total":{"type":"string","valueString":"$144.00","text":"$144.00","page":1,"boundingBox":[1427,1669,1527,1669,1527,1698,1427,1698],"confidence":0.995},"CompanyPhoneNumber":{"type":"string","valueString":"938-294-2949","text":"938-294-2949","page":1,"boundingBox":[709,722,882,722,882,749,709,749],"confidence":0.995},"PhoneNumber":{"type":"string","valueString":"555-348-6512","text":"555-348-6512","page":1,"boundingBox":[365,351,525,351,525,378,365,378],"confidence":0.992},"Merchant":{"type":"string","valueString":"Hero Limited","text":"Hero Limited","page":1,"boundingBox":[620,205,1062,205,1062,266,620,266],"confidence":0.99},"CompanyAddress":{"type":"string","valueString":"938 NE Burner Road Boulder City, CO 92848","text":"938 NE Burner Road Boulder City, CO 92848","page":1,"boundingBox":[275,685,561,685,561,751,275,751],"confidence":0.622},"DatedAs":{"type":"string","valueString":"12/20/2020","text":"12/20/2020","page":1,"boundingBox":[1163,420,1310,420,1310,449,1163,449],"confidence":0.994},"Email":{"type":"string","valueString":"accounts@herolimited.com","text":"accounts@herolimited.com","page":1,"boundingBox":[164,479,471,479,471,503,164,503],"confidence":0.953},"CompanyName":{"type":"string","valueString":"Higgly Wiggly Books","text":"Higgly Wiggly Books","page":1,"boundingBox":[375,646,629,646,629,679,375,679],"confidence":0.993},"VendorName":{"type":"string","valueString":"Hillary Swank","text":"Hillary Swank","page":1,"boundingBox":[349,609,520,609,520,639,349,639],"confidence":0.991},"Website":{"type":"string","valueString":"www.herolimited.com","text":"www.herolimited.com","page":1,"boundingBox":[273,393,524,393,524,418,273,418],"confidence":0.992},"Subtotal":{"type":"string","valueString":"$140.00","text":"$140.00","page":1,"boundingBox":[1428,1572,1528,1572,1528,1599,1428,1599],"confidence":0.994},"Tax":{"type":"string","valueString":"$4.00","text":"$4.00","page":1,"boundingBox":[1458,1615,1529,1615,1529,1643,1458,1643],"confidence":0.994},"Quantity":{"type":"number","valueNumber":20,"text":"20","page":1,"boundingBox":[860,1094,888,1094,888,1119,860,1119],"confidence":0.99},"Signature":{"type":"string","valueString":"Bernie Sanders","text":"Bernie Sanders","page":1,"boundingBox":[484,1670,762,1670,762,1708,484,1708],"confidence":0.437},"PurchaseOrderNumber":{"type":"string","valueString":"948284","text":"948284","page":1,"boundingBox":[1278,461,1372,461,1372,489,1278,489],"confidence":0.994}},"docTypeConfidence":0.92}],"errors":[]}}, [
  'Content-Length',
  '6632',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  'c8f97165-69eb-4194-877a-16bd82d3ade7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 17:59:49 GMT'
]);
