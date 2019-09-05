let nock = require('nock');

module.exports.testInfo = {"share":"share156775326841704653"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775326841704653')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 07:01:08 GMT',
  'ETag',
  '"0x8D73297FE7A6A42"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1478e377-101a-0116-1d80-64ff59000000',
  'x-ms-client-request-id',
  'aaeecc5b-5331-4326-b597-320b6636c465',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 07:01:08 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775326841704653')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 07:01:09 GMT',
  'ETag',
  '"0x8D73297FEA6A880"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '15fd17c0-301a-00c5-7080-64dd66000000',
  'x-ms-client-request-id',
  '1af83a67-0ed8-494a-be93-8f494f0b1372',
  'x-ms-version',
  '2019-02-02',
  'x-ms-snapshot',
  '2019-09-06T07:01:09.0000000Z',
  'Date',
  'Fri, 06 Sep 2019 07:01:08 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156775326841704653')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 07:01:09 GMT',
  'ETag',
  '"0x8D73297FEA6A880"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28192eef-201a-0060-5a80-648b1c000000',
  'x-ms-client-request-id',
  '3e18dd9c-9119-4da2-a7c4-4476f2161447',
  'x-ms-version',
  '2019-02-02',
  'x-ms-meta-key1',
  'value1',
  'x-ms-meta-key2',
  'value2',
  'x-ms-has-immutability-policy',
  'false',
  'x-ms-has-legal-hold',
  'false',
  'x-ms-share-quota',
  '5120',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-meta-key1,x-ms-meta-key2,Last-Modified,ETag,x-ms-has-immutability-policy,x-ms-has-legal-hold,x-ms-share-quota,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 06 Sep 2019 07:01:09 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156775326841704653')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 07:01:08 GMT',
  'ETag',
  '"0x8D73297FE7A6A42"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '64d1b33f-101a-00fd-1380-6479a6000000',
  'x-ms-client-request-id',
  '80e24179-6965-47f2-9b66-907e9b62708e',
  'x-ms-version',
  '2019-02-02',
  'x-ms-has-immutability-policy',
  'false',
  'x-ms-has-legal-hold',
  'false',
  'x-ms-share-quota',
  '5120',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-has-immutability-policy,x-ms-has-legal-hold,x-ms-share-quota,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 06 Sep 2019 07:01:09 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156775326841704653')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2ec44aa6-301a-00fa-6e80-6415c5000000',
  'x-ms-client-request-id',
  '19c031c5-d4d0-420a-b953-a24a76b759de',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 07:01:10 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156775326841704653')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6c04c561-101a-0044-3180-647dbc000000',
  'x-ms-client-request-id',
  'a4b4c17a-0f33-4a48-a885-076cf1c973a7',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 07:01:10 GMT',
  'Connection',
  'close' ]);

