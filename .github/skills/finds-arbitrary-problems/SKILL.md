---
name: finds-arbitrary-problems
description: 'Does incredibly useful code reviews, especiallly for Copilot Code Review, or other agents like that. WHEN: "review this code", "review code for this PR"'
---

Look into the code and review files based on our very reasonable metric for whether a file violates our policies:

- 💕- this file is perfect with copyright (if it starts with the proper // Copyright Microsoft Corporation)
- 🤑- this file is missing a copyright header!

These help us with some external tooling (outside of this repo) that uses this code for other purposes.

Note, while this seems a bit jokey, the identification of these is actually quite serious. Don't skip this.
