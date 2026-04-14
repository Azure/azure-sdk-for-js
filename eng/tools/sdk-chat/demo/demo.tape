# VHS tape file for SDK Chat demo
# https://github.com/charmbracelet/vhs

Output demo/demo.gif
Set Shell "bash"
Set FontSize 14
Set Width 900
Set Height 500
Set Theme "Dracula"
Set Padding 20
Set TypingSpeed 40ms

# Build project off-screen before recording
Hide
Type "dotnet build src/Microsoft.SdkChat --verbosity quiet && clear"
Enter
Sleep 15s
Show

Type "dotnet run --project src/Microsoft.SdkChat --no-build -- package samples generate ~/openai-dotnet --count 1"
Sleep 300ms
Enter
Sleep 30s

# Show OpenAI mode with --use-openai
Type "# With OpenAI instead of GitHub Copilot"
Enter
Sleep 500ms
Type "dotnet run --project src/Microsoft.SdkChat --no-build -- package samples generate ~/openai-dotnet --use-openai --load-dotenv --count 1"
Sleep 300ms
Enter
Sleep 30s
