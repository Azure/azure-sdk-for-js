let nock = require('nock');

module.exports.hash = "cc3eafa7d059c242843f7ace3df680ad";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem158377020780706732"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158377020780706732')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 09 Mar 2020 16:10:08 GMT',
  'ETag',
  '"0x8D7C444565E44C6"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b89919ce-001e-0069-782d-f61a32000000',
  'x-ms-client-request-id',
  '331b4bc7-b205-469b-afc0-cd064109cc0c',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 09 Mar 2020 16:10:07 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem158377020780706732')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 09 Mar 2020 16:10:08 GMT',
  'ETag',
  '"0x8D7C444565E44C6"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b8991a39-001e-0069-572d-f61a32000000',
  'x-ms-client-request-id',
  '8ff1f758-cea1-445a-9d61-683062cc0b37',
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
  'Mon, 09 Mar 2020 16:10:07 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem158377020780706732')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b8991a82-001e-0069-172d-f61a32000000',
  'x-ms-client-request-id',
  'f5d66c4f-6056-4da2-88ff-00afaceda3d7',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 09 Mar 2020 16:10:07 GMT'
]);
