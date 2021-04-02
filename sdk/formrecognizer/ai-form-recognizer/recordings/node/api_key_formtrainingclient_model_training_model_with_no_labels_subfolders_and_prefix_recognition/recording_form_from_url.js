let nock = require('nock');

module.exports.hash = "9eb7e85286e71321914e1d054139d46b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.2/custom/models/d68509d8-68a3-4d32-9b8d-5a12df5eb8ec/analyze', {"source":"https://storageaccount/testingdata/Form_1.jpg?sastoken"})
  .reply(202, "", [
  'Content-Length',
  '0',
  'Operation-Location',
  'https://endpoint/formrecognizer/v2.1-preview.2/custom/models/d68509d8-68a3-4d32-9b8d-5a12df5eb8ec/analyzeresults/c18beb9d-97e4-4925-8ab4-4e295b222a2c',
  'x-envoy-upstream-service-time',
  '44',
  'apim-request-id',
  'c389002e-4f69-4d09-a44c-e8c0e458c279',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 14:27:08 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/d68509d8-68a3-4d32-9b8d-5a12df5eb8ec/analyzeResults/c18beb9d-97e4-4925-8ab4-4e295b222a2c')
  .reply(200, {"status":"notStarted","createdDateTime":"2020-11-20T14:27:08Z","lastUpdatedDateTime":"2020-11-20T14:27:08Z"}, [
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  '14145e3c-293d-4455-854f-b203664798f0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 14:27:08 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/d68509d8-68a3-4d32-9b8d-5a12df5eb8ec/analyzeResults/c18beb9d-97e4-4925-8ab4-4e295b222a2c')
  .reply(200, {"status":"notStarted","createdDateTime":"2020-11-20T14:27:08Z","lastUpdatedDateTime":"2020-11-20T14:27:08Z"}, [
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '18',
  'apim-request-id',
  'b0584fd6-3ec2-4582-81b9-b81eca6da569',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 14:27:08 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/d68509d8-68a3-4d32-9b8d-5a12df5eb8ec/analyzeResults/c18beb9d-97e4-4925-8ab4-4e295b222a2c')
  .reply(200, {"status":"running","createdDateTime":"2020-11-20T14:27:08Z","lastUpdatedDateTime":"2020-11-20T14:27:09Z","analyzeResult":null}, [
  'Content-Length',
  '134',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '21',
  'apim-request-id',
  'b011b121-ddfd-45ec-84b0-45d5ae4d0e35',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 14:27:13 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/d68509d8-68a3-4d32-9b8d-5a12df5eb8ec/analyzeResults/c18beb9d-97e4-4925-8ab4-4e295b222a2c')
  .reply(200, {"status":"running","createdDateTime":"2020-11-20T14:27:08Z","lastUpdatedDateTime":"2020-11-20T14:27:09Z","analyzeResult":null}, [
  'Content-Length',
  '134',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  'ce3be714-2ff8-4107-81fe-a381c13eee4a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 14:27:18 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/d68509d8-68a3-4d32-9b8d-5a12df5eb8ec/analyzeResults/c18beb9d-97e4-4925-8ab4-4e295b222a2c')
  .reply(200, {"status":"succeeded","createdDateTime":"2020-11-20T14:27:08Z","lastUpdatedDateTime":"2020-11-20T14:27:19Z","analyzeResult":{"version":"2.1.0","readResults":[{"page":1,"angle":0,"width":1700,"height":2200,"unit":"pixel","lines":[],"selectionMarks":null}],"pageResults":[{"page":1,"keyValuePairs":[{"key":{"text":"Company Phone:","type":null,"boundingBox":[163,352,359,352,359,378,163,378],"elements":null},"value":{"text":"555-348-6512","type":null,"boundingBox":[364,351,528,351,528,378,364,378],"elements":null},"confidence":1},{"key":{"text":"Website:","type":null,"boundingBox":[167,394,269,394,269,417,167,417],"elements":null},"value":{"text":"www.herolimited.com","type":null,"boundingBox":[273,393,531,393,531,418,273,418],"elements":null},"confidence":1},{"key":{"text":"Email:","type":null,"boundingBox":[165,435,237,435,237,460,165,460],"elements":null},"value":{"text":"accounts@herolimited.com","type":null,"boundingBox":[164,481,479,481,479,503,164,503],"elements":null},"confidence":1},{"key":{"text":"Dated As:","type":null,"boundingBox":[1025,421,1160,421,1160,448,1025,448],"elements":null},"value":{"text":"12/20/2020","type":null,"boundingBox":[1165,420,1317,420,1317,448,1165,448],"elements":null},"confidence":1},{"key":{"text":"Purchase Order #:","type":null,"boundingBox":[1023,461,1272,461,1272,488,1023,488],"elements":null},"value":{"text":"948284","type":null,"boundingBox":[1277,461,1376,461,1376,489,1277,489],"elements":null},"confidence":1},{"key":{"text":"Vendor Name:","type":null,"boundingBox":[160,611,344,611,344,637,160,637],"elements":null},"value":{"text":"Hillary Swank","type":null,"boundingBox":[350,609,521,609,521,639,350,639],"elements":null},"confidence":0.62},{"key":{"text":"Company Name:","type":null,"boundingBox":[160,648,370,648,370,677,160,677],"elements":null},"value":{"text":"Higgly Wiggly Books","type":null,"boundingBox":[375,646,630,646,630,679,375,679],"elements":null},"confidence":1},{"key":{"text":"Address:","type":null,"boundingBox":[161,685,269,685,269,711,161,711],"elements":null},"value":{"text":"938 NE Burner Road Boulder City, CO 92848","type":null,"boundingBox":[274,685,565,685,565,751,274,751],"elements":null},"confidence":1},{"key":{"text":"Phone:","type":null,"boundingBox":[613,722,702,722,702,749,613,749],"elements":null},"value":{"text":"938-294-2949","type":null,"boundingBox":[708,722,885,722,885,749,708,749],"elements":null},"confidence":1},{"key":{"text":"Name:","type":null,"boundingBox":[166,853,250,853,250,879,166,879],"elements":null},"value":{"text":"Bernie Sanders","type":null,"boundingBox":[255,852,446,852,446,880,255,880],"elements":null},"confidence":0.48},{"key":{"text":"Company Name:","type":null,"boundingBox":[164,890,374,890,374,919,164,919],"elements":null},"value":{"text":"Jupiter Book Supply","type":null,"boundingBox":[380,889,629,889,629,919,380,919],"elements":null},"confidence":0.48},{"key":{"text":"Address:","type":null,"boundingBox":[166,926,273,926,273,953,166,953],"elements":null},"value":{"text":"383 N Kinnick Road Seattle, WA 38383","type":null,"boundingBox":[279,926,521,926,521,991,279,991],"elements":null},"confidence":1},{"key":{"text":"Phone:","type":null,"boundingBox":[760,964,849,964,849,990,760,990],"elements":null},"value":{"text":"932-299-0292","type":null,"boundingBox":[855,964,1033,964,1033,990,855,990],"elements":null},"confidence":1},{"key":{"text":"SUBTOTAL","type":null,"boundingBox":[1147,1575,1296,1575,1296,1600,1147,1600],"elements":null},"value":{"text":"$140.00","type":null,"boundingBox":[1426,1571,1529,1571,1529,1599,1426,1599],"elements":null},"confidence":1},{"key":{"text":"TAX","type":null,"boundingBox":[1238,1618,1296,1618,1296,1643,1238,1643],"elements":null},"value":{"text":"$4.00","type":null,"boundingBox":[1458,1615,1529,1615,1529,1643,1458,1643],"elements":null},"confidence":1},{"key":{"text":"TOTAL","type":null,"boundingBox":[1204,1674,1297,1674,1297,1699,1204,1699],"elements":null},"value":{"text":"$144.00","type":null,"boundingBox":[1427,1671,1529,1671,1529,1698,1427,1698],"elements":null},"confidence":1},{"key":{"text":"Additional Notes:","type":null,"boundingBox":[173,1796,479,1796,479,1831,173,1831],"elements":null},"value":{"text":"Do not Jostle Box. Unpack carefully. Enjoy. Jupiter Book Supply will refund you 50% per book if returned within 60 days of reading and offer you 25% off you next total purchase.","type":null,"boundingBox":[169,1880,1511,1880,1511,1992,169,1992],"elements":null},"confidence":0.48}],"tables":[{"rows":5,"columns":4,"cells":[{"text":"Details","rowIndex":0,"columnIndex":0,"boundingBox":[447,1048,558,1048,558,1078,447,1078],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":true,"isFooter":false},{"text":"Quantity","rowIndex":0,"columnIndex":1,"boundingBox":[886,1048,1034,1048,1034,1084,886,1084],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":true,"isFooter":false},{"text":"Unit Price","rowIndex":0,"columnIndex":2,"boundingBox":[1111,1047,1269,1047,1269,1078,1111,1078],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":true,"isFooter":false},{"text":"Total","rowIndex":0,"columnIndex":3,"boundingBox":[1383,1047,1467,1047,1467,1077,1383,1077],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":true,"isFooter":false},{"text":"Bindings","rowIndex":1,"columnIndex":0,"boundingBox":[172,1094,280,1094,280,1122,172,1122],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":false,"isFooter":false},{"text":"20","rowIndex":1,"columnIndex":1,"boundingBox":[861,1094,892,1094,892,1119,861,1119],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":false,"isFooter":false},{"text":"1.00","rowIndex":1,"columnIndex":2,"boundingBox":[1241,1095,1293,1095,1293,1118,1241,1118],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":false,"isFooter":false},{"text":"20.00","rowIndex":1,"columnIndex":3,"boundingBox":[1458,1096,1531,1096,1531,1119,1458,1119],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":false,"isFooter":false},{"text":"Covers Small","rowIndex":2,"columnIndex":0,"boundingBox":[170,1136,333,1136,333,1161,170,1161],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":false,"isFooter":false},{"text":"20","rowIndex":2,"columnIndex":1,"boundingBox":[861,1135,892,1135,892,1160,861,1160],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":false,"isFooter":false},{"text":"1.00","rowIndex":2,"columnIndex":2,"boundingBox":[1240,1135,1294,1135,1294,1160,1240,1160],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":false,"isFooter":false},{"text":"20.00","rowIndex":2,"columnIndex":3,"boundingBox":[1458,1135,1529,1135,1529,1160,1458,1160],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":false,"isFooter":false},{"text":"Feather Bookmark","rowIndex":3,"columnIndex":0,"boundingBox":[173,1179,402,1179,402,1206,173,1206],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":false,"isFooter":false},{"text":"20","rowIndex":3,"columnIndex":1,"boundingBox":[863,1179,892,1179,892,1204,863,1204],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":false,"isFooter":false},{"text":"5.00","rowIndex":3,"columnIndex":2,"boundingBox":[1239,1179,1294,1179,1294,1204,1239,1204],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":false,"isFooter":false},{"text":"100.00","rowIndex":3,"columnIndex":3,"boundingBox":[1443,1181,1529,1181,1529,1205,1443,1205],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":false,"isFooter":false},{"text":"Copper Swirl Marker","rowIndex":4,"columnIndex":0,"boundingBox":[170,1222,429,1222,429,1252,170,1252],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":false,"isFooter":false},{"text":"20","rowIndex":4,"columnIndex":1,"boundingBox":[860,1223,892,1223,892,1247,860,1247],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":false,"isFooter":false},{"text":"5.00","rowIndex":4,"columnIndex":2,"boundingBox":[1239,1221,1293,1221,1293,1247,1239,1247],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":false,"isFooter":false},{"text":"100.00","rowIndex":4,"columnIndex":3,"boundingBox":[1444,1224,1530,1224,1530,1248,1444,1248],"confidence":1,"rowSpan":1,"columnSpan":1,"elements":null,"isHeader":false,"isFooter":false}]}],"clusterId":0}],"documentResults":[],"errors":[]}}, [
  'Content-Length',
  '9682',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '28',
  'apim-request-id',
  '2233d73d-9f12-453d-bd2e-7526e76f7649',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 14:27:23 GMT'
]);
