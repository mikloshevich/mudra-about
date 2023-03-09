import './scss/index.scss'
import Home from './pages/Home'
import Header from './components/header/Header'
import MenuContextProvider from './context/MenuContext'
import About from './pages/About'

function App() {
    return (
        <>
            <MenuContextProvider>
                <Header />
                {/* <Home /> */}
                <About />
            </MenuContextProvider>
        </>
    )
}

export default App
