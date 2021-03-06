let nock = require('nock');

module.exports.hash = "95d8e7f0df4d2e1894f7edb044ad665a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3AxJokSX16Y2F85VvvE_ahCQKJkFIc2Oy4FTcjP9Mjww41%40thread.v2/participants/:remove', {"communicationUser":{"id":"8:acs:d2a829bc-8523-4404-b727-022345e48ca6_00000008-a4fb-2bfd-99c6-593a0d006b78"}})
  .query(true)
  .reply(204, "", [
  'MS-CV',
  'rWUOZDE42kKuCgt0V8wvSg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5',
  'X-Processing-Time',
  '225ms',
  'X-Azure-Ref',
  '0cddCYAAAAAANQQZqeyp6QJyUczPlSgJAWVZSMzBFREdFMDQwOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Sat, 06 Mar 2021 01:14:25 GMT'
]);
