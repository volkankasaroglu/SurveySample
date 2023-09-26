/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";

export function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-dark  border-bottom box-shadow py-3 mb-3">
            <div className="container">
                <Link className="navbar-brand text-light" to="/">Surveys Application</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
            </div>
        </nav>
    );
}

export function Footer() {
    return (
        <footer>
            <div className="container p-3 mt-5 border-top">
                <small className="d-block text-muted text-center">&copy; 2023 Survey App</small>
            </div>
        </footer>
    );
}