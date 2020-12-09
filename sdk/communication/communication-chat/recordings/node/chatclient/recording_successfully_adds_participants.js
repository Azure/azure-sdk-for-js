let nock = require('nock');

module.exports.hash = "31e17666f781ad18cd063e7dde571c6c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities')
  .query(true)
  .reply(200, {"id":"8:acs:9b665d53-8164-4923-ad5d-5e983b07d2e7_00000006-c6bc-c010-b274-5a3a0d0000aa"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'MUcl73GnSUyq7+piLAFs7A.0',
  'x-ms-client-request-id',
  '014bb9be-8113-4acf-8184-4c80e3e1964a',
  'api-supported-versions',
  '2020-01-15-preview3, 2020-07-20-preview1, 2020-07-20-preview2',
  'X-Processing-Time',
  '158ms',
  'X-Azure-Ref',
  '0PmnIXwAAAAAAzq7lcdkvSpZofew5ejs6WVZSMzBFREdFMDMxMgA3MDU0Mzk1ZS1jZTFkLTQ1NWUtYWU1ZC0yMzNjYTgzOTA1NTQ=',
  'Date',
  'Thu, 03 Dec 2020 04:27:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities/8%3Aacs%3A9b665d53-8164-4923-ad5d-5e983b07d2e7_00000006-c6bc-c010-b274-5a3a0d0000aa/token', {"scopes":["chat"]})
  .query(true)
  .reply(200, {"id":"8:acs:9b665d53-8164-4923-ad5d-5e983b07d2e7_00000006-c6bc-c010-b274-5a3a0d0000aa","token":"token","expiresOn":"2020-12-04T04:27:41.8322302+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'CrhQ7CRFRkSAXG83QdHvbQ.0',
  'x-ms-client-request-id',
  'ce45925b-e86e-4b5c-9b4d-2a69a448eaf8',
  'api-supported-versions',
  '2020-01-15-preview3, 2020-07-20-preview1, 2020-07-20-preview2',
  'X-Processing-Time',
  '308ms',
  'X-Azure-Ref',
  '0PmnIXwAAAACQxnXyYDBHRqYEQU4crORHWVZSMzBFREdFMDMxMgA3MDU0Mzk1ZS1jZTFkLTQ1NWUtYWU1ZC0yMzNjYTgzOTA1NTQ=',
  'Date',
  'Thu, 03 Dec 2020 04:27:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3A8dbd0526e07a41ab8982a9e29a042127%40thread.v2/participants', {"participants":[{"id":"8:acs:9b665d53-8164-4923-ad5d-5e983b07d2e7_00000006-c6bc-c010-b274-5a3a0d0000aa"}]})
  .query(true)
  .reply(201, {}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'bx2Sw+HMMkK2RRPe0ALu0g.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-11-01-preview3',
  'X-Processing-Time',
  '394ms',
  'X-Azure-Ref',
  '0PmnIXwAAAAAfyJcpuaPaQLHyWNDoSyEIWVZSMzBFREdFMDQwOQA3MDU0Mzk1ZS1jZTFkLTQ1NWUtYWU1ZC0yMzNjYTgzOTA1NTQ=',
  'Date',
  'Thu, 03 Dec 2020 04:27:43 GMT'
]);
