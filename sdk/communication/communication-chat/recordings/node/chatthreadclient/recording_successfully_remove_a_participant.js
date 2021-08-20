let nock = require('nock');

module.exports.hash = "3f3e581d127d4ee7534cf66acf4944a1";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3AG9Ahp1Z8TtiJdI42d6ndj1QXAXeWZGeqjdxqjgPOdR81%40thread.v2/participants/:remove', {"communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000c-04d7-8c32-02c3-593a0d001312"}})
  .query(true)
  .reply(204, "", [
  'MS-CV',
  '3yk3ClPOu0aj5AIilFUK1Q.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5, 2021-03-07, 2021-04-05-preview6',
  'X-Processing-Time',
  '215ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0bf0fYQAAAACaiTNvZ2yESYcBnM/zvKNjUERYMzFFREdFMDIxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 20 Aug 2021 19:07:26 GMT'
]);
