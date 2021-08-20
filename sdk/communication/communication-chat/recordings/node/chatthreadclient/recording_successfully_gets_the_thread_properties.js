let nock = require('nock');

module.exports.hash = "3709e286576e59bea454a0624d520391";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3AG9Ahp1Z8TtiJdI42d6ndj1QXAXeWZGeqjdxqjgPOdR81%40thread.v2')
  .query(true)
  .reply(200, {"id":"19:G9Ahp1Z8TtiJdI42d6ndj1QXAXeWZGeqjdxqjgPOdR81@thread.v2","topic":"test topic","createdOn":"2021-08-20T19:07:22Z","createdByCommunicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000c-04d7-8bc8-02c3-593a0d001311","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000c-04d7-8bc8-02c3-593a0d001311"}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  '05+dSMd52keJv+SAGY6aEg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5, 2021-03-07, 2021-04-05-preview6',
  'X-Processing-Time',
  '85ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0a/0fYQAAAABRNtn3ncm7RqbXBkN7XKyrUERYMzFFREdFMDIxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 20 Aug 2021 19:07:23 GMT'
]);
