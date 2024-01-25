import { UserButton, SignedOut, SignInButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { ThemeToggler } from './ThemeToggler'


function Header() {
    return (
        <header className='flex items-center  justify-between'>
            <Link href='/' className='flex items-center space-x-2'>
                <div className='bg-[#2b01fe] p-2 w-fit'>
                    <Image src='https://www.shareicon.net/data/128x128/2015/11/08/668675_box_512x512.png'
                        className='invert'
                        width={40}
                        height={40}
                        alt='logo' />
                </div>
                <h1 className='font-bold text-xl'>Dropbox</h1>
            </Link>
            <div className='px-5 space-x-2 flex items-center'>
            <ThemeToggler/> 
                <UserButton afterSignOutUrl='/'/>
                <SignedOut>
                    <SignInButton afterSignInUrl='/dashboard'  mode='modal'/>
                </SignedOut>
            </div>
        </header>
    )
}

export default Header
