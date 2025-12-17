import React from 'react';
import Hero from './Hero';
import Awards from './Awards';
import Stats from './Stats';
import Education from './Education';
import OpenAccount from '../OpenAccount';

function HomePage() {
    return ( 
        <>
            <Hero />
            <Awards />
            <Stats />
            <Education />
            <OpenAccount />
        </>
     );
}

export default HomePage;