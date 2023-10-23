export default function Header(props) {
  return (
    <div>
      {/* <!-- ======= Header ======= --> */}
      <header
        id="header"
        className="header fixed-top d-flex align-items-center"
      >
        <div className="d-flex align-items-center justify-content-between">
          <a href="dashboard.html" className="logo d-flex align-items-center">
            <img src="/logo.png" alt="" />
            <span className="d-none d-lg-block">Sentifix</span>
          </a>
          <i className="bi bi-list toggle-sidebar-btn"></i>
        </div>
        {/* <!-- End Logo --> */}

        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">
            <li className="nav-item dropdown pe-3">
              <a
                className="nav-link nav-profile d-flex align-items-center pe-0"
                href="#"
                data-bs-toggle="dropdown"
              >
                <img
                  src="/admin.png"
                  alt="Profile"
                  className="rounded-circle"
                />
                <p className="d-none d-md-block dropdown-toggle ps-2 mb-0">
                  Welcome,
                  <span> John Wick</span>
                </p>
              </a>
              {/* <!-- End Profile Image Icon --> */}

              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li>
                  <a
                    className="dropdown-item d-flex align-items-center"
                    href="index.html"
                  >
                    <i className="bi bi-box-arrow-right"></i>
                    <span>Keluar</span>
                  </a>
                </li>
              </ul>
              {/* <!-- End Profile Dropdown Items --> */}
            </li>
            {/* <!-- End Profile Nav --> */}
          </ul>
        </nav>
        {/* <!-- End Icons Navigation --> */}
      </header>
      {/* <!-- End Header --> */}

      {props.children}
    </div>
  );
}
