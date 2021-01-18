let nock = require('nock');

module.exports.hash = "da67599904f0257258c427b6fafdbbab";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/SomeTenantId/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=SomeClientId&client_secret=SomeClientSecret&scope=https%3A%2F%2Fcommunication.azure.com%2F%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyIsImtpZCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyJ9.eyJhdWQiOiJodHRwczovL2NvbW11bmljYXRpb24uYXp1cmUuY29tLyIsImlzcyI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0LzcyZjk4OGJmLTg2ZjEtNDFhZi05MWFiLTJkN2NkMDExZGI0Ny8iLCJpYXQiOjE2MTA5OTE1NjYsIm5iZiI6MTYxMDk5MTU2NiwiZXhwIjoxNjExMDc4MjY2LCJhaW8iOiJFMkpnWUloNzlDUisxM1UxeGJaMUNxY0YxMGYrQmdBPSIsImFwcGlkIjoiNmM4MTgxYzctOTFhNi00ZTJlLTg0ODAtZDU0MDIxYWM0YzRiIiwiYXBwaWRhY3IiOiIxIiwiaWRwIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3LyIsIm9pZCI6IjNlMGM3MTRmLTk3YWMtNGQ2My1hZWFmLTE0YmFhNWUwNjRjYiIsInJoIjoiMC5BUm9BdjRqNWN2R0dyMEdScXkxODBCSGJSOGVCZ1d5bWtTNU9oSURWUUNHc1RFc2FBQUEuIiwic3ViIjoiM2UwYzcxNGYtOTdhYy00ZDYzLWFlYWYtMTRiYWE1ZTA2NGNiIiwidGlkIjoiNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3IiwidXRpIjoiTW9JOTBLX244RUdIaVJ4QjVIaTlBQSIsInZlciI6IjEuMCJ9.YZXEP8aF5O6xzak8pElgNsy4ADP-6qthcVW-EK6nqLAK0KITA4Nr-00lqFPXbFIUws5EBrkvikLtW-tWM7-C1JOk-7hiS-TsuRrU7Try-KiJa55bwrflElwQrsWWQv5a5CqpJMWg5L5g53C0TsIXeRjGvoC4q4UYRw14qsr3I3l2HkldFEdXXxYQUUWosQ_k3kMNHu5cqtv_jBZxZFnfIIjGG5i0ziwE0J4pd_qGYzxnomA6CxhBjeY3EAjw9wjW6zx2546zmWpWvT_C8zGyS162VQfNfExIrm-7yO4qMgR61Y-cjfvch8Xzc3OVhiPNG_C0GAMeJ25GLo75ymdh2w"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1327',
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
  'd03d8232-e7af-41f0-8789-1c41e478bd00',
  'x-ms-ests-server',
  '2.1.11397.13 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AsGyjGWXEBJHoR_H86VLMf9Wyo4SAgAAAPq_l9cOAAAA; expires=Wed, 17-Feb-2021 17:44:26 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 18 Jan 2021 17:44:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/sms', {"from":"+18005551234","to":["+18005551234"],"message":"test message","sendSmsOptions":{}})
  .query(true)
  .reply(200, {"messageId":"Sanitized"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  '9QaVP6fa7ESQlIFYgh5o3w.0',
  'X-Processing-Time',
  '283ms',
  'X-Azure-Ref',
  '0+8gFYAAAAADtffz2HEbcSaWb25TAU8s+RVdSMzBFREdFMDYxMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 18 Jan 2021 17:44:27 GMT'
]);
