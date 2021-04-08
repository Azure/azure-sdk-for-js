let nock = require('nock');

module.exports.hash = "9eb7e85286e71321914e1d054139d46b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
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
  '43f09604-54df-4784-a876-cf848b321f02',
  'x-ms-ests-server',
  '2.1.11562.10 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AjzFVQ1mzahOgLFbzhWoi1fGLH8mCAAAAPal9dcOAAAA; expires=Thu, 29-Apr-2021 23:07:45 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 30 Mar 2021 23:07:44 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.3/custom/models/6178d6cd-33b7-4303-846f-c4a724814b9c/analyze', {"source":"https://storageaccount/testingdata/Form_1.jpg?sastoken"})
  .reply(202, "", [
  'Content-Length',
  '0',
  'Operation-Location',
  'https://endpoint/formrecognizer/v2.1-preview.3/custom/models/6178d6cd-33b7-4303-846f-c4a724814b9c/analyzeresults/715f4dee-cefb-465b-ab88-d0c6a37fb91b',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  'd8a2ce5c-b8eb-4b4e-8816-31e893a5b2a0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:07:44 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/6178d6cd-33b7-4303-846f-c4a724814b9c/analyzeResults/715f4dee-cefb-465b-ab88-d0c6a37fb91b')
  .reply(200, {"status":"notStarted","createdDateTime":"2021-03-30T23:07:45Z","lastUpdatedDateTime":"2021-03-30T23:07:45Z"}, [
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '23',
  'apim-request-id',
  'a3f8a100-f783-44e0-ad95-cea5fa9e95c2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:07:44 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/6178d6cd-33b7-4303-846f-c4a724814b9c/analyzeResults/715f4dee-cefb-465b-ab88-d0c6a37fb91b')
  .reply(200, {"status":"notStarted","createdDateTime":"2021-03-30T23:07:45Z","lastUpdatedDateTime":"2021-03-30T23:07:45Z"}, [
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '24',
  'apim-request-id',
  'fe36ba96-46fc-4ab5-b37d-f87584e7553e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:07:44 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/6178d6cd-33b7-4303-846f-c4a724814b9c/analyzeResults/715f4dee-cefb-465b-ab88-d0c6a37fb91b')
  .reply(200, {"status":"notStarted","createdDateTime":"2021-03-30T23:07:45Z","lastUpdatedDateTime":"2021-03-30T23:07:49Z"}, [
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '31',
  'apim-request-id',
  '01636704-20b9-4ebd-8ac7-ea82ce979cf3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:07:50 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/6178d6cd-33b7-4303-846f-c4a724814b9c/analyzeResults/715f4dee-cefb-465b-ab88-d0c6a37fb91b')
  .reply(200, {"status":"succeeded","createdDateTime":"2021-03-30T23:07:45Z","lastUpdatedDateTime":"2021-03-30T23:07:52Z","analyzeResult":{"version":"2.1.0","readResults":[{"page":1,"angle":0,"width":1700,"height":2200,"unit":"pixel"}],"pageResults":[{"page":1,"tables":[{"rows":5,"columns":5,"cells":[{"rowIndex":0,"columnIndex":0,"columnSpan":2,"text":"Details","boundingBox":[157,1038,847,1037,847,1086,157,1086]},{"rowIndex":0,"columnIndex":2,"text":"Quantity","boundingBox":[847,1037,1071,1037,1071,1086,847,1086]},{"rowIndex":0,"columnIndex":3,"text":"Unit Price","boundingBox":[1071,1037,1310,1038,1310,1086,1071,1086]},{"rowIndex":0,"columnIndex":4,"text":"Total","boundingBox":[1310,1038,1543,1038,1543,1086,1310,1086]},{"rowIndex":1,"columnIndex":0,"columnSpan":2,"text":"Bindings","boundingBox":[157,1086,847,1086,847,1127,157,1128]},{"rowIndex":1,"columnIndex":2,"text":"20","boundingBox":[847,1086,1071,1086,1071,1127,847,1127]},{"rowIndex":1,"columnIndex":3,"text":"1.00","boundingBox":[1071,1086,1310,1086,1310,1127,1071,1127]},{"rowIndex":1,"columnIndex":4,"text":"20.00","boundingBox":[1310,1086,1543,1086,1543,1127,1310,1127]},{"rowIndex":2,"columnIndex":0,"columnSpan":2,"text":"Covers Small","boundingBox":[157,1128,847,1127,847,1171,157,1171]},{"rowIndex":2,"columnIndex":2,"text":"20","boundingBox":[847,1127,1071,1127,1071,1171,847,1171]},{"rowIndex":2,"columnIndex":3,"text":"1.00","boundingBox":[1071,1127,1310,1127,1310,1171,1071,1171]},{"rowIndex":2,"columnIndex":4,"text":"20.00","boundingBox":[1310,1127,1543,1127,1543,1171,1310,1171]},{"rowIndex":3,"columnIndex":0,"columnSpan":2,"text":"Feather Bookmark","boundingBox":[157,1171,847,1171,847,1214,157,1214]},{"rowIndex":3,"columnIndex":2,"text":"20","boundingBox":[847,1171,1071,1171,1071,1214,847,1214]},{"rowIndex":3,"columnIndex":3,"text":"5.00","boundingBox":[1071,1171,1310,1171,1310,1214,1071,1214]},{"rowIndex":3,"columnIndex":4,"text":"100.00","boundingBox":[1310,1171,1543,1171,1543,1215,1310,1214]},{"rowIndex":4,"columnIndex":0,"columnSpan":2,"text":"Copper Swirl Marker","boundingBox":[157,1214,847,1214,847,1258,157,1258]},{"rowIndex":4,"columnIndex":2,"text":"20","boundingBox":[847,1214,1071,1214,1071,1258,847,1258]},{"rowIndex":4,"columnIndex":3,"text":"5.00","boundingBox":[1071,1214,1310,1214,1310,1258,1071,1258]},{"rowIndex":4,"columnIndex":4,"text":"100.00","boundingBox":[1310,1214,1543,1215,1543,1260,1310,1258]}],"boundingBox":[153,1036,1547,1037,1547,1265,153,1265]},{"rows":4,"columns":2,"cells":[{"rowIndex":0,"columnIndex":0,"text":"SUBTOTAL","boundingBox":[1072,1564,1307,1565,1308,1609,1071,1608]},{"rowIndex":0,"columnIndex":1,"text":"$140.00","boundingBox":[1307,1565,1542,1564,1543,1609,1308,1609]},{"rowIndex":1,"columnIndex":0,"text":"TAX","boundingBox":[1071,1608,1308,1609,1308,1652,1071,1651]},{"rowIndex":1,"columnIndex":1,"text":"$4.00","boundingBox":[1308,1609,1543,1609,1543,1652,1308,1652]},{"rowIndex":2,"columnIndex":0,"text":"","boundingBox":[1071,1651,1308,1652,1308,1663,1071,1663]},{"rowIndex":2,"columnIndex":1,"text":"","boundingBox":[1308,1652,1543,1652,1543,1663,1308,1663]},{"rowIndex":3,"columnIndex":0,"text":"TOTAL","boundingBox":[1071,1663,1308,1663,1308,1707,1071,1707]},{"rowIndex":3,"columnIndex":1,"text":"$144.00","boundingBox":[1308,1663,1543,1663,1543,1708,1308,1707]}],"boundingBox":[1058,1563,1555,1563,1555,1707,1058,1707]}]}],"documentResults":[{"docType":"custom:modelName161714565874306436","modelId":"6178d6cd-33b7-4303-846f-c4a724814b9c","pageRange":[1,1],"fields":{"Subtotal":{"type":"string","valueString":"$140.00","text":"$140.00","page":1,"boundingBox":[1428,1572,1528,1572,1528,1599,1428,1599],"confidence":0.995},"PhoneNumber":{"type":"string","valueString":"555-348-6512","text":"555-348-6512","page":1,"boundingBox":[365,351,525,351,525,378,365,378],"confidence":0.995},"Signature":{"type":"string","valueString":"Bernie Sanders","text":"Bernie Sanders","page":1,"boundingBox":[484,1670,762,1670,762,1708,484,1708],"confidence":0.995},"CompanyPhoneNumber":{"type":"string","valueString":"938-294-2949","text":"938-294-2949","page":1,"boundingBox":[709,722,882,722,882,749,709,749],"confidence":0.995},"CompanyAddress":{"type":"string","valueString":"938 NE Burner Road Boulder City, CO 92848","text":"938 NE Burner Road Boulder City, CO 92848","page":1,"boundingBox":[275,685,561,685,561,751,275,751],"confidence":0.995},"Tax":{"type":"string","valueString":"$4.00","text":"$4.00","page":1,"boundingBox":[1458,1615,1529,1615,1529,1643,1458,1643],"confidence":0.995},"PurchaseOrderNumber":{"type":"string","valueString":"948284","text":"948284","page":1,"boundingBox":[1278,461,1372,461,1372,489,1278,489],"confidence":0.995},"Merchant":{"type":"string","valueString":"Hero Limited","text":"Hero Limited","page":1,"boundingBox":[620,205,1062,205,1062,266,620,266],"confidence":0.995},"Total":{"type":"string","valueString":"$144.00","text":"$144.00","page":1,"boundingBox":[1427,1669,1527,1669,1527,1698,1427,1698],"confidence":0.995},"Quantity":{"type":"number","text":"20","page":1,"boundingBox":[860,1094,888,1094,888,1119,860,1119],"confidence":0.995},"Website":{"type":"string","valueString":"www.herolimited.com","text":"www.herolimited.com","page":1,"boundingBox":[273,393,524,393,524,418,273,418],"confidence":0.995},"VendorName":{"type":"string","valueString":"Hillary Swank","text":"Hillary Swank","page":1,"boundingBox":[349,609,520,609,520,639,349,639],"confidence":0.995},"CompanyName":{"type":"string","valueString":"Higgly Wiggly Books","text":"Higgly Wiggly Books","page":1,"boundingBox":[375,646,629,646,629,679,375,679],"confidence":0.995},"DatedAs":{"type":"string","valueString":"12/20/2020","text":"12/20/2020","page":1,"boundingBox":[1163,420,1310,420,1310,449,1163,449],"confidence":0.995},"Email":{"type":"string","valueString":"accounts@herolimited.com","text":"accounts@herolimited.com","page":1,"boundingBox":[164,479,471,479,471,503,164,503],"confidence":0.995}},"docTypeConfidence":0.92}],"errors":[]}}, [
  'Content-Length',
  '6220',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '28',
  'apim-request-id',
  'a6330e97-8cbc-4c02-bd2c-d36683f3c9de',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:07:55 GMT'
]);
