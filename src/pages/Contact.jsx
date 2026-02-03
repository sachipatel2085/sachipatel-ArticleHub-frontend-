import PageLayout from "../components/PageLayout";

const Contact = () => {
  return (
    <PageLayout title="Contact Us">
      <p>
        Have questions, feedback, or need support?  
        We’d love to hear from you.
      </p>

      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <p>
          📧 <span className="text-white">Email:</span>{" "}
          sachixl300@gmail.com
        </p>

        <p className="mt-2">
          🌐 <span className="text-white">Website:</span>{" "}
          https://articlehub.vercel.app
        </p>

        <p className="mt-2">
          🕒 <span className="text-white">Support Hours:</span>{" "}
          Mon – Fri, 10:00 AM – 6:00 PM
        </p>
      </div>

      <p className="text-sm text-gray-400">
        For urgent moderation issues, please use the in-platform report
        or appeal system.
      </p>
    </PageLayout>
  );
};

export default Contact;