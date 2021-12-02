let nock = require('nock');

module.exports.hash = "a5fa256ea501ce43fd19cec075c72ac8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .put('/routing/channels', {"id":"channel-id-123","name":"test-channel"})
  .query(true)
  .reply(200, {"id":"channel-id-123","name":"test-channel","acsManaged":false}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'trace-id',
  'fd1304694c13074d9458b33f3485d400',
  'api-supported-versions',
  '2021-04-07-preview1',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0HmWmYQAAAADANq4OhhXMT6zE3ubLlAbxV1NURURHRTA4MjEAY2M5Mjc1OGQtMDVmNy00YWQ2LWFhNWUtMGZhOTcxOGQ4OTg1',
  'Date',
  'Tue, 30 Nov 2021 17:53:34 GMT'
]);
