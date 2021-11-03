import { yupResolver } from "@hookform/resolvers/yup"
import { BaseButton, BaseInput, BaseInputGroup } from "components/ui"
import { useAuth } from "context/auth"
import React, { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import * as yup from "yup"
import * as S from "./styles"

interface ISignUpFormInputs {
  email: string
  password: string
  confirmPassword: string
}

const schema = yup
  .object()
  .shape({
    email: yup.string().email().trim().lowercase().required(),
    password: yup
      .string()
      .min(6, "Password should be of minimum 6 characters length")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  })
  .required()

export default function SignUpForm() {
  const { signUp } = useAuth()
  const [submitError, setSubmitError] = useState({
    error: false,
    message: "",
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ISignUpFormInputs>({
    resolver: yupResolver(schema),
  })

  const submitHandler: SubmitHandler<ISignUpFormInputs> = async (data, e) => {
    e?.preventDefault()
    const { error } = await signUp(data)
    if (error) {
      setSubmitError({
        error: true,
        message: "error signing up",
      })
    }
  }

  return (
    <>
      {submitError.error && <p>{submitError.error}</p>}
      <S.Form onSubmit={handleSubmit(submitHandler)}>
        <BaseInputGroup>
          <label htmlFor="email">Email</label>
          <BaseInput id="email" {...register("email")} />
        </BaseInputGroup>
        {errors.email?.message && <p>{errors.email?.message}</p>}
        <BaseInputGroup>
          <label htmlFor="password">Password</label>
          <BaseInput id="password" {...register("password")} />
        </BaseInputGroup>
        {errors.password?.message && <p>{errors.password?.message}</p>}

        <BaseInputGroup>
          <label htmlFor="confirmPassword">Confirm Your Password</label>
          <BaseInput id="confirmPassword" {...register("confirmPassword")} />
        </BaseInputGroup>
        {errors.confirmPassword?.message && (
          <p>{errors.confirmPassword?.message}</p>
        )}
        <BaseButton type="submit">sign up</BaseButton>
      </S.Form>
    </>
  )
}
