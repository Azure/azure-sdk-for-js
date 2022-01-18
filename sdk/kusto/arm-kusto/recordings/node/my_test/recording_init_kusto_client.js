let nock = require('nock');

module.exports.hash = "d20eb46771711fb10b70700812b9d34e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .put('/subscriptions/92f95d8f-3c67-4124-91c7-8cf07cdbf241/resourceGroups/marytest/providers/Microsoft.Kusto/clusters/MyClusterNameXarqRnd', {"location":"eastus","sku":{"name":"Standard_L8s_v2","tier":"Standard"},"identity":{"type":"SystemAssigned"},"properties":{}})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8bacbe6ef3a6bdbbaaabcb6296d7cddd2f8a695d35d5793bfebdd64d5bdd3d29e9077f71adbfbec816f9ef9dd5bfe8d572f6d1e8a325fd45c80c7cdb5eaff8db01a0d4226fb30b6af1fb7eb4b7b3b7b7bdb3bbbd7bf066e7e0d1fd4f1fed3e183fb8ff6067ffdefd9ffa7d3fa2966535cd30546a7d9a356dfad56bfab079bbfee8d12f3658bc6eb3e52cab67bffff383e6f7bfdca3efdb22afbd2f3efa25a38f68acabbca62f1abc497f5d160d812d9617d4aa0598e3e9345fb539b726aa2cdba2bd465b1dcdeb6b427e71dc34c5c5128d7e","c9ff03849ed28491010000"], [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'ETag',
  '"2022-01-18T08:56:17.7570435Z"',
  'Vary',
  'Accept-Encoding',
  'x-ms-request-id',
  'be0ef214-0bba-475a-8c98-1f03278a33a3',
  'Azure-AsyncOperation',
  'https://management.azure.com/subscriptions/92f95d8f-3c67-4124-91c7-8cf07cdbf241/providers/Microsoft.Kusto/locations/East US/operationResults/2206bb07-1161-4e92-b6bb-0437a83e2e56?api-version=2021-08-27',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-resource-requests',
  '199',
  'x-ms-correlation-request-id',
  'ca3105b7-8ebf-4824-aa5f-9d4eaf690a6b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220118T090449Z:ca3105b7-8ebf-4824-aa5f-9d4eaf690a6b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 18 Jan 2022 09:04:48 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/92f95d8f-3c67-4124-91c7-8cf07cdbf241/providers/Microsoft.Kusto/locations/East%20US/operationResults/2206bb07-1161-4e92-b6bb-0437a83e2e56')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefde5dd5d56531cbebe6ee17c5b4ae9aeabc1dff5eeba6adee96d5341340a759d3a65fbdbe5badf29a3faaf3665db6cdddbdbd9d4f27939d07dbbbbb9fee6eefe70ff7b627f4c1f6cefebd07d9c1bd7c2fbfffe947a38f96d92227f46ed9ba69b376dd50fb57ebe5b2585ec84775fba610283b7b7bdb3bbbdbbb076f761e3edad97fb47f7f7cffe0feee8383fb3f454df3e5ec760d692cd37cd99e548b5599b7f4c2cef83e7d5a63906d911302bff823fcce03febd8a2508fc3aaf2f8b697e522dcf8b8bb57c755cb6790d782064431f10caaf690804f12337020bc97c75b67c59571744c8e6a35ff2","4bfe1ff99689c4c0010000"], [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'Vary',
  'Accept-Encoding',
  'x-ms-request-id',
  'c7a69432-0abe-4b16-b4a9-47a82ae562df',
  'x-ms-operation-root-activity-id',
  'f455580c-6875-40ce-8eec-7d90d59b47e7',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-resource-requests',
  '299',
  'x-ms-correlation-request-id',
  '55d0e9ba-aa78-49d0-b032-7756229f46a8',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220118T090450Z:55d0e9ba-aa78-49d0-b032-7756229f46a8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 18 Jan 2022 09:04:49 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/92f95d8f-3c67-4124-91c7-8cf07cdbf241/providers/Microsoft.Kusto/locations/East%20US/operationResults/2206bb07-1161-4e92-b6bb-0437a83e2e56')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefde5dd5d56531cbebe6ee17c5b4ae9aeabc1dff5eeba6adee96d5341340a759d3a65fbdbe5badf29a3faaf3665db6cdddbdbd9d4f27939d07dbbbbb9fee6eefe70ff7b627f4c1f6cefebd07d9c1bd7c2fbfffe947a38f96d92227f46ed9ba69b376dd50fb57ebe5b2585ec84775fba610283b7b7bdb3bbbdbbb076f761e3edad97fb47f7f7cffe0feee8383fb3f454df3e5ec760d692cd37cd99e548b5599b7f4c2cef83e7d5a63906d911302bff823fcce03febd8a2508fc3aaf2f8b697e522dcf8b8bb57c755cb6790d782064431f10caaf690804f12337020bc97c75b67c59571744c8e6a35ff2","4bfe1ff99689c4c0010000"], [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'Vary',
  'Accept-Encoding',
  'x-ms-request-id',
  '54ba56dd-0187-44d8-8abc-1a9e80d45846',
  'x-ms-operation-root-activity-id',
  'f455580c-6875-40ce-8eec-7d90d59b47e7',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-resource-requests',
  '298',
  'x-ms-correlation-request-id',
  '95ad127c-5acd-430d-854e-163bd20b5d2e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220118T090452Z:95ad127c-5acd-430d-854e-163bd20b5d2e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 18 Jan 2022 09:04:52 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/92f95d8f-3c67-4124-91c7-8cf07cdbf241/providers/Microsoft.Kusto/locations/East%20US/operationResults/2206bb07-1161-4e92-b6bb-0437a83e2e56')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefde5dd5d56531cbebe6ee17c5b4ae9aeabc1dff5eeba6adee96d5341340a759d3a65fbdbe5badf29a3faaf3665db6cdddbdbd9d4f27939d07dbbbbb9fee6eefe70ff7b627f4c1f6cefebd07d9c1bd7c2fbfffe947a38f96d92227f46ed9ba69b376dd50fb57ebe5b2585ec84775fba610283b7b7bdb3bbbdbbb076f761e3edad97fb47f7f7cffe0feee8383fb3f454df3e56ca8e1fd7be3fdddfb7bf71f7c8a86349669be6c4faac5aacc5b7a61677c9f3ead31c8b6c809815ffc117ee701ff5ec512047e9dd797c5343fa996e7c5c55abe3a2edbbc063c10b2a10f08e5d7340482f8911b818564be3a5bbeacab0b2264f3d12ff9","25ff0f75219047c0010000"], [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'Vary',
  'Accept-Encoding',
  'x-ms-request-id',
  'dcd8f334-da1f-4ae0-96a9-e6e25d25b5f4',
  'x-ms-operation-root-activity-id',
  'f455580c-6875-40ce-8eec-7d90d59b47e7',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-resource-requests',
  '297',
  'x-ms-correlation-request-id',
  '44957adb-ae71-499f-be21-94cb6553b47b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220118T090454Z:44957adb-ae71-499f-be21-94cb6553b47b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 18 Jan 2022 09:04:54 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/92f95d8f-3c67-4124-91c7-8cf07cdbf241/providers/Microsoft.Kusto/locations/East%20US/operationResults/2206bb07-1161-4e92-b6bb-0437a83e2e56')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefde5dd5d56531cbebe6ee17c5b4ae9aeabc1dff5eeba6adee96d5341340a759d3a65fbdbe5badf29a3faaf3665db6cdddbdbd9d4f27939d07dbbbbb9fee6eefe70ff7b627f4c1f6cefebd07d9c1bd7c2fbfffe947a38f96d92227f46ed9ba69b376dd50fb57ebe5b2585ec84775fba610283b7b7bdb3bbbdbbb076f761e3edad97fb47f7f7cffe0feee8383fb3f454df3e56ca8e1fd4fc73b070f760fee3f40431acb345fb627d56255e62dbdb033be4f9fd618645be484c02ffe08bff3807faf620902bfceebcb629a9f54cbf3e2622d5f1d976d5e031e08d9d00784f26b1a0241fcc88dc042325f9d2d5fd6d50511b2f9e897fc","92ff07465e4012c0010000"], [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'Vary',
  'Accept-Encoding',
  'x-ms-request-id',
  '742be502-831d-4c91-9dc2-a52b716864da',
  'x-ms-operation-root-activity-id',
  'f455580c-6875-40ce-8eec-7d90d59b47e7',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-resource-requests',
  '296',
  'x-ms-correlation-request-id',
  'f371f311-4c8d-49f1-93bf-9047739e7af3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220118T090457Z:f371f311-4c8d-49f1-93bf-9047739e7af3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 18 Jan 2022 09:04:57 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/92f95d8f-3c67-4124-91c7-8cf07cdbf241/providers/Microsoft.Kusto/locations/East%20US/operationResults/2206bb07-1161-4e92-b6bb-0437a83e2e56')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefde5dd5d56531cbebe6ee17c5b4ae9aeabc1dff5eeba6adee96d5341340a759d3a65fbdbe5badf29a3faaf3665db6cdddbdbd9d4f27939d07dbbbbb9fee6eefe70ff7b627f4c1f6cefebd07d9c1bd7c2fbfffe947a38f96d92227f46ed9ba69b376dd50fbd7ebe934cf67f94c3eacdb3785c0d9d9dbdbded9ddde3d78b3f3f0d1cefea3fdfbe3fb07f7771f1cdcff296a9a2f67430def3f18efdd7fb8f3f0fe4334a4d14cf3657b522d5665ded20bbbe31dfab4c630db2227147ef147f89d87fc7b154b90f8755e5f16d3fca45a9e17176bf9eab86cf31af040ca863e289617af6910043118838565be343dcf3efa25bf","e4ff012dd96c4ec3010000"], [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'Vary',
  'Accept-Encoding',
  'x-ms-request-id',
  '2f64017a-9ab9-431d-b5e7-5253bba3cfbd',
  'x-ms-operation-root-activity-id',
  'f455580c-6875-40ce-8eec-7d90d59b47e7',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-resource-requests',
  '295',
  'x-ms-correlation-request-id',
  'd3cbb816-3cd1-450e-b301-3936e2cfbdc8',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220118T090459Z:d3cbb816-3cd1-450e-b301-3936e2cfbdc8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 18 Jan 2022 09:04:59 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/92f95d8f-3c67-4124-91c7-8cf07cdbf241/resourceGroups/marytest/providers/Microsoft.Kusto/clusters/MyClusterNameXarqRnd')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8bacbe6ef3a6bdbbaaabcb6296d7cddd2f8a695d35d5793bfebdd64d5bdd3d29e9077f71adbfbec816f9ef9dd5bfe8d572f6d1e8a325fd45c80c7cdb5eaff8db01a0d4226fb30b6af1fb7eb4b7b3b7b7bdb3bbbd7bf066e7e1a39dfd47f7f7c70fefed3cfc74f7e14ffdbe1f51cbb29a66182ab53ecd9a36fdea357dd8bc5d7ff4e8171b2c5eb7d97296d5b3dffff941f3fb5feed1f76d91d7de17f4c9345b65d3a2bdfee8d1de2fa1efb38b8600d06f4482555e537bfcfd51d3662d20be5a2f97c5f282dee34f5ee559030c96ebb21c7db4ae0b6a326fdb55f3e8eeddc5f554860564de1109eae56c4ceddb75337e4b5f54e3ab6239abae9af1326f09e02c6bb3b3e505919f06f555008a7aa48fb7df17625bd387f9ecf41dbf52bec997d9b2a5e17ceffba38f2e8bba5d67e58bbcbdaaeab727d5f2bcb858d74a50194e459cb4287e90cf8ed76dd54cb3920820df10a049993f2d9ab7a7cb697d4dedf0d6795636b9f9f2755be7d982109721d96fdfe6d73f99adcbf6a5475e015a66cb8b75769103dd654310e99b5ffcd16556aea9dfef7d9fa64420bf5cd717f489bc241f3dadd6f46f14978b6299bf11aefbc97b44936c3acd574494e3f5acc89753740f729020b475316dbf5cb7936abd9c295d8ea975434d3ea2b1a223304c5696d5553e7bf68b66cbe7054686f757844031edbe75cad8792f9dad5ed12873f79ee00f02bf6eabd5478f68ca086de2bdcb022420fa11ab32e7bd5e13d47c46d08812249bcb9699f61753e362392d565979062df0e9c3d9ec3c9f1c6c4fb31d12fbece1fded87d9a77bdbf7767676f71e7e9a7f7aefe143c287484cbcc06f3c204571703039df3ef8f47c971445764e8a229b6cefcd484dececeece26fb0ff08610f1f535b1d4e2b8698a8b2570f925","ff0faae73f2c7e040000"], [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'ETag',
  '"2022-01-18T09:04:54.9309619Z"',
  'Vary',
  'Accept-Encoding',
  'x-ms-request-id',
  '8ec8063f-64c1-4984-9270-fb88c2ead712',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-resource-requests',
  '299',
  'x-ms-correlation-request-id',
  '0030b22c-692c-4eb8-9f87-a4c3528cb136',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220118T090501Z:0030b22c-692c-4eb8-9f87-a4c3528cb136',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 18 Jan 2022 09:05:01 GMT'
]);
