'use client'

import { UserButton } from '@clerk/nextjs';
import Image from 'next/image'
import { usePathname } from 'next/navigation';
import React from 'react'

const Header = () => {
  const path = usePathname()
  return (
    <div className="flex items-center justify-between p-4 bg-secondary shadow-sm">
      <Image src={"/logo.svg"} width={160} height={100} alt="logo" />
      <ul className="hidden md:flex gap-6 text-xs">
        <li
          className={`hover:text-primary hover:font-semibold transition-all cursor-pointer ${
            path === "/dashboard" && "text-primary font-semibold"
          }`}
        >
          Dashboard
        </li>
        <li
          className={`hover:text-primary hover:font-semibold transition-all cursor-pointer ${
            path === "/questions" && "text-primary font-semibold"
          }`}
        >
          Questions
        </li>
        <li
          className={`hover:text-primary hover:font-semibold transition-all cursor-pointer ${
            path === "/works" && "text-primary font-semibold"
          }`}
        >
          How it Works?
        </li>
        <li
          className={`hover:text-primary hover:font-semibold transition-all cursor-pointer ${
            path === "/upgrade" && "text-primary font-semibold"
          }`}
        >
          Upgrade
        </li>
      </ul>
      <UserButton />
    </div>
  );
}

export default Header