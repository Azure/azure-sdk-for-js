let nock = require('nock');

module.exports.testInfo = {"container":"container157169653075906820","blob":"blob157169653083103625","dest-container":"dest-container157169653089702958","copiedblob":"copiedblob157169653095006793"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157169653075906820')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 21 Oct 2019 22:22:10 GMT',
  'ETag',
  '"0x8D756751DCF8032"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3afe1e31-f01e-007e-2c5d-88c3b3000000',
  'x-ms-client-request-id',
  'fd5db50e-6a35-4ffd-a7d8-d5048d1f4871',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Mon, 21 Oct 2019 22:22:09 GMT',
  'Connection',
  'close'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157169653075906820/blob157169653083103625', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 21 Oct 2019 22:22:10 GMT',
  'ETag',
  '"0x8D756751DD919A0"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6bed1819-901e-0025-1f5d-88fa88000000',
  'x-ms-client-request-id',
  'f94500d9-6efb-408e-9dec-13a0012d4fb5',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 21 Oct 2019 22:22:10 GMT',
  'Connection',
  'close'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/dest-container157169653089702958')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 21 Oct 2019 22:22:10 GMT',
  'ETag',
  '"0x8D756751DE3D127"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e7168602-e01e-0096-435d-885a25000000',
  'x-ms-client-request-id',
  '2812a5f2-29b6-4f0a-a86b-d9b2741b9b22',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Mon, 21 Oct 2019 22:22:10 GMT',
  'Connection',
  'close'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/dest-container157169653089702958/copiedblob157169653095006793')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 21 Oct 2019 22:22:11 GMT',
  'ETag',
  '"0x8D756751E223E22"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '44af8554-c01e-0017-265d-88faff000000',
  'x-ms-client-request-id',
  'b798fcc9-ae00-46c0-9918-6ff01ff9d76b',
  'x-ms-version',
  '2019-02-02',
  'x-ms-copy-id',
  'fe1f9d92-c9ba-49e5-bdca-1038779468bb',
  'x-ms-copy-status',
  'pending',
  'Date',
  'Mon, 21 Oct 2019 22:22:10 GMT',
  'Connection',
  'close'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/dest-container157169653089702958/copiedblob157169653095006793')
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e017f594-701e-0060-445d-882f6b000000',
  'x-ms-client-request-id',
  'a815262e-bd05-48ef-8231-effdf6d7ba13',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Mon, 21 Oct 2019 22:22:10 GMT',
  'Connection',
  'close'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157169653075906820')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0c0544a2-001e-006a-755d-888bdc000000',
  'x-ms-client-request-id',
  'fdf5490d-6f7f-444a-8edc-bf78cd17d586',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Mon, 21 Oct 2019 22:22:11 GMT',
  'Connection',
  'close'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157169653075906820')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '81f71552-e01e-002f-615d-885e3f000000',
  'x-ms-client-request-id',
  'f357b7d4-abb6-48ba-b3df-18d8afd20d74',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Mon, 21 Oct 2019 22:22:11 GMT',
  'Connection',
  'close'
]);

