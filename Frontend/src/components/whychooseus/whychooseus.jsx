import "./whychooseus.css";

export const WhyChooseUs = () => {
    let cardsData = [
        {
            heading: "95%",
            title: "Faster Planning",
            desc: "Generate estimates in minutes instead of spending days collecting information."
        },
        {
            heading: "24/7",
            title: "Instant Access",
            desc: "Plan your dream house anytime from anywhere."
        },
        {
            heading: "AI",
            title: "Powered Analysis",
            desc: "Modern AI technology helps optimize budgets and planning decisions."
        }
    ]
    return (
        <section className="whyChoose">

            <div className="sectionHeader">
                <span>Why Choose Us</span>
                <h2>Smarter House Planning With AI</h2>
                <p>
                    Save time, reduce uncertainty, and make better
                    construction decisions with AI-powered insights.
                </p>
            </div>

            <div className="statsContainer">
                {
                    (cardsData) ?
                        cardsData.map((v, idx) => (
                            <div className="statCard" key={idx}>
                                <h1>{v.heading}</h1>
                                <h3>{v.title}</h3>
                                <p>{v.desc}</p>
                            </div>
                        ))
                        :
                        <></>
                }
            </div>

        </section>
    )
}