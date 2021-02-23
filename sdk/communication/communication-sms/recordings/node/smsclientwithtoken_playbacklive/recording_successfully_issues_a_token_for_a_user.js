let nock = require('nock');

module.exports.hash = "e9e4d28818e35133b68bf236d797d9f8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/SomeTenantId/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=SomeClientId&client_secret=SomeClientSecret&scope=https%3A%2F%2Fcommunication.azure.com%2F%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyIsImtpZCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyJ9.eyJhdWQiOiJodHRwczovL2NvbW11bmljYXRpb24uYXp1cmUuY29tLyIsImlzcyI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0LzcyZjk4OGJmLTg2ZjEtNDFhZi05MWFiLTJkN2NkMDExZGI0Ny8iLCJpYXQiOjE2MTQxMDkwODUsIm5iZiI6MTYxNDEwOTA4NSwiZXhwIjoxNjE0MTk1Nzg1LCJhaW8iOiJFMlpnWUppeStHcmhwRi8ydXVJTlJZWVdENTMyQXdBPSIsImFwcGlkIjoiODQ2ODIwNWMtZjgxOC00ZTVkLWJlNTgtMWFjNjhmMjc4MzQ2IiwiYXBwaWRhY3IiOiIxIiwiaWRwIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3LyIsIm9pZCI6ImRjNjQyOTMwLWI4OTgtNDUxMi04MWI3LWEzZDYzYjVmODkyNSIsInJoIjoiMC5BUm9BdjRqNWN2R0dyMEdScXkxODBCSGJSMXdnYUlRWS1GMU92bGdheG84bmcwWWFBQUEuIiwic3ViIjoiZGM2NDI5MzAtYjg5OC00NTEyLTgxYjctYTNkNjNiNWY4OTI1IiwidGlkIjoiNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3IiwidXRpIjoiZGx2TkN6TWUya2VWRzhUUHkyUVZBQSIsInZlciI6IjEuMCJ9.LKCFLnPkB5jy51lVDaORwM1yyt9RvKey1ijs5ytHZ9QtrWyAScfNv-6SoYXeMcCa-2snfcltwU2lyavSWWdn_6JAreCwpltUIXfsq4KYXEp31JDzl152sSrseJTXXUYu-O6XwoUDtoeJGNP_V6QtmBE7DU3A-nQbh9mkU6BMEKlcYsCdoo9ucE3lztUBD4a8h-E2fc-YL-icuqeN3kD_gjNwvtAWZDH3CSAqw7HlyMQgt56_rs1C-etBGbj1O6da-OUc_J8pQfI-dl2j7RPPdS2DRCvO-u6G1sp_4Ww_Jbp91t-j-jpJF6IefeJXeKa2NXSQcRcBrxrJcOHbr_5jkw"}, [
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
  '0bcd5b76-1e33-47da-951b-c4cfcb641500',
  'x-ms-ests-server',
  '2.1.11513.14 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AgXvuwsAKJFMoaYc0mLDK06MQo4QAQAAAMhRx9cOAAAA; expires=Thu, 25-Mar-2021 19:43:05 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 19:43:05 GMT',
  'Content-Length',
  '1327'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/sms', {"from":"+18005551234","smsRecipients":[{"to":"+18005551234","repeatabilityRequestId":"47f3ab9c-3293-4e23-b596-051733a432bc","repeatabilityFirstSent":"Tue, 23 Feb 2021 19:43:05 GMT"}],"message":"test message","smsSendOptions":{"enableDeliveryReport":false}})
  .query(true)
  .reply(202, {"value":[{"to":"+18005551234","messageId":"Sanitized","httpStatusCode":202,"errorMessage":null,"repeatabilityResult":"accepted","successful":true}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'VnkQvw6tJkOZWN/iIzE/gA.0',
  'api-supported-versions',
  '2020-07-20-preview1, 2020-08-20-preview, 2021-03-07',
  'X-Processing-Time',
  '663ms',
  'X-Azure-Ref',
  '0yVo1YAAAAACxqdsxGOdVRroNAbNHvDg7WVZSMzBFREdFMDQwOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 23 Feb 2021 19:43:06 GMT'
]);
