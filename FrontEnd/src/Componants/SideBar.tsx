import { useState } from "react";
import { DocumentIcon } from "../Icons/DocumentIcon";
import { HashTag } from "../Icons/HashTag";
import { LinkIcon } from "../Icons/LinkIcon";
import { Logo } from "../Icons/Logo";
import { TwitterIcon } from "../Icons/TwitterIcon";
import { YoutubeIcon } from "../Icons/YoutubeIcon";
import { SideBarItem } from "./SideBarItem";

export function SideBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Sidebar for larger screens */}
      <div className={`h-screen bg-white border-r w-72 fixed left-0 top-0 pl-6 lg:block ${isOpen ? 'block' : 'hidden'}`}>
        <div className="flex text-2xl pt-8 items-center font-bold">
          <div className="pr-2 text-purple-600">
            <Logo />
          </div>
          Second Brain
        </div>
        <div className="pt-8 pl-4">
          <SideBarItem text="Twitter" icon={<TwitterIcon />} />
          <SideBarItem text="Youtube" icon={<YoutubeIcon />} />
          <SideBarItem text="Documents" icon={<DocumentIcon />} />
          <SideBarItem text="Links" icon={<LinkIcon />} />
          <SideBarItem text="Tags" icon={<HashTag />} />
        </div>
      </div>

      {/* Sidebar toggle button for mobile */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-purple-600 text-white rounded-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Hamburger Icon */}
        <span className="block w-6 h-0.5 bg-white mb-1"></span>
        <span className="block w-6 h-0.5 bg-white mb-1"></span>
        <span className="block w-6 h-0.5 bg-white"></span>
      </button>

      {/* Sidebar for small screens (mobile) */}
      <div className={`h-screen bg-white border-r w-72 fixed left-0 top-0 pl-6 lg:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="flex text-2xl pt-8 items-center font-bold">
          <div className="pr-2 text-purple-600">
            <Logo />
          </div>
          Second Brain
        </div>
        <div className="pt-8 pl-4">
          <SideBarItem text="Twitter" icon={<TwitterIcon />} />
          <SideBarItem text="Youtube" icon={<YoutubeIcon />} />
          <SideBarItem text="Documents" icon={<DocumentIcon />} />
          <SideBarItem text="Links" icon={<LinkIcon />} />
          <SideBarItem text="Tags" icon={<HashTag />} />
        </div>
      </div>
    </div>
  );
}
