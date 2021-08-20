let nock = require('nock');

module.exports.hash = "10714d70e3df545eb0479c0c6490acaf";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3AG9Ahp1Z8TtiJdI42d6ndj1QXAXeWZGeqjdxqjgPOdR81%40thread.v2/messages', {"content":"content","metadata":{"tags":"sometag"}})
  .query(true)
  .reply(201, {"id":"1629486443938"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://chat-prod-e2e.communication.azure.com/chat/threads/19%3AG9Ahp1Z8TtiJdI42d6ndj1QXAXeWZGeqjdxqjgPOdR81@thread.v2/messages/1629486443938',
  'MS-CV',
  '3RwT+6wZikmCvlhfTov9lA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5, 2021-03-07, 2021-04-05-preview6',
  'X-Processing-Time',
  '251ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0a/0fYQAAAACjbahJDXBDQoHw06EtZ1WNUERYMzFFREdFMDIxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 20 Aug 2021 19:07:24 GMT'
]);
