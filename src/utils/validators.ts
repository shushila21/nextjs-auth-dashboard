export const validators = {
  required: (value: any): string | undefined => {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
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
    (min: number) =>
    (value: string): string | undefined => {
      if (!value) return undefined;
      if (value.length < min) {
        return `Must be at least ${min} characters long`;
      }
      return undefined;
    },

  maxLength:
    (max: number) =>
    (value: string): string | undefined => {
      if (!value) return undefined;
      if (value.length > max) {
        return `Must be no more than ${max} characters long`;
      }
      return undefined;
    },

  phone: (value: string): string | undefined => {
    if (!value) return undefined;
    const phoneRegex = /^\+?[\d\s\-$$$$]+$/;
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

  number: (value: any): string | undefined => {
    if (!value) return undefined;
    if (isNaN(Number(value))) {
      return 'Please enter a valid number';
    }
    return undefined;
  },

  combine:
    (...validatorFns: Array<(value: any) => string | undefined>) =>
    (value: any): string | undefined => {
      for (const validator of validatorFns) {
        const error = validator(value);
        if (error) return error;
      }
      return undefined;
    },
};
