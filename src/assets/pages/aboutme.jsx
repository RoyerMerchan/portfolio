// src/pages/About.jsx
import React from 'react';

export default function About() {
  return (
    <section className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="max-w-3xl text-center">
        <img 
          src="/imageme.jpg" 
          alt="Mi foto" 
          className="w-50 h-60 rounded-full mx-auto mb-6 border-4 border-blue-600"
        />
        <h1 className="text-4xl font-bold mb-4">Hi, I am Royer Merchan 👋</h1>
        <p className="text-lg text-gray-700 mb-6">
          I am a computer enginner , passionate about innovating, creating modern applications, learning and experimenting in new areas of programming, I have experience in various languages ​​and frameworks that I have used throughout my university career.
        </p>
        <p className="text-lg text-gray-700 mb-6">
          This is my portfolio where you can learn more about me and my work.
        </p>

        <div className="flex justify-center gap-4">
          <a 
            href="/cv.docx" 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-400 transition">
            Download CV
          </a>
         
        </div>
      </div>
    </section>
  );
}
