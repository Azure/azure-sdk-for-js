let nock = require('nock');

module.exports.hash = "ac092c7781f53829a5d688b16a60c7d9";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1/prebuilt/receipt/analyze', {"source":"https://storageaccount/testingdata/contoso-allinone.jpg?sastoken"})
  .reply(202, "", [
  'Content-Length',
  '0',
  'Operation-Location',
  'https://endpoint/formrecognizer/v2.1/prebuilt/receipt/analyzeResults/bc197c9b-6598-48a9-a669-cbca4b767117',
  'x-envoy-upstream-service-time',
  '570',
  'apim-request-id',
  'bc197c9b-6598-48a9-a669-cbca4b767117',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:28:00 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/prebuilt/receipt/analyzeResults/bc197c9b-6598-48a9-a669-cbca4b767117')
  .reply(200, {"status":"running","createdDateTime":"2021-05-12T01:28:00Z","lastUpdatedDateTime":"2021-05-12T01:28:00Z"}, [
  'Content-Length',
  '106',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '5ae41a1c-6ed4-44a4-9b29-6487d346bec5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:28:00 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/prebuilt/receipt/analyzeResults/bc197c9b-6598-48a9-a669-cbca4b767117')
  .reply(200, {"status":"running","createdDateTime":"2021-05-12T01:28:00Z","lastUpdatedDateTime":"2021-05-12T01:28:00Z"}, [
  'Content-Length',
  '106',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  'a32bfad7-9ca9-42e0-b157-e7f81128b48f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:27:59 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/prebuilt/receipt/analyzeResults/bc197c9b-6598-48a9-a669-cbca4b767117')
  .reply(200, {"status":"succeeded","createdDateTime":"2021-05-12T01:28:00Z","lastUpdatedDateTime":"2021-05-12T01:28:04Z","analyzeResult":{"version":"2.1.0","readResults":[{"page":1,"angle":0.1273,"width":1688,"height":3000,"unit":"pixel"}],"documentResults":[{"docType":"prebuilt:receipt","pageRange":[1,1],"fields":{"Items":{"type":"array","valueArray":[{"type":"object","valueObject":{"Name":{"type":"string","valueString":"Cappuccino","text":"Cappuccino","boundingBox":[304,1585,658,1598,657,1688,302,1679],"page":1,"confidence":0.558},"Quantity":{"type":"number","valueNumber":1,"text":"1","boundingBox":[244,1581,286,1584,283,1678,241,1675],"page":1,"confidence":0.936},"TotalPrice":{"type":"number","valueNumber":2.2,"text":"$2.20","boundingBox":[1106,1579,1260,1574,1263,1656,1108,1662],"page":1,"confidence":0.972}}},{"type":"object","valueObject":{"Name":{"type":"string","valueString":"BACON & EGGS","text":"BACON & EGGS","boundingBox":[293,1839,737,1839,737,1924,293,1924],"page":1,"confidence":0.906},"Quantity":{"type":"number","valueNumber":1,"text":"1","boundingBox":[227,1839,275,1839,275,1924,226,1924],"page":1,"confidence":0.936},"TotalPrice":{"type":"number","valueNumber":9.5,"text":"$9.5","boundingBox":[1134,1948,1252,1948,1252,2041,1134,2041],"page":1,"confidence":0.977}}}]},"MerchantAddress":{"type":"string","valueString":"123 Main Street Redmond, WA 98052","text":"123 Main Street Redmond, WA 98052","boundingBox":[298.6,675.8,844.8,782.2,810.6,957.9,264.4,851.5],"page":1,"confidence":0.974},"MerchantName":{"type":"string","valueString":"Contoso","text":"Contoso","boundingBox":[308,570,515,627,500,685,290,634],"page":1,"confidence":0.974},"MerchantPhoneNumber":{"type":"phoneNumber","valuePhoneNumber":"+19876543210","text":"987-654-3210","boundingBox":[274,1000,651,1049,643,1125,268,1076],"page":1,"confidence":0.987},"ReceiptType":{"type":"string","valueString":"Itemized","confidence":0.99},"Subtotal":{"type":"number","valueNumber":11.7,"text":"$ 11.70","boundingBox":[1082,2225.1,1307.1,2228,1306,2315.4,1080.9,2312.5],"page":1,"confidence":0.967},"Tax":{"type":"number","valueNumber":1.17,"text":"$ 1.17","boundingBox":[1125,2352.1,1307.4,2361,1303,2452.9,1120.6,2444],"page":1,"confidence":0.985},"Tip":{"type":"number","valueNumber":1.63,"text":"$ 1.63","boundingBox":[1034,2481.7,1268.6,2488,1266,2583.5,1031.5,2577.2],"page":1,"confidence":0.941},"Total":{"type":"number","valueNumber":14.5,"text":"$14.50","boundingBox":[1033,2623,1374,2641,1368,2757,1027,2740],"page":1,"confidence":0.978},"TransactionDate":{"type":"date","valueDate":"2019-06-10","text":"6/10/2019","boundingBox":[259,1224,514,1247,509,1331,255,1312],"page":1,"confidence":0.987},"TransactionTime":{"type":"time","valueTime":"13:59:00","text":"13:59","boundingBox":[531,1248,681,1262,675,1341,526,1333],"page":1,"confidence":0.985}}}]}}, [
  'Content-Length',
  '2836',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '21',
  'apim-request-id',
  'd98f8444-14f5-4be4-a74b-573aa042e082',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:28:05 GMT'
]);
