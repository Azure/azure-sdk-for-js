let nock = require('nock');

module.exports.hash = "021cd1ad14cefedb3f9721742269a869";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
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
  '75368532-f074-4578-b75b-3d33df167502',
  'x-ms-ests-server',
  '2.1.11198.13 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AklUX3tq7C5Mo2LiDfztpfH0CyfMAQAAANTfPNcOAAAA; expires=Thu, 10-Dec-2020 19:24:05 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 10 Nov 2020 19:24:04 GMT',
  'Content-Length',
  '1500'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.1/prebuilt/receipt/analyze', {"source":"https://storageaccount/testingdata/businessCard.jpg?sastoken"})
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Operation-Location',
  'https://endpoint/formrecognizer/v2.1-preview.1/prebuilt/receipt/analyzeResults/4715c708-b079-40e6-8a27-b6ccba9b94d4',
  'x-envoy-upstream-service-time',
  '1082',
  'apim-request-id',
  '4715c708-b079-40e6-8a27-b6ccba9b94d4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 10 Nov 2020 19:24:06 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/prebuilt/receipt/analyzeResults/4715c708-b079-40e6-8a27-b6ccba9b94d4')
  .reply(200, {"status":"running","createdDateTime":"2020-11-10T19:24:06Z","lastUpdatedDateTime":"2020-11-10T19:24:06Z"}, [
  'Content-Length',
  '106',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  '2a7c3b5e-8859-499b-9184-8ceaa5ce5c29',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 10 Nov 2020 19:24:06 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/prebuilt/receipt/analyzeResults/4715c708-b079-40e6-8a27-b6ccba9b94d4')
  .reply(200, {"status":"running","createdDateTime":"2020-11-10T19:24:06Z","lastUpdatedDateTime":"2020-11-10T19:24:06Z"}, [
  'Content-Length',
  '106',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  '97b36b0d-997f-457e-bdf6-3299ad5f7481',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 10 Nov 2020 19:24:06 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/prebuilt/receipt/analyzeResults/4715c708-b079-40e6-8a27-b6ccba9b94d4')
  .reply(200, {"status":"succeeded","createdDateTime":"2020-11-10T19:24:06Z","lastUpdatedDateTime":"2020-11-10T19:24:08Z","analyzeResult":{"version":"2.1.0","readResults":[{"page":1,"angle":-16.6836,"width":4032,"height":3024,"unit":"pixel"}],"documentResults":[{"docType":"prebuilt:receipt","pageRange":[1,1],"fields":{"ReceiptType":{"type":"string","valueString":"Other","confidence":0.308},"MerchantName":{"type":"string","valueString":"Dr. Avery Smith","text":"Dr. Avery Smith","boundingBox":[413.8,1151.8,1610,871,1639.5,996.8,443.4,1277.6],"page":1,"confidence":0.99},"MerchantPhoneNumber":{"type":"phoneNumber","text":"+44 (0) 20 9876 5432","boundingBox":[2469.1,1118.1,3136.2,912.4,3158.8,985.8,2491.8,1191.5],"page":1,"confidence":0.995},"MerchantAddress":{"type":"string","valueString":"Contoso 2 Kingdom Street Paddington, London, W2 6BD","text":"Contoso 2 Kingdom Street Paddington, London, W2 6BD","boundingBox":[1150.4,1925.3,2462.3,1471.1,2613.1,1906.7,1301.3,2361],"page":1,"confidence":0.709}}}]}}, [
  'Content-Length',
  '1000',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '18',
  'apim-request-id',
  '37a85179-0003-48c1-a787-17912f4d2ec8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 10 Nov 2020 19:24:11 GMT'
]);
