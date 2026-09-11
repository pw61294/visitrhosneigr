import Hero from "./components/Hero";
import CoastalGem from "./components/CoastalGem";
import FeaturedListings from "./components/FeaturedListings";
import Guides from "./components/Guides";
import FindCategories from "./components/FindCategories";
import Newsletter from "./components/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <CoastalGem />
      <FeaturedListings />
      <Guides />
      <FindCategories />
      <Newsletter />
    </>
  );
}
