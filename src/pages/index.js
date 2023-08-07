import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import {K8S_DASHBOARD_URL, MONITORING_URL, LOG_URL} from '@/config'

const inter = Inter({ subsets: ['latin'] })
import React , { useState }  from 'react';
import CombinedTaskComponent from '../components/task/CombinedTaskComponent';
import Navbar from '../components/Navbar';




const HomePage = () => {
  const [selectedItem, setSelectedItem] = useState('task');

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const renderComponent = () => {
    if (selectedItem === 'task') {
      return <div className="container mt-5"><CombinedTaskComponent /></div>;
    } else if (selectedItem === 'log') {
      return (
        <iframe
          title="Log Dashboard"
          src={LOG_URL}
          width="100%"
          height="800px"
        />
      );
    } else if (selectedItem === 'monitoring') {
      return (
        <iframe
          title="Monitoring Dashboard"
          src={MONITORING_URL}
          width="100%"
          height="800px"
        />
      );
    } else if (selectedItem === 'K8S') {
      return (
        <iframe
          title="Kubernetes Dashboard"
          src={K8S_DASHBOARD_URL}
          width="100%"
          height="800px"
        />
      );
    }
  };

  return (
    <div>
      <Navbar selectedItem={selectedItem} onItemClick={handleItemClick} />
      {renderComponent()}
    </div>
  );
};

export default HomePage;
