let nock = require('nock');

module.exports.hash = "3d3dc8054a3ca3d6a9beb2d230dde270";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .patch('/chat/threads/19%3Ad0faaa3907264686b859c3b0cca68dcb%40thread.v2', {"topic":"new topic"})
  .query(true)
  .reply(204, "", [
  'MS-CV',
  'KoU51hspEkSvh4uU13msTw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4',
  'X-Processing-Time',
  '262ms',
  'X-Azure-Ref',
  '0y28sYAAAAACzFKs4n5OGTbkQTBb6MTyBU0pDRURHRTA1MTIAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 17 Feb 2021 01:22:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3Ad0faaa3907264686b859c3b0cca68dcb%40thread.v2')
  .query(true)
  .reply(200, {"id":"19:d0faaa3907264686b859c3b0cca68dcb@thread.v2","topic":"new topic","createdOn":"2021-02-17T01:22:18Z","createdBy":"8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000008-4d76-52e0-e3c7-593a0d0002d8"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  '9rSaMa/EUE+XkIl4lQlnkQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4',
  'X-Processing-Time',
  '60ms',
  'X-Azure-Ref',
  '0y28sYAAAAABf2zC5n9f+SIqqJuHzmXleU0pDRURHRTA1MTIAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 17 Feb 2021 01:22:19 GMT'
]);
