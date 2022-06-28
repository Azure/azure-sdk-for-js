let nock = require('nock');

module.exports.hash = "bedbbe6840140e719976780bae0fbb47";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://someEndpoint', {"encodedQueryParams":true})
  .post('/emails:send', {"sender":"someSender@contoso.com","content":{"subject":"someSubject","body":{"plainText":"somePlainTextBody","html":"<html><h1>someHtmlBody</html>"}},"recipients":{"toRecipients":[{"email":"someRecipient@domain.com","displayName":"someRecipient"}]}})
  .query(true)
  .reply(202, "", [
  'Operation-Location',
  "someOperationLocation",
  'x-ms-request-id',
  "someRequestId",
  'Repeatability-Result',
  'accepted',
  'api-supported-versions',
  '2021-10-01-preview',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '02xt8YgAAAACYlH9X6RjyT4El660PliahV1NURURHRTA4MjEAY2M5Mjc1OGQtMDVmNy00YWQ2LWFhNWUtMGZhOTcxOGQ4OTg1',
  'Date',
  'Wed, 11 May 2022 20:26:02 GMT',
  'Content-Length',
  '0'
]);

nock('https://someEndpoint', {"encodedQueryParams":true})
  .get('/emails/someRequestId/status')
  .query(true)
  .reply(200, {"messageId":"someRequestId","status":"Queued"}, [
  'Content-Length',
  '70',
  'Content-Type',
  'application/json; charset=utf-8',
  'Retry-After',
  '0',
  'api-supported-versions',
  '2021-10-01-preview',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '02xt8YgAAAAACKxDJKYA6RIEsMKvObzg/V1NURURHRTA4MjEAY2M5Mjc1OGQtMDVmNy00YWQ2LWFhNWUtMGZhOTcxOGQ4OTg1',
  'Date',
  'Wed, 11 May 2022 20:26:02 GMT'
]);
