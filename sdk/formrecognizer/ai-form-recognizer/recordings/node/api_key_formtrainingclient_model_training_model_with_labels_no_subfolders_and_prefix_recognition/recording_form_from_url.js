let nock = require('nock');

module.exports.hash = "9eb7e85286e71321914e1d054139d46b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.3/custom/models/3a97a25c-aa72-4512-93da-766c2e504b2b/analyze', {"source":"https://storageaccount/testingdata/Form_1.jpg?sastoken"})
  .reply(202, "", [
  'Content-Length',
  '0',
  'Operation-Location',
  'https://endpoint/formrecognizer/v2.1-preview.3/custom/models/3a97a25c-aa72-4512-93da-766c2e504b2b/analyzeresults/0ffeb561-f0c1-47f3-9030-4e00645c7ab4',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  'c770f147-543c-47b1-b2c7-f2be9425af08',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:10:58 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/3a97a25c-aa72-4512-93da-766c2e504b2b/analyzeResults/0ffeb561-f0c1-47f3-9030-4e00645c7ab4')
  .reply(200, {"status":"notStarted","createdDateTime":"2021-03-30T23:10:59Z","lastUpdatedDateTime":"2021-03-30T23:10:59Z"}, [
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '47',
  'apim-request-id',
  'c98d5af5-1a2d-4b54-a7a0-62af35ee1d7c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:10:58 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/3a97a25c-aa72-4512-93da-766c2e504b2b/analyzeResults/0ffeb561-f0c1-47f3-9030-4e00645c7ab4')
  .reply(200, {"status":"notStarted","createdDateTime":"2021-03-30T23:10:59Z","lastUpdatedDateTime":"2021-03-30T23:10:59Z"}, [
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '24',
  'apim-request-id',
  'd9ab21f8-ec92-4332-b9ef-f4723a5867e3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:10:58 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/3a97a25c-aa72-4512-93da-766c2e504b2b/analyzeResults/0ffeb561-f0c1-47f3-9030-4e00645c7ab4')
  .reply(200, {"status":"notStarted","createdDateTime":"2021-03-30T23:10:59Z","lastUpdatedDateTime":"2021-03-30T23:11:01Z"}, [
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '43',
  'apim-request-id',
  '45add564-aaec-4fe1-a774-9fd233e986f7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:11:04 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/3a97a25c-aa72-4512-93da-766c2e504b2b/analyzeResults/0ffeb561-f0c1-47f3-9030-4e00645c7ab4')
  .reply(200, {"status":"succeeded","createdDateTime":"2021-03-30T23:10:59Z","lastUpdatedDateTime":"2021-03-30T23:11:05Z","analyzeResult":{"version":"2.1.0","readResults":[{"page":1,"angle":0,"width":1700,"height":2200,"unit":"pixel"}],"pageResults":[{"page":1,"tables":[{"rows":5,"columns":5,"cells":[{"rowIndex":0,"columnIndex":0,"columnSpan":2,"text":"Details","boundingBox":[157,1038,847,1037,847,1086,157,1086]},{"rowIndex":0,"columnIndex":2,"text":"Quantity","boundingBox":[847,1037,1071,1037,1071,1086,847,1086]},{"rowIndex":0,"columnIndex":3,"text":"Unit Price","boundingBox":[1071,1037,1310,1038,1310,1086,1071,1086]},{"rowIndex":0,"columnIndex":4,"text":"Total","boundingBox":[1310,1038,1543,1038,1543,1086,1310,1086]},{"rowIndex":1,"columnIndex":0,"columnSpan":2,"text":"Bindings","boundingBox":[157,1086,847,1086,847,1127,157,1128]},{"rowIndex":1,"columnIndex":2,"text":"20","boundingBox":[847,1086,1071,1086,1071,1127,847,1127]},{"rowIndex":1,"columnIndex":3,"text":"1.00","boundingBox":[1071,1086,1310,1086,1310,1127,1071,1127]},{"rowIndex":1,"columnIndex":4,"text":"20.00","boundingBox":[1310,1086,1543,1086,1543,1127,1310,1127]},{"rowIndex":2,"columnIndex":0,"columnSpan":2,"text":"Covers Small","boundingBox":[157,1128,847,1127,847,1171,157,1171]},{"rowIndex":2,"columnIndex":2,"text":"20","boundingBox":[847,1127,1071,1127,1071,1171,847,1171]},{"rowIndex":2,"columnIndex":3,"text":"1.00","boundingBox":[1071,1127,1310,1127,1310,1171,1071,1171]},{"rowIndex":2,"columnIndex":4,"text":"20.00","boundingBox":[1310,1127,1543,1127,1543,1171,1310,1171]},{"rowIndex":3,"columnIndex":0,"columnSpan":2,"text":"Feather Bookmark","boundingBox":[157,1171,847,1171,847,1214,157,1214]},{"rowIndex":3,"columnIndex":2,"text":"20","boundingBox":[847,1171,1071,1171,1071,1214,847,1214]},{"rowIndex":3,"columnIndex":3,"text":"5.00","boundingBox":[1071,1171,1310,1171,1310,1214,1071,1214]},{"rowIndex":3,"columnIndex":4,"text":"100.00","boundingBox":[1310,1171,1543,1171,1543,1215,1310,1214]},{"rowIndex":4,"columnIndex":0,"columnSpan":2,"text":"Copper Swirl Marker","boundingBox":[157,1214,847,1214,847,1258,157,1258]},{"rowIndex":4,"columnIndex":2,"text":"20","boundingBox":[847,1214,1071,1214,1071,1258,847,1258]},{"rowIndex":4,"columnIndex":3,"text":"5.00","boundingBox":[1071,1214,1310,1214,1310,1258,1071,1258]},{"rowIndex":4,"columnIndex":4,"text":"100.00","boundingBox":[1310,1214,1543,1215,1543,1260,1310,1258]}],"boundingBox":[153,1036,1547,1037,1547,1265,153,1265]},{"rows":4,"columns":2,"cells":[{"rowIndex":0,"columnIndex":0,"text":"SUBTOTAL","boundingBox":[1072,1564,1307,1565,1308,1609,1071,1608]},{"rowIndex":0,"columnIndex":1,"text":"$140.00","boundingBox":[1307,1565,1542,1564,1543,1609,1308,1609]},{"rowIndex":1,"columnIndex":0,"text":"TAX","boundingBox":[1071,1608,1308,1609,1308,1652,1071,1651]},{"rowIndex":1,"columnIndex":1,"text":"$4.00","boundingBox":[1308,1609,1543,1609,1543,1652,1308,1652]},{"rowIndex":2,"columnIndex":0,"text":"","boundingBox":[1071,1651,1308,1652,1308,1663,1071,1663]},{"rowIndex":2,"columnIndex":1,"text":"","boundingBox":[1308,1652,1543,1652,1543,1663,1308,1663]},{"rowIndex":3,"columnIndex":0,"text":"TOTAL","boundingBox":[1071,1663,1308,1663,1308,1707,1071,1707]},{"rowIndex":3,"columnIndex":1,"text":"$144.00","boundingBox":[1308,1663,1543,1663,1543,1708,1308,1707]}],"boundingBox":[1058,1563,1555,1563,1555,1707,1058,1707]}]}],"documentResults":[{"docType":"custom:modelName161714585331405319","modelId":"3a97a25c-aa72-4512-93da-766c2e504b2b","pageRange":[1,1],"fields":{"Subtotal":{"type":"string","valueString":"$140.00","text":"$140.00","page":1,"boundingBox":[1428,1572,1528,1572,1528,1599,1428,1599],"confidence":0.995},"PhoneNumber":{"type":"string","valueString":"555-348-6512","text":"555-348-6512","page":1,"boundingBox":[365,351,525,351,525,378,365,378],"confidence":0.995},"Signature":{"type":"string","valueString":"Bernie Sanders","text":"Bernie Sanders","page":1,"boundingBox":[484,1670,762,1670,762,1708,484,1708],"confidence":0.995},"CompanyPhoneNumber":{"type":"string","valueString":"938-294-2949","text":"938-294-2949","page":1,"boundingBox":[709,722,882,722,882,749,709,749],"confidence":0.995},"CompanyAddress":{"type":"string","valueString":"938 NE Burner Road Boulder City, CO 92848","text":"938 NE Burner Road Boulder City, CO 92848","page":1,"boundingBox":[275,685,561,685,561,751,275,751],"confidence":0.995},"Tax":{"type":"string","valueString":"$4.00","text":"$4.00","page":1,"boundingBox":[1458,1615,1529,1615,1529,1643,1458,1643],"confidence":0.995},"PurchaseOrderNumber":{"type":"string","valueString":"948284","text":"948284","page":1,"boundingBox":[1278,461,1372,461,1372,489,1278,489],"confidence":0.995},"Merchant":{"type":"string","valueString":"Hero Limited","text":"Hero Limited","page":1,"boundingBox":[620,205,1062,205,1062,266,620,266],"confidence":0.995},"Total":{"type":"string","valueString":"$144.00","text":"$144.00","page":1,"boundingBox":[1427,1669,1527,1669,1527,1698,1427,1698],"confidence":0.995},"Quantity":{"type":"number","text":"20","page":1,"boundingBox":[860,1094,888,1094,888,1119,860,1119],"confidence":0.995},"Website":{"type":"string","valueString":"www.herolimited.com","text":"www.herolimited.com","page":1,"boundingBox":[273,393,524,393,524,418,273,418],"confidence":0.995},"VendorName":{"type":"string","valueString":"Hillary Swank","text":"Hillary Swank","page":1,"boundingBox":[349,609,520,609,520,639,349,639],"confidence":0.995},"CompanyName":{"type":"string","valueString":"Higgly Wiggly Books","text":"Higgly Wiggly Books","page":1,"boundingBox":[375,646,629,646,629,679,375,679],"confidence":0.995},"DatedAs":{"type":"string","valueString":"12/20/2020","text":"12/20/2020","page":1,"boundingBox":[1163,420,1310,420,1310,449,1163,449],"confidence":0.995},"Email":{"type":"string","valueString":"accounts@herolimited.com","text":"accounts@herolimited.com","page":1,"boundingBox":[164,479,471,479,471,503,164,503],"confidence":0.995}},"docTypeConfidence":0.92}],"errors":[]}}, [
  'Content-Length',
  '6220',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '41',
  'apim-request-id',
  '617fea24-e8a1-4132-87ef-e9d491173121',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:11:09 GMT'
]);
