import PageLayout from "../components/PageLayout";

const PrivacyPolicy = () => {
  return (
    <PageLayout title="Privacy Policy">
      <p>
        At ArticleHub, we respect your privacy and are committed to protecting
        your personal information.
      </p>

      <h2 className="text-xl font-semibold text-white">
        Information We Collect
      </h2>
      <p>
        We collect basic account information such as name and email address
        to provide authentication and author features.
      </p>

      <h2 className="text-xl font-semibold text-white">
        How We Use Your Information
      </h2>
      <p>
        Your data is used only to improve platform functionality, content
        moderation, and user experience.
      </p>

      <h2 className="text-xl font-semibold text-white">
        Cookies & Authentication
      </h2>
      <p>
        We use secure tokens and cookies for login sessions and platform
        security. We do not sell or share your data with third parties.
      </p>

      <h2 className="text-xl font-semibold text-white">
        Policy Updates
      </h2>
      <p>
        This policy may be updated periodically. Continued use of ArticleHub
        means you accept the latest version.
      </p>
    </PageLayout>
  );
};

export default PrivacyPolicy;