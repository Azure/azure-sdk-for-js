let nock = require('nock');

module.exports.hash = "11472eda4033b428f54aca16742a6443";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/availablePhoneNumbers/countries')
  .query(false)
  .reply(200, {"countries":[{"localizedName":"Canada","countryCode":"CA"},{"localizedName":"Denmark","countryCode":"DK"},{"localizedName":"Ireland","countryCode":"IE"},{"localizedName":"Italy","countryCode":"IT"},{"localizedName":"Puerto Rico","countryCode":"PR"},{"localizedName":"Sweden","countryCode":"SE"},{"localizedName":"United Kingdom","countryCode":"GB"},{"localizedName":"United States","countryCode":"US"}],"nextLink":null}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'ptRyqXrlI0WH2XBvb/3zXA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2022-12-01',
  'X-Processing-Time',
  '2954ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0lwqSYwAAAABoR525bVyCTZ8/s3vXENPQTUVYMzFFREdFMDMxNQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 08 Dec 2022 16:02:34 GMT'
]);
