let nock = require('nock');

module.exports.hash = "33d8e6bf8697a18bf09f6892ba52451b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3AxJokSX16Y2F85VvvE_ahCQKJkFIc2Oy4FTcjP9Mjww41%40thread.v2/typing')
  .query(true)
  .reply(200, "", [
  'MS-CV',
  'dXpyrGxIH0mFRkaAeZqG+w.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5',
  'X-Processing-Time',
  '158ms',
  'X-Azure-Ref',
  '0b9dCYAAAAADQmGKtyxTFTYLzuZUsH7d6WVZSMzBFREdFMDQwOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Sat, 06 Mar 2021 01:14:23 GMT',
  'Content-Length',
  '0'
]);
