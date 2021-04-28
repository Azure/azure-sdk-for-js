let nock = require('nock');

module.exports.hash = "27bbf433f8a542c74ab454ac3f4ec88b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
  'Cache-Control',
  'max-age=86400, private',
  'Content-Length',
  '980',
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
  '90b22e01-5b19-4eb7-a0f8-729b5ddb4700',
  'x-ms-ests-server',
  '2.1.11654.16 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AgRLK_yyL-BMiLhMpVRBz8rGLH8mDAAAAFyuG9gOAAAA; expires=Fri, 28-May-2021 19:33:13 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr_LMzLI9cJ1YhZ2xa3_oACa5er7OcmYq2lqnx9YLN1aPZB33xSIu5GoCihjpYHTpmYh2db9AnkR_8iSG2zYCo-f20nSB3DGDz7wlgDyjSibtO6nKnAM9deohyaMBMuOEJmgQM2c0HvLweFlQmiCHemo0ZYjYXGM6CSM4fwSUTA6sgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 19:33:12 GMT'
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
  '28e58245-a974-410e-a622-190faf742900',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AgRLK_yyL-BMiLhMpVRBz8rGLH8mDAAAAFyuG9gOAAAA; expires=Fri, 28-May-2021 19:33:13 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrR6kKz4utpeYyy-R3WAcx89FHN60lDSx4WgN52UwQUPjL5sRCfgRGbhferGMFNrsp80_vpg90V-8grq4L94b9NKkXE1wU3FipI1b3389H6U11Fm9YkzAFrq6sfGtFBNowvUssttuYaz52vf2K8kGJ2_8CoapJU7V8N_z_IRgd_KcgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 19:33:12 GMT',
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
  'Content-Length',
  '1331',
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
  'bd623507-ae28-489c-88a4-126175b6d801',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AgRLK_yyL-BMiLhMpVRBz8rGLH8mDAAAAFyuG9gOAAAA; expires=Fri, 28-May-2021 19:33:13 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 19:33:12 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.3/layout/analyze', {"source":"https://storageaccount/testingdata/Invoice_1.pdf?sastoken"})
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Operation-Location',
  'https://endpoint/formrecognizer/v2.1-preview.3/layout/analyzeResults/fd9cc54c-4b89-4fd1-8e1b-5597b682717a',
  'x-envoy-upstream-service-time',
  '643',
  'apim-request-id',
  'fd9cc54c-4b89-4fd1-8e1b-5597b682717a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:33:13 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/layout/analyzeResults/fd9cc54c-4b89-4fd1-8e1b-5597b682717a')
  .reply(200, {"status":"running","createdDateTime":"2021-04-28T19:33:13Z","lastUpdatedDateTime":"2021-04-28T19:33:13Z"}, [
  'Content-Length',
  '106',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  '716c3d59-1a05-435e-8400-0696255b3ff7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:33:13 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/layout/analyzeResults/fd9cc54c-4b89-4fd1-8e1b-5597b682717a')
  .reply(200, {"status":"running","createdDateTime":"2021-04-28T19:33:13Z","lastUpdatedDateTime":"2021-04-28T19:33:13Z"}, [
  'Content-Length',
  '106',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '64d33d4b-f9e1-4522-81e9-e46c42606ef1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:33:13 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/layout/analyzeResults/fd9cc54c-4b89-4fd1-8e1b-5597b682717a')
  .reply(200, {"status":"succeeded","createdDateTime":"2021-04-28T19:33:13Z","lastUpdatedDateTime":"2021-04-28T19:33:17Z","analyzeResult":{"version":"2.1.0","readResults":[{"page":1,"angle":0,"width":8.5,"height":11,"unit":"inch","lines":[{"boundingBox":[0.5384,1.1583,1.4466,1.1583,1.4466,1.3534,0.5384,1.3534],"text":"Contoso","appearance":{"style":{"name":"other","confidence":1}},"words":[{"boundingBox":[0.5384,1.1583,1.4466,1.1583,1.4466,1.3534,0.5384,1.3534],"text":"Contoso","confidence":1}]},{"boundingBox":[0.7994,1.5143,1.3836,1.5143,1.3836,1.6154,0.7994,1.6154],"text":"Address:","appearance":{"style":{"name":"other","confidence":1}},"words":[{"boundingBox":[0.7994,1.5143,1.3836,1.5143,1.3836,1.6154,0.7994,1.6154],"text":"Address:","confidence":1}]},{"boundingBox":[4.4033,1.5114,5.8155,1.5114,5.8155,1.6155,4.4033,1.6155],"text":"Invoice For: Microsoft","appearance":{"style":{"name":"other","confidence":1}},"words":[{"boundingBox":[4.4033,1.5143,4.8234,1.5143,4.8234,1.6155,4.4033,1.6155],"text":"Invoice","confidence":1},{"boundingBox":[4.8793,1.5143,5.1013,1.5143,5.1013,1.6154,4.8793,1.6154],"text":"For:","confidence":1},{"boundingBox":[5.2045,1.5114,5.8155,1.5114,5.8155,1.6151,5.2045,1.6151],"text":"Microsoft","confidence":1}]},{"boundingBox":[0.8106,1.7033,2.1445,1.7033,2.1445,1.8342,0.8106,1.8342],"text":"1 Redmond way Suite","appearance":{"style":{"name":"other","confidence":1}},"words":[{"boundingBox":[0.8106,1.708,0.8463,1.708,0.8463,1.8053,0.8106,1.8053],"text":"1","confidence":1},{"boundingBox":[0.923,1.7047,1.5018,1.7047,1.5018,1.8068,0.923,1.8068],"text":"Redmond","confidence":1},{"boundingBox":[1.5506,1.7309,1.7949,1.7309,1.7949,1.8342,1.5506,1.8342],"text":"way","confidence":1},{"boundingBox":[1.8415,1.7033,2.1445,1.7033,2.1445,1.8078,1.8415,1.8078],"text":"Suite","confidence":1}]},{"boundingBox":[5.2036,1.716,6.5436,1.716,6.5436,1.8459,5.2036,1.8459],"text":"1020 Enterprise Way","appearance":{"style":{"name":"other","confidence":1}},"words":[{"boundingBox":[5.2036,1.716,5.4935,1.716,5.4935,1.8185,5.2036,1.8185],"text":"1020","confidence":1},{"boundingBox":[5.5488,1.7164,6.2178,1.7164,6.2178,1.8441,5.5488,1.8441],"text":"Enterprise","confidence":1},{"boundingBox":[6.2618,1.7164,6.5436,1.7164,6.5436,1.8459,6.2618,1.8459],"text":"Way","confidence":1}]},{"boundingBox":[0.8019,1.896,2.0384,1.896,2.0384,2.0171,0.8019,2.0171],"text":"6000 Redmond, WA","appearance":{"style":{"name":"other","confidence":1}},"words":[{"boundingBox":[0.8019,1.896,1.0991,1.896,1.0991,1.9994,0.8019,1.9994],"text":"6000","confidence":1},{"boundingBox":[1.1537,1.8964,1.7689,1.8964,1.7689,2.0171,1.1537,2.0171],"text":"Redmond,","confidence":1},{"boundingBox":[1.8196,1.8976,2.0384,1.8976,2.0384,1.9969,1.8196,1.9969],"text":"WA","confidence":1}]},{"boundingBox":[5.196,1.9047,6.6526,1.9047,6.6526,2.0359,5.196,2.0359],"text":"Sunnayvale, CA 87659","appearance":{"style":{"name":"other","confidence":1}},"words":[{"boundingBox":[5.196,1.9047,5.9894,1.9047,5.9894,2.0359,5.196,2.0359],"text":"Sunnayvale,","confidence":1},{"boundingBox":[6.0427,1.9047,6.2354,1.9047,6.2354,2.0085,6.0427,2.0085],"text":"CA","confidence":1},{"boundingBox":[6.2801,1.906,6.6526,1.906,6.6526,2.0086,6.2801,2.0086],"text":"87659","confidence":1}]},{"boundingBox":[0.8025,2.0876,1.175,2.0876,1.175,2.1911,0.8025,2.1911],"text":"99243","appearance":{"style":{"name":"other","confidence":1}},"words":[{"boundingBox":[0.8025,2.0876,1.175,2.0876,1.175,2.1911,0.8025,2.1911],"text":"99243","confidence":1}]},{"boundingBox":[0.5439,2.8733,1.5729,2.8733,1.5729,2.9754,0.5439,2.9754],"text":"Invoice Number","appearance":{"style":{"name":"other","confidence":1}},"words":[{"boundingBox":[0.5439,2.8733,1.0098,2.8733,1.0098,2.9754,0.5439,2.9754],"text":"Invoice","confidence":1},{"boundingBox":[1.0611,2.8743,1.5729,2.8743,1.5729,2.9754,1.0611,2.9754],"text":"Number","confidence":1}]},{"boundingBox":[1.9491,2.8733,2.7527,2.8733,2.7527,2.9754,1.9491,2.9754],"text":"Invoice Date","appearance":{"style":{"name":"other","confidence":1}},"words":[{"boundingBox":[1.9491,2.8733,2.415,2.8733,2.415,2.9754,1.9491,2.9754],"text":"Invoice","confidence":1},{"boundingBox":[2.4673,2.8743,2.7527,2.8743,2.7527,2.9754,2.4673,2.9754],"text":"Date","confidence":1}]},{"boundingBox":[3.3495,2.8733,4.4547,2.8733,4.4547,2.9754,3.3495,2.9754],"text":"Invoice Due Date","appearance":{"style":{"name":"other","confidence":1}},"words":[{"boundingBox":[3.3495,2.8733,3.8155,2.8733,3.8155,2.9754,3.3495,2.9754],"text":"Invoice","confidence":1},{"boundingBox":[3.8677,2.8743,4.1149,2.8743,4.1149,2.9754,3.8677,2.9754],"text":"Due","confidence":1},{"boundingBox":[4.1678,2.8743,4.4547,2.8743,4.4547,2.9754,4.1678,2.9754],"text":"Date","confidence":1}]},{"boundingBox":[4.7468,2.8717,5.289,2.8717,5.289,3.0035,4.7468,3.0035],"text":"Charges","appearance":{"style":{"name":"other","confidence":1}},"words":[{"boundingBox":[4.7468,2.8717,5.289,2.8717,5.289,3.0035,4.7468,3.0035],"text":"Charges","confidence":1}]},{"boundingBox":[6.141,2.873,6.5875,2.873,6.5875,2.9736,6.141,2.9736],"text":"VAT ID","appearance":{"style":{"name":"other","confidence":1}},"words":[{"boundingBox":[6.141,2.873,6.4147,2.873,6.4147,2.9736,6.141,2.9736],"text":"VAT","confidence":1},{"boundingBox":[6.4655,2.873,6.5875,2.873,6.5875,2.9736,6.4655,2.9736],"text":"ID","confidence":1}]},{"boundingBox":[0.5397,3.411,1.1457,3.411,1.1457,3.5144,0.5397,3.5144],"text":"34278587","appearance":{"style":{"name":"other","confidence":1}},"words":[{"boundingBox":[0.5397,3.411,1.1457,3.411,1.1457,3.5144,0.5397,3.5144],"text":"34278587","confidence":1}]},{"boundingBox":[1.9455,3.41,2.551,3.41,2.551,3.5144,1.9455,3.5144],"text":"6/18/2017","appearance":{"style":{"name":"other","confidence":1}},"words":[{"boundingBox":[1.9455,3.41,2.551,3.41,2.551,3.5144,1.9455,3.5144],"text":"6/18/2017","confidence":1}]},{"boundingBox":[3.346,3.41,3.9514,3.41,3.9514,3.5144,3.346,3.5144],"text":"6/24/2017","appearance":{"style":{"name":"other","confidence":1}},"words":[{"boundingBox":[3.346,3.41,3.9514,3.41,3.9514,3.5144,3.346,3.5144],"text":"6/24/2017","confidence":1}]},{"boundingBox":[5.3871,3.4047,6.0702,3.4047,6.0702,3.5321,5.3871,3.5321],"text":"$56,651.49","appearance":{"style":{"name":"other","confidence":1}},"words":[{"boundingBox":[5.3871,3.4047,6.0702,3.4047,6.0702,3.5321,5.3871,3.5321],"text":"$56,651.49","confidence":1}]},{"boundingBox":[6.2285,3.4114,6.3919,3.4114,6.3919,3.5119,6.2285,3.5119],"text":"PT","appearance":{"style":{"name":"other","confidence":1}},"words":[{"boundingBox":[6.2285,3.4114,6.3919,3.4114,6.3919,3.5119,6.2285,3.5119],"text":"PT","confidence":1}]}]}],"pageResults":[{"page":1,"tables":[{"rows":3,"columns":6,"cells":[{"rowIndex":0,"columnIndex":0,"text":"Invoice Number","boundingBox":[0.5136,2.7829,1.8978,2.79,1.8978,3.311,0.5136,3.311],"elements":["#/readResults/0/lines/8/words/0","#/readResults/0/lines/8/words/1"]},{"rowIndex":0,"columnIndex":1,"text":"Invoice Date","boundingBox":[1.8978,2.79,3.2964,2.79,3.3036,3.311,1.8978,3.311],"elements":["#/readResults/0/lines/9/words/0","#/readResults/0/lines/9/words/1"]},{"rowIndex":0,"columnIndex":2,"text":"Invoice Due Date","boundingBox":[3.2964,2.79,4.7022,2.79,4.7094,3.311,3.3036,3.311],"elements":["#/readResults/0/lines/10/words/0","#/readResults/0/lines/10/words/1","#/readResults/0/lines/10/words/2"]},{"rowIndex":0,"columnIndex":3,"columnSpan":2,"text":"Charges","boundingBox":[4.7022,2.79,6.1079,2.7829,6.1079,3.311,4.7094,3.311],"elements":["#/readResults/0/lines/11/words/0"]},{"rowIndex":0,"columnIndex":5,"text":"VAT ID","boundingBox":[6.1079,2.7829,7.485,2.7829,7.4922,3.311,6.1079,3.311],"elements":["#/readResults/0/lines/12/words/0","#/readResults/0/lines/12/words/1"]},{"rowIndex":1,"columnIndex":0,"rowSpan":2,"text":"34278587","boundingBox":[0.5136,3.311,1.8978,3.311,1.8978,3.8534,0.5136,3.8534],"elements":["#/readResults/0/lines/13/words/0"]},{"rowIndex":1,"columnIndex":1,"rowSpan":2,"text":"6/18/2017","boundingBox":[1.8978,3.311,3.3036,3.311,3.3036,3.8534,1.8978,3.8534],"elements":["#/readResults/0/lines/14/words/0"]},{"rowIndex":1,"columnIndex":2,"rowSpan":2,"text":"6/24/2017","boundingBox":[3.3036,3.311,4.7094,3.311,4.7165,3.8534,3.3036,3.8534],"elements":["#/readResults/0/lines/15/words/0"]},{"rowIndex":1,"columnIndex":3,"rowSpan":2,"columnSpan":2,"text":"$56,651.49","boundingBox":[4.7094,3.311,6.1079,3.311,6.1079,3.8534,4.7165,3.8534],"elements":["#/readResults/0/lines/16/words/0"]},{"rowIndex":1,"columnIndex":5,"text":"PT","boundingBox":[6.1079,3.311,7.4922,3.311,7.4922,3.6393,6.1079,3.6393],"elements":["#/readResults/0/lines/17/words/0"]},{"rowIndex":2,"columnIndex":5,"text":"","boundingBox":[6.1079,3.6393,7.4922,3.6393,7.4922,3.8534,6.1079,3.8534],"elements":[]}],"boundingBox":[0.4985,2.7802,7.4933,2.7816,7.4913,3.8459,0.4966,3.8447]}]}]}}, [
  'Content-Length',
  '8901',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '25',
  'apim-request-id',
  '1b549a82-d27d-4caf-9173-a11609c10de9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:33:19 GMT'
]);
