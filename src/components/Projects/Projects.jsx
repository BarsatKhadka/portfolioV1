import { LowLevelProjects } from "./LowLevelProjects";
import { WebProjects } from "./WebProjects";
import { IoFolderOpenOutline } from "react-icons/io5";

export const Projects = () => {
  return (
      <div className="ml-8 mt-16 lg:ml-48">
           <p className="text-[#ebffff] mb-6 flex items-center"> 
          <IoFolderOpenOutline className="inline mr-1" /> Projects 
          <span className="h-[1px] bg-gradient-to-r from-[#eebc86]/50 to-transparent ml-4 flex-grow"></span>
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mr-8 ">
        <div className="w-full">
       <WebProjects />
     </div>
      <div className="w-full">
       <LowLevelProjects />
      </div>
        </div>

    </div>
  );
};