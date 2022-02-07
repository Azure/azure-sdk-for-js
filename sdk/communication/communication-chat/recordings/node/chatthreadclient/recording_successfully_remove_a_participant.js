let nock = require('nock');

module.exports.hash = "3f3e581d127d4ee7534cf66acf4944a1";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3An_H9uIjLqmROnaakf1aaclqRHTM7sclYSTv4_q_g7E41%40thread.v2/participants/:remove', {"communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-579c-2595-e3c7-593a0d00db93"}})
  .query(true)
  .reply(204, "", [
  'MS-CV',
  'EG8ADUZXr0GG/Dn6vdchxg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2021-04-05-preview6, 2021-09-07, 2021-10-01-preview7',
  'X-Processing-Time',
  '187ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0W8n5YQAAAABBGkT/Mv31R5Z8LfGX3w+qUERYMzFFREdFMDIxNQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 01 Feb 2022 23:59:23 GMT'
]);
