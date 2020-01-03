let nock = require('nock');

module.exports.testInfo = {"share":"share156816845755406737","share156816845755406737":"share156816845755406737156816845797401917"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816845755406737')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:57 GMT',
  'ETag',
  '"0x8D7365EAE8575C7"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '388cf6ca-a01a-0034-0347-68c954000000',
  'x-ms-client-request-id',
  '1597979a-3b31-4e40-9a16-b21fa7a4b6dd',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:57 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816845755406737156816845797401917')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:58 GMT',
  'ETag',
  '"0x8D7365EAEC5C234"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7d85110b-301a-005c-2547-689705000000',
  'x-ms-client-request-id',
  '1f350f9f-09e2-486d-ba11-b5f893cc311c',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:57 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156816845755406737156816845797401917')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:58 GMT',
  'ETag',
  '"0x8D7365EAEC5C234"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8a9446be-201a-002e-6347-68e63b000000',
  'x-ms-client-request-id',
  '80cbf1ac-6726-407e-b390-f65cf1e31554',
  'x-ms-version',
  '2019-02-02',
  'x-ms-meta-key',
  'value',
  'x-ms-has-immutability-policy',
  'false',
  'x-ms-has-legal-hold',
  'false',
  'x-ms-share-quota',
  '5120',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-meta-key,Last-Modified,ETag,x-ms-has-immutability-policy,x-ms-has-legal-hold,x-ms-share-quota,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:20:58 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816845755406737')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a53a29bd-501a-004c-5947-68a1e3000000',
  'x-ms-client-request-id',
  'bb16de1f-32ea-4b14-9f49-26b8e6f6e1a4',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:59 GMT' ]);

