"use client";

import { useState, useTransition } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import toast from 'react-hot-toast';

import Ellipsis from '@/components/Loading';
import { Asterisk, EyeIcon, EyeOffIcon, LockIcon, MailIcon, Phone, User2 } from 'lucide-react';

type SignUpSchema = {
    name: string
    email: string;
    password: string;
    phoneNumber: string;
};

const MaskedPasswordInput = ({ register, passwordError }: any) => {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    return (
        <div className="relative">
            <LockIcon className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
            <input
                type={showPassword ? "text" : "password"}
                placeholder="Password *"
                className={`py-3 px-4 pl-10 block w-full border border-gray-200 rounded-lg ${!showPassword ? 'text-transparent selection:text-transparent' : 'text-[#6E80A4]'} text-sm focus:border-none focus:ring-0 focus:outline-[#6E80A4]`}
                {...register('password', {
                    required: 'Password is required',
                    minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters long',
                    },
                })}
                value={password}
                onChange={handlePasswordChange}
            />
            <div className="absolute top-3.5 left-10 flex">
                {!showPassword && password.split('').map((_, index) => (
                    <Asterisk key={index} className="h-4 w-4 text-[#6E80A4]" />
                ))}
            </div>
            <button
                type="button"
                className="absolute top-3 right-5 h-3 w-3 text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
            >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
            {passwordError && (
                <p className="text-xs text-red-500 mt-2">{passwordError.message}</p>
            )}
        </div>
    );
};

const SignUp = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpSchema>();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const onSubmit: SubmitHandler<SignUpSchema> = (data) => {
        startTransition(async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error);
                }

                toast.success('You can now sign in to your account', {
                    className: 'xl:mt-8',
                    duration: 2000
                });

                setTimeout(() => {
                    router.push('/sign-in');
                }, 2000);
            } catch (error) {
                if (error instanceof Error) {
                    toast.error(error.message, {
                        className: 'xl:mt-8',
                        duration: 2000
                    });
                } else {
                    toast.error('An error occurred. Try again later!', {
                        className: 'xl:mt-8',
                        duration: 2000
                    });
                }
            }
        });
    }

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-8 bg-[#8BABD8]">
            <div
                className="
                    w-full
                    sm:w-4/6 
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
                        py-12
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
                                <User2 className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Name *"
                                    className="py-3 px-4 pl-10 block w-full border border-gray-200 rounded-lg text-sm text-[#6E80A4] focus:border-none focus:ring-0 focus:outline-[#6E80A4]"
                                    {...register('name', {
                                        required: 'Name is required',
                                    })}
                                />
                                {errors.email && (
                                    <p className="text-xs text-red-500 mt-2">{errors.name?.message}</p>
                                )}
                            </div>
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
                                    <p className="text-xs text-red-500 mt-2">{errors.email.message}</p>
                                )}
                            </div>
                            <div className="relative">
                                <Phone className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Phone Number *"
                                    className="py-3 px-4 pl-10 block w-full border border-gray-200 rounded-lg text-sm text-[#6E80A4] focus:border-none focus:ring-0 focus:outline-[#6E80A4]"
                                    {...register('phoneNumber', {
                                        required: 'Phone number is required',
                                    })}
                                />
                                {errors.email && (
                                    <p className="text-xs text-red-500 mt-2">{errors.phoneNumber?.message}</p>
                                )}
                            </div>
                            <MaskedPasswordInput register={register} passwordError={errors.password} />
                            <button type="submit" className="w-full bg-[#6E80A4] rounded-md h-12 text-white font-medium" disabled={isPending}>
                                {isPending ? <Ellipsis /> : 'Sign Up'}
                            </button>
                        </form>
                        <div className="text-center mt-4">
                            <p className="text-sm text-[#6E80A4]/50">
                                Already have an account?{' '}
                                <a href="/sign-in" className="text-[#6E80A4] hover:underline">
                                    Sign In
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

export default SignUp