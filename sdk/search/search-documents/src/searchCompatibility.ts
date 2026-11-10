// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RequestParameters } from "@azure-rest/core-client";
import type { SearchContext } from "./search/api/searchContext.js";
import type { SearchPostOptionalParams } from "./search/api/options.js";
import { _searchPostSend, _searchPostDeserialize } from "./search/api/operations.js";
import type { SearchRequest, VectorQueryUnion } from "./models/azure/search/documents/models.js";

interface CompatibleVectorQuery {
  filterOverride?: string;
  perDocumentVectorLimit?: number;
}

/**
 * Keeps explicitly supplied public options that are absent from the current spec projection.
 * Adapting the per-call context preserves generated URL, header, and body serialization without
 * modifying generated mirrors or sharing mutable state between concurrent requests.
 * @internal
 */
export async function searchPostWithCompatibility(
  context: SearchContext,
  options: SearchPostOptionalParams,
  semanticFields?: string[],
): ReturnType<typeof _searchPostDeserialize> {
  const response = await _searchPostSend(
    {
      ...context,
      path: (path: string) => ({
        post: (parameters: RequestParameters) => {
          const body = parameters.body as Record<string, unknown>;
          const vectors = body.vectorQueries as Record<string, unknown>[] | undefined;
          return context.pathUnchecked(path).post({
            ...parameters,
            body: {
              ...body,
              ...(semanticFields !== undefined ? { semanticFields: semanticFields.join(",") } : {}),
              ...(vectors && {
                vectorQueries: vectors.map((vector, i) => {
                  const query = options.vectorQueries![i] as VectorQueryUnion &
                    CompatibleVectorQuery;
                  return {
                    ...vector,
                    ...(query.filterOverride !== undefined && {
                      filterOverride: query.filterOverride,
                    }),
                    ...(query.perDocumentVectorLimit !== undefined && {
                      perDocumentVectorLimit: query.perDocumentVectorLimit,
                    }),
                  };
                }),
              }),
            },
          });
        },
      }),
    },
    options,
  );
  const result = await _searchPostDeserialize(response);
  if (!result.nextPageParameters) {
    return result;
  }
  const wireNext: { semanticFields?: string; vectorQueries?: CompatibleVectorQuery[] } =
    response.body["@search.nextPageParameters"];
  const nextPageParameters: SearchRequest & { semanticFields?: string } = {
    ...result.nextPageParameters,
    semanticFields: wireNext.semanticFields,
    vectorQueries: result.nextPageParameters.vectorQueries?.map((query, i) => ({
      ...query,
      filterOverride: wireNext.vectorQueries?.[i]?.filterOverride,
      perDocumentVectorLimit: wireNext.vectorQueries?.[i]?.perDocumentVectorLimit,
    })),
  };
  return { ...result, nextPageParameters };
}
