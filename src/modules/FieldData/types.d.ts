interface FieldData<T = string> {
  /**
   * the value of the field
   */
  value: T;
  /**
   * if there is an error during validation
   */
  error?: string;
  /**
   * after validtion, if it is okay
   */
  isValid?: boolean;
}

type Validator = (data: string) => string | undefined;

class FieldDataClass {
  /**
   * The validator of the field
   */
  validator?: Validator;

  constructor(data: string, validator?: Validator) {}

  /**
   * @block - data
   *
   * @returns string
   *
   * Get the initial value for the field
   */
  getData(): string {}

  /**
   * @block - error
   */

  /**
   * Get whether the field has an error
   */
  hasError(): boolean {}
  getError(): string | undefined {}
  /**
   * Set the error message, give nothing to set error as undefined
   * @param message the error to set
   */
  setError(message?: string): void {}
  /**
   * Clear the error associated with the field
   */
  clearError(): void {}

  /**
   * @block - value
   */

  /**
   * Set the current value of the field
   */
  setValue(value: string): void {}
  /**
   * Get the current value of the field;
   */
  getValue(): string {}

  /**
   * @block - change status
   */

  /**
   * Has the field changed from its initial value
   */
  hasChanged(): boolean {}

  /**
   * @block - the validity status
   */

  /**
   * Is the current field valid
   */
  isVaild(): boolean {}

  /**
   * @block - validation
   */

  /**
   * Validates the current field and **returns the validation verdict**
   */
  validate(): boolean {}

  hasTouched(): boolean {}
}
