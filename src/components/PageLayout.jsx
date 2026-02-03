const PageLayout = ({ title, children }) => {
  return (
    <div className="min-h-screen bg-slate-900 text-gray-300">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          {title}
        </h1>
        <div className="space-y-6 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageLayout;