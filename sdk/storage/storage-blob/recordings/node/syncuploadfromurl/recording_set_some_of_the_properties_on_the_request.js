let nock = require('nock');

module.exports.hash = "9951c8b08d88b32c9e15d241d4a107ea";

module.exports.testInfo = {"uniqueName":{"container":"container160629840761507063","blockblob":"blockblob160629840788802150","srcblob":"srcblob160629840788903479"},"newDate":{"expiry":"2020-11-25T10:00:08.162Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160629840761507063')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Wed, 25 Nov 2020 10:00:07 GMT',
  'ETag',
  '"0x8D89128E3B03222"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '86cf8fb9-701e-0000-7211-c39c47000000',
  'x-ms-client-request-id',
  'a27b3490-d5b2-44d2-bc15-89d169907f39',
  'x-ms-version',
  '2020-04-08',
  'Date',
  'Wed, 25 Nov 2020 10:00:07 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160629840761507063/srcblob160629840788903479', "ec28a71f9bf23a86401da9545dd4d35395d4bd424a2141a1c717deee10e6dbde5ee429a7fb2d3221ba6aba8f09fa4aaa12ff67ad4b74e2daabf67f215869e6f109df0134073498b16cb58ab38719c2dcc719506d7096440280ca07e2da4727ed7b03654b53ebd2adb387204f64d21e919b4be779794498456f04cd719a77cd0bb62d95e4cc9f4e658bfde70b1117b7dfdcbb8d17390a58e733f863bf126b27857caf1960b84c8f6ca375c41b56eeceee7714951a7ddb66c169c0eade431ce1a4f3ea990cde9b97bea89ee78d550a520deb44ed92d21c59db419a079f81b09e5a6d9fdff596ac4d55d513aa7dfce738ed57fa4af8803c4f9a34015426ae21822fdfac47b0d7e6cee863624a0488d27210c2fa9300be620fe6876d4a2b31da2151658f43f75ffb1ccb58efd10c5f2d4606047c002a13e5b670071fae47755445d728e25eb439dee8214fe51d8ccb40031939653900616092b41ad7cf27a80407bb72223d7f786f10fefe6644233fcfb63f49ae08c35973a22404a685832750af3ea92ad97bbe7a14ac799d763c22ac289b09722bd245598b4e88b312c4c862f88a97cf521ff61b0fb31cc02252e67292ffa9bdcb4003838ddb30d6f8ddb5b53c3c5bf0faae6df70b21ec78d4c36b453b26aa3815477b6226394ca433ed8c977c88b333f39066fcca638670d98eb4d91f0ab9b6a8f5bd5442a631631d00226d6f405e0b13596097a4d3fc185141344652396696b4188840fe68f01312eac90c0e155c658cb2202cb1251ea658e3b5f9c99290dc70174714455c1a83b7432696d49181d2b1720da8e42cb6310bd91fa191e9fe00bcb94ce100ffc0fadd2001e41359c15f5282e5c45806a91755525fb55c0c60c3d13365f0091cc7b5b0b4f73a792cad192b09e9497231f5dda8c0325c29e37cefb1efe4880e933ca0d6c663eb5b8ec6df8e44aa481fbedbaeea553de7eb0b0939ecfebf75ed2157fbe0692d773ec300620b576fcf5c1c3c014f0776f17cd79b76a5ba013246b703b3591ae59927bf6b8fb3b6b33ed203ca2094386a7546cb85a9249c30f13d0aa4f4bd0f086d1820180fa9e9cbf887e14e2659a0226f23ba0d2774f6108157b7dedbbe645c2eb849ec62012f7fe9f5ef8fc6a4cc072fa4658f81eeb83b8828646573256995a1fca05fd409603a50467ee8f346c0d03e91c042e03388d14c95c75ae259fb8f99e2907c14a59301ba1f7a548323bd28523193d679418a1af460c8aa175e215af5a6ebda114397ece69bce953bdb847be14f00b3d6000238e3d66e43ec66901bbd99289067b35f465307fc1a0cb5c2abde4129c199bededd12ab5c23d7fa6ee2479d45c7841587b78ef8921ce4ccc3605977ed488dfdbf95a733a37e2bfb6f9ae8b060e82921d0d4c09d6a3260f58a9d842562cf6f3f94d8bd3294b30c718832a42bd0")
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'EmRJ2aBdmFEY5Bx6Rf972g==',
  'Last-Modified',
  'Wed, 25 Nov 2020 10:00:08 GMT',
  'ETag',
  '"0x8D89128E3D9F073"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '86cf8fbd-701e-0000-7511-c39c47000000',
  'x-ms-client-request-id',
  'dceb72d0-958b-4edc-91de-52d10b916875',
  'x-ms-version',
  '2020-04-08',
  'x-ms-content-crc64',
  'W/nQ33KBlnw=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 25 Nov 2020 10:00:07 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160629840761507063/blockblob160629840788802150')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Wed, 25 Nov 2020 10:00:08 GMT',
  'ETag',
  '"0x8D89128E406118A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '86cf8fca-701e-0000-0211-c39c47000000',
  'x-ms-client-request-id',
  '8e8054f6-87ce-4f2c-b2ed-eca5a5fb26c6',
  'x-ms-version',
  '2020-04-08',
  'x-ms-content-crc64',
  'W/nQ33KBlnw=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 25 Nov 2020 10:00:07 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container160629840761507063/blockblob160629840788802150')
  .reply(200, ["ec28a71f9bf23a86401da9545dd4d35395d4bd424a2141a1c717deee10e6dbde5ee429a7fb2d3221ba6aba8f09fa4aaa12ff67ad4b74e2daabf67f215869e6f109df0134073498b16cb58ab38719c2dcc719506d7096440280ca07e2da4727ed7b03654b53ebd2adb387204f64d21e919b4be779794498456f04cd719a77cd0bb62d95e4cc9f4e658bfde70b1117b7dfdcbb8d17390a58e733f863bf126b27857caf1960b84c8f6ca375c41b56eeceee7714951a7ddb66c169c0eade431ce1a4f3ea990cde9b97bea89ee78d550a520deb44ed92d21c59db419a079f81b09e5a6d9fdff596ac4d55d513aa7dfce738ed57fa4af8803c4f9a34015426ae21822fdfac47b0d7e6cee863624a0488d27210c2fa9300be620fe6876d4a2b31da2151658f43f75ffb1ccb58efd10c5f2d4606047c002a13e5b670071fae47755445d728e25eb439dee8214fe51d8ccb40031939653900616092b41ad7cf27a80407bb72223d7f786f10fefe6644233fcfb63f49ae08c35973a22404a685832750af3ea92ad97bbe7a14ac799d763c22ac289b09722bd245598b4e88b312c4c862f88a97cf521ff61b0fb31cc02252e67292ffa9bdcb4003838ddb30d6f8ddb5b53c3c5bf0faae6df70b21ec78d4c36b453b26aa3815477b6226394ca433ed8c977c88b333f39066fcca638670d98eb4d91f0ab9b6a8f5bd5442a631631d00226d6f405e0b13596097a4d3fc185141344652396696b4188840fe68f01312eac90c0e155c658cb2202cb1251ea658e3b5f9c99290dc70174714455c1a83b7432696d49181d2b1720da8e42cb6310bd91fa191e9fe00bcb94ce100ffc0fadd2001e41359c15f5282e5c45806a91755525fb55c0c60c3d13365f0091cc7b5b0b4f73a792cad192b09e9497231f5dda8c0325c29e37cefb1efe4880e933ca0d6c663eb5b8ec6df8e44aa481fbedbaeea553de7eb0b0939ecfebf75ed2157fbe0692d773ec300620b576fcf5c1c3c014f0776f17cd79b76a5ba013246b703b3591ae59927bf6b8fb3b6b33ed203ca2094386a7546cb85a9249c30f13d0aa4f4bd0f086d1820180fa9e9cbf887e14e2659a0226f23ba0d2774f6108157b7dedbbe645c2eb849ec62012f7fe9f5ef8fc6a4cc072fa4658f81eeb83b8828646573256995a1fca05fd409603a50467ee8f346c0d03e91c042e03388d14c95c75ae259fb8f99e2907c14a59301ba1f7a548323bd28523193d679418a1af460c8aa175e215af5a6ebda114397ece69bce953bdb847be14f00b3d6000238e3d66e43ec66901bbd99289067b35f465307fc1a0cb5c2abde4129c199bededd12ab5c23d7fa6ee2479d45c7841587b78ef8921ce4ccc3605977ed488dfdbf95a733a37e2bfb6f9ae8b060e82921d0d4c09d6a3260f58a9d842562cf6f3f94d8bd3294b30c718832a42bd0"], [
  'Cache-Control',
  'blobCacheControl',
  'Content-Length',
  '1024',
  'Content-Type',
  'blobContentType1',
  'Content-Encoding',
  'blobContentEncoding',
  'Content-Language',
  'blobContentLanguage1',
  'Content-MD5',
  'EmRJ2aBdmFEY5Bx6Rf972g==',
  'Last-Modified',
  'Wed, 25 Nov 2020 10:00:08 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D89128E406118A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '86cf8fcc-701e-0000-0411-c39c47000000',
  'x-ms-client-request-id',
  '1bc7cd66-f363-4d65-85e5-063be4356c66',
  'x-ms-version',
  '2020-04-08',
  'x-ms-tag-count',
  '1',
  'x-ms-creation-time',
  'Wed, 25 Nov 2020 10:00:08 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'Content-Disposition',
  'blobContentDisposition',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-tag-count,Content-Type,Content-Encoding,Content-Language,Cache-Control,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,Content-Disposition,x-ms-server-encrypted,Accept-Ranges',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 25 Nov 2020 10:00:08 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container160629840761507063/blockblob160629840788802150')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<Tags><TagSet><Tag><Key>tag1</Key><Value>val1</Value></Tag></TagSet></Tags>", [
  'Content-Length',
  '117',
  'Content-Type',
  'application/xml',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '86cf8fcd-701e-0000-0511-c39c47000000',
  'x-ms-version',
  '2020-04-08',
  'x-ms-client-request-id',
  '906d6fdd-9d1c-4d0f-a637-cb29e140dcba',
  'Date',
  'Wed, 25 Nov 2020 10:00:08 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container160629840761507063')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '86cf8fd0-701e-0000-0611-c39c47000000',
  'x-ms-client-request-id',
  '5b9aa583-a1a3-4725-8544-90277c27f00d',
  'x-ms-version',
  '2020-04-08',
  'Date',
  'Wed, 25 Nov 2020 10:00:08 GMT'
]);
