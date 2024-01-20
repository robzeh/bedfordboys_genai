import { useState } from "react"
import { useParams } from 'react-router-dom';

const Patient = () => {
    const { id } = useParams();

    return (
     <>
         <div className="flex justify-center items-center">
             <div
                 className="fixed bg-white p-6 rounded-lg border border-[#e5e7eb] w-[440px] h-[634px]"
                 style={{ boxShadow: '0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(0 0 0 / 0.05)' }}
             >
                 <div className="flex flex-col space-y-1.5 pb-6">
                     <h2 className="font-semibold text-lg tracking-tight">Chatbot</h2>
                 </div>

                 <div className="pr-4 h-[474px]" style={{ minWidth: '100%', display: 'table' }}>
                     <div className="flex gap-3 my-4 text-gray-600 text-sm flex-1">
                         {/* ... (First message) */}
                         message 1
                     </div>

                     <div className="flex gap-3 my-4 text-gray-600 text-sm flex-1">
                         {/* ... (Second message) */}
                         message 2
                     </div>

                     <div className="flex gap-3 my-4 text-gray-600 text-sm flex-1">
                         {/* ... (Third message) */}
                         message 3
                     </div>
                 </div>

                 <div className="flex items-center pt-0">
                     <form className="flex items-center justify-center w-full space-x-2">
                         <input
                             className="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] disabled:cursor-not-allowed disabled:opacity-50 text-[#030712] focus-visible:ring-offset-2"
                             placeholder="Type your message"
                             value=""
                         />
                         <button
                             className="inline-flex items-center justify-center rounded-md text-sm font-medium text-[#f9fafb] disabled:pointer-events-none disabled:opacity-50 bg-black hover:bg-[#111827E6] h-10 px-4 py-2"
                         >
                             Send
                         </button>
                     </form>
                 </div>
             </div>
         </div>
     </>

    );
}

export default Patient;