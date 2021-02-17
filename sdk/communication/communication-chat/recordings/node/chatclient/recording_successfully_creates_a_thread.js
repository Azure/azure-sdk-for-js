let nock = require('nock');

module.exports.hash = "86d7fc5fcb952314632ab6bf97514815";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000008-4d76-4d75-e3c7-593a0d0002d5"},"accessToken":{"token":"token","expiresOn":"2021-02-18T01:22:16.103069+00:00"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  '/21UAorDj0evvBnR0GTYew.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '55687f5d-516c-40d3-b621-3dcf7a622ecf',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '37ms',
  'X-Azure-Ref',
  '0yW8sYAAAAADbx1o5GGWTQ7bGy9hCDZJRU0pDRURHRTA1MTIAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 17 Feb 2021 01:22:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000008-4d76-4dd5-e3c7-593a0d0002d6"},"accessToken":{"token":"token","expiresOn":"2021-02-18T01:22:16.1969169+00:00"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'J2g8rDA2nE6+WROsamHM0w.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '96f850bb-f925-4770-8de7-419e8c9d076d',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '34ms',
  'X-Azure-Ref',
  '0yW8sYAAAAADlE1s67R/KT5EA7VBQXAp3U0pDRURHRTA1MTIAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 17 Feb 2021 01:22:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads', {"topic":"test topic","participants":[{"id":"8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000008-4d76-4d75-e3c7-593a0d0002d5"},{"id":"8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000008-4d76-4dd5-e3c7-593a0d0002d6"}]})
  .query(true)
  .reply(201, {"chatThread":{"id":"19:404f02161e7d459089b89e6a50eb3277@thread.v2","topic":"test topic","createdOn":"2021-02-17T01:22:17Z","createdBy":"8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000008-4d76-4d75-e3c7-593a0d0002d5"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://mattstestresource.communication.azure.com/chat/threads/19%3A404f02161e7d459089b89e6a50eb3277@thread.v2',
  'MS-CV',
  'olmiw9JkSESR9tk1gFOLAA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4',
  'X-Processing-Time',
  '470ms',
  'X-Azure-Ref',
  '0yW8sYAAAAAC1EVGjnfgJTJn9NV0mkxafU0pDRURHRTA1MTIAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 17 Feb 2021 01:22:17 GMT'
]);
