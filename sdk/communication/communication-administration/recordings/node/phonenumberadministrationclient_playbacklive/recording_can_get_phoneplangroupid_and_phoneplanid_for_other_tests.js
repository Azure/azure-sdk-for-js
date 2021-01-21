let nock = require('nock');

module.exports.hash = "dec4a115d96e27442dce416e17a705bb";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/administration/phonenumbers/countries/US/phoneplangroups')
  .query(false)
  .reply(200, {"phonePlanGroups":[{"phonePlanGroupId":"sanitized","phoneNumberType":"Geographic","localizedName":"Azure- User - Geographic","localizedDescription":"These are numbers used by Azure resources."},{"phonePlanGroupId":"sanitized","phoneNumberType":"Geographic","localizedName":"Azure - Geographic","localizedDescription":"These are numbers used by Azure resources."},{"phonePlanGroupId":"sanitized","phoneNumberType":"TollFree","localizedName":"Azure - Toll Free","localizedDescription":"These are toll free numbers used by Azure resources."}],"nextLink":null}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'HKu6PbrTEUejg1blYguRIQ.0',
  'X-Processing-Time',
  '412ms',
  'X-Azure-Ref',
  '0g+UFYAAAAACy/DlzIxHLTZt8jT1W98YqRVdSMzBFREdFMDUyMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 18 Jan 2021 19:46:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/administration/phonenumbers/countries/US/phoneplangroups/sanitized/phoneplans')
  .query(false)
  .reply(200, {"phonePlans":[{"phonePlanId":"sanitized","localizedName":"Outbound Only PSTN For User - Geographic","locationType":"Selection","areaCodes":[],"capabilities":["OutboundCalling","UserAssignment","Geographic"],"maximumSearchSize":20},{"phonePlanId":"sanitized","localizedName":"Inbound Only PSTN For User - Geographic","locationType":"Selection","areaCodes":[],"capabilities":["InboundCalling","UserAssignment","Geographic"],"maximumSearchSize":20}],"nextLink":null}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'cUbpVknoqUepQ45Iwbpkkw.0',
  'X-Processing-Time',
  '419ms',
  'X-Azure-Ref',
  '0g+UFYAAAAAC++oZC+qGwSrPnaiOrkJ7YRVdSMzBFREdFMDYxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 18 Jan 2021 19:46:11 GMT'
]);
