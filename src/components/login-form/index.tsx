import { yupResolver } from "@hookform/resolvers/yup"
import { BaseButton, BaseInput, BaseInputGroup } from "components/ui"
import { useAuth } from "context/auth"
import React, { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import * as yup from "yup"
import * as S from "./styles"

interface ILoginFormInputs {
  email: string
  password: string
}

const schema = yup
  .object()
  .shape({
    email: yup.string().email().trim().lowercase().required(),
    password: yup
      .string()
      .min(6, "Password should be of minimum 6 characters length")
      .required("Password is required"),
  })
  .required()

export default function LoginForm() {
  const { signIn } = useAuth()

  const [submitError, setSubmitError] = useState({
    error: false,
    message: "",
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ILoginFormInputs>({
    resolver: yupResolver(schema),
  })

  const submitHandler: SubmitHandler<ILoginFormInputs> = async (data, e) => {
    e?.preventDefault()
    const { error } = await signIn(data)

    if (error) {
      setSubmitError({
        error: true,
        message: "error signing in",
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
        <BaseButton type="submit">sign up</BaseButton>
      </S.Form>
    </>
  )
}
