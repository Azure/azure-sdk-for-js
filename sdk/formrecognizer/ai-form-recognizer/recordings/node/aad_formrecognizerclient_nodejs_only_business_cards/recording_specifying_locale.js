let nock = require('nock');

module.exports.hash = "021cd1ad14cefedb3f9721742269a869";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
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
  '72b1184d-be08-4ebc-a02b-d6555a21ec00',
  'x-ms-ests-server',
  '2.1.11562.10 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AjzFVQ1mzahOgLFbzhWoi1fGLH8mFAAAACKn9dcOAAAA; expires=Thu, 29-Apr-2021 23:15:50 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 30 Mar 2021 23:15:49 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.3/prebuilt/receipt/analyze', {"source":"https://storageaccount/testingdata/businessCard.jpg?sastoken"})
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Operation-Location',
  'https://endpoint/formrecognizer/v2.1-preview.3/prebuilt/receipt/analyzeResults/98ceabb8-70c8-48ba-a2c5-724828975a1a',
  'x-envoy-upstream-service-time',
  '1699',
  'apim-request-id',
  '98ceabb8-70c8-48ba-a2c5-724828975a1a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:15:51 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/prebuilt/receipt/analyzeResults/98ceabb8-70c8-48ba-a2c5-724828975a1a')
  .reply(200, {"status":"notStarted","createdDateTime":"2021-03-30T23:15:52Z","lastUpdatedDateTime":"2021-03-30T23:15:52Z"}, [
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  '49a2cc46-c3eb-4e47-92a4-867ddc226697',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:15:51 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/prebuilt/receipt/analyzeResults/98ceabb8-70c8-48ba-a2c5-724828975a1a')
  .reply(200, {"status":"running","createdDateTime":"2021-03-30T23:15:52Z","lastUpdatedDateTime":"2021-03-30T23:15:52Z"}, [
  'Content-Length',
  '106',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '17dc785b-e9dc-47fd-8541-99ac0c041fc3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:15:51 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/prebuilt/receipt/analyzeResults/98ceabb8-70c8-48ba-a2c5-724828975a1a')
  .reply(200, {"status":"succeeded","createdDateTime":"2021-03-30T23:15:52Z","lastUpdatedDateTime":"2021-03-30T23:15:55Z","analyzeResult":{"version":"2.1.0","readResults":[{"page":1,"angle":-16.6836,"width":4032,"height":3024,"unit":"pixel"}],"documentResults":[{"docType":"prebuilt:receipt","pageRange":[1,1],"fields":{"MerchantAddress":{"type":"string","valueString":"2 Kingdom Street Paddington, London, W2 6BD","text":"2 Kingdom Street Paddington, London, W2 6BD","boundingBox":[1227.3,2138.3,2520.2,1690.5,2597,1912.3,1304.1,2360.1],"page":1,"confidence":0.972},"MerchantName":{"type":"string","valueString":"Contoso","text":"Contoso","boundingBox":[1146,1926,2224,1587,2285,1756,1202,2099],"page":1,"confidence":0.787},"MerchantPhoneNumber":{"type":"phoneNumber","text":"+44 (0) 7911 123456","boundingBox":[2426.8,1040.1,3065.5,846,3087.2,917.6,2448.5,1111.7],"page":1,"confidence":0.608},"ReceiptType":{"type":"string","valueString":"Itemized","confidence":0.777}}}]}}, [
  'Content-Length',
  '961',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  '056cfeb5-e39b-4450-9279-625d8f6b3c8b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:15:57 GMT'
]);
