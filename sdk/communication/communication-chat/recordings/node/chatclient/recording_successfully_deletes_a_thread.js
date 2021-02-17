let nock = require('nock');

module.exports.hash = "cf8b468d221de05cd3880e4f48eec43c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/chat/threads/19%3A404f02161e7d459089b89e6a50eb3277%40thread.v2')
  .query(true)
  .reply(204, "", [
  'MS-CV',
  'LTZv792MHUirD20OspEHTQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4',
  'X-Processing-Time',
  '390ms',
  'X-Azure-Ref',
  '0yW8sYAAAAAD0mdjfwi7NRY8a7hotKpETU0pDRURHRTA1MTIAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 17 Feb 2021 01:22:17 GMT'
]);
