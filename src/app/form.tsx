'use client'

import { useEffect, useState } from "react"
import { useDebouncedCallback } from "use-debounce";
import { DataDropdown } from "./dropdown";

export const Form = () => {
    const [data, setData] = useState<{data:{created:string,updated:string,ix:{status:string, name:string,website:string,country:string,city:string}}[], message:string; meta:{error:string;}}|null>(null);
    const [status, setStatus] = useState<"success" | "error" | null>(null);
    const [isLoading, setIsLoading] = useState(false)

    const handleSearch = useDebouncedCallback((id) => {
        id ? fetch(`https://www.peeringdb.com/api/ixlan/${id}`).then(res=>res.json()).then(json=>setData(json)).catch(error=>console.error('Fetch error', error)) : setData(null);
        setIsLoading(false);
    }, 300)


    useEffect(()=>{
        setStatus(data ? data?.data ? 'success': 'error' : null )
    },[data])

   

    return <div className="max-w-screen-xl w-full flex flex-col gap-2 p-4 rounded bg-white shadow-md">
        {status && <div className={`${status === 'success' ? 'text-emerald-600 bg-emerald-200' : 'text-red-600 bg-red-200'} rounded-md px-4 py-2 text-center`}>
           {status}
       </div>}
       <input className={`rounded-md px-4 py-2 border-2 ${status ? status === 'error' ? 'border-red-600' : 'border-emerald-600 focus:border-emerald-600' : 'border-neutral-400'} outline-0`} type="text" name="id" placeholder="Insert id"  defaultValue={''} onChange={(e) => {
        setIsLoading(true)
        handleSearch(e.target.value)

}}/>
      
    {isLoading ? <p className="text-center text-black/75 p-4">Loading ...</p> : <div>
        
        {data?.data ? <div className="space-y-4"><div className="px-4 py-2 rounded-lg border border-emerald-500 grid grid-cols-[1fr_2fr]">
            <span className="font-semibold text-black">Status:</span><span className="text-black/75">{data?.data[0].ix.status}</span>
        <span className="font-semibold text-black">Name:</span><span className="text-black/75">{data.data[0].ix.name}</span>
        
        <span className="font-semibold text-black">Created:</span><span className="text-black/75">{data.data[0].created}</span>
                 <span className="font-semibold text-black">Updated:</span><span className="text-black/75">{data.data[0].updated}</span>
        <span className="font-semibold text-black">Website:</span><span className="text-black/75">{data.data[0].ix.website}</span>
        <span className="font-semibold text-black">Country:</span><span className="text-black/75">{data.data[0].ix.country}</span>
        <span className="font-semibold text-black">City:</span><span className="text-black/75">{data.data[0].ix.city}</span>

     </div>
     <DataDropdown data={JSON.stringify(data, null, 2)} />
     </div> : 
     
    data?.meta?.error || data?.message && <div className="px-4 py-2 rounded-lg border border-red-500">
        { data?.meta?.error && <p>{data?.meta?.error}</p> }
        { data?.message && <p>{data.message}</p>}
     </div>}
   
       </div>
      }
    </div>
    
    
    
    
}