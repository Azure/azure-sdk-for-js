let nock = require('nock');

module.exports.hash = "17a09e59e6cb1c9e41aa571d96b978d0";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/chat/threads/19%3A78448d7234104d49a790bd99614da6e6%40thread.v2/participants/8%3Aacs%3Ad2a829bc-8523-4404-b727-022345e48ca6_00000008-8014-e6b0-ceb1-a43a0d00e5c6')
  .query(true)
  .reply(204, "", [
  'MS-CV',
  '27rTS8Qn10Sjz9nKdmAB9Q.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-11-01-preview3, 2021-01-27-preview4',
  'X-Processing-Time',
  '258ms',
  'X-Azure-Ref',
  '0NGU5YAAAAADbBtjVTAInRa4v/KYOKFv2WVZSMzBFREdFMDQxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 26 Feb 2021 21:16:35 GMT'
]);
