let nock = require('nock');

module.exports.hash = "2d00c220f80d3fd91b96ff72e26a8ea2";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.0-preview/prebuilt/receipt/analyze', {"source":"https://storageaccount/testingdata/contoso-allinone.jpg?sastoken"})
  .reply(202, "", [
  'Content-Length',
  '0',
  'Operation-Location',
  'https://endpoint/formrecognizer/v2.0-preview/prebuilt/receipt/analyzeResults/880c0dfc-7380-4d5b-a7ff-482d9f2fb868',
  'x-envoy-upstream-service-time',
  '657',
  'apim-request-id',
  '880c0dfc-7380-4d5b-a7ff-482d9f2fb868',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 02 May 2020 19:59:43 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0-preview/prebuilt/receipt/analyzeResults/880c0dfc-7380-4d5b-a7ff-482d9f2fb868')
  .reply(200, {"status":"notStarted","createdDateTime":"2020-05-02T19:59:43Z","lastUpdatedDateTime":"2020-05-02T19:59:43Z"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'a4e99046-30cc-4495-8c88-d5ec9cbe5bb5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 02 May 2020 19:59:43 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0-preview/prebuilt/receipt/analyzeResults/880c0dfc-7380-4d5b-a7ff-482d9f2fb868')
  .reply(200, {"status":"notStarted","createdDateTime":"2020-05-02T19:59:43Z","lastUpdatedDateTime":"2020-05-02T19:59:43Z"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'ac6da898-df45-4556-bdc6-56f285d3a908',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 02 May 2020 19:59:43 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0-preview/prebuilt/receipt/analyzeResults/880c0dfc-7380-4d5b-a7ff-482d9f2fb868')
  .reply(200, {"status":"running","createdDateTime":"2020-05-02T19:59:43Z","lastUpdatedDateTime":"2020-05-02T19:59:44Z"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '38',
  'apim-request-id',
  '3d366132-12a9-4b89-8e12-be793afcc05c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 02 May 2020 19:59:48 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0-preview/prebuilt/receipt/analyzeResults/880c0dfc-7380-4d5b-a7ff-482d9f2fb868')
  .reply(200, {"status":"succeeded","createdDateTime":"2020-05-02T19:59:43Z","lastUpdatedDateTime":"2020-05-02T19:59:50Z","analyzeResult":{"version":"2.0.0","readResults":[{"page":1,"angle":0.6893,"width":1688,"height":3000,"unit":"pixel","language":"en"}],"documentResults":[{"docType":"prebuilt:receipt","pageRange":[1,1],"fields":{"ReceiptType":{"type":"string","valueString":"Itemized","confidence":0.692},"MerchantName":{"type":"string","valueString":"Contoso Contoso","text":"Contoso Contoso","boundingBox":[378.2,292.4,1117.7,468.3,1035.7,812.7,296.3,636.8],"page":1,"confidence":0.613},"MerchantAddress":{"type":"string","valueString":"123 Main Street Redmond, WA 98052","text":"123 Main Street Redmond, WA 98052","boundingBox":[302,675.8,848.1,793.7,809.9,970.4,263.9,852.5],"page":1,"confidence":0.99},"MerchantPhoneNumber":{"type":"phoneNumber","valuePhoneNumber":"+19876543210","text":"987-654-3210","boundingBox":[278,1004,656.3,1054.7,646.8,1125.3,268.5,1074.7],"page":1,"confidence":0.99},"TransactionDate":{"type":"date","valueDate":"2019-06-10","text":"6/10/2019","boundingBox":[265.1,1228.4,525,1247,518.9,1332.1,259,1313.5],"page":1,"confidence":0.99},"TransactionTime":{"type":"time","valueTime":"13:59:00","text":"13:59","boundingBox":[541,1248,677.3,1261.5,668.9,1346.5,532.6,1333],"page":1,"confidence":0.977},"Items":{"type":"array","valueArray":[{"type":"object","valueObject":{"Quantity":{"type":"number","text":"1","boundingBox":[245.1,1581.5,300.9,1585.1,295,1676,239.2,1672.4],"page":1,"confidence":0.92},"Name":{"type":"string","valueString":"Cappuccino","text":"Cappuccino","boundingBox":[322,1586,654.2,1601.1,650,1693,317.8,1678],"page":1,"confidence":0.923},"TotalPrice":{"type":"number","valueNumber":2.2,"text":"$2.20","boundingBox":[1107.7,1584,1263,1574,1268.3,1656,1113,1666],"page":1,"confidence":0.918}}},{"type":"object","valueObject":{"Quantity":{"type":"number","text":"1","boundingBox":[232,1834,286.6,1835,285,1921,230.4,1920],"page":1,"confidence":0.858},"Name":{"type":"string","valueString":"BACON & EGGS","text":"BACON & EGGS","boundingBox":[308,1836,746,1841.4,745,1925.4,307,1920],"page":1,"confidence":0.916},"TotalPrice":{"type":"number","text":"$9.5","boundingBox":[1133.9,1955,1257,1952,1259.1,2036,1136,2039],"page":1,"confidence":0.916}}}]},"Subtotal":{"type":"number","valueNumber":11.7,"text":"11.70","boundingBox":[1146,2221,1297.3,2223,1296,2319,1144.7,2317],"page":1,"confidence":0.955},"Tax":{"type":"number","valueNumber":1.17,"text":"1.17","boundingBox":[1190,2359,1304,2359,1304,2456,1190,2456],"page":1,"confidence":0.979},"Tip":{"type":"number","valueNumber":1.63,"text":"1.63","boundingBox":[1094,2479,1267.7,2485,1264,2591,1090.3,2585],"page":1,"confidence":0.941},"Total":{"type":"number","valueNumber":14.5,"text":"$14.50","boundingBox":[1034.2,2617,1387.5,2638.2,1380,2763,1026.7,2741.8],"page":1,"confidence":0.985}}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '79',
  'apim-request-id',
  'da9680f9-3790-4671-b3c8-4e388d78a054',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 02 May 2020 19:59:54 GMT'
]);
