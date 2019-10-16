let nock = require('nock');

module.exports.testInfo = {"container":"container157113272482302486","directory":"directory157113272597108089"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157113272482302486')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 15 Oct 2019 09:40:31 GMT',
  'ETag',
  '"0x8D75153B847F573"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '62fdba81-301e-0061-2d3c-830141000000',
  'x-ms-client-request-id',
  '1a5aef29-7352-45f8-bdab-92bcf8792356',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 15 Oct 2019 09:40:30 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157113272482302486/directory157113272597108089')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 15 Oct 2019 09:40:32 GMT',
  'ETag',
  '"0x8D75153B8F8A523"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9e21efbb-f01f-005e-3b3c-83b69d000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '8262e35d-5497-473b-9dd8-687227652950',
  'Date',
  'Tue, 15 Oct 2019 09:40:31 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/container157113272482302486/directory157113272597108089')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 15 Oct 2019 09:40:32 GMT',
  'ETag',
  '"0x8D75153B8F8A523"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-request-id',
  '1185cab4-901f-004e-5f3c-83807b000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'b33859be-5f12-4e06-8579-221f970c6e8a',
  'Date',
  'Tue, 15 Oct 2019 09:40:33 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container157113272482302486/directory157113272597108089')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 15 Oct 2019 09:40:32 GMT',
  'ETag',
  '"0x8D75153B8F8A523"',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rwxr-x-w-',
  'x-ms-acl',
  'user::rwx,group::r-x,other::-w-',
  'x-ms-request-id',
  '92c792c4-b01f-0016-4e3c-838400000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '82b9de73-ed1b-4dd6-b35b-95df04f1eb10',
  'Date',
  'Tue, 15 Oct 2019 09:40:34 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157113272482302486')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '86dcf2ca-c01e-007f-123c-83dbac000000',
  'x-ms-client-request-id',
  'e1f1495d-abce-4a7f-8e2f-8fd35a3f6331',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 15 Oct 2019 09:40:35 GMT',
  'Connection',
  'close' ]);

