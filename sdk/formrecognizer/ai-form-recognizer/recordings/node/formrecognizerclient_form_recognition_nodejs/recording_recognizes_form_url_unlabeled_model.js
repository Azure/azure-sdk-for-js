let nock = require('nock');

module.exports.hash = "295d8e1b75d0e0b1bf05db0b1b2408e6";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.0/custom/models/10a011c6-f496-448b-b7b1-d470daeeacd7/analyze', {"source":"https://storageaccount/testingdata/Form_1.jpg?sastoken"})
  .reply(202, "", [
  'Content-Length',
  '0',
  'Operation-Location',
  'https://endpoint/formrecognizer/v2.0/custom/models/10a011c6-f496-448b-b7b1-d470daeeacd7/analyzeresults/449250ee-bca7-4990-b5da-01c5f6a9d108',
  'x-envoy-upstream-service-time',
  '66',
  'apim-request-id',
  'b5e26948-d560-4f6f-b09b-b56441f9e344',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 18 Aug 2020 18:47:58 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0/custom/models/10a011c6-f496-448b-b7b1-d470daeeacd7/analyzeResults/449250ee-bca7-4990-b5da-01c5f6a9d108')
  .reply(200, {"status":"notStarted","createdDateTime":"2020-08-18T18:47:59Z","lastUpdatedDateTime":"2020-08-18T18:47:59Z"}, [
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  '6a8f8488-9e99-40dc-8dcf-4c0260ce7f3f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 18 Aug 2020 18:47:58 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0/custom/models/10a011c6-f496-448b-b7b1-d470daeeacd7/analyzeResults/449250ee-bca7-4990-b5da-01c5f6a9d108')
  .reply(200, {"status":"notStarted","createdDateTime":"2020-08-18T18:47:59Z","lastUpdatedDateTime":"2020-08-18T18:47:59Z"}, [
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  '7145c7d0-1f93-47c5-af74-55d336598faa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 18 Aug 2020 18:47:58 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0/custom/models/10a011c6-f496-448b-b7b1-d470daeeacd7/analyzeResults/449250ee-bca7-4990-b5da-01c5f6a9d108')
  .reply(200, {"status":"running","createdDateTime":"2020-08-18T18:47:59Z","lastUpdatedDateTime":"2020-08-18T18:48:00Z","analyzeResult":null}, [
  'Content-Length',
  '134',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '30',
  'apim-request-id',
  '880d049f-273e-4e25-ad31-59e8086a83be',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 18 Aug 2020 18:48:04 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0/custom/models/10a011c6-f496-448b-b7b1-d470daeeacd7/analyzeResults/449250ee-bca7-4990-b5da-01c5f6a9d108')
  .reply(200, {"status":"succeeded","createdDateTime":"2020-08-18T18:47:59Z","lastUpdatedDateTime":"2020-08-18T18:48:05Z","analyzeResult":{"version":"2.0.0","readResults":[{"page":1,"angle":0.16,"width":1700,"height":2200,"unit":"pixel","lines":[]}],"pageResults":[{"page":1,"keyValuePairs":[{"key":{"text":"Hero Limited","boundingBox":[620,203,1078,203,1078,271,620,271],"elements":null},"value":{"text":"","boundingBox":null,"elements":null},"confidence":0.5},{"key":{"text":"Company Phone:","boundingBox":[167,351,365,351,365,382,167,382],"elements":null},"value":{"text":"555-348-6512","boundingBox":[371,351,528,351,528,380,371,380],"elements":null},"confidence":1},{"key":{"text":"Website:","boundingBox":[167,392,269,392,269,420,167,420],"elements":null},"value":{"text":"www.herolimited.com","boundingBox":[275,393,529,393,529,420,275,420],"elements":null},"confidence":1},{"key":{"text":"Dated As:","boundingBox":[1025,419,1161,419,1161,452,1025,452],"elements":null},"value":{"text":"12/20/2020","boundingBox":[1168,417,1320,417,1320,450,1168,450],"elements":null},"confidence":1},{"key":{"text":"Email:","boundingBox":[167,432,242,432,242,459,167,459],"elements":null},"value":{"text":"accounts@herolimited.com","boundingBox":[168,480,477,480,477,505,168,505],"elements":null},"confidence":1},{"key":{"text":"Purchase Order #:","boundingBox":[1027,459,1275,459,1275,491,1027,491],"elements":null},"value":{"text":"948284","boundingBox":[1282,460,1376,460,1376,492,1282,492],"elements":null},"confidence":1},{"key":{"text":"Vendor Name:","boundingBox":[162,609,346,609,346,639,162,639],"elements":null},"value":{"text":"Hillary Swank","boundingBox":[352,610,519,610,519,640,352,640],"elements":null},"confidence":0.7},{"key":{"text":"Company Name:","boundingBox":[162,646,373,646,373,677,162,677],"elements":null},"value":{"text":"Higgly Wiggly Books","boundingBox":[379,647,628,647,628,679,379,679],"elements":null},"confidence":1},{"key":{"text":"Address:","boundingBox":[162,683,272,683,272,715,162,715],"elements":null},"value":{"text":"938 NE Burner Road Boulder City, CO 92848","boundingBox":[279,684,569,684,569,753,279,753],"elements":null},"confidence":1},{"key":{"text":"Phone:","boundingBox":[615,721,707,721,707,751,615,751],"elements":null},"value":{"text":"938-294-2949","boundingBox":[713,722,884,722,884,749,713,749],"elements":null},"confidence":1},{"key":{"text":"Name:","boundingBox":[166,852,253,852,253,881,166,881],"elements":null},"value":{"text":"Bernie Sanders","boundingBox":[258,852,445,852,445,882,258,882],"elements":null},"confidence":0.53},{"key":{"text":"Company Name:","boundingBox":[169,887,378,887,378,920,169,920],"elements":null},"value":{"text":"Jupiter Book Supply","boundingBox":[385,889,624,889,624,920,385,920],"elements":null},"confidence":0.53},{"key":{"text":"Address:","boundingBox":[168,924,276,924,276,956,168,956],"elements":null},"value":{"text":"383 N Kinnick Road Seattle, WA 38383","boundingBox":[283,924,524,924,524,992,283,992],"elements":null},"confidence":1},{"key":{"text":"Phone:","boundingBox":[760,963,852,963,852,991,760,991],"elements":null},"value":{"text":"932-299-0292","boundingBox":[857,963,1032,963,1032,991,857,991],"elements":null},"confidence":1},{"key":{"text":"SUBTOTAL","boundingBox":[1156,1571,1298,1571,1298,1599,1156,1599],"elements":null},"value":{"text":"$140.00","boundingBox":[1433,1574,1530,1574,1530,1599,1433,1599],"elements":null},"confidence":1},{"key":{"text":"TAX","boundingBox":[1242,1619,1293,1619,1293,1643,1242,1643],"elements":null},"value":{"text":"$4.00","boundingBox":[1462,1615,1532,1615,1532,1640,1462,1640],"elements":null},"confidence":1},{"key":{"text":"TOTAL","boundingBox":[1206,1674,1298,1674,1298,1700,1206,1700],"elements":null},"value":{"text":"$144.00","boundingBox":[1434,1671,1531,1671,1531,1697,1434,1697],"elements":null},"confidence":1},{"key":{"text":"Additional Notes:","boundingBox":[175,1797,479,1797,479,1834,175,1834],"elements":null},"value":{"text":"Do not Jostle Box. Unpack carefully. Enjoy. Jupiter Book Supply will refund you 50% per book if returned within 60 days of reading and offer you 25% off you next total purchase.","boundingBox":[170,1881,1511,1881,1511,1993,170,1993],"elements":null},"confidence":0.53}],"tables":[{"rows":5,"columns":4,"cells":[{"text":"Details","rowIndex":0,"columnIndex":0,"boundingBox":[447,1045,551,1045,551,1078,447,1078],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":true,"isFooter":false},{"text":"Quantity","rowIndex":0,"columnIndex":1,"boundingBox":[890,1046,1028,1046,1028,1078,890,1078],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":true,"isFooter":false},{"text":"Unit Price","rowIndex":0,"columnIndex":2,"boundingBox":[1113,1046,1267,1046,1267,1081,1113,1081],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":true,"isFooter":false},{"text":"Total","rowIndex":0,"columnIndex":3,"boundingBox":[1389,1043,1466,1043,1466,1077,1389,1077],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":true,"isFooter":false},{"text":"Bindings","rowIndex":1,"columnIndex":0,"boundingBox":[173,1093,282,1093,282,1121,173,1121],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":false,"isFooter":false},{"text":"20","rowIndex":1,"columnIndex":1,"boundingBox":[863,1095,889,1095,889,1119,863,1119],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":false,"isFooter":false},{"text":"1.00","rowIndex":1,"columnIndex":2,"boundingBox":[1243,1096,1297,1096,1297,1122,1243,1122],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":false,"isFooter":false},{"text":"20.00","rowIndex":1,"columnIndex":3,"boundingBox":[1466,1095,1531,1095,1531,1119,1466,1119],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":false,"isFooter":false},{"text":"Covers Small","rowIndex":2,"columnIndex":0,"boundingBox":[172,1136,331,1136,331,1162,172,1162],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":false,"isFooter":false},{"text":"20","rowIndex":2,"columnIndex":1,"boundingBox":[862,1132,889,1132,889,1157,862,1157],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":false,"isFooter":false},{"text":"1.00","rowIndex":2,"columnIndex":2,"boundingBox":[1243,1132,1292,1132,1292,1160,1243,1160],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":false,"isFooter":false},{"text":"20.00","rowIndex":2,"columnIndex":3,"boundingBox":[1464,1134,1531,1134,1531,1158,1464,1158],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":false,"isFooter":false},{"text":"Feather Bookmark","rowIndex":3,"columnIndex":0,"boundingBox":[172,1180,403,1180,403,1206,172,1206],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":false,"isFooter":false},{"text":"20","rowIndex":3,"columnIndex":1,"boundingBox":[863,1177,888,1177,888,1199,863,1199],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":false,"isFooter":false},{"text":"5.00","rowIndex":3,"columnIndex":2,"boundingBox":[1243,1177,1298,1177,1298,1203,1243,1203],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":false,"isFooter":false},{"text":"100.00","rowIndex":3,"columnIndex":3,"boundingBox":[1448,1180,1530,1180,1530,1205,1448,1205],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":false,"isFooter":false},{"text":"Copper Swirl Marker","rowIndex":4,"columnIndex":0,"boundingBox":[171,1225,426,1225,426,1248,171,1248],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":false,"isFooter":false},{"text":"20","rowIndex":4,"columnIndex":1,"boundingBox":[863,1221,888,1221,888,1244,863,1244],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":false,"isFooter":false},{"text":"5.00","rowIndex":4,"columnIndex":2,"boundingBox":[1242,1221,1291,1221,1291,1247,1242,1247],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":false,"isFooter":false},{"text":"100.00","rowIndex":4,"columnIndex":3,"boundingBox":[1449,1224,1530,1224,1530,1247,1449,1247],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":false,"isFooter":false}]}],"clusterId":0}],"documentResults":[],"errors":[]}}, [
  'Content-Length',
  '10257',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '22',
  'apim-request-id',
  '1eba1f27-08d0-498a-b807-3c31e5a7c420',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 18 Aug 2020 18:48:09 GMT'
]);
