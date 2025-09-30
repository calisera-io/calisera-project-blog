import {
  Smartphone,
  MonitorOff,
  Bell,
  Calendar,
  FileStack,
} from "lucide-react";

export default function CoreFeaturesGrid() {
  return (
    <div className="relative mt-16">
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
        {/* Card 1 */}
        <div className="bg-[#FAFAFA] dark:bg-[#111827] border border-[#E7E7E9] dark:border-[#404551] rounded-[32px] overflow-hidden w-full h-full flex flex-col items-start justify-start p-4 md:p-6 text-left">
          <div className="p-[15px] bg-[#ffffff50] dark:bg-[#11182773] backdrop-blur-[30px] border border-[#ffffff] dark:border-[#FFFFFFCC] rounded-full shadow-[0_6px_12px_0_rgba(0,0,0,0.05)] flex items-center justify-center">
            <Smartphone className="w-8 h-8 text-gray-700" />
          </div>
          <div className="w-full flex-grow flex flex-col items-start justify-start text-start pr-3 md:pr-5">
            <p className="text-[24px] font-medium leading-[28px] text-[#111827] dark:text-[#FFFFFF] mt-[20px]">
              Instagram Integration
            </p>
            <p className="font-light text-[17px] text-[#404551] dark:text-[#FFFFFFCC] mb-[14px] mt-[8px] leading-relaxed">
              Share your booking link directly in your Instagram bio, stories,
              and DMs. Your clients book without ever leaving their comfort
              zone.
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-[#FAFAFA] dark:bg-[#111827] border border-[#E7E7E9] dark:border-[#404551] rounded-[32px] overflow-hidden w-full h-full flex flex-col items-start justify-start p-4 md:p-6 text-left">
          <div className="p-[15px] bg-[#ffffff50] dark:bg-[#11182773] backdrop-blur-[30px] border border-[#ffffff] dark:border-[#FFFFFFCC] rounded-full shadow-[0_6px_12px_0_rgba(0,0,0,0.05)] flex items-center justify-center">
            <MonitorOff className="w-8 h-8 text-gray-700" />
          </div>
          <div className="w-full flex-grow flex flex-col items-start justify-start text-start pr-3 md:pr-5">
            <p className="text-[24px] font-medium leading-[28px] text-[#111827] dark:text-[#FFFFFF] mt-[20px]">
              No Website Needed
            </p>
            <p className="font-light text-[17px] text-[#404551] dark:text-[#FFFFFFCC] mb-[14px] mt-[8px] leading-relaxed">
              Skip the expensive website. Your Calisera profile becomes your
              professional booking hub that works everywhere.
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-[#FAFAFA] dark:bg-[#111827] border border-[#E7E7E9] dark:border-[#404551] rounded-[32px] overflow-hidden w-full h-full flex flex-col items-start justify-start p-4 md:p-6 text-left">
          <div className="p-[15px] bg-[#ffffff50] dark:bg-[#11182773] backdrop-blur-[30px] border border-[#ffffff] dark:border-[#FFFFFFCC] rounded-full shadow-[0_6px_12px_0_rgba(0,0,0,0.05)] flex items-center justify-center">
            <Bell className="w-8 h-8 text-gray-700" />
          </div>
          <div className="w-full flex-grow flex flex-col items-start justify-start text-start pr-3 md:pr-5">
            <p className="text-[24px] font-medium leading-[28px] text-[#111827] dark:text-[#FFFFFF] mt-[20px]">
              Client Communication
            </p>
            <p className="font-light text-[17px] text-[#404551] dark:text-[#FFFFFFCC] mb-[14px] mt-[8px] leading-relaxed">
              Automated confirmations, reminders, and follow-ups that maintain
              your personal touch while saving time.
            </p>
          </div>
        </div>

        {/* Card 4 */}
        <div className="md:col-span-2 lg:col-span-3">
          <div className="flex flex-wrap justify-center gap-8 items-stretch">
            <div className="w-full md:w-[calc(50%-1rem)] lg:basis-[calc((100%-(2*2rem))/3)] lg:max-w-[calc((100%-(2*2rem))/3)]">
            <div className="bg-[#FAFAFA] dark:bg-[#111827] border border-[#E7E7E9] dark:border-[#404551] rounded-[32px] overflow-hidden w-full h-full flex flex-col items-start justify-start p-4 md:p-6 text-left">
              <div className="p-[15px] bg-[#ffffff50] dark:bg-[#11182773] backdrop-blur-[30px] border border-[#ffffff] dark:border-[#FFFFFFCC] rounded-full shadow-[0_6px_12px_0_rgba(0,0,0,0.05)] flex items-center justify-center">
                <Calendar className="w-8 h-8 text-gray-700" />
              </div>
              <div className="w-full flex-grow flex flex-col items-start justify-start text-start pr-3 md:pr-5">
                <p className="text-[24px] font-medium leading-[28px] text-[#111827] dark:text-[#FFFFFF] mt-[20px]">
                  Smart Scheduling
                </p>
                <p className="font-light text-[17px] text-[#404551] dark:text-[#FFFFFFCC] mb-[14px] mt-[8px] leading-relaxed">
                  Intelligent calendar management that prevents double-bookings
                  and maximizes your productive hours.
                </p>
              </div>
            </div>
            </div>

            {/* Card 5 */}
            <div className="w-full md:w-[calc(50%-1rem)] lg:basis-[calc((100%-(2*2rem))/3)] lg:max-w-[calc((100%-(2*2rem))/3)]">
            <div className="bg-[#FAFAFA] dark:bg-[#111827] border border-[#E7E7E9] dark:border-[#404551] rounded-[32px] overflow-hidden w-full h-full flex flex-col items-start justify-start p-4 md:p-6 text-left">
              <div className="p-[15px] bg-[#ffffff50] dark:bg-[#11182773] backdrop-blur-[30px] border border-[#ffffff] dark:border-[#FFFFFFCC] rounded-full shadow-[0_6px_12px_0_rgba(0,0,0,0.05)] flex items-center justify-center">
                <FileStack className="w-8 h-8 text-gray-700" />
              </div>
              <div className="w-full flex-grow flex flex-col items-start justify-start text-start pr-3 md:pr-5">
                <p className="text-[24px] font-medium leading-[28px] text-[#111827] dark:text-[#FFFFFF] mt-[20px]">
                  Flexible Offers
                </p>
                <p className="font-light text-[17px] text-[#404551] dark:text-[#FFFFFFCC] mb-[14px] mt-[8px] leading-relaxed">
                  Set up one-on-one appointments, group classes, or special events
                  with custom pricing and scheduling—all manageable from your
                  mobile device.
                </p>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
