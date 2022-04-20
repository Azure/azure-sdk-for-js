let nock = require('nock');

module.exports.hash = "ddbbb8b9f5a89926db8e9d8763b99c97";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem164897594943000973","file0":"file0164897595127504696","file1":"file1164897595275005435","file2":"file2164897595303305885"},"newDate":{"now":"2022-04-03T08:52:31.275Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164897594943000973')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Sun, 03 Apr 2022 08:52:31 GMT',
  'ETag',
  '"0x8DA154F49FCE624"',
  'x-ms-request-id',
  '80a735db-e01e-0001-5038-471b65000000',
  'x-ms-client-request-id',
  'c630ae22-3d45-4f47-be9c-6bb72119b7ef',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Sun, 03 Apr 2022 08:52:31 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164897594943000973/file0164897595127504696')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 03 Apr 2022 08:52:32 GMT',
  'ETag',
  '"0x8DA154F4AE94B41"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '58c07b5f-601f-0002-0e38-47e805000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '232f83f9-43b7-4680-9c37-63520ca4fc93',
  'Date',
  'Sun, 03 Apr 2022 08:52:32 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164897594943000973/file1164897595275005435')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 03 Apr 2022 08:52:33 GMT',
  'ETag',
  '"0x8DA154F4B194199"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '58c07b60-601f-0002-0f38-47e805000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '290b4cf3-3a0e-45ec-8574-67096daf4991',
  'Date',
  'Sun, 03 Apr 2022 08:52:33 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164897594943000973/file2164897595303305885')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 03 Apr 2022 08:52:33 GMT',
  'ETag',
  '"0x8DA154F4B43CB2D"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '58c07b61-601f-0002-1038-47e805000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '9137b30e-9ee8-4d27-a8ae-0c4752433ad8',
  'Date',
  'Sun, 03 Apr 2022 08:52:33 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem164897594943000973')
  .query(true)
  .reply(200, {"paths":[{"contentLength":"0","creationTime":"132934495529749313","etag":"0x8DA154F4AE94B41","expiryTime":"0","group":"$superuser","lastModified":"Sun, 03 Apr 2022 08:52:32 GMT","name":"file0164897595127504696","owner":"$superuser","permissions":"rw-r-----"},{"contentLength":"0","creationTime":"132934495532892569","etag":"0x8DA154F4B194199","expiryTime":"0","group":"$superuser","lastModified":"Sun, 03 Apr 2022 08:52:33 GMT","name":"file1164897595275005435","owner":"$superuser","permissions":"rw-r-----"},{"contentLength":"0","creationTime":"132934495535680301","etag":"0x8DA154F4B43CB2D","expiryTime":"0","group":"$superuser","lastModified":"Sun, 03 Apr 2022 08:52:33 GMT","name":"file2164897595303305885","owner":"$superuser","permissions":"rw-r-----"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Vary',
  'Origin',
  'x-ms-request-id',
  '58c07b62-601f-0002-1138-47e805000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '58e982d5-cd20-4ce3-83a0-d552da9de541',
  'Date',
  'Sun, 03 Apr 2022 08:52:33 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem164897594943000973/file0164897595127504696')
  .reply(200, "", [
  'x-ms-delete-type-permanent',
  'true',
  'x-ms-request-id',
  '58c07b63-601f-0002-1238-47e805000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'e309eb7c-19c4-464f-ba71-05305f199e19',
  'Date',
  'Sun, 03 Apr 2022 08:52:33 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem164897594943000973/file1164897595275005435')
  .reply(200, "", [
  'x-ms-delete-type-permanent',
  'true',
  'x-ms-request-id',
  '58c07b64-601f-0002-1338-47e805000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'f45fdf0d-4465-49e3-95eb-124f118d29b0',
  'Date',
  'Sun, 03 Apr 2022 08:52:34 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem164897594943000973/file2164897595303305885')
  .reply(200, "", [
  'x-ms-delete-type-permanent',
  'true',
  'x-ms-request-id',
  '58c07b65-601f-0002-1438-47e805000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '3cce4c3d-3779-4921-a277-bde602a87962',
  'Date',
  'Sun, 03 Apr 2022 08:52:34 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem164897594943000973')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '80a735df-e01e-0001-5138-471b65000000',
  'x-ms-client-request-id',
  'cdc92106-c3d5-44ec-a9e3-33261f54d9a3',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Sun, 03 Apr 2022 08:52:34 GMT'
]);
