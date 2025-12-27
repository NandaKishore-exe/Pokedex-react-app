const Card = ({ data }) => {

    // For images
    const urlParts = data.url.split("/");
    const pokemonId = urlParts[urlParts.length - 2];
    const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemonId}.png`;
    return (
        <div className="card">
            <img src={imgUrl} alt="pokemon" />
            <div className="text">
                <h4 className="name">
                    <span className="pokeID">{pokemonId}.</span>{data.name}
                </h4>
            </div>
        </div>
    )
}

export default Card;