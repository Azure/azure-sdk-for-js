let nock = require('nock');

module.exports.hash = "e6a5ce799eeee9ea80058fc5d653c55e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/route/range/json')
  .query(true)
  .reply(200, {"formatVersion":"0.0.1","reachableRange":{"center":{"latitude":50.97452,"longitude":5.86605},"boundary":[{"latitude":52.10048,"longitude":5.74731},{"latitude":52.09457,"longitude":5.59435},{"latitude":52.21933,"longitude":5.45138},{"latitude":52.26774,"longitude":5.20307},{"latitude":52.23416,"longitude":5.05439},{"latitude":52.30712,"longitude":4.92914},{"latitude":52.11103,"longitude":4.6853},{"latitude":51.95557,"longitude":4.56223},{"latitude":51.94046,"longitude":4.46972},{"latitude":51.69422,"longitude":4.26732},{"latitude":51.69369,"longitude":4.26041},{"latitude":51.49769,"longitude":3.77494},{"latitude":51.21017,"longitude":3.61211},{"latitude":50.68786,"longitude":3.93215},{"latitude":50.50031,"longitude":3.93377},{"latitude":50.45358,"longitude":3.88823},{"latitude":50.28611,"longitude":4.48031},{"latitude":50.20523,"longitude":4.5832},{"latitude":50.09804,"longitude":4.9926},{"latitude":50.09283,"longitude":5.02918},{"latitude":49.91769,"longitude":5.25036},{"latitude":49.87866,"longitude":5.26225},{"latitude":49.77595,"longitude":5.54465},{"latitude":49.70083,"longitude":5.62085},{"latitude":49.75754,"longitude":5.77606},{"latitude":49.92532,"longitude":5.94229},{"latitude":49.95232,"longitude":6.08364},{"latitude":50.01647,"longitude":6.13682},{"latitude":50.08942,"longitude":6.2758},{"latitude":50.08797,"longitude":6.43644},{"latitude":50.00492,"longitude":6.6107},{"latitude":49.94788,"longitude":6.8824},{"latitude":50.22486,"longitude":6.67877},{"latitude":50.22978,"longitude":7.00975},{"latitude":50.16274,"longitude":7.59438},{"latitude":50.34594,"longitude":7.63419},{"latitude":50.44626,"longitude":7.79723},{"latitude":50.83549,"longitude":8.01642},{"latitude":51.067,"longitude":7.70357},{"latitude":51.38641,"longitude":7.73244},{"latitude":51.53365,"longitude":7.83876},{"latitude":51.65443,"longitude":7.35167},{"latitude":51.82172,"longitude":7.22289},{"latitude":51.93686,"longitude":7.0428},{"latitude":51.82713,"longitude":6.67268},{"latitude":51.81133,"longitude":6.48424},{"latitude":51.89301,"longitude":6.28017},{"latitude":52.01718,"longitude":6.14419},{"latitude":52.20848,"longitude":6.02398},{"latitude":52.2176,"longitude":6.02255}]}}, [
  'Cache-Control',
  'no-transform, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '2198',
  'Content-Type',
  'application/json; charset=utf-8',
  'Vary',
  'Accept-Encoding',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: DEEBC02142044215AD22C52C4767F56B Ref B: TPE30EDGE0606 Ref C: 2022-03-12T02:53:29Z',
  'Date',
  'Sat, 12 Mar 2022 02:53:31 GMT'
]);
