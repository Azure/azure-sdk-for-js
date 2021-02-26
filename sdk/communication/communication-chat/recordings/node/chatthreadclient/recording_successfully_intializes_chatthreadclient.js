let nock = require('nock');

module.exports.hash = "dd036b6eec754710de54033ddef4fddb";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:d2a829bc-8523-4404-b727-022345e48ca6_00000008-8014-e55d-ceb1-a43a0d00e5c5"},"accessToken":{"token":"token","expiresOn":"2021-02-27T21:16:30.610595+00:00"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'VrnjUkCq/0uhwBOn4GQgMQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '0ec7d03f-d5c8-4eac-9ceb-ed26f8697efc',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '263ms',
  'X-Azure-Ref',
  '0L2U5YAAAAAC8t/4xGiikTIeJegdm4W6CWVZSMzBFREdFMDQxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 26 Feb 2021 21:16:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:d2a829bc-8523-4404-b727-022345e48ca6_00000008-8014-e6b0-ceb1-a43a0d00e5c6"},"accessToken":{"token":"token","expiresOn":"2021-02-27T21:16:31.222131+00:00"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'HfSTpfwTWUOkK+dJoK+zDg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'f52b4b03-a122-49a7-8f7c-912021c85672',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '545ms',
  'X-Azure-Ref',
  '0L2U5YAAAAACIj5fg+Z64RKdkD1yYtd/CWVZSMzBFREdFMDQxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 26 Feb 2021 21:16:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads', {"topic":"test topic","participants":[{"id":"8:acs:d2a829bc-8523-4404-b727-022345e48ca6_00000008-8014-e55d-ceb1-a43a0d00e5c5"},{"id":"8:acs:d2a829bc-8523-4404-b727-022345e48ca6_00000008-8014-e6b0-ceb1-a43a0d00e5c6"}]})
  .query(true)
  .reply(201, {"chatThread":{"id":"19:78448d7234104d49a790bd99614da6e6@thread.v2","topic":"test topic","createdOn":"2021-02-26T21:16:32Z","createdBy":"8:acs:d2a829bc-8523-4404-b727-022345e48ca6_00000008-8014-e55d-ceb1-a43a0d00e5c5"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://kimtestacs.communication.azure.com/chat/threads/19%3A78448d7234104d49a790bd99614da6e6@thread.v2',
  'MS-CV',
  'N03A63+KBkWmEEM6lmYzyQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4',
  'X-Processing-Time',
  '1181ms',
  'X-Azure-Ref',
  '0MGU5YAAAAAAVQ9gws8BnS4BbIeuP2DMYWVZSMzBFREdFMDQxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 26 Feb 2021 21:16:32 GMT'
]);
