let nock = require('nock');

module.exports.hash = "f7e2a3193ccd087efc251d8d2779f552";

module.exports.testInfo = {"uniqueName":{"container":"container160988696990402216"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160988696990402216')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 05 Jan 2021 22:49:30 GMT',
  'ETag',
  '"0x8D8B1CC298ED573"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '706057ff-601e-00b5-0cb5-e37e64000000',
  'x-ms-client-request-id',
  '2a2d31cb-222e-4dbe-8e57-72c9b2703ba6',
  'x-ms-version',
  '2020-04-08',
  'Date',
  'Tue, 05 Jan 2021 22:49:29 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160988696990402216')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 05 Jan 2021 22:49:30 GMT',
  'ETag',
  '"0x8D8B1CC29BBF171"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0ff0ef10-501e-00bd-52b5-e36517000000',
  'x-ms-client-request-id',
  'bdcbc6a9-7631-441f-a90d-a725793a4481',
  'x-ms-version',
  '2020-04-08',
  'Date',
  'Tue, 05 Jan 2021 22:49:30 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container160988696990402216')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 05 Jan 2021 22:49:30 GMT',
  'ETag',
  '"0x8D8B1CC29BBF171"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '53b71d5b-801e-005a-6cb5-e3751a000000',
  'x-ms-client-request-id',
  'bbdac8f2-5d5f-488b-ae5f-8515d7417b25',
  'x-ms-version',
  '2020-04-08',
  'x-ms-meta-key0',
  'val0',
  'x-ms-meta-keya',
  'vala',
  'x-ms-meta-keyb',
  'valb',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-has-immutability-policy',
  'false',
  'x-ms-has-legal-hold',
  'false',
  'x-ms-default-encryption-scope',
  '$account-encryption-key',
  'x-ms-deny-encryption-scope-override',
  'false',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-meta-key0,x-ms-meta-keya,x-ms-meta-keyb,Last-Modified,ETag,x-ms-lease-status,x-ms-lease-state,x-ms-has-immutability-policy,x-ms-has-legal-hold,x-ms-default-encryption-scope,x-ms-deny-encryption-scope-override,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 05 Jan 2021 22:49:29 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container160988696990402216')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f3342c01-201e-0057-53b5-e39a16000000',
  'x-ms-client-request-id',
  '2e3b2555-0101-47fa-ab10-8558a931bd08',
  'x-ms-version',
  '2020-04-08',
  'Date',
  'Tue, 05 Jan 2021 22:49:30 GMT',
  'Connection',
  'close'
]);
