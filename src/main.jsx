import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import PageHeader from "./components/customer/PageHeader.jsx";
import HeroBanner from "./components/customer/HeroBanner.jsx";
import Information from "./components/customer/Information.jsx"
import Campus from "./components/customer/mitraCampus.jsx"
import Schedule  from "./components/customer/schedule.jsx"
import Fee from "./components/customer/feePage.jsx"
import SignIn from './components/auth/signin.jsx';
import './assets/tailwind.css';

createRoot(document.getElementById('root')).render(
  <div>
    <PageHeader/>
    <HeroBanner/>
    <Information/>
    <Campus/>
    <Schedule/>
    <Fee/>
  </div>
)
