import PageLayout from "../components/PageLayout";

const About = () => {
  return (
    <PageLayout title="About ArticleHub">
      <p>
        ArticleHub is a modern blogging platform designed for writers,
        developers, and creators to share meaningful content with the world.
      </p>

      <p>
        Our goal is to provide a clean, distraction-free writing experience
        while maintaining strong moderation, fair author policies, and
        community-driven engagement.
      </p>

      <p>
        Built using the MERN stack, ArticleHub focuses on performance,
        scalability, and real-world blogging workflows such as drafts,
        publishing, moderation, and appeals.
      </p>

      <p className="font-semibold text-white">
        Write freely. Publish responsibly. Grow together.
      </p>
    </PageLayout>
  );
};

export default About;