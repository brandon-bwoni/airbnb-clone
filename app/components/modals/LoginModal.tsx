'use client'

import axios from "axios"
import { AiFillGithub } from "react-icons/ai"
import {FcGoogle} from 'react-icons/fc'
import { useState, useCallback } from "react"
import {
  FieldValues,
  SubmitHandler,
  useForm,
} from 'react-hook-form'
import {signIn} from 'next-auth/react'
import { useRouter } from "next/navigation";

import useRegisterModal from "@/app/hooks/useRegisterModal"
import useLoginModal from "@/app/hooks/useLoginModal"

import { error } from "console";
import Modal from "./Modal";
import Heading from "../Heading"
import Input from "../inputs/Input"
import { toast } from "react-hot-toast";
import Button from "../Button";


const LoginModal = () => {
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

   signIn('credentials', {
    ...data,
    redirect: false,
   })
   .then((callback) => {
      setIsLoading(false)

      if(callback?.ok){
        toast.success('Logged in')
        router.refresh()
        loginModal.onClose()
      }

      if(callback?.error){
        toast.error(callback.error)
      }
   })
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome back!"
        subtitle="Login to your account"
        center
      />
      <Input 
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        />
      <Input 
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button 
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn('github')}
      />
      <Button 
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="justify-center flex flex-row items-center gap-2">
          <div>
            Already have an account?
          </div>
          <div onClick={registerModal.onClose} className="text-nuetral-800 cursor-pointer hover:underline hover:text-rose-500">
            Login
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default LoginModal