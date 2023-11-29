import puppeteer, { Browser, ElementHandle, Page } from "puppeteer";

describe("Spreadsheet App", () => {
 let browser: Browser;
 let page: Page;

 beforeAll(async () => {
  browser = await puppeteer.launch({
   headless: false, //
   // pipe: true,
   args: [
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--disable-dev-shm-usage",
    // '--single-process',
    "--disable-features=site-per-process",
   ],
   slowMo: 50, //
  });
 });

 beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("http://localhost:3004");
 });

 afterEach(async () => {
  await page.close();
  page = null as any;
 });

 afterAll(async () => {
  await browser.close();
  browser = null as any;
 });

 it('should have the title "Spreadsheet App"', async () => {
  await expect(page.title()).resolves.toEqual("Spreadsheet App");
 });

 it("should display context menu only when cell is clicked", async () => {
  const displayNothing: string = (await (
   await ((await page.$(".cell")) as ElementHandle<Element>).getProperty(
    "textContent"
   )
  ).jsonValue()) as string;
  expect(displayNothing).toEqual("");

  // click
  await ((await page.$(".cell")) as ElementHandle<Element>).click();

  const displayValue: string = (await (
   await ((await page.$(".cell")) as ElementHandle<Element>).getProperty(
    "textContent"
   )
  ).jsonValue()) as string;
  expect(displayValue).toEqual(
   "+ insert row above+ insert row below+ insert column left+ insert column right- delete row- delete columnclear cell"
  );
 });

 it("should display hello when cell is clicked and hello is typed", async () => {
  await ((await page.$(".cell")) as ElementHandle<Element>).click();
  await ((await page.$(".cell")) as ElementHandle<Element>).type("hello");

  const displayValue: string = (await (
   await ((await page.$(".cell-single")) as ElementHandle<Element>).getProperty(
    "value"
   )
  ).jsonValue()) as string;
  expect(displayValue).toEqual("hello");
 });

 it("should display 4 when cell is clicked and 2+2 'enter' is clicked", async () => {
  await ((await page.$(".cell")) as ElementHandle<Element>).click();
  await ((await page.$(".cell")) as ElementHandle<Element>).type("2+2");
  await await page.keyboard.press("Enter");
  const displayValue: string = (await (
   await ((await page.$(".cell-single")) as ElementHandle<Element>).getProperty(
    "value"
   )
  ).jsonValue()) as string;
  expect(displayValue).toEqual("4");
 });
});
