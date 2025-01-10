import { IoLocationOutline } from "react-icons/io5";
import { FaLandmarkDome } from "react-icons/fa6";

export const Header = () => {
  return (
    <>
      <div className="ml-8 mt-8 lg:ml-48">
        <div className="flex justify-between items-center">
          <p className="lg:mb-1">
            <span className="mr-8 text-[#ebffff]">Barsat Khadka</span> <span className="text-sm">Seeking SWE Internships @2025</span>
          </p>
          <a href="#" className="text-[#ebffff] underline lg:mr-64 mr-4">
            Resume
          </a>
        </div>
        <p className="mb-4 text-gray">
          <span className="text-sm">
            <IoLocationOutline className="inline" /> USA
          </span>
          <span className="ml-24 text-sm italic">
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
