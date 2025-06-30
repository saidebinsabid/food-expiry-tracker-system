import React from 'react';
import Hero from '../Components/Hero';
import NearlyExpiryItems from '../Components/NearlyExpiryItems';

import AboutUs from '../Components/AboutUs';
import ExpiredFoodItems from '../Components/ExpiredFoodItems';
import CountUpFood from '../Components/CountUpFood';
import { FaqFaqSection } from '../Components/FaqSection';

const Home = () => {
    return (
        <>
            <Hero></Hero>
            <NearlyExpiryItems></NearlyExpiryItems>
            <AboutUs></AboutUs>
            <ExpiredFoodItems></ExpiredFoodItems>
            <CountUpFood></CountUpFood>
            <FaqFaqSection></FaqFaqSection>
        </>
    );
};

export default Home;