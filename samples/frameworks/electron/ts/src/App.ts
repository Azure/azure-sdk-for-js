/*
  Copyright (c) Microsoft Corporation.
  Licensed under the MIT license.

  The application's main entry point
*/

// Importing config first allows us to load
// our environment variables before importing
// any app code.
import "./config";
import Main from "./Main";

Main.main();
