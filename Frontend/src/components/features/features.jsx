import "./features.css";

export const Features = () => {
  const features = [
    {
      icon: "🏠",
      title: "Smart Cost Estimation",
      desc: "Get estimated construction costs based on your requirements and location."
    },
    {
      icon: "📊",
      title: "Budget Analysis",
      desc: "Compare your budget against estimated construction expenses."
    },
    {
      icon: "🌍",
      title: "Location-Based Pricing",
      desc: "Estimates adapt according to regional construction costs."
    }
  ];

  return (
    <section className="featuresSection">
      <div className="sectionHeader">
        <span>Powerful Features</span>
        <h2>Everything You Need To Plan Your House</h2>
        <p>
          Our AI-powered platform helps homeowners, architects,
          and builders make smarter decisions.
        </p>
      </div>

      <div className="featuresGrid">
        {
          (features) ?
            features.map((feature, idx) => (
              <div className="featureCard" key={idx}>
                <div className="featureIcon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))
            :
            <></>
        }
      </div>
    </section>
  );
};