let nock = require('nock');

module.exports.hash = "0f29f16eb1ff040fd059419bbfb9bddc";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Ffarmbeats.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1321',
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
  '5cc0a6cd-50e3-46fa-875b-e8274a7a2c01',
  'x-ms-ests-server',
  '2.1.11722.21 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AvH7PKi0etBHh7-E4skd8s14ycTJAQAAAK50NNgOAAAA; expires=Wed, 16-Jun-2021 14:29:03 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 17 May 2021 14:29:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/farmers')
  .query(true)
  .reply(200, ["1f8b0800000000000003848ecb0a83400c45ff256b0732331a35eb7ec2ac2c5d0467b4432b05fbd888ffde08dd55f02e2e093984b3c047eeef047c5e2047609051e235dfc40c324f6986025290510fd820fab617831a83b4d53611b63dfa66d816a5fb39c92bc59356c8933e0687ce1aac8cb5c139c68a1d750a4e8f9887bc4fba60897dc9ce77b0163fb3fcec25ff6b69fc40b4a31589eae658cb075bb1277678a4a564cd65c3a592eb65fd020000ffff","03000430be243c010000"], [
  'Server',
  'nginx/1.19.1',
  'Date',
  'Mon, 17 May 2021 14:29:04 GMT',
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
