import Lottie from 'lottie-react';
import loaderAnimation from '../../assets/loadingAnimation/Loader.json'
const Loading = () => {
    return (
        <div className='w-20 mx-auto'>
           <Lottie animationData={loaderAnimation}></Lottie> 
        </div>
    );
};

export default Loading;