let nock = require('nock');

module.exports.hash = "cf8b468d221de05cd3880e4f48eec43c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/chat/threads/19%3Ad0e0035f2cab42f0a4410cbee3cb6781%40thread.v2')
  .query(true)
  .reply(204, "", [
  'MS-CV',
  'gaenzaRE3Em1+xeIYw/pLw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4',
  'X-Processing-Time',
  '320ms',
  'X-Azure-Ref',
  '0TVccYAAAAAD0xi9ZKCMAQ6iUcui09X5mWVZSMzBFREdFMDMwOQBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Thu, 04 Feb 2021 20:21:33 GMT'
]);
