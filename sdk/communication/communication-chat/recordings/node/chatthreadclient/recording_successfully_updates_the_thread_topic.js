let nock = require('nock');

module.exports.hash = "b2e3c085aa73b0d20ac7b91f39172d2b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .patch('/chat/threads/19%3A-SU2gzDrzE720bWocJYfAkee6As1QmtdJW3bcNJWyEw1%40thread.v2', {"topic":"new topic"})
  .query(true)
  .reply(204, "", [
  'MS-CV',
  'Vk1I5fX1CEqlM9FUMqqW9g.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5, 2021-03-07, 2021-04-05-preview6',
  'X-Processing-Time',
  '385ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '01cuaYAAAAAA1xRHl2httSbJCeL315360V1NURURHRTA4MTkANzA1NDM5NWUtY2UxZC00NTVlLWFlNWQtMjMzY2E4MzkwNTU0',
  'Date',
  'Tue, 11 May 2021 18:24:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3A-SU2gzDrzE720bWocJYfAkee6As1QmtdJW3bcNJWyEw1%40thread.v2')
  .query(true)
  .reply(200, {"id":"19:-SU2gzDrzE720bWocJYfAkee6As1QmtdJW3bcNJWyEw1@thread.v2","topic":"new topic","createdOn":"2021-05-11T18:24:20Z","createdByCommunicationIdentifier":{"rawId":"8:acs:1b5cc06b-f352-4571-b1e6-d9b259b7c776_00000009-fc8d-d468-2a7a-5b3a0d0005f5","communicationUser":{"id":"8:acs:1b5cc06b-f352-4571-b1e6-d9b259b7c776_00000009-fc8d-d468-2a7a-5b3a0d0005f5"}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'hzuO+cnz7E+sy5VGiStv+w.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5, 2021-03-07, 2021-04-05-preview6',
  'X-Processing-Time',
  '251ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '01cuaYAAAAACtX21QSQ+YSaPGThQeoH4LV1NURURHRTA4MTkANzA1NDM5NWUtY2UxZC00NTVlLWFlNWQtMjMzY2E4MzkwNTU0',
  'Date',
  'Tue, 11 May 2021 18:24:21 GMT'
]);
