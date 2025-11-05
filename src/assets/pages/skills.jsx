import {
  FaJs,
  FaReact,
  FaVuejs,
  FaPython,
  FaNodeJs,
  FaGitAlt,
  FaCss3Alt,
  FaHtml5,
} from 'react-icons/fa';
import {
  SiTailwindcss,
  SiPostgresql,
  SiExpress,
  SiMongodb,
  SiCanva,
} from 'react-icons/si';

const skillGroups = [
  {
    title: 'Frontend',
    skills: [
      { name: 'HTML', icon: <FaHtml5 />, color: 'text-orange-500' },
      { name: 'CSS', icon: <FaCss3Alt />, color: 'text-blue-500' },
      { name: 'React', icon: <FaReact />, color: 'text-sky-500' },
      { name: 'Vue', icon: <FaVuejs />, color: 'text-green-500' },
      { name: 'Tailwind CSS', icon: <SiTailwindcss />, color: 'text-teal-400' },
      { name: 'Canva', icon: <SiCanva />, color: 'text-indigo-400' },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'JavaScript', icon: <FaJs />, color: 'text-yellow-500' },
      { name: 'Node.js', icon: <FaNodeJs />, color: 'text-green-700' },
      { name: 'Express', icon: <SiExpress />, color: 'text-gray-700' },
      { name: 'Python', icon: <FaPython />, color: 'text-blue-500' },
    ],
  },
  {
    title: 'Database & Version Control',
    skills: [
      { name: 'MongoDB', icon: <SiMongodb />, color: 'text-green-600' },
      { name: 'PostgreSQL', icon: <SiPostgresql />, color: 'text-blue-700' },
      { name: 'Git', icon: <FaGitAlt />, color: 'text-red-500' },
    ],
  },
];

const Skills = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-100">
      <h2 className="text-3xl font-bold text-center mb-12">Skills</h2>
      <div className="max-w-6xl mx-auto">
        {skillGroups.map((group, i) => (
          <div key={i} className="mb-12">
            <h3 className="text-xl font-semibold mb-6 text-center text-gray-700">{group.title}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 justify-items-center">
              {group.skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center bg-white p-4 rounded-xl shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300"
                >
                  <div className={`text-3xl mb-2 p-4 rounded-full bg-gray-100 ${skill.color}`}>
                    {skill.icon}
                  </div>
                  <span className="text-lg font-medium text-gray-800">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;