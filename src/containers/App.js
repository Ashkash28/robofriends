import React, { useState, useEffect } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import ErrorBoundary from "../components/ErrorBoundary";
import "./App.css"

function App() {
    const [robots, setRobots] = useState([]);
    const [searchField, setSearchField] = useState('');
    const [count, setCount] = useState(0);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(data => setRobots(data))
    }, []);

    const onSearchChange = (event) => {
        setSearchField(event.target.value)
    };

    const filteredRobots = robots
        .filter(robot => robot.name.toLowerCase().includes(searchField.toLowerCase()));

    return robots.length ? (
        <div className='tc'>
            <h1 className='f1'>RoboFriends</h1>
            <button onClick={() => setCount(count + 1)}>Click Me!</button>
            <SearchBox searchChange={onSearchChange} />
            <Scroll>
                <ErrorBoundary>
                    <CardList robots={filteredRobots}/>
                </ErrorBoundary>
            </Scroll>
        </div>
    ) : (
        <h1>Loading</h1>
    )
}

export default App;