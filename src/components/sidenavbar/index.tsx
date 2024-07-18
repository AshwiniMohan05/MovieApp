import React, { useState, useEffect, useRef } from "react";
import styled, { css } from 'styled-components';
import { NavLink as Link } from "react-router-dom";

import * as colors from "../../colors";
import Arrow from "../../images/arrow-icon.png";
import SearchWhite from "../../images/search-icon-white.png";

export default function SideNavBar() {

  const MobileHamburgerIcon = styled.button<{ active: boolean }>`
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: fixed;
    top: 20px;
    left: 20px;
    font-size: 30px;
    cursor: pointer;
    z-index: 10;
    border: none;
    background-color : unset;
  }
`;

const SideNavBarCont = styled.div`
  position: fixed;
  z-index: 9;
  width: 280px;
  height: 100%;
  background-color: ${colors.sideNavBar};

  &.visible {
    transform: translateX(0);
  }

  @media (max-width: 768px) {
    transform: translateX(-100%);
    transition: transform 0.3s ease-in-out;
    &.visible {
      transform: translateX(0);
    }
    top: 60px;
  }
`;
  
  const [activeSideBar, setActiveSideBar] = useState(false);
  const sideNavRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleSidebar = () => {
    setActiveSideBar(!activeSideBar);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      sideNavRef.current &&
      !sideNavRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setActiveSideBar(false);
    }
  };

  useEffect(() => {
    if (activeSideBar) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeSideBar]);

  return (
    <>
      <MobileHamburgerIcon onClick={toggleSidebar} ref={buttonRef} active={activeSideBar}>
        {activeSideBar ? '✖' : '☰'}
      </MobileHamburgerIcon>
      <SideNavBarCont ref={sideNavRef} className={activeSideBar ? 'visible' : ''}>
        <SideNavMainLink to="/" activeClassName="active" exact>
          Wesley
          <NavIcon arrow />
        </SideNavMainLink>
        <SideNavMainLink to="/discover" activeClassName="active">
          Discover
          <NavIcon search />
        </SideNavMainLink>
        <SideNavHeader><HeaderText>Watched</HeaderText></SideNavHeader>
        <NavLink to="/watched/movies" activeClassName="active" movies>
          Movies
        </NavLink>
        <NavLink to="/watched/tv-shows" activeClassName="active" tvshows>
          TV Shows
        </NavLink>
        <Separator /> {/* Separator after Watched */}
        <SideNavHeader><HeaderText>Saved</HeaderText></SideNavHeader>
        <NavLink to="/saved/movies" activeClassName="active" movies>
          Movies
        </NavLink>
        <NavLink to="/saved/tv-shows" activeClassName="active" tvshows>
          TV Shows
        </NavLink>
        <Separator />
      </SideNavBarCont>
    </>
  );
}



const SideNavMainLink = styled(Link)`
  position: relative;
  display: block;
  padding: 15px 35px;
  font-size: 1.6em;
  font-weight: 700;
  color: ${colors.white};
  &.active {
    background-color: ${colors.primaryColor};
  }

  &:hover {
    background-color: ${colors.primaryColor};
  }
  @media (max-width: 768px) {
  font-size: 1.2em;
  }
`;

const NavIcon = styled.div<{ arrow?: boolean; search?: boolean }>`
  position: absolute;
  right: 35px;
  top: 50%;
  transform: translateY(-50%);
  ${({ arrow }) =>
    arrow &&
    css`
      background-image: url(${Arrow});
      background-size: contain;
      background-repeat: no-repeat;
      width: 24px; 
      height: 24px; 
    `}
  ${({ search }) =>
    search &&
    css`
      background-image: url(${SearchWhite});
      background-size: contain;
      background-repeat: no-repeat;
      width: 24px; 
      height: 24px; 
    `}
`;

const SideNavHeader = styled.div`
  padding: 10px 35px;
  background-color: ${colors.sideNavBarHover}; 
  color: ${colors.white};
  font-size: 1.2em;
  font-weight: 700;
`;

const HeaderText = styled.div`
  margin: 0;
  padding: 10px 0;
`;

const NavLink = styled(Link)<{ movies?: boolean; tvshows?: boolean }>`
  display: block;
  padding: 15px 35px;
  font-size: 1.4em;
  color: ${colors.white};
  text-decoration: none;
  font-weight: 400;

  &.active {
    background-color: ${colors.primaryColor};
  }

  &:hover {
    background-color: ${colors.primaryColor};
  }
  @media (max-width: 768px) {
  font-size: 1.2em;
  }

  ${({ movies }) =>
    movies &&
    css`
      font-weight: 100;
    `}

  ${({ tvshows }) =>
    tvshows &&
    css`
      font-weight: 100;
    `}
`;

const Separator = styled.div`
  height: 1px;
  background-color: ${colors.separatorColor}; 
  margin: 10px 0px 10px 34px;
`;