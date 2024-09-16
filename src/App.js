import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Intro from "./components/Intro";
import Hymn from "./components/Hymn";
import HymnList from "./features/hymns/HymnList";
import HymnbookList from "./components/HymnbookList";

function App() {
    return (
        <div className="App">
            <Router style={{backgroundColor: "red", minWidth: '100vw', width: '100vw', height: '100vh'}}>
                <Routes>
                    <Route path="/" element={<Intro/>}/>
                    <Route path="/hymnsIndex" element={<HymnList/>}/>
                    <Route path="/hymnbookslist" element={<HymnbookList />} />
                    <Route path="/hymn" element={<Hymn/>}/>
                    <Route path="/*" element={<Intro/>}/>
                </Routes>

            </Router>
        </div>
    );
}

export default App;
