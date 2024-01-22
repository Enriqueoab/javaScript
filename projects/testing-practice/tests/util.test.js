const puppeteer = require("puppeteer");
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

// E2e test

test("e2e test, create alement success", async () => {
const browser = await puppeteer.launch({
    headless: "new"
    // That configuration show us the data input steps
    // headless: false,
    // slowMo: 80,
    // args: ["--window-size=1920,1080"]
})

const page = await browser.newPage();
await page.goto(
    'http://127.0.0.1:5500/projects/testing-practice/index.html'
);
await page.click('input#name');
await page.type('input#name', 'Anna');
await page.click('input#age');
await page.type('input#age', '28');
await page.click('#btnAddUser');
const finalText = await page.$eval('.user-item', el => el.textContent);
expect(finalText).toBe('Anna (28 years old)');
browser.close();

}, 10000);