let nock = require('nock');

module.exports.hash = "021cd1ad14cefedb3f9721742269a869";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.1/prebuilt/receipt/analyze', {"source":"https://storageaccount/testingdata/businessCard.jpg?sastoken"})
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Operation-Location',
  'https://endpoint/formrecognizer/v2.1-preview.1/prebuilt/receipt/analyzeResults/837081b1-edd3-4b12-9688-92bf577efaef',
  'x-envoy-upstream-service-time',
  '782',
  'apim-request-id',
  '837081b1-edd3-4b12-9688-92bf577efaef',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 10 Nov 2020 19:24:20 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/prebuilt/receipt/analyzeResults/837081b1-edd3-4b12-9688-92bf577efaef')
  .reply(200, {"status":"notStarted","createdDateTime":"2020-11-10T19:24:21Z","lastUpdatedDateTime":"2020-11-10T19:24:21Z"}, [
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  '79ca15c1-ded8-4750-a308-39ff9a60f67a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 10 Nov 2020 19:24:20 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/prebuilt/receipt/analyzeResults/837081b1-edd3-4b12-9688-92bf577efaef')
  .reply(200, {"status":"running","createdDateTime":"2020-11-10T19:24:21Z","lastUpdatedDateTime":"2020-11-10T19:24:21Z"}, [
  'Content-Length',
  '106',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '18',
  'apim-request-id',
  '4e392b51-514e-4aea-9b00-4b89bd59ad04',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 10 Nov 2020 19:24:21 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/prebuilt/receipt/analyzeResults/837081b1-edd3-4b12-9688-92bf577efaef')
  .reply(200, {"status":"succeeded","createdDateTime":"2020-11-10T19:24:21Z","lastUpdatedDateTime":"2020-11-10T19:24:24Z","analyzeResult":{"version":"2.1.0","readResults":[{"page":1,"angle":-16.6836,"width":4032,"height":3024,"unit":"pixel"}],"documentResults":[{"docType":"prebuilt:receipt","pageRange":[1,1],"fields":{"ReceiptType":{"type":"string","valueString":"Other","confidence":0.308},"MerchantName":{"type":"string","valueString":"Dr. Avery Smith","text":"Dr. Avery Smith","boundingBox":[413.8,1151.8,1610,871,1639.5,996.8,443.4,1277.6],"page":1,"confidence":0.99},"MerchantPhoneNumber":{"type":"phoneNumber","text":"+44 (0) 20 9876 5432","boundingBox":[2469.1,1118.1,3136.2,912.4,3158.8,985.8,2491.8,1191.5],"page":1,"confidence":0.995},"MerchantAddress":{"type":"string","valueString":"Contoso 2 Kingdom Street Paddington, London, W2 6BD","text":"Contoso 2 Kingdom Street Paddington, London, W2 6BD","boundingBox":[1150.4,1925.3,2462.3,1471.1,2613.1,1906.7,1301.3,2361],"page":1,"confidence":0.709}}}]}}, [
  'Content-Length',
  '1000',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '45',
  'apim-request-id',
  '5f927421-efb7-419e-9291-3242d0a94e8f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 10 Nov 2020 19:24:27 GMT'
]);
