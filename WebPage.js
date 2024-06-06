require('dotenv').config();
const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");


async function sleep(timeInS) {
  await new Promise((resolve) => setTimeout(resolve, timeInS * 1000));
}

function initOptions(o) {
  o.addArguments("disable-infobars");
  o.addArguments("no-sandbox");
  o.setChromeBinaryPath("Chrome.exe path");
  o.addArguments(
    "user-agent=Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36 RuxitSynthetic/1.0 v6419931773 t38550 ath9b965f92 altpub"
  );
  o.setUserPreferences({
    credential_enable_service: false,
  });
}

const BasePage = function () {
  let o = new chrome.Options();
  initOptions(o);

  this.driver = new Builder()
    .withCapabilities({ acceptSslCerts: true, acceptInsecureCerts: true })
    .setChromeOptions(o)
    .forBrowser("chrome")
    .build();

  this.visit = async function (theUrl) {
    try {
      return await this.driver.get(theUrl);
    } catch (err) {
      console.error("Error visiting URL:", err);
    }
  };

  this.findByTestId = async function (testId) {
    try {
      await this.driver.wait(
        until.elementLocated(By.css(`[data-testid="${testId}"]`)),
        15000,
        "Looking for element"
      );
      return await this.driver.findElement(By.css(`[data-testid="${testId}"]`));
    } catch (err) {
      console.error("Error finding element by test id:", err);
    }
  };

  this.findByCss = async function (stringy) {
    try {
      await this.driver.wait(
        until.elementLocated(By.css(stringy)),
        15000,
        "Looking for element"
      );
      let elements = await this.driver.findElements(By.css(stringy));
      return elements;
    } catch (err) {
      console.error("Error finding element by CSS:", err);
    }
  };

  this.findButtonByText = async function (buttonText) {
    try {
      await this.driver.wait(
        until.elementLocated(By.xpath(`//button[.//span[text()='${buttonText}']]`)),
        15000,
        `Looking for button with text "${buttonText}"`
      );
      return await this.driver.findElement(By.xpath(`//button[.//span[text()='${buttonText}']]`));
    } catch (err) {
      console.error("Error finding button by text:", err);
    }
  };

  this.signin = async function () {
    try {
      let name = process.env.USERNAME || ""; //Can Hard code your username and Password if running locally.
      let password = process.env.PASSWORD || "";

      let input = await this.findByCss("[autocomplete='username']");
      await input[0].sendKeys(name);

      let next = await this.findButtonByText("Next");
      await sleep(2);
      await next.click();

      

      // let unusualInput = await this.findByTestId("ocfEnterTextTextInput");
      // let unusualName=process.env.SECONDUSERNAME || "";
      // await unusualInput.sendKeys(unusualName);

      // let next2 = await this.findButtonByText("Next");
      // await sleep(2);
      // await next2.click();

      

      let input2 = await this.findByCss("[autocomplete='current-password']");
      await input2[0].sendKeys(password);

      let button = await this.findButtonByText("Log in");
      await sleep(2);
      await button.click();
    } catch (err) {
      console.error("Error signing in:", err);
    }
  };

  this.post = async function () {
    try {
      let textArea = await this.findByTestId("tweetTextarea_0");
      await textArea.click();

      const response = await fetch("https://zenquotes.io/api/quotes/");
      let data = await response.json();

      let postText = `${data[0].q}\n by-${data[0].a}`;
      console.log(postText);
      await textArea.sendKeys(postText);

      let postButton = await this.findButtonByText("Post");

      await sleep(2);

      await postButton.click();
    } catch (err) {
      console.error("Error posting:", err);
    }
  };

  this.quit = async function () {
    try {
      await this.driver.quit();
    } catch (err) {
      console.error("Error quitting WebDriver:", err);
    }
  };
};

module.exports = BasePage;
