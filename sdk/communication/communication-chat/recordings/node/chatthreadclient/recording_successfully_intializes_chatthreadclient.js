let nock = require('nock');

module.exports.hash = "0343e67db5392abf4721684204568393";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000009-0067-083f-0e04-343a0d0064e0"},"accessToken":{"token":"token","expiresOn":"2021-03-24T19:17:37.2445304+00:00"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'cNm5ojS3jkGVK0MoxB58Xw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '59dd70c3-20da-4d91-89da-bc80ef9343fb',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07',
  'X-Processing-Time',
  '273ms',
  'X-Azure-Ref',
  '00T5aYAAAAABgEhJVeRrqTbyDW2YDKenkV1NURURHRTA4MTQAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 23 Mar 2021 19:17:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000009-0067-0986-0e04-343a0d0064e1"},"accessToken":{"token":"token","expiresOn":"2021-03-24T19:17:37.3296509+00:00"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'qDeRTZcxdEyfjbq+NslE7A.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '0b60c627-69d3-412e-9e34-3ba0e56417ac',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07',
  'X-Processing-Time',
  '31ms',
  'X-Azure-Ref',
  '00j5aYAAAAADe+aLz+DuRQ4BoWiXiyk1aV1NURURHRTA4MTQAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 23 Mar 2021 19:17:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads', {"topic":"test topic","participants":[{"communicationIdentifier":{"communicationUser":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000009-0067-083f-0e04-343a0d0064e0"}}},{"communicationIdentifier":{"communicationUser":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000009-0067-0986-0e04-343a0d0064e1"}}}]})
  .query(true)
  .reply(201, {"chatThread":{"id":"19:9cXNBEh5NlRdVyRs5tIn9ZnKCVgwfFsmRRbW6Mn-JNM1@thread.v2","topic":"test topic","createdOn":"2021-03-23T19:17:38Z","createdByCommunicationIdentifier":{"rawId":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000009-0067-083f-0e04-343a0d0064e0","communicationUser":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000009-0067-083f-0e04-343a0d0064e0"}}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://azurecommunicationservices.communication.azure.com/chat/threads/19%3A9cXNBEh5NlRdVyRs5tIn9ZnKCVgwfFsmRRbW6Mn-JNM1@thread.v2',
  'MS-CV',
  '8lvC1B2aW0ilAbUDgLUuVw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5, 2021-03-07',
  'X-Processing-Time',
  '732ms',
  'X-Azure-Ref',
  '00j5aYAAAAABKLg0polpDTotS3KnMUZFEV1NURURHRTA4MjIAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 23 Mar 2021 19:17:38 GMT'
]);
