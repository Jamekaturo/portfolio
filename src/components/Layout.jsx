import { Link } from 'react-router-dom';
import CustomCursor from './CustomCursor';

export default function Layout({ children }) {
  return (
    <div id="main-portfolio" className="visible">
      <CustomCursor />
      
      <div id="content">

        <main>{children}</main>

        <footer>
          <span>&copy; 2025 Jamekaturo</span>
          <span>All Rights Reserved</span>
        </footer>
      </div>
    </div>
  );
}
