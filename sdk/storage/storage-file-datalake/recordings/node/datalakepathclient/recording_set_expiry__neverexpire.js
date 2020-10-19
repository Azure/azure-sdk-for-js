let nock = require('nock');

module.exports.hash = "4a4fed79044d292913f1861b636c5f4a";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem159239943150501028","file":"file159239943296504342"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159239943150501028')
  .query(true)
  .reply(201, "", [
  'content-length',
  '0',
  'last-modified',
  'Wed, 17 Jun 2020 13:10:32 GMT',
  'etag',
  '"0x8D812BFD107142D"',
  'server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4a588ac5-c01e-005c-4ea8-4470f1000000',
  'x-ms-client-request-id',
  '944452a5-b237-40bf-8b1c-7d2cbc4608e8',
  'x-ms-version',
  '2019-12-12',
  'date',
  'Wed, 17 Jun 2020 13:10:31 GMT',
  'connection',
  'close'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159239943150501028/file159239943296504342')
  .query(true)
  .reply(201, "", [
  'last-modified',
  'Wed, 17 Jun 2020 13:10:34 GMT',
  'etag',
  '"0x8D812BFD1D625F7"',
  'server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '727808fc-701f-0004-11a8-44a8ae000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '057a4301-1bb1-464c-b546-923313169e84',
  'date',
  'Wed, 17 Jun 2020 13:10:33 GMT',
  'connection',
  'close',
  'content-length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem159239943150501028/file159239943296504342', "Hello World")
  .query(true)
  .reply(202, "", [
  'server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '23bb3cc3-801f-0010-42a8-44e0c1000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '702a8037-ec33-46b3-a726-b7d7609cf734',
  'date',
  'Wed, 17 Jun 2020 13:10:35 GMT',
  'connection',
  'close',
  'content-length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem159239943150501028/file159239943296504342')
  .query(true)
  .reply(200, "", [
  'last-modified',
  'Wed, 17 Jun 2020 13:10:36 GMT',
  'etag',
  '"0x8D812BFD351E306"',
  'server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '326cc5a0-601f-0045-34a8-44f04a000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '92cb20a5-bf65-4dfb-b06d-6c5eb91bf2ba',
  'date',
  'Wed, 17 Jun 2020 13:10:35 GMT',
  'connection',
  'close',
  'content-length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159239943150501028/file159239943296504342')
  .query(true)
  .reply(200, "", [
  'last-modified',
  'Wed, 17 Jun 2020 13:10:36 GMT',
  'etag',
  '"0x8D812BFD351E306"',
  'server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b997c7b7-501e-003c-54a8-440c6e000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '3565e493-9d75-488b-a896-2b0b7dd28a4e',
  'date',
  'Wed, 17 Jun 2020 13:10:37 GMT',
  'connection',
  'close',
  'content-length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem159239943150501028/file159239943296504342')
  .reply(200, "", [
  'content-length',
  '11',
  'content-type',
  'application/octet-stream',
  'last-modified',
  'Wed, 17 Jun 2020 13:10:36 GMT',
  'accept-ranges',
  'bytes',
  'etag',
  '"0x8D812BFD351E306"',
  'server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a4226320-801e-003f-7aa8-44ed0a000000',
  'x-ms-client-request-id',
  '3b1fdbb9-6c0a-47dc-ab91-8c247c686aca',
  'x-ms-version',
  '2019-12-12',
  'x-ms-creation-time',
  'Wed, 17 Jun 2020 13:10:34 GMT',
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
  'access-control-expose-headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'access-control-allow-origin',
  '*',
  'date',
  'Wed, 17 Jun 2020 13:10:38 GMT',
  'connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem159239943150501028')
  .query(true)
  .reply(202, "", [
  'content-length',
  '0',
  'server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a0ab7cbe-201e-0036-08a8-44a8d9000000',
  'x-ms-client-request-id',
  '9663c928-6d37-42f5-aeb4-8188214cb0da',
  'x-ms-version',
  '2019-12-12',
  'date',
  'Wed, 17 Jun 2020 13:10:39 GMT',
  'connection',
  'close'
]);
