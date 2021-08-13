let nock = require('nock');

module.exports.hash = "deca7273d3f7bd05b639edc786eb0271";

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
  '49f867cb-85e9-4e4c-9e7a-abe69bf63801',
  'x-ms-ests-server',
  '2.1.11722.21 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=ApkDqNpQ57tNkXRRzlIgAuCU1ubLBwAAAEU0P9gOAAAA; expires=Thu, 24-Jun-2021 18:10:29 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrPZgmIFhQ_J1ENNgjqIeAt4jLthcsU3SF_WFZ6ct3tcyvwHRN0zDCQACy0Yrw3aPqK9E5_NV-l15zJbotKC7mht0X13NabOqiUp4EOABXq_iOlJOp1SS23P7hCtufYzmL-llQMDeLL2uebhtTLgLtJQyr1nj-thSf6TyGtdKzRLMgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 25 May 2021 18:10:29 GMT',
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
  'b6c86b12-a090-4072-861f-d3ec24d81f00',
  'x-ms-ests-server',
  '2.1.11774.11 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=ApkDqNpQ57tNkXRRzlIgAuCU1ubLBwAAAEU0P9gOAAAA; expires=Thu, 24-Jun-2021 18:10:29 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrUKnX3x0i6LsHlvT7-xp3rX5mVVfuSP5VFN_mJPJVo8XHbkh7yDwQItxW47c8AuBWNF9eIZV-00LoMPeUQ_4bQdMGYzJS5uGqqCJhSZTbcwrDtSfZUin5lOewqiVGRDF78ReaJxFSTtz-pc1CtQt1_HXvPCMXM7n2hx3i8sFkwZsgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 25 May 2021 18:10:29 GMT',
  'Content-Length',
  '1651'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default%20openid%20profile%20offline_access&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.1.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=2|771,0|,&x-client-last-telemetry=2|0|||0,0&client-request-id=51a9febd-cb1a-4c97-b96c-ef54ec70c78f&client_secret=azure_client_secret")
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
  '8e1b9f54-0d6c-49f5-b24f-045d74b91d00',
  'x-ms-ests-server',
  '2.1.11774.11 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=ApkDqNpQ57tNkXRRzlIgAuCU1ubLCAAAAEU0P9gOAAAA; expires=Thu, 24-Jun-2021 18:10:29 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 25 May 2021 18:10:29 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1/layout/analyze', {"source":"https://storageaccount/testingdata/Invoice_1.pdf?sastoken"})
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Operation-Location',
  'https://endpoint/formrecognizer/v2.1/layout/analyzeResults/591c62ea-c6c1-409a-957d-7e5d2f32729b',
  'x-envoy-upstream-service-time',
  '484',
  'apim-request-id',
  '591c62ea-c6c1-409a-957d-7e5d2f32729b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:10:29 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/layout/analyzeResults/591c62ea-c6c1-409a-957d-7e5d2f32729b')
  .reply(200, {"status":"running","createdDateTime":"2021-05-25T18:10:30Z","lastUpdatedDateTime":"2021-05-25T18:10:30Z"}, [
  'Content-Length',
  '106',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  '2429224a-ec1b-4818-ba5c-aa2647ca5abe',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:10:29 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/layout/analyzeResults/591c62ea-c6c1-409a-957d-7e5d2f32729b')
  .reply(200, {"status":"running","createdDateTime":"2021-05-25T18:10:30Z","lastUpdatedDateTime":"2021-05-25T18:10:30Z"}, [
  'Content-Length',
  '106',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  'f2ff86d4-6f88-4255-9444-ee5869a992ad',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:10:29 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/layout/analyzeResults/591c62ea-c6c1-409a-957d-7e5d2f32729b')
  .reply(200, {"status":"succeeded","createdDateTime":"2021-05-25T18:10:30Z","lastUpdatedDateTime":"2021-05-25T18:10:33Z","analyzeResult":{"version":"2.1.0","readResults":[{"page":1,"angle":0,"width":8.5,"height":11,"unit":"inch","language":"en","lines":[{"boundingBox":[0.5384,1.1583,1.4466,1.1583,1.4466,1.3534,0.5384,1.3534],"text":"Contoso","appearance":{"style":{"name":"other","confidence":1}},"words":[{"boundingBox":[0.5384,1.1583,1.4466,1.1583,1.4466,1.3534,0.5384,1.3534],"text":"Contoso","confidence":1}]},{"boundingBox":[0.7994,1.5143,1.3836,1.5143,1.3836,1.6154,0.7994,1.6154],"text":"Address:","appearance":{"style":{"name":"other","confidence":1}},"words":[{"boundingBox":[0.7994,1.5143,1.3836,1.5143,1.3836,1.6154,0.7994,1.6154],"text":"Address:","confidence":1}]},{"boundingBox":[4.4033,1.5114,5.8155,1.5114,5.8155,1.6155,4.4033,1.6155],"text":"Invoice For: Microsoft","appearance":{"style":{"name":"other","confidence":1}},"words":[{"boundingBox":[4.4033,1.5143,4.8234,1.5143,4.8234,1.6155,4.4033,1.6155],"text":"Invoice","confidence":1},{"boundingBox":[4.8793,1.5143,5.1013,1.5143,5.1013,1.6154,4.8793,1.6154],"text":"For:","confidence":1},{"boundingBox":[5.2045,1.5114,5.8155,1.5114,5.8155,1.6151,5.2045,1.6151],"text":"Microsoft","confidence":1}]},{"boundingBox":[0.8106,1.7033,2.1445,1.7033,2.1445,1.8342,0.8106,1.8342],"text":"1 Redmond way Suite","appearance":{"style":{"name":"other","confidence":1}},"words":[{"boundingBox":[0.8106,1.708,0.8463,1.708,0.8463,1.8053,0.8106,1.8053],"text":"1","confidence":1},{"boundingBox":[0.923,1.7047,1.5018,1.7047,1.5018,1.8068,0.923,1.8068],"text":"Redmond","confidence":1},{"boundingBox":[1.5506,1.7309,1.7949,1.7309,1.7949,1.8342,1.5506,1.8342],"text":"way","confidence":1},{"boundingBox":[1.8415,1.7033,2.1445,1.7033,2.1445,1.8078,1.8415,1.8078],"text":"Suite","confidence":1}]},{"boundingBox":[5.2036,1.716,6.5436,1.716,6.5436,1.8459,5.2036,1.8459],"text":"1020 Enterprise Way","appearance":{"style":{"name":"other","confidence":1}},"words":[{"boundingBox":[5.2036,1.716,5.4935,1.716,5.4935,1.8185,5.2036,1.8185],"text":"1020","confidence":1},{"boundingBox":[5.5488,1.7164,6.2178,1.7164,6.2178,1.8441,5.5488,1.8441],"text":"Enterprise","confidence":1},{"boundingBox":[6.2618,1.7164,6.5436,1.7164,6.5436,1.8459,6.2618,1.8459],"text":"Way","confidence":1}]},{"boundingBox":[0.8019,1.896,2.0384,1.896,2.0384,2.0171,0.8019,2.0171],"text":"6000 Redmond, WA","appearance":{"style":{"name":"other","confidence":1}},"words":[{"boundingBox":[0.8019,1.896,1.0991,1.896,1.0991,1.9994,0.8019,1.9994],"text":"6000","confidence":1},{"boundingBox":[1.1537,1.8964,1.7689,1.8964,1.7689,2.0171,1.1537,2.0171],"text":"Redmond,","confidence":1},{"boundingBox":[1.8196,1.8976,2.0384,1.8976,2.0384,1.9969,1.8196,1.9969],"text":"WA","confidence":1}]},{"boundingBox":[5.196,1.9047,6.6526,1.9047,6.6526,2.0359,5.196,2.0359],"text":"Sunnayvale, CA 87659","appearance":{"style":{"name":"other","confidence":1}},"words":[{"boundingBox":[5.196,1.9047,5.9894,1.9047,5.9894,2.0359,5.196,2.0359],"text":"Sunnayvale,","confidence":1},{"boundingBox":[6.0427,1.9047,6.2354,1.9047,6.2354,2.0085,6.0427,2.0085],"text":"CA","confidence":1},{"boundingBox":[6.2801,1.906,6.6526,1.906,6.6526,2.0086,6.2801,2.0086],"text":"87659","confidence":1}]},{"boundingBox":[0.8025,2.0876,1.175,2.0876,1.175,2.1911,0.8025,2.1911],"text":"99243","appearance":{"style":{"name":"other","confidence":1}},"words":[{"boundingBox":[0.8025,2.0876,1.175,2.0876,1.175,2.1911,0.8025,2.1911],"text":"99243","confidence":1}]},{"boundingBox":[0.5439,2.8733,1.5729,2.8733,1.5729,2.9754,0.5439,2.9754],"text":"Invoice Number","appearance":{"style":{"name":"other","confidence":1}},"words":[{"boundingBox":[0.5439,2.8733,1.0098,2.8733,1.0098,2.9754,0.5439,2.9754],"text":"Invoice","confidence":1},{"boundingBox":[1.0611,2.8743,1.5729,2.8743,1.5729,2.9754,1.0611,2.9754],"text":"Number","confidence":1}]},{"boundingBox":[1.9491,2.8733,2.7527,2.8733,2.7527,2.9754,1.9491,2.9754],"text":"Invoice Date","appearance":{"style":{"name":"other","confidence":1}},"words":[{"boundingBox":[1.9491,2.8733,2.415,2.8733,2.415,2.9754,1.9491,2.9754],"text":"Invoice","confidence":1},{"boundingBox":[2.4673,2.8743,2.7527,2.8743,2.7527,2.9754,2.4673,2.9754],"text":"Date","confidence":1}]},{"boundingBox":[3.3495,2.8733,4.4547,2.8733,4.4547,2.9754,3.3495,2.9754],"text":"Invoice Due Date","appearance":{"style":{"name":"other","confidence":1}},"words":[{"boundingBox":[3.3495,2.8733,3.8155,2.8733,3.8155,2.9754,3.3495,2.9754],"text":"Invoice","confidence":1},{"boundingBox":[3.8677,2.8743,4.1149,2.8743,4.1149,2.9754,3.8677,2.9754],"text":"Due","confidence":1},{"boundingBox":[4.1678,2.8743,4.4547,2.8743,4.4547,2.9754,4.1678,2.9754],"text":"Date","confidence":1}]},{"boundingBox":[4.7468,2.8717,5.289,2.8717,5.289,3.0035,4.7468,3.0035],"text":"Charges","appearance":{"style":{"name":"other","confidence":1}},"words":[{"boundingBox":[4.7468,2.8717,5.289,2.8717,5.289,3.0035,4.7468,3.0035],"text":"Charges","confidence":1}]},{"boundingBox":[6.141,2.873,6.5875,2.873,6.5875,2.9736,6.141,2.9736],"text":"VAT ID","appearance":{"style":{"name":"other","confidence":1}},"words":[{"boundingBox":[6.141,2.873,6.4147,2.873,6.4147,2.9736,6.141,2.9736],"text":"VAT","confidence":1},{"boundingBox":[6.4655,2.873,6.5875,2.873,6.5875,2.9736,6.4655,2.9736],"text":"ID","confidence":1}]},{"boundingBox":[0.5397,3.411,1.1457,3.411,1.1457,3.5144,0.5397,3.5144],"text":"34278587","appearance":{"style":{"name":"other","confidence":1}},"words":[{"boundingBox":[0.5397,3.411,1.1457,3.411,1.1457,3.5144,0.5397,3.5144],"text":"34278587","confidence":1}]},{"boundingBox":[1.9455,3.41,2.551,3.41,2.551,3.5144,1.9455,3.5144],"text":"6/18/2017","appearance":{"style":{"name":"other","confidence":1}},"words":[{"boundingBox":[1.9455,3.41,2.551,3.41,2.551,3.5144,1.9455,3.5144],"text":"6/18/2017","confidence":1}]},{"boundingBox":[3.346,3.41,3.9514,3.41,3.9514,3.5144,3.346,3.5144],"text":"6/24/2017","appearance":{"style":{"name":"other","confidence":1}},"words":[{"boundingBox":[3.346,3.41,3.9514,3.41,3.9514,3.5144,3.346,3.5144],"text":"6/24/2017","confidence":1}]},{"boundingBox":[5.3871,3.4047,6.0702,3.4047,6.0702,3.5321,5.3871,3.5321],"text":"$56,651.49","appearance":{"style":{"name":"other","confidence":1}},"words":[{"boundingBox":[5.3871,3.4047,6.0702,3.4047,6.0702,3.5321,5.3871,3.5321],"text":"$56,651.49","confidence":1}]},{"boundingBox":[6.2285,3.4114,6.3919,3.4114,6.3919,3.5119,6.2285,3.5119],"text":"PT","appearance":{"style":{"name":"other","confidence":1}},"words":[{"boundingBox":[6.2285,3.4114,6.3919,3.4114,6.3919,3.5119,6.2285,3.5119],"text":"PT","confidence":1}]}]}],"pageResults":[{"page":1,"tables":[{"rows":3,"columns":5,"cells":[{"rowIndex":0,"columnIndex":0,"text":"Invoice Number","boundingBox":[0.4992,2.7829,1.8978,2.79,1.8978,3.3181,0.5064,3.3181],"elements":["#/readResults/0/lines/8/words/0","#/readResults/0/lines/8/words/1"],"isHeader":true},{"rowIndex":0,"columnIndex":1,"text":"Invoice Date","boundingBox":[1.8978,2.79,3.3036,2.79,3.3036,3.3181,1.8978,3.3181],"elements":["#/readResults/0/lines/9/words/0","#/readResults/0/lines/9/words/1"],"isHeader":true},{"rowIndex":0,"columnIndex":2,"text":"Invoice Due Date","boundingBox":[3.3036,2.79,4.7022,2.79,4.7022,3.3181,3.3036,3.3181],"elements":["#/readResults/0/lines/10/words/0","#/readResults/0/lines/10/words/1","#/readResults/0/lines/10/words/2"],"isHeader":true},{"rowIndex":0,"columnIndex":3,"text":"Charges","boundingBox":[4.7022,2.79,6.1008,2.79,6.1008,3.3181,4.7022,3.3181],"elements":["#/readResults/0/lines/11/words/0"],"isHeader":true},{"rowIndex":0,"columnIndex":4,"text":"VAT ID","boundingBox":[6.1008,2.79,7.4994,2.79,7.4994,3.3181,6.1008,3.3181],"elements":["#/readResults/0/lines/12/words/0","#/readResults/0/lines/12/words/1"],"isHeader":true},{"rowIndex":1,"columnIndex":0,"rowSpan":2,"text":"34278587","boundingBox":[0.5064,3.3181,1.8978,3.3181,1.8978,3.8534,0.5064,3.8534],"elements":["#/readResults/0/lines/13/words/0"],"isHeader":false},{"rowIndex":1,"columnIndex":1,"rowSpan":2,"text":"6/18/2017","boundingBox":[1.8978,3.3181,3.3036,3.3181,3.3036,3.8534,1.8978,3.8534],"elements":["#/readResults/0/lines/14/words/0"],"isHeader":false},{"rowIndex":1,"columnIndex":2,"rowSpan":2,"text":"6/24/2017","boundingBox":[3.3036,3.3181,4.7022,3.3181,4.7022,3.8534,3.3036,3.8534],"elements":["#/readResults/0/lines/15/words/0"],"isHeader":false},{"rowIndex":1,"columnIndex":3,"rowSpan":2,"text":"$56,651.49","boundingBox":[4.7022,3.3181,6.1008,3.3181,6.1008,3.8534,4.7022,3.8534],"elements":["#/readResults/0/lines/16/words/0"],"isHeader":false},{"rowIndex":1,"columnIndex":4,"rowSpan":2,"text":"PT","boundingBox":[6.1008,3.3181,7.4994,3.3181,7.4994,3.8534,6.1008,3.8534],"elements":["#/readResults/0/lines/17/words/0"],"isHeader":false}],"boundingBox":[0.4985,2.7802,7.4933,2.7816,7.4913,3.8459,0.4966,3.8447]}]}]}}, [
  'Content-Length',
  '8937',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '20',
  'apim-request-id',
  '3a6ba7b8-2662-4269-9cff-57008b404c96',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:10:34 GMT'
]);
