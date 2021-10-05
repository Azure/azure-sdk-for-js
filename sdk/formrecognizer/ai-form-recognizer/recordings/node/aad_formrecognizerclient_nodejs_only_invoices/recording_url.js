let nock = require('nock');

module.exports.hash = "d1fb8af87a342c7e95bce7dc8d1650db";

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
  'ebe741e1-4069-492e-9599-3a59cd0a3100',
  'x-ms-ests-server',
  '2.1.12071.28 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AiROzDy0FsNKmNMuh1HWHjs; expires=Wed, 03-Nov-2021 18:21:05 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrETDwGCkdYccnBmNaN5FTgt9x0-3XhP_Aar-QHd2RchTLa7Xg_iUNkRVC8S2DT5xpuWLcr6_I4FmWeRIGk_UtNsh-Q6QLBTnD30NDmWTQMiSs3KBQ8r8I382UNmXMi-C5cmsgWKZLyB94-kHnYNite9VdGmuFYoWc_79neAxb4uUgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 04 Oct 2021 18:21:04 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/kerberos","tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  'b50b8248-d77d-45aa-922f-f1bdaa905100',
  'x-ms-ests-server',
  '2.1.12071.28 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AtUmIyZxylJIkoDbPyz3n34; expires=Wed, 03-Nov-2021 18:21:05 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrawDKaeppRRsQA1qDF8KOfd7rY8QcV0-GPC6Gszfd7GQGqmxFdg7vypzbqPnJ5pup95-tObk-BSg5T2if3oRjs7rwqf7CxxAAyY3ZU_b-E5xBVEr6b6sGLBnVp6CMpclKl3ejx2GvixOT9beK77WbM-wLa39gfCs6bYZyN_SuigEgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 04 Oct 2021 18:21:04 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.1&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=7dd5e3ba-faa8-488e-a0f2-3bb9afae0c69&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '67017a8e-809f-4ac7-b9ae-4b1b2fef5500',
  'x-ms-ests-server',
  '2.1.12071.28 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AiKFTEsyvINLv4lrMpzzeK8; expires=Wed, 03-Nov-2021 18:21:05 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 04 Oct 2021 18:21:05 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/documentModels/prebuilt-invoice:analyze', {"urlSource":"https://storageaccount/testingdata/Invoice_1.pdf?sastoken"})
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Operation-Location',
  'https://endpoint/formrecognizer/documentModels/prebuilt-invoice/analyzeResults/d30998ad-80b7-4ac9-bbd0-2701dc4db064?api-version=2021-09-30-preview',
  'x-envoy-upstream-service-time',
  '366',
  'apim-request-id',
  'd30998ad-80b7-4ac9-bbd0-2701dc4db064',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 04 Oct 2021 18:21:05 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/documentModels/prebuilt-invoice/analyzeResults/d30998ad-80b7-4ac9-bbd0-2701dc4db064')
  .query(true)
  .reply(200, {"status":"running","createdDateTime":"2021-10-04T18:21:05Z","lastUpdatedDateTime":"2021-10-04T18:21:05Z"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  '4b5323c1-7915-42cb-93ad-7feebc665b04',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 04 Oct 2021 18:21:05 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/documentModels/prebuilt-invoice/analyzeResults/d30998ad-80b7-4ac9-bbd0-2701dc4db064')
  .query(true)
  .reply(200, {"status":"running","createdDateTime":"2021-10-04T18:21:05Z","lastUpdatedDateTime":"2021-10-04T18:21:05Z"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  'bd4b8875-f99d-45ac-9b27-25fe8ee20496',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 04 Oct 2021 18:21:05 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/documentModels/prebuilt-invoice/analyzeResults/d30998ad-80b7-4ac9-bbd0-2701dc4db064')
  .query(true)
  .reply(200, {"status":"succeeded","createdDateTime":"2021-10-04T18:21:05Z","lastUpdatedDateTime":"2021-10-04T18:21:07Z","analyzeResult":{"apiVersion":"2021-09-30-preview","modelId":"prebuilt-invoice","stringIndexType":"textElements","content":"Contoso\nAddress:\nInvoice For: Microsoft\n1 Redmond way Suite\n1020 Enterprise Way\n6000 Redmond, WA\nSunnayvale, CA 87659\n99243\nInvoice Number\nInvoice Date\nInvoice Due Date\nCharges\nVAT ID\n34278587\n6/18/2017\n6/24/2017\n$56,651.49\nPT","pages":[{"pageNumber":1,"angle":0,"width":8.5,"height":11,"unit":"inch","words":[{"content":"Contoso","boundingBox":[0.5384,1.1583,1.4466,1.1583,1.4466,1.3534,0.5384,1.3534],"confidence":1,"span":{"offset":0,"length":7}},{"content":"Address:","boundingBox":[0.7994,1.5143,1.3836,1.5143,1.3836,1.6154,0.7994,1.6154],"confidence":1,"span":{"offset":8,"length":8}},{"content":"Invoice","boundingBox":[4.4033,1.5143,4.8234,1.5143,4.8234,1.6155,4.4033,1.6155],"confidence":1,"span":{"offset":17,"length":7}},{"content":"For:","boundingBox":[4.8793,1.5143,5.1013,1.5143,5.1013,1.6154,4.8793,1.6154],"confidence":1,"span":{"offset":25,"length":4}},{"content":"Microsoft","boundingBox":[5.2045,1.5114,5.8155,1.5114,5.8155,1.6151,5.2045,1.6151],"confidence":1,"span":{"offset":30,"length":9}},{"content":"1","boundingBox":[0.8106,1.708,0.8463,1.708,0.8463,1.8053,0.8106,1.8053],"confidence":1,"span":{"offset":40,"length":1}},{"content":"Redmond","boundingBox":[0.923,1.7047,1.5018,1.7047,1.5018,1.8068,0.923,1.8068],"confidence":1,"span":{"offset":42,"length":7}},{"content":"way","boundingBox":[1.5506,1.7309,1.7949,1.7309,1.7949,1.8342,1.5506,1.8342],"confidence":1,"span":{"offset":50,"length":3}},{"content":"Suite","boundingBox":[1.8415,1.7033,2.1445,1.7033,2.1445,1.8078,1.8415,1.8078],"confidence":1,"span":{"offset":54,"length":5}},{"content":"1020","boundingBox":[5.2036,1.716,5.4935,1.716,5.4935,1.8185,5.2036,1.8185],"confidence":1,"span":{"offset":60,"length":4}},{"content":"Enterprise","boundingBox":[5.5488,1.7164,6.2178,1.7164,6.2178,1.8441,5.5488,1.8441],"confidence":1,"span":{"offset":65,"length":10}},{"content":"Way","boundingBox":[6.2618,1.7164,6.5436,1.7164,6.5436,1.8459,6.2618,1.8459],"confidence":1,"span":{"offset":76,"length":3}},{"content":"6000","boundingBox":[0.8019,1.896,1.0991,1.896,1.0991,1.9994,0.8019,1.9994],"confidence":1,"span":{"offset":80,"length":4}},{"content":"Redmond,","boundingBox":[1.1537,1.8964,1.7689,1.8964,1.7689,2.0171,1.1537,2.0171],"confidence":1,"span":{"offset":85,"length":8}},{"content":"WA","boundingBox":[1.8196,1.8976,2.0384,1.8976,2.0384,1.9969,1.8196,1.9969],"confidence":1,"span":{"offset":94,"length":2}},{"content":"Sunnayvale,","boundingBox":[5.196,1.9047,5.9894,1.9047,5.9894,2.0359,5.196,2.0359],"confidence":1,"span":{"offset":97,"length":11}},{"content":"CA","boundingBox":[6.0427,1.9047,6.2354,1.9047,6.2354,2.0085,6.0427,2.0085],"confidence":1,"span":{"offset":109,"length":2}},{"content":"87659","boundingBox":[6.2801,1.906,6.6526,1.906,6.6526,2.0086,6.2801,2.0086],"confidence":1,"span":{"offset":112,"length":5}},{"content":"99243","boundingBox":[0.8025,2.0876,1.175,2.0876,1.175,2.1911,0.8025,2.1911],"confidence":1,"span":{"offset":118,"length":5}},{"content":"Invoice","boundingBox":[0.5439,2.8733,1.0098,2.8733,1.0098,2.9754,0.5439,2.9754],"confidence":1,"span":{"offset":124,"length":7}},{"content":"Number","boundingBox":[1.0611,2.8743,1.5729,2.8743,1.5729,2.9754,1.0611,2.9754],"confidence":1,"span":{"offset":132,"length":6}},{"content":"Invoice","boundingBox":[1.9491,2.8733,2.415,2.8733,2.415,2.9754,1.9491,2.9754],"confidence":1,"span":{"offset":139,"length":7}},{"content":"Date","boundingBox":[2.4673,2.8743,2.7527,2.8743,2.7527,2.9754,2.4673,2.9754],"confidence":1,"span":{"offset":147,"length":4}},{"content":"Invoice","boundingBox":[3.3495,2.8733,3.8155,2.8733,3.8155,2.9754,3.3495,2.9754],"confidence":1,"span":{"offset":152,"length":7}},{"content":"Due","boundingBox":[3.8677,2.8743,4.1149,2.8743,4.1149,2.9754,3.8677,2.9754],"confidence":1,"span":{"offset":160,"length":3}},{"content":"Date","boundingBox":[4.1678,2.8743,4.4547,2.8743,4.4547,2.9754,4.1678,2.9754],"confidence":1,"span":{"offset":164,"length":4}},{"content":"Charges","boundingBox":[4.7468,2.8717,5.289,2.8717,5.289,3.0035,4.7468,3.0035],"confidence":1,"span":{"offset":169,"length":7}},{"content":"VAT","boundingBox":[6.141,2.873,6.4147,2.873,6.4147,2.9736,6.141,2.9736],"confidence":1,"span":{"offset":177,"length":3}},{"content":"ID","boundingBox":[6.4655,2.873,6.5875,2.873,6.5875,2.9736,6.4655,2.9736],"confidence":1,"span":{"offset":181,"length":2}},{"content":"34278587","boundingBox":[0.5397,3.411,1.1457,3.411,1.1457,3.5144,0.5397,3.5144],"confidence":1,"span":{"offset":184,"length":8}},{"content":"6/18/2017","boundingBox":[1.9455,3.41,2.551,3.41,2.551,3.5144,1.9455,3.5144],"confidence":1,"span":{"offset":193,"length":9}},{"content":"6/24/2017","boundingBox":[3.346,3.41,3.9514,3.41,3.9514,3.5144,3.346,3.5144],"confidence":1,"span":{"offset":203,"length":9}},{"content":"$56,651.49","boundingBox":[5.3871,3.4047,6.0702,3.4047,6.0702,3.5321,5.3871,3.5321],"confidence":1,"span":{"offset":213,"length":10}},{"content":"PT","boundingBox":[6.2285,3.4114,6.3919,3.4114,6.3919,3.5119,6.2285,3.5119],"confidence":1,"span":{"offset":224,"length":2}}],"selectionMarks":[],"lines":[{"content":"Contoso","boundingBox":[0.5384,1.1583,1.4466,1.1583,1.4466,1.3534,0.5384,1.3534],"spans":[{"offset":0,"length":7}]},{"content":"Address:","boundingBox":[0.7994,1.5143,1.3836,1.5143,1.3836,1.6154,0.7994,1.6154],"spans":[{"offset":8,"length":8}]},{"content":"Invoice For: Microsoft","boundingBox":[4.4033,1.5114,5.8155,1.5114,5.8155,1.6155,4.4033,1.6155],"spans":[{"offset":17,"length":22}]},{"content":"1 Redmond way Suite","boundingBox":[0.8106,1.7033,2.1445,1.7033,2.1445,1.8342,0.8106,1.8342],"spans":[{"offset":40,"length":19}]},{"content":"1020 Enterprise Way","boundingBox":[5.2036,1.716,6.5436,1.716,6.5436,1.8459,5.2036,1.8459],"spans":[{"offset":60,"length":19}]},{"content":"6000 Redmond, WA","boundingBox":[0.8019,1.896,2.0384,1.896,2.0384,2.0171,0.8019,2.0171],"spans":[{"offset":80,"length":16}]},{"content":"Sunnayvale, CA 87659","boundingBox":[5.196,1.9047,6.6526,1.9047,6.6526,2.0359,5.196,2.0359],"spans":[{"offset":97,"length":20}]},{"content":"99243","boundingBox":[0.8025,2.0876,1.175,2.0876,1.175,2.1911,0.8025,2.1911],"spans":[{"offset":118,"length":5}]},{"content":"Invoice Number","boundingBox":[0.5439,2.8733,1.5729,2.8733,1.5729,2.9754,0.5439,2.9754],"spans":[{"offset":124,"length":14}]},{"content":"Invoice Date","boundingBox":[1.9491,2.8733,2.7527,2.8733,2.7527,2.9754,1.9491,2.9754],"spans":[{"offset":139,"length":12}]},{"content":"Invoice Due Date","boundingBox":[3.3495,2.8733,4.4547,2.8733,4.4547,2.9754,3.3495,2.9754],"spans":[{"offset":152,"length":16}]},{"content":"Charges","boundingBox":[4.7468,2.8717,5.289,2.8717,5.289,3.0035,4.7468,3.0035],"spans":[{"offset":169,"length":7}]},{"content":"VAT ID","boundingBox":[6.141,2.873,6.5875,2.873,6.5875,2.9736,6.141,2.9736],"spans":[{"offset":177,"length":6}]},{"content":"34278587","boundingBox":[0.5397,3.411,1.1457,3.411,1.1457,3.5144,0.5397,3.5144],"spans":[{"offset":184,"length":8}]},{"content":"6/18/2017","boundingBox":[1.9455,3.41,2.551,3.41,2.551,3.5144,1.9455,3.5144],"spans":[{"offset":193,"length":9}]},{"content":"6/24/2017","boundingBox":[3.346,3.41,3.9514,3.41,3.9514,3.5144,3.346,3.5144],"spans":[{"offset":203,"length":9}]},{"content":"$56,651.49","boundingBox":[5.3871,3.4047,6.0702,3.4047,6.0702,3.5321,5.3871,3.5321],"spans":[{"offset":213,"length":10}]},{"content":"PT","boundingBox":[6.2285,3.4114,6.3919,3.4114,6.3919,3.5119,6.2285,3.5119],"spans":[{"offset":224,"length":2}]}],"spans":[{"offset":0,"length":226}]}],"tables":[{"rowCount":3,"columnCount":5,"cells":[{"kind":"columnHeader","rowIndex":0,"columnIndex":0,"rowSpan":1,"columnSpan":1,"content":"Invoice Number","boundingRegions":[{"pageNumber":1,"boundingBox":[0.497,2.7887,1.9036,2.7887,1.8965,3.3133,0.5041,3.3133]}],"spans":[{"offset":124,"length":14}]},{"kind":"columnHeader","rowIndex":0,"columnIndex":1,"rowSpan":1,"columnSpan":1,"content":"Invoice Date","boundingRegions":[{"pageNumber":1,"boundingBox":[1.9036,2.7887,3.296,2.7887,3.3031,3.3205,1.8965,3.3133]}],"spans":[{"offset":139,"length":12}]},{"kind":"columnHeader","rowIndex":0,"columnIndex":2,"rowSpan":1,"columnSpan":1,"content":"Invoice Due Date","boundingRegions":[{"pageNumber":1,"boundingBox":[3.296,2.7887,4.7026,2.7887,4.7026,3.3205,3.3031,3.3205]}],"spans":[{"offset":152,"length":16}]},{"kind":"columnHeader","rowIndex":0,"columnIndex":3,"rowSpan":1,"columnSpan":1,"content":"Charges","boundingRegions":[{"pageNumber":1,"boundingBox":[4.7026,2.7887,6.1021,2.7887,6.1021,3.3133,4.7026,3.3205]}],"spans":[{"offset":169,"length":7}]},{"kind":"columnHeader","rowIndex":0,"columnIndex":4,"rowSpan":1,"columnSpan":1,"content":"VAT ID","boundingRegions":[{"pageNumber":1,"boundingBox":[6.1021,2.7887,7.4945,2.7887,7.4945,3.3133,6.1021,3.3133]}],"spans":[{"offset":177,"length":6}]},{"rowIndex":1,"columnIndex":0,"rowSpan":2,"columnSpan":1,"content":"34278587","boundingRegions":[{"pageNumber":1,"boundingBox":[0.5041,3.3133,1.8965,3.3133,1.8965,3.8523,0.5113,3.8523]}],"spans":[{"offset":184,"length":8}]},{"rowIndex":1,"columnIndex":1,"rowSpan":2,"columnSpan":1,"content":"6/18/2017","boundingRegions":[{"pageNumber":1,"boundingBox":[1.8965,3.3133,3.3031,3.3205,3.3031,3.8523,1.8965,3.8523]}],"spans":[{"offset":193,"length":9}]},{"rowIndex":1,"columnIndex":2,"rowSpan":2,"columnSpan":1,"content":"6/24/2017","boundingRegions":[{"pageNumber":1,"boundingBox":[3.3031,3.3205,4.7026,3.3205,4.7026,3.8523,3.3031,3.8523]}],"spans":[{"offset":203,"length":9}]},{"rowIndex":1,"columnIndex":3,"rowSpan":2,"columnSpan":1,"content":"$56,651.49","boundingRegions":[{"pageNumber":1,"boundingBox":[4.7026,3.3205,6.1021,3.3133,6.1021,3.8523,4.7026,3.8523]}],"spans":[{"offset":213,"length":10}]},{"rowIndex":1,"columnIndex":4,"rowSpan":2,"columnSpan":1,"content":"PT","boundingRegions":[{"pageNumber":1,"boundingBox":[6.1021,3.3133,7.4945,3.3133,7.4945,3.8523,6.1021,3.8523]}],"spans":[{"offset":224,"length":2}]}],"boundingRegions":[{"pageNumber":1,"boundingBox":[0.5052,2.7836,7.4995,2.7844,7.4985,3.8596,0.5038,3.859]}],"spans":[{"offset":124,"length":102}]}],"documents":[{"docType":"prebuilt:invoice","boundingRegions":[{"pageNumber":1,"boundingBox":[0,0,8.5,0,8.5,11,0,11]}],"fields":{"CustomerAddress":{"type":"string","valueString":"1020 Enterprise Way Sunnayvale, CA 87659","content":"1020 Enterprise Way Sunnayvale, CA 87659","boundingRegions":[{"pageNumber":1,"boundingBox":[5.196,1.716,6.6526,1.716,6.6526,2.0359,5.196,2.0359]}],"confidence":0.98,"spans":[{"offset":60,"length":19},{"offset":97,"length":20}]},"CustomerAddressRecipient":{"type":"string","valueString":"Microsoft","content":"Microsoft","boundingRegions":[{"pageNumber":1,"boundingBox":[5.2045,1.5114,5.8155,1.5114,5.8155,1.6151,5.2045,1.6151]}],"confidence":0.981,"spans":[{"offset":30,"length":9}]},"CustomerName":{"type":"string","valueString":"Microsoft","content":"Microsoft","boundingRegions":[{"pageNumber":1,"boundingBox":[5.2045,1.5114,5.8155,1.5114,5.8155,1.6151,5.2045,1.6151]}],"confidence":0.981,"spans":[{"offset":30,"length":9}]},"DueDate":{"type":"date","valueDate":"2017-06-24","content":"6/24/2017","boundingRegions":[{"pageNumber":1,"boundingBox":[3.346,3.41,3.9514,3.41,3.9514,3.5144,3.346,3.5144]}],"confidence":0.981,"spans":[{"offset":203,"length":9}]},"InvoiceDate":{"type":"date","valueDate":"2017-06-18","content":"6/18/2017","boundingRegions":[{"pageNumber":1,"boundingBox":[1.9455,3.41,2.551,3.41,2.551,3.5144,1.9455,3.5144]}],"confidence":0.968,"spans":[{"offset":193,"length":9}]},"InvoiceId":{"type":"string","valueString":"34278587","content":"34278587","boundingRegions":[{"pageNumber":1,"boundingBox":[0.5397,3.411,1.1457,3.411,1.1457,3.5144,0.5397,3.5144]}],"confidence":0.973,"spans":[{"offset":184,"length":8}]},"Items":{"type":"array","valueArray":[{"type":"object","valueObject":{"Amount":{"type":"number","valueNumber":56651.49,"content":"$56,651.49","boundingRegions":[{"pageNumber":1,"boundingBox":[5.3871,3.4047,6.0702,3.4047,6.0702,3.5321,5.3871,3.5321]}],"confidence":0.783,"spans":[{"offset":213,"length":10}]},"Date":{"type":"date","valueDate":"2017-06-18","content":"6/18/2017","boundingRegions":[{"pageNumber":1,"boundingBox":[1.9455,3.41,2.551,3.41,2.551,3.5144,1.9455,3.5144]}],"confidence":0.287,"spans":[{"offset":193,"length":9}]},"ProductCode":{"type":"string","valueString":"34278587","content":"34278587","boundingRegions":[{"pageNumber":1,"boundingBox":[0.5397,3.411,1.1457,3.411,1.1457,3.5144,0.5397,3.5144]}],"confidence":0.646,"spans":[{"offset":184,"length":8}]},"Tax":{"type":"number","content":"PT","boundingRegions":[{"pageNumber":1,"boundingBox":[6.2285,3.4114,6.3919,3.4114,6.3919,3.5119,6.2285,3.5119]}],"confidence":0.692,"spans":[{"offset":224,"length":2}]}},"content":"34278587 6/18/2017 6/24/2017 $56,651.49 PT","boundingRegions":[{"pageNumber":1,"boundingBox":[0.5397,3.4047,6.3919,3.4047,6.3919,3.5321,0.5397,3.5321]}],"confidence":0.399,"spans":[{"offset":184,"length":42}]}]},"Locale":{"type":"string","valueString":"en-US","confidence":1},"VendorAddress":{"type":"string","valueString":"1 Redmond way Suite 6000 Redmond, WA 99243","content":"1 Redmond way Suite 6000 Redmond, WA 99243","boundingRegions":[{"pageNumber":1,"boundingBox":[0.8019,1.7033,2.1445,1.7033,2.1445,2.1911,0.8019,2.1911]}],"confidence":0.993,"spans":[{"offset":40,"length":19},{"offset":80,"length":16},{"offset":118,"length":5}]},"VendorName":{"type":"string","valueString":"Contoso","content":"Contoso","boundingRegions":[{"pageNumber":1,"boundingBox":[0.5384,1.1583,1.4466,1.1583,1.4466,1.3534,0.5384,1.3534]}],"confidence":0.981,"spans":[{"offset":0,"length":7}]}},"confidence":1,"spans":[{"offset":0,"length":226}]}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '80',
  'apim-request-id',
  '2ef4988d-b644-4bd6-b033-e22d3c571075',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 04 Oct 2021 18:21:10 GMT'
]);
