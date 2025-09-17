import Image from "next/image";
const Header = () => {
  return (
    <>
      <div className="w-full px-8 py-4 mt-10 bg-indigo-50 rounded-xl inline-flex justify-center items-center gap-6 overflow-hidden">
        <Image
          src="/images/dropped-image1.png"
          alt="Placeholder"
          className="w-40 h-12"
          width={160}
          height={51}
        />
        <div className="inline-flex flex-col justify-center items-start gap-1">
          <div className="inline-flex justify-start items-center gap-1">
            <div className="w-6 h-6 relative overflow-hidden">
              <Image
                src="/images/credit-card.png"
                alt="Credit card"
                fill
                className="object-contain w-5 h-3.5 left-[2px] top-[5px]"
              />
            </div>
            <div className="justify-start text-neutral-900 text-3xl font-bold font-['DM_Sans']">
              CRHT Business Card Vault
            </div>
          </div>
          <div className="justify-start text-zinc-800 text-base font-normal font-['DM_Sans']">
            Snap a card, add a few notes, and save.
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
