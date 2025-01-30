import { ReactElement } from "react";

export function SideBarItem({ text, icon }: { text: string; icon: ReactElement }) {
  return (
    <div className="flex text-gray-700 font-medium py-2 cursor-pointer pt-6 hover:bg-gray-50 rounded max-w-48 pl-1 transition-all duration-150 hover:shadow-md hover:scale-105">
      <div className="pr-6 flex-shrink-0">
        {icon}
      </div>
      {/* Text visibility on larger screens only */}
      <div className="hidden lg:block">{text}</div>
    </div>
  );
}
