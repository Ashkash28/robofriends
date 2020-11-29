import React, { Component } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import ErrorBoundary from "../components/ErrorBoundary";
import "./App.css"

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            robots: [],
            searchField: ''
        }
    }

    componentDidMount() {
        return fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(data => {
                this.setState({ robots: data })
            });
    }

    onSearchChange = (event) => {
        this.setState({ searchField: event.target.value });
    }

    render() {
        const filteredRobots = this.state.robots
            .filter(robot => robot.name.toLowerCase().includes(this.state.searchField.toLowerCase()));

        return this.state.robots.length ? (
            <div className='tc'>
                <h1 className='f1'>RoboFriends</h1>
                <SearchBox searchChange={this.onSearchChange} />
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
}

export default App;