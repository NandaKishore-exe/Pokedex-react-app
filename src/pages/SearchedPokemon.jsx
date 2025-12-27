import { useParams } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import ErrorScreen from "./ErrorScreen";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Stats from "../components/Stats";
import "../css/SearchedPokemon.css"


const SearchedPokemon = () => {
    const { pokemon } = useParams();
    const [selectedPokemon, setSelectedPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [stats, setStats] = useState({
        height: 0,
        weight: 0,
        exp: 0,
        hp: 0,
        attack: 0,
        defence: 0,
        splAttack: 0,
        splDefence: 0,
        speed: 0,
    });

    //COLORS

    const colours = {
        normal: "#A8A77A",
        fire: "#EE8130",
        water: "#6390F0",
        electric: "#F7D02C",
        grass: "#7AC74C",
        ice: "#96D9D6",
        poison: "#A33EA1",
        ground: "#E2BF65",
        flying: "#A98FF3",
        bug: "#A6B91A",
        rock: "#B6A136",
        ghost: "#735797",
        dragon: "#6F35FC",
        steel: "#B7B7CE",
        fairy: "#D685AD",
    }

    const getPokemon = async () => {
        const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error("Pokemon not found");
            }
            const data = await response.json();
            setSelectedPokemon(data);
            setStats({
                height: (data.height / 3.048).toFixed(1),
                weight: (data.weight / 10).toFixed(1),
                exp: data.base_experience,
                hp: data.stats[0].base_stat,
                attack: data.stats[1].base_stat,
                defence: data.stats[2].base_stat,
                splAttack: data.stats[3].base_stat,
                splDefence: data.stats[4].base_stat,
                speed: data.stats[5].base_stat,
            })
            setTimeout(() => { setLoading(false); }, 500);

        } catch (error) {
            setLoading(false);
            setError(true);
        }

    }

    useEffect(() => {
        getPokemon();
    }, [pokemon]);


    if (loading) {
        return <LoadingScreen />
    }

    if (error) {
        return <ErrorScreen />
    }

    return (
        <div className="searched-pokemon maxWidth">
            <div className="searched-pokemon_header">
                <Link to={"/"}>
                    <Button label="Back" />
                </Link>
            </div>
            <div className="pokemon-details">
                <div className="searched-pokemon_info">
                    <h4>{selectedPokemon.name}</h4>
                    <div className="type">
                        {selectedPokemon.types.map((type, index) => (
                            <span key={index} style={{ backgroundColor: colours[type.type.name] }}>{type.type.name}</span>
                        ))}
                    </div>
                    <Stats stats={stats} />
                </div>
                <div className="previewImage">
                    <img src={selectedPokemon.sprites.other.home.front_default} alt={selectedPokemon.name} />
                </div>
            </div>
        </div>
    )
}

export default SearchedPokemon;