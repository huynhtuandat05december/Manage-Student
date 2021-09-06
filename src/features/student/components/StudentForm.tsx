import { Box, Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useAppSelector } from 'app/hooks';
import { InputField } from 'components/FormFields/InputField';
import { RadioGroupField } from 'components/FormFields/RadioGroupField';
import { SelectField } from 'components/FormFields/SelectField';
import { Student } from 'models';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export interface StudentFormProps {
  initialValues: Student;
  onSubmit?: (formValues: Student) => void;
}

export function StudentForm({ initialValues, onSubmit }: StudentFormProps) {
  const [error, setError] = useState<string>('');
  const cityOptions=useAppSelector(state=>state.city.cityList)
  const { control, handleSubmit } = useForm({
    defaultValues: initialValues,
  });
  const handleFormSubmit =  async (formValues: Student) => {
    try {
      // Clear previous submission error
      setError('');

      await onSubmit?.(formValues);
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <Box>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField name="name" control={control} label="Full Name" />
        <RadioGroupField
          name="gender"
          control={control}
          label="Gender"
          options={[
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
          ]}
        />
        <InputField name="age" control={control} label="Age" type="number" />
        <InputField name="mark" control={control} label="Mark" type="number" />
        {Array.isArray(cityOptions) && cityOptions.length > 0 && (
          <SelectField name="city" control={control} label="City" options={cityOptions} />
        )}
        {error && <Alert severity="error">{error}</Alert>}
        <Box mt={3}>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
}
