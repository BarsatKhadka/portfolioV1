import { MdOutlineWorkOutline } from "react-icons/md";

export const Experience = () => {
  return (
    <div className="ml-3 mt-16 lg:ml-48">
      <p className="text-[#ebffff] mb-6 ml-1 flex items-center">
        <MdOutlineWorkOutline className="inline mr-1"/> Experience
        <span className="h-[1px] bg-gradient-to-r from-[#eebc86]/50 to-transparent ml-4 flex-grow"></span>
      </p>
      
      <div className="ml-2 lg:ml-6">
        <p className="">Java tutor | <span className="italic">Bir Amar Singh Secondary School, Nepal</span></p>
        <p className="text-sm text-gray-400 mt-1">December 2022 - March 2023</p>
        
        <ul className="list-disc list-inside mt-2 text-sm text-gray-300">
          <li className="mb-2 mr-2">Tutored 30+ grade 11 Students in mastering core Java concepts including loops, OOP, Collections Framework, JDBC, and Generics.</li>
          <li className="mb-2 mr-2">Explained fundamental data structures (e.g., arrays, linked lists, stacks, queues) and their trade-offs to build a strong programming foundation.</li>
          <li className="mb-2 mr-2">Introduced students to development tools like IntelliJ IDEA and Eclipse for writing and debugging Java code.</li>
          <li className="mb-2 mr-2">Guided students in using version control systems like Git for collaborative coding and project management.</li>
          <li className="mr-2">Assigned and supervised small-scale projects (e.g., library management systems, student grade calculators) to apply Java concepts in real-world scenarios.</li>
        </ul>
      </div>
    </div>
  );
};