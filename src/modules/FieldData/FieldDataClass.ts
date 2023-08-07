import AsyncStateClass from '../StateManagement/AsyncState/AsyncStateClass';
/**
 *
 * ### New Field Data Class to handle the states of an input in react
 *  **Includes**
 * - initial data of the field
 * - current data of the field
 * - error associated with the field
 * - has the field been visited
 * - validator associated with the field
 * - states for async validation of the field
 * - **(special)** provides the props interface and value for the Input component
 */
export default class FieldDataClass {
  /**
   * The initial value of the field
   */
  private data: string = '';

  /**
   * The current value of the field
   */
  private value: string = '';

  /**
   * The error associated with the field
   */
  private error?: string = undefined;

  /**
   * Wheteher the field was visited once
   */
  private touched: boolean = false;

  /**
   * The validator of the field
   */
  validator?: Validator;

  constructor(data: string, validator?: Validator) {
    this.data = data;
    this.validator = validator;
  }

  /**
   * @block - data
   *
   * @returns string
   *
   * Get the initial value for the field
   */
  getData() {
    return this.data;
  }

  /**
   * @block - error
   */

  /**
   * Get whether the field has an error
   */
  hasError() {
    return this.error !== undefined;
  }
  getError() {
    return this.error;
  }
  /**
   * Set the error message, give nothing to set error as undefined
   * @param message the error to set
   */
  setError(message?: string) {
    this.error = message;
  }
  /**
   * Clear the error associated with the field
   */
  clearError() {
    this.error = undefined;
  }

  /**
   * @block - value
   */

  /**
   * Set the current value of the field
   */
  setValue(value: string) {
    this.touched = true;
    this.value = value;
  }
  /**
   * Get the current value of the field;
   */
  getValue() {
    return this.value;
  }

  /**
   * @block - change status
   */

  /**
   * Has the field changed from its initial value
   */
  hasChanged() {
    return this.data !== this.value.trim();
  }

  /**
   * @block - the validity status
   */

  /**
   * Is the current field valid
   */
  isVaild() {
    return this.touched && !this.error;
  }

  /**
   * @block - validation
   */

  /**
   * Validates the current field and **returns the validation verdict**
   */
  validate() {
    const validator = this.validator;
    const value = this.value;
    if (validator) {
      this.error = validator(value);
      return this.error === undefined;
    }

    return true;
  }

  hasTouched() {
    return this.touched;
  }
}
