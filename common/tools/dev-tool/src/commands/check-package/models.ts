// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License

type IssueLevel = "info" | "warn" | "error";
interface Issue {
  level: IssueLevel;
  message: string;
  filepath: string;
}
