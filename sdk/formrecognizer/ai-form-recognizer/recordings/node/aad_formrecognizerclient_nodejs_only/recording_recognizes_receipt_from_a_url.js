let nock = require('nock');

module.exports.hash = "e8d95b6cb8a2eb6246609d79d00aa853";

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
  'd21c7171-0649-4f47-8758-24f550430f00',
  'x-ms-ests-server',
  '2.1.11198.13 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AkzZ-AedwRZBrvGtZPFS35_0CyfMAQAAAOyKLtcOAAAA; expires=Sun, 29-Nov-2020 22:30:05 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 30 Oct 2020 22:30:04 GMT',
  'Content-Length',
  '1500'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.1/prebuilt/receipt/analyze', {"source":"https://storageaccount/testingdata/contoso-allinone.jpg?sastoken"})
  .reply(202, "", [
  'Content-Length',
  '0',
  'Operation-Location',
  'https://endpoint/formrecognizer/v2.1-preview.1/prebuilt/receipt/analyzeResults/90dcefb4-74df-4f46-a526-4bbbdf06438a',
  'x-envoy-upstream-service-time',
  '566',
  'apim-request-id',
  '90dcefb4-74df-4f46-a526-4bbbdf06438a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:30:05 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/prebuilt/receipt/analyzeResults/90dcefb4-74df-4f46-a526-4bbbdf06438a')
  .reply(200, {"status":"running","createdDateTime":"2020-10-30T22:30:06Z","lastUpdatedDateTime":"2020-10-30T22:30:06Z"}, [
  'Content-Length',
  '106',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '26',
  'apim-request-id',
  'fc60a433-780d-4a5e-9f73-172453a71419',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:30:06 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/prebuilt/receipt/analyzeResults/90dcefb4-74df-4f46-a526-4bbbdf06438a')
  .reply(200, {"status":"running","createdDateTime":"2020-10-30T22:30:06Z","lastUpdatedDateTime":"2020-10-30T22:30:06Z"}, [
  'Content-Length',
  '106',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '24',
  'apim-request-id',
  '837ddf3e-b188-400a-95d4-be7f8e9ba809',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:30:06 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/prebuilt/receipt/analyzeResults/90dcefb4-74df-4f46-a526-4bbbdf06438a')
  .reply(200, {"status":"succeeded","createdDateTime":"2020-10-30T22:30:06Z","lastUpdatedDateTime":"2020-10-30T22:30:08Z","analyzeResult":{"version":"2.1.0","readResults":[{"page":1,"angle":0.6893,"width":1688,"height":3000,"unit":"pixel"}],"documentResults":[{"docType":"prebuilt:receipt","pageRange":[1,1],"fields":{"ReceiptType":{"type":"string","valueString":"Itemized","confidence":0.692},"MerchantName":{"type":"string","valueString":"Contoso Contoso","text":"Contoso Contoso","boundingBox":[378.2,292.4,1117.7,468.3,1035.7,812.7,296.3,636.8],"page":1,"confidence":0.613},"MerchantAddress":{"type":"string","valueString":"123 Main Street Redmond, WA 98052","text":"123 Main Street Redmond, WA 98052","boundingBox":[302,675.8,848.1,793.7,809.9,970.4,263.9,852.5],"page":1,"confidence":0.99},"MerchantPhoneNumber":{"type":"phoneNumber","valuePhoneNumber":"+19876543210","text":"987-654-3210","boundingBox":[278,1004,656,1057,647,1123,271,1075],"page":1,"confidence":0.99},"TransactionDate":{"type":"date","valueDate":"2019-06-10","text":"6/10/2019","boundingBox":[267,1229,525,1247,517,1332,259,1313],"page":1,"confidence":0.99},"TransactionTime":{"type":"time","valueTime":"13:59:00","text":"13:59","boundingBox":[541,1248,677,1263,669,1345,533,1333],"page":1,"confidence":0.977},"Items":{"type":"array","valueArray":[{"type":"object","valueObject":{"Quantity":{"type":"number","valueNumber":1,"text":"1","boundingBox":[245,1583,299,1585,295,1676,241,1671],"page":1,"confidence":0.92},"Name":{"type":"string","valueString":"Cappuccino","text":"Cappuccino","boundingBox":[322,1586,654,1605,648,1689,318,1678],"page":1,"confidence":0.923},"TotalPrice":{"type":"number","valueNumber":2.2,"text":"$2.20","boundingBox":[1108,1584,1263,1574,1268,1656,1113,1666],"page":1,"confidence":0.918}}},{"type":"object","valueObject":{"Quantity":{"type":"number","valueNumber":1,"text":"1","boundingBox":[232,1834,286,1836,285,1920,231,1920],"page":1,"confidence":0.858},"Name":{"type":"string","valueString":"BACON & EGGS","text":"BACON & EGGS","boundingBox":[308,1836,746,1841.4,745,1925.4,307,1920],"page":1,"confidence":0.916},"TotalPrice":{"type":"number","valueNumber":9.5,"text":"$9.5","boundingBox":[1135,1955,1257,1952,1259,2036,1136,2039],"page":1,"confidence":0.916}}}]},"Subtotal":{"type":"number","valueNumber":11.7,"text":"11.70","boundingBox":[1146,2221,1297,2223,1296,2319,1145,2317],"page":1,"confidence":0.955},"Tax":{"type":"number","valueNumber":1.17,"text":"1.17","boundingBox":[1190,2359,1304,2359,1304,2456,1190,2456],"page":1,"confidence":0.979},"Tip":{"type":"number","valueNumber":1.63,"text":"1.63","boundingBox":[1094,2479,1267,2485,1264,2591,1091,2585],"page":1,"confidence":0.941},"Total":{"type":"number","valueNumber":14.5,"text":"$14.50","boundingBox":[1034,2620,1384,2638,1380,2763,1030,2739],"page":1,"confidence":0.985}}}]}}, [
  'Content-Length',
  '2835',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '24',
  'apim-request-id',
  '17b06801-16f5-4382-95f4-267883d27d61',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:30:11 GMT'
]);
