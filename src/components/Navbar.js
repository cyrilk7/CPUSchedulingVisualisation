import "../css/nav.css";
import logo from '../images/logo.png';

const Navbar = () => {
    return ( 
        <div className="nav">
            <div className="logo-box">
                <img src={logo} alt="Logo" /> 
                <h4> Visualize </h4>
            </div>

            <button> Get started </button>

        </div>
     );
}
 
export default Navbar;