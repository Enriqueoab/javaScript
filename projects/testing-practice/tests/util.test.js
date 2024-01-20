const { util, generateText, checkAndGenerate } = require("./../util"); // Syntax natively supported by jest

// Function available globally when we run our tests with jest
test("Expected output name and age", () => {
    const inputText = generateText("Susana", 26);
    expect(inputText).toBe("Susana (26 years old)");
});

test("No input data execution", () => {
    const inputText = generateText();
    expect(inputText).toBe("undefined (undefined years old)");
});

// Integration test
test("Generate a valid text output", () => {
    const text = checkAndGenerate("Max", 29);
    expect(text).toBe("Max (29 years old)")
  });