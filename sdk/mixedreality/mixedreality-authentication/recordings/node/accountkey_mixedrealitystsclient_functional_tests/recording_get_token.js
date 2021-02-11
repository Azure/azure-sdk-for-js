let nock = require('nock');

module.exports.hash = "23a26a2fb7fd39462b43abacad14997c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://sts.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/Accounts/68321d5a-7978-4ceb-b880-0f49751daae9/token')
  .query(true)
  .reply(200, {"AccessToken":"eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJlbWFpbCI6IkJvYkBjb250b3NvLmNvbSIsImdpdmVuX25hbWUiOiJCb2IiLCJpc3MiOiJodHRwOi8vRGVmYXVsdC5Jc3N1ZXIuY29tIiwiYXVkIjoiaHR0cDovL0RlZmF1bHQuQXVkaWVuY2UuY29tIiwiaWF0IjoiMTYwNzk3ODY4MyIsIm5iZiI6IjE2MDc5Nzg2ODMiLCJleHAiOiIxNjA3OTc4OTgzIn0."}, [
  'Date',
  'Sat, 16 Jan 2021 19:56:23 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '1264',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'MS-CV',
  'emhM+61T9EuzXGfEZ8RwXQ.0',
  'X-Content-Type-Options',
  'nosniff'
]);
