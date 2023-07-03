import React from "react";
import { useKeycloak } from "@react-keycloak/web";

const Nav = () => {
  const { keycloak } = useKeycloak();

  return (
    <nav>
      <a id="flybooker" href="/">
        Flybooker
      </a>
      <ul id="nav">
        {keycloak.authenticated &&
          <li>
            <a href="/secured">
              Flights
            </a>
          </li>
        }
        {keycloak.authenticated && keycloak.hasRealmRole("admin") &&
          <li>
            <a id="admin" href="/admin">
              Flights (Admin)
            </a>
          </li>
        }
        <li>
          {!keycloak.authenticated && (
            <button
              type="button"
              onClick={() => keycloak.login()}
            >
              Log in
            </button>
          )}

          {keycloak.authenticated && (
            <button
              type="button"
              onClick={() => {
                keycloak.logout();
              }}
            >
              Logout ({keycloak.tokenParsed.preferred_username})
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Nav;