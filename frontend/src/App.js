import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import "./App.css";
import Header from "./Components/Header";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Services from "./Pages/Services";
import Service_detail from "./Pages/Service-detail";
import Blogs from "./Pages/Blogs";
import Blogdetail from "./Pages/Blog-detal";
import Profile from "./Pages/Profile";
import News from "./Pages/News";
import Approve from "./Pages/Approve";
import TermsCon from "./Pages/TermsCondition";
import { UserProvider } from "./UserContext";
import Kitchen from "./Pages/kitchens";
import Event from "./Pages/events";
import OrganicPro from "./Pages/Organicpro";
import HostelsQ from "./Pages/hostels";
import Footer from "./Components/Footer";
import { LanguageProvider } from "./LanguageContext";
import Profile_detail from "./Pages/Profile_detail";
function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <UserProvider>
            <LanguageProvider>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/*" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/services/" element={<Services />} />
                <Route path="/services/hostels" element={<HostelsQ />} />
                <Route path="/services/kitchen/" element={<Kitchen />} />
                <Route path="/services/events/" element={<Event />} />
                <Route path="/services/organicpro/" element={<OrganicPro />} />
                <Route
                  path="/services/kitchen/:id"
                  element={<Service_detail />}
                />
                <Route
                  path="/services/hostels/:id"
                  element={<Service_detail />}
                />
                <Route
                  path="/services/organicpro/:id"
                  element={<Service_detail />}
                />
                <Route
                  path="/services/events/:id"
                  element={<Service_detail />}
                />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/blogs/:id" element={<Blogdetail />} />
                <Route path="/profile/" element={<Profile />} />
                <Route path="/news/:id" element={<News />} />
                <Route path="/approve" element={<Approve />} />
                <Route path="/contract" element={<TermsCon />} />
                <Route path="/profile_detail" element={<Profile_detail />} />
              </Routes>
              <Footer />
            </LanguageProvider>
          </UserProvider>
        </div>
      </div>
    </div>
  );
}

export default App;
