let nock = require('nock');

module.exports.hash = "59dc56d581f29cf0fcaa83f3b65df716";

module.exports.testInfo = {"uniqueName":{"sessionId":"sessionId161960634870200973"},"newDate":{}}

nock('https://sts.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/Accounts/00000000-1111-2222-3333-444455556666/token')
  .query(true)
  .reply(200, {"AccessToken":"<access_token>"}, [
  'Date',
  'Wed, 28 Apr 2021 10:39:08 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '1219',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'MS-CV',
  '0HNricFcN0mBR8qt0DfvRA.0',
  'X-Content-Type-Options',
  'nosniff'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .put('/accounts/00000000-1111-2222-3333-444455556666/sessions/sessionId161960634870200973', {"maxLeaseTimeMinutes":4,"size":"Standard"})
  .query(true)
  .reply(201, {"id":"sessionId161960634870200973","creationTime":"2021-04-28T10:39:09.3267695+00:00","elapsedTimeMinutes":0,"maxLeaseTimeMinutes":4,"size":"Standard","status":"Starting"}, [
  'Date',
  'Wed, 28 Apr 2021 10:39:08 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '172',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  'bNMYIJpcvEaJHznIfC4I1w.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://sts.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/Accounts/00000000-1111-2222-3333-444455556666/token')
  .query(true)
  .reply(200, {"AccessToken":"<access_token>"}, [
  'Date',
  'Wed, 28 Apr 2021 10:39:08 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '1219',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'MS-CV',
  'z0E4tmQtFk6fg/ceiVsOsw.0',
  'X-Content-Type-Options',
  'nosniff'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/sessions/sessionId161960634870200973')
  .query(true)
  .reply(200, {"id":"sessionId161960634870200973","creationTime":"2021-04-28T10:39:09.3267695+00:00","elapsedTimeMinutes":0,"maxLeaseTimeMinutes":4,"size":"Standard","status":"Starting"}, [
  'Date',
  'Wed, 28 Apr 2021 10:39:09 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '172',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  'VRFndlqqQUyB6b1zDM/neQ.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://sts.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/Accounts/00000000-1111-2222-3333-444455556666/token')
  .query(true)
  .reply(200, {"AccessToken":"<access_token>"}, [
  'Date',
  'Wed, 28 Apr 2021 10:39:09 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '1219',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'MS-CV',
  'mMavso41oUmrALx9NfEOGA.0',
  'X-Content-Type-Options',
  'nosniff'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/sessions/sessionId161960634870200973')
  .query(true)
  .reply(200, {"id":"sessionId161960634870200973","creationTime":"2021-04-28T10:39:09.3267695+00:00","elapsedTimeMinutes":0,"maxLeaseTimeMinutes":4,"size":"Standard","status":"Starting"}, [
  'Date',
  'Wed, 28 Apr 2021 10:39:09 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '172',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  '1OLjz3EDRE659gPwBo9z3Q.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://sts.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/Accounts/00000000-1111-2222-3333-444455556666/token')
  .query(true)
  .reply(200, {"AccessToken":"<access_token>"}, [
  'Date',
  'Wed, 28 Apr 2021 10:39:09 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '1219',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'MS-CV',
  'kTKkmxjSwkChZOMZJY5nFA.0',
  'X-Content-Type-Options',
  'nosniff'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/sessions/sessionId161960634870200973')
  .query(true)
  .reply(200, {"id":"sessionId161960634870200973","creationTime":"2021-04-28T10:39:09.3267695+00:00","elapsedTimeMinutes":0,"maxLeaseTimeMinutes":4,"size":"Standard","status":"Starting"}, [
  'Date',
  'Wed, 28 Apr 2021 10:39:09 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '172',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  '/Cj+4uTOT0C1a9ZHjjQj2g.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://sts.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/Accounts/00000000-1111-2222-3333-444455556666/token')
  .query(true)
  .reply(200, {"AccessToken":"<access_token>"}, [
  'Date',
  'Wed, 28 Apr 2021 10:39:09 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '1219',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'MS-CV',
  'MBAl6XcVBkSu3a1fNF5mZw.0',
  'X-Content-Type-Options',
  'nosniff'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .patch('/accounts/00000000-1111-2222-3333-444455556666/sessions/sessionId161960634870200973', {"maxLeaseTimeMinutes":5})
  .query(true)
  .reply(200, {"id":"sessionId161960634870200973","creationTime":"2021-04-28T10:39:09.3267695+00:00","elapsedTimeMinutes":0,"maxLeaseTimeMinutes":5,"size":"Standard","status":"Starting"}, [
  'Date',
  'Wed, 28 Apr 2021 10:39:09 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '172',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  '5N2u8Avq5E+xNBfBXEtqgQ.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://sts.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/Accounts/00000000-1111-2222-3333-444455556666/token')
  .query(true)
  .reply(200, {"AccessToken":"<access_token>"}, [
  'Date',
  'Wed, 28 Apr 2021 10:39:09 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '1219',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'MS-CV',
  'dY3OY3LMCk6wfNYRYghS/A.0',
  'X-Content-Type-Options',
  'nosniff'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/sessions/sessionId161960634870200973')
  .query(true)
  .reply(200, {"id":"sessionId161960634870200973","creationTime":"2021-04-28T10:39:09.3267695+00:00","elapsedTimeMinutes":0,"maxLeaseTimeMinutes":5,"size":"Standard","status":"Starting"}, [
  'Date',
  'Wed, 28 Apr 2021 10:39:10 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '172',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  '1KywaNI/pkOmYn79vk/Ujw.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://sts.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/Accounts/00000000-1111-2222-3333-444455556666/token')
  .query(true)
  .reply(200, {"AccessToken":"<access_token>"}, [
  'Date',
  'Wed, 28 Apr 2021 10:39:20 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '1219',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'MS-CV',
  'qFX0fKkLgkGmN40SHj4KSg.0',
  'X-Content-Type-Options',
  'nosniff'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/sessions/sessionId161960634870200973')
  .query(true)
  .reply(200, {"id":"sessionId161960634870200973","creationTime":"2021-04-28T10:39:09.3267695+00:00","elapsedTimeMinutes":0,"maxLeaseTimeMinutes":5,"size":"Standard","status":"Starting"}, [
  'Date',
  'Wed, 28 Apr 2021 10:39:20 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '172',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  'ffGufshopkekbfw3jeGqPg.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://sts.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/Accounts/00000000-1111-2222-3333-444455556666/token')
  .query(true)
  .reply(200, {"AccessToken":"<access_token>"}, [
  'Date',
  'Wed, 28 Apr 2021 10:39:32 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '1219',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'MS-CV',
  'cmszS+8Lnk6LhcSq8vzsAA.0',
  'X-Content-Type-Options',
  'nosniff'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/sessions/sessionId161960634870200973')
  .query(true)
  .reply(200, {"id":"sessionId161960634870200973","creationTime":"2021-04-28T10:39:09.3267695+00:00","elapsedTimeMinutes":0,"maxLeaseTimeMinutes":5,"size":"Standard","status":"Starting"}, [
  'Date',
  'Wed, 28 Apr 2021 10:39:31 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '172',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  'jKjnP6bA1kOpiXqnpO5wMw.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://sts.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/Accounts/00000000-1111-2222-3333-444455556666/token')
  .query(true)
  .reply(200, {"AccessToken":"<access_token>"}, [
  'Date',
  'Wed, 28 Apr 2021 10:39:41 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '1219',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'MS-CV',
  'AjDB0LiqL0Kn8QuOP73XFw.0',
  'X-Content-Type-Options',
  'nosniff'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/sessions/sessionId161960634870200973')
  .query(true)
  .reply(200, {"id":"sessionId161960634870200973","creationTime":"2021-04-28T10:39:09.3267695+00:00","elapsedTimeMinutes":0,"maxLeaseTimeMinutes":5,"size":"Standard","status":"Starting"}, [
  'Date',
  'Wed, 28 Apr 2021 10:39:42 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '172',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  '3MsE1bDJ/0OMC2xsjSLRWw.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://sts.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/Accounts/00000000-1111-2222-3333-444455556666/token')
  .query(true)
  .reply(200, {"AccessToken":"<access_token>"}, [
  'Date',
  'Wed, 28 Apr 2021 10:39:52 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '1219',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'MS-CV',
  '6lfBoYml4UeWZZhgz+zlTQ.0',
  'X-Content-Type-Options',
  'nosniff'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/sessions/sessionId161960634870200973')
  .query(true)
  .reply(200, {"id":"sessionId161960634870200973","creationTime":"2021-04-28T10:39:09.3267695+00:00","elapsedTimeMinutes":0,"maxLeaseTimeMinutes":5,"size":"Standard","status":"Starting"}, [
  'Date',
  'Wed, 28 Apr 2021 10:39:52 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '172',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  'P1nza97nA0+AuemQLlTW5w.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://sts.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/Accounts/00000000-1111-2222-3333-444455556666/token')
  .query(true)
  .reply(200, {"AccessToken":"<access_token>"}, [
  'Date',
  'Wed, 28 Apr 2021 10:40:02 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '1219',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'MS-CV',
  'AnMGxC8SE02A+9nIlP3gLQ.0',
  'X-Content-Type-Options',
  'nosniff'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/sessions/sessionId161960634870200973')
  .query(true)
  .reply(200, {"id":"sessionId161960634870200973","creationTime":"2021-04-28T10:39:09.3267695+00:00","elapsedTimeMinutes":0,"maxLeaseTimeMinutes":5,"size":"Standard","status":"Starting"}, [
  'Date',
  'Wed, 28 Apr 2021 10:40:03 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '172',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  'qlgPtHFBZ02gwzuRDkaOQA.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://sts.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/Accounts/00000000-1111-2222-3333-444455556666/token')
  .query(true)
  .reply(200, {"AccessToken":"<access_token>"}, [
  'Date',
  'Wed, 28 Apr 2021 10:40:13 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '1219',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'MS-CV',
  'yXYzagcjSkCqsh9wLlSByg.0',
  'X-Content-Type-Options',
  'nosniff'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/sessions/sessionId161960634870200973')
  .query(true)
  .reply(200, {"id":"sessionId161960634870200973","creationTime":"2021-04-28T10:39:09.3267695+00:00","elapsedTimeMinutes":0,"maxLeaseTimeMinutes":5,"size":"Standard","status":"Starting"}, [
  'Date',
  'Wed, 28 Apr 2021 10:40:13 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '172',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  'X3jw4CIv4U+jLDiqdzPOpg.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://sts.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/Accounts/00000000-1111-2222-3333-444455556666/token')
  .query(true)
  .reply(200, {"AccessToken":"<access_token>"}, [
  'Date',
  'Wed, 28 Apr 2021 10:40:23 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '1219',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'MS-CV',
  'tuHPLhBdy0mKqBNDSMmOzQ.0',
  'X-Content-Type-Options',
  'nosniff'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/sessions/sessionId161960634870200973')
  .query(true)
  .reply(200, {"id":"sessionId161960634870200973","creationTime":"2021-04-28T10:39:09.3267695+00:00","elapsedTimeMinutes":0,"maxLeaseTimeMinutes":5,"size":"Standard","status":"Starting"}, [
  'Date',
  'Wed, 28 Apr 2021 10:40:23 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '172',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  '48oQVxk2t0GZstRjOC5aHA.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://sts.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/Accounts/00000000-1111-2222-3333-444455556666/token')
  .query(true)
  .reply(200, {"AccessToken":"<access_token>"}, [
  'Date',
  'Wed, 28 Apr 2021 10:40:34 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '1219',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'MS-CV',
  'S9BG1kHye0KelAAfT0Sjmw.0',
  'X-Content-Type-Options',
  'nosniff'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/sessions/sessionId161960634870200973')
  .query(true)
  .reply(200, {"id":"sessionId161960634870200973","creationTime":"2021-04-28T10:39:09.3267695+00:00","elapsedTimeMinutes":0,"maxLeaseTimeMinutes":5,"size":"Standard","status":"Starting"}, [
  'Date',
  'Wed, 28 Apr 2021 10:40:34 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '172',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  'RiHcz2cIQUOtONarIR1cBQ.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://sts.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/Accounts/00000000-1111-2222-3333-444455556666/token')
  .query(true)
  .reply(200, {"AccessToken":"<access_token>"}, [
  'Date',
  'Wed, 28 Apr 2021 10:40:45 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '1219',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'MS-CV',
  'Q1NSg+1hbkmui3Gl8cZd9Q.0',
  'X-Content-Type-Options',
  'nosniff'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/sessions/sessionId161960634870200973')
  .query(true)
  .reply(200, {"id":"sessionId161960634870200973","creationTime":"2021-04-28T10:39:09.3267695+00:00","elapsedTimeMinutes":0,"maxLeaseTimeMinutes":5,"size":"Standard","status":"Starting"}, [
  'Date',
  'Wed, 28 Apr 2021 10:40:45 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '172',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  'Nxqkc0FRs0SSNEkSiS+M4g.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://sts.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/Accounts/00000000-1111-2222-3333-444455556666/token')
  .query(true)
  .reply(200, {"AccessToken":"<access_token>"}, [
  'Date',
  'Wed, 28 Apr 2021 10:40:55 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '1219',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'MS-CV',
  'c2zl70gl9k6Vht05HsP2EQ.0',
  'X-Content-Type-Options',
  'nosniff'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/sessions/sessionId161960634870200973')
  .query(true)
  .reply(200, {"id":"sessionId161960634870200973","creationTime":"2021-04-28T10:39:09.3267695+00:00","elapsedTimeMinutes":0,"maxLeaseTimeMinutes":5,"size":"Standard","status":"Starting"}, [
  'Date',
  'Wed, 28 Apr 2021 10:40:55 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '172',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  'FNdrLjB2ZUOS+712pfwJmw.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://sts.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/Accounts/00000000-1111-2222-3333-444455556666/token')
  .query(true)
  .reply(200, {"AccessToken":"<access_token>"}, [
  'Date',
  'Wed, 28 Apr 2021 10:41:05 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '1219',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'MS-CV',
  'KI3nlxN9zk+Pw9paaE2nLQ.0',
  'X-Content-Type-Options',
  'nosniff'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/sessions/sessionId161960634870200973')
  .query(true)
  .reply(200, {"id":"sessionId161960634870200973","creationTime":"2021-04-28T10:39:09.3267695+00:00","elapsedTimeMinutes":0,"maxLeaseTimeMinutes":5,"size":"Standard","status":"Starting"}, [
  'Date',
  'Wed, 28 Apr 2021 10:41:06 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '172',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  'Py1AnPSHgkyuC9x7gIv8cA.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://sts.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/Accounts/00000000-1111-2222-3333-444455556666/token')
  .query(true)
  .reply(200, {"AccessToken":"<access_token>"}, [
  'Date',
  'Wed, 28 Apr 2021 10:41:16 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '1219',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'MS-CV',
  'Q7FJoZ8e2UmBk9P2cq0+2w.0',
  'X-Content-Type-Options',
  'nosniff'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/sessions/sessionId161960634870200973')
  .query(true)
  .reply(200, {"id":"sessionId161960634870200973","creationTime":"2021-04-28T10:39:09.3267695+00:00","elapsedTimeMinutes":0,"maxLeaseTimeMinutes":5,"size":"Standard","status":"Starting"}, [
  'Date',
  'Wed, 28 Apr 2021 10:41:16 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '172',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  'I7Bh9vx7S0G9NKOGieEC+A.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://sts.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/Accounts/00000000-1111-2222-3333-444455556666/token')
  .query(true)
  .reply(200, {"AccessToken":"<access_token>"}, [
  'Date',
  'Wed, 28 Apr 2021 10:41:26 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '1219',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'MS-CV',
  'MIM+kITHI0CB06qDveZMJA.0',
  'X-Content-Type-Options',
  'nosniff'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/sessions/sessionId161960634870200973')
  .query(true)
  .reply(200, {"id":"sessionId161960634870200973","creationTime":"2021-04-28T10:39:09.3267695+00:00","elapsedTimeMinutes":0,"maxLeaseTimeMinutes":5,"size":"Standard","status":"Starting"}, [
  'Date',
  'Wed, 28 Apr 2021 10:41:27 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '172',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  'Y1PovyU4skSybXgqjxH/Qw.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://sts.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/Accounts/00000000-1111-2222-3333-444455556666/token')
  .query(true)
  .reply(200, {"AccessToken":"<access_token>"}, [
  'Date',
  'Wed, 28 Apr 2021 10:41:37 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '1219',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'MS-CV',
  'Rc07CtRwdkKzEoVumYPihA.0',
  'X-Content-Type-Options',
  'nosniff'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/sessions/sessionId161960634870200973')
  .query(true)
  .reply(200, {"id":"sessionId161960634870200973","creationTime":"2021-04-28T10:39:09.3267695+00:00","elapsedTimeMinutes":0,"maxLeaseTimeMinutes":5,"size":"Standard","status":"Starting"}, [
  'Date',
  'Wed, 28 Apr 2021 10:41:38 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '172',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  '3Vw66D+c+EWNxFPNYjb8TQ.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://sts.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/Accounts/00000000-1111-2222-3333-444455556666/token')
  .query(true)
  .reply(200, {"AccessToken":"<access_token>"}, [
  'Date',
  'Wed, 28 Apr 2021 10:41:48 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '1219',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'MS-CV',
  'FRhL3GnjM026tWqGg2Ka1A.0',
  'X-Content-Type-Options',
  'nosniff'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/sessions/sessionId161960634870200973')
  .query(true)
  .reply(200, {"id":"sessionId161960634870200973","creationTime":"2021-04-28T10:39:09.3267695+00:00","elapsedTimeMinutes":0,"maxLeaseTimeMinutes":5,"size":"Standard","status":"Starting"}, [
  'Date',
  'Wed, 28 Apr 2021 10:41:48 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '172',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  'rOI3qCR/6Uulp0UpgShlrQ.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://sts.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/Accounts/00000000-1111-2222-3333-444455556666/token')
  .query(true)
  .reply(200, {"AccessToken":"<access_token>"}, [
  'Date',
  'Wed, 28 Apr 2021 10:41:58 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '1219',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'MS-CV',
  'FGbOX+N6FEGjc4MyG+KdIg.0',
  'X-Content-Type-Options',
  'nosniff'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/sessions/sessionId161960634870200973')
  .query(true)
  .reply(200, {"id":"sessionId161960634870200973","creationTime":"2021-04-28T10:39:09.3267695+00:00","elapsedTimeMinutes":0,"maxLeaseTimeMinutes":5,"size":"Standard","status":"Starting"}, [
  'Date',
  'Wed, 28 Apr 2021 10:41:58 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '172',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  'WBwm3rihjUO3MOCcvTk6vA.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://sts.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/Accounts/00000000-1111-2222-3333-444455556666/token')
  .query(true)
  .reply(200, {"AccessToken":"<access_token>"}, [
  'Date',
  'Wed, 28 Apr 2021 10:42:10 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '1219',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'MS-CV',
  'slM//czSNEiyqufTltNetg.0',
  'X-Content-Type-Options',
  'nosniff'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/sessions/sessionId161960634870200973')
  .query(true)
  .reply(200, {"id":"sessionId161960634870200973","creationTime":"2021-04-28T10:39:09.3267695+00:00","elapsedTimeMinutes":0,"maxLeaseTimeMinutes":5,"size":"Standard","status":"Starting"}, [
  'Date',
  'Wed, 28 Apr 2021 10:42:09 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '172',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  'WGOyJgPH7UiiMgkc2s939A.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://sts.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/Accounts/00000000-1111-2222-3333-444455556666/token')
  .query(true)
  .reply(200, {"AccessToken":"<access_token>"}, [
  'Date',
  'Wed, 28 Apr 2021 10:42:19 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '1219',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'MS-CV',
  '+caM1WBCo0WhHPTQHsXpXw.0',
  'X-Content-Type-Options',
  'nosniff'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/sessions/sessionId161960634870200973')
  .query(true)
  .reply(200, {"id":"sessionId161960634870200973","creationTime":"2021-04-28T10:39:09.3267695+00:00","arrInspectorPort":57393,"handshakePort":49770,"elapsedTimeMinutes":0,"hostname":"806975667-fbc19898-ff01-4e25-8abe-1deebfd58103.remoterendering.vm.eastus2.mixedreality.azure.com","maxLeaseTimeMinutes":5,"size":"Standard","status":"Ready","teraflops":8.1}, [
  'Date',
  'Wed, 28 Apr 2021 10:42:20 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '342',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  'o3+RJDqFA0qPPdMvGr6UgQ.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://sts.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/Accounts/00000000-1111-2222-3333-444455556666/token')
  .query(true)
  .reply(200, {"AccessToken":"<access_token>"}, [
  'Date',
  'Wed, 28 Apr 2021 10:42:20 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '1219',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'MS-CV',
  '5mPb45NfJU6iopszgPkKDw.0',
  'X-Content-Type-Options',
  'nosniff'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/sessions')
  .query(true)
  .reply(200, {"sessions":[{"id":"sessionId161960634870200973","creationTime":"2021-04-28T10:39:09.3267695+00:00","arrInspectorPort":57393,"handshakePort":49770,"elapsedTimeMinutes":0,"hostname":"806975667-fbc19898-ff01-4e25-8abe-1deebfd58103.remoterendering.vm.eastus2.mixedreality.azure.com","maxLeaseTimeMinutes":5,"size":"Standard","status":"Ready","teraflops":8.1}]}, [
  'Date',
  'Wed, 28 Apr 2021 10:42:20 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '357',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  'RUQ+N7JpM0GIATpneHX8pw.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);
