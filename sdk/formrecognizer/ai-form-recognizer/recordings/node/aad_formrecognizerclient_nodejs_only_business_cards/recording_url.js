let nock = require('nock');

module.exports.hash = "c183f90de1d80e43b44dc392c8135c40";

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
  '1bae591e-46dd-4fb6-a3fe-230aaf162e00',
  'x-ms-ests-server',
  '2.1.11251.20 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AmDno_SZv4hClMuirVNbM2bGLH8mAQAAAEUxStcOAAAA; expires=Sun, 20-Dec-2020 21:51:02 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 20 Nov 2020 21:51:02 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.2/prebuilt/businessCard/analyze', {"source":"https://storageaccount/testingdata/businessCard.png?sastoken"})
  .reply(202, "", [
  'Content-Length',
  '0',
  'Operation-Location',
  'https://endpoint/formrecognizer/v2.1-preview.2/prebuilt/businessCard/analyzeResults/2b1cd249-fc0d-4722-a65a-9c7be685718a',
  'x-envoy-upstream-service-time',
  '2037',
  'apim-request-id',
  '2b1cd249-fc0d-4722-a65a-9c7be685718a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 21:51:05 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/prebuilt/businessCard/analyzeResults/2b1cd249-fc0d-4722-a65a-9c7be685718a')
  .reply(200, {"status":"notStarted","createdDateTime":"2020-11-20T21:51:05Z","lastUpdatedDateTime":"2020-11-20T21:51:05Z"}, [
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  'e703a9d4-466d-4ae3-a941-cfa061b4561b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 21:51:05 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/prebuilt/businessCard/analyzeResults/2b1cd249-fc0d-4722-a65a-9c7be685718a')
  .reply(200, {"status":"notStarted","createdDateTime":"2020-11-20T21:51:05Z","lastUpdatedDateTime":"2020-11-20T21:51:05Z"}, [
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  'fe7f3eaf-9c3e-415f-8594-7a7158d214cc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 21:51:05 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/prebuilt/businessCard/analyzeResults/2b1cd249-fc0d-4722-a65a-9c7be685718a')
  .reply(200, {"status":"succeeded","createdDateTime":"2020-11-20T21:51:05Z","lastUpdatedDateTime":"2020-11-20T21:51:08Z","analyzeResult":{"version":"2.1.0","readResults":[{"page":1,"angle":-16.693,"width":4032,"height":3024,"unit":"pixel"}],"documentResults":[{"docType":"prebuilt:businesscard","pageRange":[1,1],"fields":{"ContactNames":{"type":"array","valueArray":[{"type":"object","valueObject":{"FirstName":{"type":"string","valueString":"Avery","text":"Avery","boundingBox":[683,1098,1158,984,1187,1103,713,1212],"page":1},"LastName":{"type":"string","valueString":"Smith","text":"Smith","boundingBox":[1179,979,1610,871,1638,990,1209,1098],"page":1}},"text":"Dr. Avery Smith","boundingBox":[413.9,1152.1,1610,871,1639.6,996.8,443.5,1277.9],"page":1,"confidence":0.979}]},"JobTitles":{"type":"array","valueArray":[{"type":"string","valueString":"Senior Researcher","text":"Senior Researcher","boundingBox":[446.7,1312.8,1323,1102,1341.8,1180.3,465.6,1391.2],"page":1,"confidence":0.99}]},"Departments":{"type":"array","valueArray":[{"type":"string","valueString":"Cloud & Al Department","text":"Cloud & Al Department","boundingBox":[472.7,1407.2,1597,1131,1618.4,1218.2,494.1,1494.4],"page":1,"confidence":0.989}]},"Emails":{"type":"array","valueArray":[{"type":"string","valueString":"avery.smith@contoso.com","text":"avery.smith@contoso.com","boundingBox":[2103,935,2927,701,2939,763,2119,993],"page":1,"confidence":0.99}]},"Websites":{"type":"array","valueArray":[{"type":"string","valueString":"https://www.contoso.com/","text":"https://www.contoso.com/","boundingBox":[2116,1004,2980,757,3005,824,2136,1075],"page":1,"confidence":0.99}]},"MobilePhones":{"type":"array","valueArray":[{"type":"phoneNumber","text":"+44 (0) 7911 123456","boundingBox":[2431.8,1037.1,3079,843.8,3100.5,915.5,2453.3,1108.9],"page":1,"confidence":0.99}]},"OtherPhones":{"type":"array","valueArray":[{"type":"phoneNumber","text":"+44 (0) 20 9876 5432","boundingBox":[2465.2,1120.4,3133.9,911.4,3156.8,984.6,2488.1,1193.6],"page":1,"confidence":0.99}]},"Faxes":{"type":"array","valueArray":[{"type":"phoneNumber","text":"+44 (0) 20 6789 2345","boundingBox":[2520.4,1195.3,3196.8,982.3,3220.6,1058,2544.2,1271],"page":1,"confidence":0.99}]},"CompanyNames":{"type":"array","valueArray":[{"type":"string","valueString":"Contoso","text":"Contoso","boundingBox":[1157,1923,2306,1562,2368,1728,1214,2098],"page":1,"confidence":0.222}]},"Addresses":{"type":"array","valueArray":[{"type":"string","valueString":"2 Kingdom Street Paddington, London, W2 6BD","text":"2 Kingdom Street Paddington, London, W2 6BD","boundingBox":[1224.6,2139.5,2537.7,1685.6,2614.2,1906.9,1301.1,2360.8],"page":1,"confidence":0.979}]}}}]}}, [
  'Content-Length',
  '2682',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  'c81111a9-701f-46e4-aaf0-2ab7d166bcb5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 21:51:10 GMT'
]);
