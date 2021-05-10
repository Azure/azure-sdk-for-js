let nock = require('nock');

module.exports.hash = "0f29f16eb1ff040fd059419bbfb9bddc";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.windows-ppe.net:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Ffarmbeats-dogfood.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  '7bdf6e4b-5445-4966-9704-5b1deda00300',
  'x-ms-ests-server',
  '2.1.11774.0 - DMS PPE',
  'Set-Cookie',
  'fpc=ArSLLyq-3BNLhxsFs9Uc6E4izVzVAQAAAIm7K9gOAAAA; expires=Wed, 09-Jun-2021 23:40:59 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'stsservicecookie=estsppe; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 10 May 2021 23:40:58 GMT',
  'Content-Length',
  '1340'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/farmers')
  .query(true)
  .reply(200, ["1f8b08000000000000038c8ecd0ac2400c84df25e72e24d96e7ff6ec23ec49f110bbdbba6811eacfa5f4dd4dc15b410dc3909061f86678c9f599c01f66c8113cc820f19c2f627a99c634410129c8a00fac109db56250c760bddaba55d89c8845d643d3dd94e491e24e2de4518b8191c96069b80d8c9e54cd5e83e32de63eff4e2ec5872cdf3bc91b2c46e446c86eb15a8ed4bbbfb0acb7a547f715cba902d59ed83329d67179030000ffff","0300afc8e3283c010000"], [
  'Server',
  'nginx/1.19.1',
  'Date',
  'Mon, 10 May 2021 23:40:59 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'keep-alive',
  'Vary',
  'Accept-Encoding',
  'api-supported-versions',
  '2021-03-31-preview',
  'api-deprecated-versions',
  '2020-12-31-preview',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Content-Encoding',
  'gzip'
]);
