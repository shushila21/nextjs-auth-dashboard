'use client';

import type React from 'react';

import { useState, useCallback } from 'react';

export interface FormField {
  value: any;
  error?: string;
  touched?: boolean;
}

export interface FormState {
  [key: string]: FormField;
}

export interface UseFormHandlerOptions {
  initialValues?: Record<string, any>;
  validationRules?: Record<string, (value: any) => string | undefined>;
  onSubmit?: (values: Record<string, any>) => void | Promise<void>;
}

export const useFormHandler = (options: UseFormHandlerOptions = {}) => {
  const { initialValues = {}, validationRules = {}, onSubmit } = options;

  const [formState, setFormState] = useState<FormState>(() => {
    const state: FormState = {};
    Object.keys(initialValues).forEach((key) => {
      state[key] = {
        value: initialValues[key],
        error: undefined,
        touched: false,
      };
    });
    return state;
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const setValue = useCallback(
    (name: string, value: any) => {
      setFormState((prev) => ({
        ...prev,
        [name]: {
          ...prev[name],
          value,
          touched: true,
          error: validationRules[name]
            ? validationRules[name](value)
            : undefined,
        },
      }));
    },
    [validationRules],
  );

  const setError = useCallback((name: string, error: string) => {
    setFormState((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        error,
      },
    }));
  }, []);

  const validateForm = useCallback(() => {
    let isValid = true;
    const newState = { ...formState };

    Object.keys(formState).forEach((key) => {
      if (validationRules[key]) {
        const error = validationRules[key](formState[key].value);
        newState[key] = {
          ...newState[key],
          error,
          touched: true,
        };
        if (error) isValid = false;
      }
    });

    setFormState(newState);
    return isValid;
  }, [formState, validationRules]);

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      if (e) e.preventDefault();

      if (!validateForm()) return;

      setIsSubmitting(true);
      try {
        const values: Record<string, any> = {};
        Object.keys(formState).forEach((key) => {
          values[key] = formState[key].value;
        });

        if (onSubmit) {
          await onSubmit(values);
        }
      } catch (error) {
        console.error('Form submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [formState, validateForm, onSubmit],
  );

  const reset = useCallback(() => {
    const state: FormState = {};
    Object.keys(initialValues).forEach((key) => {
      state[key] = {
        value: initialValues[key],
        error: undefined,
        touched: false,
      };
    });
    setFormState(state);
  }, [initialValues]);

  const getFieldProps = useCallback(
    (name: string) => ({
      value: formState[name]?.value || '',
      error: formState[name]?.error,
      onChange: (e: React.ChangeEvent<HTMLInputElement> | any) => {
        const value = e?.target?.value !== undefined ? e.target.value : e;
        setValue(name, value);
      },
    }),
    [formState, setValue],
  );

  return {
    formState,
    setValue,
    setError,
    validateForm,
    handleSubmit,
    reset,
    getFieldProps,
    isSubmitting,
    values: Object.keys(formState).reduce(
      (acc, key) => {
        acc[key] = formState[key].value;
        return acc;
      },
      {} as Record<string, any>,
    ),
  };
};
