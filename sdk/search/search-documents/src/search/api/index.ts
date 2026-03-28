// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  explainPost,
  autocompletePost,
  autocompleteGet,
  index,
  suggestPost,
  suggestGet,
  getDocument,
  searchPost,
  searchGet,
  getDocumentCount,
} from "./operations.js";
export type {
  ExplainPostOptionalParams,
  AutocompletePostOptionalParams,
  AutocompleteGetOptionalParams,
  IndexOptionalParams,
  SuggestPostOptionalParams,
  SuggestGetOptionalParams,
  GetDocumentOptionalParams,
  SearchPostOptionalParams,
  SearchGetOptionalParams,
  GetDocumentCountOptionalParams,
} from "./options.js";
export {
  createSearch,
  type SearchContext,
  type SearchClientOptionalParams,
} from "./searchContext.js";
