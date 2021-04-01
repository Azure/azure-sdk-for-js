let nock = require('nock');

module.exports.hash = "dfc9b3b9db885db985daab59b9e382de";

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
  '185ecb71-2554-43b6-97ae-e698985d5b01',
  'x-ms-ests-server',
  '2.1.11562.10 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AjzFVQ1mzahOgLFbzhWoi1fGLH8mFAAAACKn9dcOAAAA; expires=Thu, 29-Apr-2021 23:16:10 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 30 Mar 2021 23:16:09 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.3/prebuilt/invoice/analyze', {"source":"https://storageaccount/testingdata/Invoice_1.pdf?sastoken"})
  .reply(202, "", [
  'Content-Length',
  '0',
  'Operation-Location',
  'https://endpoint/formrecognizer/v2.1-preview.3/prebuilt/invoice/analyzeResults/918db547-928e-44b3-b246-65f24165518d',
  'x-envoy-upstream-service-time',
  '281',
  'apim-request-id',
  '918db547-928e-44b3-b246-65f24165518d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:16:09 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/prebuilt/invoice/analyzeResults/918db547-928e-44b3-b246-65f24165518d')
  .reply(200, {"status":"notStarted","createdDateTime":"2021-03-30T23:16:10Z","lastUpdatedDateTime":"2021-03-30T23:16:10Z"}, [
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  'ca9c29c8-c00c-4816-9025-f771584893ea',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:16:10 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/prebuilt/invoice/analyzeResults/918db547-928e-44b3-b246-65f24165518d')
  .reply(200, {"status":"notStarted","createdDateTime":"2021-03-30T23:16:10Z","lastUpdatedDateTime":"2021-03-30T23:16:10Z"}, [
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  'ee1d47f4-ca6e-464d-a174-e201a10ed607',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:16:10 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/prebuilt/invoice/analyzeResults/918db547-928e-44b3-b246-65f24165518d')
  .reply(200, {"status":"succeeded","createdDateTime":"2021-03-30T23:16:10Z","lastUpdatedDateTime":"2021-03-30T23:16:15Z","analyzeResult":{"version":"2.1.0","readResults":[{"page":1,"angle":0,"width":8.5,"height":11,"unit":"inch"}],"pageResults":[{"page":1,"tables":[{"rows":3,"columns":6,"cells":[{"rowIndex":0,"columnIndex":0,"text":"Invoice Number","boundingBox":[0.5136,2.7829,1.8978,2.79,1.8978,3.311,0.5136,3.311]},{"rowIndex":0,"columnIndex":1,"text":"Invoice Date","boundingBox":[1.8978,2.79,3.2964,2.79,3.3036,3.311,1.8978,3.311]},{"rowIndex":0,"columnIndex":2,"text":"Invoice Due Date","boundingBox":[3.2964,2.79,4.7022,2.79,4.7094,3.311,3.3036,3.311]},{"rowIndex":0,"columnIndex":3,"columnSpan":2,"text":"Charges","boundingBox":[4.7022,2.79,6.1079,2.7829,6.1079,3.311,4.7094,3.311]},{"rowIndex":0,"columnIndex":5,"text":"VAT ID","boundingBox":[6.1079,2.7829,7.485,2.7829,7.4922,3.311,6.1079,3.311]},{"rowIndex":1,"columnIndex":0,"rowSpan":2,"text":"34278587","boundingBox":[0.5136,3.311,1.8978,3.311,1.8978,3.8534,0.5136,3.8534]},{"rowIndex":1,"columnIndex":1,"rowSpan":2,"text":"6/18/2017","boundingBox":[1.8978,3.311,3.3036,3.311,3.3036,3.8534,1.8978,3.8534]},{"rowIndex":1,"columnIndex":2,"rowSpan":2,"text":"6/24/2017","boundingBox":[3.3036,3.311,4.7094,3.311,4.7165,3.8534,3.3036,3.8534]},{"rowIndex":1,"columnIndex":3,"rowSpan":2,"columnSpan":2,"text":"$56,651.49","boundingBox":[4.7094,3.311,6.1079,3.311,6.1079,3.8534,4.7165,3.8534]},{"rowIndex":1,"columnIndex":5,"text":"PT","boundingBox":[6.1079,3.311,7.4922,3.311,7.4922,3.6393,6.1079,3.6393]},{"rowIndex":2,"columnIndex":5,"boundingBox":[6.1079,3.6393,7.4922,3.6393,7.4922,3.8534,6.1079,3.8534],"text":""}],"boundingBox":[0.4985,2.7802,7.4933,2.7816,7.4913,3.8459,0.4966,3.8447]}]}],"documentResults":[{"docType":"prebuilt:invoice","pageRange":[1,1],"fields":{"CustomerAddress":{"type":"string","valueString":"1020 Enterprise Way Sunnayvale, CA 87659","text":"1020 Enterprise Way Sunnayvale, CA 87659","boundingBox":[5.196,1.716,6.6526,1.716,6.6526,2.0359,5.196,2.0359],"page":1,"confidence":0.954},"CustomerAddressRecipient":{"type":"string","valueString":"Microsoft","text":"Microsoft","boundingBox":[5.2045,1.5114,5.8155,1.5114,5.8155,1.6151,5.2045,1.6151],"page":1,"confidence":0.981},"CustomerName":{"type":"string","valueString":"Microsoft","text":"Microsoft","boundingBox":[5.2045,1.5114,5.8155,1.5114,5.8155,1.6151,5.2045,1.6151],"page":1,"confidence":0.981},"DueDate":{"type":"date","valueDate":"2017-06-24","text":"6/24/2017","boundingBox":[3.346,3.41,3.9514,3.41,3.9514,3.5144,3.346,3.5144],"page":1,"confidence":0.981},"InvoiceDate":{"type":"date","valueDate":"2017-06-18","text":"6/18/2017","boundingBox":[1.9455,3.41,2.551,3.41,2.551,3.5144,1.9455,3.5144],"page":1,"confidence":0.968},"InvoiceId":{"type":"string","valueString":"34278587","text":"34278587","boundingBox":[0.5397,3.411,1.1457,3.411,1.1457,3.5144,0.5397,3.5144],"page":1,"confidence":0.973},"InvoiceTotal":{"type":"number","valueNumber":56651.49,"text":"$56,651.49","boundingBox":[5.3871,3.4047,6.0702,3.4047,6.0702,3.5321,5.3871,3.5321],"page":1,"confidence":0.307},"Items":{"type":"array","valueArray":[{"type":"object","valueObject":{"Amount":{"type":"number","valueNumber":56651.49,"text":"$56,651.49","boundingBox":[5.3871,3.4047,6.0702,3.4047,6.0702,3.5321,5.3871,3.5321],"page":1,"confidence":0.782},"Date":{"type":"date","valueDate":"2017-06-18","text":"6/18/2017","boundingBox":[1.9455,3.41,2.551,3.41,2.551,3.5144,1.9455,3.5144],"page":1,"confidence":0.287},"ProductCode":{"type":"string","valueString":"34278587","text":"34278587","boundingBox":[0.5397,3.411,1.1457,3.411,1.1457,3.5144,0.5397,3.5144],"page":1,"confidence":0.657},"Tax":{"type":"number","text":"PT","boundingBox":[6.2285,3.4114,6.3919,3.4114,6.3919,3.5119,6.2285,3.5119],"page":1,"confidence":0.691}},"text":"34278587 6/18/2017 6/24/2017 $56,651.49 PT","boundingBox":[0.5397,3.4047,6.3919,3.4047,6.3919,3.5321,0.5397,3.5321],"page":1,"confidence":0.855}]},"VendorAddress":{"type":"string","valueString":"1 Redmond way Suite 6000 Redmond, WA 99243","text":"1 Redmond way Suite 6000 Redmond, WA 99243","boundingBox":[0.8019,1.7033,2.1445,1.7033,2.1445,2.1911,0.8019,2.1911],"page":1,"confidence":0.953},"VendorName":{"type":"string","valueString":"Contoso","text":"Contoso","boundingBox":[0.5384,1.1583,1.4466,1.1583,1.4466,1.3534,0.5384,1.3534],"page":1,"confidence":0.981}}}]}}, [
  'Content-Length',
  '4392',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  '82ec7ce1-7a74-43d5-95e6-83e902be559e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:16:15 GMT'
]);
