let nock = require('nock');

module.exports.hash = "c183f90de1d80e43b44dc392c8135c40";

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
  '30879aa6-a9d8-4f0c-9200-89ff3a879702',
  'x-ms-ests-server',
  '2.1.11198.13 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AiYOGZYyAIJIiD6Q3kAUFPP0CyfMAQAAAJ3WPNcOAAAA; expires=Thu, 10-Dec-2020 18:44:45 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 10 Nov 2020 18:44:44 GMT',
  'Content-Length',
  '1500'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.1/prebuilt/businessCard/analyze', {"source":"https://storageaccount/testingdata/businessCard.png?sastoken"})
  .reply(202, "", [
  'Content-Length',
  '0',
  'Operation-Location',
  'https://endpoint/formrecognizer/v2.1-preview.1/prebuilt/businessCard/analyzeResults/c8ed5b4b-d966-474b-8865-946abd0275ea',
  'x-envoy-upstream-service-time',
  '6282',
  'apim-request-id',
  'c8ed5b4b-d966-474b-8865-946abd0275ea',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 10 Nov 2020 18:44:51 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/prebuilt/businessCard/analyzeResults/c8ed5b4b-d966-474b-8865-946abd0275ea')
  .reply(200, {"status":"running","createdDateTime":"2020-11-10T18:44:46Z","lastUpdatedDateTime":"2020-11-10T18:44:52Z"}, [
  'Content-Length',
  '106',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  '279d298f-52d4-41cb-a3c0-724cb463fd13',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 10 Nov 2020 18:44:51 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/prebuilt/businessCard/analyzeResults/c8ed5b4b-d966-474b-8865-946abd0275ea')
  .reply(200, {"status":"running","createdDateTime":"2020-11-10T18:44:46Z","lastUpdatedDateTime":"2020-11-10T18:44:52Z"}, [
  'Content-Length',
  '106',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '20',
  'apim-request-id',
  '22a0b756-ba31-4050-9c8d-f5ed094c3869',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 10 Nov 2020 18:44:51 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/prebuilt/businessCard/analyzeResults/c8ed5b4b-d966-474b-8865-946abd0275ea')
  .reply(200, {"status":"succeeded","createdDateTime":"2020-11-10T18:44:46Z","lastUpdatedDateTime":"2020-11-10T18:44:55Z","analyzeResult":{"version":"2.1.0","readResults":[{"page":1,"angle":-17.1052,"width":4032,"height":3024,"unit":"pixel"}],"documentResults":[{"docType":"prebuilt:businesscard","pageRange":[1,1],"fields":{"ContactNames":{"type":"array","valueArray":[{"type":"object","valueObject":{"FirstName":{"type":"string","valueString":"Avery","text":"Avery","boundingBox":[703,1096,1135,989,1166,1108,733,1206],"page":1},"LastName":{"type":"string","valueString":"Smith","text":"Smith","boundingBox":[1187,976,1586,879,1619,998,1218,1096],"page":1}},"text":"Dr. Avery Smith","boundingBox":[419.5,1155.5,1590.5,877.9,1619.7,1000.8,448.6,1278.3],"confidence":0.794}]},"JobTitles":{"type":"array","valueArray":[{"type":"string","valueString":"Senior Researcher","text":"Senior Researcher","boundingBox":[451.8,1301.9,1313.5,1099.9,1333.8,1186.7,472.2,1388.7],"page":1,"confidence":0.99}]},"Departments":{"type":"array","valueArray":[{"type":"string","valueString":"Cloud & Al Department","text":"Cloud & Al Department","boundingBox":[479.5,1399.5,1592,1129.5,1614.4,1221.6,501.9,1491.6],"page":1,"confidence":0.99}]},"Emails":{"type":"array","valueArray":[{"type":"string","valueString":"avery.smith@contoso.com","text":"avery.smith@contoso.com","boundingBox":[2108,934,2918,696,2936,763,2126,995],"page":1,"confidence":0.99}]},"Websites":{"type":"array","valueArray":[{"type":"string","valueString":"https://www.contoso.com/","text":"https://www.contoso.com/","boundingBox":[2121,1002,2992,755,3014,826,2143,1076],"page":1,"confidence":0.995}]},"MobilePhones":{"type":"array","valueArray":[{"type":"phoneNumber","text":"+44 (0) 7911 123456","boundingBox":[2432.7,1029.6,3074,835,3098.5,915.8,2457.3,1110.3],"page":1,"confidence":0.99}]},"OtherPhones":{"type":"array","valueArray":[{"type":"phoneNumber","text":"+44 (0) 20 9876 5432","boundingBox":[2473,1114.8,3139.3,907.7,3163.2,984.8,2497,1191.9],"page":1,"confidence":0.989}]},"Faxes":{"type":"array","valueArray":[{"type":"phoneNumber","text":"+44 (0) 20 6789 2345","boundingBox":[2526.5,1190.4,3191.2,978.9,3216.5,1058.4,2551.8,1269.9],"page":1,"confidence":0.99}]},"Addresses":{"type":"array","valueArray":[{"type":"string","valueString":"2 Kingdom Street Paddington, London, W2 6BD","text":"2 Kingdom Street Paddington, London, W2 6BD","boundingBox":[1230,2138,2535,1678.3,2614,1902.6,1309,2362.4],"page":1,"confidence":0.977}]},"CompanyNames":{"type":"array","valueArray":[{"type":"string","valueString":"Contoso","text":"Contoso","boundingBox":[1152,1916,2293,1551,2357,1733,1219,2105],"page":1,"confidence":0.068}]}}}]}}, [
  'Content-Length',
  '2674',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '32',
  'apim-request-id',
  '11751453-e574-48f0-87f3-d4db1c1db6f7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 10 Nov 2020 18:44:56 GMT'
]);
