
import Hostels from '../Components/Hostels';
import Kitchen from '../Components/Kitchen';
import Main from '../Components/Main';
import Tours from '../Components/Tours';
import Blog from '../Components/Blog';
import FAQ from '../Components/FAQ';
import ContactForm from '../Components/Contact';
import '../Style/Home.css'
import Organic from '../Components/Organic';


function Home() {
  return (
    <div className='home'>
    <Main />
    <Hostels />
    <Kitchen />
    <Tours />
    <Organic />
    <Blog />
    <FAQ />
    <ContactForm />
    </div>
  );
}


export default Home