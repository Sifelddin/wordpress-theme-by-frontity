import React, { Component } from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaPhone,
  FaMapMarker,
  FaEnvelope,
  FaYoutube,
  FaBehance,
} from "react-icons/fa";
import { connect, styled } from "frontity";
import Link from "@frontity/components/link";
import dayjs from "dayjs";
import Image from "@frontity/components/image";

export class Footer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const categories = Object.values(this.props.state.source.category);

    const imgLogo =
      this.props.state.source.url + "uploads/2021/12/CKPA_Chauny_Logo.jpg" ||
      "";
    const DateYear = dayjs(Date()).format("YYYY");

    return (
      <FooterContainer>
        <Container
          archive={this.props.Data.isArchive}
          showSideBar={this.props.showSideBar}
        >
          <Logo src={imgLogo} alt="logo" />

          <ContactTextList>
            <h4>
              <Link link="/contact/">CONTACT</Link>
            </h4>
            <ul>
              <li>
                <FaMapMarker /> rue du pont levis 02700 Chauny
              </li>
              <li>
                <FaPhone /> 03 23 39 33 13
              </li>
              <li>
                <FaEnvelope /> ckpachauny@gmail.com
              </li>
              <li>CKPA Chauny {DateYear}</li>
            </ul>
          </ContactTextList>

          <Icons>
            <h4>LE CLUB</h4>
            <p>
              vous accueille tout l’été, le club est ouvert tous les après midi
              de 13h30 à 17h30. Nous accueillons les jeunes à partir de 8ans
            </p>
            <ul>
              <li>
                <Link
                  link={
                    "https://www.facebook.com/Cano%C3%AB-Kayak-Plein-Air-de-CHAUNY-320627110626/"
                  }
                >
                  <FaFacebook />
                </Link>
              </li>
              <li>
                <Link link={"#"}>
                  <FaTwitter />
                </Link>
              </li>
              <li>
                <Link link={"#"}>
                  <FaInstagram />
                </Link>
              </li>
              <li>
                <Link link={"#"}>
                  <FaYoutube />
                </Link>
              </li>
              <li>
                <Link link={"#"}>
                  <FaBehance />
                </Link>
              </li>
            </ul>
          </Icons>

          <CatList>
            <h4>Catégories</h4>
            <ul>
              {categories.map((cat) => {
                return (
                  <li key={cat.id}>
                    <Link link={cat.link}>{cat.name}</Link>
                  </li>
                );
              })}
            </ul>
          </CatList>
        </Container>
      </FooterContainer>
    );
  }
}

export default connect(Footer);

const FooterContainer = styled.footer`
  background-color: var(--background-nav);
  width: 100%;
  color: lightgrey;
  padding: 2rem 1rem;
  z-index: 3;
  h4 {
    color: white;
    font-size: 1rem;
  }
  ul {
    list-style: none;
  }
  a {
    text-decoration: none;
    color: lightgrey;
    transition: 0.3s color;
  }
  a:hover {
    color: var(--light-grey);
    text-decoration: underline;
  }
`;
const Container = styled.div`
  width: ${({ archive, showSideBar }) =>
    archive && showSideBar ? "75%" : "100%"};
  display: grid;
  text-align: center;
  grid-template-columns: ${({ archive, showSideBar }) =>
    archive && showSideBar ? "1fr 1fr " : "1fr 1fr 1fr 1fr"};
  transition: all 0.3s;
  @media (max-width: 780px) {
    width: 100%;
    display: block;
  }
`;
const Logo = styled(Image)`
  padding: 0.5rem;
  margin: 0 auto;
`;

const CatList = styled.div`
  padding: 0.5rem;
  font-size: 0.8rem;
  line-height: 1.3rem;
`;

const Icons = styled.div`
  padding: 0.5rem;
  p {
    font-size: 0.8rem;
    line-height: 1.5;
    padding: 0.5rem;
  }
  h4 {
    margin-bottom: 0.5rem;
  }
  ul {
    display: flex;
    justify-content: center;
    margin: 0;
    padding: 0;
    font-size: 1.2rem;
    li {
      margin: 0.5rem;
    }
  }
`;

const ContactTextList = styled.div`
  padding: 0.5rem;
  font-size: 0.8rem;
  line-height: 1.2rem;
  h4 {
    margin-bottom: 1rem;
  }
`;
