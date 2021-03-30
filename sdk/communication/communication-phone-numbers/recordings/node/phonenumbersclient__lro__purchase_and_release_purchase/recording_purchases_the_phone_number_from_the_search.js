let nock = require('nock');

module.exports.hash = "6e8bf1dd03841a2ef4ae93f0a2155661";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":false})
  .post('/availablePhoneNumbers/:purchase', {"searchId":"sanitized"})
  .query(true)
  .reply(202, "", [
  'Access-Control-Expose-Headers',
  'Operation-Location,operation-id,purchase-id',
  'Request-Context',
  'appId=',
  'MS-CV',
  'ruEJ3DexZkqqTCtAg/pXlA.0',
  'Operation-Location',
  '/phoneNumbers/operations/purchase_sanitized?api-version=2021-03-07',
  'operation-id',
  'purchase_sanitized',
  'purchase-id',
  'sanitized',
  'X-Processing-Time',
  '1781ms',
  'X-Azure-Ref',
  '0qhpeYAAAAABEMZDov3mNTruaoXi+yns2WVZSMzBFREdFMDMxMwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 26 Mar 2021 17:32:27 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/purchase_sanitized')
  .query(true)
  .reply(200, {"status":"running","resourceLocation":null,"createdDateTime":"2021-03-26T17:32:13.5249681+00:00","id":"purchase_sanitized","operationType":"purchase","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'CxSROWhIk0+yUjUfLtfNwA.0',
  'X-Processing-Time',
  '337ms',
  'X-Azure-Ref',
  '0rBpeYAAAAABIB4yTM+efQpwib+uOum+pWVZSMzBFREdFMDMxMwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 26 Mar 2021 17:32:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/purchase_sanitized')
  .query(true)
  .reply(200, {"status":"running","resourceLocation":null,"createdDateTime":"2021-03-26T17:32:13.5249681+00:00","id":"purchase_sanitized","operationType":"purchase","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'ubGg28A2Y0e+cvUWIKHang.0',
  'X-Processing-Time',
  '336ms',
  'X-Azure-Ref',
  '0rhpeYAAAAAB4yZIm3+GOSq6M5gHvEXvGWVZSMzBFREdFMDMxMwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 26 Mar 2021 17:32:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/purchase_sanitized')
  .query(true)
  .reply(200, {"status":"running","resourceLocation":null,"createdDateTime":"2021-03-26T17:32:13.5249681+00:00","id":"purchase_sanitized","operationType":"purchase","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'XMUhOGigCEO3NTRE/80b6A.0',
  'X-Processing-Time',
  '317ms',
  'X-Azure-Ref',
  '0sRpeYAAAAAAgtAgP/dcESpRhfPTYD45mWVZSMzBFREdFMDMxMwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 26 Mar 2021 17:32:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/purchase_sanitized')
  .query(true)
  .reply(200, {"status":"running","resourceLocation":null,"createdDateTime":"2021-03-26T17:32:13.5249681+00:00","id":"purchase_sanitized","operationType":"purchase","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'Wukp/3Zb7Ua7xYptyhfTjw.0',
  'X-Processing-Time',
  '311ms',
  'X-Azure-Ref',
  '0sxpeYAAAAACEMAe4WQ/8SqDOjJ6QmMgBWVZSMzBFREdFMDMxMwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 26 Mar 2021 17:32:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/purchase_sanitized')
  .query(true)
  .reply(200, {"status":"notStarted","resourceLocation":null,"createdDateTime":"2021-03-26T17:32:13.5249681+00:00","id":"purchase_sanitized","operationType":"purchase","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'flGd+dsUF0uPDjhHMcsQbQ.0',
  'X-Processing-Time',
  '532ms',
  'X-Azure-Ref',
  '0tRpeYAAAAAAahh1G1KniTYyMD6Kq2Hh4WVZSMzBFREdFMDMxMwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 26 Mar 2021 17:32:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/purchase_sanitized')
  .query(true)
  .reply(200, {"status":"notStarted","resourceLocation":null,"createdDateTime":"2021-03-26T17:32:13.5249681+00:00","id":"purchase_sanitized","operationType":"purchase","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'z8B2OJwGsk+RzepZU3CMNg.0',
  'X-Processing-Time',
  '323ms',
  'X-Azure-Ref',
  '0uBpeYAAAAAADGhUfVrhcSof+tGoPGoMLWVZSMzBFREdFMDMxMwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 26 Mar 2021 17:32:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/purchase_sanitized')
  .query(true)
  .reply(200, {"status":"notStarted","resourceLocation":null,"createdDateTime":"2021-03-26T17:32:13.5249681+00:00","id":"purchase_sanitized","operationType":"purchase","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'dfCVx3IbmUehoDgQKwDY9Q.0',
  'X-Processing-Time',
  '299ms',
  'X-Azure-Ref',
  '0uhpeYAAAAACuyGrNhb33S4wsJHAMs2kFWVZSMzBFREdFMDMxMwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 26 Mar 2021 17:32:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/purchase_sanitized')
  .query(true)
  .reply(200, {"status":"notStarted","resourceLocation":null,"createdDateTime":"2021-03-26T17:32:13.5249681+00:00","id":"purchase_sanitized","operationType":"purchase","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'Tpg5/2RES0WJ562OXJJz4w.0',
  'X-Processing-Time',
  '296ms',
  'X-Azure-Ref',
  '0vRpeYAAAAABqkFaekL8zR68SLBloi8v4WVZSMzBFREdFMDMxMwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 26 Mar 2021 17:32:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/purchase_sanitized')
  .query(true)
  .reply(200, {"status":"notStarted","resourceLocation":null,"createdDateTime":"2021-03-26T17:32:13.5249681+00:00","id":"purchase_sanitized","operationType":"purchase","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'FvJ9kq8IqUaCyn4Sw9Yqvw.0',
  'X-Processing-Time',
  '323ms',
  'X-Azure-Ref',
  '0vxpeYAAAAAAyqhGv8rLORa3wJzkbi//AWVZSMzBFREdFMDMxMwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 26 Mar 2021 17:32:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/purchase_sanitized')
  .query(true)
  .reply(200, {"status":"notStarted","resourceLocation":null,"createdDateTime":"2021-03-26T17:32:13.5249681+00:00","id":"purchase_sanitized","operationType":"purchase","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'G/okKUMx3Ei8bSv/6/h1pQ.0',
  'X-Processing-Time',
  '422ms',
  'X-Azure-Ref',
  '0wRpeYAAAAABHYBRQtnubRa/3HmD+LgNgWVZSMzBFREdFMDMxMwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 26 Mar 2021 17:32:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/purchase_sanitized')
  .query(true)
  .reply(200, {"status":"notStarted","resourceLocation":null,"createdDateTime":"2021-03-26T17:32:13.5249681+00:00","id":"purchase_sanitized","operationType":"purchase","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'JNRD76tAlUiIg/xLopxtmQ.0',
  'X-Processing-Time',
  '310ms',
  'X-Azure-Ref',
  '0xBpeYAAAAACNNtAlYRoqSK2F5nhuoO9lWVZSMzBFREdFMDMxMwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 26 Mar 2021 17:32:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/purchase_sanitized')
  .query(true)
  .reply(200, {"status":"succeeded","resourceLocation":null,"createdDateTime":"2021-03-26T17:32:13.5249681+00:00","id":"purchase_sanitized","operationType":"purchase","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'KF1luPCHgE+1Ebic5d9KJw.0',
  'X-Processing-Time',
  '419ms',
  'X-Azure-Ref',
  '0xhpeYAAAAAAqiCCXg/jGRYMCnKwZs46kWVZSMzBFREdFMDMxMwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 26 Mar 2021 17:32:54 GMT'
]);
