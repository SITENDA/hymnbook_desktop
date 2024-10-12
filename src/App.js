import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Intro from "./components/Intro";
import HymnbookList from "./components/HymnbookList";
import HymnsList from "./components/HymnsList";
import HymnDisplay from "./components/HymnDisplay";

function App() {
    return (
        <div className="App">
            <Router style={{backgroundColor: "red", minWidth: '100vw', width: '100vw', height: '100vh'}}>
                <Routes>
                    <Route path="/" element={<Intro/>}/>
                    <Route path="/hymnbookslist" element={<HymnbookList />} />
                    <Route path="/hymnslist" element={<HymnsList />} />
                    <Route path="/hymnsdisplay" element={<HymnDisplay />} />
                    <Route path="/*" element={<Intro/>}/>
                </Routes>

            </Router>
        </div>
    );
}

export default App;
