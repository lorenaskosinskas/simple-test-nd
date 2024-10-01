import { Locator, Page } from "../utils/fixtures/baseTest";
import { PricingPage } from "./pricingPage";

export class HomePage {
  private readonly pricingPage: PricingPage;
  private readonly acceptAllBtn: Locator;

  constructor(private readonly page: Page) {
    this.pricingPage = new PricingPage(page);
    this.acceptAllBtn = this.page.locator(
      'button[data-click-id="hgr-cookie_consent-accept_all_btn"]'
    );
  }

  async acceptCookiesWithRetry(maxRetries = 3) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      await this.acceptAllBtn.click();
      try {
        await this.acceptAllBtn.waitFor({ state: "hidden", timeout: 2000 });
        console.log("Cookie consent accepted.");
        return;
      } catch {
        console.log(`Attempt ${attempt} failed. Retrying...`);
      }
    }
    throw new Error(`Failed to accept cookies after ${maxRetries} attempts.`);
  }

  async goToPricingPage(maxRetries = 3) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      await this.page.click('a[href="/pricing"]');
      await this.page.waitForLoadState("load");
      const isPeriodSelectVisible =
        await this.pricingPage.isPeriodSelectVisible();
      if (!isPeriodSelectVisible) {
        console.log(`Attempt ${attempt} failed. Retrying...`);
      } else {
        return true;
      }
    }
  }
}
