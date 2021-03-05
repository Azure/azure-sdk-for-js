let nock = require('nock');

module.exports.hash = "3d3dc8054a3ca3d6a9beb2d230dde270";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .patch('/chat/threads/19%3AgzRHvaQS6tcmZwRdVfMUBWLPK34ocUiHaR3qlZOEwu81%40thread.v2', {"topic":"new topic"})
  .query(true)
  .reply(204, "", [
  'MS-CV',
  'AjsRSFjJrkGZzXKxV00alg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5',
  'X-Processing-Time',
  '192ms',
  'X-Azure-Ref',
  '0SKlCYAAAAADRdCOG2Z7CTIP6wNwmclwjV1NURURHRTA4MDcAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Fri, 05 Mar 2021 21:57:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3AgzRHvaQS6tcmZwRdVfMUBWLPK34ocUiHaR3qlZOEwu81%40thread.v2')
  .query(true)
  .reply(200, {"id":"19:gzRHvaQS6tcmZwRdVfMUBWLPK34ocUiHaR3qlZOEwu81@thread.v2","topic":"new topic","createdOn":"2021-03-05T21:57:27Z","createdByCommunicationIdentifier":{"rawId":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-a446-e32b-e3c7-593a0d00c4c4","communicationUser":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-a446-e32b-e3c7-593a0d00c4c4"}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'ifw/iF/qTE+N5I9Nk5hBHw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5',
  'X-Processing-Time',
  '102ms',
  'X-Azure-Ref',
  '0SKlCYAAAAAAV7q4oP1aBSJlkI4TnAcRLV1NURURHRTA4MDcAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Fri, 05 Mar 2021 21:57:28 GMT'
]);
