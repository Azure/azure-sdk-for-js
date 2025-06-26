# Release History

## 1.0.0 (2025-06-26)

- First stable release of Azure AI Agents client library

## 1.0.0-beta.5 (2025-06-25)

### Bugs Fixed

- Fixed an issue with event data parsing

## 1.0.0-beta.4 (2025-06-10)

### Features Added

- Adding connected agents sample

### Bugs Fixed

- Fixed an issue with streaming serialization
- Fixed an issue with streaming using the `.submitToolOutputs` method.
- Fixed an issue with codeInterpreterWithStreaming sample inconsistently writing file to disk

## 1.0.0-beta.3 (2025-05-20)

### Features Added

- Adds `runs.createAndPoll` method that automatically polls for the result.
- Adds `resumeFrom` option in polling operations.

### Bugs Fixed

- fixed an issue with bing grounding serialization
- fixed an issue with url encoding

## 1.0.0-beta.2 (2025-05-16)

### Bugs Fixed

- fixed an issue with file upload ReadableStream type

## 1.0.0-beta.1 (2025-05-13)

### Features Added

- This is the initial version of the Azure AI Agents client library, splitting off Agents functionality from the Azure AI Projects library.
