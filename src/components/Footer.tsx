import React from 'react';

const Footer: React.FC = () => {
  // Basic footer styling, replace with Tailwind or proper CSS later
  const footerStyle: React.CSSProperties = {
    marginTop: '2rem',
    padding: '1rem',
    backgroundColor: '#f0f0f0',
    textAlign: 'center',
    borderTop: '1px solid #ccc',
  };

  return (
    <footer style={footerStyle}>
      <p>&copy; {new Date().getFullYear()} Laundry Service. All rights reserved.</p>
      {/* TODO: Add links like About Us, Contact, Privacy Policy based on reference site */}
    </footer>
  );
};

export default Footer;

