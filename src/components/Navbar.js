import React from 'react';

const Navbar = ({ selectedItem, onItemClick }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="#" style={{ marginLeft: '20px' }}>
        Naval
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <li
            className={`nav-item ${selectedItem === '任务' ? 'active' : ''}`}
          >
            <a
              className="nav-link"
              href="#"
              onClick={() => onItemClick('任务')}
            >
              任务
            </a>
          </li>
          <li
            className={`nav-item ${selectedItem === '日志' ? 'active' : ''}`}
          >
            <a
              className="nav-link"
              href="#"
              onClick={() => onItemClick('日志')}
            >
              日志
            </a>
          </li>
          <li
            className={`nav-item ${selectedItem === '监控' ? 'active' : ''}`}
          >
            <a
              className="nav-link"
              href="#"
              onClick={() => onItemClick('监控')}
            >
              监控
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
