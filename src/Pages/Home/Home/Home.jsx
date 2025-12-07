import React from 'react'
import Banner from '../Banner/Banner'
import AdvertisementSection from '../AdvertisementSection/AdvertisementSection'
import LatestTicketsSection from '../LatestTicketsSection/LatestTicketsSection'
import PopularRoutes from '../PopularRoutes/PopularRoutes'
import WhyChooseUs from '../WhyChooseUs/WhyChooseUs'

export default function Home() {
  return (
    <div>
      <Banner/>
      <AdvertisementSection/>
      <LatestTicketsSection/>
      <PopularRoutes/>
      <WhyChooseUs/>
    </div>
  )
}
