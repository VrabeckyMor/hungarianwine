'use client';

import Image from 'next/image';

export default function Top() {
    return (
        <div className='flex justify-center bg-white'>
            <Image src="/logo-HW.png" alt="Logo Hungarian Wine" width={3000} height={1000} className='w-[10%] min-w-[150px] h-auto py-0.5' />
        </div>
    );
}