let nock = require('nock');

module.exports.hash = "17a09e59e6cb1c9e41aa571d96b978d0";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/chat/threads/19%3Ad0faaa3907264686b859c3b0cca68dcb%40thread.v2/participants/8%3Aacs%3A8d0de54a-ca74-4b37-89ea-75a8ab565166_00000008-4d76-5349-e3c7-593a0d0002da')
  .query(true)
  .reply(204, "", [
  'MS-CV',
  'wDHCKDcNTEGPH4900Khg5Q.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-11-01-preview3, 2021-01-27-preview4',
  'X-Processing-Time',
  '652ms',
  'X-Azure-Ref',
  '0zm8sYAAAAAASk4UFV/fQSJEDK/Fz77EZU0pDRURHRTA1MTIAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 17 Feb 2021 01:22:22 GMT'
]);
