import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import React, { useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { FaBars, FaBell, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Main AdminDashboard component
const AdminDashboard = () => {
  const [view, setView] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [product, setProduct] = useState({
    title: '',
    description: '',
    category: '',
    image: ''
  });

  const data = {
    billing: { total: 1200, transactions: 30 },
    orders: [
      { id: 1, status: 'Shipped' },
      { id: 2, status: 'Processing' },
      { id: 3, status: 'Delivered' },
    ],
    totalRents: 45,
    rentedClothes: [
      { id: 101, name: 'Red Dress', status: 'Rented' },
      { id: 102, name: 'Blue Sherwani', status: 'Returned' },
    ],
  };

  const handleLogin = () => {
    if (id === 'admin' && password === '1234') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid ID or password');
    }
  };

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();
    console.log('Product added:', product);
    // Add logic to handle product addition (e.g., send to backend)
    setProduct({ title: '', description: '', category: '', image: '' });
    setView('dashboard'); // Optionally, navigate back to the dashboard
  };

  if (!isLoggedIn) {
    return (
      <div style={styles.loginContainer}>
        <div style={styles.logoContainer}>
          <h1 style={styles.logo}>Rentique</h1>
        </div>
        <h2 style={styles.loginTitle}>Admin Login</h2>
        <div style={styles.formGroup}>
          <label style={styles.label}>ID:</label>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
        </div>
        <button onClick={handleLogin} style={styles.loginButton}>Login</button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <nav style={styles.navbar}>
        <div style={styles.navLogoContainer}>
          <h1 style={styles.navLogo}>Rentique</h1>
        </div>
        <FaBars style={styles.navIcon} />
        <div style={styles.searchContainer}>
          <FaSearch style={styles.searchIcon} />
          <input type="text" placeholder="Search now" style={styles.searchInput} />
        </div>
        <FaBell style={styles.navIcon} />
      </nav>
      <div style={styles.mainContent}>
        <div style={styles.sidebar}>
          <ul style={styles.sidebarList}>
            <li style={styles.sidebarItem} onClick={() => setView('dashboard')}><button style={styles.sidebarButton}>Dashboard</button></li>
            <li style={styles.sidebarItem} onClick={() => setView('billing')}><button style={styles.sidebarButton}>Billing</button></li>
            <li style={styles.sidebarItem} onClick={() => setView('orderTracking')}><button style={styles.sidebarButton}>Order Tracking</button></li>
            <li style={styles.sidebarItem} onClick={() => setView('totalRents')}><button style={styles.sidebarButton}>Total Rents</button></li>
            <li style={styles.sidebarItem} onClick={() => setView('rentedClothes')}><button style={styles.sidebarButton}>Rented Clothes</button></li>
            <li style={styles.sidebarItem} onClick={() => setView('addProduct')}><button style={styles.sidebarButton}>Add Product</button></li>
          </ul>
          <div style={styles.footer}>
            <Link to="/" style={styles.backButton}>Go back</Link>
          </div>
        </div>
        <div style={styles.content}>
          {view === 'dashboard' && <Dashboard />}
          {view === 'billing' && <Billing data={data.billing} />}
          {view === 'orderTracking' && <OrderTracking data={data.orders} />}
          {view === 'totalRents' && <TotalRents data={data.totalRents} />}
          {view === 'rentedClothes' && <RentedClothes data={data.rentedClothes} />}
          {view === 'addProduct' && (
            <AddProductForm
              onSubmit={handleProductSubmit}
              product={product}
              onChange={handleProductChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};
const Dashboard = () => {
  const lineChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Revenue',
        data: [400, 450, 300, 500, 600, 700],
        borderColor: '#343a40',
        backgroundColor: 'rgba(52, 58, 64, 0.2)',
        fill: true,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `Revenue: $${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  const barChartData = {
    labels: ['Product A', 'Product B', 'Product C', 'Product D'],
    datasets: [
      {
        label: 'Sales',
        data: [50, 75, 100, 125],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `Sales:${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return (
    <div style={styles.contentBox}>
      <h2>Dashboard</h2>
      <p>Welcome to the Admin Dashboard.</p>
      <div style={styles.cardRow}>
        <div style={{ ...styles.card, ...styles.cardBlue }}>
          <div style={styles.cardContent}>
            <div style={styles.cardTitle}>150</div>
            <div>New Orders</div>
            <div style={styles.moreInfo}>More info <i className="fas fa-arrow-circle-right"></i></div>
          </div>
          <div style={styles.cardIcon}>
            <i className="fas fa-shopping-bag"></i>
          </div>
        </div>
        <div style={{ ...styles.card, ...styles.cardGreen }}>
          <div style={styles.cardContent}>
            <div style={styles.cardTitle}>53%</div>
            <div>Rental Rate</div>
            <div style={styles.moreInfo}>More info <i className="fas fa-arrow-circle-right"></i></div>
          </div>
          <div style={styles.cardIcon}>
            <i className="fas fa-chart-bar"></i>
          </div>
        </div>
        <div style={{ ...styles.card, ...styles.cardOrange }}>
          <div style={styles.cardContent}>
            <div style={styles.cardTitle}>44</div>
            <div>User Registrations</div>
            <div style={styles.moreInfo}>More info <i className="fas fa-arrow-circle-right"></i></div>
          </div>
          <div style={styles.cardIcon}>
            <i className="fas fa-user-plus"></i>
          </div>
        </div>
        <div style={{ ...styles.card, ...styles.cardRed }}>
          <div style={styles.cardContent}>
            <div style={styles.cardTitle}>65</div>
            <div>Active users</div>
            <div style={styles.moreInfo}>More info <i className="fas fa-arrow-circle-right"></i></div>
          </div>
          <div style={styles.cardIcon}>
            <i className="fas fa-users"></i>
          </div>
        </div>
      </div>
      <br></br>
      <div style={styles.chartContainer}>
        <h3>Revenue Over Time</h3>
        <Line data={lineChartData} options={lineChartOptions} />
      </div>
      <br></br>
      <br></br>
      <div style={styles.chartContainer}>
        <h3>Sales by Product</h3>
        <Bar data={barChartData} options={barChartOptions} />
      </div>
    </div>
  );
};
// Additional components (Billing, OrderTracking, TotalRents, etc.) here...
const Billing = ({ data }) => (
  <div style={styles.contentBox}>
    <h2>Billing Information</h2>
    <p>Total Billing: ${data.total}</p>
    <p>Transactions: {data.transactions}</p>
  </div>
);

const OrderTracking = ({ data }) => (
  <div style={styles.contentBox}>
    <h2>Order Tracking</h2>
    <ul>
      {data.map(order => (
        <li key={order.id}>Order ID: {order.id}, Status: {order.status}</li>
      ))}
    </ul>
  </div>
);

const TotalRents = ({ data }) => (
  <div style={styles.contentBox}>
    <h2>Total Rents</h2>
    <p>Total Rents: {data}</p>
  </div>
);

const RentedClothes = ({ data }) => (
  <div style={styles.contentBox}>
    <h2>Rented Clothes</h2>
    <ul>
      {data.map(item => (
        <li key={item.id}>ID: {item.id}, Name: {item.name}, Status: {item.status}</li>
      ))}
    </ul>
  </div>
);

const AddProductForm = ({ onSubmit, product, onChange }) => (
  <div style={styles.contentBox}>
    <h2>Add Product</h2>
    <form onSubmit={onSubmit}>
      <div style={styles.formGroup}>
        <label style={styles.label}>Title:</label>
        <input
          type="text"
          name="title"
          value={product.title}
          onChange={onChange}
          style={styles.input}
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Description:</label>
        <textarea
          name="description"
          value={product.description}
          onChange={onChange}
          style={styles.textarea}
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Category:</label>
        <input
          type="text"
          name="category"
          value={product.category}
          onChange={onChange}
          style={styles.input}
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Image URL:</label>
        <input
          type="text"
          name="image"
          value={product.image}
          onChange={onChange}
          style={styles.input}
        />
      </div>
      <button type="submit" style={styles.submitButton}>Add Product</button>
    </form>
  </div>
);

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  navbar: {
    width: '100%',
    padding: '10px 20px',
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid #dee2e6',
  },
  navLogoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  navLogo: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#343a40',
    marginRight: '20px',
  },
  navIcon: {
    fontSize: '20px',
    color: '#343a40',
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  searchIcon: {
    fontSize: '16px',
    color: '#888',
    marginRight: '10px',
  },
  searchInput: {
    border: 'none',
    outline: 'none',
    padding: '5px',
    borderBottom: '1px solid #888',
  },
  mainContent: {
    display: 'flex',
    flexGrow: 1,
  },
  sidebar: {
    width: '200px',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRight: '1px solid #dee2e6',
  },
  sidebarList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  sidebarItem: {
    marginBottom: '10px',
  },
  sidebarButton: {
    background: 'none',
    border: 'none',
    color: '#343a40',
    textAlign: 'left',
    cursor: 'pointer',
    padding: '10px',
    width: '100%',
  },
  footer: {
    marginTop: '20px',
  },
  backButton: {
    color: '#343a40',
    textDecoration: 'none',
  },
  content: {
    flexGrow: 1,
    padding: '20px',
  },
  contentBox: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
  loginContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f8f9fa',
  },
  logoContainer: {
    marginBottom: '20px',
  },
  logo: {
    fontSize: '48px',
    fontWeight: 'bold',
    color: '#343a40',
  },
  loginTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  input: {
    width: '300px',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  textarea: {
    width: '300px',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  loginButton: {
    width: '320px',
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#343a40',
    color: '#fff',
    cursor: 'pointer',
  },
  submitButton: {
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#343a40',
    color: '#fff',
    cursor: 'pointer',
  },
    chartRow: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: '20px', // Adds space between the charts
    },
    
    chartContainer: {
      backgroundColor: '#fff',
      padding: '10px',
      borderRadius: '5px',
      boxShadow: '0 0 5px rgba(0,0,0,0.1)',
      width: '48%',  // Adjusts the width to fit two charts in a row
      height: '300px',
    },
    dashboardContainer: {
      padding: '20px',
    },
    cardRow: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    card: {
      position: 'relative',
      flex: '1',
      margin: '0 10px',
      padding: '20px',
      color: '#fff',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    cardContent: {
      zIndex: 1,
    },
    cardTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
    },
    moreInfo: {
      marginTop: '10px',
      fontSize: '14px',
    },
    cardIcon: {
      fontSize: '48px',
      opacity: '0.3',
      position: 'absolute',
      right: '20px',
      bottom: '20px',
    },
    cardBlue: {
      backgroundColor: '#17a2b8',
    },
    cardGreen: {
      backgroundColor: '#28a745',
    },
    cardOrange: {
      backgroundColor: '#fd7e14',
    },
    cardRed: {
      backgroundColor: '#dc3545',
    },
  };
  

export default AdminDashboard;
