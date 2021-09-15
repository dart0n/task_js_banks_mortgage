import { NavLink } from 'react-router-dom'

function Header() {
  return (
    <header className="mb-2">
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <ul className="navbar-nav ms-auto d-flex flex-row">
            <li className="nav-item">
              <NavLink to="/" className="nav-link p-2">
                Banks
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/calculator" className="nav-link p-2">
                Mortgage Calculator
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Header
