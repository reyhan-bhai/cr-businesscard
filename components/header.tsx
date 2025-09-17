import Image from "next/image";
const Header = () => {
  return (
    <>
      <div className="w-full px-4 sm:px-8 py-4 mt-6 sm:mt-10 bg-indigo-50 rounded-xl flex flex-col sm:inline-flex sm:flex-row justify-center items-center gap-4 sm:gap-6 overflow-hidden">
        <Image
          src="/images/dropped-image1.png"
          alt="Placeholder"
          className="w-32 h-10 sm:w-40 sm:h-12 flex-shrink-0"
          width={160}
          height={51}
        />
        <div className="flex flex-col justify-center items-center sm:items-start gap-1 text-center sm:text-left">
          <div className="flex justify-center sm:justify-start items-center gap-1 flex-wrap">
            <div className="w-5 h-5 sm:w-6 sm:h-6 relative overflow-hidden flex-shrink-0">
              <Image
                src="/images/credit-card.png"
                alt="Credit card"
                fill
                className="object-contain"
              />
            </div>
            <div className="text-neutral-900 text-base sm:text-2xl lg:text-3xl font-bold font-['DM_Sans'] leading-tight">
              CRHT Business Card Vault
            </div>
          </div>
          <div className="text-zinc-800 text-sm sm:text-base font-normal font-['DM_Sans'] max-w-xs sm:max-w-none">
            Snap a card, add a few notes, and save.
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
