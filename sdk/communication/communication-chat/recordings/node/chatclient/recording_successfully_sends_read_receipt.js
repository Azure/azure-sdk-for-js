let nock = require('nock');

module.exports.hash = "7bfeb93c91b865922918888b4e2a5ba3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3A08f3db9af86044bfa21eb8b02b847f22%40thread.v2/readreceipts', {"chatMessageId":"1605570543468"})
  .query(true)
  .reply(201, "", [
  'MS-CV',
  'Oe8crtJx4kWvSLV7c3vGyw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '1108ms',
  'X-Azure-Ref',
  '08A+zXwAAAAC1TxFi66/JSbMXelGuViyIV1NURURHRTA4MTkANzA1NDM5NWUtY2UxZC00NTVlLWFlNWQtMjMzY2E4MzkwNTU0',
  'Date',
  'Mon, 16 Nov 2020 23:49:04 GMT',
  'Content-Length',
  '0'
]);
