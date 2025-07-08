type ValidatorFn<T = unknown> = (value: T) => string | undefined;

export const validators = {
  required: (
    value: string | number | boolean | null | undefined,
  ): string | undefined => {
    if (
      value === null ||
      value === undefined ||
      value === false ||
      (typeof value === 'string' && value.trim() === '') ||
      (typeof value === 'number' && isNaN(value))
    ) {
      return 'This field is required';
    }
    return undefined;
  },

  email: (value: string): string | undefined => {
    if (!value) return undefined;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address';
    }
    return undefined;
  },

  minLength:
    (min: number): ValidatorFn<string> =>
    (value) => {
      if (!value) return undefined;
      if (value.length < min) {
        return `Must be at least ${min} characters long`;
      }
      return undefined;
    },

  maxLength:
    (max: number): ValidatorFn<string> =>
    (value) => {
      if (!value) return undefined;
      if (value.length > max) {
        return `Must be no more than ${max} characters long`;
      }
      return undefined;
    },

  phone: (value: string): string | undefined => {
    if (!value) return undefined;
    const phoneRegex = /^\+?[\d\s\-]+$/;
    if (!phoneRegex.test(value)) {
      return 'Please enter a valid phone number';
    }
    return undefined;
  },

  url: (value: string): string | undefined => {
    if (!value) return undefined;
    try {
      new URL(value);
      return undefined;
    } catch {
      return 'Please enter a valid URL';
    }
  },

  number: (value: string | number): string | undefined => {
    if (value === null || value === undefined || value === '') return undefined;
    if (isNaN(Number(value))) {
      return 'Please enter a valid number';
    }
    return undefined;
  },

  combine:
    <T>(...validatorFns: ValidatorFn<T>[]): ValidatorFn<T> =>
    (value: T) => {
      for (const validator of validatorFns) {
        const error = validator(value);
        if (error) return error;
      }
      return undefined;
    },
};
