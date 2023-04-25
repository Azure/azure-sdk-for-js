let nock = require('nock');

module.exports.hash = "73a9699ed724c70d09a4aab81cd701fb";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/availablePhoneNumbers/countries/US/areaCodes')
  .query(false)
  .reply(200, {"areaCodes":[{"areaCode":"888"},{"areaCode":"877"},{"areaCode":"866"},{"areaCode":"855"},{"areaCode":"844"},{"areaCode":"800"},{"areaCode":"833"},{"areaCode":"88"}],"nextLink":null}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'zlWShXISXE+p38L13caHag.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-12-01',
  'X-Processing-Time',
  '5820ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0jQqSYwAAAACEzFOWUrLkQra63hXSdCO3TUVYMzFFREdFMDMxNQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 08 Dec 2022 16:02:27 GMT'
]);
