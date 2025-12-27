import errorLogo from "../assets/errorLogo.png"
import { Link } from "react-router-dom"
import Button from "../components/Button"
const ErrorScreen = () => {
    return (
        <div className="errorScreen maxWidth">
            <img src={errorLogo} alt="errorLogo" />
            <h4>Wild Pokémon Escaped!</h4>
            <p>That Pokémon couldn’t be found.</p>
            <p>Double-check the name or ID and try again.</p>
            <div className="btn">
                <Link to={"/"}>
                    <Button label="Back to Home" />
                </Link>
            </div>
        </div>
    )
}

export default ErrorScreen;