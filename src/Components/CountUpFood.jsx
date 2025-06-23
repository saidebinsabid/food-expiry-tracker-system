import { useEffect, useState } from "react";
import axios from "axios";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import expiredIcon from "/expired_Icon.png";
import nearlyExpiredIcon from "/nearly_Expired.png";
const CountUpFood = () => {
  const [expiredCount, setExpiredCount] = useState(0);
  const [nearlyExpiredCount, setNearlyExpiredCount] = useState(0);

  const [ref1, inView1] = useInView({ triggerOnce: false, threshold: 0.3 });
  const [ref2, inView2] = useInView({ triggerOnce: false, threshold: 0.3 });

  useEffect(() => {
    // Fetch expired food items
    axios
      .get(`${import.meta.env.VITE_API_URL}/expired-food-items`)
      .then((res) => {
        setExpiredCount(res.data.length);
      });

    // Fetch nearly expired food items
    axios
      .get(`${import.meta.env.VITE_API_URL}/nearly-expired-foods`)
      .then((res) => {
        setNearlyExpiredCount(res.data.length);
      });
  }, []);

  return (
    <div className="w-11/12 mx-auto pb-24 font-roboto">
      <h2 className="text-3xl md:text-5xl font-bold pb-2 text-center">
        Food Expiry Overview
      </h2>
      <p className="md:w-3/5 mx-auto pt-6 text-gray-700 pb-6 text-center">
        Keep track of your food inventory with real-time insights into items
        nearing expiry and those already expired. This helps minimize waste,
        improve efficiency, and ensure timely consumption or disposal.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Nearly Expiring Items */}
        <div
          ref={ref2}
          className="p-8 bg-gradient-to-tr from-green-200 via-green-50 to-green-100  
        hover:shadow-xl rounded-2xl space-y-6 text-center"
        >
          <img
            className="mx-auto w-20 h-20  object-contain"
            src={nearlyExpiredIcon}
            alt="Nearly Expiring"
          />
          {inView2 && (
            <span className="text-5xl font-extrabold">
              <CountUp start={0} end={nearlyExpiredCount} duration={2} />
            </span>
          )}
          <p className="pt-4 text-green-700">Nearly Expiring Items</p>
        </div>

        {/* Expired Items */}
        <div
          ref={ref1}
          className="p-8 bg-gradient-to-tr from-red-200 via-red-50 to-red-100
        hover:shadow-xl rounded-2xl space-y-6 text-center"
        >
          <img
            className="mx-auto w-20 h-20 object-contain"
            src={expiredIcon}
            alt="Expired Items"
          />
          {inView1 && (
            <span className="text-5xl font-extrabold">
              <CountUp start={0} end={expiredCount} duration={2} />
            </span>
          )}
          <p className="pt-4 text-red-700">Expired Items</p>
        </div>
      </div>
    </div>
  );
};

export default CountUpFood;
