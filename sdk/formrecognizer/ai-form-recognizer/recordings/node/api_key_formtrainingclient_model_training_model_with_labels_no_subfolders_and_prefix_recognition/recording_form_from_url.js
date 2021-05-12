let nock = require('nock');

module.exports.hash = "87dabfb16a6afa93980b1ac777872ee8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1/custom/models/04092960-7a18-48ec-a3ff-d9d31e32ccf5/analyze', {"source":"https://storageaccount/testingdata/Form_1.jpg?sastoken"})
  .reply(202, "", [
  'Content-Length',
  '0',
  'Operation-Location',
  'https://endpoint/formrecognizer/v2.1/custom/models/04092960-7a18-48ec-a3ff-d9d31e32ccf5/analyzeresults/52cab51d-2b9c-403e-9ace-93b279522444',
  'x-envoy-upstream-service-time',
  '496',
  'apim-request-id',
  'df641443-b827-4f80-a07d-a496ce8b7da8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:22:13 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/04092960-7a18-48ec-a3ff-d9d31e32ccf5/analyzeResults/52cab51d-2b9c-403e-9ace-93b279522444')
  .reply(200, {"status":"notStarted","createdDateTime":"2021-05-12T01:22:14Z","lastUpdatedDateTime":"2021-05-12T01:22:14Z"}, [
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '56',
  'apim-request-id',
  '2b83df06-fb02-43ef-8c5d-2f1ad6a56ab7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:22:14 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/04092960-7a18-48ec-a3ff-d9d31e32ccf5/analyzeResults/52cab51d-2b9c-403e-9ace-93b279522444')
  .reply(200, {"status":"notStarted","createdDateTime":"2021-05-12T01:22:14Z","lastUpdatedDateTime":"2021-05-12T01:22:14Z"}, [
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '69',
  'apim-request-id',
  'b9ed5d73-8c59-4566-82b5-5aebd54da200',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:22:14 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/04092960-7a18-48ec-a3ff-d9d31e32ccf5/analyzeResults/52cab51d-2b9c-403e-9ace-93b279522444')
  .reply(200, {"status":"notStarted","createdDateTime":"2021-05-12T01:22:14Z","lastUpdatedDateTime":"2021-05-12T01:22:16Z"}, [
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '55',
  'apim-request-id',
  'afa491f6-e405-4b7e-ad00-fb704e4f8fc7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:22:19 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/04092960-7a18-48ec-a3ff-d9d31e32ccf5/analyzeResults/52cab51d-2b9c-403e-9ace-93b279522444')
  .reply(200, {"status":"succeeded","createdDateTime":"2021-05-12T01:22:14Z","lastUpdatedDateTime":"2021-05-12T01:22:20Z","analyzeResult":{"version":"2.1.0","readResults":[{"page":1,"angle":0,"width":1700,"height":2200,"unit":"pixel"}],"pageResults":[{"page":1,"tables":[{"rows":5,"columns":4,"cells":[{"rowIndex":0,"columnIndex":0,"text":"Details","boundingBox":[156,1037,847,1037,847,1086,156,1086],"isHeader":true},{"rowIndex":0,"columnIndex":1,"text":"Quantity","boundingBox":[847,1037,1071,1038,1071,1086,847,1086],"isHeader":true},{"rowIndex":0,"columnIndex":2,"text":"Unit Price","boundingBox":[1071,1038,1309,1038,1309,1086,1071,1086],"isHeader":true},{"rowIndex":0,"columnIndex":3,"text":"Total","boundingBox":[1309,1038,1543,1038,1543,1086,1309,1086],"isHeader":true},{"rowIndex":1,"columnIndex":0,"text":"Bindings","boundingBox":[156,1086,847,1086,847,1127,156,1127],"isHeader":false},{"rowIndex":1,"columnIndex":1,"text":"20","boundingBox":[847,1086,1071,1086,1071,1127,847,1127],"isHeader":false},{"rowIndex":1,"columnIndex":2,"text":"1.00","boundingBox":[1071,1086,1309,1086,1309,1127,1071,1127],"isHeader":false},{"rowIndex":1,"columnIndex":3,"text":"20.00","boundingBox":[1309,1086,1543,1086,1543,1127,1309,1127],"isHeader":false},{"rowIndex":2,"columnIndex":0,"text":"Covers Small","boundingBox":[156,1127,847,1127,847,1171,156,1171],"isHeader":false},{"rowIndex":2,"columnIndex":1,"text":"20","boundingBox":[847,1127,1071,1127,1071,1171,847,1171],"isHeader":false},{"rowIndex":2,"columnIndex":2,"text":"1.00","boundingBox":[1071,1127,1309,1127,1309,1171,1071,1171],"isHeader":false},{"rowIndex":2,"columnIndex":3,"text":"20.00","boundingBox":[1309,1127,1543,1127,1543,1171,1309,1171],"isHeader":false},{"rowIndex":3,"columnIndex":0,"text":"Feather Bookmark","boundingBox":[156,1171,847,1171,847,1214,156,1214],"isHeader":false},{"rowIndex":3,"columnIndex":1,"text":"20","boundingBox":[847,1171,1071,1171,1071,1214,847,1214],"isHeader":false},{"rowIndex":3,"columnIndex":2,"text":"5.00","boundingBox":[1071,1171,1309,1171,1309,1214,1071,1214],"isHeader":false},{"rowIndex":3,"columnIndex":3,"text":"100.00","boundingBox":[1309,1171,1543,1171,1543,1215,1309,1214],"isHeader":false},{"rowIndex":4,"columnIndex":0,"text":"Copper Swirl Marker","boundingBox":[156,1214,847,1214,847,1258,156,1258],"isHeader":false},{"rowIndex":4,"columnIndex":1,"text":"20","boundingBox":[847,1214,1071,1214,1071,1258,847,1258],"isHeader":false},{"rowIndex":4,"columnIndex":2,"text":"5.00","boundingBox":[1071,1214,1309,1214,1309,1258,1071,1258],"isHeader":false},{"rowIndex":4,"columnIndex":3,"text":"100.00","boundingBox":[1309,1214,1543,1215,1543,1260,1309,1258],"isHeader":false}],"boundingBox":[153,1036,1547,1037,1547,1265,153,1265]},{"rows":4,"columns":2,"cells":[{"rowIndex":0,"columnIndex":0,"text":"SUBTOTAL","boundingBox":[1070,1564,1307,1564,1308,1609,1071,1608],"isHeader":true},{"rowIndex":0,"columnIndex":1,"text":"$140.00","boundingBox":[1307,1564,1544,1564,1544,1609,1308,1609],"isHeader":true},{"rowIndex":1,"columnIndex":0,"text":"TAX","boundingBox":[1071,1608,1308,1609,1308,1652,1071,1653],"isHeader":false},{"rowIndex":1,"columnIndex":1,"text":"$4.00","boundingBox":[1308,1609,1544,1609,1544,1652,1308,1652],"isHeader":false},{"rowIndex":2,"columnIndex":0,"text":"","boundingBox":[1071,1653,1308,1652,1308,1664,1071,1664],"isHeader":false},{"rowIndex":2,"columnIndex":1,"text":"","boundingBox":[1308,1652,1544,1652,1544,1665,1308,1664],"isHeader":false},{"rowIndex":3,"columnIndex":0,"text":"TOTAL","boundingBox":[1071,1664,1308,1664,1308,1707,1071,1707],"isHeader":false},{"rowIndex":3,"columnIndex":1,"text":"$144.00","boundingBox":[1308,1664,1544,1665,1544,1707,1308,1707],"isHeader":false}],"boundingBox":[1058,1563,1555,1563,1555,1707,1058,1707]}]}],"documentResults":[{"docType":"custom:modelName162078252815701117","modelId":"04092960-7a18-48ec-a3ff-d9d31e32ccf5","pageRange":[1,1],"fields":{"Subtotal":{"type":"string","valueString":"$140.00","text":"$140.00","page":1,"boundingBox":[1428,1572,1528,1572,1528,1599,1428,1599],"confidence":0.994},"CompanyPhoneNumber":{"type":"string","valueString":"938-294-2949","text":"938-294-2949","page":1,"boundingBox":[709,722,882,722,882,749,709,749],"confidence":0.995},"CompanyName":{"type":"string","valueString":"Higgly Wiggly Books","text":"Higgly Wiggly Books","page":1,"boundingBox":[375,646,629,646,629,679,375,679],"confidence":0.993},"Signature":{"type":"string","valueString":"Bernie Sanders","text":"Bernie Sanders","page":1,"boundingBox":[484,1670,762,1670,762,1708,484,1708],"confidence":0.437},"Website":{"type":"string","valueString":"www.herolimited.com","text":"www.herolimited.com","page":1,"boundingBox":[273,393,524,393,524,418,273,418],"confidence":0.992},"Merchant":{"type":"string","valueString":"Hero Limited","text":"Hero Limited","page":1,"boundingBox":[620,205,1062,205,1062,266,620,266],"confidence":0.99},"VendorName":{"type":"string","valueString":"Hillary Swank","text":"Hillary Swank","page":1,"boundingBox":[349,609,520,609,520,639,349,639],"confidence":0.991},"DatedAs":{"type":"string","valueString":"12/20/2020","text":"12/20/2020","page":1,"boundingBox":[1163,420,1310,420,1310,449,1163,449],"confidence":0.994},"Total":{"type":"string","valueString":"$144.00","text":"$144.00","page":1,"boundingBox":[1427,1669,1527,1669,1527,1698,1427,1698],"confidence":0.995},"Tax":{"type":"string","valueString":"$4.00","text":"$4.00","page":1,"boundingBox":[1458,1615,1529,1615,1529,1643,1458,1643],"confidence":0.994},"PurchaseOrderNumber":{"type":"string","valueString":"948284","text":"948284","page":1,"boundingBox":[1278,461,1372,461,1372,489,1278,489],"confidence":0.994},"Email":{"type":"string","valueString":"accounts@herolimited.com","text":"accounts@herolimited.com","page":1,"boundingBox":[164,479,471,479,471,503,164,503],"confidence":0.953},"Quantity":{"type":"number","valueNumber":20,"text":"20","page":1,"boundingBox":[860,1094,888,1094,888,1119,860,1119],"confidence":0.99},"CompanyAddress":{"type":"string","valueString":"938 NE Burner Road Boulder City, CO 92848","text":"938 NE Burner Road Boulder City, CO 92848","page":1,"boundingBox":[275,685,561,685,561,751,275,751],"confidence":0.622},"PhoneNumber":{"type":"string","valueString":"555-348-6512","text":"555-348-6512","page":1,"boundingBox":[365,351,525,351,525,378,365,378],"confidence":0.992}},"docTypeConfidence":0.92}],"errors":[]}}, [
  'Content-Length',
  '6632',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '140',
  'apim-request-id',
  'ebac8245-ba5d-42c4-ab40-72c41565fd2b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:22:24 GMT'
]);
