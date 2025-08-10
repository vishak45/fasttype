import React from 'react';

function Footer() {
  return (
    <footer
      style={{
        background: '#FFA500',
        boxShadow: '0 -2px 8px rgba(0,0,0,0.08)',
        color: '#111',
        textAlign: 'center',
        padding: '1rem 0',
        marginTop: 'auto',
        fontWeight: '500',
        letterSpacing: '1px'
      }}
    >
      © {new Date().getFullYear()} TypeGearUp &mdash; All rights reserved.
    </footer>
  );
}

export default Footer;