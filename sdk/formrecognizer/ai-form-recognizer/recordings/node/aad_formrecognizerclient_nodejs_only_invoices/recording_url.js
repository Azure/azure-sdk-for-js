let nock = require('nock');

module.exports.hash = "ee5ed1f51acbbf0d2a6a5bc1f66aaf82";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
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
  '148b3b3e-0fa7-4e21-b039-53b1e9882400',
  'x-ms-ests-server',
  '2.1.11251.20 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AuBqhQV4JR5FlGPN_rGmEwzGLH8mAQAAAGMxStcOAAAA; expires=Sun, 20-Dec-2020 21:51:32 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 20 Nov 2020 21:51:32 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.2/prebuilt/invoice/analyze', {"source":"https://storageaccount/testingdata/Invoice_1.pdf?sastoken"})
  .reply(202, "", [
  'Content-Length',
  '0',
  'Operation-Location',
  'https://endpoint/formrecognizer/v2.1-preview.2/prebuilt/invoice/analyzeResults/8d3d4230-85a8-48f5-bc4c-fd5483997de0',
  'x-envoy-upstream-service-time',
  '249',
  'apim-request-id',
  '8d3d4230-85a8-48f5-bc4c-fd5483997de0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 21:51:32 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/prebuilt/invoice/analyzeResults/8d3d4230-85a8-48f5-bc4c-fd5483997de0')
  .reply(200, {"status":"notStarted","createdDateTime":"2020-11-20T21:51:32Z","lastUpdatedDateTime":"2020-11-20T21:51:32Z"}, [
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  '89fe2163-6a25-404a-83c8-b78ec16bc109',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 21:51:32 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/prebuilt/invoice/analyzeResults/8d3d4230-85a8-48f5-bc4c-fd5483997de0')
  .reply(200, {"status":"notStarted","createdDateTime":"2020-11-20T21:51:32Z","lastUpdatedDateTime":"2020-11-20T21:51:32Z"}, [
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  '991ac356-ab11-4b82-8703-30f39ec1c815',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 21:51:32 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/prebuilt/invoice/analyzeResults/8d3d4230-85a8-48f5-bc4c-fd5483997de0')
  .reply(200, {"status":"running","createdDateTime":"2020-11-20T21:51:32Z","lastUpdatedDateTime":"2020-11-20T21:51:33Z"}, [
  'Content-Length',
  '106',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '18',
  'apim-request-id',
  '99eae931-1afb-4a1d-bbab-9ecb49b33515',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 21:51:37 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/prebuilt/invoice/analyzeResults/8d3d4230-85a8-48f5-bc4c-fd5483997de0')
  .reply(200, {"status":"succeeded","createdDateTime":"2020-11-20T21:51:32Z","lastUpdatedDateTime":"2020-11-20T21:51:39Z","analyzeResult":{"version":"2.1.0","readResults":[{"page":1,"angle":0,"width":8.5,"height":11,"unit":"inch"}],"pageResults":[{"page":1,"tables":[{"rows":3,"columns":6,"cells":[{"rowIndex":0,"columnIndex":0,"text":"Invoice Number","boundingBox":[0.5136,2.7829,1.8978,2.79,1.8978,3.311,0.5136,3.311]},{"rowIndex":0,"columnIndex":1,"text":"Invoice Date","boundingBox":[1.8978,2.79,3.2964,2.79,3.3036,3.311,1.8978,3.311]},{"rowIndex":0,"columnIndex":2,"text":"Invoice Due Date","boundingBox":[3.2964,2.79,4.7022,2.79,4.7094,3.311,3.3036,3.311]},{"rowIndex":0,"columnIndex":3,"columnSpan":2,"text":"Charges","boundingBox":[4.7022,2.79,6.1079,2.7829,6.1079,3.311,4.7094,3.311]},{"rowIndex":0,"columnIndex":5,"text":"VAT ID","boundingBox":[6.1079,2.7829,7.485,2.7829,7.4922,3.311,6.1079,3.311]},{"rowIndex":1,"columnIndex":0,"rowSpan":2,"text":"34278587","boundingBox":[0.5136,3.311,1.8978,3.311,1.8978,3.8534,0.5136,3.8534]},{"rowIndex":1,"columnIndex":1,"rowSpan":2,"text":"6/18/2017","boundingBox":[1.8978,3.311,3.3036,3.311,3.3036,3.8534,1.8978,3.8534]},{"rowIndex":1,"columnIndex":2,"rowSpan":2,"text":"6/24/2017","boundingBox":[3.3036,3.311,4.7094,3.311,4.7165,3.8534,3.3036,3.8534]},{"rowIndex":1,"columnIndex":3,"rowSpan":2,"columnSpan":2,"text":"$56,651.49","boundingBox":[4.7094,3.311,6.1079,3.311,6.1079,3.8534,4.7165,3.8534]},{"rowIndex":1,"columnIndex":5,"text":"PT","boundingBox":[6.1079,3.311,7.4922,3.311,7.4922,3.6393,6.1079,3.6393]},{"rowIndex":2,"columnIndex":5,"boundingBox":[6.1079,3.6393,7.4922,3.6393,7.4922,3.8534,6.1079,3.8534],"text":""}],"boundingBox":[0.4985,2.7802,7.4933,2.7816,7.4913,3.8459,0.4966,3.8447]}]}],"documentResults":[{"docType":"prebuilt:invoice","pageRange":[1,1],"fields":{"CustomerAddress":{"type":"string","valueString":"1020 Enterprise Way Sunnayvale, CA 87659","text":"1020 Enterprise Way Sunnayvale, CA 87659","boundingBox":[5.196,1.716,6.6526,1.716,6.6526,2.0359,5.196,2.0359],"page":1,"confidence":0.992},"CustomerAddressRecipient":{"type":"string","valueString":"Microsoft","text":"Microsoft","boundingBox":[5.2045,1.5114,5.8155,1.5114,5.8155,1.6151,5.2045,1.6151],"page":1,"confidence":0.989},"CustomerName":{"type":"string","valueString":"Microsoft","text":"Microsoft","boundingBox":[5.2045,1.5114,5.8155,1.5114,5.8155,1.6151,5.2045,1.6151],"page":1,"confidence":0.989},"DueDate":{"type":"date","valueDate":"2017-06-24","text":"6/24/2017","boundingBox":[3.346,3.41,3.9514,3.41,3.9514,3.5144,3.346,3.5144],"page":1,"confidence":0.989},"InvoiceDate":{"type":"date","valueDate":"2017-06-18","text":"6/18/2017","boundingBox":[1.9455,3.41,2.551,3.41,2.551,3.5144,1.9455,3.5144],"page":1,"confidence":0.936},"InvoiceId":{"type":"string","valueString":"34278587","text":"34278587","boundingBox":[0.5397,3.411,1.1457,3.411,1.1457,3.5144,0.5397,3.5144],"page":1,"confidence":0.842},"InvoiceTotal":{"type":"number","valueNumber":56651.49,"text":"$56,651.49","boundingBox":[5.3871,3.4047,6.0702,3.4047,6.0702,3.5321,5.3871,3.5321],"page":1,"confidence":0.576},"VendorAddress":{"type":"string","valueString":"1 Redmond way Suite 6000 Redmond, WA 99243","text":"1 Redmond way Suite 6000 Redmond, WA 99243","boundingBox":[0.8019,1.7033,2.1445,1.7033,2.1445,2.1911,0.8019,2.1911],"page":1,"confidence":0.953},"VendorName":{"type":"string","valueString":"Contoso","text":"Contoso","boundingBox":[0.5384,1.1583,1.4466,1.1583,1.4466,1.3534,0.5384,1.3534],"page":1,"confidence":0.979}}}]}}, [
  'Content-Length',
  '3526',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '20',
  'apim-request-id',
  '661c5064-5655-475e-998b-83c65cc7d17a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 21:51:43 GMT'
]);
