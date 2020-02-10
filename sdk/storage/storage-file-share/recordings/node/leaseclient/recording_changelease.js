let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"share":"share157613031758602323","dir":"dir157613031872906791","file":"file157613031987907500"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613031758602323')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:58:38 GMT',
  'ETag',
  '"0x8D77EC8555A27C2"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c0ead181-d01a-003a-02b1-b08843000000',
  'x-ms-client-request-id',
  'e57c312f-b883-4b61-8a79-bb7b2514a2dd',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 12 Dec 2019 05:58:38 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613031758602323/dir157613031872906791')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:58:39 GMT',
  'ETag',
  '"0x8D77EC8560A90C2"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '51d744c8-001a-0029-31b1-b0ac4f000000',
  'x-ms-client-request-id',
  'be6de494-0a8a-452b-ac8e-ff11aeb1715e',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-12-12T05:58:39.8306498Z',
  'x-ms-file-last-write-time',
  '2019-12-12T05:58:39.8306498Z',
  'x-ms-file-creation-time',
  '2019-12-12T05:58:39.8306498Z',
  'x-ms-file-permission-key',
  '7008756509702647153*693339914461510392',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 12 Dec 2019 05:58:39 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613031758602323/dir157613031872906791/file157613031987907500')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:59:02 GMT',
  'ETag',
  '"0x8D77EC8635D6255"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '51d744de-001a-0029-36b1-b0ac4f000000',
  'x-ms-client-request-id',
  'f91ae64a-257d-4c26-a83a-331c797c54b5',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-12-12T05:59:02.1837909Z',
  'x-ms-file-last-write-time',
  '2019-12-12T05:59:02.1837909Z',
  'x-ms-file-creation-time',
  '2019-12-12T05:59:02.1837909Z',
  'x-ms-file-permission-key',
  '11619239463300764278*693339914461510392',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 12 Dec 2019 05:59:02 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613031758602323/dir157613031872906791/file157613031987907500')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:59:02 GMT',
  'ETag',
  '"0x8D77EC8635D6255"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '202d6bf2-f01a-002d-7bb1-b02148000000',
  'x-ms-client-request-id',
  'b7ce3c2f-bbb6-4938-b206-5067eefc58b4',
  'x-ms-version',
  '2019-02-02',
  'x-ms-lease-id',
  'ea480a95-6e69-4679-87b0-56ea30c9258e',
  'Date',
  'Thu, 12 Dec 2019 05:59:02 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613031758602323/dir157613031872906791/file157613031987907500')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:59:02 GMT',
  'ETag',
  '"0x8D77EC8635D6255"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '202d6bf6-f01a-002d-7cb1-b02148000000',
  'x-ms-client-request-id',
  '12369a1a-4b80-48ad-815d-d03176e8c8b6',
  'x-ms-version',
  '2019-02-02',
  'x-ms-lease-id',
  'e9890485-bf47-4d9a-b3d0-aceb18506124',
  'Date',
  'Thu, 12 Dec 2019 05:59:02 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share157613031758602323')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c0ead1df-d01a-003a-3eb1-b08843000000',
  'x-ms-client-request-id',
  'afb7476f-f7d6-4e4d-b7ad-0b2ac2bb178b',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 12 Dec 2019 05:59:03 GMT'
]);
