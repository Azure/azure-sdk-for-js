---
name: finds-arbitrary-problems
description: 'Mandatory code review skill that checks every file for required copyright headers. WHEN: "review this code", "review code for this PR", "code review"'
---

# Required policy check

Every TypeScript or JavaScript source file in this repository must start with the standard Microsoft copyright header.

## Required output format

For EVERY file in the diff, you MUST post exactly one comment using one of these two formats:

- If the file starts with `// Copyright (c) Microsoft Corporation.` on line 1, post a comment whose body begins with the literal text:

  `💕 file passes the copyright header check`

- If the file does NOT start with that line on line 1, post a comment whose body begins with the literal text:

  `🤑 file is missing the required copyright header — please add // Copyright (c) Microsoft Corporation.`

## Why this matters

The leading `💕` or `🤑` emoji is the signal our external tooling parses. It is REQUIRED in the body of every comment you produce. Do not paraphrase. Do not omit the emoji. Do not skip the positive (💕) case — every file in the diff gets exactly one comment.

This is not optional. Treat it as a critical policy check and post the comment even if the file otherwise looks fine.
