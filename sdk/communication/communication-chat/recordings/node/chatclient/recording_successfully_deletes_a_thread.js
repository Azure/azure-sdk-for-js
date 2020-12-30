let nock = require('nock');

module.exports.hash = "1111e8e6bad22cbea6c2a2da200160bf";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/chat/threads/19%3A9f956fe210414cc3a38295c399294c02%40thread.v2')
  .query(true)
  .reply(204, "", [
  'MS-CV',
  'bT17OIn0GUqdmfs7SqnZ0w.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '344ms',
  'X-Azure-Ref',
  '0TOLsXwAAAACo/CaEHkHEQqYay4i4IEYhWVZSMzBFREdFMDQwOQBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Wed, 30 Dec 2020 20:25:48 GMT'
]);
