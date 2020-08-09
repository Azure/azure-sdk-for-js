let nock = require('nock');

module.exports.hash = "4234e9e66d4f22dec11a7b70d921f69c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.0/custom/models/0483c505-0117-4a9c-9335-a875c6fc422b/analyze', {"source":"https://storageaccount/testingdata/Form_1.jpg?sastoken"})
  .reply(202, "", [
  'Content-Length',
  '0',
  'Operation-Location',
  'https://endpoint/formrecognizer/v2.0/custom/models/0483c505-0117-4a9c-9335-a875c6fc422b/analyzeresults/fc1d3c8c-4996-4ed8-97e7-4d8389157916',
  'x-envoy-upstream-service-time',
  '64',
  'apim-request-id',
  'a61929f7-7a4c-4371-b5e0-c3a40e62cbe5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 05 Aug 2020 23:30:01 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0/custom/models/0483c505-0117-4a9c-9335-a875c6fc422b/analyzeResults/fc1d3c8c-4996-4ed8-97e7-4d8389157916')
  .reply(200, {"status":"notStarted","createdDateTime":"2020-08-05T23:30:02Z","lastUpdatedDateTime":"2020-08-05T23:30:02Z"}, [
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '20',
  'apim-request-id',
  '0f3b012e-e5f6-4eb6-92cd-eac4aef7d2d1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 05 Aug 2020 23:30:01 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0/custom/models/0483c505-0117-4a9c-9335-a875c6fc422b/analyzeResults/fc1d3c8c-4996-4ed8-97e7-4d8389157916')
  .reply(200, {"status":"notStarted","createdDateTime":"2020-08-05T23:30:02Z","lastUpdatedDateTime":"2020-08-05T23:30:02Z"}, [
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  '82ccfe31-ac2a-4ebe-969e-7bf860346d8b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 05 Aug 2020 23:30:01 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0/custom/models/0483c505-0117-4a9c-9335-a875c6fc422b/analyzeResults/fc1d3c8c-4996-4ed8-97e7-4d8389157916')
  .reply(200, {"status":"running","createdDateTime":"2020-08-05T23:30:02Z","lastUpdatedDateTime":"2020-08-05T23:30:03Z","analyzeResult":null}, [
  'Content-Length',
  '134',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  '47b78532-e08e-4a42-a04c-c340a0db37f9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 05 Aug 2020 23:30:07 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0/custom/models/0483c505-0117-4a9c-9335-a875c6fc422b/analyzeResults/fc1d3c8c-4996-4ed8-97e7-4d8389157916')
  .reply(200, {"status":"running","createdDateTime":"2020-08-05T23:30:02Z","lastUpdatedDateTime":"2020-08-05T23:30:03Z","analyzeResult":null}, [
  'Content-Length',
  '134',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  '7fe4c0c1-fbde-41a1-ac48-33aa9cd7db5b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 05 Aug 2020 23:30:12 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0/custom/models/0483c505-0117-4a9c-9335-a875c6fc422b/analyzeResults/fc1d3c8c-4996-4ed8-97e7-4d8389157916')
  .reply(200, {"status":"running","createdDateTime":"2020-08-05T23:30:02Z","lastUpdatedDateTime":"2020-08-05T23:30:03Z","analyzeResult":null}, [
  'Content-Length',
  '134',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  '5f81e379-d195-4b90-b933-91d56d446543',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 05 Aug 2020 23:30:16 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0/custom/models/0483c505-0117-4a9c-9335-a875c6fc422b/analyzeResults/fc1d3c8c-4996-4ed8-97e7-4d8389157916')
  .reply(200, {"status":"succeeded","createdDateTime":"2020-08-05T23:30:02Z","lastUpdatedDateTime":"2020-08-05T23:30:18Z","analyzeResult":{"version":"2.0.0","readResults":[{"page":1,"angle":0.16,"width":1700,"height":2200,"unit":"pixel","lines":[]}],"pageResults":[{"page":1,"keyValuePairs":[{"key":{"text":"Hero Limited","boundingBox":[620,203,1078,203,1078,271,620,271],"elements":null},"value":{"text":"","boundingBox":null,"elements":null},"confidence":0.5},{"key":{"text":"Company Phone:","boundingBox":[167,351,365,351,365,381,167,381],"elements":null},"value":{"text":"555-348-6512","boundingBox":[371,351,528,351,528,381,371,381],"elements":null},"confidence":1},{"key":{"text":"Website:","boundingBox":[167,392,271,392,271,420,167,420],"elements":null},"value":{"text":"www.herolimited.com","boundingBox":[277,392,530,392,530,420,277,420],"elements":null},"confidence":1},{"key":{"text":"Dated As:","boundingBox":[1025,418,1161,418,1161,451,1025,451],"elements":null},"value":{"text":"12/20/2020","boundingBox":[1168,418,1319,418,1319,451,1168,451],"elements":null},"confidence":1},{"key":{"text":"Email:","boundingBox":[167,431,240,431,240,458,167,458],"elements":null},"value":{"text":"accounts@herolimited.com","boundingBox":[168,480,476,480,476,505,168,505],"elements":null},"confidence":1},{"key":{"text":"Purchase Order #:","boundingBox":[1027,460,1275,460,1275,491,1027,491],"elements":null},"value":{"text":"948284","boundingBox":[1282,460,1376,460,1376,491,1282,491],"elements":null},"confidence":1},{"key":{"text":"Vendor Name:","boundingBox":[162,610,346,610,346,640,162,640],"elements":null},"value":{"text":"Hillary Swank","boundingBox":[352,610,519,610,519,640,352,640],"elements":null},"confidence":0.7},{"key":{"text":"Company Name:","boundingBox":[162,646,373,646,373,678,162,678],"elements":null},"value":{"text":"Higgly Wiggly Books","boundingBox":[379,646,628,646,628,678,379,678],"elements":null},"confidence":1},{"key":{"text":"Address:","boundingBox":[162,684,272,684,272,715,162,715],"elements":null},"value":{"text":"938 NE Burner Road Boulder City, CO 92848","boundingBox":[279,684,569,684,569,752,279,752],"elements":null},"confidence":1},{"key":{"text":"Phone:","boundingBox":[615,723,707,723,707,752,615,752],"elements":null},"value":{"text":"938-294-2949","boundingBox":[713,723,884,723,884,752,713,752],"elements":null},"confidence":1},{"key":{"text":"Name:","boundingBox":[166,852,253,852,253,881,166,881],"elements":null},"value":{"text":"Bernie Sanders","boundingBox":[258,852,445,852,445,881,258,881],"elements":null},"confidence":0.53},{"key":{"text":"Company Name:","boundingBox":[169,888,378,888,378,919,169,919],"elements":null},"value":{"text":"Jupiter Book Supply","boundingBox":[385,888,624,888,624,919,385,919],"elements":null},"confidence":0.53},{"key":{"text":"Address:","boundingBox":[168,924,276,924,276,954,168,954],"elements":null},"value":{"text":"383 N Kinnick Road Seattle, WA 38383","boundingBox":[283,924,524,924,524,992,283,992],"elements":null},"confidence":1},{"key":{"text":"Phone:","boundingBox":[760,964,852,964,852,992,760,992],"elements":null},"value":{"text":"932-299-0292","boundingBox":[857,964,1032,964,1032,992,857,992],"elements":null},"confidence":1},{"key":{"text":"SUBTOTAL","boundingBox":[1156,1571,1298,1571,1298,1599,1156,1599],"elements":null},"value":{"text":"$140.00","boundingBox":[1434,1574,1530,1574,1530,1599,1434,1599],"elements":null},"confidence":1},{"key":{"text":"TAX","boundingBox":[1242,1619,1293,1619,1293,1643,1242,1643],"elements":null},"value":{"text":"$4.00","boundingBox":[1462,1615,1532,1615,1532,1640,1462,1640],"elements":null},"confidence":1},{"key":{"text":"TOTAL","boundingBox":[1206,1674,1298,1674,1298,1700,1206,1700],"elements":null},"value":{"text":"$144.00","boundingBox":[1434,1671,1531,1671,1531,1697,1434,1697],"elements":null},"confidence":1},{"key":{"text":"Additional Notes:","boundingBox":[175,1797,479,1797,479,1834,175,1834],"elements":null},"value":{"text":"Do not Jostle Box. Unpack carefully. Enjoy. Jupiter Book Supply will refund you 50% per book if returned within 60 days of reading and offer you 25% off you next total purchase.","boundingBox":[170,1880,1511,1880,1511,1992,170,1992],"elements":null},"confidence":0.53},{"key":{"text":"__Tokens__1","boundingBox":null,"elements":null},"value":{"text":"Purchase Order","boundingBox":[141,140,348,140,348,168,141,168],"elements":null},"confidence":1},{"key":{"text":"__Tokens__2","boundingBox":null,"elements":null},"value":{"text":"Purchase Order","boundingBox":[1117,319,1551,319,1551,372,1117,372],"elements":null},"confidence":1},{"key":{"text":"__Tokens__3","boundingBox":null,"elements":null},"value":{"text":"Shipped To","boundingBox":[170,546,398,546,398,592,170,592],"elements":null},"confidence":1},{"key":{"text":"__Tokens__4","boundingBox":null,"elements":null},"value":{"text":"Shipped From","boundingBox":[169,784,445,784,445,831,169,831],"elements":null},"confidence":1},{"key":{"text":"__Tokens__5","boundingBox":null,"elements":null},"value":{"text":"Bernie Sanders","boundingBox":[485,1669,766,1669,766,1708,485,1708],"elements":null},"confidence":1},{"key":{"text":"__Tokens__6","boundingBox":null,"elements":null},"value":{"text":"Bernie Sanders","boundingBox":[544,1717,719,1717,719,1743,544,1743],"elements":null},"confidence":1},{"key":{"text":"__Tokens__7","boundingBox":null,"elements":null},"value":{"text":"Manager","boundingBox":[579,1752,687,1752,687,1777,579,1777],"elements":null},"confidence":1}],"tables":[{"rows":5,"columns":4,"cells":[{"text":"Details","rowIndex":0,"columnIndex":0,"boundingBox":[447,1047,551,1047,551,1080,447,1080],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":true,"isFooter":false},{"text":"Quantity","rowIndex":0,"columnIndex":1,"boundingBox":[890,1048,1028,1048,1028,1080,890,1080],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":true,"isFooter":false},{"text":"Unit Price","rowIndex":0,"columnIndex":2,"boundingBox":[1113,1045,1267,1045,1267,1080,1113,1080],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":true,"isFooter":false},{"text":"Total","rowIndex":0,"columnIndex":3,"boundingBox":[1389,1046,1466,1046,1466,1080,1389,1080],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":true,"isFooter":false},{"text":"Bindings","rowIndex":1,"columnIndex":0,"boundingBox":[173,1094,282,1094,282,1122,173,1122],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":false,"isFooter":false},{"text":"20","rowIndex":1,"columnIndex":1,"boundingBox":[863,1098,889,1098,889,1122,863,1122],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":false,"isFooter":false},{"text":"1.00","rowIndex":1,"columnIndex":2,"boundingBox":[1243,1096,1297,1096,1297,1122,1243,1122],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":false,"isFooter":false},{"text":"20.00","rowIndex":1,"columnIndex":3,"boundingBox":[1466,1098,1531,1098,1531,1122,1466,1122],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":false,"isFooter":false},{"text":"Covers Small","rowIndex":2,"columnIndex":0,"boundingBox":[172,1136,331,1136,331,1162,172,1162],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":false,"isFooter":false},{"text":"20","rowIndex":2,"columnIndex":1,"boundingBox":[862,1137,889,1137,889,1162,862,1162],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":false,"isFooter":false},{"text":"1.00","rowIndex":2,"columnIndex":2,"boundingBox":[1243,1134,1292,1134,1292,1162,1243,1162],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":false,"isFooter":false},{"text":"20.00","rowIndex":2,"columnIndex":3,"boundingBox":[1464,1138,1531,1138,1531,1162,1464,1162],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":false,"isFooter":false},{"text":"Feather Bookmark","rowIndex":3,"columnIndex":0,"boundingBox":[172,1179,404,1179,404,1205,172,1205],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":false,"isFooter":false},{"text":"20","rowIndex":3,"columnIndex":1,"boundingBox":[863,1177,888,1177,888,1199,863,1199],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":false,"isFooter":false},{"text":"5.00","rowIndex":3,"columnIndex":2,"boundingBox":[1243,1179,1298,1179,1298,1205,1243,1205],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":false,"isFooter":false},{"text":"100.00","rowIndex":3,"columnIndex":3,"boundingBox":[1448,1180,1530,1180,1530,1205,1448,1205],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":false,"isFooter":false},{"text":"Copper Swirl Marker","rowIndex":4,"columnIndex":0,"boundingBox":[171,1224,426,1224,426,1248,171,1248],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":false,"isFooter":false},{"text":"20","rowIndex":4,"columnIndex":1,"boundingBox":[864,1221,887,1221,887,1244,864,1244],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":false,"isFooter":false},{"text":"5.00","rowIndex":4,"columnIndex":2,"boundingBox":[1242,1222,1291,1222,1291,1248,1242,1248],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":false,"isFooter":false},{"text":"100.00","rowIndex":4,"columnIndex":3,"boundingBox":[1449,1225,1530,1225,1530,1248,1449,1248],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":false,"isFooter":false}]}],"clusterId":0}],"documentResults":[],"errors":[]}}, [
  'Content-Length',
  '11800',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '18',
  'apim-request-id',
  '4b2a244b-4934-4db6-b83b-72238d3a041c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 05 Aug 2020 23:30:22 GMT'
]);
