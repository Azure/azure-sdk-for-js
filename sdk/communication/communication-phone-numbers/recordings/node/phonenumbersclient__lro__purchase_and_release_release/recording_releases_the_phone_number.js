let nock = require('nock');

module.exports.hash = "56df7cf5fee2a65df0f5c8efa627b97a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":false})
  .delete('/phoneNumbers/%2B14155550100')
  .query(true)
  .reply(202, "", [
  'Access-Control-Expose-Headers',
  'Operation-Location,operation-id,release-id',
  'Request-Context',
  'appId=',
  'MS-CV',
  '+Ci3Jzd9lk238vmnEQbbhw.0',
  'Operation-Location',
  '/phoneNumbers/operations/release_sanitized?api-version=2021-03-07',
  'operation-id',
  'release_sanitized',
  'release-id',
  'sanitized',
  'X-Processing-Time',
  '1140ms',
  'X-Azure-Ref',
  '0yxpeYAAAAADcD+aYRCj5ToolZOdAqIhzWVZSMzBFREdFMDMxMwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 26 Mar 2021 17:33:00 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/release_sanitized')
  .query(true)
  .reply(200, {"status":"notStarted","resourceLocation":null,"createdDateTime":"2021-03-26T17:32:59.7196775+00:00","id":"release_sanitized","operationType":"releasePhoneNumber","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  '/SVN4UEtA0q5OpZPWa/5IQ.0',
  'X-Processing-Time',
  '276ms',
  'X-Azure-Ref',
  '0zBpeYAAAAAC9DBn2YkmSQKPymBFnIMe4WVZSMzBFREdFMDMxMwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 26 Mar 2021 17:33:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/release_sanitized')
  .query(true)
  .reply(200, {"status":"running","resourceLocation":null,"createdDateTime":"2021-03-26T17:32:59.7196775+00:00","id":"release_sanitized","operationType":"releasePhoneNumber","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'oX+Jqbzg5UmqHplg39TmjQ.0',
  'X-Processing-Time',
  '288ms',
  'X-Azure-Ref',
  '0zhpeYAAAAADWD+2Z5Un7QaoiGvRATFZZWVZSMzBFREdFMDMxMwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 26 Mar 2021 17:33:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/release_sanitized')
  .query(true)
  .reply(200, {"status":"running","resourceLocation":null,"createdDateTime":"2021-03-26T17:32:59.7196775+00:00","id":"release_sanitized","operationType":"releasePhoneNumber","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'JqGEpLHcFEq7wCO6YTwTSQ.0',
  'X-Processing-Time',
  '279ms',
  'X-Azure-Ref',
  '00RpeYAAAAACTkF3LLVCiQ7EcxoGPmzmjWVZSMzBFREdFMDMxMwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 26 Mar 2021 17:33:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/release_sanitized')
  .query(true)
  .reply(200, {"status":"running","resourceLocation":null,"createdDateTime":"2021-03-26T17:32:59.7196775+00:00","id":"release_sanitized","operationType":"releasePhoneNumber","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'AJy0ccaZ4UyH4Ic3SldAMQ.0',
  'X-Processing-Time',
  '1122ms',
  'X-Azure-Ref',
  '00xpeYAAAAAAa2jUU5xrASJYJBK5XSxOrWVZSMzBFREdFMDMxMwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 26 Mar 2021 17:33:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/release_sanitized')
  .query(true)
  .reply(200, {"status":"running","resourceLocation":null,"createdDateTime":"2021-03-26T17:32:59.7196775+00:00","id":"release_sanitized","operationType":"releasePhoneNumber","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'TG0ayUudRkKeUYgJukRAEw.0',
  'X-Processing-Time',
  '286ms',
  'X-Azure-Ref',
  '01hpeYAAAAACUmJDp34ESSpYf1Lqy79zNWVZSMzBFREdFMDMxMwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 26 Mar 2021 17:33:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/release_sanitized')
  .query(true)
  .reply(200, {"status":"succeeded","resourceLocation":null,"createdDateTime":"2021-03-26T17:32:59.7196775+00:00","id":"release_sanitized","operationType":"releasePhoneNumber","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'u49tHteQb0upEBufV2pgmg.0',
  'X-Processing-Time',
  '271ms',
  'X-Azure-Ref',
  '02BpeYAAAAAA1Eq+rd/8fRKhUSRQRC5Q5WVZSMzBFREdFMDMxMwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 26 Mar 2021 17:33:12 GMT'
]);
