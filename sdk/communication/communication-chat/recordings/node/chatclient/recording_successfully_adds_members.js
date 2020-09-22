let nock = require('nock');

module.exports.hash = "91f9d3d6bfaa75a9c8ce999c36d74946";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities')
  .query(true)
  .reply(200, {"id":"8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000005-2f36-6ea0-6a0b-343a0d00003c"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'Tmq1AoOxvEKlnMOgrirqNQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '5e24311c-46b8-49af-a343-0ad58557b556',
  'api-supported-versions',
  '2020-07-20-preview1, 2020-07-20-preview2',
  'X-Processing-Time',
  '22ms',
  'X-Azure-Ref',
  '0tBVgXwAAAADpDjrdgDeFQo6EODSovdfYV1NURURHRTA4MTQAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 15 Sep 2020 01:15:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities/8%3Aacs%3A8d0de54a-ca74-4b37-89ea-75a8ab565166_00000005-2f36-6ea0-6a0b-343a0d00003c/token', {"scopes":["chat"]})
  .query(true)
  .reply(200, {"id":"8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000005-2f36-6ea0-6a0b-343a0d00003c","token":"token","expiresOn":"2020-09-16T01:15:32.0000282+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'MI71/pp1m0KF+/AVbQeHHQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '314224d0-4905-484f-9d3a-4a28750867c4',
  'api-supported-versions',
  '2020-07-20-preview1, 2020-07-20-preview2',
  'X-Processing-Time',
  '36ms',
  'X-Azure-Ref',
  '0tBVgXwAAAAAaSuBchlr+SqjZ2GR08gq8V1NURURHRTA4MTQAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 15 Sep 2020 01:15:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3A069d3bbafc4840df836c5fe8e232a17f%40thread.v2/members', {"members":[{"id":"8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000005-2f36-6ea0-6a0b-343a0d00003c"}]})
  .query(true)
  .reply(207, {"multipleStatus":[{"id":"8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000005-2f36-6ea0-6a0b-343a0d00003c","statusCode":201,"type":"ThreadMember"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'ZmXY+6RtKkyv2qe6a2TQaw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-07-20-preview1, 2020-09-21-preview2',
  'X-Processing-Time',
  '338ms',
  'X-Azure-Ref',
  '0tRVgXwAAAACWZwcVxeIpR4jPIEHj/XZSV1NURURHRTA4MDcAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 15 Sep 2020 01:15:33 GMT'
]);
