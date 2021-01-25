let nock = require('nock');

module.exports.hash = "c183f90de1d80e43b44dc392c8135c40";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.1/prebuilt/businessCard/analyze', {"source":"https://storageaccount/testingdata/businessCard.png?sastoken"})
  .reply(202, "", [
  'Content-Length',
  '0',
  'Operation-Location',
  'https://endpoint/formrecognizer/v2.1-preview.1/prebuilt/businessCard/analyzeResults/5a6b2487-e640-4a9f-9e2a-249ea1b404d2',
  'x-envoy-upstream-service-time',
  '727',
  'apim-request-id',
  '5a6b2487-e640-4a9f-9e2a-249ea1b404d2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 10 Nov 2020 18:46:20 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/prebuilt/businessCard/analyzeResults/5a6b2487-e640-4a9f-9e2a-249ea1b404d2')
  .reply(200, {"status":"notStarted","createdDateTime":"2020-11-10T18:46:21Z","lastUpdatedDateTime":"2020-11-10T18:46:21Z"}, [
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '69474a40-4273-48d5-84e6-ef10ed8abfae',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 10 Nov 2020 18:46:20 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/prebuilt/businessCard/analyzeResults/5a6b2487-e640-4a9f-9e2a-249ea1b404d2')
  .reply(200, {"status":"notStarted","createdDateTime":"2020-11-10T18:46:21Z","lastUpdatedDateTime":"2020-11-10T18:46:21Z"}, [
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '31e816f9-6086-4e31-b02b-2cdcda12354b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 10 Nov 2020 18:46:22 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/prebuilt/businessCard/analyzeResults/5a6b2487-e640-4a9f-9e2a-249ea1b404d2')
  .reply(200, {"status":"succeeded","createdDateTime":"2020-11-10T18:46:21Z","lastUpdatedDateTime":"2020-11-10T18:46:26Z","analyzeResult":{"version":"2.1.0","readResults":[{"page":1,"angle":-17.1052,"width":4032,"height":3024,"unit":"pixel"}],"documentResults":[{"docType":"prebuilt:businesscard","pageRange":[1,1],"fields":{"ContactNames":{"type":"array","valueArray":[{"type":"object","valueObject":{"FirstName":{"type":"string","valueString":"Avery","text":"Avery","boundingBox":[703,1096,1135,989,1166,1108,733,1206],"page":1},"LastName":{"type":"string","valueString":"Smith","text":"Smith","boundingBox":[1187,976,1586,879,1619,998,1218,1096],"page":1}},"text":"Dr. Avery Smith","boundingBox":[419.5,1155.5,1590.5,877.9,1619.7,1000.8,448.6,1278.3],"confidence":0.794}]},"JobTitles":{"type":"array","valueArray":[{"type":"string","valueString":"Senior Researcher","text":"Senior Researcher","boundingBox":[451.8,1301.9,1313.5,1099.9,1333.8,1186.7,472.2,1388.7],"page":1,"confidence":0.99}]},"Departments":{"type":"array","valueArray":[{"type":"string","valueString":"Cloud & Al Department","text":"Cloud & Al Department","boundingBox":[479.5,1399.5,1592,1129.5,1614.4,1221.6,501.9,1491.6],"page":1,"confidence":0.99}]},"Emails":{"type":"array","valueArray":[{"type":"string","valueString":"avery.smith@contoso.com","text":"avery.smith@contoso.com","boundingBox":[2108,934,2918,696,2936,763,2126,995],"page":1,"confidence":0.99}]},"Websites":{"type":"array","valueArray":[{"type":"string","valueString":"https://www.contoso.com/","text":"https://www.contoso.com/","boundingBox":[2121,1002,2992,755,3014,826,2143,1076],"page":1,"confidence":0.995}]},"MobilePhones":{"type":"array","valueArray":[{"type":"phoneNumber","text":"+44 (0) 7911 123456","boundingBox":[2432.7,1029.6,3074,835,3098.5,915.8,2457.3,1110.3],"page":1,"confidence":0.99}]},"OtherPhones":{"type":"array","valueArray":[{"type":"phoneNumber","text":"+44 (0) 20 9876 5432","boundingBox":[2473,1114.8,3139.3,907.7,3163.2,984.8,2497,1191.9],"page":1,"confidence":0.989}]},"Faxes":{"type":"array","valueArray":[{"type":"phoneNumber","text":"+44 (0) 20 6789 2345","boundingBox":[2526.5,1190.4,3191.2,978.9,3216.5,1058.4,2551.8,1269.9],"page":1,"confidence":0.99}]},"Addresses":{"type":"array","valueArray":[{"type":"string","valueString":"2 Kingdom Street Paddington, London, W2 6BD","text":"2 Kingdom Street Paddington, London, W2 6BD","boundingBox":[1230,2138,2535,1678.3,2614,1902.6,1309,2362.4],"page":1,"confidence":0.977}]},"CompanyNames":{"type":"array","valueArray":[{"type":"string","valueString":"Contoso","text":"Contoso","boundingBox":[1152,1916,2293,1551,2357,1733,1219,2105],"page":1,"confidence":0.068}]}}}]}}, [
  'Content-Length',
  '2674',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '21',
  'apim-request-id',
  'ac00f707-b670-4a14-a722-b9636f571e9c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 10 Nov 2020 18:46:26 GMT'
]);
