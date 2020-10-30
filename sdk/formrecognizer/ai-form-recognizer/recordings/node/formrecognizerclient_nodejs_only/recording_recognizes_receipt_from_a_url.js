let nock = require('nock');

module.exports.hash = "e8d95b6cb8a2eb6246609d79d00aa853";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.1/prebuilt/receipt/analyze', {"source":"https://storageaccount/testingdata/contoso-allinone.jpg?sastoken"})
  .reply(202, "", [
  'Content-Length',
  '0',
  'Operation-Location',
  'https://endpoint/formrecognizer/v2.1-preview.1/prebuilt/receipt/analyzeResults/5fd4e854-75fc-480e-85ff-796db25188ac',
  'x-envoy-upstream-service-time',
  '560',
  'apim-request-id',
  '5fd4e854-75fc-480e-85ff-796db25188ac',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 21 Oct 2020 18:07:06 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/prebuilt/receipt/analyzeResults/5fd4e854-75fc-480e-85ff-796db25188ac')
  .reply(200, {"status":"notStarted","createdDateTime":"2020-10-21T18:07:06Z","lastUpdatedDateTime":"2020-10-21T18:07:06Z"}, [
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  'db3d2724-f7de-488b-b681-8fcbfc0adbb1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 21 Oct 2020 18:07:06 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/prebuilt/receipt/analyzeResults/5fd4e854-75fc-480e-85ff-796db25188ac')
  .reply(200, {"status":"notStarted","createdDateTime":"2020-10-21T18:07:06Z","lastUpdatedDateTime":"2020-10-21T18:07:06Z"}, [
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '23',
  'apim-request-id',
  '97990329-d23a-4a50-b1ac-7774359bd7f5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 21 Oct 2020 18:07:06 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/prebuilt/receipt/analyzeResults/5fd4e854-75fc-480e-85ff-796db25188ac')
  .reply(200, {"status":"succeeded","createdDateTime":"2020-10-21T18:07:06Z","lastUpdatedDateTime":"2020-10-21T18:07:08Z","analyzeResult":{"version":"2.1.0","readResults":[{"page":1,"angle":0.6893,"width":1688,"height":3000,"unit":"pixel"}],"documentResults":[{"docType":"prebuilt:receipt","pageRange":[1,1],"fields":{"ReceiptType":{"type":"string","valueString":"Itemized","confidence":0.692},"MerchantName":{"type":"string","valueString":"Contoso Contoso","text":"Contoso Contoso","boundingBox":[378.2,292.4,1117.7,468.3,1035.7,812.7,296.3,636.8],"page":1,"confidence":0.613},"MerchantAddress":{"type":"string","valueString":"123 Main Street Redmond, WA 98052","text":"123 Main Street Redmond, WA 98052","boundingBox":[302,675.8,848.1,793.7,809.9,970.4,263.9,852.5],"page":1,"confidence":0.99},"MerchantPhoneNumber":{"type":"phoneNumber","valuePhoneNumber":"+19876543210","text":"987-654-3210","boundingBox":[278,1004,656,1057,647,1123,271,1075],"page":1,"confidence":0.99},"TransactionDate":{"type":"date","valueDate":"2019-06-10","text":"6/10/2019","boundingBox":[267,1229,525,1247,517,1332,259,1313],"page":1,"confidence":0.99},"TransactionTime":{"type":"time","valueTime":"13:59:00","text":"13:59","boundingBox":[541,1248,677,1263,669,1345,533,1333],"page":1,"confidence":0.977},"Items":{"type":"array","valueArray":[{"type":"object","valueObject":{"Quantity":{"type":"number","valueNumber":1,"text":"1","boundingBox":[245,1583,299,1585,295,1676,241,1671],"page":1,"confidence":0.92},"Name":{"type":"string","valueString":"Cappuccino","text":"Cappuccino","boundingBox":[322,1586,654,1605,648,1689,318,1678],"page":1,"confidence":0.923},"TotalPrice":{"type":"number","valueNumber":2.2,"text":"$2.20","boundingBox":[1108,1584,1263,1574,1268,1656,1113,1666],"page":1,"confidence":0.918}}},{"type":"object","valueObject":{"Quantity":{"type":"number","valueNumber":1,"text":"1","boundingBox":[232,1834,286,1836,285,1920,231,1920],"page":1,"confidence":0.858},"Name":{"type":"string","valueString":"BACON & EGGS","text":"BACON & EGGS","boundingBox":[308,1836,746,1841.4,745,1925.4,307,1920],"page":1,"confidence":0.916},"TotalPrice":{"type":"number","valueNumber":9.5,"text":"$9.5","boundingBox":[1135,1955,1257,1952,1259,2036,1136,2039],"page":1,"confidence":0.916}}}]},"Subtotal":{"type":"number","valueNumber":11.7,"text":"11.70","boundingBox":[1146,2221,1297,2223,1296,2319,1145,2317],"page":1,"confidence":0.955},"Tax":{"type":"number","valueNumber":1.17,"text":"1.17","boundingBox":[1190,2359,1304,2359,1304,2456,1190,2456],"page":1,"confidence":0.979},"Tip":{"type":"number","valueNumber":1.63,"text":"1.63","boundingBox":[1094,2479,1267,2485,1264,2591,1091,2585],"page":1,"confidence":0.941},"Total":{"type":"number","valueNumber":14.5,"text":"$14.50","boundingBox":[1034,2620,1384,2638,1380,2763,1030,2739],"page":1,"confidence":0.985}}}]}}, [
  'Content-Length',
  '2835',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '36',
  'apim-request-id',
  'd5583613-22b8-4f19-acd6-bb9698fa4f62',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 21 Oct 2020 18:07:11 GMT'
]);
