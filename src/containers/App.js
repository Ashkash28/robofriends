import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import ErrorBoundary from "../components/ErrorBoundary";
import "./App.css"
import { setSearchField } from "../actions";

const mapStateToProps = state => ({
    searchField: state.searchField
});

const mapDispatchToProps = (dispatch) => ({
    onSearchChange: (event) => dispatch(setSearchField(event.target.value))
});

function App(props) {
    const { searchField, onSearchChange } = props;
    const [robots, setRobots] = useState([]);
    const [count, setCount] = useState(0);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(data => setRobots(data))
    }, []);

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

export default connect(mapStateToProps, mapDispatchToProps)(App);
