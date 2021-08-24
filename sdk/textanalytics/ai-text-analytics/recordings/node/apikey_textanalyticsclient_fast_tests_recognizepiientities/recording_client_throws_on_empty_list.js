let nock = require('nock');

module.exports.hash = "ab91690f5ef35c8898e38f3c835cbc21";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.1/entities/recognition/pii', {"documents":[]})
  .query(true)
  .reply(400, {"error":{"code":"InvalidRequest","message":"Invalid Request.","innererror":{"code":"MissingInputRecords","message":"Missing input records."}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '5',
  'apim-request-id',
  'eb47a838-8074-4a66-bd32-8d174e1c7b95',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:36:41 GMT'
]);
