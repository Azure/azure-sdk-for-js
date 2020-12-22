let nock = require('nock');

module.exports.hash = "9eb7e85286e71321914e1d054139d46b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.2/custom/models/02c173df-4900-4259-a8f9-c049ff2a8d81/analyze', {"source":"https://storageaccount/testingdata/Form_1.jpg?sastoken"})
  .reply(202, "", [
  'Content-Length',
  '0',
  'Operation-Location',
  'https://endpoint/formrecognizer/v2.1-preview.2/custom/models/02c173df-4900-4259-a8f9-c049ff2a8d81/analyzeresults/6360d169-e42f-420e-81e1-d5bfa856ddc2',
  'x-envoy-upstream-service-time',
  '49',
  'apim-request-id',
  'ccbd263c-4986-4941-9e4a-170618fd8483',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 14:26:18 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/02c173df-4900-4259-a8f9-c049ff2a8d81/analyzeResults/6360d169-e42f-420e-81e1-d5bfa856ddc2')
  .reply(200, {"status":"notStarted","createdDateTime":"2020-11-20T14:26:18Z","lastUpdatedDateTime":"2020-11-20T14:26:18Z"}, [
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  'd72b536d-8475-409b-939d-c9ea81c98890',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 14:26:18 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/02c173df-4900-4259-a8f9-c049ff2a8d81/analyzeResults/6360d169-e42f-420e-81e1-d5bfa856ddc2')
  .reply(200, {"status":"notStarted","createdDateTime":"2020-11-20T14:26:18Z","lastUpdatedDateTime":"2020-11-20T14:26:18Z"}, [
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  '59ca587c-7c98-4bca-91f4-43663e7ea489',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 14:26:18 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/02c173df-4900-4259-a8f9-c049ff2a8d81/analyzeResults/6360d169-e42f-420e-81e1-d5bfa856ddc2')
  .reply(200, {"status":"notStarted","createdDateTime":"2020-11-20T14:26:18Z","lastUpdatedDateTime":"2020-11-20T14:26:23Z"}, [
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  '61d99121-dec1-4337-ab80-5ac4fdd2a9d7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 14:26:23 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/02c173df-4900-4259-a8f9-c049ff2a8d81/analyzeResults/6360d169-e42f-420e-81e1-d5bfa856ddc2')
  .reply(200, {"status":"succeeded","createdDateTime":"2020-11-20T14:26:18Z","lastUpdatedDateTime":"2020-11-20T14:26:26Z","analyzeResult":{"version":"2.1.0","readResults":[{"page":1,"angle":0,"width":1700,"height":2200,"unit":"pixel"}],"pageResults":[{"page":1,"tables":[{"rows":5,"columns":5,"cells":[{"rowIndex":0,"columnIndex":0,"columnSpan":2,"text":"Details","boundingBox":[157,1038,847,1037,847,1086,157,1086]},{"rowIndex":0,"columnIndex":2,"text":"Quantity","boundingBox":[847,1037,1071,1037,1071,1086,847,1086]},{"rowIndex":0,"columnIndex":3,"text":"Unit Price","boundingBox":[1071,1037,1310,1038,1310,1086,1071,1086]},{"rowIndex":0,"columnIndex":4,"text":"Total","boundingBox":[1310,1038,1543,1038,1543,1086,1310,1086]},{"rowIndex":1,"columnIndex":0,"columnSpan":2,"text":"Bindings","boundingBox":[157,1086,847,1086,847,1127,157,1128]},{"rowIndex":1,"columnIndex":2,"text":"20","boundingBox":[847,1086,1071,1086,1071,1127,847,1127]},{"rowIndex":1,"columnIndex":3,"text":"1.00","boundingBox":[1071,1086,1310,1086,1310,1127,1071,1127]},{"rowIndex":1,"columnIndex":4,"text":"20.00","boundingBox":[1310,1086,1543,1086,1543,1127,1310,1127]},{"rowIndex":2,"columnIndex":0,"columnSpan":2,"text":"Covers Small","boundingBox":[157,1128,847,1127,847,1171,157,1171]},{"rowIndex":2,"columnIndex":2,"text":"20","boundingBox":[847,1127,1071,1127,1071,1171,847,1171]},{"rowIndex":2,"columnIndex":3,"text":"1.00","boundingBox":[1071,1127,1310,1127,1310,1171,1071,1171]},{"rowIndex":2,"columnIndex":4,"text":"20.00","boundingBox":[1310,1127,1543,1127,1543,1171,1310,1171]},{"rowIndex":3,"columnIndex":0,"columnSpan":2,"text":"Feather Bookmark","boundingBox":[157,1171,847,1171,847,1214,157,1214]},{"rowIndex":3,"columnIndex":2,"text":"20","boundingBox":[847,1171,1071,1171,1071,1214,847,1214]},{"rowIndex":3,"columnIndex":3,"text":"5.00","boundingBox":[1071,1171,1310,1171,1310,1214,1071,1214]},{"rowIndex":3,"columnIndex":4,"text":"100.00","boundingBox":[1310,1171,1543,1171,1543,1215,1310,1214]},{"rowIndex":4,"columnIndex":0,"columnSpan":2,"text":"Copper Swirl Marker","boundingBox":[157,1214,847,1214,847,1258,157,1258]},{"rowIndex":4,"columnIndex":2,"text":"20","boundingBox":[847,1214,1071,1214,1071,1258,847,1258]},{"rowIndex":4,"columnIndex":3,"text":"5.00","boundingBox":[1071,1214,1310,1214,1310,1258,1071,1258]},{"rowIndex":4,"columnIndex":4,"text":"100.00","boundingBox":[1310,1214,1543,1215,1543,1260,1310,1258]}],"boundingBox":[153,1036,1547,1037,1547,1265,153,1265]},{"rows":4,"columns":2,"cells":[{"rowIndex":0,"columnIndex":0,"text":"SUBTOTAL","boundingBox":[1072,1564,1307,1565,1308,1609,1071,1608]},{"rowIndex":0,"columnIndex":1,"text":"$140.00","boundingBox":[1307,1565,1542,1564,1543,1609,1308,1609]},{"rowIndex":1,"columnIndex":0,"text":"TAX","boundingBox":[1071,1608,1308,1609,1308,1652,1071,1651]},{"rowIndex":1,"columnIndex":1,"text":"$4.00","boundingBox":[1308,1609,1543,1609,1543,1652,1308,1652]},{"rowIndex":2,"columnIndex":0,"text":"","boundingBox":[1071,1651,1308,1652,1308,1663,1071,1663]},{"rowIndex":2,"columnIndex":1,"text":"","boundingBox":[1308,1652,1543,1652,1543,1663,1308,1663]},{"rowIndex":3,"columnIndex":0,"text":"TOTAL","boundingBox":[1071,1663,1308,1663,1308,1707,1071,1707]},{"rowIndex":3,"columnIndex":1,"text":"$144.00","boundingBox":[1308,1663,1543,1663,1543,1708,1308,1707]}],"boundingBox":[1058,1563,1555,1563,1555,1707,1058,1707]}]}],"documentResults":[{"docType":"custom:modelName160588237204706422","modelId":"02c173df-4900-4259-a8f9-c049ff2a8d81","pageRange":[1,1],"fields":{"DatedAs":{"type":"string","valueString":"12/20/2020","text":"12/20/2020","page":1,"boundingBox":[1165,420,1317,420,1317,449,1165,449],"confidence":0.99},"Email":{"type":"string","valueString":"accounts@herolimited.com","text":"accounts@herolimited.com","page":1,"boundingBox":[164,479,478,479,478,503,164,503],"confidence":1},"Tax":{"type":"string","valueString":"$4.00","text":"$4.00","page":1,"boundingBox":[1458,1615,1529,1615,1529,1643,1458,1643],"confidence":0.994},"PhoneNumber":{"type":"string","valueString":"555-348-6512","text":"555-348-6512","page":1,"boundingBox":[364,351,528,351,528,378,364,378],"confidence":0.89},"Website":{"type":"string","valueString":"www.herolimited.com","text":"www.herolimited.com","page":1,"boundingBox":[273,393,531,393,531,418,273,418],"confidence":0.95},"Signature":{"type":"string","valueString":"Bernie Sanders","text":"Bernie Sanders","page":1,"boundingBox":[489,1670,765,1670,765,1708,489,1708],"confidence":0.998},"Quantity":{"type":"number","text":"20","page":1,"boundingBox":[861,1094,892,1094,892,1119,861,1119],"confidence":0.962},"Subtotal":{"type":"string","valueString":"$140.00","text":"$140.00","page":1,"boundingBox":[1426,1572,1531,1572,1531,1599,1426,1599],"confidence":0.984},"VendorName":{"type":"string","valueString":"Hillary Swank","text":"Hillary Swank","page":1,"boundingBox":[349,609,521,609,521,639,349,639],"confidence":0.93},"Total":{"type":"string","valueString":"$144.00","text":"$144.00","page":1,"boundingBox":[1427,1669,1529,1669,1529,1698,1427,1698],"confidence":0.991},"CompanyName":{"type":"string","valueString":"Higgly Wiggly Books","text":"Higgly Wiggly Books","page":1,"boundingBox":[375,646,629,646,629,679,375,679],"confidence":0.95},"Merchant":{"type":"string","valueString":"Hero Limited","text":"Hero Limited","page":1,"boundingBox":[620,205,1075,205,1075,266,620,266],"confidence":0.97},"CompanyPhoneNumber":{"type":"string","valueString":"938-294-2949","text":"938-294-2949","page":1,"boundingBox":[708,722,885,722,885,749,708,749],"confidence":1},"CompanyAddress":{"type":"string","valueString":"938 NE Burner Road Boulder City, CO 92848","text":"938 NE Burner Road Boulder City, CO 92848","page":1,"boundingBox":[273,685,565,685,565,751,273,751],"confidence":1},"PurchaseOrderNumber":{"type":"string","valueString":"948284","text":"948284","page":1,"boundingBox":[1277,461,1376,461,1376,489,1277,489],"confidence":0.94}},"docTypeConfidence":1}],"errors":[]}}, [
  'Content-Length',
  '6206',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  '5702aeb7-07b6-46f8-a62b-c0bdfdcda454',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 14:26:28 GMT'
]);
