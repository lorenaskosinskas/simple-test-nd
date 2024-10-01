import { expect, Locator, Page } from "../../utils/fixtures/baseTest";
import { OrderSummarySection } from "./orderSummarySection";
import { CreditCardSection } from "./creditCardSection";
import { BillingAddressSection } from "./billingAddressSection";

export class CartPage {
  private readonly cartRegExp: RegExp = new RegExp(".*/v1/cart/.*");

  readonly orderSummarySection: OrderSummarySection;
  readonly billingAddressSection: BillingAddressSection;
  readonly creditCardSection: CreditCardSection;

  private readonly periodDropdownEl: Locator;
  private readonly activeOptionEl: Locator;
  private readonly option24MonthsEl: Locator;
  private readonly continueBtn: Locator;
  private readonly creditCardEl: Locator;

  constructor(private readonly page: Page) {
    this.orderSummarySection = new OrderSummarySection(page);
    this.creditCardSection = new CreditCardSection(page);
    this.billingAddressSection = new BillingAddressSection(page);
    this.periodDropdownEl = this.page.locator('[data-qa="dropdown-icon"]');
    this.activeOptionEl = this.page.locator(
      '.active[data-qa="dropdown-option"]'
    );
    this.option24MonthsEl = this.page.locator(
      'div[data-qa="dropdown-option"]:has-text("24 months")'
    );
    this.continueBtn = this.page.getByRole("button", { name: "Continue" });
    this.creditCardEl = this.page.locator(
      '[data-qa="payment-method-accordion-credit_card"]'
    );
  }

  async verify24MonthsPeriodSelected() {
    await this.periodDropdownEl.click({ timeout: 30000 });
    await expect(this.activeOptionEl).toHaveText("24 months");
  }

  async select24MonthsPeriod() {
    await this.periodDropdownEl.click();
    await this.option24MonthsEl.click();
    await this.page.waitForResponse(
      (response) =>
        this.cartRegExp.test(response.url()) && response.status() === 200
    );

    await this.periodDropdownEl.waitFor({ state: "visible" });
  }

  async clickContinue() {
    await this.continueBtn.click();
    await this.page.waitForLoadState("load");
  }

  async selectCreditCardPaymentMethod() {
    await this.creditCardEl.click();
  }
}
