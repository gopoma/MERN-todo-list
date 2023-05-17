import { type ChangeEvent, useState } from 'react'

// eslint-disable-next-line
export const useForm = <T>(initialFormState: T) => {
  const [formState, setFormState] = useState<T>(initialFormState)

  const onInputChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setFormState({
      ...formState,
      [name]: value
    })
  }

  const onResetForm = (): void => {
    setFormState(initialFormState)
  }

  return {
    ...formState,
    formState,

    onInputChange,
    onResetForm
  }
}
