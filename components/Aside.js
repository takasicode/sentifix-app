export default function Aside() {
  return (
    <div>
      {/* <!-- ======= Sidebar ======= --> */}
      <aside id="sidebar" className="sidebar">
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <a className="nav-link" href="dashboard.html">
              <i className="bi bi-grid"></i>
              <span>Dashboard</span>
            </a>
          </li>
          {/* <!-- End Dashboard Nav --> */}

          <li className="nav-heading">Data Master</li>

          <li className="nav-item">
            <a className="nav-link collapsed" href="reviews.html">
              <i className="bi bi-table"></i>
              <span>Reviews</span>
            </a>
          </li>
          {/* <!-- End Review Page Nav --> */}
        </ul>
      </aside>
      {/* <!-- End Sidebar--> */}
    </div>
  );
}
