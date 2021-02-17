let nock = require('nock');

module.exports.hash = "351e07a6e84a7c1868189a472027db0c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3Ad0faaa3907264686b859c3b0cca68dcb%40thread.v2/messages/1613524939985')
  .query(true)
  .reply(200, {"id":"1613524939985","type":"text","sequenceId":"4","version":"1613524939985","content":{"message":"content"},"senderDisplayName":"","createdOn":"2021-02-17T01:22:19Z","senderId":"8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000008-4d76-52e0-e3c7-593a0d0002d8"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  '+2uZxa72lEKDtM5P5rArsw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4',
  'X-Processing-Time',
  '65ms',
  'X-Azure-Ref',
  '0zG8sYAAAAABNcvVksG4OSK7Jj+phZo5fU0pDRURHRTA1MTIAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 17 Feb 2021 01:22:20 GMT'
]);
