import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Feed from '../components/Feed'
import LoadingScreen from '../components/LoadingScreen'

const Home = () => {
    const [pokemons, setPokemons] = useState([]);
    const [offSet, setOffSet] = useState(() => {
        const storedOffset = sessionStorage.getItem("offset");
        return storedOffset ? parseInt(storedOffset, 10) : 0;
    });
    const [loading, setLoading] = useState(true);

    const getPokemons = async () => {
        setLoading(true);
        const apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=50&offset=${offSet}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        setPokemons(data.results);
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }

    const handleNextPage = () => {
        const newOffset = offSet + 50;
        setOffSet(newOffset);
        sessionStorage.setItem("offset", newOffset.toString());
    }

    const handlePreviousPage = () => {
        const newOffset = offSet < 50 ? 0 : offSet - 50;
        setOffSet(newOffset);
        sessionStorage.setItem("offset", newOffset.toString());
    }

    useEffect(() => {
        getPokemons();
    }, [offSet]);

    return (
        <div className="home maxWidth">
            {loading && <LoadingScreen />}
            {!loading &&
                <>
                    <Header />
                    <Feed pokemons={pokemons} />
                    <div className="pagination">
                        <button className="btn" onClick={handlePreviousPage}>Previous</button>
                        <button className="btn" onClick={handleNextPage}>Next</button>
                    </div>
                </>}

        </div>
    )
}

export default Home