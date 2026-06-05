// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
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
export type { SearchContext, SearchClientOptionalParams } from "./searchContext.js";
export { createSearch } from "./searchContext.js";
