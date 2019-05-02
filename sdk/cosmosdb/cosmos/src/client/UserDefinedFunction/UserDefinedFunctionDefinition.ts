export interface UserDefinedFunctionDefinition {
  /** The id of the {@link UserDefinedFunction} */
  id?: string;
  /** The body of the user defined function, it can also be passed as a stringifed function */
  body?: string | (() => void);
}
