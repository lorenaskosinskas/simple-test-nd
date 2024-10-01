import { Locator, Page } from "../utils/fixtures/baseTest";

export class PricingPage {
  private readonly periodSelectBtn: Locator;
  private readonly option24MonthsEl: Locator;
  private readonly carouselLeftEl: Locator;
  private readonly choosePremiumPlanBtn: Locator;
  private readonly closeAiAssistantBtn: Locator;

  constructor(private readonly page: Page) {
    this.periodSelectBtn = this.page.locator("#period-select");
    this.option24MonthsEl = this.page.locator('text="24-months"');
    this.carouselLeftEl = this.page.locator(
      ".h-carousel-track__indicator-container > *:first-child"
    );
    this.choosePremiumPlanBtn = this.page.locator(
      'button[data-click-id="hgr-pricing-pricing_table-add_to_cart-hosting_hostinger_premium"]'
    );
    this.closeAiAssistantBtn = this.page.locator(
      'button.chatbot-header__action-button[title="Close"]'
    );
  }

  async closeAiAssistantIfVisible() {
    if (await this.closeAiAssistantBtn.isVisible()) {
      this.closeAiAssistantBtn.click();
    }
  }

  async isPeriodSelectVisible() {
    try {
      await this.periodSelectBtn.waitFor({ state: "attached", timeout: 2000 });
      return true;
    } catch {
      console.log("Period select btn is not visible");
      return false;
    }
  }

  async select24MonthsPeriod() {
    await this.periodSelectBtn.click();
    await this.option24MonthsEl.click();
  }

  async selectPremiumPlan() {
    await this.carouselLeftEl.click();
    await this.choosePremiumPlanBtn.click();
    await this.page.waitForLoadState("load");
  }
}
