import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Homepage from '../Components/Homepage';
import Aboutpage from '../Components/Aboutpage';
import Servicespage from '../Components/Servicespage';
import Doctorspage from '../Components/Doctorspage';
import Appointmentpage from '../Components/Appointmentpage';
import Contactpage from '../Components/Contactpage';
import Signuppage from '../Components/Signuppage';
import Loginpage from '../Components/Loginpage';
import Forgotpasswordpage from '../Components/Forgotpasswordpage';
import Faqpage from '../Components/Faqpage';
import PagePlaceholder from '../Components/PagePlaceholder';
import AdminDashboardpage from '../Components/AdminDashboardpage';
import AdminDashboardFeaturePage from '../Components/AdminDashboardFeaturePage';
import DoctorDashboardpage from '../Components/DoctorDashboardpage';
import DoctorDashboardFeaturePage from '../Components/DoctorDashboardFeaturePage';
import PatientDashboardpage from '../Components/PatientDashboardpage';
import PatientDashboardFeaturePage from '../Components/PatientDashboardFeaturePage';
import DashboardRedirect from '../Components/DashboardRedirect';

function ScrollToTop() {
    const { pathname } = useLocation();

    React.useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, [pathname]);

    return null;
}

function AppRoutes(){
    return(
        <>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path='/about' element={<Aboutpage />} />
                <Route path="/services" element={<Servicespage />} />
                <Route path="/doctors" element={<Doctorspage />} />
                <Route path="/appointment" element={<Appointmentpage />} />
                <Route path="/contact" element={<Contactpage />} />
                <Route path="/profile" element={<DashboardRedirect />} />
                <Route path="/admin-dashboard" element={<AdminDashboardpage />} />
                <Route path="/admin-dashboard/:feature" element={<AdminDashboardFeaturePage />} />
                <Route path="/doctor-dashboard" element={<DoctorDashboardpage />} />
                <Route path="/doctor-dashboard/:feature" element={<DoctorDashboardFeaturePage />} />
                <Route path="/patient-dashboard" element={<PatientDashboardpage />} />
                <Route path="/patient-dashboard/:feature" element={<PatientDashboardFeaturePage />} />
                <Route path="/signup" element={<Signuppage />} />
                <Route path="/login" element={<Loginpage />} />
                <Route path="/forgot" element={<Forgotpasswordpage />} />
                <Route path="/faq" element={<Faqpage />} />
                <Route path="*" element={<PagePlaceholder title="Page Not Found" />} />
            </Routes>
        </>
    );
}

export default AppRoutes;
