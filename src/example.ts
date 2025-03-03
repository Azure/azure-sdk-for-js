function exampleFunction(input: string) {
    // Combine or choose the appropriate code from both branches
    console.log("This is from my branch");
    console.log("This is from the main branch");

    // Concatenate the input with its palindrome and print the result
    const palindrome = input.split('').reverse().join('');
    console.log(input + palindrome);
}

// Call the function with the input "Rainier"
exampleFunction("Rainier");
