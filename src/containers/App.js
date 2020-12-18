import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import Header from "../components/Header";
import ErrorBoundary from "../components/ErrorBoundary";
import "./App.css"
import { setSearchField, requestRobots } from "../actions";

const mapStateToProps = state => ({
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error
});

const mapDispatchToProps = (dispatch) => ({
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots())
});

function App(props) {
    const { searchField, onSearchChange, robots, onRequestRobots, isPending  } = props;
    const [count, setCount] = useState(0);

    useEffect(() => {
        onRequestRobots();
    }, []);

    const filteredRobots = robots
        .filter(robot => robot.name.toLowerCase().includes(searchField.toLowerCase()));

    return !isPending ? (
        <div className='tc'>
            <Header />
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
