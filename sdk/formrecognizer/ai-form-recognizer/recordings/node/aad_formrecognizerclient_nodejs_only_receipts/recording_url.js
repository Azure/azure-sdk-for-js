let nock = require('nock');

module.exports.hash = "ac092c7781f53829a5d688b16a60c7d9";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
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
  '3984cd5c-7441-406d-ab5b-8ee8a7722400',
  'x-ms-ests-server',
  '2.1.11251.20 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AiCTyfLsolZLqW2PD0IZkMTGLH8mAQAAACoxStcOAAAA; expires=Sun, 20-Dec-2020 21:50:34 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 20 Nov 2020 21:50:34 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.2/prebuilt/receipt/analyze', {"source":"https://storageaccount/testingdata/contoso-allinone.jpg?sastoken"})
  .reply(202, "", [
  'Content-Length',
  '0',
  'Operation-Location',
  'https://endpoint/formrecognizer/v2.1-preview.2/prebuilt/receipt/analyzeResults/190eb98f-ec2d-41c8-8231-7c3624b39d44',
  'x-envoy-upstream-service-time',
  '815',
  'apim-request-id',
  '190eb98f-ec2d-41c8-8231-7c3624b39d44',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 21:50:35 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/prebuilt/receipt/analyzeResults/190eb98f-ec2d-41c8-8231-7c3624b39d44')
  .reply(200, {"status":"notStarted","createdDateTime":"2020-11-20T21:50:35Z","lastUpdatedDateTime":"2020-11-20T21:50:35Z"}, [
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  'cac57462-8e4e-43bb-a550-3324bc5080c9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 21:50:35 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/prebuilt/receipt/analyzeResults/190eb98f-ec2d-41c8-8231-7c3624b39d44')
  .reply(200, {"status":"running","createdDateTime":"2020-11-20T21:50:35Z","lastUpdatedDateTime":"2020-11-20T21:50:36Z"}, [
  'Content-Length',
  '106',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  'd1489a0a-88c3-41c5-8a9d-c8bbe137e51b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 21:50:35 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/prebuilt/receipt/analyzeResults/190eb98f-ec2d-41c8-8231-7c3624b39d44')
  .reply(200, {"status":"succeeded","createdDateTime":"2020-11-20T21:50:35Z","lastUpdatedDateTime":"2020-11-20T21:50:37Z","analyzeResult":{"version":"2.1.0","readResults":[{"page":1,"angle":0.1273,"width":1688,"height":3000,"unit":"pixel"}],"documentResults":[{"docType":"prebuilt:receipt","pageRange":[1,1],"fields":{"ReceiptType":{"type":"string","valueString":"Itemized","confidence":0.99},"MerchantName":{"type":"string","valueString":"Contoso Contoso","text":"Contoso Contoso","boundingBox":[380.9,282.9,1116,473.2,1025,824.4,290,634],"page":1,"confidence":0.716},"MerchantAddress":{"type":"string","valueString":"123 Main Street Redmond, WA 98052","text":"123 Main Street Redmond, WA 98052","boundingBox":[298.3,676.5,844.6,781.5,810.7,958,264.4,853],"page":1,"confidence":0.989},"MerchantPhoneNumber":{"type":"phoneNumber","valuePhoneNumber":"+19876543210","text":"987-654-3210","boundingBox":[271,1000,651,1049,643,1125,264,1075],"page":1,"confidence":0.99},"TransactionDate":{"type":"date","valueDate":"2019-06-10","text":"6/10/2019","boundingBox":[259,1224,510,1246,505,1331,255,1312],"page":1,"confidence":0.99},"TransactionTime":{"type":"time","valueTime":"13:59:00","text":"13:59","boundingBox":[527,1248,681,1262,675,1341,522,1332],"page":1,"confidence":0.989},"Items":{"type":"array","valueArray":[{"type":"object","valueObject":{"Quantity":{"type":"number","valueNumber":1,"text":"1","boundingBox":[244,1581,288,1584,285,1678,241,1675],"page":1,"confidence":0.919},"Name":{"type":"string","valueString":"Cappuccino","text":"Cappuccino","boundingBox":[306,1585,658,1598,657,1688,304,1679],"page":1,"confidence":0.959},"TotalPrice":{"type":"number","valueNumber":2.2,"text":"$2.20","boundingBox":[1106,1579,1260,1574,1263,1656,1108,1662],"page":1,"confidence":0.959}}},{"type":"object","valueObject":{"Quantity":{"type":"number","valueNumber":1,"text":"1","boundingBox":[227,1839,278,1839,277,1924,226,1924],"page":1,"confidence":0.91},"Name":{"type":"string","valueString":"BACON & EGGS","text":"BACON & EGGS","boundingBox":[294,1839,737,1839,737,1924,294,1924],"page":1,"confidence":0.955},"TotalPrice":{"type":"number","valueNumber":9.5,"text":"$9.5","boundingBox":[1134,1948,1252,1948,1252,2041,1134,2041],"page":1,"confidence":0.958}}}]},"Subtotal":{"type":"number","valueNumber":11.7,"text":"11.70","boundingBox":[1139,2228,1309,2228,1308,2313,1138,2313],"page":1,"confidence":0.923},"Tax":{"type":"number","valueNumber":1.17,"text":"1.17","boundingBox":[1186,2356,1307,2361,1303,2452,1182,2447],"page":1,"confidence":0.979},"Tip":{"type":"number","valueNumber":463,"text":"$463","boundingBox":[1034,2483,1268,2488,1266,2583,1032,2577],"page":1,"confidence":0.975},"Total":{"type":"number","valueNumber":14.5,"text":"$14.50","boundingBox":[1033,2623,1376,2641,1370,2758,1027,2740],"page":1,"confidence":0.987}}}]}}, [
  'Content-Length',
  '2820',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '24',
  'apim-request-id',
  'c89d54e6-513e-4d45-8197-bc9b9bd54eee',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 21:50:40 GMT'
]);
