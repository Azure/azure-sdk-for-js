let nock = require('nock');

module.exports.hash = "cc3eafa7d059c242843f7ace3df680ad";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem158350663469104481"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158350663469104481')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Mar 2020 14:57:25 GMT',
  'ETag',
  '"0x8D7C1DEAEC280D1"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '009f12ca-001e-0087-1ec7-f310b1000000',
  'x-ms-client-request-id',
  '59e70a75-5662-4c9b-a48b-b2f636741b3e',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Fri, 06 Mar 2020 14:57:25 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem158350663469104481')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Mar 2020 14:57:25 GMT',
  'ETag',
  '"0x8D7C1DEAEC280D1"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '009f13ad-001e-0087-6ac7-f310b1000000',
  'x-ms-client-request-id',
  '42bddedb-76e9-4103-bfb6-a0166204f9c3',
  'x-ms-version',
  '2019-07-07',
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
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-lease-status,x-ms-lease-state,x-ms-has-immutability-policy,x-ms-has-legal-hold,x-ms-default-encryption-scope,x-ms-deny-encryption-scope-override,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 06 Mar 2020 14:57:25 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem158350663469104481')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '009f1ae6-001e-0087-66c7-f310b1000000',
  'x-ms-client-request-id',
  '0310e358-9fea-4a3a-9f57-eabd728ade97',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Fri, 06 Mar 2020 14:57:29 GMT'
]);
