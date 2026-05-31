import { useEffect, useState } from "react";
import { Footer } from "../../components/footer/footer";
import { Navbar } from "../../components/navbar/navbar";
import "./estimatingForm.css";
import { estimateBudgetApi } from "../../apiCalls/apiCalls";

export const EstimatingForm = () => {
    let [houseData, setHouseData] = useState({
        area: "",
        rooms: "",
        houseType: "",
        location: "",
        budgetRange: "",
        desc: "",
        architecturalStyle: "ModrenHouse",
        currency: ""
    });

    let [loading, setLoading] = useState(false);
    let [response, setResponse] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setHouseData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleForm = (e) => {
        e.preventDefault();
        if (houseData.houseType === "") {
            alert("Please select the house type.")
        } else {
            estimateBudgetApi(houseData, setResponse, setLoading);
        }
    }

    return (
        <>
            <header>
                <Navbar />
            </header>

            <main>
                <section>
                    <div className="estimator-container">
                        <form className="form-section" onSubmit={(e) => { handleForm(e) }}>
                            <h2 className="title">Estimate Form</h2>
                            <label className="label" htmlFor="area">
                                Enter the area
                                <input id="area" name="area" value={houseData.area} onChange={(e) => { handleChange(e) }} type="number" placeholder="Area (sq ft)" required />
                            </label>
                            <label className="label" htmlFor="rooms">
                                No of rooms
                                <input id="rooms" name="rooms" value={houseData.rooms} onChange={(e) => { handleChange(e) }} type="number" placeholder="Number of rooms" required />
                            </label>
                            <label className="label">
                                House Type
                                <select name="houseType" value={houseData.houseType} onChange={(e) => { handleChange(e) }}>
                                    <option>--Select Type--</option>
                                    <option>Single Story</option>
                                    <option>Double Story</option>
                                    <option>Triple Story</option>
                                </select>
                            </label>
                            <label className="label" htmlFor="location">
                                Location
                                <input id="location" name="location" value={houseData.location} onChange={(e) => { handleChange(e) }} type="text" placeholder="City / Area (optional)" required />
                            </label>
                            <label className="label" htmlFor="budget">
                                Budget Range
                                <input id="budget" name="budgetRange" value={houseData.budgetRange} type="number" onChange={(e) => { handleChange(e) }} placeholder="Estimated budget" required />
                            </label>
                            <label className="label" htmlFor="currency">
                                Preferred Currency
                                <input
                                    id="currency"
                                    name="currency"
                                    value={houseData.currency}
                                    onChange={handleChange}
                                    required
                                    placeholder="Currency (e.g. PKR, USD, EUR)"
                                >
                                </input>
                            </label>
                            <label className="label" htmlFor="description">
                                House Description <i>(optional)</i>
                                <textarea
                                    id="description"
                                    rows="4"
                                    name="desc"
                                    onChange={(e) => { handleChange(e) }}
                                    value={houseData.desc}
                                    placeholder="Describe your house requirements (modern villa, garden, open kitchen, etc...)"
                                ></textarea>
                            </label>
                            <div className="style-options">
                                <span
                                    className={houseData.architecturalStyle === "LuxarayHouse" ? "chip active" : "chip"}
                                    onClick={() =>
                                        setHouseData((prev) => ({
                                            ...prev,
                                            architecturalStyle: "LuxarayHouse"
                                        }))
                                    }
                                >
                                    Luxury House
                                </span>
                                <span
                                    className={houseData.architecturalStyle === "ModrenHouse" ? "chip active" : "chip"}
                                    onClick={() =>
                                        setHouseData((prev) => ({
                                            ...prev,
                                            architecturalStyle: "ModrenHouse"
                                        }))
                                    }
                                >
                                    Modern House
                                </span>
                                <span
                                    className={houseData.architecturalStyle === "MinimalBudgetHouse" ? "chip active" : "chip"}
                                    onClick={() =>
                                        setHouseData((prev) => ({
                                            ...prev,
                                            architecturalStyle: "MinimalBudgetHouse"
                                        }))
                                    }
                                >
                                    Minimal Budget House
                                </span>
                            </div>
                            <button className="btn" disabled={loading}>{(loading ? "Calculating..." : "Calculate")}</button>
                        </form>
                        <div className="result-section">
                            <h2 className="title">Live Output</h2>
                            <div className="result-section">
                                <h2 className="title">AI Estimate Result</h2>

                                {!response ? (
                                    <div className="Rescard">
                                        <p>Your AI generated estimate will appear here.</p>
                                    </div>
                                ) : (
                                    <>
                                        {response.warnings?.length > 0 && (
                                            <div className="warningBox">
                                                <h3>Warnings</h3>

                                                {response.warnings.map((warn, index) => (
                                                    <p key={index}>⚠️ {warn}</p>
                                                ))}
                                            </div>
                                        )}

                                        <div className="summaryGrid">

                                            <div className="summaryCard">
                                                <h4>Area</h4>
                                                <p>{response.projectSummary.area}</p>
                                            </div>

                                            <div className="summaryCard">
                                                <h4>House Type</h4>
                                                <p>{response.projectSummary.houseType}</p>
                                            </div>

                                            <div className="summaryCard">
                                                <h4>Style</h4>
                                                <p>{response.projectSummary.style}</p>
                                            </div>

                                            <div className="summaryCard">
                                                <h4>Estimated Cost</h4>
                                                <p>
                                                    {response.estimatedCost.currency} {response.estimatedCost.low} - {response.estimatedCost.high}
                                                </p>
                                            </div>


                                        </div>

                                        <div className="budgetCard">
                                            <h4>Budget Status</h4>
                                            <p>{response.budgetFeasibility.status}</p>
                                        </div>
                                        <div className="detailSection">
                                            <h3>Material Suggestions</h3>

                                            <ul>
                                                {response.materials.map((item, index) => (
                                                    <li key={index}>✔ {item}</li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="detailSection">
                                            <h3>Material Breakdown</h3>

                                            <ul>
                                                <li>Per Room Cost: {response.materialBreakdown.perRoomCost}</li>
                                                <li>Per Floor Cost: {response.materialBreakdown.perFloorCost}</li>
                                                <li>Per Ceiling Cost: {response.materialBreakdown.perCeilingCost}</li>
                                                {response.materialBreakdown.notes.map((note, index) => (
                                                    <li key={index}>Note: {note}</li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="detailSection">
                                            <h3>Interior Recommendations</h3>

                                            <ul>
                                                {response.interiorRecommendations.map((item, index) => (
                                                    <li key={index}>🏠 {item}</li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="feasibilityBox">
                                            <h3>Budget Feasibility</h3>

                                            <p>{response.budgetFeasibility.message}</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};