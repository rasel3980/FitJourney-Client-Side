import { Helmet } from "react-helmet";
import Banner from "../../Components/Banner/Banner";
import NewsLetter from "../../Components/NewsLetter/NewsLetter";
import Featured from "../../Components/Featured/Featured";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home | FitJourney</title>
            </Helmet>
            <Banner></Banner>
            <Featured></Featured>
            <NewsLetter></NewsLetter>
        </div>
    );
};

export default Home;