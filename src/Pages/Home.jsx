import React from 'react';
import Hero from '../Components/Hero';
import NearlyExpiryItems from '../Components/NearlyExpiryItems';
import { Faq } from '../Components/Faq';
import AboutUs from '../Components/AboutUs';
import ExpiredFoodItems from '../Components/ExpiredFoodItems';
import CountUpFood from '../Components/CountUpFood';

const Home = () => {
    return (
        <>
            <Hero></Hero>
            <NearlyExpiryItems></NearlyExpiryItems>
            <AboutUs></AboutUs>
            <ExpiredFoodItems></ExpiredFoodItems>
            <CountUpFood></CountUpFood>
            <Faq></Faq>
        </>
    );
};

export default Home;