import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';


const projects = [
  {
    title: 'videogame in canvas',
    description: 'I developed a 2D video game using the HTML5 Canvas element and pure JavaScript, implementing the logic of animations, collision detection, character control and scenario rendering. The project demonstrates the efficient use of game loop, keyboard event management and graphics optimization for a smooth experience..',
    image: 'juego 2d.png',
  },
  {
    title: 'Virus',
    description: 'I developed an educational simulation of a computer virus for learning purposes in cybersecurity and systems analysis. The project consists of a simulated installer that shows how a program could replicate the behavior of malware, but without causing real damage to the system. Through this project, concepts of reverse engineering, computer security, process control and threat prevention education were explored.',
    image: 'virus pc.webp',
  },
  {
    title: 'knotChange whatsapp clone',
    description: 'KnotChange is a WhatsApp clone developed as a personal project to practice UX design and real-time messaging systems. It includes individual chats, a contact list, instant message sending/receiving, and a responsive interface optimized for mobile and desktop.',
    image: 'knot.jpg',
  },
  { 
    title: 'SpotiBad Spotify clone', 
    description: 'SpotiBad is a Spotify clone developed as a personal project to practice UI design and music streaming systems. It includes features such as music search, playlists, song playback, and a user-friendly interface optimized for both mobile and desktop devices.',
    image: 'clon spotify.png',
  },
  {
    title: 'sportApp (my Tesis project)',
    description: 'SportApp is a web application developed with the aim of digitizing and automating the management of university sporting events. It allows you to register and manage teams, players, tournaments, matchdays, results and statistics, offering an intuitive and responsive interface. The project seeks to improve efficiency in the organization of competitions and strengthen student participation through the use of modern web technologies.',
    image: 'sportapp.png',
  },

  // Agrega más proyectos aquí
];

const ProjectCarousel = () => {
  return (
    <div className="pt-24 px-6"> {/* pt-24 para que no lo tape el navbar */}
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        slidesPerView={1}
      >
        {projects.map((project, index) => (
          <SwiperSlide key={index}>
            <div className="flex bg-white rounded-lg shadow-lg overflow-hidden max-w-3xl mx-auto">
              <img
                src={project.image}
                alt={project.title}
                className="w-1/3 object-cover"
              />
              <div className="p-6 w-2/3">
                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-700">{project.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProjectCarousel;
