import FeaturedStories from "@/app/components/featuredpost"
import Footer from "./components/footer"
import HeroSection from "./components/Hero"
import LatestUpdates from "./components/latestupdate"
import NavBar from "./components/NavBar"
import Letter from "./components/news"
import NewsUpdates from "./components/updates"


const Home = () => {
  return ( <div> 
    <NavBar/>
    <div className="min-h-screen bg-black text-white">
  <HeroSection/>
  <FeaturedStories/>
  <LatestUpdates/>
  <NewsUpdates/>
  <Letter/>
   </div>
  <Footer/>
    </div>
  )
}

export default Home