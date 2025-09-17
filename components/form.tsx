const CRForm = () => {
  return (
    <div className="self-stretch p-6 mt-4 rounded-xl outline outline-2 outline-offset-[-1px] outline-indigo-50 inline-flex flex-col justify-start items-start gap-6">
      <div className="self-stretch inline-flex justify-between items-center">
        <div className="justify-start text-black text-xl font-bold font-['DM_Sans']">
          Parsed Business Card Result
        </div>
        <div className="self-stretch px-5 py-1 rounded-xl outline outline-1 outline-offset-[-1px] outline-violet-950 flex justify-center items-center gap-2.5 overflow-hidden">
          <div className="justify-start text-violet-950 text-base font-bold font-['DM_Sans']">
            Edit
          </div>
          <div className="w-6 h-6 relative overflow-hidden">
            <div className="w-5 h-5 left-[3px] top-[2px] absolute outline outline-2 outline-offset-[-1px] outline-violet-950" />
          </div>
        </div>
      </div>
      <div className="self-stretch inline-flex justify-start items-start gap-6">
        <div className="flex-1 inline-flex flex-col justify-start items-start gap-1.5">
          <div className="justify-start text-black text-base font-medium font-['DM_Sans']">
            Full Name
          </div>
          <div className="self-stretch px-3 py-3.5 bg-zinc-500/5 rounded-xl outline outline-[0.50px] outline-offset-[-0.50px] outline-zinc-500/50 inline-flex justify-start items-center gap-2.5 overflow-hidden">
            <div className="justify-start text-zinc-600 text-base font-medium font-['DM_Sans']">
              Marcie Thorpe
            </div>
          </div>
        </div>
        <div className="flex-1 inline-flex flex-col justify-start items-start gap-1.5">
          <div className="justify-start text-black text-base font-medium font-['DM_Sans']">
            Job Title
          </div>
          <div className="self-stretch px-3 py-3.5 bg-zinc-500/5 rounded-xl outline outline-[0.50px] outline-offset-[-0.50px] outline-zinc-500/50 inline-flex justify-start items-center gap-2.5 overflow-hidden">
            <div className="justify-start text-zinc-600 text-base font-medium font-['DM_Sans']">
              Computer Support Specialist
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
        <div className="justify-start text-black text-base font-medium font-['DM_Sans']">
          Company
        </div>
        <div className="self-stretch px-3 py-3.5 bg-zinc-500/5 rounded-xl outline outline-[0.50px] outline-offset-[-0.50px] outline-zinc-500/50 inline-flex justify-start items-center gap-2.5 overflow-hidden">
          <div className="justify-start text-zinc-600 text-base font-medium font-['DM_Sans']">
            COMPANY
          </div>
        </div>
      </div>
      <div className="self-stretch inline-flex justify-start items-start gap-6">
        <div className="flex-1 inline-flex flex-col justify-start items-start gap-1.5">
          <div className="justify-start text-black text-base font-medium font-['DM_Sans']">
            Email
          </div>
          <div className="self-stretch px-3 py-3.5 bg-zinc-500/5 rounded-xl outline outline-[0.50px] outline-offset-[-0.50px] outline-zinc-500/50 inline-flex justify-start items-center gap-2.5 overflow-hidden">
            <div className="justify-start text-zinc-600 text-base font-medium font-['DM_Sans']">
              marie.thorpe@companyname.com
            </div>
          </div>
        </div>
        <div className="flex-1 inline-flex flex-col justify-start items-start gap-1.5">
          <div className="justify-start text-black text-base font-medium font-['DM_Sans']">
            Phone
          </div>
          <div className="self-stretch px-3 py-3.5 bg-zinc-500/5 rounded-xl outline outline-[0.50px] outline-offset-[-0.50px] outline-zinc-500/50 inline-flex justify-start items-center gap-2.5 overflow-hidden">
            <div className="justify-start text-zinc-600 text-base font-medium font-['DM_Sans']">
              4232200983
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch inline-flex justify-start items-start gap-6">
        <div className="flex-1 inline-flex flex-col justify-start items-start gap-1.5">
          <div className="justify-start text-black text-base font-medium font-['DM_Sans']">
            Website
          </div>
          <div className="self-stretch px-3 py-3.5 bg-zinc-500/5 rounded-xl outline outline-[0.50px] outline-offset-[-0.50px] outline-zinc-500/50 inline-flex justify-start items-center gap-2.5 overflow-hidden">
            <div className="justify-start text-zinc-600 text-base font-medium font-['DM_Sans']">
              companyname.com
            </div>
          </div>
        </div>
        <div className="flex-1 inline-flex flex-col justify-start items-start gap-1.5">
          <div className="justify-start text-black text-base font-medium font-['DM_Sans']">
            Address
          </div>
          <div className="self-stretch px-3 py-3.5 bg-zinc-500/5 rounded-xl outline outline-[0.50px] outline-offset-[-0.50px] outline-zinc-500/50 inline-flex justify-start items-center gap-2.5 overflow-hidden">
            <div className="justify-start text-zinc-600 text-base font-medium font-['DM_Sans']">
              50 Rockville St., Mount Holly, NJ 08060
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CRForm;
