import React from 'react';
import bg from '../assets/bg.jpg'; // Assuming 'bg.jpg' is in the 'assets' folder

const Dashboard = () => {
  return (
    <div
      className="bg-cover bg-no-repeat bg-center bg-fixed w-screen"
      style={{ backgroundImage: `url(${bg})`, height: '100vh' }}
    >
      <div className="flex justify-center items-center h-full">
        <h1 className="text-4xl text-white font-bold">Dashboard</h1>
      </div>
    </div>
  );
};

export default Dashboard;
