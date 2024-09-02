import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Support from "./pages/Support";
import News from "./pages/News";
import AddNews from "./components/AddNews";
import HeroNews from "./pages/HeroNews";
import PhotoSearch from "./pages/PhotoSearch";
import HeroRequests from "./pages/HeroRequests";
import OlympicHistory from "./pages/OlympicHistory";
import HeroHistory from "./pages/HeroHistory";
function App() {
  return (
    <Router>
      <main>
        {/* NAVBAR */}
        <Navbar />
        {/* ROUTES */}
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/news" element={<News />} />
            <Route path="/support" element={<Support />} />
            <Route path="/about" element={<About />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/hero_news/:id" element={<HeroNews />} />
            <Route path="/search_by_photo" element={<PhotoSearch />} />
            <Route path="/hero_requests" element={<HeroRequests />} />
            <Route path="/olympic_history" element={<OlympicHistory />} />
            <Route path="/history_of_hero" element={<HeroHistory />} />
          </Routes>
        </div>
        {/* ADD NEWS BUTTON */}
        <AddNews />
        {/* FOOTER */}
        <Footer />
      </main>
    </Router>
  );
}

export default App;
