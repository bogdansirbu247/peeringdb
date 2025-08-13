'use client';
import { useState } from 'react';
import {  PiCaretRightBold, PiCode } from 'react-icons/pi';

export const DataDropdown = ({
data,
}: {
data: string;
}) => {
const [open, setOpen] = useState<boolean>(false);

return (
<div className='rounded-md border border-dark'>
<button
onClick={() => setOpen(!open)}
className='w-full cursor-pointer grid grid-cols-[1fr_4fr_1fr] items-center justify-items-center gap-6 text-lg font-medium py-2 px-6 leading-normal'
>
<PiCode className='size-10 shrink-0 bg-accent/20 rounded-full text-accent p-2' />
<span>Details</span>
<PiCaretRightBold
className={`shrink-0 size-6 transition-all duration-500 ease-in-out ${
open ? 'rotate-90' : ''
}`}
/>
</button>
<div
className={`${
open ? 'max-h-96 overflow-y-auto' : 'max-h-0'
} overflow-hidden transition-all duration-500 ease-in-out`}
>
    <pre className='bg-gray-900 text-green-400 text-sm p-4 overflow-auto'>
{data}
    </pre>

</div>
</div>
);
};
