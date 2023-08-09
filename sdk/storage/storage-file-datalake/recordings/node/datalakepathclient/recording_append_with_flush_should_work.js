let nock = require('nock');

module.exports.hash = "7c5eaaa7032a0ec6b25fdd08849e5250";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem169154757987702959","file":"file169154758001201199","tempfile2":"tempfile2169154758041906407"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154757987702959')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 09 Aug 2023 02:19:39 GMT',
  'ETag',
  '"0x8DB987F15973EF6"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c282ea-101e-002e-7467-caab16000000',
  'x-ms-client-request-id',
  'f4787c6c-5807-4efd-bb3d-45a4271845b7',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:19:38 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154757987702959/file169154758001201199')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:19:39 GMT',
  'ETag',
  '"0x8DB987F15AD14B2"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1674a8b-f01f-0054-3c67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '2bc74e6e-a81b-4869-a591-433172bcacfb',
  'Date',
  'Wed, 09 Aug 2023 02:19:38 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem169154757987702959/file169154758001201199', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1674aaa-f01f-0054-5b67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'c997ed5f-615c-44d2-aef6-54132fb6b536',
  'Date',
  'Wed, 09 Aug 2023 02:19:38 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem169154757987702959/file169154758001201199')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:19:39 GMT',
  'ETag',
  '"0x8DB987F15D74880"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  'f1674abc-f01f-0054-6d67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'aed71f8b-c4d2-4dec-8b2e-45acba11d256',
  'Date',
  'Wed, 09 Aug 2023 02:19:38 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154757987702959/tempfile2169154758041906407')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:19:39 GMT',
  'ETag',
  '"0x8DB987F15EAF18A"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1674ac9-f01f-0054-7a67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '4e729229-2438-436e-9987-d996fe76a046',
  'Date',
  'Wed, 09 Aug 2023 02:19:39 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem169154757987702959/tempfile2169154758041906407', "HelloWorld")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1674ade-f01f-0054-0e67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '1250697c-d6ff-49d9-806a-302180b55354',
  'Date',
  'Wed, 09 Aug 2023 02:19:39 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem169154757987702959/tempfile2169154758041906407', "HelloWorld")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1674af2-f01f-0054-2267-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '09e1726e-960e-4411-b45f-885de2b999b1',
  'Date',
  'Wed, 09 Aug 2023 02:19:39 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem169154757987702959/tempfile2169154758041906407', "HelloWorld")
  .query(true)
  .reply(202, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:19:40 GMT',
  'ETag',
  '"0x8DB987F1624CC18"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1674b00-f01f-0054-3067-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '85eff0d1-ac0a-4cf7-91bf-5db95a9ff0ac',
  'Date',
  'Wed, 09 Aug 2023 02:19:39 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem169154757987702959/tempfile2169154758041906407')
  .reply(200, "", [
  'Content-Length',
  '30',
  'Content-Type',
  'application/json',
  'Last-Modified',
  'Wed, 09 Aug 2023 02:19:40 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DB987F1624CC18"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c28344-101e-002e-3f67-caab16000000',
  'x-ms-client-request-id',
  'e5ea416e-7021-4a0f-a0be-a89c1ffbcc7b',
  'x-ms-version',
  '2023-08-03',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Wed, 09 Aug 2023 02:19:39 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rw-r-----',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 09 Aug 2023 02:19:39 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154757987702959/tempfile2169154758041906407')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211805393364',
  'x-ms-request-id',
  'f1674b1d-f01f-0054-4d67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '35a834be-d721-4a03-a547-c10cc132f5b9',
  'Date',
  'Wed, 09 Aug 2023 02:19:39 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154757987702959')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c28361-101e-002e-5b67-caab16000000',
  'x-ms-client-request-id',
  'cc4f2efe-f791-48f5-84c0-17cee4e65b45',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:19:39 GMT'
]);
