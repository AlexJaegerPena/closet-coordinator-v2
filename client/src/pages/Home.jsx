import "./Home.css";
import Wardrobe from "../components/Wardrobe";
import WeatherComponent from "../components/WeatherComponent";


const Home = ({setLoginName, loginName , location, weather, setWeather, setLocation}) => {

  return (
    <div className="home-pattern bg-repeat bg-cover bg-center">
      <div className="cont">
        <div className="hi-container flex justify-around mx-4 align-items">
          <WeatherComponent location={location}  weather={weather} setWeather={setWeather} setLocation={setLocation} setLoginName={setLoginName} loginName={loginName} className="hi-weather" />
        </div>
      </div>
      <Wardrobe />
    </div>
  );
};

export default Home;
