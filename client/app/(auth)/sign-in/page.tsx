"use client";

import { useTransition } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { signIn } from "next-auth/react";
import toast from 'react-hot-toast';

import Ellipsis from '@/components/Loading';
import { LockIcon, MailIcon } from 'lucide-react';

type SignInSchema = {
    email: string;
    password: string;
};

const SignIn = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInSchema>();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const onSubmit: SubmitHandler<SignInSchema> = (data) => {
        startTransition(async () => {
            try {
                const callback = await signIn('credentials', {
                    ...data,
                    redirect: false,
                });

                if (callback?.ok) {
                    toast.success('Sign in successful', {
                        className: 'xl:mt-16'
                    });

                    setTimeout(() => {
                        router.push('/');
                    }, 2000);
                } else if (callback?.error) {
                    toast.error('Incorrect email address or password', {
                        className: 'xl:mt-16'
                    });
                }
            } catch (error) {
                toast.error('An error occurred. Try again later!', {
                    className: 'xl:mt-16'
                });
            }
        });
    }
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-8 bg-[#8BABD8]">
            <div
                className="
                    w-full 
                    md:w-4/6 
                    lg:w-3/6 
                    xl:w-[520px]
                "
            >
                <div
                    className="
                        translate 
                        h-full 
                        md:h-auto 
                        lg:h-auto 
                        border-0 
                        rounded-lg 
                        shadow-lg 
                        flex 
                        flex-col 
                        w-full 
                        bg-white 
                        outline-none 
                        focus:outline-none
                        py-10
                        relative
                        overflow-hidden
                    "
                >
                    <Image
                        src="/img/dotted-shape.svg"
                        width={70}
                        height={70}
                        alt='dotted shape'
                        className='absolute -top-6 -right-6'
                    />
                    <div className="p-6 sm:p-12 flex-auto">
                        <Image
                            src="/img/chat-logo.svg"
                            width={100}
                            height={100}
                            alt='chat logo'
                            className='mx-auto mb-6 sm:mb-8 sm:scale-125'
                        />
                        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            <div className="relative">
                                <MailIcon className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
                                <input
                                    type="email"
                                    placeholder="Email Address *"
                                    className="py-3 px-4 pl-10 block w-full border border-gray-200 rounded-lg text-sm text-[#6E80A4] focus:border-none focus:ring-0 focus:outline-[#6E80A4]"
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^\S+@\S+$/i,
                                            message: 'Invalid email address',
                                        },
                                    })}
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-500 mt-2">{errors.email.message}</p>
                                )}
                            </div>
                            <div className="relative">
                                <LockIcon className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
                                <input
                                    type="password"
                                    placeholder="Password *"
                                    className="py-3 px-4 pl-10 block w-full border border-gray-200 rounded-lg text-sm text-[#6E80A4] focus:border-none focus:ring-0 focus:outline-[#6E80A4]"
                                    {...register('password', {
                                        required: 'Password is required',
                                    })}
                                />
                                {errors.password && (
                                    <p className="text-sm text-red-500 mt-2">{errors.password.message}</p>
                                )}
                            </div>
                            <button type="submit" className="w-full bg-[#6E80A4] rounded-md h-12 text-white font-medium">
                                {isPending ? <Ellipsis /> : 'Sign In'}
                            </button>
                        </form>
                        <div className="text-center mt-4">
                            <p className="text-sm text-[#6E80A4]/50">
                                Don't have an account?{' '}
                                <a href="/sign-up" className="text-[#6E80A4] hover:underline">
                                    Sign Up
                                </a>
                            </p>
                        </div>
                    </div>
                    <Image
                        src="/img/dotted-shape.svg"
                        width={70}
                        height={70}
                        alt='dotted shape'
                        className='absolute bottom-0 left-1'
                    />
                </div>
            </div>
        </div>
    )
}

export default SignIn