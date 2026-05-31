import "./howItWork.css";

export const HowItWork = () => {
    return (
        <section className="howItWorks">
            <div className="sectionHeader">
                <span>Simple Process</span>
                <h2>How It Works</h2>
                <p>
                    Get accurate house planning and cost estimation in just
                    a few simple steps.
                </p>
            </div>

            <div className="stepsContainer">

                <div className="stepCard">
                    <div className="stepNumber">01</div>
                    <h3>Enter Requirements</h3>
                    <p>
                        Provide details such as area, rooms, location,
                        budget, and preferred house style.
                    </p>
                </div>

                <div className="stepCard">
                    <div className="stepNumber">02</div>
                    <h3>AI Analysis</h3>
                    <p>
                        Our AI analyzes your requirements and compares them
                        with construction trends and pricing data.
                    </p>
                </div>

                <div className="stepCard">
                    <div className="stepNumber">03</div>
                    <h3>Get Results</h3>
                    <p>
                        Receive a complete estimation report, planning
                        suggestions, and budget insights instantly.
                    </p>
                </div>

            </div>
        </section>
    )
}