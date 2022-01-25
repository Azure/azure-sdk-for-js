let nock = require('nock');

module.exports.hash = "b8bd7663317881985461940af454ce96";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling:join', {"callLocator":{"groupCallId":"1350d9e6-946f-5cd9-9f29-a1cb488a2c71","kind":"groupCallLocator"},"source":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_6f8c191d-f701-58b7-a744-35bac2a8f074"}},"callbackUri":"https://endpoint/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated"]})
  .query(true)
  .reply(202, {"callConnectionId":"6d201300-6f38-4c70-bada-ffd34d2a6189"}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  'f41a47a5-8526-4373-b1ab-6771bd9fc333',
  'X-Microsoft-Skype-Chain-ID',
  '95044ce2-382d-41f1-8f62-5635044a9e9a',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0BcLuYQAAAADX5XZ/dx4UQJ0kyot6yR9ZREVMMDFFREdFMDQwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 24 Jan 2022 15:13:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling:join', {"callLocator":{"groupCallId":"1350d9e6-946f-5cd9-9f29-a1cb488a2c71","kind":"groupCallLocator"},"source":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_ff23b678-5b97-564d-b6c4-6bb53068c498"}},"callbackUri":"https://endpoint/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated"]})
  .query(true)
  .reply(202, {"callConnectionId":"6d201300-0f0c-4bab-9df8-5bdbd7113787"}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  '04fc40b9-ceea-48db-a8df-4e93868c2372',
  'X-Microsoft-Skype-Chain-ID',
  '745756fa-baf7-4cbe-bf24-98445ae7ec99',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0BcLuYQAAAAAutV8sKjvCQaA6c+tEXBzlREVMMDFFREdFMDQwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 24 Jan 2022 15:13:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/recordings', {"callLocator":{"groupCallId":"1350d9e6-946f-5cd9-9f29-a1cb488a2c71","kind":"groupCallLocator"},"recordingStateCallbackUri":"/not/absolute/url"})
  .query(true)
  .reply(200, {"recordingId":"eyJQbGF0Zm9ybUVuZHBvaW50SWQiOiI2ZDIwMTMwMC05YzJmLTRjOTQtYjBiMi04ZDIwY2NiN2Y3YTciLCJSZXNvdXJjZVNwZWNpZmljSWQiOiJhN2QyMjk5OS00MWE0LTQ5OGEtYmFlYS01YTM0MDYzOWQwNzcifQ"}, [
  'Content-Length',
  '180',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  '054437df-cc42-4d8f-9891-ff00773956d5',
  'X-Microsoft-Skype-Chain-ID',
  'f808a7ce-2aa9-4a44-8970-0c8cf5abe72b',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0BsLuYQAAAAAWMCo8i2s3SpA8O97BLf4SREVMMDFFREdFMDQwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 24 Jan 2022 15:13:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/calling/recordings/eyJQbGF0Zm9ybUVuZHBvaW50SWQiOiI2ZDIwMTMwMC05YzJmLTRjOTQtYjBiMi04ZDIwY2NiN2Y3YTciLCJSZXNvdXJjZVNwZWNpZmljSWQiOiJhN2QyMjk5OS00MWE0LTQ5OGEtYmFlYS01YTM0MDYzOWQwNzcifQ')
  .query(true)
  .reply(200, "", [
  'X-Microsoft-Skype-Chain-ID',
  'f808a7ce-2aa9-4a44-8970-0c8cf5abe72b',
  'x-ms-client-request-id',
  '533839f5-3740-41cb-aba3-f1e13986324b',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0CMLuYQAAAAD6sfes1bb4R502GdryZ8xQREVMMDFFREdFMDQwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 24 Jan 2022 15:13:13 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/6d201300-6f38-4c70-bada-ffd34d2a6189/:hangup')
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  'f808a7ce-2aa9-4a44-8970-0c8cf5abe72b',
  'x-ms-client-request-id',
  '3fa5aee8-535e-4ec0-87ed-6238b399ee02',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0CcLuYQAAAADH+eH6hlQ8QrcnWk+nhf8lREVMMDFFREdFMDQwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 24 Jan 2022 15:13:13 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/6d201300-0f0c-4bab-9df8-5bdbd7113787/:hangup')
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  'f808a7ce-2aa9-4a44-8970-0c8cf5abe72b',
  'x-ms-client-request-id',
  'b9c4a67c-aac8-4fac-a017-742fe8086631',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0CcLuYQAAAABfqmCsZTuWT6+cXZZzCAI+REVMMDFFREdFMDQwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 24 Jan 2022 15:13:13 GMT',
  'Content-Length',
  '0'
]);
