let nock = require('nock');

module.exports.hash = "bbd2bac67435ebeb9a6b8f56f717e8d5";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:d2a829bc-8523-4404-b727-022345e48ca6_00000008-8014-db6d-ceb1-a43a0d00e5c3"},"accessToken":{"token":"token","expiresOn":"2021-02-27T21:16:28.34548+00:00"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'diokEE5jPU+Q4rGs/m6wiw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'cc12bf94-0c93-4c8a-bf7d-00b146d23fe9',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '559ms',
  'X-Azure-Ref',
  '0LGU5YAAAAABi2qI89hGOToDUmaT/GLSSWVZSMzBFREdFMDQxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 26 Feb 2021 21:16:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:d2a829bc-8523-4404-b727-022345e48ca6_00000008-8014-dde4-ceb1-a43a0d00e5c4"},"accessToken":{"token":"token","expiresOn":"2021-02-27T21:16:28.980598+00:00"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'WKZ8cfCt2UK+Zm40GBt30g.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '54064899-d8f2-4770-99b7-fa0d88d8857c',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '545ms',
  'X-Azure-Ref',
  '0LWU5YAAAAAAEkl9Lyq0GSpyyivspeUyEWVZSMzBFREdFMDQxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 26 Feb 2021 21:16:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads', {"topic":"test topic","participants":[{"id":"8:acs:d2a829bc-8523-4404-b727-022345e48ca6_00000008-8014-db6d-ceb1-a43a0d00e5c3"},{"id":"8:acs:d2a829bc-8523-4404-b727-022345e48ca6_00000008-8014-dde4-ceb1-a43a0d00e5c4"}]})
  .query(true)
  .reply(201, {"chatThread":{"id":"19:5d51112eb39b4a86a6ee971d76891ec5@thread.v2","topic":"test topic","createdOn":"2021-02-26T21:16:30Z","createdBy":"8:acs:d2a829bc-8523-4404-b727-022345e48ca6_00000008-8014-db6d-ceb1-a43a0d00e5c3"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://kimtestacs.communication.azure.com/chat/threads/19%3A5d51112eb39b4a86a6ee971d76891ec5@thread.v2',
  'MS-CV',
  'AogoRcXe1UaeRlddzJHJ+A.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4',
  'X-Processing-Time',
  '579ms',
  'X-Azure-Ref',
  '0LmU5YAAAAADFbrhkXiuBT5lThWthpNdPWVZSMzBFREdFMDQxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 26 Feb 2021 21:16:30 GMT'
]);
