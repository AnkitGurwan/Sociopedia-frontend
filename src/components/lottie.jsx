import React from 'react';
import Lottie from 'react-lottie-player'
import lottieJson from '../lottiejson.json'


const lottie = () => {
  return (
    <div>
        <div class="flex items-start justify-center h-full">
            <div class="text-center mb-12">
                <Lottie
                    className='mb-10 h-40 w-full'
                    loop
                    animationData={lottieJson}
                    play
                />
                {/* <lottie-player
                class="w-32 h-32 mx-auto mb-4"
                src="public/assets/data.lottie"
                background="transparent"
                speed="1"
                loop
                autoplay
                ></lottie-player> */}
                <h2 class="text-2xl font-bold mb-4">No Posts Exist</h2>
                <p class="text-gray-500 mx-6">There are no posts available at the moment. Try to add post from Home page.</p>
            </div>
            </div>

    </div>
  )
}

export default lottie;