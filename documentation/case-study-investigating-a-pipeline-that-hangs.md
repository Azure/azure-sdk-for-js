# Case Study: Investigating a Pipeline that Hangs

## Problem

We have encountered a problem where the pipelines hung right after the identity tests were run [only(majorly) on Windows].
Here is a screenshot.
![image](https://user-images.githubusercontent.com/10452642/126429691-825bdb55-d25a-463f-8059-cb694e04f791.png)

The issue is time sensitive as it was blocking several PRs.

## Observations / Tips

- We can't use "why-is-node-running" tool because we would have to kill the process cleanly to generate the logs, which isn't typically possible with the CI.
- The issue doesn't reproduce in any of our local work machines or laptops - doesn't matter which OS, doesn't matter which node version.
- On the CI, from more runs of the pipeline, [Windows - node 8] combination seemed more pronounced(almost always fails). [Windows - other node versions] failed about half the time. We have rearely observed the same failure with macOS and Linux.
- "--exit" flag from mocha can be used to exit the mocha run from a hanging state. Though there is relief, it would be temporary, the problem has to be fixed eventually.

## The Story

- The next attempt, creating a Windows 32-bit VM on Azure helped reproduce the problem. Just a tip, the VM can also be RDP-ed into, if you need to open VS Code and just debug the whole thing.
- Next steps
  - Clone JS repo in the VM.
  - Running just the identity tests suite fails (Though succeeds at about 10% of the time).
  - At this point, we know that one/subset of the tests is/are causing the problem.
  - We marched a binary search and isolated the problem to be consistently appearing when we ran a couple of tests in unison.
    ![image](https://user-images.githubusercontent.com/10452642/126440128-4a252217-ba34-4485-9a2e-0c73b96c659f.png)
    - And interestingly, both the tests succeed independently.
    - And the issue doesn't repro if we enable logger verbose.
- Now that we have the problem isolated at least, the next steps are to locate the problem.
  - I have used [wtfnode](https://github.com/myndzi/wtfnode) to find out what's been causing the issue, it helps by providing active handles to investigate stalled node apps. (Another [mocha team's resource](https://gist.github.com/boneskull/7fe75b63d613fa940db7ec990a5f5843) which also helped)
  - This helped locate the spot where it goes wrong. The InteractiveBrowserCredential test is the one that hangs(from the above screenshot).  
    ![image](https://user-images.githubusercontent.com/10452642/126437286-0d28ac1c-e2fc-49df-824c-648f9b05a15d.png)
    Workflow of the test is that opening the browser would throw and the test is supposed to end, however, it doesn't.
    - If the server is closed even before, it ends fine.
- Now that we have located the problem, we tried understanding and fixing it altogether.

  - Since what was hanging wasn’t an exception, since no 'unhandled exception' appeared in the logs… We checked that all of the catches were reached, attempting to find some code path that was being ignored and eventually found that all the code paths were following accordingly, so our code "worked". We were closing everything we wanted to close.
  - So we tried adding a delay before throwing the error we were testing (remember, this specific test checks the edge case in which there is no browser available). That delay fixed it, so it was something added in the stack out of order. So, though we resolved and wrapped up everything, Node was adding something into the stack right after. The delay would be a bad solution since the time needed order the stack appropriately would be variable.
  - We assumed what was taking a while to load was the server setting things up to listen for requests.

    The issue was this:

    - We were allowing Node to close everything and resolve all promises _before_ the server was ready to listen for requests.
    - Our "closing" dependency/code assumed that it's always closing something that is at least already listening.
    - As soon as we added the step to wait for the server to begin listening before we allowed anything to resolve, then by the time the exception was thrown, everything was able to close properly.

  - Here's the PR from @sadasant for more details on the fix - https://github.com/Azure/azure-sdk-for-js/pull/15497
