let nock = require('nock');

module.exports.hash = "91a015138a97d1f5a1574ba5f7e57c54";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://someEndpoint', {"encodedQueryParams":true})
  .post('/emails:send', {"sender":"someSender@contoso.com","content":{"subject":"someSubject","plainText":"somePlainTextBody","html":"<html><h1>someHtmlBody</html>"},"recipients":{"to":[{"email":"someRecipient@domain.com","displayName":"someRecipient"}]}})
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
  '0vxGEYgAAAACsYC6PhqXqQJdhiVFkNR+WRE0yQUExMDkxMjA5MDA5AGNjOTI3NThkLTA1ZjctNGFkNi1hYTVlLTBmYTk3MThkODk4NQ==',
  'Date',
  'Tue, 17 May 2022 21:21:02 GMT',
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
  '0vxGEYgAAAAChL+hPOajzSav9EWGmyQjfRE0yQUExMDkxMjA5MDA5AGNjOTI3NThkLTA1ZjctNGFkNi1hYTVlLTBmYTk3MThkODk4NQ==',
  'Date',
  'Tue, 17 May 2022 21:21:03 GMT'
]);
