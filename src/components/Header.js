const Header = (props) => {
    return (
        !props.isGameStarted
        ?
        <header className="d-grid place-items-center vh-100">
            <div className="container text-center">
                <h1>Quizzical</h1>
                <p>Random generated Trivia questions</p>
                <button className="btn btn-lg btn-primary px-3" onClick={props.onClick}>Start quiz</button>
            </div>
        </header>
        :
        <header className="app-header">
            <div className="d-flex justify-content-between align-items-center container">
                <div className="app-brand">Quizzical</div>
            </div>
        </header>
    )
}

export default Header;