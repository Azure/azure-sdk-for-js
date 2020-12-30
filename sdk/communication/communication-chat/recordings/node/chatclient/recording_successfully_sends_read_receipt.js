let nock = require('nock');

module.exports.hash = "7bfeb93c91b865922918888b4e2a5ba3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3A9f956fe210414cc3a38295c399294c02%40thread.v2/readReceipts', {"chatMessageId":"1609359943675"})
  .query(true)
  .reply(200, "", [
  'MS-CV',
  'SkVksZ5RFU+UCg4w7SugaQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '746ms',
  'X-Azure-Ref',
  '0SOLsXwAAAAA+SWjyjv+RQqUDkE8YC9VqWVZSMzBFREdFMDMxMgBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Wed, 30 Dec 2020 20:25:44 GMT',
  'Content-Length',
  '0'
]);
