let nock = require('nock');

module.exports.hash = "59dc56d581f29cf0fcaa83f3b65df716";

module.exports.testInfo = {"uniqueName":{"sessionId":"sessionId161979097167408229"},"newDate":{}}

nock('https://sts.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/Accounts/00000000-1111-2222-3333-444455556666/token')
  .query(true)
  .reply(200, {"AccessToken":"<access_token>"}, [
  'Date',
  'Fri, 30 Apr 2021 13:56:11 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '1219',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'MS-CV',
  'vXR/gAFVj02ORvDecWA1FA.0',
  'X-Content-Type-Options',
  'nosniff'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .put('/accounts/00000000-1111-2222-3333-444455556666/sessions/sessionId161979097167408229', {"maxLeaseTimeMinutes":4,"size":"Standard"})
  .query(true)
  .reply(201, {"id":"sessionId161979097167408229","creationTime":"2021-04-30T13:56:11.8791406+00:00","elapsedTimeMinutes":0,"maxLeaseTimeMinutes":4,"size":"Standard","status":"Starting"}, [
  'Date',
  'Fri, 30 Apr 2021 13:56:11 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '172',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  '0sI8DtToI0K+iOWs5vFajA.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/sessions/sessionId161979097167408229')
  .query(true)
  .reply(200, {"id":"sessionId161979097167408229","creationTime":"2021-04-30T13:56:11.8791406+00:00","elapsedTimeMinutes":0,"maxLeaseTimeMinutes":4,"size":"Standard","status":"Starting"}, [
  'Date',
  'Fri, 30 Apr 2021 13:56:12 GMT',
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
  'pBVIYG5o2kidN3qUEKjMdA.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/sessions/sessionId161979097167408229')
  .query(true)
  .reply(200, {"id":"sessionId161979097167408229","creationTime":"2021-04-30T13:56:11.8791406+00:00","elapsedTimeMinutes":0,"maxLeaseTimeMinutes":4,"size":"Standard","status":"Starting"}, [
  'Date',
  'Fri, 30 Apr 2021 13:56:12 GMT',
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
  'cm887N/goky3n0shVEumPg.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/sessions/sessionId161979097167408229')
  .query(true)
  .reply(200, {"id":"sessionId161979097167408229","creationTime":"2021-04-30T13:56:11.8791406+00:00","elapsedTimeMinutes":0,"maxLeaseTimeMinutes":4,"size":"Standard","status":"Starting"}, [
  'Date',
  'Fri, 30 Apr 2021 13:56:12 GMT',
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
  '9eCbKHNDw0ODTsGTjfT8Fg.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .patch('/accounts/00000000-1111-2222-3333-444455556666/sessions/sessionId161979097167408229', {"maxLeaseTimeMinutes":5})
  .query(true)
  .reply(200, {"id":"sessionId161979097167408229","creationTime":"2021-04-30T13:56:11.8791406+00:00","elapsedTimeMinutes":0,"maxLeaseTimeMinutes":5,"size":"Standard","status":"Starting"}, [
  'Date',
  'Fri, 30 Apr 2021 13:56:12 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '172',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  'HibzctpnSE+3PMK3cQzPHA.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/sessions/sessionId161979097167408229')
  .query(true)
  .reply(200, {"id":"sessionId161979097167408229","creationTime":"2021-04-30T13:56:11.8791406+00:00","elapsedTimeMinutes":0,"maxLeaseTimeMinutes":5,"size":"Standard","status":"Starting"}, [
  'Date',
  'Fri, 30 Apr 2021 13:56:12 GMT',
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
  'KeuayG8Q7km9hv8NKKqSGQ.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/sessions/sessionId161979097167408229')
  .query(true)
  .reply(200, {"id":"sessionId161979097167408229","creationTime":"2021-04-30T13:56:11.8791406+00:00","elapsedTimeMinutes":0,"maxLeaseTimeMinutes":5,"size":"Standard","status":"Starting"}, [
  'Date',
  'Fri, 30 Apr 2021 13:56:22 GMT',
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
  'I04dzdcILk2wrE/+841t/A.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/sessions/sessionId161979097167408229')
  .query(true)
  .reply(200, {"id":"sessionId161979097167408229","creationTime":"2021-04-30T13:56:11.8791406+00:00","elapsedTimeMinutes":0,"maxLeaseTimeMinutes":5,"size":"Standard","status":"Starting"}, [
  'Date',
  'Fri, 30 Apr 2021 13:56:32 GMT',
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
  'CzrrJMSJrEuQgXpvdB3H9w.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/sessions/sessionId161979097167408229')
  .query(true)
  .reply(200, {"id":"sessionId161979097167408229","creationTime":"2021-04-30T13:56:11.8791406+00:00","elapsedTimeMinutes":0,"maxLeaseTimeMinutes":5,"size":"Standard","status":"Starting"}, [
  'Date',
  'Fri, 30 Apr 2021 13:56:42 GMT',
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
  'MmX2Wdvzd0GwcE1xlfg16Q.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/sessions/sessionId161979097167408229')
  .query(true)
  .reply(200, {"id":"sessionId161979097167408229","creationTime":"2021-04-30T13:56:11.8791406+00:00","elapsedTimeMinutes":0,"maxLeaseTimeMinutes":5,"size":"Standard","status":"Starting"}, [
  'Date',
  'Fri, 30 Apr 2021 13:56:53 GMT',
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
  'V8wX2OCmlkq61l4dGnaGEQ.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/sessions/sessionId161979097167408229')
  .query(true)
  .reply(200, {"id":"sessionId161979097167408229","creationTime":"2021-04-30T13:56:11.8791406+00:00","elapsedTimeMinutes":0,"maxLeaseTimeMinutes":5,"size":"Standard","status":"Starting"}, [
  'Date',
  'Fri, 30 Apr 2021 13:57:03 GMT',
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
  'McmptrshR06TAyCt1mr+/Q.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/sessions/sessionId161979097167408229')
  .query(true)
  .reply(200, {"id":"sessionId161979097167408229","creationTime":"2021-04-30T13:56:11.8791406+00:00","elapsedTimeMinutes":0,"maxLeaseTimeMinutes":5,"size":"Standard","status":"Starting"}, [
  'Date',
  'Fri, 30 Apr 2021 13:57:13 GMT',
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
  'EnOURUR6pEu0RIuabY91Sw.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/sessions/sessionId161979097167408229')
  .query(true)
  .reply(200, {"id":"sessionId161979097167408229","creationTime":"2021-04-30T13:56:11.8791406+00:00","elapsedTimeMinutes":0,"maxLeaseTimeMinutes":5,"size":"Standard","status":"Starting"}, [
  'Date',
  'Fri, 30 Apr 2021 13:57:23 GMT',
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
  'gyTS5Ci1e0Gz1j8YqFQchA.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/sessions/sessionId161979097167408229')
  .query(true)
  .reply(200, {"id":"sessionId161979097167408229","creationTime":"2021-04-30T13:56:11.8791406+00:00","elapsedTimeMinutes":0,"maxLeaseTimeMinutes":5,"size":"Standard","status":"Starting"}, [
  'Date',
  'Fri, 30 Apr 2021 13:57:33 GMT',
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
  'j122CmvbpEmpZcEBAp1asg.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/sessions/sessionId161979097167408229')
  .query(true)
  .reply(200, {"id":"sessionId161979097167408229","creationTime":"2021-04-30T13:56:11.8791406+00:00","elapsedTimeMinutes":0,"maxLeaseTimeMinutes":5,"size":"Standard","status":"Starting"}, [
  'Date',
  'Fri, 30 Apr 2021 13:57:44 GMT',
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
  '+lJt+RuQF0i65rRTQNlShg.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/sessions/sessionId161979097167408229')
  .query(true)
  .reply(200, {"id":"sessionId161979097167408229","creationTime":"2021-04-30T13:56:11.8791406+00:00","elapsedTimeMinutes":0,"maxLeaseTimeMinutes":5,"size":"Standard","status":"Starting"}, [
  'Date',
  'Fri, 30 Apr 2021 13:57:54 GMT',
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
  'XI1f1ryJ5UKvvAqnJ//okw.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/sessions/sessionId161979097167408229')
  .query(true)
  .reply(200, {"id":"sessionId161979097167408229","creationTime":"2021-04-30T13:56:11.8791406+00:00","elapsedTimeMinutes":0,"maxLeaseTimeMinutes":5,"size":"Standard","status":"Starting"}, [
  'Date',
  'Fri, 30 Apr 2021 13:58:04 GMT',
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
  'AaTesu8qT0qVnYkcBXpoQQ.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/sessions/sessionId161979097167408229')
  .query(true)
  .reply(200, {"id":"sessionId161979097167408229","creationTime":"2021-04-30T13:56:11.8791406+00:00","elapsedTimeMinutes":0,"maxLeaseTimeMinutes":5,"size":"Standard","status":"Starting"}, [
  'Date',
  'Fri, 30 Apr 2021 13:58:14 GMT',
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
  '6fLDKLNGnkSvW8lP2wILjQ.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/sessions/sessionId161979097167408229')
  .query(true)
  .reply(200, {"id":"sessionId161979097167408229","creationTime":"2021-04-30T13:56:11.8791406+00:00","elapsedTimeMinutes":0,"maxLeaseTimeMinutes":5,"size":"Standard","status":"Starting"}, [
  'Date',
  'Fri, 30 Apr 2021 13:58:24 GMT',
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
  'TLj9CZlbIUW0qtDsY18bqw.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/sessions/sessionId161979097167408229')
  .query(true)
  .reply(200, {"id":"sessionId161979097167408229","creationTime":"2021-04-30T13:56:11.8791406+00:00","elapsedTimeMinutes":0,"maxLeaseTimeMinutes":5,"size":"Standard","status":"Starting"}, [
  'Date',
  'Fri, 30 Apr 2021 13:58:34 GMT',
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
  '2jZqrGc6rUKajHlz5wHFSQ.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/sessions/sessionId161979097167408229')
  .query(true)
  .reply(200, {"id":"sessionId161979097167408229","creationTime":"2021-04-30T13:56:11.8791406+00:00","elapsedTimeMinutes":0,"maxLeaseTimeMinutes":5,"size":"Standard","status":"Starting"}, [
  'Date',
  'Fri, 30 Apr 2021 13:58:44 GMT',
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
  'tdsHPjSeRUSh7mJPUKQNaw.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/sessions/sessionId161979097167408229')
  .query(true)
  .reply(200, {"id":"sessionId161979097167408229","creationTime":"2021-04-30T13:56:11.8791406+00:00","elapsedTimeMinutes":0,"maxLeaseTimeMinutes":5,"size":"Standard","status":"Starting"}, [
  'Date',
  'Fri, 30 Apr 2021 13:58:55 GMT',
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
  'pCQaLUZNU0yC2EbDmHsJGA.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/sessions/sessionId161979097167408229')
  .query(true)
  .reply(200, {"id":"sessionId161979097167408229","creationTime":"2021-04-30T13:56:11.8791406+00:00","arrInspectorPort":56477,"handshakePort":59875,"elapsedTimeMinutes":0,"hostname":"1603318822-ad45142f-ccc1-4a0d-ad63-760f0b6ec7c7.remoterendering.vm.eastus2.mixedreality.azure.com","maxLeaseTimeMinutes":5,"size":"Standard","status":"Ready","teraflops":8.1}, [
  'Date',
  'Fri, 30 Apr 2021 13:59:05 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '343',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  'ECmH8fcKT0O0dS1Yl1tQVA.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/sessions')
  .query(true)
  .reply(200, {"sessions":[{"id":"sessionId161979097167408229","creationTime":"2021-04-30T13:56:11.8791406+00:00","arrInspectorPort":56477,"handshakePort":59875,"elapsedTimeMinutes":0,"hostname":"1603318822-ad45142f-ccc1-4a0d-ad63-760f0b6ec7c7.remoterendering.vm.eastus2.mixedreality.azure.com","maxLeaseTimeMinutes":5,"size":"Standard","status":"Ready","teraflops":8.1}]}, [
  'Date',
  'Fri, 30 Apr 2021 13:59:05 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '358',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  '9NDXIt6xG0mjXnmNnqvNRw.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);
