import React from "react";
import { Menu, Dropdown, notification } from "antd";
import { Link } from "react-router-dom";
import Style from "./index.scss";

class Nav extends React.Component {
  render() {
    const aboutMenu = (
      <Menu>
        <Menu.Item>关于</Menu.Item>
        <Menu.Item>退出</Menu.Item>
      </Menu>
    ) 

    return (
      <nav>
        <div className={Style["page-header"]}>
          <div className={`${Style["header"]} ${Style["toggle"]}`}>
            <div className={Style["navigate"]}>
              <Dropdown overlay={aboutMenu}>
                <a href="#" className={Style["user"]}></a>
              </Dropdown>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Nav;
