import logo from '../assets/logo.png'
import Button from './Button'
import '../css/Header.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    const [search, setSearch] = useState('');

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    }

    return (
        <header>
            <nav className="maxWidth">
                <img src={logo} alt="logo" />
                <div className="search-container">
                    <input type="text" placeholder="Search a pokemon" value={search} onChange={handleSearchChange} />
                    <Link to={`/${search}`}>
                        <Button label={"Search"} />
                    </Link>
                </div>
            </nav>
        </header>
    )
}

export default Header