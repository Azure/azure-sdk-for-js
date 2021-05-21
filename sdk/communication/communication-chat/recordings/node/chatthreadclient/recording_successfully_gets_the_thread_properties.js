let nock = require('nock');

module.exports.hash = "ece92519958e051517109e9a4846c92f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3A-SU2gzDrzE720bWocJYfAkee6As1QmtdJW3bcNJWyEw1%40thread.v2')
  .query(true)
  .reply(200, {"id":"19:-SU2gzDrzE720bWocJYfAkee6As1QmtdJW3bcNJWyEw1@thread.v2","topic":"test topic","createdOn":"2021-05-11T18:24:20Z","createdByCommunicationIdentifier":{"rawId":"8:acs:1b5cc06b-f352-4571-b1e6-d9b259b7c776_00000009-fc8d-d468-2a7a-5b3a0d0005f5","communicationUser":{"id":"8:acs:1b5cc06b-f352-4571-b1e6-d9b259b7c776_00000009-fc8d-d468-2a7a-5b3a0d0005f5"}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'YscyAR4LLEGbc1oaT5vBmg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5, 2021-03-07, 2021-04-05-preview6',
  'X-Processing-Time',
  '247ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '01MuaYAAAAACOW2Up1hAOQ5rV+q9nUoHtV1NURURHRTA4MTkANzA1NDM5NWUtY2UxZC00NTVlLWFlNWQtMjMzY2E4MzkwNTU0',
  'Date',
  'Tue, 11 May 2021 18:24:20 GMT'
]);
