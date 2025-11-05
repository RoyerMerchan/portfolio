import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-300 py-6 mt-auto ">
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-lg font-semibold">Contact</h2>
        <div className="flex gap-6 text-2xl">
          <a href="https://www.facebook.com/alejandro.merchan.16/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
            <FaFacebook />
          </a>
          <a href="https://www.instagram.com/royermerchan17/" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-700">
            <FaInstagram />
          </a>
          <a href="https://twitter.com/royermerchan" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:text-sky-700">
            <FaTwitter />
          </a>
          <a href="https://www.linkedin.com/in/royer-merchan-399741385?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900">
            <FaLinkedin />
          </a>
          <a href="https://github.com/RoyerMerchan" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-black">
            <FaGithub />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;