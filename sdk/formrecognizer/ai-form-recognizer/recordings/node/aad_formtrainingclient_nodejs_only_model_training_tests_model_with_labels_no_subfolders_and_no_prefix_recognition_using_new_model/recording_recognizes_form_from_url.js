let nock = require('nock');

module.exports.hash = "4529a087e1255024f2e7fb6f746974d3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1500',
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
  '80623b9a-ca22-4d56-b8c0-f778af021100',
  'x-ms-ests-server',
  '2.1.11198.13 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=ArFVBUkBAzxLlgCe45eG1If0CyfMAQAAABiLLtcOAAAA; expires=Sun, 29-Nov-2020 22:30:48 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 30 Oct 2020 22:30:48 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.1/custom/models/04cbb804-a2c2-42a1-ac96-fab5c3676de6/analyze', {"source":"https://storageaccount/testingdata/Form_1.jpg?sastoken"})
  .reply(202, "", [
  'Content-Length',
  '0',
  'Operation-Location',
  'https://endpoint/formrecognizer/v2.1-preview.1/custom/models/04cbb804-a2c2-42a1-ac96-fab5c3676de6/analyzeresults/76fb2965-8e4a-4003-bae9-07d7f6881fc6',
  'x-envoy-upstream-service-time',
  '56',
  'apim-request-id',
  'ef94f2ce-30da-4272-99c8-744e6d506132',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:30:48 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/04cbb804-a2c2-42a1-ac96-fab5c3676de6/analyzeResults/76fb2965-8e4a-4003-bae9-07d7f6881fc6')
  .reply(200, {"status":"notStarted","createdDateTime":"2020-10-30T22:30:49Z","lastUpdatedDateTime":"2020-10-30T22:30:49Z"}, [
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '25',
  'apim-request-id',
  '0f870be8-1337-4596-b5dc-47462abfbe0a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:30:48 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/04cbb804-a2c2-42a1-ac96-fab5c3676de6/analyzeResults/76fb2965-8e4a-4003-bae9-07d7f6881fc6')
  .reply(200, {"status":"notStarted","createdDateTime":"2020-10-30T22:30:49Z","lastUpdatedDateTime":"2020-10-30T22:30:49Z"}, [
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '18',
  'apim-request-id',
  '66688011-8361-43f7-ab2c-6400ed229b13',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:30:48 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/04cbb804-a2c2-42a1-ac96-fab5c3676de6/analyzeResults/76fb2965-8e4a-4003-bae9-07d7f6881fc6')
  .reply(200, {"status":"notStarted","createdDateTime":"2020-10-30T22:30:49Z","lastUpdatedDateTime":"2020-10-30T22:30:53Z"}, [
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '21',
  'apim-request-id',
  '9cae304a-4020-4a20-93a9-cecddc9adf64',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:30:53 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/04cbb804-a2c2-42a1-ac96-fab5c3676de6/analyzeResults/76fb2965-8e4a-4003-bae9-07d7f6881fc6')
  .reply(200, {"status":"succeeded","createdDateTime":"2020-10-30T22:30:49Z","lastUpdatedDateTime":"2020-10-30T22:30:56Z","analyzeResult":{"version":"2.1.0","readResults":[{"page":1,"angle":0,"width":1700,"height":2200,"unit":"pixel","selectionMarks":[{"boundingBox":[2,2060,195,2060,195,2200,2,2200],"confidence":0.881,"state":"unselected"}]}],"pageResults":[{"page":1,"tables":[{"rows":4,"columns":3,"cells":[{"rowIndex":1,"columnIndex":1,"text":"SUBTOTAL","boundingBox":[1072,1566,1309,1566,1309,1610,1072,1610]},{"rowIndex":1,"columnIndex":2,"text":"$140.00","boundingBox":[1309,1566,1544,1566,1544,1610,1309,1610]},{"rowIndex":2,"columnIndex":1,"text":"TAX","boundingBox":[1072,1610,1309,1610,1309,1658,1072,1658]},{"rowIndex":2,"columnIndex":2,"text":"$4.00","boundingBox":[1309,1610,1544,1610,1544,1658,1309,1658]},{"rowIndex":3,"columnIndex":0,"text":"Bernie Sanders","boundingBox":[489,1658,1072,1658,1072,1708,489,1708]},{"rowIndex":3,"columnIndex":1,"text":"TOTAL","boundingBox":[1072,1658,1309,1658,1309,1708,1072,1708]},{"rowIndex":3,"columnIndex":2,"text":"$144.00","boundingBox":[1309,1658,1544,1658,1544,1708,1309,1708]}]},{"rows":6,"columns":4,"cells":[{"rowIndex":0,"columnIndex":0,"text":"Details","boundingBox":[156,1038,847,1038,847,1087,156,1087]},{"rowIndex":0,"columnIndex":1,"text":"Quantity","boundingBox":[847,1038,1072,1038,1072,1087,847,1087]},{"rowIndex":0,"columnIndex":2,"text":"Unit Price","boundingBox":[1072,1038,1309,1038,1309,1087,1072,1087]},{"rowIndex":0,"columnIndex":3,"text":"Total","boundingBox":[1309,1038,1544,1038,1544,1087,1309,1087]},{"rowIndex":1,"columnIndex":0,"text":"Bindings","boundingBox":[156,1087,847,1087,847,1128,156,1128]},{"rowIndex":1,"columnIndex":1,"text":"20","boundingBox":[847,1087,1072,1087,1072,1128,847,1128]},{"rowIndex":1,"columnIndex":2,"text":"1.00","boundingBox":[1072,1087,1309,1087,1309,1128,1072,1128]},{"rowIndex":1,"columnIndex":3,"text":"20.00","boundingBox":[1309,1087,1544,1087,1544,1128,1309,1128]},{"rowIndex":2,"columnIndex":0,"text":"Covers Small","boundingBox":[156,1128,847,1128,847,1172,156,1172]},{"rowIndex":2,"columnIndex":1,"text":"20","boundingBox":[847,1128,1072,1128,1072,1172,847,1172]},{"rowIndex":2,"columnIndex":2,"text":"1.00","boundingBox":[1072,1128,1309,1128,1309,1172,1072,1172]},{"rowIndex":2,"columnIndex":3,"text":"20.00","boundingBox":[1309,1128,1544,1128,1544,1172,1309,1172]},{"rowIndex":3,"columnIndex":0,"text":"Feather Bookmark","boundingBox":[156,1172,847,1172,847,1216,156,1216]},{"rowIndex":3,"columnIndex":1,"text":"20","boundingBox":[847,1172,1072,1172,1072,1216,847,1216]},{"rowIndex":3,"columnIndex":2,"text":"5.00","boundingBox":[1072,1172,1309,1172,1309,1216,1072,1216]},{"rowIndex":3,"columnIndex":3,"text":"100.00","boundingBox":[1309,1172,1544,1172,1544,1216,1309,1216]},{"rowIndex":4,"columnIndex":0,"text":"Copper Swirl Marker","boundingBox":[156,1216,847,1216,847,1260,156,1260]},{"rowIndex":4,"columnIndex":1,"text":"20","boundingBox":[847,1216,1072,1216,1072,1260,847,1260]},{"rowIndex":4,"columnIndex":2,"text":"5.00","boundingBox":[1072,1216,1309,1216,1309,1260,1072,1260]},{"rowIndex":4,"columnIndex":3,"text":"100.00","boundingBox":[1309,1216,1544,1216,1544,1260,1309,1260]}]}]}],"documentResults":[{"docType":"custom:modelName160409704202407761","modelId":"04cbb804-a2c2-42a1-ac96-fab5c3676de6","pageRange":[1,1],"fields":{"DatedAs":{"type":"string","valueString":"12/20/2020","text":"12/20/2020","page":1,"boundingBox":[1165,420,1317,420,1317,449,1165,449],"confidence":0.99},"Tax":{"type":"string","valueString":"$4.00","text":"$4.00","page":1,"boundingBox":[1458,1615,1529,1615,1529,1643,1458,1643],"confidence":0.994},"PurchaseOrderNumber":{"type":"string","valueString":"948284","text":"948284","page":1,"boundingBox":[1277,461,1376,461,1376,489,1277,489],"confidence":0.94},"Subtotal":{"type":"string","valueString":"$140.00","text":"$140.00","page":1,"boundingBox":[1426,1572,1531,1572,1531,1599,1426,1599],"confidence":0.984},"Website":{"type":"string","valueString":"www.herolimited.com","text":"www.herolimited.com","page":1,"boundingBox":[273,393,531,393,531,418,273,418],"confidence":0.95},"CompanyAddress":{"type":"string","valueString":"938 NE Burner Road Boulder City, CO 92848","text":"938 NE Burner Road Boulder City, CO 92848","page":1,"boundingBox":[273,685,565,685,565,751,273,751],"confidence":1},"PhoneNumber":{"type":"string","valueString":"555-348-6512","text":"555-348-6512","page":1,"boundingBox":[364,351,528,351,528,378,364,378],"confidence":0.89},"Signature":{"type":"string","valueString":"Bernie Sanders","text":"Bernie Sanders","page":1,"boundingBox":[489,1670,765,1670,765,1708,489,1708],"confidence":0.998},"VendorName":{"type":"string","valueString":"Hillary Swank","text":"Hillary Swank","page":1,"boundingBox":[349,609,521,609,521,639,349,639],"confidence":0.93},"Quantity":{"type":"number","text":"20","page":1,"boundingBox":[861,1094,892,1094,892,1119,861,1119],"confidence":0.962},"Merchant":{"type":"string","valueString":"Hero Limited","text":"Hero Limited","page":1,"boundingBox":[620,205,1075,205,1075,266,620,266],"confidence":0.97},"Email":{"type":"string","valueString":"accounts@herolimited.com","text":"accounts@herolimited.com","page":1,"boundingBox":[164,479,478,479,478,503,164,503],"confidence":1},"CompanyName":{"type":"string","valueString":"Higgly Wiggly Books","text":"Higgly Wiggly Books","page":1,"boundingBox":[375,646,629,646,629,679,375,679],"confidence":0.95},"CompanyPhoneNumber":{"type":"string","valueString":"938-294-2949","text":"938-294-2949","page":1,"boundingBox":[708,722,885,722,885,749,708,749],"confidence":1},"Total":{"type":"string","valueString":"$144.00","text":"$144.00","page":1,"boundingBox":[1427,1669,1529,1669,1529,1698,1427,1698],"confidence":0.991}},"docTypeConfidence":1}],"errors":[]}}, [
  'Content-Length',
  '6045',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '27',
  'apim-request-id',
  'a9e47e53-0c7a-4fb7-91b6-1c9ccea839f0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:30:59 GMT'
]);
