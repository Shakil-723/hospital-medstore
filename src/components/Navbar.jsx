import { Link } from 'react-router-dom'
import { FaShoppingCart, FaUser, FaSearch } from 'react-icons/fa'
import { MdLocalHospital } from 'react-icons/md'

function Navbar() {
    return (
        <nav style={styles.nav}>
            <div style={styles.logo}>
                <MdLocalHospital size={28} color="#0F6E56" />
                <span style={styles.logoText}>MediStore</span>
            </div>

            <div style={styles.links}>
                <Link to="/" style={styles.link}>Home</Link>
                <Link to="/products" style={styles.link}>Products</Link>
                <Link to="/orders" style={styles.link}>Orders</Link>
            </div>

            <div style={styles.actions}>
                <FaSearch size={18} color="#555" style={{ cursor: 'pointer' }} />
                <Link to="/cart" style={styles.cartBtn}>
                    <FaShoppingCart size={18} /> Cart
                </Link>
                <Link to="/login" style={styles.link}>
                    <FaUser size={18} />
                </Link>
            </div>
        </nav>
    )
}

const styles = {
    nav: {
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 32px', background: '#fff', borderBottom: '1px solid #e0e0e0',
        position: 'sticky', top: 0, zIndex: 100
    },
    logo: { display: 'flex', alignItems: 'center', gap: '8px' },
    logoText: { fontSize: '20px', fontWeight: '600', color: '#0F6E56' },
    links: { display: 'flex', gap: '24px' },
    link: { textDecoration: 'none', color: '#444', fontSize: '14px' },
    actions: { display: 'flex', alignItems: 'center', gap: '20px' },
    cartBtn: {
        display: 'flex', alignItems: 'center', gap: '6px', background: '#0F6E56',
        color: '#fff', padding: '8px 16px', borderRadius: '8px', textDecoration: 'none', fontSize: '14px'
    }
}

export default Navbar