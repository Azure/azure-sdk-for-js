let nock = require('nock');

module.exports.hash = "dfc9b3b9db885db985daab59b9e382de";

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
  'e029d63d-2b32-4c2b-ae53-8aaa8d8e1401',
  'x-ms-ests-server',
  '2.1.11654.16 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AgRLK_yyL-BMiLhMpVRBz8rGLH8mDAAAAFyuG9gOAAAA; expires=Fri, 28-May-2021 19:34:38 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr9MLvh8z7l9dJ4J1inInGAtyvyJ37QRNIA8UITyaqBC6jWTsQy-g9rPnSO2-3L8AXYNISVz8-X6Xuq1LCcu_nScq_BYGlR9GwOlfptCHrIlx3_j9fyYJsLpJ8qh2y_Ymsgjl_UR3albEUDv_V0Nhx3kIlgu1s-VcItLS-IJ9ScGcgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 19:34:37 GMT'
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
  '3c4fa9b7-e10e-4f56-8b20-0514675d4e01',
  'x-ms-ests-server',
  '2.1.11654.16 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AgRLK_yyL-BMiLhMpVRBz8rGLH8mDAAAAFyuG9gOAAAA; expires=Fri, 28-May-2021 19:34:38 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrNpN3HXtfcNs6AaQ-UAFRB5YWTzbEKgUhNQRFzmJvfAg2vv_zq-aa2lDiO_pMZVjtOHnWSwys8zRcCcIrgNwiCX5Vtqqzs2v6A2O9UKwat1wsTVj8TD3NrkUQXoGvO5KgEVIleiI9ISkMYYjS9u_y-RVMQNz5kA7RFvqH_u6uVaAgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 19:34:37 GMT',
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
  'a209898b-49cc-496f-8e6d-3c67d7246301',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AgRLK_yyL-BMiLhMpVRBz8rGLH8mDAAAAFyuG9gOAAAA; expires=Fri, 28-May-2021 19:34:38 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 19:34:37 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.3/prebuilt/invoice/analyze', {"source":"https://storageaccount/testingdata/Invoice_1.pdf?sastoken"})
  .reply(202, "", [
  'Content-Length',
  '0',
  'Operation-Location',
  'https://endpoint/formrecognizer/v2.1-preview.3/prebuilt/invoice/analyzeResults/ae6a06f4-17d3-4be6-9614-e6f4fdaa2ce3',
  'x-envoy-upstream-service-time',
  '333',
  'apim-request-id',
  'ae6a06f4-17d3-4be6-9614-e6f4fdaa2ce3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:34:38 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/prebuilt/invoice/analyzeResults/ae6a06f4-17d3-4be6-9614-e6f4fdaa2ce3')
  .reply(200, {"status":"notStarted","createdDateTime":"2021-04-28T19:34:39Z","lastUpdatedDateTime":"2021-04-28T19:34:39Z"}, [
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  'ae79ccc5-6ef0-483a-9d07-5e200c2ff209',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:34:38 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/prebuilt/invoice/analyzeResults/ae6a06f4-17d3-4be6-9614-e6f4fdaa2ce3')
  .reply(200, {"status":"notStarted","createdDateTime":"2021-04-28T19:34:39Z","lastUpdatedDateTime":"2021-04-28T19:34:39Z"}, [
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  'eea3b1aa-0acd-4eaf-8c8d-3a0ba4156243',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:34:39 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/prebuilt/invoice/analyzeResults/ae6a06f4-17d3-4be6-9614-e6f4fdaa2ce3')
  .reply(200, {"status":"succeeded","createdDateTime":"2021-04-28T19:34:39Z","lastUpdatedDateTime":"2021-04-28T19:34:44Z","analyzeResult":{"version":"2.1.0","readResults":[{"page":1,"angle":0,"width":8.5,"height":11,"unit":"inch"}],"pageResults":[{"page":1,"tables":[{"rows":3,"columns":6,"cells":[{"rowIndex":0,"columnIndex":0,"text":"Invoice Number","boundingBox":[0.5136,2.7829,1.8978,2.79,1.8978,3.311,0.5136,3.311]},{"rowIndex":0,"columnIndex":1,"text":"Invoice Date","boundingBox":[1.8978,2.79,3.2964,2.79,3.3036,3.311,1.8978,3.311]},{"rowIndex":0,"columnIndex":2,"text":"Invoice Due Date","boundingBox":[3.2964,2.79,4.7022,2.79,4.7094,3.311,3.3036,3.311]},{"rowIndex":0,"columnIndex":3,"columnSpan":2,"text":"Charges","boundingBox":[4.7022,2.79,6.1079,2.7829,6.1079,3.311,4.7094,3.311]},{"rowIndex":0,"columnIndex":5,"text":"VAT ID","boundingBox":[6.1079,2.7829,7.485,2.7829,7.4922,3.311,6.1079,3.311]},{"rowIndex":1,"columnIndex":0,"rowSpan":2,"text":"34278587","boundingBox":[0.5136,3.311,1.8978,3.311,1.8978,3.8534,0.5136,3.8534]},{"rowIndex":1,"columnIndex":1,"rowSpan":2,"text":"6/18/2017","boundingBox":[1.8978,3.311,3.3036,3.311,3.3036,3.8534,1.8978,3.8534]},{"rowIndex":1,"columnIndex":2,"rowSpan":2,"text":"6/24/2017","boundingBox":[3.3036,3.311,4.7094,3.311,4.7165,3.8534,3.3036,3.8534]},{"rowIndex":1,"columnIndex":3,"rowSpan":2,"columnSpan":2,"text":"$56,651.49","boundingBox":[4.7094,3.311,6.1079,3.311,6.1079,3.8534,4.7165,3.8534]},{"rowIndex":1,"columnIndex":5,"text":"PT","boundingBox":[6.1079,3.311,7.4922,3.311,7.4922,3.6393,6.1079,3.6393]},{"rowIndex":2,"columnIndex":5,"boundingBox":[6.1079,3.6393,7.4922,3.6393,7.4922,3.8534,6.1079,3.8534],"text":""}],"boundingBox":[0.4985,2.7802,7.4933,2.7816,7.4913,3.8459,0.4966,3.8447]}]}],"documentResults":[{"docType":"prebuilt:invoice","pageRange":[1,1],"fields":{"CustomerAddress":{"type":"string","valueString":"1020 Enterprise Way Sunnayvale, CA 87659","text":"1020 Enterprise Way Sunnayvale, CA 87659","boundingBox":[5.196,1.716,6.6526,1.716,6.6526,2.0359,5.196,2.0359],"page":1,"confidence":0.954},"CustomerAddressRecipient":{"type":"string","valueString":"Microsoft","text":"Microsoft","boundingBox":[5.2045,1.5114,5.8155,1.5114,5.8155,1.6151,5.2045,1.6151],"page":1,"confidence":0.981},"CustomerName":{"type":"string","valueString":"Microsoft","text":"Microsoft","boundingBox":[5.2045,1.5114,5.8155,1.5114,5.8155,1.6151,5.2045,1.6151],"page":1,"confidence":0.981},"DueDate":{"type":"date","valueDate":"2017-06-24","text":"6/24/2017","boundingBox":[3.346,3.41,3.9514,3.41,3.9514,3.5144,3.346,3.5144],"page":1,"confidence":0.981},"InvoiceDate":{"type":"date","valueDate":"2017-06-18","text":"6/18/2017","boundingBox":[1.9455,3.41,2.551,3.41,2.551,3.5144,1.9455,3.5144],"page":1,"confidence":0.968},"InvoiceId":{"type":"string","valueString":"34278587","text":"34278587","boundingBox":[0.5397,3.411,1.1457,3.411,1.1457,3.5144,0.5397,3.5144],"page":1,"confidence":0.973},"InvoiceTotal":{"type":"number","valueNumber":56651.49,"text":"$56,651.49","boundingBox":[5.3871,3.4047,6.0702,3.4047,6.0702,3.5321,5.3871,3.5321],"page":1,"confidence":0.307},"Items":{"type":"array","valueArray":[{"type":"object","valueObject":{"Amount":{"type":"number","valueNumber":56651.49,"text":"$56,651.49","boundingBox":[5.3871,3.4047,6.0702,3.4047,6.0702,3.5321,5.3871,3.5321],"page":1,"confidence":0.782},"Date":{"type":"date","valueDate":"2017-06-18","text":"6/18/2017","boundingBox":[1.9455,3.41,2.551,3.41,2.551,3.5144,1.9455,3.5144],"page":1,"confidence":0.287},"ProductCode":{"type":"string","valueString":"34278587","text":"34278587","boundingBox":[0.5397,3.411,1.1457,3.411,1.1457,3.5144,0.5397,3.5144],"page":1,"confidence":0.657},"Tax":{"type":"number","text":"PT","boundingBox":[6.2285,3.4114,6.3919,3.4114,6.3919,3.5119,6.2285,3.5119],"page":1,"confidence":0.691}},"text":"34278587 6/18/2017 6/24/2017 $56,651.49 PT","boundingBox":[0.5397,3.4047,6.3919,3.4047,6.3919,3.5321,0.5397,3.5321],"page":1,"confidence":0.855}]},"VendorAddress":{"type":"string","valueString":"1 Redmond way Suite 6000 Redmond, WA 99243","text":"1 Redmond way Suite 6000 Redmond, WA 99243","boundingBox":[0.8019,1.7033,2.1445,1.7033,2.1445,2.1911,0.8019,2.1911],"page":1,"confidence":0.953},"VendorName":{"type":"string","valueString":"Contoso","text":"Contoso","boundingBox":[0.5384,1.1583,1.4466,1.1583,1.4466,1.3534,0.5384,1.3534],"page":1,"confidence":0.981}}}]}}, [
  'Content-Length',
  '4392',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  '35bd3629-4fd3-485e-9a09-4e5ac238c569',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:34:43 GMT'
]);
