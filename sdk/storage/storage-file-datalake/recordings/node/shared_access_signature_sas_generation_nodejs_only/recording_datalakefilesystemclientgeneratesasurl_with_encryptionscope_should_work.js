let nock = require('nock');

module.exports.hash = "9234089334dad3d94ae0c1376e8c7b79";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem169154753817701095","file":"file169154753844702182","dir":"dir169154753859003890"},"newDate":{"now":"2023-08-09T02:18:58.443Z","tmr":"2023-08-09T02:18:58.443Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154753817701095')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:57 GMT',
  'ETag',
  '"0x8DB987EFCBC2F55"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c27367-101e-002e-4567-caab16000000',
  'x-ms-client-request-id',
  '6db3eb8b-686d-4d97-b259-57bf6458ae66',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:18:56 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem169154753817701095')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:57 GMT',
  'ETag',
  '"0x8DB987EFCBC2F55"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c2736f-101e-002e-4a67-caab16000000',
  'x-ms-client-request-id',
  'f0f284d4-0ed1-45d2-b250-018e0ef27829',
  'x-ms-version',
  '2023-08-03',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-has-immutability-policy',
  'false',
  'x-ms-has-legal-hold',
  'false',
  'x-ms-immutable-storage-with-versioning-enabled',
  'false',
  'x-ms-default-encryption-scope',
  'test1',
  'x-ms-deny-encryption-scope-override',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-lease-status,x-ms-lease-state,x-ms-has-immutability-policy,x-ms-has-legal-hold,x-ms-immutable-storage-with-versioning-enabled,x-ms-default-encryption-scope,x-ms-deny-encryption-scope-override,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 09 Aug 2023 02:18:56 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154753817701095/file169154753844702182')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:57 GMT',
  'ETag',
  '"0x8DB987EFCE72EEA"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-scope',
  'test1',
  'x-ms-request-id',
  'f16745df-f01f-0054-6667-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '711647d1-97e1-41f0-b82f-445d814c4179',
  'Date',
  'Wed, 09 Aug 2023 02:18:57 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154753817701095/dir169154753859003890')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:58 GMT',
  'ETag',
  '"0x8DB987EFCFBF80C"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-scope',
  'test1',
  'x-ms-request-id',
  'f16745e9-f01f-0054-7067-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '09ac4d3c-152b-470c-be03-8d3752c34d2d',
  'Date',
  'Wed, 09 Aug 2023 02:18:57 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem169154753817701095')
  .query(true)
  .reply(200, {"paths":[{"EncryptionScope":"test1","contentLength":"0","creationTime":"133360211380729868","etag":"0x8DB987EFCFBF80C","expiryTime":"0","group":"$superuser","lastModified":"Wed, 09 Aug 2023 02:18:58 GMT","name":"dir169154753859003890","owner":"$superuser","permissions":"rw-r-----"},{"EncryptionScope":"test1","contentLength":"0","creationTime":"133360211379367658","etag":"0x8DB987EFCE72EEA","expiryTime":"0","group":"$superuser","lastModified":"Wed, 09 Aug 2023 02:18:57 GMT","name":"file169154753844702182","owner":"$superuser","permissions":"rw-r-----"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f16745f6-f01f-0054-7d67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '8dce9e87-1d05-4a64-8d11-87fe85e77aba',
  'Access-Control-Expose-Headers',
  'Content-Length,Content-Type,Date,Server,Transfer-Encoding,x-ms-client-request-id,x-ms-request-id,x-ms-version',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 09 Aug 2023 02:18:57 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154753817701095/file169154753844702182')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211383364527',
  'x-ms-request-id',
  'f1674600-f01f-0054-0767-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '42f0004d-d361-4fe2-998c-8355927a2c30',
  'Date',
  'Wed, 09 Aug 2023 02:18:57 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154753817701095/dir169154753859003890')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211384822584',
  'x-ms-request-id',
  'f1674609-f01f-0054-1067-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '584ee6f5-dfc9-44cd-b528-d2fa0b610e46',
  'Date',
  'Wed, 09 Aug 2023 02:18:57 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154753817701095')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c273ab-101e-002e-7967-caab16000000',
  'x-ms-client-request-id',
  'f913353a-2a5e-472c-8711-e80234d45d9f',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:18:57 GMT'
]);
