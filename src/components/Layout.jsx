import { Link } from 'react-router-dom';
import CustomCursor from './CustomCursor';

export default function Layout({ children }) {
  return (
    <div id="main-portfolio" className="visible">
      <CustomCursor />
      
      <div id="content">
        <header>
          <div className="logo"><Link to="/">Jamekaturo</Link></div>
          <nav>
            <Link to="/portfolio" className="hoverable">Archive</Link>
            <a href="#about" className="hoverable">Journal</a>
            <a href="#contact" className="hoverable">Contact</a>
          </nav>
        </header>

        <main>{children}</main>

        <footer>
          <span>&copy; 2025 Jamekaturo</span>
          <span>All Rights Reserved</span>
        </footer>
      </div>
    </div>
  );
}
