import Items from "../../Components/Item";
import Navbar from "../../Components/Navbar";
import DemoCarousel from "../../Components/Slider";
import brand1 from "../../assets/brand1.webp";
import brand2 from "../../assets/brand2.webp";
import brand3 from "../../assets/brand3.webp";
import brand4 from "../../assets/brand4.webp";
import fruit1 from "../../assets/fruit1.webp";
import fruit2 from "../../assets/fruit2.webp";
import fruit3 from "../../assets/fruit3.webp";
import fruit4 from "../../assets/fruit4.webp";
import cleaning1 from "../../assets/cleaning1.webp";
import cleaning2 from "../../assets/cleaning2.webp";
import cleaning3 from "../../assets/cleaning3.webp";
import cleaning4 from "../../assets/cleaning4.webp";
import daily1 from "../../assets/daily1.webp";
import daily2 from "../../assets/daily2.webp";
import daily3 from "../../assets/daily3.webp";
import daily4 from "../../assets/daily4.webp";
import daily5 from "../../assets/daily5.webp";
import snack1 from "../../assets/snack1.webp";
import snack2 from "../../assets/snack2.webp";
import snack3 from "../../assets/snack3.webp";
import snack4 from "../../assets/snack4.webp";
import Footer from "../../Components/Footer";
import Section from "../../Components/Section";
// import SearchBar from "../../Components/SearchBar";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const snack = [
  { src: snack1, link: "/chai-time-snack" },
  { src: snack2, link: "/morning-starters" },
  { src: snack3, link: "/pasta-sauces" },
  { src: snack4, link: "/sweet-carvings" },
];

const fruits = [
  { src: fruit1, link: "/fresh-vegetables" },
  { src: fruit2, link: "/fresh-fruits" },
  { src: fruit3, link: "/cuts-exotics" },
  { src: fruit4, link: "/herbs-seasoning" },
];

const daily = [
  { src: daily1, link: "/atta-flour" },
  { src: daily2, link: "/rice-rice-products" },
  { src: daily3, link: "/dals-pulses" },
  { src: daily4, link: "/cooking-oils-ghee" },
  { src: daily5, link: "/dry-fruits" },
];
const cleaning = [
  { src: cleaning1, link: "/detergents-fabric-care" },
  { src: cleaning2, link: "/fresheners-repellents" },
  { src: cleaning3, link: "/cleaners-disinfectants" },
  { src: cleaning4, link: "/disposables-garbage-bags" },
];

const brand = [
  { src: brand1, link: "/amul" },
  { src: brand2, link: "/dettol" },
  { src: brand3, link: "/cocacola" },
  { src: brand4, link: "/loreal-paris" },
];
function Home() {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      if (user.role === "shop") {
        navigate("/dashboard/shop-owner");
      }
    }
  });
  return (
    <>
      <Navbar />
      {/* <SearchBar /> */}
      <DemoCarousel />
      <div className="dummy"></div>
      <Items item={fruits} title="Fruits & Vegetables" />
      <Items item={daily} title="Your Daily Staples" />
      <Items item={snack} title="Snack Store" />
      <Items item={cleaning} title="Cleaning & Household" />
      <Items item={brand} title="Brands" />
      <Section />
      <Footer />
    </>
  );
}

export default Home;
