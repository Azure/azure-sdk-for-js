let nock = require('nock');

module.exports.hash = "c183f90de1d80e43b44dc392c8135c40";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.2/prebuilt/businessCard/analyze', {"source":"https://storageaccount/testingdata/businessCard.png?sastoken"})
  .reply(202, "", [
  'Content-Length',
  '0',
  'Operation-Location',
  'https://endpoint/formrecognizer/v2.1-preview.2/prebuilt/businessCard/analyzeResults/eceba61d-e9ef-48d1-a211-fd04113bb5d6',
  'x-envoy-upstream-service-time',
  '1580',
  'apim-request-id',
  'eceba61d-e9ef-48d1-a211-fd04113bb5d6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 19 Nov 2020 15:50:09 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/prebuilt/businessCard/analyzeResults/eceba61d-e9ef-48d1-a211-fd04113bb5d6')
  .reply(200, {"status":"notStarted","createdDateTime":"2020-11-19T15:50:10Z","lastUpdatedDateTime":"2020-11-19T15:50:10Z"}, [
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  'c415c2fd-3312-4992-8460-8e8a75c3f43f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 19 Nov 2020 15:50:09 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/prebuilt/businessCard/analyzeResults/eceba61d-e9ef-48d1-a211-fd04113bb5d6')
  .reply(200, {"status":"running","createdDateTime":"2020-11-19T15:50:10Z","lastUpdatedDateTime":"2020-11-19T15:50:10Z"}, [
  'Content-Length',
  '106',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  '9794b203-e92c-40ee-baf0-00ae308e8139',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 19 Nov 2020 15:50:09 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/prebuilt/businessCard/analyzeResults/eceba61d-e9ef-48d1-a211-fd04113bb5d6')
  .reply(200, {"status":"succeeded","createdDateTime":"2020-11-19T15:50:10Z","lastUpdatedDateTime":"2020-11-19T15:50:14Z","analyzeResult":{"version":"2.1.0","readResults":[{"page":1,"angle":-16.693,"width":4032,"height":3024,"unit":"pixel"}],"documentResults":[{"docType":"prebuilt:businesscard","pageRange":[1,1],"fields":{"ContactNames":{"type":"array","valueArray":[{"type":"object","valueObject":{"FirstName":{"type":"string","valueString":"Avery","text":"Avery","boundingBox":[683,1098,1158,984,1187,1103,713,1212],"page":1},"LastName":{"type":"string","valueString":"Smith","text":"Smith","boundingBox":[1179,979,1610,871,1638,990,1209,1098],"page":1}},"text":"Dr. Avery Smith","boundingBox":[413.9,1152.1,1610,871,1639.6,996.8,443.5,1277.9],"page":1,"confidence":0.979}]},"JobTitles":{"type":"array","valueArray":[{"type":"string","valueString":"Senior Researcher","text":"Senior Researcher","boundingBox":[446.7,1312.8,1323,1102,1341.8,1180.3,465.6,1391.2],"page":1,"confidence":0.99}]},"Departments":{"type":"array","valueArray":[{"type":"string","valueString":"Cloud & Al Department","text":"Cloud & Al Department","boundingBox":[472.7,1407.2,1597,1131,1618.4,1218.2,494.1,1494.4],"page":1,"confidence":0.989}]},"Emails":{"type":"array","valueArray":[{"type":"string","valueString":"avery.smith@contoso.com","text":"avery.smith@contoso.com","boundingBox":[2103,935,2927,701,2939,763,2119,993],"page":1,"confidence":0.99}]},"Websites":{"type":"array","valueArray":[{"type":"string","valueString":"https://www.contoso.com/","text":"https://www.contoso.com/","boundingBox":[2116,1004,2980,757,3005,824,2136,1075],"page":1,"confidence":0.99}]},"MobilePhones":{"type":"array","valueArray":[{"type":"phoneNumber","text":"+44 (0) 7911 123456","boundingBox":[2431.8,1037.1,3079,843.8,3100.5,915.5,2453.3,1108.9],"page":1,"confidence":0.99}]},"OtherPhones":{"type":"array","valueArray":[{"type":"phoneNumber","text":"+44 (0) 20 9876 5432","boundingBox":[2465.2,1120.4,3133.9,911.4,3156.8,984.6,2488.1,1193.6],"page":1,"confidence":0.99}]},"Faxes":{"type":"array","valueArray":[{"type":"phoneNumber","text":"+44 (0) 20 6789 2345","boundingBox":[2520.4,1195.3,3196.8,982.3,3220.6,1058,2544.2,1271],"page":1,"confidence":0.99}]},"CompanyNames":{"type":"array","valueArray":[{"type":"string","valueString":"Contoso","text":"Contoso","boundingBox":[1157,1923,2306,1562,2368,1728,1214,2098],"page":1,"confidence":0.222}]},"Addresses":{"type":"array","valueArray":[{"type":"string","valueString":"2 Kingdom Street Paddington, London, W2 6BD","text":"2 Kingdom Street Paddington, London, W2 6BD","boundingBox":[1224.6,2139.5,2537.7,1685.6,2614.2,1906.9,1301.1,2360.8],"page":1,"confidence":0.979}]}}}]}}, [
  'Content-Length',
  '2682',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '22',
  'apim-request-id',
  '9388b84e-faad-4dd3-b2a3-3b746b2b679f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 19 Nov 2020 15:50:14 GMT'
]);
