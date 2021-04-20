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
  'f7b2e766-1ce3-42ae-9dea-63600f240300',
  'x-ms-ests-server',
  '2.1.11562.10 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AjzFVQ1mzahOgLFbzhWoi1fGLH8mFAAAACKn9dcOAAAA; expires=Thu, 29-Apr-2021 23:15:43 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 30 Mar 2021 23:15:42 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.3/prebuilt/businessCard/analyze', {"source":"https://storageaccount/testingdata/businessCard.png?sastoken"})
  .reply(202, "", [
  'Content-Length',
  '0',
  'Operation-Location',
  'https://endpoint/formrecognizer/v2.1-preview.3/prebuilt/businessCard/analyzeResults/6aaacfde-5f6f-403b-8cee-e3906f6d80ac',
  'x-envoy-upstream-service-time',
  '1222',
  'apim-request-id',
  '6aaacfde-5f6f-403b-8cee-e3906f6d80ac',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:15:44 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/prebuilt/businessCard/analyzeResults/6aaacfde-5f6f-403b-8cee-e3906f6d80ac')
  .reply(200, {"status":"running","createdDateTime":"2021-03-30T23:15:44Z","lastUpdatedDateTime":"2021-03-30T23:15:45Z"}, [
  'Content-Length',
  '106',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '47aa3647-b147-4e3c-9789-1c7feab3519c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:15:44 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/prebuilt/businessCard/analyzeResults/6aaacfde-5f6f-403b-8cee-e3906f6d80ac')
  .reply(200, {"status":"running","createdDateTime":"2021-03-30T23:15:44Z","lastUpdatedDateTime":"2021-03-30T23:15:45Z"}, [
  'Content-Length',
  '106',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  '5c1178cb-1325-4761-b209-5fd42fd50bdc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:15:44 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/prebuilt/businessCard/analyzeResults/6aaacfde-5f6f-403b-8cee-e3906f6d80ac')
  .reply(200, {"status":"succeeded","createdDateTime":"2021-03-30T23:15:44Z","lastUpdatedDateTime":"2021-03-30T23:15:48Z","analyzeResult":{"version":"2.1.0","readResults":[{"page":1,"angle":-16.693,"width":4032,"height":3024,"unit":"pixel"}],"documentResults":[{"docType":"prebuilt:businesscard","pageRange":[1,1],"fields":{"Addresses":{"type":"array","valueArray":[{"type":"string","valueString":"2 Kingdom Street Paddington, London, W2 6BD","text":"2 Kingdom Street Paddington, London, W2 6BD","boundingBox":[1227.4,2138.3,2528.6,1688.4,2605.1,1909.5,1303.9,2359.4],"page":1,"confidence":0.98}]},"CompanyNames":{"type":"array","valueArray":[{"type":"string","valueString":"Contoso","text":"Contoso","boundingBox":[1146,1927,2231,1585,2293,1753,1202,2099],"page":1,"confidence":0.168}]},"ContactNames":{"type":"array","valueArray":[{"type":"object","valueObject":{"FirstName":{"type":"string","valueString":"Avery","text":"Avery","boundingBox":[667,1102,1111,995,1141,1114,696,1216],"page":1},"LastName":{"type":"string","valueString":"Smith","text":"Smith","boundingBox":[1170,981,1570,881,1600,1000,1200,1100],"page":1}},"text":"Dr. Avery Smith","boundingBox":[414.1,1152.8,1571.9,880.5,1601.4,1005.8,443.5,1278],"page":1,"confidence":0.979}]},"Departments":{"type":"array","valueArray":[{"type":"string","valueString":"Cloud & Al Department","text":"Cloud & Al Department","boundingBox":[472,1403,1589,1133,1610.7,1223,493.7,1493],"page":1,"confidence":0.989}]},"Emails":{"type":"array","valueArray":[{"type":"string","valueString":"avery.smith@contoso.com","text":"avery.smith@contoso.com","boundingBox":[2106,934,2909,706,2922,768,2122,993],"page":1,"confidence":0.99}]},"Faxes":{"type":"array","valueArray":[{"type":"phoneNumber","text":"+44 (0) 20 6789 2345","boundingBox":[2519.4,1195,3189.9,984.7,3213.7,1060.6,2543.2,1270.9],"page":1,"confidence":0.99}]},"JobTitles":{"type":"array","valueArray":[{"type":"string","valueString":"Senior Researcher","text":"Senior Researcher","boundingBox":[449.9,1311.6,1315,1104,1334.1,1183.4,469,1391],"page":1,"confidence":0.99}]},"MobilePhones":{"type":"array","valueArray":[{"type":"phoneNumber","text":"+44 (0) 7911 123456","boundingBox":[2426.8,1039.4,3065,847.5,3086.5,919.2,2448.3,1111.1],"page":1,"confidence":0.99}]},"Websites":{"type":"array","valueArray":[{"type":"string","valueString":"https://www.contoso.com/","text":"https://www.contoso.com/","boundingBox":[2120,1003,2980,757,3005,824,2139,1075],"page":1,"confidence":0.99}]},"WorkPhones":{"type":"array","valueArray":[{"type":"phoneNumber","text":"+44 (0) 20 9876 5432","boundingBox":[2468.3,1118.6,3128.3,914.9,3151,988.1,2490.9,1191.9],"page":1,"confidence":0.989}]}}}]}}, [
  'Content-Length',
  '2673',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '21',
  'apim-request-id',
  '9a97fe43-aa7b-4ea7-ab2c-89fe9bc0af01',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:15:49 GMT'
]);
