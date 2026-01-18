import Hero from "../components/Hero";
import TopPost from "../components/TopPost";
import TopAuthor from "../components/TopAuthors";
import { useAuth } from "../auth/AuthContext";

const Home = () => {
  
  const { user } = useAuth();
  return (
    <>
      <Hero />
      <TopPost/>
      <TopAuthor/>
    </>
  );
};

export default Home;
