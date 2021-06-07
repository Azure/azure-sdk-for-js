let nock = require('nock');

module.exports.hash = "95d8e7f0df4d2e1894f7edb044ad665a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3A-SU2gzDrzE720bWocJYfAkee6As1QmtdJW3bcNJWyEw1%40thread.v2/participants/:remove', {"communicationUser":{"id":"8:acs:1b5cc06b-f352-4571-b1e6-d9b259b7c776_00000009-fc8d-d72a-2e7c-5b3a0d000545"}})
  .query(true)
  .reply(204, "", [
  'MS-CV',
  'FHJ9scyN40qbY7tkMBwBQQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5, 2021-03-07, 2021-04-05-preview6',
  'X-Processing-Time',
  '436ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '02suaYAAAAADz+9xCRMTKQrymORUjTFl/V1NURURHRTA4MTkANzA1NDM5NWUtY2UxZC00NTVlLWFlNWQtMjMzY2E4MzkwNTU0',
  'Date',
  'Tue, 11 May 2021 18:24:26 GMT'
]);
