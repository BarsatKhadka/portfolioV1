import { IoLocationOutline } from "react-icons/io5";
import { FaLandmarkDome } from "react-icons/fa6";

export const Header = () => {
  return (
    <>
     <div className="ml-4 mt-8 lg:ml-48">
  
  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">

    <p className="mb-2 lg:mb-1">
      <span className="text-[#ebffff]">Barsat Khadka</span>{" "}
      <span className="text-sm block lg:inline mt-1 lg:mt-0 lg:ml-8 italic">
        Seeking SWE Internships @2025
      </span>
    </p>
    
    <a href="https://drive.google.com/uc?export=download&id=1ubUzCBNGE_ovCoD2ExKqsK6laWR4JCfA" className="text-[#ebffff] underline mb-4 lg:mb-0 lg:mr-64">
      Resume
    </a>
  </div>


  <p className="mb-4 text-gray">
    <span className="text-sm">
      <IoLocationOutline className="inline" /> USA
    </span>
    <span className="ml-4 lg:ml-24 text-sm italic block lg:inline mt-1 lg:mt-0">
      Freshman at the University of Southern Mississippi
    </span>
  </p>

        <p className="text-sm mb-2 sm:mr-8">
          <span className="text-[#eebc86] sm:mr-2">Languages:</span>
          &nbsp;&nbsp;&nbsp;&nbsp; Java, Python, Javascript, Typescript, SQL, C++
        </p>

        <p className="text-sm mb-2 sm:mr-8">
          <span className="text-[#eebc86]">Frameworks:</span>
          &nbsp;&nbsp; SpringBoot, Spring Security, React.js, Tailwind CSS
        </p>

        <p className="text-sm sm:mr-8">
          <span className="text-[#eebc86] sm:mr-2">Extras:</span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; JPA, Maven, Postman API, Docker, Git, AWS, Linux
        </p>
      </div>
    </>
  );
};
