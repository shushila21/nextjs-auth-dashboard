'use client';

import type React from 'react';
import { useState, useCallback } from 'react';

export interface FormField<T = unknown> {
  value: T;
  error?: string;
  touched?: boolean;
}

export type FormState<TValues> = {
  [K in keyof TValues]: FormField<TValues[K]>;
};

export interface UseFormHandlerOptions<TValues> {
  initialValues?: TValues;
  validationRules?: {
    [K in keyof TValues]?: (value: TValues[K]) => string | undefined;
  };
  onSubmit?: (values: TValues) => void | Promise<void>;
}

export const useFormHandler = <TValues extends Record<string, unknown>>(
  options: UseFormHandlerOptions<TValues> = {},
) => {
  const {
    initialValues = {} as TValues,
    validationRules = {} as UseFormHandlerOptions<TValues>['validationRules'],
    onSubmit,
  } = options;

  const [formState, setFormState] = useState<FormState<TValues>>(() => {
    const state = {} as FormState<TValues>;
    for (const key in initialValues) {
      state[key] = {
        value: initialValues[key],
        error: undefined,
        touched: false,
      };
    }
    return state;
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const setValue = useCallback(
    <K extends keyof TValues>(name: K, value: TValues[K]) => {
      setFormState((prev) => ({
        ...prev,
        [name]: {
          ...prev[name],
          value,
          touched: true,
          error: validationRules?.[name]?.(value),
        },
      }));
    },
    [validationRules],
  );

  const setError = useCallback(
    <K extends keyof TValues>(name: K, error: string) => {
      setFormState((prev) => ({
        ...prev,
        [name]: {
          ...prev[name],
          error,
        },
      }));
    },
    [],
  );

  const validateForm = useCallback((): boolean => {
    let isValid = true;
    const newState = { ...formState };

    for (const key in formState) {
      const validator = validationRules?.[key];
      const value = formState[key].value;
      const error = validator?.(value);
      newState[key] = {
        ...newState[key],
        error,
        touched: true,
      };
      if (error) isValid = false;
    }

    setFormState(newState);
    return isValid;
  }, [formState, validationRules]);

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      if (e) e.preventDefault();

      if (!validateForm()) return;

      setIsSubmitting(true);
      try {
        const values = Object.keys(formState).reduce((acc, key) => {
          acc[key as keyof TValues] = formState[key as keyof TValues].value;
          return acc;
        }, {} as TValues);

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
    const state = {} as FormState<TValues>;
    for (const key in initialValues) {
      state[key] = {
        value: initialValues[key],
        error: undefined,
        touched: false,
      };
    }
    setFormState(state);
  }, [initialValues]);

  const getFieldProps = useCallback(
    <K extends keyof TValues>(name: K) => ({
      value: formState[name]?.value ?? '',
      error: formState[name]?.error,
      onChange: (e: React.ChangeEvent<HTMLInputElement> | TValues[K]) => {
        if (!e) return;
        const value =
          typeof e === 'object' && 'target' in e && e.target
            ? (e.target as HTMLInputElement).value
            : e;
        setValue(name, value as TValues[K]);
      },
    }),
    [formState, setValue],
  );

  const values = Object.keys(formState).reduce((acc, key) => {
    acc[key as keyof TValues] = formState[key as keyof TValues].value;
    return acc;
  }, {} as TValues);

  return {
    formState,
    setValue,
    setError,
    validateForm,
    handleSubmit,
    reset,
    getFieldProps,
    isSubmitting,
    values,
  };
};
