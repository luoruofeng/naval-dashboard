import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })
import React , { useState }  from 'react';
import CombinedTaskComponent from '../components/task/CombinedTaskComponent';
import Navbar from '../components/Navbar';




const HomePage = () => {
  const [selectedItem, setSelectedItem] = useState('任务');

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const renderComponent = () => {
    if (selectedItem === '任务') {
      return <CombinedTaskComponent />;
    } else if (selectedItem === '日志') {
      return <div>这是日志组件</div>;
    } else if (selectedItem === '监控') {
      return <div>这是监控组件</div>;
    }
  };

  return (
    <div>
      <Navbar selectedItem={selectedItem} onItemClick={handleItemClick} />
      <div className="container mt-5">{renderComponent()}</div>
    </div>
  );
};

export default HomePage;
