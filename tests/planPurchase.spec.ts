import { test } from "../utils/fixtures/baseTest";
import Utils from "../utils/utils";
import config from "../config/config";

test.describe("24 months plan purchase", () => {
  test.beforeEach(async ({ page, homePage }) => {
    await test.step("Navigate to home page", async () => {
      await page.goto("/", { waitUntil: "load" });
    });
    await test.step("Accept cookies", async () => {
      await homePage.acceptCookiesWithRetry();
    });
  });

  test("Initiate 24 months plan purchase and verify billing address, order summary and credit card sections", async ({
    cartPage,
    loginPage,
    planFlow,
  }) => {
    await test.step("Navigate to pricing page and initiate 24 months plan", async () => {
      await planFlow.navigateToPricingPageAndInitiate24MonthsPlan();
      await cartPage.clickContinue();
    });

    await test.step(`Log in user '${config.EMAIL}' to portal`, async () => {
      await loginPage.logInUser(config.EMAIL, config.PASSWORD);
    });

    await test.step("Fill in billing address firstName and lastName and verify it is displayed", async () => {
      const firstName = `Peter${Utils.getRandomFourDigits()}`;
      const lastName = `O'Brien${Utils.getRandomFourDigits()}`;
      await cartPage.billingAddressSection.fillInFirstNameAndLastName(
        firstName,
        lastName
      );
      await cartPage.billingAddressSection.clickContinue();
      await cartPage.billingAddressSection.verifyAddressDetailsLines([
        `${firstName} ${lastName}`,
        "+351 37060996966",
        "Netherlands",
      ]);
    });

    await test.step("Verify order summary plan length is 24 and all prices are visible", async () => {
      await cartPage.orderSummarySection.verifyPlanLength("24 months plan");
      await cartPage.orderSummarySection.verifyAllPricesVisibleAndNotEmpty();
    });

    await test.step("Select credit card payment method and verify each field validation works", async () => {
      await cartPage.selectCreditCardPaymentMethod();
      await cartPage.creditCardSection.verifyValidationOnHolderName();
      await cartPage.creditCardSection.verifyValidationOnCardNumber();
      await cartPage.creditCardSection.verifyValidationOnCardExpiration();
      await cartPage.creditCardSection.verifyValidationOnCardCvc();
    });
  });
});
