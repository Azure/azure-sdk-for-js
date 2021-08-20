let nock = require('nock');

module.exports.hash = "d9fbea65b56902e6f5a4135d37ae46bd";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3AG9Ahp1Z8TtiJdI42d6ndj1QXAXeWZGeqjdxqjgPOdR81%40thread.v2/messages/1629486443938')
  .query(true)
  .reply(200, {"id":"1629486443938","type":"text","sequenceId":"4","version":"1629486443938","content":{"message":"content"},"senderDisplayName":"","createdOn":"2021-08-20T19:07:23Z","senderCommunicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000c-04d7-8bc8-02c3-593a0d001311","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000c-04d7-8bc8-02c3-593a0d001311"}},"metadata":{"tags":"sometag"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'yW6QlSl+nUWCQ/iA+qZluw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5, 2021-03-07, 2021-04-05-preview6',
  'X-Processing-Time',
  '98ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0bP0fYQAAAADdXWLwwMIKSashzaGZzRH2UERYMzFFREdFMDIxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 20 Aug 2021 19:07:24 GMT'
]);
