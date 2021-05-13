let nock = require('nock');

module.exports.hash = "87dabfb16a6afa93980b1ac777872ee8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1/custom/models/3fe12716-3902-45f3-9247-c0a4dfeedff8/analyze', {"source":"https://storageaccount/testingdata/Form_1.jpg?sastoken"})
  .reply(202, "", [
  'Content-Length',
  '0',
  'Operation-Location',
  'https://endpoint/formrecognizer/v2.1/custom/models/3fe12716-3902-45f3-9247-c0a4dfeedff8/analyzeresults/d5c1b6bf-b425-4eb9-b7c4-6d50c83406be',
  'x-envoy-upstream-service-time',
  '384',
  'apim-request-id',
  'b01c7a29-c106-4de7-aa93-63bc50e22cfa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:23:58 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/3fe12716-3902-45f3-9247-c0a4dfeedff8/analyzeResults/d5c1b6bf-b425-4eb9-b7c4-6d50c83406be')
  .reply(200, {"status":"notStarted","createdDateTime":"2021-05-12T01:23:58Z","lastUpdatedDateTime":"2021-05-12T01:23:58Z"}, [
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  'c9c46f12-4de6-4634-bdb1-b2884a2e6b93',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:23:58 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/3fe12716-3902-45f3-9247-c0a4dfeedff8/analyzeResults/d5c1b6bf-b425-4eb9-b7c4-6d50c83406be')
  .reply(200, {"status":"notStarted","createdDateTime":"2021-05-12T01:23:58Z","lastUpdatedDateTime":"2021-05-12T01:23:58Z"}, [
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '23',
  'apim-request-id',
  '430b8259-9a4d-484c-b3a5-231621baadb2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:23:58 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/3fe12716-3902-45f3-9247-c0a4dfeedff8/analyzeResults/d5c1b6bf-b425-4eb9-b7c4-6d50c83406be')
  .reply(200, {"status":"running","createdDateTime":"2021-05-12T01:23:58Z","lastUpdatedDateTime":"2021-05-12T01:23:59Z","analyzeResult":null}, [
  'Content-Length',
  '134',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '22',
  'apim-request-id',
  'dcc7b265-30df-4fe6-8aa3-ccbdc0ef299c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:24:03 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/3fe12716-3902-45f3-9247-c0a4dfeedff8/analyzeResults/d5c1b6bf-b425-4eb9-b7c4-6d50c83406be')
  .reply(200, {"status":"succeeded","createdDateTime":"2021-05-12T01:23:58Z","lastUpdatedDateTime":"2021-05-12T01:24:05Z","analyzeResult":{"version":"2.1.0","readResults":[{"page":1,"angle":0,"width":1700,"height":2200,"unit":"pixel","lines":[],"selectionMarks":null}],"pageResults":[{"page":1,"keyValuePairs":[{"key":{"text":"Company Phone:","boundingBox":[163,352,361,352,361,378,163,378],"elements":null},"value":{"text":"555-348-6512","boundingBox":[365,351,525,351,525,378,365,378],"elements":null},"confidence":1},{"key":{"text":"Website:","boundingBox":[167,394,268,394,268,417,167,417],"elements":null},"value":{"text":"www.herolimited.com","boundingBox":[273,393,524,393,524,418,273,418],"elements":null},"confidence":1},{"key":{"text":"Email:","boundingBox":[165,435,237,435,237,460,165,460],"elements":null},"value":{"text":"accounts@herolimited.com","boundingBox":[164,481,471,481,471,503,164,503],"elements":null},"confidence":1},{"key":{"text":"Dated As:","boundingBox":[1025,421,1158,421,1158,448,1025,448],"elements":null},"value":{"text":"12/20/2020","boundingBox":[1163,420,1310,420,1310,448,1163,448],"elements":null},"confidence":1},{"key":{"text":"Purchase Order #:","boundingBox":[1023,461,1273,461,1273,488,1023,488],"elements":null},"value":{"text":"948284","boundingBox":[1278,461,1371,461,1371,489,1278,489],"elements":null},"confidence":1},{"key":{"text":"Vendor Name:","boundingBox":[160,611,344,611,344,637,160,637],"elements":null},"value":{"text":"Hillary Swank","boundingBox":[349,609,520,609,520,639,349,639],"elements":null},"confidence":0.7},{"key":{"text":"Company Name:","boundingBox":[160,648,371,648,371,677,160,677],"elements":null},"value":{"text":"Higgly Wiggly Books","boundingBox":[376,646,629,646,629,679,376,679],"elements":null},"confidence":1},{"key":{"text":"Address:","boundingBox":[161,685,268,685,268,711,161,711],"elements":null},"value":{"text":"938 NE Burner Road Boulder City, CO 92848","boundingBox":[274,685,561,685,561,751,274,751],"elements":null},"confidence":1},{"key":{"text":"Phone:","boundingBox":[613,722,704,722,704,749,613,749],"elements":null},"value":{"text":"938-294-2949","boundingBox":[709,722,882,722,882,749,709,749],"elements":null},"confidence":1},{"key":{"text":"Name:","boundingBox":[166,853,248,853,248,879,166,879],"elements":null},"value":{"text":"Bernie Sanders","boundingBox":[253,852,445,852,445,880,253,880],"elements":null},"confidence":0.53},{"key":{"text":"Company Name:","boundingBox":[164,890,373,890,373,919,164,919],"elements":null},"value":{"text":"Jupiter Book Supply","boundingBox":[379,889,629,889,629,919,379,919],"elements":null},"confidence":0.53},{"key":{"text":"Address:","boundingBox":[166,926,275,926,275,953,166,953],"elements":null},"value":{"text":"383 N Kinnick Road Seattle, WA 38383","boundingBox":[280,926,516,926,516,991,280,991],"elements":null},"confidence":1},{"key":{"text":"Phone:","boundingBox":[760,964,849,964,849,990,760,990],"elements":null},"value":{"text":"932-299-0292","boundingBox":[854,964,1028,964,1028,990,854,990],"elements":null},"confidence":1},{"key":{"text":"SUBTOTAL","boundingBox":[1148,1575,1294,1575,1294,1600,1148,1600],"elements":null},"value":{"text":"$140.00","boundingBox":[1426,1571,1526,1571,1526,1599,1426,1599],"elements":null},"confidence":1},{"key":{"text":"TAX","boundingBox":[1237,1618,1290,1618,1290,1643,1237,1643],"elements":null},"value":{"text":"$4.00","boundingBox":[1458,1615,1529,1615,1529,1643,1458,1643],"elements":null},"confidence":1},{"key":{"text":"TOTAL","boundingBox":[1204,1674,1293,1674,1293,1699,1204,1699],"elements":null},"value":{"text":"$144.00","boundingBox":[1427,1671,1526,1671,1526,1698,1427,1698],"elements":null},"confidence":1},{"key":{"text":"Additional Notes:","boundingBox":[173,1796,479,1796,479,1831,173,1831],"elements":null},"value":{"text":"Do not Jostle Box. Unpack carefully. Enjoy. Jupiter Book Supply will refund you 50% per book if returned within 60 days of reading and offer you 25% off you next total purchase.","boundingBox":[169,1880,1509,1880,1509,1992,169,1992],"elements":null},"confidence":0.53}],"tables":[{"rows":5,"columns":4,"cells":[{"text":"Details","rowIndex":0,"columnIndex":0,"boundingBox":[447,1048,557,1048,557,1078,447,1078],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":true,"isFooter":false},{"text":"Quantity","rowIndex":0,"columnIndex":1,"boundingBox":[886,1048,1033,1048,1033,1084,886,1084],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":true,"isFooter":false},{"text":"Unit Price","rowIndex":0,"columnIndex":2,"boundingBox":[1111,1047,1266,1047,1266,1078,1111,1078],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":true,"isFooter":false},{"text":"Total","rowIndex":0,"columnIndex":3,"boundingBox":[1382,1047,1467,1047,1467,1076,1382,1076],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":true,"isFooter":false},{"text":"Bindings","rowIndex":1,"columnIndex":0,"boundingBox":[172,1094,280,1094,280,1122,172,1122],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":false,"isFooter":false},{"text":"20","rowIndex":1,"columnIndex":1,"boundingBox":[860,1094,888,1094,888,1119,860,1119],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":false,"isFooter":false},{"text":"1.00","rowIndex":1,"columnIndex":2,"boundingBox":[1240,1095,1291,1095,1291,1118,1240,1118],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":false,"isFooter":false},{"text":"20.00","rowIndex":1,"columnIndex":3,"boundingBox":[1459,1096,1527,1096,1527,1119,1459,1119],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":false,"isFooter":false},{"text":"Covers Small","rowIndex":2,"columnIndex":0,"boundingBox":[170,1136,333,1136,333,1161,170,1161],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":false,"isFooter":false},{"text":"20","rowIndex":2,"columnIndex":1,"boundingBox":[860,1135,888,1135,888,1160,860,1160],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":false,"isFooter":false},{"text":"1.00","rowIndex":2,"columnIndex":2,"boundingBox":[1240,1135,1291,1135,1291,1160,1240,1160],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":false,"isFooter":false},{"text":"20.00","rowIndex":2,"columnIndex":3,"boundingBox":[1459,1135,1527,1135,1527,1160,1459,1160],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":false,"isFooter":false},{"text":"Feather Bookmark","rowIndex":3,"columnIndex":0,"boundingBox":[173,1179,399,1179,399,1206,173,1206],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":false,"isFooter":false},{"text":"20","rowIndex":3,"columnIndex":1,"boundingBox":[861,1179,889,1179,889,1203,861,1203],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":false,"isFooter":false},{"text":"5.00","rowIndex":3,"columnIndex":2,"boundingBox":[1240,1179,1291,1179,1291,1204,1240,1204],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":false,"isFooter":false},{"text":"100.00","rowIndex":3,"columnIndex":3,"boundingBox":[1443,1181,1525,1181,1525,1205,1443,1205],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":false,"isFooter":false},{"text":"Copper Swirl Marker","rowIndex":4,"columnIndex":0,"boundingBox":[170,1222,429,1222,429,1252,170,1252],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":false,"isFooter":false},{"text":"20","rowIndex":4,"columnIndex":1,"boundingBox":[861,1223,888,1223,888,1247,861,1247],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":false,"isFooter":false},{"text":"5.00","rowIndex":4,"columnIndex":2,"boundingBox":[1240,1221,1292,1221,1292,1247,1240,1247],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":false,"isFooter":false},{"text":"100.00","rowIndex":4,"columnIndex":3,"boundingBox":[1444,1224,1526,1224,1526,1248,1444,1248],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":false,"isFooter":false}]}],"clusterId":0}],"documentResults":[],"errors":[]}}, [
  'Content-Length',
  '9205',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '25',
  'apim-request-id',
  'b994f225-b94f-465d-892e-053541bff930',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:24:08 GMT'
]);
