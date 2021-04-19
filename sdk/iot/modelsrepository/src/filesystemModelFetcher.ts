// Copyright (c) Microsoft.
// Licensed under the MIT license.

import { DTDL } from './DTDL';
import fs from 'fs';
import * as path from 'path';
import { Fetcher } from './fetcher';
import { logger } from './logger';
import { FetcherError } from './resolver';

export class FilesystemFetcher extends Fetcher {
  private _baseFilePath: string;

  constructor(baseFilePath: string) {
    super();
    this._baseFilePath = baseFilePath;
  }

  fetch(filePath: string) {
    logger.info(`Fetching ${filePath} from local filesystem`);
    const absolutePath = path.join(this._baseFilePath, filePath);

    try {
      logger.info(`File open on ${absolutePath}`);
      const dtdlFile = fs.readFileSync(absolutePath, 'utf8');
      const parsedDtdl: DTDL | DTDL[] = JSON.parse(dtdlFile);
      return parsedDtdl;
    } catch (e) {
      throw new FetcherError('Failed to fetch from Filesystem', e);
    }
  }
}

// async function recursiveFetcher(
//   dtmi: string,
//   directory: string,
//   tryFromExpanded: boolean
// ): Promise<{ [x: string]: DTDL }> {
//   let dependencyModels: { [x: string]: DTDL } = {};
//   let fetchedModels: { [x: string]: DTDL };
//   try {
//     console.log(`Fetching: ${dtmi}`);
//     fetchedModels = await fetcher(dtmi, directory, tryFromExpanded);
//   } catch (error) {
//     if (tryFromExpanded && error.code === 'ENOENT') {
//       console.log('Fetching from expanded failed. Trying without.');
//       fetchedModels = await fetcher(dtmi, directory, false);
//     } else {
//       throw error;
//     }
//   }
//   const dtmis = Object.keys(fetchedModels);
//   for (let i = 0; i < dtmis.length; i++) {
//     const currentDtdl = fetchedModels[dtmis[i]];
//     const metaModelData = modelMetadata.getModelMetadata(currentDtdl);
//     const deps = metaModelData.componentSchemas.concat(metaModelData.extends);
//     if (deps && deps.length > 0) {
//       for (let j = 0; j < deps.length; j++) {
//         if (
//           Object.keys(dependencyModels).includes(deps[j]) ||
//           Object.keys(fetchedModels).includes(deps[j])
//         ) {
//           // do nothing
//         } else {
//           const fetchedDependencies = await recursiveFetcher(deps[j], directory, tryFromExpanded);
//           dependencyModels = { ...dependencyModels, ...fetchedDependencies };
//         }
//       }
//     }
//   }
//   if (Object.keys(dependencyModels).length > 0) {
//     fetchedModels = { ...fetchedModels, ...dependencyModels };
//   }
//   return fetchedModels;
// }

// async function fetcher(
//   dtmi: string,
//   directory: string,
//   tryFromExpanded: boolean
// ): Promise<{ [dtmi: string]: DTDL }> {
//   const dtmiPath = dtmiConventions.dtmiToPath(dtmi);
//   const dtmiPathFormatted = tryFromExpanded
//     ? dtmiPath.replace('.json', '.expanded.json')
//     : dtmiPath;
//   const targetPath = path.join(directory, dtmiPathFormatted);
//   const dtdlFile = fs.readFileSync(targetPath, 'utf8');
//   const parsedDtdl: DTDL | DTDL[] = JSON.parse(dtdlFile);
//   if (Array.isArray(parsedDtdl)) {
//     const result = flattenDtdlResponse(parsedDtdl as DTDL[]);
//     return result;
//   } else {
//     const result = { [dtmi]: parsedDtdl as DTDL };
//     return result;
//   }
// }

// export { fetcher, recursiveFetcher };
