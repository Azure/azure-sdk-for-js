let nock = require('nock');

module.exports.hash = "b6ef86a9033e9fe457559bdfa1363ea1";

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
  '18139422-5c3e-4019-a5f1-e39c2369b101',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AgRLK_yyL-BMiLhMpVRBz8rGLH8mAwAAAFyuG9gOAAAA; expires=Fri, 28-May-2021 19:29:37 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrxXUIKfP4D5KeGRjm7Ais7xlzBnWSkir9CKKTChYqQPn8aFbCATRK3S-8QVws1csTUSeSKBmMLQYsuLJStR8hWfXRwkL5MBcUuo2hMUEfsrFefyg5ORzhVmon6BzafoegCSNXdiVTCLWd2cw1uUmU0TkLWbOZi_KOQa85FNOvDn4gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 19:29:37 GMT',
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
  'a209898b-49cc-496f-8e6d-3c671df26201',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AgRLK_yyL-BMiLhMpVRBz8rGLH8mAwAAAFyuG9gOAAAA; expires=Fri, 28-May-2021 19:29:37 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevre6OzjmjXnL7GjZESyAmNMloaNY5BdQhqVwdiJNICg8ewKNd9p-oI82dUp1HXw4TYxQBjbn4gM8xCeYMGC-q9cu9msJGHsUuU4OMO604WY92XapctXb1IpJ-IHyoNUe6tCZhoUtT8MkZAbzAp76LurxJGrNTxbR5IlXM_m1YP2aEgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 19:29:37 GMT',
  'Content-Length',
  '1651'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .filteringRequestBody(function (body) {
            return body.replace(/client-request-id=[^&]*/g, "client-request-id=client-request-id");
        })
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default%20openid%20profile%20offline_access&grant_type=client_credentials&client-request-id=client-request-id&client_secret=azure_client_secret")
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
  '06eddcf6-9993-42fc-8c86-b63eb940b100',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AgRLK_yyL-BMiLhMpVRBz8rGLH8mBAAAAFyuG9gOAAAA; expires=Fri, 28-May-2021 19:29:37 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 19:29:37 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.3/custom/models/8b66a454-3a2f-4bef-85a9-c4f9e2e33b65/analyze', {"source":"https://storageaccount/testingdata/Form_1.jpg?sastoken"})
  .reply(202, "", [
  'Content-Length',
  '0',
  'Operation-Location',
  'https://endpoint/formrecognizer/v2.1-preview.3/custom/models/8b66a454-3a2f-4bef-85a9-c4f9e2e33b65/analyzeresults/55e640d6-e803-4439-b422-e6d3a27d94b0',
  'x-envoy-upstream-service-time',
  '155',
  'apim-request-id',
  '9be8b846-dbfa-44ef-a3f4-cdd2575b0c29',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:29:38 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/8b66a454-3a2f-4bef-85a9-c4f9e2e33b65/analyzeResults/55e640d6-e803-4439-b422-e6d3a27d94b0')
  .reply(200, {"status":"notStarted","createdDateTime":"2021-04-28T19:29:38Z","lastUpdatedDateTime":"2021-04-28T19:29:38Z"}, [
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '22',
  'apim-request-id',
  '3311bd71-9c3f-42db-bf72-db52f2020d8a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:29:38 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/8b66a454-3a2f-4bef-85a9-c4f9e2e33b65/analyzeResults/55e640d6-e803-4439-b422-e6d3a27d94b0')
  .reply(200, {"status":"notStarted","createdDateTime":"2021-04-28T19:29:38Z","lastUpdatedDateTime":"2021-04-28T19:29:38Z"}, [
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '22',
  'apim-request-id',
  'da5df32d-bc6d-4b1d-abfe-6e605702d8a7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:29:38 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/8b66a454-3a2f-4bef-85a9-c4f9e2e33b65/analyzeResults/55e640d6-e803-4439-b422-e6d3a27d94b0')
  .reply(200, {"status":"notStarted","createdDateTime":"2021-04-28T19:29:38Z","lastUpdatedDateTime":"2021-04-28T19:29:43Z"}, [
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '27',
  'apim-request-id',
  'a9aebb6e-2698-4bd7-ae1d-7116cba518a8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:29:42 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/8b66a454-3a2f-4bef-85a9-c4f9e2e33b65/analyzeResults/55e640d6-e803-4439-b422-e6d3a27d94b0')
  .reply(200, {"status":"succeeded","createdDateTime":"2021-04-28T19:29:38Z","lastUpdatedDateTime":"2021-04-28T19:29:46Z","analyzeResult":{"version":"2.1.0","readResults":[{"page":1,"angle":0,"width":1700,"height":2200,"unit":"pixel"}],"pageResults":[{"page":1,"tables":[{"rows":5,"columns":5,"cells":[{"rowIndex":0,"columnIndex":0,"columnSpan":2,"text":"Details","boundingBox":[157,1038,847,1037,847,1086,157,1086]},{"rowIndex":0,"columnIndex":2,"text":"Quantity","boundingBox":[847,1037,1071,1037,1071,1086,847,1086]},{"rowIndex":0,"columnIndex":3,"text":"Unit Price","boundingBox":[1071,1037,1310,1038,1310,1086,1071,1086]},{"rowIndex":0,"columnIndex":4,"text":"Total","boundingBox":[1310,1038,1543,1038,1543,1086,1310,1086]},{"rowIndex":1,"columnIndex":0,"columnSpan":2,"text":"Bindings","boundingBox":[157,1086,847,1086,847,1127,157,1128]},{"rowIndex":1,"columnIndex":2,"text":"20","boundingBox":[847,1086,1071,1086,1071,1127,847,1127]},{"rowIndex":1,"columnIndex":3,"text":"1.00","boundingBox":[1071,1086,1310,1086,1310,1127,1071,1127]},{"rowIndex":1,"columnIndex":4,"text":"20.00","boundingBox":[1310,1086,1543,1086,1543,1127,1310,1127]},{"rowIndex":2,"columnIndex":0,"columnSpan":2,"text":"Covers Small","boundingBox":[157,1128,847,1127,847,1171,157,1171]},{"rowIndex":2,"columnIndex":2,"text":"20","boundingBox":[847,1127,1071,1127,1071,1171,847,1171]},{"rowIndex":2,"columnIndex":3,"text":"1.00","boundingBox":[1071,1127,1310,1127,1310,1171,1071,1171]},{"rowIndex":2,"columnIndex":4,"text":"20.00","boundingBox":[1310,1127,1543,1127,1543,1171,1310,1171]},{"rowIndex":3,"columnIndex":0,"columnSpan":2,"text":"Feather Bookmark","boundingBox":[157,1171,847,1171,847,1214,157,1214]},{"rowIndex":3,"columnIndex":2,"text":"20","boundingBox":[847,1171,1071,1171,1071,1214,847,1214]},{"rowIndex":3,"columnIndex":3,"text":"5.00","boundingBox":[1071,1171,1310,1171,1310,1214,1071,1214]},{"rowIndex":3,"columnIndex":4,"text":"100.00","boundingBox":[1310,1171,1543,1171,1543,1215,1310,1214]},{"rowIndex":4,"columnIndex":0,"columnSpan":2,"text":"Copper Swirl Marker","boundingBox":[157,1214,847,1214,847,1258,157,1258]},{"rowIndex":4,"columnIndex":2,"text":"20","boundingBox":[847,1214,1071,1214,1071,1258,847,1258]},{"rowIndex":4,"columnIndex":3,"text":"5.00","boundingBox":[1071,1214,1310,1214,1310,1258,1071,1258]},{"rowIndex":4,"columnIndex":4,"text":"100.00","boundingBox":[1310,1214,1543,1215,1543,1260,1310,1258]}],"boundingBox":[153,1036,1547,1037,1547,1265,153,1265]},{"rows":4,"columns":2,"cells":[{"rowIndex":0,"columnIndex":0,"text":"SUBTOTAL","boundingBox":[1072,1564,1307,1565,1308,1609,1071,1608]},{"rowIndex":0,"columnIndex":1,"text":"$140.00","boundingBox":[1307,1565,1542,1564,1543,1609,1308,1609]},{"rowIndex":1,"columnIndex":0,"text":"TAX","boundingBox":[1071,1608,1308,1609,1308,1652,1071,1651]},{"rowIndex":1,"columnIndex":1,"text":"$4.00","boundingBox":[1308,1609,1543,1609,1543,1652,1308,1652]},{"rowIndex":2,"columnIndex":0,"text":"","boundingBox":[1071,1651,1308,1652,1308,1663,1071,1663]},{"rowIndex":2,"columnIndex":1,"text":"","boundingBox":[1308,1652,1543,1652,1543,1663,1308,1663]},{"rowIndex":3,"columnIndex":0,"text":"TOTAL","boundingBox":[1071,1663,1308,1663,1308,1707,1071,1707]},{"rowIndex":3,"columnIndex":1,"text":"$144.00","boundingBox":[1308,1663,1543,1663,1543,1708,1308,1707]}],"boundingBox":[1058,1563,1555,1563,1555,1707,1058,1707]}]}],"documentResults":[{"docType":"custom:modelName161963817146406404","modelId":"8b66a454-3a2f-4bef-85a9-c4f9e2e33b65","pageRange":[1,1],"fields":{"PhoneNumber":{"type":"string","valueString":"555-348-6512","text":"555-348-6512","page":1,"boundingBox":[365,351,525,351,525,378,365,378],"confidence":0.995},"PurchaseOrderNumber":{"type":"string","valueString":"948284","text":"948284","page":1,"boundingBox":[1278,461,1372,461,1372,489,1278,489],"confidence":0.995},"Email":{"type":"string","valueString":"accounts@herolimited.com","text":"accounts@herolimited.com","page":1,"boundingBox":[164,479,471,479,471,503,164,503],"confidence":0.995},"Signature":{"type":"string","valueString":"Bernie Sanders","text":"Bernie Sanders","page":1,"boundingBox":[484,1670,762,1670,762,1708,484,1708],"confidence":0.995},"Subtotal":{"type":"string","valueString":"$140.00","text":"$140.00","page":1,"boundingBox":[1428,1572,1528,1572,1528,1599,1428,1599],"confidence":0.995},"VendorName":{"type":"string","valueString":"Hillary Swank","text":"Hillary Swank","page":1,"boundingBox":[349,609,520,609,520,639,349,639],"confidence":0.995},"Merchant":{"type":"string","valueString":"Hero Limited","text":"Hero Limited","page":1,"boundingBox":[620,205,1062,205,1062,266,620,266],"confidence":0.995},"Tax":{"type":"string","valueString":"$4.00","text":"$4.00","page":1,"boundingBox":[1458,1615,1529,1615,1529,1643,1458,1643],"confidence":0.995},"Quantity":{"type":"number","text":"20","page":1,"boundingBox":[860,1094,888,1094,888,1119,860,1119],"confidence":0.995},"CompanyName":{"type":"string","valueString":"Higgly Wiggly Books","text":"Higgly Wiggly Books","page":1,"boundingBox":[375,646,629,646,629,679,375,679],"confidence":0.995},"CompanyPhoneNumber":{"type":"string","valueString":"938-294-2949","text":"938-294-2949","page":1,"boundingBox":[709,722,882,722,882,749,709,749],"confidence":0.995},"Total":{"type":"string","valueString":"$144.00","text":"$144.00","page":1,"boundingBox":[1427,1669,1527,1669,1527,1698,1427,1698],"confidence":0.995},"Website":{"type":"string","valueString":"www.herolimited.com","text":"www.herolimited.com","page":1,"boundingBox":[273,393,524,393,524,418,273,418],"confidence":0.995},"CompanyAddress":{"type":"string","valueString":"938 NE Burner Road Boulder City, CO 92848","text":"938 NE Burner Road Boulder City, CO 92848","page":1,"boundingBox":[275,685,561,685,561,751,275,751],"confidence":0.995},"DatedAs":{"type":"string","valueString":"12/20/2020","text":"12/20/2020","page":1,"boundingBox":[1163,420,1310,420,1310,449,1163,449],"confidence":0.995}},"docTypeConfidence":0.92}],"errors":[]}}, [
  'Content-Length',
  '6220',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '23',
  'apim-request-id',
  'b7d41435-baf6-40c0-8c64-0f6e133f1d24',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:29:48 GMT'
]);
