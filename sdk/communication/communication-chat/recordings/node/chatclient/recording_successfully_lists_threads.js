let nock = require('nock');

module.exports.hash = "6645e10e1b9f1da9eda440773d0537f4";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads')
  .query(true)
  .reply(200, {"value":[{"id":"19:14724b43dee94c22a938d44457110b8a@thread.v2","topic":"test topic","isDeleted":false,"lastMessageReceivedOn":"2021-01-25T20:26:30Z"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'NQeimjFklkOI9XnZ4E09/Q.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '86ms',
  'X-Azure-Ref',
  '0eCkPYAAAAADFFRD1y/xRTKuk39loBMGHWVZSMzBFREdFMDQxMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 25 Jan 2021 20:26:32 GMT'
]);
