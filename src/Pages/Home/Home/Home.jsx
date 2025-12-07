import React from 'react'
import Banner from '../Banner/Banner'
import AdvertisementSection from '../AdvertisementSection/AdvertisementSection'
import LatestTicketsSection from '../LatestTicketsSection/LatestTicketsSection'

export default function Home() {
  return (
    <div>
      <Banner/>
      <AdvertisementSection/>
      <LatestTicketsSection/>
    </div>
  )
}
