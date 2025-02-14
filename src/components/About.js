import React from 'react';
import { FaCloud, FaLock, FaTag, FaMobile, FaPen } from 'react-icons/fa';

const About = () => {
  return (
    <div className="container py-5">
      {/* Hero Section */}
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold text-primary mb-3">Welcome to iNoteBook</h1>
        <p className="lead text-muted mb-4">Your secure digital space for capturing thoughts, ideas, and memories</p>
        <div className="border-bottom w-25 mx-auto mb-5"></div>
      </div>

      {/* Features Cards */}
      <div className="row g-4 py-3">
        <div className="col-md-4">
          <div className="card h-100 shadow-sm hover-effect">
            <div className="card-body text-center">
              <div className="feature-icon bg-primary bg-gradient text-white rounded-circle mb-3 mx-auto d-flex align-items-center justify-content-center" style={{width: "60px", height: "60px"}}>
                <FaCloud size={24} />
              </div>
              <h5 className="card-title">Cloud Sync</h5>
              <p className="card-text">Access your notes from anywhere, anytime. Your data is always in sync across all devices.</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 shadow-sm hover-effect">
            <div className="card-body text-center">
              <div className="feature-icon bg-primary bg-gradient text-white rounded-circle mb-3 mx-auto d-flex align-items-center justify-content-center" style={{width: "60px", height: "60px"}}>
                <FaLock size={24} />
              </div>
              <h5 className="card-title">Secure Storage</h5>
              <p className="card-text">Your notes are protected with enterprise-grade security and encryption.</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 shadow-sm hover-effect">
            <div className="card-body text-center">
              <div className="feature-icon bg-primary bg-gradient text-white rounded-circle mb-3 mx-auto d-flex align-items-center justify-content-center" style={{width: "60px", height: "60px"}}>
                <FaTag size={24} />
              </div>
              <h5 className="card-title">Smart Organization</h5>
              <p className="card-text">Tag and categorize your notes for efficient organization and quick access.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Features Section */}
      <div className="row mt-5">
        <div className="col-lg-6">
          <div className="card border-0 bg-light">
            <div className="card-body p-4">
              <h3 className="mb-4">Why Choose NoteBook?</h3>
              <ul className="list-unstyled">
                <li className="mb-3 d-flex align-items-center">
                  <FaPen className="text-primary me-2" />
                  <span>Simple and intuitive note-taking interface</span>
                </li>
                <li className="mb-3 d-flex align-items-center">
                  <FaMobile className="text-primary me-2" />
                  <span>Responsive design that works on all devices</span>
                </li>
                <li className="mb-3 d-flex align-items-center">
                  <FaCloud className="text-primary me-2" />
                  <span>Automatic cloud backup of all your notes</span>
                </li>
                <li className="mb-3 d-flex align-items-center">
                  <FaLock className="text-primary me-2" />
                  <span>Enhanced security with user authentication</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card border-0 bg-primary text-white">
            <div className="card-body p-4">
              <h3 className="mb-4">Get Started Today</h3>
              <p className="mb-4">Join thousands of users who trust NoteBook for their daily note-taking needs. Create your free account and experience the difference.</p>
              <ul className="list-unstyled">
                <li className="mb-2">✓ Free cloud storage</li>
                <li className="mb-2">✓ Cross-platform sync</li>
                <li className="mb-2">✓ Secure encryption</li>
                <li className="mb-2">✓ 24/7 access to your notes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Add custom CSS */}
      <style jsx="true">{`
        .hover-effect {
          transition: transform 0.3s ease;
        }
        .hover-effect:hover {
          transform: translateY(-5px);
        }
        .feature-icon {
          transition: all 0.3s ease;
        }
        .card:hover .feature-icon {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
};

export default About;