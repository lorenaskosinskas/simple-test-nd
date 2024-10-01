import { expect, Locator, Page } from "../../utils/fixtures/baseTest";

export class CreditCardSection {
  private readonly cardHolderErrorMsg = "Name on card field is required";
  private readonly cardNumberErrorMsg = "Please enter correct card number.";
  private readonly cardExpirationErrorMsg =
    "Please enter correct card expiry date";
  private readonly cardCvcErrorMsg = "Please enter correct CVC number.";

  private readonly cardHolderNameEl: Locator;
  private readonly cardHolderNameErrorEl: Locator;
  private readonly cardNumberIframeInputEl: Locator;
  private readonly cardNumberErrorEl: Locator;
  private readonly cardExpirationIframeInputEl: Locator;
  private readonly cardExpirationErrorEl: Locator;
  private readonly cardCvcIframeInputEl: Locator;
  private readonly cardCvcErrorEl: Locator;

  constructor(private readonly page: Page) {
    this.cardHolderNameEl = this.page.locator("#cardholdername");
    this.cardHolderNameErrorEl = this.page.locator(
      'div:has(label[for="card_number"]) > div.error-message'
    );
    this.cardNumberIframeInputEl = this.page
      .frameLocator(
        '[data-processout-input="cc-number"] > iframe.processout-field-cc-iframe'
      )
      .locator("input");
    this.cardNumberErrorEl = this.page.locator(
      'div:has(label[for="card_number"]) > div.error-message'
    );
    this.cardExpirationIframeInputEl = this.page
      .frameLocator(
        '[data-processout-input="cc-exp"] > iframe.processout-field-cc-iframe'
      )
      .locator("input");
    this.cardExpirationErrorEl = this.page.locator(
      'div:has(label[for="card_expiration_year"]) > div.error-message'
    );
    this.cardCvcIframeInputEl = this.page
      .frameLocator(
        '[data-processout-input="cc-cvc"] > iframe.processout-field-cc-iframe'
      )
      .locator("input");
    this.cardCvcErrorEl = this.page.locator(
      'div:has(label[for="card_cvc"]) > div.error-message'
    );
  }

  async fillInCreditCardHolderName(name: string) {
    await this.cardHolderNameEl.fill(name);
  }

  async verifyValidationOnHolderName() {
    await this.fillInCreditCardHolderName("1");
    await this.fillInCreditCardHolderName("");

    await expect(this.cardHolderNameErrorEl).toHaveText(
      this.cardHolderErrorMsg
    );
    await this.fillInCreditCardHolderName("Human");
  }

  async fillInCreditCardNumber(number: string) {
    await this.cardNumberIframeInputEl.fill(number);
  }

  async verifyValidationOnCardNumber() {
    await this.fillInCreditCardNumber("1");
    await expect(this.cardNumberErrorEl).toHaveText(this.cardNumberErrorMsg);
  }

  async fillInCreditCardExpiration(expiration: string) {
    await this.cardExpirationIframeInputEl.fill(expiration);
  }

  async verifyValidationOnCardExpiration() {
    await this.fillInCreditCardExpiration("11");
    await expect(this.cardExpirationErrorEl).toHaveText(
      this.cardExpirationErrorMsg
    );
  }

  async fillInCreditCardCvc(cvc: string) {
    await this.cardCvcIframeInputEl.fill(cvc);
  }

  async verifyValidationOnCardCvc() {
    await this.fillInCreditCardCvc("1");
    await expect(this.cardCvcErrorEl).toHaveText(this.cardCvcErrorMsg);
  }
}
