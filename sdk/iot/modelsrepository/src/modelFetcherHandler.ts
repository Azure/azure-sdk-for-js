// // Copyright (c) Microsoft.
// // Licensed under the MIT license.

// "use strict";

// import { PipelineOptions } from "@azure/core-http";
// import * as fs from "fs";
// import * as url from "url";
// import * as localFetchers from "./filesystemModelFetcher";
// import * as remoteFetchers from "./httpModelFetcher";

// function isLocalPath(p: string): boolean {
//   if (p.startsWith("https://") || p.startsWith("http://")) {
//     return false;
//   } else if (p.startsWith("file://")) {
//     return true;
//   } else {
//     try {
//       fs.accessSync(p);
//       return true;
//     } catch {
//       return false;
//     }
//   }
// }

// interface modelFetcherParams {
//   pipeline: PipelineOptions;
//   dtmis: string[];
//   endpoint: string;
//   dependencyResolution: Dependency;
// }

// export class ModelFetcher {
//   constructor(location, ) {
//     this._location = location;
//   }

//   fetch(dtdlPath) {
//     this._fetcher.
//   }


//   static createHttpFetcher(location) {

//   }

//   static createFileSystemFetcher(location) {
//     return new ModelFetcher()
//   }
// }




// export async function modelFetcher({
//   dtmis,
//   endpoint,
//   resolveDependencies
// }: modelFetcherParams): Promise<{ [dtmi: string]: JSON | Array<JSON> }> {
//   if (isLocalPath(endpoint)) {
//     const formattedDirectory = endpoint.includes("file://")
//       ? url.fileURLToPath(endpoint)
//       : endpoint;
//     if (tryFromExpanded || resolveDependencies) {
//       return localFetchers.recursiveFetcher(dtmi, formattedDirectory, tryFromExpanded);
//     } else {
//       console.log(`Fetching: ${dtmi}`);
//       return localFetchers.fetcher(dtmi, formattedDirectory, false);
//     }
//   } else {
//     if (tryFromExpanded || resolveDependencies) {
//       return remoteFetchers.recursiveFetcher(dtmi, endpoint, tryFromExpanded);
//     }
//     console.log(`Fetching: ${dtmi}`);
//     return remoteFetchers.fetcher(dtmi, endpoint, false);
//   }
// }
