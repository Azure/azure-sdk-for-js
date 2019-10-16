let nock = require('nock');

module.exports.testInfo = {"container":"container157113293062309995","directory":"directory157113293190608299"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157113293062309995')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 15 Oct 2019 09:43:57 GMT',
  'ETag',
  '"0x8D7515432F4B736"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'afd9cd31-701e-0022-693d-832ba8000000',
  'x-ms-client-request-id',
  '7ecb80cf-8ff8-4d30-9c73-5e00d84f1c08',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 15 Oct 2019 09:43:56 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157113293062309995/directory157113293190608299')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 15 Oct 2019 09:43:58 GMT',
  'ETag',
  '"0x8D7515433B7F441"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b42079f6-d01f-006b-5b3d-8318c8000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '254e7cb9-6605-46f5-b454-269b13136c12',
  'Date',
  'Tue, 15 Oct 2019 09:43:57 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157113293062309995/directory157113293190608299')
  .query(true)
  .reply(200, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c861ce82-e01f-0027-483d-83dfd7000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '3fa41aa9-4dc3-4d27-9d63-d31ef810a61b',
  'Date',
  'Tue, 15 Oct 2019 09:43:58 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157113293062309995')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '63a4ab89-901e-0082-7e3d-83e4ce000000',
  'x-ms-client-request-id',
  '53c4ca7a-5e99-4616-bd95-97973c347850',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 15 Oct 2019 09:44:00 GMT',
  'Connection',
  'close' ]);

