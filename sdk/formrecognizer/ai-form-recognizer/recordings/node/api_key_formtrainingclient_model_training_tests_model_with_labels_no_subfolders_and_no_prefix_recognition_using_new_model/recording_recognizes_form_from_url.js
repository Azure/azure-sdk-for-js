let nock = require('nock');

module.exports.hash = "4529a087e1255024f2e7fb6f746974d3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.1/custom/models/e885bbd2-92c2-4d4a-8805-2ee9f3f1e55b/analyze', {"source":"https://storageaccount/testingdata/Form_1.jpg?sastoken"})
  .reply(202, "", [
  'Content-Length',
  '0',
  'Operation-Location',
  'https://endpoint/formrecognizer/v2.1-preview.1/custom/models/e885bbd2-92c2-4d4a-8805-2ee9f3f1e55b/analyzeresults/f5ee0337-f9a1-4ab0-9a89-7dd58cccff2b',
  'x-envoy-upstream-service-time',
  '77',
  'apim-request-id',
  '067843c4-e069-43ba-aca3-178f6030d0d4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:26:10 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/e885bbd2-92c2-4d4a-8805-2ee9f3f1e55b/analyzeResults/f5ee0337-f9a1-4ab0-9a89-7dd58cccff2b')
  .reply(200, {"status":"notStarted","createdDateTime":"2020-10-30T22:26:10Z","lastUpdatedDateTime":"2020-10-30T22:26:10Z"}, [
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  'f62eb5e0-8548-491b-9352-f7f6f391290b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:26:10 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/e885bbd2-92c2-4d4a-8805-2ee9f3f1e55b/analyzeResults/f5ee0337-f9a1-4ab0-9a89-7dd58cccff2b')
  .reply(200, {"status":"notStarted","createdDateTime":"2020-10-30T22:26:10Z","lastUpdatedDateTime":"2020-10-30T22:26:10Z"}, [
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '20',
  'apim-request-id',
  '61d23670-63b3-4771-8a2d-e01a8a4281ef',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:26:10 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/e885bbd2-92c2-4d4a-8805-2ee9f3f1e55b/analyzeResults/f5ee0337-f9a1-4ab0-9a89-7dd58cccff2b')
  .reply(200, {"status":"notStarted","createdDateTime":"2020-10-30T22:26:10Z","lastUpdatedDateTime":"2020-10-30T22:26:13Z"}, [
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  'c0bfa936-ae16-4618-95e7-1568475d5032',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:26:15 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/e885bbd2-92c2-4d4a-8805-2ee9f3f1e55b/analyzeResults/f5ee0337-f9a1-4ab0-9a89-7dd58cccff2b')
  .reply(200, {"status":"succeeded","createdDateTime":"2020-10-30T22:26:10Z","lastUpdatedDateTime":"2020-10-30T22:26:17Z","analyzeResult":{"version":"2.1.0","readResults":[{"page":1,"angle":0,"width":1700,"height":2200,"unit":"pixel","selectionMarks":[{"boundingBox":[2,2060,195,2060,195,2200,2,2200],"confidence":0.881,"state":"unselected"}]}],"pageResults":[{"page":1,"tables":[{"rows":4,"columns":3,"cells":[{"rowIndex":1,"columnIndex":1,"text":"SUBTOTAL","boundingBox":[1072,1566,1309,1566,1309,1610,1072,1610]},{"rowIndex":1,"columnIndex":2,"text":"$140.00","boundingBox":[1309,1566,1544,1566,1544,1610,1309,1610]},{"rowIndex":2,"columnIndex":1,"text":"TAX","boundingBox":[1072,1610,1309,1610,1309,1658,1072,1658]},{"rowIndex":2,"columnIndex":2,"text":"$4.00","boundingBox":[1309,1610,1544,1610,1544,1658,1309,1658]},{"rowIndex":3,"columnIndex":0,"text":"Bernie Sanders","boundingBox":[489,1658,1072,1658,1072,1708,489,1708]},{"rowIndex":3,"columnIndex":1,"text":"TOTAL","boundingBox":[1072,1658,1309,1658,1309,1708,1072,1708]},{"rowIndex":3,"columnIndex":2,"text":"$144.00","boundingBox":[1309,1658,1544,1658,1544,1708,1309,1708]}]},{"rows":6,"columns":4,"cells":[{"rowIndex":0,"columnIndex":0,"text":"Details","boundingBox":[156,1038,847,1038,847,1087,156,1087]},{"rowIndex":0,"columnIndex":1,"text":"Quantity","boundingBox":[847,1038,1072,1038,1072,1087,847,1087]},{"rowIndex":0,"columnIndex":2,"text":"Unit Price","boundingBox":[1072,1038,1309,1038,1309,1087,1072,1087]},{"rowIndex":0,"columnIndex":3,"text":"Total","boundingBox":[1309,1038,1544,1038,1544,1087,1309,1087]},{"rowIndex":1,"columnIndex":0,"text":"Bindings","boundingBox":[156,1087,847,1087,847,1128,156,1128]},{"rowIndex":1,"columnIndex":1,"text":"20","boundingBox":[847,1087,1072,1087,1072,1128,847,1128]},{"rowIndex":1,"columnIndex":2,"text":"1.00","boundingBox":[1072,1087,1309,1087,1309,1128,1072,1128]},{"rowIndex":1,"columnIndex":3,"text":"20.00","boundingBox":[1309,1087,1544,1087,1544,1128,1309,1128]},{"rowIndex":2,"columnIndex":0,"text":"Covers Small","boundingBox":[156,1128,847,1128,847,1172,156,1172]},{"rowIndex":2,"columnIndex":1,"text":"20","boundingBox":[847,1128,1072,1128,1072,1172,847,1172]},{"rowIndex":2,"columnIndex":2,"text":"1.00","boundingBox":[1072,1128,1309,1128,1309,1172,1072,1172]},{"rowIndex":2,"columnIndex":3,"text":"20.00","boundingBox":[1309,1128,1544,1128,1544,1172,1309,1172]},{"rowIndex":3,"columnIndex":0,"text":"Feather Bookmark","boundingBox":[156,1172,847,1172,847,1216,156,1216]},{"rowIndex":3,"columnIndex":1,"text":"20","boundingBox":[847,1172,1072,1172,1072,1216,847,1216]},{"rowIndex":3,"columnIndex":2,"text":"5.00","boundingBox":[1072,1172,1309,1172,1309,1216,1072,1216]},{"rowIndex":3,"columnIndex":3,"text":"100.00","boundingBox":[1309,1172,1544,1172,1544,1216,1309,1216]},{"rowIndex":4,"columnIndex":0,"text":"Copper Swirl Marker","boundingBox":[156,1216,847,1216,847,1260,156,1260]},{"rowIndex":4,"columnIndex":1,"text":"20","boundingBox":[847,1216,1072,1216,1072,1260,847,1260]},{"rowIndex":4,"columnIndex":2,"text":"5.00","boundingBox":[1072,1216,1309,1216,1309,1260,1072,1260]},{"rowIndex":4,"columnIndex":3,"text":"100.00","boundingBox":[1309,1216,1544,1216,1544,1260,1309,1260]}]}]}],"documentResults":[{"docType":"custom:modelName160409676352304685","modelId":"e885bbd2-92c2-4d4a-8805-2ee9f3f1e55b","pageRange":[1,1],"fields":{"Subtotal":{"type":"string","valueString":"$140.00","text":"$140.00","page":1,"boundingBox":[1426,1572,1531,1572,1531,1599,1426,1599],"confidence":0.984},"Merchant":{"type":"string","valueString":"Hero Limited","text":"Hero Limited","page":1,"boundingBox":[620,205,1075,205,1075,266,620,266],"confidence":0.97},"Total":{"type":"string","valueString":"$144.00","text":"$144.00","page":1,"boundingBox":[1427,1669,1529,1669,1529,1698,1427,1698],"confidence":0.991},"DatedAs":{"type":"string","valueString":"12/20/2020","text":"12/20/2020","page":1,"boundingBox":[1165,420,1317,420,1317,449,1165,449],"confidence":0.99},"Tax":{"type":"string","valueString":"$4.00","text":"$4.00","page":1,"boundingBox":[1458,1615,1529,1615,1529,1643,1458,1643],"confidence":0.994},"CompanyPhoneNumber":{"type":"string","valueString":"938-294-2949","text":"938-294-2949","page":1,"boundingBox":[708,722,885,722,885,749,708,749],"confidence":1},"Email":{"type":"string","valueString":"accounts@herolimited.com","text":"accounts@herolimited.com","page":1,"boundingBox":[164,479,478,479,478,503,164,503],"confidence":1},"CompanyAddress":{"type":"string","valueString":"938 NE Burner Road Boulder City, CO 92848","text":"938 NE Burner Road Boulder City, CO 92848","page":1,"boundingBox":[273,685,565,685,565,751,273,751],"confidence":1},"PhoneNumber":{"type":"string","valueString":"555-348-6512","text":"555-348-6512","page":1,"boundingBox":[364,351,528,351,528,378,364,378],"confidence":0.89},"CompanyName":{"type":"string","valueString":"Higgly Wiggly Books","text":"Higgly Wiggly Books","page":1,"boundingBox":[375,646,629,646,629,679,375,679],"confidence":0.95},"Quantity":{"type":"number","text":"20","page":1,"boundingBox":[861,1094,892,1094,892,1119,861,1119],"confidence":0.962},"VendorName":{"type":"string","valueString":"Hillary Swank","text":"Hillary Swank","page":1,"boundingBox":[349,609,521,609,521,639,349,639],"confidence":0.93},"Website":{"type":"string","valueString":"www.herolimited.com","text":"www.herolimited.com","page":1,"boundingBox":[273,393,531,393,531,418,273,418],"confidence":0.95},"Signature":{"type":"string","valueString":"Bernie Sanders","text":"Bernie Sanders","page":1,"boundingBox":[489,1670,765,1670,765,1708,489,1708],"confidence":0.998},"PurchaseOrderNumber":{"type":"string","valueString":"948284","text":"948284","page":1,"boundingBox":[1277,461,1376,461,1376,489,1277,489],"confidence":0.94}},"docTypeConfidence":1}],"errors":[]}}, [
  'Content-Length',
  '6045',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '23',
  'apim-request-id',
  'ff38889a-09ab-42d6-9800-00b5799078d8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:26:21 GMT'
]);
