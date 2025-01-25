import { Helmet } from "react-helmet";
import Banner from "../../Components/Banner/Banner";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home | FitJourney</title>
            </Helmet>
            <Banner></Banner>
        </div>
    );
};

export default Home;