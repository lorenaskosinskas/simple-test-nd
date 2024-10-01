import { expect, Locator, Page } from "../../utils/fixtures/baseTest";

export class OrderSummarySection {
  private readonly planInformationLineEl: Locator;
  private readonly planPriceEl: Locator;
  private readonly domainPriceEl: Locator;
  private readonly setupPriceEl: Locator;
  private readonly privacyProtectionPriceEl: Locator;
  private readonly subtotalPriceEl: Locator;
  private readonly taxesPriceEl: Locator;
  private readonly planDiscountPriceEl: Locator;
  private readonly totalPriceEl: Locator;

  constructor(private readonly page: Page) {
    this.planInformationLineEl = this.page.locator(
      '[data-qa="checkout-section"] [data-qa="plan-information-line"] >div:first-child'
    );

    this.planPriceEl = this.page.locator(
      '[data-qa="checkout-section"] [data-qa="plan-price"]'
    );
    this.domainPriceEl = this.page.locator(
      '[data-qa="checkout-section"] [data-qa-value="domain"] [data-qa="addon-price"]'
    );
    this.setupPriceEl = this.privacyProtectionPriceEl = this.page.locator(
      '[data-qa="checkout-section"] [data-qa-value="setup"] [data-qa="addon-price"]'
    );
    this.privacyProtectionPriceEl = this.page.locator(
      '[data-qa="checkout-section"] [data-qa-value="privacy_protection"] [data-qa="addon-price"]'
    );
    this.subtotalPriceEl = this.page.locator(
      '[data-qa="checkout-section"] [data-qa="subtotal-price"]'
    );
    this.taxesPriceEl = this.page.locator(
      '[data-qa="checkout-section"] [data-qa="taxes"]'
    );
    this.planDiscountPriceEl = this.page.locator(
      '[data-qa="checkout-section"] [data-qa="plan-discount"]'
    );
    this.totalPriceEl = this.page.locator(
      '[data-qa="checkout-section"] [data-qa="total-price"]'
    );
  }

  async verifyPlanLength(planText: string) {
    await expect(this.planInformationLineEl).toHaveText(planText);
  }

  async verifyAllPricesVisibleAndNotEmpty() {
    const elements = [
      this.planPriceEl,
      this.domainPriceEl,
      this.setupPriceEl,
      this.privacyProtectionPriceEl,
      this.subtotalPriceEl,
      this.taxesPriceEl,
      this.planDiscountPriceEl,
      this.totalPriceEl,
    ];

    await Promise.all(
      elements.map(async (element) => {
        await expect(element).toBeVisible();
        await expect(element).not.toBeEmpty();
      })
    );
  }
}
